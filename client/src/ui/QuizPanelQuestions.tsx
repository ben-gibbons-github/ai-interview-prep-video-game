import { useMemo } from 'react'
import { QuizPanelRenderer } from './QuizPanelRenderer'
import { CODE_BLANK_MARKER, QuizPanel, type QuizPanelProps } from './QuizPanel'
import type { QuizQuestion } from '../quiz/QuizQuestionManager'

export class QuizPanelQuestions extends QuizPanel {
  public readonly mode = 'questions' as const

  public override supportsCodeHoverPreview(question: QuizQuestion | null): boolean {
    return (
      question?.id.includes('complete-code-LiveCode') === true &&
      question.prompt.includes(CODE_BLANK_MARKER)
    )
  }
}

export function QuizPanelQuestionsView(props: QuizPanelProps) {
  const panel = useMemo(() => new QuizPanelQuestions(), [])
  return <QuizPanelRenderer panel={panel} {...props} />
}
