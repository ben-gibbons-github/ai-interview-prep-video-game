import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DailyActivityStats, HighScoreEntry } from '../Player/GameSaving'
import type { RunQuestionDifficultyBreakdown } from '../WaveManager'
import { HighScoreBoard } from './HighScoreBoard'
import { DailyActivityCalendar } from './DailyActivityCalendar'
import { DailyRankBubble } from './DailyRankBubble'

type MainMenuSubmenu = 'actions' | 'scores' | 'activity'

interface MainMenuButtonProps {
  onExploreQuestions: () => void
  onOpenFocusDialog: () => void
  onOpenStarVoiceProgressDialog: () => void
  onResetGame: () => void
  isGamePaused: boolean
  onTogglePause: () => void
  currentScore: number
  currentRound: number
  enemyKills: number
  roundsCleared: number
  currentQuizTotalAnswered: number
  currentQuizAnsweredByDifficulty: RunQuestionDifficultyBreakdown
  priorityQueueCount: number
  priorityQueueSummaries: string[]
  dailyActivityStats: DailyActivityStats
  highScoreEntries: HighScoreEntry[]
}

interface PriorityPopoverPosition {
  top: number
  left: number
}

export function MainMenuButton({
  onExploreQuestions,
  onOpenFocusDialog,
  onOpenStarVoiceProgressDialog,
  onResetGame,
  isGamePaused,
  onTogglePause,
  currentScore,
  currentRound,
  enemyKills,
  roundsCleared,
  currentQuizTotalAnswered,
  currentQuizAnsweredByDifficulty,
  priorityQueueCount,
  priorityQueueSummaries,
  dailyActivityStats,
  highScoreEntries,
}: MainMenuButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<MainMenuSubmenu>('actions')
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [priorityPopoverPinned, setPriorityPopoverPinned] = useState(false)
  const [priorityPopoverHover, setPriorityPopoverHover] = useState(false)
  const [priorityPopoverPosition, setPriorityPopoverPosition] = useState<PriorityPopoverPosition | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const priorityTriggerRef = useRef<HTMLButtonElement | null>(null)
  const priorityPopoverRef = useRef<HTMLDivElement | null>(null)
  const priorityPopoverVisible = priorityQueueCount > 0 && (priorityPopoverPinned || priorityPopoverHover)
  const priorityPopoverRoot = typeof document !== 'undefined' ? document.body : null
  const hiddenQueueCount = Math.max(0, priorityQueueCount - priorityQueueSummaries.length)

  const priorityPopoverRows = useMemo(() => {
    const rows = [...priorityQueueSummaries]
    if (hiddenQueueCount > 0) {
      rows.push(`+${hiddenQueueCount} more`)
    }
    return rows
  }, [hiddenQueueCount, priorityQueueSummaries])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const onWindowPointerDown = (event: MouseEvent) => {
      if (!menuRef.current) {
        return
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
        setActiveSubmenu('actions')
        setConfirmingReset(false)
      }
    }

    window.addEventListener('mousedown', onWindowPointerDown)
    return () => {
      window.removeEventListener('mousedown', onWindowPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!priorityPopoverVisible) {
      return
    }

    const updatePosition = () => {
      const trigger = priorityTriggerRef.current
      if (!trigger) {
        return
      }

      const rect = trigger.getBoundingClientRect()
      const viewportPadding = 12
      const desiredWidth = Math.min(320, Math.floor(window.innerWidth * 0.72))
      const left = Math.min(
        window.innerWidth - desiredWidth - viewportPadding,
        rect.right - desiredWidth,
      )

      setPriorityPopoverPosition({
        top: Math.max(viewportPadding, rect.bottom + 8),
        left: Math.max(viewportPadding, left),
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [priorityPopoverVisible])

  useEffect(() => {
    if (!priorityPopoverPinned) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (priorityTriggerRef.current?.contains(target)) {
        return
      }
      if (priorityPopoverRef.current?.contains(target)) {
        return
      }
      setPriorityPopoverPinned(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPriorityPopoverPinned(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [priorityPopoverPinned])

  return (
    <div className="main-menu" ref={menuRef}>
      <div className="main-menu-head">
        <div className="main-menu-controls">
          <button
            type="button"
            className={isGamePaused ? 'pause-menu-trigger pause-menu-trigger-active' : 'pause-menu-trigger'}
            onClick={onTogglePause}
            aria-pressed={isGamePaused}
            aria-label={isGamePaused ? 'Resume game' : 'Pause game'}
          >
            {isGamePaused ? 'Resume' : 'Pause'}
          </button>

          {priorityQueueCount > 0 ? (
            <button
              ref={priorityTriggerRef}
              type="button"
              className={priorityPopoverVisible ? 'priority-queue-trigger priority-queue-trigger-active' : 'priority-queue-trigger'}
              aria-label={`Priority queue: ${priorityQueueCount} queued questions`}
              aria-expanded={priorityPopoverVisible}
              onMouseEnter={() => setPriorityPopoverHover(true)}
              onMouseLeave={() => setPriorityPopoverHover(false)}
              onFocus={() => setPriorityPopoverHover(true)}
              onBlur={() => setPriorityPopoverHover(false)}
              onClick={() => {
                setPriorityPopoverPinned((previous) => !previous)
              }}
            >
              <span className="priority-queue-trigger-icon" aria-hidden="true">!</span>
              <span className="priority-queue-trigger-count" aria-hidden="true">{priorityQueueCount}</span>
            </button>
          ) : null}

          <button
            type="button"
            className="main-menu-trigger"
            onClick={() => {
              setMenuOpen((open) => {
                const nextOpen = !open
                if (nextOpen) {
                  setActiveSubmenu('actions')
                } else {
                  setConfirmingReset(false)
                }
                return nextOpen
              })
            }}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open main menu"
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <div className="main-menu-dropdown" role="dialog" aria-label="Main menu">
            <div className="main-menu-submenu-tabs" role="tablist" aria-label="Main menu sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeSubmenu === 'actions'}
                className={
                  activeSubmenu === 'actions' ? 'main-menu-submenu-tab main-menu-submenu-tab-active' : 'main-menu-submenu-tab'
                }
                onClick={() => setActiveSubmenu('actions')}
              >
                Actions
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeSubmenu === 'scores'}
                className={
                  activeSubmenu === 'scores' ? 'main-menu-submenu-tab main-menu-submenu-tab-active' : 'main-menu-submenu-tab'
                }
                onClick={() => setActiveSubmenu('scores')}
              >
                Scores
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeSubmenu === 'activity'}
                className={
                  activeSubmenu === 'activity' ? 'main-menu-submenu-tab main-menu-submenu-tab-active' : 'main-menu-submenu-tab'
                }
                onClick={() => setActiveSubmenu('activity')}
              >
                Activity
              </button>
            </div>

            <div className="main-menu-submenu-panel">
              {activeSubmenu === 'actions' ? (
                <div className="main-menu-section-actions">
                  <button
                    type="button"
                    className="main-menu-item"
                    onClick={() => {
                      onExploreQuestions()
                      setMenuOpen(false)
                      setActiveSubmenu('actions')
                      setConfirmingReset(false)
                    }}
                  >
                    Explore questions
                  </button>
                  <button
                    type="button"
                    className="main-menu-item"
                    onClick={() => {
                      onOpenFocusDialog()
                      setMenuOpen(false)
                      setActiveSubmenu('actions')
                      setConfirmingReset(false)
                    }}
                  >
                    Focus dialog
                  </button>
                  <button
                    type="button"
                    className="main-menu-item"
                    onClick={() => {
                      onOpenStarVoiceProgressDialog()
                      setMenuOpen(false)
                      setActiveSubmenu('actions')
                      setConfirmingReset(false)
                    }}
                  >
                    Star voice progress
                  </button>
                  {!confirmingReset ? (
                    <button
                      type="button"
                      className="main-menu-item"
                      onClick={() => {
                        setConfirmingReset(true)
                      }}
                    >
                      Reset game
                    </button>
                  ) : (
                    <div className="main-menu-reset-confirm" role="alertdialog" aria-live="polite" aria-label="Reset game confirmation">
                      <p className="main-menu-reset-confirm-text">Are you sure?</p>
                      <div className="main-menu-reset-confirm-actions">
                        <button
                          type="button"
                          className="main-menu-reset-confirm-button main-menu-reset-confirm-yes"
                          onClick={() => {
                            onResetGame()
                            setMenuOpen(false)
                            setActiveSubmenu('actions')
                            setConfirmingReset(false)
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="main-menu-reset-confirm-button"
                          onClick={() => {
                            setConfirmingReset(false)
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {activeSubmenu === 'scores' ? (
                <div className="main-menu-scoreboard">
                  <HighScoreBoard
                    currentScore={currentScore}
                    currentRound={currentRound}
                    enemyKills={enemyKills}
                    roundsCleared={roundsCleared}
                    currentQuizTotalAnswered={currentQuizTotalAnswered}
                    currentQuizAnsweredByDifficulty={currentQuizAnsweredByDifficulty}
                    entries={highScoreEntries}
                  />
                </div>
              ) : null}

              {activeSubmenu === 'activity' ? (
                <div className="main-menu-scoreboard">
                  <DailyActivityCalendar stats={dailyActivityStats} />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <DailyRankBubble stats={dailyActivityStats} />

      {priorityPopoverVisible && priorityPopoverPosition && priorityPopoverRoot
        ? createPortal(
            <div
              ref={priorityPopoverRef}
              className="priority-queue-popover"
              role="dialog"
              aria-label="Priority queue"
              style={{
                top: `${priorityPopoverPosition.top}px`,
                left: `${priorityPopoverPosition.left}px`,
              }}
              onMouseEnter={() => setPriorityPopoverHover(true)}
              onMouseLeave={() => setPriorityPopoverHover(false)}
            >
              <strong>Priority queue: {priorityQueueCount}</strong>
              {priorityPopoverRows.map((summary, index) => (
                <span key={`${summary}-${index}`}>{summary}</span>
              ))}
            </div>,
            priorityPopoverRoot,
          )
        : null}
    </div>
  )
}
