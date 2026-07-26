import { Attack } from '../gameObjects/Attack'
import { Actor } from '../gameObjects/Actor'
import { Enemy } from '../gameObjects/Enemy'
import * as THREE from 'three'
import { Inventory } from './Inventory'
import { Artifact } from './Artifacts/Artifact'
import { AdditionalKillCreditArtifact } from './Artifacts/AdditionalKillCreditArtifact'
import { BonusHealthArtifact } from './Artifacts/BonusHealthArtifact'
import { BonusHealthPercentArtifact } from './Artifacts/BonusHealthPercentArtifact'
import { BouncingBulletsArtifact } from './Artifacts/BouncingBulletsArtifact'
import { BurstFireArtifact } from './Artifacts/BurstFireArtifact'
import { CodeBrainArtifact } from './Artifacts/CodeBrainArtifact'
import { DamageOnKillArtifact } from './Artifacts/DamageOnKillArtifact'
import { DeflectionShieldsArtifact } from './Artifacts/DeflectionShieldsArtifact'
import { FireRoundsArtifact } from './Artifacts/FireRoundsArtifact'
import { FireBombArtifact } from './Artifacts/FireBombArtifact'
import { FreezeBombArtifact } from './Artifacts/FreezeBombArtifact'
import { GoldBountyArtifact } from './Artifacts/GoldBountyArtifact'
import { HealthOnKillArtifact } from './Artifacts/HealthOnKillArtifact'
import { MiniFleetArtifact } from './Artifacts/MiniFleetArtifact'
import { QuizBonusHealthArtifact } from './Artifacts/QuizBonusHealthArtifact'
import { QuizBonusTimeArtifact } from './Artifacts/QuizBonusTimeArtifact'
import { RapidFireArtifact } from './Artifacts/RapidFireArtifact'
import { SharpenedRoundsArtifact } from './Artifacts/SharpenedRoundsArtifact'
import { MaxShieldBoostArtifact } from './Artifacts/MaxShieldBoostArtifact'
import { BigBossArtifact } from './Artifacts/BigBossArtifact'
import { BonusLifeArtifact } from './Artifacts/BonusLifeArtifact'
import { BonusSkipArtifact } from './Artifacts/BonusSkipArtifact'
import { ShieldGeneratorArtifact } from './Artifacts/ShieldGeneratorArtifact'
import { ShieldOnKillArtifact } from './Artifacts/ShieldOnKillArtifact'
import { ShieldRechargerArtifact } from './Artifacts/ShieldRechargerArtifact'
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
  MaxShieldBoost1xArtifact,
  MaxShieldBoost2xArtifact,
  MaxShieldBoost3xArtifact,
  MaxShieldBoost4xArtifact,
  MaxShieldBoost5xArtifact,
  ShieldGateArtifact,
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
  RoundEndGoldInterestArtifact,
  SlowHeavyRoundsArtifact,
  StreakGoldArtifact,
  GoldDrainShotPowerArtifact,
  ShieldBurstMiniFleetArtifact,
  HealthBurstMiniFleetArtifact,
  ShieldBurstBigBossArtifact,
  KillSpawnMiniFleetArtifact,
  BossKillSpawnBigBossArtifact,
  CodeBrain3xArtifact,
  CodeBrain4xArtifact,
  CodeBrain6xArtifact,
  CodeDamageArtifact,
  CodeFleetArtifact,
  CodeHealthArtifact,
  CodeShieldArtifact,
  GoldThresholdMiniFleetArtifact,
  GoldThresholdBigBossArtifact,
  LowGoldShieldLiquidationArtifact,
  RoundEndTreasureTaxArtifact,
  RoundEndShieldSackMiniFleetArtifact,
  BloodToShieldArtifact,
  BerserkerBloodRoundsArtifact,
  RoundEndHealShieldsArtifact,
  RoundEndHealHealthArtifact,
  GainTwoLivesArtifact,
  GainThreeLivesArtifact,
  GainFourLivesArtifact,
  GainThreeLivesNoHealArtifact,
  DoubleQuestionHealLoseLifeOnWrongArtifact,
  ConvertSkipsToLivesArtifact,
  SacrificeLivesForVitalityArtifact,
  GainTwoSkipsArtifact,
  GainThreeSkipsArtifact,
  RawCodingLimitedRunsArtifact,
} from './Artifacts/ExpandedArtifacts'
import {
  PlayerBuffManager,
  type RoundQuizBuffType,
  type PlayerArtifactStats,
} from './PlayerBuffManager'
import type { PlayerStateSnapshot } from './PlayerState'
import { Consumable } from './Consumables/Consumable'
import type { GameObject } from '../GameObject'
import type { AttackPalette } from '../gameObjects/AttackSpriteTexture'
import { LightningBolt } from '../gameObjects/LightningBolt'
import { Particle } from '../gameObjects/Particle'
import { QuestionNuke } from '../gameObjects/QuestionNuke'

type AttackSpawner = (attack: Attack) => void
type EffectSpawner = (effect: GameObject) => void
type FormationPosition = readonly [number, number, number]
type MutableFormationPosition = { x: number; y: number; z: number }
type LifeLostListener = (remainingLives: number) => void
type SaveableTarget = Actor & { getSaveId?: () => string }
type AllySummonType = 'mini' | 'boss'
type AllySummonSpawner = (kind: AllySummonType) => void
type EnemyKillGoldListener = (position: readonly [number, number, number], goldAmount: number, breakdown?: { base: number; killMultiplier: number; artifactMultiplier: number; runMultiplier: number }) => void
type ArtifactFactory = () => Artifact
export type { ActiveConsumableEffect, PlayerArtifactStats } from './PlayerBuffManager'

const ARTIFACT_FACTORIES: Record<string, ArtifactFactory> = {
  'additional-kill-credit': () => new AdditionalKillCreditArtifact(),
  'bonus-health-flat': () => new BonusHealthArtifact(),
  'bonus-health-percent': () => new BonusHealthPercentArtifact(),
  'bouncing-bullets': () => new BouncingBulletsArtifact(),
  'burst-fire': () => new BurstFireArtifact(),
  'code-brain': () => new CodeBrainArtifact(),
  'code-brain-3x': () => new CodeBrain3xArtifact(),
  'code-brain-4x': () => new CodeBrain4xArtifact(),
  'code-brain-6x': () => new CodeBrain6xArtifact(),
  'code-damage': () => new CodeDamageArtifact(),
  'code-shield': () => new CodeShieldArtifact(),
  'code-health': () => new CodeHealthArtifact(),
  'code-fleet': () => new CodeFleetArtifact(),
  'damage-on-kill': () => new DamageOnKillArtifact(),
  'deflection-shields': () => new DeflectionShieldsArtifact(),
  'fire-rounds': () => new FireRoundsArtifact(),
  'fire-bomb': () => new FireBombArtifact(),
  'freeze-bomb': () => new FreezeBombArtifact(),
  'gold-bounty': () => new GoldBountyArtifact(),
  'health-on-kill': () => new HealthOnKillArtifact(),
  'mini-fleet': () => new MiniFleetArtifact(),
  'quiz-bonus-health': () => new QuizBonusHealthArtifact(),
  'quiz-bonus-time': () => new QuizBonusTimeArtifact(),
  'rapid-fire-core': () => new RapidFireArtifact(),
  'big-boss': () => new BigBossArtifact(),
  'bonus-life': () => new BonusLifeArtifact(),
  'bonus-skip': () => new BonusSkipArtifact(),
  'sharpened-rounds': () => new SharpenedRoundsArtifact(),
  'max-shield-boost': () => new MaxShieldBoostArtifact(),
  'max-shield-boost-1x': () => new MaxShieldBoost1xArtifact(),
  'max-shield-boost-2x': () => new MaxShieldBoost2xArtifact(),
  'max-shield-boost-3x': () => new MaxShieldBoost3xArtifact(),
  'max-shield-boost-4x': () => new MaxShieldBoost4xArtifact(),
  'max-shield-boost-5x': () => new MaxShieldBoost5xArtifact(),
  'shield-gate': () => new ShieldGateArtifact(),
  'shield-juice': () => new ShieldJuiceArtifact(),
  'health-juice': () => new HealthJuiceArtifact(),
  'bonus-shield-1x': () => new BonusShield1xArtifact(),
  'bonus-shield-2x': () => new BonusShield2xArtifact(),
  'bonus-shield-3x': () => new BonusShield3xArtifact(),
  'bonus-shield-4x': () => new BonusShield4xArtifact(),
  'bonus-shield-5x': () => new BonusShield5xArtifact(),
  'bonus-health-1x': () => new BonusHealth1xArtifact(),
  'bonus-health-2x': () => new BonusHealth2xArtifact(),
  'bonus-health-3x': () => new BonusHealth3xArtifact(),
  'bonus-health-4x': () => new BonusHealth4xArtifact(),
  'bonus-health-5x': () => new BonusHealth5xArtifact(),
  'bonus-damage-2x': () => new BonusDamage2xArtifact(),
  'bonus-damage-3x': () => new BonusDamage3xArtifact(),
  'bonus-damage-4x': () => new BonusDamage4xArtifact(),
  'bonus-damage-5x': () => new BonusDamage5xArtifact(),
  'bonus-fire-rate-1x': () => new BonusFireRate1xArtifact(),
  'bonus-fire-rate-2x': () => new BonusFireRate2xArtifact(),
  'bonus-fire-rate-3x': () => new BonusFireRate3xArtifact(),
  'bonus-fire-rate-4x': () => new BonusFireRate4xArtifact(),
  'bonus-fire-rate-5x': () => new BonusFireRate5xArtifact(),
  'shield-generator': () => new ShieldGeneratorArtifact(),
  'shield-on-kill': () => new ShieldOnKillArtifact(),
  'shield-recharger': () => new ShieldRechargerArtifact(),
  'gold-bounty-2x': () => new GoldBounty2xArtifact(),
  'gold-bounty-3x': () => new GoldBounty3xArtifact(),
  'gold-bounty-4x': () => new GoldBounty4xArtifact(),
  'gold-shield-heal': () => new GoldShieldHealArtifact(),
  'gold-health-heal': () => new GoldHealthHealArtifact(),
  'round-end-gold-interest': () => new RoundEndGoldInterestArtifact(),
  'slow-heavy-rounds': () => new SlowHeavyRoundsArtifact(),
  'fast-light-rounds': () => new FastLightRoundsArtifact(),
  'hit-gold-no-kill-gold': () => new HitGoldNoKillGoldArtifact(),
  'lucky-bullet-dividend': () => new LuckyBulletDividendArtifact(),
  'no-question-heal-double-mini-fleet': () => new NoQuestionHealDoubleMiniFleetArtifact(),
  'raw-code-buff-double': () => new RawCodeBuffDoubleArtifact(),
  'kill-gold-boost': () => new KillGoldBoostArtifact(),
  'fleet-damage-2x': () => new FleetDamage2xArtifact(),
  'fleet-health-2x': () => new FleetHealth2xArtifact(),
  'fleet-fire-rate-2x': () => new FleetFireRate2xArtifact(),
  'fleet-heal-health-1-per-5s': () => new FleetPlayerHealHealthArtifact(),
  'fleet-heal-shield-1-per-5s': () => new FleetPlayerHealShieldArtifact(),
  'riches-for-shots': () => new RichesForShotsArtifact(),
  'shot-randomizer': () => new ShotRandomizerArtifact(),
  'splash-damage': () => new SplashDamageArtifact(),
  'nuke-only': () => new NukeOnlyArtifact(),
  'fleet-payroll': () => new FleetPayrollArtifact(),
  'streak-gold': () => new StreakGoldArtifact(),
  'fire-bomb-2x': () => new QuestionNuke2xArtifact(),
  'fire-bomb-3x': () => new QuestionNuke3xArtifact(),
  'freeze-bomb-2x': () => new FreezeRay2xArtifact(),
  'freeze-bomb-3x': () => new FreezeRay3xArtifact(),
  'mini-fleet-2x': () => new MiniFleet2xArtifact(),
  'mini-fleet-3x': () => new MiniFleet3xArtifact(),
  'damage-buff-per-correct': () => new DamageBuffPerCorrectArtifact(),
  'replace-question-buffs-with-gold': () => new ReplaceQuestionBuffsWithGoldArtifact(),
  'question-time-health-drain': () => new QuestionTimeHealthDrainArtifact(),
  'gold-life-loss-wipe': () => new GoldLifeLossWipeArtifact(),
  'gold-wrong-answer-wipe': () => new GoldWrongAnswerWipeArtifact(),
  'gold-shield-break-reset': () => new GoldShieldBreakResetArtifact(),
  'health-dividend-death-on-wrong': () => new HealthDividendDeathOnWrongArtifact(),
  'quiz-bonus-time-30': () => new QuizFreeze30Artifact(),
  'quiz-bonus-time-60': () => new QuizFreeze60Artifact(),
  'quiz-bonus-time-90': () => new QuizFreeze90Artifact(),
  'quiz-bonus-time-120': () => new QuizFreeze120Artifact(),
  'gold-drain-shot-power': () => new GoldDrainShotPowerArtifact(),
  'shield-burst-mini-fleet': () => new ShieldBurstMiniFleetArtifact(),
  'health-burst-mini-fleet': () => new HealthBurstMiniFleetArtifact(),
  'shield-burst-big-boss': () => new ShieldBurstBigBossArtifact(),
  'kill-spawn-mini-fleet': () => new KillSpawnMiniFleetArtifact(),
  'boss-kill-spawn-big-boss': () => new BossKillSpawnBigBossArtifact(),
  'gold-threshold-mini-fleet': () => new GoldThresholdMiniFleetArtifact(),
  'gold-threshold-big-boss': () => new GoldThresholdBigBossArtifact(),
  'low-gold-shield-liquidation': () => new LowGoldShieldLiquidationArtifact(),
  'round-end-treasure-tax': () => new RoundEndTreasureTaxArtifact(),
  'round-end-shield-sack-mini-fleet': () => new RoundEndShieldSackMiniFleetArtifact(),
  'blood-to-shield': () => new BloodToShieldArtifact(),
  'berserker-blood-rounds': () => new BerserkerBloodRoundsArtifact(),
  'round-end-heal-shields': () => new RoundEndHealShieldsArtifact(),
  'round-end-heal-health': () => new RoundEndHealHealthArtifact(),
  'gain-two-lives': () => new GainTwoLivesArtifact(),
  'gain-three-lives': () => new GainThreeLivesArtifact(),
  'gain-four-lives': () => new GainFourLivesArtifact(),
  'gain-three-lives-no-heal': () => new GainThreeLivesNoHealArtifact(),
  'double-question-heal-lose-life-on-wrong': () => new DoubleQuestionHealLoseLifeOnWrongArtifact(),
  'convert-skips-to-lives': () => new ConvertSkipsToLivesArtifact(),
  'sacrifice-lives-for-vitality': () => new SacrificeLivesForVitalityArtifact(),
  'gain-two-skips': () => new GainTwoSkipsArtifact(),
  'gain-three-skips': () => new GainThreeSkipsArtifact(),
  'raw-coding-limited-runs': () => new RawCodingLimitedRunsArtifact(),
}

