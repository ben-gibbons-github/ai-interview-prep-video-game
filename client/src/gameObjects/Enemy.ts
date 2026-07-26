import { Attack } from './Attack'
import { Actor } from './Actor'
import { Particle } from './Particle'
import { LightningBolt } from './LightningBolt'
import { GameObject } from '../GameObject'
import type { EnemySaveState } from '../Player/GameSaving'
import type { AttackPalette } from './AttackSpriteTexture'

type FormationPosition = readonly [number, number, number]
type AttackSpawner = (attack: Attack) => void
type EffectSpawner = (effect: GameObject) => void
type SummonSpawner = (enemy: Enemy) => void

export type EnemyKind = 'grunt' | 'boss' | 'shield-drainer' | 'summoner' | 'bubbler'

export interface EnemyOptions {
  formationPosition?: FormationPosition
  attackInterval?: number
  projectileDamage?: number
  projectileSpeed?: number
  maxHealthMultiplier?: number
  enemyKind?: EnemyKind
  summonIntervalSeconds?: number
  maxSummons?: number
  saveId?: string
}

const GLOBAL_FIRE_RATE_MULTIPLIER = 1
const GLOBAL_ENEMY_DAMAGE_MULTIPLIER = 20
const PROJECTILE_SPEED_SCALE = 0.75
const SHIELD_DRAIN_MULTIPLIER = 0.65 / 4
const VAMPIRE_HEALTH_DAMAGE_MULTIPLIER = 1 / 5

function getEnemyStyle(kind: EnemyKind) {
  if (kind === 'boss') {
    return {
      label: 'K',
      primary: 'rgba(192, 132, 252, 0.96)',
      secondary: 'rgba(126, 34, 206, 0.52)',
      accent: 'rgba(251, 191, 36, 0.9)',
      glow: 'rgba(243, 232, 255, 0.98)',
      trail: 'rgba(233, 213, 255, 0.92)',
    }
  }

  if (kind === 'shield-drainer') {
    return {
      label: 'Q',
      primary: 'rgba(45, 212, 191, 0.96)',
      secondary: 'rgba(13, 148, 136, 0.48)',
      accent: 'rgba(20, 184, 166, 0.88)',
      glow: 'rgba(204, 251, 241, 0.98)',
      trail: 'rgba(153, 246, 228, 0.9)',
    }
  }

  if (kind === 'summoner') {
    return {
      label: 'Z',
      primary: 'rgba(250, 204, 21, 0.96)',
      secondary: 'rgba(234, 179, 8, 0.48)',
      accent: 'rgba(132, 204, 22, 0.9)',
      glow: 'rgba(254, 249, 195, 0.98)',
      trail: 'rgba(217, 249, 157, 0.9)',
    }
  }

  if (kind === 'bubbler') {
    return {
      label: 'B',
      primary: 'rgba(125, 211, 252, 0.96)',
      secondary: 'rgba(14, 116, 144, 0.5)',
      accent: 'rgba(56, 189, 248, 0.9)',
      glow: 'rgba(224, 242, 254, 0.98)',
      trail: 'rgba(186, 230, 253, 0.92)',
    }
  }

  return {
    label: 'X',
    primary: 'rgba(248, 113, 113, 0.96)',
    secondary: 'rgba(244, 63, 94, 0.48)',
    accent: 'rgba(251, 191, 36, 0.8)',
    glow: 'rgba(254, 242, 242, 0.98)',
    trail: 'rgba(254, 226, 226, 0.9)',
  }
}

