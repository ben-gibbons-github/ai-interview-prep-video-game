import { useEffect, useMemo, useRef, useState } from 'react'
import type { QuizQuestion } from '../../quiz/QuizQuestionManager'

interface MultiSectionSystemDesignPanelProps {
  quizQuestion: QuizQuestion
  quizAnswerResult: 'correct' | 'incorrect' | null
  onSubmitDesign: (selectedIndices: number[], options?: { isSkip?: boolean }) => void
  onSkipDesign: () => void
  availableSkips: number
  savedDraft?: MultiSectionSystemDesignPanelDraft | null
  onDraftChange?: (draft: MultiSectionSystemDesignPanelDraft) => void
}

export interface MultiSectionSystemDesignPanelDraft {
  selectedOptionIndices: number[]
  submissionCount: number
}

function createDraftSignature(draft: MultiSectionSystemDesignPanelDraft): string {
  return JSON.stringify(draft)
}

function normalizeSelectedOptionIndices(value: number[] | undefined, sectionCount: number): number[] {
  const nextSelection = Array.from({ length: sectionCount }, (_, index) => {
    const candidate = value?.[index]
    return typeof candidate === 'number' && Number.isInteger(candidate) && candidate >= -1 ? candidate : -1
  })

  return nextSelection
}

export function MultiSectionSystemDesignPanel({
  quizQuestion,
  quizAnswerResult,
  onSubmitDesign,
  onSkipDesign,
  availableSkips,
  savedDraft,
  onDraftChange,
}: MultiSectionSystemDesignPanelProps) {
  const scenario = quizQuestion.multiSectionSystemDesign
  const sections = scenario?.sections ?? []
  const maxSubmissions = Math.max(1, Math.min(3, scenario?.submissionsAllowed ?? 3))
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<number[]>(() =>
    normalizeSelectedOptionIndices(savedDraft?.selectedOptionIndices, sections.length),
  )
  const [submissionCount, setSubmissionCount] = useState<number>(() => Math.max(0, savedDraft?.submissionCount ?? 0))
  const skipNextDraftEmitRef = useRef(false)
  const lastEmittedDraftSignatureRef = useRef<string | null>(null)

  const emitDraft = (draft: MultiSectionSystemDesignPanelDraft) => {
    const signature = createDraftSignature(draft)
    if (lastEmittedDraftSignatureRef.current === signature) {
      return
    }

    lastEmittedDraftSignatureRef.current = signature
    onDraftChange?.(draft)
  }

  useEffect(() => {
    if (!savedDraft) {
      skipNextDraftEmitRef.current = false
      lastEmittedDraftSignatureRef.current = null
      setSelectedOptionIndices(normalizeSelectedOptionIndices(undefined, sections.length))
      setSubmissionCount(0)
      return
    }

    skipNextDraftEmitRef.current = true
    setSelectedOptionIndices(normalizeSelectedOptionIndices(savedDraft.selectedOptionIndices, sections.length))
    setSubmissionCount(Math.max(0, savedDraft.submissionCount))
  }, [quizQuestion.id, savedDraft, sections.length])

  useEffect(() => {
    const draft = {
      selectedOptionIndices,
      submissionCount,
    }
    const signature = createDraftSignature(draft)

    if (skipNextDraftEmitRef.current) {
      skipNextDraftEmitRef.current = false
      lastEmittedDraftSignatureRef.current = signature
      return
    }

    if (lastEmittedDraftSignatureRef.current === signature) {
      return
    }

    lastEmittedDraftSignatureRef.current = signature
    onDraftChange?.(draft)
  }, [onDraftChange, selectedOptionIndices, submissionCount])

  const resolvedState = useMemo(() => {
    return sections.map((section, index) => {
      const selectedIndex = selectedOptionIndices[index] ?? -1
      const correctIndex = section.correctIndex
      return {
        section,
        selectedIndex,
        isCorrect: selectedIndex === correctIndex,
        hasSelection: selectedIndex >= 0,
        showIncorrect: submissionCount > 0 && selectedIndex !== correctIndex,
      }
    })
  }, [sections, selectedOptionIndices, submissionCount])

  const allSectionsHaveSelection = resolvedState.every((entry) => entry.hasSelection)
  const allSectionsCorrect = resolvedState.length > 0 && resolvedState.every((entry) => entry.isCorrect)
  const attemptsLeft = Math.max(0, maxSubmissions - submissionCount)

  const handleOptionSelect = (sectionIndex: number, optionIndex: number) => {
    if (quizAnswerResult !== null) {
      return
    }

    setSelectedOptionIndices((previous) => {
      const next = [...normalizeSelectedOptionIndices(previous, sections.length)]
      next[sectionIndex] = optionIndex
      emitDraft({
        selectedOptionIndices: next,
        submissionCount,
      })
      return next
    })
  }

  const handleSubmit = () => {
    if (quizAnswerResult !== null || sections.length === 0 || !allSectionsHaveSelection) {
      return
    }

    if (allSectionsCorrect) {
      onSubmitDesign(selectedOptionIndices)
      return
    }

    const nextSubmissionCount = submissionCount + 1
    setSubmissionCount(nextSubmissionCount)
    emitDraft({
      selectedOptionIndices,
      submissionCount: nextSubmissionCount,
    })

    if (nextSubmissionCount >= maxSubmissions) {
      onSubmitDesign(selectedOptionIndices)
    }
  }

  if (!scenario) {
    return null
  }

  const disabled = quizAnswerResult !== null

  return (
    <div className="multi-sysdesign-container">
      <div className="multi-sysdesign-header">
        <div>
          <p className="multi-sysdesign-eyebrow">{scenario.title ?? 'Multi-section system design'}</p>
          {scenario.scenarioSummary ? <p className="multi-sysdesign-summary">{scenario.scenarioSummary}</p> : null}
        </div>
        <div className="multi-sysdesign-attempts">
          <span>Submissions left: {attemptsLeft}</span>
          <span>{allSectionsCorrect ? 'All sections aligned' : 'Align every section to pass'}</span>
        </div>
      </div>

      <div className="multi-sysdesign-scroll" role="list" aria-label="Multi-section system design choices">
        {resolvedState.map(({ section, selectedIndex, showIncorrect }, sectionIndex) => (
          <section
            key={section.id}
            className={`multi-sysdesign-bubble${showIncorrect ? ' multi-sysdesign-bubble-incorrect' : ''}${selectedIndex >= 0 ? ' multi-sysdesign-bubble-selected' : ''}`}
            role="listitem"
          >
            <div className="multi-sysdesign-bubble-header">
              <div>
                <p className="multi-sysdesign-bubble-kicker">Section {sectionIndex + 1}</p>
                <h3>{section.title}</h3>
              </div>
              <span className="multi-sysdesign-bubble-pill">
                {selectedIndex >= 0 ? `Choice ${String.fromCharCode(65 + selectedIndex)}` : 'No choice yet'}
              </span>
            </div>

            <p className="multi-sysdesign-bubble-prompt">{section.prompt}</p>
            {section.helperText ? <p className="multi-sysdesign-bubble-helper">{section.helperText}</p> : null}

            <div className="multi-sysdesign-options" role="radiogroup" aria-label={section.title}>
              {section.options.map((option, optionIndex) => {
                const isSelected = selectedIndex === optionIndex
                return (
                  <button
                    key={`${section.id}-${optionIndex}`}
                    type="button"
                    className={isSelected ? 'multi-sysdesign-option multi-sysdesign-option-selected' : 'multi-sysdesign-option'}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    onClick={() => handleOptionSelect(sectionIndex, optionIndex)}
                  >
                    <span className="multi-sysdesign-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <span className="multi-sysdesign-option-label">{option}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="multi-sysdesign-footer">
        <div className="multi-sysdesign-feedback">
          {allSectionsCorrect
            ? 'Every section matches the intended system design.'
            : submissionCount > 0
              ? 'Incorrect sections are highlighted. Adjust the mismatches and resubmit.'
              : 'Choose one option per section, then submit your full design.'}
        </div>
        <div className="multi-sysdesign-actions">
          <button
            type="button"
            className="quiz-raw-button"
            disabled={disabled || !allSectionsHaveSelection || sections.length === 0}
            onClick={handleSubmit}
          >
            Submit Section Plan
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
    </div>
  )
}