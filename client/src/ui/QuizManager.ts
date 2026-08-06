import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Player } from '../Player/Player'
import {
  ROUND_QUIZ_BUFF_LABELS,
  type RoundQuizBuffType,
} from '../Player/PlayerBuffManager'
import {
  getActiveQuizFocusFilters,
  getQuizQuestionById,
  getQuizSelectionDebugSnapshot,
  getTranscriptionRotationState,
  getCorrectQuizExplanation,
  getMultiSectionSystemDesignIncorrectExplanation,
  getLatestQuizQuestionContent,
  getIncorrectQuizExplanation,
  getNextQuizQuestion,
  isQuizQuestionAllowedByCurrentFocus,
  resetTranscriptionRotationState,
  setTranscriptionRotationState,
  type QuizCorrectExplanation,
  type QuizIncorrectExplanation,
  type QuizQuestion,
  type QuizQuestionKind,
  type QuizSelectionDebugSnapshot,
  type TranscriptionAttemptProgressByProblem,
} from '../quiz/QuizQuestionManager'
import {
  getRawCodingRotationState,
  resetRawCodingRotationState,
  setRawCodingRotationState,
} from '../quiz/RawCodeManager'
import quizRampSettings from '../quiz/quizRampSettings'
import {
  createEmptyQuestionTypeBreakdown,
  type QuestionTypeBreakdown,
  type QuestionTypeKey,
  type QuizSaveState,
} from '../Player/GameSaving'
import type { RunQuestionDifficultyBreakdown } from '../WaveManager'
import {
  computeCapacityAnswerOutcome,
  isCapacityQuestion,
} from './CapacityAnswerManager'
import {
  computeTranscriptionAnswerOutcome,
  isTranscriptionQuestion,
} from './TranscriptionAnswerManager'
import {
  computeQuestionGoldMultiplier,
  computeQuestionSelectionDifficultyOffset,
  type RunLaunchConfig,
} from './RunLaunchConfig'

const ROUND_FREEZE_SECONDS = 60
// const ROUND_FREEZE_SECONDS = 0
const INITIAL_EASY_DIFFICULTY_GRACE_QUESTIONS = 5
const GOLD_PER_CORRECT_ANSWER = 2
const SCORE_PER_CORRECT_ANSWER_BASE = 5
const MAX_HEALTH_PER_CORRECT_ANSWER = 5
const MAX_SHIELD_PER_CORRECT_ANSWER = 2.5
const HEALTH_HEAL_PERCENT_PER_CORRECT_ANSWER = 0.05
const SHIELD_HEAL_PERCENT_PER_CORRECT_ANSWER = 0.05
const NORMAL_QUESTION_INCORRECT_FREEZE_PENALTY_SECONDS = 30
const NEXT_QUESTION_TIMEOUT_SECONDS = 30
const CORRECT_ANSWERS_FOR_FIRST_LIFE = 15
const CORRECT_ANSWERS_LIFE_INCREMENT = 5
const ROUND_QUIZ_BUFF_TYPES: RoundQuizBuffType[] = ['damage', 'fireRate', 'health', 'shield']
const STAR_STORY_QUESTION_ID_PREFIX = 'star-story-'
const MULTI_SECTION_SYSTEM_DESIGN_REWARD_MULTIPLIER = 4
const LIFE_LOSS_REORDER_QUESTION_ID = 'life-loss-system-design-reorder'

function createLifeLossReorderQuestion(): QuizQuestion {
  const items = [
    'Clarify Core Requirements: Define 2-3 key functional features to keep the scope realistic.',
    'Establish Non-Functional Requirements: Define target latency, availability vs. consistency (CAP theorem), durability, and SLA expectations.',
    'Run Back-of-the-Envelope Estimates: Quantify expected Read/Write QPS, peak throughput, bandwidth requirements, and multi-year storage needs.',
    'Define API Specifications: Outline key request/response payloads, HTTP methods, or RPC endpoints.',
    'Select Data Storage Paradigms: Choose appropriate database models (Relational, Key-Value, Document, Time-Series) based on access patterns.',
    'Map High-Level Data Flow: Sketch the core end-to-end architecture connecting clients, load balancers, application servers, and databases.',
    'Implement Caching & CDN Strategies: Reduce database pressure and latency using distributed caching (e.g., Redis) and static edge storage.',
    'Address Data Partitioning & Scaling: Design sharding logic, consistent hashing rings, and read-replica replication models to scale horizontally.',
    'Decouple Workloads via Async Processing: Use message queues or event streams (e.g., Kafka, RabbitMQ) to handle heavy write traffic asynchronously.',
    'Identify SPOFs & Fault Tolerance: Walk through single points of failure, failover mechanisms, distributed tracing, and monitoring strategies.',
  ]

  return {
    id: LIFE_LOSS_REORDER_QUESTION_ID,
    prompt:
      'Life Loss Recovery Drill\n\n' +
      'Re-order these system design steps into the correct interview flow from first to last.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    difficulty: 'easy',
    kind: 'orderItems',
    correctExplanation:
      'Correct order: requirements -> constraints -> estimation -> APIs -> storage -> high-level architecture -> caching/CDN -> partitioning/scaling -> async workloads -> fault tolerance.',
    orderItems: {
      helperText:
        'Drag each step into the canonical system design sequence from first to last.',
      items,
      correctOrder: Array.from({ length: items.length }, (_, index) => index),
    },
  }
}

function isLifeLossReorderQuestionId(questionId: string): boolean {
  return questionId.trim() === LIFE_LOSS_REORDER_QUESTION_ID
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

export function getQuestionTypeForTracking(question: QuizQuestion): QuestionTypeKey {
  if (question.kind === 'transcription') {
    return 'starVoice'
  }

  if (question.id.startsWith(STAR_STORY_QUESTION_ID_PREFIX)) {
    return 'starStories'
  }

  if (question.kind === 'rawCoding') {
    return 'rawCode'
  }

  if (question.kind === 'validList') {
    return 'validList'
  }

  if (question.kind === 'orderItems') {
    return 'orderItems'
  }

  if (question.kind === 'leetcodePatternType') {
    return 'multipleChoice'
  }

  if (question.kind === 'capacity') {
    return 'capacity'
  }

  if (question.kind === 'systemDesign') {
    return 'systemDesign'
  }

  if (question.kind === 'multiSectionSystemDesign') {
    return 'multiSectionSystemDesign'
  }

  return 'multipleChoice'
}

function getRewardDifficulty(question: QuizQuestion | null): QuizQuestion['difficulty'] | null {
  if (!question) {
    return null
  }

  if (
    isTranscriptionQuestion(question) &&
    (question.difficulty === 'easy' || question.difficulty === 'medium')
  ) {
    return 'hard'
  }

  return question.difficulty
}

function isStarStoryOrderingQuizQuestion(question: QuizQuestion | null): boolean {
  if (!question) {
    return false
  }

  return question.id.startsWith(STAR_STORY_QUESTION_ID_PREFIX) && question.orderItems !== undefined
}

function isMultiSectionSystemDesignQuizQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'multiSectionSystemDesign' && question.multiSectionSystemDesign !== undefined
}

function getBaseRewardMultiplier(question: QuizQuestion | null): number {
  if (isMultiSectionSystemDesignQuizQuestion(question)) {
    return MULTI_SECTION_SYSTEM_DESIGN_REWARD_MULTIPLIER
  }

  return 1
}

function getRoundBuffRewardMultiplier(question: QuizQuestion | null): number {
  const baseRewardMultiplier = getBaseRewardMultiplier(question)
  if (baseRewardMultiplier > 1) {
    return baseRewardMultiplier
  }

  const rewardDifficulty = getRewardDifficulty(question)
  if (!rewardDifficulty) {
    return 1
  }

  let baseMultiplier = 1

  if (rewardDifficulty === 'insanelyHard') {
    baseMultiplier = 4
  } else if (rewardDifficulty === 'hard' || rewardDifficulty === 'veryHard') {
    baseMultiplier = 2
  }

  if (isStarStoryOrderingQuizQuestion(question)) {
    return baseMultiplier * 2
  }

  return baseMultiplier
}

function getCorrectAnswerGoldMultiplier(question: QuizQuestion | null): number {
  const rewardDifficulty = getRewardDifficulty(question)
  if (!rewardDifficulty) {
    return 1
  }

  if (rewardDifficulty === 'veryHard') {
    return 3
  }

  if (rewardDifficulty === 'insanelyHard') {
    return 4
  }

  if (rewardDifficulty === 'hard') {
    return 2
  }

  if (rewardDifficulty === 'medium') {
    return 1.5
  }

  return 1
}

function getCorrectAnswerHealingMultiplier(question: QuizQuestion | null): number {
  const baseRewardMultiplier = getBaseRewardMultiplier(question)
  if (baseRewardMultiplier > 1) {
    return baseRewardMultiplier
  }

  const rewardDifficulty = getRewardDifficulty(question)
  if (!rewardDifficulty) {
    return 1
  }

  let baseMultiplier = 1

  if (rewardDifficulty === 'insanelyHard') {
    baseMultiplier = 4
  } else if (rewardDifficulty === 'hard' || rewardDifficulty === 'veryHard') {
    baseMultiplier = 2
  }

  if (isStarStoryOrderingQuizQuestion(question)) {
    return baseMultiplier * 2
  }

  return baseMultiplier
}

function getQuestionDifficultyScoreMultiplier(question: QuizQuestion | null): number {
  const baseRewardMultiplier = getBaseRewardMultiplier(question)
  if (baseRewardMultiplier > 1) {
    return baseRewardMultiplier
  }

  const rewardDifficulty = getRewardDifficulty(question)
  if (!rewardDifficulty) {
    return 1
  }

  if (rewardDifficulty === 'insanelyHard') {
    return 5
  }

  if (rewardDifficulty === 'veryHard') {
    return 4
  }

  if (rewardDifficulty === 'hard') {
    return 3
  }

  if (rewardDifficulty === 'medium') {
    return 2
  }

  return 1
}

function getStarStoryGoldMultiplier(question: QuizQuestion | null, config?: RunLaunchConfig): number {
  if (!question || !config?.startingArtifacts.starStoriesHardMode) {
    return 1
  }

  return question.id.startsWith(STAR_STORY_QUESTION_ID_PREFIX) ? 1.5 : 1
}

function getRunWideGoldMultiplier(config?: RunLaunchConfig): number {
  if (config?.chaosArtifactId === 'gold-125-shield-drain') {
    return 1.25
  }

  if (config?.chaosArtifactId === 'gold-200-health-drain') {
    return 1.5
  }

  return 1
}

function formatRoundBuffRewardLabel(buffType: RoundQuizBuffType, multiplier: number): string {
  const baseLabel = ROUND_QUIZ_BUFF_LABELS[buffType]
  return multiplier > 1 ? `${baseLabel} x${multiplier}` : baseLabel
}

