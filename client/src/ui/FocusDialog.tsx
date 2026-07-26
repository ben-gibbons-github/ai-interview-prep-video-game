import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getDefaultQuizFocusFilters, type QuizFocusFilters } from '../quiz/QuizQuestionManager'

interface FocusDialogProps {
  initialFilters: QuizFocusFilters
  onConfirm: (filters: QuizFocusFilters) => void
}

type BaseFocusKey = Exclude<keyof QuizFocusFilters, 'advanced'>
type AdvancedGroupKey = keyof QuizFocusFilters['advanced']
type PopoverPosition = {
  top: number
  left: number
  maxHeight: number
}

const FOCUS_OPTIONS: Array<{
  key: BaseFocusKey
  label: string
  description: string
  advancedGroup?: AdvancedGroupKey
}> = [
  {
    key: 'micOnlyMode',
    label: 'Mic only mode',
    description: 'Forces transcription-only gameplay with voice-first flow.',
  },
  {
    key: 'systemDesign',
    label: 'System design',
    description: 'Architecture, scaling, and tradeoff design prompts.',
    advancedGroup: 'systemDesignTopics',
  },
  {
    key: 'rawCode',
    label: 'Raw code',
    description: 'Write and run code solutions against tests.',
    advancedGroup: 'rawCodeSources',
  },
  {
    key: 'starStories',
    label: 'STAR stories',
    description: 'Uploaded STAR story matching, ordering, and title questions.',
    advancedGroup: 'starStoriesTopics',
  },
  {
    key: 'starVoice',
    label: 'STAR voice (transcription questions)',
    description: 'Mic-based STAR story recitation and transcript grading.',
    advancedGroup: 'starVoiceTopics',
  },
  {
    key: 'multipleChoice',
    label: 'Multiple choice',
    description: 'Core concept and tradeoff selection questions.',
    advancedGroup: 'multipleChoiceTopics',
  },
  {
    key: 'validList',
    label: 'Valid-list',
    description: 'Select all valid items from a candidate list.',
    advancedGroup: 'validListTopics',
  },
  {
    key: 'orderItems',
    label: 'Ordering',
    description: 'Reorder steps or snippets into the correct sequence.',
    advancedGroup: 'orderItemsTopics',
  },
  {
    key: 'capacity',
    label: 'Capacity estimation',
    description: 'Back-of-the-envelope sizing and target estimates.',
    advancedGroup: 'capacityTopics',
  },
]

const ADVANCED_RAW_CODE_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['rawCodeSources']
  label: string
  description: string
}> = [
  {
    key: 'LiveCodeStyle',
    label: 'LiveCode-style',
    description: 'General algorithm/data-structure coding problems.',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    description: 'UI/browser coding tasks and client-side patterns.',
  },
  {
    key: 'backend',
    label: 'Backend',
    description: 'Server, API, and data-processing coding tasks.',
  },
  {
    key: 'javascript',
    label: 'JavaScript',
    description: 'Language-focused JavaScript coding problems.',
  },
  {
    key: 'python',
    label: 'Python',
    description: 'Language-focused Python coding problems.',
  },
  {
    key: 'ai',
    label: 'AI',
    description: 'AI/ML-flavored coding scenarios.',
  },
  {
    key: 'react',
    label: 'React',
    description: 'Component and state-management coding tasks.',
  },
]

