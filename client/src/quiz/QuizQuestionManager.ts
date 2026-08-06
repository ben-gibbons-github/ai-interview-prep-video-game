import rawRampSettings from './quizRampSettings'
import {
  getNextRawCodingQuestion,
  getRawCodingQuestionCount,
  getRawCodingQuestionById,
} from './RawCodeManager'
import type {
  QuizQuestionKind,
  RawCodingQuestionMeta,
} from './RawCodeManager'
import type { MultiSectionSystemDesignQuestionMeta, SystemDesignQuestionMeta } from '../ui/SystemDesign/SystemDesignTypes'

export type QuizDifficulty = 'easy' | 'medium' | 'hard'
export type RawCodingDifficulty = QuizDifficulty | 'veryHard' | 'insanelyHard'
export type {
  QuizQuestionKind,
  RawCodingLanguageId,
  RawCodingLanguageTemplate,
  RawCodingTestCase,
  RawCodingQuestionMeta,
} from './RawCodeManager'

export type { SystemDesignQuestionMeta } from '../ui/SystemDesign/SystemDesignTypes'

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  difficulty: RawCodingDifficulty
  kind?: QuizQuestionKind
  rawCoding?: RawCodingQuestionMeta
  validList?: ValidListQuestionMeta
  orderItems?: OrderItemsQuestionMeta
  leetcodePatternTypeQuestion?: LeetcodePatternTypeQuestionMeta
  capacityQuestion?: CapacityQuestionMeta
  systemDesign?: SystemDesignQuestionMeta
  multiSectionSystemDesign?: MultiSectionSystemDesignQuestionMeta
  transcriptionQuestion?: TranscriptionQuestionMeta
  correctExplanation?: string
  questionIndex?: number
  totalQuestions?: number
  seenQuestionsBeforeCurrent?: number
}

export interface ValidListQuestionMeta {
  items: string[]
  validIndices: number[]
  helperText?: string
}

export interface OrderItemsQuestionMeta {
  items: string[]
  correctOrder: number[]
  validOrders?: number[][]
  helperText?: string
}

export interface LeetcodePatternTypeQuestionMeta {
  helperText?: string
}

export interface CapacityQuestionMeta {
  targetValue: number
  tolerancePercent?: number
  unitLabel?: string
  helperText?: string
}

export interface TranscriptionQuestionMeta {
  problemId: string
  storyTitle: string
  sections: {
    situation: string
    task: string
    action: string
    result: string
  }
  matchThreshold?: number
  helperText?: string
}

export interface QuizIncorrectExplanation {
  selectedOption: string
  selectedReason: string
  correctOption: string
  correctReason: string
}

export interface QuizCorrectExplanation {
  selectedOption: string
  detailedExplanation: string
}

interface QuizRampSettings {
  easyUntilCorrectAnswers: number
  mediumUntilCorrectAnswers: number
}

export interface QuizQuestionBankEntry {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  difficulty: RawCodingDifficulty
  correctExplanation: string
  validList?: ValidListQuestionMeta
  orderItems?: OrderItemsQuestionMeta
  leetcodePatternTypeQuestion?: LeetcodePatternTypeQuestionMeta
  capacityQuestion?: CapacityQuestionMeta
  systemDesign?: SystemDesignQuestionMeta
  multiSectionSystemDesign?: MultiSectionSystemDesignQuestionMeta
  transcriptionQuestion?: TranscriptionQuestionMeta
}

export interface RuntimeQuizQuestionBankEntry extends QuizQuestionBankEntry {
  // Runtime banks share the same shape as static banks.
}

export type RuntimeMultipleChoiceQuestionBankEntry = RuntimeQuizQuestionBankEntry

type CategoryCounts = Record<string, number>
type AvailabilityByDifficulty = Record<QuizDifficulty, CategoryCounts>

export interface QuestionExplorerCategoryRow {
  category: string
  easy: number
  medium: number
  hard: number
  total: number
}

export interface QuestionExplorerStats {
  totalLoadedQuestions: number
  totalUniqueQuestions: number
  duplicateQuestionsRemoved: number
  loadedByDifficulty: Record<QuizDifficulty, number>
  uniqueByDifficulty: Record<QuizDifficulty, number>
  categories: QuestionExplorerCategoryRow[]
}

export interface TranscriptionAttemptProgress {
  easy: number
  medium: number
  hard: number
}

export type TranscriptionAttemptProgressByProblem = Record<string, TranscriptionAttemptProgress>

export interface TranscriptionRotationState {
  queuesByPoolKey: Record<string, string[]>
  problemQueue?: string[]
  lastProblemId?: string | null
  lastQuestionId: string | null
}

export interface QuizFocusFilters {
  micOnlyMode: boolean
  multipleChoice: boolean
  validList: boolean
  orderItems: boolean
  capacity: boolean
  systemDesign: boolean
  rawCode: boolean
  starStories: boolean
  starVoice: boolean
  advanced: {
    rawCodeSources: {
      LiveCodeStyle: boolean
      frontend: boolean
      backend: boolean
      javascript: boolean
      python: boolean
      ai: boolean
      react: boolean
    }
    rawCodeLiveCodeTopics: {
      arraysStrings: boolean
      hashing: boolean
      twoPointers: boolean
      slidingWindow: boolean
      stackQueue: boolean
      binarySearch: boolean
      treesGraphs: boolean
      dynamicProgramming: boolean
      heapGreedy: boolean
      backtracking: boolean
      other: boolean
    }
    multipleChoiceTopics: {
      algorithms: boolean
      api: boolean
      distributedSystems: boolean
      behavioral: boolean
      cleanCode: boolean
      codingPatterns: boolean
      leadership: boolean
      other: boolean
    }
    validListTopics: {
      reliability: boolean
      apiData: boolean
      distributedSystems: boolean
      other: boolean
    }
    orderItemsTopics: {
      incidentRelease: boolean
      architectureFlow: boolean
      other: boolean
    }
    capacityTopics: {
      throughput: boolean
      storage: boolean
      compute: boolean
      networking: boolean
      other: boolean
    }
    systemDesignTopics: {
      backendArchitecture: boolean
      dataConsistency: boolean
      reliability: boolean
      performance: boolean
      other: boolean
    }
    starStoriesTopics: {
      matching: boolean
      title: boolean
      orderingSection: boolean
      orderingDual: boolean
      orderingQuad: boolean
      orderingFull: boolean
    }
    starVoiceTopics: {
      easy: boolean
      medium: boolean
      hard: boolean
    }
  }
}

const DEFAULT_ADVANCED_FOCUS_FILTERS: QuizFocusFilters['advanced'] = {
  rawCodeSources: {
    LiveCodeStyle: true,
    frontend: true,
    backend: true,
    javascript: true,
    python: true,
    ai: true,
    react: true,
  },
  rawCodeLiveCodeTopics: {
    arraysStrings: true,
    hashing: true,
    twoPointers: true,
    slidingWindow: true,
    stackQueue: true,
    binarySearch: true,
    treesGraphs: true,
    dynamicProgramming: true,
    heapGreedy: true,
    backtracking: true,
    other: true,
  },
  multipleChoiceTopics: {
    algorithms: true,
    api: true,
    distributedSystems: true,
    behavioral: true,
    cleanCode: true,
    codingPatterns: true,
    leadership: true,
    other: true,
  },
  validListTopics: {
    reliability: true,
    apiData: true,
    distributedSystems: true,
    other: true,
  },
  orderItemsTopics: {
    incidentRelease: true,
    architectureFlow: true,
    other: true,
  },
  capacityTopics: {
    throughput: true,
    storage: true,
    compute: true,
    networking: true,
    other: true,
  },
  systemDesignTopics: {
    backendArchitecture: true,
    dataConsistency: true,
    reliability: true,
    performance: true,
    other: true,
  },
  starStoriesTopics: {
    matching: true,
    title: true,
    orderingSection: true,
    orderingDual: true,
    orderingQuad: true,
    orderingFull: true,
  },
  starVoiceTopics: {
    easy: true,
    medium: true,
    hard: true,
  },
}

const DEFAULT_QUIZ_FOCUS_FILTERS: QuizFocusFilters = {
  micOnlyMode: false,
  multipleChoice: true,
  validList: true,
  orderItems: true,
  capacity: true,
  systemDesign: true,
  rawCode: true,
  starStories: true,
  starVoice: true,
  advanced: DEFAULT_ADVANCED_FOCUS_FILTERS,
}

let ACTIVE_QUIZ_FOCUS_FILTERS: QuizFocusFilters = {
  ...DEFAULT_QUIZ_FOCUS_FILTERS,
}

export function getDefaultQuizFocusFilters(): QuizFocusFilters {
  return {
    ...DEFAULT_QUIZ_FOCUS_FILTERS,
    advanced: {
      rawCodeSources: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.rawCodeSources,
      },
      rawCodeLiveCodeTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.rawCodeLiveCodeTopics,
      },
      multipleChoiceTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.multipleChoiceTopics,
      },
      validListTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.validListTopics,
      },
      orderItemsTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.orderItemsTopics,
      },
      capacityTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.capacityTopics,
      },
      systemDesignTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.systemDesignTopics,
      },
      starStoriesTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.starStoriesTopics,
      },
      starVoiceTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.starVoiceTopics,
      },
    },
  }
}

export function getActiveQuizFocusFilters(): QuizFocusFilters {
  return {
    ...ACTIVE_QUIZ_FOCUS_FILTERS,
    advanced: {
      rawCodeSources: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.rawCodeSources,
      },
      rawCodeLiveCodeTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.rawCodeLiveCodeTopics,
      },
      multipleChoiceTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.multipleChoiceTopics,
      },
      validListTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.validListTopics,
      },
      orderItemsTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.orderItemsTopics,
      },
      capacityTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics,
      },
      systemDesignTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.systemDesignTopics,
      },
      starStoriesTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics,
      },
      starVoiceTopics: {
        ...ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starVoiceTopics,
      },
    },
  }
}

function normalizeQuizFocusFilters(filters: Partial<QuizFocusFilters> | undefined): QuizFocusFilters {
  return {
    ...DEFAULT_QUIZ_FOCUS_FILTERS,
    ...(filters ?? {}),
    advanced: {
      rawCodeSources: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.rawCodeSources,
        ...(filters?.advanced?.rawCodeSources ?? {}),
      },
      rawCodeLiveCodeTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.rawCodeLiveCodeTopics,
        ...(filters?.advanced?.rawCodeLiveCodeTopics ?? {}),
      },
      multipleChoiceTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.multipleChoiceTopics,
        ...(filters?.advanced?.multipleChoiceTopics ?? {}),
      },
      validListTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.validListTopics,
        ...(filters?.advanced?.validListTopics ?? {}),
      },
      orderItemsTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.orderItemsTopics,
        ...(filters?.advanced?.orderItemsTopics ?? {}),
      },
      capacityTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.capacityTopics,
        ...(filters?.advanced?.capacityTopics ?? {}),
      },
      systemDesignTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.systemDesignTopics,
        ...(filters?.advanced?.systemDesignTopics ?? {}),
      },
      starStoriesTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.starStoriesTopics,
        ...(filters?.advanced?.starStoriesTopics ?? {}),
      },
      starVoiceTopics: {
        ...DEFAULT_ADVANCED_FOCUS_FILTERS.starVoiceTopics,
        ...(filters?.advanced?.starVoiceTopics ?? {}),
      },
    },
  }
}

export function setQuizFocusFilters(filters: Partial<QuizFocusFilters> | undefined): void {
  const mergedFilters = normalizeQuizFocusFilters(filters)

  if (mergedFilters.micOnlyMode) {
    ACTIVE_QUIZ_FOCUS_FILTERS = {
      ...mergedFilters,
      multipleChoice: false,
      validList: false,
      orderItems: false,
      capacity: false,
      systemDesign: false,
      rawCode: false,
      starStories: false,
      starVoice: true,
    }
    return
  }

  ACTIVE_QUIZ_FOCUS_FILTERS = mergedFilters
}

export function getLatestQuizQuestionContent(question: QuizQuestion | null): QuizQuestion | null {
  if (!question) {
    return question
  }

  if (question.kind === 'rawCoding') {
    const latestQuestion = getRawCodingQuestionById(question.id)
    if (!latestQuestion) {
      return question
    }

    return {
      ...latestQuestion,
      questionIndex: question.questionIndex,
      totalQuestions: question.totalQuestions,
      seenQuestionsBeforeCurrent: question.seenQuestionsBeforeCurrent,
    }
  }

  if (!isStarStoryQuestionId(question.id)) {
    return question
  }

  const latestQuestion = QUIZ_QUESTIONS.find((candidate) => candidate.id === question.id)
  if (!latestQuestion) {
    return question
  }

  return {
    ...latestQuestion,
    kind: toQuestionKind(latestQuestion),
    questionIndex: question.questionIndex,
    totalQuestions: question.totalQuestions,
    seenQuestionsBeforeCurrent: question.seenQuestionsBeforeCurrent,
  }
}

export function getQuizQuestionById(questionId: string): QuizQuestion | null {
  const normalizedId = questionId.trim()
  if (!normalizedId) {
    return null
  }

  const rawCodingQuestion = getRawCodingQuestionById(normalizedId)
  if (rawCodingQuestion) {
    return rawCodingQuestion
  }

  const staticOrRuntimeQuestion = QUIZ_QUESTIONS.find((candidate) => candidate.id === normalizedId)
  if (!staticOrRuntimeQuestion) {
    return null
  }

  return {
    ...staticOrRuntimeQuestion,
    kind: toQuestionKind(staticOrRuntimeQuestion),
  }
}

