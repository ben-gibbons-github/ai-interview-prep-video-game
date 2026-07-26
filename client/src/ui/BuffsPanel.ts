import * as React from 'react'
import {
  createInitialPlayerStateSnapshot,
  type PlayerStateSnapshot as BuffsPanelStateSnapshot,
} from '../Player/PlayerState'

const INITIAL_STATE: BuffsPanelStateSnapshot = createInitialPlayerStateSnapshot()
const BASE_MAX_HEALTH = 100
const BASE_MAX_SHIELD = 50
const BASE_PROJECTILE_DAMAGE = 20
const BASE_FIRE_RATE_PER_SECOND = 1 / ((1.35 / 0.5) / 5)

function toRowModifierClass(rowKey: string): string {
  return rowKey
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
}

function createRow(label: string, value: string, key: string) {
  return React.createElement(
    'div',
    { className: `buffs-row buffs-row-${toRowModifierClass(key)}`, key },
    React.createElement(
      'span',
      { className: 'buffs-row-label', key: `${key}-label` },
      React.createElement(
        'span',
        { className: 'buffs-row-icon', 'aria-hidden': 'true', key: `${key}-icon` },
        getRowIcon(key),
      ),
      React.createElement('span', { className: 'buffs-row-label-text', key: `${key}-label-text` }, label),
    ),
    React.createElement('strong', { key: `${key}-value` }, value),
  )
}

