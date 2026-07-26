import * as THREE from 'three'
import type { ActorStyle } from './Actor'

type PixelMap = string[]

interface PixelPalette {
  o: string
  p: string
  s: string
  a: string
  g: string
  h: string
  w: string
  e: string
}

const PLAYER_PIXEL_MAP: PixelMap = [
  '....................',
  '..........oo........',
  '.......oooppoo......',
  '....oooopppppooo....',
  '..oooopppppppppooo..',
  '.ooopppppggpppppooo.',
  'ooopppppppppppppppao',
  'oowwpppppsppppppppao',
  'ooowwpppppppppppppao',
  'oowwpppppsppppppppao',
  'ooopppppppppppppppao',
  '.ooopppppggpppppooo.',
  '..oooopppppppppooo..',
  '....oooopppppooo....',
  '.......ooaappoo.....',
  '..........oo........',
  '....................',
]

const GRUNT_PIXEL_MAP: PixelMap = [
  '....................',
  '........oo..........',
  '.....oooppooo.......',
  '...oooppppppoooo....',
  '..ooopppppppppppooo.',
  '.oaappppppppppppppoo',
  'oappppppppsppppppwoo',
  'oapppppppppppppwwwoo',
  'oappppppppsppppppwoo',
  '.oaappppppppppppppoo',
  '..ooopppppggppppooo.',
  '...oooppppppppoooo..',
  '.....ooopppppooo....',
  '.......ooppaaoo.....',
  '...........oo.......',
  '....................',
  '....................',
]

const BOSS_PIXEL_MAP: PixelMap = [
  '......ooaaooo.......',
  '...oooopppppoooo....',
  '.oooopppppppppppooo.',
  'ooopppppppppppppppao',
  'oapppppggppppggpppao',
  'oappppppppssppppppao',
  'oappppppppppppppppao',
  'oapppppaaaaaapppppao',
  'oappppppppppppppppao',
  'oappppppppssppppppao',
  'oapppppggppppggpppao',
  'ooopppppppppppppppao',
  '.oooopppppppppppooo.',
  '...oooopppppppooo...',
  '......ooaaooo.......',
  '.........oo.........',
  '....................',
]

const DRAINER_PIXEL_MAP: PixelMap = [
  '....................',
  '........oo..........',
  '.....oooppooo.......',
  '...oooppppppoooo....',
  '..ooopppgggpppppooo.',
  '.oaappppppppppppppoo',
  'oapppppppppppppppwoo',
  'oappppwwppssppwwpwoo',
  'oapppwwwwppppwwwwwoo',
  'oappppwwppssppwwpwoo',
  '.oaappppppppppppppoo',
  '..ooopppgggpppppooo.',
  '...ooopppppppoooo...',
  '.....oooppppooo.....',
  '........oo..oo......',
  '....................',
  '....................',
]

const SUMMONER_PIXEL_MAP: PixelMap = [
  '.........aa.........',
  '......ooaappoo......',
  '....oooppppppooo....',
  '..ooopppppppppppoo..',
  '.ooopppgppppppgppoo.',
  'oappppppppsspppppaoo',
  'oapppppppppppppppwoo',
  'oappppsppaaaappsppwo',
  'oapppppppppppppppwoo',
  '.ooopppgppppppgppoo.',
  '..ooopppppppppppoo..',
  '....ooopppppppoo....',
  '......ooaappoo......',
  '.........oo.........',
  '....................',
  '....................',
]

function getPixelMapForLabel(label: string): PixelMap {
  if (label === 'P') {
    return PLAYER_PIXEL_MAP
  }

  if (label === 'B') {
    return BOSS_PIXEL_MAP
  }

  if (label === 'D') {
    return DRAINER_PIXEL_MAP
  }

  if (label === 'S') {
    return SUMMONER_PIXEL_MAP
  }

  return GRUNT_PIXEL_MAP
}

function getPixelPalette(style: ActorStyle): PixelPalette {
  return {
    o: 'rgba(14, 18, 28, 0.95)',
    p: style.primary,
    s: style.secondary,
    a: style.accent,
    g: style.glow,
    h: style.label === 'P' ? 'rgba(245, 198, 160, 0.98)' : 'rgba(122, 72, 72, 0.95)',
    w: style.trail,
    e: 'rgba(245, 245, 245, 0.95)',
  }
}

