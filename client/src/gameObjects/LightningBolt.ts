import * as THREE from 'three'
import { GameObject } from '../GameObject'

export interface LightningBoltOptions {
  start: THREE.Vector3Tuple
  end: THREE.Vector3Tuple
  color?: string
  accent?: string
  lifetime?: number
}

function randomJitter(seed: number, magnitude: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return (x - Math.floor(x) - 0.5) * 2 * magnitude
}

export class LightningBolt extends GameObject {
  private readonly mainGeometry: THREE.BufferGeometry
  private readonly forkGeometry: THREE.BufferGeometry
  private readonly mainLine: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>
  private readonly glowLine: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>
  private readonly forkLine: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>
  private readonly mainPositions: Float32Array
  private readonly forkPositions: Float32Array
  private readonly basePoints: THREE.Vector3[]
  private readonly forkPoints: THREE.Vector3[]
  private readonly segmentCount: number
  private readonly forkStartIndex: number
  private readonly lifetime: number
  private elapsed = 0

  constructor(options: LightningBoltOptions) {
    super('LightningBolt')

    const start = new THREE.Vector3(options.start[0], options.start[1], options.start[2])
    const end = new THREE.Vector3(options.end[0], options.end[1], options.end[2])
    this.segmentCount = 12
    this.forkStartIndex = 7
    this.lifetime = Math.max(0.08, options.lifetime ?? 0.16)

    this.basePoints = []
    for (let index = 0; index <= this.segmentCount; index += 1) {
      const progress = index / this.segmentCount
      const point = new THREE.Vector3().lerpVectors(start, end, progress)
      const arcHeight = Math.sin(progress * Math.PI) * 0.24
      point.y += arcHeight
      const jitterMagnitude = 0.06 + progress * 0.18
      point.x += randomJitter(index + 1, jitterMagnitude)
      point.z += randomJitter(index + 7, jitterMagnitude)
      point.y += randomJitter(index + 13, 0.03 + progress * 0.06)
      this.basePoints.push(point)
    }

    this.forkPoints = []
    const forkStartPoint = this.basePoints[this.forkStartIndex] ?? start.clone()
    const forkEndPoint = end.clone()
    forkEndPoint.x += randomJitter(77, 0.28)
    forkEndPoint.y += 0.12 + randomJitter(91, 0.08)
    forkEndPoint.z += randomJitter(103, 0.28)

    const forkSegments = 5
    for (let index = 0; index <= forkSegments; index += 1) {
      const progress = index / forkSegments
      const point = new THREE.Vector3().lerpVectors(forkStartPoint, forkEndPoint, progress)
      point.x += randomJitter(index + 41, 0.09 + progress * 0.08)
      point.y += Math.sin(progress * Math.PI) * 0.12
      point.z += randomJitter(index + 59, 0.09 + progress * 0.08)
      this.forkPoints.push(point)
    }

    this.mainPositions = new Float32Array((this.segmentCount + 1) * 3)
    this.forkPositions = new Float32Array((forkSegments + 1) * 3)
    this.mainGeometry = new THREE.BufferGeometry()
    this.mainGeometry.setAttribute('position', new THREE.BufferAttribute(this.mainPositions, 3))
    this.forkGeometry = new THREE.BufferGeometry()
    this.forkGeometry.setAttribute('position', new THREE.BufferAttribute(this.forkPositions, 3))

    const glowMaterial = new THREE.LineBasicMaterial({
      color: options.accent ?? '#93c5fd',
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const coreMaterial = new THREE.LineBasicMaterial({
      color: options.color ?? '#dbeafe',
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.glowLine = this.addObject(new THREE.Line(this.mainGeometry, glowMaterial))
    this.mainLine = this.addObject(new THREE.Line(this.mainGeometry, coreMaterial))
    this.forkLine = this.addObject(
      new THREE.Line(
        this.forkGeometry,
        new THREE.LineBasicMaterial({
          color: options.accent ?? '#22d3ee',
          transparent: true,
          opacity: 0.72,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    )

    this.updatePositions(0)

    this.update = (delta, elapsed) => {
      this.elapsed += delta
      this.updatePositions(elapsed)

      const fade = Math.max(0, 1 - this.elapsed / this.lifetime)
      ;(this.glowLine.material as THREE.LineBasicMaterial).opacity = 0.18 + fade * 0.22
      ;(this.mainLine.material as THREE.LineBasicMaterial).opacity = 0.52 + fade * 0.48
      ;(this.forkLine.material as THREE.LineBasicMaterial).opacity = 0.22 + fade * 0.5

      if (this.elapsed >= this.lifetime) {
        this.dispose()
      }
    }

    this.group.position.set(0, 0, 0)
  }

  private updatePositions(elapsed: number) {
    const strength = Math.max(0, 1 - this.elapsed / this.lifetime)
    const mainSway = 0.1 * strength
    for (let index = 0; index < this.basePoints.length; index += 1) {
      const point = this.basePoints[index]
      const offset = index * 3
      const segmentProgress = index / this.segmentCount
      const zigZag = Math.sin(elapsed * 42 + index * 2.15) * (0.05 + segmentProgress * 0.11) * strength
      const zigZagY = Math.cos(elapsed * 36 + index * 1.6) * (0.02 + segmentProgress * 0.05) * strength
      this.mainPositions[offset] = point.x + zigZag
      this.mainPositions[offset + 1] = point.y + zigZagY
      this.mainPositions[offset + 2] = point.z - zigZag * 0.78
    }

    for (let index = 0; index < this.forkPoints.length; index += 1) {
      const point = this.forkPoints[index]
      const offset = index * 3
      const forkProgress = index / Math.max(1, this.forkPoints.length - 1)
      const forkZigZag = Math.sin(elapsed * 45 + index * 2.8) * (0.03 + forkProgress * 0.06) * strength
      this.forkPositions[offset] = point.x + forkZigZag + mainSway * 0.25
      this.forkPositions[offset + 1] = point.y + Math.sin(elapsed * 38 + index) * 0.012 * strength
      this.forkPositions[offset + 2] = point.z - forkZigZag * 0.62
    }

    const mainAttribute = this.mainGeometry.getAttribute('position') as THREE.BufferAttribute
    mainAttribute.needsUpdate = true

    const forkAttribute = this.forkGeometry.getAttribute('position') as THREE.BufferAttribute
    forkAttribute.needsUpdate = true
  }
}