import { useState } from 'react'

interface ActiveEffectState {
  id: string
  name: string
  remainingSeconds: number
}

interface ArtifactStats {
  permanentAttackSpeedMultiplier: number
  permanentAttackDamageBonus: number
  baseShieldPerWave: number
  shieldRechargeOnHealthHitPercent: number
  bounceChancePercent: number
  burstSize: number
  burnDamagePerSecond: number
  burnDurationSeconds: number
  healthOnKill: number
  shieldOnKill: number
  damageOnKill: number
  additionalKillCredits: number
  goldGainMultiplier: number
  quizBonusHealthPercent: number
  quizFreezeDurationSeconds: number
}

interface PlayerStateProps {
  currentHealth: number
  maxHealth: number
  currentShield: number
  maxShield: number
  gold: number
  fireRatePerSecond: number
  projectileDamage: number
  activeConsumables: ActiveEffectState[]
  artifactStats: ArtifactStats
  questionAnswerGoldMultiplier: number
  enemyKillGoldMultiplier: number
}

export function PlayerStatesPanel({
  currentHealth,
  maxHealth,
  currentShield,
  maxShield,
  gold,
  fireRatePerSecond,
  projectileDamage,
  activeConsumables,
  artifactStats,
  questionAnswerGoldMultiplier,
  enemyKillGoldMultiplier,
}: PlayerStateProps) {
  const [goldMultiplierPopoverOpen, setGoldMultiplierPopoverOpen] = useState(false)
  const safeHealthRatio = Math.max(0, Math.min(1, maxHealth > 0 ? currentHealth / maxHealth : 0))
  const artifactStatRows = [
    {
      key: 'permanent-attack-speed',
      label: 'Permanent Attack Speed Multiplier',
      value: `${artifactStats.permanentAttackSpeedMultiplier.toFixed(2)}x`,
      visible: Math.abs(artifactStats.permanentAttackSpeedMultiplier - 1) > 0.001,
    },
    {
      key: 'permanent-damage-bonus',
      label: 'Permanent Damage Bonus',
      value: `+${artifactStats.permanentAttackDamageBonus.toFixed(1)}`,
      visible: artifactStats.permanentAttackDamageBonus > 0,
    },
    {
      key: 'base-shield-per-wave',
      label: 'Base Shield Per Wave',
      value: artifactStats.baseShieldPerWave.toFixed(1),
      visible: artifactStats.baseShieldPerWave > 0,
    },
    {
      key: 'shield-recharge-hit',
      label: 'Shield Conversion On Health Hit',
      value: `${(artifactStats.shieldRechargeOnHealthHitPercent * 100).toFixed(0)}%`,
      visible: artifactStats.shieldRechargeOnHealthHitPercent > 0,
    },
    {
      key: 'bounce-chance',
      label: 'Bounce Chance',
      value: `${artifactStats.bounceChancePercent.toFixed(0)}%`,
      visible: artifactStats.bounceChancePercent > 0,
    },
    {
      key: 'burst-size',
      label: 'Burst Size',
      value: artifactStats.burstSize.toFixed(2),
      visible: Math.abs(artifactStats.burstSize - 1) > 0.001,
    },
    {
      key: 'burn-dps',
      label: 'Burn DPS',
      value: artifactStats.burnDamagePerSecond.toFixed(1),
      visible: artifactStats.burnDamagePerSecond > 0,
    },
    {
      key: 'burn-duration',
      label: 'Burn Duration',
      value: `${artifactStats.burnDurationSeconds.toFixed(1)}s`,
      visible: artifactStats.burnDurationSeconds > 0,
    },
    {
      key: 'health-on-kill',
      label: 'Health On Kill',
      value: `+${(artifactStats.healthOnKill * 100).toFixed(0)}%`,
      visible: artifactStats.healthOnKill > 0,
    },
    {
      key: 'shield-on-kill',
      label: 'Shield On Kill',
      value: `+${(artifactStats.shieldOnKill * 100).toFixed(0)}%`,
      visible: artifactStats.shieldOnKill > 0,
    },
    {
      key: 'damage-on-kill',
      label: 'Damage On Kill',
      value: `+${artifactStats.damageOnKill.toFixed(1)}`,
      visible: artifactStats.damageOnKill > 0,
    },
    {
      key: 'additional-kill-credits',
      label: 'Additional Kill Credits',
      value: `+${artifactStats.additionalKillCredits.toFixed(0)}`,
      visible: artifactStats.additionalKillCredits > 0,
    },
    {
      key: 'gold-gain-multiplier',
      label: 'Gold Gain Multiplier',
      value: `${artifactStats.goldGainMultiplier.toFixed(2)}x`,
      visible: Math.abs(artifactStats.goldGainMultiplier - 1) > 0.001,
    },
    {
      key: 'quiz-bonus-health-percent',
      label: 'Quiz Heal Bonus',
      value: `+${(artifactStats.quizBonusHealthPercent * 100).toFixed(0)}%`,
      visible: artifactStats.quizBonusHealthPercent > 0,
    },
    {
      key: 'quiz-bonus-fire-rate-duration',
      label: 'Quiz Freeze Bonus',
      value: `+${artifactStats.quizFreezeDurationSeconds.toFixed(0)}s`,
      visible: artifactStats.quizFreezeDurationSeconds > 0,
    },
  ].filter((row) => row.visible)

  const artifactStateRows = artifactStatRows.length === 0
    ? [{ key: 'artifact-none', label: 'Artifacts', value: 'None active' }]
    : artifactStatRows

  return (
    <section className="player-state-overlay" aria-label="Player state">
      <h2>Player State</h2>

      <div className="player-state-row">
        <span>Health</span>
        <strong>{Math.round(currentHealth)}/{Math.round(maxHealth)}</strong>
      </div>
      <div className="player-health-bar" role="presentation">
        <span style={{ width: `${safeHealthRatio * 100}%` }} />
      </div>

      <div className="player-state-row">
        <span>Fire Rate</span>
        <strong>{fireRatePerSecond.toFixed(2)} /s</strong>
      </div>

      <div className="player-state-artifacts-compact">
        {artifactStateRows.map((row) => (
          <div key={row.key} className="player-state-artifact-row-compact">
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>

      <div className="player-state-row">
        <span>Shields</span>
        <strong>{Math.round(currentShield)}/{Math.round(maxShield)}</strong>
      </div>

      <div className="player-state-row">
        <span>Gold</span>
        <div
          className="player-state-gold-cell"
          tabIndex={0}
          onMouseEnter={() => setGoldMultiplierPopoverOpen(true)}
          onMouseLeave={() => setGoldMultiplierPopoverOpen(false)}
          onFocus={() => setGoldMultiplierPopoverOpen(true)}
          onBlur={() => setGoldMultiplierPopoverOpen(false)}
          aria-label={`Gold ${Math.floor(gold)}g. Hover for gold multiplier breakdown.`}
        >
          <strong>{Math.floor(gold)}g</strong>
          {goldMultiplierPopoverOpen ? (
            <div className="player-state-gold-popover" role="tooltip" aria-live="polite">
              <span>
                Question answers: <strong>{questionAnswerGoldMultiplier.toFixed(2)}x</strong>
              </span>
              <span>
                Enemy kills: <strong>{enemyKillGoldMultiplier.toFixed(2)}x</strong>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="player-state-row">
        <span>Projectile Damage</span>
        <strong>{projectileDamage.toFixed(1)}</strong>
      </div>

      <div className="player-state-effects">
        <h3>Active Consumables</h3>
        {activeConsumables.length === 0 ? (
          <p>None active</p>
        ) : (
          <ul>
            {activeConsumables.map((effect) => (
              <li key={effect.id}>
                <span>{effect.name}</span>
                <strong>{effect.remainingSeconds.toFixed(1)}s</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

    </section>
  )
}
