import type {
  QuizCorrectExplanation,
  QuizIncorrectExplanation,
  QuizQuestion,
  TranscriptionQuestionMeta,
} from '../quiz/QuizQuestionManager'

const DEFAULT_TRANSCRIPTION_MATCH_THRESHOLD = 0.3

interface ComputeTranscriptionAnswerOutcomeParams {
  quizQuestion: QuizQuestion
  transcript: string
  quizCorrectAnswers: number
}

export interface TranscriptionAnswerOutcome {
  isCorrect: boolean
  nextCorrectAnswers: number
  matchPercent: number
  threshold: number
  correctExplanation: QuizCorrectExplanation
  incorrectExplanation: QuizIncorrectExplanation
}

function tokenizeWords(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
}

function buildWordFrequency(tokens: string[]): Map<string, number> {
  const frequency = new Map<string, number>()

  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) ?? 0) + 1)
  }

  return frequency
}

function computeWordLevelMatchPercent(expectedText: string, transcriptText: string): number {
  const expectedTokens = tokenizeWords(expectedText)
  const transcriptTokens = tokenizeWords(transcriptText)

  if (expectedTokens.length === 0 || transcriptTokens.length === 0) {
    return 0
  }

  const expectedFreq = buildWordFrequency(expectedTokens)
  const transcriptFreq = buildWordFrequency(transcriptTokens)

  let matchedWords = 0
  expectedFreq.forEach((expectedCount, token) => {
    const transcriptCount = transcriptFreq.get(token) ?? 0
    matchedWords += Math.min(expectedCount, transcriptCount)
  })

  return matchedWords / expectedTokens.length
}

function buildExpectedStoryText(transcriptionQuestion: TranscriptionQuestionMeta): string {
  return [
    transcriptionQuestion.sections.situation,
    transcriptionQuestion.sections.task,
    transcriptionQuestion.sections.action,
    transcriptionQuestion.sections.result,
  ].join(' ')
}

export function isTranscriptionQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'transcription' && question.transcriptionQuestion !== undefined
}

export function computeTranscriptionAnswerOutcome(
  params: ComputeTranscriptionAnswerOutcomeParams,
): TranscriptionAnswerOutcome | null {
  const { quizQuestion, transcript, quizCorrectAnswers } = params
  if (!isTranscriptionQuestion(quizQuestion) || !quizQuestion.transcriptionQuestion) {
    return null
  }

  const transcriptionQuestion = quizQuestion.transcriptionQuestion
  const expectedStoryText = buildExpectedStoryText(transcriptionQuestion)
  const matchPercent = computeWordLevelMatchPercent(expectedStoryText, transcript)
  const threshold = transcriptionQuestion.matchThreshold ?? DEFAULT_TRANSCRIPTION_MATCH_THRESHOLD
  const isCorrect = matchPercent >= threshold
  const nextCorrectAnswers = quizCorrectAnswers + (isCorrect ? 1 : 0)
  const matchPercentLabel = `${Math.round(matchPercent * 100)}%`
  const thresholdLabel = `${Math.round(threshold * 100)}%`

  const correctExplanation: QuizCorrectExplanation = {
    selectedOption: `Transcript match ${matchPercentLabel} (threshold ${thresholdLabel})`,
    detailedExplanation:
      `Your spoken answer matched ${matchPercentLabel} of the reference STAR story by word-level overlap. ` +
      `The passing threshold for this prompt is ${thresholdLabel}.`,
  }

  const incorrectExplanation: QuizIncorrectExplanation = {
    selectedOption:
      transcript.trim().length > 0
        ? transcript.trim().slice(0, 220)
        : 'No transcript captured',
    selectedReason:
      `Your transcript reached ${matchPercentLabel}, which is below the ${thresholdLabel} threshold for this STAR story.`,
    correctOption: `Reference STAR story: ${transcriptionQuestion.storyTitle}`,
    correctReason:
      'Include more of the original Situation, Task, Action, and Result details when you retell the story.',
  }

  return {
    isCorrect,
    nextCorrectAnswers,
    matchPercent,
    threshold,
    correctExplanation,
    incorrectExplanation,
  }
}
