import * as THREE from 'three'
import { GameObject } from '../GameObject'

export interface ParticleOptions {
  origin: THREE.Vector3Tuple
  primary: string
  accent: string
  count?: number
  lifetime?: number
}

function splitColorAndAlpha(colorValue: string): { color: string; alpha: number } {
  const rgbaMatch = colorValue.match(
    /^rgba\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d*\.?\d+)\s*\)$/i,
  )

  if (!rgbaMatch) {
    return { color: colorValue, alpha: 1 }
  }

  const red = Math.max(0, Math.min(255, Number(rgbaMatch[1])))
  const green = Math.max(0, Math.min(255, Number(rgbaMatch[2])))
  const blue = Math.max(0, Math.min(255, Number(rgbaMatch[3])))
  const alpha = Math.max(0, Math.min(1, Number(rgbaMatch[4])))

  return {
    color: `rgb(${red}, ${green}, ${blue})`,
    alpha,
  }
}

function createEffectTexture(coreColor: string, edgeColor: string, innerRadius = 0.12) {
  const textureKey = `${coreColor}|${edgeColor}|${innerRadius.toFixed(3)}`
  const cachedTexture = Particle.getCachedEffectTexture(textureKey)
  if (cachedTexture) {
    return cachedTexture
  }

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create particle effect texture context')
  }

  const gradient = context.createRadialGradient(128, 128, 8, 128, 128, 118)
  gradient.addColorStop(0, coreColor)
  gradient.addColorStop(innerRadius, coreColor)
  gradient.addColorStop(0.55, edgeColor)
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = gradient
  context.beginPath()
  context.arc(128, 128, 108, 0, Math.PI * 2)
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  Particle.cacheEffectTexture(textureKey, texture)
  return texture
}

export class Particle extends GameObject {
  private static readonly effectTextureCache = new Map<string, THREE.CanvasTexture>()
  private static readonly GLOBAL_PARTICLE_SPEED_MULTIPLIER = 1.28
  private static readonly GLOBAL_PARTICLE_LIFETIME_MULTIPLIER = 0.72
  private readonly emberPoints: THREE.Points
  private readonly smokePoints: THREE.Points
  private readonly emberGeometry: THREE.BufferGeometry
  private readonly smokeGeometry: THREE.BufferGeometry
  private readonly emberPositions: Float32Array
  private readonly smokePositions: Float32Array
  private readonly emberVelocities: Float32Array
  private readonly smokeVelocities: Float32Array
  private readonly emberAges: Float32Array
  private readonly smokeAges: Float32Array
  private readonly flashSprite: THREE.Sprite
  private readonly ringSprite: THREE.Sprite
  private readonly lifetime: number
  private readonly emberCount: number
  private readonly smokeCount: number
  private particleDisposed = false
  private elapsed = 0

  static getCachedEffectTexture(key: string): THREE.CanvasTexture | null {
    return Particle.effectTextureCache.get(key) ?? null
  }

  static cacheEffectTexture(key: string, texture: THREE.CanvasTexture) {
    Particle.effectTextureCache.set(key, texture)
  }

  constructor(options: ParticleOptions) {
    super('ParticleBurst')

    this.emberCount = options.count ?? 96
    this.smokeCount = Math.max(24, Math.floor(this.emberCount * 0.45))
    const configuredLifetime = options.lifetime ?? 1.05
    this.lifetime = Math.max(0.2, configuredLifetime * Particle.GLOBAL_PARTICLE_LIFETIME_MULTIPLIER)

    const primaryColor = splitColorAndAlpha(options.primary)
    const accentColor = splitColorAndAlpha(options.accent)

    this.emberGeometry = new THREE.BufferGeometry()
    this.emberPositions = new Float32Array(this.emberCount * 3)
    this.emberVelocities = new Float32Array(this.emberCount * 3)
    this.emberAges = new Float32Array(this.emberCount)

    for (let index = 0; index < this.emberCount; index += 1) {
      const positionOffset = index * 3
      const velocityOffset = index * 3
      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 1.6 + 0.25,
        Math.random() * 2 - 1,
      ).normalize()

      const speed = (3.6 + Math.random() * 6.2) * Particle.GLOBAL_PARTICLE_SPEED_MULTIPLIER
      direction.multiplyScalar(speed)

      // Store point positions in local space so the particle group position controls world placement.
      this.emberPositions[positionOffset] = 0
      this.emberPositions[positionOffset + 1] = 0
      this.emberPositions[positionOffset + 2] = 0

      this.emberVelocities[velocityOffset] = direction.x
      this.emberVelocities[velocityOffset + 1] = direction.y
      this.emberVelocities[velocityOffset + 2] = direction.z
      this.emberAges[index] = Math.random() * 0.08
    }

    this.emberGeometry.setAttribute('position', new THREE.BufferAttribute(this.emberPositions, 3))

    const emberMaterial = new THREE.PointsMaterial({
      color: primaryColor.color,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: primaryColor.alpha,
    })

    this.emberPoints = this.addObject(new THREE.Points(this.emberGeometry, emberMaterial))
    this.emberPoints.renderOrder = 10

    this.smokeGeometry = new THREE.BufferGeometry()
    this.smokePositions = new Float32Array(this.smokeCount * 3)
    this.smokeVelocities = new Float32Array(this.smokeCount * 3)
    this.smokeAges = new Float32Array(this.smokeCount)

    for (let index = 0; index < this.smokeCount; index += 1) {
      const positionOffset = index * 3
      const velocityOffset = index * 3
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 1.4,
        Math.random() * 0.5 + 0.15,
        (Math.random() - 0.5) * 1.4,
      ).normalize()

