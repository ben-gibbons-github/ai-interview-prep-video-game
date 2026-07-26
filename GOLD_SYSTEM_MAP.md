# Gold System Complete Map

## Gold Sources & Calculation Locations

### 1. KILL GOLD (Enemy Kills)
**Display/Calculate Location**: [Player.ts](Player/Player.ts#L1557-L1578)
- **Function**: `private onEnemyKilled(target?: Actor)`
- **Calculation**: `goldReward = this.goldPerKill * this.killGoldMultiplier * this.buffManager.getGoldGainMultiplier()`
- **Default goldPerKill**: 15 (defined at [Player.ts line 369](Player/Player.ts#L369))
- **Display**: Floating gold text in [WebGLWorld.ts](../WebGLWorld.ts#L157-L205) via `spawnKillGoldText()`
- **Multipliers Applied**:
  - `killGoldMultiplier` (1.0 by default)
  - `goldGainMultiplier` (1.0 by default, additive via artifacts)
  - `runGoldMultiplier` (applied in `addGold()` method, affects all gold)

**Listener**: [WebGLWorld.ts line 719-720](../WebGLWorld.ts#L719-L720)
```typescript
player.setEnemyKillGoldListener((position, goldAmount) => {
  spawnKillGoldText(scene, position, goldAmount, activeKillGoldTexts)
})
```

---

### 2. QUIZ CORRECT ANSWER GOLD
**Calculate Location**: [QuizManager.ts lines 764-777](QuizManager.ts#L764-L777)
- **Base Gold**: `GOLD_PER_CORRECT_ANSWER = 2` ([QuizManager.ts line 55](QuizManager.ts#L55))
- **Full Calculation**:
```typescript
const questionBonusGoldMultiplier = getBaseRewardMultiplier(question)
const difficultyGoldMultiplier = getCorrectAnswerGoldMultiplier(question)
const rawCodingArtifactGoldMultiplier = question.kind === 'rawCoding'
  ? Math.max(1, artifactStats.rawCodingGoldMultiplier)
  : 1
const artifactGoldMultiplier = Math.max(1, artifactStats.goldGainMultiplier) * rawCodingArtifactGoldMultiplier
const goldMultiplier = difficultyGoldMultiplier * questionBonusGoldMultiplier * artifactGoldMultiplier * runLaunchGoldMultiplier
player.addGold(GOLD_PER_CORRECT_ANSWER * goldMultiplier)
```

**Multipliers Applied**:
1. **Difficulty Gold Multiplier** ([QuizManager.ts lines 176-196](QuizManager.ts#L176-L196)):
   - `veryHard`: 3x
   - `insanelyHard`: 4x
   - `hard`: 2x
   - `medium`: 1.5x
   - `easy`: 1x

2. **Question Bonus Multiplier** ([QuizManager.ts lines 155-173](QuizManager.ts#L155-L173)):
   - Multi-section system design: 4x
   - Default: 1x

3. **Artifact Gold Multiplier** (combination of two):
   - `goldGainMultiplier`: Cumulative additive bonus (starts at 1.0)
   - `rawCodingGoldMultiplier`: Multiplicative, specific to raw coding questions

4. **Run Launch Config Multiplier** ([RunLaunchConfig.ts line 167](../../ui/RunLaunchConfig.ts#L167)):
   - Hard questions: 1.25x
   - Default: 1.0x

**Display**: [QuizPanelRenderer.tsx lines 1231-1234](../ui/QuizPanelRenderer.tsx#L1231-L1234)
```typescript
<p className="quiz-reward-gold-hero">+{Math.round(quizCorrectRewardSummary.goldReward)}g</p>
<p className="quiz-reward-mini-copy">
  {baseGoldReward}g x difficulty {difficultyGoldMultiplier}x x question bonus {questionBonusGoldMultiplier}x x artifact bonus {artifactGoldMultiplier}x = {goldMultiplier}x
</p>
```

---

### 3. STREAK GOLD (Consecutive Correct Answers)
**Calculate Location**: [QuizManager.ts lines 796-800](QuizManager.ts#L796-L800)
- **Function**: `getStreakGoldBonusForStreak(streak: number)`
- **Source**: [Player.ts lines 1150-1156](Player/Player.ts#L1150-L1156)
- **Artifact**: `StreakGoldArtifact` ([ExpandedArtifacts.ts lines 358-365](Artifacts/ExpandedArtifacts.ts#L358-L365))
- **Threshold**: Every 3 correct answers
- **Bonus**: +15 gold per streak
- **Added to reward**: `goldReward: GOLD_PER_CORRECT_ANSWER * goldMultiplier + streakGoldBonus` ([QuizManager.ts line 800](QuizManager.ts#L800))

---

### 4. ROUND-END GOLD (Multiple Sources)
**Calculate Location**: [Player.ts - Setter methods at lines 1174-1201](Player/Player.ts#L1174-L1201)

#### 4a. Compound Interest Gold
- **Artifact**: `RoundEndGoldInterestArtifact` ([ExpandedArtifacts.ts lines 184-191](Artifacts/ExpandedArtifacts.ts#L184-L191))
- **Percentage**: 10% of current gold
- **Source**: `setRoundEndGoldPercentOfCurrentGold(0.1)` ([Player.ts line 1176](Player/Player.ts#L1176))

#### 4b. Fleet Payroll Gold
- **Artifact**: `FleetPayrollArtifact` ([ExpandedArtifacts.ts lines 350-357](Artifacts/ExpandedArtifacts.ts#L350-L357))
- **Reward**: 10 gold per active fleet member
- **Source**: `setRoundEndGoldPerFleetMember(10)` ([Player.ts line 1183](Player/Player.ts#L1183))

#### 4c. Health Dividend Gold
- **Artifact**: `HealthDividendDeathOnWrongArtifact` ([ExpandedArtifacts.ts lines 463-471](Artifacts/ExpandedArtifacts.ts#L463-L471))
- **Percentage**: 50% of current health
- **Source**: `setRoundEndGoldPercentOfHealth(0.5)` ([Player.ts line 1207](Player/Player.ts#L1207))

---

### 5. HIT GOLD (Damage on Hit, No Kill)
**Calculate Location**: [Player.ts lines 1724-1725](Player/Player.ts#L1724-L1725)
- **Artifact**: `HitGoldNoKillGoldArtifact` ([ExpandedArtifacts.ts lines 216-224](Artifacts/ExpandedArtifacts.ts#L216-L224))
- **Chance**: 10%
- **Amount**: 1 gold per hit
- **Configuration**: `setGoldOnHitChance(0.1, 1)` ([Player.ts line 971-973](Player/Player.ts#L971-L973))
- **Trade-off**: Disables kill gold entirely (`setGoldPerKill(0)`)

---

### 6. QUESTION BUFF REPLACEMENT GOLD
**Calculate Location**: [QuizManager.ts lines 806-813](QuizManager.ts#L806-L813)
- **Artifact**: `ReplaceQuestionBuffsWithGoldArtifact` ([ExpandedArtifacts.ts lines 428-435](Artifacts/ExpandedArtifacts.ts#L428-L435))
- **Replacement Logic**: 
  - Disables normal question buff rewards
  - Each buff replaced = 5 gold
  - Applies `rewardMultiplier` from round buff calculation
- **Source**: `setReplaceQuestionBuffsWithGold(5)` ([Player.ts line 1197](Player/Player.ts#L1197))

---

## All Artifact Gold Multipliers & Bonus Types

### MULTIPLICATIVE MULTIPLIERS (Applied to all gold types)

#### Kill Gold Multiplier
- **Variable**: `killGoldMultiplier` ([Player.ts line 378](Player/Player.ts#L378))
- **Methods**: 
  - `setKillGoldMultiplier(multiplier)` ([Player.ts line 919-920](Player/Player.ts#L919-L920))
- **Artifacts**:
  - `KillGoldBoostArtifact`: 1.25x ([ExpandedArtifacts.ts line 254](Artifacts/ExpandedArtifacts.ts#L248-L255))

#### Run Gold Multiplier (General Gold Multiplier)
- **Variable**: `runGoldMultiplier` ([Player.ts line 377](Player/Player.ts#L377))
- **Applied in**: `addGold()` method ([Player.ts lines 887-888](Player/Player.ts#L882-L894))
- **Methods**:
  - `setRunGoldMultiplier(multiplier)` ([Player.ts line 907-908](Player/Player.ts#L907-L908))
  - `multiplyRunGoldMultiplier(multiplier)` ([Player.ts lines 911-916](Player/Player.ts#L911-L916))
- **Artifacts**:
  - `RichesForShotsArtifact`: 3x (but costs 1g per shot 20% chance) ([ExpandedArtifacts.ts lines 260-267](Artifacts/ExpandedArtifacts.ts#L260-L267))

### ADDITIVE MULTIPLIERS (Via artifactStats)

#### Gold Gain Multiplier
- **Variable**: `goldGainMultiplier` ([ArtifactStateManager.ts line 92](Artifacts/ArtifactStateManager.ts#L92))
- **Starting Value**: 1.0 ([ArtifactStateManager.ts line 38](Artifacts/ArtifactStateManager.ts#L38))
- **Method**: `addGoldGainMultiplier(percent)` - ADDITIVE, not multiplicative ([ArtifactStateManager.ts lines 227-236](Artifacts/ArtifactStateManager.ts#L227-L236))
- **Artifacts**:
  - `GoldBountyArtifact`: +10% ([GoldBountyArtifact.ts](Artifacts/GoldBountyArtifact.ts))
  - `GoldBounty2xArtifact`: +20% ([ExpandedArtifacts.ts line 40](Artifacts/ExpandedArtifacts.ts#L34-L41))
  - `GoldBounty3xArtifact`: +30% ([ExpandedArtifacts.ts line 50](Artifacts/ExpandedArtifacts.ts#L44-L51))
  - `GoldBounty4xArtifact`: +40% ([ExpandedArtifacts.ts line 60](Artifacts/ExpandedArtifacts.ts#L54-L61))
  - `GoldLifeLossWipeArtifact`: +10% (but lose all gold on life loss) ([ExpandedArtifacts.ts lines 414-421](Artifacts/ExpandedArtifacts.ts#L414-L421))
  - `GoldWrongAnswerWipeArtifact`: +25% (but lose all gold on wrong answer) ([ExpandedArtifacts.ts lines 424-431](Artifacts/ExpandedArtifacts.ts#L424-L431))
  - `GoldShieldBreakResetArtifact`: +10% (but lose all gold if shield breaks) ([ExpandedArtifacts.ts lines 434-441](Artifacts/ExpandedArtifacts.ts#L434-L441))

#### Raw Coding Gold Multiplier
- **Variable**: `rawCodingGoldMultiplier` ([ArtifactStateManager.ts line 98](Artifacts/ArtifactStateManager.ts#L98))
- **Starting Value**: 1.0 ([ArtifactStateManager.ts line 44](Artifacts/ArtifactStateManager.ts#L44))
- **Method**: `multiplyRawCodingGoldMultiplier(multiplier)` - MULTIPLICATIVE ([ArtifactStateManager.ts lines 299-308](Artifacts/ArtifactStateManager.ts#L299-L308))
- **Artifacts**:
  - `CodeBrainArtifact`: 2x per purchase (stacks multiplicatively) ([CodeBrainArtifact.ts](Artifacts/CodeBrainArtifact.ts))

### SPECIAL GOLD MECHANICS

#### Gold-on-Hit (Alternative to Kill Gold)
- **Chance**: Configurable
- **Amount**: Configurable
- **Methods**: `setGoldOnHitChance(chance, goldAmount)` ([Player.ts lines 971-973](Player/Player.ts#L971-L973))
- **Artifact**: `HitGoldNoKillGoldArtifact`: 10% chance for 1g on hit ([ExpandedArtifacts.ts lines 216-224](Artifacts/ExpandedArtifacts.ts#L216-L224))
- **Note**: Disables kill gold when used

#### Gold Loss Per Shot
- **Chance**: Configurable (0-1 range)
- **Amount**: Configurable
- **Methods**: 
  - `setGoldLossPerShot(amount)` ([Player.ts line 946](Player/Player.ts#L946))
  - `setGoldLossPerShotChance(chance)` ([Player.ts lines 950-951](Player/Player.ts#L950-L951))
- **Artifact**: `RichesForShotsArtifact`: 20% chance to lose 1g per shot ([ExpandedArtifacts.ts lines 260-267](Artifacts/ExpandedArtifacts.ts#L260-L267))

#### Gold Healing Per Gain
- **Shield Heal**: Configurable percent per gold gained
- **Health Heal**: Configurable percent per gold gained
- **Methods**:
  - `addShieldHealPercentPerGoldGain(percent)` ([Player.ts line 945](Player/Player.ts#L945))
  - `addHealthHealPercentPerGoldGain(percent)` ([Player.ts line 951](Player/Player.ts#L951))
- **Artifacts**:
  - `GoldShieldHealArtifact`: 1% shield heal per gold gained ([ExpandedArtifacts.ts lines 174-181](Artifacts/ExpandedArtifacts.ts#L174-L181))
  - `GoldHealthHealArtifact`: 0.5% health heal per gold gained ([ExpandedArtifacts.ts lines 184-191](Artifacts/ExpandedArtifacts.ts#L184-L191))

---

## Gold Loss Mechanics

### Life Loss Wipe
- **Artifact**: `GoldLifeLossWipeArtifact` ([ExpandedArtifacts.ts lines 414-421](Artifacts/ExpandedArtifacts.ts#L414-L421))
- **Trigger**: Player loses a life
- **Effect**: `setLoseAllGoldOnLifeLoss(true)` ([Player.ts line 1193](Player/Player.ts#L1193))
- **Bonus**: +10% gold from all sources

### Wrong Answer Wipe
- **Artifact**: `GoldWrongAnswerWipeArtifact` ([ExpandedArtifacts.ts lines 424-431](Artifacts/ExpandedArtifacts.ts#L424-L431))
- **Trigger**: Player answers a question incorrectly
- **Effect**: `setLoseAllGoldOnWrongAnswer(true)` ([Player.ts line 1199](Player/Player.ts#L1199))
- **Implementation**: [Player.ts lines 1210-1211](Player/Player.ts#L1210-L1211)
- **Bonus**: +25% gold from all sources

### Shield Break Gold Reset
- **Artifact**: `GoldShieldBreakResetArtifact` ([ExpandedArtifacts.ts lines 434-441](Artifacts/ExpandedArtifacts.ts#L434-L441))
- **Trigger**: Shield reaches 0
- **Effect**: Lose all gold AND instantly restore full shield
- **Method**: `setShieldBreakGoldResetEnabled(true)` ([Player.ts line 1205](Player/Player.ts#L1205))
- **Implementation**: [Player.ts lines 1218-1232](Player/Player.ts#L1218-L1232)
- **Bonus**: +10% gold from all sources

---

## Missing/Unused Multipliers by Context

### ✅ FULLY IMPLEMENTED
1. **Kill Gold**: 
   - `killGoldMultiplier` ✓
   - `goldGainMultiplier` ✓
   - `runGoldMultiplier` ✓

2. **Quiz Correct Answer Gold**:
   - `difficultyGoldMultiplier` ✓
   - `questionBonusGoldMultiplier` ✓
   - `artifactGoldMultiplier` (goldGainMultiplier + rawCodingGoldMultiplier) ✓
   - `runLaunchGoldMultiplier` ✓

3. **Raw Coding Gold**:
   - `rawCodingGoldMultiplier` ✓

### ⚠️ POTENTIAL GAPS
1. **Kill Gold does NOT use**:
   - `rawCodingGoldMultiplier` - This is ONLY for quiz rewards, not kill gold
   - Run launch config multiplier - Kill gold is separate from quiz rewards

2. **Quiz Correct Answer Gold does NOT use**:
   - `killGoldMultiplier` - Only applies to kills, not quiz rewards

3. **Streak Gold does NOT apply**:
   - `runGoldMultiplier` - Added directly without going through `addGold()`
   - Worth investigating if this is intentional

4. **Round-End Gold does NOT use**:
   - Any artifact multipliers consistently
   - Each round-end source has its own calculation

---

## Summary Table

| Source | Base Amount | killGoldMultiplier | runGoldMultiplier | goldGainMultiplier | rawCodingGoldMultiplier | runLaunchMultiplier |
|--------|-------------|-------------------|------------------|-------------------|----------------------|-------------------|
| Kill Gold | 15 | ✓ | ✓ | ✓ | ✗ | ✗ |
| Quiz Correct | 2 | ✗ | ✗ (applied in addGold) | ✓ | ✓ (if rawCoding) | ✓ |
| Streak Gold | 15 | ? | ? | ? | ✗ | ? |
| Hit Gold | 1 | ✗ | ✓ | ✓ | ✗ | ✗ |
| Round-End Interest | % of gold | ? | ? | ? | ✗ | ? |
| Round-End Payroll | 10/member | ? | ? | ? | ✗ | ? |
| Round-End Health | % of health | ? | ? | ? | ✗ | ? |
| Buff Replacement | 5/buff | ? | ? | ✓? | ✗ | ? |

