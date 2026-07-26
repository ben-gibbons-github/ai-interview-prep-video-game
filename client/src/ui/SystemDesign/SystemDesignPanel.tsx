import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { QuizQuestion } from '../../quiz/QuizQuestionManager'
import { evaluateDesign } from './SystemDesignEvaluator'
import { SystemDesignCanvas } from './SystemDesignCanvas'
import type { DesignNode, DesignState } from './SystemDesignTypes'
import { COMPONENT_LABELS, GRADE_COLOR, GRADE_GOLD_MULTIPLIER } from './SystemDesignTypes'

interface SystemDesignPanelProps {
  quizQuestion: QuizQuestion
  quizAnswerResult: 'correct' | 'incorrect' | null
  onSubmitDesign: (score: number) => void
  onSkipDesign: () => void
  availableSkips: number
  savedDraft?: SystemDesignPanelDraft | null
  onDraftChange?: (draft: SystemDesignPanelDraft) => void
}

export interface SystemDesignPanelDraft {
  designState: DesignState
  selectedNodeId: string | null
}

function createDraftSignature(draft: SystemDesignPanelDraft): string {
  return JSON.stringify({
    selectedNodeId: draft.selectedNodeId,
    designState: draft.designState,
  })
}

function PropertySlider({
  label,
  value,
  min,
  max,
  step = 1,
  disabled,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  disabled: boolean
  onChange: (v: number) => void
}) {
  return (
    <div className="sysdesign-prop">
      <label className="sysdesign-prop-label">
        {label}: <strong>{value}</strong>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        className="sysdesign-prop-slider"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

function PropertySelect({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  disabled: boolean
  onChange: (v: string) => void
}) {
  return (
    <div className="sysdesign-prop">
      <label className="sysdesign-prop-label">{label}</label>
      <select value={value} disabled={disabled} className="sysdesign-prop-select" onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function NodeEditor({
  node,
  disabled,
  onChange,
}: {
  node: DesignNode
  disabled: boolean
  onChange: (props: DesignNode['properties']) => void
}) {
  const p = node.properties
  const up = (key: string, val: string | number | boolean) => onChange({ ...p, [key]: val })

  return (
    <div className="sysdesign-props-grid">
      {node.type === 'app-server' && (
        <PropertySlider label="Instances" value={p.instances ?? 2} min={1} max={20} disabled={disabled} onChange={(v) => up('instances', v)} />
      )}
      {node.type === 'load-balancer' && (
        <PropertySelect
          label="Algorithm"
          value={p.algorithm ?? 'round-robin'}
          options={[
            { value: 'round-robin', label: 'Round Robin' },
            { value: 'least-connections', label: 'Least Connections' },
            { value: 'ip-hash', label: 'IP Hash' },
          ]}
          disabled={disabled}
          onChange={(v) => up('algorithm', v)}
        />
      )}
      {node.type === 'cache' && (
        <>
          <PropertySlider label="TTL (s)" value={p.ttlSeconds ?? 300} min={0} max={3600} step={60} disabled={disabled} onChange={(v) => up('ttlSeconds', v)} />
          <PropertySelect
            label="Eviction policy"
            value={p.evictionPolicy ?? 'lru'}
            options={[
              { value: 'lru', label: 'LRU' },
              { value: 'lfu', label: 'LFU' },
              { value: 'ttl', label: 'TTL' },
            ]}
            disabled={disabled}
            onChange={(v) => up('evictionPolicy', v)}
          />
        </>
      )}
      {node.type === 'database' && (
        <>
          <PropertySlider label="Replicas" value={p.replicas ?? 1} min={1} max={5} disabled={disabled} onChange={(v) => up('replicas', v)} />
          <PropertySelect
            label="Database type"
            value={p.databaseType ?? 'sql'}
            options={[
              { value: 'sql', label: 'SQL' },
              { value: 'nosql', label: 'NoSQL' },
            ]}
            disabled={disabled}
            onChange={(v) => up('databaseType', v)}
          />
          <PropertySelect
            label="Consistency"
            value={p.consistency ?? 'strong'}
            options={[
              { value: 'strong', label: 'Strong' },
              { value: 'eventual', label: 'Eventual' },
            ]}
            disabled={disabled}
            onChange={(v) => up('consistency', v)}
          />
        </>
      )}
      {node.type === 'read-replica' && (
        <PropertySlider label="Replica count" value={p.replicas ?? 1} min={1} max={5} disabled={disabled} onChange={(v) => up('replicas', v)} />
      )}
      {(node.type === 'message-queue' || node.type === 'queue') && (
        <>
          <PropertySlider label="Consumers" value={p.consumers ?? 4} min={1} max={20} disabled={disabled} onChange={(v) => up('consumers', v)} />
          <PropertySelect
            label="Delivery semantics"
            value={p.deliverySemantics ?? 'at-least-once'}
            options={[
              { value: 'at-least-once', label: 'At-least-once' },
              { value: 'exactly-once', label: 'Exactly-once' },
            ]}
            disabled={disabled}
            onChange={(v) => up('deliverySemantics', v)}
          />
        </>
      )}
      {(node.type === 'api-gateway' || node.type === 'rate-limiter') && (
        <PropertySlider label="Rate limit (req/s)" value={p.rateLimit ?? 5000} min={100} max={100_000} step={100} disabled={disabled} onChange={(v) => up('rateLimit', v)} />
      )}
      {node.type === 'cdn' && (
        <PropertySlider label="Cache TTL (s)" value={p.ttlSeconds ?? 3600} min={60} max={86_400} step={60} disabled={disabled} onChange={(v) => up('ttlSeconds', v)} />
      )}
    </div>
  )
}

export function SystemDesignPanel({
  quizQuestion,
  quizAnswerResult,
  onSubmitDesign,
  onSkipDesign,
  availableSkips,
  savedDraft,
  onDraftChange,
}: SystemDesignPanelProps) {
  const scenario = quizQuestion.systemDesign?.scenario
  const [designState, setDesignState] = useState<DesignState>({ nodes: [], edges: [] })
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const skipNextDraftEmitRef = useRef(false)
  const lastEmittedDraftSignatureRef = useRef<string | null>(null)

  // Reset when question changes
  useEffect(() => {
    if (savedDraft) {
      skipNextDraftEmitRef.current = true
      setDesignState(savedDraft.designState)
      setSelectedNodeId(savedDraft.selectedNodeId)
      return
    }

    skipNextDraftEmitRef.current = false
    lastEmittedDraftSignatureRef.current = null
    setDesignState({ nodes: [], edges: [] })
    setSelectedNodeId(null)
  }, [quizQuestion.id])

  useEffect(() => {
    const currentDraft = {
      designState,
      selectedNodeId,
    }

    const currentSignature = createDraftSignature(currentDraft)

    if (skipNextDraftEmitRef.current) {
      skipNextDraftEmitRef.current = false
      lastEmittedDraftSignatureRef.current = currentSignature
      return
    }

    if (lastEmittedDraftSignatureRef.current === currentSignature) {
      return
    }

    lastEmittedDraftSignatureRef.current = currentSignature
    onDraftChange?.(currentDraft)
  }, [designState, selectedNodeId, onDraftChange])

  const rating = useMemo(() => {
    if (!scenario) return null
    return evaluateDesign(designState, scenario)
  }, [designState, scenario])

  const selectedNode = useMemo(
    () => designState.nodes.find((n) => n.id === selectedNodeId) ?? null,
    [designState.nodes, selectedNodeId],
  )

  const handlePropertiesChange = useCallback(
    (props: DesignNode['properties']) => {
      if (!selectedNodeId) return
      setDesignState((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === selectedNodeId ? { ...n, properties: props } : n)),
      }))
    },
    [selectedNodeId],
  )

  const handleSubmit = useCallback(() => {
    if (!rating?.canSubmit || quizAnswerResult !== null) return
    onSubmitDesign(rating.score)
  }, [onSubmitDesign, quizAnswerResult, rating])

  if (!scenario) return null

  const disabled = quizAnswerResult !== null

  return (
    <div className="sysdesign-container">
      <SystemDesignCanvas
        state={designState}
        scenario={scenario}
        selectedNodeId={selectedNodeId}
        disabled={disabled}
        onStateChange={setDesignState}
        onSelectNode={setSelectedNodeId}
      />

      {/* Property editor */}
      {selectedNode && (
        <div className="sysdesign-props">
          <p className="sysdesign-props-title">{COMPONENT_LABELS[selectedNode.type]} properties</p>
          <NodeEditor node={selectedNode} disabled={disabled} onChange={handlePropertiesChange} />
        </div>
      )}

      {/* Rating + submit */}
      {rating && (
        <div className="sysdesign-rating-row">
          <div className="sysdesign-rating-header">
            <span className="sysdesign-grade" style={{ color: GRADE_COLOR[rating.grade] }}>
              {rating.grade}
            </span>
            {rating.grade !== 'F' && rating.grade !== 'D' && (
              <span className="sysdesign-gold-hint">
                +{Math.round(15 * GRADE_GOLD_MULTIPLIER[rating.grade])}g reward
              </span>
            )}
          </div>
          <div className="sysdesign-submit-row">
            <p className="sysdesign-hint">
              {rating.canSubmit ? `Grade ${rating.grade} — ready to submit. Higher grade = more gold.` : 'Reach grade D to submit.'}
            </p>
            <button
              type="button"
              className="quiz-raw-button"
              disabled={!rating.canSubmit || disabled}
              onClick={handleSubmit}
            >
              Submit Design
            </button>
            <button
              type="button"
              className="quiz-raw-button"
              disabled={disabled || availableSkips <= 0}
              onClick={onSkipDesign}
            >
              Skip Problem (Spend 1 Skip)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
