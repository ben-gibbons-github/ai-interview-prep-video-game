import { Player } from './Player/Player'
import { RapidFireArtifact } from './Player/Artifacts/RapidFireArtifact'
import { SharpenedRoundsArtifact } from './Player/Artifacts/SharpenedRoundsArtifact'
import { ShieldGeneratorArtifact } from './Player/Artifacts/ShieldGeneratorArtifact'
import { BouncingBulletsArtifact } from './Player/Artifacts/BouncingBulletsArtifact'
import { BurstFireArtifact } from './Player/Artifacts/BurstFireArtifact'
import { CodeBrainArtifact } from './Player/Artifacts/CodeBrainArtifact'
import { FireRoundsArtifact } from './Player/Artifacts/FireRoundsArtifact'
import { FireBombArtifact } from './Player/Artifacts/FireBombArtifact'
import { FreezeBombArtifact } from './Player/Artifacts/FreezeBombArtifact'
import { BonusHealthArtifact } from './Player/Artifacts/BonusHealthArtifact'
import { BonusLifeArtifact } from './Player/Artifacts/BonusLifeArtifact'
import { BonusSkipArtifact } from './Player/Artifacts/BonusSkipArtifact'
import { BigBossArtifact } from './Player/Artifacts/BigBossArtifact'
import { DeflectionShieldsArtifact } from './Player/Artifacts/DeflectionShieldsArtifact'
import { HealthOnKillArtifact } from './Player/Artifacts/HealthOnKillArtifact'
import { MiniFleetArtifact } from './Player/Artifacts/MiniFleetArtifact'
import { ShieldOnKillArtifact } from './Player/Artifacts/ShieldOnKillArtifact'
import { GoldBountyArtifact } from './Player/Artifacts/GoldBountyArtifact'
import {
  DamageBuffPerCorrectArtifact,
  FastLightRoundsArtifact,
  FleetDamage2xArtifact,
  FleetFireRate2xArtifact,
  FleetHealth2xArtifact,
  FleetPlayerHealHealthArtifact,
  FleetPlayerHealShieldArtifact,
  FleetPayrollArtifact,
  FreezeRay2xArtifact,
  FreezeRay3xArtifact,
  GoldLifeLossWipeArtifact,
  GoldShieldBreakResetArtifact,
  GoldWrongAnswerWipeArtifact,
  GoldBounty2xArtifact,
  GoldBounty3xArtifact,
  GoldBounty4xArtifact,
  GoldHealthHealArtifact,
  GoldShieldHealArtifact,
  HealthDividendDeathOnWrongArtifact,
  HitGoldNoKillGoldArtifact,
  LuckyBulletDividendArtifact,
  KillGoldBoostArtifact,
  LowGoldShieldLiquidationArtifact,
  MaxShieldBoost1xArtifact,
  MaxShieldBoost2xArtifact,
  MaxShieldBoost3xArtifact,
  MaxShieldBoost4xArtifact,
  MaxShieldBoost5xArtifact,
  ShieldJuiceArtifact,
  HealthJuiceArtifact,
  BonusShield1xArtifact,
  BonusShield2xArtifact,
  BonusShield3xArtifact,
  BonusShield4xArtifact,
  BonusShield5xArtifact,
  BonusHealth1xArtifact,
  BonusHealth2xArtifact,
  BonusHealth3xArtifact,
  BonusHealth4xArtifact,
  BonusHealth5xArtifact,
  BonusDamage2xArtifact,
  BonusDamage3xArtifact,
  BonusDamage4xArtifact,
  BonusDamage5xArtifact,
  BonusFireRate1xArtifact,
  BonusFireRate2xArtifact,
  BonusFireRate3xArtifact,
  BonusFireRate4xArtifact,
  BonusFireRate5xArtifact,
  CodeBrain3xArtifact,
  CodeBrain4xArtifact,
  CodeBrain6xArtifact,
  CodeDamageArtifact,
  CodeFleetArtifact,
  CodeHealthArtifact,
  CodeShieldArtifact,
  ConvertSkipsToLivesArtifact,
  DoubleQuestionHealLoseLifeOnWrongArtifact,
  MiniFleet2xArtifact,
  MiniFleet3xArtifact,
  NoQuestionHealDoubleMiniFleetArtifact,
  NukeOnlyArtifact,
  QuestionNuke2xArtifact,
  QuestionNuke3xArtifact,
  QuizFreeze120Artifact,
  QuizFreeze30Artifact,
  QuizFreeze60Artifact,
  QuizFreeze90Artifact,
  QuestionTimeHealthDrainArtifact,
  RawCodeBuffDoubleArtifact,
  ReplaceQuestionBuffsWithGoldArtifact,
  RichesForShotsArtifact,
  ShotRandomizerArtifact,
  SplashDamageArtifact,
  RoundEndShieldSackMiniFleetArtifact,
  RoundEndTreasureTaxArtifact,
  RoundEndGoldInterestArtifact,
  SlowHeavyRoundsArtifact,
  StreakGoldArtifact,
  BloodToShieldArtifact,
  BerserkerBloodRoundsArtifact,
  RoundEndHealShieldsArtifact,
  RoundEndHealHealthArtifact,
  SacrificeLivesForVitalityArtifact,
  GainTwoLivesArtifact,
  GainThreeLivesArtifact,
  GainFourLivesArtifact,
  GainThreeLivesNoHealArtifact,
  GainTwoSkipsArtifact,
  GainThreeSkipsArtifact,
  RawCodingLimitedRunsArtifact,
} from './Player/Artifacts/ExpandedArtifacts'
import type { Artifact } from './Player/Artifacts/Artifact'

