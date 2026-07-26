import { GameObject } from '../GameObject'
import { Particle } from './Particle'
import { Enemy, type EnemyKind } from './Enemy'
import { Actor } from './Actor'
import { Player } from '../Player/Player'
import { WaveManager } from '../WaveManager'
import type { EnemySaveState } from '../Player/GameSaving'

type OverlayPoster = (payload: {
  title: string
  message: string
  details?: string[]
  durationMs?: number
}) => void

export class EnemyWaveSpawner {
  private static readonly MIN_ENEMY_SEPARATION = 1.02
  private static readonly MIN_DISTANCE_FROM_PLAYER = 2.2
  private static readonly MAX_SEPARATION_PASSES_PER_FRAME = 3
  private readonly worldObject: GameObject
  private readonly player: Player
  private readonly activeEnemies: Enemy[]
  private readonly postOverlay: OverlayPoster
  private readonly difficultyMultiplier: number
  private enemyAttackTargets: Actor[]
  private layoutCorrectionCallback: (() => void) | null = null

  constructor(
    worldObject: GameObject,
    player: Player,
    activeEnemies: Enemy[],
    postOverlay: OverlayPoster,
    difficultyMultiplier = 1,
  ) {
    this.worldObject = worldObject
    this.player = player
    this.activeEnemies = activeEnemies
    this.postOverlay = postOverlay
    this.difficultyMultiplier = Math.max(0.1, difficultyMultiplier)
    this.enemyAttackTargets = [player]
  }

  setEnemyAttackTargets(targets: Actor[]) {
    this.enemyAttackTargets = targets.length > 0 ? targets : [this.player]
    for (const enemy of this.activeEnemies) {
      enemy.setAttackTargets(this.enemyAttackTargets)
    }
  }

  setLayoutCorrectionCallback(callback: (() => void) | null) {
    this.layoutCorrectionCallback = callback
  }

  spawnWave(wave: number) {
    this.activeEnemies.length = 0
    const earlyRoundRofIntervalMultiplier = WaveManager.getEarlyRoundRofIntervalMultiplier(wave)
    this.player.setGlobalAttackIntervalMultiplier(earlyRoundRofIntervalMultiplier)
    this.player.onWaveStart()

    const effectiveDifficultyMultiplier =
      wave >= 6 ? this.difficultyMultiplier * this.difficultyMultiplier : this.difficultyMultiplier

    const enemyCount = WaveManager.getEnemyCountForWave(wave)
    let damageScale = 0.1 / (0.5 + enemyCount * 0.5)
    if (wave >= 5)
      damageScale = 0.1 / (0.6 + enemyCount * 0.4)
    if (wave >= 6)
      damageScale = 0.1 / (0.7 + enemyCount * 0.3)
    if (wave >= 10)
      damageScale = 0.1 / (0.8 + enemyCount * 0.2)
    // if (wave >= 10)
    //   damageScale = 0.1 / (0.9 + enemyCount * 0.1)
    // if (wave >= 9)
    //   damageScale = 0.1
    const speedScale = 1 + (wave - 1) * 0.08
    const intervalScale = Math.max(0.55, 1 - (wave - 1) * 0.07)
    const lateWaveHealthMultiplier = (1 + Math.pow(wave , 1.05) * 0.45 + wave * 0.2) * 15
    const formation = this.buildFormation(enemyCount)

    const enemyKinds: EnemyKind[] = Array(enemyCount).fill('grunt')
    if (wave >= 5 && enemyCount >= 2) {
      enemyKinds[enemyCount - 1] = 'shield-drainer'
    }
    if (wave >= 7 && enemyCount >= 3) {
      enemyKinds[enemyCount - 2] = 'summoner'
    }
    if (wave >= 9 && enemyCount >= 4) {
      enemyKinds[enemyCount - 3] = 'bubbler'
    }
    if (wave >= 10) {
      enemyKinds[0] = 'boss'
    }

    formation.forEach((position, index) => {
      const kind = enemyKinds[index] ?? 'grunt'
      const enemy = new Enemy({
        formationPosition: position,
        enemyKind: kind,
        attackInterval:
          kind === 'boss'
            ? 1.15 * intervalScale * earlyRoundRofIntervalMultiplier
            : kind === 'summoner'
              ? (2.05 * intervalScale + (index % 2) * 0.18) * earlyRoundRofIntervalMultiplier
              : kind === 'bubbler'
                ? (2.15 * intervalScale + (index % 2) * 0.16) * earlyRoundRofIntervalMultiplier
              : (1.9 * intervalScale + (index % 2) * 0.16) * earlyRoundRofIntervalMultiplier,
        projectileDamage:
          kind === 'boss'
            ? 1.9 * damageScale * effectiveDifficultyMultiplier
            : kind === 'shield-drainer'
              ? 1.1 * damageScale * effectiveDifficultyMultiplier
              : kind === 'bubbler'
                ? 0.9 * damageScale * effectiveDifficultyMultiplier
              : 0.8 * damageScale * effectiveDifficultyMultiplier,
        maxHealthMultiplier:
          kind === 'boss'
            ? lateWaveHealthMultiplier * 1.35 * effectiveDifficultyMultiplier
            : kind === 'summoner'
              ? lateWaveHealthMultiplier * 1.2 * effectiveDifficultyMultiplier
              : kind === 'bubbler'
                ? lateWaveHealthMultiplier * 1.15 * effectiveDifficultyMultiplier
              : lateWaveHealthMultiplier * effectiveDifficultyMultiplier,
        projectileSpeed: 10.2 * speedScale,
        maxSummons: wave >= 10 ? 4 : 3,
        summonIntervalSeconds: wave >= 10 ? 5.1 : 6.2,
      })

      this.registerEnemy(enemy)
    })

    this.layoutCorrectionCallback?.()

    if (wave >= 8) {
      this.postOverlay({
        title: `Wave ${wave}: Elite Threats`,
        message: wave >= 9
          ? 'Final bosses, shield drainers, summoners, and bubblers have entered the battlefield.'
          : 'Final bosses, shield drainers, and summoners have entered the battlefield.',
        durationMs: 2800,
      })
    }
  }

