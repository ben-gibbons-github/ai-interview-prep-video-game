import type { RunLaunchConfig } from '../ui/RunLaunchConfig'
import {
  getActiveRunArtifactIds,
  getRunLaunchGoldContributors,
  getRunLaunchGoldMultipliers,
} from '../ui/RunArtifactPipeline'
import type { Player } from './Player'

export interface ArtifactCallableBonusEntry {
  artifactId: string
  artifactName: string
  stacks: number
  goldAnyMultiplier: number
  goldQuestionMultiplier: number
  goldEnemyKillMultiplier: number
  maxHealthFlatBonus: number
  maxHealthMultiplier: number
  maxShieldFlatBonus: number
  maxShieldMultiplier: number
  rateOfFireFlatBonus: number
  rateOfFireMultiplier: number
}

export interface BonusGoldOtherSituationSummary {
  streak: {
    threshold: number
    bonusGoldPerTrigger: number
    enabled: boolean
  }
  goldOnHit: {
    chance: number
    amount: number
    expectedGoldPerHit: number
    enabled: boolean
  }
  roundEnd: {
    percentOfCurrentGold: number
    percentOfCurrentHealth: number
    goldPerFleetMember: number
    enabled: boolean
  }
  replaceQuestionBuffsWithGold: {
    enabled: boolean
    goldPerBuff: number
  }
}

export interface ArtifactBonusSnapshot {
  activeRunArtifactIds: string[]
  callableArtifactBonuses: ArtifactCallableBonusEntry[]
  gold: {
    artifactAnyGainMultiplier: number
    artifactQuestionMultiplier: number
    artifactEnemyKillMultiplier: number
    runLaunchQuestionMultiplier: number
    runLaunchEnemyKillMultiplier: number
    runGoldMultiplier: number
    totalQuestionMultiplier: number
    totalEnemyKillMultiplier: number
    goldPerEnemyKillBase: number
    goldPerEnemyKillFinal: number
    contributors: Array<{
      artifactId: string
      artifactName: string
      kind: 'question' | 'enemyKill' | 'both'
      questionMultiplier: number
      enemyKillMultiplier: number
      stacks: number
      appliesTo?: string
    }>
    otherSituations: BonusGoldOtherSituationSummary
  }
  health: {
    maxHealth: number
    flatMaxHealthBonusFromBase: number
    maxHealthGainMultiplier: number
    questionAnswerHealingMultiplier: number
  }
  shield: {
    maxShield: number
    flatMaxShieldBonusFromBase: number
    maxShieldGainMultiplier: number
  }
  rateOfFire: {
    baseShotsPerSecond: number
    currentShotsPerSecond: number
    effectiveMultiplier: number
  }
}

