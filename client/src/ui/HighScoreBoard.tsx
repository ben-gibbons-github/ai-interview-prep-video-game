import type { HighScoreEntry } from '../Player/GameSaving'
import type { RunQuestionDifficultyBreakdown } from '../WaveManager'

interface HighScoreBoardProps {
  currentScore: number
  currentRound: number
  enemyKills: number
  roundsCleared: number
  currentQuizTotalAnswered: number
  currentQuizAnsweredByDifficulty: RunQuestionDifficultyBreakdown
  entries: HighScoreEntry[]
}

function formatDifficultyBreakdown(breakdown: RunQuestionDifficultyBreakdown): string {
  return `E ${breakdown.easy} · M ${breakdown.medium} · H ${breakdown.hard} · VH ${breakdown.veryHard} · IH ${breakdown.insanelyHard}`
}

function getEntryDifficultyBreakdown(entry: HighScoreEntry): RunQuestionDifficultyBreakdown {
  return {
    easy: Math.max(0, Math.floor(entry.quizAnsweredByDifficulty?.easy ?? 0)),
    medium: Math.max(0, Math.floor(entry.quizAnsweredByDifficulty?.medium ?? 0)),
    hard: Math.max(0, Math.floor(entry.quizAnsweredByDifficulty?.hard ?? 0)),
    veryHard: Math.max(0, Math.floor(entry.quizAnsweredByDifficulty?.veryHard ?? 0)),
    insanelyHard: Math.max(0, Math.floor(entry.quizAnsweredByDifficulty?.insanelyHard ?? 0)),
  }
}

export function HighScoreBoard({
  currentScore,
  currentRound,
  enemyKills,
  roundsCleared,
  currentQuizTotalAnswered,
  currentQuizAnsweredByDifficulty,
  entries,
}: HighScoreBoardProps) {
  const topEntries = entries.slice(0, 5)

  return (
    <aside className="high-score-board" aria-label="High score board">
      <div className="high-score-board-header">
        <div>
          <p className="high-score-board-eyebrow">Run Score</p>
          <h2>High Score Board</h2>
        </div>
        <span>Local</span>
      </div>

      <div className="high-score-board-current">
        <strong>{currentScore}</strong>
        <span>
          Round {currentRound} · {roundsCleared} cleared · {enemyKills} defeated
        </span>
        <span>
          Questions correct {currentQuizTotalAnswered} · {formatDifficultyBreakdown(currentQuizAnsweredByDifficulty)}
        </span>
      </div>

      <ol className="high-score-board-list">
        {topEntries.length === 0 ? (
          <li className="high-score-board-empty">No saved runs yet.</li>
        ) : (
          topEntries.map((entry, index) => (
            <li key={entry.id} className="high-score-board-entry">
              <div className="high-score-board-rank">#{index + 1}</div>
              <div className="high-score-board-entry-copy">
                <strong>{entry.score}</strong>
                <span>
                  Round {entry.currentRound} · {entry.roundsCleared} cleared · {entry.enemyKills} defeated
                </span>
                <span>
                  Questions correct {Math.max(0, Math.floor(entry.quizTotalAnswered ?? 0))} ·{' '}
                  {formatDifficultyBreakdown(getEntryDifficultyBreakdown(entry))}
                </span>
              </div>
            </li>
          ))
        )}
      </ol>
    </aside>
  )
}