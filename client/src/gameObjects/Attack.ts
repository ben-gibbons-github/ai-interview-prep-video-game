import * as THREE from 'three'
import { GameObject } from '../GameObject'
import { Actor } from './Actor'
import { AttackSpriteTexture, type AttackPalette } from './AttackSpriteTexture'
import { Particle } from './Particle'

export interface AttackOptions {
  damageAmount?: number
  speed?: number
  projectileScale?: number
  trailPrimary?: string
  trailAccent?: string
  trailParticleCount?: number
  trailSpawnInterval?: number
  trailLifetime?: number
  spawnPosition?: THREE.Vector3Tuple
  hitChain?: Actor[]
  bouncesRemaining?: number
  pickBounceTarget?: (currentTarget: Actor, hitChain: Actor[]) => Actor | null
  spawnBouncedAttack?: (attack: Attack) => void
  onHitTarget?: (target: Actor, damageAmount: number) => void
  onKillTarget?: (target: Actor) => void
  projectilePalette?: AttackPalette
  impactPrimary?: string
  impactAccent?: string
  spawnImpactEffect?: (effect: GameObject) => void
}

const GLOBAL_PROJECTILE_SPEED_MULTIPLIER = 1

export class Attack extends GameObject {
  private readonly projectile: THREE.Sprite
  private readonly target: Actor
  private readonly speed: number
  private readonly impactRadius = 0.35
  private readonly damageAmount: number
  private readonly bouncesRemaining: number
  private readonly pickBounceTarget: ((currentTarget: Actor, hitChain: Actor[]) => Actor | null) | null
  private readonly spawnBouncedAttack: ((attack: Attack) => void) | null
  private readonly hitChain: Actor[]
  private readonly onHitTarget: ((target: Actor, damageAmount: number) => void) | null
  private readonly onKillTarget: ((target: Actor) => void) | null
  private readonly projectilePalette: AttackPalette | undefined
  private readonly projectileScale: number
  private readonly trailPrimary: string | null
  private readonly trailAccent: string | null
  private readonly trailParticleCount: number
  private readonly trailSpawnInterval: number
  private readonly trailLifetime: number
  private readonly direction = new THREE.Vector3()
  private readonly travelTarget = new THREE.Vector3()
  private distanceTravelled = 0
  private trailCooldown = 0
  private readonly maxTravelDistance = 18
  private impacted = false
  private readonly spawnImpactEffect: ((effect: GameObject) => void) | null
  private readonly impactPrimary: string
  private readonly impactAccent: string
  private readonly impactParticleCount: number
  private readonly impactParticleLifetime: number

  constructor(source: Actor, target: Actor, options: AttackOptions = {}) {
    super('Attack')

    this.target = target
    this.damageAmount = options.damageAmount ?? 20
    this.speed = (options.speed ?? 12) * GLOBAL_PROJECTILE_SPEED_MULTIPLIER
    this.projectileScale = Math.max(0.15, options.projectileScale ?? 1)
    this.trailPrimary = options.trailPrimary ?? null
    this.trailAccent = options.trailAccent ?? null
    this.trailParticleCount = Math.max(2, Math.floor(options.trailParticleCount ?? 3))
    this.trailSpawnInterval = Math.max(0.02, options.trailSpawnInterval ?? 0.09)
    this.trailLifetime = Math.max(0.08, options.trailLifetime ?? 0.2)
    this.bouncesRemaining = options.bouncesRemaining ?? 0
    this.pickBounceTarget = options.pickBounceTarget ?? null
    this.spawnBouncedAttack = options.spawnBouncedAttack ?? null
    this.hitChain = options.hitChain ? [...options.hitChain] : []
    this.onHitTarget = options.onHitTarget ?? null
    this.onKillTarget = options.onKillTarget ?? null
    this.projectilePalette = options.projectilePalette
    this.spawnImpactEffect = options.spawnImpactEffect ?? null
    this.impactPrimary = options.impactPrimary ?? 'rgba(255, 255, 255, 0.94)'
    this.impactAccent = options.impactAccent ?? 'rgba(56, 189, 248, 0.9)'
    const impactIntensity = Math.max(0, (this.damageAmount - 20) / 20)
    this.impactParticleCount = Math.max(2, Math.floor(2 + Math.min(30, impactIntensity * 10)))
    this.impactParticleLifetime = Math.max(0.24, Math.min(1.05, 0.34 + impactIntensity * 0.12))

    this.projectile = this.addSprite(AttackSpriteTexture.create(this.projectilePalette), {
      position: [0, 0, 0],
      scale: 0.58 * this.projectileScale,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 1,
    })

    if (options.spawnPosition) {
      this.group.position.set(options.spawnPosition[0], options.spawnPosition[1], options.spawnPosition[2])
    } else {
      this.group.position.copy(source.group.position)
    }

    this.update = (_delta, elapsed) => {
      if (this.impacted) {
        return
      }

      this.travelTarget.copy(this.target.group.position)
      this.direction.copy(this.travelTarget).sub(this.group.position)

      const distance = this.direction.length()
      if (distance <= this.impactRadius) {
        this.impact()
        return
      }

      this.direction.normalize()
      const step = this.speed * _delta
      this.group.position.addScaledVector(this.direction, step)
      this.group.rotation.z = elapsed * 1.8

      const travelAngle = Math.atan2(this.direction.z, this.direction.x)
      this.projectile.material.rotation = travelAngle

      const remainingDistance = this.group.position.distanceTo(this.target.group.position)
      if (remainingDistance <= this.impactRadius) {
        this.impact()
        return
      }

      this.distanceTravelled += step
      const velocityPulse = 1 + Math.sin(elapsed * 18 + this.distanceTravelled * 0.8) * 0.1
      this.projectile.scale.set(
        0.82 * velocityPulse * this.projectileScale,
        (0.52 + velocityPulse * 0.22) * this.projectileScale,
        1,
      )
      this.projectile.material.opacity = 0.92 + Math.sin(elapsed * 11 + this.distanceTravelled) * 0.1

      if (this.trailPrimary && this.trailAccent) {
        this.trailCooldown -= _delta
        if (this.trailCooldown <= 0) {
          this.trailCooldown = this.trailSpawnInterval
          this.spawnTrailParticle()
        }
      }

      if (this.distanceTravelled >= this.maxTravelDistance) {
        this.impact()
      }
    }
  }

