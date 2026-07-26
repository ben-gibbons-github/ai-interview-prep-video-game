export type RunDifficultyLevel = 0 | 1 | 2 | 3 | 4

export interface RunStartArtifacts {
  hardQuestions: boolean
  starStoriesHardMode: boolean
}

export type ChaosArtifactId =
  | 'triple-vitals-no-lives'
  | 'gold-125-shield-drain'
  | 'gold-200-health-drain'
  | 'no-question-heal-five-freeze-bombs'
  | 'no-question-heal-plus-vitals'
  | 'no-kill-gold-shield-round-gold'
  | 'no-kill-gold-health-round-gold'
  | 'no-question-heal-damage-lifesteal'
  | 'no-skips'
  | 'fast-rounds'

export interface RunLaunchConfig {
  difficultyLevel: RunDifficultyLevel
  startingArtifacts: RunStartArtifacts
  chaosArtifactId: ChaosArtifactId | null
}

export interface RunLaunchProgress {
  maxUnlockedDifficulty: RunDifficultyLevel
  lastRunReachedRound: number
  pendingChaosArtifactId: ChaosArtifactId | null
}

export const RUN_DIFFICULTY_LABELS: Record<RunDifficultyLevel, string> = {
  0: 'Cadet',
  1: 'Pilot',
  2: 'Captain',
  3: 'Commander',
  4: 'Legend',
}

export function getRunDifficultyLabel(difficultyLevel: number) {
  return RUN_DIFFICULTY_LABELS[difficultyLevel as RunDifficultyLevel] ?? `Tier ${difficultyLevel + 1}`
}

export const MAX_RUN_DIFFICULTY: RunDifficultyLevel = 4

export const DEFAULT_RUN_LAUNCH_CONFIG: RunLaunchConfig = {
  difficultyLevel: 0,
  startingArtifacts: {
    hardQuestions: false,
    starStoriesHardMode: false,
  },
  chaosArtifactId: null,
}

const RUN_LAUNCH_PROGRESS_STORAGE_KEY = 'system-design-game.run-launch-progress.v1'

const CHAOS_ARTIFACT_POOL: ReadonlyArray<{
  id: ChaosArtifactId
  title: string
  description: string
}> = [
  {
    id: 'triple-vitals-no-lives',
    title: 'Glass Core Reactor',
    description: 'Lose all lives. Gain 3x max health and max shield now and for future gains.',
  },
  {
    id: 'gold-125-shield-drain',
    title: 'Leaky Fortune Capacitor',
    description: 'All gold gains are x1.25, but you lose 1% max shield per second.',
  },
  {
    id: 'gold-200-health-drain',
    title: 'Blood Mint Engine',
    description: 'All gold gains are x1.5, but you lose 2 health per second down to 5 health.',
  },
  {
    id: 'no-question-heal-five-freeze-bombs',
    title: 'Cryo Debt Ledger',
    description: 'Correct answers no longer heal you. Gain 5 Freeze Bomb artifacts.',
  },
  {
    id: 'no-question-heal-plus-vitals',
    title: 'Fortified Austerity',
    description: 'Correct answers no longer heal you. Gain +400 max health and +400 max shield.',
  },
  {
    id: 'no-kill-gold-shield-round-gold',
    title: 'Shield Dividend Contract',
    description: 'Kills no longer grant gold. At round end, gain gold equal to 50% of current shield.',
  },
  {
    id: 'no-kill-gold-health-round-gold',
    title: 'Vitality Dividend Contract',
    description: 'Kills no longer grant gold. At round end, gain gold equal to 30% of current health.',
  },
  {
    id: 'no-question-heal-damage-lifesteal',
    title: 'Predator Retrofit',
    description: 'Correct answers no longer heal you. Heal for 1% of damage dealt.',
  },
  {
    id: 'no-skips',
    title: 'No Skips Artifact',
    description: 'Start with 0 skips and gain +300 gold immediately.',
  },
  {
    id: 'fast-rounds',
    title: 'Fast Rounds',
    description: 'Round-start freeze is halved. All units deal 2x damage. Question buffs and progression are 2x. Correct-answer gold uses the fast-rounds launch bonus.',
  },
]