export function isQuizQuestionAllowedByCurrentFocus(question: QuizQuestion | null): boolean {
  if (!question) {
    return false
  }

  const latestQuestion = getLatestQuizQuestionContent(question)
  if (!latestQuestion) {
    return false
  }

  const candidate: QuizQuestionBankEntry = {
    ...latestQuestion,
    correctExplanation: latestQuestion.correctExplanation ?? '',
  }

  return isQuestionAllowedByFocusFilters(candidate) && isQuestionAllowedByAdvancedFocus(candidate)
}

function isSupportedQuestionDifficulty(value: unknown): value is RawCodingDifficulty {
  return (
    value === 'easy' ||
    value === 'medium' ||
    value === 'hard' ||
    value === 'veryHard' ||
    value === 'insanelyHard'
  )
}

function toBaseQuizDifficulty(difficulty: RawCodingDifficulty): QuizDifficulty {
  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
    return difficulty
  }

  return 'hard'
}

function extractLiveCodePromptGoal(prompt: string): string {
  const titleLine = prompt.split('\n')[0] ?? ''
  const topicMatch = titleLine.match(/LiveCode Complete This Code \(([^)]+)\)/i)
  const topic = topicMatch?.[1]?.trim()
  if (!topic) {
    return 'Complete the function so it produces the expected output for valid inputs.'
  }

  return `Complete the function correctly for ${topic.toLowerCase()}.`
}

function addLiveCodePromptComments(prompt: string): string {
  if (!prompt.includes('LiveCode Complete This Code')) {
    return prompt
  }

  const goal = extractLiveCodePromptGoal(prompt)

  return prompt.replace(/```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g, (fullMatch, language = 'text', rawCode = '') => {
    const code = String(rawCode)
    const firstMeaningfulLine = code
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.length > 0)

    if (firstMeaningfulLine?.startsWith('// Goal:')) {
      return fullMatch
    }

    const functionNameMatch = code.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/)
    const functionName = functionNameMatch?.[1]
    const functionLine = functionName
      ? `// Function: ${functionName}()`
      : '// Function: complete the snippet below'

    const commentHeader =
      `// Goal: ${goal}\n` +
      `${functionLine}\n` +
      '// Fill in __BLANK__ with the correct line(s).\n\n'

    return `\`\`\`${language}\n${commentHeader}${code}\`\`\``
  })
}

function normalizeQuestionBank(input: unknown): QuizQuestionBankEntry[] {
  if (!Array.isArray(input)) {
    return []
  }

  const validatedEntries = input.filter((entry): entry is QuizQuestionBankEntry => {
    if (typeof entry !== 'object' || entry === null) {
      return false
    }

    const candidate = entry as Partial<QuizQuestionBankEntry>
    const candidateMultiSectionSystemDesign =
      (candidate as { multiSectionSystemDesign?: unknown }).multiSectionSystemDesign
    const hasMultiSectionSystemDesign = candidateMultiSectionSystemDesign !== undefined

    const hasValidOptions =
      Array.isArray(candidate.options) &&
      candidate.options.length >= (hasMultiSectionSystemDesign ? 1 : 2) &&
      candidate.options.every((option) => typeof option === 'string')

    const hasValidCorrectIndex =
      typeof candidate.correctIndex === 'number' &&
      Number.isInteger(candidate.correctIndex) &&
      candidate.correctIndex >= 0 &&
      candidate.correctIndex < (candidate.options?.length ?? 0)

    const candidateValidList = (candidate as { validList?: unknown }).validList
    const hasValidValidList = (() => {
      if (candidateValidList === undefined) {
        return true
      }

      if (typeof candidateValidList !== 'object' || candidateValidList === null) {
        return false
      }

      const validList = candidateValidList as Partial<ValidListQuestionMeta>
      if (!Array.isArray(validList.items) || validList.items.length < 4) {
        return false
      }

      if (!validList.items.every((item) => typeof item === 'string' && item.trim().length > 0)) {
        return false
      }

      if (!Array.isArray(validList.validIndices) || validList.validIndices.length === 0) {
        return false
      }

      if (
        !validList.validIndices.every(
          (index) =>
            typeof index === 'number' &&
            Number.isInteger(index) &&
            index >= 0 &&
            index < validList.items!.length,
        )
      ) {
        return false
      }

      if (
        validList.helperText !== undefined &&
        typeof validList.helperText !== 'string'
      ) {
        return false
      }

      return true
    })()

    const candidateOrderItems = (candidate as { orderItems?: unknown }).orderItems
    const hasValidOrderItems = (() => {
      if (candidateOrderItems === undefined) {
        return true
      }

      if (typeof candidateOrderItems !== 'object' || candidateOrderItems === null) {
        return false
      }

      const orderItems = candidateOrderItems as Partial<OrderItemsQuestionMeta>
      if (!Array.isArray(orderItems.items) || orderItems.items.length < 4 || orderItems.items.length > 120) {
        return false
      }

      if (!orderItems.items.every((item) => typeof item === 'string' && item.trim().length > 0)) {
        return false
      }

      if (!Array.isArray(orderItems.correctOrder) || orderItems.correctOrder.length !== orderItems.items.length) {
        return false
      }

      if (
        !orderItems.correctOrder.every(
          (index) =>
            typeof index === 'number' &&
            Number.isInteger(index) &&
            index >= 0 &&
            index < orderItems.items!.length,
        )
      ) {
        return false
      }

      if (new Set(orderItems.correctOrder).size !== orderItems.items.length) {
        return false
      }

      if (orderItems.validOrders !== undefined) {
        if (!Array.isArray(orderItems.validOrders) || orderItems.validOrders.length === 0) {
          return false
        }

        const validOrdersAreValid = orderItems.validOrders.every((candidateOrder) => {
          if (!Array.isArray(candidateOrder) || candidateOrder.length !== orderItems.items!.length) {
            return false
          }

          if (
            !candidateOrder.every(
              (index) =>
                typeof index === 'number' &&
                Number.isInteger(index) &&
                index >= 0 &&
                index < orderItems.items!.length,
            )
          ) {
            return false
          }

          return new Set(candidateOrder).size === orderItems.items!.length
        })

        if (!validOrdersAreValid) {
          return false
        }
      }

      if (
        orderItems.helperText !== undefined &&
        typeof orderItems.helperText !== 'string'
      ) {
        return false
      }

      return true
    })()

    const candidateLeetcodePatternTypeQuestion =
      (candidate as { leetcodePatternTypeQuestion?: unknown }).leetcodePatternTypeQuestion
    const hasValidLeetcodePatternTypeQuestion = (() => {
      if (candidateLeetcodePatternTypeQuestion === undefined) {
        return true
      }

      if (
        typeof candidateLeetcodePatternTypeQuestion !== 'object' ||
        candidateLeetcodePatternTypeQuestion === null
      ) {
        return false
      }

      const leetcodePatternTypeQuestion =
        candidateLeetcodePatternTypeQuestion as Partial<LeetcodePatternTypeQuestionMeta>

      if (
        leetcodePatternTypeQuestion.helperText !== undefined &&
        typeof leetcodePatternTypeQuestion.helperText !== 'string'
      ) {
        return false
      }

      return true
    })()

    const candidateCapacityQuestion = (candidate as { capacityQuestion?: unknown }).capacityQuestion
    const hasValidCapacityQuestion = (() => {
      if (candidateCapacityQuestion === undefined) {
        return true
      }

      if (typeof candidateCapacityQuestion !== 'object' || candidateCapacityQuestion === null) {
        return false
      }

      const capacityQuestion = candidateCapacityQuestion as Partial<CapacityQuestionMeta>
      if (
        typeof capacityQuestion.targetValue !== 'number' ||
        !Number.isFinite(capacityQuestion.targetValue) ||
        capacityQuestion.targetValue <= 0
      ) {
        return false
      }

      if (
        capacityQuestion.tolerancePercent !== undefined &&
        (
          typeof capacityQuestion.tolerancePercent !== 'number' ||
          !Number.isFinite(capacityQuestion.tolerancePercent) ||
          capacityQuestion.tolerancePercent <= 0 ||
          capacityQuestion.tolerancePercent > 1
        )
      ) {
        return false
      }

      if (
        capacityQuestion.unitLabel !== undefined &&
        typeof capacityQuestion.unitLabel !== 'string'
      ) {
        return false
      }

      if (
        capacityQuestion.helperText !== undefined &&
        typeof capacityQuestion.helperText !== 'string'
      ) {
        return false
      }

      return true
    })()

    const candidateSystemDesign = (candidate as { systemDesign?: unknown }).systemDesign
    const hasValidSystemDesign = (() => {
      if (candidateSystemDesign === undefined) {
        return true
      }
      if (typeof candidateSystemDesign !== 'object' || candidateSystemDesign === null) {
        return false
      }
      const sd = candidateSystemDesign as Record<string, unknown>
      if (typeof sd.scenario !== 'object' || sd.scenario === null) {
        return false
      }
      const scenario = sd.scenario as Record<string, unknown>
      if (!Array.isArray(scenario.availableComponents) || scenario.availableComponents.length === 0) {
        return false
      }
      if (typeof scenario.maxNodes !== 'number' || typeof scenario.readQps !== 'number' || typeof scenario.writeQps !== 'number') {
        return false
      }
      if (!Array.isArray(scenario.requiredComponents) || !Array.isArray(scenario.requiredFlows)) {
        return false
      }
      return true
    })()

    const hasValidMultiSectionSystemDesign = (() => {
      if (candidateMultiSectionSystemDesign === undefined) {
        return true
      }

      if (typeof candidateMultiSectionSystemDesign !== 'object' || candidateMultiSectionSystemDesign === null) {
        return false
      }

      const multiSectionSystemDesign = candidateMultiSectionSystemDesign as Partial<MultiSectionSystemDesignQuestionMeta>
      if (typeof multiSectionSystemDesign.sections !== 'object' || multiSectionSystemDesign.sections === null) {
        return false
      }

      const sections = multiSectionSystemDesign.sections as unknown[]
      if (sections.length === 0) {
        return false
      }

      const hasValidSections = sections.every((section) => {
        if (typeof section !== 'object' || section === null) {
          return false
        }

        const typedSection = section as Record<string, unknown>
        if (
          typeof typedSection.id !== 'string' ||
          typedSection.id.trim().length === 0 ||
          typeof typedSection.title !== 'string' ||
          typedSection.title.trim().length === 0 ||
          typeof typedSection.prompt !== 'string' ||
          typedSection.prompt.trim().length === 0
        ) {
          return false
        }

        if (!Array.isArray(typedSection.options) || typedSection.options.length < 4 || typedSection.options.length > 6) {
          return false
        }

        if (!typedSection.options.every((option) => typeof option === 'string' && option.trim().length > 0)) {
          return false
        }

        if (
          typeof typedSection.correctIndex !== 'number' ||
          !Number.isInteger(typedSection.correctIndex) ||
          typedSection.correctIndex < 0 ||
          typedSection.correctIndex >= typedSection.options.length
        ) {
          return false
        }

        if (typedSection.helperText !== undefined && typeof typedSection.helperText !== 'string') {
          return false
        }

        return true
      })

      if (!hasValidSections) {
        return false
      }

      if (
        multiSectionSystemDesign.title !== undefined &&
        typeof multiSectionSystemDesign.title !== 'string'
      ) {
        return false
      }

      if (
        multiSectionSystemDesign.scenarioSummary !== undefined &&
        typeof multiSectionSystemDesign.scenarioSummary !== 'string'
      ) {
        return false
      }

      if (
        multiSectionSystemDesign.submissionsAllowed !== undefined &&
        (
          typeof multiSectionSystemDesign.submissionsAllowed !== 'number' ||
          !Number.isInteger(multiSectionSystemDesign.submissionsAllowed) ||
          multiSectionSystemDesign.submissionsAllowed < 1 ||
          multiSectionSystemDesign.submissionsAllowed > 3
        )
      ) {
        return false
      }

      return true
    })()

    const candidateTranscriptionQuestion = (candidate as { transcriptionQuestion?: unknown }).transcriptionQuestion
    const hasValidTranscriptionQuestion = (() => {
      if (candidateTranscriptionQuestion === undefined) {
        return true
      }

      if (typeof candidateTranscriptionQuestion !== 'object' || candidateTranscriptionQuestion === null) {
        return false
      }

      const transcriptionQuestion = candidateTranscriptionQuestion as Partial<TranscriptionQuestionMeta>
      if (
        typeof transcriptionQuestion.problemId !== 'string' ||
        transcriptionQuestion.problemId.trim().length === 0 ||
        typeof transcriptionQuestion.storyTitle !== 'string' ||
        transcriptionQuestion.storyTitle.trim().length === 0
      ) {
        return false
      }

      if (typeof transcriptionQuestion.sections !== 'object' || transcriptionQuestion.sections === null) {
        return false
      }

      const sections = transcriptionQuestion.sections as Record<string, unknown>
      const requiredSectionKeys = ['situation', 'task', 'action', 'result']
      const hasValidSections = requiredSectionKeys.every((key) => {
        const value = sections[key]
        return typeof value === 'string' && value.trim().length > 0
      })

      if (!hasValidSections) {
        return false
      }

      if (
        transcriptionQuestion.matchThreshold !== undefined &&
        (
          typeof transcriptionQuestion.matchThreshold !== 'number' ||
          !Number.isFinite(transcriptionQuestion.matchThreshold) ||
          transcriptionQuestion.matchThreshold <= 0 ||
          transcriptionQuestion.matchThreshold > 1
        )
      ) {
        return false
      }

      if (
        transcriptionQuestion.helperText !== undefined &&
        typeof transcriptionQuestion.helperText !== 'string'
      ) {
        return false
      }

      return true
    })()

    return (
      typeof candidate.id === 'string' &&
      typeof candidate.prompt === 'string' &&
      isSupportedQuestionDifficulty(candidate.difficulty) &&
      hasValidOptions &&
      hasValidCorrectIndex &&
      typeof candidate.correctExplanation === 'string' &&
      hasValidValidList &&
      hasValidOrderItems &&
      hasValidLeetcodePatternTypeQuestion &&
      hasValidCapacityQuestion &&
      hasValidSystemDesign &&
      hasValidMultiSectionSystemDesign &&
      hasValidTranscriptionQuestion
    )
  })

  return validatedEntries.map((entry) => ({
    ...entry,
    prompt: addLiveCodePromptComments(entry.prompt),
  }))
}