  private spawnTrailParticle() {
    if (!this.trailPrimary || !this.trailAccent) {
      return
    }

    const trailOrigin: THREE.Vector3Tuple = [
      this.group.position.x,
      this.group.position.y,
      this.group.position.z,
    ]

    const trailEffect = new Particle({
      origin: this.spawnImpactEffect ? trailOrigin : [0, 0, 0],
      primary: this.trailPrimary,
      accent: this.trailAccent,
      count: this.trailParticleCount,
      lifetime: this.trailLifetime,
    })

    if (this.spawnImpactEffect) {
      this.spawnImpactEffect(trailEffect)
      return
    }

    this.addChild(trailEffect)
  }

  private impact() {
    if (this.impacted) {
      return
    }

    this.impacted = true
    this.target.damage(this.damageAmount, () => {
      this.onKillTarget?.(this.target)
    })
    this.onHitTarget?.(this.target, this.damageAmount)

    const impactOrigin: THREE.Vector3Tuple = [
      this.target.group.position.x,
      this.target.group.position.y + 0.38,
      this.target.group.position.z,
    ]

    const impactEffect = new Particle({
      origin: this.spawnImpactEffect ? impactOrigin : [0, 0, 0],
      primary: this.impactPrimary,
      accent: this.impactAccent,
      count: this.impactParticleCount,
      lifetime: this.impactParticleLifetime,
    })

    if (this.spawnImpactEffect) {
      this.spawnImpactEffect(impactEffect)
    } else {
      this.addChild(impactEffect)
    }

    if (this.bouncesRemaining > 0 && this.pickBounceTarget) {
      const nextHitChain = [...this.hitChain, this.target]
      const nextTarget = this.pickBounceTarget(this.target, nextHitChain)
      if (nextTarget && nextTarget.isAlive()) {
        const bouncedAttack = new Attack(this.target, nextTarget, {
          damageAmount: this.damageAmount,
          speed: this.speed,
          spawnPosition: [this.group.position.x, this.group.position.y, this.group.position.z],
          hitChain: nextHitChain,
          bouncesRemaining: this.bouncesRemaining - 1,
          pickBounceTarget: this.pickBounceTarget,
          spawnBouncedAttack: this.spawnBouncedAttack ?? undefined,
          onHitTarget: this.onHitTarget ?? undefined,
          onKillTarget: this.onKillTarget ?? undefined,
          projectilePalette: this.projectilePalette,
          impactPrimary: this.impactPrimary,
          impactAccent: this.impactAccent,
          spawnImpactEffect: this.spawnImpactEffect ?? undefined,
        })
        this.spawnBouncedAttack?.(bouncedAttack)
      }
    }

    this.dispose()
  }
}