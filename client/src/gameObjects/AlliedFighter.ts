import { Attack } from './Attack'
import { Actor } from './Actor'
import type { GameObject } from '../GameObject'
import type { AttackPalette } from './AttackSpriteTexture'

type AttackSpawner = (attack: Attack) => void
type EffectSpawner = (effect: GameObject) => void

export type AllyType = 'mini' | 'boss'

export interface AllyFighterSaveState {
  id: string
  kind: AllyType
  position: [number, number, number]
  currentHealth: number
  maxHealth: number
  attackCooldown: number
}

export interface AlliedFighterOptions {
  saveId?: string
}

const MINI_PALETTE: AttackPalette = {
  core: 'rgba(191, 219, 254, 0.98)',
  edge: 'rgba(96, 165, 250, 0.9)',
  trail: 'rgba(59, 130, 246, 0.95)',
}

const BOSS_PALETTE: AttackPalette = {
  core: 'rgba(254, 249, 195, 0.98)',
  edge: 'rgba(250, 204, 21, 0.9)',
  trail: 'rgba(245, 158, 11, 0.95)',
}

export class AlliedFighter extends Actor {
  private static nextSaveId = 1
  private static readonly BASE_ATTACK_DAMAGE = {
    mini: 10,
    boss: 40,
  } as const
  private static readonly BASE_ATTACK_INTERVAL = {
    mini: 0.55,
    boss: 0.95,
  } as const
  private static readonly BASE_MAX_HEALTH = {
    mini: 60,
    boss: 280,
  } as const
  private readonly type: AllyType
  private readonly saveId: string
  private readonly homePosition: { x: number; y: number; z: number }
  private attackTargets: Actor[] = []
  private attackSpawner: AttackSpawner | null = null
  private effectSpawner: EffectSpawner | null = null
  private attackCooldown = 0
  private attackDamage: number
  private attackInterval: number

  private static advanceSaveIdCounter(saveId: string) {
    const numericId = Number.parseInt(saveId.replace(/^ally-/, ''), 10)
    if (Number.isFinite(numericId)) {
      AlliedFighter.nextSaveId = Math.max(AlliedFighter.nextSaveId, numericId + 1)
      return
    }

    AlliedFighter.nextSaveId += 1
  }

  constructor(type: AllyType, options: AlliedFighterOptions = {}) {
    const homePosition = { x: 0, y: -0.08, z: 1.9 }

    super(type === 'mini' ? 'MiniFleet Ally' : 'BigBoss Ally', {
      style: type === 'mini'
        ? {
            label: 'A',
            primary: 'rgba(147, 197, 253, 0.92)',
            secondary: 'rgba(59, 130, 246, 0.36)',
            accent: 'rgba(37, 99, 235, 0.9)',
            glow: 'rgba(219, 234, 254, 0.96)',
            trail: 'rgba(147, 197, 253, 0.82)',
          }
        : {
            // Reuse the player-ship texture path while keeping a distinct boss palette.
            label: 'P',
            primary: 'rgba(103, 232, 249, 0.92)',
            secondary: 'rgba(14, 116, 144, 0.42)',
            accent: 'rgba(56, 189, 248, 0.9)',
            glow: 'rgba(224, 242, 254, 0.98)',
            trail: 'rgba(186, 230, 253, 0.88)',
          },
      motion: {
        position: (elapsed) => [
          homePosition.x,
          homePosition.y + Math.sin(elapsed * 2.1 + (type === 'mini' ? 0 : Math.PI * 0.5)) * (type === 'mini' ? 0.03 : 0.04),
          homePosition.z,
        ],
        rotationZ: () => 0,
      },
      animation: {
        scale: type === 'mini' ? 0.7 : 2.6,
        healthbarScale: type === 'mini' ? 0.5 : 1,
        healthbarOffsetY: type === 'mini' ? 1.05 : 1.95,
        pulseAmount: 0.05,
        pulseSpeed: 1.6,
        spriteRotationSpeed: 0.2,
        opacityBase: 0.94,
        opacityVariation: 0.06,
      },
    })

    this.type = type
    this.homePosition = homePosition
    this.saveId = options.saveId ?? `ally-${AlliedFighter.nextSaveId}`
    AlliedFighter.advanceSaveIdCounter(this.saveId)
    this.attackDamage = AlliedFighter.BASE_ATTACK_DAMAGE[type]
    this.attackInterval = AlliedFighter.BASE_ATTACK_INTERVAL[type]

    const desiredMaxHealth = AlliedFighter.BASE_MAX_HEALTH[type]
    const currentMaxHealth = this.getMaxHealthValue()
    if (desiredMaxHealth > currentMaxHealth) {
      this.increaseMaxHealth(desiredMaxHealth - currentMaxHealth, false)
    } else if (desiredMaxHealth < currentMaxHealth) {
      this.decreaseMaxHealth(currentMaxHealth - desiredMaxHealth, false)
    }
    this.setHealth(desiredMaxHealth)
  }

