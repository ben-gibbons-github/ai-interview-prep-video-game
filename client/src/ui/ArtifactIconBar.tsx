import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import type { PlayerStateSnapshot } from '../Player/PlayerState'
import { getArtifactNameAndDescriptionById } from '../Player/Player'
import {
  type RunLaunchConfig,
} from './RunLaunchConfig'
import { getActiveRunArtifactIds } from './RunArtifactPipeline'

interface ArtifactMeta {
  id: string
  name: string
  description: string
  getStats: (playerState: PlayerStateSnapshot, stacks: number) => string[]
}

interface ArtifactIconBarProps {
  playerState: PlayerStateSnapshot
  runLaunchConfig: RunLaunchConfig
}

interface ArtifactStackEntry {
  id: string
  stacks: number
}

const ARTIFACT_META_BY_ID: Record<string, ArtifactMeta> = {
  'chaos-artifact-triple-vitals-no-lives': {
    id: 'chaos-artifact-triple-vitals-no-lives',
    name: 'Glass Core Reactor',
    description: 'Chaos artifact: lose all lives, gain 3x max health and max shield now and for future gains.',
    getStats: (playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Lives set to 0 at run start',
      `Current max health: ${Math.round(playerState.maxHealth)}, max shield: ${Math.round(playerState.maxShield)}`,
    ],
  },
  'chaos-artifact-gold-125-shield-drain': {
    id: 'chaos-artifact-gold-125-shield-drain',
    name: 'Leaky Fortune Capacitor',
    description: 'Chaos artifact: all gold gains are x1.25, but you lose 1% max shield per second.',
    getStats: (_playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Gold gain multiplier: x1.25',
      'Drain: 1% of max shield per second',
    ],
  },
  'chaos-artifact-gold-200-health-drain': {
    id: 'chaos-artifact-gold-200-health-drain',
    name: 'Blood Mint Engine',
    description: 'Chaos artifact: all gold gains are x1.5, but you lose 2 health per second down to 5 health.',
    getStats: (_playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Gold gain multiplier: x1.50',
      'Drain: 2 health per second (stops at 5 health)',
    ],
  },
  'chaos-artifact-no-question-heal-five-freeze-bombs': {
    id: 'chaos-artifact-no-question-heal-five-freeze-bombs',
    name: 'Cryo Debt Ledger',
    description: 'Chaos artifact: correct answers no longer heal you, and you start with 5 Freeze Bomb artifacts.',
    getStats: (playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Correct-answer healing disabled',
      `Freeze rays per correct: ${playerState.artifactStats.freezeBombSecondsPerCorrect.toFixed(0)}`,
    ],
  },
  'chaos-artifact-no-question-heal-plus-vitals': {
    id: 'chaos-artifact-no-question-heal-plus-vitals',
    name: 'Fortified Austerity',
    description: 'Chaos artifact: correct answers no longer heal you, gain +400 max health and +400 max shield.',
    getStats: (playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Correct-answer healing disabled',
      `Current max health: ${Math.round(playerState.maxHealth)}, max shield: ${Math.round(playerState.maxShield)}`,
    ],
  },
  'chaos-artifact-no-kill-gold-shield-round-gold': {
    id: 'chaos-artifact-no-kill-gold-shield-round-gold',
    name: 'Shield Dividend Contract',
    description: 'Chaos artifact: kills grant no gold; round end grants gold equal to 50% of current shield.',
    getStats: (playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Kill gold disabled',
      `Estimated round-end gold from shield: ${Math.floor(playerState.currentShield * 0.5)}`,
    ],
  },
  'chaos-artifact-no-kill-gold-health-round-gold': {
    id: 'chaos-artifact-no-kill-gold-health-round-gold',
    name: 'Vitality Dividend Contract',
    description: 'Chaos artifact: kills grant no gold; round end grants gold equal to 30% of current health.',
    getStats: (playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Kill gold disabled',
      `Estimated round-end gold from health: ${Math.floor(playerState.currentHealth * 0.3)}`,
    ],
  },
  'chaos-artifact-no-question-heal-damage-lifesteal': {
    id: 'chaos-artifact-no-question-heal-damage-lifesteal',
    name: 'Predator Retrofit',
    description: 'Chaos artifact: correct answers no longer heal you, and you heal for 1% of damage dealt.',
    getStats: (_playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Correct-answer healing disabled',
      'Damage lifesteal: 1% of dealt damage',
    ],
  },
  'chaos-artifact-no-skips': {
    id: 'chaos-artifact-no-skips',
    name: 'No Skips Artifact',
    description: 'Chaos artifact: start with 0 skips and gain +300 gold immediately.',
    getStats: (_playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Start with 0 skips',
      'Immediate launch bonus: +300 gold',
    ],
  },
  'chaos-artifact-fast-rounds': {
    id: 'chaos-artifact-fast-rounds',
    name: 'Fast Rounds',
    description: 'Chaos artifact: 2x damage, 2x question progression/rewards, and shorter round-start freeze.',
    getStats: (_playerState, _stacks) => [
      'Chaos artifact active for this run',
      'Round-start freeze timer: x0.50',
      'All damage: x2.00',
      'Question buff rewards and progression: x2.00',
      'Correct-answer gold includes fast-rounds bonus',
    ],
  },
  'start-artifact-hard-questions': {
    id: 'start-artifact-hard-questions',
    name: 'Hard Questions Artifact',
    description: 'Starting artifact: begins with a higher question difficulty ramp and grants launch gold bonus.',
    getStats: (_playerState, _stacks) => [
      'Starting artifact active for this run',
      'Question selection ramp starts harder',
      'Launch gold bonus: x1.25 to correct-answer gold',
    ],
  },
  'start-artifact-star-stories-hard': {
    id: 'start-artifact-star-stories-hard',
    name: 'I Know My Star Stories',
    description: 'Starting artifact: STAR stories start on hard and correct STAR story answers grant extra gold.',
    getStats: (_playerState, _stacks) => [
      'Starting artifact active for this run',
      'STAR stories start on hard difficulty',
      'STAR story correct-answer gold bonus: x1.50',
    ],
  },
  'rapid-fire-core': {
    id: 'rapid-fire-core',
    name: 'Rapid Fire Core',
    description: 'Permanent rate-of-fire upgrade.',
    getStats: (playerState, stacks) => {
      const multiplier = 1 / Math.max(0.05, playerState.artifactStats.permanentAttackSpeedMultiplier)
      return [
        `Per stack: +20% rate of fire`,
        `Total from stacks: +${(stacks * 20).toFixed(0)}%`,
        `Current ROF multiplier: x${multiplier.toFixed(2)}`,
      ]
    },
  },
  'sharpened-rounds': {
    id: 'sharpened-rounds',
    name: 'Sharpened Rounds',
    description: 'Permanent projectile damage boost.',
    getStats: (playerState, stacks) => [
      `Per stack: +4.0 projectile damage`,
      `Total damage bonus: +${playerState.artifactStats.permanentAttackDamageBonus.toFixed(1)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'shield-generator': {
    id: 'shield-generator',
    name: 'Shield Generator',
    description: 'Adds round-start shield recharge scaling with your max shields.',
    getStats: (playerState, stacks) => [
      `Per stack: +20% of max shields each round`,
      `Round-start shield gain: ${playerState.artifactStats.baseShieldPerWave.toFixed(1)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'max-shield-boost': {
    id: 'max-shield-boost',
    name: 'Max Shield Boost',
    description: 'Increases max shields.',
    getStats: (_playerState, stacks) => [
      `Per stack: +50 max shields`,
      `Estimated total from stacks: +${(stacks * 50).toFixed(0)} max shields`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'shield-recharger': {
    id: 'shield-recharger',
    name: 'Max Shield Boost',
    description: 'Legacy variant of max shield boost.',
    getStats: (_playerState, stacks) => [
      `Per stack: +45 max shields`,
      `Estimated total from stacks: +${(stacks * 45).toFixed(0)} max shields`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'bouncing-bullets': {
    id: 'bouncing-bullets',
    name: 'Bouncing Bullets',
    description: 'Projectiles gain bounce chance and can exceed 100%.',
    getStats: (playerState, stacks) => [
      `Per stack: +20% bounce chance`,
      `Current bounce chance: ${playerState.artifactStats.bounceChancePercent.toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'burst-fire': {
    id: 'burst-fire',
    name: 'Burst Fire',
    description: 'Adds multi-shot burst scaling.',
    getStats: (playerState, stacks) => [
      `Per stack: +0.2 burst size`,
      `Current burst size: ${playerState.artifactStats.burstSize.toFixed(2)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'fire-rounds': {
    id: 'fire-rounds',
    name: 'Fire Rounds',
    description: 'Hits ignite enemies with stacking burn damage and duration.',
    getStats: (playerState, stacks) => [
      `Per stack: +6 burn DPS and +4.0s duration`,
      `Current burn: ${playerState.artifactStats.burnDamagePerSecond.toFixed(1)} DPS for ${playerState.artifactStats.burnDurationSeconds.toFixed(1)}s`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'gold-bounty': {
    id: 'gold-bounty',
    name: 'Gold Bounty',
    description: 'Increases gold income from kills and correct answers.',
    getStats: (playerState, stacks) => {
      const bonusPercent = (playerState.artifactStats.goldGainMultiplier - 1) * 100
      return [
        `Per stack: +10% gold gain`,
        `Current gold gain bonus: +${bonusPercent.toFixed(0)}%`,
        `Stacks purchased: ${stacks}`,
      ]
    },
  },
  'quiz-bonus-health': {
    id: 'quiz-bonus-health',
    name: 'Quiz Bonus Health',
    description: 'Boosts heal amount when answering quiz questions correctly.',
    getStats: (playerState, stacks) => [
      `Per stack: +1% correct-answer heal`,
      `Current quiz heal bonus: +${(playerState.artifactStats.quizBonusHealthPercent * 100).toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'quiz-bonus-time': {
    id: 'quiz-bonus-time',
    name: 'Quiz Freeze Time',
    description: 'Adds extra freeze time after correct quiz answers.',
    getStats: (playerState, stacks) => [
      `Per stack: +5s quiz freeze duration`,
      `Current quiz freeze bonus: +${playerState.artifactStats.quizFreezeDurationSeconds.toFixed(0)}s`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'freeze-bomb': {
    id: 'freeze-bomb',
    name: 'Freeze Ray',
    description: 'Each correct answer queues freeze rays that fire after queued nukes.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 queued freeze ray on each correct answer`,
      `Current freeze rays queued per correct: ${playerState.artifactStats.freezeBombSecondsPerCorrect.toFixed(0)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'fire-bomb': {
    id: 'fire-bomb',
    name: 'Question Nuke',
    description: 'Queues high-damage nukes on correct answers for your current target.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 queued nuke on each correct answer`,
      `Current nukes queued per correct: ${playerState.artifactStats.fireBombDamagePerSecond.toFixed(0)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'deflection-shields': {
    id: 'deflection-shields',
    name: 'Deflection Shields',
    description: 'Shield impacts can fire deflected counter-shots.',
    getStats: (playerState, stacks) => [
      `Per stack: +20% deflection chance`,
      `Current deflection chance: ${playerState.artifactStats.deflectionShieldChancePercent.toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'code-brain': {
    id: 'code-brain',
    name: 'Code Brain',
    description: 'Doubles raw coding gold rewards per purchase.',
    getStats: (playerState, stacks) => [
      `Per stack: x2 raw coding gold multiplier`,
      `Current raw coding multiplier: x${playerState.artifactStats.rawCodingGoldMultiplier.toFixed(2)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'mini-fleet': {
    id: 'mini-fleet',
    name: 'Mini Fleet',
    description: 'Summons mini allies on correct quiz answers.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 mini ally on each correct answer`,
      `Current mini allies per correct: ${playerState.artifactStats.miniFleetAlliesPerCorrect.toFixed(0)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'big-boss': {
    id: 'big-boss',
    name: 'Big Boss',
    description: 'Grants a chance to summon a heavy ally on correct answers.',
    getStats: (playerState, stacks) => [
      `Per stack: +50% heavy ally summon chance`,
      `Current summon chance: ${(playerState.artifactStats.bigBossSummonChancePerCorrect * 100).toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'bonus-health-flat': {
    id: 'bonus-health-flat',
    name: 'Bonus Health',
    description: 'Increases max health instantly.',
    getStats: (playerState, stacks) => [
      `Per stack: +45 max health`,
      `Estimated total from stacks: +${(stacks * 45).toFixed(0)} max health`,
      `Current max health: ${Math.round(playerState.maxHealth)}`,
    ],
  },
  'bonus-health-percent': {
    id: 'bonus-health-percent',
    name: 'Bonus Health %',
    description: 'Boosts max health by percentage each purchase.',
    getStats: (playerState, stacks) => [
      `Per stack: +22% max health (compounding)`,
      `Stacks purchased: ${stacks}`,
      `Current max health: ${Math.round(playerState.maxHealth)}`,
    ],
  },
  'bonus-life': {
    id: 'bonus-life',
    name: 'Bonus Life',
    description: 'Grants extra lives.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 life`,
      `Estimated total from stacks: +${stacks} life`,
      `Current lives: ${playerState.lives}`,
    ],
  },
  'bonus-skip': {
    id: 'bonus-skip',
    name: 'Bonus Skip',
    description: 'Grants extra skips.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 skip`,
      `Estimated total from stacks: +${stacks} skip`,
      `Current skips: ${playerState.skips}`,
    ],
  },
  'health-on-kill': {
    id: 'health-on-kill',
    name: 'Vampiric Core',
    description: 'Restores health on enemy kill.',
    getStats: (playerState, stacks) => [
      `Per stack: +5% max health healed on kill`,
      `Current health on kill: +${(playerState.artifactStats.healthOnKill * 100).toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'shield-on-kill': {
    id: 'shield-on-kill',
    name: 'Aegis Feed',
    description: 'Restores shields on enemy kill.',
    getStats: (playerState, stacks) => [
      `Per stack: +20% max shields restored on kill`,
      `Current shield on kill: +${(playerState.artifactStats.shieldOnKill * 100).toFixed(0)}%`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'damage-on-kill': {
    id: 'damage-on-kill',
    name: 'Execution Lens',
    description: 'Adds permanent projectile damage each time you get a kill.',
    getStats: (playerState, stacks) => [
      `Per stack: +0.8 damage on kill`,
      `Current damage on kill: +${playerState.artifactStats.damageOnKill.toFixed(1)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
  'additional-kill-credit': {
    id: 'additional-kill-credit',
    name: 'Echo Core',
    description: 'Each kill counts as additional kills for kill-triggered bonuses.',
    getStats: (playerState, stacks) => [
      `Per stack: +1 additional kill credit`,
      `Current additional kill credits: +${playerState.artifactStats.additionalKillCredits.toFixed(0)}`,
      `Stacks purchased: ${stacks}`,
    ],
  },
}

function buildArtifactEntries(artifactIds: string[]): ArtifactStackEntry[] {
  const byId = new Map<string, number>()
  const orderedUniqueIds: string[] = []

  for (const artifactId of artifactIds) {
    if (!byId.has(artifactId)) {
      orderedUniqueIds.push(artifactId)
      byId.set(artifactId, 0)
    }

    byId.set(artifactId, (byId.get(artifactId) ?? 0) + 1)
  }

  return orderedUniqueIds.map((id) => ({
    id,
    stacks: byId.get(id) ?? 0,
  }))
}

function getArtifactMetaWithFallback(artifactId: string): ArtifactMeta | null {
  const staticMeta = ARTIFACT_META_BY_ID[artifactId]
  if (staticMeta) {
    return staticMeta
  }

  const dynamicMeta = getArtifactNameAndDescriptionById(artifactId)
  if (!dynamicMeta) {
    return null
  }

  return {
    id: dynamicMeta.id,
    name: dynamicMeta.name,
    description: dynamicMeta.description,
    getStats: (_playerState, stacks) => [`Stacks purchased: ${stacks}`],
  }
}

function hashArtifactId(artifactId: string): number {
  let hash = 0
  for (let index = 0; index < artifactId.length; index += 1) {
    hash = (hash * 31 + artifactId.charCodeAt(index)) % 360
  }

  return hash
}

export function getArtifactVisualStyle(artifactId: string): CSSProperties {
  const hue = hashArtifactId(artifactId)
  const accentHue = (hue + 48) % 360

  return {
    '--artifact-hue': `${hue}deg`,
    '--artifact-accent-hue': `${accentHue}deg`,
  } as CSSProperties
}

export function ArtifactSvgIcon({ artifactId }: { artifactId: string }) {
  let mark: ReactNode

  switch (artifactId) {
    case 'rapid-fire-core':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M7 8l4 4-4 4" />
          <path className="artifact-icon-svg-mark" d="M12 8l4 4-4 4" />
        </>
      )
      break
    case 'sharpened-rounds':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="3.2" />
          <path className="artifact-icon-svg-mark" d="M12 5v2.3M12 16.7V19M5 12h2.3M16.7 12H19" />
        </>
      )
      break
    case 'shield-generator':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5l5 2.6v3.8c0 3.3-1.8 5.6-5 7.2-3.2-1.6-5-3.9-5-7.2V7.6L12 5z" />
          <path className="artifact-icon-svg-mark" d="M9.2 12h5.6" />
        </>
      )
      break
    case 'max-shield-boost':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 4.8l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7v-4L12 4.8z" />
          <path className="artifact-icon-svg-mark" d="M12 9v6M9 12h6" />
        </>
      )
      break
    case 'shield-recharger':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 4.8l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7v-4L12 4.8z" />
          <path className="artifact-icon-svg-mark" d="M9.1 13.5a3 3 0 105.7-1.1" />
          <path className="artifact-icon-svg-mark" d="M14.7 9.8l.2 2-2 .3" />
        </>
      )
      break
    case 'bouncing-bullets':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="9" cy="10" r="1.8" />
          <circle className="artifact-icon-svg-mark" cx="15" cy="14" r="1.8" />
          <path className="artifact-icon-svg-mark" d="M10.5 11.5l3 1.8M14.6 9.2H17v2.3" />
        </>
      )
      break
    case 'burst-fire':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="8" cy="12" r="1.3" />
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="1.3" />
          <circle className="artifact-icon-svg-mark" cx="16" cy="12" r="1.3" />
        </>
      )
      break
    case 'fire-rounds':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6c1.9 2 2.6 3.1 2.6 4.6a2.6 2.6 0 11-5.2 0C9.4 9.1 10.1 8 12 6z" />
          <path className="artifact-icon-svg-mark" d="M9 14.3c.6 1.5 1.7 2.3 3 3.2 1.3-.9 2.4-1.7 3-3.2" />
        </>
      )
      break
    case 'gold-bounty':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.8" />
          <path className="artifact-icon-svg-mark" d="M10.1 10.4c0-.8.8-1.4 1.9-1.4s1.9.6 1.9 1.4-.8 1.4-1.9 1.4-1.9.7-1.9 1.4.8 1.4 1.9 1.4 1.9-.6 1.9-1.4" />
        </>
      )
      break
    case 'quiz-bonus-health':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
          <path className="artifact-icon-svg-mark" d="M12 10.2v3.4M10.3 11.9h3.4" />
        </>
      )
      break
    case 'quiz-bonus-time':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M9.2 7.5h5.6M9.2 16.5h5.6" />
          <path className="artifact-icon-svg-mark" d="M9.2 7.5c0 2 2.8 2.7 2.8 4.5s-2.8 2.5-2.8 4.5" />
          <path className="artifact-icon-svg-mark" d="M14.8 7.5c0 2-2.8 2.7-2.8 4.5s2.8 2.5 2.8 4.5" />
        </>
      )
      break
    case 'freeze-bomb':
      mark = <path className="artifact-icon-svg-mark" d="M12 7v10M8 9.2l8 5.6M16 9.2l-8 5.6M7.8 12h8.4" />
      break
    case 'fire-bomb':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="11.5" cy="13" r="3.8" />
          <path className="artifact-icon-svg-mark" d="M14 10l3.1-2.8M17.1 7.2l-.2 2.4" />
        </>
      )
      break
    case 'deflection-shields':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5l4.8 2.4V11c0 3.1-1.8 5.1-4.8 6.6-3-1.5-4.8-3.5-4.8-6.6V7.4L12 5z" />
          <path className="artifact-icon-svg-mark" d="M9.1 12h4.9M12.4 10.3l1.8 1.7-1.8 1.7" />
        </>
      )
      break
    case 'code-brain':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M9 9.2c0-1.3.9-2.2 2.1-2.2M15 9.2c0-1.3-.9-2.2-2.1-2.2" />
          <path className="artifact-icon-svg-mark" d="M8.5 11.5c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8M15.5 11.5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8" />
          <path className="artifact-icon-svg-mark" d="M10.2 16h3.6" />
        </>
      )
      break
    case 'mini-fleet':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M6.6 13l1.7-2.3L10 13l-1.7 2.3L6.6 13z" />
          <path className="artifact-icon-svg-mark" d="M11.2 11l1.7-2.3 1.7 2.3-1.7 2.3L11.2 11z" />
          <path className="artifact-icon-svg-mark" d="M15.8 13l1.7-2.3 1.7 2.3-1.7 2.3L15.8 13z" />
        </>
      )
      break
    case 'big-boss':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M7 15l1-5 4 2 4-2 1 5z" />
          <path className="artifact-icon-svg-mark" d="M9.2 9.8l1.2 1.7M14.8 9.8l-1.2 1.7" />
        </>
      )
      break
    case 'bonus-health-flat':
      mark = (
        <>
          <rect className="artifact-icon-svg-mark" x="8" y="8" width="8" height="8" rx="1.6" />
          <path className="artifact-icon-svg-mark" d="M12 9.8v4.4M9.8 12h4.4" />
        </>
      )
      break
    case 'bonus-health-percent':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M8.2 15.8l7.6-7.6" />
          <circle className="artifact-icon-svg-mark" cx="8.7" cy="9" r="1.4" />
          <circle className="artifact-icon-svg-mark" cx="15.3" cy="15" r="1.4" />
        </>
      )
      break
    case 'bonus-life':
      mark = <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
      break
    case 'bonus-skip':
      mark = <path className="artifact-icon-svg-mark" d="M7.4 9.2l4.2 2.8-4.2 2.8V9.2zm5.2 0l4.2 2.8-4.2 2.8V9.2z" />
      break
    case 'health-on-kill':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 17.8s-4.5-2.9-5.8-5.5a3.2 3.2 0 015.8-2.2 3.2 3.2 0 015.8 2.2c-1.3 2.6-5.8 5.5-5.8 5.5z" />
          <path className="artifact-icon-svg-mark" d="M15.8 8.7l-7.6 7.6" />
        </>
      )
      break
    case 'shield-on-kill':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5l4.8 2.4V11c0 3.1-1.8 5.1-4.8 6.6-3-1.5-4.8-3.5-4.8-6.6V7.4L12 5z" />
          <path className="artifact-icon-svg-mark" d="M9.4 12.2l1.7 1.7 3.5-3.5" />
        </>
      )
      break
    case 'damage-on-kill':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="3.6" />
          <path className="artifact-icon-svg-mark" d="M8.2 15.8l7.6-7.6" />
        </>
      )
      break
    case 'additional-kill-credit':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 8.5v7M8.5 12h7" />
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.8" />
        </>
      )
      break
    case 'start-artifact-hard-questions':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6.6l4.7 2.4v3.3c0 2.9-1.7 4.8-4.7 6.3-3-1.5-4.7-3.4-4.7-6.3V9L12 6.6z" />
          <path className="artifact-icon-svg-mark" d="M12 9.4v4.5" />
          <circle className="artifact-icon-svg-mark" cx="12" cy="15.7" r="0.7" />
        </>
      )
      break
    case 'start-artifact-no-skips':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M7.4 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M12.6 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M7.8 16.2l8.4-8.4" />
        </>
      )
      break
    case 'start-artifact-star-stories-hard':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6.8l1.7 3.3 3.6.5-2.6 2.5.6 3.6L12 15l-3.3 1.7.6-3.6-2.6-2.5 3.6-.5L12 6.8z" />
          <path className="artifact-icon-svg-mark" d="M9.2 17.4h5.6" />
        </>
      )
      break
    case 'chaos-artifact-no-skips':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M7.4 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M12.6 9.2l4.2 2.8-4.2 2.8V9.2z" />
          <path className="artifact-icon-svg-mark" d="M7.8 16.2l8.4-8.4" />
        </>
      )
      break
    case 'chaos-artifact-fast-rounds':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M8.6 6.8h6.8v2.6L12.7 12h2.2L11.2 17v-3.6H9.1l2.7-3.8z" />
        </>
      )
      break
    case 'chaos-artifact-triple-vitals-no-lives':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5.3l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7V8L12 5.3z" />
          <path className="artifact-icon-svg-mark" d="M8.5 15.5l7-7" />
        </>
      )
      break
    case 'chaos-artifact-gold-125-shield-drain':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.6" />
          <path className="artifact-icon-svg-mark" d="M10 10.5h4" />
          <path className="artifact-icon-svg-mark" d="M8.5 16.2h7" />
        </>
      )
      break
    case 'chaos-artifact-gold-200-health-drain':
      mark = (
        <>
          <circle className="artifact-icon-svg-mark" cx="12" cy="12" r="4.6" />
          <path className="artifact-icon-svg-mark" d="M12 8.8v6.4" />
          <path className="artifact-icon-svg-mark" d="M9.4 12h5.2" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-five-freeze-bombs':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 7v10M8 9.2l8 5.6M16 9.2l-8 5.6M7.8 12h8.4" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-plus-vitals':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
          <path className="artifact-icon-svg-mark" d="M8.5 16.2l7-7" />
        </>
      )
      break
    case 'chaos-artifact-no-kill-gold-shield-round-gold':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 5.3l5.4 2.7v4c0 3.5-2 6-5.4 7.7-3.4-1.7-5.4-4.2-5.4-7.7V8L12 5.3z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-kill-gold-health-round-gold':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 18s-4.8-3.1-6.2-6a3.5 3.5 0 016.2-2.4 3.5 3.5 0 016.2 2.4c-1.4 2.9-6.2 6-6.2 6z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    case 'chaos-artifact-no-question-heal-damage-lifesteal':
      mark = (
        <>
          <path className="artifact-icon-svg-mark" d="M12 6c1.9 2 2.6 3.1 2.6 4.6a2.6 2.6 0 11-5.2 0C9.4 9.1 10.1 8 12 6z" />
          <path className="artifact-icon-svg-mark" d="M8.7 16.1l6.6-6.6" />
        </>
      )
      break
    default:
      mark = <path className="artifact-icon-svg-mark" d="M12 5l6 3.2v7.6L12 19l-6-3.2V8.2L12 5z" />
      break
  }

  return (
    <svg className="artifact-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle className="artifact-icon-svg-ring" cx="12" cy="12" r="8.6" />
      {mark}
    </svg>
  )
}

