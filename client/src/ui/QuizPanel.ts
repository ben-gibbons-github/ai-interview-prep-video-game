import type { MutableRefObject } from 'react'
import type { Player } from '../Player/Player'
import type { QuizQuestion } from '../quiz/QuizQuestionManager'
import type { QuizSaveState } from '../Player/GameSaving'
import type { RunLaunchConfig } from './RunLaunchConfig'

export const CODE_BLANK_MARKER = '// __BLANK__'

interface OverlayPayload {
  title: string
  message: string
  details?: string[]
  durationMs?: number
}

export interface QuizWorldControls {
  getIsQuizPaused: () => boolean
  tickFreeze: (delta: number) => void
  handleCombatQuizVisibility: (shouldShowQuiz: boolean) => boolean
  grantRoundStartFreeze: () => void
  resetQuizState: () => void
  getSaveState: () => QuizSaveState
  restoreSaveState: (saveState: QuizSaveState | null | undefined) => void
}

export interface QuizFreezeUiState {
  quizFreezeActive: boolean
  quizFreezeFading: boolean
  quizFreezeSecondsLeft: number
}

export interface QuizPanelProps {
  playerRef: MutableRefObject<Player | null>
  postOverlay: (payload: OverlayPayload) => string
  syncPlayerState: (player: Player) => void
  runLaunchConfig?: RunLaunchConfig
  isGamePaused?: boolean
  onRequestUnpauseGame?: () => void
  onQuizStreakChange: (streak: number) => void
  onCorrectAnswerCelebration?: () => void
  onRegisterWorldControls?: (controls: QuizWorldControls) => void
  onFreezeUiStateChange?: (state: QuizFreezeUiState) => void
  onPriorityQuestionQueueChange?: (questionIds: string[]) => void
}

export abstract class QuizPanel {
  public abstract readonly mode: 'questions' | 'rawCoding'

  public getHeadingText(): string {
    return this.mode === 'rawCoding'
      ? 'Complete the missing code line'
      : 'Choose the best complexity / design answer'
  }

  public supportsCodeHoverPreview(question: QuizQuestion | null): boolean {
    if (!question || !question.prompt.includes(CODE_BLANK_MARKER)) {
      return false
    }

    return question.id.includes('complete-code-LiveCode')
  }

  public getCodeBlankReplacement(question: QuizQuestion | null, option: string | null): string | null {
    if (!question || !option || !this.supportsCodeHoverPreview(question)) {
      return null
    }

    return this.normalizeCodeOption(option)
  }

  protected normalizeCodeOption(option: string): string {
    const trimmed = option.trim()
    if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
      return trimmed.slice(1, -1)
    }

    return trimmed
  }
}
