import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Player } from './Player/Player'
import {
  createInitialPlayerStateSnapshot,
  getPlayerStateSignature,
  type PlayerStateSnapshot,
} from './Player/PlayerState'
import { mountWebGLWorld } from './WebGLWorld'
import {
  WaveManager,
  type RewardPrompt,
  type RunQuestionDifficultyBreakdown,
  type RunSummary,
} from './WaveManager'
import { OverlayStack, useOverlaySystem } from './ui/OverlaySystem'
import { BuffsPanel } from './ui/BuffsPanel'
import type { QuizFreezeUiState, QuizWorldControls } from './ui/QuizPanel'
import { QuizPanelQuestionsView } from './ui/QuizPanelQuestions'
import {
  DEFAULT_SHOP_VISIBLE_ITEM_COUNT,
  REROLLED_SHOP_VISIBLE_ITEM_COUNT,
  ShopOverlay,
  reconcileDisplayedRewardIds,
  useShopController,
} from './ui/Shop'
import { MainMenuButton } from './ui/MainMenuButton'
import { ArtifactIconBar } from './ui/ArtifactIconBar'
import { getRankProgress, getTodayStats } from './ui/DailyRankBubble'
import { QuestionExplorer } from './ui/QuestionExplorer'
import { RunLaunchSetup } from './ui/RunLaunchSetup'
import { StarStoriesRunSetup } from './ui/StarStoriesRunSetup'
import { FocusDialog } from './ui/FocusDialog'
import { MicOnlyIndicator } from './ui/MicOnlyIndicator'
import { StarVoiceProgressDialog, type StarVoiceStoryProgressRow } from './ui/StarVoiceProgressDialog'
import {
  calculateScoreFromRun,
  createEmptyQuestionTypeBreakdown,
  clearSavedGameState,
  loadDailyActivityStats,
  loadGameState,
  loadHighScoreBoard,
  recordDailyActivityDeltas,
  recordDailyPlaytimeRange,
  recordRunInHighScoreBoard,
  saveGameState,
  type DailyActivityStats,
  type HighScoreEntry,
  type QuestionTypeBreakdown,
} from './Player/GameSaving'
import type { AllySaveState } from './Player/GameSaving'
import type { EnemySaveState } from './Player/GameSaving'
import type { QuestionNukeSaveState } from './Player/GameSaving'
import {
  getQuizQuestionById,
  getActiveQuizFocusFilters,
  getDefaultQuizFocusFilters,
  setQuizFocusFilters,
  setRuntimeQuizQuestionBank,
  type TranscriptionAttemptProgressByProblem,
  type QuizFocusFilters,
} from './quiz/QuizQuestionManager'
import { buildStarStoryQuestionBank, parseStarStory, type SavedStarStory } from './quiz/StarStoryManager'
import {
  buildDefaultLaunchConfig,
  computeEnemyDifficultyMultiplier,
  DEFAULT_RUN_LAUNCH_CONFIG,
  loadRunLaunchProgress,
  MAX_RUN_DIFFICULTY,
  RUN_DIFFICULTY_LABELS,
  saveRunLaunchProgress,
  updateRunLaunchProgressAfterRun,
  type RunLaunchConfig,
  type RunDifficultyLevel,
  type RunLaunchProgress,
} from './ui/RunLaunchConfig'
import {
  buildArtifactBonusSnapshot,
} from './Player/ArtifactBonusPipeline'

const GLOBAL_INCOMING_DAMAGE_MULTIPLIER = 0.7
const STAR_STORY_RUNTIME_BANK_KEY = 'star-stories'
const QUIZ_FOCUS_FILTERS_STORAGE_KEY = 'system-design-game.quiz-focus-filters.v1'
const STAR_VOICE_PROGRESS_TARGET_PER_DIFFICULTY = 2
const QUESTION_EXPLORER_HISTORY_STORAGE_KEY = 'system-design-game.question-explorer-history.v1'
const STAR_WORKFLOW_DEBUG_LOGGING = true

function loadQuestionExplorerSeenQuestionIds(): string[] {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(QUESTION_EXPLORER_HISTORY_STORAGE_KEY)
    if (!rawValue) {
      return []
    }

    const parsed = JSON.parse(rawValue) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return Array.from(
      new Set(
        parsed
          .filter((value): value is string => typeof value === 'string')
          .map((value) => value.trim())
          .filter((value) => value.length > 0),
      ),
    )
  } catch {
    return []
  }
}

function saveQuestionExplorerSeenQuestionIds(questionIds: string[]): void {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(QUESTION_EXPLORER_HISTORY_STORAGE_KEY, JSON.stringify(questionIds))
  } catch {
    // Ignore storage write failures.
  }
}

function loadStoredQuizFocusFilters(): QuizFocusFilters {
  const defaults = getDefaultQuizFocusFilters()
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return defaults
  }

  const rawValue = window.localStorage.getItem(QUIZ_FOCUS_FILTERS_STORAGE_KEY)
  if (!rawValue) {
    return defaults
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<QuizFocusFilters>
    return {
      ...defaults,
      ...parsed,
      advanced: {
        ...defaults.advanced,
        ...(parsed.advanced ?? {}),
        rawCodeSources: {
          ...defaults.advanced.rawCodeSources,
          ...(parsed.advanced?.rawCodeSources ?? {}),
        },
        rawCodeLiveCodeTopics: {
          ...defaults.advanced.rawCodeLiveCodeTopics,
          ...(parsed.advanced?.rawCodeLiveCodeTopics ?? {}),
        },
        multipleChoiceTopics: {
          ...defaults.advanced.multipleChoiceTopics,
          ...(parsed.advanced?.multipleChoiceTopics ?? {}),
        },
        validListTopics: {
          ...defaults.advanced.validListTopics,
          ...(parsed.advanced?.validListTopics ?? {}),
        },
        orderItemsTopics: {
          ...defaults.advanced.orderItemsTopics,
          ...(parsed.advanced?.orderItemsTopics ?? {}),
        },
        capacityTopics: {
          ...defaults.advanced.capacityTopics,
          ...(parsed.advanced?.capacityTopics ?? {}),
        },
        systemDesignTopics: {
          ...defaults.advanced.systemDesignTopics,
          ...(parsed.advanced?.systemDesignTopics ?? {}),
        },
        starStoriesTopics: {
          ...defaults.advanced.starStoriesTopics,
          ...(parsed.advanced?.starStoriesTopics ?? {}),
        },
        starVoiceTopics: {
          ...defaults.advanced.starVoiceTopics,
          ...(parsed.advanced?.starVoiceTopics ?? {}),
        },
      },
    }
  } catch {
    return defaults
  }
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