function getEnemyProjectilePalette(kind: EnemyKind): AttackPalette {
  if (kind === 'boss') {
    return {
      core: 'rgba(255, 255, 255, 0.98)',
      edge: 'rgba(192, 132, 252, 0.9)',
      trail: 'rgba(139, 92, 246, 0.95)',
    }
  }

  if (kind === 'shield-drainer') {
    return {
      core: 'rgba(224, 242, 254, 0.98)',
      edge: 'rgba(45, 212, 191, 0.88)',
      trail: 'rgba(20, 184, 166, 0.94)',
    }
  }

  if (kind === 'summoner') {
    return {
      core: 'rgba(254, 252, 232, 0.98)',
      edge: 'rgba(250, 204, 21, 0.9)',
      trail: 'rgba(132, 204, 22, 0.94)',
    }
  }

  if (kind === 'bubbler') {
    return {
      core: 'rgba(224, 242, 254, 0.98)',
      edge: 'rgba(125, 211, 252, 0.9)',
      trail: 'rgba(56, 189, 248, 0.94)',
    }
  }

  return {
    core: 'rgba(255, 241, 242, 0.98)',
    edge: 'rgba(248, 113, 113, 0.9)',
    trail: 'rgba(244, 63, 94, 0.95)',
  }
}

export class Enemy extends Actor {
  private static nextSaveId = 1
  private readonly formationPosition: { x: number; y: number; z: number }
  private attackTargets: Actor[] = []
  private attackSpawner: AttackSpawner | null = null
  private effectSpawner: EffectSpawner | null = null
  private summonSpawner: SummonSpawner | null = null
  private attackCooldown = 0
  private summonCooldown = 0
  private summonsRemaining = 0
  private readonly kind: EnemyKind
  private readonly attackInterval: number
  private readonly projectileDamage: number
  private readonly projectileSpeed: number
  private readonly summonIntervalSeconds: number
  private readonly bubbleFreezeIntervalSeconds: number
  private readonly bubbleFreezeDurationSeconds: number
  private readonly saveId: string
  private burnStatusFxCooldown = 0
  private freezeStatusFxCooldown = 0

  private static advanceSaveIdCounter(saveId: string) {
    const numericId = Number.parseInt(saveId.replace(/^enemy-/, ''), 10)
    if (Number.isFinite(numericId)) {
      Enemy.nextSaveId = Math.max(Enemy.nextSaveId, numericId + 1)
      return
    }

    Enemy.nextSaveId += 1
  }

  constructor(options: EnemyOptions = {}) {
    const initialFormationPosition = options.formationPosition ?? [0, 0.16, -2.1]
    const formationPosition = {
      x: initialFormationPosition[0],
      y: initialFormationPosition[1],
      z: initialFormationPosition[2],
    }
    const kind = options.enemyKind ?? 'grunt'
    const style = getEnemyStyle(kind)

    super('MainEnemy', {
      style,
      motion: {
        position: () => [formationPosition.x, formationPosition.y, formationPosition.z],
        rotationZ: () => 0,
      },
      animation: {
        scale: kind === 'boss' ? 3.35 : 2.9,
        pulseAmount: 0.14,
        pulseSpeed: kind === 'boss' ? 2.1 : 2.8,
        spriteRotationSpeed: -0.55,
        opacityBase: kind === 'boss' ? 0.96 : 0.92,
        opacityVariation: 0.06,
      },
    })

    this.kind = kind
    this.formationPosition = formationPosition
    this.saveId = options.saveId ?? `enemy-${Enemy.nextSaveId}`
    Enemy.advanceSaveIdCounter(this.saveId)
    this.attackInterval =
      options.attackInterval ??
      ((kind === 'boss'
        ? 1.3
        : kind === 'shield-drainer'
          ? 1.7
          : kind === 'summoner'
            ? 2.15
            : kind === 'bubbler'
              ? 2.25
              : 1.9) /
        GLOBAL_FIRE_RATE_MULTIPLIER)
    this.projectileDamage =
      options.projectileDamage ??
      (kind === 'boss'
        ? 2.6
        : kind === 'shield-drainer'
          ? 1.35
          : kind === 'summoner'
            ? 1.05
            : kind === 'bubbler'
              ? 0.95
              : 0.8)
    this.projectileDamage *= GLOBAL_ENEMY_DAMAGE_MULTIPLIER
    this.projectileSpeed = (options.projectileSpeed ?? (kind === 'boss' ? 11.1 : 10.2)) * PROJECTILE_SPEED_SCALE
    this.summonIntervalSeconds = options.summonIntervalSeconds ?? 6.2
    this.bubbleFreezeIntervalSeconds = 12
    this.bubbleFreezeDurationSeconds = 10

    if (kind === 'boss') {
      this.increaseMaxHealth(this.getMaxHealthValue() * 4, true)
    } else if (kind === 'summoner') {
      this.increaseMaxHealth(this.getMaxHealthValue() * 0.7, true)
    } else if (kind === 'shield-drainer') {
      this.increaseMaxHealth(this.getMaxHealthValue() * 0.35, true)
    }

    if ((options.maxHealthMultiplier ?? 1) > 1) {
      this.increaseMaxHealth(this.getMaxHealthValue() * ((options.maxHealthMultiplier ?? 1) - 1), true)
    }

    if (kind === 'summoner') {
      this.summonsRemaining = 6; //options.maxSummons ?? 3
      this.summonCooldown = this.summonIntervalSeconds * (0.7 + Math.random() * 0.45)
    }

    if (kind === 'bubbler') {
      this.summonCooldown = this.bubbleFreezeIntervalSeconds * (0.75 + Math.random() * 0.5)
    }

  }

