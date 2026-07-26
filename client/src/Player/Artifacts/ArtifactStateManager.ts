export interface PlayerArtifactStats {
  permanentAttackSpeedMultiplier: number
  permanentAttackDamageBonus: number
  baseShieldPerWave: number
  shieldRechargeOnHealthHitPercent: number
  bounceChancePercent: number
  burstSize: number
  burnDamagePerSecond: number
  burnDurationSeconds: number
  healthOnKill: number
  shieldOnKill: number
  damageOnKill: number
  additionalKillCredits: number
  goldGainMultiplier: number
  quizBonusHealthPercent: number
  quizFreezeDurationSeconds: number
  freezeBombSecondsPerCorrect: number
  fireBombDamagePerSecond: number
  deflectionShieldChancePercent: number
  rawCodingGoldMultiplier: number
  miniFleetAlliesPerCorrect: number
  bigBossSummonChancePerCorrect: number
}

export const INITIAL_PLAYER_ARTIFACT_STATS: PlayerArtifactStats = {
  permanentAttackSpeedMultiplier: 1,
  permanentAttackDamageBonus: 0,
  baseShieldPerWave: 0,
  shieldRechargeOnHealthHitPercent: 0,
  bounceChancePercent: 0,
  burstSize: 1,
  burnDamagePerSecond: 0,
  burnDurationSeconds: 0,
  healthOnKill: 0,
  shieldOnKill: 0,
  damageOnKill: 0,
  additionalKillCredits: 0,
  goldGainMultiplier: 1,
  quizBonusHealthPercent: 0,
  quizFreezeDurationSeconds: 0,
  freezeBombSecondsPerCorrect: 0,
  fireBombDamagePerSecond: 0,
  deflectionShieldChancePercent: 0,
  rawCodingGoldMultiplier: 1,
  miniFleetAlliesPerCorrect: 0,
  bigBossSummonChancePerCorrect: 0,
}

export function createInitialPlayerArtifactStats(): PlayerArtifactStats {
  return { ...INITIAL_PLAYER_ARTIFACT_STATS }
}

export function getPlayerArtifactStatsSignature(stats: PlayerArtifactStats): string {
  return [
    stats.permanentAttackSpeedMultiplier.toFixed(3),
    stats.permanentAttackDamageBonus.toFixed(2),
    stats.baseShieldPerWave.toFixed(1),
    stats.shieldRechargeOnHealthHitPercent.toFixed(3),
    stats.bounceChancePercent.toFixed(1),
    stats.burstSize.toFixed(2),
    stats.burnDamagePerSecond.toFixed(2),
    stats.burnDurationSeconds.toFixed(2),
    stats.healthOnKill.toFixed(2),
    stats.shieldOnKill.toFixed(2),
    stats.damageOnKill.toFixed(2),
    stats.additionalKillCredits.toFixed(2),
    stats.goldGainMultiplier.toFixed(3),
    stats.quizBonusHealthPercent.toFixed(3),
    stats.quizFreezeDurationSeconds.toFixed(1),
    stats.freezeBombSecondsPerCorrect.toFixed(1),
    stats.fireBombDamagePerSecond.toFixed(2),
    stats.deflectionShieldChancePercent.toFixed(1),
    stats.rawCodingGoldMultiplier.toFixed(2),
    stats.miniFleetAlliesPerCorrect.toFixed(0),
    stats.bigBossSummonChancePerCorrect.toFixed(3),
  ].join('|')
}

export class ArtifactStateManager {
  private permanentAttackSpeedMultiplier = 1
  private permanentAttackDamageBonus = 0
  private baseShieldPerWave = 0
  private shieldRechargeOnHealthHitPercent = 0
  private bounceChancePercent = 0
  private burstSize = 1
  private burnDamagePerSecond = 0
  private burnDurationSeconds = 0
  private healthOnKill = 0
  private shieldOnKill = 0
  private damageOnKill = 0
  private additionalKillCredits = 0
  private goldGainMultiplier = 1
  private quizBonusHealthPercent = 0
  private quizFreezeDurationSeconds = 0
  private freezeBombSecondsPerCorrect = 0
  private fireBombDamagePerSecond = 0
  private deflectionShieldChancePercent = 0
  private rawCodingGoldMultiplier = 1
  private miniFleetAlliesPerCorrect = 0
  private bigBossSummonChancePerCorrect = 0