type RewardKind = 'artifact' | 'consumable'

export interface RewardChoice {
  id: string
  kind: RewardKind
  artifactId?: string
  title: string
  description: string
  cost: number
  apply: (player: Player) => string
}

export interface RewardPrompt {
  wave: number
  options: RewardChoice[]
}

export interface RoundClearEvent {
  wave: number
  defeatedEnemies: number
  nextWaveEnemyCount: number
  prompt: RewardPrompt
}

export interface RunQuestionDifficultyBreakdown {
  easy: number
  medium: number
  hard: number
  veryHard: number
  insanelyHard: number
}

export interface RunSummary {
  score: number
  enemyKills: number
  roundsCleared: number
  currentRound: number
  completedAtIso: string
  endReason?: 'death' | 'victory'
  quizTotalAnswered?: number
  quizAnsweredByDifficulty?: RunQuestionDifficultyBreakdown
}

export interface RewardSelectionResult {
  kind: RewardKind
  itemName: string
  inventoryCount: number
  cost: number
}

const STORE_COST_MULTIPLIER = 0.5

function applyStoreCostMultiplier(baseCost: number): number {
  return Math.max(0, Math.round(baseCost * STORE_COST_MULTIPLIER))
}

function pickUniqueRandom<T>(items: T[], count: number): T[] {
  const copy = [...items]
  const selected: T[] = []

  while (copy.length > 0 && selected.length < count) {
    const index = Math.floor(Math.random() * copy.length)
    selected.push(copy.splice(index, 1)[0])
  }

  return selected
}

interface ArtifactRewardDefinition {
  artifactId: string
  title: string
  description: string
  cost: number
  createArtifact?: () => Artifact
  applyWithoutInventory?: (player: Player) => string
  repeatable?: boolean
}

const IMMEDIATE_RESTORATION_ARTIFACT_IDS = {
  shield: 'round-end-heal-shields',
  health: 'round-end-heal-health',
} as const

