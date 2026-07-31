import * as THREE from 'three'
import { GameObject } from './GameObject'
import { Actor } from './gameObjects/Actor'
import { AlliedFighter, type AllyType } from './gameObjects/AlliedFighter'
import { Enemy } from './gameObjects/Enemy'
import { EnemyWaveSpawner } from './gameObjects/EnemyWaveSpawner'
import { QuestionNuke } from './gameObjects/QuestionNuke'
import { Player } from './Player/Player'
import { WaveManager, type RewardPrompt } from './WaveManager'
import type { GameSaveState } from './Player/GameSaving'
import type { AllySaveState } from './Player/GameSaving'
import type { EnemySaveState } from './Player/GameSaving'
import type { QuestionNukeSaveState } from './Player/GameSaving'
import { clearSavedGameState } from './Player/GameSaving'
import { calculateScoreFromRun } from './Player/GameSaving'
import type { RunSummary } from './WaveManager'
import { isLiveMicActive } from './ui/micOnly/MicOnlyLiveMicRegistry'
import {
  createSpaceBackdrop,
  disposeSpaceBackdrop,
  updateBackdropBoostPulse,
  updateSpaceBackdrop,
} from './SpaceBackdrop'
import type { RunLaunchConfig } from './ui/RunLaunchConfig'
import { applyRunLaunchArtifacts } from './ui/RunArtifactPipeline'

interface OverlayPayload {
  title: string
  message: string
  details?: string[]
  durationMs?: number
}

interface FloatingKillGoldText {
  sprite: THREE.Sprite
  material: THREE.SpriteMaterial
  texture: THREE.CanvasTexture
  velocityY: number
  velocityX: number
  ageSeconds: number
  lifetimeSeconds: number
  baseScaleX: number
  baseScaleY: number
}

interface MountWebGLWorldParams {
  mount: HTMLDivElement
  incomingDamageMultiplier: number
  enemyDifficultyMultiplier?: number
  runLaunchConfig?: RunLaunchConfig
  playerRef: { current: Player | null }
  waveManagerRef: { current: WaveManager | null }
  rewardPromptActiveRef: { current: boolean }
  setCurrentRound: (round: number) => void
  setRewardPrompt: (prompt: RewardPrompt | null) => void
  syncPlayerState: (player: Player) => void
  postOverlay: (payload: OverlayPayload) => string
  tickFreeze: (delta: number) => void
  getIsQuizPaused: () => boolean
  getIsBackdropMotionPaused: () => boolean
  handleCombatQuizVisibility: (shouldShowQuiz: boolean) => boolean
  initialSaveState?: GameSaveState | null
  setEnemySaveSnapshotProvider?: (provider: () => EnemySaveState[]) => void
  setAllySaveSnapshotProvider?: (provider: () => AllySaveState[]) => void
  setQuestionNukeSaveSnapshotProvider?: (provider: () => QuestionNukeSaveState[]) => void
  onPlayerLifeLost?: (remainingLives: number) => void
  onRunEnded?: (summary: RunSummary) => void
  getFieldVisualRank: () => number
  getFieldGlowBoostKey: () => number
}

const LIFE_LOSS_FREEZE_SECONDS = 15
const ROUND_CLEAR_MIC_INACTIVE_GRACE_SECONDS = 1.2
const FLEET_SUPPORT_TICK_SECONDS = 5
const MIN_ALLY_PLAYER_SEPARATION = 1.5
const MIN_ALLY_ALLY_SEPARATION = 1.2
const WORLD_LAYOUT_AIR_GAP = 0.09
const WORLD_LAYOUT_PASSES = 4
const WORLD_LAYOUT_TICK_SECONDS = 0.075
const HOVER_RAYCAST_TICK_SECONDS = 0.1
const FINAL_ROUND_FOR_VICTORY = 10
const PLAYER_LAYOUT_X = -5.35
const ALLY_LAYOUT_X_START = -4.4
const ALLY_LAYOUT_X_STEP = 0.85
const ENEMY_LAYOUT_X_START = 4.4
const ENEMY_LAYOUT_X_STEP = 0.85
const MAX_MINI_ALLIES = 8
const MAX_BOSS_ALLIES = 4
const KILL_GOLD_TEXT_LIFETIME_SECONDS = 24
const KILL_GOLD_TEXT_MOTION_SPEED_MULTIPLIER = 0.1
const KILL_GOLD_TEXT_FADE_SPEED_MULTIPLIER = 0.1

function distanceSquaredXY(a: THREE.Vector3, b: THREE.Vector3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return dx * dx + dy * dy
}

function isClearAllyPosition(candidate: THREE.Vector3, player: Player, allies: AlliedFighter[]): boolean {
  const minPlayerDistanceSquared = MIN_ALLY_PLAYER_SEPARATION * MIN_ALLY_PLAYER_SEPARATION
  if (distanceSquaredXY(candidate, player.group.position) < minPlayerDistanceSquared) {
    return false
  }

  const minAllyDistanceSquared = MIN_ALLY_ALLY_SEPARATION * MIN_ALLY_ALLY_SEPARATION
  for (const ally of allies) {
    if (!ally.isAlive()) {
      continue
    }

    if (distanceSquaredXY(candidate, ally.group.position) < minAllyDistanceSquared) {
      return false
    }
  }

  return true
}

function findClearAllyPosition(origin: THREE.Vector3, player: Player, allies: AlliedFighter[]): THREE.Vector3 {
  if (isClearAllyPosition(origin, player, allies)) {
    return origin.clone()
  }

  const attempts = 42
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  const ringStep = 0.34
  const baseRadius = 1.2

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const ringIndex = Math.floor(attempt / 6)
    const radius = baseRadius + ringIndex * ringStep
    const angle = attempt * goldenAngle
    const candidate = new THREE.Vector3(
      origin.x + Math.cos(angle) * radius,
      origin.y + Math.sin(angle) * radius,
      origin.z,
    )

    if (isClearAllyPosition(candidate, player, allies)) {
      return candidate
    }
  }

  return origin.clone()
}

