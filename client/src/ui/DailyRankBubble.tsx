import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  QUESTION_TYPE_LABELS,
  type DailyActivityStats,
  type QuestionTypeBreakdown,
} from '../Player/GameSaving'

interface DailyRankBubbleProps {
  stats: DailyActivityStats
}

export interface DailyRankTier {
  threshold: number
  label: string
  accent: string
  glow: string
}

interface BubbleParticle {
  style: CSSProperties
}

interface BubbleParticleGroup {
  key: string
  className: string
  style: CSSProperties
}

export interface RankProgressState {
  rankNumber: number
  label: string
  tier: DailyRankTier
  nextTier: DailyRankTier | null
  progressPercent: number
  progressLabel: string
  questionsIntoTier: number
  questionsUntilNextTier: number
}

const DAILY_RANK_LABELS = [
  'Scout',
  'Runner',
  'Vanguard',
  'Striker',
  'Charger',
  'Ace',
  'Hotshot',
  'Tactician',
  'Elite',
  'Apex',
  'Mythic',
  'Radiant',
  'Nova',
  'Titan',
  'Celestial',
  'Overdrive',
  'Sovereign',
  'Infinite',
  'Paragon',
  'Godspeed',
] as const

const DAILY_RANK_COLORS = [
  { accent: '#7dd3fc', glow: 'rgba(125, 211, 252, 0.50)' },
  { accent: '#38bdf8', glow: 'rgba(56, 189, 248, 0.52)' },
  { accent: '#34d399', glow: 'rgba(52, 211, 153, 0.52)' },
  { accent: '#22c55e', glow: 'rgba(34, 197, 94, 0.54)' },
  { accent: '#84cc16', glow: 'rgba(132, 204, 22, 0.56)' },
  { accent: '#facc15', glow: 'rgba(250, 204, 21, 0.56)' },
  { accent: '#fbbf24', glow: 'rgba(251, 191, 36, 0.58)' },
  { accent: '#fb923c', glow: 'rgba(251, 146, 60, 0.58)' },
  { accent: '#f97316', glow: 'rgba(249, 115, 22, 0.60)' },
  { accent: '#ef4444', glow: 'rgba(239, 68, 68, 0.60)' },
  { accent: '#f43f5e', glow: 'rgba(244, 63, 94, 0.62)' },
  { accent: '#ec4899', glow: 'rgba(236, 72, 153, 0.62)' },
  { accent: '#d946ef', glow: 'rgba(217, 70, 239, 0.64)' },
  { accent: '#a855f7', glow: 'rgba(168, 85, 247, 0.64)' },
  { accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.66)' },
  { accent: '#6366f1', glow: 'rgba(99, 102, 241, 0.68)' },
  { accent: '#3b82f6', glow: 'rgba(59, 130, 246, 0.68)' },
  { accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.70)' },
  { accent: '#14b8a6', glow: 'rgba(20, 184, 166, 0.72)' },
  { accent: '#f8fafc', glow: 'rgba(248, 250, 252, 0.78)' },
] as const

const DAILY_RANK_TIERS: DailyRankTier[] = DAILY_RANK_LABELS.map((label, index) => ({
  threshold: index * 5,
  label,
  accent: DAILY_RANK_COLORS[index]?.accent ?? DAILY_RANK_COLORS[0].accent,
  glow: DAILY_RANK_COLORS[index]?.glow ?? DAILY_RANK_COLORS[0].glow,
}))

