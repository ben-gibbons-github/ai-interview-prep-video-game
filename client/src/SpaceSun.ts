import * as THREE from 'three'

interface SunPosition {
  x: number
  y: number
}

export const SPACE_SUN_SIZE_MULTIPLIER = 10
export const SPACE_SUN_BRIGHTNESS_MULTIPLIER = 1

const RANK_SUN_POSITIONS: SunPosition[] = [
  { x: 0.76, y: 0.64 },
  { x: -0.78, y: 0.62 },
  { x: 0.74, y: -0.6 },
  { x: -0.72, y: -0.58 },
  { x: 0.9, y: 0.12 },
  { x: -0.9, y: -0.16 },
  { x: 0.22, y: 0.88 },
  { x: -0.24, y: -0.88 },
  { x: 0.56, y: 0.46 },
  { x: -0.58, y: 0.4 },
  { x: 0.44, y: -0.46 },
  { x: -0.46, y: -0.42 },
  { x: 0.86, y: -0.28 },
  { x: -0.86, y: 0.3 },
  { x: 0.08, y: 0.94 },
  { x: -0.1, y: -0.94 },
  { x: 0.66, y: -0.02 },
  { x: -0.68, y: 0.04 },
  { x: 0.34, y: 0.74 },
  { x: -0.36, y: -0.76 },
]

const RANK_SUN_HUES: number[] = [
  0.12, 0.14, 0.1, 0.08, 0.17,
  0.06, 0.03, 0.01, 0.9, 0.94,
  0.86, 0.82, 0.74, 0.68, 0.58,
  0.52, 0.46, 0.4, 0.24, 0.0,
]

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

