import type { PlayerStateSnapshot } from './PlayerState'
import type {
  QuizQuestion,
  TranscriptionAttemptProgressByProblem,
  TranscriptionRotationState,
} from '../quiz/QuizQuestionManager'
import type { EnemyKind } from '../gameObjects/Enemy'
import type { RawCodingLanguageId, RawCodingRotationState } from '../quiz/RawCodeManager'
import type { DesignState } from '../ui/SystemDesign/SystemDesignTypes'
import type { SavedStarStory } from '../quiz/StarStoryManager'
import type { RunSummary, RunQuestionDifficultyBreakdown } from '../WaveManager'
import type { AllyType } from '../gameObjects/AlliedFighter'
import type { RunLaunchConfig } from '../ui/RunLaunchConfig'

const SAVE_STORAGE_KEY = 'system-design-game.save.v1'
const SAVE_VERSION = 5
const HIGH_SCORE_STORAGE_KEY = 'system-design-game.high-scores.v1'
const DAILY_ACTIVITY_STORAGE_KEY = 'system-design-game.daily-activity.v1'
const HIGH_SCORE_LIMIT = 10
const LEGACY_ENEMY_DAMAGE_SCALE = 20
const LEGACY_PROJECTILE_SPEED_SCALE = 0.75

export interface QuizSaveState {
  freezeSecondsRemaining: number
  nextQuestionDelaySecondsRemaining: number
  currentQuestionId: string | null
  currentQuestionIndex: number
  currentQuestion: QuizQuestion | null
  askedQuestionIds: string[]
  priorityQuestionIds?: string[]
  quizActive: boolean
  quizCorrectAnswers: number
  quizTotalAnswered: number
  quizAutoAnsweredCount?: number
  quizAutoAnsweredByDifficulty?: RunQuestionDifficultyBreakdown
  quizAutoAnsweredByType?: QuestionTypeBreakdown
  quizAnsweredByDifficulty?: RunQuestionDifficultyBreakdown
  quizAnsweredByType?: QuestionTypeBreakdown
  quizCorrectForNextLife: number
  quizCorrectNeededForNextLife: number
  questionsUntilNextExtraLife: number
  questionsRequiredForNextExtraLife: number
  rawCodingProgress?: {
    questionId: string
    selectedLanguage: RawCodingLanguageId
    sourceCode: string
  }
  orderItemsProgress?: {
    questionId: string
    orderedIndices: number[]
  }
  systemDesignProgress?: {
    questionId: string
    designState: DesignState
    selectedNodeId: string | null
  }
  multiSectionSystemDesignProgress?: {
    questionId: string
    selectedOptionIndices: number[]
    submissionCount: number
  }
  transcriptionAttemptsByProblem?: TranscriptionAttemptProgressByProblem
  rawCodingRotationState?: RawCodingRotationState
  transcriptionRotationState?: TranscriptionRotationState
  starStories?: SavedStarStory[]
}

export interface EnemySaveState {
  id: string
  kind: EnemyKind
  isSummonerReinforcement?: boolean
  position: [number, number, number]
  currentHealth: number
  maxHealth: number
  currentShield: number
  maxShield: number
  attackInterval: number
  projectileDamage: number
  projectileSpeed: number
  attackCooldown: number
  summonCooldown: number
  summonsRemaining: number
  summonIntervalSeconds: number
  burningDamagePerSecond?: number
  burningRemainingSeconds?: number
  frozenRemainingSeconds?: number
  frozenIntensity?: number
}

export interface AllySaveState {
  id: string
  kind: AllyType
  position: [number, number, number]
  currentHealth: number
  maxHealth: number
  attackCooldown: number
}

export interface QuestionNukeSaveState {
  position: [number, number, number]
  targetEnemyId: string | null
  damageAmount: number
  speed: number
  distanceTravelled: number
}

export interface ShopSaveState {
  isOpen: boolean
  wave: number
  rewardOptionIds: string[]
  visibleItemCount?: number
  displayedRewardIds: string[]
}

export interface GameSaveState {
  version: number
  savedAtIso: string
  currentRound: number
  roundsCleared?: number
  runElapsedSeconds?: number
  playerState: PlayerStateSnapshot
  quizState?: QuizSaveState
  shopState?: ShopSaveState
  enemyStates?: EnemySaveState[]
  allyStates?: AllySaveState[]
  questionNukeStates?: QuestionNukeSaveState[]
  runLaunchConfig?: RunLaunchConfig
}

export interface SaveGameInput {
  currentRound: number
  roundsCleared?: number
  runElapsedSeconds?: number
  playerState: PlayerStateSnapshot
  quizState?: QuizSaveState
  shopState?: ShopSaveState
  enemyStates?: EnemySaveState[]
  allyStates?: AllySaveState[]
  questionNukeStates?: QuestionNukeSaveState[]
  runLaunchConfig?: RunLaunchConfig
}

export interface HighScoreEntry extends RunSummary {
  id: string
}

export interface HighScoreBoardState {
  entries: HighScoreEntry[]
}

export interface RecordRunResult {
  board: HighScoreEntry[]
  insertedEntry: HighScoreEntry
  isNewBest: boolean
}

export interface DailyActivityDayStats {
  points: number
  questionsAnswered: number
  questionsAnsweredByDifficulty: RunQuestionDifficultyBreakdown
  questionsAnsweredByType: QuestionTypeBreakdown
  playtimeSeconds: number
}

export interface DailyActivityStats {
  byDate: Record<string, DailyActivityDayStats>
}

export type QuestionTypeKey =
  | 'rawCode'
  | 'multipleChoice'
  | 'starStories'
  | 'starVoice'
  | 'validList'
  | 'orderItems'
  | 'capacity'
  | 'systemDesign'
  | 'multiSectionSystemDesign'