      direction.x *= (0.8 + Math.random() * 1.2) * Particle.GLOBAL_PARTICLE_SPEED_MULTIPLIER
      direction.y *= (0.7 + Math.random() * 1.0) * Particle.GLOBAL_PARTICLE_SPEED_MULTIPLIER
      direction.z *= (0.8 + Math.random() * 1.2) * Particle.GLOBAL_PARTICLE_SPEED_MULTIPLIER

      // Store point positions in local space so the particle group position controls world placement.
      this.smokePositions[positionOffset] = 0
      this.smokePositions[positionOffset + 1] = 0
      this.smokePositions[positionOffset + 2] = 0

      this.smokeVelocities[velocityOffset] = direction.x
      this.smokeVelocities[velocityOffset + 1] = direction.y + 0.4
      this.smokeVelocities[velocityOffset + 2] = direction.z
      this.smokeAges[index] = Math.random() * 0.18
    }

    this.smokeGeometry.setAttribute('position', new THREE.BufferAttribute(this.smokePositions, 3))

    const smokeMaterial = new THREE.PointsMaterial({
      color: accentColor.color,
      size: 0.22,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      opacity: 0.5 * accentColor.alpha,
    })

    this.smokePoints = this.addObject(new THREE.Points(this.smokeGeometry, smokeMaterial))
    this.smokePoints.renderOrder = 9

    this.flashSprite = this.addSprite(
      createEffectTexture('rgba(255, 255, 255, 1)', options.primary, 0.04),
      {
        position: [0, 0, 0],
        scale: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 1,
      },
    )

    this.ringSprite = this.addSprite(
      createEffectTexture('rgba(255, 255, 255, 0.92)', options.accent, 0.32),
      {
        position: [0, 0, 0],
        scale: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.95,
      },
    )

    this.update = (delta, elapsed) => {
      this.elapsed += delta
      const emberGravity = 11.2
      const smokeGravity = 2.8

      for (let index = 0; index < this.emberCount; index += 1) {
        this.emberAges[index] += delta
        const progress = this.emberAges[index] / this.lifetime
        const positionOffset = index * 3
        const velocityOffset = index * 3

        this.emberVelocities[velocityOffset + 1] -= emberGravity * delta * 0.8

        this.emberPositions[positionOffset] += this.emberVelocities[velocityOffset] * delta
        this.emberPositions[positionOffset + 1] += this.emberVelocities[velocityOffset + 1] * delta
        this.emberPositions[positionOffset + 2] += this.emberVelocities[velocityOffset + 2] * delta

        const sway = Math.sin(elapsed * 11 + index) * 0.026
        this.emberPositions[positionOffset] += sway
        this.emberPositions[positionOffset + 2] -= sway * 0.6

        this.emberVelocities[velocityOffset] *= 0.993
        this.emberVelocities[velocityOffset + 1] *= 0.987
        this.emberVelocities[velocityOffset + 2] *= 0.993

        if (progress >= 1) {
          this.emberPositions[positionOffset + 1] -= 9999
        }
      }

      for (let index = 0; index < this.smokeCount; index += 1) {
        this.smokeAges[index] += delta
        const progress = this.smokeAges[index] / (this.lifetime * 1.25)
        const positionOffset = index * 3
        const velocityOffset = index * 3

        this.smokeVelocities[velocityOffset + 1] -= smokeGravity * delta * 0.24
        this.smokeVelocities[velocityOffset] *= 0.992
        this.smokeVelocities[velocityOffset + 1] *= 0.988
        this.smokeVelocities[velocityOffset + 2] *= 0.992

        this.smokePositions[positionOffset] += this.smokeVelocities[velocityOffset] * delta
        this.smokePositions[positionOffset + 1] += this.smokeVelocities[velocityOffset + 1] * delta
        this.smokePositions[positionOffset + 2] += this.smokeVelocities[velocityOffset + 2] * delta

        const drift = Math.sin(elapsed * 4 + index) * 0.01
        this.smokePositions[positionOffset] += drift
        this.smokePositions[positionOffset + 2] += drift * 0.75

        if (progress >= 1) {
          this.smokePositions[positionOffset + 1] -= 9999
        }
      }

      const emberPositionAttribute = this.emberGeometry.getAttribute('position') as THREE.BufferAttribute
      emberPositionAttribute.needsUpdate = true

      const smokePositionAttribute = this.smokeGeometry.getAttribute('position') as THREE.BufferAttribute
      smokePositionAttribute.needsUpdate = true

      const emberMaterial = this.emberPoints.material as THREE.PointsMaterial
      const smokeMaterial = this.smokePoints.material as THREE.PointsMaterial

      const impactProgress = Math.min(1, this.elapsed / this.lifetime)
      emberMaterial.opacity = Math.max(0, 1 - impactProgress * 1.08)
      smokeMaterial.opacity = Math.max(0, 0.55 - impactProgress * 0.45)

      this.emberPoints.scale.setScalar(1 + this.elapsed * 1.25)
      this.smokePoints.scale.setScalar(1 + this.elapsed * 1.75)

      this.flashSprite.scale.setScalar(0.72 + this.elapsed * 6.1)
      this.flashSprite.material.opacity = Math.max(0, 1 - this.elapsed / 0.14)

      this.ringSprite.scale.setScalar(0.42 + this.elapsed * 5.2)
      this.ringSprite.material.opacity = Math.max(0, 0.95 - this.elapsed / this.lifetime)

      if (this.elapsed >= this.lifetime) {
        this.dispose()
      }
    }

    this.group.position.set(options.origin[0], options.origin[1], options.origin[2])
  }

  dispose() {
    if (this.particleDisposed) {
      return
    }

    this.particleDisposed = true

    super.dispose()
  }
}