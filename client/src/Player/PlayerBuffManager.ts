import { ArtifactStateManager, type PlayerArtifactStats } from './Artifacts/ArtifactStateManager'

export interface ActiveConsumableEffect {
  id: string
  name: string
  remainingSeconds: number
}

export type RoundQuizBuffType = 'damage' | 'fireRate' | 'health' | 'shield'

export interface RoundQuizBuffStacks {
  damage: number
  fireRate: number
  health: number
  shield: number
}

export const ROUND_QUIZ_BUFF_DAMAGE_PER_STACK = 0.2
export const ROUND_QUIZ_BUFF_FIRE_RATE_PER_STACK = 0.2
export const ROUND_QUIZ_BUFF_HEALTH_DAMAGE_REDUCTION_PER_STACK = 0.2
export const ROUND_QUIZ_BUFF_SHIELD_DAMAGE_REDUCTION_PER_STACK = 0.2

export const ROUND_QUIZ_BUFF_LABELS: Record<RoundQuizBuffType, string> = {
  damage: '+20% damage',
  fireRate: '+20% rate of fire',
  health: '+20% health damage reduction',
  shield: '+20% shield damage reduction',
}

export type { PlayerArtifactStats } from './Artifacts/ArtifactStateManager'

export class PlayerBuffManager {
  private readonly artifactStateManager = new ArtifactStateManager()
  private temporaryAttackSpeedMultiplier = 1
  private temporaryAttackSpeedRemaining = 0
  private activeConsumableEffects: ActiveConsumableEffect[] = []
  private roundDamageBuffStacks = 0
  private roundFireRateBuffStacks = 0
  private roundHealthBuffStacks = 0
  private roundShieldBuffStacks = 0

  addPermanentAttackSpeedMultiplier(multiplier: number) {
    this.artifactStateManager.addPermanentAttackSpeedMultiplier(multiplier)
  }

  addTemporaryAttackSpeedMultiplier(
    multiplier: number,
    durationSeconds: number,
    effectName = 'Attack Speed Boost',
    effectId = 'attack-speed-boost',
  ) {
    this.temporaryAttackSpeedMultiplier = Math.max(0.2, this.temporaryAttackSpeedMultiplier * multiplier)
    this.temporaryAttackSpeedRemaining = Math.max(this.temporaryAttackSpeedRemaining, durationSeconds)

    const existingIndex = this.activeConsumableEffects.findIndex((effect) => effect.id === effectId)
    if (existingIndex >= 0) {
      this.activeConsumableEffects[existingIndex].remainingSeconds = Math.max(
        this.activeConsumableEffects[existingIndex].remainingSeconds,
        durationSeconds,
      )
      this.activeConsumableEffects[existingIndex].name = effectName
      return
    }

    this.activeConsumableEffects.push({
      id: effectId,
      name: effectName,
      remainingSeconds: durationSeconds,
    })
  }

  addPermanentAttackDamage(amount: number) {
    this.artifactStateManager.addPermanentAttackDamage(amount)
  }

  applyRoundQuizBuff(buffType: RoundQuizBuffType) {
    if (buffType === 'damage') {
      this.roundDamageBuffStacks += 1
      return
    }

    if (buffType === 'fireRate') {
      this.roundFireRateBuffStacks += 1
      return
    }

    if (buffType === 'health') {
      this.roundHealthBuffStacks += 1
      return
    }

    this.roundShieldBuffStacks += 1
  }

  addHealthShieldDamageReductionStack() {
    this.roundHealthBuffStacks += 1
    this.roundShieldBuffStacks += 1
  }

  // Backward-compatible entry point used by older quiz code paths.
  addQuizFireRateStack(_durationSeconds: number) {
    this.applyRoundQuizBuff('fireRate')
  }

  resetRoundQuizBuffs() {
    this.roundDamageBuffStacks = 0
    this.roundFireRateBuffStacks = 0
    this.roundHealthBuffStacks = 0
    this.roundShieldBuffStacks = 0
  }

