import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class MaxShieldBoost1xArtifact extends Artifact {
  constructor() {
    super('max-shield-boost-1x', 'Max Shield Boost I', 'Increase max shields by +50.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(50)
  }
}

export class MaxShieldBoost2xArtifact extends Artifact {
  constructor() {
    super('max-shield-boost-2x', 'Max Shield Boost II', 'Increase max shields by +100.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(100)
  }
}

export class MaxShieldBoost3xArtifact extends Artifact {
  constructor() {
    super('max-shield-boost-3x', 'Max Shield Boost III', 'Increase max shields by +150.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(150)
  }
}

export class MaxShieldBoost4xArtifact extends Artifact {
  constructor() {
    super('max-shield-boost-4x', 'Max Shield Boost IV', 'Increase max shields by +200.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(200)
  }
}

export class MaxShieldBoost5xArtifact extends Artifact {
  constructor() {
    super('max-shield-boost-5x', 'Max Shield Boost V', 'Increase max shields by +250.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(250)
  }
}

export class ShieldJuiceArtifact extends Artifact {
  constructor() {
    super(
      'shield-juice',
      'Shield Juice',
      'When shields drop to 50% or below, instantly restore to full shields once. Then this artifact is consumed.',
    )
  }

  apply(player: Player) {
    player.setShieldJuiceEnabled(true)
  }
}

export class HealthJuiceArtifact extends Artifact {
  constructor() {
    super(
      'health-juice',
      'Health Juice',
      'When health drops to 50% or below, instantly restore to full health once. Then this artifact is consumed.',
    )
  }

  apply(player: Player) {
    player.setHealthJuiceEnabled(true)
  }
}

export class BonusShield1xArtifact extends Artifact {
  constructor() {
    super('bonus-shield-1x', 'Bonus Shields I', 'Increase max shields by +50.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(50)
  }
}

export class BonusShield2xArtifact extends Artifact {
  constructor() {
    super('bonus-shield-2x', 'Bonus Shields II', 'Increase max shields by +100.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(100)
  }
}

export class BonusShield3xArtifact extends Artifact {
  constructor() {
    super('bonus-shield-3x', 'Bonus Shields III', 'Increase max shields by +150.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(150)
  }
}

export class BonusShield4xArtifact extends Artifact {
  constructor() {
    super('bonus-shield-4x', 'Bonus Shields IV', 'Increase max shields by +200.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(200)
  }
}

export class BonusShield5xArtifact extends Artifact {
  constructor() {
    super('bonus-shield-5x', 'Bonus Shields V', 'Increase max shields by +250.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(250)
  }
}

export class BonusHealth1xArtifact extends Artifact {
  constructor() {
    super('bonus-health-1x', 'Bonus Health I', 'Increase max health by +45.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(45)
  }
}

export class BonusHealth2xArtifact extends Artifact {
  constructor() {
    super('bonus-health-2x', 'Bonus Health II', 'Increase max health by +90.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(90)
  }
}

export class BonusHealth3xArtifact extends Artifact {
  constructor() {
    super('bonus-health-3x', 'Bonus Health III', 'Increase max health by +135.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(135)
  }
}

export class BonusHealth4xArtifact extends Artifact {
  constructor() {
    super('bonus-health-4x', 'Bonus Health IV', 'Increase max health by +180.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(180)
  }
}

export class BonusHealth5xArtifact extends Artifact {
  constructor() {
    super('bonus-health-5x', 'Bonus Health V', 'Increase max health by +225.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(225)
  }
}

export class BonusDamage2xArtifact extends Artifact {
  constructor() {
    super('bonus-damage-2x', 'Bonus Damage II', 'Multiply projectile damage by 1.2x.')
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(1.2)
  }
}

export class BonusDamage3xArtifact extends Artifact {
  constructor() {
    super('bonus-damage-3x', 'Bonus Damage III', 'Multiply projectile damage by 1.44x.')
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(1.44)
  }
}

export class BonusDamage4xArtifact extends Artifact {
  constructor() {
    super('bonus-damage-4x', 'Bonus Damage IV', 'Multiply projectile damage by 1.728x.')
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(1.728)
  }
}

export class BonusDamage5xArtifact extends Artifact {
  constructor() {
    super('bonus-damage-5x', 'Bonus Damage V', 'Multiply projectile damage by 2.0736x.')
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(2.0736)
  }
}

export class BonusFireRate1xArtifact extends Artifact {
  constructor() {
    super('bonus-fire-rate-1x', 'Bonus Fire Rate I', 'Multiply rate of fire by 1.2x.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(1.2)
  }
}

export class BonusFireRate2xArtifact extends Artifact {
  constructor() {
    super('bonus-fire-rate-2x', 'Bonus Fire Rate II', 'Multiply rate of fire by 1.44x.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(1.44)
  }
}

export class BonusFireRate3xArtifact extends Artifact {
  constructor() {
    super('bonus-fire-rate-3x', 'Bonus Fire Rate III', 'Multiply rate of fire by 1.728x.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(1.728)
  }
}

export class BonusFireRate4xArtifact extends Artifact {
  constructor() {
    super('bonus-fire-rate-4x', 'Bonus Fire Rate IV', 'Multiply rate of fire by 2.0736x.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(2.0736)
  }
}

export class BonusFireRate5xArtifact extends Artifact {
  constructor() {
    super('bonus-fire-rate-5x', 'Bonus Fire Rate V', 'Multiply rate of fire by 2.48832x.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(2.48832)
  }
}

export class ShieldGateArtifact extends Artifact {
  constructor() {
    super(
      'shield-gate',
      'Shield Gate',
      'Gain +100 max shields, but you cannot fire until your shields are completely exhausted.',
    )
  }

  apply(player: Player) {
    player.addFlatMaxShield(100)
    player.setRequireShieldExhaustionToShoot(true)
  }
}

export class GoldBounty2xArtifact extends Artifact {
  constructor() {
    super('gold-bounty-2x', 'Gold Bounty II', 'Gain +20% gold from all sources.')
  }

  apply(_player: Player) {}

  getGoldMultiplierForAnyGain(): number {
    return 1.2
  }
}

export class GoldBounty3xArtifact extends Artifact {
  constructor() {
    super('gold-bounty-3x', 'Gold Bounty III', 'Gain +30% gold from all sources.')
  }

  apply(_player: Player) {}

  getGoldMultiplierForAnyGain(): number {
    return 1.3
  }
}

export class GoldBounty4xArtifact extends Artifact {
  constructor() {
    super('gold-bounty-4x', 'Gold Bounty IV', 'Gain +40% gold from all sources.')
  }

  apply(_player: Player) {}

  getGoldMultiplierForAnyGain(): number {
    return 1.4
  }
}

export class QuestionNuke2xArtifact extends Artifact {
  constructor() {
    super('fire-bomb-2x', 'Question Nuke II', 'Queue +2 question nukes on each correct answer.')
  }

  apply(player: Player) {
    player.addBonusQuestionNukeStacks(2)
  }
}

export class QuestionNuke3xArtifact extends Artifact {
  constructor() {
    super('fire-bomb-3x', 'Question Nuke III', 'Queue +3 question nukes on each correct answer.')
  }

  apply(player: Player) {
    player.addBonusQuestionNukeStacks(3)
  }
}

export class FreezeRay2xArtifact extends Artifact {
  constructor() {
    super('freeze-bomb-2x', 'Freeze Ray II', 'Queue +2 freeze rays on each correct answer.')
  }

  apply(player: Player) {
    player.addBonusFreezeRayStacks(2)
  }
}

export class FreezeRay3xArtifact extends Artifact {
  constructor() {
    super('freeze-bomb-3x', 'Freeze Ray III', 'Queue +3 freeze rays on each correct answer.')
  }

  apply(player: Player) {
    player.addBonusFreezeRayStacks(3)
  }
}

export class MiniFleet2xArtifact extends Artifact {
  constructor() {
    super('mini-fleet-2x', 'Mini Fleet II', 'Summon +2 mini allies on each correct answer.')
  }

  apply(player: Player) {
    player.addMiniFleetAlliesPerCorrect(2)
  }
}

export class MiniFleet3xArtifact extends Artifact {
  constructor() {
    super('mini-fleet-3x', 'Mini Fleet III', 'Summon +3 mini allies on each correct answer.')
  }

  apply(player: Player) {
    player.addMiniFleetAlliesPerCorrect(3)
  }
}

export class CodeBrain3xArtifact extends Artifact {
  constructor() {
    super('code-brain-3x', 'Code Brain 3x', 'Raw coding gold rewards are tripled.')
  }

  apply(player: Player) {
    player.multiplyRawCodingGoldMultiplier(3)
  }

  getGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return questionKind === 'rawCoding' ? 3 : 1
  }
}

export class CodeBrain4xArtifact extends Artifact {
  constructor() {
    super('code-brain-4x', 'Code Brain 4x', 'Raw coding gold rewards are multiplied by 4x.')
  }

  apply(player: Player) {
    player.multiplyRawCodingGoldMultiplier(4)
  }

  getGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return questionKind === 'rawCoding' ? 4 : 1
  }
}

export class CodeBrain6xArtifact extends Artifact {
  constructor() {
    super('code-brain-6x', 'Code Brain 6x', 'Raw coding gold rewards are multiplied by 6x.')
  }

  apply(player: Player) {
    player.multiplyRawCodingGoldMultiplier(6)
  }

  getGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return questionKind === 'rawCoding' ? 6 : 1
  }
}

export class CodeDamageArtifact extends Artifact {
  constructor() {
    super(
      'code-damage',
      'Code Damage',
      'Each correct raw coding answer grants +1 permanent damage. Raw coding question frequency is doubled.',
    )
  }

  apply(player: Player) {
    player.addRawCodingDamagePerCorrectAnswer(1)
    player.setMinRawCodingQuestionFrequencyMultiplier(2)
  }
}

export class CodeShieldArtifact extends Artifact {
  constructor() {
    super(
      'code-shield',
      'Code Shield',
      'Each correct raw coding answer grants +18 max shield. Raw coding question frequency is doubled.',
    )
  }

  apply(player: Player) {
    player.addRawCodingMaxShieldPerCorrectAnswer(18)
    player.setMinRawCodingQuestionFrequencyMultiplier(2)
  }
}

export class CodeHealthArtifact extends Artifact {
  constructor() {
    super(
      'code-health',
      'Code Health',
      'Each correct raw coding answer grants +15 max health. Raw coding question frequency is doubled.',
    )
  }

  apply(player: Player) {
    player.addRawCodingMaxHealthPerCorrectAnswer(15)
    player.setMinRawCodingQuestionFrequencyMultiplier(2)
  }
}

export class CodeFleetArtifact extends Artifact {
  constructor() {
    super(
      'code-fleet',
      'Code Fleet',
      'Each correct raw coding answer summons 1 mini fleet ally. Raw coding question frequency is doubled.',
    )
  }

  apply(player: Player) {
    player.addRawCodingMiniFleetPerCorrectAnswer(1)
    player.setMinRawCodingQuestionFrequencyMultiplier(2)
  }
}

export class FleetDamage2xArtifact extends Artifact {
  constructor() {
    super('fleet-damage-2x', 'Fleet Payload Matrix', 'Double ally fleet member damage.')
  }

  apply(player: Player) {
    player.multiplyFleetDamageMultiplier(2)
  }
}

export class FleetHealth2xArtifact extends Artifact {
  constructor() {
    super('fleet-health-2x', 'Fleet Hull Matrix', 'Double ally fleet member health.')
  }

  apply(player: Player) {
    player.multiplyFleetHealthMultiplier(2)
  }
}

export class FleetFireRate2xArtifact extends Artifact {
  constructor() {
    super('fleet-fire-rate-2x', 'Fleet Targeting Matrix', 'Double ally fleet member rate of fire.')
  }

  apply(player: Player) {
    player.multiplyFleetRateOfFireMultiplier(2)
  }
}

export class FleetPlayerHealHealthArtifact extends Artifact {
  constructor() {
    super(
      'fleet-heal-health-1-per-5s',
      'Fleet Field Medic',
      'Ally fleet members restore 1 health every 5 seconds.',
    )
  }

  apply(player: Player) {
    player.addFleetPlayerHealHealthPerFiveSeconds(1)
  }
}

export class FleetPlayerHealShieldArtifact extends Artifact {
  constructor() {
    super(
      'fleet-heal-shield-1-per-5s',
      'Fleet Shield Relay',
      'Ally fleet members restore 1 shield every 5 seconds.',
    )
  }

  apply(player: Player) {
    player.addFleetPlayerHealShieldPerFiveSeconds(1)
  }
}

export class QuizFreeze30Artifact extends Artifact {
  constructor() {
    super('quiz-bonus-time-30', 'Quiz Freeze +30s', 'Increase quiz freeze time by 30 seconds.')
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(30)
  }
}

export class QuizFreeze60Artifact extends Artifact {
  constructor() {
    super('quiz-bonus-time-60', 'Quiz Freeze +60s', 'Increase quiz freeze time by 60 seconds.')
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(60)
  }
}

export class QuizFreeze90Artifact extends Artifact {
  constructor() {
    super('quiz-bonus-time-90', 'Quiz Freeze +90s', 'Increase quiz freeze time by 90 seconds.')
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(90)
  }
}

export class QuizFreeze120Artifact extends Artifact {
  constructor() {
    super('quiz-bonus-time-120', 'Quiz Freeze +120s', 'Increase quiz freeze time by 120 seconds.')
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(120)
  }
}

export class GoldShieldHealArtifact extends Artifact {
  constructor() {
    super('gold-shield-heal', 'Aegis Treasury', 'Heal shields by x% whenever you gain x gold.')
  }

  apply(player: Player) {
    player.addShieldHealPercentPerGoldGain(0.01)
  }
}

export class GoldHealthHealArtifact extends Artifact {
  constructor() {
    super('gold-health-heal', 'Vital Treasury', 'Heal health by x/2% whenever you gain x gold.')
  }

  apply(player: Player) {
    player.addHealthHealPercentPerGoldGain(0.005)
  }
}

export class RoundEndGoldInterestArtifact extends Artifact {
  constructor() {
    super('round-end-gold-interest', 'Compound Ledger', 'At round end, gain gold equal to 10% of current gold.')
  }

  apply(player: Player) {
    player.setRoundEndGoldPercentOfCurrentGold(0.1)
  }
}

export class SlowHeavyRoundsArtifact extends Artifact {
  constructor() {
    super('slow-heavy-rounds', 'Titan Slugs', '0.1x rate of fire, 12x projectile damage.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(0.1)
    player.multiplyAttackDamageMultiplier(12)
  }
}

export class FastLightRoundsArtifact extends Artifact {
  constructor() {
    super('fast-light-rounds', 'Needle Storm', '6x rate of fire, 0.2x projectile damage.')
  }

  apply(player: Player) {
    player.multiplyFireRateMultiplier(6)
    player.multiplyAttackDamageMultiplier(0.2)
  }
}

export class HitGoldNoKillGoldArtifact extends Artifact {
  constructor() {
    super('hit-gold-no-kill-gold', 'Impact Tax Loop', '10% chance to gain 1g on hit, but kills no longer grant gold.')
  }

  apply(player: Player) {
    player.setGoldPerKill(0)
    player.setGoldOnHitChance(0.1, 1)
  }
}

export class LuckyBulletDividendArtifact extends Artifact {
  constructor() {
    super('lucky-bullet-dividend', 'Lucky Bullet Dividend', 'Every bullet hit has a 5% chance to grant 1 gold.')
  }

  apply(player: Player) {
    player.setGoldOnHitChance(0.05, 1)
  }
}

export class NoQuestionHealDoubleMiniFleetArtifact extends Artifact {
  constructor() {
    super('no-question-heal-double-mini-fleet', 'Fleet Doctrine Pivot', 'No question healing. Summon +2 mini fleet allies on correct answer.')
  }

  apply(player: Player) {
    player.setDisableQuestionHealingFromArtifacts(true)
    player.addMiniFleetAlliesPerCorrect(2)
  }
}

export class RawCodeBuffDoubleArtifact extends Artifact {
  constructor() {
    super('raw-code-buff-double', 'Compiler Catalyst', 'Doubles round-buff stacks earned from raw code questions.')
  }

  apply(player: Player) {
    player.setRawCodeBuffRewardMultiplier(2)
  }
}

export class KillGoldBoostArtifact extends Artifact {
  constructor() {
    super('kill-gold-boost', 'Bounty Calibrator', 'Increase gold from killing enemies by 1.25x.')
  }

  apply(player: Player) {
    player.setKillGoldMultiplier(1.25)
  }

  getGoldMultiplierForEnemyKill(): number {
    return 1.25
  }
}

export class RichesForShotsArtifact extends Artifact {
  constructor() {
    super('riches-for-shots', 'Greedy Trigger', 'Gain 3x gold from all sources, but each shot has a 10% chance to cost 1 gold.')
  }

  apply(player: Player) {
    player.setGoldLossPerShot(1)
    player.setGoldLossPerShotChance(0.1)
  }

  getGoldMultiplierForAnyGain(): number {
    return 3
  }
}

export class NukeOnlyArtifact extends Artifact {
  constructor() {
    super('nuke-only', 'Command Uplink', 'You can no longer shoot, but gain +4 question nuke stacks.')
  }

  apply(player: Player) {
    player.setCanShoot(false)
    player.addBonusQuestionNukeStacks(4)
  }
}

export class FleetPayrollArtifact extends Artifact {
  constructor() {
    super('fleet-payroll', 'Fleet Payroll', 'At round end, gain 10 gold per active fleet member.')
  }

  apply(player: Player) {
    player.setRoundEndGoldPerFleetMember(10)
  }
}

export class StreakGoldArtifact extends Artifact {
  constructor() {
    super('streak-gold', 'Combo Treasury', 'Every 3 correct answers in a row grants +15 gold.')
  }

  apply(player: Player) {
    player.setStreakGoldBonus(3, 15)
  }
}

export class DamageBuffPerCorrectArtifact extends Artifact {
  constructor() {
    super('damage-buff-per-correct', 'Momentum Payload', 'Gain +0.25 permanent damage each time you answer correctly.')
  }

  apply(player: Player) {
    player.addDamagePerCorrectAnswer(0.25)
  }
}

export class ShotRandomizerArtifact extends Artifact {
  constructor() {
    super('shot-randomizer', 'Shot Randomizer', 'Whenever you shoot, fire at random targets and launch two bullets instead of one.')
  }

  apply(player: Player) {
    player.setShotRandomizerEnabled(true)
  }
}

export class SplashDamageArtifact extends Artifact {
  constructor() {
    super('splash-damage', 'Splash Damage', 'When a bullet impacts, deal 10% of its damage to all enemies.')
  }

  apply(player: Player) {
    player.addSplashDamageRatioOnHit(0.1)
  }
}

export class ReplaceQuestionBuffsWithGoldArtifact extends Artifact {
  constructor() {
    super('replace-question-buffs-with-gold', 'Golden Discipline', 'You can no longer gain question buffs. Each replaced buff grants +12 gold.')
  }

  apply(player: Player) {
    player.setReplaceQuestionBuffsWithGold(12)
  }
}

export class QuestionTimeHealthDrainArtifact extends Artifact {
  constructor() {
    super('question-time-health-drain', 'Overclocked Focus', 'Gain +120s question time, but lose 1 health every 5 seconds, stopping at 5 health.')
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(120)
    player.addQuestionTimeHealthDrainPerFiveSeconds(1)
  }
}

export class GoldLifeLossWipeArtifact extends Artifact {
  constructor() {
    super('gold-life-loss-wipe', 'Fragile Fortune', 'Gain +10% gold from all sources, but lose all gold when you lose a life.')
  }

  apply(player: Player) {
    player.setLoseAllGoldOnLifeLoss(true)
  }

  getGoldMultiplierForAnyGain(): number {
    return 1.1
  }
}

export class GoldWrongAnswerWipeArtifact extends Artifact {
  constructor() {
    super('gold-wrong-answer-wipe', 'Exam Tax', 'Gain +25% gold from all sources, but lose all gold when you answer wrong.')
  }

  apply(player: Player) {
    player.setLoseAllGoldOnWrongAnswer(true)
  }

  getGoldMultiplierForAnyGain(): number {
    return 1.25
  }
}

export class GoldShieldBreakResetArtifact extends Artifact {
  constructor() {
    super('gold-shield-break-reset', 'Aegis Bankruptcy', 'Gain +10% gold. If shield breaks while you have at least 20 gold, lose all gold and instantly restore full shield.')
  }

  apply(player: Player) {
    player.setShieldBreakGoldResetEnabled(true)
  }

  getGoldMultiplierForAnyGain(): number {
    return 1.1
  }
}

export class HealthDividendDeathOnWrongArtifact extends Artifact {
  constructor() {
    super('health-dividend-death-on-wrong', 'Blood Dividend Pact', 'At round end gain gold equal to 50% of health. Wrong answers cost one life.')
  }

  apply(player: Player) {
    player.setRoundEndGoldPercentOfHealth(0.5)
    player.setLoseLifeOnWrongAnswer(true)
  }
}

export class GoldDrainShotPowerArtifact extends Artifact {
  constructor() {
    super('gold-drain-shot-power', 'Bullet Banking', '5x global shot damage multiplier, but lose 1 gold per shot.')
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(5)
    player.setGoldLossPerShot(1)
    player.setGoldLossPerShotChance(1.0)
  }
}

export class ShieldBurstMiniFleetArtifact extends Artifact {
  constructor() {
    super('shield-burst-mini-fleet', 'Aegis Recruitment', 'When shields are at max (>0), lose 50 shields & summon a mini fleet ally.')
  }

  apply(player: Player) {
    player.setShieldMaxSpawnMiniFleet(true)
  }
}

export class HealthBurstMiniFleetArtifact extends Artifact {
  constructor() {
    super('health-burst-mini-fleet', 'Vitality Legion', 'When health is at max and max health >50, lose 50 health & summon a mini fleet ally.')
  }

  apply(player: Player) {
    player.setHealthMaxSpawnMiniFleet(true)
  }
}

export class ShieldBurstBigBossArtifact extends Artifact {
  constructor() {
    super('shield-burst-big-boss', 'Aegis Guardian', 'When shields are at max (>0), lose all shields & summon a big boss fighter.')
  }

  apply(player: Player) {
    player.setShieldMaxSpawnBigBoss(true)
  }
}

export class KillSpawnMiniFleetArtifact extends Artifact {
  constructor() {
    super('kill-spawn-mini-fleet', 'Corpse Recruitment', 'Every time you kill an enemy, summon a mini fleet fighter.')
  }

  apply(player: Player) {
    player.setKillSpawnMiniFleet(true)
  }
}

export class BossKillSpawnBigBossArtifact extends Artifact {
  constructor() {
    super('boss-kill-spawn-big-boss', 'Rival Attraction', 'Every time you kill a non-basic enemy, summon a big boss fighter.')
  }

  apply(player: Player) {
    player.setBossKillSpawnBigBoss(true)
  }
}

export class GoldThresholdMiniFleetArtifact extends Artifact {
  constructor() {
    super('gold-threshold-mini-fleet', 'Wealth Militia', 'Every time you have over 25 gold, spend 25g to summon a mini fleet fighter.')
  }

  apply(player: Player) {
    player.setGoldThresholdMiniFleet(25)
  }
}

export class GoldThresholdBigBossArtifact extends Artifact {
  constructor() {
    super('gold-threshold-big-boss', 'Wealth Guardian', 'Every time you have over 50 gold, spend 50g to summon a big boss fighter.')
  }

  apply(player: Player) {
    player.setGoldThresholdBigBoss(50)
  }
}

export class LowGoldShieldLiquidationArtifact extends Artifact {
  constructor() {
    super(
      'low-gold-shield-liquidation',
      'Emergency Shield Pawn',
      'Whenever you have less than 50 gold, trade all current shield for gold equal to 50% of shield sacrificed.',
    )
  }

  apply(player: Player) {
    player.setLowGoldShieldLiquidation(50, 0.5)
  }
}

export class RoundEndTreasureTaxArtifact extends Artifact {
  constructor() {
    super(
      'round-end-treasure-tax',
      'Treasure Tax Rebate',
      'At round end, gain 1 gold for each 5 gold you currently have.',
    )
  }

  apply(player: Player) {
    player.setRoundEndGoldPercentOfCurrentGold(0.2)
  }
}

export class RoundEndShieldSackMiniFleetArtifact extends Artifact {
  constructor() {
    super(
      'round-end-shield-sack-mini-fleet',
      'Aegis Conscription',
      'At round end, sacrifice all shields and summon one mini fleet ally per 50 shields sacrificed.',
    )
  }

  apply(player: Player) {
    player.setRoundEndShieldSacrificeMiniFleet(50)
  }
}

export class BloodToShieldArtifact extends Artifact {
  constructor() {
    super(
      'blood-to-shield',
      'Hemoflux Converter',
      'Every second, lose 1 health to gain 2 shield while below max shield and above 10 health.',
    )
  }

  apply(player: Player) {
    player.setBloodToShieldExchange(1, 2)
  }
}

export class BerserkerBloodRoundsArtifact extends Artifact {
  constructor() {
    super(
      'berserker-blood-rounds',
      'Bloodprice Rounds',
      'Gain 3x bullet damage, but lose 1 health every time you fire a shot.',
    )
  }

  apply(player: Player) {
    player.multiplyAttackDamageMultiplier(3)
    player.setHealthLossPerShot(1)
  }
}

export class RoundEndHealShieldsArtifact extends Artifact {
  constructor() {
    super(
      'round-end-heal-shields',
      'Aegis Restoration',
      'At the end of each round, restore your shields to full.',
    )
  }

  apply(player: Player) {
    player.setRoundEndHealShieldsToFull(true)
  }
}

export class RoundEndHealHealthArtifact extends Artifact {
  constructor() {
    super(
      'round-end-heal-health',
      'Vital Restoration',
      'At the end of each round, restore your health to full.',
    )
  }

  apply(player: Player) {
    player.setRoundEndHealHealthToFull(true)
  }
}

export class GainTwoLivesArtifact extends Artifact {
  constructor() {
    super('gain-two-lives', 'Double Lifeline', 'Gain 2 extra lives.')
  }

  apply(player: Player) {
    player.addLifeWithoutSkips(2)
  }
}

export class GainThreeLivesArtifact extends Artifact {
  constructor() {
    super('gain-three-lives', 'Triple Lifeline', 'Gain 3 extra lives.')
  }

  apply(player: Player) {
    player.addLifeWithoutSkips(3)
  }
}

export class GainFourLivesArtifact extends Artifact {
  constructor() {
    super('gain-four-lives', 'Quadruple Lifeline', 'Gain 4 extra lives.')
  }

  apply(player: Player) {
    player.addLifeWithoutSkips(4)
  }
}

export class GainThreeLivesNoHealArtifact extends Artifact {
  constructor() {
    super(
      'gain-three-lives-no-heal',
      'Undying Pact',
      'Gain 3 extra lives, but answering questions correctly no longer heals you.',
    )
  }

  apply(player: Player) {
    player.addLifeWithoutSkips(3)
    player.setDisableQuestionHealingFromArtifacts(true)
  }
}

export class DoubleQuestionHealLoseLifeOnWrongArtifact extends Artifact {
  constructor() {
    super(
      'double-question-heal-lose-life-on-wrong',
      'Mercy Forfeit',
      'Correct-answer healing is doubled, but every wrong answer costs one life. Skipped questions do not trigger the life loss.',
    )
  }

  apply(player: Player) {
    player.multiplyQuestionAnswerHealingMultiplier(2)
    player.setLoseLifeOnWrongAnswer(true)
  }
}

export class ConvertSkipsToLivesArtifact extends Artifact {
  constructor() {
    super(
      'convert-skips-to-lives',
      'Mulligan Alchemy',
      'Convert all current and future skips into lives. New lives no longer grant bonus skips.',
    )
  }

  apply(player: Player) {
    player.enableSkipToLifeConversion()
  }
}

export class SacrificeLivesForVitalityArtifact extends Artifact {
  constructor() {
    super(
      'sacrifice-lives-for-vitality',
      'Last Stand Dividend',
      'Lose all lives. For each life sacrificed, permanently gain +1x multiplier to max-health and max-shield growth. Sacrificing 1 life becomes 2x, 2 lives becomes 3x, and so on.',
    )
  }

  apply(player: Player) {
    player.sacrificeAllLivesForVitality()
  }
}

export class GainTwoSkipsArtifact extends Artifact {
  constructor() {
    super('gain-two-skips', 'Extra Passes I', 'Gain 2 extra question skips.')
  }

  apply(player: Player) {
    player.addSkip(2)
  }
}

export class GainThreeSkipsArtifact extends Artifact {
  constructor() {
    super('gain-three-skips', 'Extra Passes II', 'Gain 3 extra question skips.')
  }

  apply(player: Player) {
    player.addSkip(3)
  }
}

export class RawCodingLimitedRunsArtifact extends Artifact {
  constructor() {
    super(
      'raw-coding-limited-runs',
      'High Stakes Compiler',
      'Earn 5x gold from coding problems, but you may only run your code 3 times per question. If you exhaust all 3 runs without passing, you lose a life.',
    )
  }

  apply(player: Player) {
    player.setRawCodingRunLimit(3)
  }

  getGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return questionKind === 'rawCoding' ? 5 : 1
  }
}
