import { useEffect, useMemo, useRef, useState } from 'react'
import type { RawCodingDifficulty, TranscriptionQuestionMeta } from '../quiz/QuizQuestionManager'
import { MicOnlyModeController } from './micOnly/MicOnlyModeController'
import { setLiveMicActive } from './micOnly/MicOnlyLiveMicRegistry'

type BrowserSpeechRecognitionConstructor = new () => {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

interface SpeechRecognitionAlternative {
  transcript: string
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  item: (index: number) => SpeechRecognitionAlternative
}

interface SpeechRecognitionEvent {
  resultIndex: number
  results: {
    length: number
    item: (index: number) => SpeechRecognitionResult
    [index: number]: SpeechRecognitionResult
  }
}

interface SpeechRecognitionErrorEvent {
  error: string
}

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor
  }
}

interface QuizPanelQuestionTranscriptionProps {
  questionId: string
  questionPrompt: string
  difficulty: RawCodingDifficulty
  micOnlyMode: boolean
  transcriptionQuestion: TranscriptionQuestionMeta
  quizAnswerResult: 'correct' | 'incorrect' | null
  onSubmitTranscript: (transcript: string) => void
}

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

function getFirstSentence(text: string): string {
  const sentences = splitIntoSentences(text)
  return sentences[0] ?? text
}

function buildSectionStub(text: string, wordCount = 6): string {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  if (words.length === 0) {
    return '...'
  }

  if (words.length <= wordCount) {
    return words.join(' ')
  }

  return `${words.slice(0, wordCount).join(' ')}...`
}