  getRoundDamageMultiplier() {
    return 1 + this.roundDamageBuffStacks * ROUND_QUIZ_BUFF_DAMAGE_PER_STACK
  }

  getRoundFireRateMultiplier() {
    return 1 + this.roundFireRateBuffStacks * ROUND_QUIZ_BUFF_FIRE_RATE_PER_STACK
  }

  getRoundHealthMultiplier() {
    return 1
  }

  getRoundShieldMultiplier() {
    return 1
  }

  getRoundHealthDamageReductionMultiplier() {
    const reduction = Math.min(0.9, this.roundHealthBuffStacks * ROUND_QUIZ_BUFF_HEALTH_DAMAGE_REDUCTION_PER_STACK)
    return 1 - reduction
  }

  getRoundShieldDamageReductionMultiplier() {
    const reduction = Math.min(0.9, this.roundShieldBuffStacks * ROUND_QUIZ_BUFF_SHIELD_DAMAGE_REDUCTION_PER_STACK)
    return 1 - reduction
  }

  getRoundBuffStacks(): RoundQuizBuffStacks {
    return {
      damage: this.roundDamageBuffStacks,
      fireRate: this.roundFireRateBuffStacks,
      health: this.roundHealthBuffStacks,
      shield: this.roundShieldBuffStacks,
    }
  }

  setRoundBuffStacks(stacks: RoundQuizBuffStacks) {
    this.roundDamageBuffStacks = Math.max(0, Math.floor(stacks.damage))
    this.roundFireRateBuffStacks = Math.max(0, Math.floor(stacks.fireRate))
    this.roundHealthBuffStacks = Math.max(0, Math.floor(stacks.health))
    this.roundShieldBuffStacks = Math.max(0, Math.floor(stacks.shield))
  }

  getAttackDamage(baseAttackDamage: number) {
    const basePlusPermanent = baseAttackDamage + this.artifactStateManager.getPermanentAttackDamageBonus()
    return basePlusPermanent * this.getRoundDamageMultiplier()
  }

  getAttackInterval(baseAttackInterval: number) {
    const roundRateMultiplier = 1 / this.getRoundFireRateMultiplier()
    return (
      baseAttackInterval *
      this.artifactStateManager.getPermanentAttackSpeedMultiplier() *
      this.temporaryAttackSpeedMultiplier *
      roundRateMultiplier
    )
  }

  getActiveConsumableEffects() {
    return this.activeConsumableEffects.map((effect) => ({ ...effect }))
  }

  tick(delta: number) {
    if (this.temporaryAttackSpeedRemaining > 0) {
      this.temporaryAttackSpeedRemaining -= delta
      if (this.temporaryAttackSpeedRemaining <= 0) {
        this.temporaryAttackSpeedRemaining = 0
        this.temporaryAttackSpeedMultiplier = 1
      }
    }

    this.activeConsumableEffects = this.activeConsumableEffects
      .map((effect) => ({
        ...effect,
        remainingSeconds: effect.remainingSeconds - delta,
      }))
      .filter((effect) => effect.remainingSeconds > 0)
  }

  addBaseShieldPerWave(amount: number) {
    this.artifactStateManager.addBaseShieldPerWave(amount)
  }

  addShieldRechargeOnHealthHitPercent(percent: number) {
    this.artifactStateManager.addShieldRechargeOnHealthHitPercent(percent)
  }

  addBounceChancePercent(percent: number) {
    this.artifactStateManager.addBounceChancePercent(percent)
  }

  addBurstSize(amount: number) {
    this.artifactStateManager.addBurstSize(amount)
  }

  setBurningProjectiles(damagePerSecond: number, durationSeconds: number) {
    this.artifactStateManager.setBurningProjectiles(damagePerSecond, durationSeconds)
  }

  addHealthOnKill(amount: number) {
    this.artifactStateManager.addHealthOnKill(amount)
  }

  addShieldOnKill(amount: number) {
    this.artifactStateManager.addShieldOnKill(amount)
  }

