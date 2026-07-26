import { MicOnlyAudioCuePlayer } from './MicOnlyAudioCuePlayer'

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

export interface MicOnlyModeCallbacks {
  onTranscriptChange: (finalTranscript: string, interimTranscript: string) => void
  onPrepCountdownChange: (secondsLeft: number | null) => void
  onSilenceCountdownChange: (secondsLeft: number | null) => void
  onListeningChange: (isListening: boolean) => void
  onError: (message: string | null) => void
  onReadyToAnswer: () => void
  onAutoSubmit: (finalTranscript: string) => void
}

export interface MicOnlyModeSessionOptions {
  promptText: string
  prepSeconds?: number
  silenceSeconds?: number
  language?: string
}

export class MicOnlyModeController {
  private callbacks: MicOnlyModeCallbacks
  private cuePlayer: MicOnlyAudioCuePlayer
  private recognition: {
    start: () => void
    stop: () => void
    onresult: ((event: SpeechRecognitionEvent) => void) | null
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
    onend: (() => void) | null
  } | null = null
  private prepIntervalId: number | null = null
  private silenceIntervalId: number | null = null
  private silenceDeadlineMs: number | null = null
  private lastSilenceTickSecond: number | null = null
  private finalTranscript = ''
  private interimTranscript = ''
  private active = false
  private autoSubmitted = false
  private silenceSeconds = 10

  constructor(callbacks: MicOnlyModeCallbacks) {
    this.callbacks = callbacks
    this.cuePlayer = new MicOnlyAudioCuePlayer()
  }

  private getSpeechRecognitionConstructor(): BrowserSpeechRecognitionConstructor | null {
    if (typeof window === 'undefined') {
      return null
    }

    return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
  }

  private clearTimers(): void {
    if (this.prepIntervalId !== null) {
      window.clearInterval(this.prepIntervalId)
      this.prepIntervalId = null
    }

    if (this.silenceIntervalId !== null) {
      window.clearInterval(this.silenceIntervalId)
      this.silenceIntervalId = null
    }
  }

  private stopRecognition(): void {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  private resetSessionState(): void {
    this.finalTranscript = ''
    this.interimTranscript = ''
    this.autoSubmitted = false
    this.silenceDeadlineMs = null
    this.lastSilenceTickSecond = null
    this.callbacks.onTranscriptChange('', '')
    this.callbacks.onPrepCountdownChange(null)
    this.callbacks.onSilenceCountdownChange(null)
    this.callbacks.onListeningChange(false)
    this.callbacks.onError(null)
  }

  private resetSilenceDeadline(): void {
    this.silenceDeadlineMs = Date.now() + this.silenceSeconds * 1000
    this.lastSilenceTickSecond = null
  }

  private startSilenceWatcher(): void {
    if (this.silenceIntervalId !== null) {
      window.clearInterval(this.silenceIntervalId)
    }

    this.silenceIntervalId = window.setInterval(() => {
      if (!this.active || this.autoSubmitted || this.silenceDeadlineMs === null) {
        return
      }

      const remainingMs = this.silenceDeadlineMs - Date.now()
      const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
      this.callbacks.onSilenceCountdownChange(remainingSeconds)

      if (remainingSeconds <= 3 && remainingSeconds > 0 && this.lastSilenceTickSecond !== remainingSeconds) {
        this.lastSilenceTickSecond = remainingSeconds
        this.cuePlayer.playSoftTick(70, 620)
      }

      if (remainingMs > 0) {
        return
      }

      this.autoSubmitted = true
      this.callbacks.onListeningChange(false)
      this.callbacks.onSilenceCountdownChange(0)
      this.stopRecognition()
      const fullTranscript = `${this.finalTranscript} ${this.interimTranscript}`.trim()
      this.callbacks.onAutoSubmit(fullTranscript)
    }, 200)
  }

  private async speakPrompt(promptText: string): Promise<void> {
    if (typeof window === 'undefined' || !window.speechSynthesis || promptText.trim().length === 0) {
      return
    }

    window.speechSynthesis.cancel()

    await new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(promptText)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()
      window.speechSynthesis.speak(utterance)
    })
  }

  private async runPrepCountdown(seconds: number): Promise<void> {
    if (seconds <= 0) {
      this.callbacks.onPrepCountdownChange(null)
      return
    }

    await new Promise<void>((resolve) => {
      let remaining = seconds
      this.callbacks.onPrepCountdownChange(remaining)

      this.prepIntervalId = window.setInterval(() => {
        if (!this.active) {
          resolve()
          return
        }

        this.cuePlayer.playSoftTick(70, 680)
        remaining -= 1

        if (remaining <= 0) {
          this.callbacks.onPrepCountdownChange(null)
          if (this.prepIntervalId !== null) {
            window.clearInterval(this.prepIntervalId)
            this.prepIntervalId = null
          }
          resolve()
          return
        }

        this.callbacks.onPrepCountdownChange(remaining)
      }, 1000)
    })
  }

  private ensureRecognition(language: string): boolean {
    if (this.recognition) {
      return true
    }

    const RecognitionCtor = this.getSpeechRecognitionConstructor()
    if (!RecognitionCtor) {
      this.callbacks.onError('Microphone transcription is unavailable in this browser.')
      return false
    }

    const recognition = new RecognitionCtor()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = language

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let nextFinalPart = ''
      let nextInterimPart = ''

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        const transcriptChunk = result.item(0)?.transcript ?? ''

        if (result.isFinal) {
          nextFinalPart += `${transcriptChunk} `
        } else {
          nextInterimPart += `${transcriptChunk} `
        }
      }

      if (nextFinalPart.trim().length > 0) {
        this.finalTranscript = `${this.finalTranscript} ${nextFinalPart}`.trim()
      }

      this.interimTranscript = nextInterimPart.trim()
      this.callbacks.onTranscriptChange(this.finalTranscript, this.interimTranscript)

      if (nextFinalPart.trim().length > 0 || nextInterimPart.trim().length > 0) {
        this.resetSilenceDeadline()
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.callbacks.onError(`Microphone transcription error: ${event.error}`)
      this.callbacks.onListeningChange(false)
    }

    recognition.onend = () => {
      this.callbacks.onListeningChange(false)
    }

    this.recognition = recognition
    return true
  }

  async startSession(options: MicOnlyModeSessionOptions): Promise<void> {
    const prepSeconds = options.prepSeconds ?? 3
    this.silenceSeconds = options.silenceSeconds ?? 10

    this.stopSession()
    this.active = true
    this.resetSessionState()

    if (!this.ensureRecognition(options.language ?? 'en-US')) {
      this.active = false
      return
    }

    await this.speakPrompt(options.promptText)
    if (!this.active) {
      return
    }

    await this.runPrepCountdown(prepSeconds)
    if (!this.active || !this.recognition) {
      return
    }

    this.cuePlayer.playMicLiveBeep()
    this.callbacks.onReadyToAnswer()
    this.callbacks.onListeningChange(true)
    this.resetSilenceDeadline()
    this.startSilenceWatcher()
    this.recognition.start()
  }

  stopSession(): void {
    this.active = false
    this.clearTimers()
    this.callbacks.onPrepCountdownChange(null)
    this.callbacks.onSilenceCountdownChange(null)
    this.callbacks.onListeningChange(false)
    this.stopRecognition()
  }

  dispose(): void {
    this.stopSession()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    this.recognition = null
  }
}