function cloneDifficultyBreakdown(
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

function cloneQuestionTypeBreakdown(
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

function formatElapsedTime(totalSeconds: number): string {
  const clampedSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clampedSeconds / 3600)
  const minutes = Math.floor((clampedSeconds % 3600) / 60)
  const seconds = clampedSeconds % 60

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

function createCounterToneStyle(hue: number, saturation = 88): CSSProperties {
  const normalizedHue = ((hue % 360) + 360) % 360
  return {
    '--round-counter-label-color': `hsl(${normalizedHue.toFixed(1)} ${saturation}% 74%)`,
    '--round-counter-value-color': `hsl(${normalizedHue.toFixed(1)} ${Math.min(100, saturation + 4)}% 86%)`,
  } as CSSProperties
}

function shouldAutoBypassRunLaunchSetup(progress: RunLaunchProgress): boolean {
  const hasOnlyOneDifficultyChoice = Math.max(0, Math.floor(progress.maxUnlockedDifficulty)) <= 0
  const hasStartingArtifactsUnlocked = Math.max(0, Math.floor(progress.completedRunsCount ?? 0)) >= 1
  const hasChaosArtifactsUnlocked = Math.max(0, Math.floor(progress.lastRunReachedRound)) >= 5
  return hasOnlyOneDifficultyChoice && !hasStartingArtifactsUnlocked && !hasChaosArtifactsUnlocked
}

function hasSavedRunInProgressForFocusDialog(saveState: ReturnType<typeof loadGameState>): boolean {
  if (!saveState) {
    return false
  }

  const currentRound = Math.max(1, Math.floor(saveState.currentRound ?? 1))
  const runElapsedSeconds = Math.max(0, Math.floor(saveState.runElapsedSeconds ?? 0))
  const roundsCleared = Math.max(0, Math.floor(saveState.roundsCleared ?? 0))
  return currentRound > 1 || runElapsedSeconds > 0 || roundsCleared > 0
}

function shouldShowWelcomeDialog(saveState: ReturnType<typeof loadGameState>, progress: RunLaunchProgress): boolean {
  if (saveState) {
    return false
  }

  return Math.max(0, Math.floor(progress.startedRunsCount ?? 0)) <= 0
}

const DEFAULT_QUIZ_WORLD_CONTROLS: QuizWorldControls = {
  getIsQuizPaused: () => false,
  tickFreeze: () => {},
  handleCombatQuizVisibility: () => true,
  grantRoundStartFreeze: () => {},
  resetQuizState: () => {},
  getSaveState: () => ({
    freezeSecondsRemaining: 0,
    nextQuestionDelaySecondsRemaining: 0,
    currentQuestionId: null,
    currentQuestionIndex: 0,
    currentQuestion: null,
    askedQuestionIds: [],
    priorityQuestionIds: [],
    quizActive: false,
    quizCorrectAnswers: 0,
    quizTotalAnswered: 0,
    quizAnsweredByDifficulty: createEmptyDifficultyBreakdown(),
    quizAnsweredByType: createEmptyQuestionTypeBreakdown(),
    quizCorrectForNextLife: 0,
    quizCorrectNeededForNextLife: 20,
    questionsUntilNextExtraLife: 20,
    questionsRequiredForNextExtraLife: 20,
  }),
  restoreSaveState: () => {},
}

const INITIAL_QUIZ_FREEZE_UI_STATE: QuizFreezeUiState = {
  quizFreezeActive: false,
  quizFreezeFading: false,
  quizFreezeSecondsLeft: 0,
  quizGraceQuestionModeActive: false,
  quizGraceQuestionsAnswered: 0,
  quizGraceQuestionsRequired: 5,
}

interface PostGameSummary {
  run: RunSummary
  unlockedDifficultyLevel: RunDifficultyLevel | null
  runElapsedSeconds: number
  quizTotalAnswered: number
  quizAnsweredByDifficulty: RunQuestionDifficultyBreakdown
  quizAnsweredByType: QuestionTypeBreakdown
  livesRemaining: number
  goldCollected: number
  quizScoreBonus: number
  artifactsCollected: number
  currentStreak: number
}

export function MainView() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<Player | null>(null)
  const waveManagerRef = useRef<WaveManager | null>(null)
  const playerStateSignatureRef = useRef('')
  const rewardPromptActiveRef = useRef(false)
  const rewardPromptSaveRef = useRef<RewardPrompt | null>(null)
  const quizCurrentStreakRef = useRef(0)
  const quizSaveHydratedRef = useRef(false)
  const quizWorldControlsRef = useRef<QuizWorldControls>(DEFAULT_QUIZ_WORLD_CONTROLS)
  const enemySaveSnapshotProviderRef = useRef<() => EnemySaveState[]>(() => [])
  const allySaveSnapshotProviderRef = useRef<() => AllySaveState[]>(() => [])
  const questionNukeSaveSnapshotProviderRef = useRef<() => QuestionNukeSaveState[]>(() => [])
  const runPlaytimeTickMsRef = useRef<number | null>(null)
  const runElapsedSecondsRef = useRef(0)
  const manualPauseRef = useRef(false)
  const buffsPanelRef = useRef(new BuffsPanel())
  const loadedSaveRef = useRef((() => {
    const loadedSave = loadGameState()
    if (!loadedSave) {
      return null
    }

    const isDeadPlayerSave = loadedSave.playerState.currentHealth <= 0
    if (isDeadPlayerSave) {
      clearSavedGameState()
      return null
    }

    return loadedSave
  })())
  const initialLoadedPlayerState = loadedSaveRef.current?.playerState ?? createInitialPlayerStateSnapshot()
  const initialStarStories = loadedSaveRef.current?.quizState?.starStories ?? []
  const initialPriorityQuestionIds = loadedSaveRef.current?.quizState?.priorityQuestionIds ?? []
  const initialDisplayedRewardIds = loadedSaveRef.current?.shopState?.displayedRewardIds ?? []
  const initialShopVisibleItemCount =
    loadedSaveRef.current?.shopState?.visibleItemCount === REROLLED_SHOP_VISIBLE_ITEM_COUNT ||
    initialDisplayedRewardIds.length > DEFAULT_SHOP_VISIBLE_ITEM_COUNT
      ? REROLLED_SHOP_VISIBLE_ITEM_COUNT
      : DEFAULT_SHOP_VISIBLE_ITEM_COUNT
  const shopVisibleItemCountRef = useRef(initialShopVisibleItemCount)
  const shopDisplayedRewardIdsRef = useRef<string[]>(initialDisplayedRewardIds)
  const [runLaunchProgress, setRunLaunchProgress] = useState<RunLaunchProgress>(() => loadRunLaunchProgress())
  const [runLaunchConfig, setRunLaunchConfig] = useState<RunLaunchConfig>(() => {
    const progress = loadRunLaunchProgress()
    if (loadedSaveRef.current) {
      return loadedSaveRef.current.runLaunchConfig ?? { ...DEFAULT_RUN_LAUNCH_CONFIG }
    }

    const baseConfig = buildDefaultLaunchConfig(progress.maxUnlockedDifficulty)
    return {
      ...baseConfig,
      chaosArtifactId: progress.lastRunReachedRound >= 5 ? progress.pendingChaosArtifactId : null,
    }
  })
  const [storedFocusFilters] = useState<QuizFocusFilters>(() => loadStoredQuizFocusFilters())
  const [activeFocusFilters, setActiveFocusFilters] = useState<QuizFocusFilters>(storedFocusFilters)
  const [rewardPrompt, setRewardPrompt] = useState<RewardPrompt | null>(null)
  const [shopVisibleItemCount, setShopVisibleItemCount] = useState(initialShopVisibleItemCount)
  const [shopDisplayedRewardIds, setShopDisplayedRewardIds] = useState<string[]>(initialDisplayedRewardIds)
  const [currentRound, setCurrentRound] = useState(loadedSaveRef.current?.currentRound ?? 1)
  const [quizFreezeUiState, setQuizFreezeUiState] = useState<QuizFreezeUiState>(INITIAL_QUIZ_FREEZE_UI_STATE)
  const [playerState, setPlayerState] = useState<PlayerStateSnapshot>(initialLoadedPlayerState)
  const [questionExplorerOpen, setQuestionExplorerOpen] = useState(false)
  const [lifeLossDialogLives, setLifeLossDialogLives] = useState<number | null>(null)
  const [worldSessionId, setWorldSessionId] = useState(0)
  const [starStories, setStarStories] = useState<SavedStarStory[]>(initialStarStories)
  const [focusDialogOpen, setFocusDialogOpen] = useState(
    () => hasSavedRunInProgressForFocusDialog(loadedSaveRef.current),
  )
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(
    () => shouldShowWelcomeDialog(loadedSaveRef.current, loadRunLaunchProgress()),
  )
  const [focusDialogOpenedFromMenu, setFocusDialogOpenedFromMenu] = useState(false)
  const [starVoiceProgressDialogOpen, setStarVoiceProgressDialogOpen] = useState(false)
  const [lifetimeSeenQuestionIds, setLifetimeSeenQuestionIds] = useState<string[]>(
    () => loadQuestionExplorerSeenQuestionIds(),
  )
  const [priorityQuestionIds, setPriorityQuestionIds] = useState<string[]>(initialPriorityQuestionIds)
  const [runElapsedSeconds, setRunElapsedSeconds] = useState(
    Math.max(0, Math.floor(loadedSaveRef.current?.runElapsedSeconds ?? 0)),
  )
  const [runSetupOpen, setRunSetupOpen] = useState(false)
  const [starStoriesSetupOpen, setStarStoriesSetupOpen] = useState(false)
  const [pendingRunLaunchConfig, setPendingRunLaunchConfig] = useState<RunLaunchConfig | null>(null)
  const [runReady, setRunReady] = useState(false)
  const [postGameSummary, setPostGameSummary] = useState<PostGameSummary | null>(null)
  const [isGamePaused, setIsGamePaused] = useState(false)
  const [quizTrackingReady, setQuizTrackingReady] = useState(false)
  const [fieldGlowBoostKey, setFieldGlowBoostKey] = useState(0)
  const [highScoreEntries, setHighScoreEntries] = useState<HighScoreEntry[]>(() => loadHighScoreBoard())
  const [dailyActivityStats, setDailyActivityStats] = useState<DailyActivityStats>(() => loadDailyActivityStats())
  const initialLaunchFlowAppliedRef = useRef(false)
  const { overlays, postOverlay, dismissOverlay, clearOverlays } = useOverlaySystem()
  const todayActivityStats = useMemo(() => getTodayStats(dailyActivityStats), [dailyActivityStats])
  const dailyRankProgress = useMemo(() => getRankProgress(todayActivityStats.questionsAnswered), [todayActivityStats.questionsAnswered])
  const roundsCleared = Math.max(0, currentRound - 1)
  const isRunEnded = postGameSummary !== null
  const isFieldMotionPaused =
    isGamePaused || quizFreezeUiState.quizFreezeActive || quizFreezeUiState.quizFreezeSecondsLeft > 0
  const currentQuizSaveState = quizWorldControlsRef.current.getSaveState()
  const currentQuizAnsweredByDifficulty = cloneDifficultyBreakdown(
    currentQuizSaveState.quizAnsweredByDifficulty,
  )
  const currentQuizCorrectAnswers = Math.max(0, Math.floor(currentQuizSaveState.quizCorrectAnswers ?? 0))
  const currentQuizTotalAnswered = Math.max(0, Math.floor(currentQuizSaveState.quizTotalAnswered ?? 0))
  const currentQuizAutoAnsweredCount = Math.max(0, Math.floor(currentQuizSaveState.quizAutoAnsweredCount ?? 0))
  const currentQuizAutoAnsweredByDifficulty = cloneDifficultyBreakdown(
    currentQuizSaveState.quizAutoAnsweredByDifficulty,
  )
  const currentQuizAutoAnsweredByType = cloneQuestionTypeBreakdown(currentQuizSaveState.quizAutoAnsweredByType)
  const loadedQuizState = loadedSaveRef.current?.quizState
  const loadedQuizCorrectAnswers = Math.max(
    0,
    Math.floor(loadedQuizState?.quizCorrectAnswers ?? 0),
  )
  const loadedQuizTotalAnswered = Math.max(
    0,
    Math.floor(loadedQuizState?.quizTotalAnswered ?? loadedQuizState?.quizCorrectAnswers ?? 0),
  )
  const loadedQuizAnsweredByDifficulty = cloneDifficultyBreakdown(loadedQuizState?.quizAnsweredByDifficulty)
  const currentQuizAnsweredByType = cloneQuestionTypeBreakdown(currentQuizSaveState.quizAnsweredByType)
  const loadedQuizAnsweredByType = cloneQuestionTypeBreakdown(loadedQuizState?.quizAnsweredByType)
  const currentRunScore = calculateScoreFromRun(
    playerState.enemyKills,
    roundsCleared,
    playerState.quizScoreBonus,
  )
  const queuedNukes = Math.max(0, Math.floor(playerState.queuedQuestionNukes ?? 0))
  const queuedFreezeRays = Math.max(0, Math.floor(playerState.queuedFreezeRays ?? 0))
  const livesToneStyle = useMemo(() => {
    const ratio = clamp01(playerState.lives / 5)
    const hue = 4 + ratio * 188
    return createCounterToneStyle(hue, 86)
  }, [playerState.lives])
  const skipsToneStyle = useMemo(() => {
    const ratio = clamp01(playerState.skips / 5)
    const hue = 8 + ratio * 182
    return createCounterToneStyle(hue, 82)
  }, [playerState.skips])
  const scoreToneStyle = useMemo(() => {
    const ratio = clamp01(Math.log10(Math.max(1, currentRunScore) + 1) / 3)
    const hue = 30 + ratio * 188
    return createCounterToneStyle(hue, 90)
  }, [currentRunScore])
  const enemyDifficultyMultiplier = useMemo(
    () => computeEnemyDifficultyMultiplier(runLaunchConfig.difficultyLevel),
    [runLaunchConfig.difficultyLevel],
  )
  const worldIncomingDamageMultiplier = useMemo(() => {
    const fastRoundsDamageMultiplier = runLaunchConfig.chaosArtifactId === 'fast-rounds' ? 2 : 1
    return GLOBAL_INCOMING_DAMAGE_MULTIPLIER * fastRoundsDamageMultiplier
  }, [runLaunchConfig.chaosArtifactId])
  const difficultyToneStyle = useMemo(() => {
    const minDifficultyMultiplier = computeEnemyDifficultyMultiplier(0)
    const maxDifficultyMultiplier = computeEnemyDifficultyMultiplier(MAX_RUN_DIFFICULTY)
    const multiplierRange = Math.max(0.0001, maxDifficultyMultiplier - minDifficultyMultiplier)
    const intensityRatio = clamp01((enemyDifficultyMultiplier - minDifficultyMultiplier) / multiplierRange)
    const hue = 208 - intensityRatio * 204
    return createCounterToneStyle(hue, 92)
  }, [enemyDifficultyMultiplier])
  const difficultyDisplayValue = useMemo(
    () => `x${enemyDifficultyMultiplier.toFixed(2)}`,
    [enemyDifficultyMultiplier],
  )
  const runTimeToneStyle = useMemo(() => {
    const ratio = clamp01(runElapsedSeconds / 2400)
    const hue = 24 + ratio * 194
    return createCounterToneStyle(hue, 84)
  }, [runElapsedSeconds])
  const trackedScoreRef = useRef<number | null>(null)
  const trackedAnsweredRef = useRef<number | null>(null)
  const trackedAutoAnsweredRef = useRef<number | null>(null)
  const trackedAnsweredByDifficultyRef = useRef<RunQuestionDifficultyBreakdown | null>(null)
  const trackedAnsweredByTypeRef = useRef<QuestionTypeBreakdown | null>(null)
  const trackedAutoAnsweredByDifficultyRef = useRef<RunQuestionDifficultyBreakdown | null>(null)
  const trackedAutoAnsweredByTypeRef = useRef<QuestionTypeBreakdown | null>(null)
  const fieldVisualRankRef = useRef(dailyRankProgress.rankNumber)
  const fieldGlowBoostKeyRef = useRef(fieldGlowBoostKey)

  useEffect(() => {
    runElapsedSecondsRef.current = runElapsedSeconds
  }, [runElapsedSeconds])

  useEffect(() => {
    manualPauseRef.current = isGamePaused
  }, [isGamePaused])

  useEffect(() => {
    fieldVisualRankRef.current = dailyRankProgress.rankNumber
  }, [dailyRankProgress.rankNumber])

  useEffect(() => {
    fieldGlowBoostKeyRef.current = fieldGlowBoostKey
  }, [fieldGlowBoostKey])

  useEffect(() => {
    if (focusDialogOpen || welcomeDialogOpen) {
      setIsGamePaused(true)
    }
  }, [focusDialogOpen, welcomeDialogOpen])

  const triggerFieldGlowBoost = useCallback(() => {
    setFieldGlowBoostKey((previous) => previous + 1)
  }, [])

  const priorityQuestionSummaries = useMemo(() => {
    return priorityQuestionIds.slice(0, 3).map((questionId) => {
      const question = getQuizQuestionById(questionId)
      if (!question) {
        return questionId
      }

      const normalizedPrompt = question.prompt.replace(/\s+/g, ' ').trim()
      return normalizedPrompt.length <= 72
        ? normalizedPrompt
        : `${normalizedPrompt.slice(0, 69).trimEnd()}...`
    })
  }, [priorityQuestionIds])

  const starVoiceStoryTitleByProblemId = useMemo(() => {
    const mapping = new Map<string, string>()
    starStories.forEach((story, index) => {
      const parsed = parseStarStory(story, index)
      mapping.set(parsed.storyId, parsed.title)
    })
    return mapping
  }, [starStories])

  const starVoiceProgressRows = useMemo<StarVoiceStoryProgressRow[]>(() => {
    const transcriptionProgressByProblem: TranscriptionAttemptProgressByProblem =
      currentQuizSaveState.transcriptionAttemptsByProblem ??
      loadedQuizState?.transcriptionAttemptsByProblem ??
      {}

    const problemIds = new Set<string>([
      ...Object.keys(transcriptionProgressByProblem),
      ...Array.from(starVoiceStoryTitleByProblemId.keys()),
    ])

    const rows = Array.from(problemIds).map((problemId) => {
      const progress = transcriptionProgressByProblem[problemId]
      const fallbackTitle = starVoiceStoryTitleByProblemId.get(problemId) ?? problemId
      const easySeen = Math.max(0, Math.floor(progress?.easy ?? 0))
      const mediumSeen = Math.max(0, Math.floor(progress?.medium ?? 0))
      const hardSeen = Math.max(0, Math.floor(progress?.hard ?? 0))
      const seenCount = easySeen + mediumSeen + hardSeen
      const completedCount =
        Math.min(STAR_VOICE_PROGRESS_TARGET_PER_DIFFICULTY, easySeen) +
        Math.min(STAR_VOICE_PROGRESS_TARGET_PER_DIFFICULTY, mediumSeen) +
        Math.min(STAR_VOICE_PROGRESS_TARGET_PER_DIFFICULTY, hardSeen)

      return {
        problemId,
        storyTitle: fallbackTitle,
        seenCount,
        completedCount,
        seenByDifficulty: {
          easy: easySeen,
          medium: mediumSeen,
          hard: hardSeen,
        },
        completedByDifficulty: {
          easy: easySeen,
          medium: mediumSeen,
          hard: hardSeen,
        },
      }
    })

    return rows.sort((left, right) => {
      if (right.completedCount !== left.completedCount) {
        return right.completedCount - left.completedCount
      }
      if (right.seenCount !== left.seenCount) {
        return right.seenCount - left.seenCount
      }
      return left.storyTitle.localeCompare(right.storyTitle)
    })
  }, [currentQuizSaveState.transcriptionAttemptsByProblem, loadedQuizState?.transcriptionAttemptsByProblem, starVoiceStoryTitleByProblemId])

  const totalStarVoiceSeenRun = useMemo(
    () => starVoiceProgressRows.reduce((sum, row) => sum + row.seenCount, 0),
    [starVoiceProgressRows],
  )

  const totalStarVoiceCompletedRun = useMemo(
    () => starVoiceProgressRows.reduce((sum, row) => sum + row.completedCount, 0),
    [starVoiceProgressRows],
  )

  const runSeenQuestionIds = useMemo(() => {
    const sourceQuestionIds =
      currentQuizSaveState.askedQuestionIds.length > 0
        ? currentQuizSaveState.askedQuestionIds
        : (loadedQuizState?.askedQuestionIds ?? [])

    return Array.from(
      new Set(
        sourceQuestionIds.filter((questionId) => {
          return typeof questionId === 'string' && getQuizQuestionById(questionId) !== null
        }),
      ),
    )
  }, [currentQuizSaveState.askedQuestionIds, loadedQuizState?.askedQuestionIds])

  useEffect(() => {
    if (runSeenQuestionIds.length === 0) {
      return
    }

    setLifetimeSeenQuestionIds((previousQuestionIds) => {
      const nextQuestionIdsSet = new Set(previousQuestionIds)
      let hasChanges = false

      runSeenQuestionIds.forEach((questionId) => {
        if (nextQuestionIdsSet.has(questionId)) {
          return
        }

        nextQuestionIdsSet.add(questionId)
        hasChanges = true
      })

      if (!hasChanges) {
        return previousQuestionIds
      }

      const nextQuestionIds = Array.from(nextQuestionIdsSet)
      saveQuestionExplorerSeenQuestionIds(nextQuestionIds)
      return nextQuestionIds
    })
  }, [runSeenQuestionIds])

  const topWorldSectionStyle = useMemo(() => {
    return {
      '--field-rank-accent': dailyRankProgress.tier.accent,
      '--field-rank-glow': dailyRankProgress.tier.glow,
      '--field-rank-glow-strength': `${Math.min(0.48, 0.14 + dailyRankProgress.rankNumber * 0.015)}`,
      '--field-rank-interest': `${Math.min(1, 0.25 + dailyRankProgress.rankNumber * 0.04)}`,
      '--field-rank-light-strength': `${Math.min(1.28, 0.2 + dailyRankProgress.rankNumber * 0.045)}`,
      '--field-rank-bloom': `${Math.min(1.7, 0.82 + dailyRankProgress.rankNumber * 0.035)}`,
      '--space-flight-speed': `${1 + dailyRankProgress.rankNumber * 0.02}`,
    } as CSSProperties
  }, [dailyRankProgress.rankNumber, dailyRankProgress.tier.accent, dailyRankProgress.tier.glow])

  const syncPlayerState = useCallback((player: Player) => {
    const bonusSnapshot = buildArtifactBonusSnapshot(player, runLaunchConfig)
    const nextPlayerState = {
      ...player.getStateSnapshot(),
      quizCurrentStreak: quizCurrentStreakRef.current,
      questionAnswerGoldMultiplier: bonusSnapshot.gold.totalQuestionMultiplier,
      enemyKillGoldMultiplier: bonusSnapshot.gold.totalEnemyKillMultiplier,
      goldMultiplierContributors: bonusSnapshot.gold.contributors,
    }
    const signature = getPlayerStateSignature(nextPlayerState)

    if (signature === playerStateSignatureRef.current) {
      return
    }

    playerStateSignatureRef.current = signature
    setPlayerState(nextPlayerState)
  }, [runLaunchConfig])

  const handleRewardPromptChange = useCallback((nextRewardPrompt: RewardPrompt | null) => {
    rewardPromptSaveRef.current = nextRewardPrompt

    if (nextRewardPrompt) {
      const purchasedArtifactIds =
        playerRef.current?.getArtifactIds() ?? loadedSaveRef.current?.playerState.artifactIds ?? []
      const availableRewardOptions = nextRewardPrompt.options.filter((option) => {
        if (option.kind !== 'artifact') {
          return true
        }

        if (!option.artifactId) {
          return true
        }

        return !purchasedArtifactIds.includes(option.artifactId)
      })
      const nextDisplayedRewardIds = reconcileDisplayedRewardIds(
        availableRewardOptions,
        shopDisplayedRewardIdsRef.current,
        shopVisibleItemCountRef.current,
      )
      shopDisplayedRewardIdsRef.current = nextDisplayedRewardIds
      setShopDisplayedRewardIds(nextDisplayedRewardIds)
    }

    setRewardPrompt(nextRewardPrompt)
  }, [])

  const handleShopDisplayedRewardIdsChange = useCallback((nextRewardIds: string[]) => {
    shopDisplayedRewardIdsRef.current = nextRewardIds
    setShopDisplayedRewardIds(nextRewardIds)
  }, [])

  const handleShopVisibleItemCountChange = useCallback((nextVisibleCount: number) => {
    const normalizedVisibleCount =
      nextVisibleCount === REROLLED_SHOP_VISIBLE_ITEM_COUNT
        ? REROLLED_SHOP_VISIBLE_ITEM_COUNT
        : DEFAULT_SHOP_VISIBLE_ITEM_COUNT
    shopVisibleItemCountRef.current = normalizedVisibleCount
    setShopVisibleItemCount(normalizedVisibleCount)
  }, [])

  const { getRewardCost, handleRewardSelection, handleRefreshShop, handleFinishShopping } = useShopController({
    playerRef,
    waveManagerRef,
    rewardPrompt,
    rewardPromptActiveRef,
    setRewardPrompt: handleRewardPromptChange,
    visibleShopItemCount: shopVisibleItemCount,
    onVisibleShopItemCountChange: handleShopVisibleItemCountChange,
    displayedRewardIds: shopDisplayedRewardIds,
    onDisplayedRewardIdsChange: handleShopDisplayedRewardIdsChange,
    playerState,
    postOverlay,
    syncPlayerState,
  })

  useEffect(() => {
    setQuizFocusFilters(storedFocusFilters)
    setActiveFocusFilters(getActiveQuizFocusFilters())
  }, [storedFocusFilters])

  useEffect(() => {
    setRuntimeQuizQuestionBank(
      STAR_STORY_RUNTIME_BANK_KEY,
      buildStarStoryQuestionBank(starStories, runLaunchConfig),
      STAR_STORY_RUNTIME_BANK_KEY,
    )

    if (STAR_WORKFLOW_DEBUG_LOGGING) {
      console.info('[STAR Workflow][MainView] Runtime STAR bank registered', {
        sourceKey: STAR_STORY_RUNTIME_BANK_KEY,
        storyCount: starStories.length,
        fileNames: starStories.map((story) => story.fileName),
      })
    }
  }, [starStories])

  useEffect(() => {
    if (!runReady) {
      trackedScoreRef.current = null
      trackedAnsweredRef.current = null
      trackedAutoAnsweredRef.current = null
      trackedAnsweredByDifficultyRef.current = null
      trackedAnsweredByTypeRef.current = null
      trackedAutoAnsweredByDifficultyRef.current = null
      trackedAutoAnsweredByTypeRef.current = null
      return
    }

    const mount = mountRef.current
    if (!mount) {
      return
    }

    const disposeWorld = mountWebGLWorld({
      mount,
      incomingDamageMultiplier: worldIncomingDamageMultiplier,
      enemyDifficultyMultiplier: computeEnemyDifficultyMultiplier(runLaunchConfig.difficultyLevel),
      runLaunchConfig,
      playerRef,
      waveManagerRef,
      rewardPromptActiveRef,
      setCurrentRound,
      setRewardPrompt: handleRewardPromptChange,
      syncPlayerState,
      postOverlay,
      tickFreeze: (delta) => {
        if (manualPauseRef.current) {
          return
        }

        quizWorldControlsRef.current.tickFreeze(delta)
      },
      getIsQuizPaused: () => {
        return manualPauseRef.current || quizWorldControlsRef.current.getIsQuizPaused()
      },
      getIsBackdropMotionPaused: () => {
        if (manualPauseRef.current) {
          return true
        }

        const quizSaveState = quizWorldControlsRef.current.getSaveState()
        return (
          quizWorldControlsRef.current.getIsQuizPaused() ||
          quizSaveState.freezeSecondsRemaining > 0
        )
      },
      handleCombatQuizVisibility: (shouldShowQuiz) => {
        return quizWorldControlsRef.current.handleCombatQuizVisibility(shouldShowQuiz)
      },
      initialSaveState: loadedSaveRef.current,
      setEnemySaveSnapshotProvider: (provider) => {
        enemySaveSnapshotProviderRef.current = provider
      },
      setAllySaveSnapshotProvider: (provider) => {
        allySaveSnapshotProviderRef.current = provider
      },
      setQuestionNukeSaveSnapshotProvider: (provider) => {
        questionNukeSaveSnapshotProviderRef.current = provider
      },
      onPlayerLifeLost: (remainingLives) => {
        quizWorldControlsRef.current.grantRoundStartFreeze()
        setLifeLossDialogLives(remainingLives)
      },
      onRunEnded: (summary) => {
        const quizStateAtRunEnd = quizWorldControlsRef.current.getSaveState()
        const latestPlayerState = playerRef.current?.getStateSnapshot() ?? createInitialPlayerStateSnapshot()
        const nextProgressPreview = updateRunLaunchProgressAfterRun(
          runLaunchProgress,
          runLaunchConfig.difficultyLevel,
          summary.currentRound,
        )
        const unlockedDifficultyLevel =
          nextProgressPreview.maxUnlockedDifficulty > runLaunchProgress.maxUnlockedDifficulty
            ? nextProgressPreview.maxUnlockedDifficulty
            : null
        const result = recordRunInHighScoreBoard({
          ...summary,
          quizTotalAnswered: quizStateAtRunEnd.quizTotalAnswered,
          quizAnsweredByDifficulty:
            quizStateAtRunEnd.quizAnsweredByDifficulty ?? createEmptyDifficultyBreakdown(),
        })
        if (!result) {
          return
        }

        setRunLaunchProgress((previous) => {
          const nextProgress = updateRunLaunchProgressAfterRun(
            previous,
            runLaunchConfig.difficultyLevel,
            summary.currentRound,
          )
          saveRunLaunchProgress(nextProgress)
          return nextProgress
        })

        setHighScoreEntries(result.board)
        setIsGamePaused(false)
        setPostGameSummary({
          run: summary,
          unlockedDifficultyLevel,
          runElapsedSeconds: runElapsedSecondsRef.current,
          quizTotalAnswered: Math.max(0, Math.floor(quizStateAtRunEnd.quizTotalAnswered ?? 0)),
          quizAnsweredByDifficulty: cloneDifficultyBreakdown(
            quizStateAtRunEnd.quizAnsweredByDifficulty,
          ),
          quizAnsweredByType: cloneQuestionTypeBreakdown(quizStateAtRunEnd.quizAnsweredByType),
          livesRemaining: Math.max(0, Math.floor(latestPlayerState.lives)),
          goldCollected: Math.max(0, Math.floor(latestPlayerState.gold)),
          quizScoreBonus: Math.max(0, Math.floor(latestPlayerState.quizScoreBonus)),
          artifactsCollected: latestPlayerState.artifactIds.length,
          currentStreak: Math.max(0, Math.floor(latestPlayerState.quizCurrentStreak)),
        })
        postOverlay({
          title:
            summary.endReason === 'victory'
              ? 'VICTORY!'
              : result.isNewBest
                ? 'New High Score'
                : 'Run Recorded',
          message:
            summary.endReason === 'victory'
              ? unlockedDifficultyLevel !== null
                ? `You cleared round 10. Difficulty unlocked: ${RUN_DIFFICULTY_LABELS[unlockedDifficultyLevel]}.`
                : 'You cleared round 10 and finished the run in victory.'
              : `Score ${summary.score} · ${summary.roundsCleared} rounds cleared · ${summary.enemyKills} enemies defeated · ${Math.max(0, Math.floor(quizStateAtRunEnd.quizCorrectAnswers ?? 0))} questions answered correctly.`,
          durationMs: 3800,
        })
      },
      getFieldVisualRank: () => fieldVisualRankRef.current,
      getFieldGlowBoostKey: () => fieldGlowBoostKeyRef.current,
    })

    return () => {
      disposeWorld()
      playerStateSignatureRef.current = ''
      rewardPromptActiveRef.current = false
      quizCurrentStreakRef.current = 0
      quizSaveHydratedRef.current = false
      runPlaytimeTickMsRef.current = null
      manualPauseRef.current = false
      quizWorldControlsRef.current.resetQuizState()
      setQuizFreezeUiState(INITIAL_QUIZ_FREEZE_UI_STATE)
      handleRewardPromptChange(null)
      handleShopVisibleItemCountChange(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
      handleShopDisplayedRewardIdsChange([])
      setCurrentRound(1)
      setPlayerState(createInitialPlayerStateSnapshot())
      setLifeLossDialogLives(null)
      setPostGameSummary(null)
      setIsGamePaused(false)
    }
  }, [
    handleRewardPromptChange,
    handleShopVisibleItemCountChange,
    handleShopDisplayedRewardIdsChange,
    postOverlay,
    runLaunchConfig,
    runReady,
    syncPlayerState,
    worldSessionId,
  ])

  const handleResetGame = useCallback(() => {
    // Reset persisted state first so reset always starts from a blank save.
    clearSavedGameState()

    // Clear in-memory quiz/question progress before remounting.
    quizWorldControlsRef.current.resetQuizState()

    loadedSaveRef.current = null
    playerStateSignatureRef.current = ''
    rewardPromptActiveRef.current = false
    quizCurrentStreakRef.current = 0
    quizSaveHydratedRef.current = false
    runPlaytimeTickMsRef.current = null
    enemySaveSnapshotProviderRef.current = () => []
    allySaveSnapshotProviderRef.current = () => []
    questionNukeSaveSnapshotProviderRef.current = () => []

    handleRewardPromptChange(null)
    handleShopVisibleItemCountChange(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
    handleShopDisplayedRewardIdsChange([])
    setCurrentRound(1)
    setQuizFreezeUiState(INITIAL_QUIZ_FREEZE_UI_STATE)
    setPlayerState(createInitialPlayerStateSnapshot())
    setQuestionExplorerOpen(false)
    setLifeLossDialogLives(null)
    setPriorityQuestionIds([])
    setRunElapsedSeconds(0)
    runElapsedSecondsRef.current = 0
    setRunReady(false)
    setPostGameSummary(null)
    setIsGamePaused(false)
    setQuizTrackingReady(true)
    let nextProgressForSetup = runLaunchProgress
    let nextRunLaunchConfigForSetup = buildDefaultLaunchConfig(runLaunchProgress.maxUnlockedDifficulty)
    const shouldDisableChaosForNextRun = runReady && !isRunEnded && currentRound < 5
    if (shouldDisableChaosForNextRun) {
      const nextProgress: RunLaunchProgress = {
        ...runLaunchProgress,
        lastRunReachedRound: 0,
        pendingChaosArtifactId: null,
      }
      nextProgressForSetup = nextProgress
      nextRunLaunchConfigForSetup = buildDefaultLaunchConfig(nextProgress.maxUnlockedDifficulty)
      setRunLaunchProgress(nextProgress)
      saveRunLaunchProgress(nextProgress)
    }

    setRunLaunchConfig(nextRunLaunchConfigForSetup)

    if (shouldAutoBypassRunLaunchSetup(nextProgressForSetup)) {
      setRunSetupOpen(false)
      setPendingRunLaunchConfig(nextRunLaunchConfigForSetup)
      setStarStoriesSetupOpen(true)
    } else {
      setRunSetupOpen(true)
      setStarStoriesSetupOpen(false)
      setPendingRunLaunchConfig(null)
    }

    clearOverlays()
    setWorldSessionId((previous) => previous + 1)

    if (STAR_WORKFLOW_DEBUG_LOGGING) {
      console.info('[STAR Workflow][MainView] Game reset invoked')
    }
  }, [
    clearOverlays,
    currentRound,
    handleRewardPromptChange,
    handleShopVisibleItemCountChange,
    handleShopDisplayedRewardIdsChange,
    isRunEnded,
    runReady,
    runLaunchProgress.maxUnlockedDifficulty,
    runLaunchProgress,
  ])

  const handleStartRun = useCallback((nextStories: SavedStarStory[], nextRunLaunchConfig: RunLaunchConfig) => {
    clearSavedGameState()
    loadedSaveRef.current = null
    quizSaveHydratedRef.current = false
    runPlaytimeTickMsRef.current = null
    setStarStories(nextStories)
    setRunLaunchConfig(nextRunLaunchConfig)
    setPriorityQuestionIds([])
    setRunElapsedSeconds(0)
    runElapsedSecondsRef.current = 0
    setRunSetupOpen(false)
    setStarStoriesSetupOpen(false)
    setPendingRunLaunchConfig(null)
    handleShopDisplayedRewardIdsChange([])
    handleShopVisibleItemCountChange(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
    setRunReady(true)
    setPostGameSummary(null)
    setIsGamePaused(false)
    setQuizTrackingReady(true)
    setWelcomeDialogOpen(false)
    setRunLaunchProgress((previous) => {
      const nextProgress: RunLaunchProgress = {
        ...previous,
        pendingChaosArtifactId: null,
        startedRunsCount: Math.max(0, Math.floor(previous.startedRunsCount ?? 0)) + 1,
      }
      saveRunLaunchProgress(nextProgress)
      return nextProgress
    })

    if (STAR_WORKFLOW_DEBUG_LOGGING) {
      console.info('[STAR Workflow][MainView] Run started', {
        starStoryCount: nextStories.length,
        difficultyLevel: nextRunLaunchConfig.difficultyLevel,
        chaosArtifactId: nextRunLaunchConfig.chaosArtifactId,
        fileNames: nextStories.map((story) => story.fileName),
      })
    }

    if (nextStories.length > 0) {
      postOverlay({
        title: 'STAR Stories Loaded',
        message: `This run will include interview questions generated from ${nextStories.length} uploaded stor${nextStories.length === 1 ? 'y' : 'ies'}.`,
        durationMs: 3200,
      })
    }
  }, [handleShopDisplayedRewardIdsChange, postOverlay])

  const handleRunLaunchConfigured = useCallback((_nextStories: SavedStarStory[], nextRunLaunchConfig: RunLaunchConfig) => {
    setRunLaunchConfig(nextRunLaunchConfig)
    setPendingRunLaunchConfig(nextRunLaunchConfig)
    setRunSetupOpen(false)
    setStarStoriesSetupOpen(true)
    setRunReady(false)
  }, [])

  const handleChaosArtifactRolledInSetup = useCallback((artifactId: NonNullable<RunLaunchConfig['chaosArtifactId']>) => {
    setRunLaunchConfig((previous) => ({
      ...previous,
      chaosArtifactId: artifactId,
    }))
    setRunLaunchProgress((previous) => {
      if (previous.pendingChaosArtifactId === artifactId) {
        return previous
      }

      const nextProgress: RunLaunchProgress = {
        ...previous,
        pendingChaosArtifactId: artifactId,
      }
      saveRunLaunchProgress(nextProgress)
      return nextProgress
    })
  }, [])

  const handleConfirmFocus = useCallback((filters: QuizFocusFilters) => {
    setQuizFocusFilters(filters)
    const normalizedFilters = getActiveQuizFocusFilters()
    setActiveFocusFilters(normalizedFilters)

    if (STAR_WORKFLOW_DEBUG_LOGGING) {
      console.info('[STAR Workflow][MainView] Focus confirmed', {
        filters,
      })
    }

    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(QUIZ_FOCUS_FILTERS_STORAGE_KEY, JSON.stringify(normalizedFilters))
    }

    setFocusDialogOpen(false)

    if (focusDialogOpenedFromMenu) {
      setFocusDialogOpenedFromMenu(false)
      return
    }

    if (loadedSaveRef.current) {
      setRunSetupOpen(false)
      setStarStoriesSetupOpen(false)
      setPendingRunLaunchConfig(null)
      setRunReady(true)
      return
    }

    if (shouldAutoBypassRunLaunchSetup(runLaunchProgress)) {
      const autoRunLaunchConfig = buildDefaultLaunchConfig(runLaunchProgress.maxUnlockedDifficulty)
      setRunLaunchConfig(autoRunLaunchConfig)
      setRunSetupOpen(false)
      setPendingRunLaunchConfig(autoRunLaunchConfig)
      setStarStoriesSetupOpen(true)
      setRunReady(false)
      setQuizTrackingReady(true)
      return
    }

    setStarStoriesSetupOpen(false)
    setPendingRunLaunchConfig(null)
    setRunSetupOpen(true)
    setRunReady(false)
    setQuizTrackingReady(true)
  }, [focusDialogOpenedFromMenu, runLaunchProgress])

  useEffect(() => {
    if (initialLaunchFlowAppliedRef.current || focusDialogOpen || welcomeDialogOpen) {
      return
    }

    initialLaunchFlowAppliedRef.current = true

    if (loadedSaveRef.current) {
      setRunSetupOpen(false)
      setStarStoriesSetupOpen(false)
      setPendingRunLaunchConfig(null)
      setRunReady(true)
      setQuizTrackingReady(true)
      return
    }

    if (shouldAutoBypassRunLaunchSetup(runLaunchProgress)) {
      const autoRunLaunchConfig = buildDefaultLaunchConfig(runLaunchProgress.maxUnlockedDifficulty)
      setRunLaunchConfig(autoRunLaunchConfig)
      setRunSetupOpen(false)
      setPendingRunLaunchConfig(autoRunLaunchConfig)
      setStarStoriesSetupOpen(true)
      setRunReady(false)
      setQuizTrackingReady(true)
      return
    }

    setStarStoriesSetupOpen(false)
    setPendingRunLaunchConfig(null)
    setRunSetupOpen(true)
    setRunReady(false)
    setQuizTrackingReady(true)
  }, [focusDialogOpen, runLaunchProgress, welcomeDialogOpen])

  const persistGameState = useCallback(() => {
    if (!runReady || isRunEnded) {
      return
    }

    if (loadedSaveRef.current && !quizSaveHydratedRef.current) {
      return
    }

    const quizState = quizWorldControlsRef.current.getSaveState()
    const activeRewardPrompt = rewardPromptSaveRef.current
    const activeDisplayedRewardIds = shopDisplayedRewardIdsRef.current

    saveGameState({
      currentRound,
      roundsCleared: waveManagerRef.current?.getRoundsCleared() ?? roundsCleared,
      runElapsedSeconds,
      playerState,
      quizState: {
        ...quizState,
        starStories,
      },
      shopState:
        activeRewardPrompt && rewardPromptActiveRef.current
          ? {
              isOpen: true,
              wave: activeRewardPrompt.wave,
              rewardOptionIds: activeRewardPrompt.options.map((option) => option.id),
              visibleItemCount: shopVisibleItemCountRef.current,
              displayedRewardIds: activeDisplayedRewardIds.filter((rewardId) =>
                activeRewardPrompt.options.some((option) => option.id === rewardId),
              ),
            }
          : {
              isOpen: false,
              wave: currentRound,
              rewardOptionIds: [],
              visibleItemCount: DEFAULT_SHOP_VISIBLE_ITEM_COUNT,
              displayedRewardIds: [],
            },
      enemyStates: enemySaveSnapshotProviderRef.current(),
      allyStates: allySaveSnapshotProviderRef.current(),
      questionNukeStates: questionNukeSaveSnapshotProviderRef.current(),
      runLaunchConfig,
    })
  }, [
    currentRound,
    isRunEnded,
    playerState,
    roundsCleared,
    runElapsedSeconds,
    runLaunchConfig,
    runReady,
    starStories,
  ])

  useEffect(() => {
    if (!runReady) {
      return
    }

    persistGameState()
  }, [persistGameState, runReady])

  useEffect(() => {
    if (!runReady || isRunEnded) {
      return
    }

    if (loadedSaveRef.current && !quizSaveHydratedRef.current) {
      return
    }

    persistGameState()
  }, [persistGameState, rewardPrompt, runReady, isRunEnded, shopDisplayedRewardIds])

  useEffect(() => {
    if (!runReady) {
      return
    }

    const handlePageHide = () => {
      persistGameState()
    }

    window.addEventListener('beforeunload', handlePageHide)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      window.removeEventListener('beforeunload', handlePageHide)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [persistGameState, runReady])

  useEffect(() => {
    if (!runReady || isRunEnded) {
      trackedScoreRef.current = null
      trackedAnsweredRef.current = null
      trackedAutoAnsweredRef.current = null
      trackedAnsweredByDifficultyRef.current = null
      trackedAnsweredByTypeRef.current = null
      trackedAutoAnsweredByDifficultyRef.current = null
      trackedAutoAnsweredByTypeRef.current = null
      return
    }

    const observedQuizCorrectAnswered = Math.max(currentQuizCorrectAnswers, loadedQuizCorrectAnswers)
    const observedQuizAnsweredByDifficulty: RunQuestionDifficultyBreakdown = {
      easy: Math.max(currentQuizAnsweredByDifficulty.easy, loadedQuizAnsweredByDifficulty.easy),
      medium: Math.max(currentQuizAnsweredByDifficulty.medium, loadedQuizAnsweredByDifficulty.medium),
      hard: Math.max(currentQuizAnsweredByDifficulty.hard, loadedQuizAnsweredByDifficulty.hard),
      veryHard: Math.max(currentQuizAnsweredByDifficulty.veryHard, loadedQuizAnsweredByDifficulty.veryHard),
      insanelyHard: Math.max(currentQuizAnsweredByDifficulty.insanelyHard, loadedQuizAnsweredByDifficulty.insanelyHard),
    }
    const observedQuizAnsweredByType: QuestionTypeBreakdown = {
      rawCode: Math.max(currentQuizAnsweredByType.rawCode, loadedQuizAnsweredByType.rawCode),
      multipleChoice: Math.max(currentQuizAnsweredByType.multipleChoice, loadedQuizAnsweredByType.multipleChoice),
      starStories: Math.max(currentQuizAnsweredByType.starStories, loadedQuizAnsweredByType.starStories),
      starVoice: Math.max(currentQuizAnsweredByType.starVoice, loadedQuizAnsweredByType.starVoice),
      validList: Math.max(currentQuizAnsweredByType.validList, loadedQuizAnsweredByType.validList),
      orderItems: Math.max(currentQuizAnsweredByType.orderItems, loadedQuizAnsweredByType.orderItems),
      capacity: Math.max(currentQuizAnsweredByType.capacity, loadedQuizAnsweredByType.capacity),
      systemDesign: Math.max(currentQuizAnsweredByType.systemDesign, loadedQuizAnsweredByType.systemDesign),
      multiSectionSystemDesign: Math.max(
        currentQuizAnsweredByType.multiSectionSystemDesign,
        loadedQuizAnsweredByType.multiSectionSystemDesign,
      ),
    }

    if (!quizTrackingReady) {
      trackedScoreRef.current = currentRunScore
      trackedAnsweredRef.current = observedQuizCorrectAnswered
      trackedAutoAnsweredRef.current = currentQuizAutoAnsweredCount
      trackedAnsweredByDifficultyRef.current = observedQuizAnsweredByDifficulty
      trackedAnsweredByTypeRef.current = observedQuizAnsweredByType
      trackedAutoAnsweredByDifficultyRef.current = currentQuizAutoAnsweredByDifficulty
      trackedAutoAnsweredByTypeRef.current = currentQuizAutoAnsweredByType
      return
    }

    if (
      trackedScoreRef.current === null ||
      trackedAnsweredRef.current === null ||
      trackedAutoAnsweredRef.current === null ||
      trackedAnsweredByDifficultyRef.current === null ||
      trackedAnsweredByTypeRef.current === null ||
      trackedAutoAnsweredByDifficultyRef.current === null ||
      trackedAutoAnsweredByTypeRef.current === null
    ) {
      trackedScoreRef.current = currentRunScore
      trackedAnsweredRef.current = observedQuizCorrectAnswered
      trackedAutoAnsweredRef.current = currentQuizAutoAnsweredCount
      trackedAnsweredByDifficultyRef.current = observedQuizAnsweredByDifficulty
      trackedAnsweredByTypeRef.current = observedQuizAnsweredByType
      trackedAutoAnsweredByDifficultyRef.current = currentQuizAutoAnsweredByDifficulty
      trackedAutoAnsweredByTypeRef.current = currentQuizAutoAnsweredByType
      return
    }

    const pointsDelta = Math.max(0, Math.floor(currentRunScore - trackedScoreRef.current))
    const autoAnsweredDelta = Math.max(0, Math.floor(currentQuizAutoAnsweredCount - trackedAutoAnsweredRef.current))
    const autoAnsweredByDifficultyDelta: RunQuestionDifficultyBreakdown = {
      easy: Math.max(0, Math.floor(currentQuizAutoAnsweredByDifficulty.easy - trackedAutoAnsweredByDifficultyRef.current.easy)),
      medium: Math.max(0, Math.floor(currentQuizAutoAnsweredByDifficulty.medium - trackedAutoAnsweredByDifficultyRef.current.medium)),
      hard: Math.max(0, Math.floor(currentQuizAutoAnsweredByDifficulty.hard - trackedAutoAnsweredByDifficultyRef.current.hard)),
      veryHard: Math.max(
        0,
        Math.floor(currentQuizAutoAnsweredByDifficulty.veryHard - trackedAutoAnsweredByDifficultyRef.current.veryHard),
      ),
      insanelyHard: Math.max(
        0,
        Math.floor(currentQuizAutoAnsweredByDifficulty.insanelyHard - trackedAutoAnsweredByDifficultyRef.current.insanelyHard),
      ),
    }
    const autoAnsweredByTypeDelta: QuestionTypeBreakdown = {
      rawCode: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.rawCode - trackedAutoAnsweredByTypeRef.current.rawCode)),
      multipleChoice: Math.max(
        0,
        Math.floor(currentQuizAutoAnsweredByType.multipleChoice - trackedAutoAnsweredByTypeRef.current.multipleChoice),
      ),
      starStories: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.starStories - trackedAutoAnsweredByTypeRef.current.starStories)),
      starVoice: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.starVoice - trackedAutoAnsweredByTypeRef.current.starVoice)),
      validList: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.validList - trackedAutoAnsweredByTypeRef.current.validList)),
      orderItems: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.orderItems - trackedAutoAnsweredByTypeRef.current.orderItems)),
      capacity: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.capacity - trackedAutoAnsweredByTypeRef.current.capacity)),
      systemDesign: Math.max(0, Math.floor(currentQuizAutoAnsweredByType.systemDesign - trackedAutoAnsweredByTypeRef.current.systemDesign)),
      multiSectionSystemDesign: Math.max(
        0,
        Math.floor(
          currentQuizAutoAnsweredByType.multiSectionSystemDesign - trackedAutoAnsweredByTypeRef.current.multiSectionSystemDesign,
        ),
      ),
    }
    const questionsAnsweredDelta = Math.max(
      0,
      Math.floor(observedQuizCorrectAnswered - trackedAnsweredRef.current - autoAnsweredDelta),
    )
    const questionsAnsweredByDifficultyDelta: RunQuestionDifficultyBreakdown = {
      easy: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByDifficulty.easy - trackedAnsweredByDifficultyRef.current.easy - autoAnsweredByDifficultyDelta.easy,
        ),
      ),
      medium: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByDifficulty.medium - trackedAnsweredByDifficultyRef.current.medium - autoAnsweredByDifficultyDelta.medium,
        ),
      ),
      hard: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByDifficulty.hard - trackedAnsweredByDifficultyRef.current.hard - autoAnsweredByDifficultyDelta.hard,
        ),
      ),
      veryHard: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByDifficulty.veryHard - trackedAnsweredByDifficultyRef.current.veryHard - autoAnsweredByDifficultyDelta.veryHard,
        ),
      ),
      insanelyHard: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByDifficulty.insanelyHard - trackedAnsweredByDifficultyRef.current.insanelyHard - autoAnsweredByDifficultyDelta.insanelyHard,
        ),
      ),
    }
    const hasDifficultyDelta =
      questionsAnsweredByDifficultyDelta.easy > 0 ||
      questionsAnsweredByDifficultyDelta.medium > 0 ||
      questionsAnsweredByDifficultyDelta.hard > 0 ||
      questionsAnsweredByDifficultyDelta.veryHard > 0 ||
      questionsAnsweredByDifficultyDelta.insanelyHard > 0
    const questionsAnsweredByTypeDelta: QuestionTypeBreakdown = {
      rawCode: Math.max(0, Math.floor(observedQuizAnsweredByType.rawCode - trackedAnsweredByTypeRef.current.rawCode - autoAnsweredByTypeDelta.rawCode)),
      multipleChoice: Math.max(
        0,
        Math.floor(observedQuizAnsweredByType.multipleChoice - trackedAnsweredByTypeRef.current.multipleChoice - autoAnsweredByTypeDelta.multipleChoice),
      ),
      starStories: Math.max(0, Math.floor(observedQuizAnsweredByType.starStories - trackedAnsweredByTypeRef.current.starStories - autoAnsweredByTypeDelta.starStories)),
      starVoice: Math.max(0, Math.floor(observedQuizAnsweredByType.starVoice - trackedAnsweredByTypeRef.current.starVoice - autoAnsweredByTypeDelta.starVoice)),
      validList: Math.max(0, Math.floor(observedQuizAnsweredByType.validList - trackedAnsweredByTypeRef.current.validList - autoAnsweredByTypeDelta.validList)),
      orderItems: Math.max(0, Math.floor(observedQuizAnsweredByType.orderItems - trackedAnsweredByTypeRef.current.orderItems - autoAnsweredByTypeDelta.orderItems)),
      capacity: Math.max(0, Math.floor(observedQuizAnsweredByType.capacity - trackedAnsweredByTypeRef.current.capacity - autoAnsweredByTypeDelta.capacity)),
      systemDesign: Math.max(0, Math.floor(observedQuizAnsweredByType.systemDesign - trackedAnsweredByTypeRef.current.systemDesign - autoAnsweredByTypeDelta.systemDesign)),
      multiSectionSystemDesign: Math.max(
        0,
        Math.floor(
          observedQuizAnsweredByType.multiSectionSystemDesign - trackedAnsweredByTypeRef.current.multiSectionSystemDesign - autoAnsweredByTypeDelta.multiSectionSystemDesign,
        ),
      ),
    }
    const hasTypeDelta =
      questionsAnsweredByTypeDelta.rawCode > 0 ||
      questionsAnsweredByTypeDelta.multipleChoice > 0 ||
      questionsAnsweredByTypeDelta.starStories > 0 ||
      questionsAnsweredByTypeDelta.starVoice > 0 ||
      questionsAnsweredByTypeDelta.validList > 0 ||
      questionsAnsweredByTypeDelta.orderItems > 0 ||
      questionsAnsweredByTypeDelta.capacity > 0 ||
      questionsAnsweredByTypeDelta.systemDesign > 0 ||
      questionsAnsweredByTypeDelta.multiSectionSystemDesign > 0

    trackedScoreRef.current = currentRunScore
    trackedAnsweredRef.current = observedQuizCorrectAnswered
    trackedAutoAnsweredRef.current = currentQuizAutoAnsweredCount
    trackedAnsweredByDifficultyRef.current = cloneDifficultyBreakdown(observedQuizAnsweredByDifficulty)
    trackedAnsweredByTypeRef.current = cloneQuestionTypeBreakdown(observedQuizAnsweredByType)
    trackedAutoAnsweredByDifficultyRef.current = cloneDifficultyBreakdown(currentQuizAutoAnsweredByDifficulty)
    trackedAutoAnsweredByTypeRef.current = cloneQuestionTypeBreakdown(currentQuizAutoAnsweredByType)

    if (pointsDelta <= 0 && questionsAnsweredDelta <= 0 && !hasDifficultyDelta && !hasTypeDelta) {
      return
    }

    const nextStats = recordDailyActivityDeltas({
      pointsDelta,
      questionsAnsweredDelta,
      questionsAnsweredByDifficultyDelta,
      questionsAnsweredByTypeDelta,
    })

    if (nextStats) {
      setDailyActivityStats(nextStats)
    }
  }, [
    currentQuizAnsweredByDifficulty,
    currentQuizAnsweredByType,
    currentQuizCorrectAnswers,
    currentQuizAutoAnsweredByDifficulty,
    currentQuizAutoAnsweredByType,
    currentQuizAutoAnsweredCount,
    currentQuizTotalAnswered,
    currentRunScore,
    loadedQuizAnsweredByDifficulty,
    loadedQuizAnsweredByType,
    loadedQuizCorrectAnswers,
    loadedQuizTotalAnswered,
    quizTrackingReady,
    isRunEnded,
    runReady,
  ])

  useEffect(() => {
    if (!runReady || isRunEnded) {
      runPlaytimeTickMsRef.current = null
      return
    }

    const intervalId = window.setInterval(() => {
      persistGameState()
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isRunEnded, persistGameState, runReady])

  useEffect(() => {
    if (!runReady || isRunEnded) {
      runPlaytimeTickMsRef.current = null
      return
    }

    if (isGamePaused) {
      runPlaytimeTickMsRef.current = null
      return
    }

    if (runPlaytimeTickMsRef.current === null) {
      runPlaytimeTickMsRef.current = Date.now()
    }
  }, [isGamePaused, isRunEnded, runReady])

  useEffect(() => {
    if (!runReady || isRunEnded) {
      runPlaytimeTickMsRef.current = null
      return
    }

    const intervalId = window.setInterval(() => {
      if (manualPauseRef.current) {
        runPlaytimeTickMsRef.current = null
        return
      }

      const previousTickMs = runPlaytimeTickMsRef.current
      if (previousTickMs === null) {
        runPlaytimeTickMsRef.current = Date.now()
        return
      }

      const nowMs = Date.now()
      const elapsedMs = nowMs - previousTickMs
      const wholeSeconds = Math.floor(elapsedMs / 1000)

      if (wholeSeconds <= 0) {
        return
      }

      const accountedEndMs = previousTickMs + wholeSeconds * 1000
      runPlaytimeTickMsRef.current = accountedEndMs
      setRunElapsedSeconds((previous) => previous + wholeSeconds)

      const nextStats = recordDailyPlaytimeRange({
        startTimeMs: previousTickMs,
        durationSeconds: wholeSeconds,
      })

      if (nextStats) {
        setDailyActivityStats(nextStats)
      }
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isRunEnded, runReady])

  return (
    <div className="webgl-root">
      <section
        className={[
          'top-world-section',
          isFieldMotionPaused ? 'top-world-section-motion-paused' : '',
        ].filter(Boolean).join(' ')}
        style={topWorldSectionStyle}
      >
        <div ref={mountRef} className="webgl-canvas" />

        {activeFocusFilters.micOnlyMode ? <MicOnlyIndicator /> : null}

        <div className="top-left-hud" aria-live="polite">
          <div className="round-counter">
            <div className="round-counter-row">
              <span className="round-counter-label">Round</span>
              <strong className="round-counter-value">{currentRound}</strong>
            </div>
            <div className="round-counter-row" style={livesToneStyle}>
              <span className="round-counter-label">Lives</span>
              <strong className="round-counter-value">{playerState.lives}</strong>
            </div>
            <div className="round-counter-row" style={skipsToneStyle}>
              <span className="round-counter-label">Skips</span>
              <strong className="round-counter-value">{playerState.skips}</strong>
            </div>
            <div className="round-counter-row round-counter-score" style={scoreToneStyle}>
              <span className="round-counter-label">Score</span>
              <strong className="round-counter-value">{currentRunScore}</strong>
            </div>
            <div className="round-counter-row" style={runTimeToneStyle}>
              <span className="round-counter-label">Run Time</span>
              <strong className="round-counter-value">{formatElapsedTime(runElapsedSeconds)}</strong>
            </div>
          </div>

          {queuedNukes > 0 || queuedFreezeRays > 0 ? (
            <div className="queue-counter-card" aria-label="Queued artifact shots">
              {queuedNukes > 0 ? (
                <div className="queue-counter-row queue-counter-row-nuke">
                  <span className="queue-counter-icon queue-counter-icon-nuke" aria-hidden="true" />
                  <span className="queue-counter-label">Nukes</span>
                  <strong className="queue-counter-value">{queuedNukes}</strong>
                </div>
              ) : null}
              {queuedFreezeRays > 0 ? (
                <div className="queue-counter-row queue-counter-row-freeze">
                  <span className="queue-counter-icon queue-counter-icon-freeze" aria-hidden="true" />
                  <span className="queue-counter-label">Freeze Rays</span>
                  <strong className="queue-counter-value">{queuedFreezeRays}</strong>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <ArtifactIconBar playerState={playerState} runLaunchConfig={runLaunchConfig} />
        <div className="run-difficulty-indicator" style={difficultyToneStyle} aria-live="polite">
          <span className="run-difficulty-value">difficulty: {difficultyDisplayValue}</span>
        </div>

        {quizFreezeUiState.quizFreezeActive ? (
          <div
            className={`freeze-overlay${quizFreezeUiState.quizFreezeFading ? ' fade-out' : ''}`}
            aria-hidden="true"
          >
            <div className="freeze-overlay-label">
              {quizFreezeUiState.quizGraceQuestionModeActive ? 'Answer Questions' : 'Time Frozen'}
            </div>
            <div className="freeze-overlay-timer">
              {quizFreezeUiState.quizGraceQuestionModeActive
                ? `${quizFreezeUiState.quizGraceQuestionsAnswered} / ${quizFreezeUiState.quizGraceQuestionsRequired}`
                : `${quizFreezeUiState.quizFreezeSecondsLeft.toFixed(0)}s`}
            </div>
          </div>
        ) : null}
      </section>

      <MainMenuButton
        isGamePaused={isGamePaused}
        onTogglePause={() => {
          setIsGamePaused((previous) => !previous)
        }}
        onExploreQuestions={() => {
          setQuestionExplorerOpen(true)
        }}
        onOpenFocusDialog={() => {
          setFocusDialogOpenedFromMenu(true)
          setFocusDialogOpen(true)
        }}
        onOpenStarVoiceProgressDialog={() => {
          setStarVoiceProgressDialogOpen(true)
          setIsGamePaused(true)
        }}
        onResetGame={handleResetGame}
        currentScore={currentRunScore}
        currentRound={currentRound}
        enemyKills={playerState.enemyKills}
        roundsCleared={roundsCleared}
        currentQuizTotalAnswered={currentQuizTotalAnswered}
        currentQuizAnsweredByDifficulty={currentQuizAnsweredByDifficulty}
        priorityQueueCount={priorityQuestionIds.length}
        priorityQueueSummaries={priorityQuestionSummaries}
        dailyActivityStats={dailyActivityStats}
        highScoreEntries={highScoreEntries}
      />

      <section className="bottom-quiz-section">
        <div className="bottom-quiz-main">
          <QuizPanelQuestionsView
            key={`quiz-panel-${worldSessionId}`}
            playerRef={playerRef}
            postOverlay={postOverlay}
            syncPlayerState={syncPlayerState}
            runLaunchConfig={runLaunchConfig}
            currentRound={currentRound}
            isGamePaused={isGamePaused}
            onRequestUnpauseGame={() => {
              setIsGamePaused(false)
            }}
            onCorrectAnswerCelebration={triggerFieldGlowBoost}
            onQuizStreakChange={(streak) => {
              quizCurrentStreakRef.current = streak
              setPlayerState((previous) => {
                if (previous.quizCurrentStreak === streak) {
                  return previous
                }

                const next = {
                  ...previous,
                  quizCurrentStreak: streak,
                }
                playerStateSignatureRef.current = getPlayerStateSignature(next)
                return next
              })
            }}
            onRegisterWorldControls={(controls) => {
              quizWorldControlsRef.current = controls
              if (!quizSaveHydratedRef.current) {
                controls.restoreSaveState(loadedSaveRef.current?.quizState)
                quizSaveHydratedRef.current = true
                setQuizTrackingReady(true)
              }
            }}
            onFreezeUiStateChange={setQuizFreezeUiState}
            onPriorityQuestionQueueChange={setPriorityQuestionIds}
          />
        </div>

        {buffsPanelRef.current.render(playerState)}
      </section>

      <ShopOverlay
        rewardPrompt={rewardPrompt}
        currentGold={playerState.gold}
        currentSkips={playerState.skips}
        visibleShopItemCount={shopVisibleItemCount}
        purchasedArtifactIds={playerState.artifactIds}
        displayedRewardIds={shopDisplayedRewardIds}
        onDisplayedRewardIdsChange={handleShopDisplayedRewardIdsChange}
        getRewardCost={getRewardCost}
        onRewardSelection={handleRewardSelection}
        onRefreshShop={handleRefreshShop}
        onFinishShopping={handleFinishShopping}
      />

      {questionExplorerOpen ? (
        <QuestionExplorer
          runSeenQuestionIds={runSeenQuestionIds}
          lifetimeSeenQuestionIds={lifetimeSeenQuestionIds}
          onClose={() => {
            setQuestionExplorerOpen(false)
          }}
        />
      ) : null}

      {lifeLossDialogLives !== null && !isRunEnded ? (
        <div className="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-label="Life lost warning">
          <div className="quiz-modal-card quiz-modal-card-incorrect">
            <h3>Life Lost</h3>
            <p>You lost a life.</p>
            <p>Lives remaining: {lifeLossDialogLives}</p>
            <button
              type="button"
              className="quiz-next"
              onClick={() => {
                setLifeLossDialogLives(null)
              }}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}

      {postGameSummary ? (
        <div className="quiz-modal-backdrop post-game-backdrop" role="dialog" aria-modal="true" aria-label="Run ended summary">
          <div className="quiz-modal-card post-game-card">
            <h3>{postGameSummary.run.endReason === 'victory' ? 'VICTORY!' : 'Run Complete'}</h3>
            <p>
              {postGameSummary.run.endReason === 'victory'
                ? 'Round 10 cleared. Here is your round results report.'
                : 'Your final life is gone. Here is your post-game report.'}
            </p>
            {postGameSummary.unlockedDifficultyLevel !== null ? (
              <p>
                Next difficulty unlocked: {RUN_DIFFICULTY_LABELS[postGameSummary.unlockedDifficultyLevel]}
              </p>
            ) : null}

            <div className="post-game-stats-grid" aria-live="polite">
              <div className="post-game-stat-block">
                <h4>Run Results</h4>
                <p><span>Final Score</span><strong>{postGameSummary.run.score}</strong></p>
                <p><span>Run Time</span><strong>{formatElapsedTime(postGameSummary.runElapsedSeconds)}</strong></p>
                <p><span>Rounds Cleared</span><strong>{postGameSummary.run.roundsCleared}</strong></p>
                <p><span>Final Round Reached</span><strong>{postGameSummary.run.currentRound}</strong></p>
                <p><span>Enemy Kills</span><strong>{postGameSummary.run.enemyKills}</strong></p>
              </div>

              <div className="post-game-stat-block">
                <h4>Player Stats</h4>
                <p><span>Gold</span><strong>{postGameSummary.goldCollected}</strong></p>
                <p><span>Lives Remaining</span><strong>{postGameSummary.livesRemaining}</strong></p>
                <p><span>Current Streak</span><strong>{postGameSummary.currentStreak}</strong></p>
                <p><span>Quiz Bonus Score</span><strong>{postGameSummary.quizScoreBonus}</strong></p>
                <p><span>Artifacts Collected</span><strong>{postGameSummary.artifactsCollected}</strong></p>
              </div>

              <div className="post-game-stat-block">
                <h4>Quiz Totals</h4>
                <p><span>Total Correct</span><strong>{postGameSummary.quizTotalAnswered}</strong></p>
                <p><span>Easy</span><strong>{postGameSummary.quizAnsweredByDifficulty.easy}</strong></p>
                <p><span>Medium</span><strong>{postGameSummary.quizAnsweredByDifficulty.medium}</strong></p>
                <p><span>Hard</span><strong>{postGameSummary.quizAnsweredByDifficulty.hard}</strong></p>
                <p><span>Very Hard</span><strong>{postGameSummary.quizAnsweredByDifficulty.veryHard}</strong></p>
                <p><span>Insanely Hard</span><strong>{postGameSummary.quizAnsweredByDifficulty.insanelyHard}</strong></p>
              </div>

              <div className="post-game-stat-block">
                <h4>Question Types</h4>
                <p><span>Raw Code</span><strong>{postGameSummary.quizAnsweredByType.rawCode}</strong></p>
                <p><span>Multiple Choice</span><strong>{postGameSummary.quizAnsweredByType.multipleChoice}</strong></p>
                <p><span>STAR Stories</span><strong>{postGameSummary.quizAnsweredByType.starStories}</strong></p>
                <p><span>STAR Voice</span><strong>{postGameSummary.quizAnsweredByType.starVoice}</strong></p>
                <p><span>Valid List</span><strong>{postGameSummary.quizAnsweredByType.validList}</strong></p>
                <p><span>Order Items</span><strong>{postGameSummary.quizAnsweredByType.orderItems}</strong></p>
                <p><span>Capacity</span><strong>{postGameSummary.quizAnsweredByType.capacity}</strong></p>
                <p><span>System Design</span><strong>{postGameSummary.quizAnsweredByType.systemDesign}</strong></p>
                <p><span>Multi-Section SD</span><strong>{postGameSummary.quizAnsweredByType.multiSectionSystemDesign}</strong></p>
              </div>
            </div>

            <div className="post-game-actions">
              <button
                type="button"
                className="quiz-next"
                onClick={handleResetGame}
              >
                Start New Run
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {runSetupOpen ? (
        <RunLaunchSetup
          initialStories={starStories}
          progress={runLaunchProgress}
          initialConfig={runLaunchConfig}
          onStartRun={handleRunLaunchConfigured}
          onChaosArtifactRolled={handleChaosArtifactRolledInSetup}
        />
      ) : null}

      {starStoriesSetupOpen ? (
        <StarStoriesRunSetup
          initialStories={starStories}
          onStartRun={(nextStories) => {
            handleStartRun(nextStories, pendingRunLaunchConfig ?? runLaunchConfig)
          }}
        />
      ) : null}

      {welcomeDialogOpen ? (
        <div className="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-label="Welcome to the game">
          <div className="quiz-modal-card welcome-dialog-card">
            <h3>Welcome</h3>
            <p className="quiz-modal-copy welcome-dialog-lead">
              This is a fast interview-practice game: answer questions to grow stronger while surviving combat.
            </p>
            <ul className="welcome-dialog-list">
              <li>Questions appear during runs and power up your ship when you answer well.</li>
              <li>Questions get harder the more you answer correctly.</li>
              <li>Correct answers can grant gold, healing, buffs, and artifact-triggered effects.</li>
              <li>Between rounds, you buy artifacts that power up your ship.</li>
              <li>Survive to round 10 and beat the boss to unlock the next difficulty level.</li>
            </ul>
            <p className="quiz-modal-copy quiz-modal-copy-subtle">
              Start a run, answer a few questions, and the systems will make sense very quickly.
            </p>
            <div className="post-game-actions">
              <button
                type="button"
                className="quiz-next"
                onClick={() => {
                  setWelcomeDialogOpen(false)
                  setIsGamePaused(false)
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {focusDialogOpen ? (
        <FocusDialog initialFilters={storedFocusFilters} onConfirm={handleConfirmFocus} />
      ) : null}

      {starVoiceProgressDialogOpen ? (
        <StarVoiceProgressDialog
          rows={starVoiceProgressRows}
          totalSeenToday={totalStarVoiceSeenRun}
          totalCompletedToday={totalStarVoiceCompletedRun}
          progressTargetPerDifficulty={STAR_VOICE_PROGRESS_TARGET_PER_DIFFICULTY}
          onClose={() => {
            setStarVoiceProgressDialogOpen(false)
          }}
        />
      ) : null}

      <OverlayStack overlays={overlays} onDismiss={dismissOverlay} />
    </div>
  )
}