export function ArtifactIconBar({ playerState, runLaunchConfig }: ArtifactIconBarProps) {
  const [hoveredArtifactId, setHoveredArtifactId] = useState<string | null>(null)
  const purchasedArtifacts = useMemo(() => {
    const combinedArtifactIds = [
      ...getActiveRunArtifactIds(runLaunchConfig),
      ...playerState.artifactIds,
    ]

    return buildArtifactEntries(combinedArtifactIds)
  }, [playerState.artifactIds, runLaunchConfig])

  const hoveredArtifact = useMemo(() => {
    if (!hoveredArtifactId) {
      return null
    }

    return purchasedArtifacts.find((artifact) => artifact.id === hoveredArtifactId) ?? null
  }, [hoveredArtifactId, purchasedArtifacts])

  if (purchasedArtifacts.length === 0) {
    return null
  }

  const resolvedHoveredMeta = hoveredArtifact ? getArtifactMetaWithFallback(hoveredArtifact.id) : null
  const hoveredName = resolvedHoveredMeta?.name ?? hoveredArtifact?.id ?? ''
  const hoveredDescription = resolvedHoveredMeta?.description ?? 'No description available.'
  const hoveredStats = hoveredArtifact
    ? resolvedHoveredMeta?.getStats(playerState, hoveredArtifact.stacks) ?? [`Stacks purchased: ${hoveredArtifact.stacks}`]
    : []

  return (
    <section className="artifact-icon-bar" aria-label="Purchased artifacts">
      <h3>Artifacts</h3>
      <div className="artifact-icon-list" role="list">
        {purchasedArtifacts.map((artifactEntry) => {
          const metadata = getArtifactMetaWithFallback(artifactEntry.id)
          const name = metadata?.name ?? artifactEntry.id

          return (
            <button
              key={artifactEntry.id}
              type="button"
              className="artifact-icon-item"
              aria-label={name}
              style={getArtifactVisualStyle(artifactEntry.id)}
              onMouseEnter={() => {
                setHoveredArtifactId(artifactEntry.id)
              }}
              onMouseLeave={() => {
                setHoveredArtifactId((current) => (current === artifactEntry.id ? null : current))
              }}
              onFocus={() => {
                setHoveredArtifactId(artifactEntry.id)
              }}
              onBlur={() => {
                setHoveredArtifactId((current) => (current === artifactEntry.id ? null : current))
              }}
            >
              <ArtifactSvgIcon artifactId={artifactEntry.id} />
            </button>
          )
        })}
      </div>
      {hoveredArtifact ? (
        <div className="artifact-icon-tooltip-panel" role="tooltip" aria-live="polite">
          <strong>{hoveredName}</strong>
          <span>{hoveredDescription}</span>
          <span>Stacks: {hoveredArtifact.stacks}</span>
          {hoveredStats.map((statLine, index) => (
            <span key={`${hoveredArtifact.id}-stat-${index}`}>{statLine}</span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
