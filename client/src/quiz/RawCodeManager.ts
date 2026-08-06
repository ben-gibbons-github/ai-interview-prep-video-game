import type { QuizDifficulty, QuizQuestion, RawCodingDifficulty } from './QuizQuestionManager'

export type QuizQuestionKind =
  | 'multipleChoice'
  | 'rawCoding'
  | 'validList'
  | 'orderItems'
  | 'leetcodePatternType'
  | 'capacity'
  | 'systemDesign'
  | 'multiSectionSystemDesign'
  | 'transcription'
export type RawCodingLanguageId = 'javascript' | 'python' | 'java' | 'cpp' | 'csharp' | 'go'

export interface RawCodingLanguageTemplate {
  language: RawCodingLanguageId
  label: string
  starterCode: string
}

export interface RawCodingTestCase {
  input: unknown[]
  expected: unknown
}

export interface RawCodingQuestionMeta {
  functionName: string
  languages: RawCodingLanguageTemplate[]
  tests: RawCodingTestCase[]
  timeLimitSeconds: number
}

export interface RawCodingQuestionBankEntry {
  id: string
  prompt: string
  difficulty: RawCodingDifficulty
  correctExplanation: string
  rawCoding: RawCodingQuestionMeta
}

export interface RawCodingQuestionData {
  id: string
  prompt: string
  difficulty: RawCodingDifficulty
  correctExplanation: string
  tests: RawCodingTestCase[]
  functionName?: string
  timeLimitSeconds?: number
}

export interface RawCodingRotationState {
  queuesByPoolKey: Record<string, string[]>
}

const RAW_CODING_TIME_LIMIT_SECONDS = 5 * 60

const RAW_CODING_LANGUAGES: RawCodingLanguageTemplate[] = [
  {
    language: 'javascript',
    label: 'JavaScript',
    starterCode: `function solve(input) {\n  // Return the transformed output\n  return input\n}`,
  },
  {
    language: 'python',
    label: 'Python',
    starterCode: `def solve(input):\n    # Return the transformed output\n    return input`,
  },
  {
    language: 'java',
    label: 'Java',
    starterCode:
      `class Solution {\n  public static String solve(String inputJson) {\n    // Parse inputJson and return output as a JSON string\n    return inputJson;\n  }\n}`,
  },
  {
    language: 'cpp',
    label: 'C++',
    starterCode:
      `#include <string>\nusing namespace std;\n\nstring solve(const string& inputJson) {\n  // Parse inputJson and return output as a JSON string\n  return inputJson;\n}`,
  },
  {
    language: 'csharp',
    label: 'C#',
    starterCode:
      `using System;\n\npublic static class Solution {\n  public static string solve(string inputJson) {\n    // Parse inputJson and return output as a JSON string\n    return inputJson;\n  }\n}`,
  },
  {
    language: 'go',
    label: 'Go',
    starterCode:
      `package main\n\nfunc solve(input any) any {\n    // Return the transformed output\n    return input\n}`,
  },
]

interface RawCodingQuestionFileModule {
  default?: RawCodingQuestionData[]
}

const RAW_CODING_FILE_MODULES = {
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode/javascript/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_Frontend/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_Backend/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_Python/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_AI/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_React/**/*.ts', {
    eager: true,
  }),
  ...import.meta.glob<RawCodingQuestionFileModule>('./rawCode_DataStructures/**/*.ts', {
    eager: true,
  }),
}

interface RawCodingQuestionLoadEntry {
  sourcePath: string
  question: RawCodingQuestionBankEntry
}

type RawCodingSourceLabel = 'base' | 'frontend' | 'backend' | 'javascript' | 'python' | 'ai' | 'react'
type LiveCodeSubtypeLabel =
  | 'arraysStrings'
  | 'hashing'
  | 'twoPointers'
  | 'slidingWindow'
  | 'stackQueue'
  | 'binarySearch'
  | 'treesGraphs'
  | 'dynamicProgramming'
  | 'heapGreedy'
  | 'backtracking'
  | 'other'