function rollRoundQuizBuffType(): RoundQuizBuffType {
  return ROUND_QUIZ_BUFF_TYPES[Math.floor(Math.random() * ROUND_QUIZ_BUFF_TYPES.length)]
}

function isValidListQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'validList' && question.validList !== undefined
}

function isOrderItemsQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'orderItems' && question.orderItems !== undefined
}

function isSameOrder(left: number[], right: number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function isValidOrderPermutation(order: number[], itemCount: number): boolean {
  if (!Array.isArray(order) || order.length !== itemCount) {
    return false
  }

  return (
    order.every((index) => typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < itemCount) &&
    new Set(order).size === itemCount
  )
}

function getAcceptedOrderItemsOrders(orderItems: { items: string[]; correctOrder: number[]; validOrders?: number[][] }): number[][] {
  const itemCount = orderItems.items.length
  const candidateValidOrders = Array.isArray(orderItems.validOrders)
    ? orderItems.validOrders.filter((candidateOrder) => isValidOrderPermutation(candidateOrder, itemCount))
    : []

  if (candidateValidOrders.length > 0) {
    return candidateValidOrders
  }

  if (isValidOrderPermutation(orderItems.correctOrder, itemCount)) {
    return [orderItems.correctOrder]
  }

  return []
}

function isStarStoryCombinedOrderingQuestion(question: QuizQuestion): boolean {
  if (!isStarStoryOrderingQuizQuestion(question)) {
    return false
  }

  return question.id.includes('dual-story-ordering') || question.id.includes('quad-story-ordering')
}

function generateOrderPermutations(values: number[]): number[][] {
  if (values.length <= 1) {
    return [values.slice()]
  }

  const permutations: number[][] = []

  for (let index = 0; index < values.length; index += 1) {
    const fixedValue = values[index]
    const remainder = values.slice(0, index).concat(values.slice(index + 1))
    const remainderPermutations = generateOrderPermutations(remainder)

    for (const remainderPermutation of remainderPermutations) {
      permutations.push([fixedValue, ...remainderPermutation])
    }
  }

  return permutations
}

function inferAcceptedOrdersForStarCombinedQuestion(question: QuizQuestion): number[][] {
  if (!question.orderItems) {
    return []
  }

  const storyIds = Array.from(
    new Set(question.id.match(/star-story-\d+-[a-z0-9-]+(?=-star-story-\d+-|$)/g) ?? []),
  )
  if (storyIds.length < 2) {
    return []
  }

  const stories = storyIds
    .map((storyId) => {
      const fullOrderQuestion = getQuizQuestionById(`${storyId}-full-story-ordering`)
      if (!fullOrderQuestion?.orderItems) {
        return null
      }

      return {
        storyId,
        items: fullOrderQuestion.orderItems.items,
      }
    })
    .filter((story): story is { storyId: string; items: string[] } => story !== null)

  if (stories.length !== storyIds.length) {
    return []
  }

  const combinedItems = question.orderItems.items
  const remainingStories = [...stories]
  const orderedStoryBlocks: Array<{ start: number; end: number }> = []
  let cursor = 0

  while (cursor < combinedItems.length && remainingStories.length > 0) {
    const matchingStory = remainingStories.find((story) => {
      const nextSlice = combinedItems.slice(cursor, cursor + story.items.length)
      if (nextSlice.length !== story.items.length) {
        return false
      }

      return story.items.every((item, index) => nextSlice[index] === item)
    })

    if (!matchingStory) {
      return []
    }

    const blockStart = cursor
    const blockEnd = cursor + matchingStory.items.length - 1
    orderedStoryBlocks.push({ start: blockStart, end: blockEnd })
    cursor = blockEnd + 1

    const remainingIndex = remainingStories.findIndex((story) => story.storyId === matchingStory.storyId)
    if (remainingIndex >= 0) {
      remainingStories.splice(remainingIndex, 1)
    }
  }

  if (cursor !== combinedItems.length || orderedStoryBlocks.length !== storyIds.length) {
    return []
  }

  const blockOrderIndices = Array.from({ length: orderedStoryBlocks.length }, (_, index) => index)
  const blockPermutations = generateOrderPermutations(blockOrderIndices)

  return blockPermutations.map((permutation) => {
    const flattened: number[] = []
    for (const blockIndex of permutation) {
      const block = orderedStoryBlocks[blockIndex]
      for (let itemIndex = block.start; itemIndex <= block.end; itemIndex += 1) {
        flattened.push(itemIndex)
      }
    }
    return flattened
  })
}

export function getAcceptedOrderItemsOrdersForQuestion(question: QuizQuestion | null): number[][] {
  if (!question || !isOrderItemsQuestion(question) || !question.orderItems) {
    return []
  }

  const acceptedFromMetadata = getAcceptedOrderItemsOrders(question.orderItems)
  const hasValidOrdersInMetadata = Array.isArray(question.orderItems.validOrders) && question.orderItems.validOrders.length > 0

  if (hasValidOrdersInMetadata || acceptedFromMetadata.length === 0 || !isStarStoryCombinedOrderingQuestion(question)) {
    return acceptedFromMetadata
  }

  const inferredAcceptedOrders = inferAcceptedOrdersForStarCombinedQuestion(question)
  return inferredAcceptedOrders.length > 0 ? inferredAcceptedOrders : acceptedFromMetadata
}

function normalizeTranscriptionAttemptsByProblem(
  value: unknown,
): TranscriptionAttemptProgressByProblem {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return {}
  }

  const candidate = value as Record<string, unknown>
  const normalized: TranscriptionAttemptProgressByProblem = {}

  Object.entries(candidate).forEach(([problemId, progress]) => {
    if (typeof progress !== 'object' || progress === null) {
      return
    }

    const typed = progress as Partial<{ easy: number; medium: number; hard: number }>
    normalized[problemId] = {
      easy: Math.max(0, Math.floor(typed.easy ?? 0)),
      medium: Math.max(0, Math.floor(typed.medium ?? 0)),
      hard: Math.max(0, Math.floor(typed.hard ?? 0)),
    }
  })

  return normalized
}

function randomizeQuestionForDisplay(question: QuizQuestion): QuizQuestion {
  const shuffleEntries = <T,>(entries: Array<{ value: T; isCorrect: boolean }>) => {
    const nextEntries = [...entries]

    for (let index = nextEntries.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      const temp = nextEntries[index]
      nextEntries[index] = nextEntries[swapIndex]
      nextEntries[swapIndex] = temp
    }

    return nextEntries
  }

  if (question.kind === 'multiSectionSystemDesign' && question.multiSectionSystemDesign) {
    return {
      ...question,
      multiSectionSystemDesign: {
        ...question.multiSectionSystemDesign,
        sections: question.multiSectionSystemDesign.sections.map((section) => {
          const optionEntries = shuffleEntries(
            section.options.map((option, index) => ({
              value: option,
              isCorrect: index === section.correctIndex,
            })),
          )

          return {
            ...section,
            options: optionEntries.map((entry) => entry.value),
            correctIndex: optionEntries.findIndex((entry) => entry.isCorrect),
          }
        }),
      },
    }
  }

  if (!isValidListQuestion(question) || !question.validList) {
    return question
  }

  const { items, validIndices } = question.validList

  // Create array of [originalIndex, item] pairs
  const indexed = items.map((item, index) => ({ originalIndex: index, item }))

  // Shuffle using Fisher-Yates algorithm
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]]
  }

  // Extract shuffled items and create index mapping
  const shuffledItems = indexed.map((entry) => entry.item)
  const oldToNewIndexMap = new Map<number, number>()
  indexed.forEach((entry, newIndex) => {
    oldToNewIndexMap.set(entry.originalIndex, newIndex)
  })

  // Map validIndices to new positions
  const shuffledValidIndices = validIndices
    .map((oldIndex) => oldToNewIndexMap.get(oldIndex))
    .filter((index): index is number => index !== undefined)

  return {
    ...question,
    validList: {
      ...question.validList,
      items: shuffledItems,
      validIndices: shuffledValidIndices,
    },
  }
}

interface OverlayPayload {
  title: string
  message: string
  details?: string[]
  durationMs?: number
}

interface UseQuizManagerParams {
  playerRef: MutableRefObject<Player | null>
  postOverlay: (payload: OverlayPayload) => string
  syncPlayerState: (player: Player) => void
  runLaunchConfig?: RunLaunchConfig
  currentRound?: number
  onQuizStreakChange?: (streak: number) => void
  onCorrectAnswerCelebration?: () => void
}

interface QuizGoldArtifactEffect {
  artifactId: string
  artifactName: string
  appliedToThisReward: boolean
  details: string
}

export interface QuizCorrectRewardSummary {
  goldReward: number
  questionGoldReward: number
  streakGoldReward: number
  streakBaseGoldReward: number
  baseGoldReward: number
  goldMultiplier: number
  difficultyGoldMultiplier: number
  questionBonusGoldMultiplier: number
  artifactGoldMultiplier: number
  runLaunchGoldMultiplier: number
  starStoryGoldMultiplier: number
  runWideGoldMultiplier: number
  anyGainGoldMultiplier: number
  goldArtifactEffects: QuizGoldArtifactEffect[]
  roundBuffType: RoundQuizBuffType
  roundBuffStacks: number
  roundBuffLabel: string
}

export interface QuizManagerApi {
  quizActive: boolean
  quizQuestion: QuizQuestion | null
  quizAnswerResult: 'correct' | 'incorrect' | null
  quizCorrectExplanation: QuizCorrectExplanation | null
  quizCorrectRewardSummary: QuizCorrectRewardSummary | null
  quizIncorrectExplanation: QuizIncorrectExplanation | null
  quizFreezeActive: boolean
  quizFreezeFading: boolean
  quizFreezeSecondsLeft: number
  quizGraceQuestionModeActive: boolean
  quizGraceQuestionsAnswered: number
  quizGraceQuestionsRequired: number
  nextQuestionDelaySecondsLeft: number
  quizCorrectAnswers: number
  quizTotalAnswered: number
  quizCorrectForNextLife: number
  quizCorrectNeededForNextLife: number
  quizUpcomingBuffLabel: string | null
  priorityQuestionIds: string[]
  quizSelectionDebugSnapshot: QuizSelectionDebugSnapshot
  handleQuizAnswer: (selectedIndex: number, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => void
  handleValidListAnswer: (
    selectedIndices: number[],
    options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean },
  ) => void
  handleOrderItemsAnswer: (orderedIndices: number[], options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => void
  handleCapacityAnswer: (
    estimateValue: number,
    options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean },
  ) => void
  handleTranscriptionAnswer: (
    transcript: string,
    options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean },
  ) => void
  handleSystemDesignAnswer: (score: number, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => void
  handleMultiSectionSystemDesignAnswer: (
    selectedIndices: number[],
    options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean },
  ) => void
  handleResumeAfterCorrectQuizAnswer: () => void
  handleResumeAfterIncorrectQuizAnswer: () => void
  recordAutoAnsweredQuestion: (question: QuizQuestion) => void
  getIsQuizPaused: () => boolean
  tickFreeze: (delta: number) => void
  handleCombatQuizVisibility: (shouldShowQuiz: boolean) => boolean
  grantRoundStartFreeze: () => void
  queueLifeLossReorderQuestion: () => void
  getSaveState: () => QuizSaveState
  restoreSaveState: (saveState: QuizSaveState | null | undefined) => void
  resetQuizState: () => void
}