  getSaveId() {
    return this.saveId
  }

  getAllyType() {
    return this.type
  }

  getSaveState(): AllyFighterSaveState {
    return {
      id: this.saveId,
      kind: this.type,
      position: [this.homePosition.x, this.homePosition.y, this.homePosition.z],
      currentHealth: this.getCurrentHealth(),
      maxHealth: this.getMaxHealthValue(),
      attackCooldown: this.attackCooldown,
    }
  }

  setHomePosition(x: number, y: number, z: number) {
    this.homePosition.x = x
    this.homePosition.y = y
    this.homePosition.z = z
    this.group.position.set(x, y, z)
  }

  setFormationPosition(x: number, y: number, z: number) {
    this.setHomePosition(x, y, z)
  }

  applySaveState(snapshot: AllyFighterSaveState) {
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

    this.setHealth(Math.max(0, Math.min(snapshot.currentHealth, this.getMaxHealthValue())))
    this.attackCooldown = Math.max(0, snapshot.attackCooldown)
  }

  applyFleetCombatBonuses(
    damageMultiplier: number,
    healthMultiplier: number,
    rateOfFireMultiplier: number,
  ) {
    const safeDamageMultiplier = Math.max(0.01, damageMultiplier)
    const safeHealthMultiplier = Math.max(0.01, healthMultiplier)
    const safeRateOfFireMultiplier = Math.max(0.01, rateOfFireMultiplier)

    this.attackDamage = AlliedFighter.BASE_ATTACK_DAMAGE[this.type] * safeDamageMultiplier
    this.attackInterval = AlliedFighter.BASE_ATTACK_INTERVAL[this.type] / safeRateOfFireMultiplier

    const desiredMaxHealth = Math.max(1, AlliedFighter.BASE_MAX_HEALTH[this.type] * safeHealthMultiplier)
    const currentMaxHealth = this.getMaxHealthValue()
    const healthRatio = currentMaxHealth > 0 ? this.getCurrentHealth() / currentMaxHealth : 1

    if (desiredMaxHealth > currentMaxHealth) {
      this.increaseMaxHealth(desiredMaxHealth - currentMaxHealth, false)
    } else if (desiredMaxHealth < currentMaxHealth) {
      this.decreaseMaxHealth(currentMaxHealth - desiredMaxHealth, false)
    }

    this.setHealth(Math.max(0, Math.min(this.getMaxHealthValue(), this.getMaxHealthValue() * healthRatio)))
  }

  override damage(amount: number, onKilled?: () => void) {
    // Allies intentionally use only the base global scaling path, not player buff reductions.
    const scaledAmount = Actor.applyIncomingDamageMultiplier(amount)
    return this.damageRaw(scaledAmount, onKilled)
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

  protected override onActorTick(delta: number, _elapsed: number) {
    this.attackCooldown -= delta

    if (this.getFrozenRemainingSeconds() > 0) {
      return
    }

    if (this.attackCooldown > 0 || !this.attackSpawner || this.attackTargets.length === 0) {
      return
    }

    const liveTargets = this.attackTargets.filter((target) => !target.isDead())
    if (liveTargets.length === 0) {
      return
    }

    const target = liveTargets[Math.floor(Math.random() * liveTargets.length)]
    this.attackCooldown = this.attackInterval * (1 + Math.random() * 0.25)

    this.attackSpawner(
      new Attack(this, target, {
        damageAmount: this.attackDamage,
        projectileScale: this.type === 'mini' ? 0.5 : 1,
        projectilePalette: this.type === 'mini' ? MINI_PALETTE : BOSS_PALETTE,
        impactPrimary: this.type === 'mini' ? 'rgba(147, 197, 253, 0.92)' : 'rgba(252, 211, 77, 0.92)',
        impactAccent: this.type === 'mini' ? 'rgba(37, 99, 235, 0.86)' : 'rgba(217, 119, 6, 0.86)',
        spawnImpactEffect: this.effectSpawner ?? undefined,
      }),
    )
  }
}