function normalizeQuestionOptionForDedup(option: string): string {
  return option.trim().replace(/\s+/g, ' ')
}

function getQuestionDeduplicationKey(question: QuizQuestionBankEntry): string {
  const normalizedPrompt = question.prompt.trim().replace(/\s+/g, ' ')
  const normalizedOptions = question.options.map(normalizeQuestionOptionForDedup).join('||')
  const normalizedExplanation = question.correctExplanation.trim().replace(/\s+/g, ' ')
  const structuredMetaDisambiguator = JSON.stringify({
    validList: question.validList,
    orderItems: question.orderItems,
    leetcodePatternTypeQuestion: question.leetcodePatternTypeQuestion,
    capacityQuestion: question.capacityQuestion,
    systemDesign: question.systemDesign,
    multiSectionSystemDesign: question.multiSectionSystemDesign,
    transcriptionQuestion: question.transcriptionQuestion,
  })

  return [
    question.difficulty,
    normalizedPrompt,
    normalizedOptions,
    String(question.correctIndex),
    normalizedExplanation,
    structuredMetaDisambiguator,
  ].join('@@')
}

function logAndRemoveDuplicateQuestions(questions: QuizQuestionBankEntry[]): QuizQuestionBankEntry[] {
  const seenByKey = new Map<string, QuizQuestionBankEntry>()
  const duplicatesByKey = new Map<string, QuizQuestionBankEntry[]>()

  questions.forEach((question) => {
    const key = getQuestionDeduplicationKey(question)
    const existing = seenByKey.get(key)

    if (!existing) {
      seenByKey.set(key, question)
      return
    }

    const duplicates = duplicatesByKey.get(key) ?? [existing]
    duplicates.push(question)
    duplicatesByKey.set(key, duplicates)
  })

  if (duplicatesByKey.size === 0) {
    console.info('[Quiz] No duplicate questions detected.')
    return questions
  }

  const duplicateRows = Array.from(duplicatesByKey.values()).map((group, index) => ({
    duplicateGroup: index + 1,
    occurrences: group.length,
    keptId: group[0].id,
    removedIds: group
      .slice(1)
      .map((entry) => entry.id)
      .join(', '),
    difficulty: group[0].difficulty,
    promptPreview: group[0].prompt.slice(0, 80),
  }))

  const duplicatesRemoved = duplicateRows.reduce((sum, row) => sum + Math.max(0, row.occurrences - 1), 0)

  console.warn('[Quiz] Duplicate questions detected and removed.', {
    duplicateGroups: duplicateRows.length,
    duplicatesRemoved,
    remainingQuestions: seenByKey.size,
  })
  console.table(duplicateRows)

  return Array.from(seenByKey.values())
}

function extractCategoryFromBankPath(bankPath: string, difficulty: QuizDifficulty): string {
  const fileName = bankPath.split('/').pop() ?? bankPath
  const fileStem = fileName.replace(/\.(json|ts)$/i, '')
  const strippedDifficulty = fileStem.replace(new RegExp(`\\.${difficulty}$`), '')
  const strippedVariant = strippedDifficulty.replace(/\.\d+$/, '')
  return strippedVariant
}

function countQuestionsByCategory(
  rawBanks: Record<string, unknown>,
  difficulty: QuizDifficulty,
): CategoryCounts {
  const counts: CategoryCounts = {}

  Object.entries(rawBanks).forEach(([bankPath, rawEntry]) => {
    const questions = normalizeQuestionBank(rawEntry)
    if (questions.length === 0) {
      return
    }

    const category = extractCategoryFromBankPath(bankPath, difficulty)
    counts[category] = (counts[category] ?? 0) + questions.length
  })

  return counts
}

function logQuestionAvailabilityOnLaunch(
  countsByDifficulty: AvailabilityByDifficulty,
  totalQuestionCount: number,
) {
  if (typeof window === 'undefined') {
    return
  }

  const totalsByDifficulty = {
    easy: Object.values(countsByDifficulty.easy).reduce((sum, count) => sum + count, 0),
    medium: Object.values(countsByDifficulty.medium).reduce((sum, count) => sum + count, 0),
    hard: Object.values(countsByDifficulty.hard).reduce((sum, count) => sum + count, 0),
  }

  const allCategories = new Set<string>([
    ...Object.keys(countsByDifficulty.easy),
    ...Object.keys(countsByDifficulty.medium),
    ...Object.keys(countsByDifficulty.hard),
  ])

  const categoryRows = Array.from(allCategories)
    .sort((a, b) => a.localeCompare(b))
    .map((category) => ({
      category,
      easy: countsByDifficulty.easy[category] ?? 0,
      medium: countsByDifficulty.medium[category] ?? 0,
      hard: countsByDifficulty.hard[category] ?? 0,
      total:
        (countsByDifficulty.easy[category] ?? 0) +
        (countsByDifficulty.medium[category] ?? 0) +
        (countsByDifficulty.hard[category] ?? 0),
    }))

  console.info('[Quiz] Loaded question bank totals:', {
    totalQuestions: totalQuestionCount,
    byDifficulty: totalsByDifficulty,
    categories: categoryRows.length,
  })
  console.table(categoryRows)
}

function sumCategoryCounts(categoryCounts: CategoryCounts): number {
  return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)
}

function createCategoryRows(countsByDifficulty: AvailabilityByDifficulty): QuestionExplorerCategoryRow[] {
  const allCategories = new Set<string>([
    ...Object.keys(countsByDifficulty.easy),
    ...Object.keys(countsByDifficulty.medium),
    ...Object.keys(countsByDifficulty.hard),
  ])

  return Array.from(allCategories)
    .sort((a, b) => a.localeCompare(b))
    .map((category) => {
      const easy = countsByDifficulty.easy[category] ?? 0
      const medium = countsByDifficulty.medium[category] ?? 0
      const hard = countsByDifficulty.hard[category] ?? 0

      return {
        category,
        easy,
        medium,
        hard,
        total: easy + medium + hard,
      }
    })
}

function createEmptyAvailability(): AvailabilityByDifficulty {
  return {
    easy: {},
    medium: {},
    hard: {},
  }
}

function mergeAvailability(
  left: AvailabilityByDifficulty,
  right: AvailabilityByDifficulty,
): AvailabilityByDifficulty {
  const merged = createEmptyAvailability()

  ;(['easy', 'medium', 'hard'] as const).forEach((difficulty) => {
    const categoryNames = new Set<string>([
      ...Object.keys(left[difficulty]),
      ...Object.keys(right[difficulty]),
    ])

    categoryNames.forEach((category) => {
      merged[difficulty][category] = (left[difficulty][category] ?? 0) + (right[difficulty][category] ?? 0)
    })
  })

  return merged
}

interface RuntimeQuestionBankState {
  category: string
  questions: QuizQuestionBankEntry[]
}

const STAR_STORY_QUESTION_ID_PREFIX = 'star-story-'
const STAR_STORY_MATCHING_QUESTION_INTERVAL = 5
const STAR_STORY_ORDERING_QUESTION_INTERVAL = 11
const STAR_STORY_TITLE_QUESTION_INTERVAL = 7
const STAR_STORY_HARD_DUAL_ORDERING_REPLACEMENT_RATE = 0.2
const STAR_STORY_HARD_QUAD_ORDERING_REPLACEMENT_RATE = 0.025
const STAR_STORY_HARD_FULL_ORDERING_REPLACEMENT_RATE = 0.5
const STAR_STORY_TRANSCRIPTION_REPLACEMENT_RATE = 0.7
const SYSTEM_DESIGN_QUESTION_INTERVAL = 9
const MULTI_SECTION_SYSTEM_DESIGN_QUESTION_INTERVAL = 10
const RAW_CODING_PRIMARY_QUESTION_INTERVAL = 6
const RAW_CODING_COLLISION_QUESTION_INTERVAL = 21
const STAR_TRANSCRIPTION_DEBUG_LOGGING = true
const STAR_WORKFLOW_DEBUG_LOGGING = true

export type CadenceSpecialQuestionType =
  | 'starStoryTitle'
  | 'starStorySectionOrdering'
  | 'starStoryMatching'
  | 'systemDesign'
  | 'multiSectionSystemDesign'
  | 'rawCoding'

const cadenceSpecialQuestionQueue: CadenceSpecialQuestionType[] = []

export interface QuizSelectionDebugSnapshot {
  askedQuestionCount: number
  questionPosition: number
  targetDifficulty: QuizDifficulty
  fallbackOrder: QuizDifficulty[]
  micOnlyMode: boolean
  rawCodingFrequencyMultiplier: number
  cadenceDeferredQueue: CadenceSpecialQuestionType[]
  cadenceDueNow: CadenceSpecialQuestionType[]
  cadenceCountdowns: {
    starStoryTitle: number
    starStorySectionOrdering: number
    starStoryMatching: number
    systemDesign: number
    multiSectionSystemDesign: number
    rawCodingEveryFifth: number
    rawCodingEveryTwentieth: number
  }
  cadenceAvailability: {
    starStoryTitle: boolean
    starStorySectionOrdering: boolean
    starStoryMatching: boolean
    systemDesign: boolean
    multiSectionSystemDesign: boolean
  }
  cadenceAvailabilityReasons: {
    starStoryTitle: string | null
    starStorySectionOrdering: string | null
    starStoryMatching: string | null
    systemDesign: string | null
    multiSectionSystemDesign: string | null
  }
}

function getCadenceUnavailableReason(
  askedQuestionIds: Set<string>,
  options: {
    label: string
    focusEnabled: boolean
    matchesCadenceType: (question: QuizQuestionBankEntry) => boolean
  },
): string | null {
  const matchingQuestions = QUIZ_QUESTIONS_IN_RANDOM_ORDER.filter(options.matchesCadenceType)
  if (matchingQuestions.length === 0) {
    return `no ${options.label} questions are loaded`
  }

  if (!options.focusEnabled) {
    return `${options.label} focus toggle is off`
  }

  const advancedEligibleQuestions = matchingQuestions.filter((question) => isQuestionAllowedByAdvancedFocus(question))
  if (advancedEligibleQuestions.length === 0) {
    return `advanced filters exclude all ${options.label} questions`
  }

  const hasUnseenAdvancedEligibleQuestion = advancedEligibleQuestions.some(
    (question) => !askedQuestionIds.has(question.id),
  )
  if (hasUnseenAdvancedEligibleQuestion) {
    return null
  }

  // Fully-seen pools are recyclable, so they remain available.
  return null
}

function countdownToInterval(questionPosition: number, interval: number): number {
  if (interval <= 0) {
    return Number.POSITIVE_INFINITY
  }

  const remainder = questionPosition % interval
  return remainder === 0 ? 0 : interval - remainder
}

