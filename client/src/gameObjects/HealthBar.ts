import * as THREE from 'three'
import { GameObject } from '../GameObject'

export interface HealthBarStyle {
  background: string
  fillStart: string
  fillEnd: string
  outline: string
  glow: string
}

export interface HealthBarHandle {
  sprite: THREE.Sprite
  redraw: (
    health: number,
    maxHealth: number,
    status?: {
      kind: 'none' | 'burning' | 'frozen'
      strength: number
    },
  ) => void
}

function drawHealthBarTexture(
  context: CanvasRenderingContext2D,
  healthRatio: number,
  style: HealthBarStyle,
  status?: {
    kind: 'none' | 'burning' | 'frozen'
    strength: number
  },
) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  context.fillStyle = 'rgba(0, 0, 0, 0)'
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  const safeStatusStrength = Math.max(0, Math.min(1, status?.strength ?? 0))
  const effectiveOutline =
    status?.kind === 'frozen'
      ? `rgba(125, 211, 252, ${0.75 + safeStatusStrength * 0.2})`
      : status?.kind === 'burning'
        ? `rgba(248, 113, 113, ${0.72 + safeStatusStrength * 0.24})`
        : style.outline

  context.fillStyle = style.background
  context.strokeStyle = effectiveOutline
  context.lineWidth = 10
  context.beginPath()
  context.roundRect(20, 32, 472, 56, 24)
  context.fill()
  context.stroke()

  if (status?.kind === 'frozen' && safeStatusStrength > 0) {
    context.fillStyle = `rgba(125, 211, 252, ${0.18 + safeStatusStrength * 0.14})`
    context.beginPath()
    context.roundRect(22, 34, 468, 52, 22)
    context.fill()

    context.strokeStyle = `rgba(186, 230, 253, ${0.22 + safeStatusStrength * 0.2})`
    context.lineWidth = 2
    for (let index = 0; index < 10; index += 1) {
      const x = 38 + index * 44
      context.beginPath()
      context.moveTo(x, 36)
      context.lineTo(x + 8, 54)
      context.stroke()
    }
  }

  if (status?.kind === 'burning' && safeStatusStrength > 0) {
    const emberGradient = context.createLinearGradient(0, 86, 0, 32)
    emberGradient.addColorStop(0, `rgba(239, 68, 68, ${0.2 + safeStatusStrength * 0.18})`)
    emberGradient.addColorStop(1, 'rgba(239, 68, 68, 0)')
    context.fillStyle = emberGradient
    context.beginPath()
    context.roundRect(22, 34, 468, 52, 22)
    context.fill()

    context.fillStyle = `rgba(252, 165, 165, ${0.24 + safeStatusStrength * 0.22})`
    for (let index = 0; index < 12; index += 1) {
      const x = 30 + index * 38
      const y = 36 + ((index % 3) * 10)
      context.beginPath()
      context.arc(x, y, 2.1, 0, Math.PI * 2)
      context.fill()
    }
  }

  const safeRatio = Math.min(1, Math.max(0, healthRatio))
  const fillWidth = 460 * safeRatio
  const fillGradient = context.createLinearGradient(30, 0, 482, 0)
  fillGradient.addColorStop(0, style.fillStart)
  fillGradient.addColorStop(1, style.fillEnd)

  context.fillStyle = fillGradient
  context.beginPath()
  context.roundRect(26, 38, fillWidth, 44, 18)
  context.fill()

  context.fillStyle = style.glow
  context.globalAlpha = 0.35
  context.beginPath()
  context.roundRect(26, 38, fillWidth, 14, 9)
  context.fill()
  context.globalAlpha = 1

  for (let index = 0; index < 9; index += 1) {
    const markerX = 30 + index * 52
    context.strokeStyle = 'rgba(255, 255, 255, 0.12)'
    context.lineWidth = 3
    context.beginPath()
    context.moveTo(markerX, 40)
    context.lineTo(markerX, 80)
    context.stroke()
  }
}

export function createHealthBar(
  owner: GameObject,
  style: HealthBarStyle,
  options: {
    scaleMultiplier?: number
    positionY?: number
  } = {},
): HealthBarHandle {
  const healthbarCanvas = document.createElement('canvas')
  healthbarCanvas.width = 512
  healthbarCanvas.height = 128

  const healthbarContext = healthbarCanvas.getContext('2d')
  if (!healthbarContext) {
    throw new Error('Unable to create actor healthbar texture context')
  }

  const healthbarTexture = new THREE.CanvasTexture(healthbarCanvas)
  healthbarTexture.colorSpace = THREE.SRGBColorSpace
  const sprite = owner.addSprite(healthbarTexture, {
    position: [0, options.positionY ?? 1.95, 0],
    scale: 1,
    blending: THREE.NormalBlending,
    depthWrite: false,
    transparent: true,
    opacity: 1,
  })
  const scaleMultiplier = Math.max(0.2, options.scaleMultiplier ?? 1)
  sprite.scale.set(1.9 * scaleMultiplier, 0.42 * scaleMultiplier, 1)

  const redraw = (
    health: number,
    maxHealth: number,
    status: {
      kind: 'none' | 'burning' | 'frozen'
      strength: number
    } = { kind: 'none', strength: 0 },
  ) => {
    const ratio = maxHealth > 0 ? health / maxHealth : 0
    drawHealthBarTexture(healthbarContext, ratio, style, status)
    healthbarTexture.needsUpdate = true
    sprite.material.needsUpdate = true
  }

  redraw(1, 1)

  return {
    sprite,
    redraw,
  }
}