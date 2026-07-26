import * as THREE from 'three'

export interface AttackPalette {
  core: string
  edge: string
  trail: string
}

const DEFAULT_ATTACK_PALETTE: AttackPalette = {
  core: 'rgba(255, 255, 255, 1)',
  edge: 'rgba(129, 140, 248, 0.9)',
  trail: 'rgba(56, 189, 248, 0.98)',
}

export class AttackSpriteTexture {
  static create(palette: AttackPalette = DEFAULT_ATTACK_PALETTE) {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Unable to create attack texture context')
    }

    context.clearRect(0, 0, canvas.width, canvas.height)

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.imageSmoothingEnabled = false

    const coreGlow = context.createRadialGradient(64, 64, 4, 64, 64, 58)
  coreGlow.addColorStop(0, palette.core)
  coreGlow.addColorStop(0.2, 'rgba(248, 250, 252, 0.98)')
  coreGlow.addColorStop(0.45, palette.edge)
  coreGlow.addColorStop(0.76, palette.trail)
    coreGlow.addColorStop(1, 'rgba(15, 23, 42, 0)')

    context.globalAlpha = 0.56
    context.fillStyle = coreGlow
    context.beginPath()
    context.arc(64, 64, 54, 0, Math.PI * 2)
    context.fill()
    context.globalAlpha = 1

    const pixel = 8
    const startX = 64 - pixel * 3
    const startY = 64 - pixel * 2

    const drawPx = (x: number, y: number, color: string) => {
      context.fillStyle = color
      context.fillRect(startX + x * pixel, startY + y * pixel, pixel, pixel)
    }

    // Tiny "code packet" projectile: < > core with directional streak.
    drawPx(2, 0, palette.edge)
    drawPx(1, 1, palette.edge)
    drawPx(3, 1, 'rgba(255, 255, 255, 1)')
    drawPx(0, 2, palette.trail)
    drawPx(2, 2, 'rgba(255, 255, 255, 1)')
    drawPx(4, 2, palette.edge)
    drawPx(1, 3, palette.edge)
    drawPx(3, 3, 'rgba(255, 255, 255, 1)')
    drawPx(2, 4, palette.edge)

    context.fillStyle = 'rgba(255, 255, 255, 0.98)'
    context.fillRect(startX + pixel * 5, startY + pixel * 2, pixel, pixel)
    context.fillRect(startX + pixel * 6, startY + pixel * 2, pixel, pixel)
    context.fillRect(startX + pixel * 7, startY + pixel * 2, pixel, pixel)
    context.fillRect(startX + pixel * 4, startY + pixel * 2, pixel, pixel)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.needsUpdate = true
    return texture
  }
}