export function getQuizSelectionDebugSnapshot(
  correctAnswers: number,
  askedQuestionIds: Set<string>,
  rawCodingFrequencyMultiplier = 1,
): QuizSelectionDebugSnapshot {
  const questionPosition = askedQuestionIds.size + 1
  const targetDifficulty = getTargetDifficulty(correctAnswers)
  const fallbackOrder: QuizDifficulty[] =
    targetDifficulty === 'hard'
      ? ['hard', 'medium']
      : targetDifficulty === 'medium'
        ? ['medium', 'hard']
        : ['easy', 'medium', 'hard']

  const systemDesignAvailable = hasAvailableSystemDesignQuestion(askedQuestionIds)
  const multiSectionSystemDesignAvailable = hasAvailableMultiSectionSystemDesignQuestion(askedQuestionIds)
  const rawCodingAvailable = ACTIVE_QUIZ_FOCUS_FILTERS.rawCode

  const cadenceDueNow: CadenceSpecialQuestionType[] = []

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireTitle: true,
      interval: STAR_STORY_TITLE_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueNow.push('starStoryTitle')
  }

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireSectionOrdering: true,
      interval: STAR_STORY_ORDERING_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueNow.push('starStorySectionOrdering')
  }

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireMatching: true,
      interval: STAR_STORY_MATCHING_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueNow.push('starStoryMatching')
  }

  if (isSystemDesignQuestionSlot(questionPosition, askedQuestionIds)) {
    cadenceDueNow.push('systemDesign')
  }

  if (isMultiSectionSystemDesignQuestionSlot(questionPosition, askedQuestionIds)) {
    cadenceDueNow.push('multiSectionSystemDesign')
  }

  const isRawCodingPrimarySlot = questionPosition % RAW_CODING_PRIMARY_QUESTION_INTERVAL === 0
  const isRawCodingCollisionSlot = questionPosition % RAW_CODING_COLLISION_QUESTION_INTERVAL === 0

  if (isRawCodingPrimarySlot) {
    if (isRawCodingCollisionSlot) {
      if (systemDesignAvailable) {
        cadenceDueNow.push('systemDesign')
      }
      if (multiSectionSystemDesignAvailable) {
        cadenceDueNow.push('multiSectionSystemDesign')
      }
      if (rawCodingAvailable) {
        cadenceDueNow.push('rawCoding')
      }
    } else {
      if (rawCodingAvailable) {
        cadenceDueNow.push('rawCoding')
      }
      if (systemDesignAvailable) {
        cadenceDueNow.push('systemDesign')
      }
      if (multiSectionSystemDesignAvailable) {
        cadenceDueNow.push('multiSectionSystemDesign')
      }
    }
  }

  const uniqueCadenceDueNow: CadenceSpecialQuestionType[] = []
  const seenCadenceTypes = new Set<CadenceSpecialQuestionType>()
  for (const cadenceType of cadenceDueNow) {
    if (seenCadenceTypes.has(cadenceType)) {
      continue
    }

    seenCadenceTypes.add(cadenceType)
    uniqueCadenceDueNow.push(cadenceType)
  }

  const starStoryTitleAvailable = hasAvailableStarStoryQuestion(askedQuestionIds, { requireTitle: true })
  const starStorySectionOrderingAvailable = hasAvailableStarStoryQuestion(askedQuestionIds, {
    requireSectionOrdering: true,
  })
  const starStoryMatchingAvailable = hasAvailableStarStoryQuestion(askedQuestionIds, { requireMatching: true })

  const starStoryTitleUnavailableReason = starStoryTitleAvailable
    ? null
    : getCadenceUnavailableReason(askedQuestionIds, {
        label: 'STAR story title',
        focusEnabled: ACTIVE_QUIZ_FOCUS_FILTERS.starStories,
        matchesCadenceType: (question) => isStarStoryTitleQuestion(question),
      })

  const starStorySectionOrderingUnavailableReason = starStorySectionOrderingAvailable
    ? null
    : getCadenceUnavailableReason(askedQuestionIds, {
        label: 'STAR story section ordering',
        focusEnabled: ACTIVE_QUIZ_FOCUS_FILTERS.starStories,
        matchesCadenceType: (question) => isStarStorySectionOrderingQuestion(question),
      })

  const starStoryMatchingUnavailableReason = starStoryMatchingAvailable
    ? null
    : getCadenceUnavailableReason(askedQuestionIds, {
        label: 'STAR story matching',
        focusEnabled: ACTIVE_QUIZ_FOCUS_FILTERS.starStories,
        matchesCadenceType: (question) => isStarStoryMatchingQuestion(question),
      })

  const systemDesignUnavailableReason = systemDesignAvailable
    ? null
    : getCadenceUnavailableReason(askedQuestionIds, {
        label: 'system design',
        focusEnabled: ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign,
        matchesCadenceType: (question) => question.systemDesign !== undefined,
      })

  const multiSectionSystemDesignUnavailableReason = multiSectionSystemDesignAvailable
    ? null
    : getCadenceUnavailableReason(askedQuestionIds, {
        label: 'multi-section system design',
        focusEnabled: ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign,
        matchesCadenceType: (question) => question.multiSectionSystemDesign !== undefined,
      })

  return {
    askedQuestionCount: askedQuestionIds.size,
    questionPosition,
    targetDifficulty,
    fallbackOrder,
    micOnlyMode: ACTIVE_QUIZ_FOCUS_FILTERS.micOnlyMode,
    rawCodingFrequencyMultiplier: Math.max(1, rawCodingFrequencyMultiplier),
    cadenceDeferredQueue: [...cadenceSpecialQuestionQueue],
    cadenceDueNow: uniqueCadenceDueNow,
    cadenceCountdowns: {
      starStoryTitle: countdownToInterval(questionPosition, STAR_STORY_TITLE_QUESTION_INTERVAL),
      starStorySectionOrdering: countdownToInterval(questionPosition, STAR_STORY_ORDERING_QUESTION_INTERVAL),
      starStoryMatching: countdownToInterval(questionPosition, STAR_STORY_MATCHING_QUESTION_INTERVAL),
      systemDesign: countdownToInterval(questionPosition, SYSTEM_DESIGN_QUESTION_INTERVAL),
      multiSectionSystemDesign: countdownToInterval(questionPosition, MULTI_SECTION_SYSTEM_DESIGN_QUESTION_INTERVAL),
      rawCodingEveryFifth: countdownToInterval(questionPosition, RAW_CODING_PRIMARY_QUESTION_INTERVAL),
      rawCodingEveryTwentieth: countdownToInterval(questionPosition, RAW_CODING_COLLISION_QUESTION_INTERVAL),
    },
    cadenceAvailability: {
      starStoryTitle: starStoryTitleAvailable,
      starStorySectionOrdering: starStorySectionOrderingAvailable,
      starStoryMatching: starStoryMatchingAvailable,
      systemDesign: systemDesignAvailable,
      multiSectionSystemDesign: multiSectionSystemDesignAvailable,
    },
    cadenceAvailabilityReasons: {
      starStoryTitle: starStoryTitleUnavailableReason,
      starStorySectionOrdering: starStorySectionOrderingUnavailableReason,
      starStoryMatching: starStoryMatchingUnavailableReason,
      systemDesign: systemDesignUnavailableReason,
      multiSectionSystemDesign: multiSectionSystemDesignUnavailableReason,
    },
  }
}

function isQuestionAllowedByFocusFilters(question: QuizQuestionBankEntry): boolean {
  if (question.transcriptionQuestion) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.starVoice
  }

  if (isStarStoryQuestionId(question.id)) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.starStories
  }

  if (question.systemDesign || question.multiSectionSystemDesign) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign
  }

  if (question.capacityQuestion) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.capacity
  }

  if (question.orderItems) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.orderItems
  }

  if (question.validList) {
    return ACTIVE_QUIZ_FOCUS_FILTERS.validList
  }

  return ACTIVE_QUIZ_FOCUS_FILTERS.multipleChoice
}

function getMultipleChoiceTopicKey(
  question: QuizQuestionBankEntry,
): keyof QuizFocusFilters['advanced']['multipleChoiceTopics'] {
  const id = question.id.toLowerCase()

  if (id.includes('algorithm') || id.includes('LiveCode') || id.includes('big-o')) {
    return 'algorithms'
  }

  if (id.includes('api_') || id.includes('api-') || id.includes('api_design') || id.includes('rest')) {
    return 'api'
  }

  if (
    id.includes('distributed') ||
    id.includes('system-design') ||
    id.includes('scal') ||
    id.includes('latency') ||
    id.includes('acid') ||
    id.includes('consensus')
  ) {
    return 'distributedSystems'
  }

  if (id.includes('behavior') || id.includes('soft-skills')) {
    return 'behavioral'
  }

  if (id.includes('clean-code') || id.includes('clean_code')) {
    return 'cleanCode'
  }

  if (id.includes('pattern') || id.includes('refactor') || id.includes('solid')) {
    return 'codingPatterns'
  }

  if (id.includes('cto') || id.includes('leadership') || id.includes('management')) {
    return 'leadership'
  }

  return 'other'
}

function getSystemDesignTopicKey(
  id: string,
): keyof QuizFocusFilters['advanced']['systemDesignTopics'] {
  const normalizedId = id.toLowerCase()

  if (normalizedId.includes('database') || normalizedId.includes('api') || normalizedId.includes('service')) {
    return 'backendArchitecture'
  }

  if (
    normalizedId.includes('consistency') ||
    normalizedId.includes('consensus') ||
    normalizedId.includes('replica') ||
    normalizedId.includes('transaction')
  ) {
    return 'dataConsistency'
  }

  if (
    normalizedId.includes('reliability') ||
    normalizedId.includes('fault') ||
    normalizedId.includes('disaster') ||
    normalizedId.includes('recovery')
  ) {
    return 'reliability'
  }

  if (
    normalizedId.includes('latency') ||
    normalizedId.includes('throughput') ||
    normalizedId.includes('performance')
  ) {
    return 'performance'
  }

  return 'other'
}

function isQuestionAllowedByAdvancedFocus(question: QuizQuestionBankEntry): boolean {
  const id = question.id.toLowerCase()

  if (question.transcriptionQuestion) {
    const difficulty = question.difficulty === 'easy' || question.difficulty === 'medium' ? question.difficulty : 'hard'
    return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starVoiceTopics[difficulty]
  }

  if (isStarStoryQuestionId(question.id)) {
    if (isStarStoryMatchingQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.matching
    }

    if (isStarStoryTitleQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.title
    }

    if (isStarStorySectionOrderingQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.orderingSection
    }

    if (isStarStoryDualOrderingQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.orderingDual
    }

    if (isStarStoryQuadOrderingQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.orderingQuad
    }

    if (isStarStoryFullOrderingQuestion(question)) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.starStoriesTopics.orderingFull
    }

    return true
  }

  if (question.validList) {
    if (id.includes('reliability') || id.includes('incident') || id.includes('observability')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.validListTopics.reliability
    }

    if (id.includes('api') || id.includes('schema') || id.includes('cache') || id.includes('data')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.validListTopics.apiData
    }

    if (id.includes('distributed') || id.includes('query') || id.includes('idempot')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.validListTopics.distributedSystems
    }

    return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.validListTopics.other
  }

  if (question.orderItems) {
    if (id.includes('incident') || id.includes('release')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.orderItemsTopics.incidentRelease
    }

    if (id.includes('migration') || id.includes('failover') || id.includes('saga') || id.includes('api')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.orderItemsTopics.architectureFlow
    }

    return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.orderItemsTopics.other
  }

  if (question.capacityQuestion) {
    const unitLabel = question.capacityQuestion.unitLabel?.toLowerCase() ?? ''

    if (unitLabel.includes('qps') || unitLabel.includes('rps') || unitLabel.includes('writes/s')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics.throughput
    }

    if (unitLabel.includes('tb') || unitLabel.includes('gb') || unitLabel.includes('storage')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics.storage
    }

    if (unitLabel.includes('core') || unitLabel.includes('cpu')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics.compute
    }

    if (unitLabel.includes('mb/s') || unitLabel.includes('gb/s') || unitLabel.includes('bandwidth')) {
      return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics.networking
    }

    return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.capacityTopics.other
  }

  if (question.systemDesign || question.multiSectionSystemDesign) {
    const topic = getSystemDesignTopicKey(id)
    return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.systemDesignTopics[topic]
  }

  const topic = getMultipleChoiceTopicKey(question)
  return ACTIVE_QUIZ_FOCUS_FILTERS.advanced.multipleChoiceTopics[topic]
}

function isStarStoryQuestionId(id: string): boolean {
  return id.startsWith(STAR_STORY_QUESTION_ID_PREFIX)
}

function isStarStoryOrderingQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryQuestionId(question.id) && question.orderItems !== undefined
}

function isStarStoryFullOrderingQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryOrderingQuestion(question) && question.id.endsWith('-full-story-ordering')
}

function isStarStoryDualOrderingQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryOrderingQuestion(question) && question.id.includes('-dual-story-ordering-')
}

function isStarStoryQuadOrderingQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryOrderingQuestion(question) && question.id.includes('-quad-story-ordering-')
}

function isStarStorySectionOrderingQuestion(question: QuizQuestionBankEntry): boolean {
  return (
    isStarStoryOrderingQuestion(question) &&
    !isStarStoryFullOrderingQuestion(question) &&
    !isStarStoryDualOrderingQuestion(question) &&
    !isStarStoryQuadOrderingQuestion(question)
  )
}

function isStarStoryTitleQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryQuestionId(question.id) && question.id.endsWith('-file-title')
}

function isStarStoryMatchingQuestion(question: QuizQuestionBankEntry): boolean {
  return isStarStoryQuestionId(question.id) && question.orderItems === undefined && !isStarStoryTitleQuestion(question)
}

