import { useEffect, useState } from 'react'
import type { CapacityQuestionMeta } from '../quiz/QuizQuestionManager'

interface QuizPanelQuestionCapacityProps {
  questionId: string
  capacityQuestion: CapacityQuestionMeta
  quizAnswerResult: 'correct' | 'incorrect' | null
  onSubmitEstimate: (estimateValue: number) => void
}

function parseCapacityInput(rawValue: string): number | null {
  const normalizedValue = rawValue.trim().replace(/,/g, '')
  if (normalizedValue.length === 0) {
    return null
  }

  const match = normalizedValue.match(/^([0-9]*\.?[0-9]+)\s*([kKmMbB])?$/)
  if (!match) {
    return null
  }

  const baseValue = Number.parseFloat(match[1] ?? '')
  if (!Number.isFinite(baseValue) || baseValue <= 0) {
    return null
  }

  const suffix = (match[2] ?? '').toLowerCase()
  const multiplier = suffix === 'k' ? 1_000 : suffix === 'm' ? 1_000_000 : suffix === 'b' ? 1_000_000_000 : 1

  return baseValue * multiplier
}

export function QuizPanelQuestionCapacity({
  questionId,
  capacityQuestion,
  quizAnswerResult,
  onSubmitEstimate,
}: QuizPanelQuestionCapacityProps) {
  const [estimateInput, setEstimateInput] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)

  useEffect(() => {
    setEstimateInput('')
    setInputError(null)
  }, [questionId])

  const handleSubmit = () => {
    if (quizAnswerResult !== null) {
      return
    }

    const parsedValue = parseCapacityInput(estimateInput)
    if (parsedValue === null) {
      setInputError('Enter a positive number. You can use suffixes like k, m, or b.')
      return
    }

    setInputError(null)
    onSubmitEstimate(parsedValue)
  }

  return (
    <div className="quiz-capacity">
      <p className="quiz-code-preview-note">
        {capacityQuestion.helperText ?? 'Enter your capacity estimate. Answers within ±15% are accepted.'}
      </p>
      <div className="quiz-capacity-row">
        <input
          type="text"
          inputMode="decimal"
          className="quiz-capacity-input"
          placeholder={capacityQuestion.unitLabel ? `Estimate (${capacityQuestion.unitLabel})` : 'Enter estimate'}
          value={estimateInput}
          disabled={quizAnswerResult !== null}
          onChange={(event) => {
            setEstimateInput(event.target.value)
            if (inputError) {
              setInputError(null)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleSubmit()
            }
          }}
        />
        <button
          type="button"
          className="quiz-raw-button"
          disabled={quizAnswerResult !== null}
          onClick={handleSubmit}
        >
          Submit Estimate
        </button>
      </div>
      {inputError ? <p className="quiz-capacity-error">{inputError}</p> : null}
    </div>
  )
}
