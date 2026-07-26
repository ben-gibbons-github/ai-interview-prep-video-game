import {
  createInitialPlayerArtifactStats,
  getPlayerArtifactStatsSignature,
  type PlayerArtifactStats,
} from './Artifacts/ArtifactStateManager'
import type { ActiveConsumableEffect, RoundQuizBuffStacks } from './PlayerBuffManager'

function createInitialRoundBuffStacks(): RoundQuizBuffStacks {
  return {
    damage: 0,
    fireRate: 0,
    health: 0,
    shield: 0,
  }
}

export interface PlayerStateSnapshot {
  currentHealth: number
  maxHealth: number
  currentShield: number
  maxShield: number
  lives: number
  skips: number
  gold: number
  enemyKills: number
  quizScoreBonus: number
  quizCurrentStreak: number
  fireRatePerSecond: number
  projectileDamage: number
  activeConsumables: ActiveConsumableEffect[]
  roundBuffStacks: RoundQuizBuffStacks
  artifactStats: PlayerArtifactStats
  artifactIds: string[]
  targetEnemyId: string | null
  queuedQuestionNukes: number
  queuedFreezeRays: number
  questionAnswerHealingMultiplier: number
  questionAnswerGoldMultiplier: number
  enemyKillGoldMultiplier: number
  goldMultiplierContributors: GoldMultiplierContributorSnapshot[]
  maxHealthGainMultiplier: number
  maxShieldGainMultiplier: number
  skipToLifeConversionEnabled: boolean
}

export interface GoldMultiplierContributorSnapshot {
  artifactId: string
  artifactName: string
  kind: 'question' | 'enemyKill' | 'both'
  questionMultiplier: number
  enemyKillMultiplier: number
  stacks: number
  appliesTo?: string
}

export function createInitialPlayerStateSnapshot(): PlayerStateSnapshot {
  return {
    currentHealth: 100,
    maxHealth: 100,
    currentShield: 50,
    maxShield: 50,
    lives: 3,
    skips: 3,
    gold: 0,
    enemyKills: 0,
    quizScoreBonus: 0,
    quizCurrentStreak: 0,
    fireRatePerSecond: 0,
    projectileDamage: 0,
    activeConsumables: [],
    roundBuffStacks: createInitialRoundBuffStacks(),
    artifactStats: createInitialPlayerArtifactStats(),
    artifactIds: [],
    targetEnemyId: null,
    queuedQuestionNukes: 0,
    queuedFreezeRays: 0,
    questionAnswerHealingMultiplier: 1,
    questionAnswerGoldMultiplier: 1,
    enemyKillGoldMultiplier: 1,
    goldMultiplierContributors: [],
    maxHealthGainMultiplier: 1,
    maxShieldGainMultiplier: 1,
    skipToLifeConversionEnabled: false,
  }
}

export function getPlayerStateSignature(playerState: PlayerStateSnapshot): string {
  const effectsSignature = playerState.activeConsumables
    .map((effect) => `${effect.id}:${effect.remainingSeconds.toFixed(1)}`)
    .join('|')
  const roundBuffStacksSignature = [
    playerState.roundBuffStacks.damage.toFixed(0),
    playerState.roundBuffStacks.fireRate.toFixed(0),
    playerState.roundBuffStacks.health.toFixed(0),
    playerState.roundBuffStacks.shield.toFixed(0),
  ].join(':')
  const goldContributorsSignature = playerState.goldMultiplierContributors
    .map((contributor) => [
      contributor.artifactId,
      contributor.artifactName,
      contributor.kind,
      contributor.questionMultiplier.toFixed(3),
      contributor.enemyKillMultiplier.toFixed(3),
      contributor.stacks.toFixed(0),
      contributor.appliesTo ?? '',
    ].join(':'))
    .join(',')

  return [
    playerState.currentHealth.toFixed(1),
    playerState.maxHealth.toFixed(1),
    playerState.currentShield.toFixed(1),
    playerState.maxShield.toFixed(1),
    playerState.lives.toFixed(0),
    playerState.skips.toFixed(0),
    playerState.gold.toFixed(0),
    playerState.enemyKills.toFixed(0),
    playerState.quizScoreBonus.toFixed(0),
    playerState.quizCurrentStreak.toFixed(0),
    playerState.fireRatePerSecond.toFixed(2),
    playerState.projectileDamage.toFixed(1),
    roundBuffStacksSignature,
    getPlayerArtifactStatsSignature(playerState.artifactStats),
    playerState.artifactIds.join(','),
    playerState.targetEnemyId ?? '',
    playerState.queuedQuestionNukes.toFixed(0),
    playerState.queuedFreezeRays.toFixed(0),
    playerState.questionAnswerHealingMultiplier.toFixed(2),
    playerState.questionAnswerGoldMultiplier.toFixed(2),
    playerState.enemyKillGoldMultiplier.toFixed(2),
    goldContributorsSignature,
    playerState.maxHealthGainMultiplier.toFixed(2),
    playerState.maxShieldGainMultiplier.toFixed(2),
    playerState.skipToLifeConversionEnabled ? '1' : '0',
    effectsSignature,
  ].join('|')
}
