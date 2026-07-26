import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { getActiveQuizFocusFilters, getLatestQuizQuestionContent, type RawCodingLanguageId } from '../quiz/QuizQuestionManager'
import { useQuizManager } from './QuizManager'
import { CODE_BLANK_MARKER, type QuizPanel as QuizPanelBase, type QuizPanelProps } from './QuizPanel'
import { executeRawCodingQuestion, type RawCodingExecutionResult } from '../codeRunning/.rawCodingRunner'
import { QuizPanelQuestionOrder } from './QuizPanelQuestionOrder'
import { QuizPanelQuestionCapacity } from './QuizPanelQuestionCapacity'
import { QuizPanelQuestionTranscription } from './QuizPanelQuestionTranscription'
import { SystemDesignPanel, type SystemDesignPanelDraft } from './SystemDesign/SystemDesignPanel'
import { MultiSectionSystemDesignPanel, type MultiSectionSystemDesignPanelDraft } from './SystemDesign/MultiSectionSystemDesignPanel'
import type { DesignState } from './SystemDesign/SystemDesignTypes'
import type { QuizSaveState } from '../Player/GameSaving'
import {
  createCodeEditorHistoryState,
  getMatchingBraceHighlightIndex,
  handleCodeEditorTabKeyDown,
  handleCodeEditorUndoRedoKeyDown,
  normalizeCodeEditorValue,
  pushCodeEditorHistory,
  resetCodeEditorHistoryState,
} from './CodeEditorBehavior'

const ANSWER_QUESTION_AUTO = true

type RichTextBlock =
  | {
      type: 'text'
      value: string
    }
  | {
      type: 'code'
      value: string
      language: string
    }

function parseRichText(input: string): RichTextBlock[] {
  const blocks: RichTextBlock[] = []
  const codeFencePattern = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g
  let cursor = 0

  for (const match of input.matchAll(codeFencePattern)) {
    const fullMatch = match[0]
    const language = match[1] ?? 'text'
    const code = match[2] ?? ''
    const matchIndex = match.index ?? 0

    if (matchIndex > cursor) {
      blocks.push({
        type: 'text',
        value: input.slice(cursor, matchIndex),
      })
    }

    blocks.push({
      type: 'code',
      language,
      value: code.trimEnd(),
    })

    cursor = matchIndex + fullMatch.length
  }

  if (cursor < input.length) {
    blocks.push({
      type: 'text',
      value: input.slice(cursor),
    })
  }

  return blocks.length > 0 ? blocks : [{ type: 'text', value: input }]
}