function drawPixelMap(
  context: CanvasRenderingContext2D,
  map: PixelMap,
  palette: PixelPalette,
  offsetX: number,
  offsetY: number,
  pixelSize: number,
) {
  const colorByToken: Record<string, string> = {
    o: palette.o,
    p: palette.p,
    s: palette.s,
    a: palette.a,
    g: palette.g,
    h: palette.h,
    w: palette.w,
    e: palette.e,
  }

  for (let row = 0; row < map.length; row += 1) {
    const line = map[row]
    for (let column = 0; column < line.length; column += 1) {
      const token = line[column]
      if (token === '.') {
        continue
      }

      const color = colorByToken[token]
      if (!color) {
        continue
      }

      context.fillStyle = color
      context.fillRect(offsetX + column * pixelSize, offsetY + row * pixelSize, pixelSize, pixelSize)
    }
  }
}

function drawPixelOutline(
  context: CanvasRenderingContext2D,
  map: PixelMap,
  offsetX: number,
  offsetY: number,
  pixelSize: number,
) {
  context.fillStyle = 'rgba(4, 8, 14, 0.94)'

  const rows = map.length
  const cols = map[0]?.length ?? 0

  const isFilled = (x: number, y: number) => {
    if (y < 0 || y >= rows || x < 0 || x >= cols) {
      return false
    }

    return map[y][x] !== '.'
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < cols; column += 1) {
      if (!isFilled(column, row)) {
        continue
      }

      const leftEmpty = !isFilled(column - 1, row)
      const rightEmpty = !isFilled(column + 1, row)
      const topEmpty = !isFilled(column, row - 1)
      const bottomEmpty = !isFilled(column, row + 1)

      const x = offsetX + column * pixelSize
      const y = offsetY + row * pixelSize

      if (leftEmpty) {
        context.fillRect(x - 2, y, 2, pixelSize)
      }
      if (rightEmpty) {
        context.fillRect(x + pixelSize, y, 2, pixelSize)
      }
      if (topEmpty) {
        context.fillRect(x, y - 2, pixelSize, 2)
      }
      if (bottomEmpty) {
        context.fillRect(x, y + pixelSize, pixelSize, 2)
      }
    }
  }
}

