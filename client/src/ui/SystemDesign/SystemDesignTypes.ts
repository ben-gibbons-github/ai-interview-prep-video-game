export type ComponentType =
  | 'api-gateway'
  | 'load-balancer'
  | 'app-server'
  | 'cache'
  | 'database'
  | 'queue'
  | 'read-replica'
  | 'message-queue'
  | 'cdn'
  | 'object-storage'
  | 'rate-limiter'

export const COMPONENT_LABELS: Record<ComponentType, string> = {
  'api-gateway': 'API Gateway',
  'load-balancer': 'Load Balancer',
  'app-server': 'App Server',
  'cache': 'Cache',
  'database': 'Database',
  'queue': 'Queue',
  'read-replica': 'Read Replica',
  'message-queue': 'Message Queue',
  'cdn': 'CDN',
  'object-storage': 'Blob Store',
  'rate-limiter': 'Rate Limiter',
}

export const COMPONENT_ICON: Record<ComponentType, string> = {
  'api-gateway': '⬡',
  'load-balancer': '⊞',
  'app-server': '▣',
  'cache': '◈',
  'database': '⊗',
  'queue': '☰',
  'read-replica': '⊕',
  'message-queue': '⧉',
  'cdn': '◉',
  'object-storage': '⊠',
  'rate-limiter': '⊡',
}

export const COMPONENT_COLOR: Record<ComponentType, string> = {
  'api-gateway': '#60a5fa',
  'load-balancer': '#a78bfa',
  'app-server': '#4ade80',
  'cache': '#fb923c',
  'database': '#22d3ee',
  'queue': '#f59e0b',
  'read-replica': '#67e8f9',
  'message-queue': '#fbbf24',
  'cdn': '#818cf8',
  'object-storage': '#94a3b8',
  'rate-limiter': '#f87171',
}

export interface NodePosition {
  x: number
  y: number
}

export interface NodeProperties {
  instances?: number
  replicas?: number
  ttlSeconds?: number
  evictionPolicy?: 'lru' | 'lfu' | 'ttl'
  databaseType?: 'sql' | 'nosql'
  consistency?: 'strong' | 'eventual'
  partitioned?: boolean
  deliverySemantics?: 'at-least-once' | 'exactly-once'
  consumers?: number
  rateLimit?: number
  algorithm?: 'round-robin' | 'least-connections' | 'ip-hash'
}

export const COMPONENT_DEFAULTS: Record<ComponentType, NodeProperties> = {
  'api-gateway': { rateLimit: 10000 },
  'load-balancer': { algorithm: 'round-robin' },
  'app-server': { instances: 2 },
  'cache': { ttlSeconds: 300, evictionPolicy: 'lru' },
  'database': { replicas: 1, databaseType: 'sql', consistency: 'strong', partitioned: false },
  'queue': { deliverySemantics: 'at-least-once', consumers: 4 },
  'read-replica': { replicas: 1 },
  'message-queue': { deliverySemantics: 'at-least-once', consumers: 4 },
  'cdn': { ttlSeconds: 3600 },
  'object-storage': {},
  'rate-limiter': { rateLimit: 5000 },
}

export interface DesignNode {
  id: string
  type: ComponentType
  position: NodePosition
  properties: NodeProperties
}

export interface DesignEdge {
  id: string
  fromNodeId: string
  toNodeId: string
}

export interface DesignState {
  nodes: DesignNode[]
  edges: DesignEdge[]
}

export interface SystemDesignScenarioData {
  availableComponents: ComponentType[]
  maxNodes: number
  readQps: number
  writeQps: number
  latencyTargetMs: number
  sloAvailability: number
  requiredComponents: ComponentType[]
  requiredFlows: Array<{ from: ComponentType; to: ComponentType }>
  optimalComponents: ComponentType[]
}

export interface SystemDesignQuestionMeta {
  scenario: SystemDesignScenarioData
}

export interface MultiSectionSystemDesignSectionOption {
  label: string
  description?: string
}

export interface MultiSectionSystemDesignSection {
  id: string
  title: string
  prompt: string
  options: string[]
  correctIndex: number
  helperText?: string
}

export interface MultiSectionSystemDesignQuestionMeta {
  title?: string
  scenarioSummary?: string
  submissionsAllowed?: number
  sections: MultiSectionSystemDesignSection[]
}

export type RatingGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export const GRADE_COLOR: Record<RatingGrade, string> = {
  A: '#4ade80',
  B: '#86efac',
  C: '#fcd34d',
  D: '#fb923c',
  F: '#f87171',
}

export const GRADE_GOLD_MULTIPLIER: Record<RatingGrade, number> = {
  A: 4,
  B: 2,
  C: 1,
  D: 0,
  F: 0,
}

export interface RatingBreakdownItem {
  label: string
  passed: boolean
  weight: number
}

export interface DesignRating {
  score: number
  grade: RatingGrade
  canSubmit: boolean
  breakdown: RatingBreakdownItem[]
}