function buildAvailableArtifactRewardChoices(wave: number, player: Player): RewardChoice[] {
  const ownedArtifactIds = new Set(player.getArtifactIds())

  const artifactDefinitions: ArtifactRewardDefinition[] = [
    {
      artifactId: 'gold-bounty',
      title: 'Gold Bounty I',
      description: 'Gain +10% gold from all sources.',
      cost: 50,
      createArtifact: () => new GoldBountyArtifact(),
    },
    {
      artifactId: 'gold-bounty-2x',
      title: 'Gold Bounty II',
      description: 'Gain +20% gold from all sources.',
      cost: 100,
      createArtifact: () => new GoldBounty2xArtifact(),
    },
    {
      artifactId: 'gold-bounty-3x',
      title: 'Gold Bounty III',
      description: 'Gain +30% gold from all sources.',
      cost: 150,
      createArtifact: () => new GoldBounty3xArtifact(),
    },
    {
      artifactId: 'gold-bounty-4x',
      title: 'Gold Bounty IV',
      description: 'Gain +40% gold from all sources.',
      cost: 200,
      createArtifact: () => new GoldBounty4xArtifact(),
    },
    {
      artifactId: 'freeze-bomb',
      title: 'Freeze Ray',
      description: 'Correct answers queue freeze rays that freeze random enemies.',
      cost: 120,
      createArtifact: () => new FreezeBombArtifact(),
    },
    {
      artifactId: 'freeze-bomb-2x',
      title: 'Freeze Ray II',
      description: 'Queue +2 freeze rays on each correct answer.',
      cost: 240,
      createArtifact: () => new FreezeRay2xArtifact(),
    },
    {
      artifactId: 'freeze-bomb-3x',
      title: 'Freeze Ray III',
      description: 'Queue +3 freeze rays on each correct answer.',
      cost: 360,
      createArtifact: () => new FreezeRay3xArtifact(),
    },
    {
      artifactId: 'fire-bomb',
      title: 'Question Nuke',
      description: 'Correct answers queue nukes that strike your target.',
      cost: 60,
      createArtifact: () => new FireBombArtifact(),
    },
    {
      artifactId: 'fire-bomb-2x',
      title: 'Question Nuke II',
      description: 'Queue +2 question nukes on each correct answer.',
      cost: 120,
      createArtifact: () => new QuestionNuke2xArtifact(),
    },
    {
      artifactId: 'fire-bomb-3x',
      title: 'Question Nuke III',
      description: 'Queue +3 question nukes on each correct answer.',
      cost: 180,
      createArtifact: () => new QuestionNuke3xArtifact(),
    },
    {
      artifactId: 'deflection-shields',
      title: 'Deflection Shields',
      description: 'Shield hits can launch deflected counter-shots.',
      cost: 30,
      createArtifact: () => new DeflectionShieldsArtifact(),
    },
    {
      artifactId: 'code-brain',
      title: 'Code Brain',
      description: 'Raw coding gold rewards are doubled.',
      cost: 25,
      createArtifact: () => new CodeBrainArtifact(),
    },
    {
      artifactId: 'code-brain-3x',
      title: 'Code Brain 3x',
      description: 'Raw coding gold rewards are tripled.',
      cost: 45,
      createArtifact: () => new CodeBrain3xArtifact(),
    },
    {
      artifactId: 'code-brain-4x',
      title: 'Code Brain 4x',
      description: 'Raw coding gold rewards are multiplied by 4x.',
      cost: 70,
      createArtifact: () => new CodeBrain4xArtifact(),
    },
    {
      artifactId: 'code-brain-6x',
      title: 'Code Brain 6x',
      description: 'Raw coding gold rewards are multiplied by 6x.',
      cost: 110,
      createArtifact: () => new CodeBrain6xArtifact(),
    },
    {
      artifactId: 'code-damage',
      title: 'Code Damage',
      description: 'Raw coding answers grant +1 permanent damage, and raw coding question frequency is doubled.',
      cost: 180,
      createArtifact: () => new CodeDamageArtifact(),
    },
    {
      artifactId: 'code-shield',
      title: 'Code Shield',
      description: 'Raw coding answers grant +18 max shield, and raw coding question frequency is doubled.',
      cost: 200,
      createArtifact: () => new CodeShieldArtifact(),
    },
    {
      artifactId: 'code-health',
      title: 'Code Health',
      description: 'Raw coding answers grant +15 max health, and raw coding question frequency is doubled.',
      cost: 200,
      createArtifact: () => new CodeHealthArtifact(),
    },
    {
      artifactId: 'code-fleet',
      title: 'Code Fleet',
      description: 'Raw coding answers summon 1 mini fleet ally, and raw coding question frequency is doubled.',
      cost: 260,
      createArtifact: () => new CodeFleetArtifact(),
    },
    {
      artifactId: 'mini-fleet',
      title: 'Mini Fleet',
      description: 'Each correct answer summons one mini ally.',
      cost: 440,
      createArtifact: () => new MiniFleetArtifact(),
    },
    {
      artifactId: 'mini-fleet-2x',
      title: 'Mini Fleet II',
      description: 'Each correct answer summons +2 mini allies.',
      cost: 800,
      createArtifact: () => new MiniFleet2xArtifact(),
    },
    {
      artifactId: 'mini-fleet-3x',
      title: 'Mini Fleet III',
      description: 'Each correct answer summons +3 mini allies.',
      cost: 1100,
      createArtifact: () => new MiniFleet3xArtifact(),
    },
    {
      artifactId: 'fleet-damage-2x',
      title: 'Fleet Payload Matrix',
      description: 'Double ally fleet member damage.',
      cost: 320,
      createArtifact: () => new FleetDamage2xArtifact(),
    },
    {
      artifactId: 'fleet-health-2x',
      title: 'Fleet Hull Matrix',
      description: 'Double ally fleet member health.',
      cost: 320,
      createArtifact: () => new FleetHealth2xArtifact(),
    },
    {
      artifactId: 'fleet-fire-rate-2x',
      title: 'Fleet Targeting Matrix',
      description: 'Double ally fleet member rate of fire.',
      cost: 320,
      createArtifact: () => new FleetFireRate2xArtifact(),
    },
    {
      artifactId: 'fleet-heal-health-1-per-5s',
      title: 'Fleet Field Medic',
      description: 'Ally fleet members restore 1 health every 5 seconds.',
      cost: 240,
      createArtifact: () => new FleetPlayerHealHealthArtifact(),
    },
    {
      artifactId: 'fleet-heal-shield-1-per-5s',
      title: 'Fleet Shield Relay',
      description: 'Ally fleet members restore 1 shield every 5 seconds.',
      cost: 240,
      createArtifact: () => new FleetPlayerHealShieldArtifact(),
    },
    {
      artifactId: 'big-boss',
      title: 'Big Boss',
      description: 'Each correct answer has a 50% chance to summon a heavy ally.',
      cost: 440,
      createArtifact: () => new BigBossArtifact(),
    },
    {
      artifactId: 'bonus-skip',
      title: 'Bonus Skip',
      description: 'Gain +1 skip.',
      cost: 100,
      createArtifact: () => new BonusSkipArtifact(),
    },
    {
      artifactId: 'bonus-life',
      title: 'Bonus Life',
      description: 'Gain +1 life',
      cost: 100,
      createArtifact: () => new BonusLifeArtifact(),
    },
    {
      artifactId: 'rapid-fire-core',
      title: 'Rapid Fire Core',
      description: '+20% rate of fire.',
      cost: 30,
      createArtifact: () => new RapidFireArtifact(),
    },
    {
      artifactId: 'sharpened-rounds',
      title: 'Sharpened Rounds',
      description: '+20% player damage.',
      cost: 30,
      createArtifact: () => new SharpenedRoundsArtifact(),
    },
    {
      artifactId: 'shield-generator',
      title: 'Shield Generator',
      description: 'Recharge +20% shield at round start.',
      cost: 30,
      createArtifact: () => new ShieldGeneratorArtifact(),
    },
    {
      artifactId: 'max-shield-boost-1x',
      title: 'Max Shield Boost I',
      description: 'Increase max shields by +50.',
      cost: 30,
      createArtifact: () => new MaxShieldBoost1xArtifact(),
    },
    {
      artifactId: 'max-shield-boost-2x',
      title: 'Max Shield Boost II',
      description: 'Increase max shields by +100.',
      cost: 60,
      createArtifact: () => new MaxShieldBoost2xArtifact(),
    },
    {
      artifactId: 'max-shield-boost-3x',
      title: 'Max Shield Boost III',
      description: 'Increase max shields by +150.',
      cost: 90,
      createArtifact: () => new MaxShieldBoost3xArtifact(),
    },
    {
      artifactId: 'max-shield-boost-4x',
      title: 'Max Shield Boost IV',
      description: 'Increase max shields by +200.',
      cost: 120,
      createArtifact: () => new MaxShieldBoost4xArtifact(),
    },
    {
      artifactId: 'max-shield-boost-5x',
      title: 'Max Shield Boost V',
      description: 'Increase max shields by +250.',
      cost: 150,
      createArtifact: () => new MaxShieldBoost5xArtifact(),
    },
    {
      artifactId: 'shield-juice',
      title: 'Shield Juice',
      description: 'When shields drop to 50% or below, instantly restore full shields once.',
      cost: 40,
      createArtifact: () => new ShieldJuiceArtifact(),
    },
    {
      artifactId: 'health-juice',
      title: 'Health Juice',
      description: 'When health drops to 50% or below, instantly restore full health once.',
      cost: 40,
      createArtifact: () => new HealthJuiceArtifact(),
    },
    {
      artifactId: 'bonus-shield-1x',
      title: 'Bonus Shields I',
      description: 'Increase max shields by +50.',
      cost: 35,
      createArtifact: () => new BonusShield1xArtifact(),
    },
    {
      artifactId: 'bonus-shield-2x',
      title: 'Bonus Shields II',
      description: 'Increase max shields by +100.',
      cost: 70,
      createArtifact: () => new BonusShield2xArtifact(),
    },
    {
      artifactId: 'bonus-shield-3x',
      title: 'Bonus Shields III',
      description: 'Increase max shields by +150.',
      cost: 105,
      createArtifact: () => new BonusShield3xArtifact(),
    },
    {
      artifactId: 'bonus-shield-4x',
      title: 'Bonus Shields IV',
      description: 'Increase max shields by +200.',
      cost: 140,
      createArtifact: () => new BonusShield4xArtifact(),
    },
    {
      artifactId: 'bonus-shield-5x',
      title: 'Bonus Shields V',
      description: 'Increase max shields by +250.',
      cost: 175,
      createArtifact: () => new BonusShield5xArtifact(),
    },
    {
      artifactId: 'bouncing-bullets',
      title: 'Bouncing Bullets',
      description: 'Projectiles gain +20% bounce chance.',
      cost: 90,
      createArtifact: () => new BouncingBulletsArtifact(),
    },
    {
      artifactId: 'burst-fire',
      title: 'Burst Fire',
      description: 'Adds +0.2 burst size.',
      cost: 55,
      createArtifact: () => new BurstFireArtifact(),
    },
    {
      artifactId: 'fire-rounds',
      title: 'Fire Rounds',
      description: 'Projectiles ignite enemies with burn damage.',
      cost: 140,
      createArtifact: () => new FireRoundsArtifact(),
    },
    {
      artifactId: 'bonus-health-flat',
      title: 'Bonus Health',
      description: 'Increase max health by +45.',
      cost: 30,
      createArtifact: () => new BonusHealthArtifact(),
    },
    {
      artifactId: 'bonus-health-1x',
      title: 'Bonus Health I',
      description: 'Increase max health by +45.',
      cost: 35,
      createArtifact: () => new BonusHealth1xArtifact(),
    },
    {
      artifactId: 'bonus-health-2x',
      title: 'Bonus Health II',
      description: 'Increase max health by +90.',
      cost: 70,
      createArtifact: () => new BonusHealth2xArtifact(),
    },
    {
      artifactId: 'bonus-health-3x',
      title: 'Bonus Health III',
      description: 'Increase max health by +135.',
      cost: 105,
      createArtifact: () => new BonusHealth3xArtifact(),
    },
    {
      artifactId: 'bonus-health-4x',
      title: 'Bonus Health IV',
      description: 'Increase max health by +180.',
      cost: 140,
      createArtifact: () => new BonusHealth4xArtifact(),
    },
    {
      artifactId: 'bonus-health-5x',
      title: 'Bonus Health V',
      description: 'Increase max health by +225.',
      cost: 175,
      createArtifact: () => new BonusHealth5xArtifact(),
    },
    {
      artifactId: 'bonus-damage-2x',
      title: 'Bonus Damage II',
      description: 'Multiply projectile damage by 2x.',
      cost: 110,
      createArtifact: () => new BonusDamage2xArtifact(),
    },
    {
      artifactId: 'bonus-damage-3x',
      title: 'Bonus Damage III',
      description: 'Multiply projectile damage by 3x.',
      cost: 150,
      createArtifact: () => new BonusDamage3xArtifact(),
    },
    {
      artifactId: 'bonus-damage-4x',
      title: 'Bonus Damage IV',
      description: 'Multiply projectile damage by 4x.',
      cost: 190,
      createArtifact: () => new BonusDamage4xArtifact(),
    },
    {
      artifactId: 'bonus-damage-5x',
      title: 'Bonus Damage V',
      description: 'Multiply projectile damage by 5x.',
      cost: 230,
      createArtifact: () => new BonusDamage5xArtifact(),
    },
    {
      artifactId: 'bonus-fire-rate-1x',
      title: 'Bonus Fire Rate I',
      description: 'Multiply rate of fire by 1.2x.',
      cost: 70,
      createArtifact: () => new BonusFireRate1xArtifact(),
    },
    {
      artifactId: 'bonus-fire-rate-2x',
      title: 'Bonus Fire Rate II',
      description: 'Multiply rate of fire by 1.44x.',
      cost: 90,
      createArtifact: () => new BonusFireRate2xArtifact(),
    },
    {
      artifactId: 'bonus-fire-rate-3x',
      title: 'Bonus Fire Rate III',
      description: 'Multiply rate of fire by 1.728x.',
      cost: 110,
      createArtifact: () => new BonusFireRate3xArtifact(),
    },
    {
      artifactId: 'bonus-fire-rate-4x',
      title: 'Bonus Fire Rate IV',
      description: 'Multiply rate of fire by 2.0736x.',
      cost: 130,
      createArtifact: () => new BonusFireRate4xArtifact(),
    },
    {
      artifactId: 'bonus-fire-rate-5x',
      title: 'Bonus Fire Rate V',
      description: 'Multiply rate of fire by 2.48832x.',
      cost: 150,
      createArtifact: () => new BonusFireRate5xArtifact(),
    },
    {
      artifactId: 'health-on-kill',
      title: 'Health On Kill',
      description: 'Increase max health by +5% on kill.',
      cost: 150,
      createArtifact: () => new HealthOnKillArtifact(),
    },
    {
      artifactId: 'shield-on-kill',
      title: 'Shield On Kill',
      description: 'Restore +20% max shields on kill.',
      cost: 30,
      createArtifact: () => new ShieldOnKillArtifact(),
    },
    {
      artifactId: 'quiz-bonus-time-30',
      title: 'Quiz Freeze +30s',
      description: 'Correct-answer freeze duration increases by +30 seconds.',
      cost: 30,
      createArtifact: () => new QuizFreeze30Artifact(),
    },
    {
      artifactId: 'quiz-bonus-time-60',
      title: 'Quiz Freeze +60s',
      description: 'Correct-answer freeze duration increases by +60 seconds.',
      cost: 60,
      createArtifact: () => new QuizFreeze60Artifact(),
    },
    {
      artifactId: 'quiz-bonus-time-90',
      title: 'Quiz Freeze +90s',
      description: 'Correct-answer freeze duration increases by +90 seconds.',
      cost: 80,
      createArtifact: () => new QuizFreeze90Artifact(),
    },
    {
      artifactId: 'quiz-bonus-time-120',
      title: 'Quiz Freeze +120s',
      description: 'Correct-answer freeze duration increases by +120 seconds.',
      cost: 100,
      createArtifact: () => new QuizFreeze120Artifact(),
    },
    {
      artifactId: 'gold-shield-heal',
      title: 'Aegis Treasury',
      description: 'Heal x% shields whenever you gain x gold.',
      cost: 60,
      createArtifact: () => new GoldShieldHealArtifact(),
    },
    {
      artifactId: 'gold-health-heal',
      title: 'Vital Treasury',
      description: 'Heal x/2% health whenever you gain x gold.',
      cost: 60,
      createArtifact: () => new GoldHealthHealArtifact(),
    },
    {
      artifactId: 'round-end-gold-interest',
      title: 'Compound Ledger',
      description: 'At end of round, gain gold equal to 10% of your current gold.',
      cost: 120,
      createArtifact: () => new RoundEndGoldInterestArtifact(),
    },
    {
      artifactId: 'round-end-treasure-tax',
      title: 'Treasure Tax Rebate',
      description: 'At end of round, gain 1 gold for each 5 gold you currently have.',
      cost: 200,
      createArtifact: () => new RoundEndTreasureTaxArtifact(),
    },
    {
      artifactId: 'round-end-shield-sack-mini-fleet',
      title: 'Aegis Conscription',
      description: 'At round end, sacrifice all shields and summon one mini fleet ally per 50 shields sacrificed.',
      cost: 220,
      createArtifact: () => new RoundEndShieldSackMiniFleetArtifact(),
    },
    {
      artifactId: 'slow-heavy-rounds',
      title: 'Titan Slugs',
      description: '0.1x rate of fire, 12x projectile damage.',
      cost: 90,
      createArtifact: () => new SlowHeavyRoundsArtifact(),
    },
    {
      artifactId: 'fast-light-rounds',
      title: 'Needle Storm',
      description: '6x rate of fire, 0.2x projectile damage.',
      cost: 90,
      createArtifact: () => new FastLightRoundsArtifact(),
    },
    {
      artifactId: 'hit-gold-no-kill-gold',
      title: 'Impact Tax Loop',
      description: '10% chance to gain 1 gold on hit, but kills grant no gold.',
      cost: 80,
      createArtifact: () => new HitGoldNoKillGoldArtifact(),
    },
    {
      artifactId: 'lucky-bullet-dividend',
      title: 'Lucky Bullet Dividend',
      description: 'Every bullet hit has a 5% chance to grant 1 gold.',
      cost: 90,
      createArtifact: () => new LuckyBulletDividendArtifact(),
    },
    {
      artifactId: 'no-question-heal-double-mini-fleet',
      title: 'Fleet Doctrine Pivot',
      description: 'No question healing, but summon +2 mini fleets on correct answers.',
      cost: 150,
      createArtifact: () => new NoQuestionHealDoubleMiniFleetArtifact(),
    },
    {
      artifactId: 'raw-code-buff-double',
      title: 'Compiler Catalyst',
      description: 'Double round-buff stacks earned from raw code questions.',
      cost: 120,
      createArtifact: () => new RawCodeBuffDoubleArtifact(),
    },
    {
      artifactId: 'kill-gold-boost',
      title: 'Bounty Calibrator',
      description: 'Increase kill gold by 1.25x.',
      cost: 80,
      createArtifact: () => new KillGoldBoostArtifact(),
    },
    {
      artifactId: 'riches-for-shots',
      title: 'Greedy Trigger',
      description: 'Gain 2.5x gold from all sources, but each shot has a 20% chance to cost 1 gold.',
      cost: 180,
      createArtifact: () => new RichesForShotsArtifact(),
    },
    {
      artifactId: 'nuke-only',
      title: 'Command Uplink',
      description: 'You cannot shoot, but gain +4 question nuke stacks.',
      cost: 90,
      createArtifact: () => new NukeOnlyArtifact(),
    },
    {
      artifactId: 'fleet-payroll',
      title: 'Fleet Payroll',
      description: 'Gain +10 gold per active fleet member at round end.',
      cost: 100,
      createArtifact: () => new FleetPayrollArtifact(),
    },
    {
      artifactId: 'streak-gold',
      title: 'Combo Treasury',
      description: 'Every 3 correct answers in a row grants +15 gold.',
      cost: 110,
      createArtifact: () => new StreakGoldArtifact(),
    },
    {
      artifactId: 'damage-buff-per-correct',
      title: 'Momentum Payload',
      description: 'Every correct answer grants +0.25 permanent damage.',
      cost: 140,
      createArtifact: () => new DamageBuffPerCorrectArtifact(),
    },
    {
      artifactId: 'shot-randomizer',
      title: 'Shot Randomizer',
      description: 'Whenever you shoot, fire at random targets and launch two bullets instead of one.',
      cost: 135,
      createArtifact: () => new ShotRandomizerArtifact(),
    },
    {
      artifactId: 'splash-damage',
      title: 'Splash Damage',
      description: 'Bullet impacts deal 10% of their damage to all enemies.',
      cost: 150,
      createArtifact: () => new SplashDamageArtifact(),
    },
    {
      artifactId: 'replace-question-buffs-with-gold',
      title: 'Golden Discipline',
      description: 'Question buffs are replaced by +12 gold each time.',
      cost: 80,
      createArtifact: () => new ReplaceQuestionBuffsWithGoldArtifact(),
    },
    {
      artifactId: 'question-time-health-drain',
      title: 'Overclocked Focus',
      description: 'Gain +120s question time, but lose 1 health every 5 seconds, stopping at 5 health.',
      cost: 100,
      createArtifact: () => new QuestionTimeHealthDrainArtifact(),
    },
    {
      artifactId: 'blood-to-shield',
      title: 'Hemoflux Converter',
      description: 'Every second, lose 1 health to gain 2 shield while below max shield and above 10 health.',
      cost: 180,
      createArtifact: () => new BloodToShieldArtifact(),
    },
    {
      artifactId: 'low-gold-shield-liquidation',
      title: 'Emergency Shield Pawn',
      description: 'Whenever you have less than 50 gold, trade all shields for gold equal to 50% of shield sacrificed.',
      cost: 100,
      createArtifact: () => new LowGoldShieldLiquidationArtifact(),
    },
    {
      artifactId: 'gold-life-loss-wipe',
      title: 'Fragile Fortune',
      description: 'Gain +10% gold, but lose all gold when you lose a life.',
      cost: 40,
      createArtifact: () => new GoldLifeLossWipeArtifact(),
    },
    {
      artifactId: 'gold-wrong-answer-wipe',
      title: 'Exam Tax',
      description: 'Gain +25% gold, but lose all gold when you answer wrong.',
      cost: 80,
      createArtifact: () => new GoldWrongAnswerWipeArtifact(),
    },
    {
      artifactId: 'gold-shield-break-reset',
      title: 'Aegis Bankruptcy',
      description: 'Gain +10% gold. If shield breaks while you have at least 20 gold, lose all gold and restore shield to full.',
      cost: 120,
      createArtifact: () => new GoldShieldBreakResetArtifact(),
    },
    {
      artifactId: 'health-dividend-death-on-wrong',
      title: 'Blood Dividend Pact',
      description: 'Round end: gain gold = 50% of health. Wrong answers cost one life.',
      cost: 170,
      createArtifact: () => new HealthDividendDeathOnWrongArtifact(),
    },
    {
      artifactId: 'berserker-blood-rounds',
      title: 'Bloodprice Rounds',
      description: 'Gain triple bullet damage, but lose 1 health every time you shoot.',
      cost: 190,
      createArtifact: () => new BerserkerBloodRoundsArtifact(),
    },
    {
      artifactId: 'round-end-heal-shields',
      title: 'Aegis Restoration',
      description: 'At the end of each round, restore your shields to full.',
      cost: 160,
      createArtifact: () => new RoundEndHealShieldsArtifact(),
    },
    {
      artifactId: 'round-end-heal-health',
      title: 'Vital Restoration',
      description: 'At the end of each round, restore your health to full.',
      cost: 110,
      createArtifact: () => new RoundEndHealHealthArtifact(),
    },
    {
      artifactId: 'gain-two-lives',
      title: 'Double Lifeline',
      description: 'Gain 2 extra lives.',
      cost: 180,
      createArtifact: () => new GainTwoLivesArtifact(),
    },
    {
      artifactId: 'gain-three-lives',
      title: 'Triple Lifeline',
      description: 'Gain 3 extra lives.',
      cost: 260,
      createArtifact: () => new GainThreeLivesArtifact(),
    },
    {
      artifactId: 'gain-four-lives',
      title: 'Quadruple Lifeline',
      description: 'Gain 4 extra lives.',
      cost: 340,
      createArtifact: () => new GainFourLivesArtifact(),
    },
    {
      artifactId: 'gain-three-lives-no-heal',
      title: 'Undying Pact',
      description: 'Gain 3 extra lives, but correct answers no longer heal you.',
      cost: 130,
      createArtifact: () => new GainThreeLivesNoHealArtifact(),
    },
    {
      artifactId: 'double-question-heal-lose-life-on-wrong',
      title: 'Mercy Forfeit',
      description: 'Double correct-answer healing, but every wrong answer costs one life. Skips do not trigger the life loss.',
      cost: 40,
      createArtifact: () => new DoubleQuestionHealLoseLifeOnWrongArtifact(),
    },
    {
      artifactId: 'convert-skips-to-lives',
      title: 'Mulligan Alchemy',
      description: 'Convert all current and future skips into lives. New lives no longer grant bonus skips.',
      cost: 260,
      createArtifact: () => new ConvertSkipsToLivesArtifact(),
    },
    {
      artifactId: 'sacrifice-lives-for-vitality',
      title: 'Last Stand Dividend',
      description: 'Lose all lives. For each life sacrificed, permanently gain +1x multiplier to max-health and max-shield growth.',
      cost: 280,
      createArtifact: () => new SacrificeLivesForVitalityArtifact(),
    },
    {
      artifactId: 'gain-two-skips',
      title: 'Extra Passes I',
      description: 'Gain 2 extra question skips.',
      cost: 70,
      createArtifact: () => new GainTwoSkipsArtifact(),
    },
    {
      artifactId: 'gain-three-skips',
      title: 'Extra Passes II',
      description: 'Gain 3 extra question skips.',
      cost: 100,
      createArtifact: () => new GainThreeSkipsArtifact(),
    },
    {
      artifactId: 'raw-coding-limited-runs',
      title: 'High Stakes Compiler',
      description: 'Earn 5x gold from coding problems, but you can only run your code 3 times. Exhaust all runs without passing and lose a life.',
      cost: 70,
      createArtifact: () => new RawCodingLimitedRunsArtifact(),
    },
    {
      artifactId: 'full-heal-01',
      title: 'Full Restore I',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore I'
      },
    },
    {
      artifactId: 'full-heal-02',
      title: 'Full Restore II',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore II'
      },
    },
    {
      artifactId: 'full-heal-03',
      title: 'Full Restore III',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore III'
      },
    },
    {
      artifactId: 'full-heal-04',
      title: 'Full Restore IV',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore IV'
      },
    },
    {
      artifactId: 'full-heal-05',
      title: 'Full Restore V',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore V'
      },
    },
    {
      artifactId: 'full-heal-06',
      title: 'Full Restore VI',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore VI'
      },
    },
    {
      artifactId: 'full-heal-07',
      title: 'Full Restore VII',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore VII'
      },
    },
    {
      artifactId: 'full-heal-08',
      title: 'Full Restore VIII',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore VIII'
      },
    },
    {
      artifactId: 'full-heal-09',
      title: 'Full Restore IX',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore IX'
      },
    },
    {
      artifactId: 'full-heal-10',
      title: 'Full Restore X',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore X'
      },
    },
    {
      artifactId: 'full-heal-11',
      title: 'Full Restore XI',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore XI'
      },
    },
    {
      artifactId: 'full-heal-12',
      title: 'Full Restore XII',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore XII'
      },
    },
    {
      artifactId: 'full-heal-13',
      title: 'Full Restore XIII',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore XIII'
      },
    },
    {
      artifactId: 'full-heal-14',
      title: 'Full Restore XIV',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore XIV'
      },
    },
    {
      artifactId: 'full-heal-15',
      title: 'Full Restore XV',
      description: 'Instantly heal health and shields to full. This artifact is consumed immediately.',
      cost: 45,
      repeatable: true,
      applyWithoutInventory: (selectedPlayer) => {
        selectedPlayer.healHealthAndShieldPercent(1)
        return 'Full Restore XV'
      },
    },
  ]

  return artifactDefinitions
    .filter((definition) => definition.repeatable === true || !ownedArtifactIds.has(definition.artifactId))
    .map((definition): RewardChoice => ({
      id: `artifact-${definition.artifactId}-${wave}`,
      kind: 'artifact',
      artifactId: definition.artifactId,
      title: definition.title,
      description: definition.description,
      cost: applyStoreCostMultiplier(definition.cost),
      apply: (selectedPlayer) => {
        if (definition.applyWithoutInventory) {
          return definition.applyWithoutInventory(selectedPlayer)
        }

        if (!definition.createArtifact) {
          return definition.title
        }

        const artifact = definition.createArtifact()
        selectedPlayer.applyArtifact(artifact)

        if (definition.artifactId === IMMEDIATE_RESTORATION_ARTIFACT_IDS.shield) {
          selectedPlayer.healShieldPercent(1)
        }

        if (definition.artifactId === IMMEDIATE_RESTORATION_ARTIFACT_IDS.health) {
          selectedPlayer.healHealthPercent(1)
        }

        return artifact.name
      },
    }))
}