  addPermanentAttackSpeedMultiplier(additiveRateBonus: number) {
    if (additiveRateBonus <= 0) {
      return
    }

    const currentRateMultiplier = 1 / Math.max(0.05, this.permanentAttackSpeedMultiplier)
    const nextRateMultiplier = currentRateMultiplier + additiveRateBonus
    // Stored value remains an attack-interval multiplier for save compatibility.
    this.permanentAttackSpeedMultiplier = Math.max(0.18, 1 / Math.max(0.05, nextRateMultiplier))
  }

  getPermanentAttackSpeedMultiplier() {
    return this.permanentAttackSpeedMultiplier
  }

  addPermanentAttackDamage(amount: number) {
    this.permanentAttackDamageBonus += amount
  }

  getPermanentAttackDamageBonus() {
    return this.permanentAttackDamageBonus
  }

  addBaseShieldPerWave(amount: number) {
    if (amount <= 0) {
      return
    }

    this.baseShieldPerWave += amount
  }

  getBaseShieldPerWave() {
    return this.baseShieldPerWave
  }

  addShieldRechargeOnHealthHitPercent(percent: number) {
    if (percent <= 0) {
      return
    }

    this.shieldRechargeOnHealthHitPercent += percent
  }

  getShieldRechargeOnHealthHitPercent() {
    return this.shieldRechargeOnHealthHitPercent
  }

  addBounceChancePercent(percent: number) {
    if (percent <= 0) {
      return
    }

    this.bounceChancePercent += percent
  }

  getBounceChancePercent() {
    return this.bounceChancePercent
  }

  addBurstSize(amount: number) {
    if (amount <= 0) {
      return
    }

    this.burstSize += amount
  }

  getBurstSize() {
    return this.burstSize
  }

  setBurningProjectiles(damagePerSecond: number, durationSeconds: number) {
    if (damagePerSecond > 0) {
      this.burnDamagePerSecond += damagePerSecond
    }

    if (durationSeconds > 0) {
      this.burnDurationSeconds += durationSeconds
    }
  }

  getBurnDamagePerSecond() {
    return this.burnDamagePerSecond
  }

  getBurnDurationSeconds() {
    return this.burnDurationSeconds
  }

  addHealthOnKill(amount: number) {
    this.healthOnKill += amount
  }

  getHealthOnKill() {
    return this.healthOnKill
  }

  addShieldOnKill(amount: number) {
    this.shieldOnKill += amount
  }

  getShieldOnKill() {
    return this.shieldOnKill
  }

  addDamageOnKill(amount: number) {
    this.damageOnKill += amount
  }

  getDamageOnKill() {
    return this.damageOnKill
  }

  addAdditionalKillCredits(amount: number) {
    if (amount <= 0) {
      return
    }

    this.additionalKillCredits += amount
  }

  getAdditionalKillCredits() {
    return this.additionalKillCredits
  }

  addGoldGainMultiplier(percent: number) {
    if (percent <= 0) {
      return
    }

    this.goldGainMultiplier += percent
  }

  getGoldGainMultiplier() {
    return this.goldGainMultiplier
  }

  addQuizBonusHealthPercent(percent: number) {
    if (percent <= 0) {
      return
    }

    this.quizBonusHealthPercent += percent
  }

  getQuizBonusHealthPercent() {
    return this.quizBonusHealthPercent
  }

  addQuizFreezeDurationSeconds(seconds: number) {
    if (seconds <= 0) {
      return
    }

    this.quizFreezeDurationSeconds += seconds
  }

  getQuizFreezeDurationSeconds() {
    return this.quizFreezeDurationSeconds
  }

  addFreezeBombSecondsPerCorrect(seconds: number) {
    if (seconds <= 0) {
      return
    }

    this.freezeBombSecondsPerCorrect += seconds
  }

  getFreezeBombSecondsPerCorrect() {
    return this.freezeBombSecondsPerCorrect
  }

  addFireBombDamagePerSecond(amount: number) {
    if (amount <= 0) {
      return
    }

    this.fireBombDamagePerSecond += amount
  }

  getFireBombDamagePerSecond() {
    return this.fireBombDamagePerSecond
  }

  addDeflectionShieldChancePercent(percent: number) {
    if (percent <= 0) {
      return
    }

    this.deflectionShieldChancePercent += percent
  }