export function getArtifactNameAndDescriptionById(artifactId: string): {
  id: string
  name: string
  description: string
} | null {
  const factory = ARTIFACT_FACTORIES[artifactId]
  if (!factory) {
    return null
  }

  const artifact = factory()
  return {
    id: artifact.id,
    name: artifact.name,
    description: artifact.description,
  }
}

const PLAYER_PROJECTILE_PALETTE: AttackPalette = {
  core: 'rgba(240, 253, 244, 0.98)',
  edge: 'rgba(74, 222, 128, 0.9)',
  trail: 'rgba(16, 185, 129, 0.95)',
}

function createShieldBarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 176

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create shield bar texture context')
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return {
    context,
    texture,
  }
}

function redrawShieldBar(context: CanvasRenderingContext2D, ratio: number) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  const safeRatio = Math.max(0, Math.min(1, ratio))

  // Draw a larger integrated frame so shield appears folded into the main health bar.
  context.fillStyle = 'rgba(5, 12, 26, 0.18)'
  context.strokeStyle = 'rgba(125, 211, 252, 0.45)'
  context.lineWidth = 8
  context.beginPath()
  context.roundRect(42, 26, 556, 108, 28)
  context.fill()
  context.stroke()

  // Render only a top shield band; the health bar remains visible in lower band.
  context.fillStyle = 'rgba(15, 23, 42, 0.82)'
  context.strokeStyle = 'rgba(125, 211, 252, 0.52)'
  context.lineWidth = 5
  context.beginPath()
  context.roundRect(58, 44, 524, 32, 14)
  context.fill()
  context.stroke()

  const fillWidth = 516 * safeRatio
  if (fillWidth > 0) {
    const fillGradient = context.createLinearGradient(58, 0, 582, 0)
    fillGradient.addColorStop(0, 'rgba(34, 211, 238, 0.92)')
    fillGradient.addColorStop(0.55, 'rgba(56, 189, 248, 0.94)')
    fillGradient.addColorStop(1, 'rgba(191, 219, 254, 0.98)')

    context.fillStyle = fillGradient
    context.beginPath()
    context.roundRect(62, 48, fillWidth, 24, 10)
    context.fill()

    context.globalAlpha = 0.42
    context.fillStyle = 'rgba(255, 255, 255, 0.7)'
    context.beginPath()
    context.roundRect(62, 50, fillWidth, 8, 6)
    context.fill()
    context.globalAlpha = 1
  }

  // Tick markers to align visually with health bar segmentation.
  context.strokeStyle = 'rgba(191, 219, 254, 0.18)'
  context.lineWidth = 3
  for (let index = 1; index < 10; index += 1) {
    const x = 62 + index * 51.6
    context.beginPath()
    context.moveTo(x, 48)
    context.lineTo(x, 72)
    context.stroke()
  }
}

function createNukeQueueTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create nuke queue texture context')
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return {
    context,
    texture,
  }
}

function redrawNukeQueueTexture(context: CanvasRenderingContext2D, queuedNukes: number) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  if (queuedNukes <= 0) {
    return
  }

  context.fillStyle = 'rgba(2, 6, 23, 0.86)'
  context.strokeStyle = 'rgba(248, 113, 113, 0.88)'
  context.lineWidth = 9
  context.beginPath()
  context.roundRect(22, 24, 212, 208, 30)
  context.fill()
  context.stroke()

  context.fillStyle = 'rgba(248, 113, 113, 0.98)'
  context.font = 'bold 36px "Trebuchet MS", "Verdana", sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('NUKES', 128, 74)

  context.fillStyle = 'rgba(255, 255, 255, 0.98)'
  context.font = 'bold 118px "Trebuchet MS", "Verdana", sans-serif'
  context.fillText(`${queuedNukes}`, 128, 164)
}

function createFreezeQueueTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create freeze queue texture context')
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return {
    context,
    texture,
  }
}

function redrawFreezeQueueTexture(context: CanvasRenderingContext2D, queuedFreezeRays: number) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  if (queuedFreezeRays <= 0) {
    return
  }

  context.fillStyle = 'rgba(2, 6, 23, 0.86)'
  context.strokeStyle = 'rgba(56, 189, 248, 0.9)'
  context.lineWidth = 9
  context.beginPath()
  context.roundRect(22, 24, 212, 208, 30)
  context.fill()
  context.stroke()

  context.fillStyle = 'rgba(56, 189, 248, 0.98)'
  context.font = 'bold 34px "Trebuchet MS", "Verdana", sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('FREEZE', 128, 74)

  context.fillStyle = 'rgba(255, 255, 255, 0.98)'
  context.font = 'bold 118px "Trebuchet MS", "Verdana", sans-serif'
  context.fillText(`${queuedFreezeRays}`, 128, 164)
}

export class Player extends Actor {
  private static readonly INITIAL_LIVES = 3
  private static readonly INITIAL_SKIPS = 3
  private static readonly INITIAL_MAX_SHIELD = 50
  private static readonly GLOBAL_FIRE_RATE_MULTIPLIER = 0.5
  private static readonly GLOBAL_DAMAGE_MULTIPLIER = 1
  private static readonly QUESTION_NUKE_DAMAGE = 500
  private static readonly QUESTION_NUKE_FIRE_INTERVAL_SECONDS = 1
  private static readonly FREEZE_RAY_INTERVAL_SECONDS = 1
  private static readonly FREEZE_RAY_DURATION_SECONDS = 30
  private readonly formationPosition: MutableFormationPosition
  private attackTargets: Actor[] = []
  private readonly liveAttackTargetsBuffer: Actor[] = []
  private attackSpawner: AttackSpawner | null = null
  private effectSpawner: EffectSpawner | null = null
  private attackCooldown = 0
  private readonly baseAttackInterval = (1.35 / Player.GLOBAL_FIRE_RATE_MULTIPLIER) / 5
  private readonly baseAttackDamage = 20 * Player.GLOBAL_DAMAGE_MULTIPLIER
  private readonly buffManager = new PlayerBuffManager()
  private lockedTarget: Actor | null = null
  private readonly inventory = new Inventory()
  private readonly artifacts: Artifact[] = []
  private shield = Player.INITIAL_MAX_SHIELD
  private maxShield = Player.INITIAL_MAX_SHIELD
  private readonly shieldBarContext: CanvasRenderingContext2D
  private readonly shieldBarTexture: THREE.CanvasTexture
  private readonly shieldBarSprite: THREE.Sprite
  private readonly nukeQueueContext: CanvasRenderingContext2D
  private readonly nukeQueueTexture: THREE.CanvasTexture
  private readonly nukeQueueSprite: THREE.Sprite
  private readonly freezeQueueContext: CanvasRenderingContext2D
  private readonly freezeQueueTexture: THREE.CanvasTexture
  private readonly freezeQueueSprite: THREE.Sprite
  private lifeLostListener: LifeLostListener | null = null
  private allySummonSpawner: AllySummonSpawner | null = null
  private enemyKillGoldListener: EnemyKillGoldListener | null = null
  private lives = Player.INITIAL_LIVES
  private skips = Player.INITIAL_SKIPS
  private gold = 50
  private enemyKills = 0
  private quizScoreBonus = 0
  private goldPerKill = 15
  private globalAttackIntervalMultiplier = 1
  private appliedRoundHealthMultiplier = 1
  private appliedRoundShieldMultiplier = 1
  private queuedQuestionNukes = 0
  private queuedFreezeRays = 0
  private questionNukeFireTimerSeconds = 0
  private freezeRayFireTimerSeconds = 0
  private runGoldMultiplier = 1
  private killGoldMultiplier = 1
  private maxHealthGainMultiplier = 1
  private maxShieldGainMultiplier = 1
  private damageLifestealRatio = 0
  private fireRateMultiplier = 1
  private attackDamageMultiplier = 1
  private canShoot = true
  private requireShieldExhaustionToShoot = false
  private goldLossPerShot = 0
  private goldLossPerShotChance = 1
  private goldOnHitChance = 0
  private goldOnHitAmount = 0
  private shieldHealPercentPerGoldGain = 0
  private healthHealPercentPerGoldGain = 0
  private disableQuestionHealingFromArtifacts = false
  private rawCodeBuffRewardMultiplier = 1
  private roundEndGoldPercentOfCurrentGold = 0
  private roundEndGoldPerFleetMember = 0
  private fleetDamageMultiplier = 1
  private fleetHealthMultiplier = 1
  private fleetRateOfFireMultiplier = 1
  private fleetPlayerHealHealthPerFiveSeconds = 0
  private fleetPlayerHealShieldPerFiveSeconds = 0
  private roundEndGoldPercentOfHealth = 0
  private streakGoldThreshold = 0
  private streakGoldBonus = 0
  private bonusQuestionNukeStacks = 0
  private bonusFreezeRayStacks = 0
  private damagePerCorrectAnswer = 0
  private replaceQuestionBuffsWithGold = false
  private replacementGoldPerQuestionBuff = 0
  private questionTimeHealthDrainPerFiveSeconds = 0
  private loseAllGoldOnLifeLoss = false
  private loseAllGoldOnWrongAnswer = false
  private shieldBreakGoldResetEnabled = false
  private loseLifeOnWrongAnswer = false
  private shieldBreakGoldResetTriggered = false
  private shieldMaxSpawnMiniFleet = false
  private healthMaxSpawnMiniFleet = false
  private shieldMaxSpawnBigBoss = false
  private killSpawnMiniFleet = false
  private bossKillSpawnBigBoss = false
  private goldThresholdMiniFleet = 0
  private goldThresholdBigBoss = 0
  private lowGoldShieldLiquidationThreshold = 0
  private lowGoldShieldToGoldRatio = 0
  private roundEndShieldSacrificeMiniFleetThreshold = 0
  private bloodToShieldHealthLossPerSecond = 0
  private bloodToShieldShieldGainPerSecond = 0
  private healthLossPerShot = 0
  private lastGoldThresholdMiniFleetLevel = 0
  private lastGoldThresholdBigBossLevel = 0
  private roundEndHealShieldsToFull = false
  private roundEndHealHealthToFull = false
  private rawCodingRunLimit = 0
  private rawCodingQuestionFrequencyMultiplier = 1
  private rawCodingDamagePerCorrectAnswer = 0
  private rawCodingMaxShieldPerCorrectAnswer = 0
  private rawCodingMaxHealthPerCorrectAnswer = 0
  private rawCodingMiniFleetPerCorrectAnswer = 0
  private shieldJuiceEnabled = false
  private healthJuiceEnabled = false
  private questionAnswerHealingMultiplier = 1
  private correctAnswerArtifactBonusMultiplier = 1
  private skipToLifeConversionEnabled = false
  private shotRandomizerEnabled = false
  private splashDamageRatioOnHit = 0