type LiveCodeTopicFlags = {
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

// Hardcoded test toggles for controlling which coding banks are loaded.
const RAW_CODING_SOURCE_FLAGS = {
  LiveCodeStyle: true,
  frontend: true,
  backend: true,
  javascript: true,
  python: true,
  ai: true,
  react: true,
} as const

const rawCodingRotationQueueByPoolKey = new Map<string, string[]>()

function getRawCodingSourceLabelFromPath(path: string): RawCodingSourceLabel {
  if (path.includes('/rawCode/javascript/')) {
    return 'javascript'
  }

  if (path.includes('/rawCode_Frontend/')) {
    return 'frontend'
  }

  if (path.includes('/rawCode_Backend/')) {
    return 'backend'
  }

  if (path.includes('/rawCode_Python/')) {
    return 'python'
  }

  if (path.includes('/rawCode_AI/')) {
    return 'ai'
  }

  if (path.includes('/rawCode_React/')) {
    return 'react'
  }

  return 'base'
}

function isRawCodingSourceEnabled(source: RawCodingSourceLabel): boolean {
  if (source === 'base') {
    return RAW_CODING_SOURCE_FLAGS.LiveCodeStyle
  }

  if (source === 'frontend') {
    return RAW_CODING_SOURCE_FLAGS.frontend
  }

  if (source === 'javascript') {
    return RAW_CODING_SOURCE_FLAGS.javascript
  }

  if (source === 'python') {
    return RAW_CODING_SOURCE_FLAGS.python
  }

  if (source === 'ai') {
    return RAW_CODING_SOURCE_FLAGS.ai
  }

  if (source === 'react') {
    return RAW_CODING_SOURCE_FLAGS.react
  }

  return RAW_CODING_SOURCE_FLAGS.backend
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

function buildRawCodingPoolKey(
  difficulty: RawCodingDifficulty,
  allowedSources: {
    LiveCodeStyle: boolean
    frontend: boolean
    backend: boolean
    javascript: boolean
    python: boolean
    ai: boolean
    react: boolean
  },
  allowedLiveCodeTopics: LiveCodeTopicFlags,
): string {
  return JSON.stringify({
    difficulty,
    allowedSources,
    allowedLiveCodeTopics,
  })
}

function getEligibleRawCodingQuestions(
  difficulty: RawCodingDifficulty,
  allowedSources: {
    LiveCodeStyle: boolean
    frontend: boolean
    backend: boolean
    javascript: boolean
    python: boolean
    ai: boolean
    react: boolean
  },
  allowedLiveCodeTopics: LiveCodeTopicFlags,
): RawCodingQuestionBankEntry[] {
  return RAW_CODING_LOAD_ENTRIES
    .filter((entry) => entry.question.difficulty === difficulty)
    .filter((entry) => {
      const source = getRawCodingSourceLabelFromPath(entry.sourcePath)

      if (source === 'base') {
        if (!allowedSources.LiveCodeStyle) {
          return false
        }

        const subtype = getLiveCodeSubtypeLabel(entry.question)
        return allowedLiveCodeTopics[subtype]
      }
      if (source === 'frontend') return allowedSources.frontend
      if (source === 'backend') return allowedSources.backend
      if (source === 'javascript') return allowedSources.javascript
      if (source === 'python') return allowedSources.python
      if (source === 'ai') return allowedSources.ai
      if (source === 'react') return allowedSources.react

      return true
    })
    .map((entry) => entry.question)
}

function getShuffledQuestionIds(questions: RawCodingQuestionBankEntry[]): string[] {
  return shuffleItems(questions.map((question) => question.id))
}

function getOrCreateRawCodingQueue(poolKey: string, questions: RawCodingQuestionBankEntry[]): string[] {
  const existingQueue = rawCodingRotationQueueByPoolKey.get(poolKey)
  if (existingQueue) {
    return existingQueue
  }

  const queue = getShuffledQuestionIds(questions)
  rawCodingRotationQueueByPoolKey.set(poolKey, queue)
  return queue
}

export function getRawCodingRotationState(): RawCodingRotationState {
  const queuesByPoolKey: Record<string, string[]> = {}

  rawCodingRotationQueueByPoolKey.forEach((queue, poolKey) => {
    queuesByPoolKey[poolKey] = [...queue]
  })

  return {
    queuesByPoolKey,
  }
}

export function setRawCodingRotationState(state: RawCodingRotationState | undefined): void {
  rawCodingRotationQueueByPoolKey.clear()

  if (!state) {
    return
  }

  Object.entries(state.queuesByPoolKey).forEach(([poolKey, queue]) => {
    rawCodingRotationQueueByPoolKey.set(poolKey, [...queue])
  })
}

export function resetRawCodingRotationState(): void {
  rawCodingRotationQueueByPoolKey.clear()
}

function pullNextQueuedRawCodingQuestion(
  poolKey: string,
  questions: RawCodingQuestionBankEntry[],
  askedQuestionIds: Set<string>,
): RawCodingQuestionBankEntry | null {
  const queue = getOrCreateRawCodingQueue(poolKey, questions)

  while (queue.length > 0) {
    const nextQuestionId = queue.shift()
    if (!nextQuestionId || askedQuestionIds.has(nextQuestionId)) {
      continue
    }

    const nextQuestion = questions.find((question) => question.id === nextQuestionId)
    if (!nextQuestion) {
      continue
    }

    return nextQuestion
  }

  return null
}

function toRawCodingLoadEntries(): RawCodingQuestionLoadEntry[] {
  return Object.entries(RAW_CODING_FILE_MODULES).flatMap(([sourcePath, fileModule]) => {
    const source = getRawCodingSourceLabelFromPath(sourcePath)
    if (!isRawCodingSourceEnabled(source)) {
      return []
    }

    if (!Array.isArray(fileModule.default)) {
      return []
    }

    return fileModule.default.map((question) => ({
      sourcePath,
      question: {
        id: question.id,
        prompt: question.prompt,
        difficulty: question.difficulty,
        correctExplanation: question.correctExplanation,
        rawCoding: {
          functionName: question.functionName ?? 'solve',
          languages: RAW_CODING_LANGUAGES,
          tests: question.tests,
          timeLimitSeconds: question.timeLimitSeconds ?? RAW_CODING_TIME_LIMIT_SECONDS,
        },
      },
    }))
  })
}

function removeDuplicateRawCodingQuestions(entries: RawCodingQuestionLoadEntry[]): RawCodingQuestionLoadEntry[] {
  const seenById = new Map<string, RawCodingQuestionLoadEntry>()
  const duplicateRows: Array<{ id: string; keptFrom: string; droppedFrom: string }> = []

  for (const entry of entries) {
    const existing = seenById.get(entry.question.id)
    if (!existing) {
      seenById.set(entry.question.id, entry)
      continue
    }

    duplicateRows.push({
      id: entry.question.id,
      keptFrom: existing.sourcePath,
      droppedFrom: entry.sourcePath,
    })
  }

  if (duplicateRows.length > 0) {
    console.warn('[RawCoding] Duplicate question ids detected. Keeping first occurrence.', {
      duplicatesRemoved: duplicateRows.length,
    })
    console.table(duplicateRows)
  }

  return Array.from(seenById.values())
}

function logRawCodingAvailability(entries: RawCodingQuestionLoadEntry[]): void {
  const bySource = {
    base: 0,
    frontend: 0,
    backend: 0,
    javascript: 0,
    python: 0,
    ai: 0,
    react: 0,
  }

  const byDifficulty: Record<RawCodingDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
    veryHard: 0,
    insanelyHard: 0,
  }

  for (const entry of entries) {
    const source = getRawCodingSourceLabelFromPath(entry.sourcePath)
    bySource[source] += 1
    byDifficulty[entry.question.difficulty] += 1
  }

  console.info('[RawCoding] Loaded coding question banks.', {
    totalQuestions: entries.length,
    enabledSources: RAW_CODING_SOURCE_FLAGS,
    bySource,
    byDifficulty,
  })
}

const RAW_CODING_LOAD_ENTRIES: RawCodingQuestionLoadEntry[] = removeDuplicateRawCodingQuestions(toRawCodingLoadEntries())
logRawCodingAvailability(RAW_CODING_LOAD_ENTRIES)

const RAW_CODING_QUESTIONS: RawCodingQuestionBankEntry[] = RAW_CODING_LOAD_ENTRIES.map((entry) => entry.question)

export function getRawCodingQuestionCount(): number {
  return RAW_CODING_QUESTIONS.length
}

export function getRawCodingQuestionById(id: string): QuizQuestion | null {
  const question = RAW_CODING_QUESTIONS.find((entry) => entry.id === id)
  if (!question) {
    return null
  }

  return {
    id: question.id,
    prompt: question.prompt,
    options: ['Submit passing solution', 'Keep iterating'],
    correctIndex: 0,
    difficulty: question.difficulty,
    kind: 'rawCoding',
    rawCoding: question.rawCoding,
    correctExplanation: question.correctExplanation,
  }
}

interface NextRawCodingQuestionParams {
  questionPosition: number
  fallbackOrder: QuizDifficulty[]
  askedQuestionIds: Set<string>
  totalAvailableQuestions: number
  forcePick?: boolean
  allowedSources?: {
    LiveCodeStyle: boolean
    frontend: boolean
    backend: boolean
    javascript: boolean
    python: boolean
    ai: boolean
    react: boolean
  }
  allowedLiveCodeTopics?: LiveCodeTopicFlags
}

const DEFAULT_ALLOWED_LiveCode_TOPICS: LiveCodeTopicFlags = {
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
}

function getLiveCodeSubtypeLabel(question: RawCodingQuestionBankEntry): LiveCodeSubtypeLabel {
  const text = `${question.id} ${question.prompt}`.toLowerCase()

  if (text.includes('dfs') || text.includes('bfs') || text.includes('graph') || text.includes('tree')) {
    return 'treesGraphs'
  }

  if (text.includes('dynamic programming') || text.includes('dp') || text.includes('edit-distance') || text.includes('lis')) {
    return 'dynamicProgramming'
  }

  if (text.includes('sliding-window') || text.includes('sliding window') || text.includes('window')) {
    return 'slidingWindow'
  }

  if (text.includes('binary-search') || text.includes('binary search') || text.includes('rotated')) {
    return 'binarySearch'
  }

  if (text.includes('stack') || text.includes('queue') || text.includes('monotonic') || text.includes('rpn')) {
    return 'stackQueue'
  }

  if (text.includes('two-pointers') || text.includes('two pointers') || text.includes('3sum') || text.includes('container')) {
    return 'twoPointers'
  }

  if (text.includes('heap') || text.includes('greedy') || text.includes('top-k') || text.includes('kth')) {
    return 'heapGreedy'
  }

  if (text.includes('backtracking') || text.includes('trie') || text.includes('word-search') || text.includes('word search')) {
    return 'backtracking'
  }

  if (text.includes('anagram') || text.includes('prefix') || text.includes('hash') || text.includes('set')) {
    return 'hashing'
  }

  if (text.includes('array') || text.includes('string') || text.includes('matrix') || text.includes('interval')) {
    return 'arraysStrings'
  }

  return 'other'
}

const RAW_CODING_DIFFICULTIES: RawCodingDifficulty[] = [
  'easy',
  'medium',
  'hard',
  'veryHard',
  'insanelyHard',
]

function expandRawCodingFallbackOrder(baseOrder: QuizDifficulty[]): RawCodingDifficulty[] {
  const expanded: RawCodingDifficulty[] = []
  const allowEasyFallback = baseOrder.includes('easy')
  const add = (difficulty: RawCodingDifficulty) => {
    if (!expanded.includes(difficulty)) {
      expanded.push(difficulty)
    }
  }

  for (const difficulty of baseOrder) {
    if (difficulty === 'hard') {
      add('insanelyHard')
      add('veryHard')
      add('hard')
      add('medium')
      if (allowEasyFallback) {
        add('easy')
      }
      continue
    }

    if (difficulty === 'medium') {
      add('medium')
      add('hard')
      add('veryHard')
      add('insanelyHard')
      if (allowEasyFallback) {
        add('easy')
      }
      continue
    }

    add('easy')
    add('medium')
  }

  for (const difficulty of RAW_CODING_DIFFICULTIES) {
    if (!allowEasyFallback && difficulty === 'easy') {
      continue
    }
    add(difficulty)
  }

  return expanded
}

function buildHardTierRotationOrder(askedQuestionIds: Set<string>): RawCodingDifficulty[] {
  const hardTierCycle: RawCodingDifficulty[] = ['hard', 'veryHard', 'insanelyHard']
  const askedRawCodingCount = RAW_CODING_QUESTIONS.reduce(
    (count, question) => count + (askedQuestionIds.has(question.id) ? 1 : 0),
    0,
  )
  const rotationIndex = askedRawCodingCount % hardTierCycle.length

  return [
    ...hardTierCycle.slice(rotationIndex),
    ...hardTierCycle.slice(0, rotationIndex),
  ]
}

function recycleSeenRawCodingIdsIfExhausted(
  askedQuestionIds: Set<string>,
  rawCodingDifficultyOrder: RawCodingDifficulty[],
  allowedSources: {
    LiveCodeStyle: boolean
    frontend: boolean
    backend: boolean
    javascript: boolean
    python: boolean
    ai: boolean
    react: boolean
  },
  allowedLiveCodeTopics: LiveCodeTopicFlags,
): boolean {
  const eligibleQuestionIds = new Set<string>()

  for (const difficulty of rawCodingDifficultyOrder) {
    const pool = getEligibleRawCodingQuestions(difficulty, allowedSources, allowedLiveCodeTopics)
    pool.forEach((question) => eligibleQuestionIds.add(question.id))
  }

  if (eligibleQuestionIds.size === 0) {
    return false
  }

  const allEligibleAlreadySeen = Array.from(eligibleQuestionIds).every((questionId) => askedQuestionIds.has(questionId))
  if (!allEligibleAlreadySeen) {
    return false
  }

  eligibleQuestionIds.forEach((questionId) => {
    askedQuestionIds.delete(questionId)
  })

  return true
}

export function getNextRawCodingQuestion({
  questionPosition,
  fallbackOrder,
  askedQuestionIds,
  totalAvailableQuestions,
  forcePick = false,
  allowedSources,
  allowedLiveCodeTopics,
}: NextRawCodingQuestionParams): QuizQuestion | null {
  if (!forcePick && (questionPosition - 1) % 6 !== 0) {
    return null
  }

  let rawCodingDifficultyOrder = expandRawCodingFallbackOrder(fallbackOrder)

  if (fallbackOrder[0] === 'hard') {
    const rotatingHardTierOrder = buildHardTierRotationOrder(askedQuestionIds)
    rawCodingDifficultyOrder = [
      ...rotatingHardTierOrder,
      ...rawCodingDifficultyOrder.filter((difficulty) => !rotatingHardTierOrder.includes(difficulty)),
    ]
  }

  const effectiveAllowedSources = allowedSources ?? RAW_CODING_SOURCE_FLAGS
  const effectiveAllowedLiveCodeTopics = allowedLiveCodeTopics ?? DEFAULT_ALLOWED_LiveCode_TOPICS

  recycleSeenRawCodingIdsIfExhausted(
    askedQuestionIds,
    rawCodingDifficultyOrder,
    effectiveAllowedSources,
    effectiveAllowedLiveCodeTopics,
  )

  for (const difficulty of rawCodingDifficultyOrder) {
    const pool = getEligibleRawCodingQuestions(difficulty, effectiveAllowedSources, effectiveAllowedLiveCodeTopics)
    const poolKey = buildRawCodingPoolKey(difficulty, effectiveAllowedSources, effectiveAllowedLiveCodeTopics)
    const question = pullNextQueuedRawCodingQuestion(poolKey, pool, askedQuestionIds)

    if (question) {
      askedQuestionIds.add(question.id)
      return {
        id: question.id,
        prompt: question.prompt,
        options: ['Submit passing solution', 'Keep iterating'],
        correctIndex: 0,
        difficulty: question.difficulty,
        kind: 'rawCoding',
        rawCoding: question.rawCoding,
        correctExplanation: question.correctExplanation,
        questionIndex: questionPosition,
        totalQuestions: totalAvailableQuestions,
        seenQuestionsBeforeCurrent: questionPosition - 1,
      }
    }
  }

  return null
}
