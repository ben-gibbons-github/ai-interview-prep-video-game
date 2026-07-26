import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GameObject } from '../GameObject'
import { Actor } from '../gameObjects/Actor'
import { Enemy } from '../gameObjects/Enemy'
import { EnemyWaveSpawner } from '../gameObjects/EnemyWaveSpawner'
import { Player } from '../Player/Player'
import {
  createInitialPlayerStateSnapshot,
  type PlayerStateSnapshot,
} from '../Player/PlayerState'
import { OverlayStack, useOverlaySystem } from './OverlaySystem'
import { BuffsPanel } from './BuffsPanel'
import { WaveManager, type RewardPrompt } from '../WaveManager'
import {
  getCorrectQuizExplanation,
  getIncorrectQuizExplanation,
  getNextQuizQuestion,
  type QuizCorrectExplanation,
  type QuizIncorrectExplanation,
  type QuizQuestion,
} from '../quiz/QuizQuestionManager'
import quizRampSettings from '../quiz/quizRampSettings'
import { QuizPanelQuestionsView } from './QuizPanelQuestions'
import { DEFAULT_SHOP_VISIBLE_ITEM_COUNT, ShopOverlay, useShopController } from './Shop'
import '../App.css'

const GLOBAL_INCOMING_DAMAGE_MULTIPLIER = 0.7
const STANDARD_QUESTION_FREEZE_SECONDS = 20
const LiveCode_QUESTION_FREEZE_SECONDS = 120

function getQuestionFreezeSeconds(question: QuizQuestion | null) {
  if (!question) {
    return 0
  }

  return question.id.includes('complete-code-LiveCode')
    ? LiveCode_QUESTION_FREEZE_SECONDS
    : STANDARD_QUESTION_FREEZE_SECONDS
}

function isValidListQuestion(question: QuizQuestion | null): boolean {
  return question?.kind === 'validList' && question.validList !== undefined
}

function randomizeValidListQuestion(question: QuizQuestion): QuizQuestion {
  if (!isValidListQuestion(question) || !question.validList) {
    return question
  }

  const { items, validIndices } = question.validList

  // Create array of [originalIndex, item] pairs
  const indexed = items.map((item, index) => ({ originalIndex: index, item }))

  // Shuffle using Fisher-Yates algorithm
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]]
  }

  // Extract shuffled items and create index mapping
  const shuffledItems = indexed.map((entry) => entry.item)
  const oldToNewIndexMap = new Map<number, number>()
  indexed.forEach((entry, newIndex) => {
    oldToNewIndexMap.set(entry.originalIndex, newIndex)
  })

  // Map validIndices to new positions
  const shuffledValidIndices = validIndices
    .map((oldIndex) => oldToNewIndexMap.get(oldIndex))
    .filter((index): index is number => index !== undefined)

  return {
    ...question,
    validList: {
      ...question.validList,
      items: shuffledItems,
      validIndices: shuffledValidIndices,
    },
  }
}