export function QuizPanelQuestionTranscription({
  questionId,
  questionPrompt,
  difficulty,
  micOnlyMode,
  transcriptionQuestion,
  quizAnswerResult,
  onSubmitTranscript,
}: QuizPanelQuestionTranscriptionProps) {
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [prepCountdownSecondsLeft, setPrepCountdownSecondsLeft] = useState<number | null>(null)
  const [silenceCountdownSecondsLeft, setSilenceCountdownSecondsLeft] = useState<number | null>(null)
  const [hardHintsUnlocked, setHardHintsUnlocked] = useState(false)
  const [showHardHints, setShowHardHints] = useState(false)
  const transcriptRef = useRef('')
  const interimTranscriptRef = useRef('')
  const onSubmitTranscriptRef = useRef(onSubmitTranscript)
  const quizAnswerResultRef = useRef(quizAnswerResult)
  const micOnlyActiveQuestionIdRef = useRef<string | null>(null)
  const micOnlyControllerRef = useRef<MicOnlyModeController | null>(null)
  const recognitionRef = useRef<{
    start: () => void
    stop: () => void
    onresult: ((event: SpeechRecognitionEvent) => void) | null
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
    onend: (() => void) | null
  } | null>(null)

  const speechRecognitionConstructor = useMemo(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
  }, [])

  const displayMode: 'full' | 'firstSentence' | 'memoryOnly' =
    difficulty === 'easy'
      ? 'full'
      : difficulty === 'medium'
        ? 'firstSentence'
        : 'memoryOnly'

  const renderedSections = useMemo(() => {
    const { sections } = transcriptionQuestion

    if (displayMode === 'memoryOnly') {
      return []
    }

    if (displayMode === 'firstSentence') {
      return [
        { label: 'Situation', value: getFirstSentence(sections.situation) },
        { label: 'Task', value: getFirstSentence(sections.task) },
        { label: 'Action', value: getFirstSentence(sections.action) },
        { label: 'Result', value: getFirstSentence(sections.result) },
      ]
    }

    return [
      { label: 'Situation', value: sections.situation },
      { label: 'Task', value: sections.task },
      { label: 'Action', value: sections.action },
      { label: 'Result', value: sections.result },
    ]
  }, [displayMode, transcriptionQuestion])

  useEffect(() => {
    onSubmitTranscriptRef.current = onSubmitTranscript
  }, [onSubmitTranscript])

  useEffect(() => {
    quizAnswerResultRef.current = quizAnswerResult
  }, [quizAnswerResult])

  useEffect(() => {
    transcriptRef.current = transcript
    interimTranscriptRef.current = interimTranscript
  }, [interimTranscript, transcript])

  const hardModeHintSections = useMemo(() => {
    if (displayMode !== 'memoryOnly') {
      return []
    }

    const { sections } = transcriptionQuestion
    return [
      { label: 'Situation', value: buildSectionStub(sections.situation) },
      { label: 'Task', value: buildSectionStub(sections.task) },
      { label: 'Action', value: buildSectionStub(sections.action) },
      { label: 'Result', value: buildSectionStub(sections.result) },
    ]
  }, [displayMode, transcriptionQuestion])

  useEffect(() => {
    setTranscript('')
    setInterimTranscript('')
    setIsListening(false)
    setSpeechError(null)
    setPrepCountdownSecondsLeft(null)
    setSilenceCountdownSecondsLeft(null)
    setHardHintsUnlocked(false)
    setShowHardHints(false)
    setLiveMicActive(false)
    micOnlyActiveQuestionIdRef.current = null

    micOnlyControllerRef.current?.stopSession()

    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
  }, [questionId])

  useEffect(() => {
    if (displayMode !== 'memoryOnly') {
      return
    }

    const timerId = window.setTimeout(() => {
      setHardHintsUnlocked(true)
    }, 10000)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [displayMode, questionId])

  useEffect(() => {
    micOnlyControllerRef.current = new MicOnlyModeController({
      onTranscriptChange: (finalTranscript, nextInterimTranscript) => {
        setTranscript(finalTranscript)
        setInterimTranscript(nextInterimTranscript)
      },
      onPrepCountdownChange: (secondsLeft) => {
        setPrepCountdownSecondsLeft(secondsLeft)
      },
      onSilenceCountdownChange: (secondsLeft) => {
        setSilenceCountdownSecondsLeft(secondsLeft)
      },
      onListeningChange: (nextIsListening) => {
        setIsListening(nextIsListening)
        setLiveMicActive(nextIsListening)
      },
      onError: (message) => {
        setSpeechError(message)
      },
      onReadyToAnswer: () => {
        setSpeechError(null)
      },
      onAutoSubmit: () => {
        if (quizAnswerResultRef.current !== null) {
          return
        }

        const finalTranscript = `${transcriptRef.current} ${interimTranscriptRef.current}`.trim()
        onSubmitTranscriptRef.current(finalTranscript)
      },
    })

    return () => {
      micOnlyControllerRef.current?.dispose()
      micOnlyControllerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!micOnlyMode || quizAnswerResult !== null) {
      return
    }

    if (micOnlyActiveQuestionIdRef.current === questionId) {
      return
    }

    setLiveMicActive(true)
    micOnlyActiveQuestionIdRef.current = questionId

    const promptToSpeak = [
      questionPrompt,
      `Story title: ${transcriptionQuestion.storyTitle}.`,
      'After the countdown, answer by speaking clearly.',
    ].join(' ')

    void micOnlyControllerRef.current?.startSession({
      promptText: promptToSpeak,
      prepSeconds: 3,
      silenceSeconds: 10,
      language: 'en-US',
    })
  }, [micOnlyMode, questionId, questionPrompt, quizAnswerResult, transcriptionQuestion.storyTitle])

  useEffect(() => {
    if (micOnlyMode && quizAnswerResult === null) {
      return
    }

    setLiveMicActive(false)
    micOnlyControllerRef.current?.stopSession()
    micOnlyActiveQuestionIdRef.current = null

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [micOnlyMode, quizAnswerResult])

  useEffect(() => {
    return () => {
      setLiveMicActive(false)
      micOnlyActiveQuestionIdRef.current = null
      micOnlyControllerRef.current?.dispose()
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (micOnlyMode) {
      return
    }

    if (!speechRecognitionConstructor || quizAnswerResult !== null) {
      return
    }

    setSpeechError(null)

    if (!recognitionRef.current) {
      const recognition = new speechRecognitionConstructor()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalPart = ''
        let interimPart = ''

        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index]
          const text = result.item(0)?.transcript ?? ''

          if (result.isFinal) {
            finalPart += `${text} `
          } else {
            interimPart += `${text} `
          }
        }

        if (finalPart.trim().length > 0) {
          setTranscript((previous) => `${previous} ${finalPart}`.trim())
        }

        setInterimTranscript(interimPart.trim())
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setSpeechError(`Microphone transcription error: ${event.error}`)
        setIsListening(false)
        setLiveMicActive(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        setLiveMicActive(false)
      }

      recognitionRef.current = recognition
    }

    recognitionRef.current.start()
    setIsListening(true)
    setLiveMicActive(true)
  }

  const stopListening = () => {
    if (micOnlyMode) {
      micOnlyControllerRef.current?.stopSession()
      return
    }

    recognitionRef.current?.stop()
    setIsListening(false)
    setLiveMicActive(false)
  }

  const handleSubmit = () => {
    if (quizAnswerResult !== null) {
      return
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setLiveMicActive(false)

    const finalTranscript = `${transcript} ${interimTranscript}`.trim()
    onSubmitTranscript(finalTranscript)
  }

  return (
    <div className="quiz-transcription-panel">
      <p className="quiz-code-preview-note">
        {transcriptionQuestion.helperText ?? 'Speak your STAR story answer and submit the transcript for grading.'}
      </p>

      <p className="quiz-transcription-title">Story: {transcriptionQuestion.storyTitle}</p>

      {displayMode === 'memoryOnly' ? (
        <>
          <div className="quiz-transcription-memory-only">
            Recite this STAR story from memory. No section text is shown in hard mode.
          </div>

          <div className="quiz-transcription-hint-row">
            {hardHintsUnlocked ? (
              <button
                type="button"
                className="quiz-raw-button"
                disabled={quizAnswerResult !== null}
                onClick={() => {
                  setShowHardHints((previous) => !previous)
                }}
              >
                {showHardHints ? 'Hide Hints' : 'Show Hints'}
              </button>
            ) : (
              <p className="quiz-transcription-hint-note">Hints unlock in 10s.</p>
            )}
          </div>

          {showHardHints ? (
            <div className="quiz-transcription-sections">
              {hardModeHintSections.map((section) => (
                <div key={`${transcriptionQuestion.problemId}-stub-${section.label}`} className="quiz-transcription-section">
                  <p className="quiz-transcription-section-label">{section.label}</p>
                  <p className="quiz-transcription-section-text">{section.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="quiz-transcription-sections">
          {renderedSections.map((section) => (
            <div key={`${transcriptionQuestion.problemId}-${section.label}`} className="quiz-transcription-section">
              <p className="quiz-transcription-section-label">{section.label}</p>
              <p className="quiz-transcription-section-text">{section.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="quiz-transcription-controls">
        {micOnlyMode ? (
          <div className="quiz-mic-only-status">
            {prepCountdownSecondsLeft !== null ? (
              <p className="quiz-mic-only-status-line">Mic starts in {prepCountdownSecondsLeft}s...</p>
            ) : null}
            {isListening ? <p className="quiz-mic-only-status-line">Listening...</p> : null}
            {silenceCountdownSecondsLeft !== null ? (
              <p className="quiz-mic-only-status-line">
                Auto-submit in {silenceCountdownSecondsLeft}s of silence
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <button
              type="button"
              className="quiz-raw-button"
              disabled={quizAnswerResult !== null || isListening || !speechRecognitionConstructor}
              onClick={startListening}
            >
              {speechRecognitionConstructor ? 'Start Mic' : 'Mic Unavailable'}
            </button>
            <button
              type="button"
              className="quiz-raw-button"
              disabled={quizAnswerResult !== null || !isListening}
              onClick={stopListening}
            >
              Stop Mic
            </button>
          </>
        )}
      </div>

      {speechError ? <p className="quiz-transcription-error">{speechError}</p> : null}

      <textarea
        className="quiz-transcription-editor"
        value={`${transcript}${interimTranscript.length > 0 ? ` ${interimTranscript}` : ''}`.trim()}
        disabled={quizAnswerResult !== null}
        onChange={(event) => {
          setTranscript(event.target.value)
          setInterimTranscript('')
        }}
        rows={8}
        placeholder="Your transcript appears here. You can edit it before submitting."
      />

      <div className="quiz-raw-actions">
        {micOnlyMode ? null : (
          <button
            type="button"
            className="quiz-raw-button"
            disabled={quizAnswerResult !== null}
            onClick={handleSubmit}
          >
            Submit Transcript
          </button>
        )}
      </div>
    </div>
  )
}