function hslToRgba(h: number, s: number, l: number, a: number): string {
  const color = new THREE.Color().setHSL(h, s, l)
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${a})`
}

function createSunTexture(rank: number, size: number, hue: number): THREE.CanvasTexture {
  const random = createSeededRandom(32021 + rank * 67)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank sun texture context')
  }

  const center = size * 0.5
  const coreRadius = size * 0.26

  const corona = context.createRadialGradient(center, center, coreRadius * 0.25, center, center, size * 0.5)
  corona.addColorStop(0, hslToRgba(hue, 0.95, 0.95, 1))
  corona.addColorStop(0.34, hslToRgba((hue + 0.03) % 1, 0.88, 0.72, 0.88))
  corona.addColorStop(0.7, hslToRgba((hue + 0.07) % 1, 0.82, 0.48, 0.3))
  corona.addColorStop(1, hslToRgba((hue + 0.12) % 1, 0.76, 0.18, 0))
  context.fillStyle = corona
  context.fillRect(0, 0, size, size)

  const flareCount = 5 + (rank % 4)
  context.save()
  context.translate(center, center)
  for (let index = 0; index < flareCount; index += 1) {
    const angle = (index / flareCount) * Math.PI * 2 + random() * 0.24
    const length = coreRadius * (1.4 + random() * 0.9)
    const width = coreRadius * (0.08 + random() * 0.08)
    context.rotate(angle)
    const flareGradient = context.createLinearGradient(0, 0, length, 0)
    flareGradient.addColorStop(0, hslToRgba(hue, 0.92, 0.86, 0.34))
    flareGradient.addColorStop(1, hslToRgba((hue + 0.06) % 1, 0.9, 0.32, 0))
    context.fillStyle = flareGradient
    context.fillRect(coreRadius * 0.2, -width * 0.5, length, width)
    context.rotate(-angle)
  }
  context.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createSunHaloTexture(size: number, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank sun halo texture context')
  }

  const center = size * 0.5
  const gradient = context.createRadialGradient(center, center, size * 0.12, center, center, size * 0.5)
  gradient.addColorStop(0, hslToRgba(hue, 0.88, 0.86, 0.44))
  gradient.addColorStop(0.46, hslToRgba((hue + 0.04) % 1, 0.82, 0.62, 0.18))
  gradient.addColorStop(1, hslToRgba((hue + 0.08) % 1, 0.78, 0.16, 0))
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createSunSpikesTexture(size: number, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank sun spikes texture context')
  }

  const center = size * 0.5
  context.save()
  context.translate(center, center)
  const spikeCount = 0
  for (let index = 0; index < spikeCount; index += 1) {
    const angle = (index / spikeCount) * Math.PI * 2
    context.rotate(angle)
    const gradient = context.createLinearGradient(0, 0, size * 0.42, 0)
    gradient.addColorStop(0, hslToRgba(hue, 0.92, 0.82, 0.24))
    gradient.addColorStop(1, hslToRgba((hue + 0.05) % 1, 0.86, 0.32, 0))
    context.fillStyle = gradient
    context.fillRect(size * 0.08, -size * 0.012, size * 0.42, size * 0.024)
    context.rotate(-angle)
  }
  context.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createSunCoreTexture(size: number, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank sun core texture context')
  }

  const center = size * 0.5
  const gradient = context.createRadialGradient(center, center, size * 0.04, center, center, size * 0.5)
  gradient.addColorStop(0, hslToRgba(hue, 1, 1, 1))
  gradient.addColorStop(0.35, hslToRgba(hue, 0.98, 0.9, 0.92))
  gradient.addColorStop(0.72, hslToRgba((hue + 0.02) % 1, 0.9, 0.66, 0.3))
  gradient.addColorStop(1, hslToRgba((hue + 0.04) % 1, 0.82, 0.34, 0))
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function addRankSunToBackdrop(options: {
  rank: number
  group: THREE.Group
  textures: THREE.Texture[]
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}) {
  const rankIndex = Math.max(0, Math.min(19, Math.floor(options.rank) - 1))
  const sunPos = RANK_SUN_POSITIONS[rankIndex]
  const hue = RANK_SUN_HUES[rankIndex]

  const sunTexture = createSunTexture(rankIndex + 1, 320, hue)
  const haloTexture = createSunHaloTexture(320, hue)
  const spikesTexture = createSunSpikesTexture(320, hue)
  const coreTexture = createSunCoreTexture(320, hue)
  options.textures.push(sunTexture, haloTexture, spikesTexture, coreTexture)

  const sunGroup = new THREE.Group()

  const haloMaterial = new THREE.SpriteMaterial({
    map: haloTexture,
    color: new THREE.Color().setHSL((hue + 0.02) % 1, 0.8, 0.72),
    transparent: true,
    opacity: THREE.MathUtils.clamp(0.32 * SPACE_SUN_BRIGHTNESS_MULTIPLIER, 0, 1),
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const halo = new THREE.Sprite(haloMaterial)
  halo.position.set(0, 0, -0.03)
  sunGroup.add(halo)

  const spikesMaterial = new THREE.SpriteMaterial({
    map: spikesTexture,
    color: new THREE.Color().setHSL((hue + 0.03) % 1, 0.84, 0.76),
    transparent: true,
    opacity: THREE.MathUtils.clamp(0.34 * SPACE_SUN_BRIGHTNESS_MULTIPLIER, 0, 1),
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const spikes = new THREE.Sprite(spikesMaterial)
  spikes.position.set(0, 0, -0.02)
  sunGroup.add(spikes)

  const sunMaterial = new THREE.SpriteMaterial({
    map: sunTexture,
    color: 0xffffff,
    transparent: true,
    opacity: THREE.MathUtils.clamp(0.5 * SPACE_SUN_BRIGHTNESS_MULTIPLIER, 0, 1),
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const sunSprite = new THREE.Sprite(sunMaterial)
  sunGroup.add(sunSprite)

  const sunSize = (8.8 + rankIndex * 0.3) * SPACE_SUN_SIZE_MULTIPLIER
  halo.scale.set(sunSize * 2.9, sunSize * 2.9, 1)
  spikes.scale.set(sunSize * 2.3, sunSize * 2.3, 1)
  sunSprite.scale.set(sunSize, sunSize, 1)

  const coreLayerCount = 3
  for (let layerIndex = 0; layerIndex < coreLayerCount; layerIndex += 1) {
    const brightnessMultiplier = Math.pow(2, layerIndex + 1)
    const layerScale = Math.pow(0.5, layerIndex + 1)
    const coreMaterial = new THREE.SpriteMaterial({
      map: coreTexture,
      color: new THREE.Color().setHSL((hue + 0.01 * layerIndex) % 1, 0.95, 0.95),
      transparent: true,
      opacity: THREE.MathUtils.clamp(0.12 * brightnessMultiplier * SPACE_SUN_BRIGHTNESS_MULTIPLIER, 0, 1),
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const coreLayer = new THREE.Sprite(coreMaterial)
    coreLayer.scale.set(sunSize * layerScale, sunSize * layerScale, 1)
    coreLayer.position.set(0, 0, 0.01 + layerIndex * 0.01)
    sunGroup.add(coreLayer)
  }

  let visibleX = sunPos.x * 0.72
  let visibleY = sunPos.y * 0.7
//   if (visibleY < -0.5)
    // visibleY = 0.2
  const edgeStrength = 0.9
  if (Math.abs(visibleX) >= Math.abs(visibleY)) {
    visibleX = Math.sign(visibleX || 1) * edgeStrength
    visibleY = THREE.MathUtils.clamp(visibleY, -0.82, 0.82)
  } else {
    visibleY = Math.sign(visibleY || 1) * edgeStrength
    visibleX = THREE.MathUtils.clamp(visibleX, -0.82, 0.82)
  }

  if (rankIndex % 3 === 0) {
    visibleX = Math.sign(visibleX || 1) * 0.93
    visibleY = Math.sign(visibleY || 1) * 0.93
  }

  const x = THREE.MathUtils.lerp(options.xMin, options.xMax, (visibleX + 1) * 0.5)
  const y = THREE.MathUtils.lerp(options.yMin, options.yMax, (visibleY + 1) * 0.5)
  const z = -18.8 - (rankIndex % 4) * 0.8
  sunGroup.position.set(x, y, z)
  sunGroup.rotation.z = (rankIndex % 12) * 0.17
  sunGroup.renderOrder = 10

  options.group.add(sunGroup)
}
