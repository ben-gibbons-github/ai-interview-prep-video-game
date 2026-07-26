import { useMemo } from 'react'
import { QuizPanelRenderer } from './QuizPanelRenderer'
import { CODE_BLANK_MARKER, QuizPanel, type QuizPanelProps } from './QuizPanel'
import type { QuizQuestion } from '../quiz/QuizQuestionManager'

export class QuizPanelRawCoding extends QuizPanel {
  public readonly mode = 'rawCoding' as const

  public override supportsCodeHoverPreview(question: QuizQuestion | null): boolean {
    if (!question) {
      return false
    }

    return question.prompt.includes(CODE_BLANK_MARKER)
  }
}

export function QuizPanelRawCodingView(props: QuizPanelProps) {
  const panel = useMemo(() => new QuizPanelRawCoding(), [])
  return <QuizPanelRenderer panel={panel} {...props} />
}
