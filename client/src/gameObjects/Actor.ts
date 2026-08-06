import * as THREE from 'three'
import { GameObject } from '../GameObject'
import { ActorSpriteTexture } from './ActorSpriteTexture'
import { createHealthBar, type HealthBarHandle, type HealthBarStyle } from './HealthBar'
import { Particle } from './Particle'

export interface ActorStyle {
  label: string
  primary: string
  secondary: string
  accent: string
  glow: string
  trail: string
}

export interface ActorMotion {
  position: (elapsed: number) => THREE.Vector3Tuple
  rotationZ?: (elapsed: number) => number
}

export interface ActorAnimation {
  scale: number
  healthbarScale?: number
  healthbarOffsetY?: number
  pulseAmount: number
  pulseSpeed: number
  spriteRotationSpeed: number
  opacityBase: number
  opacityVariation: number
  blendMode?: THREE.Blending
}

export interface ActorOptions {
  style: ActorStyle
  motion: ActorMotion
  animation: ActorAnimation
}

function createFrozenStatusTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create frozen status texture context')
  }

  context.clearRect(0, 0, canvas.width, canvas.height)

  const outer = context.createRadialGradient(128, 128, 62, 128, 128, 118)
  outer.addColorStop(0, 'rgba(125, 211, 252, 0)')
  outer.addColorStop(0.74, 'rgba(125, 211, 252, 0.18)')
  outer.addColorStop(1, 'rgba(56, 189, 248, 0.54)')
  context.fillStyle = outer
  context.beginPath()
  context.arc(128, 128, 110, 0, Math.PI * 2)
  context.fill()

  context.strokeStyle = 'rgba(186, 230, 253, 0.86)'
  context.lineWidth = 6
  context.beginPath()
  context.arc(128, 128, 102, 0, Math.PI * 2)
  context.stroke()

  context.strokeStyle = 'rgba(219, 234, 254, 0.62)'
  context.lineWidth = 3
  context.beginPath()
  context.arc(100, 96, 24, Math.PI * 1.2, Math.PI * 2)
  context.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export abstract class Actor extends GameObject {
  private static readonly GLOBAL_BURN_DAMAGE_MULTIPLIER = 0.25
  private static incomingDamageMultiplier = 0.7
  private static readonly VISUAL_POSITION_MOVE_SPEED = 0.1
  private readonly sprite: THREE.Sprite
  private readonly hitFlashSprite: THREE.Sprite
  private readonly frozenBubbleSprite: THREE.Sprite
  private readonly healthbarStyle: HealthBarStyle
  private readonly healthbar: HealthBarHandle
  private readonly healthbarScale: number
  private readonly healthbarOffsetY: number
  private readonly style: ActorStyle
  private maxHealth = 100
  private health = 100
  private burningDamagePerSecond = 0
  private burningRemaining = 0
  private burningKillCallback: (() => void) | null = null
  private frozenRemaining = 0
  private frozenIntensity = 0
  private dead = false
  private deathElapsed = 0
  private deathEffectSpawner: ((effect: GameObject) => void) | null = null
  private deathEffectSpawned = false
  private readonly deathDuration = 0.68
  private hitFlashRemaining = 0
  private hitShakeRemaining = 0
  private hitImpactStrength = 0
  private readonly baseSpriteColor = new THREE.Color(1, 1, 1)
  private readonly burnStatusColor = new THREE.Color(1, 0.58, 0.2)
  private readonly freezeStatusColor = new THREE.Color(0.56, 0.86, 1)
  private readonly mixedStatusColor = new THREE.Color(1, 1, 1)
  private healthbarStatusMode: 'none' | 'burning' | 'frozen' = 'none'
  private readonly actualPosition = new THREE.Vector3()

  protected constructor(name: string, options: ActorOptions) {
    super(name)

    this.style = options.style

    this.healthbarStyle = {
      background: 'rgba(2, 6, 23, 0.78)',
      fillStart: options.style.primary,
      fillEnd: options.style.accent,
      outline: options.style.glow,
      glow: options.style.glow,
    }
    this.healthbarScale = Math.max(0.2, options.animation.healthbarScale ?? 1)
    this.healthbarOffsetY = options.animation.healthbarOffsetY ?? 1.95

    const texture = ActorSpriteTexture.create(options.style)
    this.sprite = this.addSprite(texture, {
      position: [0, 0, 0],
      scale: options.animation.scale,
      blending: options.animation.blendMode ?? THREE.NormalBlending,
      depthWrite: false,
      transparent: true,
      opacity: options.animation.opacityBase,
    })

    this.hitFlashSprite = this.addSprite(ActorSpriteTexture.createHitFlash(options.style), {
      position: [0, 0.12, 0.02],
      scale: options.animation.scale * 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    })

    this.frozenBubbleSprite = this.addSprite(createFrozenStatusTexture(), {
      position: [0, 0.12, -0.01],
      scale: options.animation.scale * 1.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    })

    this.healthbar = createHealthBar(this, this.healthbarStyle, {
      scaleMultiplier: this.healthbarScale,
      positionY: this.healthbarOffsetY,
    })
    this.redrawHealthbar()

    const initialPosition = options.motion.position(0)
    this.actualPosition.set(initialPosition[0], initialPosition[1], initialPosition[2])
    this.group.position.copy(this.actualPosition)

    this.update = (_delta, elapsed) => {
      if (this.dead) {
        this.deathElapsed += _delta
        const shock = Math.min(1, this.deathElapsed / this.deathDuration)
        const fade = Math.max(0, 1 - shock)
        const blast = 1 + shock * shock * 2.9

        this.group.scale.setScalar(blast)
        this.group.rotation.z += _delta * 1.2
        this.group.rotation.y = Math.sin(this.deathElapsed * 9) * 0.28
        this.sprite.material.opacity = fade * fade
        this.sprite.scale.setScalar(options.animation.scale * (1.1 + shock * 2.4))
        this.healthbar.sprite.material.opacity = fade * 0.85
        this.healthbar.sprite.scale.set(
          1.9 * this.healthbarScale * fade,
          0.42 * this.healthbarScale * fade,
          1,
        )
        this.healthbar.sprite.position.y = this.healthbarOffsetY + shock * 0.22

        if (this.deathElapsed >= this.deathDuration) {
          this.dispose()
        }

        return
      }

      const nextActualPosition = options.motion.position(elapsed)
      this.actualPosition.set(nextActualPosition[0], nextActualPosition[1], nextActualPosition[2])

      const deltaX = this.actualPosition.x - this.group.position.x
      const deltaY = this.actualPosition.y - this.group.position.y
      const deltaZ = this.actualPosition.z - this.group.position.z
      const distanceToTarget = Math.hypot(deltaX, deltaY, deltaZ)
      if (distanceToTarget > 0) {
        const maxStep = Actor.VISUAL_POSITION_MOVE_SPEED * _delta
        if (distanceToTarget <= maxStep) {
          this.group.position.copy(this.actualPosition)
        } else {
          const moveRatio = maxStep / distanceToTarget
          this.group.position.x += deltaX * moveRatio
          this.group.position.y += deltaY * moveRatio
          this.group.position.z += deltaZ * moveRatio
        }
      }

      this.group.rotation.z = options.motion.rotationZ?.(elapsed) ?? 0

      if (this.hitShakeRemaining > 0) {
        this.hitShakeRemaining = Math.max(0, this.hitShakeRemaining - _delta)
      }

      const pulse =
        1 +
        Math.sin(elapsed * options.animation.pulseSpeed) * options.animation.pulseAmount +
        this.hitImpactStrength * 0.16
      this.sprite.scale.setScalar(options.animation.scale * pulse)
      this.sprite.material.rotation = Math.sin(elapsed * options.animation.spriteRotationSpeed) * 0.12
      this.sprite.material.opacity =
        options.animation.opacityBase + Math.sin(elapsed * 1.8) * options.animation.opacityVariation

      if (this.frozenRemaining > 0) {
        this.frozenRemaining = Math.max(0, this.frozenRemaining - _delta)
        if (this.frozenRemaining <= 0) {
          this.frozenIntensity = 0
        }
      }

      const burnVisualStrength =
        this.burningRemaining > 0
          ? Math.min(1, this.burningRemaining / 2.5) * Math.min(1, this.burningDamagePerSecond / 4.5)
          : 0
      const freezeVisualStrength =
        this.frozenRemaining > 0
          ? Math.min(1, this.frozenRemaining / 2.2) * Math.min(1, this.frozenIntensity)
          : 0

      if (freezeVisualStrength > 0) {
        const bubblePulse = 1 + Math.sin(elapsed * 4.8 + this.group.position.x * 0.65) * 0.06
        const bubbleScale = options.animation.scale * 1.08 * bubblePulse
        this.frozenBubbleSprite.scale.set(bubbleScale, bubbleScale, 1)
        this.frozenBubbleSprite.material.opacity = Math.min(0.92, 0.24 + freezeVisualStrength * 0.7)
      } else {
        this.frozenBubbleSprite.material.opacity = 0
      }
      this.frozenBubbleSprite.material.needsUpdate = true

      const nextHealthbarStatusMode: 'none' | 'burning' | 'frozen' =
        freezeVisualStrength > 0.01
          ? 'frozen'
          : burnVisualStrength > 0.01
            ? 'burning'
            : 'none'
      if (nextHealthbarStatusMode !== this.healthbarStatusMode) {
        this.healthbarStatusMode = nextHealthbarStatusMode
        this.redrawHealthbar()
      }

      this.mixedStatusColor.copy(this.baseSpriteColor)
      if (burnVisualStrength > 0) {
        this.mixedStatusColor.lerp(this.burnStatusColor, Math.min(0.75, burnVisualStrength * 0.85))
      }
      if (freezeVisualStrength > 0) {
        this.mixedStatusColor.lerp(this.freezeStatusColor, Math.min(0.8, freezeVisualStrength * 0.9))
      }
      this.sprite.material.color.copy(this.mixedStatusColor)

      if (this.hitFlashRemaining > 0) {
        this.hitFlashRemaining = Math.max(0, this.hitFlashRemaining - _delta)
        const flashProgress = this.hitFlashRemaining / 0.18
        this.hitFlashSprite.material.opacity = flashProgress * 0.66
        this.hitFlashSprite.scale.setScalar(options.animation.scale * (0.26 + (1 - flashProgress) * 0.5))
      } else {
        this.hitFlashSprite.material.opacity = 0
      }

      this.hitImpactStrength = Math.max(0, this.hitImpactStrength - _delta * 4.5)

      this.healthbar.sprite.position.y = this.healthbarOffsetY + Math.sin(elapsed * 1.2) * 0.05
      this.healthbar.sprite.material.rotation = -this.group.rotation.z * 0.6

      if (this.burningRemaining > 0 && this.burningDamagePerSecond > 0) {
        this.burningRemaining = Math.max(0, this.burningRemaining - _delta)
        this.damage(this.burningDamagePerSecond * _delta, this.burningKillCallback ?? undefined)

        if (this.burningRemaining <= 0) {
          this.burningDamagePerSecond = 0
          this.burningKillCallback = null
        }
      }

      this.onActorTick(_delta, elapsed)
    }
  }

  setHealth(value: number) {
    if (this.dead) {
      return
    }

    this.health = Math.min(this.maxHealth, Math.max(0, value))
    this.redrawHealthbar()

    if (this.health <= 0) {
      this.beginDeath()
    }
  }

  static setIncomingDamageMultiplier(multiplier: number) {
    Actor.incomingDamageMultiplier = Math.max(0, multiplier)
  }

  static getIncomingDamageMultiplier() {
    return Actor.incomingDamageMultiplier
  }

  static applyIncomingDamageMultiplier(amount: number) {
    return Math.max(0, amount) * Actor.incomingDamageMultiplier
  }

  damage(amount: number, onKilled?: () => void) {
    const scaledAmount = Actor.applyIncomingDamageMultiplier(amount)
    return this.damageRaw(scaledAmount, onKilled)
  }

  heal(amount: number) {
    if (this.dead) {
      return
    }

    this.setHealth(this.health + amount)
  }

  setDeathEffectSpawner(spawner: (effect: GameObject) => void) {
    this.deathEffectSpawner = spawner
  }

  protected getHealth() {
    return this.health
  }

  protected getMaxHealth() {
    return this.maxHealth
  }

  protected increaseMaxHealth(amount: number, alsoHealByAmount = true) {
    if (amount <= 0 || this.dead) {
      return
    }

    this.maxHealth += amount
    if (alsoHealByAmount) {
      this.health = Math.min(this.maxHealth, this.health + amount)
    }
    this.redrawHealthbar()
  }

  protected decreaseMaxHealth(amount: number, alsoReduceHealthByAmount = true) {
    if (amount <= 0 || this.dead) {
      return
    }

    const nextMaxHealth = Math.max(1, this.maxHealth - amount)
    const maxHealthReduction = this.maxHealth - nextMaxHealth
    if (maxHealthReduction <= 0) {
      return
    }

    this.maxHealth = nextMaxHealth
    if (alsoReduceHealthByAmount) {
      this.setHealth(this.health - maxHealthReduction)
      return
    }

    this.setHealth(this.health)
  }

  addBurningEffect(
    damagePerSecond: number,
    durationSeconds: number,
    onKilled?: () => void,
    options?: {
      stackDamage?: boolean
      refreshDuration?: boolean
    },
  ) {
    if (this.dead || damagePerSecond <= 0 || durationSeconds <= 0) {
      return
    }

    const incomingDamage = damagePerSecond * Actor.GLOBAL_BURN_DAMAGE_MULTIPLIER
    if (options?.stackDamage) {
      this.burningDamagePerSecond += incomingDamage
    } else {
      this.burningDamagePerSecond = Math.max(this.burningDamagePerSecond, incomingDamage)
    }

    if (options?.refreshDuration === false) {
      this.burningRemaining = Math.max(this.burningRemaining, durationSeconds)
    } else {
      this.burningRemaining = durationSeconds
    }

    if (onKilled) {
      this.burningKillCallback = onKilled
    }
  }

  addFreezeEffect(durationSeconds: number, intensity = 0.6) {
    if (this.dead || durationSeconds <= 0 || intensity <= 0) {
      return
    }

    this.frozenRemaining = Math.max(this.frozenRemaining, durationSeconds)
    this.frozenIntensity = Math.max(this.frozenIntensity, Math.min(0.95, intensity))
  }

  getBurningRemainingSeconds() {
    return this.burningRemaining
  }

  getBurningDamagePerSecond() {
    return this.burningDamagePerSecond
  }

  getFrozenRemainingSeconds() {
    return this.frozenRemaining
  }

  getFrozenIntensity() {
    return this.frozenIntensity
  }

  applySavedStatusEffects(status: {
    burningDamagePerSecond?: number
    burningRemainingSeconds?: number
    frozenRemainingSeconds?: number
    frozenIntensity?: number
  }) {
    if (this.dead) {
      return
    }

    this.burningDamagePerSecond = Math.max(0, status.burningDamagePerSecond ?? 0)
    this.burningRemaining = Math.max(0, status.burningRemainingSeconds ?? 0)
    this.burningKillCallback = null

    this.frozenRemaining = Math.max(0, status.frozenRemainingSeconds ?? 0)
    this.frozenIntensity = Math.max(0, Math.min(0.95, status.frozenIntensity ?? 0))
  }

  protected getStatusActionMultiplier() {
    if (this.frozenRemaining <= 0 || this.frozenIntensity <= 0) {
      return 1
    }

    return Math.max(0.08, 1 - this.frozenIntensity)
  }

  getCurrentHealth() {
    return this.health
  }

  getMaxHealthValue() {
    return this.maxHealth
  }

  getCurrentShield() {
    return 0
  }

  getMaxShield() {
    return 0
  }

  isDead() {
    return this.dead
  }

  isAlive() {
    return !this.dead
  }

  getActualPosition() {
    return this.actualPosition
  }

  protected setActualPosition(x: number, y: number, z: number, syncVisualPosition = false) {
    this.actualPosition.set(x, y, z)
    if (syncVisualPosition) {
      this.group.position.set(x, y, z)
    }
  }

  protected getStyle() {
    return this.style
  }

  protected damageRaw(amount: number, onKilled?: () => void) {
    if (this.dead) {
      return false
    }

    const effectiveAmount = Math.max(0, amount)
    if (effectiveAmount <= 0) {
      return false
    }

    this.triggerDamageFeedback(effectiveAmount)

    const wasAlive = !this.dead
    this.setHealth(this.health - effectiveAmount)

    const killedNow = wasAlive && this.dead
    if (killedNow) {
      onKilled?.()
    }

    return killedNow
  }

  private redrawHealthbar() {
    if (!this.healthbar) {
      return
    }

    const burnVisualStrength =
      this.burningRemaining > 0
        ? Math.min(1, this.burningRemaining / 2.5) * Math.min(1, this.burningDamagePerSecond / 4.5)
        : 0
    const freezeVisualStrength =
      this.frozenRemaining > 0
        ? Math.min(1, this.frozenRemaining / 2.2) * Math.min(1, this.frozenIntensity)
        : 0

    const status =
      this.healthbarStatusMode === 'frozen'
        ? { kind: 'frozen' as const, strength: freezeVisualStrength }
        : this.healthbarStatusMode === 'burning'
          ? { kind: 'burning' as const, strength: burnVisualStrength }
          : { kind: 'none' as const, strength: 0 }

    this.healthbar.redraw(this.health, this.maxHealth, status)
  }

  private beginDeath() {
    if (this.dead) {
      return
    }

    this.dead = true

    if (!this.deathEffectSpawned && this.deathEffectSpawner) {
      this.deathEffectSpawned = true
      this.deathEffectSpawner(
        new Particle({
          origin: [this.group.position.x, this.group.position.y + 0.45, this.group.position.z],
          primary: this.style.primary,
          accent: this.style.accent,
          count: 52,
          lifetime: 1.0,
        }),
      )
    }

    this.redrawHealthbar()
  }

  private triggerDamageFeedback(damageAmount: number) {
    const normalizedDamage = Math.min(1, damageAmount / Math.max(1, this.maxHealth * 0.45))
    this.hitImpactStrength = Math.max(this.hitImpactStrength, 0.2 + normalizedDamage * 0.8)
    this.hitFlashRemaining = Math.max(this.hitFlashRemaining, 0.18)
  }

  protected onActorTick(_delta: number, _elapsed: number) {}
}