export interface QuestionTypeBreakdown {
  rawCode: number
  multipleChoice: number
  starStories: number
  starVoice: number
  validList: number
  orderItems: number
  capacity: number
  systemDesign: number
  multiSectionSystemDesign: number
}

export const QUESTION_TYPE_LABELS: Record<QuestionTypeKey, string> = {
  rawCode: 'Raw code',
  multipleChoice: 'Multiple choice',
  starStories: 'STAR stories',
  starVoice: 'STAR voice',
  validList: 'Valid-list',
  orderItems: 'Ordering',
  capacity: 'Capacity',
  systemDesign: 'System design',
  multiSectionSystemDesign: 'Multi-section system design',
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isValidDateKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function normalizeEnemySaveState(enemyState: EnemySaveState): EnemySaveState {
  const inferredSummonerReinforcement =
    enemyState.isSummonerReinforcement === true ||
    (enemyState.isSummonerReinforcement === undefined &&
      enemyState.kind === 'grunt' &&
      Math.abs(enemyState.attackInterval - 1.55) < 0.001 &&
      Math.abs(enemyState.projectileDamage - 0.095) < 0.0005 &&
      Math.abs(enemyState.projectileSpeed - 10.6) < 0.001)

  return {
    ...enemyState,
    isSummonerReinforcement: inferredSummonerReinforcement,
    frozenRemainingSeconds: Math.max(0, Math.floor(enemyState.frozenRemainingSeconds ?? 0)),
    frozenIntensity: Math.max(0, Math.min(0.95, enemyState.frozenIntensity ?? 0)),
  }
}

function isValidDailyActivityStats(value: unknown): value is DailyActivityStats {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<DailyActivityStats>
  if (typeof candidate.byDate !== 'object' || candidate.byDate === null) {
    return false
  }

  return Object.entries(candidate.byDate).every(([dateKey, dateStats]) => {
    if (!isValidDateKey(dateKey)) {
      return false
    }

    if (typeof dateStats !== 'object' || dateStats === null) {
      return false
    }

    const stats = dateStats as Partial<DailyActivityDayStats>

    const difficulty = stats.questionsAnsweredByDifficulty as
      | Partial<RunQuestionDifficultyBreakdown>
      | undefined

    const hasValidDifficultyBreakdown =
      difficulty === undefined ||
      (typeof difficulty === 'object' &&
        difficulty !== null &&
        typeof difficulty.easy === 'number' &&
        Number.isFinite(difficulty.easy) &&
        typeof difficulty.medium === 'number' &&
        Number.isFinite(difficulty.medium) &&
        typeof difficulty.hard === 'number' &&
        Number.isFinite(difficulty.hard) &&
        typeof difficulty.veryHard === 'number' &&
        Number.isFinite(difficulty.veryHard) &&
        typeof difficulty.insanelyHard === 'number' &&
        Number.isFinite(difficulty.insanelyHard))

    const byType = stats.questionsAnsweredByType as Partial<QuestionTypeBreakdown> | undefined
    const hasValidQuestionTypeBreakdown =
      byType === undefined ||
      (typeof byType === 'object' &&
        byType !== null &&
        typeof byType.rawCode === 'number' &&
        Number.isFinite(byType.rawCode) &&
        typeof byType.multipleChoice === 'number' &&
        Number.isFinite(byType.multipleChoice) &&
        typeof byType.starStories === 'number' &&
        Number.isFinite(byType.starStories) &&
        typeof byType.starVoice === 'number' &&
        Number.isFinite(byType.starVoice) &&
        typeof byType.validList === 'number' &&
        Number.isFinite(byType.validList) &&
        typeof byType.orderItems === 'number' &&
        Number.isFinite(byType.orderItems) &&
        typeof byType.capacity === 'number' &&
        Number.isFinite(byType.capacity) &&
        typeof byType.systemDesign === 'number' &&
        Number.isFinite(byType.systemDesign) &&
        (byType.multiSectionSystemDesign === undefined ||
          (typeof byType.multiSectionSystemDesign === 'number' && Number.isFinite(byType.multiSectionSystemDesign))))

    return (
      typeof stats.points === 'number' &&
      Number.isFinite(stats.points) &&
      typeof stats.questionsAnswered === 'number' &&
      Number.isFinite(stats.questionsAnswered) &&
      (stats.playtimeSeconds === undefined ||
        (typeof stats.playtimeSeconds === 'number' && Number.isFinite(stats.playtimeSeconds))) &&
      hasValidDifficultyBreakdown &&
      hasValidQuestionTypeBreakdown
    )
  })
}

function createEmptyDifficultyBreakdown(): RunQuestionDifficultyBreakdown {
  return {
    easy: 0,
    medium: 0,
    hard: 0,
    veryHard: 0,
    insanelyHard: 0,
  }
}

export function createEmptyQuestionTypeBreakdown(): QuestionTypeBreakdown {
  return {
    rawCode: 0,
    multipleChoice: 0,
    starStories: 0,
    starVoice: 0,
    validList: 0,
    orderItems: 0,
    capacity: 0,
    systemDesign: 0,
    multiSectionSystemDesign: 0,
  }
}

function normalizeDifficultyBreakdown(
  value?: Partial<RunQuestionDifficultyBreakdown>,
): RunQuestionDifficultyBreakdown {
  return {
    easy: Math.max(0, Math.floor(value?.easy ?? 0)),
    medium: Math.max(0, Math.floor(value?.medium ?? 0)),
    hard: Math.max(0, Math.floor(value?.hard ?? 0)),
    veryHard: Math.max(0, Math.floor(value?.veryHard ?? 0)),
    insanelyHard: Math.max(0, Math.floor(value?.insanelyHard ?? 0)),
  }
}

export function normalizeQuestionTypeBreakdown(
  value?: Partial<QuestionTypeBreakdown>,
): QuestionTypeBreakdown {
  return {
    rawCode: Math.max(0, Math.floor(value?.rawCode ?? 0)),
    multipleChoice: Math.max(0, Math.floor(value?.multipleChoice ?? 0)),
    starStories: Math.max(0, Math.floor(value?.starStories ?? 0)),
    starVoice: Math.max(0, Math.floor(value?.starVoice ?? 0)),
    validList: Math.max(0, Math.floor(value?.validList ?? 0)),
    orderItems: Math.max(0, Math.floor(value?.orderItems ?? 0)),
    capacity: Math.max(0, Math.floor(value?.capacity ?? 0)),
    systemDesign: Math.max(0, Math.floor(value?.systemDesign ?? 0)),
    multiSectionSystemDesign: Math.max(0, Math.floor(value?.multiSectionSystemDesign ?? 0)),
  }
}

function saveDailyActivityStats(stats: DailyActivityStats): boolean {
  if (!canUseStorage()) {
    return false
  }

  try {
    window.localStorage.setItem(DAILY_ACTIVITY_STORAGE_KEY, JSON.stringify(stats))
    return true
  } catch {
    return false
  }
}

function calculateRunScore(enemyKills: number, roundsCleared: number, quizScoreBonus = 0): number {
  return (
    Math.max(0, Math.floor(roundsCleared)) * 100 +
    Math.max(0, Math.floor(enemyKills)) +
    Math.max(0, Math.floor(quizScoreBonus))
  )
}

function isValidHighScoreEntry(value: unknown): value is HighScoreEntry {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<HighScoreEntry>

  const hasValidDifficultyBreakdown =
    candidate.quizAnsweredByDifficulty === undefined ||
    (typeof candidate.quizAnsweredByDifficulty === 'object' &&
      candidate.quizAnsweredByDifficulty !== null &&
      typeof candidate.quizAnsweredByDifficulty.easy === 'number' &&
      Number.isFinite(candidate.quizAnsweredByDifficulty.easy) &&
      typeof candidate.quizAnsweredByDifficulty.medium === 'number' &&
      Number.isFinite(candidate.quizAnsweredByDifficulty.medium) &&
      typeof candidate.quizAnsweredByDifficulty.hard === 'number' &&
      Number.isFinite(candidate.quizAnsweredByDifficulty.hard) &&
      typeof candidate.quizAnsweredByDifficulty.veryHard === 'number' &&
      Number.isFinite(candidate.quizAnsweredByDifficulty.veryHard) &&
      typeof candidate.quizAnsweredByDifficulty.insanelyHard === 'number' &&
      Number.isFinite(candidate.quizAnsweredByDifficulty.insanelyHard))

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.score === 'number' &&
    Number.isFinite(candidate.score) &&
    typeof candidate.enemyKills === 'number' &&
    Number.isFinite(candidate.enemyKills) &&
    typeof candidate.roundsCleared === 'number' &&
    Number.isFinite(candidate.roundsCleared) &&
    typeof candidate.currentRound === 'number' &&
    Number.isFinite(candidate.currentRound) &&
    typeof candidate.completedAtIso === 'string' &&
    (candidate.quizTotalAnswered === undefined ||
      (typeof candidate.quizTotalAnswered === 'number' && Number.isFinite(candidate.quizTotalAnswered))) &&
    hasValidDifficultyBreakdown
  )
}