function buildRoundRewardChoices(wave: number, player: Player): RewardChoice[] {
  const availableArtifactChoices = buildAvailableArtifactRewardChoices(wave, player)
  const fullHealChoices = availableArtifactChoices.filter((choice) => choice.artifactId?.startsWith('full-heal-'))
  const nonFullHealChoices = availableArtifactChoices.filter((choice) => !choice.artifactId?.startsWith('full-heal-'))

  if (fullHealChoices.length === 0) {
    return pickUniqueRandom(availableArtifactChoices, Math.min(9, availableArtifactChoices.length))
  }

  const selected = pickUniqueRandom(nonFullHealChoices, Math.min(8, nonFullHealChoices.length))
  selected.push(fullHealChoices[Math.floor(Math.random() * fullHealChoices.length)])

  return selected
}

export class WaveManager {
  private static readonly EARLY_ROF_NERF_START_MULTIPLIER = 3
  private static readonly EARLY_ROF_NERF_END_ROUND = 4
  private static readonly GLOBAL_ROF_MULT = 1.0
  private waveNumber = 1
  private roundsCleared = 0
  private waitingForReward = false
  private pendingNextWave = false
  private lastClearedWave: number | null = null
  private rewardPrompt: RewardPrompt | null = null
  private rewardChoices: RewardChoice[] = []