export function useQuizManager({
  playerRef,
  postOverlay,
  syncPlayerState,
  runLaunchConfig,
  currentRound = 1,
  onQuizStreakChange,
  onCorrectAnswerCelebration,
}: UseQuizManagerParams): QuizManagerApi {
  const quizCombatSignatureRef = useRef(false)
  const askedQuizQuestionIdsRef = useRef<Set<string>>(new Set())
  const quizPauseCombatRef = useRef(false)
  const quizFreezeRemainingRef = useRef(0)
  const nextQuestionDelayRemainingRef = useRef(0)
  const quizCorrectStreakRef = useRef(0)
  const quizCorrectAnswersRef = useRef(0)
  const quizAnsweredByDifficultyRef = useRef<RunQuestionDifficultyBreakdown>(createEmptyDifficultyBreakdown())
  const quizAnsweredByTypeRef = useRef<QuestionTypeBreakdown>(createEmptyQuestionTypeBreakdown())
  const quizAutoAnsweredCountRef = useRef(0)
  const quizAutoAnsweredByDifficultyRef = useRef<RunQuestionDifficultyBreakdown>(createEmptyDifficultyBreakdown())
  const quizAutoAnsweredByTypeRef = useRef<QuestionTypeBreakdown>(createEmptyQuestionTypeBreakdown())
  const quizCorrectForNextLifeRef = useRef(0)
  const quizCorrectNeededForNextLifeRef = useRef(CORRECT_ANSWERS_FOR_FIRST_LIFE)
  const transcriptionAttemptsByProblemRef = useRef<TranscriptionAttemptProgressByProblem>({})
  const upcomingRoundQuizBuffRef = useRef<RoundQuizBuffType | null>(null)
  const quizFreezeFadeTimeoutRef = useRef<number | null>(null)
  const lastQuestionKindRef = useRef<QuizQuestionKind | null>(null)
  const priorityQuestionIdsRef = useRef<string[]>([])
  const initialGraceQuestionModeActiveRef = useRef(false)
  const pendingRoundStartFreezeRef = useRef(false)

  const [quizActive, setQuizActive] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)
  const [quizAnswerResult, setQuizAnswerResult] = useState<'correct' | 'incorrect' | null>(null)
  const [quizCorrectExplanation, setQuizCorrectExplanation] = useState<QuizCorrectExplanation | null>(null)
  const [quizCorrectRewardSummary, setQuizCorrectRewardSummary] = useState<QuizCorrectRewardSummary | null>(null)
  const [quizIncorrectExplanation, setQuizIncorrectExplanation] = useState<QuizIncorrectExplanation | null>(null)
  const [quizFreezeActive, setQuizFreezeActive] = useState(false)
  const [quizFreezeFading, setQuizFreezeFading] = useState(false)
  const [quizFreezeSecondsLeft, setQuizFreezeSecondsLeft] = useState(0)
  const [quizGraceQuestionModeActive, setQuizGraceQuestionModeActive] = useState(false)
  const [quizGraceQuestionsAnswered, setQuizGraceQuestionsAnswered] = useState(0)
  const [nextQuestionDelaySecondsLeft, setNextQuestionDelaySecondsLeft] = useState(0)
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState(0)
  const [quizTotalAnswered, setQuizTotalAnswered] = useState(0)
  const [quizAnsweredByDifficulty, setQuizAnsweredByDifficulty] = useState<RunQuestionDifficultyBreakdown>(
    createEmptyDifficultyBreakdown(),
  )
  const [quizAnsweredByType, setQuizAnsweredByType] = useState<QuestionTypeBreakdown>(
    createEmptyQuestionTypeBreakdown(),
  )
  const [quizCorrectForNextLife, setQuizCorrectForNextLife] = useState(0)
  const [quizCorrectNeededForNextLife, setQuizCorrectNeededForNextLife] = useState(CORRECT_ANSWERS_FOR_FIRST_LIFE)
  const [quizUpcomingBuffLabel, setQuizUpcomingBuffLabel] = useState<string | null>(null)
  const [priorityQuestionIds, setPriorityQuestionIds] = useState<string[]>([])
  const questionDifficultyOffset = computeQuestionSelectionDifficultyOffset(runLaunchConfig ?? {
    difficultyLevel: 0,
    startingArtifacts: {
      hardQuestions: false,
      starStoriesHardMode: false,
    },
    chaosArtifactId: null,
  })
  const runLaunchGoldMultiplier = computeQuestionGoldMultiplier(runLaunchConfig ?? {
    difficultyLevel: 0,
    startingArtifacts: {
      hardQuestions: false,
      starStoriesHardMode: false,
    },
    chaosArtifactId: null,
  })
  const fastRoundsRewardMultiplier = runLaunchConfig?.chaosArtifactId === 'fast-rounds' ? 2 : 1
  const fastRoundsProgressMultiplier = runLaunchConfig?.chaosArtifactId === 'fast-rounds' ? 2 : 1
  const roundStartFreezeMultiplier = runLaunchConfig?.chaosArtifactId === 'fast-rounds' ? 0.5 : 1
  const disableQuestionHealing =
    runLaunchConfig?.chaosArtifactId === 'no-question-heal-five-freeze-bombs' ||
    runLaunchConfig?.chaosArtifactId === 'no-question-heal-plus-vitals' ||
    runLaunchConfig?.chaosArtifactId === 'no-question-heal-damage-lifesteal'
  const activeFocusFiltersSignature = JSON.stringify(getActiveQuizFocusFilters())

  const shouldUseInitialEasyDifficultyGraceMode = useCallback((totalAnswered: number) => {
    return (
      (runLaunchConfig?.difficultyLevel ?? 0) === 0 &&
      currentRound === 1 &&
      totalAnswered < INITIAL_EASY_DIFFICULTY_GRACE_QUESTIONS
    )
  }, [currentRound, runLaunchConfig?.difficultyLevel])

  const syncInitialEasyDifficultyGraceMode = useCallback((totalAnswered: number) => {
    const normalizedAnswered = Math.max(0, Math.floor(totalAnswered))
    const previousGraceState = initialGraceQuestionModeActiveRef.current
    const shouldEnableGraceMode = shouldUseInitialEasyDifficultyGraceMode(normalizedAnswered)
    initialGraceQuestionModeActiveRef.current = shouldEnableGraceMode
    setQuizGraceQuestionModeActive(shouldEnableGraceMode)
    setQuizGraceQuestionsAnswered(
      Math.min(INITIAL_EASY_DIFFICULTY_GRACE_QUESTIONS, normalizedAnswered),
    )

    if (shouldEnableGraceMode) {
      if (quizFreezeFadeTimeoutRef.current !== null) {
        window.clearTimeout(quizFreezeFadeTimeoutRef.current)
        quizFreezeFadeTimeoutRef.current = null
      }

      setQuizFreezeActive(true)
      setQuizFreezeFading(false)
      setQuizFreezeSecondsLeft(0)
      return
    }

    if (previousGraceState && !shouldEnableGraceMode) {
      pendingRoundStartFreezeRef.current = true
    }

    if (quizFreezeRemainingRef.current <= 0) {
      setQuizFreezeActive(false)
      setQuizFreezeFading(false)
      setQuizFreezeSecondsLeft(0)
    }
  }, [shouldUseInitialEasyDifficultyGraceMode])

  const getCorrectAnswersForProgression = useCallback((correctAnswers: number) => {
    return Math.max(0, correctAnswers) * fastRoundsProgressMultiplier
  }, [fastRoundsProgressMultiplier])

  useEffect(() => {
    quizCorrectAnswersRef.current = quizCorrectAnswers
  }, [quizCorrectAnswers])

  useEffect(() => {
    quizAnsweredByDifficultyRef.current = quizAnsweredByDifficulty
  }, [quizAnsweredByDifficulty])

  useEffect(() => {
    quizAnsweredByTypeRef.current = quizAnsweredByType
  }, [quizAnsweredByType])

  useEffect(() => {
    quizCorrectForNextLifeRef.current = quizCorrectForNextLife
  }, [quizCorrectForNextLife])

  useEffect(() => {
    quizCorrectNeededForNextLifeRef.current = quizCorrectNeededForNextLife
  }, [quizCorrectNeededForNextLife])

  useEffect(() => {
    syncInitialEasyDifficultyGraceMode(quizTotalAnswered)
  }, [quizTotalAnswered, syncInitialEasyDifficultyGraceMode])

  const setPriorityQuestionQueue = useCallback((questionIds: string[]) => {
    const dedupedIds = Array.from(
      new Set(
        questionIds
          .map((questionId) => questionId.trim())
          .filter((questionId) => questionId.length > 0),
      ),
    )

    priorityQuestionIdsRef.current = dedupedIds
    setPriorityQuestionIds(dedupedIds)
  }, [])

  const enqueuePriorityQuestionId = useCallback((questionId: string, options?: { prepend?: boolean }) => {
    const normalizedId = questionId.trim()
    if (!normalizedId) {
      return
    }

    setPriorityQuestionQueue(
      options?.prepend
        ? [normalizedId, ...priorityQuestionIdsRef.current]
        : [...priorityQuestionIdsRef.current, normalizedId],
    )
  }, [setPriorityQuestionQueue])

  const dequeueNextAvailablePriorityQuestion = useCallback((): QuizQuestion | null => {
    const queueSnapshot = [...priorityQuestionIdsRef.current]
    if (queueSnapshot.length === 0) {
      return null
    }

    const micOnlyModeEnabled = getActiveQuizFocusFilters().micOnlyMode
    const remainingQuestionIds: string[] = []
    let nextPriorityQuestion: QuizQuestion | null = null

    queueSnapshot.forEach((questionId) => {
      const candidate = isLifeLossReorderQuestionId(questionId)
        ? createLifeLossReorderQuestion()
        : getQuizQuestionById(questionId)
      if (!candidate) {
        return
      }

      const isLifeLossReorderQuestion = isLifeLossReorderQuestionId(candidate.id)

      const isTranscriptionQuestion =
        candidate.kind === 'transcription' && candidate.transcriptionQuestion !== undefined

      if (micOnlyModeEnabled && !isTranscriptionQuestion && !isLifeLossReorderQuestion) {
        // In mic-only mode, keep all non-transcription priority questions stashed for later.
        remainingQuestionIds.push(candidate.id)
        return
      }

      if (askedQuizQuestionIdsRef.current.has(candidate.id)) {
        return
      }

      if (!nextPriorityQuestion && (isLifeLossReorderQuestion || isQuizQuestionAllowedByCurrentFocus(candidate))) {
        nextPriorityQuestion = candidate
        askedQuizQuestionIdsRef.current.add(candidate.id)
        return
      }

      remainingQuestionIds.push(candidate.id)
    })

    setPriorityQuestionQueue(remainingQuestionIds)
    return nextPriorityQuestion
  }, [setPriorityQuestionQueue])

  const queueLifeLossReorderQuestion = useCallback(() => {
    enqueuePriorityQuestionId(LIFE_LOSS_REORDER_QUESTION_ID, { prepend: true })
  }, [enqueuePriorityQuestionId])

  const handleAdvanceQuizQuestion = useCallback((correctAnswers: number) => {
    const queuedPriorityQuestion = dequeueNextAvailablePriorityQuestion()
    if (queuedPriorityQuestion) {
      const nextRoundBuff = rollRoundQuizBuffType()
      upcomingRoundQuizBuffRef.current = nextRoundBuff
      setQuizUpcomingBuffLabel(
        formatRoundBuffRewardLabel(nextRoundBuff, getRoundBuffRewardMultiplier(queuedPriorityQuestion)),
      )

      const randomizedQuestion = randomizeQuestionForDisplay(queuedPriorityQuestion)
      setQuizQuestion(randomizedQuestion)
      setQuizAnswerResult(null)
      setQuizCorrectExplanation(null)
      setQuizCorrectRewardSummary(null)
      setQuizIncorrectExplanation(null)
      lastQuestionKindRef.current = randomizedQuestion.kind ?? 'multipleChoice'
      return randomizedQuestion
    }

    const excludeKind: QuizQuestionKind | undefined =
      lastQuestionKindRef.current === 'systemDesign' || lastQuestionKindRef.current === 'multiSectionSystemDesign'
        ? lastQuestionKindRef.current
        : undefined
    const effectiveCorrectAnswers = Math.max(
      0,
      getCorrectAnswersForProgression(correctAnswers) + questionDifficultyOffset,
    )
    const nextQuestionWithTranscription = getNextQuizQuestion(
      effectiveCorrectAnswers,
      askedQuizQuestionIdsRef.current,
      excludeKind,
      transcriptionAttemptsByProblemRef.current,
      playerRef.current?.getRawCodingQuestionFrequencyMultiplier() ?? 1,
    )
    if (!nextQuestionWithTranscription) {
      setQuizQuestion(null)
      setQuizAnswerResult(null)
      setQuizCorrectExplanation(null)
      setQuizCorrectRewardSummary(null)
      setQuizIncorrectExplanation(null)
      return null
    }

    const nextRoundBuff = rollRoundQuizBuffType()
    upcomingRoundQuizBuffRef.current = nextRoundBuff
    setQuizUpcomingBuffLabel(formatRoundBuffRewardLabel(nextRoundBuff, getRoundBuffRewardMultiplier(nextQuestionWithTranscription)))

    const randomizedQuestion = randomizeQuestionForDisplay(nextQuestionWithTranscription)
    setQuizQuestion(randomizedQuestion)
    setQuizAnswerResult(null)
    setQuizCorrectExplanation(null)
    setQuizCorrectRewardSummary(null)
    setQuizIncorrectExplanation(null)
    lastQuestionKindRef.current = randomizedQuestion.kind ?? 'multipleChoice'
    return randomizedQuestion
  }, [dequeueNextAvailablePriorityQuestion, getCorrectAnswersForProgression, questionDifficultyOffset])

  const effectiveCorrectAnswersForDebug = Math.max(
    0,
    getCorrectAnswersForProgression(quizCorrectAnswers) + questionDifficultyOffset,
  )
  const quizSelectionDebugSnapshot = getQuizSelectionDebugSnapshot(
    effectiveCorrectAnswersForDebug,
    askedQuizQuestionIdsRef.current,
    playerRef.current?.getRawCodingQuestionFrequencyMultiplier() ?? 1,
  )

  useEffect(() => {
    if (!quizQuestion) {
      return
    }

    if (isQuizQuestionAllowedByCurrentFocus(quizQuestion)) {
      return
    }

    enqueuePriorityQuestionId(quizQuestion.id, { prepend: true })
    setQuizQuestion(null)
    setQuizAnswerResult(null)
    setQuizCorrectExplanation(null)
    setQuizCorrectRewardSummary(null)
    setQuizIncorrectExplanation(null)

    if (!quizCombatSignatureRef.current) {
      return
    }

    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswersRef.current)
    if (!nextQuestion) {
      setQuizActive(false)
    }
  }, [
    activeFocusFiltersSignature,
    enqueuePriorityQuestionId,
    handleAdvanceQuizQuestion,
    quizQuestion,
  ])

  const setFreezeRemaining = useCallback((remainingSeconds: number) => {
    const clampedRemaining = Math.max(0, remainingSeconds)

    quizFreezeRemainingRef.current = clampedRemaining
    setQuizFreezeSecondsLeft(Math.ceil(clampedRemaining))

    if (clampedRemaining <= 0) {
      if (quizFreezeFadeTimeoutRef.current === null) {
        setQuizFreezeFading(true)
        quizFreezeFadeTimeoutRef.current = window.setTimeout(() => {
          setQuizFreezeActive(false)
          setQuizFreezeFading(false)
          setQuizFreezeSecondsLeft(0)
          quizFreezeFadeTimeoutRef.current = null
        }, 520)
      }
      return
    }

    if (quizFreezeFadeTimeoutRef.current !== null) {
      window.clearTimeout(quizFreezeFadeTimeoutRef.current)
      quizFreezeFadeTimeoutRef.current = null
    }

    if (initialGraceQuestionModeActiveRef.current) {
      setQuizFreezeActive(true)
      setQuizFreezeFading(false)
      setQuizFreezeSecondsLeft(0)
      return
    }

    setQuizFreezeActive(true)
    setQuizFreezeFading(false)
  }, [])

  const startRoundFreeze = useCallback(() => {
    const quizFreezeBonusSeconds = playerRef.current?.getArtifactStats().quizFreezeDurationSeconds ?? 0
    setFreezeRemaining((ROUND_FREEZE_SECONDS + quizFreezeBonusSeconds) * roundStartFreezeMultiplier)
  }, [playerRef, roundStartFreezeMultiplier, setFreezeRemaining])

  const setNextQuestionDelayRemaining = useCallback((remainingSeconds: number) => {
    const clampedRemaining = Math.max(0, remainingSeconds)
    nextQuestionDelayRemainingRef.current = clampedRemaining
    setNextQuestionDelaySecondsLeft(Math.ceil(clampedRemaining))
  }, [])

  const grantRoundStartFreeze = useCallback(() => {
    pendingRoundStartFreezeRef.current = true
    const quizFreezeBonusSeconds = playerRef.current?.getArtifactStats().quizFreezeDurationSeconds ?? 0
    const roundStartFreeze = (ROUND_FREEZE_SECONDS + quizFreezeBonusSeconds) * roundStartFreezeMultiplier
    setFreezeRemaining(Math.max(quizFreezeRemainingRef.current, roundStartFreeze))
    setNextQuestionDelayRemaining(0)
  }, [playerRef, roundStartFreezeMultiplier, setFreezeRemaining, setNextQuestionDelayRemaining])

  const maybeApplyFreezeForDisplayedQuestion = useCallback(() => {
    if (quizAnswerResult !== null || quizQuestion === null) {
      return
    }

    if (initialGraceQuestionModeActiveRef.current) {
      syncInitialEasyDifficultyGraceMode(quizTotalAnswered)
      setNextQuestionDelayRemaining(0)
      return
    }

    if (
      pendingRoundStartFreezeRef.current &&
      quizFreezeRemainingRef.current <= 0 &&
      nextQuestionDelayRemainingRef.current <= 0
    ) {
      pendingRoundStartFreezeRef.current = false
      startRoundFreeze()
    }
  }, [
    quizAnswerResult,
    quizQuestion,
    quizTotalAnswered,
    setNextQuestionDelayRemaining,
    startRoundFreeze,
    syncInitialEasyDifficultyGraceMode,
  ])

  const applyIncorrectAnswerTimeout = useCallback(() => {
    if (initialGraceQuestionModeActiveRef.current) {
      setNextQuestionDelayRemaining(0)
      return 0
    }

    const freezeBankSeconds = Math.max(0, quizFreezeRemainingRef.current)
    const timeoutSeconds = Math.max(0, NEXT_QUESTION_TIMEOUT_SECONDS - freezeBankSeconds)
    setFreezeRemaining(0)
    setNextQuestionDelayRemaining(timeoutSeconds)
    return timeoutSeconds
  }, [setFreezeRemaining, setNextQuestionDelayRemaining])

  const consumeSkip = useCallback((player: Player): boolean => {
    if (player.getSkips() <= 0) {
      postOverlay({
        title: 'No Skips Remaining',
        message: 'Earn more lives to gain additional skips.',
        durationMs: 2200,
      })
      return false
    }

    if (!player.spendSkip(1)) {
      postOverlay({
        title: 'No Skips Remaining',
        message: 'Earn more lives to gain additional skips.',
        durationMs: 2200,
      })
      return false
    }

    return true
  }, [postOverlay])

  const applyCorrectAnswerBonuses = useCallback((player: Player, question: QuizQuestion) => {
    const questionBonusGoldMultiplier = getBaseRewardMultiplier(question)
    const difficultyGoldMultiplier = getCorrectAnswerGoldMultiplier(question)
    const quizArtifactMultiplier = player.getGlobalGoldMultiplierForQuestionAnswer(question.kind)
    const starStoryGoldMultiplier = getStarStoryGoldMultiplier(question, runLaunchConfig)
    const runWideGoldMultiplier = getRunWideGoldMultiplier(runLaunchConfig)
    const anyGainGoldMultiplier = player.getGlobalGoldMultiplierForAnyGain()
    const goldMultiplier =
      difficultyGoldMultiplier * questionBonusGoldMultiplier * quizArtifactMultiplier * runLaunchGoldMultiplier * starStoryGoldMultiplier
    const healingMultiplier = getCorrectAnswerHealingMultiplier(question)
    const questionAnswerHealingMultiplier = player.getQuestionAnswerHealingMultiplier()
    const difficultyScoreMultiplier = getQuestionDifficultyScoreMultiplier(question)
    const scoreBonus = SCORE_PER_CORRECT_ANSWER_BASE * difficultyScoreMultiplier
    const questionGoldReward = player.addGold(GOLD_PER_CORRECT_ANSWER * goldMultiplier, {
      artifactMultiplierApplied: true,
    })

    player.addQuizScoreBonus(scoreBonus)
    player.addFlatMaxHealth(MAX_HEALTH_PER_CORRECT_ANSWER * questionBonusGoldMultiplier * fastRoundsRewardMultiplier)
    player.addFlatMaxShield(MAX_SHIELD_PER_CORRECT_ANSWER * questionBonusGoldMultiplier * fastRoundsRewardMultiplier)
    const questionHealingDisabledByArtifacts = player.isQuestionHealingDisabledByArtifacts()
    if (!disableQuestionHealing && !questionHealingDisabledByArtifacts) {
      player.healHealthPercent(
        HEALTH_HEAL_PERCENT_PER_CORRECT_ANSWER *
          healingMultiplier *
          questionAnswerHealingMultiplier *
          fastRoundsRewardMultiplier,
      )
      player.healShieldPercent(
        SHIELD_HEAL_PERCENT_PER_CORRECT_ANSWER *
          healingMultiplier *
          questionAnswerHealingMultiplier *
          fastRoundsRewardMultiplier,
      )
    }

    const streakBaseGoldReward = player.getStreakGoldBonusForStreak(quizCorrectStreakRef.current)
    const streakGoldReward = streakBaseGoldReward > 0 ? player.addGold(streakBaseGoldReward) : 0
    const totalGoldReward = questionGoldReward + streakGoldReward

    player.triggerCorrectAnswerArtifactEffects(question.kind)

    return {
      goldMultiplier,
      difficultyGoldMultiplier,
      questionBonusGoldMultiplier,
      artifactGoldMultiplier: quizArtifactMultiplier,
      runLaunchGoldMultiplier,
      runWideGoldMultiplier,
      anyGainGoldMultiplier,
      healingMultiplier: healingMultiplier * questionAnswerHealingMultiplier,
      questionGoldReward,
      streakBaseGoldReward,
      streakGoldReward,
      goldReward: totalGoldReward,
      scoreBonus,
      starStoryGoldMultiplier,
    }
  }, [
    disableQuestionHealing,
    fastRoundsRewardMultiplier,
    runLaunchGoldMultiplier,
    runLaunchConfig,
    setFreezeRemaining,
  ])

  const applyCorrectAnswerRoundBuffReward = useCallback((player: Player, question: QuizQuestion) => {
    const buffType = upcomingRoundQuizBuffRef.current ?? rollRoundQuizBuffType()
    const rawCodeBuffMultiplier = question.kind === 'rawCoding'
      ? Math.max(1, Math.floor(player.getRawCodeBuffRewardMultiplier()))
      : 1
    const rewardMultiplier = getRoundBuffRewardMultiplier(question) * rawCodeBuffMultiplier * fastRoundsRewardMultiplier

    if (player.shouldReplaceQuestionBuffsWithGold()) {
      const replacementGold = player.getReplacementGoldPerQuestionBuff() * rewardMultiplier
      let creditedReplacementGold = 0
      if (replacementGold > 0) {
        creditedReplacementGold = player.addGold(replacementGold)
      }

      return {
        buffType,
        rewardMultiplier,
        rewardLabel: `+${Math.round(creditedReplacementGold)} gold instead of question buffs`,
      }
    }

    for (let stackIndex = 0; stackIndex < rewardMultiplier; stackIndex += 1) {
      player.applyRoundQuizBuff(buffType)
    }

    return {
      buffType,
      rewardMultiplier,
      rewardLabel: formatRoundBuffRewardLabel(buffType, rewardMultiplier),
    }
  }, [fastRoundsRewardMultiplier])

  const buildCorrectRewardSummary = useCallback((
    player: Player,
    question: QuizQuestion,
    quizRewards: {
      goldMultiplier: number
      healingMultiplier: number
      goldReward: number
      questionGoldReward: number
      streakGoldReward: number
      streakBaseGoldReward: number
      scoreBonus: number
      difficultyGoldMultiplier: number
      questionBonusGoldMultiplier: number
      artifactGoldMultiplier: number
      runLaunchGoldMultiplier: number
      starStoryGoldMultiplier: number
      runWideGoldMultiplier: number
      anyGainGoldMultiplier: number
    },
    roundBuffReward: {
      buffType: RoundQuizBuffType
      rewardMultiplier: number
      rewardLabel: string
    },
  ): QuizCorrectRewardSummary => {
    const goldArtifactEffects: QuizGoldArtifactEffect[] = player
      .getGoldArtifactEffectsForQuestionAnswer(question.kind)
      .map((effect) => ({
        artifactId: effect.artifactId,
        artifactName: effect.artifactName,
        appliedToThisReward: true,
        details: `Applied x${effect.multiplier.toFixed(2)} gold multiplier.`,
      }))

    return {
      goldReward: quizRewards.goldReward,
      questionGoldReward: quizRewards.questionGoldReward,
      streakGoldReward: quizRewards.streakGoldReward,
      streakBaseGoldReward: quizRewards.streakBaseGoldReward,
      baseGoldReward: GOLD_PER_CORRECT_ANSWER,
      goldMultiplier: quizRewards.goldMultiplier,
      difficultyGoldMultiplier: quizRewards.difficultyGoldMultiplier,
      questionBonusGoldMultiplier: quizRewards.questionBonusGoldMultiplier,
      artifactGoldMultiplier: quizRewards.artifactGoldMultiplier,
      runLaunchGoldMultiplier: quizRewards.runLaunchGoldMultiplier,
      starStoryGoldMultiplier: quizRewards.starStoryGoldMultiplier,
      runWideGoldMultiplier: quizRewards.runWideGoldMultiplier,
      anyGainGoldMultiplier: quizRewards.anyGainGoldMultiplier,
      goldArtifactEffects,
      roundBuffType: roundBuffReward.buffType,
      roundBuffStacks: roundBuffReward.rewardMultiplier,
      roundBuffLabel: roundBuffReward.rewardLabel,
    }
  }, [])

  const applyLifeProgressForCorrectAnswer = useCallback((player: Player) => {
    let nextProgress = quizCorrectForNextLifeRef.current + fastRoundsProgressMultiplier
    let nextNeeded = quizCorrectNeededForNextLifeRef.current
    let livesAwarded = 0

    while (nextProgress >= nextNeeded) {
      nextProgress -= nextNeeded
      nextNeeded += CORRECT_ANSWERS_LIFE_INCREMENT
      player.addLife(1)
      livesAwarded += 1
    }

    if (livesAwarded > 0) {
      postOverlay({
        title: 'Extra Life Gained',
        message:
          `You earned +${livesAwarded} ${livesAwarded === 1 ? 'life' : 'lives'} and +${livesAwarded} ` +
          `${livesAwarded === 1 ? 'skip' : 'skips'}. Next life in ${nextNeeded} correct answers.`,
        durationMs: 2200,
      })
    }

    quizCorrectForNextLifeRef.current = nextProgress
    quizCorrectNeededForNextLifeRef.current = nextNeeded
    setQuizCorrectForNextLife(nextProgress)
    setQuizCorrectNeededForNextLife(nextNeeded)
  }, [fastRoundsProgressMultiplier, postOverlay])

  const incrementAnsweredDifficulty = useCallback((question: QuizQuestion) => {
    setQuizAnsweredByDifficulty((previous) => {
      const next = {
        ...previous,
        [question.difficulty]: previous[question.difficulty] + 1,
      }
      quizAnsweredByDifficultyRef.current = next
      return next
    })
  }, [])

  const incrementAnsweredType = useCallback((question: QuizQuestion) => {
    const questionType = getQuestionTypeForTracking(question)
    const incrementAmount =
      fastRoundsProgressMultiplier > 1 && (questionType === 'starStories' || questionType === 'starVoice')
        ? fastRoundsProgressMultiplier
        : 1

    setQuizAnsweredByType((previous) => {
      const next = {
        ...previous,
        [questionType]: previous[questionType] + incrementAmount,
      }
      quizAnsweredByTypeRef.current = next
      return next
    })
  }, [fastRoundsProgressMultiplier])

  const recordAutoAnsweredQuestion = useCallback((question: QuizQuestion) => {
    const questionType = getQuestionTypeForTracking(question)

    quizAutoAnsweredCountRef.current += 1
    quizAutoAnsweredByDifficultyRef.current = {
      ...quizAutoAnsweredByDifficultyRef.current,
      [question.difficulty]: quizAutoAnsweredByDifficultyRef.current[question.difficulty] + 1,
    }
    quizAutoAnsweredByTypeRef.current = {
      ...quizAutoAnsweredByTypeRef.current,
      [questionType]: quizAutoAnsweredByTypeRef.current[questionType] + 1,
    }
  }, [])

  const incrementTranscriptionAttempt = useCallback((question: QuizQuestion) => {
    if (!isTranscriptionQuestion(question) || !question.transcriptionQuestion) {
      return
    }

    const { problemId } = question.transcriptionQuestion
    const difficulty = question.difficulty === 'easy' || question.difficulty === 'medium' ? question.difficulty : 'hard'
    const existing = transcriptionAttemptsByProblemRef.current[problemId] ?? {
      easy: 0,
      medium: 0,
      hard: 0,
    }

    transcriptionAttemptsByProblemRef.current = {
      ...transcriptionAttemptsByProblemRef.current,
      [problemId]: {
        ...existing,
        [difficulty]: existing[difficulty] + fastRoundsProgressMultiplier,
      },
    }
  }, [fastRoundsProgressMultiplier])

  const handleResumeAfterCorrectQuizAnswer = useCallback(() => {
    quizPauseCombatRef.current = false
    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
    }
  }, [handleAdvanceQuizQuestion, quizCorrectAnswers])

  const handleResumeAfterIncorrectQuizAnswer = useCallback(() => {
    quizPauseCombatRef.current = false
    setQuizAnswerResult(null)
    setQuizCorrectRewardSummary(null)
    if (nextQuestionDelayRemainingRef.current > 0) {
      setQuizQuestion(null)
      return
    }

    setQuizIncorrectExplanation(null)

    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
    }
  }, [handleAdvanceQuizQuestion, quizCorrectAnswers])

  const handleQuizAnswer = useCallback(
    (selectedIndex: number, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive) {
        return
      }

      const isSkipSelection = options?.isSkip === true
      if (isSkipSelection && !consumeSkip(player)) {
        syncPlayerState(player)
        return
      }

      const shouldTrackStats = options?.skipStats !== true

      const isCorrect = !isSkipSelection && selectedIndex === quizQuestion.correctIndex
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()
        const explanation = getCorrectQuizExplanation(quizQuestion, selectedIndex)

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(explanation)
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }

        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        if (!isSkipSelection) {
          player.applyIncorrectAnswerArtifactConsequences()
        }
        const skippedQuestion = isSkipSelection
        const timeoutSeconds = skippedQuestion ? 0 : applyIncorrectAnswerTimeout()
        const explanation = getIncorrectQuizExplanation(quizQuestion, selectedIndex)
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)
        setQuizIncorrectExplanation(explanation)

        const incorrectSummary = skippedQuestion
          ? '1 skip spent. No health, shield, gold, or time penalty applied. '
          : `${Math.max(0, NORMAL_QUESTION_INCORRECT_FREEZE_PENALTY_SECONDS - timeoutSeconds)}s of freeze bank consumed. `

        postOverlay({
          title: 'Quiz Incorrect',
          message:
            incorrectSummary +
            `${timeoutSeconds > 0 ? `Next question available in ${timeoutSeconds}s. ` : 'Next question is available immediately. '}` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      onCorrectAnswerCelebration,
      applyLifeProgressForCorrectAnswer,
      onQuizStreakChange,
      postOverlay,
      playerRef,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      consumeSkip,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      syncPlayerState,
    ],
  )

  const handleValidListAnswer = useCallback(
    (selectedIndices: number[], options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive || !isValidListQuestion(quizQuestion)) {
        return
      }

      const validList = quizQuestion.validList
      if (!validList) {
        return
      }

      const expectedIndices = [...new Set(validList.validIndices)].sort((a, b) => a - b)
      const selectedNormalized = [...new Set(selectedIndices)]
        .filter((index) => Number.isInteger(index) && index >= 0 && index < validList.items.length)
        .sort((a, b) => a - b)

      const isCorrect =
        selectedNormalized.length === expectedIndices.length &&
        selectedNormalized.every((index, position) => index === expectedIndices[position])
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()
        const explanation = getCorrectQuizExplanation(quizQuestion, quizQuestion.correctIndex)

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(explanation)
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }
        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        player.applyIncorrectAnswerArtifactConsequences()
        const timeoutSeconds = applyIncorrectAnswerTimeout()
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)

        const selectedLabels = selectedNormalized
          .map((index) => validList.items[index])
          .filter((item): item is string => typeof item === 'string')
        const expectedLabels = expectedIndices
          .map((index) => validList.items[index])
          .filter((item): item is string => typeof item === 'string')

        setQuizIncorrectExplanation({
          selectedOption: selectedLabels.length > 0 ? selectedLabels.join(', ') : 'No items selected',
          selectedReason: 'Your selection did not match the full valid subset required by this question.',
          correctOption: expectedLabels.join(', '),
          correctReason:
            quizQuestion.correctExplanation ??
            'The correct answer is the exact valid subset, not a partial overlap.',
        })

        postOverlay({
          title: 'Quiz Incorrect',
          message:
            `Next question available in ${timeoutSeconds}s. ` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyLifeProgressForCorrectAnswer,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      syncPlayerState,
    ],
  )

  const handleOrderItemsAnswer = useCallback(
    (orderedIndices: number[], options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive || !isOrderItemsQuestion(quizQuestion)) {
        return
      }

      const orderItems = quizQuestion.orderItems
      if (!orderItems) {
        return
      }

      const expectedOrder = orderItems.correctOrder
      const acceptedOrders = getAcceptedOrderItemsOrdersForQuestion(quizQuestion)
      const selectedOrder = [...orderedIndices].filter(
        (index) => Number.isInteger(index) && index >= 0 && index < orderItems.items.length,
      )

      const isSkipSelection = options?.isSkip === true
      if (isSkipSelection && !consumeSkip(player)) {
        syncPlayerState(player)
        return
      }

      const isCorrect =
        !isSkipSelection && acceptedOrders.some((candidateOrder) => isSameOrder(selectedOrder, candidateOrder))
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()
        const explanation = getCorrectQuizExplanation(quizQuestion, quizQuestion.correctIndex)

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(explanation)
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }

        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        player.applyIncorrectAnswerArtifactConsequences()
        const skippedOrderQuestion = isSkipSelection
        const timeoutSeconds = skippedOrderQuestion ? 0 : applyIncorrectAnswerTimeout()
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)

        const selectedLabels = selectedOrder
          .map((index) => orderItems.items[index])
          .filter((item): item is string => typeof item === 'string')
        const expectedLabels = expectedOrder
          .map((index) => orderItems.items[index])
          .filter((item): item is string => typeof item === 'string')
        const hasMultipleAcceptedOrders = acceptedOrders.length > 1

        setQuizIncorrectExplanation({
          selectedOption: selectedLabels.join(' -> '),
          selectedReason: hasMultipleAcceptedOrders
            ? 'Your submission must match one of the accepted complete orderings.'
            : 'Your submitted order does not match the expected sequence from first to last.',
          correctOption: hasMultipleAcceptedOrders
            ? expectedLabels.join(' | ')
            : expectedLabels.join(' -> '),
          correctReason:
            hasMultipleAcceptedOrders
              ? (quizQuestion.correctExplanation ??
                'Multiple full orders are accepted. Preserve each required in-story sequence while arranging story blocks.')
              : (quizQuestion.correctExplanation ??
                'The correct answer is the exact ordered sequence, not just the same items in a different arrangement.'),
        })

        postOverlay({
          title: 'Quiz Incorrect',
          message:
            `${skippedOrderQuestion
              ? '1 skip spent. No health, shield, gold, or time penalty applied. '
              : ''}` +
            `${timeoutSeconds > 0 ? `Next question available in ${timeoutSeconds}s. ` : 'Next question is available immediately. '}` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyLifeProgressForCorrectAnswer,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      consumeSkip,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      syncPlayerState,
    ],
  )

  const handleCapacityAnswer = useCallback(
    (estimateValue: number, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive || !isCapacityQuestion(quizQuestion)) {
        return
      }

      const outcome = computeCapacityAnswerOutcome({
        quizQuestion,
        estimateValue,
        quizCorrectAnswers,
      })
      if (!outcome) {
        return
      }

      const isCorrect = outcome.isCorrect
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(outcome.correctExplanation)
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }
        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        player.applyIncorrectAnswerArtifactConsequences()
        const timeoutSeconds = applyIncorrectAnswerTimeout()
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)

        setQuizIncorrectExplanation({
          ...outcome.incorrectExplanation,
        })

        postOverlay({
          title: 'Quiz Incorrect',
          message:
            `Next question available in ${timeoutSeconds}s. ` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyLifeProgressForCorrectAnswer,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      syncPlayerState,
    ],
  )

  const handleTranscriptionAnswer = useCallback(
    (transcript: string, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive || !isTranscriptionQuestion(quizQuestion)) {
        return
      }

      const outcome = computeTranscriptionAnswerOutcome({
        quizQuestion,
        transcript,
        quizCorrectAnswers,
      })

      if (!outcome) {
        return
      }

      incrementTranscriptionAttempt(quizQuestion)

      const isCorrect = outcome.isCorrect
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(outcome.correctExplanation)
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }
        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        player.applyIncorrectAnswerArtifactConsequences()
        const timeoutSeconds = applyIncorrectAnswerTimeout()
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)

        setQuizIncorrectExplanation({
          ...outcome.incorrectExplanation,
        })

        postOverlay({
          title: 'Quiz Incorrect',
          message:
            `Next question available in ${timeoutSeconds}s. ` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyLifeProgressForCorrectAnswer,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      incrementTranscriptionAttempt,
      syncPlayerState,
    ],
  )

  const handleSystemDesignAnswer = useCallback(
    (score: number, options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (!player || !quizQuestion || quizAnswerResult !== null || !quizActive || quizQuestion.kind !== 'systemDesign') {
        return
      }

      const isSkipSelection = options?.isSkip === true
      if (isSkipSelection && !consumeSkip(player)) {
        syncPlayerState(player)
        return
      }

      if (isSkipSelection) {
        setQuizTotalAnswered((previous) => previous + 1)
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        quizPauseCombatRef.current = true
        setQuizIncorrectExplanation({
          selectedOption: 'Skipped problem',
          selectedReason: 'You used a skip to move past this system design question.',
          correctOption: 'N/A',
          correctReason: quizQuestion.correctExplanation ?? 'Use the rubric feedback to improve your next design.',
        })
        setQuizCorrectRewardSummary(null)
        setQuizAnswerResult('incorrect')
        postOverlay({
          title: 'System Design Skipped',
          message: '1 skip spent. No health, shield, gold, or time penalty applied. Next question is available immediately.',
          durationMs: 2200,
        })
        syncPlayerState(player)
        return
      }

      const grade: 'A' | 'B' | 'C' | 'D' | 'F' =
        score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F'
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        incrementAnsweredDifficulty(quizQuestion)
        incrementAnsweredType(quizQuestion)
        setQuizTotalAnswered((previous) => previous + 1)
      }
      quizCorrectStreakRef.current += 1
      onQuizStreakChange?.(quizCorrectStreakRef.current)
      onCorrectAnswerCelebration?.()

      if (shouldTrackStats) {
        setQuizCorrectAnswers((previous) => previous + 1)
      }
      setQuizCorrectExplanation({
        selectedOption: `Grade ${grade} — ${score}/100`,
        detailedExplanation:
          `Your system design scored ${score}/100 (Grade ${grade}). ` +
          (quizQuestion.correctExplanation ?? 'Review the rubric breakdown for areas to improve.'),
      })
      setQuizIncorrectExplanation(null)

      const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
      applyLifeProgressForCorrectAnswer(player)
      const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
      if (options?.skipRewardDialog === true) {
        setQuizCorrectExplanation(null)
        setQuizIncorrectExplanation(null)
        setQuizCorrectRewardSummary(null)
        setQuizAnswerResult('correct')
        syncPlayerState(player)
        const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
        if (!nextQuestion) {
          setQuizActive(false)
        }
        return
      }
      setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))
      quizPauseCombatRef.current = true

      postOverlay({
        title: `System Design: Grade ${grade}`,
        message:
          `+${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round.`,
        durationMs: 2800,
      })

      setQuizAnswerResult('correct')
      syncPlayerState(player)

      if (nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers && quizQuestion.difficulty !== 'hard') {
        postOverlay({ title: 'Difficulty Increased', message: 'You are now entering hard system design questions.', durationMs: 2400 })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyLifeProgressForCorrectAnswer,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      applyIncorrectAnswerTimeout,
      consumeSkip,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      syncPlayerState,
    ],
  )

  const handleMultiSectionSystemDesignAnswer = useCallback(
    (selectedIndices: number[], options?: { isSkip?: boolean; skipStats?: boolean; skipRewardDialog?: boolean }) => {
      const player = playerRef.current
      if (
        !player ||
        !quizQuestion ||
        quizAnswerResult !== null ||
        !quizActive ||
        quizQuestion.kind !== 'multiSectionSystemDesign'
      ) {
        return
      }

      const scenario = quizQuestion.multiSectionSystemDesign
      if (!scenario) {
        return
      }

      const isSkipSelection = options?.isSkip === true
      if (isSkipSelection && !consumeSkip(player)) {
        syncPlayerState(player)
        return
      }

      const expectedOrder = scenario.sections.map((section) => section.correctIndex)
      const normalizedSelection = scenario.sections.map((section, index) => {
        const selectedIndex = selectedIndices[index]
        return Number.isInteger(selectedIndex) && selectedIndex >= 0 && selectedIndex < section.options.length
          ? selectedIndex
          : -1
      })
      const isCorrect =
        !isSkipSelection &&
        normalizedSelection.length === expectedOrder.length &&
        normalizedSelection.every((index, position) => index === expectedOrder[position])
      const shouldTrackStats = options?.skipStats !== true
      const nextCorrectAnswers = getCorrectAnswersForProgression(
        quizCorrectAnswers + (isCorrect && shouldTrackStats ? 1 : 0),
      )

      if (shouldTrackStats) {
        setQuizTotalAnswered((previous) => previous + 1)
      }

      if (isCorrect) {
        if (shouldTrackStats) {
          incrementAnsweredDifficulty(quizQuestion)
          incrementAnsweredType(quizQuestion)
        }
        quizCorrectStreakRef.current += 1
        onQuizStreakChange?.(quizCorrectStreakRef.current)
        onCorrectAnswerCelebration?.()

        if (shouldTrackStats) {
          setQuizCorrectAnswers((previous) => previous + 1)
        }
        setQuizCorrectExplanation(
          getCorrectQuizExplanation(quizQuestion, quizQuestion.correctIndex),
        )
        setQuizIncorrectExplanation(null)

        const quizRewards = applyCorrectAnswerBonuses(player, quizQuestion)
        applyLifeProgressForCorrectAnswer(player)
        const roundBuffReward = applyCorrectAnswerRoundBuffReward(player, quizQuestion)
        if (options?.skipRewardDialog === true) {
          setQuizCorrectExplanation(null)
          setQuizIncorrectExplanation(null)
          setQuizCorrectRewardSummary(null)
          setQuizAnswerResult('correct')
          syncPlayerState(player)
          const nextQuestion = handleAdvanceQuizQuestion(nextCorrectAnswers)
          if (!nextQuestion) {
            setQuizActive(false)
          }
          return
        }
        setQuizCorrectRewardSummary(buildCorrectRewardSummary(player, quizQuestion, quizRewards, roundBuffReward))
        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Multi-section Design Solved',
          message:
            `Correct: +${quizRewards.scoreBonus} score, +${Math.round(quizRewards.goldReward)}g, and ${roundBuffReward.rewardLabel} for this round. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })

        setQuizAnswerResult('correct')
        syncPlayerState(player)
      } else {
        quizCorrectStreakRef.current = 0
        onQuizStreakChange?.(0)
        const timeoutSeconds = isSkipSelection ? 0 : applyIncorrectAnswerTimeout()
        quizPauseCombatRef.current = true
        setQuizCorrectRewardSummary(null)
        setQuizIncorrectExplanation(
          getMultiSectionSystemDesignIncorrectExplanation(quizQuestion, normalizedSelection),
        )

        postOverlay({
          title: 'Multi-section Design Incorrect',
          message:
            `${isSkipSelection ? '1 skip spent. ' : ''}` +
            `${timeoutSeconds > 0 ? `Next question available in ${timeoutSeconds}s. ` : 'Next question is available immediately. '}` +
            'Game paused to show explanation.',
          durationMs: 2200,
        })

        setQuizAnswerResult('incorrect')
        syncPlayerState(player)
      }

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        postOverlay({ title: 'Difficulty Increased', message: 'You are now entering hard system design questions.', durationMs: 2400 })
      }
    },
    [
      applyCorrectAnswerBonuses,
      applyCorrectAnswerRoundBuffReward,
      applyIncorrectAnswerTimeout,
      applyLifeProgressForCorrectAnswer,
      consumeSkip,
      incrementAnsweredDifficulty,
      incrementAnsweredType,
      onCorrectAnswerCelebration,
      onQuizStreakChange,
      playerRef,
      postOverlay,
      quizActive,
      quizAnswerResult,
      quizCorrectAnswers,
      quizQuestion,
      syncPlayerState,
    ],
  )

  useEffect(() => {
    if (!quizActive) {
      return
    }

    if (quizQuestion !== null || quizAnswerResult !== null || nextQuestionDelaySecondsLeft > 0) {
      return
    }

    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
    }
  }, [handleAdvanceQuizQuestion, nextQuestionDelaySecondsLeft, quizActive, quizAnswerResult, quizCorrectAnswers, quizQuestion])

  useEffect(() => {
    if (!quizActive || quizQuestion === null || quizAnswerResult !== null) {
      return
    }

    maybeApplyFreezeForDisplayedQuestion()
  }, [maybeApplyFreezeForDisplayedQuestion, quizActive, quizAnswerResult, quizQuestion])

  const tickFreeze = useCallback((delta: number) => {
    if (quizFreezeRemainingRef.current <= 0) {
      if (nextQuestionDelayRemainingRef.current <= 0) {
        return
      }
    }

    if (quizFreezeRemainingRef.current > 0) {
      setFreezeRemaining(quizFreezeRemainingRef.current - delta)
    }

    if (nextQuestionDelayRemainingRef.current > 0) {
      setNextQuestionDelayRemaining(nextQuestionDelayRemainingRef.current - delta)
    }
  }, [setFreezeRemaining, setNextQuestionDelayRemaining])

  const getIsQuizPaused = useCallback(() => {
    return quizCombatSignatureRef.current && (
      quizPauseCombatRef.current ||
      quizFreezeRemainingRef.current > 0 ||
      initialGraceQuestionModeActiveRef.current
    )
  }, [])

  const handleCombatQuizVisibility = useCallback(
    (shouldShowQuiz: boolean) => {
      if (shouldShowQuiz === quizCombatSignatureRef.current) {
        return true
      }

      quizCombatSignatureRef.current = shouldShowQuiz
      if (shouldShowQuiz) {
        pendingRoundStartFreezeRef.current = true
        const hasInProgressQuestion = quizQuestion !== null && quizAnswerResult === null

        if (!hasInProgressQuestion) {
          const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswersRef.current)
          if (!nextQuestion) {
            setQuizActive(false)
            return false
          }
        }

        maybeApplyFreezeForDisplayedQuestion()
      } else {
        quizPauseCombatRef.current = false
        pendingRoundStartFreezeRef.current = false
        setFreezeRemaining(0)
      }

      setQuizActive(shouldShowQuiz)
      return true
    },
    [handleAdvanceQuizQuestion, maybeApplyFreezeForDisplayedQuestion, quizAnswerResult, quizQuestion, setFreezeRemaining],
  )

  const resetQuizState = useCallback(() => {
    quizCombatSignatureRef.current = false
    askedQuizQuestionIdsRef.current.clear()
    quizPauseCombatRef.current = false
    quizFreezeRemainingRef.current = 0
    nextQuestionDelayRemainingRef.current = 0
    quizCorrectStreakRef.current = 0
    initialGraceQuestionModeActiveRef.current = false
    pendingRoundStartFreezeRef.current = false
    onQuizStreakChange?.(0)

    if (quizFreezeFadeTimeoutRef.current !== null) {
      window.clearTimeout(quizFreezeFadeTimeoutRef.current)
      quizFreezeFadeTimeoutRef.current = null
    }

    setQuizActive(false)
    setQuizQuestion(null)
    setQuizAnswerResult(null)
    setQuizCorrectExplanation(null)
    setQuizCorrectRewardSummary(null)
    setQuizIncorrectExplanation(null)
    setQuizFreezeActive(false)
    setQuizFreezeFading(false)
    setQuizFreezeSecondsLeft(0)
    setQuizGraceQuestionModeActive(false)
    setQuizGraceQuestionsAnswered(0)
    setNextQuestionDelaySecondsLeft(0)
    setQuizCorrectAnswers(0)
    setQuizTotalAnswered(0)
    setQuizAnsweredByDifficulty(createEmptyDifficultyBreakdown())
    setQuizAnsweredByType(createEmptyQuestionTypeBreakdown())
    quizAutoAnsweredCountRef.current = 0
    quizAutoAnsweredByDifficultyRef.current = createEmptyDifficultyBreakdown()
    quizAutoAnsweredByTypeRef.current = createEmptyQuestionTypeBreakdown()
    setQuizCorrectForNextLife(0)
    setQuizCorrectNeededForNextLife(CORRECT_ANSWERS_FOR_FIRST_LIFE)
    setQuizUpcomingBuffLabel(null)
    setPriorityQuestionQueue([])
    upcomingRoundQuizBuffRef.current = null
    quizCorrectForNextLifeRef.current = 0
    quizCorrectNeededForNextLifeRef.current = CORRECT_ANSWERS_FOR_FIRST_LIFE
    quizAnsweredByDifficultyRef.current = createEmptyDifficultyBreakdown()
    quizAnsweredByTypeRef.current = createEmptyQuestionTypeBreakdown()
    transcriptionAttemptsByProblemRef.current = {}
    resetRawCodingRotationState()
    resetTranscriptionRotationState()
  }, [onQuizStreakChange, setPriorityQuestionQueue])

  const getSaveState = useCallback((): QuizSaveState => {
    const questionsUntilNextExtraLife = Math.max(
      0,
      quizCorrectNeededForNextLifeRef.current - quizCorrectForNextLifeRef.current,
    )

    return {
      freezeSecondsRemaining: quizFreezeRemainingRef.current,
      nextQuestionDelaySecondsRemaining: nextQuestionDelayRemainingRef.current,
      currentQuestionId: quizQuestion?.id ?? null,
      currentQuestionIndex: quizQuestion?.questionIndex ?? askedQuizQuestionIdsRef.current.size,
      currentQuestion: quizQuestion,
      askedQuestionIds: Array.from(askedQuizQuestionIdsRef.current),
      priorityQuestionIds,
      quizActive,
      quizCorrectAnswers,
      quizTotalAnswered,
      quizAutoAnsweredCount: quizAutoAnsweredCountRef.current,
      quizAutoAnsweredByDifficulty: quizAutoAnsweredByDifficultyRef.current,
      quizAutoAnsweredByType: quizAutoAnsweredByTypeRef.current,
      quizAnsweredByDifficulty,
      quizAnsweredByType,
      quizCorrectForNextLife,
      quizCorrectNeededForNextLife,
      questionsUntilNextExtraLife,
      questionsRequiredForNextExtraLife: quizCorrectNeededForNextLifeRef.current,
      transcriptionAttemptsByProblem: transcriptionAttemptsByProblemRef.current,
      rawCodingRotationState: getRawCodingRotationState(),
      transcriptionRotationState: getTranscriptionRotationState(),
    }
  }, [
    quizActive,
    quizAnsweredByDifficulty,
    quizAnsweredByType,
    quizCorrectAnswers,
    quizCorrectForNextLife,
    quizCorrectNeededForNextLife,
    quizQuestion,
    priorityQuestionIds,
    quizTotalAnswered,
  ])

  const restoreSaveState = useCallback((saveState: QuizSaveState | null | undefined) => {
    if (!saveState) {
      return
    }

    const askedIds = Array.isArray(saveState.askedQuestionIds)
      ? saveState.askedQuestionIds.filter((questionId) => typeof questionId === 'string')
      : []
    const priorityIds = Array.isArray(saveState.priorityQuestionIds)
      ? saveState.priorityQuestionIds.filter((questionId) => typeof questionId === 'string')
      : []

    askedQuizQuestionIdsRef.current = new Set(askedIds)
    setPriorityQuestionQueue(priorityIds)
    quizCombatSignatureRef.current = Boolean(saveState.quizActive)
    quizPauseCombatRef.current = false
    setFreezeRemaining(saveState.freezeSecondsRemaining)
    setNextQuestionDelayRemaining(saveState.nextQuestionDelaySecondsRemaining ?? 0)

    const nextCorrectAnswers = Math.max(0, Math.floor(saveState.quizCorrectAnswers))
    const nextTotalAnswered = Math.max(0, Math.floor(saveState.quizTotalAnswered))
    const nextAnsweredByDifficulty: RunQuestionDifficultyBreakdown = {
      easy: Math.max(0, Math.floor(saveState.quizAnsweredByDifficulty?.easy ?? 0)),
      medium: Math.max(0, Math.floor(saveState.quizAnsweredByDifficulty?.medium ?? 0)),
      hard: Math.max(0, Math.floor(saveState.quizAnsweredByDifficulty?.hard ?? 0)),
      veryHard: Math.max(0, Math.floor(saveState.quizAnsweredByDifficulty?.veryHard ?? 0)),
      insanelyHard: Math.max(0, Math.floor(saveState.quizAnsweredByDifficulty?.insanelyHard ?? 0)),
    }
    const nextAnsweredByType: QuestionTypeBreakdown = createEmptyQuestionTypeBreakdown()
    if (saveState.quizAnsweredByType) {
      nextAnsweredByType.rawCode = Math.max(0, Math.floor(saveState.quizAnsweredByType.rawCode ?? 0))
      nextAnsweredByType.multipleChoice = Math.max(0, Math.floor(saveState.quizAnsweredByType.multipleChoice ?? 0))
      nextAnsweredByType.starStories = Math.max(0, Math.floor(saveState.quizAnsweredByType.starStories ?? 0))
      nextAnsweredByType.starVoice = Math.max(0, Math.floor(saveState.quizAnsweredByType.starVoice ?? 0))
      nextAnsweredByType.validList = Math.max(0, Math.floor(saveState.quizAnsweredByType.validList ?? 0))
      nextAnsweredByType.orderItems = Math.max(0, Math.floor(saveState.quizAnsweredByType.orderItems ?? 0))
      nextAnsweredByType.capacity = Math.max(0, Math.floor(saveState.quizAnsweredByType.capacity ?? 0))
      nextAnsweredByType.systemDesign = Math.max(0, Math.floor(saveState.quizAnsweredByType.systemDesign ?? 0))
      nextAnsweredByType.multiSectionSystemDesign = Math.max(
        0,
        Math.floor(saveState.quizAnsweredByType.multiSectionSystemDesign ?? 0),
      )
    }
    const nextAutoAnsweredCount = Math.max(0, Math.floor(saveState.quizAutoAnsweredCount ?? 0))
    const nextAutoAnsweredByDifficulty: RunQuestionDifficultyBreakdown = {
      easy: Math.max(0, Math.floor(saveState.quizAutoAnsweredByDifficulty?.easy ?? 0)),
      medium: Math.max(0, Math.floor(saveState.quizAutoAnsweredByDifficulty?.medium ?? 0)),
      hard: Math.max(0, Math.floor(saveState.quizAutoAnsweredByDifficulty?.hard ?? 0)),
      veryHard: Math.max(0, Math.floor(saveState.quizAutoAnsweredByDifficulty?.veryHard ?? 0)),
      insanelyHard: Math.max(0, Math.floor(saveState.quizAutoAnsweredByDifficulty?.insanelyHard ?? 0)),
    }
    const nextAutoAnsweredByType = createEmptyQuestionTypeBreakdown()
    if (saveState.quizAutoAnsweredByType) {
      nextAutoAnsweredByType.rawCode = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.rawCode ?? 0))
      nextAutoAnsweredByType.multipleChoice = Math.max(
        0,
        Math.floor(saveState.quizAutoAnsweredByType.multipleChoice ?? 0),
      )
      nextAutoAnsweredByType.starStories = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.starStories ?? 0))
      nextAutoAnsweredByType.starVoice = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.starVoice ?? 0))
      nextAutoAnsweredByType.validList = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.validList ?? 0))
      nextAutoAnsweredByType.orderItems = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.orderItems ?? 0))
      nextAutoAnsweredByType.capacity = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.capacity ?? 0))
      nextAutoAnsweredByType.systemDesign = Math.max(0, Math.floor(saveState.quizAutoAnsweredByType.systemDesign ?? 0))
      nextAutoAnsweredByType.multiSectionSystemDesign = Math.max(
        0,
        Math.floor(saveState.quizAutoAnsweredByType.multiSectionSystemDesign ?? 0),
      )
    }
    const nextCorrectForNextLife = Math.max(0, Math.floor(saveState.quizCorrectForNextLife))
    const nextCorrectNeededForNextLife = Math.max(
      CORRECT_ANSWERS_FOR_FIRST_LIFE,
      Math.floor(saveState.questionsRequiredForNextExtraLife ?? saveState.quizCorrectNeededForNextLife),
    )
    const nextTranscriptionAttemptsByProblem = normalizeTranscriptionAttemptsByProblem(
      saveState.transcriptionAttemptsByProblem,
    )

    quizCorrectAnswersRef.current = nextCorrectAnswers
    quizAnsweredByDifficultyRef.current = nextAnsweredByDifficulty
    quizAnsweredByTypeRef.current = nextAnsweredByType
    quizAutoAnsweredCountRef.current = nextAutoAnsweredCount
    quizAutoAnsweredByDifficultyRef.current = nextAutoAnsweredByDifficulty
    quizAutoAnsweredByTypeRef.current = nextAutoAnsweredByType
    quizCorrectForNextLifeRef.current = nextCorrectForNextLife
    quizCorrectNeededForNextLifeRef.current = nextCorrectNeededForNextLife
    transcriptionAttemptsByProblemRef.current = nextTranscriptionAttemptsByProblem
    setRawCodingRotationState(saveState.rawCodingRotationState)
    setTranscriptionRotationState(saveState.transcriptionRotationState)

    setQuizCorrectAnswers(nextCorrectAnswers)
    setQuizTotalAnswered(nextTotalAnswered)
    syncInitialEasyDifficultyGraceMode(nextTotalAnswered)
    setQuizAnsweredByDifficulty(nextAnsweredByDifficulty)
    setQuizAnsweredByType(nextAnsweredByType)
    quizAutoAnsweredCountRef.current = nextAutoAnsweredCount
    quizAutoAnsweredByDifficultyRef.current = nextAutoAnsweredByDifficulty
    quizAutoAnsweredByTypeRef.current = nextAutoAnsweredByType
    setQuizCorrectForNextLife(nextCorrectForNextLife)
    setQuizCorrectNeededForNextLife(nextCorrectNeededForNextLife)
    setQuizActive(Boolean(saveState.quizActive))
    setQuizAnswerResult(null)
    setQuizCorrectExplanation(null)
    setQuizCorrectRewardSummary(null)
    setQuizIncorrectExplanation(null)

    const restoredQuestion = getLatestQuizQuestionContent(saveState.currentQuestion ?? null)
    let nextQuestion: QuizQuestion | null = null

    if (restoredQuestion && isQuizQuestionAllowedByCurrentFocus(restoredQuestion)) {
      const hasRestoredMultiSectionDraft =
        restoredQuestion.kind === 'multiSectionSystemDesign' &&
        saveState.multiSectionSystemDesignProgress?.questionId === restoredQuestion.id

      // Preserve saved option order for draft-based progress so selected indices still map.
      nextQuestion = hasRestoredMultiSectionDraft
        ? restoredQuestion
        : randomizeQuestionForDisplay(restoredQuestion)
    } else if (restoredQuestion) {
      enqueuePriorityQuestionId(restoredQuestion.id, { prepend: true })
    }

    setQuizQuestion(nextQuestion)
    lastQuestionKindRef.current = nextQuestion?.kind ?? null

    const nextRoundBuff = rollRoundQuizBuffType()
    upcomingRoundQuizBuffRef.current = nextRoundBuff
    setQuizUpcomingBuffLabel(formatRoundBuffRewardLabel(nextRoundBuff, getRoundBuffRewardMultiplier(nextQuestion)))
  }, [enqueuePriorityQuestionId, setFreezeRemaining, setNextQuestionDelayRemaining, setPriorityQuestionQueue, syncInitialEasyDifficultyGraceMode])

  return {
    quizActive,
    quizQuestion,
    quizAnswerResult,
    quizCorrectExplanation,
    quizCorrectRewardSummary,
    quizIncorrectExplanation,
    quizFreezeActive,
    quizFreezeFading,
    quizFreezeSecondsLeft,
    quizGraceQuestionModeActive,
    quizGraceQuestionsAnswered,
    quizGraceQuestionsRequired: INITIAL_EASY_DIFFICULTY_GRACE_QUESTIONS,
    nextQuestionDelaySecondsLeft,
    quizCorrectAnswers,
    quizTotalAnswered,
    quizCorrectForNextLife,
    quizCorrectNeededForNextLife,
    quizUpcomingBuffLabel,
    priorityQuestionIds,
    quizSelectionDebugSnapshot,
    handleQuizAnswer,
    handleValidListAnswer,
    handleOrderItemsAnswer,
    handleCapacityAnswer,
    handleTranscriptionAnswer,
    handleSystemDesignAnswer,
    handleMultiSectionSystemDesignAnswer,
    handleResumeAfterCorrectQuizAnswer,
    handleResumeAfterIncorrectQuizAnswer,
    recordAutoAnsweredQuestion,
    getIsQuizPaused,
    tickFreeze,
    handleCombatQuizVisibility,
    grantRoundStartFreeze,
    queueLifeLossReorderQuestion,
    getSaveState,
    restoreSaveState,
    resetQuizState,
  }
}
