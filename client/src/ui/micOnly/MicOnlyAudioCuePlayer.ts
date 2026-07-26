export class MicOnlyAudioCuePlayer {
  private audioContext: AudioContext | null = null
  private hasBoundUnlockListeners = false

  private bindUnlockListeners(): void {
    if (this.hasBoundUnlockListeners || typeof window === 'undefined') {
      return
    }

    this.hasBoundUnlockListeners = true

    const unlock = () => {
      void this.ensureRunningContext()
    }

    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('touchstart', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
  }

  private async ensureRunningContext(): Promise<AudioContext | null> {
    const context = this.getContext()
    if (!context) {
      return null
    }

    if (context.state === 'running') {
      return context
    }

    try {
      await context.resume()
    } catch {
      return null
    }

    return context
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null
    }

    if (this.audioContext) {
      return this.audioContext
    }

    const AudioContextCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextCtor) {
      return null
    }

    this.audioContext = new AudioContextCtor()
    this.bindUnlockListeners()
    return this.audioContext
  }

  playSoftTick(durationMs = 80, frequency = 720): void {
    void this.playSoftTickInternal(durationMs, frequency)
  }

  private async playSoftTickInternal(durationMs: number, frequency: number): Promise<void> {
    const context = await this.ensureRunningContext()
    if (!context) {
      return
    }

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency

    gainNode.gain.value = 0.0001
    const now = context.currentTime
    const stopAt = now + durationMs / 1000

    gainNode.gain.exponentialRampToValueAtTime(0.03, now + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopAt)

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.start(now)
    oscillator.stop(stopAt)
  }

  playMicLiveBeep(): void {
    void this.playMicLiveBeepInternal()
  }

  private async playMicLiveBeepInternal(): Promise<void> {
    const context = await this.ensureRunningContext()
    if (!context) {
      return
    }

    const leadOscillator = context.createOscillator()
    const leadGain = context.createGain()
    leadOscillator.type = 'triangle'
    leadOscillator.frequency.value = 960

    leadGain.gain.value = 0.0001
    const now = context.currentTime
    const leadStopAt = now + 0.12

    leadGain.gain.exponentialRampToValueAtTime(0.04, now + 0.01)
    leadGain.gain.exponentialRampToValueAtTime(0.0001, leadStopAt)

    leadOscillator.connect(leadGain)
    leadGain.connect(context.destination)
    leadOscillator.start(now)
    leadOscillator.stop(leadStopAt)

    const confirmOscillator = context.createOscillator()
    const confirmGain = context.createGain()
    confirmOscillator.type = 'sine'
    confirmOscillator.frequency.value = 1280
    confirmGain.gain.value = 0.0001

    const confirmStartAt = now + 0.14
    const confirmStopAt = confirmStartAt + 0.12
    confirmGain.gain.setValueAtTime(0.0001, confirmStartAt)
    confirmGain.gain.exponentialRampToValueAtTime(0.036, confirmStartAt + 0.01)
    confirmGain.gain.exponentialRampToValueAtTime(0.0001, confirmStopAt)

    confirmOscillator.connect(confirmGain)
    confirmGain.connect(context.destination)
    confirmOscillator.start(confirmStartAt)
    confirmOscillator.stop(confirmStopAt)
  }
}