function QuizManager() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<Player | null>(null)
  const waveManagerRef = useRef<WaveManager | null>(null)
  const playerStateSignatureRef = useRef('')
  const quizCombatSignatureRef = useRef(false)
  const askedQuizQuestionIdsRef = useRef<Set<string>>(new Set())
  const quizPauseCombatRef = useRef(false)
  const quizFreezeRemainingRef = useRef(0)
  const quizCorrectStreakRef = useRef(0)
  const quizCorrectAnswersRef = useRef(0)
  const quizFreezeFadeTimeoutRef = useRef<number | null>(null)
  const rewardPromptActiveRef = useRef(false)
  const buffsPanelRef = useRef(new BuffsPanel())
  const [rewardPrompt, setRewardPrompt] = useState<RewardPrompt | null>(null)
  const [shopVisibleItemCount, setShopVisibleItemCount] = useState(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
  const [shopDisplayedRewardIds, setShopDisplayedRewardIds] = useState<string[]>([])
  const [quizActive, setQuizActive] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)
  const [quizAnswerResult, setQuizAnswerResult] = useState<'correct' | 'incorrect' | null>(null)
  const [quizCorrectExplanation, setQuizCorrectExplanation] = useState<QuizCorrectExplanation | null>(null)
  const [quizIncorrectExplanation, setQuizIncorrectExplanation] = useState<QuizIncorrectExplanation | null>(null)
  const [quizFreezeActive, setQuizFreezeActive] = useState(false)
  const [quizFreezeFading, setQuizFreezeFading] = useState(false)
  const [quizFreezeSecondsLeft, setQuizFreezeSecondsLeft] = useState(0)
  const [quizCorrectAnswers, setQuizCorrectAnswers] = useState(0)
  const [quizTotalAnswered, setQuizTotalAnswered] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [playerState, setPlayerState] = useState<PlayerStateSnapshot>(createInitialPlayerStateSnapshot())
  const { overlays, postOverlay, dismissOverlay } = useOverlaySystem()

  useEffect(() => {
    quizCorrectAnswersRef.current = quizCorrectAnswers
  }, [quizCorrectAnswers])

  const syncPlayerState = useCallback((player: Player) => {
    const snapshot = player.getStateSnapshot()
    const currentHealth = player.getCurrentHealth()
    const maxHealth = player.getMaxHealthValue()
    const currentShield = player.getCurrentShield()
    const maxShield = player.getMaxShield()
    const lives = player.getLives()
    const skips = player.getSkips()
    const gold = player.getGold()
    const fireRatePerSecond = player.getFireRatePerSecond()
    const projectileDamage = player.getAttackDamage()
    const artifactStats = player.getArtifactStats()
    const activeConsumables = player.getActiveConsumableEffects()
    const roundBuffStacks = snapshot.roundBuffStacks
    const effectsSignature = activeConsumables
      .map((effect) => `${effect.id}:${effect.remainingSeconds.toFixed(1)}`)
      .join('|')
    const roundBuffSignature = [
      roundBuffStacks.damage.toFixed(0),
      roundBuffStacks.fireRate.toFixed(0),
      roundBuffStacks.health.toFixed(0),
      roundBuffStacks.shield.toFixed(0),
    ].join(':')

    const signature = [
      currentHealth.toFixed(1),
      maxHealth.toFixed(1),
      currentShield.toFixed(1),
      maxShield.toFixed(1),
      lives.toFixed(0),
      skips.toFixed(0),
      gold.toFixed(0),
      snapshot.enemyKills.toFixed(0),
      snapshot.quizScoreBonus.toFixed(0),
      fireRatePerSecond.toFixed(2),
      projectileDamage.toFixed(1),
      artifactStats.permanentAttackSpeedMultiplier.toFixed(3),
      artifactStats.permanentAttackDamageBonus.toFixed(2),
      artifactStats.baseShieldPerWave.toFixed(1),
      artifactStats.shieldRechargeOnHealthHitPercent.toFixed(3),
      artifactStats.bounceChancePercent.toFixed(1),
      artifactStats.burstSize.toFixed(2),
      artifactStats.burnDamagePerSecond.toFixed(2),
      artifactStats.burnDurationSeconds.toFixed(2),
      artifactStats.healthOnKill.toFixed(2),
      artifactStats.shieldOnKill.toFixed(2),
      artifactStats.damageOnKill.toFixed(2),
      artifactStats.additionalKillCredits.toFixed(2),
      artifactStats.goldGainMultiplier.toFixed(3),
      artifactStats.quizBonusHealthPercent.toFixed(3),
      artifactStats.quizFreezeDurationSeconds.toFixed(1),
      artifactStats.freezeBombSecondsPerCorrect.toFixed(1),
      artifactStats.fireBombDamagePerSecond.toFixed(2),
      artifactStats.deflectionShieldChancePercent.toFixed(1),
      artifactStats.rawCodingGoldMultiplier.toFixed(2),
      artifactStats.miniFleetAlliesPerCorrect.toFixed(0),
      artifactStats.bigBossSummonChancePerCorrect.toFixed(3),
      roundBuffSignature,
      effectsSignature,
    ].join('|')

    if (signature === playerStateSignatureRef.current) {
      return
    }

    playerStateSignatureRef.current = signature
    const nextPlayerState: PlayerStateSnapshot = {
      currentHealth,
      maxHealth,
      currentShield,
      maxShield,
      lives,
      skips,
      gold,
      enemyKills: snapshot.enemyKills,
      quizScoreBonus: snapshot.quizScoreBonus,
      quizCurrentStreak: quizCorrectStreakRef.current,
      fireRatePerSecond,
      projectileDamage,
      activeConsumables,
      roundBuffStacks,
      artifactStats,
      artifactIds: player.getArtifactIds(),
      targetEnemyId: snapshot.targetEnemyId,
      queuedQuestionNukes: snapshot.queuedQuestionNukes,
      queuedFreezeRays: snapshot.queuedFreezeRays,
      questionAnswerHealingMultiplier: player.getQuestionAnswerHealingMultiplier(),
      questionAnswerGoldMultiplier: player.getGlobalGoldMultiplierForQuestionAnswer(),
      enemyKillGoldMultiplier: player.getGlobalGoldMultiplierForEnemyKill(),
      goldMultiplierContributors: player.getGoldMultiplierContributors(),
      maxHealthGainMultiplier: snapshot.maxHealthGainMultiplier,
      maxShieldGainMultiplier: snapshot.maxShieldGainMultiplier,
      skipToLifeConversionEnabled: player.isSkipToLifeConversionEnabled(),
    }

    buffsPanelRef.current.setPlayerState(nextPlayerState)
    setPlayerState(nextPlayerState)
  }, [])

  const { getRewardCost, handleRewardSelection, handleRefreshShop, handleFinishShopping } = useShopController({
    playerRef,
    waveManagerRef,
    rewardPrompt,
    rewardPromptActiveRef,
    setRewardPrompt,
    visibleShopItemCount: shopVisibleItemCount,
    onVisibleShopItemCountChange: setShopVisibleItemCount,
    displayedRewardIds: shopDisplayedRewardIds,
    onDisplayedRewardIdsChange: setShopDisplayedRewardIds,
    playerState,
    postOverlay,
    syncPlayerState,
  })

  const handleAdvanceQuizQuestion = useCallback(
    (correctAnswers: number) => {
      const nextQuestion = getNextQuizQuestion(correctAnswers, askedQuizQuestionIdsRef.current)
      if (!nextQuestion) {
        setQuizQuestion(null)
        setQuizAnswerResult(null)
        setQuizCorrectExplanation(null)
        setQuizIncorrectExplanation(null)
        return null
      }

      const randomizedQuestion = randomizeValidListQuestion(nextQuestion)
      setQuizQuestion(randomizedQuestion)
      setQuizAnswerResult(null)
      setQuizCorrectExplanation(null)
      setQuizIncorrectExplanation(null)
      return randomizedQuestion
    },
    [setQuizQuestion],
  )

  const startQuizFreeze = useCallback((durationSeconds: number) => {
    if (quizFreezeFadeTimeoutRef.current !== null) {
      window.clearTimeout(quizFreezeFadeTimeoutRef.current)
      quizFreezeFadeTimeoutRef.current = null
    }

    quizFreezeRemainingRef.current = durationSeconds
    setQuizFreezeActive(true)
    setQuizFreezeFading(false)
    setQuizFreezeSecondsLeft(Math.ceil(durationSeconds))
  }, [])

  const getQuizFreezeDuration = useCallback(
    (question: QuizQuestion | null) => {
      const quizFreezeBonusSeconds = playerRef.current?.getArtifactStats().quizFreezeDurationSeconds ?? 0
      return getQuestionFreezeSeconds(question) + quizFreezeBonusSeconds
    },
    [playerRef],
  )

  const handleResumeAfterCorrectQuizAnswer = useCallback(() => {
    quizPauseCombatRef.current = false
    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
      return
    }

    startQuizFreeze(getQuizFreezeDuration(nextQuestion))
  }, [getQuizFreezeDuration, handleAdvanceQuizQuestion, quizCorrectAnswers, startQuizFreeze])

  const handleResumeAfterIncorrectQuizAnswer = useCallback(() => {
    quizPauseCombatRef.current = false
    setQuizAnswerResult(null)
    setQuizIncorrectExplanation(null)
    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
      return
    }

    startQuizFreeze(getQuizFreezeDuration(nextQuestion))
  }, [getQuizFreezeDuration, handleAdvanceQuizQuestion, quizCorrectAnswers, startQuizFreeze])

  const handleQuizAnswer = useCallback(
    (selectedIndex: number) => {
      const player = playerRef.current
      if (
        !player ||
        !quizQuestion ||
        quizAnswerResult !== null ||
        !quizActive
      ) {
        return
      }

      const quizGoldReward = 15 * player.getArtifactStats().goldGainMultiplier
      const artifactStats = player.getArtifactStats()
      const quizHealPercent =
        (0.15 + artifactStats.quizBonusHealthPercent) * player.getQuestionAnswerHealingMultiplier()
      const quizFreezeBonusSeconds = artifactStats.quizFreezeDurationSeconds

      const isCorrect = selectedIndex === quizQuestion.correctIndex
      const nextCorrectAnswers = quizCorrectAnswers + (isCorrect ? 1 : 0)

      setQuizTotalAnswered((previous) => previous + 1)
      if (isCorrect) {
        quizCorrectStreakRef.current += 1
        const streakCount = quizCorrectStreakRef.current
        buffsPanelRef.current.setCurrentStreak(streakCount)
        const explanation = getCorrectQuizExplanation(quizQuestion, selectedIndex)

        setQuizCorrectAnswers((previous) => previous + 1)
        setQuizCorrectExplanation(explanation)
        setQuizIncorrectExplanation(null)

        player.addGold(quizGoldReward)
        player.addFlatMaxHealth(15)
        player.heal(player.getMaxHealthValue() * quizHealPercent)

        quizPauseCombatRef.current = true

        postOverlay({
          title: 'Quiz Reward Activated',
          message:
            `Correct: +${Math.round(quizGoldReward)}g, +15 max health, +${Math.round(quizHealPercent * 100)}% heal, and +${Math.round(quizFreezeBonusSeconds)}s quiz freeze time. ` +
            'Game paused for explanation, then combat freezes while the next question goes live.',
          durationMs: 2800,
        })
      }

      setQuizAnswerResult(isCorrect ? 'correct' : 'incorrect')

      if (!isCorrect) {
        quizCorrectStreakRef.current = 0
        buffsPanelRef.current.setCurrentStreak(0)
        const explanation = getIncorrectQuizExplanation(quizQuestion, selectedIndex)
        quizPauseCombatRef.current = true
        setQuizIncorrectExplanation(explanation)

        postOverlay({
          title: 'Quiz Incorrect',
          message: 'Game paused to show explanation.',
          durationMs: 2200,
        })
      }

      syncPlayerState(player)

      if (
        isCorrect &&
        nextCorrectAnswers >= quizRampSettings.announceHardModeAtCorrectAnswers &&
        quizQuestion.difficulty !== 'hard'
      ) {
        // Encourage progression feedback once hard questions begin.
        postOverlay({
          title: 'Difficulty Increased',
          message: 'You are now entering hard system design questions.',
          durationMs: 2400,
        })
      }
    },
    [postOverlay, quizActive, quizAnswerResult, quizCorrectAnswers, quizQuestion, syncPlayerState],
  )

  useEffect(() => {
    if (!quizActive) {
      setQuizQuestion(null)
      setQuizAnswerResult(null)
      setQuizCorrectExplanation(null)
      setQuizIncorrectExplanation(null)
      return
    }

    if (quizQuestion !== null || quizAnswerResult !== null) {
      return
    }

    const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswers)
    if (!nextQuestion) {
      setQuizActive(false)
    }
  }, [handleAdvanceQuizQuestion, quizActive, quizAnswerResult, quizCorrectAnswers, quizQuestion])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    Actor.setIncomingDamageMultiplier(GLOBAL_INCOMING_DAMAGE_MULTIPLIER)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#090b12')
    scene.fog = new THREE.Fog('#090b12', 12, 44)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )
    camera.position.set(0, 2.35, 8.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const worldObject = new GameObject('World').addTo(scene)
    const player = new Player([-3.1, -0.05, 0.9])
    playerRef.current = player
    worldObject.addChild(player)
    syncPlayerState(player)
    const waveManager = new WaveManager()
    waveManagerRef.current = waveManager

    const activeEnemies: Enemy[] = []
    const enemyWaveSpawner = new EnemyWaveSpawner(worldObject, player, activeEnemies, postOverlay)

    player.setDeathEffectSpawner((effect) => {
      worldObject.addChild(effect)
    })
    player.setAttackSpawner((attack) => {
      worldObject.addChild(attack)
    })

    const initialWave = waveManager.reset()
    setCurrentRound(initialWave)
    enemyWaveSpawner.spawnWave(initialWave)

    const clock = new THREE.Clock()

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

    const animate = () => {
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      if (quizFreezeRemainingRef.current > 0) {
        quizFreezeRemainingRef.current = Math.max(0, quizFreezeRemainingRef.current - delta)
        setQuizFreezeSecondsLeft(Math.ceil(quizFreezeRemainingRef.current))

        if (quizFreezeRemainingRef.current === 0 && quizFreezeFadeTimeoutRef.current === null) {
          setQuizFreezeFading(true)
          quizFreezeFadeTimeoutRef.current = window.setTimeout(() => {
            setQuizFreezeActive(false)
            setQuizFreezeFading(false)
            setQuizFreezeSecondsLeft(0)
            quizFreezeFadeTimeoutRef.current = null
          }, 520)
        }
      }

      const isQuizPaused = quizPauseCombatRef.current || quizFreezeRemainingRef.current > 0
      const isRewardPromptActive = rewardPromptActiveRef.current

      if (!isQuizPaused && !isRewardPromptActive) {
        worldObject.tick(delta, elapsed)
      }
      syncPlayerState(player)

      if (!player.isDead() && !isRewardPromptActive) {
        const nextWave = waveManager.consumePendingNextWave()
        if (nextWave !== null) {
          setCurrentRound(nextWave)
          enemyWaveSpawner.spawnWave(nextWave)
        }
      }

      if (!player.isDead() && !isQuizPaused) {
        const allDefeated = activeEnemies.length > 0 && activeEnemies.every((enemy) => enemy.isDead())
        const clearEvent = waveManager.handleRoundState(allDefeated, activeEnemies.length, player)
        if (clearEvent) {
          rewardPromptActiveRef.current = true
          setRewardPrompt(clearEvent.prompt)

          postOverlay({
            title: `Round ${clearEvent.wave} Cleared`,
            message: `All ${clearEvent.defeatedEnemies} enemies defeated.`,
            details: [
              `Gold: ${Math.floor(player.getGold())}`,
              `Player HP: ${Math.round(player.getCurrentHealth())}/${player.getMaxHealthValue()}`,
              `Next wave enemies: ${clearEvent.nextWaveEnemyCount}`,
              'Shop is open. Each artifact can only be purchased once per run.',
            ],
            durationMs: 6200,
          })
        }
      }

      const liveEnemyCount = activeEnemies.filter((enemy) => !enemy.isDead()).length
      const shouldShowQuiz = !player.isDead() && liveEnemyCount > 0
      if (shouldShowQuiz !== quizCombatSignatureRef.current) {
        quizCombatSignatureRef.current = shouldShowQuiz
        if (shouldShowQuiz) {
          const nextQuestion = handleAdvanceQuizQuestion(quizCorrectAnswersRef.current)
          if (!nextQuestion) {
            setQuizActive(false)
            return
          }

          startQuizFreeze(getQuestionFreezeSeconds(nextQuestion))
        }
        setQuizActive(shouldShowQuiz)
      }

      camera.lookAt(0, 0, -0.4)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      waveManagerRef.current = null
      playerRef.current = null
      playerStateSignatureRef.current = ''
      quizCombatSignatureRef.current = false
      askedQuizQuestionIdsRef.current.clear()
      quizPauseCombatRef.current = false
      quizFreezeRemainingRef.current = 0
      quizCorrectStreakRef.current = 0
      if (quizFreezeFadeTimeoutRef.current !== null) {
        window.clearTimeout(quizFreezeFadeTimeoutRef.current)
        quizFreezeFadeTimeoutRef.current = null
      }
      rewardPromptActiveRef.current = false
      setRewardPrompt(null)
      setShopVisibleItemCount(DEFAULT_SHOP_VISIBLE_ITEM_COUNT)
      setShopDisplayedRewardIds([])
      setQuizActive(false)
      setQuizQuestion(null)
      setQuizAnswerResult(null)
      setQuizCorrectExplanation(null)
      setQuizIncorrectExplanation(null)
      setQuizFreezeActive(false)
      setQuizFreezeFading(false)
      setQuizFreezeSecondsLeft(0)
      setQuizCorrectAnswers(0)
      setQuizTotalAnswered(0)
      buffsPanelRef.current.reset()
      setCurrentRound(1)
      setPlayerState(createInitialPlayerStateSnapshot())
      worldObject.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [handleAdvanceQuizQuestion, postOverlay, startQuizFreeze, syncPlayerState])

  void quizCorrectExplanation
  void quizIncorrectExplanation
  void quizTotalAnswered
  void handleResumeAfterCorrectQuizAnswer
  void handleResumeAfterIncorrectQuizAnswer
  void handleQuizAnswer

  return (
    <div className="webgl-root">
      <section className="top-world-section">
        <div ref={mountRef} className="webgl-canvas" />

        <div className="round-counter" aria-live="polite">
          Round {currentRound}
        </div>

        {quizFreezeActive ? (
          <div className={`freeze-overlay${quizFreezeFading ? ' fade-out' : ''}`} aria-hidden="true">
            <div className="freeze-overlay-label">Time Frozen</div>
            <div className="freeze-overlay-timer">{quizFreezeSecondsLeft.toFixed(0)}s</div>
          </div>
        ) : null}
      </section>

      <section className="bottom-quiz-section">
        <div className="bottom-quiz-main">
          <QuizPanelQuestionsView
            playerRef={playerRef}
            postOverlay={postOverlay}
            syncPlayerState={syncPlayerState}
            onQuizStreakChange={(streak) => {
              buffsPanelRef.current.setCurrentStreak(streak)
            }}
            onFreezeUiStateChange={(state) => {
              setQuizFreezeActive(state.quizFreezeActive)
              setQuizFreezeFading(state.quizFreezeFading)
              setQuizFreezeSecondsLeft(state.quizFreezeSecondsLeft)
            }}
          />
        </div>

        {buffsPanelRef.current.render()}
      </section>

      <ShopOverlay
        rewardPrompt={rewardPrompt}
        currentGold={playerState.gold}
        currentSkips={playerState.skips}
        visibleShopItemCount={shopVisibleItemCount}
        purchasedArtifactIds={playerState.artifactIds}
        displayedRewardIds={shopDisplayedRewardIds}
        onDisplayedRewardIdsChange={setShopDisplayedRewardIds}
        getRewardCost={getRewardCost}
        onRewardSelection={handleRewardSelection}
        onRefreshShop={handleRefreshShop}
        onFinishShopping={handleFinishShopping}
      />

      <OverlayStack overlays={overlays} onDismiss={dismissOverlay} />
    </div>
  )
}

export default QuizManager