function truncateForFeedback(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`
}

function hasAvailableStarStoryQuestion(
  askedQuestionIds: Set<string>,
  options?: {
    requireOrdering?: boolean
    requireSectionOrdering?: boolean
    requireFullOrdering?: boolean
    requireDualOrdering?: boolean
    requireQuadOrdering?: boolean
    requireMatching?: boolean
    requireTitle?: boolean
  },
): boolean {
  if (!ACTIVE_QUIZ_FOCUS_FILTERS.starStories) {
    return false
  }

  let hasEligibleQuestion = false
  let hasUnseenEligibleQuestion = false

  for (const question of QUIZ_QUESTIONS_IN_RANDOM_ORDER) {
    if (!isStarStoryQuestionId(question.id)) {
      continue
    }

    if (!isQuestionAllowedByAdvancedFocus(question)) {
      continue
    }

    if (options?.requireOrdering && !isStarStoryOrderingQuestion(question)) {
      continue
    }

    if (options?.requireSectionOrdering && !isStarStorySectionOrderingQuestion(question)) {
      continue
    }

    if (options?.requireFullOrdering && !isStarStoryFullOrderingQuestion(question)) {
      continue
    }

    if (options?.requireDualOrdering && !isStarStoryDualOrderingQuestion(question)) {
      continue
    }

    if (options?.requireQuadOrdering && !isStarStoryQuadOrderingQuestion(question)) {
      continue
    }

    if (options?.requireMatching && !isStarStoryMatchingQuestion(question)) {
      continue
    }

    if (options?.requireTitle && !isStarStoryTitleQuestion(question)) {
      continue
    }

    hasEligibleQuestion = true
    if (!askedQuestionIds.has(question.id)) {
      hasUnseenEligibleQuestion = true
      break
    }
  }

  // Treat fully-seen eligible pools as available because exhausted pools are recycled on pick.
  return hasUnseenEligibleQuestion || hasEligibleQuestion
}

function isStarStoryQuestionSlot(
  questionPosition: number,
  askedQuestionIds: Set<string>,
  options?: {
    requireOrdering?: boolean
    requireSectionOrdering?: boolean
    requireFullOrdering?: boolean
    requireDualOrdering?: boolean
    requireQuadOrdering?: boolean
    requireMatching?: boolean
    requireTitle?: boolean
    interval: number
  },
): boolean {
  if ((options?.interval ?? 0) <= 0) {
    return false
  }

  if (questionPosition % (options?.interval ?? 1) !== 0) {
    return false
  }

  return hasAvailableStarStoryQuestion(askedQuestionIds, options)
}

function hasAvailableSystemDesignQuestion(askedQuestionIds: Set<string>): boolean {
  if (!ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign) {
    return false
  }

  let hasEligibleQuestion = false
  let hasUnseenEligibleQuestion = false

  for (const question of QUIZ_QUESTIONS_IN_RANDOM_ORDER) {
    if (question.systemDesign === undefined || !isQuestionAllowedByAdvancedFocus(question)) {
      continue
    }

    hasEligibleQuestion = true
    if (!askedQuestionIds.has(question.id)) {
      hasUnseenEligibleQuestion = true
      break
    }
  }

  // Treat fully-seen eligible pools as available because exhausted pools are recycled on pick.
  return hasUnseenEligibleQuestion || hasEligibleQuestion
}

function isSystemDesignQuestionSlot(questionPosition: number, askedQuestionIds: Set<string>): boolean {
  if (SYSTEM_DESIGN_QUESTION_INTERVAL <= 0) {
    return false
  }

  if (questionPosition % SYSTEM_DESIGN_QUESTION_INTERVAL !== 0) {
    return false
  }

  return hasAvailableSystemDesignQuestion(askedQuestionIds)
}

function hasAvailableMultiSectionSystemDesignQuestion(askedQuestionIds: Set<string>): boolean {
  if (!ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign) {
    return false
  }

  let hasEligibleQuestion = false
  let hasUnseenEligibleQuestion = false

  for (const question of QUIZ_QUESTIONS_IN_RANDOM_ORDER) {
    if (question.multiSectionSystemDesign === undefined || !isQuestionAllowedByAdvancedFocus(question)) {
      continue
    }

    hasEligibleQuestion = true
    if (!askedQuestionIds.has(question.id)) {
      hasUnseenEligibleQuestion = true
      break
    }
  }

  // Treat fully-seen eligible pools as available because exhausted pools are recycled on pick.
  return hasUnseenEligibleQuestion || hasEligibleQuestion
}

function isMultiSectionSystemDesignQuestionSlot(questionPosition: number, askedQuestionIds: Set<string>): boolean {
  if (MULTI_SECTION_SYSTEM_DESIGN_QUESTION_INTERVAL <= 0) {
    return false
  }

  if (questionPosition % MULTI_SECTION_SYSTEM_DESIGN_QUESTION_INTERVAL !== 0) {
    return false
  }

  return hasAvailableMultiSectionSystemDesignQuestion(askedQuestionIds)
}

function getTranscriptionPhaseForProblem(
  progress: TranscriptionAttemptProgress | undefined,
): QuizDifficulty {
  const easyAttempts = progress?.easy ?? 0
  const mediumAttempts = progress?.medium ?? 0

  if (easyAttempts < 2) {
    return 'easy'
  }

  if (mediumAttempts < 2) {
    return 'medium'
  }

  return 'hard'
}

function addSyntheticTranscriptionAskMarker(askedQuestionIds: Set<string>, questionId: string): void {
  let suffix = 1
  let marker = `__transcription__${questionId}#${suffix}`

  while (askedQuestionIds.has(marker)) {
    suffix += 1
    marker = `__transcription__${questionId}#${suffix}`
  }

  askedQuestionIds.add(marker)
}

const transcriptionRotationQueueByPoolKey = new Map<string, string[]>()
let lastTranscriptionQuestionId: string | null = null
let transcriptionProblemRotationQueue: string[] = []
let lastTranscriptionProblemId: string | null = null

export function getTranscriptionRotationState(): TranscriptionRotationState {
  const queuesByPoolKey: Record<string, string[]> = {}

  transcriptionRotationQueueByPoolKey.forEach((queue, poolKey) => {
    queuesByPoolKey[poolKey] = [...queue]
  })

  return {
    queuesByPoolKey,
    problemQueue: [...transcriptionProblemRotationQueue],
    lastProblemId: lastTranscriptionProblemId,
    lastQuestionId: lastTranscriptionQuestionId,
  }
}

export function setTranscriptionRotationState(state: TranscriptionRotationState | undefined): void {
  transcriptionRotationQueueByPoolKey.clear()
  lastTranscriptionQuestionId = null
  transcriptionProblemRotationQueue = []
  lastTranscriptionProblemId = null

  if (!state) {
    return
  }

  Object.entries(state.queuesByPoolKey).forEach(([poolKey, queue]) => {
    transcriptionRotationQueueByPoolKey.set(poolKey, [...queue])
  })

  if (Array.isArray(state.problemQueue)) {
    transcriptionProblemRotationQueue = [...state.problemQueue]
  }

  if (state.lastProblemId === null || typeof state.lastProblemId === 'string') {
    lastTranscriptionProblemId = state.lastProblemId ?? null
  }

  lastTranscriptionQuestionId = state.lastQuestionId
}

export function resetTranscriptionRotationState(): void {
  transcriptionRotationQueueByPoolKey.clear()
  transcriptionProblemRotationQueue = []
  lastTranscriptionProblemId = null
  lastTranscriptionQuestionId = null
}

function buildTranscriptionPoolKey(questions: QuizQuestionBankEntry[]): string {
  return questions
    .map((question) => question.id)
    .sort((left, right) => left.localeCompare(right))
    .join('|')
}

function pickTranscriptionQuestionFromPool(
  askedQuestionIds: Set<string>,
  questionPosition: number,
  totalAvailableQuestions: number,
  transcriptionProgressByProblem: TranscriptionAttemptProgressByProblem | undefined,
): QuizQuestion | null {
  if (!ACTIVE_QUIZ_FOCUS_FILTERS.starVoice) {
    return null
  }

  const transcriptionQuestions = QUIZ_QUESTIONS.filter(
    (question) => question.transcriptionQuestion !== undefined && isQuestionAllowedByAdvancedFocus(question),
  )
  if (transcriptionQuestions.length === 0) {
    return null
  }

  const progressByProblem = transcriptionProgressByProblem ?? {}
  const eligibleByProblem = new Map<string, QuizDifficulty>()
  const availableDifficultiesByProblem = new Map<string, Set<QuizDifficulty>>()

  transcriptionQuestions.forEach((question) => {
    const transcriptionMeta = question.transcriptionQuestion
    if (!transcriptionMeta) {
      return
    }

    const availableDifficulties =
      availableDifficultiesByProblem.get(transcriptionMeta.problemId) ?? new Set<QuizDifficulty>()
    availableDifficulties.add(toBaseQuizDifficulty(question.difficulty))
    availableDifficultiesByProblem.set(transcriptionMeta.problemId, availableDifficulties)
  })

  transcriptionQuestions.forEach((question) => {
    const transcriptionMeta = question.transcriptionQuestion
    if (!transcriptionMeta) {
      return
    }

    if (eligibleByProblem.has(transcriptionMeta.problemId)) {
      return
    }

    const preferredPhase = getTranscriptionPhaseForProblem(progressByProblem[transcriptionMeta.problemId])
    const availableDifficulties = availableDifficultiesByProblem.get(transcriptionMeta.problemId)

    if (availableDifficulties?.has(preferredPhase)) {
      eligibleByProblem.set(transcriptionMeta.problemId, preferredPhase)
      return
    }

    if (availableDifficulties?.has('hard')) {
      eligibleByProblem.set(transcriptionMeta.problemId, 'hard')
      return
    }

    // Graceful fallback for any custom pools that omit one or more phases.
    if (availableDifficulties?.has('medium')) {
      eligibleByProblem.set(transcriptionMeta.problemId, 'medium')
      return
    }

    eligibleByProblem.set(transcriptionMeta.problemId, 'easy')
  })

  const eligibleQuestions = transcriptionQuestions.filter((question) => {
    const transcriptionMeta = question.transcriptionQuestion
    if (!transcriptionMeta) {
      return false
    }

    return question.difficulty === eligibleByProblem.get(transcriptionMeta.problemId)
  })

  if (eligibleQuestions.length === 0) {
    return null
  }

  const questionsByProblemId = new Map<string, QuizQuestionBankEntry>()
  eligibleQuestions.forEach((question) => {
    const problemId = question.transcriptionQuestion?.problemId
    if (!problemId) {
      return
    }

    questionsByProblemId.set(problemId, question)
  })

  const eligibleProblemIds = Array.from(questionsByProblemId.keys())
  if (eligibleProblemIds.length === 0) {
    return null
  }

  if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
    console.info('[STAR Transcription][Picker] Eligible problems', {
      eligibleProblemCount: eligibleProblemIds.length,
      eligibleProblemIds,
      existingQueue: [...transcriptionProblemRotationQueue],
      lastProblemId: lastTranscriptionProblemId,
    })
  }

  transcriptionProblemRotationQueue = transcriptionProblemRotationQueue.filter((problemId) =>
    questionsByProblemId.has(problemId),
  )

  if (transcriptionProblemRotationQueue.length === 0) {
    transcriptionProblemRotationQueue = shuffleItems(eligibleProblemIds)

    if (
      transcriptionProblemRotationQueue.length > 1 &&
      lastTranscriptionProblemId &&
      transcriptionProblemRotationQueue[0] === lastTranscriptionProblemId
    ) {
      const firstProblemId = transcriptionProblemRotationQueue.shift()
      if (firstProblemId) {
        transcriptionProblemRotationQueue.push(firstProblemId)
      }
    }
  }

  const selectedProblemId = transcriptionProblemRotationQueue.shift()
  if (!selectedProblemId) {
    return null
  }

  let nextSelectedProblemId = selectedProblemId

  // Hard guard: never repeat the immediate previous STAR story if alternatives exist.
  if (eligibleProblemIds.length > 1 && nextSelectedProblemId === lastTranscriptionProblemId) {
    transcriptionProblemRotationQueue.push(nextSelectedProblemId)
    const rotatedProblemId = transcriptionProblemRotationQueue.shift()
    if (rotatedProblemId) {
      nextSelectedProblemId = rotatedProblemId
    }
  }

  lastTranscriptionProblemId = nextSelectedProblemId
  const selectedQuestion = questionsByProblemId.get(nextSelectedProblemId)
  if (!selectedQuestion) {
    return null
  }

  if (eligibleQuestions.length > 1 && selectedQuestion.id === lastTranscriptionQuestionId) {
    transcriptionProblemRotationQueue.push(nextSelectedProblemId)
    const rotatedProblemId = transcriptionProblemRotationQueue.shift()
    if (!rotatedProblemId) {
      return null
    }

    const rotatedQuestion = questionsByProblemId.get(rotatedProblemId)
    if (!rotatedQuestion) {
      return null
    }

    lastTranscriptionProblemId = rotatedProblemId

    if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
      console.info('[STAR Transcription][Picker] Avoided immediate repeat', {
        previousQuestionId: lastTranscriptionQuestionId,
        rotatedToProblemId: rotatedProblemId,
        rotatedToQuestionId: rotatedQuestion.id,
      })
    }

    // Keep legacy queue data updated for backward compatibility with old saves.
    const poolKey = buildTranscriptionPoolKey(eligibleQuestions)
    transcriptionRotationQueueByPoolKey.set(
      poolKey,
      transcriptionProblemRotationQueue
        .map((problemId) => questionsByProblemId.get(problemId)?.id)
        .filter((questionId): questionId is string => typeof questionId === 'string'),
    )

    lastTranscriptionQuestionId = rotatedQuestion.id
    addSyntheticTranscriptionAskMarker(askedQuestionIds, rotatedQuestion.id)

    return {
      ...rotatedQuestion,
      kind: 'transcription',
      questionIndex: questionPosition,
      totalQuestions: totalAvailableQuestions,
      seenQuestionsBeforeCurrent: questionPosition - 1,
    }
  }

  if (STAR_TRANSCRIPTION_DEBUG_LOGGING) {
    console.info('[STAR Transcription][Picker] Selected', {
      selectedProblemId: nextSelectedProblemId,
      selectedQuestionId: selectedQuestion.id,
      remainingQueue: [...transcriptionProblemRotationQueue],
    })
  }

  // Keep legacy queue data updated for backward compatibility with old saves.
  const poolKey = buildTranscriptionPoolKey(eligibleQuestions)
  transcriptionRotationQueueByPoolKey.set(
    poolKey,
    transcriptionProblemRotationQueue
      .map((problemId) => questionsByProblemId.get(problemId)?.id)
      .filter((questionId): questionId is string => typeof questionId === 'string'),
  )

  lastTranscriptionQuestionId = selectedQuestion.id
  addSyntheticTranscriptionAskMarker(askedQuestionIds, selectedQuestion.id)

  return {
    ...selectedQuestion,
    kind: 'transcription',
    questionIndex: questionPosition,
    totalQuestions: totalAvailableQuestions,
    seenQuestionsBeforeCurrent: questionPosition - 1,
  }
}