export function getChaosArtifactPool() {
  return CHAOS_ARTIFACT_POOL
}

export function getChaosArtifactById(id: ChaosArtifactId | null) {
  if (!id) {
    return null
  }

  return CHAOS_ARTIFACT_POOL.find((artifact) => artifact.id === id) ?? null
}

export function rollRandomChaosArtifact(): ChaosArtifactId {
  const index = Math.floor(Math.random() * CHAOS_ARTIFACT_POOL.length)
  return CHAOS_ARTIFACT_POOL[index].id
}

function isChaosArtifactId(value: unknown): value is ChaosArtifactId {
  return typeof value === 'string' && CHAOS_ARTIFACT_POOL.some((artifact) => artifact.id === value)
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function loadRunLaunchProgress(): RunLaunchProgress {
  if (!canUseStorage()) {
    return {
      maxUnlockedDifficulty: 0,
      lastRunReachedRound: 0,
      pendingChaosArtifactId: null,
    }
  }

  try {
    const rawValue = window.localStorage.getItem(RUN_LAUNCH_PROGRESS_STORAGE_KEY)
    if (!rawValue) {
      return {
        maxUnlockedDifficulty: 0,
        lastRunReachedRound: 0,
        pendingChaosArtifactId: null,
      }
    }

    const parsed = JSON.parse(rawValue) as Partial<RunLaunchProgress>
    const maxUnlockedDifficulty = Math.max(0, Math.min(MAX_RUN_DIFFICULTY, Math.floor(parsed.maxUnlockedDifficulty ?? 0))) as RunDifficultyLevel
    const lastRunReachedRound = Math.max(0, Math.floor(parsed.lastRunReachedRound ?? 0))
    const pendingChaosArtifactId = isChaosArtifactId(parsed.pendingChaosArtifactId)
      ? parsed.pendingChaosArtifactId
      : null

    return {
      maxUnlockedDifficulty,
      lastRunReachedRound,
      pendingChaosArtifactId,
    }
  } catch {
    return {
      maxUnlockedDifficulty: 0,
      lastRunReachedRound: 0,
      pendingChaosArtifactId: null,
    }
  }
}

export function saveRunLaunchProgress(progress: RunLaunchProgress) {
  if (!canUseStorage()) {
    return
  }

  try {
    window.localStorage.setItem(RUN_LAUNCH_PROGRESS_STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Ignore storage write failures.
  }
}

export function computeEnemyDifficultyMultiplier(difficultyLevel: RunDifficultyLevel) {
  return 1 + difficultyLevel * 0.1
}

export function computeQuestionGoldMultiplier(config: RunLaunchConfig) {
  const hardQuestionMultiplier = config.startingArtifacts.hardQuestions ? 1.25 : 1
  const fastRoundsMultiplier = config.chaosArtifactId === 'fast-rounds' ? 2.2 : 1
  return hardQuestionMultiplier * fastRoundsMultiplier
}

export function computeQuestionSelectionDifficultyOffset(config: RunLaunchConfig) {
  return config.startingArtifacts.hardQuestions ? 80 : 0
}

export function buildDefaultLaunchConfig(maxUnlockedDifficulty: RunDifficultyLevel): RunLaunchConfig {
  return {
    ...DEFAULT_RUN_LAUNCH_CONFIG,
    difficultyLevel: Math.max(0, Math.min(MAX_RUN_DIFFICULTY, maxUnlockedDifficulty)) as RunDifficultyLevel,
  }
}

export function updateRunLaunchProgressAfterRun(
  previous: RunLaunchProgress,
  runDifficulty: RunDifficultyLevel,
  reachedRound: number,
): RunLaunchProgress {
  const normalizedReachedRound = Math.max(0, Math.floor(reachedRound))
  const unlockedFromRoundClear = normalizedReachedRound >= 10
    ? Math.min(MAX_RUN_DIFFICULTY, runDifficulty + 1)
    : runDifficulty

  const maxUnlockedDifficulty = Math.max(previous.maxUnlockedDifficulty, unlockedFromRoundClear) as RunDifficultyLevel

  return {
    maxUnlockedDifficulty,
    lastRunReachedRound: normalizedReachedRound,
    pendingChaosArtifactId: null,
  }
}