function drawPlayerShip(context: CanvasRenderingContext2D, style: ActorStyle) {
  const hullGradient = context.createLinearGradient(126, 112, 384, 398)
  hullGradient.addColorStop(0, 'rgba(248, 252, 255, 0.96)')
  hullGradient.addColorStop(0.18, style.glow)
  hullGradient.addColorStop(0.48, style.primary)
  hullGradient.addColorStop(0.78, style.accent)
  hullGradient.addColorStop(1, 'rgba(6, 12, 18, 0.96)')

  const hullShadeGradient = context.createLinearGradient(192, 128, 330, 372)
  hullShadeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.24)')
  hullShadeGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.06)')
  hullShadeGradient.addColorStop(1, style.secondary)

  const canopyGradient = context.createLinearGradient(226, 172, 286, 270)
  canopyGradient.addColorStop(0, 'rgba(255, 255, 255, 0.94)')
  canopyGradient.addColorStop(0.28, 'rgba(186, 230, 253, 0.96)')
  canopyGradient.addColorStop(0.7, style.trail)
  canopyGradient.addColorStop(1, 'rgba(8, 47, 73, 0.96)')

  const engineGradient = context.createLinearGradient(82, 256, 158, 256)
  engineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
  engineGradient.addColorStop(0.34, 'rgba(255, 255, 255, 0.88)')
  engineGradient.addColorStop(0.68, style.trail)
  engineGradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

  context.fillStyle = 'rgba(7, 9, 17, 0.22)'
  context.beginPath()
  context.ellipse(256, 412, 118, 24, 0, 0, Math.PI * 2)
  context.fill()

  context.save()
  context.globalCompositeOperation = 'screen'
  const aura = context.createRadialGradient(246, 250, 24, 246, 250, 182)
  aura.addColorStop(0, style.glow)
  aura.addColorStop(0.38, 'rgba(186, 230, 253, 0.24)')
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = aura
  context.beginPath()
  context.arc(246, 252, 164, 0, Math.PI * 2)
  context.fill()
  context.restore()

  context.save()
  context.translate(256, 256)
  context.scale(-1, 1)

  context.fillStyle = engineGradient
  context.beginPath()
  context.moveTo(-148, -38)
  context.bezierCurveTo(-204, -30, -224, -12, -246, 0)
  context.bezierCurveTo(-224, 12, -204, 30, -148, 38)
  context.bezierCurveTo(-164, 20, -170, 6, -170, 0)
  context.bezierCurveTo(-170, -6, -164, -20, -148, -38)
  context.fill()

  context.fillStyle = 'rgba(2, 6, 23, 0.96)'
  context.strokeStyle = 'rgba(226, 232, 240, 0.18)'
  context.lineWidth = 5
  context.beginPath()
  context.moveTo(-144, 0)
  context.lineTo(-74, -18)
  context.lineTo(-44, -88)
  context.lineTo(58, -132)
  context.lineTo(152, -34)
  context.lineTo(176, 0)
  context.lineTo(152, 34)
  context.lineTo(58, 132)
  context.lineTo(-44, 88)
  context.lineTo(-74, 18)
  context.closePath()
  context.fill()
  context.stroke()

  context.fillStyle = hullGradient
  context.beginPath()
  context.moveTo(-128, 0)
  context.lineTo(-56, -18)
  context.lineTo(-18, -102)
  context.quadraticCurveTo(78, -136, 164, 0)
  context.quadraticCurveTo(78, 136, -18, 102)
  context.lineTo(-56, 18)
  context.closePath()
  context.fill()

  context.fillStyle = hullShadeGradient
  context.beginPath()
  context.moveTo(-94, 0)
  context.lineTo(-26, -18)
  context.quadraticCurveTo(52, -42, 116, 0)
  context.quadraticCurveTo(52, 42, -26, 18)
  context.closePath()
  context.fill()

  context.fillStyle = style.secondary
  context.beginPath()
  context.moveTo(-62, -18)
  context.lineTo(6, -82)
  context.lineTo(38, -70)
  context.lineTo(-2, -10)
  context.closePath()
  context.fill()
  context.beginPath()
  context.moveTo(-62, 18)
  context.lineTo(6, 82)
  context.lineTo(38, 70)
  context.lineTo(-2, 10)
  context.closePath()
  context.fill()

  context.fillStyle = style.accent
  context.beginPath()
  context.moveTo(70, -114)
  context.lineTo(154, -28)
  context.lineTo(132, -16)
  context.lineTo(52, -78)
  context.closePath()
  context.fill()
  context.beginPath()
  context.moveTo(70, 114)
  context.lineTo(154, 28)
  context.lineTo(132, 16)
  context.lineTo(52, 78)
  context.closePath()
  context.fill()

  context.fillStyle = canopyGradient
  context.strokeStyle = 'rgba(255, 255, 255, 0.48)'
  context.lineWidth = 4
  context.beginPath()
  context.moveTo(22, -42)
  context.quadraticCurveTo(74, -34, 104, 0)
  context.quadraticCurveTo(74, 34, 22, 42)
  context.quadraticCurveTo(-6, 26, -10, 0)
  context.quadraticCurveTo(-6, -26, 22, -42)
  context.closePath()
  context.fill()
  context.stroke()

  context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(8, 0)
  context.lineTo(90, 0)
  context.moveTo(30, -20)
  context.lineTo(80, -8)
  context.moveTo(30, 20)
  context.lineTo(80, 8)
  context.stroke()

  context.fillStyle = 'rgba(15, 23, 42, 0.9)'
  context.beginPath()
  context.moveTo(-108, -18)
  context.lineTo(-64, -10)
  context.lineTo(-58, 0)
  context.lineTo(-64, 10)
  context.lineTo(-108, 18)
  context.quadraticCurveTo(-124, 0, -108, -18)
  context.fill()

  context.fillStyle = style.glow
  context.beginPath()
  context.arc(-118, -10, 7, 0, Math.PI * 2)
  context.arc(-118, 10, 7, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = 'rgba(255, 255, 255, 0.82)'
  context.beginPath()
  context.arc(130, 0, 5, 0, Math.PI * 2)
  context.fill()

  context.restore()
}

function isEnemyLabel(label: string) {
  return label === 'X' || label === 'K' || label === 'Q' || label === 'Z' || label === 'B'
}