  getDeflectionShieldChancePercent() {
    return this.deflectionShieldChancePercent
  }

  multiplyRawCodingGoldMultiplier(multiplier: number) {
    if (multiplier <= 1) {
      return
    }

    this.rawCodingGoldMultiplier *= multiplier
  }

  getRawCodingGoldMultiplier() {
    return this.rawCodingGoldMultiplier
  }

  addMiniFleetAlliesPerCorrect(amount: number) {
    if (amount <= 0) {
      return
    }

    this.miniFleetAlliesPerCorrect += Math.floor(amount)
  }

  getMiniFleetAlliesPerCorrect() {
    return this.miniFleetAlliesPerCorrect
  }

  addBigBossSummonChancePerCorrect(chance: number) {
    if (chance <= 0) {
      return
    }

    this.bigBossSummonChancePerCorrect += chance
  }

  getBigBossSummonChancePerCorrect() {
    return this.bigBossSummonChancePerCorrect
  }

  getArtifactStats(): PlayerArtifactStats {
    return {
      permanentAttackSpeedMultiplier: this.permanentAttackSpeedMultiplier,
      permanentAttackDamageBonus: this.permanentAttackDamageBonus,
      baseShieldPerWave: this.baseShieldPerWave,
      shieldRechargeOnHealthHitPercent: this.shieldRechargeOnHealthHitPercent,
      bounceChancePercent: this.bounceChancePercent,
      burstSize: this.burstSize,
      burnDamagePerSecond: this.burnDamagePerSecond,
      burnDurationSeconds: this.burnDurationSeconds,
      healthOnKill: this.healthOnKill,
      shieldOnKill: this.shieldOnKill,
      damageOnKill: this.damageOnKill,
      additionalKillCredits: this.additionalKillCredits,
      goldGainMultiplier: this.goldGainMultiplier,
      quizBonusHealthPercent: this.quizBonusHealthPercent,
      quizFreezeDurationSeconds: this.quizFreezeDurationSeconds,
      freezeBombSecondsPerCorrect: this.freezeBombSecondsPerCorrect,
      fireBombDamagePerSecond: this.fireBombDamagePerSecond,
      deflectionShieldChancePercent: this.deflectionShieldChancePercent,
      rawCodingGoldMultiplier: this.rawCodingGoldMultiplier,
      miniFleetAlliesPerCorrect: this.miniFleetAlliesPerCorrect,
      bigBossSummonChancePerCorrect: this.bigBossSummonChancePerCorrect,
    }
  }

  setArtifactStats(stats: PlayerArtifactStats) {
    const normalized = {
      ...INITIAL_PLAYER_ARTIFACT_STATS,
      ...(stats ?? {}),
    }

    this.permanentAttackSpeedMultiplier = normalized.permanentAttackSpeedMultiplier
    this.permanentAttackDamageBonus = normalized.permanentAttackDamageBonus
    this.baseShieldPerWave = normalized.baseShieldPerWave
    this.shieldRechargeOnHealthHitPercent = normalized.shieldRechargeOnHealthHitPercent
    this.bounceChancePercent = normalized.bounceChancePercent
    this.burstSize = normalized.burstSize
    this.burnDamagePerSecond = normalized.burnDamagePerSecond
    this.burnDurationSeconds = normalized.burnDurationSeconds
    this.healthOnKill = normalized.healthOnKill
    this.shieldOnKill = normalized.shieldOnKill
    this.damageOnKill = normalized.damageOnKill
    this.additionalKillCredits = normalized.additionalKillCredits
    this.goldGainMultiplier = normalized.goldGainMultiplier
    this.quizBonusHealthPercent = normalized.quizBonusHealthPercent
    this.quizFreezeDurationSeconds = normalized.quizFreezeDurationSeconds
    this.freezeBombSecondsPerCorrect = normalized.freezeBombSecondsPerCorrect
    this.fireBombDamagePerSecond = normalized.fireBombDamagePerSecond
    this.deflectionShieldChancePercent = normalized.deflectionShieldChancePercent
    this.rawCodingGoldMultiplier = normalized.rawCodingGoldMultiplier
    this.miniFleetAlliesPerCorrect = normalized.miniFleetAlliesPerCorrect
    this.bigBossSummonChancePerCorrect = normalized.bigBossSummonChancePerCorrect
  }
}