function objectBelongsToActor(object: THREE.Object3D, actor: Actor): boolean {
  let current: THREE.Object3D | null = object
  while (current) {
    if (current === actor.group) {
      return true
    }
    current = current.parent
  }

  return false
}

function getEnemyHoverLabel(enemy: Enemy): string {
  switch (enemy.getKind()) {
    case 'boss':
      return 'final boss'
    case 'shield-drainer':
      return 'shield drainer'
    case 'summoner':
      return 'summoner'
    case 'bubbler':
      return 'bubbler'
    case 'grunt':
    default:
      return 'enemy'
  }
}

function spawnKillGoldText(
  scene: THREE.Scene,
  origin: readonly [number, number, number],
  goldAmount: number,
  activeTexts: FloatingKillGoldText[],
  breakdown?: { base: number; killMultiplier: number; artifactMultiplier: number; runMultiplier: number },
) {
  const roundedGold = Math.max(0, Math.round(goldAmount))
  if (roundedGold <= 0) {
    return
  }

  // Build breakdown string if available
  let breakdownStr = ''
  if (breakdown) {
    const showBreakdown =
      Math.abs(breakdown.killMultiplier - 1) > 0.0001 ||
      Math.abs(breakdown.artifactMultiplier - 1) > 0.0001 ||
      Math.abs(breakdown.runMultiplier - 1) > 0.0001
    if (showBreakdown) {
      breakdownStr = `${breakdown.base}g`
      if (Math.abs(breakdown.killMultiplier - 1) > 0.0001) {
        breakdownStr += ` ×${breakdown.killMultiplier.toFixed(2)}`
      }
      if (Math.abs(breakdown.artifactMultiplier - 1) > 0.0001) {
        breakdownStr += ` ×${breakdown.artifactMultiplier.toFixed(2)}`
      }
      if (Math.abs(breakdown.runMultiplier - 1) > 0.0001) {
        breakdownStr += ` ×${breakdown.runMultiplier.toFixed(2)}`
      }
    }
  }

  const text = `+${roundedGold}g${breakdownStr ? ` (${breakdownStr})` : ''}`
  const canvas = document.createElement('canvas')
  canvas.width = 320
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = 'bold 56px "Trebuchet MS", "Verdana", sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  context.strokeStyle = 'rgba(15, 23, 42, 0.9)'
  context.lineWidth = 10
  context.strokeText(text, canvas.width * 0.5, canvas.height * 0.56)

  context.fillStyle = 'rgba(253, 224, 71, 0.98)'
  context.fillText(text, canvas.width * 0.5, canvas.height * 0.56)

  context.globalAlpha = 0.35
  context.fillStyle = 'rgba(255, 255, 255, 0.95)'
  context.fillText(text, canvas.width * 0.5, canvas.height * 0.5)
  context.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.98,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  })

  const sprite = new THREE.Sprite(material)
  const baseScaleX = 1.85
  const baseScaleY = 0.74
  sprite.scale.set(baseScaleX, baseScaleY, 1)
  sprite.position.set(origin[0], origin[1] + 0.9, origin[2] + 0.2)
  scene.add(sprite)

  activeTexts.push({
    sprite,
    material,
    texture,
    velocityY: 0.78 * KILL_GOLD_TEXT_MOTION_SPEED_MULTIPLIER,
    velocityX: (Math.random() - 0.5) * 0.08 * KILL_GOLD_TEXT_MOTION_SPEED_MULTIPLIER,
    ageSeconds: 0,
    lifetimeSeconds: KILL_GOLD_TEXT_LIFETIME_SECONDS,
    baseScaleX,
    baseScaleY,
  })
}

function getActorLayoutRadius(actor: Actor): number {
  if (actor instanceof Player) {
    return 1.55
  }

  if (actor instanceof AlliedFighter) {
    return actor.getAllyType() === 'mini' ? 0.95 : 1.4
  }

  if (actor instanceof Enemy) {
    switch (actor.getKind()) {
      case 'boss':
        return 1.55
      case 'shield-drainer':
        return 1.3
      case 'summoner':
        return 1.28
      default:
        return 1.08
    }
  }

  return 1.1
}

function setActorLayoutPosition(actor: Actor, x: number, y: number, z: number) {
  if (actor instanceof Player) {
    actor.setFormationPosition(x, y, z)
    return
  }

  if (actor instanceof AlliedFighter) {
    actor.setHomePosition(x, y, z)
    return
  }

  if (actor instanceof Enemy) {
    actor.setFormationPosition(x, y, z)
    return
  }

  actor.group.position.set(x, y, z)
}