function sortHighScoreEntries(entries: HighScoreEntry[]) {
  return [...entries].sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score
    }

    if (right.roundsCleared !== left.roundsCleared) {
      return right.roundsCleared - left.roundsCleared
    }

    if (right.enemyKills !== left.enemyKills) {
      return right.enemyKills - left.enemyKills
    }

    return right.completedAtIso.localeCompare(left.completedAtIso)
  })
}

function loadHighScoreEntriesInternal(): HighScoreEntry[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(HIGH_SCORE_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidHighScoreEntry)
  } catch {
    return []
  }
}

function saveHighScoreEntries(entries: HighScoreEntry[]): boolean {
  if (!canUseStorage()) {
    return false
  }

  try {
    window.localStorage.setItem(HIGH_SCORE_STORAGE_KEY, JSON.stringify(entries))
    return true
  } catch {
    return false
  }
}

function isValidSaveState(value: unknown): value is GameSaveState {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<GameSaveState>
  const versionIsSupported =
    candidate.version === 1 || candidate.version === 2 || candidate.version === 3 || candidate.version === SAVE_VERSION

  if (!versionIsSupported) {
    return false
  }

  if (candidate.quizState !== undefined) {
    const quizState = candidate.quizState as Partial<QuizSaveState>
    if (typeof quizState !== 'object' || quizState === null) {
      return false
    }

    if (
      typeof quizState.freezeSecondsRemaining !== 'number' ||
      !Number.isFinite(quizState.freezeSecondsRemaining) ||
      typeof quizState.nextQuestionDelaySecondsRemaining !== 'number' ||
      !Number.isFinite(quizState.nextQuestionDelaySecondsRemaining) ||
      typeof quizState.quizActive !== 'boolean' ||
      typeof quizState.quizCorrectAnswers !== 'number' ||
      !Number.isFinite(quizState.quizCorrectAnswers) ||
      typeof quizState.quizTotalAnswered !== 'number' ||
      !Number.isFinite(quizState.quizTotalAnswered) ||
      typeof quizState.quizCorrectForNextLife !== 'number' ||
      !Number.isFinite(quizState.quizCorrectForNextLife) ||
      typeof quizState.quizCorrectNeededForNextLife !== 'number' ||
      !Number.isFinite(quizState.quizCorrectNeededForNextLife)
    ) {
      return false
    }

    if (quizState.quizAnsweredByDifficulty !== undefined) {
      const breakdown = quizState.quizAnsweredByDifficulty as Partial<RunQuestionDifficultyBreakdown>
      if (
        typeof breakdown !== 'object' ||
        breakdown === null ||
        typeof breakdown.easy !== 'number' ||
        !Number.isFinite(breakdown.easy) ||
        typeof breakdown.medium !== 'number' ||
        !Number.isFinite(breakdown.medium) ||
        typeof breakdown.hard !== 'number' ||
        !Number.isFinite(breakdown.hard) ||
        typeof breakdown.veryHard !== 'number' ||
        !Number.isFinite(breakdown.veryHard) ||
        typeof breakdown.insanelyHard !== 'number' ||
        !Number.isFinite(breakdown.insanelyHard)
      ) {
        return false
      }
    }

    if (quizState.quizAnsweredByType !== undefined) {
      const byType = quizState.quizAnsweredByType as Partial<QuestionTypeBreakdown>
      if (
        typeof byType !== 'object' ||
        byType === null ||
        typeof byType.rawCode !== 'number' ||
        !Number.isFinite(byType.rawCode) ||
        typeof byType.multipleChoice !== 'number' ||
        !Number.isFinite(byType.multipleChoice) ||
        typeof byType.starStories !== 'number' ||
        !Number.isFinite(byType.starStories) ||
        typeof byType.starVoice !== 'number' ||
        !Number.isFinite(byType.starVoice) ||
        typeof byType.validList !== 'number' ||
        !Number.isFinite(byType.validList) ||
        typeof byType.orderItems !== 'number' ||
        !Number.isFinite(byType.orderItems) ||
        typeof byType.capacity !== 'number' ||
        !Number.isFinite(byType.capacity) ||
        typeof byType.systemDesign !== 'number' ||
        !Number.isFinite(byType.systemDesign) ||
        (byType.multiSectionSystemDesign !== undefined &&
          (typeof byType.multiSectionSystemDesign !== 'number' || !Number.isFinite(byType.multiSectionSystemDesign)))
      ) {
        return false
      }
    }

    if (
      quizState.questionsUntilNextExtraLife !== undefined &&
      (typeof quizState.questionsUntilNextExtraLife !== 'number' ||
        !Number.isFinite(quizState.questionsUntilNextExtraLife))
    ) {
      return false
    }

    if (
      quizState.questionsRequiredForNextExtraLife !== undefined &&
      (typeof quizState.questionsRequiredForNextExtraLife !== 'number' ||
        !Number.isFinite(quizState.questionsRequiredForNextExtraLife))
    ) {
      return false
    }

    if (
      quizState.starStories !== undefined &&
      !Array.isArray(quizState.starStories)
    ) {
      return false
    }

    if (quizState.rawCodingProgress !== undefined) {
      const rawCodingProgress = quizState.rawCodingProgress as {
        questionId?: unknown
        selectedLanguage?: unknown
        sourceCode?: unknown
      }
      const isValidRawCodingLanguage =
        rawCodingProgress.selectedLanguage === 'javascript' ||
        rawCodingProgress.selectedLanguage === 'python' ||
        rawCodingProgress.selectedLanguage === 'java' ||
        rawCodingProgress.selectedLanguage === 'cpp' ||
        rawCodingProgress.selectedLanguage === 'csharp' ||
        rawCodingProgress.selectedLanguage === 'go'

      if (
        typeof rawCodingProgress !== 'object' ||
        rawCodingProgress === null ||
        typeof rawCodingProgress.questionId !== 'string' ||
        !isValidRawCodingLanguage ||
        typeof rawCodingProgress.sourceCode !== 'string'
      ) {
        return false
      }
    }

    if (quizState.orderItemsProgress !== undefined) {
      const orderItemsProgress = quizState.orderItemsProgress as {
        questionId?: unknown
        orderedIndices?: unknown
      }

      if (
        typeof orderItemsProgress !== 'object' ||
        orderItemsProgress === null ||
        typeof orderItemsProgress.questionId !== 'string' ||
        !Array.isArray(orderItemsProgress.orderedIndices) ||
        !orderItemsProgress.orderedIndices.every(
          (index) => typeof index === 'number' && Number.isInteger(index) && index >= 0,
        )
      ) {
        return false
      }
    }

    if (quizState.systemDesignProgress !== undefined) {
      const systemDesignProgress = quizState.systemDesignProgress as {
        questionId?: unknown
        selectedNodeId?: unknown
        designState?: unknown
      }

      if (
        typeof systemDesignProgress !== 'object' ||
        systemDesignProgress === null ||
        typeof systemDesignProgress.questionId !== 'string' ||
        (systemDesignProgress.selectedNodeId !== null && typeof systemDesignProgress.selectedNodeId !== 'string') ||
        typeof systemDesignProgress.designState !== 'object' ||
        systemDesignProgress.designState === null
      ) {
        return false
      }
    }

    if (quizState.transcriptionAttemptsByProblem !== undefined) {
      const transcriptionAttemptsByProblem = quizState.transcriptionAttemptsByProblem
      if (
        typeof transcriptionAttemptsByProblem !== 'object' ||
        transcriptionAttemptsByProblem === null ||
        Array.isArray(transcriptionAttemptsByProblem)
      ) {
        return false
      }

      const allProgressEntriesValid = Object.values(transcriptionAttemptsByProblem).every((progress) => {
        if (typeof progress !== 'object' || progress === null) {
          return false
        }

        const candidate = progress as Partial<{ easy: number; medium: number; hard: number }>
        return (
          typeof candidate.easy === 'number' &&
          Number.isFinite(candidate.easy) &&
          candidate.easy >= 0 &&
          typeof candidate.medium === 'number' &&
          Number.isFinite(candidate.medium) &&
          candidate.medium >= 0 &&
          typeof candidate.hard === 'number' &&
          Number.isFinite(candidate.hard) &&
          candidate.hard >= 0
        )
      })

      if (!allProgressEntriesValid) {

      if (quizState.multiSectionSystemDesignProgress !== undefined) {
        const multiSectionSystemDesignProgress = quizState.multiSectionSystemDesignProgress as {
          questionId?: unknown
          selectedOptionIndices?: unknown
          submissionCount?: unknown
        }

        if (
          typeof multiSectionSystemDesignProgress !== 'object' ||
          multiSectionSystemDesignProgress === null ||
          typeof multiSectionSystemDesignProgress.questionId !== 'string' ||
          !Array.isArray(multiSectionSystemDesignProgress.selectedOptionIndices) ||
          !multiSectionSystemDesignProgress.selectedOptionIndices.every(
            (index) => typeof index === 'number' && Number.isInteger(index) && index >= -1,
          ) ||
          typeof multiSectionSystemDesignProgress.submissionCount !== 'number' ||
          !Number.isFinite(multiSectionSystemDesignProgress.submissionCount) ||
          multiSectionSystemDesignProgress.submissionCount < 0
        ) {
          return false
        }
      }
        return false
      }
    }

    if (quizState.transcriptionRotationState !== undefined) {
      const transcriptionRotationState = quizState.transcriptionRotationState as Partial<TranscriptionRotationState>
      if (
        typeof transcriptionRotationState !== 'object' ||
        transcriptionRotationState === null ||
        typeof transcriptionRotationState.queuesByPoolKey !== 'object' ||
        transcriptionRotationState.queuesByPoolKey === null ||
        Array.isArray(transcriptionRotationState.queuesByPoolKey) ||
        (transcriptionRotationState.lastQuestionId !== null &&
          transcriptionRotationState.lastQuestionId !== undefined &&
          typeof transcriptionRotationState.lastQuestionId !== 'string')
      ) {
        return false
      }

      if (
        transcriptionRotationState.problemQueue !== undefined &&
        (!Array.isArray(transcriptionRotationState.problemQueue) ||
          !transcriptionRotationState.problemQueue.every((problemId) => typeof problemId === 'string'))
      ) {
        return false
      }

      if (
        transcriptionRotationState.lastProblemId !== undefined &&
        transcriptionRotationState.lastProblemId !== null &&
        typeof transcriptionRotationState.lastProblemId !== 'string'
      ) {
        return false
      }

      const queueEntriesAreValid = Object.values(transcriptionRotationState.queuesByPoolKey).every((queue) => {
        return Array.isArray(queue) && queue.every((questionId) => typeof questionId === 'string')
      })


    if (quizState.rawCodingRotationState !== undefined) {
      const rawCodingRotationState = quizState.rawCodingRotationState as Partial<RawCodingRotationState>
      if (
        typeof rawCodingRotationState !== 'object' ||
        rawCodingRotationState === null ||
        typeof rawCodingRotationState.queuesByPoolKey !== 'object' ||
        rawCodingRotationState.queuesByPoolKey === null ||
        Array.isArray(rawCodingRotationState.queuesByPoolKey)
      ) {
        return false
      }

      const queueEntriesAreValid = Object.values(rawCodingRotationState.queuesByPoolKey).every((queue) => {
        return Array.isArray(queue) && queue.every((questionId) => typeof questionId === 'string')
      })

      if (!queueEntriesAreValid) {
        return false
      }
    }
      if (!queueEntriesAreValid) {
        return false
      }
    }

    if (
      quizState.priorityQuestionIds !== undefined &&
      (!Array.isArray(quizState.priorityQuestionIds) ||
        !quizState.priorityQuestionIds.every((questionId) => typeof questionId === 'string'))
    ) {
      return false
    }

    if (quizState.starStories !== undefined) {
      if (!Array.isArray(quizState.starStories)) {
        return false
      }

      const allStoriesValid = quizState.starStories.every((story) => {
        if (typeof story !== 'object' || story === null) {
          return false
        }

        const candidate = story as Partial<SavedStarStory>
        return typeof candidate.fileName === 'string' && typeof candidate.rawText === 'string'
      })

      if (!allStoriesValid) {
        return false
      }
    }
  }

  if (candidate.shopState !== undefined) {
    const shopState = candidate.shopState as Partial<ShopSaveState>
    if (
      typeof shopState !== 'object' ||
      shopState === null ||
      typeof shopState.isOpen !== 'boolean' ||
      typeof shopState.wave !== 'number' ||
      !Number.isFinite(shopState.wave) ||
      shopState.wave < 1 ||
      !Array.isArray(shopState.rewardOptionIds) ||
      !shopState.rewardOptionIds.every((id) => typeof id === 'string') ||
      (shopState.visibleItemCount !== undefined &&
        (typeof shopState.visibleItemCount !== 'number' ||
          !Number.isFinite(shopState.visibleItemCount) ||
          shopState.visibleItemCount < 1)) ||
      !Array.isArray(shopState.displayedRewardIds) ||
      !shopState.displayedRewardIds.every((id) => typeof id === 'string')
    ) {
      return false
    }
  }

  if (candidate.enemyStates !== undefined) {
    if (!Array.isArray(candidate.enemyStates)) {
      return false
    }

    const everyEnemyStateValid = candidate.enemyStates.every((enemyState) => {
      if (typeof enemyState !== 'object' || enemyState === null) {
        return false
      }

      const snapshot = enemyState as Partial<EnemySaveState>
      return (
        (snapshot.kind === 'grunt' ||
          snapshot.kind === 'boss' ||
          snapshot.kind === 'shield-drainer' ||
          snapshot.kind === 'summoner' ||
          snapshot.kind === 'bubbler') &&
        Array.isArray(snapshot.position) &&
        snapshot.position.length === 3 &&
        snapshot.position.every((value) => typeof value === 'number' && Number.isFinite(value)) &&
        typeof snapshot.currentHealth === 'number' &&
        Number.isFinite(snapshot.currentHealth) &&
        typeof snapshot.maxHealth === 'number' &&
        Number.isFinite(snapshot.maxHealth) &&
        (snapshot.isSummonerReinforcement === undefined || typeof snapshot.isSummonerReinforcement === 'boolean') &&
        (snapshot.burningDamagePerSecond === undefined ||
          (typeof snapshot.burningDamagePerSecond === 'number' &&
            Number.isFinite(snapshot.burningDamagePerSecond) &&
            snapshot.burningDamagePerSecond >= 0)) &&
        (snapshot.burningRemainingSeconds === undefined ||
          (typeof snapshot.burningRemainingSeconds === 'number' &&
            Number.isFinite(snapshot.burningRemainingSeconds) &&
            snapshot.burningRemainingSeconds >= 0)) &&
        (snapshot.frozenRemainingSeconds === undefined ||
          (typeof snapshot.frozenRemainingSeconds === 'number' &&
            Number.isFinite(snapshot.frozenRemainingSeconds) &&
            snapshot.frozenRemainingSeconds >= 0)) &&
        (snapshot.frozenIntensity === undefined ||
          (typeof snapshot.frozenIntensity === 'number' &&
            Number.isFinite(snapshot.frozenIntensity) &&
            snapshot.frozenIntensity >= 0))
      )
    })

    if (!everyEnemyStateValid) {
      return false
    }
  }

  if (candidate.allyStates !== undefined) {
    if (!Array.isArray(candidate.allyStates)) {
      return false
    }

    const everyAllyStateValid = candidate.allyStates.every((allyState) => {
      if (typeof allyState !== 'object' || allyState === null) {
        return false
      }

      const snapshot = allyState as Partial<AllySaveState>
      return (
        typeof snapshot.id === 'string' &&
        (snapshot.kind === 'mini' || snapshot.kind === 'boss') &&
        Array.isArray(snapshot.position) &&
        snapshot.position.length === 3 &&
        snapshot.position.every((value) => typeof value === 'number' && Number.isFinite(value)) &&
        typeof snapshot.currentHealth === 'number' &&
        Number.isFinite(snapshot.currentHealth) &&
        typeof snapshot.maxHealth === 'number' &&
        Number.isFinite(snapshot.maxHealth) &&
        typeof snapshot.attackCooldown === 'number' &&
        Number.isFinite(snapshot.attackCooldown)
      )
    })

    if (!everyAllyStateValid) {
      return false
    }
  }

  if (candidate.questionNukeStates !== undefined) {
    if (!Array.isArray(candidate.questionNukeStates)) {
      return false
    }

    const everyQuestionNukeStateValid = candidate.questionNukeStates.every((nukeState) => {
      if (typeof nukeState !== 'object' || nukeState === null) {
        return false
      }

      const snapshot = nukeState as Partial<QuestionNukeSaveState>
      return (
        Array.isArray(snapshot.position) &&
        snapshot.position.length === 3 &&
        snapshot.position.every((value) => typeof value === 'number' && Number.isFinite(value)) &&
        (snapshot.targetEnemyId === null || typeof snapshot.targetEnemyId === 'string') &&
        typeof snapshot.damageAmount === 'number' &&
        Number.isFinite(snapshot.damageAmount) &&
        typeof snapshot.speed === 'number' &&
        Number.isFinite(snapshot.speed) &&
        typeof snapshot.distanceTravelled === 'number' &&
        Number.isFinite(snapshot.distanceTravelled)
      )
    })

    if (!everyQuestionNukeStateValid) {
      return false
    }
  }

  return (
    typeof candidate.savedAtIso === 'string' &&
    typeof candidate.currentRound === 'number' &&
    Number.isFinite(candidate.currentRound) &&
    candidate.currentRound >= 1 &&
    (candidate.runElapsedSeconds === undefined ||
      (typeof candidate.runElapsedSeconds === 'number' &&
        Number.isFinite(candidate.runElapsedSeconds) &&
        candidate.runElapsedSeconds >= 0)) &&
    (candidate.roundsCleared === undefined ||
      (typeof candidate.roundsCleared === 'number' && Number.isFinite(candidate.roundsCleared) && candidate.roundsCleared >= 0)) &&
    typeof candidate.playerState === 'object' &&
    candidate.playerState !== null
  )
}