  constructor(formationPosition: FormationPosition = [0, -0.05, 2.35]) {
    const mutableFormationPosition: MutableFormationPosition = {
      x: formationPosition[0],
      y: formationPosition[1],
      z: formationPosition[2],
    }

    super('MainPlayer', {
      style: {
        label: 'P',
        primary: 'rgba(74, 222, 128, 0.92)',
        secondary: 'rgba(34, 197, 94, 0.42)',
        accent: 'rgba(16, 185, 129, 0.9)',
        glow: 'rgba(236, 253, 245, 0.98)',
        trail: 'rgba(240, 253, 244, 0.86)',
      },
      motion: {
        position: () => [mutableFormationPosition.x, mutableFormationPosition.y, mutableFormationPosition.z],
        rotationZ: () => 0,
      },
      animation: {
        scale: 2.8,
        pulseAmount: 0.05,
        pulseSpeed: 1.7,
        spriteRotationSpeed: 0.16,
        opacityBase: 0.95,
        opacityVariation: 0.05,
      },
    })

    this.formationPosition = mutableFormationPosition
    const { context, texture } = createShieldBarTexture()
    this.shieldBarContext = context
    this.shieldBarTexture = texture
    this.shieldBarSprite = this.addSprite(texture, {
      position: [0, 2.55, 0.01],
      scale: 1,
      blending: THREE.NormalBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    })
    this.shieldBarSprite.scale.set(2.16, 0.62, 1)
    this.redrawShieldOverlay()

    const { context: nukeQueueContext, texture: nukeQueueTexture } = createNukeQueueTexture()
    this.nukeQueueContext = nukeQueueContext
    this.nukeQueueTexture = nukeQueueTexture
    this.nukeQueueSprite = this.addSprite(nukeQueueTexture, {
      position: [-0.62, 3.28, 0.02],
      scale: 1,
      blending: THREE.NormalBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    })
    this.nukeQueueSprite.scale.set(1.02, 1.02, 1)
    this.redrawNukeQueueOverlay()

    const { context: freezeQueueContext, texture: freezeQueueTexture } = createFreezeQueueTexture()
    this.freezeQueueContext = freezeQueueContext
    this.freezeQueueTexture = freezeQueueTexture
    this.freezeQueueSprite = this.addSprite(freezeQueueTexture, {
      position: [0.62, 3.28, 0.02],
      scale: 1,
      blending: THREE.NormalBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    })
    this.freezeQueueSprite.scale.set(1.02, 1.02, 1)
    this.redrawFreezeQueueOverlay()
  }

  setAttackTargets(targets: Actor[]) {
    this.attackTargets = targets
  }

  restoreLockedTarget(targetId: string | null) {
    if (!targetId) {
      this.lockedTarget = null
      return
    }

    const restoredTarget = this.attackTargets.find((target) => {
      const saveableTarget = target as SaveableTarget
      return typeof saveableTarget.getSaveId === 'function' && saveableTarget.getSaveId() === targetId
    })

    this.lockedTarget = restoredTarget ?? null
  }

  setAttackSpawner(spawner: AttackSpawner) {
    this.attackSpawner = spawner
  }

  setEffectSpawner(spawner: EffectSpawner) {
    this.effectSpawner = spawner
  }

  setLifeLostListener(listener: LifeLostListener | null) {
    this.lifeLostListener = listener
  }

  setAllySummonSpawner(spawner: AllySummonSpawner | null) {
    this.allySummonSpawner = spawner
  }

  setEnemyKillGoldListener(listener: EnemyKillGoldListener | null) {
    this.enemyKillGoldListener = listener
  }

  setFormationPosition(x: number, y: number, z: number) {
    this.formationPosition.x = x
    this.formationPosition.y = y
    this.formationPosition.z = z
    this.group.position.set(x, y, z)
  }

  applyArtifact(artifact: Artifact) {
    artifact.apply(this)
    this.artifacts.push(artifact)
  }

  addConsumable(consumable: Consumable) {
    this.inventory.addConsumable(consumable)
  }

  getConsumables() {
    return this.inventory.getConsumables()
  }

  getInventorySize() {
    return this.inventory.getSize()
  }

  useConsumableAt(index: number) {
    return this.inventory.consumeAt(index, this)
  }

  override damage(amount: number, onKilled?: () => void) {
    if (this.isDead()) {
      return false
    }

    const incoming = Actor.applyIncomingDamageMultiplier(amount)
    let remainingDamage = incoming

    if (this.shield > 0) {
      remainingDamage *= this.buffManager.getRoundShieldDamageReductionMultiplier()
      const absorbed = Math.min(this.shield, remainingDamage)
      this.shield -= absorbed
      remainingDamage -= absorbed
      if (absorbed > 0) {
        this.tryDeflectShieldHit()
      }
      this.redrawShieldOverlay()
      this.tryConsumeShieldJuice()
    }

    remainingDamage *= this.buffManager.getRoundHealthDamageReductionMultiplier()

    if (remainingDamage >= this.getCurrentHealth() && this.lives > 0) {
      this.lives -= 1
      this.applyLifeLossArtifactConsequences()
      this.setHealth(this.getMaxHealthValue())
      this.shield = this.maxShield
      this.redrawShieldOverlay()
      this.lifeLostListener?.(this.lives)
      return false
    }

    const killed = remainingDamage > 0 ? this.damageRaw(remainingDamage, onKilled) : false
    if (!killed && remainingDamage > 0) {
      this.tryConsumeHealthJuice()
    }

    if (
      !killed &&
      remainingDamage > 0 &&
      this.buffManager.getShieldRechargeOnHealthHitPercent() > 0
    ) {
      const convertedShield = remainingDamage * this.buffManager.getShieldRechargeOnHealthHitPercent()
      this.addShield(convertedShield)
    }

    return killed
  }

  override heal(amount: number) {
    if (this.isDead() || amount <= 0) {
      return
    }

    const currentHealth = this.getHealth()
    const maxHealth = this.getMaxHealth()
    const missingHealth = Math.max(0, maxHealth - currentHealth)

    if (missingHealth <= 0) {
      this.addShield(amount)
      return
    }

    const healedAmount = Math.min(amount, missingHealth)
    this.setHealth(currentHealth + healedAmount)
    this.trySpawnHealthMaxAlly()

    const overheal = amount - healedAmount
    if (overheal > 0) {
      this.addShield(overheal)
    }
  }

  onWaveStart() {
    this.buffManager.resetRoundQuizBuffs()
    this.syncRoundHealthMultiplier()
    this.syncRoundShieldMultiplier()

    const baseShieldPerWave = this.buffManager.getBaseShieldPerWave()
    if (baseShieldPerWave > 0) {
      this.addShield(baseShieldPerWave)
    }

    this.redrawShieldOverlay()
  }

  setBaseShieldPerWave(amount: number) {
    this.buffManager.addBaseShieldPerWave(amount)
  }

  addShieldRechargeOnHealthHitPercent(percent: number) {
    this.buffManager.addShieldRechargeOnHealthHitPercent(percent)
  }

  addBounceChancePercent(percent: number) {
    this.buffManager.addBounceChancePercent(percent)
  }

  addBurstSize(amount: number) {
    this.buffManager.addBurstSize(amount)
  }

  setBurningProjectiles(damagePerSecond: number, durationSeconds: number) {
    this.buffManager.setBurningProjectiles(damagePerSecond, durationSeconds)
  }

  addFlatMaxHealth(amount: number) {
    const scaledAmount = amount * this.maxHealthGainMultiplier

    if (scaledAmount > 0) {
      this.increaseMaxHealth(scaledAmount, true)
      return
    }

    if (scaledAmount < 0) {
      this.decreaseMaxHealth(Math.abs(scaledAmount), true)
    }
  }

  addFlatMaxShield(amount: number) {
    const scaledAmount = amount * this.maxShieldGainMultiplier
    if (scaledAmount <= 0) {
      return
    }

    this.maxShield += scaledAmount
    this.redrawShieldOverlay()
  }

  addPercentMaxHealth(percent: number) {
    if (percent <= 0) {
      return
    }

    this.increaseMaxHealth(this.getMaxHealthValue() * percent * this.maxHealthGainMultiplier, true)
  }

  addHealthOnKill(amount: number) {
    this.buffManager.addHealthOnKill(amount)
  }

  addShieldOnKill(amount: number) {
    this.buffManager.addShieldOnKill(amount)
  }

  addDamageOnKill(amount: number) {
    this.buffManager.addDamageOnKill(amount)
  }

  addAdditionalKillCredits(amount: number) {
    this.buffManager.addAdditionalKillCredits(amount)
  }

  getActiveConsumableEffects() {
    return this.buffManager.getActiveConsumableEffects()
  }

  addPermanentAttackSpeedMultiplier(multiplier: number) {
    this.buffManager.addPermanentAttackSpeedMultiplier(multiplier)
  }

  addTemporaryAttackSpeedMultiplier(
    multiplier: number,
    durationSeconds: number,
    effectName = 'Attack Speed Boost',
    effectId = 'attack-speed-boost',
  ) {
    this.buffManager.addTemporaryAttackSpeedMultiplier(multiplier, durationSeconds, effectName, effectId)
  }

  setGlobalAttackIntervalMultiplier(multiplier: number) {
    this.globalAttackIntervalMultiplier = Math.max(1, multiplier)
  }

  addPermanentAttackDamage(amount: number) {
    this.buffManager.addPermanentAttackDamage(amount)
  }

  addQuizFireRateStack(durationSeconds: number) {
    this.buffManager.addQuizFireRateStack(durationSeconds)
  }