function normalizeWorldActorSpread(player: Player, allies: AlliedFighter[], enemies: Enemy[]) {
  const liveAllies = allies.filter((ally) => ally.isAlive())
  const liveEnemies = enemies.filter((enemy) => enemy.isAlive())
  const actors = [player, ...liveAllies, ...liveEnemies]
  if (actors.length <= 1) {
    return
  }

  const positions = actors.map((actor) => ({
    x: actor.group.position.x,
    y: actor.group.position.y,
    z: actor.group.position.z,
  }))
  const radii = actors.map((actor) => getActorLayoutRadius(actor))
  const targetXs: number[] = [PLAYER_LAYOUT_X]
  for (let allyIndex = 0; allyIndex < liveAllies.length; allyIndex += 1) {
    targetXs.push(ALLY_LAYOUT_X_START - allyIndex * ALLY_LAYOUT_X_STEP)
  }
  for (let enemyIndex = 0; enemyIndex < liveEnemies.length; enemyIndex += 1) {
    targetXs.push(ENEMY_LAYOUT_X_START + enemyIndex * ENEMY_LAYOUT_X_STEP)
  }

  for (let pass = 0; pass < WORLD_LAYOUT_PASSES; pass += 1) {
    for (let index = 0; index < positions.length; index += 1) {
      const targetX = targetXs[index]
      positions[index].x += (targetX - positions[index].x) * 0.18
    }

    for (let leftIndex = 0; leftIndex < positions.length - 1; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < positions.length; rightIndex += 1) {
        const left = positions[leftIndex]
        const right = positions[rightIndex]
        const deltaX = right.x - left.x
        const deltaY = right.y - left.y
        const distance = Math.hypot(deltaX, deltaY)
        const minDistance = radii[leftIndex] + radii[rightIndex] + WORLD_LAYOUT_AIR_GAP

        if (distance >= minDistance) {
          continue
        }

        const safeDistance = Math.max(0.0001, distance)
        const overlap = minDistance - safeDistance
        const axisX = deltaX / safeDistance
        const axisY = deltaY / safeDistance
        const push = overlap * 0.52

        left.x -= axisX * push
        left.y -= axisY * push
        right.x += axisX * push
        right.y += axisY * push
      }
    }

    positions[0].x = Math.min(positions[0].x, PLAYER_LAYOUT_X)
    positions[0].y = Math.max(-1.5, Math.min(1.9, positions[0].y))

    for (let index = 1; index < 1 + liveAllies.length; index += 1) {
      positions[index].x = Math.min(positions[index].x, PLAYER_LAYOUT_X - 0.55)
      positions[index].y = Math.max(-1.9, Math.min(2.1, positions[index].y))
    }

    for (let index = 1 + liveAllies.length; index < positions.length; index += 1) {
      positions[index].x = Math.max(positions[index].x, 0.8)
      positions[index].y = Math.max(-1.9, Math.min(2.1, positions[index].y))
    }
  }

  for (let index = 0; index < actors.length; index += 1) {
    const position = positions[index]
    setActorLayoutPosition(actors[index], position.x, position.y, position.z)
  }
}