function drawEnemyShip(context: CanvasRenderingContext2D, style: ActorStyle) {
  const isBoss = style.label === 'K'
  const isDrainer = style.label === 'Q'
  const isSummoner = style.label === 'Z'
  const isBubbler = style.label === 'B'

  const hullGradient = context.createLinearGradient(402, 256, 92, 256)
  hullGradient.addColorStop(0, 'rgba(8, 12, 22, 0.96)')
  hullGradient.addColorStop(0.24, style.secondary)
  hullGradient.addColorStop(0.62, style.primary)
  hullGradient.addColorStop(1, style.accent)

  const coreGradient = context.createLinearGradient(330, 180, 170, 338)
  coreGradient.addColorStop(0, style.glow)
  coreGradient.addColorStop(0.42, style.primary)
  coreGradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)')

  const thrusterGradient = context.createLinearGradient(430, 256, 478, 256)
  thrusterGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
  thrusterGradient.addColorStop(0.4, style.trail)
  thrusterGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  context.fillStyle = 'rgba(7, 9, 17, 0.24)'
  context.beginPath()
  context.ellipse(256, 416, isBoss ? 128 : 108, isBoss ? 26 : 22, 0, 0, Math.PI * 2)
  context.fill()

  context.save()
  context.globalCompositeOperation = 'screen'
  const aura = context.createRadialGradient(246, 252, 22, 246, 252, isBoss ? 186 : 154)
  aura.addColorStop(0, style.glow)
  aura.addColorStop(0.4, 'rgba(255, 255, 255, 0.18)')
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = aura
  context.beginPath()
  context.arc(246, 252, isBoss ? 176 : 148, 0, Math.PI * 2)
  context.fill()
  context.restore()

  context.fillStyle = thrusterGradient
  context.beginPath()
  context.moveTo(326, -32 + 256)
  context.bezierCurveTo(384, -18 + 256, 440, -20 + 256, 486, 0 + 256)
  context.bezierCurveTo(440, 20 + 256, 384, 18 + 256, 326, 32 + 256)
  context.bezierCurveTo(342, 16 + 256, 350, 6 + 256, 350, 0 + 256)
  context.bezierCurveTo(350, -6 + 256, 342, -16 + 256, 326, -32 + 256)
  context.fill()

  context.fillStyle = 'rgba(2, 6, 23, 0.97)'
  context.strokeStyle = 'rgba(226, 232, 240, 0.2)'
  context.lineWidth = isBoss ? 6 : 5
  context.beginPath()
  context.moveTo(92, 256)
  context.lineTo(168, 196)
  context.lineTo(282, 138)
  context.lineTo(370, 182)
  context.lineTo(410, 226)
  context.lineTo(420, 256)
  context.lineTo(410, 286)
  context.lineTo(370, 330)
  context.lineTo(282, 374)
  context.lineTo(168, 316)
  context.closePath()
  context.fill()
  context.stroke()

  context.fillStyle = hullGradient
  context.beginPath()
  context.moveTo(106, 256)
  context.lineTo(180, 206)
  context.quadraticCurveTo(250, 170, 356, 218)
  context.quadraticCurveTo(388, 236, 396, 256)
  context.quadraticCurveTo(388, 276, 356, 294)
  context.quadraticCurveTo(250, 342, 180, 306)
  context.closePath()
  context.fill()

  context.fillStyle = coreGradient
  context.beginPath()
  context.moveTo(154, 256)
  context.lineTo(206, 224)
  context.quadraticCurveTo(258, 208, 324, 240)
  context.quadraticCurveTo(336, 248, 336, 256)
  context.quadraticCurveTo(336, 264, 324, 272)
  context.quadraticCurveTo(258, 304, 206, 288)
  context.closePath()
  context.fill()

  context.fillStyle = style.secondary
  context.beginPath()
  context.moveTo(196, 176)
  context.lineTo(280, 148)
  context.lineTo(332, 172)
  context.lineTo(246, 210)
  context.closePath()
  context.fill()

  context.beginPath()
  context.moveTo(196, 336)
  context.lineTo(280, 364)
  context.lineTo(332, 340)
  context.lineTo(246, 302)
  context.closePath()
  context.fill()

  context.fillStyle = style.accent
  context.beginPath()
  context.moveTo(110, 256)
  context.lineTo(154, 232)
  context.lineTo(154, 280)
  context.closePath()
  context.fill()

  context.fillStyle = 'rgba(255, 255, 255, 0.86)'
  context.beginPath()
  context.ellipse(248, 256, 20, 16, 0, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = style.glow
  context.beginPath()
  context.arc(248, 256, isBoss ? 8 : 6, 0, Math.PI * 2)
  context.fill()

  if (isBoss) {
    context.fillStyle = style.accent
    context.beginPath()
    context.moveTo(230, 152)
    context.lineTo(262, 126)
    context.lineTo(300, 146)
    context.lineTo(270, 170)
    context.closePath()
    context.fill()

    context.beginPath()
    context.moveTo(230, 360)
    context.lineTo(262, 386)
    context.lineTo(300, 366)
    context.lineTo(270, 342)
    context.closePath()
    context.fill()
  }

  if (isDrainer) {
    context.strokeStyle = style.trail
    context.lineWidth = 4
    context.beginPath()
    context.arc(226, 256, 46, Math.PI * 0.75, Math.PI * 1.35)
    context.arc(226, 256, 46, Math.PI * 0.65, Math.PI * 0.25, true)
    context.stroke()
  }

  if (isSummoner) {
    context.strokeStyle = 'rgba(255, 255, 255, 0.35)'
    context.lineWidth = 3
    context.beginPath()
    context.arc(248, 256, 58, 0, Math.PI * 2)
    context.stroke()

    context.fillStyle = style.accent
    for (let index = 0; index < 4; index += 1) {
      const angle = (index / 4) * Math.PI * 2
      const x = 248 + Math.cos(angle) * 58
      const y = 256 + Math.sin(angle) * 58
      context.beginPath()
      context.arc(x, y, 4, 0, Math.PI * 2)
      context.fill()
    }
  }

  if (isBubbler) {
    context.save()
    context.globalCompositeOperation = 'screen'

    context.strokeStyle = 'rgba(224, 242, 254, 0.42)'
    context.lineWidth = 3
    context.beginPath()
    context.ellipse(248, 256, 72, 58, 0, 0, Math.PI * 2)
    context.stroke()

    context.strokeStyle = style.trail
    context.lineWidth = 2.5
    context.beginPath()
    context.ellipse(248, 256, 92, 72, 0, 0, Math.PI * 2)
    context.stroke()

    context.fillStyle = 'rgba(255, 255, 255, 0.72)'
    context.beginPath()
    context.arc(212, 216, 10, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = style.glow
    context.beginPath()
    context.arc(288, 214, 7, 0, Math.PI * 2)
    context.fill()

    context.fillStyle = style.accent
    for (let index = 0; index < 5; index += 1) {
      const angle = -Math.PI * 0.9 + index * 0.52
      const x = 248 + Math.cos(angle) * 78
      const y = 256 + Math.sin(angle) * 52
      context.beginPath()
      context.arc(x, y, 3.5 + (index % 2) * 1.2, 0, Math.PI * 2)
      context.fill()
    }

    context.restore()
  }
}

function drawPixelSprite(context: CanvasRenderingContext2D, style: ActorStyle) {
  if (style.label === 'P') {
    drawPlayerShip(context, style)
    return
  }

  if (isEnemyLabel(style.label)) {
    drawEnemyShip(context, style)
    return
  }

  const map = getPixelMapForLabel(style.label)
  const palette = getPixelPalette(style)
  const width = map[0]?.length ?? 20
  const height = map.length
  const pixelSize = 18
  const spriteWidth = width * pixelSize
  const spriteHeight = height * pixelSize
  const originX = Math.floor((512 - spriteWidth) / 2)
  const originY = Math.floor((512 - spriteHeight) / 2)

  context.fillStyle = 'rgba(7, 9, 17, 0.28)'
  context.beginPath()
  context.ellipse(256, 418, 112, 22, 0, 0, Math.PI * 2)
  context.fill()

  drawPixelOutline(context, map, originX, originY, pixelSize)
  drawPixelMap(context, map, palette, originX, originY, pixelSize)
}

export class ActorSpriteTexture {
  static create(style: ActorStyle) {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Unable to create actor sprite texture context')
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.imageSmoothingEnabled = style.label === 'P' || isEnemyLabel(style.label)
    drawPixelSprite(context, style)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    if (style.label === 'P' || isEnemyLabel(style.label)) {
      texture.magFilter = THREE.LinearFilter
      texture.minFilter = THREE.LinearMipmapLinearFilter
    } else {
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
    }
    texture.needsUpdate = true
    return texture
  }

  static createHitFlash(style: ActorStyle) {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Unable to create actor hit flash texture context')
    }

    const burst = context.createRadialGradient(128, 128, 8, 128, 128, 114)
    burst.addColorStop(0, style.glow)
    burst.addColorStop(0.22, style.accent)
    burst.addColorStop(0.56, style.primary)
    burst.addColorStop(1, 'rgba(0, 0, 0, 0)')

    context.fillStyle = burst
    context.beginPath()
    context.arc(128, 128, 108, 0, Math.PI * 2)
    context.fill()

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return texture
  }
}