  static getEnemyCountForWave(wave: number): number {
    return 1 + Math.floor((wave - 1) * 0.5)
  }

  static getEarlyRoundRofIntervalMultiplier(wave: number): number {
    const normalizedWave = Math.max(1, Math.floor(wave))

    if (normalizedWave >= WaveManager.EARLY_ROF_NERF_END_ROUND) {
      return WaveManager.GLOBAL_ROF_MULT
    }

    const rampSpan = WaveManager.EARLY_ROF_NERF_END_ROUND - 1
    if (rampSpan <= 0) {
      return WaveManager.GLOBAL_ROF_MULT
    }

    const progress = (normalizedWave - 1) / rampSpan
    return (WaveManager.EARLY_ROF_NERF_START_MULTIPLIER - (WaveManager.EARLY_ROF_NERF_START_MULTIPLIER - 1) * progress) * WaveManager.GLOBAL_ROF_MULT
  }

  reset(): number {
    this.waveNumber = 1
    this.roundsCleared = 0
    this.waitingForReward = false
    this.pendingNextWave = false
    this.lastClearedWave = null
    this.rewardPrompt = null
    this.rewardChoices = []
    return this.waveNumber
  }

  setWaveForLoad(round: number, roundsCleared = Math.max(0, Math.floor(round) - 1)): number {
    this.reset()
    this.waveNumber = Math.max(1, Math.floor(round))
    this.roundsCleared = Math.max(0, Math.floor(roundsCleared))
    return this.waveNumber
  }