export function saveGameState(input: SaveGameInput): boolean {
  if (!canUseStorage()) {
    return false
  }

  try {
    const payload: GameSaveState = {
      version: SAVE_VERSION,
      savedAtIso: new Date().toISOString(),
      currentRound: Math.max(1, Math.floor(input.currentRound)),
      roundsCleared: input.roundsCleared !== undefined ? Math.max(0, Math.floor(input.roundsCleared)) : undefined,
      runElapsedSeconds:
        input.runElapsedSeconds !== undefined ? Math.max(0, Math.floor(input.runElapsedSeconds)) : undefined,
      playerState: {
        ...input.playerState,
        skips: Math.max(0, Math.floor(input.playerState.skips ?? 3)),
      },
      quizState: input.quizState,
      shopState: input.shopState,
      enemyStates: input.enemyStates?.map((enemyState) => normalizeEnemySaveState(enemyState)),
      allyStates: input.allyStates,
      questionNukeStates: input.questionNukeStates,
      runLaunchConfig: input.runLaunchConfig,
    }

    window.localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function loadGameState(): GameSaveState | null {
  if (!canUseStorage()) {
    return null
  }

  try {
    const raw = window.localStorage.getItem(SAVE_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as unknown
    if (!isValidSaveState(parsed)) {
      return null
    }

    if (parsed.version === 2 && Array.isArray(parsed.enemyStates)) {
      parsed.enemyStates = parsed.enemyStates.map((enemyState) => ({
        ...enemyState,
        projectileDamage: enemyState.projectileDamage / LEGACY_ENEMY_DAMAGE_SCALE,
        projectileSpeed: enemyState.projectileSpeed / LEGACY_PROJECTILE_SPEED_SCALE,
      }))
    }

    if (Array.isArray(parsed.enemyStates)) {
      parsed.enemyStates = parsed.enemyStates.map((enemyState) => normalizeEnemySaveState(enemyState))
    }

    if (parsed.roundsCleared === undefined) {
      parsed.roundsCleared = Math.max(0, Math.floor(parsed.currentRound - 1))
    }

    if (typeof parsed.playerState.skips !== 'number' || !Number.isFinite(parsed.playerState.skips)) {
      parsed.playerState.skips = 3
    } else {
      parsed.playerState.skips = Math.max(0, Math.floor(parsed.playerState.skips))
    }

    if (
      typeof parsed.playerState.questionAnswerGoldMultiplier !== 'number' ||
      !Number.isFinite(parsed.playerState.questionAnswerGoldMultiplier)
    ) {
      parsed.playerState.questionAnswerGoldMultiplier = 1
    }

    if (
      typeof parsed.playerState.enemyKillGoldMultiplier !== 'number' ||
      !Number.isFinite(parsed.playerState.enemyKillGoldMultiplier)
    ) {
      parsed.playerState.enemyKillGoldMultiplier = 1
    }

    if (!Array.isArray(parsed.playerState.goldMultiplierContributors)) {
      parsed.playerState.goldMultiplierContributors = []
    }

    return parsed
  } catch {
    return null
  }
}

export function clearSavedGameState(): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(SAVE_STORAGE_KEY)
}

export function hasSavedGameState(): boolean {
  return loadGameState() !== null
}

export function calculateScoreFromRun(enemyKills: number, roundsCleared: number, quizScoreBonus = 0): number {
  return calculateRunScore(enemyKills, roundsCleared, quizScoreBonus)
}

export function loadHighScoreBoard(): HighScoreEntry[] {
  return sortHighScoreEntries(loadHighScoreEntriesInternal()).slice(0, HIGH_SCORE_LIMIT)
}

export function loadDailyActivityStats(): DailyActivityStats {
  if (!canUseStorage()) {
    return { byDate: {} }
  }

  try {
    const raw = window.localStorage.getItem(DAILY_ACTIVITY_STORAGE_KEY)
    if (!raw) {
      return { byDate: {} }
    }

    const parsed = JSON.parse(raw) as unknown
    if (!isValidDailyActivityStats(parsed)) {
      return { byDate: {} }
    }

    const normalizedByDate = Object.entries(parsed.byDate).reduce<Record<string, DailyActivityDayStats>>(
      (result, [dateKey, dayStats]) => {
        result[dateKey] = {
          points: Math.max(0, Math.floor(dayStats.points)),
          questionsAnswered: Math.max(0, Math.floor(dayStats.questionsAnswered)),
          questionsAnsweredByDifficulty: normalizeDifficultyBreakdown(dayStats.questionsAnsweredByDifficulty),
          questionsAnsweredByType: normalizeQuestionTypeBreakdown(dayStats.questionsAnsweredByType),
          playtimeSeconds: Math.max(0, Math.floor(dayStats.playtimeSeconds ?? 0)),
        }
        return result
      },
      {},
    )

    return { byDate: normalizedByDate }
  } catch {
    return { byDate: {} }
  }
}

export function recordDailyActivityDeltas(input: {
  pointsDelta?: number
  questionsAnsweredDelta?: number
  questionsAnsweredByDifficultyDelta?: Partial<RunQuestionDifficultyBreakdown>
  questionsAnsweredByTypeDelta?: Partial<QuestionTypeBreakdown>
  playtimeSecondsDelta?: number
  date?: Date
}): DailyActivityStats | null {
  if (!canUseStorage()) {
    return null
  }

  const pointsDelta = Math.max(0, Math.floor(input.pointsDelta ?? 0))
  const questionsAnsweredDelta = Math.max(0, Math.floor(input.questionsAnsweredDelta ?? 0))
  const playtimeSecondsDelta = Math.max(0, Math.floor(input.playtimeSecondsDelta ?? 0))
  const answeredByDifficultyDelta = normalizeDifficultyBreakdown(input.questionsAnsweredByDifficultyDelta)
  const answeredByTypeDelta = normalizeQuestionTypeBreakdown(input.questionsAnsweredByTypeDelta)
  const hasDifficultyDelta =
    answeredByDifficultyDelta.easy > 0 ||
    answeredByDifficultyDelta.medium > 0 ||
    answeredByDifficultyDelta.hard > 0 ||
    answeredByDifficultyDelta.veryHard > 0 ||
    answeredByDifficultyDelta.insanelyHard > 0

  const hasTypeDelta =
    answeredByTypeDelta.rawCode > 0 ||
    answeredByTypeDelta.multipleChoice > 0 ||
    answeredByTypeDelta.starStories > 0 ||
    answeredByTypeDelta.starVoice > 0 ||
    answeredByTypeDelta.validList > 0 ||
    answeredByTypeDelta.orderItems > 0 ||
    answeredByTypeDelta.capacity > 0 ||
    answeredByTypeDelta.systemDesign > 0 ||
    answeredByTypeDelta.multiSectionSystemDesign > 0

  if (pointsDelta <= 0 && questionsAnsweredDelta <= 0 && playtimeSecondsDelta <= 0 && !hasDifficultyDelta && !hasTypeDelta) {
    return loadDailyActivityStats()
  }

  const dateKey = toDateKey(input.date ?? new Date())
  const current = loadDailyActivityStats()
  const existing = current.byDate[dateKey] ?? {
    points: 0,
    questionsAnswered: 0,
    questionsAnsweredByDifficulty: createEmptyDifficultyBreakdown(),
    questionsAnsweredByType: createEmptyQuestionTypeBreakdown(),
    playtimeSeconds: 0,
  }
  const existingDifficulty = normalizeDifficultyBreakdown(existing.questionsAnsweredByDifficulty)
  const existingTypes = normalizeQuestionTypeBreakdown(existing.questionsAnsweredByType)

  const next: DailyActivityStats = {
    byDate: {
      ...current.byDate,
      [dateKey]: {
        points: Math.max(0, Math.floor(existing.points + pointsDelta)),
        questionsAnswered: Math.max(0, Math.floor(existing.questionsAnswered + questionsAnsweredDelta)),
        playtimeSeconds: Math.max(0, Math.floor(existing.playtimeSeconds + playtimeSecondsDelta)),
        questionsAnsweredByDifficulty: {
          easy: Math.max(0, Math.floor(existingDifficulty.easy + answeredByDifficultyDelta.easy)),
          medium: Math.max(0, Math.floor(existingDifficulty.medium + answeredByDifficultyDelta.medium)),
          hard: Math.max(0, Math.floor(existingDifficulty.hard + answeredByDifficultyDelta.hard)),
          veryHard: Math.max(0, Math.floor(existingDifficulty.veryHard + answeredByDifficultyDelta.veryHard)),
          insanelyHard: Math.max(0, Math.floor(existingDifficulty.insanelyHard + answeredByDifficultyDelta.insanelyHard)),
        },
        questionsAnsweredByType: {
          rawCode: Math.max(0, Math.floor(existingTypes.rawCode + answeredByTypeDelta.rawCode)),
          multipleChoice: Math.max(0, Math.floor(existingTypes.multipleChoice + answeredByTypeDelta.multipleChoice)),
          starStories: Math.max(0, Math.floor(existingTypes.starStories + answeredByTypeDelta.starStories)),
          starVoice: Math.max(0, Math.floor(existingTypes.starVoice + answeredByTypeDelta.starVoice)),
          validList: Math.max(0, Math.floor(existingTypes.validList + answeredByTypeDelta.validList)),
          orderItems: Math.max(0, Math.floor(existingTypes.orderItems + answeredByTypeDelta.orderItems)),
          capacity: Math.max(0, Math.floor(existingTypes.capacity + answeredByTypeDelta.capacity)),
          systemDesign: Math.max(0, Math.floor(existingTypes.systemDesign + answeredByTypeDelta.systemDesign)),
          multiSectionSystemDesign: Math.max(
            0,
            Math.floor(existingTypes.multiSectionSystemDesign + answeredByTypeDelta.multiSectionSystemDesign),
          ),
        },
      },
    },
  }

  saveDailyActivityStats(next)
  return next
}

export function recordDailyPlaytimeRange(input: {
  startTimeMs: number
  durationSeconds: number
}): DailyActivityStats | null {
  if (!canUseStorage()) {
    return null
  }

  const durationSeconds = Math.max(0, Math.floor(input.durationSeconds))
  if (durationSeconds <= 0) {
    return loadDailyActivityStats()
  }

  let currentStartMs = Math.max(0, Math.floor(input.startTimeMs))
  let remainingSeconds = durationSeconds
  let nextStats = loadDailyActivityStats()

  while (remainingSeconds > 0) {
    const currentDate = new Date(currentStartMs)
    const nextDayStartMs = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    ).getTime()
    const secondsUntilNextDay = Math.max(1, Math.ceil((nextDayStartMs - currentStartMs) / 1000))
    const allocatedSeconds = Math.min(remainingSeconds, secondsUntilNextDay)

    nextStats =
      recordDailyActivityDeltas({
        playtimeSecondsDelta: allocatedSeconds,
        date: currentDate,
      }) ?? nextStats

    currentStartMs += allocatedSeconds * 1000
    remainingSeconds -= allocatedSeconds
  }

  return nextStats
}

export function recordRunInHighScoreBoard(input: {
  enemyKills: number
  roundsCleared: number
  currentRound: number
  score?: number
  quizScoreBonus?: number
  quizTotalAnswered?: number
  quizAnsweredByDifficulty?: RunQuestionDifficultyBreakdown
  completedAtIso?: string
}): RecordRunResult | null {
  if (!canUseStorage()) {
    return null
  }

  const completedAtIso = input.completedAtIso ?? new Date().toISOString()
  const insertedEntry: HighScoreEntry = {
    id: `${completedAtIso}-${Math.random().toString(36).slice(2, 9)}`,
    score:
      typeof input.score === 'number' && Number.isFinite(input.score)
        ? Math.max(0, Math.floor(input.score))
        : calculateRunScore(input.enemyKills, input.roundsCleared, input.quizScoreBonus ?? 0),
    enemyKills: Math.max(0, Math.floor(input.enemyKills)),
    roundsCleared: Math.max(0, Math.floor(input.roundsCleared)),
    currentRound: Math.max(1, Math.floor(input.currentRound)),
    completedAtIso,
    quizTotalAnswered: Math.max(0, Math.floor(input.quizTotalAnswered ?? 0)),
    quizAnsweredByDifficulty: {
      easy: Math.max(0, Math.floor(input.quizAnsweredByDifficulty?.easy ?? 0)),
      medium: Math.max(0, Math.floor(input.quizAnsweredByDifficulty?.medium ?? 0)),
      hard: Math.max(0, Math.floor(input.quizAnsweredByDifficulty?.hard ?? 0)),
      veryHard: Math.max(0, Math.floor(input.quizAnsweredByDifficulty?.veryHard ?? 0)),
      insanelyHard: Math.max(0, Math.floor(input.quizAnsweredByDifficulty?.insanelyHard ?? 0)),
    },
  }

  const updatedEntries = sortHighScoreEntries([...loadHighScoreEntriesInternal(), insertedEntry]).slice(0, HIGH_SCORE_LIMIT)
  saveHighScoreEntries(updatedEntries)

  return {
    board: updatedEntries,
    insertedEntry,
    isNewBest: updatedEntries[0]?.id === insertedEntry.id,
  }
}
