import { Fragment, useEffect, useRef, useState, type CSSProperties, type DragEvent } from 'react'
import { createPortal } from 'react-dom'
import type { OrderItemsQuestionMeta } from '../quiz/QuizQuestionManager'

const ORDER_MARKER_REVEAL_DELAY_MS = 3000

interface QuizPanelQuestionOrderProps {
  questionId: string
  orderItems: OrderItemsQuestionMeta
  acceptedOrders?: number[][]
  quizAnswerResult: 'correct' | 'incorrect' | null
  savedOrderIndices?: number[] | null
  onOrderChange?: (orderedIndices: number[]) => void
  onSubmitOrder: (orderedIndices: number[], options?: { isSkip?: boolean }) => void
  availableSkips: number
}

function shuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, index) => index)

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const temp = indices[index]
    indices[index] = indices[swapIndex]
    indices[swapIndex] = temp
  }

  return indices
}

function isValidSavedOrderIndices(savedOrderIndices: number[] | null | undefined, itemCount: number): savedOrderIndices is number[] {
  if (!Array.isArray(savedOrderIndices) || savedOrderIndices.length !== itemCount) {
    return false
  }

  return (
    savedOrderIndices.every(
      (index) => typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < itemCount,
    ) && new Set(savedOrderIndices).size === itemCount
  )
}

function isValidOrderPermutation(order: number[], itemCount: number): boolean {
  if (!Array.isArray(order) || order.length !== itemCount) {
    return false
  }

  return (
    order.every((index) => typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < itemCount) &&
    new Set(order).size === itemCount
  )
}

function getAcceptedOrders(orderItems: OrderItemsQuestionMeta): number[][] {
  const itemCount = orderItems.items.length
  const candidateValidOrders = Array.isArray(orderItems.validOrders)
    ? orderItems.validOrders.filter((candidateOrder) => isValidOrderPermutation(candidateOrder, itemCount))
    : []

  if (candidateValidOrders.length > 0) {
    return candidateValidOrders
  }

  if (isValidOrderPermutation(orderItems.correctOrder, itemCount)) {
    return [orderItems.correctOrder]
  }

  return []
}

function isOrderAccepted(orderedQueueIndices: number[], acceptedOrders: number[][]): boolean {
  return acceptedOrders.some(
    (candidateOrder) =>
      orderedQueueIndices.length === candidateOrder.length &&
      orderedQueueIndices.every((value, index) => value === candidateOrder[index]),
  )
}