function renderInlineCodeSegments(text: string) {
  const parts = text.split(/(`[^`]+`)/g).filter((part) => part.length > 0)

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${part}-${index}`} className="quiz-inline-code">
          {part.slice(1, -1)}
        </code>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function applyCodeBlankReplacement(code: string, replacement: string) {
  const lines = code.split('\n')
  const previewLineIndex = lines.findIndex((line) => line.includes(CODE_BLANK_MARKER))

  if (previewLineIndex < 0) {
    return {
      code,
      previewLineIndex: -1,
    }
  }

  const sourceLine = lines[previewLineIndex]
  const indentation = sourceLine.match(/^\s*/) ?? ['']
  const trimmedSourceLine = sourceLine.trim()

  lines[previewLineIndex] =
    trimmedSourceLine === `// ${CODE_BLANK_MARKER}` || trimmedSourceLine === CODE_BLANK_MARKER
      ? `${indentation[0]}${replacement}`
      : sourceLine.replace(CODE_BLANK_MARKER, replacement)

  return {
    code: lines.join('\n'),
    previewLineIndex,
  }
}

function renderCodeBlock(code: string, previewLineIndex = -1) {
  const lines = code.split('\n')

  return lines.map((line, index) => (
    <span
      key={`${line}-${index}`}
      className={index === previewLineIndex ? 'quiz-code-line quiz-code-line-preview' : 'quiz-code-line'}
    >
      {line.length > 0 ? line : ' '}
      {index < lines.length - 1 ? '\n' : null}
    </span>
  ))
}

function renderRichText(
  input: string,
  className: string,
  codeBlankReplacement: string | null = null,
) {
  const normalizedInput = input.replace(/\\n/g, '\n')
  const blocks = parseRichText(normalizedInput)

  return blocks.map((block, index) => {
    if (block.type === 'code') {
      const preview =
        codeBlankReplacement && block.value.includes(CODE_BLANK_MARKER)
          ? applyCodeBlankReplacement(block.value, codeBlankReplacement)
          : { code: block.value, previewLineIndex: -1 }

      return (
        <div key={`${block.language}-${index}`} className="quiz-code-block-wrap">
          <div className="quiz-code-label">{block.language}</div>
          <pre className="quiz-code-block">
            <code>{renderCodeBlock(preview.code, preview.previewLineIndex)}</code>
          </pre>
        </div>
      )
    }

    const lines = block.value
      .split(/\n{2,}/)
      .map((line, lineIndex) => (
        <p key={`${line}-${lineIndex}`} className={className}>
          {renderInlineCodeSegments(line.trim())}
        </p>
      ))

    return <div key={`${block.value}-${index}`}>{lines}</div>
  })
}

function renderRawEditorMirror(code: string, highlightIndex: number | null) {
  const lines = code.split('\n')
  let cursor = 0

  return lines.flatMap((line, lineIndex) => {
    const lineNodes = line.split('').map((character, characterIndex) => {
      const absoluteIndex = cursor + characterIndex
      const isHighlighted = highlightIndex === absoluteIndex

      return (
        <span
          key={`${lineIndex}-${characterIndex}-${character}`}
          className={isHighlighted ? 'quiz-raw-editor-brace-highlight' : undefined}
        >
          {character === ' ' ? '\u00A0' : character}
        </span>
      )
    })

    const result: ReactNode[] = [
      <span key={`line-${lineIndex}`} className="quiz-raw-editor-line">
        {lineNodes}
      </span>,
    ]

    cursor += line.length + 1

    if (lineIndex < lines.length - 1) {
      result.push(<br key={`break-${lineIndex}`} />)
    }

    return result
  })
}

interface QuizPanelRendererProps extends QuizPanelProps {
  panel: QuizPanelBase
}

export function QuizPanelRenderer({
  panel,
  playerRef,
  postOverlay,
  syncPlayerState,
  runLaunchConfig,
  isGamePaused = false,
  onRequestUnpauseGame,
  onQuizStreakChange,
  onCorrectAnswerCelebration,
  onRegisterWorldControls,
  onFreezeUiStateChange,
  onPriorityQuestionQueueChange,
}: QuizPanelRendererProps) {
  const {
    quizActive,
    quizQuestion,
    quizAnswerResult,
    quizCorrectExplanation,
    quizCorrectRewardSummary,
    quizIncorrectExplanation,
    quizFreezeActive,
    quizFreezeFading,
    quizFreezeSecondsLeft,
    nextQuestionDelaySecondsLeft,
    quizCorrectAnswers,
    quizTotalAnswered,
    quizCorrectForNextLife,
    quizCorrectNeededForNextLife,
    quizUpcomingBuffLabel,
    priorityQuestionIds,
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
    getSaveState,
    restoreSaveState,
    resetQuizState,
  } = useQuizManager({
    playerRef,
    postOverlay,
    syncPlayerState,
    runLaunchConfig,
    onQuizStreakChange,
    onCorrectAnswerCelebration,
  })
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState<number | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<RawCodingLanguageId>('javascript')
  const [rawSourceCode, setRawSourceCode] = useState('')
  const [isRunningRawCode, setIsRunningRawCode] = useState(false)
  const [rawExecutionResult, setRawExecutionResult] = useState<RawCodingExecutionResult | null>(null)
  const [rawCodingRunsUsed, setRawCodingRunsUsed] = useState(0)
  const [rawEditorBraceHighlightIndex, setRawEditorBraceHighlightIndex] = useState<number | null>(null)
  const [rawEditorScroll, setRawEditorScroll] = useState({ top: 0, left: 0 })
  const [selectedValidListIndices, setSelectedValidListIndices] = useState<number[]>([])
  const [orderItemsDraft, setOrderItemsDraft] = useState<{
    questionId: string
    orderedIndices: number[]
  } | null>(null)
  const [systemDesignDraft, setSystemDesignDraft] = useState<{
    questionId: string
    draft: SystemDesignPanelDraft
  } | null>(null)
  const [multiSectionSystemDesignDraft, setMultiSectionSystemDesignDraft] = useState<{
    questionId: string
    draft: MultiSectionSystemDesignPanelDraft
  } | null>(null)
  const rawSourceCodeRef = useRef('')
  const rawEditorRef = useRef<HTMLTextAreaElement | null>(null)
  const codeEditorHistoryRef = useRef(createCodeEditorHistoryState())
  const micOnlyModalTimerRef = useRef<number | null>(null)
  const micOnlyAnnouncedModalKeyRef = useRef<string | null>(null)
  const pendingRawCodingProgressRef = useRef<QuizSaveState['rawCodingProgress'] | null>(null)
  const pendingOrderItemsProgressRef = useRef<QuizSaveState['orderItemsProgress'] | null>(null)
  const pendingSystemDesignProgressRef = useRef<QuizSaveState['systemDesignProgress'] | null>(null)
  const pendingMultiSectionSystemDesignProgressRef = useRef<QuizSaveState['multiSectionSystemDesignProgress'] | null>(null)
  const orderItemsDraftRef = useRef<typeof orderItemsDraft>(null)
  const systemDesignDraftRef = useRef<typeof systemDesignDraft>(null)
  const multiSectionSystemDesignDraftRef = useRef<typeof multiSectionSystemDesignDraft>(null)
  const displayedQuizQuestion = getLatestQuizQuestionContent(quizQuestion) ?? quizQuestion
  const micOnlyModeEnabled = getActiveQuizFocusFilters().micOnlyMode

  const isRawCodingQuestion = displayedQuizQuestion?.kind === 'rawCoding' && displayedQuizQuestion.rawCoding !== undefined
  const isValidListQuestion = displayedQuizQuestion?.kind === 'validList' && displayedQuizQuestion.validList !== undefined
  const isOrderItemsQuestion = displayedQuizQuestion?.kind === 'orderItems' && displayedQuizQuestion.orderItems !== undefined
  const isCapacityQuestion = displayedQuizQuestion?.kind === 'capacity' && displayedQuizQuestion.capacityQuestion !== undefined
  const isTranscriptionQuestion =
    displayedQuizQuestion?.kind === 'transcription' && displayedQuizQuestion.transcriptionQuestion !== undefined
  const isSystemDesignQuestion = displayedQuizQuestion?.kind === 'systemDesign' && displayedQuizQuestion.systemDesign !== undefined
  const isMultiSectionSystemDesignQuestion =
    displayedQuizQuestion?.kind === 'multiSectionSystemDesign' && displayedQuizQuestion.multiSectionSystemDesign !== undefined
  const isWideDesignQuestion = isSystemDesignQuestion || isMultiSectionSystemDesignQuestion
  const availableSkips = Math.max(0, Math.floor(playerRef.current?.getSkips() ?? 0))

  const handleSystemDesignDraftChange = useCallback((draft: SystemDesignPanelDraft) => {
    const questionId = quizQuestion?.id
    if (!questionId) {
      return
    }

    const nextDraft = {
      questionId,
      draft,
    }
    systemDesignDraftRef.current = nextDraft

    setSystemDesignDraft((previous) => {
      if (
        previous &&
        previous.questionId === questionId &&
        previous.draft.selectedNodeId === draft.selectedNodeId &&
        previous.draft.designState === draft.designState
      ) {
        return previous
      }

      return nextDraft
    })
  }, [quizQuestion?.id])

  const handleMultiSectionSystemDesignDraftChange = useCallback((draft: MultiSectionSystemDesignPanelDraft) => {
    const questionId = quizQuestion?.id
    if (!questionId) {
      return
    }

    const nextDraft = {
      questionId,
      draft,
    }
    multiSectionSystemDesignDraftRef.current = nextDraft

    setMultiSectionSystemDesignDraft((previous) => {
      if (
        previous &&
        previous.questionId === questionId &&
        previous.draft.submissionCount === draft.submissionCount &&
        previous.draft.selectedOptionIndices.length === draft.selectedOptionIndices.length &&
        previous.draft.selectedOptionIndices.every((value, index) => value === draft.selectedOptionIndices[index])
      ) {
        return previous
      }

      return nextDraft
    })
  }, [quizQuestion?.id])

  useEffect(() => {
    rawSourceCodeRef.current = rawSourceCode
  }, [rawSourceCode])

  useEffect(() => {
    setRawEditorBraceHighlightIndex(null)
    setRawEditorScroll({ top: 0, left: 0 })
  }, [quizQuestion?.id, selectedLanguage])

  useEffect(() => {
    onPriorityQuestionQueueChange?.(priorityQuestionIds)
  }, [onPriorityQuestionQueueChange, priorityQuestionIds])

  useEffect(() => {
    setHoveredOptionIndex(null)
    setSelectedValidListIndices([])
    setOrderItemsDraft(null)
    setMultiSectionSystemDesignDraft(null)
    orderItemsDraftRef.current = null
    multiSectionSystemDesignDraftRef.current = null
    systemDesignDraftRef.current = null
  }, [quizQuestion?.id])

  useEffect(() => {
    if (!quizQuestion?.rawCoding) {
      setSelectedLanguage('javascript')
      setRawSourceCode('')
      rawSourceCodeRef.current = ''
      resetCodeEditorHistoryState(codeEditorHistoryRef.current)
      setRawExecutionResult(null)
      setIsRunningRawCode(false)
      setRawCodingRunsUsed(0)
      return
    }

    const firstLanguage = quizQuestion.rawCoding.languages[0]
    if (!firstLanguage) {
      setSelectedLanguage('javascript')
      setRawSourceCode('')
      rawSourceCodeRef.current = ''
      resetCodeEditorHistoryState(codeEditorHistoryRef.current)
      return
    }

    setSelectedLanguage(firstLanguage.language)
    setRawSourceCode(firstLanguage.starterCode)
    rawSourceCodeRef.current = firstLanguage.starterCode
    resetCodeEditorHistoryState(codeEditorHistoryRef.current)
    setRawExecutionResult(null)
    setIsRunningRawCode(false)
  }, [quizQuestion?.id, quizQuestion?.rawCoding])

  useEffect(() => {
    if (!quizQuestion || !isRawCodingQuestion) {
      return
    }

    const pending = pendingRawCodingProgressRef.current
    if (!pending || pending.questionId !== quizQuestion.id) {
      return
    }

    setSelectedLanguage(pending.selectedLanguage)
    setRawSourceCode(pending.sourceCode)
    rawSourceCodeRef.current = pending.sourceCode
    resetCodeEditorHistoryState(codeEditorHistoryRef.current)
    setRawExecutionResult(null)
    pendingRawCodingProgressRef.current = null
  }, [isRawCodingQuestion, quizQuestion])

  useEffect(() => {
    if (!quizQuestion || !isOrderItemsQuestion) {
      return
    }

    const pending = pendingOrderItemsProgressRef.current
    if (!pending || pending.questionId !== quizQuestion.id) {
      return
    }

    setOrderItemsDraft({
      questionId: pending.questionId,
      orderedIndices: pending.orderedIndices,
    })
    orderItemsDraftRef.current = {
      questionId: pending.questionId,
      orderedIndices: pending.orderedIndices,
    }
    pendingOrderItemsProgressRef.current = null
  }, [isOrderItemsQuestion, quizQuestion])

  useEffect(() => {
    if (!quizQuestion || !isSystemDesignQuestion) {
      return
    }

    const pending = pendingSystemDesignProgressRef.current
    if (!pending || pending.questionId !== quizQuestion.id) {
      return
    }

    const restoredDesignState = pending.designState as DesignState
    setSystemDesignDraft({
      questionId: pending.questionId,
      draft: {
        designState: restoredDesignState,
        selectedNodeId: pending.selectedNodeId,
      },
    })
    systemDesignDraftRef.current = {
      questionId: pending.questionId,
      draft: {
        designState: restoredDesignState,
        selectedNodeId: pending.selectedNodeId,
      },
    }
    pendingSystemDesignProgressRef.current = null
  }, [isSystemDesignQuestion, quizQuestion])

  useEffect(() => {
    if (!quizQuestion || !isMultiSectionSystemDesignQuestion) {
      return
    }

    const pending = pendingMultiSectionSystemDesignProgressRef.current
    if (!pending || pending.questionId !== quizQuestion.id) {
      return
    }

    setMultiSectionSystemDesignDraft({
      questionId: pending.questionId,
      draft: {
        selectedOptionIndices: pending.selectedOptionIndices,
        submissionCount: pending.submissionCount,
      },
    })
    multiSectionSystemDesignDraftRef.current = {
      questionId: pending.questionId,
      draft: {
        selectedOptionIndices: pending.selectedOptionIndices,
        submissionCount: pending.submissionCount,
      },
    }
    pendingMultiSectionSystemDesignProgressRef.current = null
  }, [isMultiSectionSystemDesignQuestion, quizQuestion])

  const getSaveStateWithProgress = useMemo(() => {
    return () => {
      const baseSaveState = getSaveState()
      const latestSystemDesignDraft = systemDesignDraftRef.current ?? systemDesignDraft
      const latestMultiSectionDraft = multiSectionSystemDesignDraftRef.current ?? multiSectionSystemDesignDraft
      const latestOrderItemsDraft = orderItemsDraftRef.current ?? orderItemsDraft

      const rawCodingProgress =
        quizQuestion &&
        isRawCodingQuestion &&
        rawSourceCodeRef.current.trim().length > 0
          ? {
              questionId: quizQuestion.id,
              selectedLanguage,
              sourceCode: rawSourceCodeRef.current,
            }
          : undefined

      const systemDesignProgress =
        quizQuestion &&
        isSystemDesignQuestion &&
        latestSystemDesignDraft &&
        latestSystemDesignDraft.questionId === quizQuestion.id
          ? {
              questionId: latestSystemDesignDraft.questionId,
              designState: latestSystemDesignDraft.draft.designState,
              selectedNodeId: latestSystemDesignDraft.draft.selectedNodeId,
            }
          : undefined

      const multiSectionSystemDesignProgress =
        quizQuestion &&
        isMultiSectionSystemDesignQuestion &&
        latestMultiSectionDraft &&
        latestMultiSectionDraft.questionId === quizQuestion.id
          ? {
              questionId: latestMultiSectionDraft.questionId,
              selectedOptionIndices: latestMultiSectionDraft.draft.selectedOptionIndices,
              submissionCount: latestMultiSectionDraft.draft.submissionCount,
            }
          : undefined

      const orderItemsProgress =
        quizQuestion &&
        isOrderItemsQuestion &&
        latestOrderItemsDraft &&
        latestOrderItemsDraft.questionId === quizQuestion.id &&
        latestOrderItemsDraft.orderedIndices.length > 0
          ? {
              questionId: latestOrderItemsDraft.questionId,
              orderedIndices: latestOrderItemsDraft.orderedIndices,
            }
          : undefined

      return {
        ...baseSaveState,
        rawCodingProgress,
        orderItemsProgress,
        systemDesignProgress,
        multiSectionSystemDesignProgress,
      }
    }
  }, [getSaveState, isMultiSectionSystemDesignQuestion, isOrderItemsQuestion, isRawCodingQuestion, isSystemDesignQuestion, multiSectionSystemDesignDraft, orderItemsDraft, quizQuestion, selectedLanguage, systemDesignDraft])

  const restoreSaveStateWithProgress = useMemo(() => {
    return (saveState: QuizSaveState | null | undefined) => {
      pendingRawCodingProgressRef.current = saveState?.rawCodingProgress ?? null
      pendingOrderItemsProgressRef.current = saveState?.orderItemsProgress ?? null
      pendingSystemDesignProgressRef.current = saveState?.systemDesignProgress ?? null
      pendingMultiSectionSystemDesignProgressRef.current = saveState?.multiSectionSystemDesignProgress ?? null
      restoreSaveState(saveState)
    }
  }, [restoreSaveState])

  useEffect(() => {
    if (!onRegisterWorldControls) {
      return
    }

    onRegisterWorldControls({
      getIsQuizPaused,
      tickFreeze,
      handleCombatQuizVisibility,
      grantRoundStartFreeze,
      getSaveState: getSaveStateWithProgress,
      restoreSaveState: restoreSaveStateWithProgress,
      resetQuizState,
    })
  }, [
    grantRoundStartFreeze,
    getIsQuizPaused,
    getSaveStateWithProgress,
    handleCombatQuizVisibility,
    onRegisterWorldControls,
    resetQuizState,
    restoreSaveStateWithProgress,
    tickFreeze,
  ])

  useEffect(() => {
    onFreezeUiStateChange?.({
      quizFreezeActive,
      quizFreezeFading,
      quizFreezeSecondsLeft,
    })
  }, [onFreezeUiStateChange, quizFreezeActive, quizFreezeFading, quizFreezeSecondsLeft])

  useEffect(() => {
    const clearMicOnlyModalTimer = () => {
      if (micOnlyModalTimerRef.current !== null) {
        window.clearTimeout(micOnlyModalTimerRef.current)
        micOnlyModalTimerRef.current = null
      }
    }

    if (!micOnlyModeEnabled) {
      clearMicOnlyModalTimer()
      micOnlyAnnouncedModalKeyRef.current = null
      return
    }

    const hasCorrectModal = quizCorrectExplanation !== null
    const hasIncorrectModal = quizAnswerResult === 'incorrect' && quizIncorrectExplanation !== null

    if (!hasCorrectModal && !hasIncorrectModal) {
      clearMicOnlyModalTimer()
      micOnlyAnnouncedModalKeyRef.current = null
      return
    }

    const activeQuestionId = quizQuestion?.id ?? 'unknown-question'
    const modalType = hasCorrectModal ? 'correct' : 'incorrect'
    const modalTitle = hasCorrectModal ? 'Rewards' : 'Wrong Answer'
    const modalKey = `${activeQuestionId}:${modalType}`

    if (micOnlyAnnouncedModalKeyRef.current === modalKey) {
      return
    }

    micOnlyAnnouncedModalKeyRef.current = modalKey
    clearMicOnlyModalTimer()

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(modalTitle)
      utterance.rate = 1
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }

    micOnlyModalTimerRef.current = window.setTimeout(() => {
      micOnlyModalTimerRef.current = null
      if (hasCorrectModal) {
        handleResumeAfterCorrectQuizAnswer()
        return
      }

      if (hasIncorrectModal) {
        handleResumeAfterIncorrectQuizAnswer()
      }
    }, 5000)

    return () => {
      clearMicOnlyModalTimer()
    }
  }, [
    handleResumeAfterCorrectQuizAnswer,
    handleResumeAfterIncorrectQuizAnswer,
    micOnlyModeEnabled,
    quizAnswerResult,
    quizCorrectExplanation,
    quizIncorrectExplanation,
    quizQuestion?.id,
  ])

  useEffect(() => {
    return () => {
      if (micOnlyModalTimerRef.current !== null) {
        window.clearTimeout(micOnlyModalTimerRef.current)
        micOnlyModalTimerRef.current = null
      }
      micOnlyAnnouncedModalKeyRef.current = null
    }
  }, [])

  const supportsCodeHoverPreview = panel.supportsCodeHoverPreview(quizQuestion)

  const hoveredCodeOption = useMemo(() => {
    if (!quizQuestion || !supportsCodeHoverPreview || hoveredOptionIndex === null) {
      return null
    }

    return panel.getCodeBlankReplacement(quizQuestion, quizQuestion.options[hoveredOptionIndex] ?? null)
  }, [hoveredOptionIndex, panel, quizQuestion, supportsCodeHoverPreview])

  const validListExpectedCount = useMemo(() => {
    if (!quizQuestion?.validList) {
      return 0
    }

    return new Set(quizQuestion.validList.validIndices).size
  }, [quizQuestion?.validList])

  const validListSelectedCorrectCount = useMemo(() => {
    if (!quizQuestion?.validList) {
      return 0
    }

    const validSet = new Set(quizQuestion.validList.validIndices)
    return selectedValidListIndices.filter((index) => validSet.has(index)).length
  }, [quizQuestion?.validList, selectedValidListIndices])

  const validListSelectionDelta = selectedValidListIndices.length - validListExpectedCount
  const validListSelectionStatus =
    validListSelectionDelta === 0
      ? 'On target'
      : validListSelectionDelta > 0
        ? `Over by ${validListSelectionDelta}`
        : `Under by ${Math.abs(validListSelectionDelta)}`

  const rawLanguageTemplates = useMemo(() => {
    if (!quizQuestion?.rawCoding) {
      return []
    }

    return quizQuestion.rawCoding.languages
  }, [quizQuestion?.rawCoding])

  const canSubmitRawCodingAnswer = isRawCodingQuestion && rawExecutionResult?.passed === true

  const handleRawCodingLanguageChange = (nextLanguage: RawCodingLanguageId) => {
    setSelectedLanguage(nextLanguage)
    const template = rawLanguageTemplates.find((entry) => entry.language === nextLanguage)
    if (template) {
      setRawSourceCode(template.starterCode)
      rawSourceCodeRef.current = template.starterCode
      resetCodeEditorHistoryState(codeEditorHistoryRef.current)
      setRawExecutionResult(null)
    }
  }

  const handleRunRawCoding = async () => {
    if (!quizQuestion?.rawCoding || isRunningRawCode || quizAnswerResult !== null) {
      return
    }

    const runLimit = playerRef.current?.getRawCodingRunLimit() ?? 0
    if (runLimit > 0 && rawCodingRunsUsed >= runLimit) {
      return
    }

    const nextRunsUsed = rawCodingRunsUsed + 1
    setRawCodingRunsUsed(nextRunsUsed)
    setIsRunningRawCode(true)
    const result = await executeRawCodingQuestion(quizQuestion.rawCoding, selectedLanguage, rawSourceCode)
    setRawExecutionResult(result)
    setIsRunningRawCode(false)

    if (runLimit > 0 && !result.passed && nextRunsUsed >= runLimit) {
      const player = playerRef.current
      if (player) {
        player.applyDirectHealthDamage(999999)
        syncPlayerState(player)
      }
      handleQuizAnswer(quizQuestion.correctIndex === 0 ? 1 : 0)
    }
  }

  const handleSubmitRawCoding = () => {
    if (!canSubmitRawCodingAnswer || !quizQuestion) {
      return
    }

    handleQuizAnswer(quizQuestion.correctIndex)
  }

  const handleAutoAnswerQuestion = async () => {
    if (!ANSWER_QUESTION_AUTO || !quizQuestion || quizAnswerResult !== null) {
      return
    }

    if (isRawCodingQuestion && quizQuestion.rawCoding) {
      handleQuizAnswer(quizQuestion.correctIndex, { skipStats: true, skipRewardDialog: true })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isValidListQuestion && quizQuestion.validList) {
      handleValidListAnswer(quizQuestion.validList.validIndices, { skipStats: true, skipRewardDialog: true })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isOrderItemsQuestion && quizQuestion.orderItems) {
      handleOrderItemsAnswer(quizQuestion.orderItems.correctOrder, { skipStats: true, skipRewardDialog: true })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isCapacityQuestion && quizQuestion.capacityQuestion) {
      handleCapacityAnswer(quizQuestion.capacityQuestion.targetValue, {
        skipStats: true,
        skipRewardDialog: true,
      })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isTranscriptionQuestion && quizQuestion.transcriptionQuestion) {
      const transcriptionQuestion = quizQuestion.transcriptionQuestion
      const autoTranscript = [
        transcriptionQuestion.sections.situation,
        transcriptionQuestion.sections.task,
        transcriptionQuestion.sections.action,
        transcriptionQuestion.sections.result,
      ].join(' ')
      handleTranscriptionAnswer(autoTranscript, { skipStats: true, skipRewardDialog: true })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isSystemDesignQuestion) {
      handleSystemDesignAnswer(100, { skipStats: true, skipRewardDialog: true })
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    if (isMultiSectionSystemDesignQuestion && quizQuestion.multiSectionSystemDesign) {
      handleMultiSectionSystemDesignAnswer(
        quizQuestion.multiSectionSystemDesign.sections.map((section) => section.correctIndex),
        { skipStats: true, skipRewardDialog: true },
      )
      recordAutoAnsweredQuestion(quizQuestion)
      return
    }

    handleQuizAnswer(quizQuestion.correctIndex, { skipStats: true, skipRewardDialog: true })
    recordAutoAnsweredQuestion(quizQuestion)
  }

  const handleRawEditorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const applyValueWithHistory = (nextValue: string) => {
      const currentValue = rawSourceCodeRef.current
      if (nextValue === currentValue) {
        return
      }

      pushCodeEditorHistory(codeEditorHistoryRef.current, currentValue)
      rawSourceCodeRef.current = nextValue
      setRawSourceCode(nextValue)
    }

    const handledUndoRedo = handleCodeEditorUndoRedoKeyDown({
      event,
      currentValue: rawSourceCodeRef.current,
      history: codeEditorHistoryRef.current,
      onValueChange: (nextValue) => {
        rawSourceCodeRef.current = nextValue
        setRawSourceCode(nextValue)
      },
      onEdit: () => {
        setRawExecutionResult(null)
      },
    })

    if (handledUndoRedo) {
      return
    }

    handleCodeEditorTabKeyDown({
      event,
      onValueChange: applyValueWithHistory,
      onEdit: () => {
        setRawExecutionResult(null)
      },
    })
  }

  const handleRawEditorBeforeInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const nativeEvent = event.nativeEvent as InputEvent
    const isAutoPeriodReplacement =
      (nativeEvent.inputType === 'insertText' || nativeEvent.inputType === 'insertReplacementText') &&
      nativeEvent.data === '. '

    if (!isAutoPeriodReplacement) {
      return
    }

    const textarea = event.currentTarget
    if (textarea.selectionStart !== textarea.selectionEnd) {
      return
    }

    const selectionStart = textarea.selectionStart
    const currentValue = rawSourceCodeRef.current
    if (selectionStart <= 0 || currentValue[selectionStart - 1] !== ' ') {
      return
    }

    // macOS/iOS can auto-convert double-space to ". ". Keep the intended second space.
    event.preventDefault()
    const nextValue = `${currentValue.slice(0, selectionStart)} ${currentValue.slice(selectionStart)}`
    pushCodeEditorHistory(codeEditorHistoryRef.current, currentValue)
    rawSourceCodeRef.current = nextValue
    setRawSourceCode(nextValue)
    setRawExecutionResult(null)

    const nextCursor = selectionStart + 1
    window.requestAnimationFrame(() => {
      textarea.setSelectionRange(nextCursor, nextCursor)
    })
  }

  const normalizeDoubleSpaceAutoPeriod = (
    nextValue: string,
    textarea: HTMLTextAreaElement,
    nativeEvent: InputEvent,
  ): { nextValue: string; shouldRestoreSelection: boolean } => {
    const isAutoPeriodReplacement =
      (nativeEvent.inputType === 'insertText' || nativeEvent.inputType === 'insertReplacementText') &&
      nativeEvent.data === '. '

    if (!isAutoPeriodReplacement) {
      return {
        nextValue,
        shouldRestoreSelection: false,
      }
    }

    const cursor = textarea.selectionStart
    if (cursor < 2) {
      return {
        nextValue,
        shouldRestoreSelection: false,
      }
    }

    const recentPair = nextValue.slice(cursor - 2, cursor)
    if (recentPair !== '. ') {
      return {
        nextValue,
        shouldRestoreSelection: false,
      }
    }

    return {
      nextValue: `${nextValue.slice(0, cursor - 2)}  ${nextValue.slice(cursor)}`,
      shouldRestoreSelection: true,
    }
  }

  const handleRawEditorBraceSelection = () => {
    if (quizAnswerResult !== null) {
      setRawEditorBraceHighlightIndex(null)
      return
    }

    const textarea = rawEditorRef.current
    if (!textarea) {
      setRawEditorBraceHighlightIndex(null)
      return
    }

    setRawEditorBraceHighlightIndex(
      getMatchingBraceHighlightIndex(textarea.value, textarea.selectionStart, textarea.selectionEnd),
    )
  }

  const handleRawEditorScroll = () => {
    const textarea = rawEditorRef.current
    if (!textarea) {
      return
    }

    setRawEditorScroll({
      top: textarea.scrollTop,
      left: textarea.scrollLeft,
    })
  }

  const handleToggleValidListItem = (index: number) => {
    if (!isValidListQuestion || quizAnswerResult !== null) {
      return
    }

    setSelectedValidListIndices((previous) => {
      if (previous.includes(index)) {
        return previous.filter((value) => value !== index)
      }

      return [...previous, index]
    })
  }

  const handleSubmitValidList = () => {
    if (!isValidListQuestion || quizAnswerResult !== null) {
      return
    }

    handleValidListAnswer(selectedValidListIndices)
  }

  const handleOrderItemsDraftChange = useCallback((orderedIndices: number[]) => {
    const questionId = quizQuestion?.id
    if (!questionId) {
      return
    }

    const nextDraft = {
      questionId,
      orderedIndices,
    }
    orderItemsDraftRef.current = nextDraft

    setOrderItemsDraft((previous) => {
      if (
        previous &&
        previous.questionId === questionId &&
        previous.orderedIndices.length === orderedIndices.length &&
        previous.orderedIndices.every((value, index) => value === orderedIndices[index])
      ) {
        return previous
      }

      return nextDraft
    })
  }, [quizQuestion?.id])

  if (!quizActive) {
    return null
  }

  if (!quizQuestion) {
    if (nextQuestionDelaySecondsLeft <= 0) {
      return null
    }

    return (
      <section className="quiz-overlay" aria-live="polite" aria-label="Question timeout">
        <div className="quiz-card quiz-timeout-card">
          <header className="quiz-header">
            <div>
              <p className="quiz-eyebrow">Question Timeout</p>
              <h2>Next question locked</h2>
            </div>
            <span>
              {quizCorrectAnswers}/{Math.max(1, quizTotalAnswered)} correct
              <br />
              {quizCorrectForNextLife}/{quizCorrectNeededForNextLife} to next life
            </span>
          </header>

          <div className="quiz-timeout-body">
            <p className="quiz-timeout-copy">You missed the previous question. The next one unlocks after this timeout ends.</p>
            <div className="quiz-timeout-clock" aria-label={`Next question in ${nextQuestionDelaySecondsLeft} seconds`}>
              {nextQuestionDelaySecondsLeft}s
            </div>
            {quizIncorrectExplanation ? (
              <div className="quiz-timeout-reason-card" role="note" aria-label="Previous answer explanation">
                <p className="quiz-timeout-reason-title">Why the previous answer was incorrect</p>
                <p>
                  <strong>Your answer:</strong> {quizIncorrectExplanation.selectedOption}
                </p>
                <div className="quiz-rich-text">{renderRichText(quizIncorrectExplanation.selectedReason, 'quiz-modal-copy')}</div>
                <p>
                  <strong>Correct answer:</strong> {quizIncorrectExplanation.correctOption}
                </p>
                <div className="quiz-rich-text">{renderRichText(quizIncorrectExplanation.correctReason, 'quiz-modal-copy')}</div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  const activeQuizQuestion = displayedQuizQuestion ?? quizQuestion
  const modalRoot = typeof document !== 'undefined' ? document.body : null

  return (
    <section
      className={`quiz-overlay${isWideDesignQuestion ? ' quiz-overlay-wide' : ''}`}
      aria-live="polite"
      aria-label={isMultiSectionSystemDesignQuestion ? 'Multi-section system design quiz' : 'System design quiz'}
    >
      <div className={`quiz-card${isWideDesignQuestion ? ' quiz-card-wide' : ''}`}>
        {isGamePaused ? (
          <div className="quiz-manual-pause-banner-track">
            <div className="quiz-manual-pause-banner">
              <span>Game Paused</span>
              {onRequestUnpauseGame ? (
                <button
                  type="button"
                  className="quiz-manual-pause-resume"
                  onClick={onRequestUnpauseGame}
                >
                  Unpause
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
        <header className="quiz-header">
          <div>
            <p className="quiz-eyebrow">
              question
            </p>
            <h2>
              {isRawCodingQuestion
                ? 'Implement and verify the solution locally'
                : panel.getHeadingText()}
            </h2>
          </div>
          <span>
            {quizCorrectAnswers}/{Math.max(1, quizTotalAnswered)} correct
            <br />
            {quizCorrectForNextLife}/{quizCorrectNeededForNextLife} to next life
          </span>
          {ANSWER_QUESTION_AUTO ? (
            <button
              type="button"
              className="star-story-inline-button"
              onClick={handleAutoAnswerQuestion}
              disabled={quizAnswerResult !== null}
            >
              Auto Answer
            </button>
          ) : null}
        </header>

        <div className="quiz-meta-row">
          <p className="quiz-difficulty">Difficulty: {activeQuizQuestion.difficulty}</p>
          {quizUpcomingBuffLabel ? (
            <p className="quiz-question-seen">Correct reward: {quizUpcomingBuffLabel} (round only)</p>
          ) : null}
        </div>

        <div className={isGamePaused ? 'quiz-interaction-zone quiz-interaction-zone-paused' : 'quiz-interaction-zone'}>
        <div className="quiz-question-body">
          {renderRichText(activeQuizQuestion.prompt, 'quiz-question', hoveredCodeOption)}
          {supportsCodeHoverPreview && !isRawCodingQuestion ? (
            <p className="quiz-code-preview-note">Hover an answer choice to preview it in the blank.</p>
          ) : null}

          {isRawCodingQuestion && activeQuizQuestion.rawCoding ? (
            <div className="quiz-raw-coding-panel">
              <div className="quiz-raw-toolbar">
                <label className="quiz-raw-language-label" htmlFor="quiz-raw-language">
                  Language
                </label>
                <select
                  id="quiz-raw-language"
                  className="quiz-raw-language-select"
                  value={selectedLanguage}
                  disabled={quizAnswerResult !== null}
                  onChange={(event) => handleRawCodingLanguageChange(event.target.value as RawCodingLanguageId)}
                >
                  {rawLanguageTemplates.map((entry) => (
                    <option key={entry.language} value={entry.language}>
                      {entry.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="quiz-raw-editor-shell">
                <pre
                  className="quiz-raw-editor-mirror"
                  aria-hidden="true"
                  style={{
                    transform: `translate(${-rawEditorScroll.left}px, ${-rawEditorScroll.top}px)`,
                  }}
                >
                  {renderRawEditorMirror(rawSourceCode, rawEditorBraceHighlightIndex)}
                </pre>
                <textarea
                  ref={rawEditorRef}
                  className="quiz-raw-editor"
                  value={rawSourceCode}
                  disabled={quizAnswerResult !== null}
                  onChange={(event) => {
                    const nativeInputEvent = event.nativeEvent as InputEvent
                    const normalizedValue = normalizeCodeEditorValue(event.target.value)
                    const { nextValue, shouldRestoreSelection } = normalizeDoubleSpaceAutoPeriod(
                      normalizedValue,
                      event.target,
                      nativeInputEvent,
                    )
                    const currentValue = rawSourceCodeRef.current
                    if (nextValue !== currentValue) {
                      pushCodeEditorHistory(codeEditorHistoryRef.current, currentValue)
                    }
                    rawSourceCodeRef.current = nextValue
                    setRawSourceCode(nextValue)
                    setRawExecutionResult(null)

                    if (shouldRestoreSelection) {
                      const { selectionStart, selectionEnd } = event.target
                      window.requestAnimationFrame(() => {
                        event.target.setSelectionRange(selectionStart, selectionEnd)
                      })
                    }
                  }}
                  onSelect={handleRawEditorBraceSelection}
                  onBeforeInput={handleRawEditorBeforeInput}
                  onKeyDown={handleRawEditorKeyDown}
                  onKeyUp={handleRawEditorBraceSelection}
                  onMouseUp={handleRawEditorBraceSelection}
                  onScroll={handleRawEditorScroll}
                  rows={16}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                />
              </div>

              <div className="quiz-raw-actions">
                <button
                  type="button"
                  className="quiz-raw-button"
                  disabled={quizAnswerResult !== null || isRunningRawCode || (playerRef.current?.getRawCodingRunLimit() ?? 0) > 0 && rawCodingRunsUsed >= (playerRef.current?.getRawCodingRunLimit() ?? 0)}
                  onClick={handleRunRawCoding}
                >
                  {isRunningRawCode ? 'Running tests...' : (() => {
                    const runLimit = playerRef.current?.getRawCodingRunLimit() ?? 0
                    return runLimit > 0 ? `Compile & Run (${rawCodingRunsUsed}/${runLimit})` : 'Compile & Run Local Tests'
                  })()}
                </button>
                <button
                  type="button"
                  className="quiz-raw-button"
                  disabled={quizAnswerResult !== null || !canSubmitRawCodingAnswer}
                  onClick={handleSubmitRawCoding}
                >
                  Submit Passing Solution
                </button>
                <button
                  type="button"
                  className="quiz-raw-button"
                  disabled={quizAnswerResult !== null || activeQuizQuestion.options.length <= 1 || availableSkips <= 0}
                  onClick={() => handleQuizAnswer(1, { isSkip: true })}
                >
                  Submit As Incomplete (Spend 1 Skip)
                </button>
              </div>

              {rawExecutionResult ? (
                <div className="quiz-explanation-block">
                  <p>{rawExecutionResult.message}</p>
                  {rawExecutionResult.caseResults.map((caseResult) => (
                    <p key={`raw-case-${caseResult.index}`}>
                      Test {caseResult.index + 1}: {caseResult.passed ? 'PASS' : 'FAIL'} | input {caseResult.inputPreview} | expected {caseResult.expectedPreview} | actual {caseResult.actualPreview}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {isValidListQuestion && quizQuestion.validList ? (
          <div className="quiz-valid-list">
            <p className="quiz-code-preview-note">
              {quizQuestion.validList.helperText ?? 'Select every valid item and submit your full set.'}
            </p>
            <div className={`quiz-valid-list-status${validListSelectionDelta === 0 ? ' quiz-valid-list-status-on-target' : validListSelectionDelta > 0 ? ' quiz-valid-list-status-over' : ' quiz-valid-list-status-under'}`}>
              <span>
                Correct selected: {validListSelectedCorrectCount}/{validListExpectedCount}
              </span>
              <span>{validListSelectionStatus}</span>
            </div>
            <div className="quiz-valid-list-grid">
              {quizQuestion.validList.items.map((item, index) => {
                const selected = selectedValidListIndices.includes(index)
                return (
                  <button
                    key={`${quizQuestion.id}-valid-item-${index}`}
                    type="button"
                    className={selected ? 'quiz-valid-item quiz-valid-item-selected' : 'quiz-valid-item'}
                    disabled={quizAnswerResult !== null}
                    onClick={() => handleToggleValidListItem(index)}
                  >
                    <span className="quiz-valid-item-check">{selected ? '✓' : ''}</span>
                    <span className="quiz-valid-item-content">{item}</span>
                  </button>
                )
              })}
            </div>
            <div className="quiz-raw-actions">
              <button
                type="button"
                className="quiz-raw-button"
                disabled={quizAnswerResult !== null}
                onClick={handleSubmitValidList}
              >
                Submit Selection
              </button>
            </div>
          </div>
        ) : null}

        {isOrderItemsQuestion && quizQuestion.orderItems ? (
          <QuizPanelQuestionOrder
            questionId={quizQuestion.id}
            orderItems={quizQuestion.orderItems}
            quizAnswerResult={quizAnswerResult}
            savedOrderIndices={
              orderItemsDraft && orderItemsDraft.questionId === quizQuestion.id
                ? orderItemsDraft.orderedIndices
                : null
            }
            onOrderChange={handleOrderItemsDraftChange}
            onSubmitOrder={handleOrderItemsAnswer}
            availableSkips={availableSkips}
          />
        ) : null}

        {isCapacityQuestion && quizQuestion.capacityQuestion ? (
          <QuizPanelQuestionCapacity
            questionId={quizQuestion.id}
            capacityQuestion={quizQuestion.capacityQuestion}
            quizAnswerResult={quizAnswerResult}
            onSubmitEstimate={handleCapacityAnswer}
          />
        ) : null}

        {isTranscriptionQuestion && quizQuestion.transcriptionQuestion ? (
          <QuizPanelQuestionTranscription
            questionId={quizQuestion.id}
            questionPrompt={quizQuestion.prompt}
            difficulty={quizQuestion.difficulty}
            micOnlyMode={micOnlyModeEnabled}
            transcriptionQuestion={quizQuestion.transcriptionQuestion}
            quizAnswerResult={quizAnswerResult}
            onSubmitTranscript={handleTranscriptionAnswer}
          />
        ) : null}

        {isSystemDesignQuestion && quizQuestion.systemDesign ? (
          <SystemDesignPanel
            key={quizQuestion.id}
            quizQuestion={quizQuestion}
            quizAnswerResult={quizAnswerResult}
            onSubmitDesign={handleSystemDesignAnswer}
            onSkipDesign={() => handleSystemDesignAnswer(0, { isSkip: true })}
            availableSkips={availableSkips}
            savedDraft={
              systemDesignDraft && systemDesignDraft.questionId === quizQuestion.id
                ? systemDesignDraft.draft
                : null
            }
            onDraftChange={handleSystemDesignDraftChange}
          />
        ) : null}

        {isMultiSectionSystemDesignQuestion && quizQuestion.multiSectionSystemDesign ? (
          <MultiSectionSystemDesignPanel
            key={quizQuestion.id}
            quizQuestion={quizQuestion}
            quizAnswerResult={quizAnswerResult}
            onSubmitDesign={handleMultiSectionSystemDesignAnswer}
            onSkipDesign={() => handleMultiSectionSystemDesignAnswer([], { isSkip: true })}
            availableSkips={availableSkips}
            savedDraft={
              multiSectionSystemDesignDraft && multiSectionSystemDesignDraft.questionId === quizQuestion.id
                ? multiSectionSystemDesignDraft.draft
                : null
            }
            onDraftChange={handleMultiSectionSystemDesignDraftChange}
          />
        ) : null}

        {!isRawCodingQuestion && !isValidListQuestion && !isOrderItemsQuestion && !isCapacityQuestion && !isTranscriptionQuestion && !isSystemDesignQuestion && !isMultiSectionSystemDesignQuestion ? (
          <>
            <div className="quiz-options">
              {quizQuestion.options.map((option, index) => (
                <button
                  key={`${quizQuestion.id}-${option}`}
                  type="button"
                  className={hoveredOptionIndex === index ? 'quiz-option quiz-option-previewing' : 'quiz-option'}
                  disabled={quizAnswerResult !== null}
                  onClick={() => handleQuizAnswer(index)}
                  onMouseEnter={() => setHoveredOptionIndex(index)}
                  onMouseLeave={() => setHoveredOptionIndex((currentIndex) => (currentIndex === index ? null : currentIndex))}
                  onFocus={() => setHoveredOptionIndex(index)}
                  onBlur={() => setHoveredOptionIndex((currentIndex) => (currentIndex === index ? null : currentIndex))}
                >
                  <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="quiz-option-content">{renderInlineCodeSegments(option)}</span>
                </button>
              ))}
            </div>

            {quizQuestion.id.includes('complete-code-LiveCode') ? (
              <div className="quiz-raw-actions">
                <button
                  type="button"
                  className="quiz-raw-button"
                  disabled={quizAnswerResult !== null || availableSkips <= 0}
                  onClick={() => handleQuizAnswer(quizQuestion.correctIndex, { isSkip: true })}
                >
                  Skip Problem (Spend 1 Skip)
                </button>
              </div>
            ) : null}
          </>
        ) : null}
        </div>
      </div>

      {modalRoot && quizCorrectExplanation
        ? createPortal(
            <div className="quiz-modal-backdrop quiz-modal-backdrop-correct" role="dialog" aria-modal="true" aria-label="Correct answer explanation">
              <div className="quiz-modal-card quiz-modal-card-correct quiz-modal-card-correct-celebrating">
                <div className="quiz-reward-header">
                  <h3>Rewards</h3>
                </div>

                {quizCorrectRewardSummary ? (
                  <>
                    <section className="quiz-reward-topline">
                      <div className="quiz-reward-gold-stack">
                        <p className="quiz-reward-gold-hero">+{Math.round(quizCorrectRewardSummary.goldReward)}g</p>
                        <p className="quiz-reward-gold-label">gold earned</p>
                        <p className="quiz-reward-mini-copy">
                          Question gold: {quizCorrectRewardSummary.baseGoldReward}g x difficulty {quizCorrectRewardSummary.difficultyGoldMultiplier.toFixed(2)}x x question bonus {quizCorrectRewardSummary.questionBonusGoldMultiplier.toFixed(2)}x x artifact bonus {quizCorrectRewardSummary.artifactGoldMultiplier.toFixed(2)}x{quizCorrectRewardSummary.runLaunchGoldMultiplier > 1 ? ` x launch bonus ${quizCorrectRewardSummary.runLaunchGoldMultiplier.toFixed(2)}x` : ''}{quizCorrectRewardSummary.starStoryGoldMultiplier > 1 ? ` x star story bonus ${quizCorrectRewardSummary.starStoryGoldMultiplier.toFixed(2)}x` : ''}{quizCorrectRewardSummary.runWideGoldMultiplier > 1 ? ` x run-wide bonus ${quizCorrectRewardSummary.runWideGoldMultiplier.toFixed(2)}x` : ''} = {quizCorrectRewardSummary.questionGoldReward.toFixed(1)}g
                          {quizCorrectRewardSummary.streakBaseGoldReward > 0
                            ? ` | Streak bonus: ${quizCorrectRewardSummary.streakBaseGoldReward.toFixed(1)}g x any-gain ${quizCorrectRewardSummary.anyGainGoldMultiplier.toFixed(2)}x${quizCorrectRewardSummary.runWideGoldMultiplier > 1 ? ` x run-wide ${quizCorrectRewardSummary.runWideGoldMultiplier.toFixed(2)}x` : ''} = ${quizCorrectRewardSummary.streakGoldReward.toFixed(1)}g`
                            : ''}
                        </p>
                        {quizCorrectRewardSummary.goldArtifactEffects.length > 0 && (
                          <div className="quiz-reward-artifact-effects">
                            {quizCorrectRewardSummary.goldArtifactEffects.map((effect) => (
                              <p key={effect.artifactId} className={`quiz-reward-artifact-effect ${effect.appliedToThisReward ? 'active' : 'inactive'}`}>
                                <span className="artifact-name">{effect.artifactName}</span>: {effect.details}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="quiz-reward-buff-chip">{quizCorrectRewardSummary.roundBuffLabel}</p>
                    </section>

                  </>
                ) : null}

                <section className="quiz-reason-card">
                  <div className="quiz-rich-text">{renderRichText(quizCorrectExplanation.detailedExplanation, 'quiz-modal-copy quiz-modal-copy-subtle')}</div>
                </section>

                <button type="button" className="quiz-next" onClick={handleResumeAfterCorrectQuizAnswer}>
                  OK
                </button>
              </div>
            </div>,
            modalRoot,
          )
        : null}

      {modalRoot && quizAnswerResult === 'incorrect' && quizIncorrectExplanation
        ? createPortal(
            <div className="quiz-modal-backdrop" role="dialog" aria-modal="true" aria-label="Incorrect answer explanation">
              <div className="quiz-modal-card quiz-modal-card-incorrect">
                <h3>Wrong Answer</h3>
                <p>
                  <strong>Your answer:</strong> {quizIncorrectExplanation.selectedOption}
                </p>
                <div className="quiz-rich-text">{renderRichText(quizIncorrectExplanation.selectedReason, 'quiz-modal-copy')}</div>
                <p>
                  <strong>Correct answer:</strong> {quizIncorrectExplanation.correctOption}
                </p>
                <div className="quiz-rich-text">{renderRichText(quizIncorrectExplanation.correctReason, 'quiz-modal-copy')}</div>
                <button type="button" className="quiz-next" onClick={handleResumeAfterIncorrectQuizAnswer}>
                  {getIsQuizPaused() ? 'Resume Round' : 'Continue'}
                </button>
              </div>
            </div>,
            modalRoot,
          )
        : null}
    </section>
  )
}