  getCurrentWaveNumber() {
    return this.waveNumber
  }

  getRoundsCleared() {
    return this.roundsCleared
  }

  consumePendingNextWave(): number | null {
    if (!this.pendingNextWave) {
      return null
    }

    this.waveNumber += 1
    this.pendingNextWave = false
    this.waitingForReward = false
    return this.waveNumber
  }

  handleRoundState(allDefeated: boolean, defeatedEnemyCount: number, player: Player): RoundClearEvent | null {
    const alreadyHandledClear = this.lastClearedWave === this.waveNumber

    if (!allDefeated || this.waitingForReward || this.pendingNextWave || alreadyHandledClear) {
      return null
    }

    this.waitingForReward = true
    this.lastClearedWave = this.waveNumber
    this.roundsCleared += 1

    const choices = buildRoundRewardChoices(this.waveNumber, player)
    const prompt: RewardPrompt = {
      wave: this.waveNumber,
      options: choices,
    }

    this.rewardPrompt = prompt
    this.rewardChoices = choices

    return {
      wave: this.waveNumber,
      defeatedEnemies: defeatedEnemyCount,
      nextWaveEnemyCount: WaveManager.getEnemyCountForWave(this.waveNumber + 1),
      prompt,
    }
  }

  applyRewardSelection(rewardId: string, player: Player, paidCost?: number): RewardSelectionResult | null {
    if (!this.waitingForReward || this.pendingNextWave || !this.rewardPrompt) {
      return null
    }

    const choice = this.rewardChoices.find((item) => item.id === rewardId)
    if (!choice) {
      return null
    }

    const itemName = choice.apply(player)

    return {
      kind: choice.kind,
      itemName,
      inventoryCount: player.getInventorySize(),
      cost: paidCost ?? choice.cost,
    }
  }