export function buildArtifactBonusSnapshot(
  player: Player,
  runLaunchConfig: RunLaunchConfig,
  questionKind?: string,
): ArtifactBonusSnapshot {
  const runLaunchGoldMultipliers = getRunLaunchGoldMultipliers(runLaunchConfig)
  const artifactQuestionMultiplier = player.getGlobalGoldMultiplierForQuestionAnswer(questionKind)
  const artifactEnemyKillMultiplier = player.getGlobalGoldMultiplierForEnemyKill()
  const artifactAnyGainMultiplier = player.getGlobalGoldMultiplierForAnyGain()
  const runGoldMultiplier = player.getRunGoldMultiplier()
  const killGoldMultiplier = player.getKillGoldMultiplier()
  const goldPerEnemyKillBase = player.getGoldPerKillBaseValue()

  const callableBonusesByArtifactId = new Map<string, ArtifactCallableBonusEntry>()
  for (const artifact of player.getArtifacts()) {
    const existingEntry = callableBonusesByArtifactId.get(artifact.id)
    const bonusFunctions = artifact.getBonusFunctions()

    const nextEntry: ArtifactCallableBonusEntry = existingEntry
      ? {
          ...existingEntry,
          stacks: existingEntry.stacks + 1,
          goldAnyMultiplier: existingEntry.goldAnyMultiplier * bonusFunctions.getGoldMultiplierForAnyGain(),
          goldQuestionMultiplier:
            existingEntry.goldQuestionMultiplier * bonusFunctions.getGoldMultiplierForQuestionAnswer(questionKind),
          goldEnemyKillMultiplier:
            existingEntry.goldEnemyKillMultiplier * bonusFunctions.getGoldMultiplierForEnemyKill(),
          maxHealthFlatBonus: existingEntry.maxHealthFlatBonus + bonusFunctions.getMaxHealthFlatBonus(),
          maxHealthMultiplier: existingEntry.maxHealthMultiplier * bonusFunctions.getMaxHealthMultiplier(),
          maxShieldFlatBonus: existingEntry.maxShieldFlatBonus + bonusFunctions.getMaxShieldFlatBonus(),
          maxShieldMultiplier: existingEntry.maxShieldMultiplier * bonusFunctions.getMaxShieldMultiplier(),
          rateOfFireFlatBonus: existingEntry.rateOfFireFlatBonus + bonusFunctions.getRateOfFireFlatBonus(),
          rateOfFireMultiplier: existingEntry.rateOfFireMultiplier * bonusFunctions.getRateOfFireMultiplier(),
        }
      : {
          artifactId: artifact.id,
          artifactName: artifact.name,
          stacks: 1,
          goldAnyMultiplier: bonusFunctions.getGoldMultiplierForAnyGain(),
          goldQuestionMultiplier: bonusFunctions.getGoldMultiplierForQuestionAnswer(questionKind),
          goldEnemyKillMultiplier: bonusFunctions.getGoldMultiplierForEnemyKill(),
          maxHealthFlatBonus: bonusFunctions.getMaxHealthFlatBonus(),
          maxHealthMultiplier: bonusFunctions.getMaxHealthMultiplier(),
          maxShieldFlatBonus: bonusFunctions.getMaxShieldFlatBonus(),
          maxShieldMultiplier: bonusFunctions.getMaxShieldMultiplier(),
          rateOfFireFlatBonus: bonusFunctions.getRateOfFireFlatBonus(),
          rateOfFireMultiplier: bonusFunctions.getRateOfFireMultiplier(),
        }

    callableBonusesByArtifactId.set(artifact.id, nextEntry)
  }

  const baseShotsPerSecond = 1 / player.getBaseAttackIntervalSeconds()
  const currentShotsPerSecond = player.getFireRatePerSecond()
  const effectiveRateMultiplier =
    baseShotsPerSecond > 0 ? currentShotsPerSecond / baseShotsPerSecond : 1

  return {
    activeRunArtifactIds: getActiveRunArtifactIds(runLaunchConfig),
    callableArtifactBonuses: Array.from(callableBonusesByArtifactId.values()).sort((left, right) => {
      return left.artifactName.localeCompare(right.artifactName)
    }),
    gold: {
      artifactAnyGainMultiplier,
      artifactQuestionMultiplier,
      artifactEnemyKillMultiplier,
      runLaunchQuestionMultiplier: runLaunchGoldMultipliers.question,
      runLaunchEnemyKillMultiplier: runLaunchGoldMultipliers.enemyKill,
      runGoldMultiplier,
      totalQuestionMultiplier:
        artifactQuestionMultiplier * runLaunchGoldMultipliers.question,
      totalEnemyKillMultiplier:
        killGoldMultiplier * artifactEnemyKillMultiplier * runGoldMultiplier,
      goldPerEnemyKillBase,
      goldPerEnemyKillFinal:
        goldPerEnemyKillBase * killGoldMultiplier * artifactEnemyKillMultiplier * runGoldMultiplier,
      contributors: [
        ...player.getGoldMultiplierContributors(questionKind),
        ...getRunLaunchGoldContributors(runLaunchConfig),
      ],
      otherSituations: {
        streak: {
          threshold: player.getStreakGoldThreshold(),
          bonusGoldPerTrigger: player.getStreakGoldBaseBonus(),
          enabled: player.getStreakGoldThreshold() > 0 && player.getStreakGoldBaseBonus() > 0,
        },
        goldOnHit: {
          chance: player.getGoldOnHitChance(),
          amount: player.getGoldOnHitAmount(),
          expectedGoldPerHit: player.getGoldOnHitChance() * player.getGoldOnHitAmount(),
          enabled: player.getGoldOnHitChance() > 0 && player.getGoldOnHitAmount() > 0,
        },
        roundEnd: {
          percentOfCurrentGold: player.getRoundEndGoldPercentOfCurrentGold(),
          percentOfCurrentHealth: player.getRoundEndGoldPercentOfHealth(),
          goldPerFleetMember: player.getRoundEndGoldPerFleetMember(),
          enabled:
            player.getRoundEndGoldPercentOfCurrentGold() > 0 ||
            player.getRoundEndGoldPercentOfHealth() > 0 ||
            player.getRoundEndGoldPerFleetMember() > 0,
        },
        replaceQuestionBuffsWithGold: {
          enabled: player.shouldReplaceQuestionBuffsWithGold(),
          goldPerBuff: player.getReplacementGoldPerQuestionBuff(),
        },
      },
    },
    health: {
      maxHealth: player.getMaxHealthValue(),
      flatMaxHealthBonusFromBase: player.getMaxHealthValue() - 100,
      maxHealthGainMultiplier: player.getMaxHealthGainMultiplier(),
      questionAnswerHealingMultiplier: player.getQuestionAnswerHealingMultiplier(),
    },
    shield: {
      maxShield: player.getMaxShield(),
      flatMaxShieldBonusFromBase: player.getMaxShield() - 50,
      maxShieldGainMultiplier: player.getMaxShieldGainMultiplier(),
    },
    rateOfFire: {
      baseShotsPerSecond,
      currentShotsPerSecond,
      effectiveMultiplier: effectiveRateMultiplier,
    },
  }
}