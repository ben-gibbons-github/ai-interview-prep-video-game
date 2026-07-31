import { Player } from '../Player/Player'
import { FreezeBombArtifact } from '../Player/Artifacts/FreezeBombArtifact'
import type { GoldMultiplierContributorSnapshot } from '../Player/PlayerState'
import type { RunLaunchConfig } from './RunLaunchConfig'

const START_ARTIFACT_HARD_QUESTIONS_ID = 'start-artifact-hard-questions'
const START_ARTIFACT_STAR_STORIES_HARD_ID = 'start-artifact-star-stories-hard'
const CHAOS_ARTIFACT_ID_PREFIX = 'chaos-artifact-'

export function getActiveRunArtifactIds(runLaunchConfig: RunLaunchConfig): string[] {
  const artifactIds: string[] = []

  if (runLaunchConfig.startingArtifacts.hardQuestions) {
    artifactIds.push(START_ARTIFACT_HARD_QUESTIONS_ID)
  }

  if (runLaunchConfig.startingArtifacts.starStoriesHardMode) {
    artifactIds.push(START_ARTIFACT_STAR_STORIES_HARD_ID)
  }

  if (runLaunchConfig.chaosArtifactId) {
    artifactIds.push(`${CHAOS_ARTIFACT_ID_PREFIX}${runLaunchConfig.chaosArtifactId}`)
  }

  return artifactIds
}

export function getRunLaunchGoldMultipliers(runLaunchConfig: RunLaunchConfig): {
  question: number
  enemyKill: number
} {
  let questionMultiplier = 1
  let enemyKillMultiplier = 1

  if (runLaunchConfig.startingArtifacts.hardQuestions) {
    questionMultiplier *= 1.25
  }

  if (runLaunchConfig.chaosArtifactId === 'gold-125-shield-drain') {
    questionMultiplier *= 1.25
    enemyKillMultiplier *= 1.25
  }

  if (runLaunchConfig.chaosArtifactId === 'gold-200-health-drain') {
    questionMultiplier *= 1.5
    enemyKillMultiplier *= 1.5
  }

  if (runLaunchConfig.chaosArtifactId === 'fast-rounds') {
    questionMultiplier *= 2.2
  }

  return {
    question: questionMultiplier,
    enemyKill: enemyKillMultiplier,
  }
}

export function getRunLaunchGoldContributors(
  runLaunchConfig: RunLaunchConfig,
): GoldMultiplierContributorSnapshot[] {
  const contributors: GoldMultiplierContributorSnapshot[] = []

  if (runLaunchConfig.startingArtifacts.hardQuestions) {
    contributors.push({
      artifactId: START_ARTIFACT_HARD_QUESTIONS_ID,
      artifactName: 'Hard Questions (Starting Artifact)',
      kind: 'question',
      questionMultiplier: 1.25,
      enemyKillMultiplier: 1,
      stacks: 1,
    })
  }

  if (runLaunchConfig.chaosArtifactId === 'gold-125-shield-drain') {
    contributors.push({
      artifactId: 'chaos-artifact-gold-125-shield-drain',
      artifactName: 'Leaky Fortune Capacitor (Chaos Artifact)',
      kind: 'both',
      questionMultiplier: 1.25,
      enemyKillMultiplier: 1.25,
      stacks: 1,
    })
  }

  if (runLaunchConfig.chaosArtifactId === 'gold-200-health-drain') {
    contributors.push({
      artifactId: 'chaos-artifact-gold-200-health-drain',
      artifactName: 'Blood Mint Engine (Chaos Artifact)',
      kind: 'both',
      questionMultiplier: 1.5,
      enemyKillMultiplier: 1.5,
      stacks: 1,
    })
  }

  if (runLaunchConfig.chaosArtifactId === 'fast-rounds') {
    contributors.push({
      artifactId: 'chaos-artifact-fast-rounds',
      artifactName: 'Fast Rounds (Chaos Artifact)',
      kind: 'question',
      questionMultiplier: 2.2,
      enemyKillMultiplier: 1,
      stacks: 1,
    })
  }

  if (runLaunchConfig.startingArtifacts.starStoriesHardMode) {
    contributors.push({
      artifactId: START_ARTIFACT_STAR_STORIES_HARD_ID,
      artifactName: 'I Know My STAR Stories (Starting Artifact)',
      kind: 'question',
      questionMultiplier: 1.5,
      enemyKillMultiplier: 1,
      stacks: 1,
      appliesTo: 'STAR stories only',
    })
  }

  return contributors
}

export function applyRunLaunchArtifacts(player: Player, runLaunchConfig?: RunLaunchConfig): void {
  const activeChaosArtifactId = runLaunchConfig?.chaosArtifactId ?? null
  if (!activeChaosArtifactId) {
    return
  }

  if (activeChaosArtifactId === 'triple-vitals-no-lives') {
    const maxHealth = player.getMaxHealthValue()
    const maxShield = player.getMaxShield()
    player.addFlatMaxHealth(maxHealth * 2)
    player.addFlatMaxShield(maxShield * 2)
    player.setMaxHealthGainMultiplier(3)
    player.setMaxShieldGainMultiplier(3)
    player.setLives(0)
    return
  }

  if (activeChaosArtifactId === 'gold-125-shield-drain') {
    player.setRunGoldMultiplier(1.25)
    return
  }

  if (activeChaosArtifactId === 'gold-200-health-drain') {
    player.setRunGoldMultiplier(1.5)
    return
  }

  if (activeChaosArtifactId === 'no-question-heal-five-freeze-bombs') {
    for (let index = 0; index < 5; index += 1) {
      player.applyArtifact(new FreezeBombArtifact())
    }
    return
  }

  if (activeChaosArtifactId === 'no-question-heal-plus-vitals') {
    player.addFlatMaxHealth(400)
    player.addFlatMaxShield(400)
    return
  }

  if (
    activeChaosArtifactId === 'no-kill-gold-shield-round-gold' ||
    activeChaosArtifactId === 'no-kill-gold-health-round-gold'
  ) {
    player.setGoldPerKill(0)
    return
  }

  if (activeChaosArtifactId === 'no-question-heal-damage-lifesteal') {
    player.setDamageLifestealRatio(0.01)
    return
  }

  if (activeChaosArtifactId === 'no-skips') {
    player.setSkips(0)
    player.addGold(300)
    return
  }

  if (activeChaosArtifactId === 'fast-rounds') {
    player.setCorrectAnswerArtifactBonusMultiplier(2)
  }
}