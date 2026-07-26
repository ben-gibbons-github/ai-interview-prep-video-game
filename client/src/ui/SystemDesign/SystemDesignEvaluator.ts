import type {
  ComponentType,
  DesignNode,
  DesignRating,
  DesignState,
  RatingBreakdownItem,
  RatingGrade,
  SystemDesignScenarioData,
} from './SystemDesignTypes'
import { COMPONENT_LABELS } from './SystemDesignTypes'

const BASE_SERVER_READ_QPS = 5_000
const BASE_SERVER_WRITE_QPS = 3_000
const CACHE_READ_BOOST = 8
const CDN_READ_BOOST = 6

function equivalentTypes(type: ComponentType): ComponentType[] {
  if (type === 'message-queue' || type === 'queue') {
    return ['message-queue', 'queue']
  }
  return [type]
}

function countType(nodes: DesignNode[], type: ComponentType): number {
  const candidates = new Set(equivalentTypes(type))
  return nodes.filter((n) => candidates.has(n.type)).length
}

function hasType(nodes: DesignNode[], type: ComponentType): boolean {
  const candidates = new Set(equivalentTypes(type))
  return nodes.some((n) => candidates.has(n.type))
}

function edgeExists(
  state: DesignState,
  fromType: ComponentType,
  toType: ComponentType,
): boolean {
  const fromTypeCandidates = new Set(equivalentTypes(fromType))
  const toTypeCandidates = new Set(equivalentTypes(toType))
  const fromIds = new Set(state.nodes.filter((n) => fromTypeCandidates.has(n.type)).map((n) => n.id))
  const toIds = new Set(state.nodes.filter((n) => toTypeCandidates.has(n.type)).map((n) => n.id))
  return state.edges.some((e) => fromIds.has(e.fromNodeId) && toIds.has(e.toNodeId))
}

function estimateReadCapacity(state: DesignState): number {
  const serverCount = countType(state.nodes, 'app-server')
  const hasLB = hasType(state.nodes, 'load-balancer')
  const hasCache = hasType(state.nodes, 'cache')
  const hasCDN = hasType(state.nodes, 'cdn')
  const effectiveServers = hasLB ? Math.max(1, serverCount) : 1
  return BASE_SERVER_READ_QPS * effectiveServers * (hasCache ? CACHE_READ_BOOST : 1) * (hasCDN ? CDN_READ_BOOST : 1)
}

function estimateWriteCapacity(state: DesignState): number {
  const serverCount = countType(state.nodes, 'app-server')
  const hasLB = hasType(state.nodes, 'load-balancer')
  const effectiveServers = hasLB ? Math.max(1, serverCount) : 1
  return BASE_SERVER_WRITE_QPS * effectiveServers
}

function fmtQps(n: number): string {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}k` : `${n}`
}

function scoreToGrade(score: number): RatingGrade {
  if (score >= 85) return 'A'
  if (score >= 70) return 'B'
  if (score >= 55) return 'C'
  if (score >= 45) return 'D'
  return 'F'
}

export function evaluateDesign(
  state: DesignState,
  scenario: SystemDesignScenarioData,
): DesignRating {
  const breakdown: RatingBreakdownItem[] = []
  let score = 0
  const requiredSet = new Set(scenario.requiredComponents)
  const optimalSet = new Set(scenario.optimalComponents)

  // === Required components – up to 30 pts ===
  const reqCompCount = scenario.requiredComponents.length
  const perCompPts = reqCompCount > 0 ? 30 / reqCompCount : 0
  for (const type of scenario.requiredComponents) {
    const present = hasType(state.nodes, type)
    breakdown.push({ label: `${COMPONENT_LABELS[type]} present`, passed: present, weight: perCompPts })
    if (present) score += perCompPts
  }

  // === Required flows – up to 20 pts ===
  const reqFlowCount = scenario.requiredFlows.length
  const perFlowPts = reqFlowCount > 0 ? 20 / reqFlowCount : 0
  for (const flow of scenario.requiredFlows) {
    const connected = edgeExists(state, flow.from, flow.to)
    breakdown.push({
      label: `${COMPONENT_LABELS[flow.from]} → ${COMPONENT_LABELS[flow.to]}`,
      passed: connected,
      weight: perFlowPts,
    })
    if (connected) score += perFlowPts
  }

  // === Scale – 30 pts (forgiving, with partial credit) ===
  const readCap = estimateReadCapacity(state)
  const writeCap = estimateWriteCapacity(state)
  const readOk = readCap >= scenario.readQps
  const writeOk = writeCap >= scenario.writeQps
  const readNear = readCap >= scenario.readQps * 0.75
  const writeNear = writeCap >= scenario.writeQps * 0.75
  breakdown.push({
    label: `Read ≥ ${fmtQps(scenario.readQps)} QPS (est. ${fmtQps(readCap)})`,
    passed: readOk,
    weight: 15,
  })
  breakdown.push({
    label: `Write ≥ ${fmtQps(scenario.writeQps)} QPS (est. ${fmtQps(writeCap)})`,
    passed: writeOk,
    weight: 15,
  })
  if (readOk) {
    score += 15
  } else if (readNear) {
    score += 8
  }
  if (writeOk) {
    score += 15
  } else if (writeNear) {
    score += 8
  }

  // === Reliability – 20 pts ===
  const serverCount = countType(state.nodes, 'app-server')
  const hasLB = hasType(state.nodes, 'load-balancer')
  const dbNode = state.nodes.find((n) => n.type === 'database')
  const dbReplicated =
    hasType(state.nodes, 'read-replica') || (dbNode?.properties.replicas ?? 1) > 1
  const serverRedundant = hasLB && serverCount >= 2
  breakdown.push({ label: 'App server redundancy (LB + ≥2 servers)', passed: serverRedundant, weight: 10 })
  breakdown.push({ label: 'Database redundancy (replica or replicas > 1)', passed: dbReplicated, weight: 10 })
  if (serverRedundant) score += 10
  if (dbReplicated) score += 10

  // === Light penalties for noisy / overbuilt designs ===
  const irrelevantComponents = state.nodes.filter(
    (node) => !requiredSet.has(node.type) && !optimalSet.has(node.type),
  )
  const irrelevantPenalty = Math.min(6, irrelevantComponents.length * 1.5)
  if (irrelevantPenalty > 0) {
    score -= irrelevantPenalty
    breakdown.push({
      label: `Irrelevant components penalty (${irrelevantComponents.length})`,
      passed: false,
      weight: irrelevantPenalty,
    })
  }

  const recommendedNodeBudget = Math.max(4, scenario.requiredComponents.length + 2)
  const extraNodes = Math.max(0, state.nodes.length - recommendedNodeBudget)
  const extraNodePenalty = Math.min(4, extraNodes)
  if (extraNodePenalty > 0) {
    score -= extraNodePenalty
    breakdown.push({
      label: `Complexity penalty (extra nodes: ${extraNodes})`,
      passed: false,
      weight: extraNodePenalty,
    })
  }

  const finalScore = Math.round(Math.min(100, Math.max(0, score)))
  return {
    score: finalScore,
    grade: scoreToGrade(finalScore),
    canSubmit: finalScore >= 45,
    breakdown,
  }
}
