import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentType, DesignNode, DesignState, SystemDesignScenarioData } from './SystemDesignTypes'
import { COMPONENT_COLOR, COMPONENT_DEFAULTS, COMPONENT_ICON, COMPONENT_LABELS } from './SystemDesignTypes'

const NODE_W = 88
const NODE_H = 76
const CANVAS_W = 860
const CANVAS_H = 460
const GRID = 20

function snap(v: number): number {
  return Math.round(v / GRID) * GRID
}
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v))
}
function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

interface DragState {
  kind: 'node' | 'palette'
  nodeId?: string
  componentType?: ComponentType
  offsetX: number
  offsetY: number
}

interface GhostPos {
  x: number
  y: number
  type: ComponentType
}

interface SystemDesignCanvasProps {
  state: DesignState
  scenario: SystemDesignScenarioData
  selectedNodeId: string | null
  disabled: boolean
  onStateChange: (state: DesignState) => void
  onSelectNode: (id: string | null) => void
}

export function SystemDesignCanvas({
  state,
  scenario,
  selectedNodeId,
  disabled,
  onStateChange,
  onSelectNode,
}: SystemDesignCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef(state)
  stateRef.current = state
  const onStateChangeRef = useRef(onStateChange)
  onStateChangeRef.current = onStateChange
  const onSelectNodeRef = useRef(onSelectNode)
  onSelectNodeRef.current = onSelectNode

  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [ghostPos, setGhostPos] = useState<GhostPos | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)

  const canvasXY = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  // Global pointer handlers live for the duration of a drag
  useEffect(() => {
    const drag = dragRef.current
    if (!drag) return

    const onMove = (e: PointerEvent) => {
      const { x, y } = canvasXY(e.clientX, e.clientY)
      if (drag.kind === 'palette' && drag.componentType) {
        setGhostPos({
          x: clamp(x - NODE_W / 2, 0, CANVAS_W - NODE_W),
          y: clamp(y - NODE_H / 2, 0, CANVAS_H - NODE_H),
          type: drag.componentType,
        })
      } else if (drag.kind === 'node' && drag.nodeId) {
        const nx = snap(clamp(x - drag.offsetX, 0, CANVAS_W - NODE_W))
        const ny = snap(clamp(y - drag.offsetY, 0, CANVAS_H - NODE_H))
        onStateChangeRef.current({
          ...stateRef.current,
          nodes: stateRef.current.nodes.map((n) =>
            n.id === drag.nodeId ? { ...n, position: { x: nx, y: ny } } : n,
          ),
        })
      }
    }

    const onUp = (e: PointerEvent) => {
      const { x, y } = canvasXY(e.clientX, e.clientY)
      if (
        drag.kind === 'palette' &&
        drag.componentType &&
        x >= 0 && x < CANVAS_W &&
        y >= 0 && y < CANVAS_H &&
        stateRef.current.nodes.length < scenario.maxNodes
      ) {
        const newNode: DesignNode = {
          id: uid(),
          type: drag.componentType,
          position: { x: snap(clamp(x - NODE_W / 2, 0, CANVAS_W - NODE_W)), y: snap(clamp(y - NODE_H / 2, 0, CANVAS_H - NODE_H)) },
          properties: { ...COMPONENT_DEFAULTS[drag.componentType] },
        }
        onStateChangeRef.current({ ...stateRef.current, nodes: [...stateRef.current.nodes, newNode] })
      }
      dragRef.current = null
      setDraggingNodeId(null)
      setGhostPos(null)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [canvasXY, draggingNodeId, scenario.maxNodes]) // re-bind when drag starts/stops

  const startPaletteDrag = useCallback(
    (e: React.PointerEvent, type: ComponentType) => {
      if (disabled) return
      e.preventDefault()
      dragRef.current = { kind: 'palette', componentType: type, offsetX: NODE_W / 2, offsetY: NODE_H / 2 }
      setDraggingNodeId('__palette__') // trigger effect re-bind
      setGhostPos({ x: -200, y: -200, type })
    },
    [disabled],
  )

  const startNodeDrag = useCallback(
    (e: React.PointerEvent, node: DesignNode) => {
      if (disabled || connectingFrom !== null) return
      e.preventDefault()
      e.stopPropagation()
      const { x, y } = canvasXY(e.clientX, e.clientY)
      dragRef.current = { kind: 'node', nodeId: node.id, offsetX: x - node.position.x, offsetY: y - node.position.y }
      setDraggingNodeId(node.id)
    },
    [canvasXY, connectingFrom, disabled],
  )

  const handleNodeClick = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      if (disabled) return
      if (connectingFrom !== null) {
        if (connectingFrom !== nodeId) {
          const already = state.edges.some((ed) => ed.fromNodeId === connectingFrom && ed.toNodeId === nodeId)
          if (!already) {
            onStateChange({ ...state, edges: [...state.edges, { id: uid(), fromNodeId: connectingFrom, toNodeId: nodeId }] })
          }
        }
        setConnectingFrom(null)
        onSelectNode(null)
        return
      }
      onSelectNode(nodeId === selectedNodeId ? null : nodeId)
    },
    [connectingFrom, disabled, onSelectNode, onStateChange, selectedNodeId, state],
  )

  const handleCanvasClick = useCallback(() => {
    setConnectingFrom(null)
    onSelectNode(null)
  }, [onSelectNode])

  const handleDeleteNode = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      onStateChange({
        nodes: state.nodes.filter((n) => n.id !== nodeId),
        edges: state.edges.filter((ed) => ed.fromNodeId !== nodeId && ed.toNodeId !== nodeId),
      })
      onSelectNode(null)
    },
    [onSelectNode, onStateChange, state],
  )

  const handleEdgeClick = useCallback(
    (e: React.MouseEvent, edgeId: string) => {
      e.stopPropagation()
      if (disabled) return
      onStateChange({ ...state, edges: state.edges.filter((ed) => ed.id !== edgeId) })
    },
    [disabled, onStateChange, state],
  )

  useEffect(() => {
    if (disabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConnectingFrom(null)
        onSelectNodeRef.current(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [disabled])

  const usedCounts = scenario.availableComponents.reduce<Record<string, number>>((acc, t) => {
    acc[t] = state.nodes.filter((n) => n.type === t).length
    return acc
  }, {})

  return (
    <div className="sysdesign-layout">
      {/* Palette */}
      <div className="sysdesign-palette">
        <span className="sysdesign-palette-header">Components</span>
        {scenario.availableComponents.map((type) => (
          <div
            key={type}
            className={`sysdesign-palette-item${disabled ? ' sysdesign-palette-item-disabled' : ''}`}
            style={{ borderColor: COMPONENT_COLOR[type] }}
            onPointerDown={(e) => startPaletteDrag(e, type)}
          >
            <span className="sysdesign-node-icon" style={{ color: COMPONENT_COLOR[type] }}>
              {COMPONENT_ICON[type]}
            </span>
            <span className="sysdesign-palette-name">{COMPONENT_LABELS[type]}</span>
            {(usedCounts[type] ?? 0) > 0 && (
              <span className="sysdesign-palette-badge" style={{ background: COMPONENT_COLOR[type] }}>
                {usedCounts[type]}
              </span>
            )}
          </div>
        ))}
        <p className="sysdesign-node-count">
          {state.nodes.length}/{scenario.maxNodes} placed
        </p>
        <p className="sysdesign-palette-hint">Drag onto canvas · Click edge to delete · → to connect</p>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`sysdesign-canvas${connectingFrom ? ' sysdesign-canvas-connecting' : ''}`}
        style={{ width: CANVAS_W, height: CANVAS_H }}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <svg className="sysdesign-grid-svg" width={CANVAS_W} height={CANVAS_H}>
          <defs>
            <pattern id="sd-dot" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
              <circle cx={GRID / 2} cy={GRID / 2} r="1.2" fill="rgba(148,163,184,0.18)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sd-dot)" />
        </svg>

        {/* Edges */}
        <svg className="sysdesign-edges-svg" width={CANVAS_W} height={CANVAS_H}>
          <defs>
            <marker id="sd-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(96,165,250,0.75)" />
            </marker>
          </defs>
          {state.edges.map((edge) => {
            const from = state.nodes.find((n) => n.id === edge.fromNodeId)
            const to = state.nodes.find((n) => n.id === edge.toNodeId)
            if (!from || !to) return null
            const x1 = from.position.x + NODE_W / 2
            const y1 = from.position.y + NODE_H / 2
            const x2 = to.position.x + NODE_W / 2
            const y2 = to.position.y + NODE_H / 2
            const dx = x2 - x1
            const dy = y2 - y1
            const len = Math.sqrt(dx * dx + dy * dy) || 1
            const ux = dx / len
            const uy = dy / len
            const sx = x1 + ux * (NODE_W / 2 + 2)
            const sy = y1 + uy * (NODE_H / 2 + 2)
            const ex = x2 - ux * (NODE_W / 2 + 10)
            const ey = y2 - uy * (NODE_H / 2 + 10)
            return (
              <g key={edge.id}>
                <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="rgba(96,165,250,0.7)" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#sd-arrow)" />
                <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="transparent" strokeWidth="14" style={{ cursor: 'pointer' }} onClick={(e) => handleEdgeClick(e, edge.id)} />
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        {state.nodes.map((node) => {
          const color = COMPONENT_COLOR[node.type]
          const isSelected = selectedNodeId === node.id
          const isTarget = connectingFrom !== null && connectingFrom !== node.id
          return (
            <div
              key={node.id}
              className={`sysdesign-node${isSelected ? ' sysdesign-node-selected' : ''}${isTarget ? ' sysdesign-node-target' : ''}`}
              style={{
                left: node.position.x,
                top: node.position.y,
                width: NODE_W,
                height: NODE_H,
                borderColor: isSelected ? '#f8fafc' : color,
                boxShadow: isSelected ? `0 0 0 2px ${color}` : undefined,
              }}
              onPointerDown={(e) => startNodeDrag(e, node)}
              onClick={(e) => handleNodeClick(e, node.id)}
            >
              <span className="sysdesign-node-icon" style={{ color }}>{COMPONENT_ICON[node.type]}</span>
              <span className="sysdesign-node-label">{COMPONENT_LABELS[node.type]}</span>
              {isSelected && !connectingFrom && (
                <div className="sysdesign-node-btns">
                  <button
                    type="button"
                    className="sysdesign-node-btn"
                    title="Connect to another node"
                    onClick={(e) => { e.stopPropagation(); setConnectingFrom(node.id) }}
                  >→</button>
                  <button
                    type="button"
                    className="sysdesign-node-btn sysdesign-node-btn-del"
                    title="Delete node"
                    onClick={(e) => handleDeleteNode(e, node.id)}
                  >×</button>
                </div>
              )}
            </div>
          )
        })}

        {/* Ghost during palette drag */}
        {ghostPos && (
          <div
            className="sysdesign-node sysdesign-node-ghost"
            style={{ left: ghostPos.x, top: ghostPos.y, width: NODE_W, height: NODE_H, borderColor: COMPONENT_COLOR[ghostPos.type], pointerEvents: 'none' }}
          >
            <span className="sysdesign-node-icon" style={{ color: COMPONENT_COLOR[ghostPos.type] }}>{COMPONENT_ICON[ghostPos.type]}</span>
            <span className="sysdesign-node-label">{COMPONENT_LABELS[ghostPos.type]}</span>
          </div>
        )}

        {connectingFrom && (
          <div className="sysdesign-connect-hint">Click a target node to connect · Esc to cancel</div>
        )}
      </div>
    </div>
  )
}