  getSaveId() {
    return this.saveId
  }

  setAttackTargets(targets: Actor[]) {
    this.attackTargets = targets
  }

  setAttackSpawner(spawner: AttackSpawner) {
    this.attackSpawner = spawner
  }

  setEffectSpawner(spawner: EffectSpawner) {
    this.effectSpawner = spawner
  }

  setFormationPosition(x: number, y: number, z: number) {
    this.formationPosition.x = x
    this.formationPosition.y = y
    this.formationPosition.z = z
    this.group.position.set(x, y, z)
  }

  setSummonSpawner(spawner: SummonSpawner) {
    this.summonSpawner = spawner
  }

  getKind() {
    return this.kind
  }

  getDamagePerShot() {
    return this.kind === 'shield-drainer'
      ? this.projectileDamage * VAMPIRE_HEALTH_DAMAGE_MULTIPLIER
      : this.projectileDamage
  }

  getSpecialEffectsSummary() {
    if (this.kind === 'shield-drainer') {
      return 'Drains target shield on hit and also deals health damage.'
    }

    if (this.kind === 'summoner') {
      return 'Periodically summons enemy reinforcements.'
    }

    if (this.kind === 'bubbler') {
      return 'Periodically freezes a player-side unit for a short duration.'
    }

    if (this.kind === 'boss') {
      return 'Final boss unit with high health and heavy projectile damage.'
    }

    return 'No special effect.'
  }

  getSaveState(): EnemySaveState {
    return {
      id: this.saveId,
      kind: this.kind,
      position: [this.group.position.x, this.group.position.y, this.group.position.z],
      currentHealth: this.getCurrentHealth(),
      maxHealth: this.getMaxHealthValue(),
      currentShield: 0,
      maxShield: 0,
      attackInterval: this.attackInterval,
      // Store constructor-scale values so reload does not multiply values repeatedly.
      projectileDamage: this.projectileDamage / GLOBAL_ENEMY_DAMAGE_MULTIPLIER,
      projectileSpeed: this.projectileSpeed / PROJECTILE_SPEED_SCALE,
      attackCooldown: this.attackCooldown,
      summonCooldown: this.summonCooldown,
      summonsRemaining: this.summonsRemaining,
      summonIntervalSeconds: this.summonIntervalSeconds,
      burningDamagePerSecond: this.getBurningDamagePerSecond(),
      burningRemainingSeconds: this.getBurningRemainingSeconds(),
      frozenRemainingSeconds: this.getFrozenRemainingSeconds(),
      frozenIntensity: this.getFrozenIntensity(),
    }
  }

