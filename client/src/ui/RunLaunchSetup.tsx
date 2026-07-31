import { useMemo, useState } from 'react'
import type { SavedStarStory } from '../quiz/StarStoryManager'
import {
  getRunDifficultyLabel,
  MAX_RUN_DIFFICULTY,
  getChaosArtifactById,
  rollRandomChaosArtifact,
  type RunDifficultyLevel,
  type RunLaunchConfig,
  type RunLaunchProgress,
  type ChaosArtifactId,
} from './RunLaunchConfig'

interface ArtifactIconProps {
  id: string
  name: string
  description: string
  enabled: boolean
  canEnable: boolean
  onToggle: () => void
}

function ChaosArtifactIcon({
  id,
  showTooltip,
  setShowTooltip,
}: {
  id: ChaosArtifactId
  showTooltip: boolean
  setShowTooltip: (show: boolean) => void
}) {
  const chaos = getChaosArtifactById(id)
  if (!chaos) return null

  const fullId = `chaos-artifact-${id}`

  let mark: React.ReactNode = null

  switch (fullId) {
    case 'chaos-artifact-triple-vitals-no-lives':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5.3l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7V8L12 5.3z" />
          <path className="artifact-icon-svg-mark" d="M8.5 15.5l7-7" />
        </>
      )
      break
    case 'chaos-artifact-gold-125-shield-drain':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.6" />
          <path className="artifact-icon-svg-mark" d="M10 10.5h4" />
          <path className="artifact-icon-svg-mark" d="M8.5 16.2h7" />
        </>
      )
      break
    case 'chaos-artifact-gold-200-health-drain':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.6" />
          <path className="artifact-icon-svg-mark" d="M12 8.8v6.4" />
          <path className="artifact-icon-svg-mark" d="M9.4 12h5.2" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-five-freeze-bombs':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 7v10M8 9.2l8 5.6M16 9.2l-8 5.6M7.8 12h8.4" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-plus-vitals':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
          <path className="artifact-icon-svg-mark" d="M8.5 16.2l7-7" />
        </>
      )
      break
    case 'chaos-artifact-no-kill-gold-shield-round-gold':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5.3l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7V8L12 5.3z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-kill-gold-health-round-gold':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-damage-lifesteal':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6c1.9 2 2.6 3.1 2.6 4.6a2.6 2.6 0 11-5.2 0C9.4 9.1 10.1 8 12 6z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    default:
      mark = <path className="artifact-icon-svg-mark" d="M12 5l6 3.2v7.6L12 19l-6-3.2V8.2L12 5z" />
      break
  }

  return (
    <div className="run-launch-artifact-wrapper">
      <button
        type="button"
        className="run-launch-artifact-icon run-launch-artifact-icon-enabled"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled
      >
        <svg
          className="artifact-icon-svg"
          viewBox="0 0 24 24"
          role="img"
          aria-label={chaos.title}
        >
          <circle className="artifact-icon-svg-ring" cx="12" cy="12" r="11" />
          {mark}
        </svg>
      </button>
      {showTooltip && (
        <div className="run-launch-artifact-tooltip">
          <strong>{chaos.title}</strong>
          <p>{chaos.description}</p>
        </div>
      )}
    </div>
  )
}

function StartingArtifactIcon({
  id,
  name,
  description,
  enabled,
  canEnable,
  onToggle,
}: ArtifactIconProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  let mark: React.ReactNode = null

  switch (id) {
    case 'start-artifact-hard-questions':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6.6l4.7 2.4v3.3c0 2.9-1.7 4.8-4.7 6.3-3-1.5-4.7-3.4-4.7-6.3V9L12 6.6z" />
          <path className="artifact-icon-svg-mark" d="M12 9.4v4.5" />
          <circle className="artifact-icon-svg-mark" cx="12" cy="15.7" r="0.7" />
        </>
      )
      break
    case 'start-artifact-no-skips':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M7.4 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M12.6 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M7.8 16.2l8.4-8.4" />
        </>
      )
      break
    case 'start-artifact-star-stories-hard':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6.8l1.7 3.3 3.6.5-2.6 2.5.6 3.6L12 15l-3.3 1.7.6-3.6-2.6-2.5 3.6-.5L12 6.8z" />
          <path className="artifact-icon-svg-mark" d="M9.2 17.4h5.6" />
        </>
      )
      break
    case 'start-artifact-fast-rounds':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M8.6 6.8h6.8v2.6L12.7 12h2.2L11.2 17v-3.6H9.1l2.7-3.8z" />
        </>
      )
      break
  }

  return (
    <div className="run-launch-artifact-wrapper">
      <button
        type="button"
        className={`run-launch-artifact-icon${enabled ? ' run-launch-artifact-icon-enabled' : ''}${!canEnable ? ' run-launch-artifact-icon-disabled' : ''}`}
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={!canEnable}
      >
        <svg
          className="artifact-icon-svg"
          viewBox="0 0 24 24"
          role="img"
          aria-label={name}
        >
          <circle className="artifact-icon-svg-ring" cx="12" cy="12" r="11" />
          {mark}
        </svg>
      </button>
      {showTooltip && (
        <div className="run-launch-artifact-tooltip">
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
      )}
    </div>
  )
}

