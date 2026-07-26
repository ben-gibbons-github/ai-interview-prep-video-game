import type {
  QuizCorrectExplanation,
  QuizIncorrectExplanation,
  QuizQuestion,
} from '../quiz/QuizQuestionManager'

const DEFAULT_CAPACITY_TOLERANCE = 0.15

function formatCapacityValue(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2)
}

export function isCapacityQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'capacity' && question.capacityQuestion !== undefined
}

export interface CapacityAnswerOutcome {
  isCorrect: boolean
  tolerancePercent: number
  nextCorrectAnswers: number
  estimateText: string
  targetText: string
  rangeText: string
  correctExplanation: QuizCorrectExplanation
  incorrectExplanation: QuizIncorrectExplanation
}

interface ComputeCapacityAnswerOutcomeParams {
  quizQuestion: QuizQuestion
  estimateValue: number
  quizCorrectAnswers: number
}

export function computeCapacityAnswerOutcome({
  quizQuestion,
  estimateValue,
  quizCorrectAnswers,
}: ComputeCapacityAnswerOutcomeParams): CapacityAnswerOutcome | null {
  if (!isCapacityQuestion(quizQuestion)) {
    return null
  }

  if (!Number.isFinite(estimateValue) || estimateValue <= 0) {
    return null
  }

  const capacityQuestion = quizQuestion.capacityQuestion
  if (!capacityQuestion) {
    return null
  }

  const tolerancePercent = capacityQuestion.tolerancePercent ?? DEFAULT_CAPACITY_TOLERANCE
  const targetValue = capacityQuestion.targetValue
  const toleranceDelta = targetValue * tolerancePercent
  const lowerBound = targetValue - toleranceDelta
  const upperBound = targetValue + toleranceDelta
  const unitSuffix = capacityQuestion.unitLabel ? ` ${capacityQuestion.unitLabel}` : ''
  const estimateText = `${formatCapacityValue(estimateValue)}${unitSuffix}`
  const targetText = `${formatCapacityValue(targetValue)}${unitSuffix}`
  const rangeText = `${formatCapacityValue(lowerBound)}${unitSuffix} - ${formatCapacityValue(upperBound)}${unitSuffix}`

  const isCorrect = estimateValue >= lowerBound && estimateValue <= upperBound

  return {
    isCorrect,
    tolerancePercent,
    nextCorrectAnswers: quizCorrectAnswers + (isCorrect ? 1 : 0),
    estimateText,
    targetText,
    rangeText,
    correctExplanation: {
      selectedOption: estimateText,
      detailedExplanation:
        `Your estimate ${estimateText} is within the accepted +/-${Math.round(tolerancePercent * 100)}% window. ` +
        `Expected target was around ${targetText}, so accepted range was ${rangeText}. ` +
        (quizQuestion.correctExplanation ?? 'Capacity sizing is directional in interviews as long as assumptions and math are reasonable.'),
    },
    incorrectExplanation: {
      selectedOption: estimateText,
      selectedReason:
        `Your estimate is outside the accepted +/-${Math.round(tolerancePercent * 100)}% range for this question.`,
      correctOption: rangeText,
      correctReason:
        (quizQuestion.correctExplanation ?? 'Use throughput and data-size assumptions to bound the answer.') +
        ` Baseline target: ${targetText}.`,
    },
  }
}
