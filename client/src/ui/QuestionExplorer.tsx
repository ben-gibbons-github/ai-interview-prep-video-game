import { useEffect, useMemo, useState } from 'react'
import {
  QUESTION_TYPE_LABELS,
  type QuestionTypeKey,
} from '../Player/GameSaving'
import {
  getQuestionCategoryById,
  getQuestionExplorerStats,
  getQuizQuestionById,
} from '../quiz/QuizQuestionManager'
import { getQuestionTypeForTracking } from './QuizManager'

interface QuestionExplorerProps {
  onClose: () => void
  runSeenQuestionIds: string[]
  lifetimeSeenQuestionIds: string[]
}

const QUESTION_TYPE_ORDER: QuestionTypeKey[] = [
  'multipleChoice',
  'rawCode',
  'starStories',
  'starVoice',
  'validList',
  'orderItems',
  'capacity',
  'systemDesign',
  'multiSectionSystemDesign',
]

interface DifficultySeenCounts {
  easy: number
  medium: number
  hard: number
  total: number
}

function createEmptyDifficultySeenCountsByType(): Record<QuestionTypeKey, DifficultySeenCounts> {
  const empty = (): DifficultySeenCounts => ({ easy: 0, medium: 0, hard: 0, total: 0 })
  return {
    rawCode: empty(),
    multipleChoice: empty(),
    starStories: empty(),
    starVoice: empty(),
    validList: empty(),
    orderItems: empty(),
    capacity: empty(),
    systemDesign: empty(),
    multiSectionSystemDesign: empty(),
  }
}

function toBaseDifficulty(difficulty: string): 'easy' | 'medium' | 'hard' {
  if (difficulty === 'easy') return 'easy'
  if (difficulty === 'medium') return 'medium'
  return 'hard'
}

