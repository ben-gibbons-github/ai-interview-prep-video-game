import { useCallback, useEffect, useMemo, type MutableRefObject } from 'react'
import type { Player } from '../Player/Player'
import type { WaveManager, RewardPrompt } from '../WaveManager'
import { ArtifactSvgIcon, getArtifactVisualStyle } from './ArtifactIconBar'

export const DEFAULT_SHOP_VISIBLE_ITEM_COUNT = 4
export const REROLLED_SHOP_VISIBLE_ITEM_COUNT = 8

function getDynamicRewardCost(optionId: string, baseCost: number, player: Player) {
  void optionId
  void player
  return baseCost
}

function filterAvailableRewardOptions(
  rewardPrompt: RewardPrompt | null,
  purchasedArtifactIds: string[],
): RewardPrompt['options'] {
  if (!rewardPrompt) {
    return []
  }

  const purchasedArtifactIdSet = new Set(purchasedArtifactIds)
  return rewardPrompt.options.filter((option) => {
    if (option.kind !== 'artifact') {
      return true
    }

    if (!option.artifactId) {
      return true
    }

    return !purchasedArtifactIdSet.has(option.artifactId)
  })
}

export function reconcileDisplayedRewardIds(
  availableRewardOptions: RewardPrompt['options'],
  displayedRewardIds: string[],
  visibleItemCount = DEFAULT_SHOP_VISIBLE_ITEM_COUNT,
): string[] {
  const availableIds = availableRewardOptions.map((option) => option.id)
  const availableIdSet = new Set(availableIds)
  const retained = displayedRewardIds.filter((id) => availableIdSet.has(id))
  const next = [...retained]
  const candidates = availableIds.filter((id) => !next.includes(id))

  while (next.length < visibleItemCount && candidates.length > 0) {
    const nextCandidate = candidates.shift()
    if (!nextCandidate) {
      break
    }

    next.push(nextCandidate)
  }

  if (next.length > visibleItemCount) {
    next.length = visibleItemCount
  }

  return next
}

export interface ShopPlayerState {
  gold: number
  activeConsumables: Array<{
    id: string
    name: string
    remainingSeconds: number
  }>
  artifactStats: {
    permanentAttackSpeedMultiplier: number
    permanentAttackDamageBonus: number
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
      freezeBombSecondsPerCorrect: number
      fireBombDamagePerSecond: number
      deflectionShieldChancePercent: number
      rawCodingGoldMultiplier: number
      miniFleetAlliesPerCorrect: number
      bigBossSummonChancePerCorrect: number
  }
}

export interface ShopBonusRow {
  label: string
  value: string
}

interface UseShopControllerParams {
  playerRef: MutableRefObject<Player | null>
  waveManagerRef: MutableRefObject<WaveManager | null>
  rewardPrompt: RewardPrompt | null
  rewardPromptActiveRef: MutableRefObject<boolean>
  setRewardPrompt: (rewardPrompt: RewardPrompt | null) => void
  visibleShopItemCount: number
  onVisibleShopItemCountChange: (count: number) => void
  displayedRewardIds: string[]
  onDisplayedRewardIdsChange: (rewardIds: string[]) => void
  playerState: ShopPlayerState
  postOverlay: (payload: {
    title: string
    message: string
    details?: string[]
    durationMs?: number
  }) => string
  syncPlayerState: (player: Player) => void
}