function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDurationCompact(totalSeconds: number): string {
  const clampedSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(clampedSeconds / 3600)
  const minutes = Math.floor((clampedSeconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m`
  }

  if (minutes > 0) {
    return `${minutes}m`
  }

  return `${clampedSeconds}s`
}

function getDailyRank(questionsAnswered: number): { rankNumber: number; label: string; tier: DailyRankTier } {
  const normalizedQuestions = Math.max(0, Math.floor(questionsAnswered))
  const tierIndex = DAILY_RANK_TIERS.reduce((bestIndex, tier, index) => {
    return normalizedQuestions >= tier.threshold ? index : bestIndex
  }, 0)

  return {
    rankNumber: tierIndex + 1,
    label: DAILY_RANK_TIERS[tierIndex]?.label ?? DAILY_RANK_TIERS[0].label,
    tier: DAILY_RANK_TIERS[tierIndex] ?? DAILY_RANK_TIERS[0],
  }
}

function getQuestionTypeBreakdown(
  value?: Partial<QuestionTypeBreakdown>,
): QuestionTypeBreakdown {
  return {
    rawCode: Math.max(0, Math.floor(value?.rawCode ?? 0)),
    multipleChoice: Math.max(0, Math.floor(value?.multipleChoice ?? 0)),
    starStories: Math.max(0, Math.floor(value?.starStories ?? 0)),
    starVoice: Math.max(0, Math.floor(value?.starVoice ?? 0)),
    validList: Math.max(0, Math.floor(value?.validList ?? 0)),
    orderItems: Math.max(0, Math.floor(value?.orderItems ?? 0)),
    capacity: Math.max(0, Math.floor(value?.capacity ?? 0)),
    systemDesign: Math.max(0, Math.floor(value?.systemDesign ?? 0)),
    multiSectionSystemDesign: Math.max(0, Math.floor(value?.multiSectionSystemDesign ?? 0)),
  }
}

export function getRankProgress(questionsAnswered: number): RankProgressState {
  const normalizedQuestions = Math.max(0, Math.floor(questionsAnswered))
  const currentRank = getDailyRank(normalizedQuestions)
  const nextTier = DAILY_RANK_TIERS.find((tier) => tier.threshold > currentRank.tier.threshold) ?? null
  const currentTierThreshold = currentRank.tier.threshold
  const nextTierThreshold = nextTier?.threshold ?? currentTierThreshold + 5
  const questionsIntoTier = Math.max(0, normalizedQuestions - currentTierThreshold)
  const questionsUntilNextTier = Math.max(0, nextTierThreshold - normalizedQuestions)
  const denominator = Math.max(1, nextTierThreshold - currentTierThreshold)
  const progressPercent = Math.min(100, Math.max(0, (questionsIntoTier / denominator) * 100))

  return {
    ...currentRank,
    nextTier,
    progressPercent,
    progressLabel: nextTier
      ? `${questionsIntoTier}/${denominator} to ${nextTier.label}`
      : 'Maximum rank reached',
    questionsIntoTier,
    questionsUntilNextTier,
  }
}

function buildParticles(rankNumber: number): BubbleParticle[] {
  const normalizedRank = Math.max(1, Math.min(rankNumber, DAILY_RANK_TIERS.length))
  const particleCount = Math.min(6 + normalizedRank * 2, 34)

  return Array.from({ length: particleCount }, (_, index) => {
    const angle = (index / particleCount) * Math.PI * 2
    const ringRadius = 30 + normalizedRank * 1.6 + (index % 4) * 2
    const wobbleRadius = 16 + normalizedRank * 0.45 + (index % 5) * 4
    const left = 50 + Math.cos(angle) * ringRadius
    const top = 50 + Math.sin(angle) * wobbleRadius
    const size = 3 + (index % 5) + Math.floor(normalizedRank / 6)
    const delay = -(index * 0.24)
    const duration = Math.max(1.7, 4.8 - normalizedRank * 0.12 + (index % 6) * 0.12)

    return {
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: `${Math.min(1, 0.36 + normalizedRank * 0.03)}`,
      },
    }
  })
}

function buildStormParticles(rankNumber: number): BubbleParticleGroup[] {
  if (rankNumber < 6) {
    return []
  }

  const normalizedRank = Math.max(1, Math.min(rankNumber, DAILY_RANK_TIERS.length))
  const particleCount = Math.min(4 + Math.floor(normalizedRank * 1.5), 24)

  return Array.from({ length: particleCount }, (_, index) => {
    const left = 8 + ((index * 13) % 84)
    const top = 12 + ((index * 17) % 70)
    const size = 5 + (index % 4) + Math.floor(normalizedRank / 7)
    const duration = Math.max(1.5, 4.2 - normalizedRank * 0.1 + (index % 4) * 0.16)
    const delay = -(index * 0.22)
    const driftX = -12 + (index % 7) * 4
    const driftY = -10 + (index % 5) * 5

    return {
      key: `storm-${index}`,
      className: normalizedRank >= 14 ? 'daily-rank-bubble-particle daily-rank-bubble-particle-storm daily-rank-bubble-particle-nova' : 'daily-rank-bubble-particle daily-rank-bubble-particle-storm',
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--daily-rank-drift-x': `${driftX}px`,
        '--daily-rank-drift-y': `${driftY}px`,
      } as CSSProperties,
    }
  })
}

export function getTodayStats(stats: DailyActivityStats) {
  const todayKey = toDateKey(new Date())
  return stats.byDate[todayKey] ?? {
    points: 0,
    questionsAnswered: 0,
    questionsAnsweredByDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      veryHard: 0,
      insanelyHard: 0,
    },
    questionsAnsweredByType: getQuestionTypeBreakdown(),
    playtimeSeconds: 0,
  }
}

export function DailyRankBubble({ stats }: DailyRankBubbleProps) {
  const todayStats = useMemo(() => getTodayStats(stats), [stats])
  const todayTypeBreakdown = useMemo(
    () => getQuestionTypeBreakdown(todayStats.questionsAnsweredByType),
    [todayStats.questionsAnsweredByType],
  )
  const todayTypeSummary = useMemo(() => {
    return (Object.keys(QUESTION_TYPE_LABELS) as Array<keyof QuestionTypeBreakdown>)
      .map((key) => ({ key, label: QUESTION_TYPE_LABELS[key], count: todayTypeBreakdown[key] }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  }, [todayTypeBreakdown])
  const rankProgress = useMemo(() => getRankProgress(todayStats.questionsAnswered), [todayStats.questionsAnswered])
  const particles = useMemo(() => buildParticles(rankProgress.rankNumber), [rankProgress.rankNumber])
  const stormParticles = useMemo(() => buildStormParticles(rankProgress.rankNumber), [rankProgress.rankNumber])
  const [pulseKey, setPulseKey] = useState(0)
  const [pulseBurstSeed, setPulseBurstSeed] = useState(0)
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [sparkleTextKey, setSparkleTextKey] = useState(0)
  const previousAnsweredRef = useRef<number | null>(null)
  const celebrationTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const previousAnswered = previousAnsweredRef.current
    previousAnsweredRef.current = todayStats.questionsAnswered

    if (previousAnswered === null || todayStats.questionsAnswered <= previousAnswered) {
      return
    }

    if (celebrationTimeoutRef.current !== null) {
      window.clearTimeout(celebrationTimeoutRef.current)
    }

    setPulseKey((previous) => previous + 1)
    setPulseBurstSeed((previous) => previous + 1)
    setSparkleTextKey((previous) => previous + 1)
    setIsCelebrating(true)

    celebrationTimeoutRef.current = window.setTimeout(() => {
      setIsCelebrating(false)
      celebrationTimeoutRef.current = null
    }, 920)

    return () => {
      if (celebrationTimeoutRef.current !== null) {
        window.clearTimeout(celebrationTimeoutRef.current)
      }
    }
  }, [todayStats.questionsAnswered])

  const bubbleStyle = {
    '--daily-rank-accent': rankProgress.tier.accent,
    '--daily-rank-glow': rankProgress.tier.glow,
    '--daily-rank-ring-opacity': `${Math.min(0.84, 0.28 + rankProgress.rankNumber * 0.025)}`,
  } as CSSProperties

  const pulseParticles = useMemo(() => {
    const burstCount = Math.min(8 + rankProgress.rankNumber * 2, 34)

    return Array.from({ length: burstCount }, (_, index) => {
      const angle = (index / burstCount) * Math.PI * 2
      const distance = 18 + (index % 4) * 8 + rankProgress.rankNumber * 1.65
      const size = 3 + (index % 5) + Math.floor(rankProgress.rankNumber / 8)
      return {
        style: {
          left: `50%`,
          top: `50%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
          animationDelay: `${-(index * 0.06)}s`,
          opacity: `${Math.min(1, 0.55 + rankProgress.rankNumber * 0.02)}`,
        },
      }
    })
  }, [pulseBurstSeed, rankProgress.rankNumber])

  return (
    <div className="daily-rank-bubble-shell">
      <div className="daily-rank-bubble-sparkle-copy" aria-hidden="true">
        <span key={sparkleTextKey} className="daily-rank-bubble-sparkle-text">
          +1 Spark
        </span>
      </div>
      <div
        className={isCelebrating ? 'daily-rank-bubble daily-rank-bubble-celebrating' : 'daily-rank-bubble'}
        style={bubbleStyle}
        data-pulse-key={pulseKey}
        aria-label={`Today played ${formatDurationCompact(todayStats.playtimeSeconds)}, answered ${todayStats.questionsAnswered} questions, rank ${rankProgress.rankNumber} ${rankProgress.label}`}
      >
        <div className="daily-rank-bubble-glow" aria-hidden="true" />
        <div className="daily-rank-bubble-burst" aria-hidden="true">
          {pulseParticles.map((particle, index) => (
            <span key={`${pulseKey}-${index}`} className="daily-rank-bubble-burst-particle" style={particle.style} />
          ))}
        </div>
        <div className="daily-rank-bubble-particles" aria-hidden="true">
          {particles.map((particle, index) => (
            <span key={index} className="daily-rank-bubble-particle" style={particle.style} />
          ))}
          {stormParticles.map((particle) => (
            <span key={particle.key} className={particle.className} style={particle.style} />
          ))}
        </div>
        <div className="daily-rank-bubble-content">
          <span className="daily-rank-bubble-kicker">Today</span>
          <strong>{formatDurationCompact(todayStats.playtimeSeconds)} played</strong>
          <span>{todayStats.questionsAnswered} questions answered</span>
          <span className="daily-rank-bubble-rank">
            Rank {rankProgress.rankNumber} · {rankProgress.label}
          </span>
          {todayTypeSummary.length > 0 ? (
            <span className="daily-rank-bubble-progress-label">
              Types: {todayTypeSummary.map((item) => `${item.label} ${item.count}`).join(' · ')}
            </span>
          ) : (
            <span className="daily-rank-bubble-progress-label">Types: no questions answered yet</span>
          )}
          <div className="daily-rank-bubble-progress" aria-label={rankProgress.progressLabel}>
            <div
              className="daily-rank-bubble-progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={rankProgress.nextTier ? rankProgress.nextTier.threshold - rankProgress.tier.threshold : rankProgress.questionsIntoTier}
              aria-valuenow={rankProgress.questionsIntoTier}
              aria-valuetext={rankProgress.progressLabel}
            >
              <div className="daily-rank-bubble-progress-fill" style={{ width: `${rankProgress.progressPercent}%` }} />
            </div>
            <span className="daily-rank-bubble-progress-label">
              {rankProgress.nextTier
                ? `${rankProgress.questionsUntilNextTier} more for ${rankProgress.nextTier.label}`
                : rankProgress.progressLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}