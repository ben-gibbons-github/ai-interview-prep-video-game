import * as THREE from 'three'
import { GameObject } from '../GameObject'
import { Actor } from './Actor'
import { Particle } from './Particle'

export interface QuestionNukeOptions {
  source: Actor
  target: Actor
  damageAmount?: number
  splashDamageRatio?: number
  speed?: number
  spawnPosition?: THREE.Vector3Tuple
  initialDistanceTravelled?: number
  spawnEffect?: (effect: GameObject) => void
  getSplashTargets?: () => Actor[]
  onKillTarget?: (target: Actor) => void
}

export interface QuestionNukeSaveState {
  position: [number, number, number]
  targetEnemyId: string | null
  damageAmount: number
  speed: number
  distanceTravelled: number
}

function createQuestionNukeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create question nuke texture context')
  }

  context.clearRect(0, 0, canvas.width, canvas.height)

  const outerGlow = context.createRadialGradient(128, 128, 20, 128, 128, 120)
  outerGlow.addColorStop(0, 'rgba(254, 249, 195, 1)')
  outerGlow.addColorStop(0.28, 'rgba(251, 191, 36, 0.96)')
  outerGlow.addColorStop(0.66, 'rgba(245, 158, 11, 0.72)')
  outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = outerGlow
  context.beginPath()
  context.arc(128, 128, 106, 0, Math.PI * 2)
  context.fill()

  const coreGlow = context.createRadialGradient(128, 128, 4, 128, 128, 62)
  coreGlow.addColorStop(0, 'rgba(255, 255, 255, 1)')
  coreGlow.addColorStop(0.32, 'rgba(254, 240, 138, 1)')
  coreGlow.addColorStop(1, 'rgba(251, 191, 36, 0)')
  context.fillStyle = coreGlow
  context.beginPath()
  context.arc(128, 128, 54, 0, Math.PI * 2)
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export class QuestionNuke extends GameObject {
  private readonly target: Actor
  private readonly damageAmount: number
  private readonly splashDamageRatio: number
  private readonly speed: number
  private readonly impactRadius = 0.55
  private readonly spawnEffect: ((effect: GameObject) => void) | null
  private readonly getSplashTargets: (() => Actor[]) | null
  private readonly onKillTarget: ((target: Actor) => void) | null
  private readonly projectile: THREE.Sprite
  private readonly direction = new THREE.Vector3()
  private readonly targetPosition = new THREE.Vector3()
  private impacted = false
  private elapsed = 0
  private trailCooldown = 0
  private distanceTravelled = 0
  private readonly maxTravelDistance = 42

  constructor(options: QuestionNukeOptions) {
    super('QuestionNuke')

    this.target = options.target
    this.damageAmount = Math.max(1, options.damageAmount ?? 2000)
    this.splashDamageRatio = Math.max(0, options.splashDamageRatio ?? 0.1)
    this.speed = Math.max(2, options.speed ?? 6.8)
    this.spawnEffect = options.spawnEffect ?? null
    this.getSplashTargets = options.getSplashTargets ?? null
    this.onKillTarget = options.onKillTarget ?? null

    this.projectile = this.addSprite(createQuestionNukeTexture(), {
      position: [0, 0, 0],
      scale: 0.98,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.98,
    })

    if (options.spawnPosition) {
      this.group.position.set(options.spawnPosition[0], options.spawnPosition[1], options.spawnPosition[2])
    } else {
      this.group.position.copy(options.source.group.position)
      this.group.position.y += 0.72
    }
    this.distanceTravelled = Math.max(0, options.initialDistanceTravelled ?? 0)

    this.update = (delta, runtimeElapsed) => {
      if (this.impacted) {
        return
      }

      this.elapsed += delta
      this.trailCooldown -= delta

      this.targetPosition.copy(this.target.group.position)
      this.targetPosition.y += 0.35

      this.direction.copy(this.targetPosition).sub(this.group.position)
      const distanceToTarget = this.direction.length()
      if (distanceToTarget <= this.impactRadius) {
        this.impact()
        return
      }

      this.direction.normalize()
      const step = this.speed * delta
      this.group.position.addScaledVector(this.direction, step)
      this.distanceTravelled += step

      const arcLift = Math.sin(Math.min(Math.PI, this.distanceTravelled * 0.24)) * 0.03
      this.group.position.y += arcLift

      const roll = Math.sin(runtimeElapsed * 14 + this.distanceTravelled * 0.45)
      this.projectile.material.rotation = Math.atan2(this.direction.z, this.direction.x) + roll * 0.24

      const pulse = 1 + Math.sin(runtimeElapsed * 20 + this.distanceTravelled * 0.8) * 0.08
      this.projectile.scale.set(0.98 * pulse, 0.76 * pulse, 1)
      this.projectile.material.opacity = 0.9 + Math.sin(runtimeElapsed * 12 + this.distanceTravelled) * 0.08

      if (this.trailCooldown <= 0) {
        this.trailCooldown = 0.1
        this.spawnTrailSpark()
      }

      if (this.distanceTravelled >= this.maxTravelDistance) {
        this.impact()
      }
    }
  }

  private spawnTrailSpark() {
    if (!this.spawnEffect) {
      return
    }

    this.spawnEffect(
      new Particle({
        origin: [this.group.position.x, this.group.position.y, this.group.position.z],
        primary: 'rgba(191, 219, 254, 0.96)',
        accent: 'rgba(34, 211, 238, 0.88)',
        count: 6,
        lifetime: 0.36,
      }),
    )
  }

  private impact() {
    if (this.impacted) {
      return
    }

    this.impacted = true

    this.target.damage(this.damageAmount, () => {
      this.onKillTarget?.(this.target)
    })

    const splashDamage = Math.max(1, this.damageAmount * this.splashDamageRatio)
    const splashTargets = this.getSplashTargets?.() ?? []
    for (const splashTarget of splashTargets) {
      if (splashTarget === this.target || !splashTarget.isAlive()) {
        continue
      }

      splashTarget.damage(splashDamage, () => {
        this.onKillTarget?.(splashTarget)
      })
    }

    if (this.spawnEffect) {
      const impactOrigin: THREE.Vector3Tuple = [
        this.target.group.position.x,
        this.target.group.position.y + 0.42,
        this.target.group.position.z,
      ]

      this.spawnEffect(
        new Particle({
          origin: impactOrigin,
          primary: 'rgba(254, 215, 170, 0.88)',
          accent: 'rgba(249, 115, 22, 0.74)',
          count: 90,
          lifetime: 1.2,
        }),
      )
      this.spawnEffect(
        new Particle({
          origin: [impactOrigin[0], impactOrigin[1] + 0.55, impactOrigin[2]],
          primary: 'rgba(251, 146, 60, 0.86)',
          accent: 'rgba(220, 38, 38, 0.72)',
          count: 64,
          lifetime: 1.5,
        }),
      )
      this.spawnEffect(
        new Particle({
          origin: [impactOrigin[0], impactOrigin[1] + 1.15, impactOrigin[2]],
          primary: 'rgba(148, 163, 184, 0.46)',
          accent: 'rgba(30, 41, 59, 0.68)',
          count: 72,
          lifetime: 2.2,
        }),
      )
      this.spawnEffect(
        new Particle({
          origin: [impactOrigin[0], impactOrigin[1] + 1.75, impactOrigin[2]],
          primary: 'rgba(100, 116, 139, 0.32)',
          accent: 'rgba(15, 23, 42, 0.62)',
          count: 90,
          lifetime: 2.6,
        }),
      )

      this.spawnEffect(
        new Particle({
          origin: [impactOrigin[0], impactOrigin[1] + 0.18, impactOrigin[2]],
          primary: 'rgba(251, 113, 133, 0.52)',
          accent: 'rgba(39, 39, 42, 0.64)',
          count: 48,
          lifetime: 1.3,
        }),
      )
    }

    this.dispose()
  }

  getSaveState(): QuestionNukeSaveState {
    const saveableTarget = this.target as Actor & { getSaveId?: () => string }

    return {
      position: [this.group.position.x, this.group.position.y, this.group.position.z],
      targetEnemyId:
        typeof saveableTarget.getSaveId === 'function' ? saveableTarget.getSaveId() ?? null : null,
      damageAmount: this.damageAmount,
      speed: this.speed,
      distanceTravelled: this.distanceTravelled,
    }
  }
}