interface RunLaunchSetupProps {
  initialStories?: SavedStarStory[]
  progress: RunLaunchProgress
  initialConfig: RunLaunchConfig
  onStartRun: (stories: SavedStarStory[], config: RunLaunchConfig) => void
  onChaosArtifactRolled?: (artifactId: ChaosArtifactId) => void
}

export function RunLaunchSetup({
  initialStories = [],
  progress,
  initialConfig,
  onStartRun,
  onChaosArtifactRolled,
}: RunLaunchSetupProps) {
  const hasCompletedAtLeastOneRun = Math.max(0, Math.floor(progress.completedRunsCount ?? 0)) >= 1
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(initialConfig.difficultyLevel)
  const [hardQuestionsEnabled, setHardQuestionsEnabled] = useState(initialConfig.startingArtifacts.hardQuestions)
  const [starStoriesHardModeEnabled, setStarStoriesHardModeEnabled] = useState(
    hasCompletedAtLeastOneRun && initialConfig.startingArtifacts.starStoriesHardMode,
  )
  const [chaosArtifactId, setChaosArtifactId] = useState(initialConfig.chaosArtifactId)
  const [chaosRolled, setChaosRolled] = useState(initialConfig.chaosArtifactId !== null)
  const [chaosTooltipVisible, setChaosTooltipVisible] = useState(false)
  const [debugUnlockedTwentyDifficulties, setDebugUnlockedTwentyDifficulties] = useState(false)

  const chaosUnlocked = progress.lastRunReachedRound >= 5
  const chaosArtifact = getChaosArtifactById(chaosArtifactId)

  const availableDifficulties = useMemo(() => {
    const maxDifficulty = debugUnlockedTwentyDifficulties ? 19 : Math.min(MAX_RUN_DIFFICULTY, progress.maxUnlockedDifficulty)
    const levels: number[] = []

    for (let level = 0; level <= maxDifficulty; level += 1) {
      levels.push(level)
    }

    return levels
  }, [debugUnlockedTwentyDifficulties, progress.maxUnlockedDifficulty])

  const difficultyMultiplier = 1 + selectedDifficulty * 0.1
  const hasMultipleDifficulties = availableDifficulties.length > 1

  return (
    <div className="question-explorer-backdrop" role="dialog" aria-modal="true" aria-label="Run launch setup">
      <div className="star-story-setup-popover run-launch-popover">
        <header className="star-story-setup-header">
          <div>
            <p className="question-explorer-eyebrow">Run Launch</p>
            <h2>Configure Your Next Run</h2>
          </div>
          <div className="star-story-setup-badge">New</div>
        </header>

        <div className="star-story-setup-toolbar">
          <button
            type="button"
            className="star-story-inline-button"
            onClick={() => {
              setDebugUnlockedTwentyDifficulties(true)
              setSelectedDifficulty(19)
            }}
            disabled={debugUnlockedTwentyDifficulties}
          >
            Debug unlock 20 difficulty levels
          </button>
          {debugUnlockedTwentyDifficulties ? <span className="run-launch-muted">Temporary session unlock active.</span> : null}
        </div>

        <p className="star-story-setup-copy">
          Select difficulty and starting artifacts for this run. Chaos artifacts roll separately and can radically change the run.
        </p>

        {hasMultipleDifficulties && (
          <section className="run-launch-section">
            <h3>Difficulty</h3>
            <div className="run-launch-difficulty-grid">
              {availableDifficulties.map((difficulty) => {
                const isSelected = selectedDifficulty === difficulty
                return (
                  <button
                    key={difficulty}
                    type="button"
                    className={`run-launch-difficulty-chip${isSelected ? ' run-launch-difficulty-chip-selected' : ''}`}
                    onClick={() => {
                      setSelectedDifficulty(difficulty)
                    }}
                  >
                    <strong>{getRunDifficultyLabel(difficulty)}</strong>
                    <span>Enemy x{(1 + difficulty * 0.1).toFixed(2)}</span>
                  </button>
                )
              })}
            </div>
            <p className="run-launch-muted">Enemy scaling for this run: x{difficultyMultiplier.toFixed(2)}.</p>
            {progress.maxUnlockedDifficulty < MAX_RUN_DIFFICULTY && (
              <p className="run-launch-muted">Beat round 10 to unlock the next difficulty tier.</p>
            )}
          </section>
        )}

        <section className="run-launch-section">
          <h3>Starting Artifacts</h3>
          <div className="run-launch-artifacts-grid">
            {selectedDifficulty >= 1 && (
              <StartingArtifactIcon
                id="start-artifact-hard-questions"
                name="Hard Questions Artifact"
                description="Starts question difficulty ramp high and grants x1.25 gold per correct answer."
                enabled={hardQuestionsEnabled}
                canEnable={selectedDifficulty >= 1}
                onToggle={() => setHardQuestionsEnabled(!hardQuestionsEnabled)}
              />
            )}

            {hasCompletedAtLeastOneRun && (
              <StartingArtifactIcon
                id="start-artifact-star-stories-hard"
                name="I Know My Star Stories"
                description="STAR stories start on hard difficulty and correct answers grant 50% more gold."
                enabled={starStoriesHardModeEnabled}
                canEnable={true}
                onToggle={() => setStarStoriesHardModeEnabled(!starStoriesHardModeEnabled)}
              />
            )}
          </div>
          {!hasCompletedAtLeastOneRun && (
            <p className="run-launch-muted">Complete one run to unlock I Know My Star Stories.</p>
          )}
        </section>

        <section className="run-launch-section">
          <h3>Chaos Artifact</h3>
          {chaosUnlocked ? (
            <>
              <p className="run-launch-muted">Chaos effects stay hidden until activated, then one random effect is assigned.</p>
              {!chaosRolled ? (
                <button
                  type="button"
                  className="star-story-inline-button"
                  onClick={() => {
                    const nextChaosArtifactId = rollRandomChaosArtifact()
                    setChaosArtifactId(nextChaosArtifactId)
                    setChaosRolled(true)
                    onChaosArtifactRolled?.(nextChaosArtifactId)
                  }}
                >
                  Roll Chaos Artifact
                </button>
              ) : (
                <>
                  <div className="run-launch-artifacts-grid">
                    {chaosArtifactId && (
                      <ChaosArtifactIcon
                        id={chaosArtifactId}
                        showTooltip={chaosTooltipVisible}
                        setShowTooltip={setChaosTooltipVisible}
                      />
                    )}
                  </div>
                  {chaosArtifact && <p className="run-launch-muted">{chaosArtifact.description}</p>}
                </>
              )}
            </>
          ) : (
            <p className="run-launch-muted">Reach round 5 to unlock Chaos Artifacts.</p>
          )}
        </section>

        <div className="star-story-setup-toolbar">
          <div className="star-story-setup-stats">
            <strong>{initialStories.length}</strong>
            <span>{initialStories.length === 1 ? 'STAR story loaded' : 'STAR stories loaded'}</span>
          </div>
          <span className="run-launch-muted">Last run round: {progress.lastRunReachedRound}</span>
        </div>

        <div className="star-story-setup-actions">
          <button
            type="button"
            className="star-story-primary-button"
            onClick={() => {
              onStartRun(initialStories, {
                difficultyLevel: selectedDifficulty as RunDifficultyLevel,
                startingArtifacts: {
                  hardQuestions: hardQuestionsEnabled && selectedDifficulty >= 1,
                  starStoriesHardMode: hasCompletedAtLeastOneRun && starStoriesHardModeEnabled,
                },
                chaosArtifactId: chaosUnlocked ? chaosArtifactId : null,
              })
            }}
          >
            Launch Run
          </button>
        </div>
      </div>
    </div>
  )
}