  applyRoundQuizBuff(buffType: RoundQuizBuffType) {
    this.buffManager.applyRoundQuizBuff(buffType)
    this.syncRoundHealthMultiplier()
    this.syncRoundShieldMultiplier()
  }

  addHealthShieldDamageReductionStack() {
    this.buffManager.addHealthShieldDamageReductionStack()
  }

  healHealthAndShieldPercent(percent: number) {
    if (this.isDead() || percent <= 0) {
      return
    }

    this.heal(this.getMaxHealthValue() * percent * this.maxHealthGainMultiplier)
    this.restoreShield(this.maxShield * percent * this.maxShieldGainMultiplier)
  }

  healHealthPercent(percent: number) {
    if (this.isDead() || percent <= 0) {
      return
    }

    this.heal(this.getMaxHealthValue() * percent * this.maxHealthGainMultiplier)
  }

  healShieldPercent(percent: number) {
    if (this.isDead() || percent <= 0) {
      return
    }

    this.restoreShield(this.maxShield * percent * this.maxShieldGainMultiplier)
  }

  restoreFlatHealth(amount: number) {
    if (this.isDead() || amount <= 0) {
      return
    }

    this.setHealth(Math.min(this.getMaxHealthValue(), this.getCurrentHealth() + amount))
  }

  restoreFlatShield(amount: number) {
    if (this.isDead() || amount <= 0) {
      return
    }

    this.restoreShield(amount)
  }

  applyDirectHealthDamage(amount: number) {
    if (amount <= 0 || this.isDead()) {
      return
    }

    const remainingHealth = this.getCurrentHealth()
    if (amount >= remainingHealth && this.lives > 0) {
      this.lives -= 1
      this.applyLifeLossArtifactConsequences()
      this.setHealth(this.getMaxHealthValue())
      this.shield = this.maxShield
      this.redrawShieldOverlay()
      this.lifeLostListener?.(this.lives)
      return
    }

    this.damageRaw(amount)
    this.tryConsumeHealthJuice()
  }

  getAttackDamage() {
    return this.buffManager.getAttackDamage(this.baseAttackDamage) * this.attackDamageMultiplier
  }

  getAttackInterval() {
    return (
      this.buffManager.getAttackInterval(this.baseAttackInterval) *
      this.globalAttackIntervalMultiplier /
      this.fireRateMultiplier
    )
  }

  getFireRatePerSecond() {
    return 1 / this.getAttackInterval()
  }

  getCurrentShield() {
    return this.shield
  }

  drainShield(amount: number) {
    if (amount <= 0 || this.shield <= 0) {
      return
    }

    const shieldDrainAfterResistance = amount * this.buffManager.getRoundShieldDamageReductionMultiplier()
    if (shieldDrainAfterResistance <= 0) {
      return
    }

    this.shield = Math.max(0, this.shield - shieldDrainAfterResistance)
    this.tryResolveShieldBreakGoldReset()
    this.redrawShieldOverlay()
    this.tryConsumeShieldJuice()
  }

  applyDirectShieldDamage(amount: number) {
    if (amount <= 0 || this.shield <= 0) {
      return
    }

    this.shield = Math.max(0, this.shield - amount)
    this.tryResolveShieldBreakGoldReset()
    this.redrawShieldOverlay()
    this.tryConsumeShieldJuice()
  }

  getMaxShield() {
    return this.maxShield
  }

  getGold() {
    return this.gold
  }

  getLives() {
    return this.lives
  }

  getSkips() {
    return this.skips
  }

  getQuestionAnswerHealingMultiplier() {
    return this.questionAnswerHealingMultiplier
  }

  multiplyQuestionAnswerHealingMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.questionAnswerHealingMultiplier = Math.max(0.01, this.questionAnswerHealingMultiplier * multiplier)
  }

  isSkipToLifeConversionEnabled() {
    return this.skipToLifeConversionEnabled
  }

  enableSkipToLifeConversion() {
    if (this.skipToLifeConversionEnabled) {
      return
    }

    this.skipToLifeConversionEnabled = true

    const skipsToConvert = Math.max(0, Math.floor(this.skips))
    this.skips = 0
    this.adjustLives(skipsToConvert, false)
  }

  sacrificeAllLivesForVitality() {
    const sacrificedLives = Math.max(0, Math.floor(this.lives))
    if (sacrificedLives <= 0) {
      return 1
    }

    this.lives = 0
    const vitalityMultiplier = 1 + sacrificedLives
    this.applyPermanentVitalityMultiplier(vitalityMultiplier)
    return vitalityMultiplier
  }

  addLife(amount = 1) {
    this.addLifeWithSkip(amount)
  }

  addLifeWithSkip(amount = 1) {
    if (amount <= 0) {
      return
    }

    this.adjustLives(amount, !this.skipToLifeConversionEnabled)
  }

  addLifeWithoutSkips(amount = 1) {
    if (amount <= 0) {
      return
    }

    this.adjustLives(amount, false)
  }

  addSkip(amount = 1) {
    if (amount <= 0) {
      return
    }

    const skipGain = Math.floor(amount)
    if (skipGain <= 0) {
      return
    }

    if (this.skipToLifeConversionEnabled) {
      this.adjustLives(skipGain, false)
      return
    }

    this.skips += skipGain
  }

  spendSkip(amount = 1) {
    if (amount <= 0) {
      return true
    }

    const cost = Math.floor(amount)
    if (cost <= 0) {
      return true
    }

    if (this.skips < cost) {
      return false
    }

    this.skips -= cost
    return true
  }

  addGold(amount: number, options?: { artifactMultiplierApplied?: boolean }) {
    if (amount <= 0) {
      return
    }

    const shouldApplyArtifactMultiplier = options?.artifactMultiplierApplied !== true
    const artifactMultiplier = shouldApplyArtifactMultiplier ? this.getGlobalGoldMultiplierForAnyGain() : 1
    const creditedGold = amount * artifactMultiplier * this.runGoldMultiplier
    if (creditedGold <= 0) {
      return
    }

    this.gold += creditedGold
    this.trySpawnFromGoldThreshold()

    if (this.shieldHealPercentPerGoldGain > 0) {
      this.healShieldPercent(creditedGold * this.shieldHealPercentPerGoldGain)
    }

    if (this.healthHealPercentPerGoldGain > 0) {
      this.healHealthPercent(creditedGold * this.healthHealPercentPerGoldGain)
    }
  }

  setGoldPerKill(amount: number) {
    this.goldPerKill = Math.max(0, amount)
  }

  setRunGoldMultiplier(multiplier: number) {
    this.runGoldMultiplier = Math.max(0, multiplier)
  }

  multiplyRunGoldMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.runGoldMultiplier = Math.max(0, this.runGoldMultiplier * multiplier)
  }

  setKillGoldMultiplier(multiplier: number) {
    this.killGoldMultiplier = Math.max(0, multiplier)
  }

  setMaxHealthGainMultiplier(multiplier: number) {
    this.maxHealthGainMultiplier = Math.max(0, multiplier)
  }

  multiplyMaxHealthGainMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.maxHealthGainMultiplier = Math.max(0, this.maxHealthGainMultiplier * multiplier)
  }

  setMaxShieldGainMultiplier(multiplier: number) {
    this.maxShieldGainMultiplier = Math.max(0, multiplier)
  }

  multiplyMaxShieldGainMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.maxShieldGainMultiplier = Math.max(0, this.maxShieldGainMultiplier * multiplier)
  }

  setDamageLifestealRatio(ratio: number) {
    this.damageLifestealRatio = Math.max(0, ratio)
  }

  setFireRateMultiplier(multiplier: number) {
    this.fireRateMultiplier = Math.max(0.01, multiplier)
  }

  multiplyFireRateMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.fireRateMultiplier = Math.max(0.01, this.fireRateMultiplier * multiplier)
  }

  setAttackDamageMultiplier(multiplier: number) {
    this.attackDamageMultiplier = Math.max(0.01, multiplier)
  }

  multiplyAttackDamageMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.attackDamageMultiplier = Math.max(0.01, this.attackDamageMultiplier * multiplier)
  }

  setCanShoot(canShoot: boolean) {
    this.canShoot = canShoot
  }

  setRequireShieldExhaustionToShoot(enabled: boolean) {
    this.requireShieldExhaustionToShoot = enabled
  }

  setGoldLossPerShot(amount: number) {
    this.goldLossPerShot = Math.max(0, amount)
  }

  setGoldLossPerShotChance(chance: number) {
    this.goldLossPerShotChance = Math.max(0, Math.min(1, chance))
  }

  setGoldOnHitChance(chance: number, goldAmount: number) {
    this.goldOnHitChance = Math.max(0, Math.min(1, chance))
    this.goldOnHitAmount = Math.max(0, goldAmount)
  }

  addShieldHealPercentPerGoldGain(percentPerGoldGain: number) {
    this.shieldHealPercentPerGoldGain += Math.max(0, percentPerGoldGain)
  }

  addHealthHealPercentPerGoldGain(percentPerGoldGain: number) {
    this.healthHealPercentPerGoldGain += Math.max(0, percentPerGoldGain)
  }

  setDisableQuestionHealingFromArtifacts(disabled: boolean) {
    this.disableQuestionHealingFromArtifacts = disabled
  }

  isQuestionHealingDisabledByArtifacts() {
    return this.disableQuestionHealingFromArtifacts
  }

  setRawCodeBuffRewardMultiplier(multiplier: number) {
    this.rawCodeBuffRewardMultiplier = Math.max(1, multiplier)
  }

  getRawCodeBuffRewardMultiplier() {
    return this.rawCodeBuffRewardMultiplier
  }

  setRoundEndGoldPercentOfCurrentGold(percent: number) {
    this.roundEndGoldPercentOfCurrentGold = Math.max(0, percent)
  }

  getRoundEndGoldPercentOfCurrentGold() {
    return this.roundEndGoldPercentOfCurrentGold
  }

  setRoundEndGoldPerFleetMember(amount: number) {
    this.roundEndGoldPerFleetMember = Math.max(0, amount)
  }

  getRoundEndGoldPerFleetMember() {
    return this.roundEndGoldPerFleetMember
  }

  multiplyFleetDamageMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.fleetDamageMultiplier = Math.max(0.01, this.fleetDamageMultiplier * multiplier)
  }

  getFleetDamageMultiplier() {
    return this.fleetDamageMultiplier
  }

  multiplyFleetHealthMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.fleetHealthMultiplier = Math.max(0.01, this.fleetHealthMultiplier * multiplier)
  }

  getFleetHealthMultiplier() {
    return this.fleetHealthMultiplier
  }

  multiplyFleetRateOfFireMultiplier(multiplier: number) {
    if (multiplier <= 0) {
      return
    }

    this.fleetRateOfFireMultiplier = Math.max(0.01, this.fleetRateOfFireMultiplier * multiplier)
  }

  getFleetRateOfFireMultiplier() {
    return this.fleetRateOfFireMultiplier
  }

  addFleetPlayerHealHealthPerFiveSeconds(amount: number) {
    if (amount <= 0) {
      return
    }

    this.fleetPlayerHealHealthPerFiveSeconds += amount
  }

  getFleetPlayerHealHealthPerFiveSeconds() {
    return this.fleetPlayerHealHealthPerFiveSeconds
  }

  addFleetPlayerHealShieldPerFiveSeconds(amount: number) {
    if (amount <= 0) {
      return
    }

    this.fleetPlayerHealShieldPerFiveSeconds += amount
  }

  getFleetPlayerHealShieldPerFiveSeconds() {
    return this.fleetPlayerHealShieldPerFiveSeconds
  }

  setStreakGoldBonus(threshold: number, bonusGold: number) {
    this.streakGoldThreshold = Math.max(0, Math.floor(threshold))
    this.streakGoldBonus = Math.max(0, bonusGold)
  }

  setCorrectAnswerArtifactBonusMultiplier(multiplier: number) {
    this.correctAnswerArtifactBonusMultiplier = Math.max(1, multiplier)
  }

  getStreakGoldBonusForStreak(streak: number) {
    if (this.streakGoldThreshold <= 0 || this.streakGoldBonus <= 0) {
      return 0
    }

    const normalizedStreak = Math.max(0, Math.floor(streak))
    return normalizedStreak > 0 && normalizedStreak % this.streakGoldThreshold === 0
      ? this.streakGoldBonus * this.correctAnswerArtifactBonusMultiplier
      : 0
  }

  addBonusQuestionNukeStacks(stacks: number) {
    if (stacks <= 0) {
      return
    }

    this.bonusQuestionNukeStacks += Math.floor(stacks)
  }

  addBonusFreezeRayStacks(stacks: number) {
    if (stacks <= 0) {
      return
    }

    this.bonusFreezeRayStacks += Math.floor(stacks)
  }

  addDamagePerCorrectAnswer(amount: number) {
    this.damagePerCorrectAnswer += Math.max(0, amount)
  }

  setShotRandomizerEnabled(enabled: boolean) {
    this.shotRandomizerEnabled = enabled
  }

  addSplashDamageRatioOnHit(ratio: number) {
    this.splashDamageRatioOnHit += Math.max(0, ratio)
  }

  setReplaceQuestionBuffsWithGold(goldPerBuff: number) {
    this.replaceQuestionBuffsWithGold = true
    this.replacementGoldPerQuestionBuff = Math.max(0, goldPerBuff)
  }

  shouldReplaceQuestionBuffsWithGold() {
    return this.replaceQuestionBuffsWithGold
  }

  getReplacementGoldPerQuestionBuff() {
    return this.replacementGoldPerQuestionBuff
  }

  addQuestionTimeHealthDrainPerFiveSeconds(amount: number) {
    this.questionTimeHealthDrainPerFiveSeconds += Math.max(0, amount)
  }

  getQuestionTimeHealthDrainPerFiveSeconds() {
    return this.questionTimeHealthDrainPerFiveSeconds
  }

  setLoseAllGoldOnLifeLoss(enabled: boolean) {
    this.loseAllGoldOnLifeLoss = enabled
  }

  setLoseAllGoldOnWrongAnswer(enabled: boolean) {
    this.loseAllGoldOnWrongAnswer = enabled
  }

  setShieldBreakGoldResetEnabled(enabled: boolean) {
    this.shieldBreakGoldResetEnabled = enabled
  }

  setLoseLifeOnWrongAnswer(enabled: boolean) {
    this.loseLifeOnWrongAnswer = enabled
  }

  setRoundEndGoldPercentOfHealth(percent: number) {
    this.roundEndGoldPercentOfHealth = Math.max(0, percent)
  }

  getRoundEndGoldPercentOfHealth() {
    return this.roundEndGoldPercentOfHealth
  }

  setShieldMaxSpawnMiniFleet(enabled: boolean) {
    this.shieldMaxSpawnMiniFleet = enabled
  }

  setHealthMaxSpawnMiniFleet(enabled: boolean) {
    this.healthMaxSpawnMiniFleet = enabled
  }

  setShieldMaxSpawnBigBoss(enabled: boolean) {
    this.shieldMaxSpawnBigBoss = enabled
  }

  setKillSpawnMiniFleet(enabled: boolean) {
    this.killSpawnMiniFleet = enabled
  }

  setBossKillSpawnBigBoss(enabled: boolean) {
    this.bossKillSpawnBigBoss = enabled
  }

  setGoldThresholdMiniFleet(threshold: number) {
    this.goldThresholdMiniFleet = Math.max(0, threshold)
  }

  setGoldThresholdBigBoss(threshold: number) {
    this.goldThresholdBigBoss = Math.max(0, threshold)
  }

  setLowGoldShieldLiquidation(threshold: number, goldPerShield: number) {
    this.lowGoldShieldLiquidationThreshold = Math.max(0, threshold)
    this.lowGoldShieldToGoldRatio = Math.max(0, goldPerShield)
  }

  setRoundEndShieldSacrificeMiniFleet(shieldPerMiniFleet: number) {
    this.roundEndShieldSacrificeMiniFleetThreshold = Math.max(0, shieldPerMiniFleet)
  }

  consumeRoundEndShieldSacrificeMiniFleet(): { sacrificedShield: number; summonedMiniFleet: number } {
    if (this.roundEndShieldSacrificeMiniFleetThreshold <= 0 || this.shield <= 0) {
      return { sacrificedShield: 0, summonedMiniFleet: 0 }
    }

    const sacrificedShield = this.shield
    this.shield = 0
    this.redrawShieldOverlay()

    const summonedMiniFleet = Math.max(
      0,
      Math.floor(sacrificedShield / this.roundEndShieldSacrificeMiniFleetThreshold),
    )
    for (let index = 0; index < summonedMiniFleet; index += 1) {
      this.allySummonSpawner?.('mini')
    }

    return {
      sacrificedShield,
      summonedMiniFleet,
    }
  }

  setBloodToShieldExchange(healthLossPerSecond: number, shieldGainPerSecond: number) {
    this.bloodToShieldHealthLossPerSecond = Math.max(0, healthLossPerSecond)
    this.bloodToShieldShieldGainPerSecond = Math.max(0, shieldGainPerSecond)
  }

  setHealthLossPerShot(amount: number) {
    this.healthLossPerShot = Math.max(0, amount)
  }

  setRoundEndHealShieldsToFull(enabled: boolean) {
    this.roundEndHealShieldsToFull = enabled
  }

  getRoundEndHealShieldsToFull() {
    return this.roundEndHealShieldsToFull
  }

  setRoundEndHealHealthToFull(enabled: boolean) {
    this.roundEndHealHealthToFull = enabled
  }

  getRoundEndHealHealthToFull() {
    return this.roundEndHealHealthToFull
  }

  setRawCodingRunLimit(limit: number) {
    this.rawCodingRunLimit = Math.max(0, Math.floor(limit))
  }

  getRawCodingRunLimit() {
    return this.rawCodingRunLimit
  }

  setMinRawCodingQuestionFrequencyMultiplier(multiplier: number) {
    this.rawCodingQuestionFrequencyMultiplier = Math.max(
      1,
      Math.max(this.rawCodingQuestionFrequencyMultiplier, multiplier),
    )
  }

  getRawCodingQuestionFrequencyMultiplier() {
    return this.rawCodingQuestionFrequencyMultiplier
  }

  addRawCodingDamagePerCorrectAnswer(amount: number) {
    this.rawCodingDamagePerCorrectAnswer += Math.max(0, amount)
  }

  addRawCodingMaxShieldPerCorrectAnswer(amount: number) {
    this.rawCodingMaxShieldPerCorrectAnswer += Math.max(0, amount)
  }

  addRawCodingMaxHealthPerCorrectAnswer(amount: number) {
    this.rawCodingMaxHealthPerCorrectAnswer += Math.max(0, amount)
  }

  addRawCodingMiniFleetPerCorrectAnswer(amount: number) {
    this.rawCodingMiniFleetPerCorrectAnswer += Math.max(0, Math.floor(amount))
  }

  setShieldJuiceEnabled(enabled: boolean) {
    this.shieldJuiceEnabled = enabled
  }

  setHealthJuiceEnabled(enabled: boolean) {
    this.healthJuiceEnabled = enabled
  }

  applyIncorrectAnswerArtifactConsequences() {
    if (this.loseAllGoldOnWrongAnswer) {
      this.gold = 0
    }

    if (!this.loseLifeOnWrongAnswer) {
      return
    }

    if (this.lives > 0) {
      this.lives -= 1
      this.applyLifeLossArtifactConsequences()
      this.setHealth(this.getMaxHealthValue())
      this.shield = this.maxShield
      this.redrawShieldOverlay()
      this.lifeLostListener?.(this.lives)
      return
    }

    this.damageRaw(this.getCurrentHealth())
  }

  setLives(value: number) {
    this.lives = Math.max(0, Math.floor(value))
  }

  setSkips(value: number) {
    this.skips = Math.max(0, Math.floor(value))
  }

  addGoldGainMultiplier(percent: number) {
    this.buffManager.addGoldGainMultiplier(percent)
  }

  addQuizBonusHealthPercent(percent: number) {
    this.buffManager.addQuizBonusHealthPercent(percent)
  }

  addQuizFreezeDurationSeconds(seconds: number) {
    this.buffManager.addQuizFreezeDurationSeconds(seconds)
  }

  addFreezeBombSecondsPerCorrect(seconds: number) {
    this.buffManager.addFreezeBombSecondsPerCorrect(seconds)
  }

  addFireBombDamagePerSecond(amount: number) {
    this.buffManager.addFireBombDamagePerSecond(amount)
  }

  addDeflectionShieldChancePercent(percent: number) {
    this.buffManager.addDeflectionShieldChancePercent(percent)
  }

  multiplyRawCodingGoldMultiplier(multiplier: number) {
    this.buffManager.multiplyRawCodingGoldMultiplier(multiplier)
  }

  addMiniFleetAlliesPerCorrect(amount: number) {
    this.buffManager.addMiniFleetAlliesPerCorrect(amount)
  }

  addBigBossSummonChancePerCorrect(chance: number) {
    this.buffManager.addBigBossSummonChancePerCorrect(chance)
  }

  getRawCodingGoldMultiplier() {
    return this.buffManager.getRawCodingGoldMultiplier()
  }

  getFreezeBombSecondsPerCorrect() {
    return this.buffManager.getFreezeBombSecondsPerCorrect()
  }

  triggerCorrectAnswerArtifactEffects(questionKind?: string) {
    const correctAnswerBonusMultiplier = this.correctAnswerArtifactBonusMultiplier
    const questionNukeStacks = this.getQuestionNukeStackCount() * correctAnswerBonusMultiplier
    const freezeRayStacks = this.getFreezeRayStackCount() * correctAnswerBonusMultiplier

    if (questionNukeStacks > 0) {
      this.addQueuedQuestionNukes(questionNukeStacks)
    }

    if (freezeRayStacks > 0) {
      this.addQueuedFreezeRays(freezeRayStacks)
    }

    if (this.damagePerCorrectAnswer > 0) {
      this.addPermanentAttackDamage(this.damagePerCorrectAnswer * correctAnswerBonusMultiplier)
    }

    const miniFleetAllies = Math.max(
      0,
      Math.floor(this.buffManager.getMiniFleetAlliesPerCorrect() * correctAnswerBonusMultiplier),
    )
    for (let index = 0; index < miniFleetAllies; index += 1) {
      this.allySummonSpawner?.('mini')
    }

    const bossChance = this.buffManager.getBigBossSummonChancePerCorrect() * correctAnswerBonusMultiplier
    if (bossChance > 0) {
      const guaranteedBossSummons = Math.floor(bossChance)
      const overflowBossSummonChance = bossChance - guaranteedBossSummons
      const overflowBossSummons = overflowBossSummonChance > 0 && Math.random() < overflowBossSummonChance ? 1 : 0
      const totalBossSummonAttempts = guaranteedBossSummons + overflowBossSummons

      for (let index = 0; index < totalBossSummonAttempts; index += 1) {
        this.allySummonSpawner?.('boss')
      }
    }

    if (questionKind !== 'rawCoding') {
      return
    }

    if (this.rawCodingDamagePerCorrectAnswer > 0) {
      this.addPermanentAttackDamage(this.rawCodingDamagePerCorrectAnswer * correctAnswerBonusMultiplier)
    }

    if (this.rawCodingMaxShieldPerCorrectAnswer > 0) {
      this.addFlatMaxShield(this.rawCodingMaxShieldPerCorrectAnswer * correctAnswerBonusMultiplier)
    }

    if (this.rawCodingMaxHealthPerCorrectAnswer > 0) {
      this.addFlatMaxHealth(this.rawCodingMaxHealthPerCorrectAnswer * correctAnswerBonusMultiplier)
    }

    const rawCodingMiniFleetSummons = Math.max(
      0,
      Math.floor(this.rawCodingMiniFleetPerCorrectAnswer * correctAnswerBonusMultiplier),
    )
    for (let index = 0; index < rawCodingMiniFleetSummons; index += 1) {
      this.allySummonSpawner?.('mini')
    }
  }

  trySpawnShieldMaxAlly() {
    if (this.shield >= this.maxShield && this.maxShield > 0) {
      if (this.shieldMaxSpawnMiniFleet) {
        this.shield = Math.max(0, this.shield - 50)
        this.allySummonSpawner?.('mini')
      }
      if (this.shieldMaxSpawnBigBoss) {
        this.shield = 0
        this.allySummonSpawner?.('boss')
      }
    }
  }

  trySpawnHealthMaxAlly() {
    if (this.getHealth() >= this.getMaxHealthValue() && this.getMaxHealthValue() > 50) {
      if (this.healthMaxSpawnMiniFleet) {
        this.setHealth(Math.max(0, this.getHealth() - 50))
        this.allySummonSpawner?.('mini')
      }
    }
  }

  trySpawnOnKill(enemyIsNonBasic: boolean) {
    if (this.killSpawnMiniFleet) {
      this.allySummonSpawner?.('mini')
    }
    if (this.bossKillSpawnBigBoss && enemyIsNonBasic) {
      this.allySummonSpawner?.('boss')
    }
  }

  trySpawnFromGoldThreshold() {
    if (this.goldThresholdMiniFleet > 0 && this.gold >= this.goldThresholdMiniFleet) {
      const currentLevel = Math.floor(this.gold / this.goldThresholdMiniFleet)
      if (currentLevel > this.lastGoldThresholdMiniFleetLevel) {
        this.gold -= this.goldThresholdMiniFleet
        this.allySummonSpawner?.('mini')
        this.lastGoldThresholdMiniFleetLevel = Math.floor(this.gold / this.goldThresholdMiniFleet)
      }
    }

    if (this.goldThresholdBigBoss > 0 && this.gold >= this.goldThresholdBigBoss) {
      const currentLevel = Math.floor(this.gold / this.goldThresholdBigBoss)
      if (currentLevel > this.lastGoldThresholdBigBossLevel) {
        this.gold -= this.goldThresholdBigBoss
        this.allySummonSpawner?.('boss')
        this.lastGoldThresholdBigBossLevel = Math.floor(this.gold / this.goldThresholdBigBoss)
      }
    }
  }

  private tryLowGoldShieldLiquidation() {
    if (this.lowGoldShieldLiquidationThreshold <= 0 || this.lowGoldShieldToGoldRatio <= 0) {
      return
    }

    if (this.gold >= this.lowGoldShieldLiquidationThreshold || this.shield <= 0) {
      return
    }

    const convertedShield = this.shield
    this.shield = 0
    this.redrawShieldOverlay()
    this.addGold(convertedShield * this.lowGoldShieldToGoldRatio)
  }

  private tickBloodToShieldExchange(delta: number) {
    if (this.bloodToShieldHealthLossPerSecond <= 0 || this.bloodToShieldShieldGainPerSecond <= 0) {
      return
    }

    if (this.shield >= this.maxShield) {
      return
    }

    const currentHealth = this.getCurrentHealth()
    if (currentHealth <= 10) {
      return
    }

    const missingShield = Math.max(0, this.maxShield - this.shield)
    if (missingShield <= 0) {
      return
    }

    const maxHealthSpendAllowed = currentHealth - 10
    const desiredShieldGain = Math.min(missingShield, this.bloodToShieldShieldGainPerSecond * delta)
    const healthPerShield = this.bloodToShieldHealthLossPerSecond / this.bloodToShieldShieldGainPerSecond
    const requiredHealthSpend = desiredShieldGain * healthPerShield
    const healthSpend = Math.min(maxHealthSpendAllowed, requiredHealthSpend)

    if (healthSpend <= 0) {
      return
    }

    const shieldGain = healthSpend / healthPerShield
    this.applyDirectHealthDamage(healthSpend)
    this.restoreShield(shieldGain)
  }

  private addQueuedQuestionNukes(count: number) {
    if (count <= 0) {
      return
    }

    this.queuedQuestionNukes += Math.max(0, Math.floor(count))
    this.redrawNukeQueueOverlay()
  }

  private getQuestionNukeStackCount() {
    const artifactStacks = this.artifacts.reduce((count, artifact) => {
      return artifact.id === 'fire-bomb' ? count + 1 : count
    }, 0)

    return artifactStacks + this.bonusQuestionNukeStacks
  }

  private getFreezeRayStackCount() {
    const artifactStacks = this.artifacts.reduce((count, artifact) => {
      return artifact.id === 'freeze-bomb' ? count + 1 : count
    }, 0)

    return artifactStacks + this.bonusFreezeRayStacks
  }

  private addQueuedFreezeRays(count: number) {
    if (count <= 0) {
      return
    }

    this.queuedFreezeRays += Math.max(0, Math.floor(count))
    this.redrawFreezeQueueOverlay()
  }

  private getCurrentTargetForQuestionNuke() {
    if (this.lockedTarget && !this.lockedTarget.isDead()) {
      return this.lockedTarget
    }

    const target = this.getRandomLiveAttackTarget()
    if (!target) {
      this.lockedTarget = null
      return null
    }

    this.lockedTarget = target
    return this.lockedTarget
  }

  private tickQueuedArtifactShots(delta: number) {
    if (this.queuedQuestionNukes > 0) {
      this.questionNukeFireTimerSeconds += Math.max(0, delta)

      while (
        this.queuedQuestionNukes > 0 &&
        this.questionNukeFireTimerSeconds >= Player.QUESTION_NUKE_FIRE_INTERVAL_SECONDS
      ) {
        const target = this.getCurrentTargetForQuestionNuke()
        if (!target || !this.effectSpawner) {
          this.questionNukeFireTimerSeconds = Player.QUESTION_NUKE_FIRE_INTERVAL_SECONDS
          return
        }

        this.questionNukeFireTimerSeconds -= Player.QUESTION_NUKE_FIRE_INTERVAL_SECONDS
        this.queuedQuestionNukes = Math.max(0, this.queuedQuestionNukes - 1)
        this.redrawNukeQueueOverlay()
        this.launchQuestionNuke(target)
      }
    } else {
      this.questionNukeFireTimerSeconds = 0
    }

    if (this.queuedQuestionNukes > 0) {
      this.freezeRayFireTimerSeconds = 0
      return
    }

    if (this.queuedFreezeRays <= 0) {
      this.freezeRayFireTimerSeconds = 0
      return
    }

    this.freezeRayFireTimerSeconds += Math.max(0, delta)

    while (
      this.queuedQuestionNukes === 0 &&
      this.queuedFreezeRays > 0 &&
      this.freezeRayFireTimerSeconds >= Player.FREEZE_RAY_INTERVAL_SECONDS
    ) {
      const target = this.getRandomUnfrozenTargetForFreezeRay()
      this.freezeRayFireTimerSeconds -= Player.FREEZE_RAY_INTERVAL_SECONDS
      if (!target || !this.effectSpawner) {
        return
      }

      this.queuedFreezeRays = Math.max(0, this.queuedFreezeRays - 1)
      this.redrawFreezeQueueOverlay()
      this.fireFreezeRayAtTarget(target)
    }
  }

  private getRandomUnfrozenTargetForFreezeRay() {
    let target: Actor | null = null
    let eligibleTargetCount = 0
    for (const candidate of this.attackTargets) {
      if (candidate.isDead() || candidate.getFrozenRemainingSeconds() > 0) {
        continue
      }

      eligibleTargetCount += 1
      if (Math.random() * eligibleTargetCount < 1) {
        target = candidate
      }
    }

    return target
  }

  private fireFreezeRayAtTarget(target: Actor) {
    if (!this.effectSpawner || target.isDead()) {
      return
    }

    target.addFreezeEffect(Player.FREEZE_RAY_DURATION_SECONDS, 0.95)

    this.effectSpawner(
      new LightningBolt({
        start: [this.group.position.x, this.group.position.y + 0.35, this.group.position.z],
        end: [target.group.position.x, target.group.position.y + 0.32, target.group.position.z],
        color: '#dbeafe',
        accent: '#38bdf8',
        lifetime: 0.22,
      }),
    )

    this.effectSpawner(
      new Particle({
        origin: [target.group.position.x, target.group.position.y + 0.35, target.group.position.z],
        primary: 'rgba(219, 234, 254, 0.92)',
        accent: 'rgba(56, 189, 248, 0.86)',
        count: 68,
        lifetime: 1.1,
      }),
    )
  }

  private launchQuestionNuke(target: Actor) {
    if (!this.effectSpawner || target.isDead()) {
      return
    }

    this.effectSpawner(
      new QuestionNuke({
        source: this,
        target,
        damageAmount: Player.QUESTION_NUKE_DAMAGE,
        spawnEffect: this.effectSpawner,
        onKillTarget: (killedTarget) => {
          this.onEnemyKilled(killedTarget)
        },
      }),
    )
  }

  spendGold(amount: number) {
    if (amount <= 0) {
      return true
    }

    if (this.gold < amount) {
      return false
    }

    this.gold -= amount
    return true
  }

  getArtifactStats(): PlayerArtifactStats {
    return this.buffManager.getArtifactStats()
  }

  getArtifactIds() {
    return this.artifacts.map((artifact) => artifact.id)
  }

  getGlobalGoldMultiplierForAnyGain(): number {
    return this.artifacts.reduce((multiplier, artifact) => {
      return multiplier * artifact.getGoldMultiplierForAnyGain()
    }, 1)
  }

  getGlobalGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return this.artifacts.reduce((multiplier, artifact) => {
      return multiplier * artifact.getGoldMultiplierForQuestionAnswer(questionKind)
    }, 1)
  }

  getGlobalGoldMultiplierForEnemyKill(): number {
    return this.artifacts.reduce((multiplier, artifact) => {
      return multiplier * artifact.getGoldMultiplierForEnemyKill()
    }, 1)
  }

  getGoldArtifactEffectsForQuestionAnswer(questionKind?: string): Array<{
    artifactId: string
    artifactName: string
    multiplier: number
  }> {
    return this.artifacts
      .map((artifact) => ({
        artifactId: artifact.id,
        artifactName: artifact.name,
        multiplier: artifact.getGoldMultiplierForQuestionAnswer(questionKind),
      }))
      .filter((effect) => effect.multiplier > 1)
  }

  getGoldMultiplierContributors(questionKind?: string): Array<{
    artifactId: string
    artifactName: string
    kind: 'question' | 'enemyKill' | 'both'
    questionMultiplier: number
    enemyKillMultiplier: number
    stacks: number
  }> {
    const aggregatedByArtifactId = new Map<string, {
      artifactId: string
      artifactName: string
      questionMultiplier: number
      enemyKillMultiplier: number
      stacks: number
    }>()

    for (const artifact of this.artifacts) {
      const questionMultiplier = artifact.getGoldMultiplierForQuestionAnswer(questionKind)
      const enemyKillMultiplier = artifact.getGoldMultiplierForEnemyKill()
      const contributesQuestion = questionMultiplier > 1
      const contributesEnemyKill = enemyKillMultiplier > 1
      if (!contributesQuestion && !contributesEnemyKill) {
        continue
      }

      const existingEntry = aggregatedByArtifactId.get(artifact.id)
      if (!existingEntry) {
        aggregatedByArtifactId.set(artifact.id, {
          artifactId: artifact.id,
          artifactName: artifact.name,
          questionMultiplier,
          enemyKillMultiplier,
          stacks: 1,
        })
        continue
      }

      existingEntry.questionMultiplier *= questionMultiplier
      existingEntry.enemyKillMultiplier *= enemyKillMultiplier
      existingEntry.stacks += 1
    }

    return Array.from(aggregatedByArtifactId.values())
      .map((entry) => {
        const contributesQuestion = entry.questionMultiplier > 1
        const contributesEnemyKill = entry.enemyKillMultiplier > 1
        const kind: 'question' | 'enemyKill' | 'both' =
          contributesQuestion && contributesEnemyKill
            ? 'both'
            : contributesQuestion
              ? 'question'
              : 'enemyKill'

        return {
          ...entry,
          kind,
        }
      })
      .sort((left, right) => left.artifactName.localeCompare(right.artifactName))
  }

  getStateSnapshot(): PlayerStateSnapshot {
    return {
      currentHealth: this.getCurrentHealth(),
      maxHealth: this.getMaxHealthValue(),
      currentShield: this.getCurrentShield(),
      maxShield: this.getMaxShield(),
      lives: this.getLives(),
      skips: this.getSkips(),
      gold: this.getGold(),
      enemyKills: this.getEnemyKillCount(),
      quizScoreBonus: this.getQuizScoreBonus(),
      quizCurrentStreak: 0,
      fireRatePerSecond: this.getFireRatePerSecond(),
      projectileDamage: this.getAttackDamage(),
      activeConsumables: this.getActiveConsumableEffects(),
      roundBuffStacks: this.buffManager.getRoundBuffStacks(),
      artifactStats: this.getArtifactStats(),
      artifactIds: this.getArtifactIds(),
      targetEnemyId: this.getLockedTargetSaveId(),
      queuedQuestionNukes: this.getQueuedQuestionNukesCount(),
      queuedFreezeRays: this.getQueuedFreezeRaysCount(),
      questionAnswerHealingMultiplier: this.questionAnswerHealingMultiplier,
      questionAnswerGoldMultiplier: this.getGlobalGoldMultiplierForQuestionAnswer(),
      enemyKillGoldMultiplier: this.getGlobalGoldMultiplierForEnemyKill(),
      goldMultiplierContributors: this.getGoldMultiplierContributors(),
      maxHealthGainMultiplier: this.maxHealthGainMultiplier,
      maxShieldGainMultiplier: this.maxShieldGainMultiplier,
      skipToLifeConversionEnabled: this.skipToLifeConversionEnabled,
    }
  }

  applySavedState(snapshot: PlayerStateSnapshot) {
    const artifactIds = Array.isArray(snapshot.artifactIds)
      ? snapshot.artifactIds.filter((id) => typeof id === 'string')
      : []

    this.artifacts.length = 0
    for (const artifactId of artifactIds) {
      const artifactFactory = ARTIFACT_FACTORIES[artifactId]
      if (!artifactFactory) {
        continue
      }

      this.applyArtifact(artifactFactory())
    }

    const questionNukeStackCount = artifactIds.reduce((count, artifactId) => {
      return artifactId === 'fire-bomb' ? count + 1 : count
    }, 0)
    const freezeRayStackCount = artifactIds.reduce((count, artifactId) => {
      return artifactId === 'freeze-bomb' ? count + 1 : count
    }, 0)

    this.buffManager.setArtifactStats({
      ...snapshot.artifactStats,
      freezeBombSecondsPerCorrect: freezeRayStackCount,
      fireBombDamagePerSecond: questionNukeStackCount,
    })

    const targetMaxHealth = Math.max(1, snapshot.maxHealth)
    const currentMaxHealth = this.getMaxHealthValue()
    if (targetMaxHealth > currentMaxHealth) {
      this.increaseMaxHealth(targetMaxHealth - currentMaxHealth, false)
    } else if (targetMaxHealth < currentMaxHealth) {
      this.decreaseMaxHealth(currentMaxHealth - targetMaxHealth, false)
    }

    this.setHealth(Math.max(0, Math.min(snapshot.currentHealth, this.getMaxHealthValue())))

    this.maxShield = Math.max(0, snapshot.maxShield)
    this.shield = Math.max(0, Math.min(snapshot.currentShield, this.maxShield))
    this.lives = Math.max(0, Math.floor(snapshot.lives ?? Player.INITIAL_LIVES))
    this.skips = Math.max(0, Math.floor(snapshot.skips ?? Player.INITIAL_SKIPS))

    this.gold = Math.max(0, snapshot.gold)
    this.enemyKills = Math.max(0, Math.floor(snapshot.enemyKills ?? 0))
    this.quizScoreBonus = Math.max(0, Math.floor(snapshot.quizScoreBonus ?? 0))
    this.queuedQuestionNukes = Math.max(0, Math.floor(snapshot.queuedQuestionNukes ?? 0))
    this.queuedFreezeRays = Math.max(0, Math.floor(snapshot.queuedFreezeRays ?? 0))
    this.questionAnswerHealingMultiplier = Math.max(0.01, snapshot.questionAnswerHealingMultiplier ?? 1)
    this.maxHealthGainMultiplier = Math.max(0, snapshot.maxHealthGainMultiplier ?? 1)
    this.maxShieldGainMultiplier = Math.max(0, snapshot.maxShieldGainMultiplier ?? 1)
    this.skipToLifeConversionEnabled = snapshot.skipToLifeConversionEnabled === true
    this.questionNukeFireTimerSeconds = 0
    this.freezeRayFireTimerSeconds = 0
    this.buffManager.setRoundBuffStacks(snapshot.roundBuffStacks)
    this.syncRoundHealthMultiplier()
    this.syncRoundShieldMultiplier()
    this.redrawShieldOverlay()
    this.redrawNukeQueueOverlay()
    this.redrawFreezeQueueOverlay()
  }

  private getQueuedQuestionNukesCount() {
    return this.queuedQuestionNukes
  }

  private getQueuedFreezeRaysCount() {
    return this.queuedFreezeRays
  }

  private getLockedTargetSaveId(): string | null {
    const target = this.lockedTarget as SaveableTarget | null
    if (!target || typeof target.getSaveId !== 'function') {
      return null
    }

    return target.getSaveId()
  }

  getEnemyKillCount() {
    return this.enemyKills
  }

  recordEnemyKill(target?: Actor) {
    this.onEnemyKilled(target)
  }

  getQuizScoreBonus() {
    return this.quizScoreBonus
  }

  addQuizScoreBonus(points: number) {
    if (points <= 0) {
      return
    }

    this.quizScoreBonus += Math.max(0, Math.floor(points))
  }

  private applyLifeLossArtifactConsequences() {
    if (this.loseAllGoldOnLifeLoss) {
      this.gold = 0
    }
  }

  private tryResolveShieldBreakGoldReset() {
    if (!this.shieldBreakGoldResetEnabled) {
      this.shieldBreakGoldResetTriggered = false
      return
    }

    if (this.shield > 0) {
      this.shieldBreakGoldResetTriggered = false
      return
    }

    if (this.shieldBreakGoldResetTriggered) {
      return
    }

    if (this.gold < 20) {
      return
    }

    this.shieldBreakGoldResetTriggered = true
    this.gold = 0
    this.shield = this.maxShield
  }

  private redrawShieldOverlay() {
    const ratio = this.maxShield > 0 ? this.shield / this.maxShield : 0
    redrawShieldBar(this.shieldBarContext, ratio)
    this.shieldBarTexture.needsUpdate = true
    this.shieldBarSprite.material.opacity = this.maxShield > 0 ? 0.96 : 0
    this.shieldBarSprite.material.needsUpdate = true
  }

  private redrawNukeQueueOverlay() {
    redrawNukeQueueTexture(this.nukeQueueContext, 0)
    this.nukeQueueTexture.needsUpdate = true
    this.nukeQueueSprite.material.opacity = 0
    this.nukeQueueSprite.material.needsUpdate = true
  }

  private redrawFreezeQueueOverlay() {
    redrawFreezeQueueTexture(this.freezeQueueContext, 0)
    this.freezeQueueTexture.needsUpdate = true
    this.freezeQueueSprite.material.opacity = 0
    this.freezeQueueSprite.material.needsUpdate = true
  }

  private onEnemyKilled(target?: Actor) {
    this.enemyKills += 1
    let goldReward = 0
    let killGoldBreakdown: { base: number; killMultiplier: number; artifactMultiplier: number; runMultiplier: number } | undefined

    if (this.goldPerKill > 0) {
      const artifactMultiplier = this.getGlobalGoldMultiplierForEnemyKill()
      const preRunGoldReward = this.goldPerKill * this.killGoldMultiplier * artifactMultiplier
      goldReward = preRunGoldReward * this.runGoldMultiplier
      killGoldBreakdown = {
        base: this.goldPerKill,
        killMultiplier: this.killGoldMultiplier,
        artifactMultiplier,
        runMultiplier: this.runGoldMultiplier,
      }
      this.addGold(preRunGoldReward, { artifactMultiplierApplied: true })
    }

    if (target && goldReward > 0 && this.enemyKillGoldListener) {
      this.enemyKillGoldListener(
        [target.group.position.x, target.group.position.y, target.group.position.z],
        goldReward,
        killGoldBreakdown,
      )
    }

    const isNonBasicEnemy = target instanceof Enemy && target.getKind() !== 'grunt'
    this.trySpawnOnKill(isNonBasicEnemy ?? false)

    const effectiveKillCount = 1 + Math.max(0, Math.floor(this.buffManager.getAdditionalKillCredits()))
    for (let killIndex = 0; killIndex < effectiveKillCount; killIndex += 1) {
      const healthGrowthOnKillPercent = this.buffManager.getHealthOnKill()
      if (healthGrowthOnKillPercent > 0) {
        this.addPercentMaxHealth(healthGrowthOnKillPercent)
      }

      const shieldOnKill = this.buffManager.getShieldOnKill()
      if (shieldOnKill > 0) {
        this.healShieldPercent(shieldOnKill)
      }

      const damageOnKill = this.buffManager.getDamageOnKill()
      if (damageOnKill > 0) {
        this.addPermanentAttackDamage(damageOnKill)
      }
    }
  }

  private addShield(amount: number) {
    if (amount <= 0 || this.maxShield <= 0) {
      return
    }

    this.shield = Math.min(
      this.maxShield,
      this.shield + amount * this.buffManager.getRoundShieldMultiplier(),
    )
    this.redrawShieldOverlay()
    this.trySpawnShieldMaxAlly()
  }

  private restoreShield(amount: number) {
    if (amount <= 0 || this.maxShield <= 0) {
      return
    }

    this.shield = Math.min(this.maxShield, this.shield + amount)
    this.redrawShieldOverlay()
  }

  private adjustLives(amount: number, grantSkips: boolean) {
    const lifeGain = Math.floor(amount)
    if (lifeGain <= 0) {
      return
    }

    this.lives += lifeGain
    if (grantSkips) {
      this.skips += lifeGain
    }
  }

  private applyPermanentVitalityMultiplier(multiplier: number) {
    if (multiplier <= 1) {
      return
    }

    const currentHealth = this.getCurrentHealth()
    const currentShield = this.shield

    this.multiplyMaxHealthGainMultiplier(multiplier)
    this.multiplyMaxShieldGainMultiplier(multiplier)
    this.increaseMaxHealth(this.getMaxHealthValue() * (multiplier - 1), false)
    this.maxShield *= multiplier
    this.shield = Math.min(this.maxShield, currentShield * multiplier)
    this.setHealth(Math.min(this.getMaxHealthValue(), currentHealth * multiplier))
    this.redrawShieldOverlay()
  }

  private consumeArtifactById(artifactId: string) {
    const artifactIndex = this.artifacts.findIndex((artifact) => artifact.id === artifactId)
    if (artifactIndex < 0) {
      return
    }

    this.artifacts.splice(artifactIndex, 1)
  }

  private tryConsumeShieldJuice() {
    if (!this.shieldJuiceEnabled || this.maxShield <= 0) {
      return
    }

    if (this.shield > this.maxShield * 0.5) {
      return
    }

    this.shieldJuiceEnabled = false
    this.shield = this.maxShield
    this.redrawShieldOverlay()
    this.consumeArtifactById('shield-juice')
  }

  private tryConsumeHealthJuice() {
    if (!this.healthJuiceEnabled) {
      return
    }

    const maxHealth = this.getMaxHealthValue()
    if (maxHealth <= 0) {
      return
    }

    if (this.getCurrentHealth() > maxHealth * 0.5) {
      return
    }

    this.healthJuiceEnabled = false
    this.setHealth(maxHealth)
    this.consumeArtifactById('health-juice')
  }

  private syncRoundHealthMultiplier() {
    const nextMultiplier = this.buffManager.getRoundHealthMultiplier()
    const currentMultiplier = this.appliedRoundHealthMultiplier

    if (Math.abs(nextMultiplier - currentMultiplier) < 0.0001) {
      return
    }

    const currentMaxHealth = this.getMaxHealthValue()
    if (currentMaxHealth <= 0 || currentMultiplier <= 0) {
      this.appliedRoundHealthMultiplier = nextMultiplier
      return
    }

    const healthRatio = Math.max(0, Math.min(1, this.getCurrentHealth() / currentMaxHealth))
    const baseMaxHealth = currentMaxHealth / currentMultiplier
    const targetMaxHealth = Math.max(1, baseMaxHealth * nextMultiplier)
    const maxHealthDelta = targetMaxHealth - currentMaxHealth

    if (maxHealthDelta > 0) {
      this.increaseMaxHealth(maxHealthDelta, false)
    } else if (maxHealthDelta < 0) {
      this.decreaseMaxHealth(Math.abs(maxHealthDelta), false)
    }

    this.setHealth(this.getMaxHealthValue() * healthRatio)
    this.appliedRoundHealthMultiplier = nextMultiplier
  }

  private syncRoundShieldMultiplier() {
    const nextMultiplier = this.buffManager.getRoundShieldMultiplier()
    const currentMultiplier = this.appliedRoundShieldMultiplier

    if (Math.abs(nextMultiplier - currentMultiplier) < 0.0001 || currentMultiplier <= 0) {
      this.appliedRoundShieldMultiplier = nextMultiplier
      return
    }

    const shieldRatio = nextMultiplier / currentMultiplier
    this.shield *= shieldRatio
    this.maxShield *= shieldRatio
    this.appliedRoundShieldMultiplier = nextMultiplier
    this.redrawShieldOverlay()
  }

  private pickBounceTarget(currentTarget: Actor, hitChain: Actor[]) {
    const excluded = new Set(hitChain)
    excluded.add(currentTarget)

    const candidates = this.attackTargets.filter((target) => target.isAlive() && !excluded.has(target))
    if (candidates.length === 0) {
      return null
    }

    const origin = currentTarget.group.position
    candidates.sort((a, b) => origin.distanceToSquared(a.group.position) - origin.distanceToSquared(b.group.position))
    return candidates[0] ?? null
  }

  private tryDeflectShieldHit() {
    if (!this.attackSpawner) {
      return
    }

    const chancePercent = this.buffManager.getDeflectionShieldChancePercent()
    if (chancePercent <= 0 || Math.random() >= chancePercent / 100) {
      return
    }

    const liveTargets = this.collectLiveAttackTargets()
    if (liveTargets.length === 0) {
      return
    }

    const target = liveTargets[Math.floor(Math.random() * liveTargets.length)]
    this.fireProjectileAtTarget(target)
  }

  private fireProjectileAtTarget(target: Actor) {
    if (!this.attackSpawner || !this.canShoot) {
      return
    }

    if (this.requireShieldExhaustionToShoot && this.getCurrentShield() > 0) {
      return
    }

    // Can't shoot if out of gold and have riches-for-shots artifact
    if (this.gold === 0 && this.goldLossPerShot > 0 && this.goldLossPerShotChance > 0) {
      return
    }

    if (this.goldLossPerShot > 0 && Math.random() < this.goldLossPerShotChance) {
      this.gold = Math.max(0, this.gold - this.goldLossPerShot)
    }

    if (this.healthLossPerShot > 0) {
      this.applyDirectHealthDamage(this.healthLossPerShot)
    }

    const attackDamage = this.getAttackDamage()
    const projectileScale = this.getProjectileScaleForDamage(attackDamage)
    const projectileTrail = this.getProjectileTrailSettingsForDamage(attackDamage)

    for (const resolvedTarget of this.resolveShotTargets(target)) {
      this.attackSpawner(
        new Attack(this, resolvedTarget, {
          damageAmount: attackDamage,
          projectileScale,
          ...(projectileTrail
            ? {
                trailPrimary: projectileTrail.primary,
                trailAccent: projectileTrail.accent,
                trailParticleCount: projectileTrail.count,
                trailSpawnInterval: projectileTrail.spawnInterval,
                trailLifetime: projectileTrail.lifetime,
              }
            : {}),
          bouncesRemaining: this.getBounceCountForShot(),
          pickBounceTarget: (currentTarget, hitChain) => this.pickBounceTarget(currentTarget, hitChain),
          spawnBouncedAttack: this.attackSpawner,
          onHitTarget: (hitTarget, damageAmount) => {
            const burnDamagePerSecond = this.buffManager.getBurnDamagePerSecond()
            const burnDurationSeconds = this.buffManager.getBurnDurationSeconds()
            if (burnDamagePerSecond > 0 && burnDurationSeconds > 0) {
              hitTarget.addBurningEffect(burnDamagePerSecond, burnDurationSeconds, () => {
                this.onEnemyKilled(hitTarget)
              })
            }

            if (this.damageLifestealRatio > 0 && damageAmount > 0) {
              this.heal(damageAmount * this.damageLifestealRatio)
            }

            if (this.goldOnHitChance > 0 && this.goldOnHitAmount > 0 && Math.random() < this.goldOnHitChance) {
              this.addGold(this.goldOnHitAmount)
            }

            this.applySplashDamageOnHit(damageAmount)
          },
          onKillTarget: (killedTarget) => {
            this.onEnemyKilled(killedTarget)
          },
          projectilePalette: PLAYER_PROJECTILE_PALETTE,
          impactPrimary: 'rgba(74, 222, 128, 0.94)',
          impactAccent: 'rgba(16, 185, 129, 0.9)',
          spawnImpactEffect: this.effectSpawner ?? undefined,
        }),
      )
    }
  }

  private resolveShotTargets(preferredTarget: Actor) {
    if (!this.shotRandomizerEnabled) {
      return [preferredTarget]
    }

    const liveTargets = this.collectLiveAttackTargets()
    if (liveTargets.length === 0) {
      return []
    }

    return [0, 1].map(() => liveTargets[Math.floor(Math.random() * liveTargets.length)] ?? preferredTarget)
  }

  private applySplashDamageOnHit(damageAmount: number) {
    const splashDamageAmount = damageAmount * this.splashDamageRatioOnHit
    if (splashDamageAmount <= 0) {
      return
    }

    const liveTargets = [...this.collectLiveAttackTargets()]
    for (const splashTarget of liveTargets) {
      splashTarget.damage(splashDamageAmount, () => {
        this.onEnemyKilled(splashTarget)
      })
    }
  }

  private getProjectileScaleForDamage(damage: number) {
    const baseDamage = 20
    if (damage <= baseDamage) {
      return 1
    }

    const bonusDamage = damage - baseDamage
    const growth = Math.min(1.45, Math.sqrt(bonusDamage / baseDamage) * 0.65)
    return 1 + growth
  }

  private getProjectileTrailSettingsForDamage(damage: number): {
    primary: string
    accent: string
    count: number
    spawnInterval: number
    lifetime: number
  } | null {
    const trailStartDamage = 28
    if (damage <= trailStartDamage) {
      return null
    }

    const intensity = Math.min(1, (damage - trailStartDamage) / 120)
    return {
      primary: 'rgba(220, 252, 231, 0.92)',
      accent: 'rgba(16, 185, 129, 0.84)',
      count: 3 + Math.round(intensity * 5),
      spawnInterval: Math.max(0.045, 0.11 - intensity * 0.065),
      lifetime: 0.18 + intensity * 0.16,
    }
  }

  private getBounceCountForShot() {
    const bounceChancePercent = this.buffManager.getBounceChancePercent()
    if (bounceChancePercent <= 0) {
      return 0
    }

    const guaranteedBounces = Math.floor(bounceChancePercent / 100)
    const remainderChance = (bounceChancePercent % 100) / 100
    const bonusBounce = Math.random() < remainderChance ? 1 : 0
    return guaranteedBounces + bonusBounce
  }

  protected override onActorTick(delta: number, _elapsed: number) {
    this.buffManager.tick(delta)
    this.tickBloodToShieldExchange(delta)
    this.tryLowGoldShieldLiquidation()
    this.tryConsumeShieldJuice()
    this.tryConsumeHealthJuice()
    this.tickQueuedArtifactShots(delta)

    if (this.nukeQueueSprite.material.opacity > 0) {
      const pulse = 1 + Math.sin(_elapsed * 5.8) * 0.06
      this.nukeQueueSprite.scale.set(1.02 * pulse, 1.02 * pulse, 1)
    }

    if (this.freezeQueueSprite.material.opacity > 0) {
      const pulse = 1 + Math.sin(_elapsed * 5.1 + Math.PI * 0.5) * 0.06
      this.freezeQueueSprite.scale.set(1.02 * pulse, 1.02 * pulse, 1)
    }

    this.attackCooldown -= delta

    if (this.getFrozenRemainingSeconds() > 0) {
      return
    }

    if (this.attackCooldown > 0 || this.attackTargets.length === 0 || !this.attackSpawner || !this.canShoot) {
      return
    }

    const liveTargets = this.collectLiveAttackTargets()
    if (liveTargets.length === 0) {
      this.lockedTarget = null
      return
    }

    let lockedTargetIsAlive = false
    if (this.lockedTarget && !this.lockedTarget.isDead()) {
      for (let index = 0; index < liveTargets.length; index += 1) {
        if (liveTargets[index] === this.lockedTarget) {
          lockedTargetIsAlive = true
          break
        }
      }
    }

    if (!lockedTargetIsAlive) {
      this.lockedTarget = liveTargets[Math.floor(Math.random() * liveTargets.length)]
    }

    const target = this.lockedTarget
    if (!target) {
      return
    }

    const attackInterval = this.getAttackInterval()
    // Keep a little cadence variance without flattening high fire-rate multipliers.
    this.attackCooldown = attackInterval * (1 + Math.random() * 0.2)
    const burstSize = this.buffManager.getBurstSize()
    const guaranteedBursts = Math.max(1, Math.floor(burstSize))
    const burstChance = Math.max(0, burstSize - Math.floor(burstSize))
    const bursts = guaranteedBursts + (Math.random() < burstChance ? 1 : 0)

    for (let burstIndex = 0; burstIndex < bursts; burstIndex += 1) {
      const burstTarget =
        burstIndex === 0
          ? target
          : liveTargets[Math.floor(Math.random() * liveTargets.length)]

      this.fireProjectileAtTarget(burstTarget)
    }
  }

  private collectLiveAttackTargets() {
    this.liveAttackTargetsBuffer.length = 0
    for (const target of this.attackTargets) {
      if (!target.isDead()) {
        this.liveAttackTargetsBuffer.push(target)
      }
    }

    return this.liveAttackTargetsBuffer
  }

  private getRandomLiveAttackTarget() {
    const liveTargets = this.collectLiveAttackTargets()
    if (liveTargets.length === 0) {
      return null
    }

    return liveTargets[Math.floor(Math.random() * liveTargets.length)]
  }
}