  applySaveState(snapshot: EnemySaveState) {
    if (this.isDead()) {
      return
    }

    const nextMaxHealth = Math.max(1, snapshot.maxHealth)
    const currentMaxHealth = this.getMaxHealthValue()

    if (nextMaxHealth > currentMaxHealth) {
      this.increaseMaxHealth(nextMaxHealth - currentMaxHealth, false)
    } else if (nextMaxHealth < currentMaxHealth) {
      this.decreaseMaxHealth(currentMaxHealth - nextMaxHealth, false)
    }

    this.setHealth(Math.max(0, Math.min(snapshot.currentHealth, nextMaxHealth)))
    this.attackCooldown = Math.max(0, snapshot.attackCooldown)
    this.summonCooldown = Math.max(0, snapshot.summonCooldown)
    this.summonsRemaining = Math.max(0, Math.floor(snapshot.summonsRemaining))
    this.applySavedStatusEffects({
      burningDamagePerSecond: snapshot.burningDamagePerSecond,
      burningRemainingSeconds: snapshot.burningRemainingSeconds,
      frozenRemainingSeconds: snapshot.frozenRemainingSeconds,
      frozenIntensity: snapshot.frozenIntensity,
    })
  }

  private spawnSignatureEffect(primary: string, accent: string, count: number, lifetime: number) {
    this.effectSpawner?.(
      new Particle({
        origin: [this.group.position.x, this.group.position.y + 0.35, this.group.position.z],
        primary,
        accent,
        count,
        lifetime,
      }),
    )
  }