export function useShopController({
  playerRef,
  waveManagerRef,
  rewardPrompt,
  rewardPromptActiveRef,
  setRewardPrompt,
  visibleShopItemCount,
  onVisibleShopItemCountChange,
  displayedRewardIds,
  onDisplayedRewardIdsChange,
  playerState,
  postOverlay,
  syncPlayerState,
}: UseShopControllerParams) {
  const shopBonusRows = useMemo<ShopBonusRow[]>(
    () => [
      ...(playerState.activeConsumables
        .filter((effect) => effect.id !== 'attack-speed-boost')
        .map((effect) => ({
          label: effect.name,
          value: `${effect.remainingSeconds.toFixed(1)}s`,
        })) ?? []),
      ...(Math.abs(playerState.artifactStats.permanentAttackSpeedMultiplier - 1) > 0.001
        ? [{
            label: 'Permanent Attack Speed',
            value: `${playerState.artifactStats.permanentAttackSpeedMultiplier.toFixed(2)}x`,
          }]
        : []),
      ...(playerState.artifactStats.permanentAttackDamageBonus > 0
        ? [{
            label: 'Permanent Damage Bonus',
            value: `+${playerState.artifactStats.permanentAttackDamageBonus.toFixed(1)}`,
          }]
        : []),
      ...(playerState.artifactStats.bounceChancePercent > 0
        ? [{
            label: 'Bounce Chance',
            value: `${playerState.artifactStats.bounceChancePercent.toFixed(0)}%`,
          }]
        : []),
      ...(Math.abs(playerState.artifactStats.burstSize - 1) > 0.001
        ? [{
            label: 'Burst Size',
            value: playerState.artifactStats.burstSize.toFixed(2),
          }]
        : []),
      ...(playerState.artifactStats.burnDamagePerSecond > 0
        ? [{
            label: 'Burn DPS',
            value: playerState.artifactStats.burnDamagePerSecond.toFixed(1),
          }]
        : []),
      ...(playerState.artifactStats.burnDurationSeconds > 0
        ? [{
            label: 'Burn Duration',
            value: `${playerState.artifactStats.burnDurationSeconds.toFixed(1)}s`,
          }]
        : []),
      ...(playerState.artifactStats.healthOnKill > 0
        ? [{
            label: 'Health On Kill',
            value: `+${(playerState.artifactStats.healthOnKill * 100).toFixed(0)}%`,
          }]
        : []),
      ...(playerState.artifactStats.shieldOnKill > 0
        ? [{
            label: 'Shield On Kill',
            value: `+${(playerState.artifactStats.shieldOnKill * 100).toFixed(0)}%`,
          }]
        : []),
      ...(playerState.artifactStats.damageOnKill > 0
        ? [{
            label: 'Damage On Kill',
            value: `+${playerState.artifactStats.damageOnKill.toFixed(1)}`,
          }]
        : []),
      ...(playerState.artifactStats.additionalKillCredits > 0
        ? [{
            label: 'Additional Kill Credits',
            value: `+${playerState.artifactStats.additionalKillCredits.toFixed(0)}`,
          }]
        : []),
      ...(Math.abs(playerState.artifactStats.goldGainMultiplier - 1) > 0.001
        ? [{
            label: 'Gold Gain Multiplier',
            value: `${playerState.artifactStats.goldGainMultiplier.toFixed(2)}x`,
          }]
        : []),
      ...(playerState.artifactStats.quizBonusHealthPercent > 0
        ? [{
            label: 'Quiz Heal Bonus',
            value: `+${(playerState.artifactStats.quizBonusHealthPercent * 100).toFixed(0)}%`,
          }]
        : []),
      ...(playerState.artifactStats.quizFreezeDurationSeconds > 0
        ? [{
            label: 'Quiz Freeze Bonus',
            value: `+${playerState.artifactStats.quizFreezeDurationSeconds.toFixed(0)}s`,
          }]
        : []),
      ...(playerState.artifactStats.freezeBombSecondsPerCorrect > 0
        ? [{
            label: 'Freeze Ray',
            value: `+${playerState.artifactStats.freezeBombSecondsPerCorrect.toFixed(0)} freeze/correct`,
          }]
        : []),
      ...(playerState.artifactStats.fireBombDamagePerSecond > 0
        ? [{
            label: 'Question Nuke',
            value: `+${playerState.artifactStats.fireBombDamagePerSecond.toFixed(0)} nuke/correct`,
          }]
        : []),
      ...(playerState.artifactStats.deflectionShieldChancePercent > 0
        ? [{
            label: 'Deflection Chance',
            value: `${playerState.artifactStats.deflectionShieldChancePercent.toFixed(0)}%`,
          }]
        : []),
      ...(Math.abs(playerState.artifactStats.rawCodingGoldMultiplier - 1) > 0.001
        ? [{
            label: 'Raw Coding Gold',
            value: `${playerState.artifactStats.rawCodingGoldMultiplier.toFixed(2)}x`,
          }]
        : []),
      ...(playerState.artifactStats.miniFleetAlliesPerCorrect > 0
        ? [{
            label: 'Mini Fleet',
            value: `+${playerState.artifactStats.miniFleetAlliesPerCorrect.toFixed(0)} ally/correct`,
          }]
        : []),
      ...(playerState.artifactStats.bigBossSummonChancePerCorrect > 0
        ? [{
            label: 'Big Boss Chance',
            value: `${(playerState.artifactStats.bigBossSummonChancePerCorrect * 100).toFixed(0)}%`,
          }]
        : []),
    ],
    [playerState],
  )

  const getRewardCost = useCallback((option: RewardPrompt['options'][number]) => {
    const player = playerRef.current
    if (!player) {
      return option.cost
    }

    return getDynamicRewardCost(option.id, option.cost, player)
  }, [playerRef])

  const handleRewardSelection = useCallback(
    (rewardId: string) => {
      const player = playerRef.current
      const waveManager = waveManagerRef.current
      if (!player || !waveManager || !rewardPrompt) {
        return
      }

      const choice = rewardPrompt.options.find((option) => option.id === rewardId)
      if (!choice) {
        return
      }

      const resolvedCost = getDynamicRewardCost(choice.id, choice.cost, player)

      if (choice.kind === 'artifact' && choice.artifactId && player.getArtifactIds().includes(choice.artifactId)) {
        postOverlay({
          title: 'Already Purchased',
          message: `${choice.title} can only be bought once per run.`,
          durationMs: 1700,
        })
        syncPlayerState(player)
        return
      }

      if (!player.spendGold(resolvedCost)) {
        postOverlay({
          title: 'Not Enough Gold',
          message: `${choice.title} costs ${resolvedCost}g.`,
          durationMs: 1700,
        })
        syncPlayerState(player)
        return
      }

      const result = waveManager.applyRewardSelection(rewardId, player, resolvedCost)
      if (!result) {
        player.addGold(resolvedCost)
        syncPlayerState(player)
        return
      }

      syncPlayerState(player)

      const nextDisplayedRewardIds = reconcileDisplayedRewardIds(
        filterAvailableRewardOptions(rewardPrompt, player.getArtifactIds()),
        displayedRewardIds,
        visibleShopItemCount,
      )
      onDisplayedRewardIdsChange(nextDisplayedRewardIds)

      postOverlay({
        title: `${result.kind === 'artifact' ? 'Artifact' : 'Consumable'} Purchased`,
        message: `${result.itemName} acquired for ${result.cost}g.`,
        details: [
          `Gold remaining: ${Math.floor(player.getGold())}`,
          `Inventory consumables: ${result.inventoryCount}`,
          'Keep shopping or continue to next wave',
        ],
        durationMs: 2800,
      })
    },
    [
      displayedRewardIds,
      onDisplayedRewardIdsChange,
      playerRef,
      postOverlay,
      rewardPrompt,
      syncPlayerState,
      visibleShopItemCount,
      waveManagerRef,
    ],
  )

  const handleRefreshShop = useCallback(() => {
    const player = playerRef.current
    const waveManager = waveManagerRef.current
    if (!player || !waveManager || !rewardPrompt) {
      return
    }

    if (!player.spendSkip(1)) {
      postOverlay({
        title: 'Not Enough Skips',
        message: 'Shop refresh costs 1 skip.',
        durationMs: 1700,
      })
      syncPlayerState(player)
      return
    }

    const refreshedPrompt = waveManager.rerollRewardChoices(player)
    if (!refreshedPrompt) {
      player.addSkip(1)
      syncPlayerState(player)
      return
    }

    onVisibleShopItemCountChange(REROLLED_SHOP_VISIBLE_ITEM_COUNT)
    setRewardPrompt(refreshedPrompt)

    const nextDisplayedRewardIds = reconcileDisplayedRewardIds(
      filterAvailableRewardOptions(refreshedPrompt, player.getArtifactIds()),
      [],
      REROLLED_SHOP_VISIBLE_ITEM_COUNT,
    )
    onDisplayedRewardIdsChange(nextDisplayedRewardIds)
    syncPlayerState(player)

    postOverlay({
      title: 'Shop Refreshed',
      message: 'Spent 1 skip to reroll artifacts.',
      details: [`Skips remaining: ${player.getSkips().toFixed(0)}`],
      durationMs: 2200,
    })
  }, [
    onDisplayedRewardIdsChange,
    onVisibleShopItemCountChange,
    playerRef,
    postOverlay,
    rewardPrompt,
    setRewardPrompt,
    syncPlayerState,
    waveManagerRef,
  ])

  const handleFinishShopping = useCallback(() => {
    const waveManager = waveManagerRef.current
    if (!waveManager) {
      return
    }

    if (waveManager.completeRewardPhase()) {
      onVisibleShopItemCountChange(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
      rewardPromptActiveRef.current = false
      setRewardPrompt(null)
    }
  }, [onVisibleShopItemCountChange, waveManagerRef, rewardPromptActiveRef, setRewardPrompt])

  return {
    shopBonusRows,
    getRewardCost,
    handleRewardSelection,
    handleRefreshShop,
    handleFinishShopping,
  }
}

interface ShopOverlayProps {
  rewardPrompt: RewardPrompt | null
  currentGold: number
  currentSkips: number
  visibleShopItemCount: number
  purchasedArtifactIds: string[]
  displayedRewardIds: string[]
  onDisplayedRewardIdsChange: (rewardIds: string[]) => void
  getRewardCost: (option: RewardPrompt['options'][number]) => number
  onRewardSelection: (rewardId: string) => void
  onRefreshShop: () => void
  onFinishShopping: () => void
}

export function ShopOverlay({
  rewardPrompt,
  currentGold,
  currentSkips,
  visibleShopItemCount,
  purchasedArtifactIds,
  displayedRewardIds,
  onDisplayedRewardIdsChange,
  getRewardCost,
  onRewardSelection,
  onRefreshShop,
  onFinishShopping,
}: ShopOverlayProps) {
  const availableRewardOptions = useMemo(
    () => filterAvailableRewardOptions(rewardPrompt, purchasedArtifactIds),
    [purchasedArtifactIds, rewardPrompt],
  )

  const availableRewardIdsSignature = useMemo(
    () => availableRewardOptions.map((option) => option.id).join('|'),
    [availableRewardOptions],
  )

  useEffect(() => {
    const next = reconcileDisplayedRewardIds(availableRewardOptions, displayedRewardIds, visibleShopItemCount)

    const isUnchanged =
      displayedRewardIds.length === next.length && displayedRewardIds.every((id, index) => id === next[index])

    if (!isUnchanged) {
      onDisplayedRewardIdsChange(next)
    }
  }, [
    availableRewardIdsSignature,
    availableRewardOptions,
    displayedRewardIds,
    onDisplayedRewardIdsChange,
    visibleShopItemCount,
  ])

  const visibleRewardOptions = useMemo(() => {
    if (displayedRewardIds.length === 0) {
      return []
    }

    const optionsById = new Map(availableRewardOptions.map((option) => [option.id, option]))
    return displayedRewardIds
      .map((rewardId) => optionsById.get(rewardId))
      .filter((option): option is RewardPrompt['options'][number] => option !== undefined)
  }, [availableRewardOptions, displayedRewardIds])

  if (!rewardPrompt) {
    return null
  }

  return (
    <section className="reward-overlay" role="dialog" aria-label="Round rewards">
      <div className="reward-card">
        <h2>Round {rewardPrompt.wave} Rewards</h2>
        <p>Gold: {Math.floor(currentGold)}g · Skips: {Math.floor(currentSkips)}. Each artifact can only be bought once per run.</p>

        <div className="reward-grid">
          {visibleRewardOptions.map((option) => {
            const resolvedCost = getRewardCost(option)
            const iconArtifactId = option.artifactId ?? option.id

            return (
              <button
                key={option.id}
                type="button"
                className="reward-choice"
                disabled={currentGold < resolvedCost}
                onClick={() => onRewardSelection(option.id)}
              >
                <div className="reward-choice-header">
                  <span
                    className="artifact-icon-item reward-choice-artifact-icon"
                    aria-hidden="true"
                    style={getArtifactVisualStyle(iconArtifactId)}
                  >
                    <ArtifactSvgIcon artifactId={iconArtifactId} />
                  </span>
                  <div className="reward-choice-copy">
                    <span className="reward-kind">{option.kind === 'artifact' ? 'Artifact' : 'Consumable'}</span>
                    <strong>{option.title}</strong>
                  </div>
                </div>
                <small>{option.description}</small>
                <small className="reward-cost">Cost: {resolvedCost}g</small>
              </button>
            )
          })}
          {visibleRewardOptions.length === 0 ? (
            <p>No artifacts remaining to purchase this round.</p>
          ) : null}
        </div>

        <div className="reward-actions">
          <button
            type="button"
            className="reward-reroll"
            onClick={onRefreshShop}
            disabled={currentSkips < 1 || availableRewardOptions.length === 0}
          >
            Refresh Artifacts (-1 Skip)
          </button>
          <button type="button" className="reward-continue" onClick={onFinishShopping}>
            Continue To Next Wave
          </button>
        </div>
      </div>
    </section>
  )
}