function toQuestionKind(question: QuizQuestionBankEntry): QuizQuestionKind {
  return question.transcriptionQuestion
    ? 'transcription'
    : question.multiSectionSystemDesign
      ? 'multiSectionSystemDesign'
    : question.systemDesign
    ? 'systemDesign'
    : question.leetcodePatternTypeQuestion
      ? 'leetcodePatternType'
    : question.capacityQuestion
      ? 'capacity'
      : question.orderItems
        ? 'orderItems'
        : question.validList
          ? 'validList'
          : 'multipleChoice'
}

function recycleSeenQuestionIdsIfExhausted(
  askedQuestionIds: Set<string>,
  isEligibleQuestion: (question: QuizQuestionBankEntry) => boolean,
): boolean {
  const eligibleQuestionIds = QUIZ_QUESTIONS_IN_RANDOM_ORDER.filter(isEligibleQuestion).map((question) => question.id)
  if (eligibleQuestionIds.length === 0) {
    return false
  }

  const allEligibleAlreadySeen = eligibleQuestionIds.every((questionId) => askedQuestionIds.has(questionId))
  if (!allEligibleAlreadySeen) {
    return false
  }

  eligibleQuestionIds.forEach((questionId) => {
    askedQuestionIds.delete(questionId)
  })

  return true
}

function pickQuestionFromPool(
  fallbackOrder: QuizDifficulty[],
  askedQuestionIds: Set<string>,
  questionPosition: number,
  totalAvailableQuestions: number,
  options?: {
    excludeKind?: QuizQuestionKind
    allowMultiSectionSystemDesign?: boolean
    requireStarStory?: boolean
    requireStarStoryOrdering?: boolean
    requireStarStorySectionOrdering?: boolean
    requireStarStoryFullOrdering?: boolean
    requireStarStoryDualOrdering?: boolean
    requireStarStoryQuadOrdering?: boolean
    requireStarStoryMatching?: boolean
    requireStarStoryTitle?: boolean
  },
): QuizQuestion | null {
  const allowedDifficultySet = new Set<QuizDifficulty>(fallbackOrder)

  const isEligibleQuestion = (question: QuizQuestionBankEntry, difficulty: QuizDifficulty): boolean => {
      if (question.transcriptionQuestion) return false
      if (!isQuestionAllowedByFocusFilters(question)) return false
      if (!isQuestionAllowedByAdvancedFocus(question)) return false
      if (toBaseQuizDifficulty(question.difficulty) !== difficulty) return false
      if (options?.allowMultiSectionSystemDesign === false && question.multiSectionSystemDesign) return false

      const isStarStoryQuestion = isStarStoryQuestionId(question.id)
      if (options?.requireStarStory && !isStarStoryQuestion) {
        return false
      }

      if (options?.requireStarStoryOrdering && !isStarStoryOrderingQuestion(question)) {
        return false
      }

      if (options?.requireStarStorySectionOrdering && !isStarStorySectionOrderingQuestion(question)) {
        return false
      }

      if (options?.requireStarStoryFullOrdering && !isStarStoryFullOrderingQuestion(question)) {
        return false
      }

      if (options?.requireStarStoryDualOrdering && !isStarStoryDualOrderingQuestion(question)) {
        return false
      }

      if (options?.requireStarStoryQuadOrdering && !isStarStoryQuadOrderingQuestion(question)) {
        return false
      }

      if (options?.requireStarStoryMatching && !isStarStoryMatchingQuestion(question)) {
        return false
      }

      if (options?.requireStarStoryTitle && !isStarStoryTitleQuestion(question)) {
        return false
      }

      if (!options?.requireStarStory && options?.excludeKind) {
        const kind = toQuestionKind(question)
        if (kind === options.excludeKind) {
          return false
        }
      }

      return true
  }

  const pickFromPool = (): QuizQuestion | null => {
    for (const difficulty of fallbackOrder) {
      const pool = QUIZ_QUESTIONS_IN_RANDOM_ORDER.filter(
        (question) => isEligibleQuestion(question, difficulty) && !askedQuestionIds.has(question.id),
      )

      if (pool.length > 0) {
        const questionEntry = pool[0]
        const question = shuffleQuestionOptions(questionEntry)
        askedQuestionIds.add(question.id)
        return {
          ...question,
          kind: toQuestionKind(questionEntry),
          questionIndex: questionPosition,
          totalQuestions: totalAvailableQuestions,
          seenQuestionsBeforeCurrent: questionPosition - 1,
        }
      }
    }

    return null
  }

  const initialPick = pickFromPool()
  if (initialPick) {
    return initialPick
  }

  const recycledSeenIds = recycleSeenQuestionIdsIfExhausted(
    askedQuestionIds,
    (question) => isEligibleQuestion(question, toBaseQuizDifficulty(question.difficulty)) &&
      allowedDifficultySet.has(toBaseQuizDifficulty(question.difficulty)),
  )

  if (!recycledSeenIds) {
    return null
  }

  return pickFromPool()
}

function pickSystemDesignQuestionFromPool(
  fallbackOrder: QuizDifficulty[],
  askedQuestionIds: Set<string>,
  questionPosition: number,
  totalAvailableQuestions: number,
): QuizQuestion | null {
  const isEligibleSystemDesignQuestion = (question: QuizQuestionBankEntry, difficulty: QuizDifficulty): boolean =>
        isQuestionAllowedByFocusFilters(question) &&
        isQuestionAllowedByAdvancedFocus(question) &&
        toBaseQuizDifficulty(question.difficulty) === difficulty &&
        question.systemDesign !== undefined

  const pickFromPool = (): QuizQuestion | null => {
    for (const difficulty of fallbackOrder) {
      const pool = QUIZ_QUESTIONS_IN_RANDOM_ORDER.filter(
        (question) => isEligibleSystemDesignQuestion(question, difficulty) && !askedQuestionIds.has(question.id),
      )

      if (pool.length > 0) {
        const questionEntry = pool[0]
        const question = shuffleQuestionOptions(questionEntry)
        askedQuestionIds.add(question.id)
        return {
          ...question,
          kind: toQuestionKind(questionEntry),
          questionIndex: questionPosition,
          totalQuestions: totalAvailableQuestions,
          seenQuestionsBeforeCurrent: questionPosition - 1,
        }
      }
    }

    return null
  }

  const initialPick = pickFromPool()
  if (initialPick) {
    return initialPick
  }

  const difficultySet = new Set<QuizDifficulty>(fallbackOrder)
  const recycledSeenIds = recycleSeenQuestionIdsIfExhausted(
    askedQuestionIds,
    (question) =>
      difficultySet.has(toBaseQuizDifficulty(question.difficulty)) &&
      isEligibleSystemDesignQuestion(question, toBaseQuizDifficulty(question.difficulty)),
  )

  if (!recycledSeenIds) {
    return null
  }

  return pickFromPool()
}

function pickMultiSectionSystemDesignQuestionFromPool(
  fallbackOrder: QuizDifficulty[],
  askedQuestionIds: Set<string>,
  questionPosition: number,
  totalAvailableQuestions: number,
): QuizQuestion | null {
  const isEligibleMultiSectionSystemDesignQuestion = (
    question: QuizQuestionBankEntry,
    difficulty: QuizDifficulty,
  ): boolean =>
        isQuestionAllowedByFocusFilters(question) &&
        isQuestionAllowedByAdvancedFocus(question) &&
        toBaseQuizDifficulty(question.difficulty) === difficulty &&
        question.multiSectionSystemDesign !== undefined

  const pickFromPool = (): QuizQuestion | null => {
    for (const difficulty of fallbackOrder) {
      const pool = QUIZ_QUESTIONS_IN_RANDOM_ORDER.filter(
        (question) =>
          isEligibleMultiSectionSystemDesignQuestion(question, difficulty) && !askedQuestionIds.has(question.id),
      )

      if (pool.length > 0) {
        const questionEntry = pool[0]
        const question = shuffleQuestionOptions(questionEntry)
        askedQuestionIds.add(question.id)
        return {
          ...question,
          kind: toQuestionKind(questionEntry),
          questionIndex: questionPosition,
          totalQuestions: totalAvailableQuestions,
          seenQuestionsBeforeCurrent: questionPosition - 1,
        }
      }
    }

    return null
  }

  const initialPick = pickFromPool()
  if (initialPick) {
    return initialPick
  }

  const difficultySet = new Set<QuizDifficulty>(fallbackOrder)
  const recycledSeenIds = recycleSeenQuestionIdsIfExhausted(
    askedQuestionIds,
    (question) =>
      difficultySet.has(toBaseQuizDifficulty(question.difficulty)) &&
      isEligibleMultiSectionSystemDesignQuestion(question, toBaseQuizDifficulty(question.difficulty)),
  )

  if (!recycledSeenIds) {
    return null
  }

  return pickFromPool()
}

function countRuntimeQuestionAvailability(runtimeBanks: Map<string, RuntimeQuestionBankState>): AvailabilityByDifficulty {
  const counts = createEmptyAvailability()

  runtimeBanks.forEach(({ category, questions }) => {
    questions.forEach((question) => {
      const baseDifficulty = toBaseQuizDifficulty(question.difficulty)
      counts[baseDifficulty][category] = (counts[baseDifficulty][category] ?? 0) + 1
    })
  })

  return counts
}