  protected override onActorTick(delta: number, _elapsed: number) {
    const burnRemaining = this.getBurningRemainingSeconds()
    const freezeRemaining = this.getFrozenRemainingSeconds()
    if (burnRemaining > 0 && this.effectSpawner) {
      this.burnStatusFxCooldown -= delta
      if (this.burnStatusFxCooldown <= 0) {
        this.burnStatusFxCooldown = 0.32 + Math.random() * 0.16
        this.effectSpawner(
          new Particle({
            origin: [
              this.group.position.x + (Math.random() - 0.5) * 0.35,
              this.group.position.y + 0.28 + Math.random() * 0.4,
              this.group.position.z + (Math.random() - 0.5) * 0.35,
            ],
            primary: 'rgba(251, 146, 60, 0.94)',
            accent: 'rgba(239, 68, 68, 0.88)',
            count: 2,
            lifetime: 0.22,
          }),
        )
      }
    } else {
      this.burnStatusFxCooldown = 0
    }

    if (freezeRemaining > 0 && this.effectSpawner) {
      this.freezeStatusFxCooldown -= delta
      if (this.freezeStatusFxCooldown <= 0) {
        this.freezeStatusFxCooldown = 0.38 + Math.random() * 0.2
        this.effectSpawner(
          new Particle({
            origin: [
              this.group.position.x + (Math.random() - 0.5) * 0.42,
              this.group.position.y + 0.26 + Math.random() * 0.32,
              this.group.position.z + (Math.random() - 0.5) * 0.42,
            ],
            primary: 'rgba(186, 230, 253, 0.95)',
            accent: 'rgba(56, 189, 248, 0.9)',
            count: 2,
            lifetime: 0.28,
          }),
        )
      }
    } else {
      this.freezeStatusFxCooldown = 0
    }

    const statusActionDelta = delta * this.getStatusActionMultiplier()
    this.attackCooldown -= statusActionDelta

    if (this.kind === 'summoner' && this.summonSpawner && this.summonsRemaining > 0) {
      this.summonCooldown -= statusActionDelta
      if (this.summonCooldown <= 0) {
        this.summonCooldown = this.summonIntervalSeconds * (0.9 + Math.random() * 0.45)
        this.summonsRemaining -= 1

        this.spawnSignatureEffect('rgba(253, 224, 71, 0.95)', 'rgba(132, 204, 22, 0.9)', 86, 1.2)

        const spawnOffsetX = (Math.random() - 0.5) * 2.2
        const spawnOffsetZ = 0.9 + Math.random() * 0.95
        const summonedEnemy = new Enemy({
          formationPosition: [
            this.group.position.x + spawnOffsetX,
            this.group.position.y,
            this.group.position.z + spawnOffsetZ,
          ],
          enemyKind: 'grunt',
          attackInterval: 1.55 / GLOBAL_FIRE_RATE_MULTIPLIER,
          projectileDamage: 0.095,
          projectileSpeed: 10.6 * 0.75,
        })

        this.summonSpawner(summonedEnemy)
      }
    }

    if (this.kind === 'bubbler') {
      this.summonCooldown -= statusActionDelta
      if (this.summonCooldown <= 0) {
        this.summonCooldown = this.bubbleFreezeIntervalSeconds * (0.85 + Math.random() * 0.5)

        const liveTargets = this.attackTargets.filter((target) => !target.isDead())
        if (liveTargets.length > 0) {
          const target = liveTargets[Math.floor(Math.random() * liveTargets.length)]
          target.addFreezeEffect(this.bubbleFreezeDurationSeconds, 0.95)

          this.effectSpawner?.(
            new Particle({
              origin: [this.group.position.x, this.group.position.y + 0.3, this.group.position.z],
              primary: 'rgba(224, 242, 254, 0.96)',
              accent: 'rgba(56, 189, 248, 0.9)',
              count: 22,
              lifetime: 0.5,
            }),
          )

          this.effectSpawner?.(
            new Particle({
              origin: [target.group.position.x, target.group.position.y + 0.35, target.group.position.z],
              primary: 'rgba(224, 242, 254, 0.98)',
              accent: 'rgba(125, 211, 252, 0.92)',
              count: 30,
              lifetime: 0.65,
            }),
          )

          this.spawnSignatureEffect('rgba(186, 230, 253, 0.95)', 'rgba(56, 189, 248, 0.9)', 58, 0.9)
        }
      }
    }

    if (freezeRemaining > 0) {
      return
    }

    if (this.attackCooldown > 0 || this.attackTargets.length === 0 || !this.attackSpawner) {
      return
    }

    let target: Actor | null = null
    let liveTargetCount = 0
    for (const candidate of this.attackTargets) {
      if (!candidate.isAlive()) {
        continue
      }

      liveTargetCount += 1
      if (Math.random() * liveTargetCount < 1) {
        target = candidate
      }
    }

    if (!target) {
      return
    }

    this.attackCooldown = this.attackInterval + Math.random() * 0.85

    if (this.kind === 'boss') {
      this.spawnSignatureEffect('rgba(216, 180, 254, 0.95)', 'rgba(168, 85, 247, 0.9)', 76, 0.9)
    }

    this.attackSpawner(
      new Attack(this, target, {
        damageAmount:
          this.kind === 'shield-drainer'
            ? this.projectileDamage * VAMPIRE_HEALTH_DAMAGE_MULTIPLIER
            : this.projectileDamage,
        speed: this.projectileSpeed,
        onHitTarget: (hitTarget) => {
          if (this.kind === 'shield-drainer') {
            const drainTarget = hitTarget as unknown as { drainShield?: (amount: number) => void }
            drainTarget.drainShield?.(Math.max(1, this.projectileDamage * SHIELD_DRAIN_MULTIPLIER))

            this.effectSpawner?.(
              new LightningBolt({
                start: [this.group.position.x, this.group.position.y + 0.3, this.group.position.z],
                end: [hitTarget.group.position.x, hitTarget.group.position.y + 0.35, hitTarget.group.position.z],
                color: '#bae6fd',
                accent: '#2dd4bf',
                lifetime: 0.16,
              }),
            )
          }
        },
        projectilePalette: getEnemyProjectilePalette(this.kind),
        impactPrimary: getEnemyStyle(this.kind).primary,
        impactAccent: getEnemyStyle(this.kind).accent,
        spawnImpactEffect: this.effectSpawner ?? undefined,
      }),
    )
  }
}