function createIcon(path: React.ReactNode, viewBox = '0 0 24 24') {
  return React.createElement(
    'svg',
    {
      className: 'buffs-row-icon-svg',
      viewBox,
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    path,
  )
}

function getRowIcon(rowKey: string): React.ReactNode {
  switch (rowKey) {
    case 'gold':
      return createIcon(
        React.createElement(React.Fragment, null,
          React.createElement('circle', { cx: 12, cy: 12, r: 7.5 }),
          React.createElement('path', { d: 'M12 8v8M9.2 10.1c.8-1 2.9-1.6 4.5-.8 1.6.8 1.2 2.6-.6 3.1-1.7.5-3 .9-3 2.2 0 1.2 1.5 2.2 3.4 2.2 1.2 0 2.2-.3 3-.9' }),
        ),
      )
    case 'health':
    case 'round-buff-health':
      return createIcon(
        React.createElement('path', { d: 'M12 5v14M5 12h14' }),
      )
    case 'shields':
    case 'round-buff-shield':
      return createIcon(
        React.createElement('path', { d: 'M12 3l7 3v6c0 4.1-2.5 7.4-7 9-4.5-1.6-7-4.9-7-9V6l7-3z' }),
      )
    case 'bullet-damage':
    case 'round-buff-damage':
      return createIcon(
        React.createElement(React.Fragment, null,
          React.createElement('path', { d: 'M7 17l6-10 1.6 4H18l-6 10-1.6-4H7z' }),
        ),
      )
    case 'rate-of-fire':
    case 'round-buff-fireRate':
      return createIcon(
        React.createElement(React.Fragment, null,
          React.createElement('path', { d: 'M5 8h9' }),
          React.createElement('path', { d: 'M10 5l4 3-4 3' }),
          React.createElement('path', { d: 'M5 16h12' }),
          React.createElement('path', { d: 'M14 13l4 3-4 3' }),
        ),
      )
    default:
      return createIcon(
        React.createElement(React.Fragment, null,
          React.createElement('circle', { cx: 12, cy: 12, r: 7 }),
          React.createElement('path', { d: 'M12 8v8M8 12h8' }),
        ),
      )
  }
}

function createSectionDivider(label: string, key: string) {
  return React.createElement(
    'div',
    { className: 'buffs-section-divider', key, 'aria-hidden': 'true' },
    React.createElement('span', { key: `${key}-label` }, label),
  )
}

function createStatPopoverSection(
  title: string,
  rows: Array<{ label: string; value: string }>,
  key: string,
) {
  return React.createElement(
    'div',
    { className: 'buffs-stat-popover-section', key },
    React.createElement('span', { className: 'buffs-stat-popover-heading', key: `${key}-heading` }, title),
    ...rows.map((row, index) =>
      React.createElement(
        'div',
        { className: 'buffs-stat-popover-row', key: `${key}-row-${index}` },
        React.createElement('span', { key: `${key}-row-${index}-label` }, row.label),
        React.createElement('strong', { key: `${key}-row-${index}-value` }, row.value),
      ),
    ),
  )
}

function createTooltipRow(label: string, value: string, key: string, sections: React.ReactNode[]) {
  return React.createElement(
    'div',
    {
      className: `buffs-row buffs-row-${toRowModifierClass(key)} buffs-row-tooltip`,
      key,
      tabIndex: 0,
    },
    React.createElement(
      'span',
      { className: 'buffs-row-label', key: `${key}-label` },
      React.createElement(
        'span',
        { className: 'buffs-row-icon', 'aria-hidden': 'true', key: `${key}-icon` },
        getRowIcon(key),
      ),
      React.createElement('span', { className: 'buffs-row-label-text', key: `${key}-label-text` }, label),
    ),
    React.createElement('strong', { key: `${key}-value` }, value),
    React.createElement(
      'div',
      { className: 'buffs-stat-popover', role: 'tooltip', key: `${key}-popover` },
      ...sections,
    ),
  )
}

function createHealthRow(playerState: BuffsPanelStateSnapshot) {
  const maxHealthBonus = playerState.maxHealth - BASE_MAX_HEALTH
  const healthReductionPercent = Math.min(90, playerState.roundBuffStacks.health * 20)

  return createTooltipRow(
    'Health',
    `${Math.round(playerState.currentHealth)} / ${Math.round(playerState.maxHealth)}`,
    'health',
    [
      createStatPopoverSection(
        'Health Totals',
        [
          { label: 'Current', value: `${Math.round(playerState.currentHealth)}` },
          { label: 'Max', value: `${Math.round(playerState.maxHealth)}` },
          { label: 'Base Max', value: `${BASE_MAX_HEALTH}` },
          { label: 'Bonus Max', value: `${maxHealthBonus >= 0 ? '+' : ''}${Math.round(maxHealthBonus)}` },
        ],
        'health-totals',
      ),
      createStatPopoverSection(
        'Sources',
        [
          {
            label: 'Artifacts and rewards',
            value: `${maxHealthBonus >= 0 ? '+' : ''}${Math.round(maxHealthBonus)} max`,
          },
          {
            label: 'Round health buff',
            value: `${playerState.roundBuffStacks.health} stacks (${healthReductionPercent.toFixed(0)}% dmg reduction)`,
          },
          {
            label: 'Future max-health gains',
            value: `${playerState.maxHealthGainMultiplier.toFixed(2)}x`,
          },
        ],
        'health-sources',
      ),
    ],
  )
}

function createShieldsRow(playerState: BuffsPanelStateSnapshot) {
  const maxShieldBonus = playerState.maxShield - BASE_MAX_SHIELD
  const shieldReductionPercent = Math.min(90, playerState.roundBuffStacks.shield * 20)

  return createTooltipRow(
    'Shields',
    `${Math.round(playerState.currentShield)} / ${Math.round(playerState.maxShield)}`,
    'shields',
    [
      createStatPopoverSection(
        'Shield Totals',
        [
          { label: 'Current', value: `${Math.round(playerState.currentShield)}` },
          { label: 'Max', value: `${Math.round(playerState.maxShield)}` },
          { label: 'Base Max', value: `${BASE_MAX_SHIELD}` },
          { label: 'Bonus Max', value: `${maxShieldBonus >= 0 ? '+' : ''}${Math.round(maxShieldBonus)}` },
        ],
        'shield-totals',
      ),
      createStatPopoverSection(
        'Sources',
        [
          {
            label: 'Artifacts and rewards',
            value: `${maxShieldBonus >= 0 ? '+' : ''}${Math.round(maxShieldBonus)} max`,
          },
          {
            label: 'Round shield buff',
            value: `${playerState.roundBuffStacks.shield} stacks (${shieldReductionPercent.toFixed(0)}% dmg reduction)`,
          },
          {
            label: 'Future max-shield gains',
            value: `${playerState.maxShieldGainMultiplier.toFixed(2)}x`,
          },
        ],
        'shield-sources',
      ),
    ],
  )
}

function createBulletDamageRow(playerState: BuffsPanelStateSnapshot) {
  const artifactBonusDamage = playerState.artifactStats.permanentAttackDamageBonus
  const roundDamageMultiplier = 1 + playerState.roundBuffStacks.damage * 0.2
  const expectedDamageFromKnownSources = (BASE_PROJECTILE_DAMAGE + artifactBonusDamage) * roundDamageMultiplier
  const miscMultiplier = expectedDamageFromKnownSources > 0
    ? playerState.projectileDamage / expectedDamageFromKnownSources
    : 1
  const hasMiscSource = Math.abs(miscMultiplier - 1) > 0.01

  return createTooltipRow(
    'Bullet Damage',
    playerState.projectileDamage.toFixed(1),
    'bullet-damage',
    [
      createStatPopoverSection(
        'Damage Formula',
        [
          { label: 'Final', value: `${playerState.projectileDamage.toFixed(1)}` },
          { label: 'Base damage', value: `${BASE_PROJECTILE_DAMAGE.toFixed(1)}` },
          { label: 'Artifact flat bonus', value: `+${artifactBonusDamage.toFixed(1)}` },
          { label: 'Round damage buff', value: `${roundDamageMultiplier.toFixed(2)}x (${playerState.roundBuffStacks.damage} stacks)` },
        ],
        'damage-formula',
      ),
      createStatPopoverSection(
        'Sources',
        [
          { label: 'Permanent artifacts', value: `+${artifactBonusDamage.toFixed(1)} damage` },
          { label: 'Round buffs', value: `${playerState.roundBuffStacks.damage * 20}% bonus damage` },
          ...(hasMiscSource
            ? [{ label: 'Other modifiers', value: `${miscMultiplier.toFixed(2)}x` }]
            : []),
        ],
        'damage-sources',
      ),
    ],
  )
}

function createRateOfFireRow(playerState: BuffsPanelStateSnapshot) {
  const permanentRateMultiplier = 1 / Math.max(0.05, playerState.artifactStats.permanentAttackSpeedMultiplier)
  const roundRateMultiplier = 1 + playerState.roundBuffStacks.fireRate * 0.2
  const expectedRateFromKnownSources = BASE_FIRE_RATE_PER_SECOND * permanentRateMultiplier * roundRateMultiplier
  const miscMultiplier = expectedRateFromKnownSources > 0
    ? playerState.fireRatePerSecond / expectedRateFromKnownSources
    : 1
  const hasMiscSource = Math.abs(miscMultiplier - 1) > 0.01
  const permanentRateBonusPercent = Math.max(0, (permanentRateMultiplier - 1) * 100)

  return createTooltipRow(
    'Rate Of Fire',
    `${playerState.fireRatePerSecond.toFixed(2)} /s`,
    'rate-of-fire',
    [
      createStatPopoverSection(
        'Rate Formula',
        [
          { label: 'Final', value: `${playerState.fireRatePerSecond.toFixed(2)} /s` },
          { label: 'Base rate', value: `${BASE_FIRE_RATE_PER_SECOND.toFixed(2)} /s` },
          { label: 'Artifact rate bonus', value: `${permanentRateMultiplier.toFixed(2)}x (+${permanentRateBonusPercent.toFixed(0)}%)` },
          { label: 'Round fire-rate buff', value: `${roundRateMultiplier.toFixed(2)}x (${playerState.roundBuffStacks.fireRate} stacks)` },
        ],
        'rof-formula',
      ),
      createStatPopoverSection(
        'Sources',
        [
          { label: 'Permanent artifacts', value: `${permanentRateMultiplier.toFixed(2)}x rate` },
          { label: 'Round buffs', value: `${playerState.roundBuffStacks.fireRate * 20}% faster fire rate` },
          ...(hasMiscSource
            ? [{ label: 'Other modifiers', value: `${miscMultiplier.toFixed(2)}x` }]
            : []),
        ],
        'rof-sources',
      ),
    ],
  )
}

function createGoldRow(playerState: BuffsPanelStateSnapshot) {
  const orderedContributors = [...playerState.goldMultiplierContributors].sort((left, right) => {
    const kindOrder = { both: 0, question: 1, enemyKill: 2 }
    const byKind = kindOrder[left.kind] - kindOrder[right.kind]
    if (byKind !== 0) {
      return byKind
    }

    return left.artifactName.localeCompare(right.artifactName)
  })

  const groupedContributors = [
    {
      key: 'both',
      label: 'Both Rewards',
      contributors: orderedContributors.filter((contributor) => contributor.kind === 'both'),
    },
    {
      key: 'question',
      label: 'Question Rewards',
      contributors: orderedContributors.filter((contributor) => contributor.kind === 'question'),
    },
    {
      key: 'enemyKill',
      label: 'Enemy Kill Rewards',
      contributors: orderedContributors.filter((contributor) => contributor.kind === 'enemyKill'),
    },
  ].filter((group) => group.contributors.length > 0)

  const contributorGroupElements = groupedContributors.map((group) => {
    const contributorRows = group.contributors.map((contributor) => {
      const multiplierDetails =
        contributor.kind === 'both'
          ? `Q ${contributor.questionMultiplier.toFixed(2)}x · K ${contributor.enemyKillMultiplier.toFixed(2)}x`
          : contributor.kind === 'question'
            ? `Q ${contributor.questionMultiplier.toFixed(2)}x`
            : `K ${contributor.enemyKillMultiplier.toFixed(2)}x`

      const metadataParts: string[] = []
      if (contributor.appliesTo) {
        metadataParts.push(contributor.appliesTo)
      }
      if (contributor.stacks > 1) {
        metadataParts.push(`Stacks ${contributor.stacks}`)
      }

      return React.createElement(
        'div',
        {
          className: 'buffs-gold-contributor-row',
          key: `gold-contributor-${group.key}-${contributor.artifactId}-${contributor.stacks}`,
        },
        React.createElement(
          'div',
          { className: 'buffs-gold-contributor-main', key: `gold-contributor-main-${contributor.artifactId}` },
          React.createElement(
            'span',
            { className: 'buffs-gold-contributor-name', key: `gold-contributor-name-${contributor.artifactId}` },
            contributor.artifactName,
          ),
          React.createElement(
            'span',
            { className: 'buffs-gold-contributor-value', key: `gold-contributor-value-${contributor.artifactId}` },
            multiplierDetails,
          ),
        ),
        metadataParts.length > 0
          ? React.createElement(
            'div',
            { className: 'buffs-gold-contributor-meta', key: `gold-contributor-meta-${contributor.artifactId}` },
            metadataParts.join(' · '),
          )
          : null,
      )
    })

    return React.createElement(
      'div',
      { className: 'buffs-gold-contributor-group', key: `gold-group-${group.key}` },
      React.createElement('span', { className: 'buffs-gold-contributor-group-title', key: `gold-group-title-${group.key}` }, group.label),
      React.createElement('div', { className: 'buffs-gold-contributor-list', key: `gold-group-list-${group.key}` }, ...contributorRows),
    )
  })

  return React.createElement(
    'div',
    {
      className: 'buffs-row buffs-row-gold buffs-row-gold-tooltip',
      key: 'gold',
      tabIndex: 0,
      'aria-label': `Gold ${Math.floor(playerState.gold)}. Question-answer gold multiplier ${playerState.questionAnswerGoldMultiplier.toFixed(2)}x. Enemy-kill gold multiplier ${playerState.enemyKillGoldMultiplier.toFixed(2)}x.`,
    },
    React.createElement(
      'span',
      { className: 'buffs-row-label', key: 'gold-label' },
      React.createElement(
        'span',
        { className: 'buffs-row-icon', 'aria-hidden': 'true', key: 'gold-icon' },
        getRowIcon('gold'),
      ),
      React.createElement('span', { className: 'buffs-row-label-text', key: 'gold-label-text' }, 'Gold'),
    ),
    React.createElement('strong', { key: 'gold-value' }, `${Math.floor(playerState.gold)}g`),
    React.createElement(
      'div',
      { className: 'buffs-gold-popover', role: 'tooltip', key: 'gold-popover' },
      React.createElement(
        'div',
        { className: 'buffs-gold-popover-section', key: 'gold-popover-totals' },
        React.createElement('span', { className: 'buffs-gold-popover-heading', key: 'gold-popover-totals-title' }, 'Totals'),
        React.createElement(
          'div',
          { className: 'buffs-gold-total-row', key: 'gold-popover-question-row' },
          React.createElement('span', { key: 'gold-popover-question-label' }, 'Question answers'),
          React.createElement('strong', { key: 'gold-popover-question-value' }, `${playerState.questionAnswerGoldMultiplier.toFixed(2)}x`),
        ),
        React.createElement(
          'div',
          { className: 'buffs-gold-total-row', key: 'gold-popover-kill-row' },
          React.createElement('span', { key: 'gold-popover-kill-label' }, 'Enemy kills'),
          React.createElement('strong', { key: 'gold-popover-kill-value' }, `${playerState.enemyKillGoldMultiplier.toFixed(2)}x`),
        ),
      ),
      React.createElement(
        'div',
        { className: 'buffs-gold-popover-section', key: 'gold-popover-contributors' },
        React.createElement('span', { className: 'buffs-gold-popover-heading', key: 'gold-popover-contributors-title' }, 'Contributors'),
        groupedContributors.length > 0
          ? React.createElement('div', { className: 'buffs-gold-contributor-groups', key: 'gold-popover-contributor-groups' }, ...contributorGroupElements)
          : React.createElement('span', { className: 'buffs-gold-contributor-empty', key: 'gold-popover-empty' }, 'No active gold bonus sources.'),
      ),
    ),
  )
}

const ROUND_BUFF_ROWS: Array<{ key: keyof BuffsPanelStateSnapshot['roundBuffStacks']; label: string }> = [
  { key: 'damage', label: 'Damage Buff' },
  { key: 'fireRate', label: 'Rate Of Fire Buff' },
  { key: 'health', label: 'Health Damage Reduction' },
  { key: 'shield', label: 'Shield Damage Reduction' },
]

export class BuffsPanel {
  private playerState: BuffsPanelStateSnapshot = INITIAL_STATE

  setPlayerState(playerState: BuffsPanelStateSnapshot) {
    this.playerState = playerState
  }

  setCurrentStreak(currentStreak: number) {
    this.playerState = {
      ...this.playerState,
      quizCurrentStreak: currentStreak,
    }
  }

  reset() {
    this.playerState = INITIAL_STATE
  }

  render(playerStateOverride?: BuffsPanelStateSnapshot) {
    const playerState = playerStateOverride ?? this.playerState
    const activeRoundBuffRows = ROUND_BUFF_ROWS
      .map((buffRow) => {
        const stacks = playerState.roundBuffStacks[buffRow.key]
        if (stacks <= 0) {
          return null
        }

        return createRow(buffRow.label, `x${stacks}`, `round-buff-${buffRow.key}`)
      })
      .filter(Boolean)

    return React.createElement(
      'aside',
      { className: 'buffs-pane', 'aria-label': 'Player stats' },
      React.createElement('h2', { key: 'title' }, 'Stats'),
      createGoldRow(playerState),
      createHealthRow(playerState),
      createShieldsRow(playerState),
      createBulletDamageRow(playerState),
      createRateOfFireRow(playerState),
      ...(activeRoundBuffRows.length > 0
        ? [createSectionDivider('Buffs', 'buffs-divider')]
        : []),
      ...activeRoundBuffRows,
    )
  }
}