const ADVANCED_RAW_CODE_LiveCode_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['rawCodeLiveCodeTopics']
  label: string
  description: string
}> = [
  {
    key: 'arraysStrings',
    label: 'Arrays & strings',
    description: 'Array, string, matrix, and interval-heavy LiveCode prompts.',
  },
  {
    key: 'hashing',
    label: 'Hashing/maps/sets',
    description: 'Hash map, hash set, anagram, and prefix-frequency patterns.',
  },
  {
    key: 'twoPointers',
    label: 'Two pointers',
    description: 'Two-pointer scans and partition style problems.',
  },
  {
    key: 'slidingWindow',
    label: 'Sliding window',
    description: 'Fixed and variable window substring/array patterns.',
  },
  {
    key: 'stackQueue',
    label: 'Stack & queue',
    description: 'Monotonic stack/queue, RPN, and stack-driven traversal.',
  },
  {
    key: 'binarySearch',
    label: 'Binary search',
    description: 'Classic and rotated/bounds binary search problems.',
  },
  {
    key: 'treesGraphs',
    label: 'Trees/graphs (DFS/BFS)',
    description: 'Traversal, connected components, shortest path, and DAG flow.',
  },
  {
    key: 'dynamicProgramming',
    label: 'Dynamic programming',
    description: 'State-transition and optimization DP problems.',
  },
  {
    key: 'heapGreedy',
    label: 'Heap & greedy',
    description: 'Priority queues, top-k, and greedy optimization patterns.',
  },
  {
    key: 'backtracking',
    label: 'Backtracking & trie',
    description: 'Recursive search, pruning, and trie-driven branching.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'Everything not matched by the above subtype buckets.',
  },
]

const ADVANCED_MULTIPLE_CHOICE_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['multipleChoiceTopics']
  label: string
  description: string
}> = [
  {
    key: 'algorithms',
    label: 'Algorithms',
    description: 'Complexity, DS&A, and algorithm strategy questions.',
  },
  {
    key: 'api',
    label: 'API design',
    description: 'REST/gRPC, contracts, versioning, idempotency.',
  },
  {
    key: 'distributedSystems',
    label: 'Distributed systems',
    description: 'Scaling, consistency, reliability, and latency tradeoffs.',
  },
  {
    key: 'behavioral',
    label: 'Behavioral',
    description: 'Communication, collaboration, and interview soft-skill prompts.',
  },
  {
    key: 'cleanCode',
    label: 'Clean code',
    description: 'Maintainability, readability, and code quality decisions.',
  },
  {
    key: 'codingPatterns',
    label: 'Coding patterns',
    description: 'Common engineering patterns and refactoring choices.',
  },
  {
    key: 'leadership',
    label: 'Leadership/CTO',
    description: 'Technical leadership and high-level decision prompts.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'Everything else not matched by a specific topic bucket.',
  },
]

const ADVANCED_VALID_LIST_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['validListTopics']
  label: string
  description: string
}> = [
  {
    key: 'reliability',
    label: 'Reliability/Incidents',
    description: 'Fault handling, incident response, and reliability checks.',
  },
  {
    key: 'apiData',
    label: 'API/Data rules',
    description: 'Contracts, schema validation, caching, and data correctness.',
  },
  {
    key: 'distributedSystems',
    label: 'Distributed systems',
    description: 'Cross-service behavior, scaling, and consistency constraints.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'Everything else not matched by a specific valid-list bucket.',
  },
]

const ADVANCED_ORDER_ITEMS_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['orderItemsTopics']
  label: string
  description: string
}> = [
  {
    key: 'incidentRelease',
    label: 'Incident/Release flow',
    description: 'Operational response and release sequencing scenarios.',
  },
  {
    key: 'architectureFlow',
    label: 'Architecture flow',
    description: 'Migration, failover, saga, and API orchestration sequences.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'Other ordering questions outside the primary buckets.',
  },
]

const ADVANCED_CAPACITY_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['capacityTopics']
  label: string
  description: string
}> = [
  {
    key: 'throughput',
    label: 'Throughput',
    description: 'QPS/RPS style workload and request volume estimates.',
  },
  {
    key: 'storage',
    label: 'Storage',
    description: 'Data size growth and retention capacity calculations.',
  },
  {
    key: 'compute',
    label: 'Compute',
    description: 'CPU/core planning and compute envelope estimates.',
  },
  {
    key: 'networking',
    label: 'Networking',
    description: 'Bandwidth and network transfer sizing questions.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'Capacity questions outside the specific sizing buckets.',
  },
]

