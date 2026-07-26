import * as THREE from 'three'

interface PlanetPosition {
  x: number
  y: number
}

export const SPACE_PLANET_SIZE_MULTIPLIER = 2
export const SPACE_PLANET_BRIGHTNESS_MULTIPLIER = 5

const RANK_PLANET_POSITIONS: PlanetPosition[] = [
  { x: -0.72, y: 0.58 },
  { x: 0.68, y: 0.56 },
  { x: -0.62, y: -0.54 },
  { x: 0.6, y: -0.5 },
  { x: -0.78, y: 0.12 },
  { x: 0.78, y: -0.04 },
  { x: -0.2, y: 0.64 },
  { x: 0.22, y: -0.62 },
  { x: -0.5, y: 0.36 },
  { x: 0.54, y: 0.3 },
  { x: -0.32, y: -0.3 },
  { x: 0.36, y: -0.24 },
  { x: -0.84, y: -0.2 },
  { x: 0.84, y: 0.22 },
  { x: -0.08, y: 0.74 },
  { x: 0.1, y: -0.74 },
  { x: -0.64, y: 0.02 },
  { x: 0.66, y: -0.1 },
  { x: -0.4, y: -0.66 },
  { x: 0.42, y: 0.68 },
]

const RANK_PLANET_HUES: number[] = [
  0.55, 0.58, 0.44, 0.38, 0.24,
  0.15, 0.11, 0.07, 0.05, 0.0,
  0.96, 0.91, 0.84, 0.78, 0.72,
  0.68, 0.61, 0.53, 0.48, 0.03,
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

function createRankPlanetTexture(rank: number, size: number, hue: number): THREE.CanvasTexture {
  const random = createSeededRandom(8101 + rank * 97)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank planet texture context')
  }

  const center = size * 0.5
  const baseRadius = size * 0.39
  const points = 36

  context.save()
  context.translate(center, center)
  context.beginPath()
  for (let index = 0; index < points; index += 1) {
    const t = index / points
    const angle = t * Math.PI * 2
    const wobble = 0.88 + random() * 0.24 + Math.sin(angle * (2 + (rank % 4))) * 0.03
    const radius = baseRadius * wobble
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (index === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  }
  context.closePath()

  const bodyGradient = context.createRadialGradient(
    -baseRadius * 0.22,
    -baseRadius * 0.18,
    baseRadius * 0.08,
    0,
    0,
    baseRadius,
  )
  bodyGradient.addColorStop(0, hslToRgba(hue, 0.68, 0.72, 1))
  bodyGradient.addColorStop(0.58, hslToRgba(hue, 0.6, 0.5, 0))
  bodyGradient.addColorStop(1, hslToRgba((hue + 0.06) % 1, 0.54, 0.2, 0))
  context.fillStyle = bodyGradient
  context.fill()

  const stripeCount = 0
  for (let stripeIndex = 0; stripeIndex < stripeCount; stripeIndex += 1) {
    const stripeY = -baseRadius * 0.52 + (stripeIndex / Math.max(1, stripeCount - 1)) * baseRadius * 1.04
    const stripeHeight = baseRadius * (0.1 + random() * 0.06)
    context.fillStyle = hslToRgba((hue + stripeIndex * 0.015) % 1, 0.45, 0.62 - stripeIndex * 0.05, 0.22)
    context.fillRect(-baseRadius * 0.86, stripeY, baseRadius * 1.72, stripeHeight)
  }

  const craterCount = 0
  for (let craterIndex = 0; craterIndex < craterCount; craterIndex += 1) {
    const craterR = baseRadius * (0.08 + random() * 0.08)
    const craterX = (random() - 0.5) * baseRadius * 1.2
    const craterY = (random() - 0.5) * baseRadius * 1.2
    context.beginPath()
    context.arc(craterX, craterY, craterR, 0, Math.PI * 2)
    context.fillStyle = hslToRgba((hue + 0.08) % 1, 0.42, 0.18, 0.26)
    context.fill()
  }

  context.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createRankRingTexture(rank: number, size: number, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create rank ring texture context')
  }

  const center = size * 0.5
  const outerRadius = size * (0.45 + (rank % 3) * 0.02)
  const innerRadius = outerRadius * 0.63

  context.beginPath()
  context.arc(center, center, outerRadius, 0, Math.PI * 2)
  context.arc(center, center, innerRadius, 0, Math.PI * 2, true)
  context.closePath()
  context.fillStyle = hslToRgba(hue, 0.64, 0.74, 0.34)
  context.fill()

  context.beginPath()
  context.arc(center, center, outerRadius, 0, Math.PI * 2)
  context.lineWidth = Math.max(1, size * 0.014)
  context.strokeStyle = hslToRgba((hue + 0.04) % 1, 0.56, 0.84, 0.5)
  context.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createPlanetGlowTexture(size: number, hue: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create planet glow texture context')
  }

  const center = size * 0.5
  const gradient = context.createRadialGradient(center, center, size * 0.08, center, center, size * 0.5)
  gradient.addColorStop(0, hslToRgba(hue, 0.82, 0.9, 0.66))
  gradient.addColorStop(0.42, hslToRgba(hue, 0.78, 0.62, 0.24))
  gradient.addColorStop(1, hslToRgba(hue, 0.72, 0.2, 0))
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function addRankPlanetToBackdrop(options: {
  rank: number
  group: THREE.Group
  textures: THREE.Texture[]
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}) {
  const rankIndex = Math.max(0, Math.min(19, Math.floor(options.rank) - 1))
  const normalizedPos = RANK_PLANET_POSITIONS[rankIndex]
  const hue = RANK_PLANET_HUES[rankIndex]

  const planetTexture = createRankPlanetTexture(rankIndex + 1, 320, hue)
  const ringTexture = createRankRingTexture(rankIndex + 1, 320, (hue + 0.09) % 1)
  const glowTexture = createPlanetGlowTexture(320, hue)
  options.textures.push(planetTexture, ringTexture, glowTexture)

  const planetGroup = new THREE.Group()

  const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: new THREE.Color().setHSL((hue + 0.02) % 1, 0.7, 0.76),
    transparent: true,
    opacity: THREE.MathUtils.clamp(0.11 * SPACE_PLANET_BRIGHTNESS_MULTIPLIER, 0, 1),
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
  const glow = new THREE.Sprite(glowMaterial)
  glow.position.set(0, 0, -0.03)
  planetGroup.add(glow)

  const planetMaterial = new THREE.SpriteMaterial({
    map: planetTexture,
    color: 0xffffff,
    transparent: true,
    opacity: THREE.MathUtils.clamp(0.25 * SPACE_PLANET_BRIGHTNESS_MULTIPLIER, 0, 1),
    depthWrite: false,
    depthTest: false,
    blending: THREE.NormalBlending,
  })
  const planetSprite = new THREE.Sprite(planetMaterial)
  const planetSize = (8.2 + rankIndex * 0.28) * 2 * SPACE_PLANET_SIZE_MULTIPLIER
  planetSprite.scale.set(planetSize, planetSize * (0.92 + (rankIndex % 3) * 0.04), 1)
  planetGroup.add(planetSprite)
  glow.scale.set(planetSize * 1.5, planetSize * 1.35, 1)

  const ringLayerCount = 1 + (rankIndex % 3)
  for (let index = 0; index < ringLayerCount; index += 1) {
    const ringMaterial = new THREE.SpriteMaterial({
      map: ringTexture,
      color: new THREE.Color().setHSL((hue + index * 0.03) % 1, 0.64, 0.78),
      transparent: true,
      opacity: THREE.MathUtils.clamp((0.11 + index * 0.02) * SPACE_PLANET_BRIGHTNESS_MULTIPLIER, 0, 1),
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    const ring = new THREE.Sprite(ringMaterial)
    const scale = 1.22 + index * 0.26
    ring.scale.set(planetSize * scale, planetSize * (0.36 + index * 0.08), 1)
    ring.material.rotation = -0.52 + ((rankIndex + index) % 9) * 0.12
    ring.position.set(0, 0, -0.01 - index * 0.01)
    planetGroup.add(ring)
  }

  if (rankIndex % 2 === 0) {
    const moonMaterial = new THREE.SpriteMaterial({
      map: planetTexture,
      color: new THREE.Color().setHSL((hue + 0.15) % 1, 0.4, 0.84),
      transparent: true,
      opacity: THREE.MathUtils.clamp(0.16 * SPACE_PLANET_BRIGHTNESS_MULTIPLIER, 0, 1),
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    })
    const moon = new THREE.Sprite(moonMaterial)
    const moonSize = planetSize * 0.18
    moon.scale.set(moonSize, moonSize, 1)
    moon.position.set(planetSize * 0.62, planetSize * 0.32, -0.02)
    planetGroup.add(moon)
  }

  let visibleX = normalizedPos.x * 0.7
  let visibleY = normalizedPos.y * 0.68
  const edgeStrength = 0.88
  if (Math.abs(visibleX) >= Math.abs(visibleY)) {
    visibleX = Math.sign(visibleX || 1) * edgeStrength
    visibleY = THREE.MathUtils.clamp(visibleY, -0.8, 0.8)
  } else {
    visibleY = Math.sign(visibleY || 1) * edgeStrength
    visibleX = THREE.MathUtils.clamp(visibleX, -0.8, 0.8)
  }

  if (rankIndex % 4 === 0) {
    visibleX = Math.sign(visibleX || 1) * 0.92
    visibleY = Math.sign(visibleY || 1) * 0.92
  }
  const x = THREE.MathUtils.lerp(options.xMin, options.xMax, (visibleX + 1) * 0.5)
  const y = THREE.MathUtils.lerp(options.yMin, options.yMax, (visibleY + 1) * 0.5)
  const z = -16.4 - (rankIndex % 4) * 0.9
  planetGroup.position.set(x, y, z)
  planetGroup.renderOrder = 11
  options.group.add(planetGroup)
}