  rerollRewardChoices(player: Player): RewardPrompt | null {
    if (!this.waitingForReward || this.pendingNextWave) {
      return null
    }

    const choices = buildRoundRewardChoices(this.waveNumber, player)
    if (choices.length <= 0) {
      return null
    }

    const prompt: RewardPrompt = {
      wave: this.waveNumber,
      options: choices,
    }

    this.rewardChoices = choices
    this.rewardPrompt = prompt
    return prompt
  }

  completeRewardPhase() {
    if (!this.waitingForReward || this.pendingNextWave) {
      return false
    }

    this.rewardPrompt = null
    this.rewardChoices = []
    this.pendingNextWave = true
    return true
  }

  restoreRewardPhaseForLoad(wave: number, player: Player, rewardOptionIds: string[]): RewardPrompt | null {
    const normalizedWave = Math.max(1, Math.floor(wave))
    const allAvailableChoices = buildAvailableArtifactRewardChoices(normalizedWave, player)
    const choicesById = new Map(allAvailableChoices.map((choice) => [choice.id, choice]))
    const restoredChoices = rewardOptionIds
      .map((optionId) => choicesById.get(optionId))
      .filter((choice): choice is RewardChoice => choice !== undefined)

    if (restoredChoices.length <= 0) {
      return null
    }

    this.waveNumber = normalizedWave
    this.waitingForReward = true
    this.pendingNextWave = false
    this.lastClearedWave = normalizedWave
    this.rewardChoices = restoredChoices
    this.rewardPrompt = {
      wave: normalizedWave,
      options: restoredChoices,
    }

    return this.rewardPrompt
  }
}