const ADVANCED_SYSTEM_DESIGN_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['systemDesignTopics']
  label: string
  description: string
}> = [
  {
    key: 'backendArchitecture',
    label: 'Backend architecture',
    description: 'Services, APIs, databases, and high-level component design.',
  },
  {
    key: 'dataConsistency',
    label: 'Data consistency',
    description: 'Replication, consensus, and consistency tradeoffs.',
  },
  {
    key: 'reliability',
    label: 'Reliability',
    description: 'Fault tolerance, resilience, and recovery architecture.',
  },
  {
    key: 'performance',
    label: 'Performance',
    description: 'Latency, throughput, and scaling performance decisions.',
  },
  {
    key: 'other',
    label: 'Other',
    description: 'System design topics outside the major architecture buckets.',
  },
]

const ADVANCED_STAR_STORIES_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['starStoriesTopics']
  label: string
  description: string
}> = [
  {
    key: 'matching',
    label: 'Story matching',
    description: 'Match question prompts to the correct STAR stories.',
  },
  {
    key: 'title',
    label: 'Story title',
    description: 'Identify the best STAR story title from clues.',
  },
  {
    key: 'orderingSection',
    label: 'Section ordering',
    description: 'Order STAR sections (S/T/A/R) in the right sequence.',
  },
  {
    key: 'orderingDual',
    label: 'Dual ordering',
    description: 'Order mixed snippets from two STAR stories.',
  },
  {
    key: 'orderingQuad',
    label: 'Quad ordering',
    description: 'Order mixed snippets from four STAR stories.',
  },
  {
    key: 'orderingFull',
    label: 'Full ordering',
    description: 'Order complete detailed STAR story timelines.',
  },
]

const ADVANCED_STAR_VOICE_OPTIONS: Array<{
  key: keyof QuizFocusFilters['advanced']['starVoiceTopics']
  label: string
  description: string
}> = [
  {
    key: 'easy',
    label: 'Easy',
    description: 'Lower-complexity STAR voice prompts.',
  },
  {
    key: 'medium',
    label: 'Medium',
    description: 'Medium-complexity STAR voice prompts.',
  },
  {
    key: 'hard',
    label: 'Hard',
    description: 'Hard STAR voice prompts and stricter transcription checks.',
  },
]