export function QuizPanelQuestionOrder({
  questionId,
  orderItems,
  acceptedOrders,
  quizAnswerResult,
  savedOrderIndices,
  onOrderChange,
  onSubmitOrder,
  availableSkips,
}: QuizPanelQuestionOrderProps) {
  const [orderedQueueIndices, setOrderedQueueIndices] = useState<number[]>([])
  const [draggingQueueIndex, setDraggingQueueIndex] = useState<number | null>(null)
  const [dragOverSwapQueueIndex, setDragOverSwapQueueIndex] = useState<number | null>(null)
  const [dragOverInsertTargetIndex, setDragOverInsertTargetIndex] = useState<number | null>(null)
  const [dragOverCornerBin, setDragOverCornerBin] = useState<'top' | 'bottom' | null>(null)
  const [showOutOfSequenceMarkers, setShowOutOfSequenceMarkers] = useState(true)
  const [markerRevealProgress, setMarkerRevealProgress] = useState(1)
  const markerRevealTimeoutRef = useRef<number | null>(null)
  const markerRevealIntervalRef = useRef<number | null>(null)
  const suppressNextOrderChangeRef = useRef(false)

  const clearMarkerRevealTimers = () => {
    if (markerRevealTimeoutRef.current !== null) {
      window.clearTimeout(markerRevealTimeoutRef.current)
      markerRevealTimeoutRef.current = null
    }

    if (markerRevealIntervalRef.current !== null) {
      window.clearInterval(markerRevealIntervalRef.current)
      markerRevealIntervalRef.current = null
    }
  }

  const triggerMarkerRevealDelay = () => {
    clearMarkerRevealTimers()
    setShowOutOfSequenceMarkers(false)
    setMarkerRevealProgress(0)
    const startTime = performance.now()

    markerRevealIntervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startTime
      const nextProgress = Math.min(1, elapsed / ORDER_MARKER_REVEAL_DELAY_MS)
      setMarkerRevealProgress(nextProgress)
    }, 50)

    markerRevealTimeoutRef.current = window.setTimeout(() => {
      setMarkerRevealProgress(1)
      setShowOutOfSequenceMarkers(true)

      if (markerRevealIntervalRef.current !== null) {
        window.clearInterval(markerRevealIntervalRef.current)
        markerRevealIntervalRef.current = null
      }

      markerRevealTimeoutRef.current = null
    }, ORDER_MARKER_REVEAL_DELAY_MS)
  }

  useEffect(() => {
    suppressNextOrderChangeRef.current = true
    setDraggingQueueIndex(null)
    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(null)
    setDragOverCornerBin(null)
    setOrderedQueueIndices(
      isValidSavedOrderIndices(savedOrderIndices, orderItems.items.length)
        ? savedOrderIndices
        : shuffleIndices(orderItems.items.length),
    )
    clearMarkerRevealTimers()
    setMarkerRevealProgress(1)
    setShowOutOfSequenceMarkers(true)
  }, [questionId, orderItems.items.length, savedOrderIndices])

  useEffect(() => {
    if (!onOrderChange || orderedQueueIndices.length !== orderItems.items.length) {
      return
    }

    if (suppressNextOrderChangeRef.current) {
      suppressNextOrderChangeRef.current = false
      return
    }

    onOrderChange(orderedQueueIndices)
  }, [onOrderChange, orderItems.items.length, orderedQueueIndices])

  useEffect(() => {
    return () => {
      clearMarkerRevealTimers()
    }
  }, [])

  const moveOrderQueueItem = (fromIndex: number, toIndex: number) => {
    setOrderedQueueIndices((previous) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= previous.length ||
        toIndex >= previous.length ||
        fromIndex === toIndex
      ) {
        return previous
      }

      const next = [...previous]
      const [movedItem] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, movedItem)
      return next
    })
  }

  const swapOrderQueueItems = (indexA: number, indexB: number) => {
    setOrderedQueueIndices((previous) => {
      if (
        indexA < 0 ||
        indexB < 0 ||
        indexA >= previous.length ||
        indexB >= previous.length ||
        indexA === indexB
      ) {
        return previous
      }

      const next = [...previous]
      const temp = next[indexA]
      next[indexA] = next[indexB]
      next[indexB] = temp
      return next
    })
  }

  const handleOrderItemDragStart = (event: DragEvent<HTMLLIElement>, index: number) => {
    if (quizAnswerResult !== null) {
      event.preventDefault()
      return
    }

    setDraggingQueueIndex(index)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }

  const handleOrderItemDragEnter = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault()
    if (quizAnswerResult !== null || draggingQueueIndex === null) {
      return
    }
  }

  const handleOrderItemDragLeave = (event: DragEvent<HTMLLIElement>) => {
    // Only clear if leaving the item entirely (not entering a child)
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDragOverSwapQueueIndex(null)
      setDragOverInsertTargetIndex(null)
    }
  }

  const getDropIntent = (
    event: DragEvent<HTMLLIElement>,
    queueIndex: number,
    sourceQueueIndex: number,
  ): { mode: 'swap'; targetIndex: number } | { mode: 'insert'; targetIndex: number } | null => {
    const rect = event.currentTarget.getBoundingClientRect()
    const pointerY = event.clientY - rect.top
    const edgeThreshold = Math.max(12, rect.height * 0.25)

    if (pointerY <= edgeThreshold) {
      const insertTargetIndex = queueIndex
      if (insertTargetIndex === sourceQueueIndex || insertTargetIndex === sourceQueueIndex + 1) {
        return null
      }

      return {
        mode: 'insert',
        targetIndex: insertTargetIndex,
      }
    }

    if (pointerY >= rect.height - edgeThreshold) {
      const insertTargetIndex = queueIndex + 1
      if (insertTargetIndex === sourceQueueIndex || insertTargetIndex === sourceQueueIndex + 1) {
        return null
      }

      return {
        mode: 'insert',
        targetIndex: insertTargetIndex,
      }
    }

    if (queueIndex === sourceQueueIndex) {
      return null
    }

    return {
      mode: 'swap',
      targetIndex: queueIndex,
    }
  }

  const handleOrderItemDragOver = (event: DragEvent<HTMLLIElement>, queueIndex: number) => {
    event.preventDefault()

    if (quizAnswerResult !== null) {
      return
    }

    const rawSourceIndex = event.dataTransfer.getData('text/plain')
    const parsedSourceIndex = Number.parseInt(rawSourceIndex, 10)
    const sourceQueueIndex = Number.isNaN(parsedSourceIndex) ? draggingQueueIndex : parsedSourceIndex

    if (sourceQueueIndex === null) {
      return
    }

    const intent = getDropIntent(event, queueIndex, sourceQueueIndex)
    if (!intent) {
      setDragOverSwapQueueIndex(null)
      setDragOverInsertTargetIndex(null)
      return
    }

    if (intent.mode === 'swap') {
      setDragOverSwapQueueIndex(intent.targetIndex)
      setDragOverInsertTargetIndex(null)
      return
    }

    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(intent.targetIndex)
  }

  const handleOrderItemDrop = (event: DragEvent<HTMLLIElement>, index: number) => {
    event.preventDefault()
    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(null)
    if (quizAnswerResult !== null) {
      return
    }

    const rawSourceIndex = event.dataTransfer.getData('text/plain')
    const parsedSourceIndex = Number.parseInt(rawSourceIndex, 10)
    const fromIndex = Number.isNaN(parsedSourceIndex) ? draggingQueueIndex : parsedSourceIndex

    if (fromIndex === null) {
      return
    }

    const intent = getDropIntent(event, index, fromIndex)
    if (!intent) {
      setDraggingQueueIndex(null)
      return
    }

    if (intent.mode === 'swap') {
      swapOrderQueueItems(fromIndex, intent.targetIndex)
      triggerMarkerRevealDelay()
      setDraggingQueueIndex(null)
      return
    }

    const normalizedInsertTarget = fromIndex < intent.targetIndex
      ? intent.targetIndex - 1
      : intent.targetIndex

    moveOrderQueueItem(fromIndex, normalizedInsertTarget)
    triggerMarkerRevealDelay()
    setDraggingQueueIndex(null)
  }

  const handleInsertZoneDragOver = (event: DragEvent<HTMLDivElement>, insertTargetIndex: number) => {
    event.preventDefault()

    if (quizAnswerResult !== null) {
      return
    }

    const rawSourceIndex = event.dataTransfer.getData('text/plain')
    const parsedSourceIndex = Number.parseInt(rawSourceIndex, 10)
    const sourceQueueIndex = Number.isNaN(parsedSourceIndex) ? draggingQueueIndex : parsedSourceIndex

    if (sourceQueueIndex === null) {
      return
    }

    setDragOverCornerBin(null)

    if (insertTargetIndex === sourceQueueIndex || insertTargetIndex === sourceQueueIndex + 1) {
      setDragOverInsertTargetIndex(null)
      return
    }

    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(insertTargetIndex)
  }

  const handleInsertZoneDrop = (event: DragEvent<HTMLDivElement>, insertTargetIndex: number) => {
    event.preventDefault()
    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(null)
    setDragOverCornerBin(null)

    if (quizAnswerResult !== null) {
      return
    }

    const rawSourceIndex = event.dataTransfer.getData('text/plain')
    const parsedSourceIndex = Number.parseInt(rawSourceIndex, 10)
    const fromIndex = Number.isNaN(parsedSourceIndex) ? draggingQueueIndex : parsedSourceIndex

    if (fromIndex === null) {
      return
    }

    if (insertTargetIndex === fromIndex || insertTargetIndex === fromIndex + 1) {
      setDraggingQueueIndex(null)
      return
    }

    const normalizedInsertTarget = fromIndex < insertTargetIndex
      ? insertTargetIndex - 1
      : insertTargetIndex

    moveOrderQueueItem(fromIndex, normalizedInsertTarget)
    triggerMarkerRevealDelay()
    setDraggingQueueIndex(null)
  }

  const handleCornerBinDragOver = (event: DragEvent<HTMLDivElement>, target: 'top' | 'bottom') => {
    event.preventDefault()

    if (quizAnswerResult !== null || draggingQueueIndex === null) {
      return
    }

    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(null)
    setDragOverCornerBin(target)
  }

  const handleCornerBinDrop = (event: DragEvent<HTMLDivElement>, target: 'top' | 'bottom') => {
    event.preventDefault()
    setDragOverSwapQueueIndex(null)
    setDragOverInsertTargetIndex(null)
    setDragOverCornerBin(null)

    if (quizAnswerResult !== null) {
      return
    }

    const rawSourceIndex = event.dataTransfer.getData('text/plain')
    const parsedSourceIndex = Number.parseInt(rawSourceIndex, 10)
    const fromIndex = Number.isNaN(parsedSourceIndex) ? draggingQueueIndex : parsedSourceIndex

    if (fromIndex === null) {
      return
    }

    const targetIndex = target === 'top' ? 0 : orderedQueueIndices.length - 1
    moveOrderQueueItem(fromIndex, targetIndex)
    triggerMarkerRevealDelay()
    setDraggingQueueIndex(null)
  }

  const isInsertBeforeQueueIndex = (queueIndex: number): boolean => {
    return draggingQueueIndex !== null && dragOverInsertTargetIndex === queueIndex
  }

  const isInsertAfterQueueIndex = (queueIndex: number): boolean => {
    return draggingQueueIndex !== null && dragOverInsertTargetIndex === queueIndex + 1
  }

  const handleSubmitOrderItems = () => {
    if (quizAnswerResult !== null) {
      return
    }

    onSubmitOrder(orderedQueueIndices, { isSkip: false })
  }

  const activeAcceptedOrders =
    Array.isArray(acceptedOrders) && acceptedOrders.length > 0
      ? acceptedOrders
      : getAcceptedOrders(orderItems)
  const isOrderCorrect = isOrderAccepted(orderedQueueIndices, activeAcceptedOrders)

  const shouldShowCornerBins = draggingQueueIndex !== null && quizAnswerResult === null
  const cornerBins = shouldShowCornerBins ? (
    <div className="quiz-order-corner-bins" aria-hidden="true">
      <div
        className={[
          'quiz-order-corner-bin',
          'quiz-order-corner-bin-top',
          dragOverCornerBin === 'top' ? 'quiz-order-corner-bin-active' : '',
        ].filter(Boolean).join(' ')}
        onDragOver={(event) => handleCornerBinDragOver(event, 'top')}
        onDragLeave={() => {
          setDragOverCornerBin((previous) => (previous === 'top' ? null : previous))
        }}
        onDrop={(event) => handleCornerBinDrop(event, 'top')}
      >
        Move to top
      </div>
      <div
        className={[
          'quiz-order-corner-bin',
          'quiz-order-corner-bin-bottom',
          dragOverCornerBin === 'bottom' ? 'quiz-order-corner-bin-active' : '',
        ].filter(Boolean).join(' ')}
        onDragOver={(event) => handleCornerBinDragOver(event, 'bottom')}
        onDragLeave={() => {
          setDragOverCornerBin((previous) => (previous === 'bottom' ? null : previous))
        }}
        onDrop={(event) => handleCornerBinDrop(event, 'bottom')}
      >
        Move to bottom
      </div>
    </div>
  ) : null

  return (
    <div className="quiz-order-items">
      {cornerBins && typeof document !== 'undefined' ? createPortal(cornerBins, document.body) : null}
      <p className="quiz-code-preview-note">
        {orderItems.helperText ?? 'Drag items into your final order, then submit.'}
      </p>
      {!showOutOfSequenceMarkers && quizAnswerResult === null ? (
        <div className="quiz-order-delay-indicator" aria-label="Waiting before showing incorrect markers">
          <div className="quiz-order-delay-bar">
            <div
              className="quiz-order-delay-bar-fill"
              style={{ width: `${Math.round(markerRevealProgress * 100)}%` }}
            />
          </div>
        </div>
      ) : null}
      <ol className="quiz-order-items-list">
        <li className="quiz-order-insert-zone-row" aria-hidden="true">
          <div
            className={[
              'quiz-order-insert-zone',
              draggingQueueIndex !== null && dragOverInsertTargetIndex === 0 ? 'quiz-order-insert-zone-active' : '',
            ].filter(Boolean).join(' ')}
            onDragOver={(event) => handleInsertZoneDragOver(event, 0)}
            onDrop={(event) => handleInsertZoneDrop(event, 0)}
          />
        </li>
        {orderedQueueIndices.map((itemIndex, queueIndex) => {
          const isOutOfSequence = !activeAcceptedOrders.some(
            (candidateOrder) => queueIndex < candidateOrder.length && itemIndex === candidateOrder[queueIndex],
          )
          const shouldShowLoadingMarker = !showOutOfSequenceMarkers && quizAnswerResult === null

          return (
            <Fragment key={`${questionId}-order-row-${itemIndex}`}>
              <li
                className={[
                  'quiz-order-item',
                  draggingQueueIndex === queueIndex ? 'quiz-order-item-dragging' : '',
                  dragOverSwapQueueIndex === queueIndex ? 'quiz-order-item-drop-target-swap' : '',
                  isInsertBeforeQueueIndex(queueIndex) ? 'quiz-order-item-drop-target-insert-before' : '',
                  isInsertAfterQueueIndex(queueIndex) ? 'quiz-order-item-drop-target-insert-after' : '',
                ].filter(Boolean).join(' ')}
                draggable={quizAnswerResult === null}
                onDragStart={(event) => handleOrderItemDragStart(event, queueIndex)}
                onDragEnd={() => {
                  setDraggingQueueIndex(null)
                  setDragOverSwapQueueIndex(null)
                  setDragOverInsertTargetIndex(null)
                  setDragOverCornerBin(null)
                }}
                onDragEnter={handleOrderItemDragEnter}
                onDragLeave={handleOrderItemDragLeave}
                onDragOver={(event) => handleOrderItemDragOver(event, queueIndex)}
                onDrop={(event) => handleOrderItemDrop(event, queueIndex)}
              >
                <span className="quiz-order-item-rank">{queueIndex + 1}</span>
                <span className="quiz-order-item-text">{orderItems.items[itemIndex]}</span>
                {shouldShowLoadingMarker ? (
                  <span
                    className="quiz-order-item-out-of-sequence-loading"
                    style={{ '--progress': `${markerRevealProgress}` } as CSSProperties}
                    aria-label="Out-of-sequence marker reloading"
                  />
                ) : showOutOfSequenceMarkers && isOutOfSequence ? (
                  <span className="quiz-order-item-out-of-sequence" aria-label="Out of sequence">
                    x
                  </span>
                ) : null}
                <div className="quiz-order-item-actions">
                  <button
                    type="button"
                    className="quiz-order-move"
                    disabled={quizAnswerResult !== null || queueIndex === 0}
                    onClick={() => {
                      moveOrderQueueItem(queueIndex, queueIndex - 1)
                      triggerMarkerRevealDelay()
                    }}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="quiz-order-move"
                    disabled={quizAnswerResult !== null || queueIndex === orderedQueueIndices.length - 1}
                    onClick={() => {
                      moveOrderQueueItem(queueIndex, queueIndex + 1)
                      triggerMarkerRevealDelay()
                    }}
                  >
                    Down
                  </button>
                </div>
              </li>
              <li key={`${questionId}-insert-zone-${queueIndex + 1}`} className="quiz-order-insert-zone-row" aria-hidden="true">
                <div
                  className={[
                    'quiz-order-insert-zone',
                    draggingQueueIndex !== null && dragOverInsertTargetIndex === queueIndex + 1
                      ? 'quiz-order-insert-zone-active'
                      : '',
                  ].filter(Boolean).join(' ')}
                  onDragOver={(event) => handleInsertZoneDragOver(event, queueIndex + 1)}
                  onDrop={(event) => handleInsertZoneDrop(event, queueIndex + 1)}
                />
              </li>
            </Fragment>
          )
        })}
      </ol>
      <div className="quiz-raw-actions">
        <button
          type="button"
          className="quiz-raw-button"
          disabled={quizAnswerResult !== null || orderedQueueIndices.length === 0 || !isOrderCorrect}
          onClick={handleSubmitOrderItems}
        >
          Submit Correct Answer
        </button>
        <button
          type="button"
          className="quiz-raw-button"
          disabled={quizAnswerResult !== null || orderedQueueIndices.length === 0 || availableSkips <= 0}
          onClick={() => onSubmitOrder(orderedQueueIndices, { isSkip: true })}
        >
          Submit Early (Spend 1 Skip)
        </button>
      </div>
    </div>
  )
}