const rawEasyQuestionBanks = import.meta.glob('./easyQuestions/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawEasyOofnQuestionBanks = import.meta.glob('./oofnquestions/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawEasyValidListQuestionBanks = import.meta.glob('./validList/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawEasyOrderItemsQuestionBanks = import.meta.glob('./orderItems/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawEasyLeetcodePatternTypeQuestionBanks = import.meta.glob('./rawCodeTypeQuestions/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawEasyCapacityQuestionBanks = import.meta.glob('./capacityQuestions/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

const rawMediumQuestionBanks = import.meta.glob('./mediumQuestions/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumOofnQuestionBanks = import.meta.glob('./oofnquestions/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumValidListQuestionBanks = import.meta.glob('./validList/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumOrderItemsQuestionBanks = import.meta.glob('./orderItems/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumLeetcodePatternTypeQuestionBanks = import.meta.glob('./rawCodeTypeQuestions/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumCapacityQuestionBanks = import.meta.glob('./capacityQuestions/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

const rawHardQuestionBanks = import.meta.glob('./hardQuestions/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardOofnQuestionBanks = import.meta.glob('./oofnquestions/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawCtoQuestionBanks = import.meta.glob('./ctoQuestions/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardValidListQuestionBanks = import.meta.glob('./validList/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardOrderItemsQuestionBanks = import.meta.glob('./orderItems/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardLeetcodePatternTypeQuestionBanks = import.meta.glob('./rawCodeTypeQuestions/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardCapacityQuestionBanks = import.meta.glob('./capacityQuestions/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

const rawEasySystemDesignBanks = import.meta.glob('./systemDesignMinigame/easy/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawMediumSystemDesignBanks = import.meta.glob('./systemDesignMinigame/medium/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardSystemDesignBanks = import.meta.glob('./systemDesignMinigame/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>
const rawHardMultiSectionSystemDesignBanks = import.meta.glob('./multiSectionSystemDesign/hard/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

const allEasyQuestionBanks = {
  ...rawEasyQuestionBanks,
  ...rawEasyOofnQuestionBanks,
  ...rawEasyValidListQuestionBanks,
  ...rawEasyOrderItemsQuestionBanks,
  ...rawEasyLeetcodePatternTypeQuestionBanks,
  ...rawEasyCapacityQuestionBanks,
  ...rawEasySystemDesignBanks,
}

const allMediumQuestionBanks = {
  ...rawMediumQuestionBanks,
  ...rawMediumOofnQuestionBanks,
  ...rawMediumValidListQuestionBanks,
  ...rawMediumOrderItemsQuestionBanks,
  ...rawMediumLeetcodePatternTypeQuestionBanks,
  ...rawMediumCapacityQuestionBanks,
  ...rawMediumSystemDesignBanks,
}

const allHardQuestionBanks = {
  ...rawHardQuestionBanks,
  ...rawHardOofnQuestionBanks,
  ...rawCtoQuestionBanks,
  ...rawHardValidListQuestionBanks,
  ...rawHardOrderItemsQuestionBanks,
  ...rawHardLeetcodePatternTypeQuestionBanks,
  ...rawHardCapacityQuestionBanks,
  ...rawHardSystemDesignBanks,
  ...rawHardMultiSectionSystemDesignBanks,
}

const STATIC_QUIZ_QUESTIONS: QuizQuestionBankEntry[] = logAndRemoveDuplicateQuestions(
  normalizeQuestionBank([
    ...Object.values(allEasyQuestionBanks).flatMap((entry) => (Array.isArray(entry) ? entry : [])),
    ...Object.values(allMediumQuestionBanks).flatMap((entry) => (Array.isArray(entry) ? entry : [])),
    ...Object.values(allHardQuestionBanks).flatMap((entry) => (Array.isArray(entry) ? entry : [])),
  ]),
)
const STATIC_QUIZ_QUESTION_AVAILABILITY: AvailabilityByDifficulty = {
  easy: countQuestionsByCategory(allEasyQuestionBanks, 'easy'),
  medium: countQuestionsByCategory(allMediumQuestionBanks, 'medium'),
  hard: countQuestionsByCategory(allHardQuestionBanks, 'hard'),
}
const STATIC_QUIZ_QUESTIONS_LOADED_TOTAL = sumCategoryCounts(STATIC_QUIZ_QUESTION_AVAILABILITY.easy) +
  sumCategoryCounts(STATIC_QUIZ_QUESTION_AVAILABILITY.medium) +
  sumCategoryCounts(STATIC_QUIZ_QUESTION_AVAILABILITY.hard)

const RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS = new Map<string, RuntimeQuestionBankState>()

let QUIZ_QUESTIONS: QuizQuestionBankEntry[] = STATIC_QUIZ_QUESTIONS
let QUIZ_QUESTIONS_IN_RANDOM_ORDER: QuizQuestionBankEntry[] = shuffleItems(QUIZ_QUESTIONS)
let QUIZ_QUESTION_AVAILABILITY: AvailabilityByDifficulty = STATIC_QUIZ_QUESTION_AVAILABILITY
let QUIZ_QUESTIONS_LOADED_TOTAL = STATIC_QUIZ_QUESTIONS_LOADED_TOTAL
let QUIZ_QUESTIONS_UNIQUE_BY_DIFFICULTY: Record<QuizDifficulty, number> = {
  easy: QUIZ_QUESTIONS.filter((question) => question.difficulty === 'easy').length,
  medium: QUIZ_QUESTIONS.filter((question) => question.difficulty === 'medium').length,
  hard: QUIZ_QUESTIONS.filter((question) => toBaseQuizDifficulty(question.difficulty) === 'hard').length,
}

logQuestionAvailabilityOnLaunch(QUIZ_QUESTION_AVAILABILITY, QUIZ_QUESTIONS.length)

function refreshRuntimeQuizState(): void {
  const runtimeQuestionEntries = Array.from(RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.values()).flatMap(
    (bank) => bank.questions,
  )
  const runtimeAvailability = countRuntimeQuestionAvailability(RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS)

  QUIZ_QUESTIONS = logAndRemoveDuplicateQuestions(
    normalizeQuestionBank([
      ...STATIC_QUIZ_QUESTIONS,
      ...runtimeQuestionEntries,
    ]),
  )
  QUIZ_QUESTIONS_IN_RANDOM_ORDER = shuffleItems(QUIZ_QUESTIONS)
  QUIZ_QUESTION_AVAILABILITY = mergeAvailability(STATIC_QUIZ_QUESTION_AVAILABILITY, runtimeAvailability)
  QUIZ_QUESTIONS_LOADED_TOTAL = STATIC_QUIZ_QUESTIONS_LOADED_TOTAL +
    sumCategoryCounts(runtimeAvailability.easy) +
    sumCategoryCounts(runtimeAvailability.medium) +
    sumCategoryCounts(runtimeAvailability.hard)
  QUIZ_QUESTIONS_UNIQUE_BY_DIFFICULTY = {
    easy: QUIZ_QUESTIONS.filter((question) => question.difficulty === 'easy').length,
    medium: QUIZ_QUESTIONS.filter((question) => question.difficulty === 'medium').length,
    hard: QUIZ_QUESTIONS.filter((question) => toBaseQuizDifficulty(question.difficulty) === 'hard').length,
  }

  if (STAR_WORKFLOW_DEBUG_LOGGING) {
    const transcriptionQuestions = QUIZ_QUESTIONS.filter((question) => question.transcriptionQuestion !== undefined)
    const transcriptionProblemIds = Array.from(
      new Set(
        transcriptionQuestions
          .map((question) => question.transcriptionQuestion?.problemId)
          .filter((problemId): problemId is string => typeof problemId === 'string'),
      ),
    )

    console.info('[STAR Workflow][QuizManager] Runtime state refreshed', {
      staticQuestionCount: STATIC_QUIZ_QUESTIONS.length,
      runtimeQuestionCount: runtimeQuestionEntries.length,
      mergedQuestionCount: QUIZ_QUESTIONS.length,
      runtimeBankKeys: Array.from(RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.keys()),
      transcriptionQuestionCount: transcriptionQuestions.length,
      transcriptionProblemCount: transcriptionProblemIds.length,
      transcriptionProblemIds,
    })
  }

  logQuestionAvailabilityOnLaunch(QUIZ_QUESTION_AVAILABILITY, QUIZ_QUESTIONS.length)
}

export function setRuntimeQuizQuestionBank(
  sourceKey: string,
  questions: RuntimeQuizQuestionBankEntry[],
  category = sourceKey,
): void {
  if (STAR_WORKFLOW_DEBUG_LOGGING) {
    const transcriptionQuestions = questions.filter((question) => question.transcriptionQuestion !== undefined)
    const transcriptionProblemIds = Array.from(
      new Set(
        transcriptionQuestions
          .map((question) => question.transcriptionQuestion?.problemId)
          .filter((problemId): problemId is string => typeof problemId === 'string'),
      ),
    )

    console.info('[STAR Workflow][QuizManager] setRuntimeQuizQuestionBank called', {
      sourceKey,
      category,
      inputQuestionCount: questions.length,
      transcriptionQuestionCount: transcriptionQuestions.length,
      transcriptionProblemCount: transcriptionProblemIds.length,
      transcriptionProblemIds,
    })
  }

  if (questions.length === 0) {
    RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.delete(sourceKey)
    refreshRuntimeQuizState()
    return
  }

  RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.set(sourceKey, {
    category,
    questions: normalizeQuestionBank(questions),
  })
  refreshRuntimeQuizState()
}

export function setRuntimeMultipleChoiceQuestionBank(
  sourceKey: string,
  questions: RuntimeQuizQuestionBankEntry[],
  category = sourceKey,
): void {
  setRuntimeQuizQuestionBank(sourceKey, questions, category)
}

export function clearRuntimeMultipleChoiceQuestionBank(sourceKey: string): void {
  if (!RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.has(sourceKey)) {
    return
  }

  RUNTIME_MULTIPLE_CHOICE_QUESTION_BANKS.delete(sourceKey)
  refreshRuntimeQuizState()
}

const QUIZ_RAMP_SETTINGS = rawRampSettings as QuizRampSettings

const QUIZ_DIFFICULTY_CONTEXT: Record<QuizDifficulty, string> = {
  easy: 'At the easy tier, the right answer is usually the mechanism that most directly improves reliability, latency, or scalability without introducing unnecessary complexity.',
  medium:
    'At the medium tier, the question is usually testing whether you can identify the main operational tradeoff, not just recall a definition. The correct answer should solve the dominant bottleneck or failure mode in the prompt.',
  hard:
    'At the hard tier, the right answer typically reflects a deeper distributed-systems constraint such as coordination cost, replica divergence, tail latency amplification, or failure semantics under concurrency.',
}

const QUIZ_TAKEAWAY_CONTEXT: Record<QuizDifficulty, string> = {
  easy: 'A useful habit is to ask which component most directly reduces load, contains failure, or improves user-perceived response time.',
  medium:
    'A useful design habit is to separate the primary system behavior from secondary details: look for the answer that addresses the core scaling or reliability concern first.',
  hard:
    'A useful advanced habit is to ask what hidden coordination, ordering, or consistency cost the system is really paying and which answer most honestly addresses that tradeoff.',
}

function getTargetDifficulty(correctAnswers: number): QuizDifficulty {
  if (correctAnswers >= QUIZ_RAMP_SETTINGS.mediumUntilCorrectAnswers) {
    return 'hard'
  }

  if (correctAnswers >= QUIZ_RAMP_SETTINGS.easyUntilCorrectAnswers) {
    return 'medium'
  }

  return 'easy'
}

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const temp = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = temp
  }

  return shuffled
}

function shuffleQuestionOptions(question: QuizQuestionBankEntry): QuizQuestion {
  if (question.validList || question.orderItems || question.capacityQuestion || question.transcriptionQuestion) {
    return {
      ...question,
    }
  }

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

  if (question.systemDesign) {
    const optionEntries = shuffleEntries(
      question.options.map((option, index) => ({
        value: option,
        isCorrect: index === question.correctIndex,
      })),
    )

    return {
      ...question,
      options: optionEntries.map((entry) => entry.value),
      correctIndex: optionEntries.findIndex((entry) => entry.isCorrect),
    }
  }

  if (question.multiSectionSystemDesign) {
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

  const optionEntries = shuffleEntries(
    question.options.map((option, index) => ({
      value: option,
      isCorrect: index === question.correctIndex,
    })),
  )

  return {
    ...question,
    options: optionEntries.map((entry) => entry.value),
    correctIndex: optionEntries.findIndex((entry) => entry.isCorrect),
  }
}

export function getNextQuizQuestion(
  correctAnswers: number,
  askedQuestionIds: Set<string>,
  excludeKind?: QuizQuestionKind,
  transcriptionProgressByProblem?: TranscriptionAttemptProgressByProblem,
  rawCodingFrequencyMultiplier = 1,
): QuizQuestion | null {
  if (QUIZ_QUESTIONS.length === 0) {
    throw new Error('Quiz question bank is empty. Check src/quiz/systemDesignQuestions.ts')
  }

  const questionPosition = askedQuestionIds.size + 1
  const totalAvailableQuestions = QUIZ_QUESTIONS.length + getRawCodingQuestionCount()
  const targetDifficulty = getTargetDifficulty(correctAnswers)
  const fallbackOrder: QuizDifficulty[] =
    targetDifficulty === 'hard'
      ? ['hard', 'medium']
      : targetDifficulty === 'medium'
        ? ['medium', 'hard']
        : ['easy', 'medium', 'hard']

  if (ACTIVE_QUIZ_FOCUS_FILTERS.micOnlyMode) {
    return pickTranscriptionQuestionFromPool(
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      transcriptionProgressByProblem,
    )
  }

  const maybePickHardSpecialStarStoryReplacement = (): QuizQuestion | null => {
    if (targetDifficulty !== 'hard') {
      return null
    }

    const roll = Math.random()

    const pickQuadOrdering = (): QuizQuestion | null => {
      if (!hasAvailableStarStoryQuestion(askedQuestionIds, { requireQuadOrdering: true })) {
        return null
      }

      return pickQuestionFromPool(
        fallbackOrder,
        askedQuestionIds,
        questionPosition,
        totalAvailableQuestions,
        { requireStarStory: true, requireStarStoryQuadOrdering: true },
      )
    }

    const pickDualOrdering = (): QuizQuestion | null => {
      if (!hasAvailableStarStoryQuestion(askedQuestionIds, { requireDualOrdering: true })) {
        return null
      }

      return pickQuestionFromPool(
        fallbackOrder,
        askedQuestionIds,
        questionPosition,
        totalAvailableQuestions,
        { requireStarStory: true, requireStarStoryDualOrdering: true },
      )
    }

    const pickFullOrdering = (): QuizQuestion | null => {
      if (!hasAvailableStarStoryQuestion(askedQuestionIds, { requireFullOrdering: true })) {
        return null
      }

      return pickQuestionFromPool(
        fallbackOrder,
        askedQuestionIds,
        questionPosition,
        totalAvailableQuestions,
        { requireStarStory: true, requireStarStoryFullOrdering: true },
      )
    }

    if (roll < STAR_STORY_HARD_QUAD_ORDERING_REPLACEMENT_RATE) {
      return pickQuadOrdering() ?? pickDualOrdering() ?? pickFullOrdering()
    }

    if (roll < STAR_STORY_HARD_QUAD_ORDERING_REPLACEMENT_RATE + STAR_STORY_HARD_DUAL_ORDERING_REPLACEMENT_RATE) {
      return pickDualOrdering() ?? pickQuadOrdering() ?? pickFullOrdering()
    }

    if (
      roll <
      STAR_STORY_HARD_QUAD_ORDERING_REPLACEMENT_RATE +
        STAR_STORY_HARD_DUAL_ORDERING_REPLACEMENT_RATE +
        STAR_STORY_HARD_FULL_ORDERING_REPLACEMENT_RATE
    ) {
      return pickFullOrdering() ?? pickDualOrdering() ?? pickQuadOrdering()
    }

    return null
  }

  const maybePickTranscriptionForStarStorySlot = (): QuizQuestion | null => {
    if (Math.random() >= STAR_STORY_TRANSCRIPTION_REPLACEMENT_RATE) {
      return null
    }

    return pickTranscriptionQuestionFromPool(
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      transcriptionProgressByProblem,
    )
  }

  const isRawCodingPrimarySlot = questionPosition % RAW_CODING_PRIMARY_QUESTION_INTERVAL === 0
  const isRawCodingCollisionSlot = questionPosition % RAW_CODING_COLLISION_QUESTION_INTERVAL === 0
  const normalizedRawCodingFrequencyMultiplier = Math.max(1, rawCodingFrequencyMultiplier)

  const maybePickRawCodingQuestion = (): QuizQuestion | null => {
    if (!ACTIVE_QUIZ_FOCUS_FILTERS.rawCode) {
      return null
    }

    return getNextRawCodingQuestion({
      questionPosition,
      fallbackOrder,
      askedQuestionIds,
      totalAvailableQuestions,
      forcePick: true,
      allowedSources: ACTIVE_QUIZ_FOCUS_FILTERS.advanced.rawCodeSources,
      allowedLiveCodeTopics: ACTIVE_QUIZ_FOCUS_FILTERS.advanced.rawCodeLiveCodeTopics,
    })
  }

  const pickSystemDesignQuestion = (): QuizQuestion | null => {
    if (!ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign) {
      return null
    }

    return pickSystemDesignQuestionFromPool(fallbackOrder, askedQuestionIds, questionPosition, totalAvailableQuestions)
  }

  const pickMultiSectionSystemDesignQuestion = (): QuizQuestion | null => {
    if (!ACTIVE_QUIZ_FOCUS_FILTERS.systemDesign) {
      return null
    }

    return pickMultiSectionSystemDesignQuestionFromPool(
      fallbackOrder,
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
    )
  }

  const pickStarStoryTitleCadenceQuestion = (): QuizQuestion | null => {
    const transcriptionQuestion = maybePickTranscriptionForStarStorySlot()
    if (transcriptionQuestion) {
      return transcriptionQuestion
    }

    const hardReplacementQuestion = maybePickHardSpecialStarStoryReplacement()
    if (hardReplacementQuestion) {
      return hardReplacementQuestion
    }

    return pickQuestionFromPool(
      fallbackOrder,
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      { requireStarStory: true, requireStarStoryTitle: true },
    )
  }

  const pickStarStorySectionOrderingCadenceQuestion = (): QuizQuestion | null => {
    const transcriptionQuestion = maybePickTranscriptionForStarStorySlot()
    if (transcriptionQuestion) {
      return transcriptionQuestion
    }

    const hardReplacementQuestion = maybePickHardSpecialStarStoryReplacement()
    if (hardReplacementQuestion) {
      return hardReplacementQuestion
    }

    return pickQuestionFromPool(
      fallbackOrder,
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      { requireStarStory: true, requireStarStorySectionOrdering: true },
    )
  }

  const pickStarStoryMatchingCadenceQuestion = (): QuizQuestion | null => {
    const transcriptionQuestion = maybePickTranscriptionForStarStorySlot()
    if (transcriptionQuestion) {
      return transcriptionQuestion
    }

    const hardReplacementQuestion = maybePickHardSpecialStarStoryReplacement()
    if (hardReplacementQuestion) {
      return hardReplacementQuestion
    }

    return pickQuestionFromPool(
      fallbackOrder,
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      { requireStarStory: true, requireStarStoryMatching: true },
    )
  }

  const pickCadenceSpecialQuestionByType = (
    cadenceType: CadenceSpecialQuestionType,
  ): QuizQuestion | null => {
    switch (cadenceType) {
      case 'starStoryTitle':
        return pickStarStoryTitleCadenceQuestion()
      case 'starStorySectionOrdering':
        return pickStarStorySectionOrderingCadenceQuestion()
      case 'starStoryMatching':
        return pickStarStoryMatchingCadenceQuestion()
      case 'systemDesign':
        return pickSystemDesignQuestion()
      case 'multiSectionSystemDesign':
        return pickMultiSectionSystemDesignQuestion()
      case 'rawCoding':
        return maybePickRawCodingQuestion()
      default:
        return null
    }
  }

  const cadenceDueSpecialTypes: CadenceSpecialQuestionType[] = []

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireTitle: true,
      interval: STAR_STORY_TITLE_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueSpecialTypes.push('starStoryTitle')
  }

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireSectionOrdering: true,
      interval: STAR_STORY_ORDERING_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueSpecialTypes.push('starStorySectionOrdering')
  }

  if (
    isStarStoryQuestionSlot(questionPosition, askedQuestionIds, {
      requireMatching: true,
      interval: STAR_STORY_MATCHING_QUESTION_INTERVAL,
    })
  ) {
    cadenceDueSpecialTypes.push('starStoryMatching')
  }

  const systemDesignAvailable = hasAvailableSystemDesignQuestion(askedQuestionIds)
  const multiSectionSystemDesignAvailable = hasAvailableMultiSectionSystemDesignQuestion(askedQuestionIds)
  const rawCodingAvailable = ACTIVE_QUIZ_FOCUS_FILTERS.rawCode

  if (isSystemDesignQuestionSlot(questionPosition, askedQuestionIds)) {
    cadenceDueSpecialTypes.push('systemDesign')
  }

  if (isMultiSectionSystemDesignQuestionSlot(questionPosition, askedQuestionIds)) {
    cadenceDueSpecialTypes.push('multiSectionSystemDesign')
  }

  if (isRawCodingPrimarySlot) {
    if (isRawCodingCollisionSlot) {
      if (systemDesignAvailable) {
        cadenceDueSpecialTypes.push('systemDesign')
      }
      if (multiSectionSystemDesignAvailable) {
        cadenceDueSpecialTypes.push('multiSectionSystemDesign')
      }
      if (rawCodingAvailable) {
        cadenceDueSpecialTypes.push('rawCoding')
      }
    } else {
      if (rawCodingAvailable) {
        cadenceDueSpecialTypes.push('rawCoding')
      }
      if (systemDesignAvailable) {
        cadenceDueSpecialTypes.push('systemDesign')
      }
      if (multiSectionSystemDesignAvailable) {
        cadenceDueSpecialTypes.push('multiSectionSystemDesign')
      }
    }
  }

  // De-duplicate while preserving order so a cadence collision queues each other type once for this slot.
  const uniqueCadenceDueSpecialTypes: CadenceSpecialQuestionType[] = []
  const seenCadenceTypes = new Set<CadenceSpecialQuestionType>()
  for (const cadenceType of cadenceDueSpecialTypes) {
    if (seenCadenceTypes.has(cadenceType)) {
      continue
    }

    seenCadenceTypes.add(cadenceType)
    uniqueCadenceDueSpecialTypes.push(cadenceType)
  }

  if (uniqueCadenceDueSpecialTypes.length > 0) {
    for (let index = 1; index < uniqueCadenceDueSpecialTypes.length; index += 1) {
      const deferredCadenceType = uniqueCadenceDueSpecialTypes[index]
      if (!cadenceSpecialQuestionQueue.includes(deferredCadenceType)) {
        cadenceSpecialQuestionQueue.push(deferredCadenceType)
      }
    }

    for (const cadenceType of uniqueCadenceDueSpecialTypes) {
      const pickedSpecialQuestion = pickCadenceSpecialQuestionByType(cadenceType)
      if (pickedSpecialQuestion) {
        return pickedSpecialQuestion
      }
    }
  } else {
    // No cadence-special due this slot: replay deferred special cadence picks first-in-first-out.
    const queuedCadenceCount = cadenceSpecialQuestionQueue.length

    for (let attempt = 0; attempt < queuedCadenceCount; attempt += 1) {
      const queuedCadenceType = cadenceSpecialQuestionQueue.shift()
      if (!queuedCadenceType) {
        break
      }

      const queuedSpecialQuestion = pickCadenceSpecialQuestionByType(queuedCadenceType)
      if (queuedSpecialQuestion) {
        return queuedSpecialQuestion
      }

      // Preserve deferred cadence entries that cannot be picked on this slot
      // so the queue remains stable instead of being dropped and rebuilt.
      cadenceSpecialQuestionQueue.push(queuedCadenceType)
    }
  }

  if (normalizedRawCodingFrequencyMultiplier > 1) {
    // Base frequency is every Nth slot. Extra chance on other slots raises effective frequency.
    const nonFifthSlotExtraRawCodingChance = Math.max(
      0,
      Math.min(1, (normalizedRawCodingFrequencyMultiplier - 1) / 2),
    )
    if (!isRawCodingPrimarySlot && Math.random() < nonFifthSlotExtraRawCodingChance) {
      const extraRawCodingQuestion = maybePickRawCodingQuestion()
      if (extraRawCodingQuestion) {
        return extraRawCodingQuestion
      }
    }
  }

  const standardQuestion = pickQuestionFromPool(
    fallbackOrder,
    askedQuestionIds,
    questionPosition,
    totalAvailableQuestions,
    { excludeKind, allowMultiSectionSystemDesign: targetDifficulty === 'hard' },
  )

  if (standardQuestion) {
    return standardQuestion
  }

  // Fallback for focus configurations such as "STAR voice only" where
  // transcription is intentionally excluded from the generic pool picker.
  if (ACTIVE_QUIZ_FOCUS_FILTERS.starVoice) {
    return pickTranscriptionQuestionFromPool(
      askedQuestionIds,
      questionPosition,
      totalAvailableQuestions,
      transcriptionProgressByProblem,
    )
  }

  return null
}

export function getIncorrectQuizExplanation(
  question: QuizQuestion,
  selectedIndex: number,
): QuizIncorrectExplanation {
  const selectedOption = question.options[selectedIndex] ?? 'Unknown choice'
  const correctOption = question.options[question.correctIndex] ?? 'Unknown correct answer'

  return {
    selectedOption,
    selectedReason:
      `${selectedOption} does not directly satisfy the system design requirement described in the prompt.`,
    correctOption,
    correctReason:
      question.correctExplanation ??
      `${correctOption} is the best choice because it directly matches the core distributed systems principle in this question.`,
  }
}

export function getMultiSectionSystemDesignIncorrectExplanation(
  question: QuizQuestion,
  selectedOptionIndices: number[],
): QuizIncorrectExplanation {
  const sections = question.multiSectionSystemDesign?.sections ?? []
  const selectedSummary = sections
    .map((section, index) => {
      const selectedIndex = selectedOptionIndices[index]
      const selectedOption = section.options[selectedIndex] ?? 'Unselected'
      return `${section.title}: ${selectedOption}`
    })
    .join(' · ')
  const correctSummary = sections
    .map((section) => `${section.title}: ${section.options[section.correctIndex] ?? 'Unknown answer'}`)
    .join(' · ')

  return {
    selectedOption: selectedSummary.length > 0 ? selectedSummary : 'No section choices submitted',
    selectedReason: 'At least one section choice did not match the required system design decision.',
    correctOption: correctSummary,
    correctReason:
      question.correctExplanation ??
      'A multi-section system design answer needs every section to match the intended architecture decision.',
  }
}

export function getQuestionExplorerStats(): QuestionExplorerStats {
  return {
    totalLoadedQuestions: QUIZ_QUESTIONS_LOADED_TOTAL,
    totalUniqueQuestions: QUIZ_QUESTIONS.length,
    duplicateQuestionsRemoved: Math.max(0, QUIZ_QUESTIONS_LOADED_TOTAL - QUIZ_QUESTIONS.length),
    loadedByDifficulty: {
      easy: sumCategoryCounts(QUIZ_QUESTION_AVAILABILITY.easy),
      medium: sumCategoryCounts(QUIZ_QUESTION_AVAILABILITY.medium),
      hard: sumCategoryCounts(QUIZ_QUESTION_AVAILABILITY.hard),
    },
    uniqueByDifficulty: QUIZ_QUESTIONS_UNIQUE_BY_DIFFICULTY,
    categories: createCategoryRows(QUIZ_QUESTION_AVAILABILITY),
  }
}

function buildBankCategoryMap(
  banks: Record<string, unknown>,
  difficulty: QuizDifficulty,
): Map<string, string> {
  const map = new Map<string, string>()
  Object.entries(banks).forEach(([bankPath, rawEntry]) => {
    const questions = normalizeQuestionBank(rawEntry)
    if (questions.length === 0) {
      return
    }
    const category = extractCategoryFromBankPath(bankPath, difficulty)
    questions.forEach((question) => {
      map.set(question.id, category)
    })
  })
  return map
}

const STATIC_QUESTION_ID_TO_CATEGORY: Map<string, string> = (() => {
  const map = new Map<string, string>()
  for (const [id, cat] of buildBankCategoryMap(allEasyQuestionBanks, 'easy')) {
    map.set(id, cat)
  }
  for (const [id, cat] of buildBankCategoryMap(allMediumQuestionBanks, 'medium')) {
    map.set(id, cat)
  }
  for (const [id, cat] of buildBankCategoryMap(allHardQuestionBanks, 'hard')) {
    map.set(id, cat)
  }
  return map
})()

export function getQuestionCategoryById(questionId: string): string | null {
  return STATIC_QUESTION_ID_TO_CATEGORY.get(questionId.trim()) ?? null
}

export function getCorrectQuizExplanation(
  question: QuizQuestion,
  selectedIndex: number,
): QuizCorrectExplanation {
  const rawSelectedOption = question.options[selectedIndex] ?? question.options[question.correctIndex] ?? 'Unknown answer'

  if (question.kind === 'multiSectionSystemDesign' && question.multiSectionSystemDesign) {
    const sectionSummary = question.multiSectionSystemDesign.sections
      .map((section) => `${section.title}: ${section.options[section.correctIndex] ?? 'Unknown answer'}`)
      .join(' · ')

    return {
      selectedOption: 'All sections matched',
      detailedExplanation:
        `You matched every section correctly. ${question.correctExplanation ?? sectionSummary}. ` +
        `${QUIZ_DIFFICULTY_CONTEXT.hard} ${QUIZ_TAKEAWAY_CONTEXT.hard}`,
    }
  }

  if (isStarStoryQuestionId(question.id)) {
    const selectedOption = truncateForFeedback(rawSelectedOption, 120)
    const conciseReason = truncateForFeedback(
      question.correctExplanation ?? 'You matched the correct STAR section for the same story.',
      220,
    )

    return {
      selectedOption,
      detailedExplanation: `Correct match. ${conciseReason}`,
    }
  }

  const selectedOption = rawSelectedOption
  const coreReason =
    question.correctExplanation ??
    `${selectedOption} is the best answer because it directly matches the main distributed-systems principle being tested.`
  const contextDifficulty = toBaseQuizDifficulty(question.difficulty)

  return {
    selectedOption,
    detailedExplanation:
      `You were right to choose "${selectedOption}". ${coreReason} ` +
      `${QUIZ_DIFFICULTY_CONTEXT[contextDifficulty]} ` +
      `${QUIZ_TAKEAWAY_CONTEXT[contextDifficulty]}`,
  }
}