  spawnSavedEnemies(enemyStates: EnemySaveState[]) {
    this.activeEnemies.length = 0

    const positionedEnemyStates = this.spreadSavedEnemyStates(enemyStates)

    positionedEnemyStates.forEach((enemyState) => {
      const enemy = new Enemy({
        formationPosition: enemyState.position,
        enemyKind: enemyState.kind,
        saveId: enemyState.id,
        attackInterval: enemyState.attackInterval,
        projectileDamage: enemyState.projectileDamage,
        projectileSpeed: enemyState.projectileSpeed,
        summonIntervalSeconds: enemyState.summonIntervalSeconds,
        maxSummons: Math.max(1, Math.floor(enemyState.summonsRemaining)),
      })

      enemy.applySaveState(enemyState)
      this.registerEnemy(enemy)
    })

    this.layoutCorrectionCallback?.()
  }

  getLiveEnemyStates(): EnemySaveState[] {
    return this.activeEnemies
      .filter((enemy) => !enemy.isDead())
      .map((enemy) => enemy.getSaveState())
  }

  keepEnemiesSeparated() {
    const liveEnemies = this.activeEnemies.filter((enemy) => !enemy.isDead())
    if (liveEnemies.length <= 1) {
      return
    }

    const minSeparation = EnemyWaveSpawner.MIN_ENEMY_SEPARATION
    const minSeparationSq = minSeparation * minSeparation

    for (let pass = 0; pass < EnemyWaveSpawner.MAX_SEPARATION_PASSES_PER_FRAME; pass += 1) {
      let movedAny = false

      for (let leftIndex = 0; leftIndex < liveEnemies.length - 1; leftIndex += 1) {
        const leftEnemy = liveEnemies[leftIndex]
        const leftPosition = leftEnemy.group.position

        for (let rightIndex = leftIndex + 1; rightIndex < liveEnemies.length; rightIndex += 1) {
          const rightEnemy = liveEnemies[rightIndex]
          const rightPosition = rightEnemy.group.position

          const deltaX = rightPosition.x - leftPosition.x
          const deltaY = rightPosition.y - leftPosition.y
          const distanceSq = deltaX * deltaX + deltaY * deltaY

          if (distanceSq >= minSeparationSq) {
            continue
          }

          const distance = Math.max(0.0001, Math.sqrt(distanceSq))
          const overlap = minSeparation - distance
          const axisX = deltaX / distance
          const axisY = deltaY / distance
          const push = overlap * 0.52

          leftPosition.x -= axisX * push
          leftPosition.y -= axisY * push
          rightPosition.x += axisX * push
          rightPosition.y += axisY * push

          movedAny = true
        }
      }

      this.enforcePlayerDistance(liveEnemies)

      if (!movedAny) {
        break
      }
    }
  }