export function QuestionExplorer({
  onClose,
  runSeenQuestionIds,
  lifetimeSeenQuestionIds,
}: QuestionExplorerProps) {
  const stats = getQuestionExplorerStats()
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)

  const runSeenSet = useMemo(() => new Set(runSeenQuestionIds), [runSeenQuestionIds])

  const seenQuestions = useMemo(() => {
    const rows = lifetimeSeenQuestionIds
      .map((questionId) => {
        const question = getQuizQuestionById(questionId)
        if (!question) {
          return null
        }

        const questionType = getQuestionTypeForTracking(question)
        return {
          questionId,
          question,
          questionType,
          seenThisRun: runSeenSet.has(questionId),
        }
      })
      .filter((row): row is NonNullable<typeof row> => row !== null)

    rows.sort((left, right) => {
      if (left.seenThisRun !== right.seenThisRun) {
        return left.seenThisRun ? -1 : 1
      }
      return left.question.id.localeCompare(right.question.id)
    })

    return rows
  }, [lifetimeSeenQuestionIds, runSeenSet])

  useEffect(() => {
    if (seenQuestions.length === 0) {
      setSelectedQuestionId(null)
      return
    }

    const isStillVisible = seenQuestions.some((entry) => entry.questionId === selectedQuestionId)
    if (isStillVisible) {
      return
    }

    setSelectedQuestionId(seenQuestions[0].questionId)
  }, [seenQuestions, selectedQuestionId])

  const selectedQuestionEntry = useMemo(
    () => seenQuestions.find((entry) => entry.questionId === selectedQuestionId) ?? null,
    [seenQuestions, selectedQuestionId],
  )

  const runSeenCountsByType = useMemo(() => {
    const counts = createEmptyDifficultySeenCountsByType()
    runSeenQuestionIds.forEach((questionId) => {
      const question = getQuizQuestionById(questionId)
      if (!question) {
        return
      }
      const questionType = getQuestionTypeForTracking(question)
      const baseDifficulty = toBaseDifficulty(question.difficulty)
      counts[questionType][baseDifficulty] += 1
      counts[questionType].total += 1
    })
    return counts
  }, [runSeenQuestionIds])

  const lifetimeSeenCountsByType = useMemo(() => {
    const counts = createEmptyDifficultySeenCountsByType()
    lifetimeSeenQuestionIds.forEach((questionId) => {
      const question = getQuizQuestionById(questionId)
      if (!question) {
        return
      }
      const questionType = getQuestionTypeForTracking(question)
      const baseDifficulty = toBaseDifficulty(question.difficulty)
      counts[questionType][baseDifficulty] += 1
      counts[questionType].total += 1
    })
    return counts
  }, [lifetimeSeenQuestionIds])

  const runSeenCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    runSeenQuestionIds.forEach((questionId) => {
      const category = getQuestionCategoryById(questionId)
      if (!category) {
        return
      }
      counts[category] = (counts[category] ?? 0) + 1
    })
    return counts
  }, [runSeenQuestionIds])

  const lifetimeSeenCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    lifetimeSeenQuestionIds.forEach((questionId) => {
      const category = getQuestionCategoryById(questionId)
      if (!category) {
        return
      }
      counts[category] = (counts[category] ?? 0) + 1
    })
    return counts
  }, [lifetimeSeenQuestionIds])

  return (
    <div className="question-explorer-backdrop" role="dialog" aria-modal="true" aria-label="Question explorer">
      <div className="question-explorer-popover">
        <header className="question-explorer-header">
          <div>
            <p className="question-explorer-eyebrow">Question Explorer</p>
            <h2>Question Bank Stats</h2>
          </div>
          <button type="button" className="question-explorer-close" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="question-explorer-summary-grid">
          <div className="question-explorer-stat-card">
            <span>Loaded</span>
            <strong>{stats.totalLoadedQuestions}</strong>
          </div>
          <div className="question-explorer-stat-card">
            <span>Unique</span>
            <strong>{stats.totalUniqueQuestions}</strong>
          </div>
          <div className="question-explorer-stat-card">
            <span>Duplicates Removed</span>
            <strong>{stats.duplicateQuestionsRemoved}</strong>
          </div>
          <div className="question-explorer-stat-card">
            <span>Seen This Run</span>
            <strong>{runSeenQuestionIds.length}</strong>
          </div>
          <div className="question-explorer-stat-card">
            <span>Seen Any Run</span>
            <strong>{lifetimeSeenQuestionIds.length}</strong>
          </div>
        </div>

        <section className="question-explorer-section">
          <h3>Difficulty Totals</h3>
          <div className="question-explorer-difficulty-grid">
            <div>
              <span>Easy</span>
              <strong>{stats.loadedByDifficulty.easy}</strong>
              <small>{stats.uniqueByDifficulty.easy} unique</small>
            </div>
            <div>
              <span>Medium</span>
              <strong>{stats.loadedByDifficulty.medium}</strong>
              <small>{stats.uniqueByDifficulty.medium} unique</small>
            </div>
            <div>
              <span>Hard</span>
              <strong>{stats.loadedByDifficulty.hard}</strong>
              <small>{stats.uniqueByDifficulty.hard} unique</small>
            </div>
          </div>
        </section>

        <section className="question-explorer-section">
          <h3>Seen By Type</h3>
          <div className="question-explorer-table-wrap">
            <table className="question-explorer-table">
              <thead>
                <tr>
                  <th rowSpan={2}>Question Type</th>
                  <th colSpan={4} className="question-explorer-th-group">This Run</th>
                  <th colSpan={4} className="question-explorer-th-group">Any Run</th>
                </tr>
                <tr>
                  <th>Easy</th>
                  <th>Med</th>
                  <th>Hard</th>
                  <th>Total</th>
                  <th>Easy</th>
                  <th>Med</th>
                  <th>Hard</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {QUESTION_TYPE_ORDER.map((questionType) => (
                  <tr key={questionType}>
                    <td>{QUESTION_TYPE_LABELS[questionType]}</td>
                    <td>{runSeenCountsByType[questionType].easy || ''}</td>
                    <td>{runSeenCountsByType[questionType].medium || ''}</td>
                    <td>{runSeenCountsByType[questionType].hard || ''}</td>
                    <td>{runSeenCountsByType[questionType].total || ''}</td>
                    <td>{lifetimeSeenCountsByType[questionType].easy || ''}</td>
                    <td>{lifetimeSeenCountsByType[questionType].medium || ''}</td>
                    <td>{lifetimeSeenCountsByType[questionType].hard || ''}</td>
                    <td>{lifetimeSeenCountsByType[questionType].total || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="question-explorer-section">
          <h3>Categories</h3>
          <div className="question-explorer-table-wrap">
            <table className="question-explorer-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Easy</th>
                  <th>Medium</th>
                  <th>Hard</th>
                  <th>Total</th>
                  <th>Seen (Run)</th>
                  <th>Seen (Any)</th>
                </tr>
              </thead>
              <tbody>
                {stats.categories.map((row) => (
                  <tr key={row.category}>
                    <td>{row.category}</td>
                    <td>{row.easy}</td>
                    <td>{row.medium}</td>
                    <td>{row.hard}</td>
                    <td>{row.total}</td>
                    <td>{runSeenCountsByCategory[row.category] || ''}</td>
                    <td>{lifetimeSeenCountsByCategory[row.category] || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="question-explorer-section">
          <h3>Seen Questions</h3>
          {seenQuestions.length === 0 ? (
            <p className="question-explorer-empty-copy">You have not seen any questions yet this run.</p>
          ) : (
            <div className="question-explorer-seen-layout">
              <div className="question-explorer-seen-list" role="list" aria-label="Seen questions">
                {seenQuestions.map((entry) => (
                  <button
                    key={entry.questionId}
                    type="button"
                    role="listitem"
                    className={
                      entry.questionId === selectedQuestionId
                        ? 'question-explorer-seen-item question-explorer-seen-item-active'
                        : 'question-explorer-seen-item'
                    }
                    onClick={() => {
                      setSelectedQuestionId(entry.questionId)
                    }}
                  >
                    <strong>{QUESTION_TYPE_LABELS[entry.questionType]}</strong>
                    <span>{entry.questionId}</span>
                    {entry.seenThisRun ? <small>Seen this run</small> : <small>Seen on a previous run</small>}
                  </button>
                ))}
              </div>

              <div className="question-explorer-seen-detail" aria-live="polite">
                {selectedQuestionEntry ? (
                  <>
                    <p className="question-explorer-seen-detail-meta">
                      <strong>{QUESTION_TYPE_LABELS[selectedQuestionEntry.questionType]}</strong>
                      <span>{selectedQuestionEntry.question.difficulty}</span>
                    </p>
                    <h4>{selectedQuestionEntry.question.prompt}</h4>
                    {selectedQuestionEntry.question.options.length > 0 ? (
                      <ol>
                        {selectedQuestionEntry.question.options.map((option, optionIndex) => (
                          <li key={`${selectedQuestionEntry.questionId}-${optionIndex}`}>{option}</li>
                        ))}
                      </ol>
                    ) : null}
                  </>
                ) : (
                  <p className="question-explorer-empty-copy">Select a seen question to preview it.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