export function FocusDialog({
  initialFilters,
  onConfirm,
}: FocusDialogProps) {
  const [filters, setFilters] = useState<QuizFocusFilters>(initialFilters)
  const [openPopover, setOpenPopover] = useState<BaseFocusKey | null>(null)
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition | null>(null)
  const buttonRefs = useRef<Partial<Record<BaseFocusKey, HTMLButtonElement | null>>>({})
  const micOnlyModeEnabled = filters.micOnlyMode

  const selectedCount = useMemo(() => {
    return FOCUS_OPTIONS.reduce((count, option) => count + (filters[option.key] ? 1 : 0), 0)
  }, [filters])

  const selectedAdvancedCount = useMemo(() => {
    return {
      rawCodeSources: Object.values(filters.advanced.rawCodeSources).filter(Boolean).length,
      rawCodeLiveCodeTopics: Object.values(filters.advanced.rawCodeLiveCodeTopics).filter(Boolean).length,
      multipleChoiceTopics: Object.values(filters.advanced.multipleChoiceTopics).filter(Boolean).length,
      validListTopics: Object.values(filters.advanced.validListTopics).filter(Boolean).length,
      orderItemsTopics: Object.values(filters.advanced.orderItemsTopics).filter(Boolean).length,
      capacityTopics: Object.values(filters.advanced.capacityTopics).filter(Boolean).length,
      systemDesignTopics: Object.values(filters.advanced.systemDesignTopics).filter(Boolean).length,
      starStoriesTopics: Object.values(filters.advanced.starStoriesTopics).filter(Boolean).length,
      starVoiceTopics: Object.values(filters.advanced.starVoiceTopics).filter(Boolean).length,
    }
  }, [filters])

  const selectedAdvancedTotal = useMemo(() => {
    return Object.values(selectedAdvancedCount).reduce((total, value) => total + value, 0)
  }, [selectedAdvancedCount])

  useEffect(() => {
    if (!openPopover) {
      setPopoverPosition(null)
      return
    }

    const updatePopoverPosition = () => {
      const trigger = buttonRefs.current[openPopover]

      if (!trigger) {
        return
      }

      const rect = trigger.getBoundingClientRect()
      const viewportPadding = 16
      const desiredWidth = Math.min(440, Math.floor(window.innerWidth * 0.76))
      const left = Math.min(rect.left, window.innerWidth - desiredWidth - viewportPadding)
      const top = rect.bottom + 8
      const maxHeight = Math.max(180, window.innerHeight - top - viewportPadding)

      setPopoverPosition({
        top: Math.max(viewportPadding, top),
        left: Math.max(viewportPadding, left),
        maxHeight,
      })
    }

    updatePopoverPosition()
    window.addEventListener('resize', updatePopoverPosition)
    window.addEventListener('scroll', updatePopoverPosition, true)

    return () => {
      window.removeEventListener('resize', updatePopoverPosition)
      window.removeEventListener('scroll', updatePopoverPosition, true)
    }
  }, [openPopover])

  const renderAdvancedOptions = <K extends AdvancedGroupKey>(
    group: K,
    options: Array<{ key: keyof QuizFocusFilters['advanced'][K]; label: string; description: string }>,
    disabled: boolean,
  ) => {
    return (
      <div className="focus-dialog-popover-list">
        {options.map((option) => (
          <label
            key={String(option.key)}
            className="focus-dialog-suboption"
            title={option.description}
          >
            <input
              type="checkbox"
              checked={Boolean(filters.advanced[group][option.key])}
              disabled={disabled}
              onChange={(event) => {
                const checked = event.target.checked
                setFilters((previous) => ({
                  ...previous,
                  advanced: {
                    ...previous.advanced,
                    [group]: {
                      ...previous.advanced[group],
                      [option.key]: checked,
                    },
                  },
                }))
              }}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    )
  }

  const renderSubChecklist = (group: AdvancedGroupKey, disabled: boolean) => {
    if (group === 'rawCodeSources') {
      return (
        <div className="focus-dialog-popover-stack">
          {renderAdvancedOptions('rawCodeSources', ADVANCED_RAW_CODE_OPTIONS, disabled)}
          {filters.advanced.rawCodeSources.LiveCodeStyle ? (
            <div className="focus-dialog-popover-section">
              <div className="focus-dialog-popover-heading">
                LiveCode topics ({selectedAdvancedCount.rawCodeLiveCodeTopics})
              </div>
              {renderAdvancedOptions('rawCodeLiveCodeTopics', ADVANCED_RAW_CODE_LiveCode_OPTIONS, disabled)}
            </div>
          ) : null}
        </div>
      )
    }

    if (group === 'multipleChoiceTopics') {
      return renderAdvancedOptions('multipleChoiceTopics', ADVANCED_MULTIPLE_CHOICE_OPTIONS, disabled)
    }

    if (group === 'validListTopics') {
      return renderAdvancedOptions('validListTopics', ADVANCED_VALID_LIST_OPTIONS, disabled)
    }

    if (group === 'orderItemsTopics') {
      return renderAdvancedOptions('orderItemsTopics', ADVANCED_ORDER_ITEMS_OPTIONS, disabled)
    }

    if (group === 'capacityTopics') {
      return renderAdvancedOptions('capacityTopics', ADVANCED_CAPACITY_OPTIONS, disabled)
    }

    if (group === 'systemDesignTopics') {
      return renderAdvancedOptions('systemDesignTopics', ADVANCED_SYSTEM_DESIGN_OPTIONS, disabled)
    }

    if (group === 'starStoriesTopics') {
      return renderAdvancedOptions('starStoriesTopics', ADVANCED_STAR_STORIES_OPTIONS, disabled)
    }

    return renderAdvancedOptions('starVoiceTopics', ADVANCED_STAR_VOICE_OPTIONS, disabled)
  }

  const activePopoverOption = openPopover
    ? FOCUS_OPTIONS.find((option) => option.key === openPopover && option.advancedGroup !== undefined)
    : undefined

  const activePopoverContent =
    activePopoverOption && activePopoverOption.advancedGroup
      ? renderSubChecklist(
          activePopoverOption.advancedGroup,
          (micOnlyModeEnabled && activePopoverOption.key !== 'micOnlyMode') || !filters[activePopoverOption.key],
        )
      : null

  return (
    <div className="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-label="Focus question types">
      <div className="quiz-modal-card focus-dialog-card">
        <div className="focus-dialog-scroll">
          <h3>Focus</h3>
          <p className="quiz-modal-copy">
            Pick which question types you want in this session. You can change these each time you reopen the game.
          </p>

          <div className="focus-dialog-tree" aria-label="Focus checklist">
            {FOCUS_OPTIONS.map((option) => {
              const parentDisabled = micOnlyModeEnabled && option.key !== 'micOnlyMode'
              const advancedGroup = option.advancedGroup
              const hasSubChecklist = advancedGroup !== undefined
              const subChecklistDisabled = parentDisabled || !filters[option.key]
              const subtypeCount = advancedGroup ? selectedAdvancedCount[advancedGroup] : 0
              const isPopoverOpen = openPopover === option.key

              return (
                <div
                  key={option.key}
                  className={isPopoverOpen ? 'focus-dialog-tree-node focus-dialog-tree-node-open' : 'focus-dialog-tree-node'}
                >
                  <div className="focus-dialog-row">
                    <label className="focus-dialog-parent-option" title={option.description}>
                      <input
                        type="checkbox"
                        checked={filters[option.key]}
                        disabled={parentDisabled}
                        onChange={(event) => {
                          const checked = event.target.checked
                          setFilters((previous) => ({
                            ...previous,
                            [option.key]: checked,
                          }))
                        }}
                      />
                      <span>{option.label}</span>
                    </label>

                    {hasSubChecklist ? (
                      <div className="focus-dialog-popover-wrap">
                        <button
                          type="button"
                          className="focus-dialog-expand-toggle"
                          disabled={subChecklistDisabled}
                          aria-expanded={isPopoverOpen}
                          ref={(element) => {
                            buttonRefs.current[option.key] = element
                          }}
                          onClick={() => {
                            setOpenPopover((previous) => (previous === option.key ? null : option.key))
                          }}
                        >
                          Subtypes ({subtypeCount})
                        </button>
                      </div>
                    ) : (
                      <span className="focus-dialog-line-note">Only mode</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {micOnlyModeEnabled ? (
            <p className="quiz-modal-copy">
              Mic only mode is enabled: only STAR transcription questions will be offered.
            </p>
          ) : null}

          <div className="focus-dialog-actions">
            <div className="focus-dialog-actions-left">
              <button
                type="button"
                className="focus-dialog-expand-toggle"
                onClick={() => {
                  setFilters(getDefaultQuizFocusFilters())
                }}
              >
                Select all (except mic mode)
              </button>
              <span>
                {selectedCount} parents selected · {selectedAdvancedTotal} subtypes selected
              </span>
            </div>
            <button
              type="button"
              className="quiz-next"
              disabled={selectedCount === 0}
              onClick={() => {
                onConfirm(filters)
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {openPopover && popoverPosition && activePopoverOption && activePopoverContent
        ? createPortal(
            <div
              className="focus-dialog-popover focus-dialog-popover-portal"
              role="menu"
              aria-label={`${activePopoverOption.label} subtypes`}
              style={{
                top: `${popoverPosition.top}px`,
                left: `${popoverPosition.left}px`,
                maxHeight: `${popoverPosition.maxHeight}px`,
              }}
            >
              {activePopoverContent}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