  private buildFormation(enemyCount: number) {
    const positions: Array<[number, number, number]> = []
    const playerPosition = this.player.group.position
    const columnCount = Math.min(4, Math.max(1, enemyCount))
    const rowCount = Math.ceil(enemyCount / columnCount)
    const xStart = 4.7
    const xSpacing = 1.0
    const ySpacing = 0.78
    const yStart = 0.16 - ((rowCount - 1) * ySpacing) / 2
    const zBase = playerPosition.z

    for (let placementIndex = 0; placementIndex < enemyCount; placementIndex += 1) {
      const column = placementIndex % columnCount
      const row = Math.floor(placementIndex / columnCount)
      const laneSkew = (row % 2 === 0 ? 1 : -1) * 0.1
      const xJitter = (Math.random() - 0.5) * 0.16
      const yJitter = (Math.random() - 0.5) * 0.12
      const zJitter = (Math.random() - 0.5) * 0.08

      const x = Math.max(1.5, xStart - column * xSpacing + laneSkew + xJitter)
      const y = yStart + row * ySpacing + yJitter
      const z = zBase + zJitter

      positions.push([x, y, z])
    }

    return positions
  }

  private spreadSavedEnemyStates(enemyStates: EnemySaveState[]): EnemySaveState[] {
    const playerPosition = this.player.group.position
    const minDistanceFromPlayer = 2.4
    const minDistanceBetweenEnemies = 1.1
    const acceptedPositions: Array<[number, number, number]> = []
    const columnCount = Math.min(4, Math.max(1, enemyStates.length))
    const rowCount = Math.ceil(enemyStates.length / columnCount)
    const xStart = 4.7
    const xSpacing = 1.0
    const ySpacing = 0.78
    const yStart = 0.16 - ((rowCount - 1) * ySpacing) / 2
    const zBase = playerPosition.z

    return enemyStates.map((enemyState, index) => {
      let [x, y, z] = enemyState.position

      x = Math.max(1.4, x)

      const isOverlapping = acceptedPositions.some(([existingX, existingY]) => {
        return Math.hypot(x - existingX, y - existingY) < minDistanceBetweenEnemies
      })

      const tooCloseToPlayer = Math.hypot(x - playerPosition.x, y - playerPosition.y) < minDistanceFromPlayer

      if (isOverlapping || tooCloseToPlayer) {
        const column = index % columnCount
        const row = Math.floor(index / columnCount)
        const laneSkew = (row % 2 === 0 ? 1 : -1) * 0.1
        x = Math.max(1.5, xStart - column * xSpacing + laneSkew)
        y = yStart + row * ySpacing
        z = zBase + (Math.random() - 0.5) * 0.08
      }

      acceptedPositions.push([x, y, z])

      return {
        ...enemyState,
        position: [x, y, z],
      }
    })
  }

  private registerEnemy(enemy: Enemy) {
    enemy.setDeathEffectSpawner((effect) => {
      this.worldObject.addChild(effect)

      if (enemy.getKind() === 'boss') {
        // Bosses erupt with a second burst to sell their weight.
        this.worldObject.addChild(
          new Particle({
            origin: [enemy.group.position.x, enemy.group.position.y + 0.45, enemy.group.position.z],
            primary: 'rgba(216, 180, 254, 0.95)',
            accent: 'rgba(251, 191, 36, 0.9)',
            count: 88,
            lifetime: 1.45,
          }),
        )
      }
    })
    enemy.setAttackTargets(this.enemyAttackTargets)
    enemy.setAttackSpawner((attack) => {
      this.worldObject.addChild(attack)
    })
    enemy.setEffectSpawner((effect) => {
      this.worldObject.addChild(effect)
    })
    enemy.setSummonSpawner((summonedEnemy) => {
      this.registerEnemy(summonedEnemy)
      this.worldObject.addChild(summonedEnemy)
      this.activeEnemies.push(summonedEnemy)

      this.postOverlay({
        title: 'Summoner Spawned Reinforcement',
        message: 'A summoner enemy opened a portal for another unit.',
        durationMs: 1900,
      })
    })

    this.worldObject.addChild(enemy)
    this.activeEnemies.push(enemy)
    this.layoutCorrectionCallback?.()
  }

  private enforcePlayerDistance(enemies: Enemy[]) {
    const playerX = this.player.group.position.x
    const playerY = this.player.group.position.y
    const minDistance = EnemyWaveSpawner.MIN_DISTANCE_FROM_PLAYER

    for (const enemy of enemies) {
      const deltaX = enemy.group.position.x - playerX
      const deltaY = enemy.group.position.y - playerY
      const distance = Math.hypot(deltaX, deltaY)

      if (distance >= minDistance) {
        continue
      }

      const safeDistance = Math.max(0.0001, distance)
      const axisX = deltaX / safeDistance
      const axisY = deltaY / safeDistance
      const push = minDistance - safeDistance

      enemy.group.position.x += axisX * push
      enemy.group.position.y += axisY * push
    }
  }
}