  addDamageOnKill(amount: number) {
    this.artifactStateManager.addDamageOnKill(amount)
  }

  addAdditionalKillCredits(amount: number) {
    this.artifactStateManager.addAdditionalKillCredits(amount)
  }

  addGoldGainMultiplier(percent: number) {
    this.artifactStateManager.addGoldGainMultiplier(percent)
  }

  addQuizBonusHealthPercent(percent: number) {
    this.artifactStateManager.addQuizBonusHealthPercent(percent)
  }

  addQuizFreezeDurationSeconds(seconds: number) {
    this.artifactStateManager.addQuizFreezeDurationSeconds(seconds)
  }

  addFreezeBombSecondsPerCorrect(seconds: number) {
    this.artifactStateManager.addFreezeBombSecondsPerCorrect(seconds)
  }

  addFireBombDamagePerSecond(amount: number) {
    this.artifactStateManager.addFireBombDamagePerSecond(amount)
  }

  addDeflectionShieldChancePercent(percent: number) {
    this.artifactStateManager.addDeflectionShieldChancePercent(percent)
  }

  multiplyRawCodingGoldMultiplier(multiplier: number) {
    this.artifactStateManager.multiplyRawCodingGoldMultiplier(multiplier)
  }

  addMiniFleetAlliesPerCorrect(amount: number) {
    this.artifactStateManager.addMiniFleetAlliesPerCorrect(amount)
  }

  addBigBossSummonChancePerCorrect(chance: number) {
    this.artifactStateManager.addBigBossSummonChancePerCorrect(chance)
  }

  getBaseShieldPerWave() {
    return this.artifactStateManager.getBaseShieldPerWave()
  }

  getShieldRechargeOnHealthHitPercent() {
    return this.artifactStateManager.getShieldRechargeOnHealthHitPercent()
  }

  getBounceChancePercent() {
    return this.artifactStateManager.getBounceChancePercent()
  }

  getBurstSize() {
    return this.artifactStateManager.getBurstSize()
  }

  getBurnDamagePerSecond() {
    return this.artifactStateManager.getBurnDamagePerSecond()
  }

  getBurnDurationSeconds() {
    return this.artifactStateManager.getBurnDurationSeconds()
  }

  getHealthOnKill() {
    return this.artifactStateManager.getHealthOnKill()
  }

  getShieldOnKill() {
    return this.artifactStateManager.getShieldOnKill()
  }

  getDamageOnKill() {
    return this.artifactStateManager.getDamageOnKill()
  }

  getAdditionalKillCredits() {
    return this.artifactStateManager.getAdditionalKillCredits()
  }

  getGoldGainMultiplier() {
    return this.artifactStateManager.getGoldGainMultiplier()
  }

  getQuizBonusHealthPercent() {
    return this.artifactStateManager.getQuizBonusHealthPercent()
  }

  getQuizFreezeDurationSeconds() {
    return this.artifactStateManager.getQuizFreezeDurationSeconds()
  }

  getFreezeBombSecondsPerCorrect() {
    return this.artifactStateManager.getFreezeBombSecondsPerCorrect()
  }

  getFireBombDamagePerSecond() {
    return this.artifactStateManager.getFireBombDamagePerSecond()
  }

  getDeflectionShieldChancePercent() {
    return this.artifactStateManager.getDeflectionShieldChancePercent()
  }

  getRawCodingGoldMultiplier() {
    return this.artifactStateManager.getRawCodingGoldMultiplier()
  }

  getMiniFleetAlliesPerCorrect() {
    return this.artifactStateManager.getMiniFleetAlliesPerCorrect()
  }

  getBigBossSummonChancePerCorrect() {
    return this.artifactStateManager.getBigBossSummonChancePerCorrect()
  }

  getArtifactStats(): PlayerArtifactStats {
    return this.artifactStateManager.getArtifactStats()
  }

  setArtifactStats(stats: PlayerArtifactStats) {
    this.artifactStateManager.setArtifactStats(stats)
  }
}