export function mountWebGLWorld({
  mount,
  incomingDamageMultiplier,
  enemyDifficultyMultiplier = 1,
  runLaunchConfig,
  playerRef,
  waveManagerRef,
  rewardPromptActiveRef,
  setCurrentRound,
  setRewardPrompt,
  syncPlayerState,
  postOverlay,
  tickFreeze,
  getIsQuizPaused,
  getIsBackdropMotionPaused,
  handleCombatQuizVisibility,
  initialSaveState,
  setEnemySaveSnapshotProvider,
  setAllySaveSnapshotProvider,
  setQuestionNukeSaveSnapshotProvider,
  onPlayerLifeLost,
  onRunEnded,
  getFieldVisualRank,
  getFieldGlowBoostKey,
}: MountWebGLWorldParams) {
  Actor.setIncomingDamageMultiplier(incomingDamageMultiplier)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog('#090b12', 12, 44)

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  )
  camera.position.set(0, 2.35, 8.8)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(mount.clientWidth, mount.clientHeight)
  mount.appendChild(renderer.domElement)

  let backdropElapsedSeconds = 0
  let activeBackdrop = createSpaceBackdrop(getFieldVisualRank())
  scene.add(activeBackdrop.group)

  const hoverTooltip = document.createElement('div')
  hoverTooltip.style.position = 'fixed'
  hoverTooltip.style.pointerEvents = 'none'
  hoverTooltip.style.padding = '8px 10px'
  hoverTooltip.style.borderRadius = '8px'
  hoverTooltip.style.border = '1px solid rgba(52, 211, 153, 0.7)'
  hoverTooltip.style.background = 'rgba(2, 6, 23, 0.92)'
  hoverTooltip.style.color = 'rgba(226, 232, 240, 0.98)'
  hoverTooltip.style.fontFamily = 'Menlo, Monaco, monospace'
  hoverTooltip.style.fontSize = '11px'
  hoverTooltip.style.lineHeight = '1.4'
  hoverTooltip.style.whiteSpace = 'pre'
  hoverTooltip.style.transform = 'translate(-50%, -105%)'
  hoverTooltip.style.zIndex = '80'
  hoverTooltip.style.display = 'none'
  document.body.appendChild(hoverTooltip)

  const raycaster = new THREE.Raycaster()
  const pointerNdc = new THREE.Vector2(2, 2)
  let pointerInsideCanvas = false
  let hoveredActor: Actor | null = null

  const syncHoverTooltip = (actor: Actor | null) => {
    if (!actor) {
      hoverTooltip.style.display = 'none'
      hoveredActor = null
      return
    }

    const actorPosition = actor.group.position.clone()
    actorPosition.y += 2.1
    actorPosition.project(camera)

    const screenX = (actorPosition.x * 0.5 + 0.5) * window.innerWidth
    const screenY = (-actorPosition.y * 0.5 + 0.5) * window.innerHeight

    const actorLabel =
      actor === player
        ? 'player'
        : actor instanceof AlliedFighter
          ? actor.getAllyType() === 'boss'
            ? 'big boss'
            : 'mini fleet'
          : actor instanceof Enemy
            ? getEnemyHoverLabel(actor)
            : 'unit'

    const baseLines = [
      actorLabel,
      `HP: ${Math.round(actor.getCurrentHealth())} / ${Math.round(actor.getMaxHealthValue())}`,
      `Shield: ${Math.round(actor.getCurrentShield())} / ${Math.round(actor.getMaxShield())}`,
    ]

    if (actor instanceof Enemy) {
      baseLines.push(`Damage: ${Math.round(actor.getDamagePerShot())}`)
      baseLines.push(`Effect: ${actor.getSpecialEffectsSummary()}`)

      const burningSeconds = actor.getBurningRemainingSeconds()
      if (burningSeconds > 0) {
        baseLines.push(
          `Burning: ${burningSeconds.toFixed(1)}s @ ${actor.getBurningDamagePerSecond().toFixed(1)} DPS`,
        )
      }

      const frozenSeconds = actor.getFrozenRemainingSeconds()
      if (frozenSeconds > 0) {
        baseLines.push(
          `Frozen: ${frozenSeconds.toFixed(1)}s @ ${(actor.getFrozenIntensity() * 100).toFixed(0)}% intensity`,
        )
      }
    }

    hoverTooltip.textContent = baseLines.join('\n')

    hoverTooltip.style.left = `${screenX.toFixed(1)}px`
    hoverTooltip.style.top = `${screenY.toFixed(1)}px`
    hoverTooltip.style.display = 'block'
    hoveredActor = actor
  }

  const onPointerMove = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointerNdc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    pointerInsideCanvas = true
  }

  const onPointerLeave = () => {
    pointerInsideCanvas = false
    pointerNdc.set(2, 2)
    syncHoverTooltip(null)
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('pointerleave', onPointerLeave)

  const worldObject = new GameObject('World').addTo(scene)
  const player = new Player([-5.0, -0.05, 0.0])

  const activeChaosArtifactId = runLaunchConfig?.chaosArtifactId ?? null
  applyRunLaunchArtifacts(player, runLaunchConfig)

  playerRef.current = player
  worldObject.addChild(player)
  syncPlayerState(player)

  const waveManager = new WaveManager()
  waveManagerRef.current = waveManager

  const activeEnemies: Enemy[] = []
  const activeAllies: AlliedFighter[] = []
  const activeQuestionNukes: QuestionNuke[] = []
  const activeKillGoldTexts: FloatingKillGoldText[] = []
  const enemyAttackTargets: Actor[] = [player]
  const hoverCandidateActors: Actor[] = []
  const hoverTargetObjects: THREE.Object3D[] = []
  let lastAliveAllyTargetCount = -1
  let normalizeActorSpread = () => {}
  const enemyWaveSpawner = new EnemyWaveSpawner(
    worldObject,
    player,
    activeEnemies,
    postOverlay,
    enemyDifficultyMultiplier,
  )
  player.setAttackTargets(activeEnemies)
  enemyWaveSpawner.setEnemyAttackTargets(enemyAttackTargets)
  enemyWaveSpawner.setLayoutCorrectionCallback(() => {
    normalizeActorSpread()
  })
  setEnemySaveSnapshotProvider?.(() => enemyWaveSpawner.getLiveEnemyStates())
  setAllySaveSnapshotProvider?.(() => {
    return activeAllies
      .filter((ally) => ally.isAlive())
      .map((ally) => ally.getSaveState())
  })
  const pruneQuestionNukes = () => {
    for (let index = activeQuestionNukes.length - 1; index >= 0; index -= 1) {
      const nuke = activeQuestionNukes[index]
      if (nuke.group.parent === null) {
        activeQuestionNukes.splice(index, 1)
      }
    }
  }
  const registerEffect = (effect: GameObject) => {
    if (effect instanceof QuestionNuke) {
      activeQuestionNukes.push(effect)
    }

    worldObject.addChild(effect)
  }
  const refreshEnemyAttackTargets = (force = false) => {
    enemyAttackTargets.length = 1
    let aliveAllies = 0
    for (const ally of activeAllies) {
      if (!ally.isAlive()) {
        continue
      }

      aliveAllies += 1
      enemyAttackTargets.push(ally)
    }

    if (force || aliveAllies !== lastAliveAllyTargetCount) {
      enemyWaveSpawner.setEnemyAttackTargets(enemyAttackTargets)
      lastAliveAllyTargetCount = aliveAllies
    }
  }
  setQuestionNukeSaveSnapshotProvider?.(() => {
    pruneQuestionNukes()
    return activeQuestionNukes.map((nuke) => nuke.getSaveState())
  })

  let rewardPromptTimeoutId: number | null = null
  let didEndRun = false
  let lifeLossFreezeRemaining = 0
  let micInactiveBeforeRoundClearSeconds = 0
  let fleetSupportTickAccumulatorSeconds = 0
  let questionTimeHealthDrainTickAccumulatorSeconds = 0

  const queueRewardPrompt = (clearEvent: {
    wave: number
    defeatedEnemies: number
    nextWaveEnemyCount: number
    prompt: RewardPrompt
  }) => {
    rewardPromptTimeoutId = window.setTimeout(() => {
      if (isLiveMicActive()) {
        if (import.meta.env.DEV) {
          console.info('[STAR Workflow][WebGLWorld] Reward prompt deferred while live mic remains active')
        }
        queueRewardPrompt(clearEvent)
        return
      }

      rewardPromptTimeoutId = null
      rewardPromptActiveRef.current = true
      setRewardPrompt(clearEvent.prompt)

      postOverlay({
        title: `Round ${clearEvent.wave} Cleared`,
        message: `All ${clearEvent.defeatedEnemies} enemies defeated.`,
        details: [
          `Gold: ${Math.floor(player.getGold())}`,
          `Player HP: ${Math.round(player.getCurrentHealth())}/${player.getMaxHealthValue()}`,
          `Next wave enemies: ${clearEvent.nextWaveEnemyCount}`,
          'Shop is open. Buy as many stacks as you want, then continue',
        ],
        durationMs: 6200,
      })
    }, 300)
  }

  player.setDeathEffectSpawner((effect) => {
    registerEffect(effect)
  })
  player.setEffectSpawner((effect) => {
    registerEffect(effect)
  })
  player.setAttackSpawner((attack) => {
    worldObject.addChild(attack)
  })
  normalizeActorSpread = () => {
    normalizeWorldActorSpread(player, activeAllies, activeEnemies)
  }
  const getMaxAlliesForType = (kind: AllyType) => {
    return kind === 'mini' ? MAX_MINI_ALLIES : MAX_BOSS_ALLIES
  }
  const getAliveAlliesOfTypeCount = (kind: AllyType) => {
    return activeAllies.filter((ally) => ally.isAlive() && ally.getAllyType() === kind).length
  }
  const applyFleetArtifactBonusesToAllies = () => {
    const fleetDamageMultiplier = player.getFleetDamageMultiplier()
    const fleetHealthMultiplier = player.getFleetHealthMultiplier()
    const fleetRateOfFireMultiplier = player.getFleetRateOfFireMultiplier()

    for (const ally of activeAllies) {
      if (!ally.isAlive()) {
        continue
      }

      ally.applyFleetCombatBonuses(
        fleetDamageMultiplier,
        fleetHealthMultiplier,
        fleetRateOfFireMultiplier,
      )
    }
  }
  const canSpawnAllyType = (kind: AllyType) => {
    return getAliveAlliesOfTypeCount(kind) < getMaxAlliesForType(kind)
  }
  const healAllAliveAlliesOfTypeToFull = (kind: AllyType) => {
    let healedAny = false
    for (const ally of activeAllies) {
      if (!ally.isAlive() || ally.getAllyType() !== kind) {
        continue
      }

      ally.heal(ally.getMaxHealthValue())
      healedAny = true
    }

    return healedAny
  }
  const registerAlly = (ally: AlliedFighter, shouldPostOverlay: boolean) => {
    const allyKind = ally.getAllyType()
    if (!canSpawnAllyType(allyKind)) {
      return false
    }

    ally.setAttackTargets(activeEnemies)
    ally.setAttackSpawner((attack) => {
      worldObject.addChild(attack)
    })
    ally.setEffectSpawner((effect) => {
      registerEffect(effect)
    })
    ally.applyFleetCombatBonuses(
      player.getFleetDamageMultiplier(),
      player.getFleetHealthMultiplier(),
      player.getFleetRateOfFireMultiplier(),
    )

    activeAllies.push(ally)
    worldObject.addChild(ally)
    refreshEnemyAttackTargets(true)
    normalizeActorSpread()

    if (!shouldPostOverlay) {
      return true
    }

    postOverlay({
      title: allyKind === 'mini' ? 'Mini Fleet Deployed' : 'Big Boss Arrived',
      message: allyKind === 'mini'
        ? 'A mini ally joined the fight and will persist between rounds until destroyed.'
        : 'A heavy ally has entered the battle and will persist between rounds until destroyed.',
      durationMs: 2200,
    })
    return true
  }

  player.setAllySummonSpawner((kind) => {
    if (!canSpawnAllyType(kind)) {
      healAllAliveAlliesOfTypeToFull(kind)
      return
    }

    const ally = new AlliedFighter(kind)
    const spawnOrigin = new THREE.Vector3(
      player.group.position.x - 1.7,
      player.group.position.y,
      player.group.position.z,
    )
    const spawnPosition = findClearAllyPosition(spawnOrigin, player, activeAllies)
    ally.setHomePosition(spawnPosition.x, spawnPosition.y, spawnPosition.z)
    registerAlly(ally, true)
  })
  player.setLifeLostListener((remainingLives) => {
    lifeLossFreezeRemaining = Math.max(lifeLossFreezeRemaining, LIFE_LOSS_FREEZE_SECONDS)
    onPlayerLifeLost?.(remainingLives)
  })
  player.setEnemyKillGoldListener((position, goldAmount, breakdown) => {
    spawnKillGoldText(scene, position, goldAmount, activeKillGoldTexts, breakdown)
  })

  const initialWave = initialSaveState
    ? waveManager.setWaveForLoad(initialSaveState.currentRound, initialSaveState.roundsCleared)
    : waveManager.reset()

  if (initialSaveState) {
    player.applySavedState(initialSaveState.playerState)
  }

  const restoredRewardPrompt =
    initialSaveState?.shopState?.isOpen && initialSaveState.shopState.rewardOptionIds.length > 0
      ? waveManager.restoreRewardPhaseForLoad(
          initialSaveState.shopState.wave,
          player,
          initialSaveState.shopState.rewardOptionIds,
        )
      : null

  if (restoredRewardPrompt) {
    rewardPromptActiveRef.current = true
    setRewardPrompt(restoredRewardPrompt)
  }

  player.setGlobalAttackIntervalMultiplier(WaveManager.getEarlyRoundRofIntervalMultiplier(initialWave))

  setCurrentRound(initialWave)
  if (restoredRewardPrompt) {
    // Reward phase should stay open on restore without spawning a fresh wave.
  } else if (initialSaveState?.enemyStates && initialSaveState.enemyStates.length > 0) {
    enemyWaveSpawner.spawnSavedEnemies(initialSaveState.enemyStates)
  } else {
    enemyWaveSpawner.spawnWave(initialWave)
  }

  if (initialSaveState?.allyStates && initialSaveState.allyStates.length > 0) {
    initialSaveState.allyStates.forEach((snapshot) => {
      if (snapshot.currentHealth <= 0) {
        return
      }

      const ally = new AlliedFighter(snapshot.kind, { saveId: snapshot.id })
      const savedPosition = new THREE.Vector3(snapshot.position[0], snapshot.position[1], snapshot.position[2])
      const restoredPosition = findClearAllyPosition(savedPosition, player, activeAllies)
      ally.setHomePosition(restoredPosition.x, restoredPosition.y, restoredPosition.z)
      ally.applySaveState(snapshot)
      registerAlly(ally, false)
    })
  }

  normalizeActorSpread()
  refreshEnemyAttackTargets(true)

  player.restoreLockedTarget(initialSaveState?.playerState.targetEnemyId ?? null)

  if (initialSaveState?.questionNukeStates && initialSaveState.questionNukeStates.length > 0) {
    const enemiesById = new Map<string, Enemy>()
    for (const enemy of activeEnemies) {
      enemiesById.set(enemy.getSaveId(), enemy)
    }

    for (const snapshot of initialSaveState.questionNukeStates) {
      if (!snapshot.targetEnemyId) {
        continue
      }

      const targetEnemy = enemiesById.get(snapshot.targetEnemyId)
      if (!targetEnemy || targetEnemy.isDead()) {
        continue
      }

      registerEffect(
        new QuestionNuke({
          source: player,
          target: targetEnemy,
          damageAmount: snapshot.damageAmount,
          splashDamageRatio: 0.1,
          speed: snapshot.speed,
          spawnPosition: snapshot.position,
          initialDistanceTravelled: snapshot.distanceTravelled,
          getSplashTargets: () => activeEnemies,
          spawnEffect: (effect) => {
            registerEffect(effect)
          },
          onKillTarget: () => {
            player.recordEnemyKill(targetEnemy)
          },
        }),
      )
    }
  }

  const clock = new THREE.Clock()
  let worldLayoutTickAccumulator = WORLD_LAYOUT_TICK_SECONDS
  let hoverRaycastTickAccumulator = HOVER_RAYCAST_TICK_SECONDS
  let previousGlowBoostKey = getFieldGlowBoostKey()
  let glowBoostPulseRemaining = 0

  const onResize = () => {
    const width = mount.clientWidth
    const height = mount.clientHeight

    if (width <= 0 || height <= 0) {
      return
    }

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)
  onResize()

  let frameId = 0

  const animate = () => {
    const delta = clock.getDelta()
    const elapsed = clock.getElapsedTime()

    tickFreeze(delta)

    if (lifeLossFreezeRemaining > 0) {
      lifeLossFreezeRemaining = Math.max(0, lifeLossFreezeRemaining - delta)
    }

    const isQuizPaused = getIsQuizPaused()
    const isLifeLossFreezeActive = lifeLossFreezeRemaining > 0
    const isRewardPromptActive = rewardPromptActiveRef.current
    const isWorldMotionActive = !isQuizPaused && !isLifeLossFreezeActive && !isRewardPromptActive
    const isBackdropMotionPaused =
      getIsBackdropMotionPaused() || isLifeLossFreezeActive || isRewardPromptActive

    const nextBackdropRank = Math.max(1, Math.floor(getFieldVisualRank()))
    if (nextBackdropRank !== activeBackdrop.rank) {
      scene.remove(activeBackdrop.group)
      disposeSpaceBackdrop(activeBackdrop)
      activeBackdrop = createSpaceBackdrop(nextBackdropRank)
      scene.add(activeBackdrop.group)
    }

    const nextGlowBoostKey = getFieldGlowBoostKey()
    if (nextGlowBoostKey !== previousGlowBoostKey) {
      previousGlowBoostKey = nextGlowBoostKey
      glowBoostPulseRemaining = 1.35
    }

    if (!isBackdropMotionPaused) {
      backdropElapsedSeconds += delta
      updateSpaceBackdrop(activeBackdrop, delta, backdropElapsedSeconds)
    }
    glowBoostPulseRemaining = updateBackdropBoostPulse(activeBackdrop, glowBoostPulseRemaining, delta)

    for (let index = activeKillGoldTexts.length - 1; index >= 0; index -= 1) {
      const text = activeKillGoldTexts[index]
      text.ageSeconds += delta
      const progress = text.ageSeconds / Math.max(0.0001, text.lifetimeSeconds)

      if (progress >= 1) {
        scene.remove(text.sprite)
        text.material.dispose()
        text.texture.dispose()
        activeKillGoldTexts.splice(index, 1)
        continue
      }

      text.sprite.position.y += text.velocityY * delta
      text.sprite.position.x += text.velocityX * delta
      text.sprite.position.z += 0.14 * delta * KILL_GOLD_TEXT_MOTION_SPEED_MULTIPLIER

      const fadedProgress = Math.min(1, progress * KILL_GOLD_TEXT_FADE_SPEED_MULTIPLIER)
      text.material.opacity = Math.max(0.02, (1 - fadedProgress) * (1 - fadedProgress))

      const scaleBoost = 1 + progress * 0.28 * KILL_GOLD_TEXT_MOTION_SPEED_MULTIPLIER
      text.sprite.scale.set(text.baseScaleX * scaleBoost, text.baseScaleY * scaleBoost, 1)
    }

    if (isWorldMotionActive) {
      const questionTimeHealthDrainPerFiveSeconds = player.getQuestionTimeHealthDrainPerFiveSeconds()
      if (questionTimeHealthDrainPerFiveSeconds > 0) {
        questionTimeHealthDrainTickAccumulatorSeconds += delta
        while (questionTimeHealthDrainTickAccumulatorSeconds >= 5) {
          questionTimeHealthDrainTickAccumulatorSeconds -= 5
          const currentHealth = player.getCurrentHealth()
          if (currentHealth <= 5) {
            break
          }

          player.applyDirectHealthDamage(Math.min(questionTimeHealthDrainPerFiveSeconds, currentHealth - 5))
        }
      } else {
        questionTimeHealthDrainTickAccumulatorSeconds = 0
      }

      if (activeChaosArtifactId === 'gold-125-shield-drain') {
        player.applyDirectShieldDamage(player.getMaxShield() * 0.01 * delta)
      } else if (activeChaosArtifactId === 'gold-200-health-drain') {
        const minimumHealthFloor = 5
        const healthDrainPerSecond = 2
        const currentHealth = player.getCurrentHealth()
        if (currentHealth > minimumHealthFloor) {
          const drainAmount = healthDrainPerSecond * delta
          player.applyDirectHealthDamage(Math.min(drainAmount, currentHealth - minimumHealthFloor))
        }
      }

      worldObject.tick(delta, elapsed)
      enemyWaveSpawner.tickFinalBossSoloSummon(delta)
      applyFleetArtifactBonusesToAllies()
      worldLayoutTickAccumulator += delta
      if (worldLayoutTickAccumulator >= WORLD_LAYOUT_TICK_SECONDS) {
        worldLayoutTickAccumulator = 0
        normalizeActorSpread()
      }
      pruneQuestionNukes()

      for (let index = activeAllies.length - 1; index >= 0; index -= 1) {
        if (activeAllies[index].isDead()) {
          activeAllies.splice(index, 1)
        }
      }

      const healthSupportPerFleetMember = player.getFleetPlayerHealHealthPerFiveSeconds()
      const shieldSupportPerFleetMember = player.getFleetPlayerHealShieldPerFiveSeconds()
      if (healthSupportPerFleetMember > 0 || shieldSupportPerFleetMember > 0) {
        fleetSupportTickAccumulatorSeconds += delta
        if (fleetSupportTickAccumulatorSeconds >= FLEET_SUPPORT_TICK_SECONDS) {
          const supportTicks = Math.floor(fleetSupportTickAccumulatorSeconds / FLEET_SUPPORT_TICK_SECONDS)
          fleetSupportTickAccumulatorSeconds -= supportTicks * FLEET_SUPPORT_TICK_SECONDS

          const livingFleetMembers = activeAllies.reduce((count, ally) => count + (ally.isAlive() ? 1 : 0), 0)
          if (livingFleetMembers > 0) {
            const healthRestore = healthSupportPerFleetMember * livingFleetMembers * supportTicks
            const shieldRestore = shieldSupportPerFleetMember * livingFleetMembers * supportTicks

            if (healthRestore > 0) {
              player.restoreFlatHealth(healthRestore)
            }
            if (shieldRestore > 0) {
              player.restoreFlatShield(shieldRestore)
            }
          }
        }
      } else {
        fleetSupportTickAccumulatorSeconds = 0
      }

      refreshEnemyAttackTargets(false)
    }
    syncPlayerState(player)

    if (!didEndRun && player.isDead()) {
      onRunEnded?.({
        enemyKills: player.getEnemyKillCount(),
        roundsCleared: waveManager.getRoundsCleared(),
        currentRound: waveManager.getCurrentWaveNumber(),
        score: calculateScoreFromRun(
          player.getEnemyKillCount(),
          waveManager.getRoundsCleared(),
          player.getQuizScoreBonus(),
        ),
        completedAtIso: new Date().toISOString(),
        endReason: 'death',
      })
      clearSavedGameState()
      didEndRun = true
    }

    if (!didEndRun && !player.isDead() && !isRewardPromptActive) {
      const nextWave = waveManager.consumePendingNextWave()
      if (nextWave !== null) {
        setCurrentRound(nextWave)
        enemyWaveSpawner.spawnWave(nextWave)
      }
    }

    let liveEnemyCount = 0
    for (const enemy of activeEnemies) {
      if (!enemy.isDead()) {
        liveEnemyCount += 1
      }
    }

    if (!didEndRun && !player.isDead() && !isQuizPaused) {
      const allDefeated = activeEnemies.length > 0 && liveEnemyCount === 0
      const liveMic = isLiveMicActive()

      if (!allDefeated || liveMic) {
        micInactiveBeforeRoundClearSeconds = 0
        if (allDefeated && liveMic && import.meta.env.DEV) {
          console.info('[STAR Workflow][WebGLWorld] Round clear deferred because live mic is active')
        }
      } else {
        micInactiveBeforeRoundClearSeconds += delta
      }

      const canResolveRoundClear =
        allDefeated && micInactiveBeforeRoundClearSeconds >= ROUND_CLEAR_MIC_INACTIVE_GRACE_SECONDS

      const clearEvent = waveManager.handleRoundState(canResolveRoundClear, activeEnemies.length, player)
      if (clearEvent && rewardPromptTimeoutId === null) {
        const roundEndInterestPercent = player.getRoundEndGoldPercentOfCurrentGold()
        if (roundEndInterestPercent > 0) {
          const interestGold = Math.max(0, player.getGold() * roundEndInterestPercent)
          if (interestGold > 0) {
            const creditedGold = player.addGold(interestGold)
            postOverlay({
              title: 'Artifact Dividend',
              message: `Compound Ledger paid ${Math.floor(creditedGold)} gold.`,
              durationMs: 2200,
            })
          }
        }

        const goldPerFleetMember = player.getRoundEndGoldPerFleetMember()
        if (goldPerFleetMember > 0) {
          const livingFleetMembers = activeAllies.reduce((count, ally) => count + (ally.isAlive() ? 1 : 0), 0)
          const fleetGold = Math.max(0, goldPerFleetMember * livingFleetMembers)
          if (fleetGold > 0) {
            const creditedGold = player.addGold(fleetGold)
            postOverlay({
              title: 'Artifact Dividend',
              message: `Fleet Payroll paid ${Math.floor(creditedGold)} gold for ${livingFleetMembers} fleet members.`,
              durationMs: 2200,
            })
          }
        }

        const roundEndHealthDividendPercent = player.getRoundEndGoldPercentOfHealth()
        if (roundEndHealthDividendPercent > 0) {
          const healthDividendGold = Math.max(0, player.getCurrentHealth() * roundEndHealthDividendPercent)
          if (healthDividendGold > 0) {
            const creditedGold = player.addGold(healthDividendGold)
            postOverlay({
              title: 'Artifact Dividend',
              message: `Blood Dividend Pact paid ${Math.floor(creditedGold)} gold.`,
              durationMs: 2200,
            })
          }
        }

        const shieldSacrificeOutcome = player.consumeRoundEndShieldSacrificeMiniFleet()
        if (shieldSacrificeOutcome.sacrificedShield > 0) {
          postOverlay({
            title: 'Artifact Dividend',
            message: shieldSacrificeOutcome.summonedMiniFleet > 0
              ? `Aegis Conscription sacrificed ${Math.floor(shieldSacrificeOutcome.sacrificedShield)} shield and summoned ${shieldSacrificeOutcome.summonedMiniFleet} mini fleet allies.`
              : `Aegis Conscription sacrificed ${Math.floor(shieldSacrificeOutcome.sacrificedShield)} shield.`,
            durationMs: 2200,
          })
        }

        if (player.getRoundEndHealShieldsToFull()) {
          player.healShieldPercent(1)
          postOverlay({
            title: 'Artifact Restoration',
            message: 'Aegis Restoration fully restored your shields.',
            durationMs: 2000,
          })
        }

        if (player.getRoundEndHealHealthToFull()) {
          player.healHealthPercent(1)
          postOverlay({
            title: 'Artifact Restoration',
            message: 'Vital Restoration fully restored your health.',
            durationMs: 2000,
          })
        }

        if (activeChaosArtifactId === 'no-kill-gold-shield-round-gold') {
          const bonusGold = Math.max(0, player.getCurrentShield() * 0.5)
          if (bonusGold > 0) {
            const creditedGold = player.addGold(bonusGold)
            postOverlay({
              title: 'Chaos Dividend',
              message: `Gained ${Math.floor(creditedGold)} gold from shield reserves.`,
              durationMs: 2200,
            })
          }
        } else if (activeChaosArtifactId === 'no-kill-gold-health-round-gold') {
          const bonusGold = Math.max(0, player.getCurrentHealth() * 0.3)
          if (bonusGold > 0) {
            const creditedGold = player.addGold(bonusGold)
            postOverlay({
              title: 'Chaos Dividend',
              message: `Gained ${Math.floor(creditedGold)} gold from vitality reserves.`,
              durationMs: 2200,
            })
          }
        }

        if (clearEvent.wave >= FINAL_ROUND_FOR_VICTORY) {
          rewardPromptActiveRef.current = false
          setRewardPrompt(null)
          onRunEnded?.({
            enemyKills: player.getEnemyKillCount(),
            roundsCleared: waveManager.getRoundsCleared(),
            currentRound: waveManager.getCurrentWaveNumber(),
            score: calculateScoreFromRun(
              player.getEnemyKillCount(),
              waveManager.getRoundsCleared(),
              player.getQuizScoreBonus(),
            ),
            completedAtIso: new Date().toISOString(),
            endReason: 'victory',
          })
          clearSavedGameState()
          didEndRun = true
        } else {
          queueRewardPrompt(clearEvent)
        }
      }
      if (clearEvent) {
        micInactiveBeforeRoundClearSeconds = 0
      }
    }

    const shouldShowQuiz = !player.isDead() && liveEnemyCount > 0
    if (!handleCombatQuizVisibility(shouldShowQuiz)) {
      return
    }

    if (pointerInsideCanvas) {
      hoverRaycastTickAccumulator += delta
      if (hoverRaycastTickAccumulator >= HOVER_RAYCAST_TICK_SECONDS) {
        hoverRaycastTickAccumulator = 0

        hoverCandidateActors.length = 0
        hoverTargetObjects.length = 0
        hoverCandidateActors.push(player)
        hoverTargetObjects.push(player.group)
        for (const ally of activeAllies) {
          if (!ally.isAlive()) {
            continue
          }
          hoverCandidateActors.push(ally)
          hoverTargetObjects.push(ally.group)
        }
        for (const enemy of activeEnemies) {
          if (!enemy.isAlive()) {
            continue
          }
          hoverCandidateActors.push(enemy)
          hoverTargetObjects.push(enemy.group)
        }

        raycaster.setFromCamera(pointerNdc, camera)
        const intersections = raycaster.intersectObjects(hoverTargetObjects, true)

        let nextHoveredActor: Actor | null = null
        for (const intersection of intersections) {
          for (const actor of hoverCandidateActors) {
            if (!objectBelongsToActor(intersection.object, actor)) {
              continue
            }

            nextHoveredActor = actor
            break
          }

          if (nextHoveredActor) {
            break
          }
        }

        syncHoverTooltip(nextHoveredActor)
      }
    } else if (hoveredActor !== null) {
      syncHoverTooltip(null)
    }

    camera.lookAt(0, 0, -0.4)

    renderer.render(scene, camera)
    frameId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    window.removeEventListener('resize', onResize)
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
    renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
    if (rewardPromptTimeoutId !== null) {
      window.clearTimeout(rewardPromptTimeoutId)
      rewardPromptTimeoutId = null
    }
    cancelAnimationFrame(frameId)
    waveManagerRef.current = null
    playerRef.current = null
    player.setLifeLostListener(null)
    player.setAllySummonSpawner(null)
    player.setEnemyKillGoldListener(null)
    setEnemySaveSnapshotProvider?.(() => [])
    setAllySaveSnapshotProvider?.(() => [])
    setQuestionNukeSaveSnapshotProvider?.(() => [])
    worldObject.dispose()
    for (const text of activeKillGoldTexts) {
      scene.remove(text.sprite)
      text.material.dispose()
      text.texture.dispose()
    }
    activeKillGoldTexts.length = 0
    scene.remove(activeBackdrop.group)
    disposeSpaceBackdrop(activeBackdrop)
    if (mount.contains(renderer.domElement)) {
      mount.removeChild(renderer.domElement)
    }

    if (hoverTooltip.parentNode) {
      hoverTooltip.parentNode.removeChild(hoverTooltip)
    }

    renderer.dispose()
  }
}
