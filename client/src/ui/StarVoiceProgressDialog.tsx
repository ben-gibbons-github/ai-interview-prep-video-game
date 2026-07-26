export interface StarVoiceStoryProgressRow {
  problemId: string
  storyTitle: string
  seenCount: number
  completedCount: number
  seenByDifficulty: {
    easy: number
    medium: number
    hard: number
  }
  completedByDifficulty: {
    easy: number
    medium: number
    hard: number
  }
}

interface StarVoiceProgressDialogProps {
  rows: StarVoiceStoryProgressRow[]
  totalSeenToday: number
  totalCompletedToday: number
  progressTargetPerDifficulty: number
  onClose: () => void
}

const DIFFICULTY_ORDER: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard']

function getProgressLabel(completed: number, target: number): string {
  if (completed >= target) {
    return 'Complete'
  }

  if (completed > 0) {
    return 'In progress'
  }

  return 'Not started'
}

function toPercent(value: number, total: number): string {
  if (total <= 0) {
    return '0%'
  }

  return `${Math.max(0, Math.min(100, Math.round((value / total) * 100)))}%`
}

export function StarVoiceProgressDialog({
  rows,
  totalSeenToday,
  totalCompletedToday,
  progressTargetPerDifficulty,
  onClose,
}: StarVoiceProgressDialogProps) {
  return (
    <div className="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-label="STAR voice progress dialog">
      <div className="quiz-modal-card star-voice-progress-card">
        <div className="star-voice-progress-header">
          <h3>STAR Voice Progress</h3>
          <button type="button" className="quiz-next" onClick={onClose}>
            Close
          </button>
        </div>

        <p>
          Progress this run: <strong>{totalCompletedToday}</strong> | Seen this run: <strong>{totalSeenToday}</strong>
        </p>

        {rows.length === 0 ? (
          <p>No STAR voice questions seen yet this run.</p>
        ) : (
          <div className="star-voice-progress-list" aria-live="polite">
            {rows.map((row) => (
              <article key={row.problemId} className="star-voice-progress-story">
                <header className="star-voice-progress-story-head">
                  <h4>{row.storyTitle}</h4>
                  <span className="star-voice-progress-story-seen">Seen {row.seenCount}x</span>
                </header>

                <div className="star-voice-progress-stages" role="list" aria-label={`${row.storyTitle} progress`}>
                  {DIFFICULTY_ORDER.map((difficulty) => {
                    const completed = row.completedByDifficulty[difficulty]
                    const seen = row.seenByDifficulty[difficulty]
                    const progressPercent = toPercent(completed, progressTargetPerDifficulty)
                    const label = getProgressLabel(completed, progressTargetPerDifficulty)

                    return (
                      <div key={`${row.problemId}-${difficulty}`} className="star-voice-progress-stage" role="listitem">
                        <div className="star-voice-progress-stage-head">
                          <span>{difficulty}</span>
                          <span>{completed}/{progressTargetPerDifficulty}</span>
                        </div>
                        <div className="star-voice-progress-track" aria-hidden="true">
                          <div className="star-voice-progress-fill" style={{ width: progressPercent }} />
                        </div>
                        <p className="star-voice-progress-meta">{label} | Seen {seen}x</p>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
