import * as THREE from 'three'
import { addRankPlanetToBackdrop } from './.SpacePlanets'
import { addRankSunToBackdrop } from './SpaceSun'

interface BackdropMotionItem {
  object: THREE.Object3D
  velocityX: number
  velocityY: number
  spin: number
  minX: number
  maxX: number
  minY: number
  maxY: number
  opacityMaterial?: THREE.SpriteMaterial | THREE.MeshBasicMaterial | THREE.LineBasicMaterial | THREE.PointsMaterial
  baseOpacity?: number
  twinkleAmplitude?: number
  twinkleSpeed?: number
  twinklePhase?: number
}

export interface SpaceBackdropRuntime {
  rank: number
  group: THREE.Group
  motionItems: BackdropMotionItem[]
  textures: THREE.Texture[]
  motionSpeedMultiplier: number
  boostPulseMaterial: THREE.SpriteMaterial
  boostPulseSprite: THREE.Sprite
}

function createSeededRandom(seed: number): () => number {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const RANK_ACCENT_HEX = [
  0x7dd3fc,
  0x38bdf8,
  0x34d399,
  0x22c55e,
  0x84cc16,
  0xfacc15,
  0xfbbf24,
  0xfb923c,
  0xf97316,
  0xef4444,
  0xf43f5e,
  0xec4899,
  0xd946ef,
  0xa855f7,
  0x8b5cf6,
  0x6366f1,
  0x3b82f6,
  0x06b6d4,
  0x14b8a6,
  0xf8fafc,
]

function getRankAccentColor(rank: number): THREE.Color {
  const index = Math.max(0, Math.min(RANK_ACCENT_HEX.length - 1, Math.floor(rank) - 1))
  return new THREE.Color(RANK_ACCENT_HEX[index] ?? RANK_ACCENT_HEX[0])
}

function colorToRgba(color: THREE.Color, alpha: number): string {
  const r = Math.round(THREE.MathUtils.clamp(color.r, 0, 1) * 255)
  const g = Math.round(THREE.MathUtils.clamp(color.g, 0, 1) * 255)
  const b = Math.round(THREE.MathUtils.clamp(color.b, 0, 1) * 255)
  const a = THREE.MathUtils.clamp(alpha, 0, 1)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function colorToHex(color: THREE.Color): string {
  return `#${color.getHexString()}`
}

function createRadialSpriteTexture(size: number, innerColor: string, outerColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create radial sprite texture context')
  }

  const gradient = context.createRadialGradient(size * 0.5, size * 0.5, size * 0.1, size * 0.5, size * 0.5, size * 0.5)
  gradient.addColorStop(0, innerColor)
  gradient.addColorStop(1, outerColor)
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createTinyDotTexture(size: number, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create tiny dot texture context')
  }

  const center = size * 0.5
  const gradient = context.createRadialGradient(center, center, size * 0.06, center, center, size * 0.5)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createAsteroidSpriteTexture(
  size: number,
  seed: number,
  colors: { base: string; highlight: string; shadow: string },
): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create asteroid sprite texture context')
  }

  const center = size * 0.5
  const radius = size * 0.39
  const points = 10 + Math.floor(random() * 5)

  context.save()
  context.translate(center, center)
  context.beginPath()
  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2
    const offset = radius * (0.76 + random() * 0.32)
    const x = Math.cos(angle) * offset
    const y = Math.sin(angle) * offset
    if (index === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  }
  context.closePath()

  const fillGradient = context.createRadialGradient(-radius * 0.18, -radius * 0.14, radius * 0.15, 0, 0, radius)
  fillGradient.addColorStop(0, colors.highlight)
  fillGradient.addColorStop(0.62, colors.base)
  fillGradient.addColorStop(0.88, colors.shadow + '00')
  fillGradient.addColorStop(1, colors.shadow + '00')
  context.fillStyle = fillGradient
  context.fill()

  context.lineWidth = Math.max(1, size * 0.016)
  context.strokeStyle = 'rgba(203, 213, 225, 0.2)'
  context.stroke()

  const craterCount = 1 + Math.floor(random() * 4)
  for (let index = 0; index < craterCount; index += 1) {
    const craterRadius = radius * (0.09 + random() * 0.11)
    const craterX = (random() - 0.5) * radius * 1.1
    const craterY = (random() - 0.5) * radius * 1.1
    context.beginPath()
    context.arc(craterX, craterY, craterRadius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(15, 23, 42, 0.22)'
    context.fill()
  }

  context.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createShardSpriteTexture(size: number, seed: number, color: string): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create shard sprite texture context')
  }

  const width = size
  const height = size
  const centerX = width * 0.5
  const centerY = height * 0.5
  const spanX = width * (0.34 + random() * 0.16)
  const spanY = height * (0.12 + random() * 0.08)

  context.save()
  context.translate(centerX, centerY)
  context.rotate((random() - 0.5) * 0.7)
  context.beginPath()
  context.moveTo(-spanX, -spanY * 0.6)
  context.lineTo(spanX * 0.82, -spanY)
  context.lineTo(spanX, spanY * 0.4)
  context.lineTo(-spanX * 0.74, spanY)
  context.closePath()
  context.fillStyle = color
  context.fill()
  context.strokeStyle = 'rgba(226, 232, 240, 0.44)'
  context.lineWidth = Math.max(1, size * 0.02)
  context.stroke()

  context.beginPath()
  context.moveTo(-spanX * 0.45, 0)
  context.lineTo(spanX * 0.64, -spanY * 0.2)
  context.strokeStyle = 'rgba(248, 250, 252, 0.38)'
  context.lineWidth = Math.max(1, size * 0.013)
  context.stroke()
  context.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createCometSpriteTexture(size: number, seed: number, coreColor: string, tailColor: string): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create comet sprite texture context')
  }

  const headX = size * (0.64 + random() * 0.07)
  const headY = size * 0.5
  const tailLength = size * (0.58 + random() * 0.16)

  const tailGradient = context.createLinearGradient(headX - tailLength, headY, headX, headY)
  tailGradient.addColorStop(0, 'rgba(15, 23, 42, 0)')
  tailGradient.addColorStop(0.45, tailColor)
  tailGradient.addColorStop(1, coreColor)
  context.fillStyle = tailGradient
  context.beginPath()
  context.moveTo(headX - tailLength, headY)
  context.lineTo(headX, headY - size * 0.12)
  context.lineTo(headX, headY + size * 0.12)
  context.closePath()
  context.fill()

  context.beginPath()
  context.arc(headX, headY, size * 0.12, 0, Math.PI * 2)
  context.fillStyle = coreColor
  context.fill()

  context.beginPath()
  context.arc(headX + size * 0.01, headY - size * 0.02, size * 0.05, 0, Math.PI * 2)
  context.fillStyle = 'rgba(248, 250, 252, 0.75)'
  context.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createRingSpriteTexture(size: number, color: string, strokeColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create ring sprite texture context')
  }

  const center = size * 0.5
  const outerRadius = size * 0.42
  const innerRadius = size * 0.24

  context.beginPath()
  context.arc(center, center, outerRadius, 0, Math.PI * 2)
  context.arc(center, center, innerRadius, 0, Math.PI * 2, true)
  context.closePath()
  context.fillStyle = color
  context.fill()

  context.beginPath()
  context.arc(center, center, outerRadius, 0, Math.PI * 2)
  context.strokeStyle = strokeColor
  context.lineWidth = Math.max(1, size * 0.02)
  context.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createStarDotTexture(size: number, centerColor: string, midColor: string, edgeColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create star dot texture context')
  }

  const center = size * 0.5
  const gradient = context.createRadialGradient(center, center, size * 0.04, center, center, size * 0.5)
  gradient.addColorStop(0, centerColor)
  gradient.addColorStop(0.48, midColor)
  gradient.addColorStop(1, edgeColor)
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createSatelliteSpriteTexture(size: number, bodyColor: string, panelColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create satellite sprite texture context')
  }

  const centerX = size * 0.5
  const centerY = size * 0.5
  const bodyW = size * 0.22
  const bodyH = size * 0.18
  const panelW = size * 0.24
  const panelH = size * 0.1

  context.fillStyle = bodyColor
  context.fillRect(centerX - bodyW * 0.5, centerY - bodyH * 0.5, bodyW, bodyH)

  context.fillStyle = panelColor
  context.fillRect(centerX - bodyW * 0.5 - panelW, centerY - panelH * 0.5, panelW, panelH)
  context.fillRect(centerX + bodyW * 0.5, centerY - panelH * 0.5, panelW, panelH)

  context.strokeStyle = 'rgba(226, 232, 240, 0.55)'
  context.lineWidth = Math.max(1, size * 0.014)
  context.strokeRect(centerX - bodyW * 0.5, centerY - bodyH * 0.5, bodyW, bodyH)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createNebulaCloudSpriteTexture(
  size: number,
  seed: number,
  coreColor: string,
  mistColor: string,
  shadowColor: string,
): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create nebula cloud sprite texture context')
  }

  const center = size * 0.5
  const baseGradient = context.createRadialGradient(center, center, size * 0.08, center, center, size * 0.5)
  baseGradient.addColorStop(0, coreColor)
  baseGradient.addColorStop(0.6, mistColor)
  baseGradient.addColorStop(1, shadowColor)
  context.fillStyle = baseGradient
  context.fillRect(0, 0, size, size)

  context.globalCompositeOperation = 'screen'
  const puffCount = 7 + Math.floor(random() * 5)
  for (let index = 0; index < puffCount; index += 1) {
    const puffRadius = size * (0.1 + random() * 0.18)
    const x = size * (0.16 + random() * 0.68)
    const y = size * (0.16 + random() * 0.68)
    const puffGradient = context.createRadialGradient(x, y, puffRadius * 0.08, x, y, puffRadius)
    puffGradient.addColorStop(0, coreColor)
    puffGradient.addColorStop(0.65, mistColor)
    puffGradient.addColorStop(1, 'rgba(15, 23, 42, 0)')
    context.fillStyle = puffGradient
    context.beginPath()
    context.arc(x, y, puffRadius, 0, Math.PI * 2)
    context.fill()
  }

  context.globalCompositeOperation = 'source-over'
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createAuraSigilTexture(
  size: number,
  seed: number,
  coreColor: string,
  ringColor: string,
  glyphColor: string,
): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create aura sigil texture context')
  }

  const center = size * 0.5
  const baseGradient = context.createRadialGradient(center, center, size * 0.06, center, center, size * 0.5)
  baseGradient.addColorStop(0, coreColor)
  baseGradient.addColorStop(0.45, ringColor)
  baseGradient.addColorStop(1, 'rgba(15, 23, 42, 0)')
  context.fillStyle = baseGradient
  context.fillRect(0, 0, size, size)

  context.strokeStyle = ringColor
  context.lineWidth = Math.max(1, size * 0.02)
  context.beginPath()
  context.arc(center, center, size * 0.31, 0, Math.PI * 2)
  context.stroke()

  context.strokeStyle = glyphColor
  context.lineWidth = Math.max(1, size * 0.014)
  const runeCount = 0 + Math.floor(random() * 5)
  for (let index = 0; index < runeCount; index += 1) {
    const angle = (index / runeCount) * Math.PI * 2 + random() * 0.14
    const inner = size * (0.16 + random() * 0.05)
    const outer = size * (0.34 + random() * 0.04)
    context.beginPath()
    context.moveTo(center + Math.cos(angle) * inner, center + Math.sin(angle) * inner)
    context.lineTo(center + Math.cos(angle) * outer, center + Math.sin(angle) * outer)
    context.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createAuraEchoFieldTexture(size: number, seed: number, ringColor: string, pulseColor: string): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create aura echo field texture context')
  }

  const center = size * 0.5
  const maxRadius = size * 0.46
  const ringCount = 3 + Math.floor(random() * 3)
  for (let index = 0; index < ringCount; index += 1) {
    const t = (index + 1) / (ringCount + 1)
    const radius = maxRadius * t
    context.beginPath()
    context.arc(center, center, radius, 0, Math.PI * 2)
    context.lineWidth = Math.max(1, size * (0.012 + random() * 0.01))
    context.strokeStyle = index % 2 === 0 ? ringColor : pulseColor
    context.stroke()
  }

  const glowGradient = context.createRadialGradient(center, center, size * 0.04, center, center, size * 0.5)
  glowGradient.addColorStop(0, pulseColor)
  glowGradient.addColorStop(0.58, ringColor)
  glowGradient.addColorStop(1, 'rgba(15, 23, 42, 0)')
  context.globalCompositeOperation = 'screen'
  context.fillStyle = glowGradient
  context.fillRect(0, 0, size, size)
  context.globalCompositeOperation = 'source-over'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createSparkParticleTexture(size: number, seed: number, coreColor: string, flareColor: string): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create spark particle texture context')
  }

  const center = size * 0.5
  const spikeCount = 6 + Math.floor(random() * 5)
  context.strokeStyle = flareColor
  context.lineWidth = Math.max(1, size * 0.05)
  for (let index = 0; index < spikeCount; index += 1) {
    const angle = (index / spikeCount) * Math.PI * 2 + random() * 0.2
    const radius = size * (0.24 + random() * 0.18)
    context.beginPath()
    context.moveTo(center, center)
    context.lineTo(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius)
    context.stroke()
  }

  const gradient = context.createRadialGradient(center, center, size * 0.02, center, center, size * 0.44)
  gradient.addColorStop(0, coreColor)
  gradient.addColorStop(0.5, flareColor)
  gradient.addColorStop(1, 'rgba(15, 23, 42, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createIonOrbSpriteTexture(
  size: number,
  seed: number,
  coreColor: string,
  shellColor: string,
  arcColor: string,
): THREE.CanvasTexture {
  const random = createSeededRandom(seed)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create ion orb sprite texture context')
  }

  const center = size * 0.5
  const baseGradient = context.createRadialGradient(center, center, size * 0.05, center, center, size * 0.5)
  baseGradient.addColorStop(0, coreColor)
  baseGradient.addColorStop(0.52, shellColor)
  baseGradient.addColorStop(1, 'rgba(15, 23, 42, 0)')
  context.fillStyle = baseGradient
  context.fillRect(0, 0, size, size)

  context.strokeStyle = arcColor
  context.lineWidth = Math.max(1, size * 0.03)
  const arcCount = 3 + Math.floor(random() * 3)
  for (let index = 0; index < arcCount; index += 1) {
    const radius = size * (0.18 + index * 0.08)
    const start = random() * Math.PI * 2
    const end = start + Math.PI * (0.6 + random() * 0.45)
    context.beginPath()
    context.arc(center, center, radius, start, end)
    context.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function createSpaceBackdrop(rankNumber: number): SpaceBackdropRuntime {
  const rank = Math.max(1, Math.floor(rankNumber))
  const random = createSeededRandom(9049 + rank * 97)
  const group = new THREE.Group()
  group.name = 'SpaceBackdrop'
  const motionItems: BackdropMotionItem[] = []
  const textures: THREE.Texture[] = []

  const rankAccent = getRankAccentColor(rank)
  const rankAccentBright = rankAccent.clone().lerp(new THREE.Color(0xffffff), 0.42)
  const rankAccentSoft = rankAccent.clone().lerp(new THREE.Color(0xffffff), 0.22)
  const rankAccentDeep = rankAccent.clone().lerp(new THREE.Color(0x020617), 0.74)
  const rankAccentMid = rankAccent.clone().lerp(new THREE.Color(0x0f172a), 0.46)
  const rankAccentAlt = rankAccent.clone().offsetHSL(0.035, 0.06, 0.02)
  const rankAccentAltDeep = rankAccentAlt.clone().lerp(new THREE.Color(0x020617), 0.7)

  const farStarTexture = createRadialSpriteTexture(
    64,
    colorToRgba(rankAccentBright, 0.95),
    colorToRgba(rankAccent, 0),
  )
  const nearStarTexture = createRadialSpriteTexture(
    64,
    colorToRgba(rankAccentBright, 1),
    colorToRgba(rankAccentSoft, 0),
  )
  const tinyDotTexture = createTinyDotTexture(
    32,
    colorToRgba(rankAccentBright, 0.92),
  )
  const sunTexture = createRadialSpriteTexture(
    256,
    colorToRgba(rankAccentBright, 0.45),
    colorToRgba(rankAccentMid, 0),
  )
  const planetTexture = createRadialSpriteTexture(
    256,
    colorToRgba(rankAccentSoft, 0.22),
    colorToRgba(rankAccentDeep, 0),
  )
  const debrisHaloTexture = createRadialSpriteTexture(
    96,
    colorToRgba(rankAccentBright, 0.86),
    colorToRgba(rankAccent, 0),
  )
  textures.push(farStarTexture, nearStarTexture, tinyDotTexture, sunTexture, planetTexture, debrisHaloTexture)

  const addDebrisHalo = (target: THREE.Sprite, opts?: { scaleMultiplier?: number; opacity?: number }) => {
    const scaleMultiplier = (opts?.scaleMultiplier ?? 1.9) * 0.75
    const opacity = (opts?.opacity ?? 0.16) * 0.5
    const haloMaterial = new THREE.SpriteMaterial({
      map: debrisHaloTexture,
      color: rankAccentSoft,
      transparent: true,
      opacity,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    })
    const halo = new THREE.Sprite(haloMaterial)
    const haloSize = Math.max(target.scale.x, target.scale.y) * scaleMultiplier
    halo.scale.set(haloSize, haloSize, 1)
    halo.position.set(0, 0, -0.001)
    target.add(halo)
  }

  const viewportAspect = Math.max(1, window.innerWidth / Math.max(1, window.innerHeight))
  const cameraFovRadians = THREE.MathUtils.degToRad(60)
  const cameraZ = 8.8
  const farBackdropZ = -26
  const backdropDepthFromCamera = cameraZ - farBackdropZ
  const frustumHalfHeight = Math.tan(cameraFovRadians * 0.5) * backdropDepthFromCamera
  const frustumHalfWidth = frustumHalfHeight * viewportAspect
  const backdropOverscan = 1.12
  const xHalfSpan = frustumHalfWidth * backdropOverscan * 2
  const yHalfSpan = frustumHalfHeight * backdropOverscan * 1.5
  const horizontalSpanMultiplier = Math.max(1, xHalfSpan / 15)
  const verticalSpanMultiplier = Math.max(1, yHalfSpan / 8.2)
  const motionSpeedMultiplier = (2.25 + Math.min(1.35, rank * 0.06)) * 2
  const xMin = -xHalfSpan
  const xMax = xHalfSpan
  const yMin = -yHalfSpan
  const yMax = yHalfSpan

  addRankPlanetToBackdrop({
    rank,
    group,
    textures,
    xMin,
    xMax,
    yMin,
    yMax,
  })

  addRankSunToBackdrop({
    rank,
    group,
    textures,
    xMin,
    xMax,
    yMin,
    yMax,
  })

  const enabledTypeCount = Math.max(1, Math.min(15, rank))
  const isTypeEnabled = (typeIndex: number) => enabledTypeCount >= typeIndex

  const addMovingSprite = (opts: {
    texture: THREE.Texture
    x: number
    y: number
    z: number
    scale: number
    opacity: number
    velocityX: number
    velocityY?: number
    spin?: number
    twinkleAmplitude?: number
    twinkleSpeed?: number
  }) => {
    const material = new THREE.SpriteMaterial({
      map: opts.texture,
      color: 0xffffff,
      transparent: true,
      opacity: opts.opacity,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    })
    const sprite = new THREE.Sprite(material)
    sprite.position.set(opts.x, opts.y, opts.z)
    sprite.scale.set(opts.scale, opts.scale, 1)
    group.add(sprite)

    motionItems.push({
      object: sprite,
      velocityX: opts.velocityX,
      velocityY: opts.velocityY ?? 0,
      spin: opts.spin ?? 0,
      minX: xMin,
      maxX: xMax,
      minY: yMin,
      maxY: yMax,
      opacityMaterial: material,
      baseOpacity: opts.opacity,
      twinkleAmplitude: opts.twinkleAmplitude,
      twinkleSpeed: opts.twinkleSpeed,
      twinklePhase: random() * Math.PI * 2,
    })
  }

  // Type 0: tiny right-to-left drift dots shown on every rank
  const driftDotCount = rank == 1 ? 1000 : 1000
  for (let index = 0; index < driftDotCount; index += 1) {
    const driftMaterial = new THREE.SpriteMaterial({
      map: tinyDotTexture,
      color: rank === 1 ? rankAccentBright : rankAccentSoft,
      transparent: true,
      opacity: rank === 1 ? 0.9 : 0.16 + random() * 0.14,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const driftDot = new THREE.Sprite(driftMaterial)
    const dotSize = 0.028 + random() * 0.06
    driftDot.position.set(
      xMin + random() * (xMax - xMin),
      yMin + random() * (yMax - yMin),
      -22 - random() * 6,
    )
    driftDot.scale.set(dotSize, dotSize, 1)
    group.add(driftDot)

    motionItems.push({
      object: driftDot,
      velocityX: -0.04 - random() * 0.18,
      velocityY: (random() - 0.5) * 0.012,
      spin: -0.02 + random() * 0.04,
      minX: xMin - 2,
      maxX: xMax + 2,
      minY: yMin - 1.5,
      maxY: yMax + 1.5,
      opacityMaterial: driftMaterial,
      baseOpacity: driftMaterial.opacity,
      twinkleAmplitude: 0.06,
      twinkleSpeed: 0.9 + random() * 1.2,
      twinklePhase: random() * Math.PI * 2,
    })
  }

  // Type 1: far star field
  if (isTypeEnabled(1)) {
    const farStarCount = 1000
    for (let index = 0; index < farStarCount; index += 1) {
      addMovingSprite({
        texture: farStarTexture,
        x: xMin + random() * (xMax - xMin),
        y: yMin + random() * (yMax - yMin),
        z: -20 - random() * 6,
        scale: 0.3 + random() * 0.4,
        opacity: 0.25 + random() * 0.35,
        velocityX: -0.08 - random() * 0.2,
        velocityY: (random() - 0.5) * 0.02,
        twinkleAmplitude: 0.15,
        twinkleSpeed: 0.7 + random() * 0.5,
      })
    }
  }

  // Type 2: brighter near stars
  if (isTypeEnabled(2)) {
    const nearStarCount = enabledTypeCount == 2 ? 750 : 500
    for (let index = 0; index < nearStarCount; index += 1) {
      addMovingSprite({
        texture: nearStarTexture,
        x: xMin + random() * (xMax - xMin),
        y: yMin + random() * (yMax - yMin),
        z: -15.5 - random() * 4,
        scale: 0.11 + random() * 0.39,
        opacity: 0.38 + random() * 0.36,
        velocityX: -0.2 - random() * 0.16,
        velocityY: (random() - 0.5) * 0.03,
        twinkleAmplitude: 0.2,
        twinkleSpeed: 1 + random() * 0.9,
      })
    }
  }

  // Type 3: traversal streak lines
  if (isTypeEnabled(3)) {
    let streakCount = enabledTypeCount == 3 ? 300 : 200
    if (enabledTypeCount == 9)
        streakCount = 800
    for (let index = 0; index < streakCount; index += 1) {
      const width = 0.8 + random() * 1.2
      const geometry = new THREE.PlaneGeometry(width, 0.04 + random() * 0.025)
      const material = new THREE.MeshBasicMaterial({
        color: rankAccentSoft,
        transparent: true,
        opacity: 0.22 + random() * 0.24,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -12.8 - random() * 2.8)
      mesh.rotation.z = -0.04 + random() * 0.08
      group.add(mesh)

      motionItems.push({
        object: mesh,
        velocityX: -0.1 - random() * 0.4,
        velocityY: (random() - 0.5) * 0.05,
        spin: 0,
        minX: xMin,
        maxX: xMax,
        minY: yMin,
        maxY: yMax,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.06,
        twinkleSpeed: 0.8 + random() * 0.4,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 4: asteroid sprites
  if (isTypeEnabled(4)) {
    const asteroidTextureCatalog: THREE.Texture[] = []
    const asteroidPalettes = [
      {
        base: colorToHex(rankAccent.clone().lerp(new THREE.Color(0x64748b), 0.45)),
        highlight: colorToHex(rankAccentBright),
        shadow: colorToHex(rankAccentDeep),
      },
      {
        base: colorToHex(rankAccentAlt.clone().lerp(new THREE.Color(0x6b7280), 0.4)),
        highlight: colorToHex(rankAccentSoft.clone().lerp(new THREE.Color(0xffffff), 0.18)),
        shadow: colorToHex(rankAccentAltDeep),
      },
      {
        base: colorToHex(rankAccent.clone().offsetHSL(-0.03, 0.02, -0.05).lerp(new THREE.Color(0x4b5563), 0.38)),
        highlight: colorToHex(rankAccent.clone().lerp(new THREE.Color(0xffffff), 0.35)),
        shadow: colorToHex(rankAccent.clone().lerp(new THREE.Color(0x020617), 0.78)),
      },
      {
        base: colorToHex(rankAccentAlt.clone().offsetHSL(0.02, 0.01, 0.02).lerp(new THREE.Color(0x5b6478), 0.44)),
        highlight: colorToHex(rankAccentAlt.clone().lerp(new THREE.Color(0xffffff), 0.34)),
        shadow: colorToHex(rankAccentAlt.clone().lerp(new THREE.Color(0x020617), 0.74)),
      },
    ]
    const asteroidTextureCount = 8 + Math.min(10, Math.floor(rank / 2))
    for (let index = 0; index < asteroidTextureCount; index += 1) {
      const palette = asteroidPalettes[index % asteroidPalettes.length]
      const texture = createAsteroidSpriteTexture(96, 3000 + rank * 131 + index * 17, palette)
      asteroidTextureCatalog.push(texture)
      textures.push(texture)
    }

    const asteroidCount = enabledTypeCount == 4 ? 60 : 30
    for (let index = 0; index < asteroidCount; index += 1) {
      const texture = asteroidTextureCatalog[Math.floor(random() * asteroidTextureCatalog.length)]
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.34 + random() * 0.36,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      const sprite = new THREE.Sprite(material)
      const size = 0.38 + random() * 3
      sprite.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -10.9 - random() * 2.5)
      sprite.scale.set(size * (0.82 + random() * 0.45), size, 1)
      addDebrisHalo(sprite, { scaleMultiplier: 1.8, opacity: 0.14 + random() * 0.05 })
      group.add(sprite)

      motionItems.push({
        object: sprite,
        velocityX: -0.08 - random() * 0.2,
        velocityY: (random() - 0.5) * 0.04,
        spin: -0.22 + random() * 0.44,
        minX: xMin,
        maxX: xMax,
        minY: yMin,
        maxY: yMax,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.06,
        twinkleSpeed: 0.45 + random() * 0.35,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 5: debris shards
  if (isTypeEnabled(5)) {
    const shardTextureCatalog: THREE.Texture[] = []
    const shardColors = [
      colorToRgba(rankAccentBright, 0.88),
      colorToRgba(rankAccentSoft, 0.82),
      colorToRgba(rankAccentAlt, 0.74),
    ]
    const shardTextureCount = 20
    for (let index = 0; index < shardTextureCount; index += 1) {
      const texture = createShardSpriteTexture(96, 6000 + rank * 149 + index * 13, shardColors[index % shardColors.length])
      shardTextureCatalog.push(texture)
      textures.push(texture)
    }

    const debrisShardCount = 20
    for (let index = 0; index < debrisShardCount; index += 1) {
      const texture = shardTextureCatalog[Math.floor(random() * shardTextureCatalog.length)]
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.3 + random() * 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const sprite = new THREE.Sprite(material)
      const width = 4 + random() * 1.28
      const height = 0.1 + random() * 0.54
      sprite.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -11.6 - random() * 2.8,
      )
      sprite.scale.set(width, height, 1)
      sprite.material.rotation = random() * Math.PI
      addDebrisHalo(sprite, { scaleMultiplier: 2.1, opacity: 0.12 + random() * 0.05 })
      group.add(sprite)

      motionItems.push({
        object: sprite,
        velocityX: -0.22 - random() * 0.26,
        velocityY: (random() - 0.5) * 0.09,
        spin: -0.8 + random() * 1.6,
        minX: xMin - 1,
        maxX: xMax + 1,
        minY: yMin - 1,
        maxY: yMax + 1,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.08,
        twinkleSpeed: 0.8 + random() * 0.6,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 6: major celestial bodies
  if (isTypeEnabled(6)) {
    let count = 20
    for (let i = 0; i < count; i += 1) {
        const sun = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: sunTexture,
            color: rankAccentBright,
            transparent: true,
            opacity: 0.22 + Math.min(0.2, rank * 0.01),
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
        )
        sun.position.set(-422 * (random() - 0.5) * 0.4, 10 -100 * (random() - 0.5) * 0.4, -19.5 + (random() - 0.5) * 0.4)
        //sun.position.set(10.4, 6.6, -21)
        let sunSize = (10 +random() * 0)
        sun.scale.set(sunSize, sunSize * 0.5, 1)
        group.add(sun)

        const planet = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: planetTexture,
            color: rankAccent,
            transparent: true,
            opacity: 0.14 + Math.min(0.12, rank * 0.006),
            depthWrite: false,
            blending: THREE.NormalBlending,
        }),
        )
        // randomize this position a bit so that the planet doesn't always appear in the same spot
        planet.position.set(-820 * (random() - 0.5) * 0.4, -49 * (random() - 0.5) * 0.4, -19.5 + (random() - 0.5) * 0.4)
        planet.scale.set(7.8 + Math.min(2.6, rank * 0.14), 0.8 + Math.min(2.6, rank * 0.14), 1)
        group.add(planet)

        motionItems.push(
        {
            object: sun,
            velocityX: -0.015,
            velocityY: 0.005,
            spin: 0.08,
            minX: xMin - 2,
            maxX: xMax + 2,
            minY: yMin - 2,
            maxY: yMax + 2,
            opacityMaterial: sun.material,
            baseOpacity: (sun.material as THREE.SpriteMaterial).opacity,
            twinkleAmplitude: 0.04,
            twinkleSpeed: 0.35,
            twinklePhase: random() * Math.PI * 2,
        },
        {
            object: planet,
            velocityX: -0.01,
            velocityY: -0.004,
            spin: -0.04,
            minX: xMin - 2,
            maxX: xMax + 2,
            minY: yMin - 2,
            maxY: yMax + 2,
            opacityMaterial: planet.material,
            baseOpacity: (planet.material as THREE.SpriteMaterial).opacity,
            twinkleAmplitude: 0.02,
            twinkleSpeed: 0.25,
            twinklePhase: random() * Math.PI * 2,
        },
        )
    }
  }

  // Type 7: nebula wisps
  if (isTypeEnabled(7)) {
    const nebulaCatalog: THREE.Texture[] = []
    for (let index = 0; index < 6; index += 1) {
      const texture = createNebulaCloudSpriteTexture(
        256,
        7200 + rank * 73 + index * 19,
        colorToRgba(rankAccentSoft.clone().lerp(new THREE.Color(0xffffff), 0.18), 0.3),
        colorToRgba(index % 2 === 0 ? rankAccentSoft : rankAccentAlt, 0.22),
        colorToRgba(rankAccentDeep, 0),
      )
      nebulaCatalog.push(texture)
      textures.push(texture)
    }

    const nebulaCount = 100
    const nebulaOffsets = Array.from({ length: nebulaCount }, (_, index) => ({
      x: xMin + random() * (xMax - xMin),
      y: yMin + random() * (yMax - yMin),
      z: -22.4 + random() * 1.2,
      size: 1 + random() * 5,
      opacity: 0.2 + random() * 0.2,
      vx: -0.01 - random() * random() * random() * 5,
      vy: (random() - 0.5) * 0.01,
      color: index % 2 === 0 ? rankAccent.getHex() : rankAccentSoft.getHex(),
    }))
    for (let index = 0; index < nebulaOffsets.length; index += 1) {
      const nebula = nebulaOffsets[index]
      const material = new THREE.SpriteMaterial({
        map: nebulaCatalog[Math.floor(random() * nebulaCatalog.length)],
        color: nebula.color,
        transparent: true,
        opacity: nebula.opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(nebula.x, nebula.y, nebula.z)
      sprite.scale.set(nebula.size, nebula.size, 1)
      group.add(sprite)

      motionItems.push({
        object: sprite,
        velocityX: nebula.vx,
        velocityY: nebula.vy,
        spin: 0.02 + index * 0.01,
        minX: xMin - 3,
        maxX: xMax + 3,
        minY: yMin - 3,
        maxY: yMax + 3,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.015,
        twinkleSpeed: 0.2 + index * 0.08,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  const auraCoreCatalog: THREE.Texture[] = []
  const auraEchoCatalog: THREE.Texture[] = []
  const auraParticleCatalog: THREE.Texture[] = []

  if (isTypeEnabled(8) || isTypeEnabled(9) || isTypeEnabled(10)) {
    for (let index = 0; index < 3; index += 1) {
      const texture = createAuraSigilTexture(
        128,
        8200 + rank * 89 + index * 23,
        colorToRgba(rankAccentBright, 0.82),
        colorToRgba(rankAccentSoft, 0.34),
        colorToRgba(index % 2 === 0 ? rankAccentSoft : rankAccentAlt, 0.44),
      )
      auraCoreCatalog.push(texture)
      textures.push(texture)
    }
  }
  if (isTypeEnabled(9) || isTypeEnabled(10)) {
    for (let index = 0; index < 4; index += 1) {
      const texture = createAuraEchoFieldTexture(
        96,
        9100 + rank * 97 + index * 31,
        colorToRgba(rankAccentSoft, 0.46),
        colorToRgba(rankAccentBright, 0.4),
      )
      auraEchoCatalog.push(texture)
      textures.push(texture)
    }
  }
  if (isTypeEnabled(10)) {
    for (let index = 0; index < 6; index += 1) {
      const texture = createSparkParticleTexture(
        64,
        9800 + rank * 101 + index * 17,
        colorToRgba(rankAccentBright, 0.95),
        colorToRgba(index % 2 === 0 ? rankAccentSoft : rankAccentAlt, 0.58),
      )
      auraParticleCatalog.push(texture)
      textures.push(texture)
    }
  }

  // Type 8: rank aura core
  if (isTypeEnabled(8) && auraCoreCatalog.length > 0) {
    const auraCoreMaterial = new THREE.SpriteMaterial({
      map: auraCoreCatalog[Math.floor(random() * auraCoreCatalog.length)],
      color: rankAccentSoft,
      transparent: true,
      opacity: 0.12 + Math.min(0.22, rank * 0.009),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const auraCore = new THREE.Sprite(auraCoreMaterial)
    auraCore.position.set(0, 0.4, -9.4)
    const auraSpreadScale = Math.min(3.9, 1 + (Math.max(horizontalSpanMultiplier, verticalSpanMultiplier) - 1) * 0.4)
    const auraCoreSize = (8.5 + Math.min(4.4, rank * 0.18)) * auraSpreadScale
    auraCore.scale.set(auraCoreSize, auraCoreSize * 0.68, 1)
    group.add(auraCore)

    motionItems.push({
      object: auraCore,
      velocityX: -0.05,
      velocityY: 0.004,
      spin: 0.04,
      minX: xMin - 3,
      maxX: xMax + 3,
      minY: yMin - 1,
      maxY: yMax + 1,
      opacityMaterial: auraCoreMaterial,
      baseOpacity: auraCoreMaterial.opacity,
      twinkleAmplitude: 0.05,
      twinkleSpeed: 0.44,
      twinklePhase: random() * Math.PI * 2,
    })
  }

  // Type 9: aura echo fields
  if (isTypeEnabled(9) && auraEchoCatalog.length > 0) {
    const auraEchoCount = 2
    for (let index = 0; index < auraEchoCount; index += 1) {
      const echoMaterial = new THREE.SpriteMaterial({
        map: auraEchoCatalog[Math.floor(random() * auraEchoCatalog.length)],
        color: index % 2 === 0 ? rankAccent.getHex() : rankAccentSoft.getHex(),
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const echo = new THREE.Sprite(echoMaterial)
      echo.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -10.2 - random() * 2.8,
      )
      const echoSize = 40 + random() * 3.4
      echo.scale.set(echoSize, echoSize, 1)
      group.add(echo)

      motionItems.push({
        object: echo,
        velocityX: -0.035 - random() * 0.06,
        velocityY: (random() - 0.5) * 0.035,
        spin: -0.14 + random() * 0.28,
        minX: xMin - 3,
        maxX: xMax + 3,
        minY: yMin - 2.2,
        maxY: yMax + 2.2,
        opacityMaterial: echoMaterial,
        baseOpacity: echoMaterial.opacity,
        twinkleAmplitude: 0.03,
        twinkleSpeed: 0.32 + random() * 0.28,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 10: aura spark particles
  if (isTypeEnabled(10) && auraParticleCatalog.length > 0) {
    const auraParticleCount = 5000
    for (let index = 0; index < auraParticleCount; index += 1) {
      const particleMaterial = new THREE.SpriteMaterial({
        map: auraParticleCatalog[Math.floor(random() * auraParticleCatalog.length)],
        color: index % 3 === 0 ? rankAccentBright.getHex() : rankAccentSoft.getHex(),
        transparent: true,
        opacity: 0.2 + random() * 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const particle = new THREE.Sprite(particleMaterial)
      particle.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -9.15 - random() * 4.2,
      )
      const particleSize = 0.08 + random() * 0.2
      particle.scale.set(particleSize, particleSize, 1)
      group.add(particle)

      motionItems.push({
        object: particle,
        velocityX: -0.1 - random() * 0.16,
        velocityY: -0.03 + random() * 0.06,
        spin: -0.38 + random() * 0.76,
        minX: xMin - 3,
        maxX: xMax + 3,
        minY: yMin - 2.4,
        maxY: yMax + 2.4,
        opacityMaterial: particleMaterial,
        baseOpacity: 1.0,
        twinkleAmplitude: 0.07,
        twinkleSpeed: 0.95 + random() * 0.5,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 11: comet sprites
  if (isTypeEnabled(11)) {
    const cometCatalog: THREE.Texture[] = []
    const cometColors: Array<[string, string]> = [
      [colorToRgba(rankAccentBright, 0.94), colorToRgba(rankAccent, 0.52)],
      [colorToRgba(rankAccentSoft, 0.95), colorToRgba(rankAccentAlt, 0.5)],
      [colorToRgba(rankAccent.clone().lerp(new THREE.Color(0xffffff), 0.28), 0.92), colorToRgba(rankAccentDeep, 0.5)],
    ]
    for (let index = 0; index < 6; index += 1) {
      const colors = cometColors[index % cometColors.length]
      const texture = createCometSpriteTexture(112, 12000 + rank * 211 + index * 29, colors[0], colors[1])
      cometCatalog.push(texture)
      textures.push(texture)
    }

    const cometCount = Math.min(3 + Math.floor(rank / 3), 700)
    for (let index = 0; index < cometCount; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: cometCatalog[Math.floor(random() * cometCatalog.length)],
        color: 0xffffff,
        transparent: true,
        opacity: 0.34 + random() * 0.24,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const comet = new THREE.Sprite(material)
      const width = 0.8 + random() * 3.6
      const height = 0.2 + random() * 0.9
      comet.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -9.8 - random() * 3.2)
      comet.scale.set(width, height, 1)
      addDebrisHalo(comet, { scaleMultiplier: 1.7, opacity: 0.16 + random() * 0.05 })
      group.add(comet)

      motionItems.push({
        object: comet,
        velocityX: -0.46 - random() * 0.4,
        velocityY: -0.02 + random() * 0.04,
        spin: -0.06 + random() * 0.12,
        minX: xMin - 2,
        maxX: xMax + 2,
        minY: yMin - 1.5,
        maxY: yMax + 1.5,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.11,
        twinkleSpeed: 1.2 + random() * 0.7,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 12: ion orbs
  if (isTypeEnabled(12)) {
    const orbCatalog: THREE.Texture[] = []
    for (let index = 0; index < 5; index += 1) {
      const texture = createIonOrbSpriteTexture(
        88,
        13000 + rank * 113 + index * 29,
        colorToRgba(rankAccentBright, 0.9),
        colorToRgba(rankAccentSoft, 0.45),
        colorToRgba(index % 2 === 0 ? rankAccentAlt : rankAccentSoft, 0.5),
      )
      orbCatalog.push(texture)
      textures.push(texture)
    }

    const orbCount = 500
    for (let index = 0; index < orbCount; index += 1) {
      addMovingSprite({
        texture: orbCatalog[Math.floor(random() * orbCatalog.length)],
        x: xMin + random() * (xMax - xMin),
        y: yMin + random() * (yMax - yMin),
        z: -10.2 - random() * 2.6,
        scale: 0.18 + random() * 0.62,
        opacity: 0.2 + random() * 0.24,
        velocityX: -0.14 - random() * 0.2,
        velocityY: (random() - 0.5) * 0.05,
        spin: -0.4 + random() * 0.8,
        twinkleAmplitude: 0.12,
        twinkleSpeed: 1.1 + random() * 0.8,
      })
    }
  }

  // Type 13: relic satellites
  if (isTypeEnabled(13)) {
    const satelliteCatalog: THREE.Texture[] = []
    const pairs: Array<[string, string]> = [
      [colorToRgba(rankAccent.clone().lerp(new THREE.Color(0x94a3b8), 0.56), 0.9), colorToRgba(rankAccent, 0.72)],
      [colorToRgba(rankAccent.clone().lerp(new THREE.Color(0xcbd5e1), 0.62), 0.9), colorToRgba(rankAccentAlt, 0.72)],
    ]
    for (let index = 0; index < 5; index += 1) {
      const colors = pairs[index % pairs.length]
      const texture = createSatelliteSpriteTexture(100, colors[0], colors[1])
      satelliteCatalog.push(texture)
      textures.push(texture)
    }

    const satelliteCount = enabledTypeCount == 14 ? 500 : 50
    for (let index = 0; index < satelliteCount; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: satelliteCatalog[Math.floor(random() * satelliteCatalog.length)],
        color: 0xffffff,
        transparent: true,
        opacity: 0.24 + random() * 0.24,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      const satellite = new THREE.Sprite(material)
      const width = 0.56 + random() * 1.24
      const height = 0.28 + random() * 0.64
      satellite.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -11.2 - random() * 2.2)
      satellite.scale.set(width, height, 1)
      addDebrisHalo(satellite, { scaleMultiplier: 1.95, opacity: 0.12 + random() * 0.04 })
      group.add(satellite)

      motionItems.push({
        object: satellite,
        velocityX: -0.12 - random() * 0.14,
        velocityY: (random() - 0.5) * 0.04,
        spin: -0.18 + random() * 0.36,
        minX: xMin - 1,
        maxX: xMax + 1,
        minY: yMin - 1,
        maxY: yMax + 1,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.05,
        twinkleSpeed: 0.7 + random() * 0.4,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 14: warp rings
  if (isTypeEnabled(14)) {
    const ringCatalog: THREE.Texture[] = []
    const ringColors = [
      colorToRgba(rankAccentSoft, 0.46),
      colorToRgba(rankAccentAlt, 0.4),
      colorToRgba(rankAccent.clone().offsetHSL(-0.02, 0.02, -0.03), 0.36),
    ]
    for (let index = 0; index < ringColors.length; index += 1) {
      const texture = createRingSpriteTexture(
        112,
        ringColors[index],
        colorToRgba(rankAccent.clone().lerp(new THREE.Color(0xffffff), 0.35), 0.65),
      )
      ringCatalog.push(texture)
      textures.push(texture)
    }

    const ringCount = enabledTypeCount == 14 ? 250 : 50
    for (let index = 0; index < ringCount; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: ringCatalog[Math.floor(random() * ringCatalog.length)],
        color: 0xffffff,
        transparent: true,
        opacity: 0.16 + random() * 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.Sprite(material)
      const size = 0.66 + random() * 3.06
      ring.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -12.8 - random() * 3)
      ring.scale.set(size, size, 1)
      addDebrisHalo(ring, { scaleMultiplier: 1.45, opacity: 0.1 + random() * 0.04 })
      group.add(ring)

      motionItems.push({
        object: ring,
        velocityX: -0.09 - random() * 0.12,
        velocityY: (random() - 0.5) * 0.03,
        spin: -0.28 + random() * 0.56,
        minX: xMin - 2,
        maxX: xMax + 2,
        minY: yMin - 2,
        maxY: yMax + 2,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.08,
        twinkleSpeed: 0.6 + random() * 0.5,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  // Type 15: solar sail craft
  if (isTypeEnabled(15)) {
    const sailCatalog: THREE.Texture[] = []
    const sailColors = [
      colorToRgba(rankAccent.clone().lerp(new THREE.Color(0xfffff2), 0.3), 0.9),
      colorToRgba(rankAccentSoft, 0.88),
      colorToRgba(rankAccentAlt, 0.84),
    ]
    for (let index = 0; index < sailColors.length; index += 1) {
      const texture = createShardSpriteTexture(124, 15000 + index * 71, sailColors[index])
      sailCatalog.push(texture)
      textures.push(texture)
    }

    const sailCount = 500
    for (let index = 0; index < sailCount; index += 1) {
      const material = new THREE.SpriteMaterial({
        map: sailCatalog[Math.floor(random() * sailCatalog.length)],
        color: 0xffffff,
        transparent: true,
        opacity: 0.26 + random() * 0.24,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const sail = new THREE.Sprite(material)
      const width = 0.5 + random() * 1.7
      const height = 0.2 + random() * 0.7
      sail.position.set(xMin + random() * (xMax - xMin), yMin + random() * (yMax - yMin), -10.1 - random() * 2.9)
      sail.scale.set(width, height, 1)
      sail.material.rotation = -0.15 + random() * 0.3
      addDebrisHalo(sail, { scaleMultiplier: 2, opacity: 0.13 + random() * 0.05 })
      group.add(sail)

      motionItems.push({
        object: sail,
        velocityX: -0.24 - random() * 0.22,
        velocityY: (random() - 0.5) * 0.05,
        spin: -0.24 + random() * 0.48,
        minX: xMin - 1.5,
        maxX: xMax + 1.5,
        minY: yMin - 1.5,
        maxY: yMax + 1.5,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.09,
        twinkleSpeed: 1 + random() * 0.6,
        twinklePhase: random() * Math.PI * 2,
      })
    }
  }

  if (rank >= 5) {
    const lateRank = rank - 5
    const lateDensityBoost = 1 + Math.min(3.2, lateRank * 0.3)
    const giantAsteroidPalette = {
      base: colorToHex(rankAccent.clone().lerp(new THREE.Color(0x475569), 0.55)),
      highlight: colorToHex(rankAccentBright.clone().lerp(new THREE.Color(0xe2e8f0), 0.38)),
      shadow: colorToHex(rankAccentDeep.clone().lerp(new THREE.Color(0x020617), 0.28)),
    }
    const deepAsteroidPalette = {
      base: colorToHex(rankAccent.clone().lerp(new THREE.Color(0x334155), 0.72)),
      highlight: colorToHex(rankAccentSoft.clone().lerp(new THREE.Color(0xf8fafc), 0.24)),
      shadow: colorToHex(rankAccentDeep.clone().lerp(new THREE.Color(0x020617), 0.36)),
    }

    // Oversized asteroid clusters.
    const giantAsteroidCount = Math.min(2 + Math.floor(lateRank / 2), 550)
    for (let index = 0; index < giantAsteroidCount; index += 1) {
      const texture = createAsteroidSpriteTexture(160, 42000 + rank * 113 + index * 19, giantAsteroidPalette)
      textures.push(texture)
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: rankAccent.clone().lerp(new THREE.Color(0x334155), 0.45),
        transparent: true,
        opacity: 0.12 + random() * 0.08,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      const giantAsteroid = new THREE.Sprite(material)
      const giantSize = 2.2 + lateRank * 0.38 + random() * 1.6
      giantAsteroid.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -12.2 - random() * 4,
      )
      giantAsteroid.scale.set(giantSize * (0.88 + random() * 0.22), giantSize, 1)
      addDebrisHalo(giantAsteroid, { scaleMultiplier: 1.55, opacity: 0.05 + random() * 0.03 })
      group.add(giantAsteroid)

      motionItems.push({
        object: giantAsteroid,
        velocityX: -0.08 - random() * 0.08,
        velocityY: (random() - 0.5) * 0.03,
        spin: -0.08 + random() * 0.16,
        minX: xMin - 3,
        maxX: xMax + 3,
        minY: yMin - 3,
        maxY: yMax + 3,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.04,
        twinkleSpeed: 0.28 + random() * 0.24,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const deepAsteroidCount = Math.min(4 + Math.floor(lateRank * 0.9), 1000)
    for (let index = 0; index < deepAsteroidCount; index += 1) {
      const texture = createAsteroidSpriteTexture(220, 50000 + rank * 137 + index * 23, deepAsteroidPalette)
      textures.push(texture)
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: rankAccent.clone().lerp(new THREE.Color(0x1e293b), 0.62),
        transparent: true,
        opacity: 0.035 + random() * 0.035,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      const deepAsteroid = new THREE.Sprite(material)
      const deepSize = 3.8 + lateRank * 0.5 + random() * 3.4
      deepAsteroid.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -24.5 - random() * 7.5,
      )
      deepAsteroid.scale.set(deepSize * (0.9 + random() * 0.14), deepSize, 1)
      addDebrisHalo(deepAsteroid, { scaleMultiplier: 0.95, opacity: 0.018 + random() * 0.014 })
      group.add(deepAsteroid)

      motionItems.push({
        object: deepAsteroid,
        velocityX: -0.025 - random() * 0.025,
        velocityY: (random() - 0.5) * 0.012,
        spin: -0.02 + random() * 0.04,
        minX: xMin - 5,
        maxX: xMax + 5,
        minY: yMin - 5,
        maxY: yMax + 5,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.02,
        twinkleSpeed: 0.18 + random() * 0.12,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const deepVeilTexture = createRadialSpriteTexture(
      256,
      colorToRgba(rankAccentSoft, 0.1),
      colorToRgba(rankAccentDeep, 0),
    )
    textures.push(deepVeilTexture)
    const deepVeilCount = Math.min(3 + Math.floor(lateRank / 2), 600)
    for (let index = 0; index < deepVeilCount; index += 1) {
      const veilMaterial = new THREE.SpriteMaterial({
        map: deepVeilTexture,
        color: index % 2 === 0 ? rankAccent.clone().lerp(new THREE.Color(0x0f172a), 0.5) : rankAccentSoft.clone().lerp(new THREE.Color(0x0f172a), 0.4),
        transparent: true,
        opacity: 0.025 + random() * 0.025,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const veil = new THREE.Sprite(veilMaterial)
      const veilWidth = 8.5 + lateRank * 0.75 + random() * 5.5
      const veilHeight = 3.8 + lateRank * 0.35 + random() * 2.8
      veil.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -28 - random() * 5,
      )
      veil.scale.set(veilWidth, veilHeight, 1)
      group.add(veil)

      motionItems.push({
        object: veil,
        velocityX: -0.01 - random() * 0.012,
        velocityY: (random() - 0.5) * 0.01,
        spin: -0.01 + random() * 0.02,
        minX: xMin - 6,
        maxX: xMax + 6,
        minY: yMin - 5,
        maxY: yMax + 5,
        opacityMaterial: veilMaterial,
        baseOpacity: veilMaterial.opacity,
        twinkleAmplitude: 0.012,
        twinkleSpeed: 0.12 + random() * 0.08,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const deepPlanetTexture = createRadialSpriteTexture(
      320,
      colorToRgba(rankAccent.clone().lerp(new THREE.Color(0xf8fafc), 0.12), 0.12),
      colorToRgba(rankAccentDeep, 0),
    )
    textures.push(deepPlanetTexture)
    const deepPlanetCount = Math.min(3 + Math.floor(lateRank / 2), 500)
    for (let index = 0; index < deepPlanetCount; index += 1) {
      const planetMaterial = new THREE.SpriteMaterial({
        map: deepPlanetTexture,
        color: index % 2 === 0 ? rankAccent.clone().lerp(new THREE.Color(0x334155), 0.7) : rankAccentSoft.clone().lerp(new THREE.Color(0x1e293b), 0.55),
        transparent: true,
        opacity: 0.04 + random() * 0.035,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
      const deepPlanet = new THREE.Sprite(planetMaterial)
      const planetSize = 10.5 + lateRank * 0.85 + random() * 8.2
      deepPlanet.position.set(
        xMin + (0.58 + random() * 0.42) * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -24 - random() * 6,
      )
      deepPlanet.scale.set(planetSize * (0.9 + random() * 0.18), planetSize, 1)
      addDebrisHalo(deepPlanet, { scaleMultiplier: 0.65, opacity: 0.014 + random() * 0.01 })
      group.add(deepPlanet)

      motionItems.push({
        object: deepPlanet,
        velocityX: -0.02 - random() * 0.022,
        velocityY: (random() - 0.5) * 0.004,
        spin: -0.004 + random() * 0.008,
        minX: xMin - 12,
        maxX: xMax + 12,
        minY: yMin - 8,
        maxY: yMax + 8,
        opacityMaterial: planetMaterial,
        baseOpacity: planetMaterial.opacity,
        twinkleAmplitude: 0.01,
        twinkleSpeed: 0.08 + random() * 0.04,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const hyperlaneCount = Math.min(Math.round((14 + lateRank * 4.1) * lateDensityBoost), 9000)
    for (let index = 0; index < hyperlaneCount; index += 1) {
      const width = 0.9 + random() * 3.2
      const thickness = 0.012 + random() * 0.05
      const geometry = new THREE.PlaneGeometry(width, thickness)
      const material = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? rankAccentSoft : rankAccentAlt,
        transparent: true,
        opacity: 0.024 + random() * 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const streak = new THREE.Mesh(geometry, material)
      streak.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -17 - random() * 14,
      )
      streak.rotation.z = -0.15 + random() * 0.3
      group.add(streak)

      motionItems.push({
        object: streak,
        velocityX: -0.24 - random() * 0.52,
        velocityY: (random() - 0.5) * 0.03,
        spin: -0.015 + random() * 0.03,
        minX: xMin - 6,
        maxX: xMax + 6,
        minY: yMin - 4,
        maxY: yMax + 4,
        opacityMaterial: material,
        baseOpacity: material.opacity,
        twinkleAmplitude: 0.018,
        twinkleSpeed: 0.35 + random() * 0.5,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const auroraRibbonTexture = createRadialSpriteTexture(
      256,
      colorToRgba(rankAccentSoft, 0.22),
      colorToRgba(rankAccentDeep, 0),
    )
    textures.push(auroraRibbonTexture)
    const auroraRibbonCount = Math.min(4 + Math.floor(lateRank * 1.1), 1400)
    for (let index = 0; index < auroraRibbonCount; index += 1) {
      const ribbonMaterial = new THREE.SpriteMaterial({
        map: auroraRibbonTexture,
        color: index % 2 === 0 ? rankAccent.clone().lerp(new THREE.Color(0x0f172a), 0.28) : rankAccentAlt.clone().lerp(new THREE.Color(0x0f172a), 0.32),
        transparent: true,
        opacity: 0.03 + random() * 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const ribbon = new THREE.Sprite(ribbonMaterial)
      const ribbonWidth = 6.8 + random() * 8.8 + lateRank * 0.9
      const ribbonHeight = 0.85 + random() * 1.8
      ribbon.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -21 - random() * 11,
      )
      ribbon.scale.set(ribbonWidth, ribbonHeight, 1)
      ribbon.material.rotation = -0.35 + random() * 0.7
      group.add(ribbon)

      motionItems.push({
        object: ribbon,
        velocityX: -0.045 - random() * 0.07,
        velocityY: (random() - 0.5) * 0.015,
        spin: -0.02 + random() * 0.04,
        minX: xMin - 8,
        maxX: xMax + 8,
        minY: yMin - 5,
        maxY: yMax + 5,
        opacityMaterial: ribbonMaterial,
        baseOpacity: ribbonMaterial.opacity,
        twinkleAmplitude: 0.012,
        twinkleSpeed: 0.2 + random() * 0.18,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const bloomCoreTexture = createRadialSpriteTexture(
      128,
      colorToRgba(rankAccentBright, 0.6),
      colorToRgba(rankAccentMid, 0),
    )
    textures.push(bloomCoreTexture)
    const bloomShardTexture = createShardSpriteTexture(
      128,
      76000 + rank * 17,
      colorToRgba(rankAccentSoft, 0.54),
    )
    textures.push(bloomShardTexture)
    const bloomClusterCount = Math.min(3 + Math.floor(lateRank * 1.05), 1200)
    for (let index = 0; index < bloomClusterCount; index += 1) {
      const bloomGroup = new THREE.Group()
      const shardCount = 5 + Math.floor(random() * 7)
      for (let shardIndex = 0; shardIndex < shardCount; shardIndex += 1) {
        const shardMaterial = new THREE.SpriteMaterial({
          map: bloomShardTexture,
          color: shardIndex % 2 === 0 ? rankAccentSoft : rankAccentAlt,
          transparent: true,
          opacity: 0.06 + random() * 0.08,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const shard = new THREE.Sprite(shardMaterial)
        const orbitRadius = 0.45 + random() * 1.8
        const orbitAngle = random() * Math.PI * 2
        const shardSize = 0.14 + random() * 0.36
        shard.position.set(Math.cos(orbitAngle) * orbitRadius, Math.sin(orbitAngle) * orbitRadius, 0)
        shard.scale.set(shardSize, shardSize * (0.5 + random() * 0.55), 1)
        shard.material.rotation = random() * Math.PI
        bloomGroup.add(shard)
      }

      const coreMaterial = new THREE.SpriteMaterial({
        map: bloomCoreTexture,
        color: rankAccentBright,
        transparent: true,
        opacity: 0.05 + random() * 0.06,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const core = new THREE.Sprite(coreMaterial)
      const coreSize = 0.75 + random() * 1.6
      core.scale.set(coreSize, coreSize, 1)
      bloomGroup.add(core)

      bloomGroup.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -18 - random() * 12,
      )
      group.add(bloomGroup)

      motionItems.push({
        object: bloomGroup,
        velocityX: -0.03 - random() * 0.04,
        velocityY: (random() - 0.5) * 0.012,
        spin: -0.12 + random() * 0.24,
        minX: xMin - 7,
        maxX: xMax + 7,
        minY: yMin - 5,
        maxY: yMax + 5,
        opacityMaterial: coreMaterial,
        baseOpacity: coreMaterial.opacity,
        twinkleAmplitude: 0.025,
        twinkleSpeed: 0.32 + random() * 0.3,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const createLightningChain = (seed: number, chainLength: number) => {
      const chainRandom = createSeededRandom(seed)
      const chainGroup = new THREE.Group()
      const pointCount = 6 + Math.floor(chainLength * 0.25) + Math.floor(chainRandom() * 2)
      const points: THREE.Vector3[] = []
      const startX = -chainLength * 0.5
      const stepX = chainLength / Math.max(2, pointCount - 1)
      let cursorX = startX
      let cursorY = (chainRandom() - 0.5) * chainLength * 0.12

      for (let pointIndex = 0; pointIndex < pointCount; pointIndex += 1) {
        if (pointIndex > 0) {
          cursorX += stepX
          const zigZagDirection = pointIndex % 2 === 0 ? 1 : -1
          cursorY += zigZagDirection * (chainLength * 0.08 + chainRandom() * chainLength * 0.07)
          cursorY += (chainRandom() - 0.5) * chainLength * 0.05
        }

        const point = new THREE.Vector3(cursorX, cursorY, 0)
        points.push(point)

        const nodeMaterial = new THREE.SpriteMaterial({
          map: debrisHaloTexture,
          color: pointIndex % 2 === 0 ? rankAccentSoft : rankAccent.clone().lerp(new THREE.Color(0x94a3b8), 0.45),
          transparent: true,
          opacity: 0.05 + chainRandom() * 0.04,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const node = new THREE.Sprite(nodeMaterial)
        const nodeSize = 0.04 + chainRandom() * 0.08
        node.position.copy(point)
        node.scale.set(nodeSize, nodeSize, 1)
        chainGroup.add(node)
        addDebrisHalo(node, { scaleMultiplier: 0.9, opacity: 0.02 + chainRandom() * 0.02 })
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: rankAccent.clone().lerp(new THREE.Color(0xe2e8f0), 0.22),
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      chainGroup.add(line)

      return { chainGroup, lineMaterial }
    }

    const lightningChainCount = Math.min(3 + Math.floor(lateRank * 0.85), 1000)
    for (let index = 0; index < lightningChainCount; index += 1) {
      const chainLength = 3.2 + lateRank * 0.2 + random() * 1.2
      const { chainGroup, lineMaterial } = createLightningChain(20000 + rank * 97 + index * 53, chainLength)
      chainGroup.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -10.4 - random() * 2.8,
      )
      chainGroup.rotation.z = -0.18 + random() * 0.36
      chainGroup.scale.set(1, 1, 1)
      group.add(chainGroup)

      motionItems.push({
        object: chainGroup,
        velocityX: -0.04 - random() * 0.04,
        velocityY: (random() - 0.5) * 0.015,
        spin: -0.03 + random() * 0.06,
        minX: xMin - 4,
        maxX: xMax + 4,
        minY: yMin - 3,
        maxY: yMax + 3,
        opacityMaterial: lineMaterial,
        baseOpacity: lineMaterial.opacity,
        twinkleAmplitude: 0.04,
        twinkleSpeed: 0.6 + random() * 0.2,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const createLightningStorm = (seed: number, boltCount: number) => {
      const stormRandom = createSeededRandom(seed)
      const stormGroup = new THREE.Group()
      const stormMaterial = new THREE.LineBasicMaterial({
        color: rankAccent.clone().lerp(new THREE.Color(0xe2e8f0), 0.2),
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      for (let boltIndex = 0; boltIndex < boltCount; boltIndex += 1) {
        const points: THREE.Vector3[] = []
        const segmentCount = 5 + Math.floor(stormRandom() * 3)
        let cursorX = -1.2 + stormRandom() * 2.4
        let cursorY = 1.8
        points.push(new THREE.Vector3(cursorX, cursorY, 0))

        for (let segmentIndex = 1; segmentIndex < segmentCount; segmentIndex += 1) {
          cursorY -= 0.66 + stormRandom() * 0.26
          const branchDirection = segmentIndex % 2 === 0 ? 1 : -1
          cursorX += branchDirection * (0.18 + stormRandom() * 0.48)
          cursorX += (stormRandom() - 0.5) * 0.35
          points.push(new THREE.Vector3(cursorX, cursorY, 0))
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const boltMaterial = stormMaterial.clone()
        boltMaterial.opacity = 0.06 + stormRandom() * 0.08
        const bolt = new THREE.Line(geometry, boltMaterial)
        bolt.position.x = -0.7 + stormRandom() * 1.4
        bolt.position.y = 0.3 + stormRandom() * 0.8
        bolt.rotation.z = -0.08 + stormRandom() * 0.16
        stormGroup.add(bolt)
      }

      return { stormGroup, stormMaterial }
    }

    const lightningStormCount = Math.min(2 + Math.floor(lateRank * 0.55), 700)
    for (let index = 0; index < lightningStormCount; index += 1) {
      const { stormGroup, stormMaterial } = createLightningStorm(24000 + rank * 71 + index * 41, 2 + Math.floor(lateRank / 4))
      stormGroup.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -13.4 - random() * 3.2,
      )
      stormGroup.scale.set(1.05 + lateRank * 0.06, 1.05 + lateRank * 0.06, 1)
      group.add(stormGroup)

      motionItems.push({
        object: stormGroup,
        velocityX: -0.02 - random() * 0.03,
        velocityY: (random() - 0.5) * 0.02,
        spin: -0.02 + random() * 0.04,
        minX: xMin - 3,
        maxX: xMax + 3,
        minY: yMin - 3,
        maxY: yMax + 3,
        opacityMaterial: stormMaterial,
        baseOpacity: stormMaterial.opacity,
        twinkleAmplitude: 0.05,
        twinkleSpeed: 0.7 + random() * 0.18,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const vortexCount = Math.min(3 + Math.floor(lateRank * 0.9), 1000)
    for (let index = 0; index < vortexCount; index += 1) {
      const vortexGroup = new THREE.Group()
      const vortexMaterial = new THREE.LineBasicMaterial({
        color: rankAccent.clone().lerp(new THREE.Color(0x94a3b8), 0.3),
        transparent: true,
        opacity: 0.06 + random() * 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const turnCount = 1.4 + random() * 0.7
      const radius = 0.7 + lateRank * 0.09 + random() * 0.8
      const points: THREE.Vector3[] = []
      const spiralPoints = 52

      for (let pointIndex = 0; pointIndex < spiralPoints; pointIndex += 1) {
        const progress = pointIndex / (spiralPoints - 1)
        const angle = progress * Math.PI * 2 * turnCount
        const spiralRadius = progress * radius
        points.push(new THREE.Vector3(
          Math.cos(angle) * spiralRadius,
          Math.sin(angle) * spiralRadius * 0.72,
          0,
        ))
      }

      const vortexLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), vortexMaterial)
      vortexGroup.add(vortexLine)

      const coreMaterial = new THREE.SpriteMaterial({
        map: debrisHaloTexture,
        color: rankAccentSoft,
        transparent: true,
        opacity: 0.05 + random() * 0.04,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const core = new THREE.Sprite(coreMaterial)
      const coreSize = 0.9 + lateRank * 0.06 + random() * 0.35
      core.scale.set(coreSize, coreSize, 1)
      vortexGroup.add(core)
      addDebrisHalo(core, { scaleMultiplier: 1.05, opacity: 0.03 + random() * 0.02 })

      vortexGroup.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -14.2 - random() * 3,
      )
      vortexGroup.rotation.z = random() * Math.PI * 2
      group.add(vortexGroup)

      motionItems.push({
        object: vortexGroup,
        velocityX: -0.015 - random() * 0.02,
        velocityY: (random() - 0.5) * 0.015,
        spin: 0.04 + random() * 0.06,
        minX: xMin - 4,
        maxX: xMax + 4,
        minY: yMin - 4,
        maxY: yMax + 4,
        opacityMaterial: vortexMaterial,
        baseOpacity: vortexMaterial.opacity,
        twinkleAmplitude: 0.03,
        twinkleSpeed: 0.35 + random() * 0.15,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    const wallCount = Math.min(3 + Math.floor(lateRank * 0.6), 700)
    for (let index = 0; index < wallCount; index += 1) {
      const wallGroup = new THREE.Group()
      const wallMaterial = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? rankAccent.clone().lerp(new THREE.Color(0x64748b), 0.35) : rankAccentSoft.clone().lerp(new THREE.Color(0x64748b), 0.25),
        transparent: true,
        opacity: 0.03 + random() * 0.025,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const panelCount = 5 + Math.floor(lateRank * 0.35)
      const wallWidth = 4.8 + lateRank * 0.24 + random() * 1.8
      const wallHeight = 4.6 + lateRank * 0.16 + random() * 1.1
      const panelWidth = wallWidth / panelCount

      for (let panelIndex = 0; panelIndex < panelCount; panelIndex += 1) {
        const panelGeometry = new THREE.PlaneGeometry(panelWidth * (0.7 + random() * 0.18), wallHeight * (0.5 + random() * 0.18))
        const panel = new THREE.Mesh(panelGeometry, wallMaterial.clone())
        panel.position.set(
          -wallWidth * 0.5 + panelWidth * panelIndex + panelWidth * 0.5,
          (random() - 0.5) * 0.7,
          0,
        )
        panel.rotation.z = (random() - 0.5) * 0.12
        wallGroup.add(panel)
      }

      const shimmerTexture = createRadialSpriteTexture(
        128,
        colorToRgba(rankAccentBright, 0.42),
        colorToRgba(rankAccentMid, 0),
      )
      textures.push(shimmerTexture)
      const shimmer = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: shimmerTexture,
          color: rankAccentSoft,
          transparent: true,
          opacity: 0.04 + random() * 0.02,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      shimmer.scale.set(wallWidth * 1.02, wallHeight * 1.02, 1)
      wallGroup.add(shimmer)

      wallGroup.position.set(
        xMin + random() * (xMax - xMin),
        yMin + random() * (yMax - yMin),
        -15.4 - random() * 3.2,
      )
      wallGroup.rotation.z = -0.12 + random() * 0.24
      group.add(wallGroup)

      motionItems.push({
        object: wallGroup,
        velocityX: -0.01 - random() * 0.012,
        velocityY: (random() - 0.5) * 0.01,
        spin: -0.03 + random() * 0.06,
        minX: xMin - 5,
        maxX: xMax + 5,
        minY: yMin - 4,
        maxY: yMax + 4,
        opacityMaterial: wallMaterial,
        baseOpacity: wallMaterial.opacity,
        twinkleAmplitude: 0.05,
        twinkleSpeed: 0.5 + random() * 0.35,
        twinklePhase: random() * Math.PI * 2,
      })
    }

    if (rank >= 10) {
      const overdriveRank = rank - 9

      const riftRingTexture = createRingSpriteTexture(
        128,
        colorToRgba(rankAccentSoft, 0.34),
        colorToRgba(rankAccentBright, 0.6),
      )
      textures.push(riftRingTexture)
      const riftRingCount = Math.min(8 + Math.floor(overdriveRank * 4.5), 2200)
      for (let index = 0; index < riftRingCount; index += 1) {
        const ringMaterial = new THREE.SpriteMaterial({
          map: riftRingTexture,
          color: index % 2 === 0 ? rankAccent : rankAccentAlt,
          transparent: true,
          opacity: 0.045 + random() * 0.06,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const ring = new THREE.Sprite(ringMaterial)
        const ringSize = 1.2 + random() * 4 + overdriveRank * 0.55
        ring.position.set(
          xMin + random() * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -14 - random() * 14,
        )
        ring.scale.set(ringSize, ringSize * (0.85 + random() * 0.35), 1)
        ring.material.rotation = random() * Math.PI
        group.add(ring)

        motionItems.push({
          object: ring,
          velocityX: -0.07 - random() * 0.12,
          velocityY: (random() - 0.5) * 0.03,
          spin: -0.22 + random() * 0.44,
          minX: xMin - 8,
          maxX: xMax + 8,
          minY: yMin - 6,
          maxY: yMax + 6,
          opacityMaterial: ringMaterial,
          baseOpacity: ringMaterial.opacity,
          twinkleAmplitude: 0.02,
          twinkleSpeed: 0.4 + random() * 0.4,
          twinklePhase: random() * Math.PI * 2,
        })
      }

      const prismStormCount = Math.min(6 + Math.floor(overdriveRank * 3.5), 1700)
      for (let index = 0; index < prismStormCount; index += 1) {
        const prismGroup = new THREE.Group()
        const shardPlanes = 3 + Math.floor(random() * 5)
        const prismMaterial = new THREE.MeshBasicMaterial({
          color: index % 3 === 0 ? rankAccentBright : rankAccentSoft,
          transparent: true,
          opacity: 0.03 + random() * 0.05,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })

        for (let shardIndex = 0; shardIndex < shardPlanes; shardIndex += 1) {
          const shardGeometry = new THREE.PlaneGeometry(0.6 + random() * 2.2, 0.02 + random() * 0.08)
          const shard = new THREE.Mesh(shardGeometry, prismMaterial.clone())
          shard.position.set((random() - 0.5) * 1.8, (random() - 0.5) * 1.8, 0)
          shard.rotation.z = random() * Math.PI
          prismGroup.add(shard)
        }

        prismGroup.position.set(
          xMin + random() * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -11 - random() * 16,
        )
        prismGroup.rotation.z = random() * Math.PI * 2
        group.add(prismGroup)

        motionItems.push({
          object: prismGroup,
          velocityX: -0.1 - random() * 0.16,
          velocityY: (random() - 0.5) * 0.04,
          spin: -0.35 + random() * 0.7,
          minX: xMin - 8,
          maxX: xMax + 8,
          minY: yMin - 6,
          maxY: yMax + 6,
          opacityMaterial: prismMaterial,
          baseOpacity: prismMaterial.opacity,
          twinkleAmplitude: 0.028,
          twinkleSpeed: 0.8 + random() * 0.5,
          twinklePhase: random() * Math.PI * 2,
        })
      }

      const singularityCoreTexture = createRadialSpriteTexture(
        192,
        colorToRgba(rankAccentBright, 0.78),
        colorToRgba(rankAccentDeep, 0),
      )
      textures.push(singularityCoreTexture)
      const singularityCount = Math.min(2 + Math.floor(overdriveRank * 1.8), 500)
      for (let index = 0; index < singularityCount; index += 1) {
        const singularityMaterial = new THREE.SpriteMaterial({
          map: singularityCoreTexture,
          color: rankAccent.clone().lerp(new THREE.Color(0x020617), 0.3),
          transparent: true,
          opacity: 0.055 + random() * 0.055,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const singularity = new THREE.Sprite(singularityMaterial)
        const singularitySize = 2.2 + overdriveRank * 0.95 + random() * 3.2
        singularity.position.set(
          xMin + random() * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -18 - random() * 16,
        )
        singularity.scale.set(singularitySize, singularitySize * (0.78 + random() * 0.35), 1)
        group.add(singularity)

        motionItems.push({
          object: singularity,
          velocityX: -0.04 - random() * 0.06,
          velocityY: (random() - 0.5) * 0.02,
          spin: -0.09 + random() * 0.18,
          minX: xMin - 9,
          maxX: xMax + 9,
          minY: yMin - 7,
          maxY: yMax + 7,
          opacityMaterial: singularityMaterial,
          baseOpacity: singularityMaterial.opacity,
          twinkleAmplitude: 0.03,
          twinkleSpeed: 0.45 + random() * 0.35,
          twinklePhase: random() * Math.PI * 2,
        })
      }

      const giantPlanetTexture = createRadialSpriteTexture(
        320,
        colorToRgba(rankAccentSoft.clone().lerp(new THREE.Color(0xffffff), 0.08), 0.2),
        colorToRgba(rankAccentDeep, 0),
      )
      const giantRingTexture = createRingSpriteTexture(
        320,
        colorToRgba(rankAccentSoft, 0.18),
        colorToRgba(rankAccentBright, 0.34),
      )
      textures.push(giantPlanetTexture, giantRingTexture)
      const ringedPlanetCount = Math.min(3 + Math.floor(overdriveRank * 1.4), 600)
      for (let index = 0; index < ringedPlanetCount; index += 1) {
        const ringedPlanetGroup = new THREE.Group()

        const planetMaterial = new THREE.SpriteMaterial({
          map: giantPlanetTexture,
          color: index % 2 === 0
            ? rankAccent.clone().lerp(new THREE.Color(0x1e293b), 0.68)
            : rankAccentAlt.clone().lerp(new THREE.Color(0x0f172a), 0.62),
          transparent: true,
          opacity: 0.05 + random() * 0.05,
          depthWrite: false,
          blending: THREE.NormalBlending,
        })
        const planet = new THREE.Sprite(planetMaterial)
        const planetSize = 11 + random() * 16 + overdriveRank * 1.8
        planet.scale.set(planetSize, planetSize * (0.88 + random() * 0.2), 1)
        ringedPlanetGroup.add(planet)

        const ringLayerCount = 2 + Math.floor(random() * 2)
        for (let ringIndex = 0; ringIndex < ringLayerCount; ringIndex += 1) {
          const ringMaterial = new THREE.SpriteMaterial({
            map: giantRingTexture,
            color: ringIndex % 2 === 0 ? rankAccentSoft : rankAccentBright,
            transparent: true,
            opacity: 0.035 + random() * 0.04,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
          const ring = new THREE.Sprite(ringMaterial)
          const ringScale = 1.18 + ringIndex * 0.26 + random() * 0.18
          ring.scale.set(planetSize * ringScale, planetSize * (0.3 + random() * 0.18), 1)
          ring.position.set((random() - 0.5) * 0.3, (random() - 0.5) * 0.25, -0.01 - ringIndex * 0.01)
          ring.material.rotation = -0.42 + random() * 0.84
          ringedPlanetGroup.add(ring)
        }

        ringedPlanetGroup.position.set(
          xMin + (0.52 + random() * 0.48) * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -28 - random() * 12,
        )
        ringedPlanetGroup.rotation.z = -0.2 + random() * 0.4
        group.add(ringedPlanetGroup)

        motionItems.push({
          object: ringedPlanetGroup,
          velocityX: -0.018 - random() * 0.024,
          velocityY: (random() - 0.5) * 0.004,
          spin: -0.006 + random() * 0.012,
          minX: xMin - 16,
          maxX: xMax + 16,
          minY: yMin - 10,
          maxY: yMax + 10,
          opacityMaterial: planetMaterial,
          baseOpacity: planetMaterial.opacity,
          twinkleAmplitude: 0.01,
          twinkleSpeed: 0.08 + random() * 0.08,
          twinklePhase: random() * Math.PI * 2,
        })
      }

      const blackHoleCoreTexture = createRadialSpriteTexture(
        256,
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 0)',
      )
      const accretionRingTexture = createRingSpriteTexture(
        256,
        colorToRgba(rankAccentSoft, 0.24),
        colorToRgba(rankAccentBright, 0.5),
      )
      const lensingGlowTexture = createRadialSpriteTexture(
        256,
        colorToRgba(rankAccentBright, 0.26),
        colorToRgba(rankAccentDeep, 0),
      )
      textures.push(blackHoleCoreTexture, accretionRingTexture, lensingGlowTexture)
      const blackHoleCount = Math.min(2 + Math.floor(overdriveRank * 10), 400)
      for (let index = 0; index < blackHoleCount; index += 1) {
        const blackHoleGroup = new THREE.Group()

        const lensMaterial = new THREE.SpriteMaterial({
          map: lensingGlowTexture,
          color: rankAccentSoft,
          transparent: true,
          opacity: 0.045 + random() * 0.045,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const lens = new THREE.Sprite(lensMaterial)

        const holeMaterial = new THREE.SpriteMaterial({
          map: blackHoleCoreTexture,
          color: new THREE.Color(0x000000),
          transparent: true,
          opacity: 0.96,
          depthWrite: false,
          blending: THREE.NormalBlending,
        })
        const hole = new THREE.Sprite(holeMaterial)

        const ringMaterial = new THREE.SpriteMaterial({
          map: accretionRingTexture,
          color: index % 2 === 0 ? rankAccentBright : rankAccentSoft,
          transparent: true,
          opacity: 0.08 + random() * 0.08,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const ring = new THREE.Sprite(ringMaterial)

        const holeSize = 2.4 + random() * 4.4 + overdriveRank * 0.75
        lens.scale.set(holeSize * 2.15, holeSize * 1.6, 1)
        hole.scale.set(holeSize * 0.74, holeSize * 0.74, 1)
        ring.scale.set(holeSize * 2.6, holeSize * (0.72 + random() * 0.28), 1)
        ring.material.rotation = -0.5 + random() * 1

        blackHoleGroup.add(lens)
        blackHoleGroup.add(ring)
        blackHoleGroup.add(hole)
        blackHoleGroup.position.set(
          xMin + random() * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -20 - random() * 14,
        )
        blackHoleGroup.rotation.z = random() * Math.PI * 2
        group.add(blackHoleGroup)

        motionItems.push({
          object: blackHoleGroup,
          velocityX: -0.026 - random() * 0.038,
          velocityY: (random() - 0.5) * 0.007,
          spin: -0.03 + random() * 0.06,
          minX: xMin - 10,
          maxX: xMax + 10,
          minY: yMin - 7,
          maxY: yMax + 7,
          opacityMaterial: lensMaterial,
          baseOpacity: lensMaterial.opacity,
          twinkleAmplitude: 0.018,
          twinkleSpeed: 0.2 + random() * 0.18,
          twinklePhase: random() * Math.PI * 2,
        })
      }

      const tinyStarDotTexture = createStarDotTexture(
        64,
        colorToRgba(rankAccentBright, 1),
        colorToRgba(rankAccentSoft, 0.6),
        colorToRgba(rankAccentMid, 0),
      )
      textures.push(tinyStarDotTexture)
      const starClusterFieldCount = Math.min(6 + Math.floor(overdriveRank * 2.2), 1300)
      for (let index = 0; index < starClusterFieldCount; index += 1) {
        const starPointCount = 110 + Math.floor(random() * 260)
        const positions = new Float32Array(starPointCount * 3)
        const spreadX = 4.8 + random() * 8.6 + overdriveRank * 0.5
        const spreadY = 2.6 + random() * 5.4
        for (let pointIndex = 0; pointIndex < starPointCount; pointIndex += 1) {
          const i3 = pointIndex * 3
          positions[i3] = (random() - 0.5) * spreadX
          positions[i3 + 1] = (random() - 0.5) * spreadY
          positions[i3 + 2] = (random() - 0.5) * 0.12
        }

        const pointsGeometry = new THREE.BufferGeometry()
        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const pointsMaterial = new THREE.PointsMaterial({
          map: tinyStarDotTexture,
          color: index % 2 === 0 ? rankAccentBright : rankAccentSoft,
          size: 0.06 + random() * 0.045,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.18 + random() * 0.16,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const starClusterField = new THREE.Points(pointsGeometry, pointsMaterial)
        starClusterField.position.set(
          xMin + random() * (xMax - xMin),
          yMin + random() * (yMax - yMin),
          -16 - random() * 16,
        )
        starClusterField.rotation.z = random() * Math.PI
        group.add(starClusterField)

        motionItems.push({
          object: starClusterField,
          velocityX: -0.05 - random() * 0.08,
          velocityY: (random() - 0.5) * 0.016,
          spin: -0.04 + random() * 0.08,
          minX: xMin - 10,
          maxX: xMax + 10,
          minY: yMin - 7,
          maxY: yMax + 7,
          opacityMaterial: pointsMaterial,
          baseOpacity: pointsMaterial.opacity,
          twinkleAmplitude: 0.03,
          twinkleSpeed: 0.55 + random() * 0.5,
          twinklePhase: random() * Math.PI * 2,
        })
      }
    }
  }

  const boostPulseTexture = createRadialSpriteTexture(
    128,
    colorToRgba(rankAccentBright, 0.92),
    colorToRgba(rankAccentMid, 0),
  )
  textures.push(boostPulseTexture)

  const boostPulseMaterial = new THREE.SpriteMaterial({
    map: boostPulseTexture,
    color: rankAccentSoft,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const boostPulseSprite = new THREE.Sprite(boostPulseMaterial)
  boostPulseSprite.position.set(0, 0.42, -9.2)
  boostPulseSprite.scale.set(0.001, 0.001, 1)
  group.add(boostPulseSprite)

  for (const item of motionItems) {
    const horizontalCenter = (item.minX + item.maxX) * 0.5
    const horizontalHalfRange = (item.maxX - item.minX) * 0.5
    const expandedHalfRange = horizontalHalfRange * 2
    item.minX = horizontalCenter - expandedHalfRange
    item.maxX = horizontalCenter + expandedHalfRange
  }

  return {
    rank,
    group,
    motionItems,
    textures,
    motionSpeedMultiplier,
    boostPulseMaterial,
    boostPulseSprite,
  }
}

export function updateSpaceBackdrop(backdrop: SpaceBackdropRuntime, delta: number, elapsed: number) {
  if (delta <= 0) {
    return
  }

  const wrapAxis = (value: number, min: number, max: number): number => {
    const range = max - min
    if (range <= 0) {
      return value
    }

    if (value < min) {
      const overshoot = min - value
      return max - (overshoot % range)
    }

    if (value > max) {
      const overshoot = value - max
      return min + (overshoot % range)
    }

    return value
  }

  for (const item of backdrop.motionItems) {
    const motionDelta = delta * backdrop.motionSpeedMultiplier
    item.object.position.x += item.velocityX * motionDelta
    item.object.position.y += item.velocityY * motionDelta
    item.object.rotation.z += item.spin * motionDelta

    item.object.position.x = wrapAxis(item.object.position.x, item.minX, item.maxX)
    item.object.position.y = wrapAxis(item.object.position.y, item.minY, item.maxY)

    if (
      item.opacityMaterial &&
      item.baseOpacity !== undefined &&
      item.twinkleAmplitude &&
      item.twinkleSpeed &&
      item.twinkleAmplitude > 0
    ) {
      const twinkle = Math.sin(elapsed * item.twinkleSpeed + (item.twinklePhase ?? 0)) * item.twinkleAmplitude
      item.opacityMaterial.opacity = Math.max(0.01, Math.min(1, item.baseOpacity + twinkle))
    }
  }
}

export function updateBackdropBoostPulse(backdrop: SpaceBackdropRuntime, remainingSeconds: number, delta: number): number {
  const nextRemaining = Math.max(0, remainingSeconds - delta)
  if (nextRemaining <= 0) {
    backdrop.boostPulseMaterial.opacity = 0
    backdrop.boostPulseSprite.scale.set(0.001, 0.001, 1)
    return 0
  }

  const duration = 1.35
  const normalized = Math.max(0, Math.min(1, nextRemaining / duration))
  const eased = 1 - normalized
  const pulseStrength = Math.sin(Math.min(1, eased) * Math.PI)
  backdrop.boostPulseMaterial.opacity = pulseStrength * 0.42
  const pulseScale = 5 + (1 - normalized) * 10
  backdrop.boostPulseSprite.scale.set(pulseScale, pulseScale * 0.72, 1)
  return nextRemaining
}

export function disposeSpaceBackdrop(backdrop: SpaceBackdropRuntime) {
  backdrop.group.traverse((object) => {
    const mesh = object as THREE.Mesh
    if (mesh.geometry) {
      mesh.geometry.dispose()
    }

    const material = (mesh.material as THREE.Material | THREE.Material[] | undefined)
    if (!material) {
      return
    }

    const disposeMaterial = (entry: THREE.Material) => {
      const materialWithMap = entry as THREE.Material & { map?: THREE.Texture | null }
      if (materialWithMap.map) {
        materialWithMap.map.dispose()
      }
      entry.dispose()
    }

    if (Array.isArray(material)) {
      material.forEach((entry) => disposeMaterial(entry))
      return
    }

    disposeMaterial(material)
  })

  backdrop.textures.forEach((texture) => texture.dispose())
}
