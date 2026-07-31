import type { Player } from '../Player'

export interface ArtifactBonusFunctions {
  getGoldMultiplierForAnyGain: () => number
  getGoldMultiplierForQuestionAnswer: (questionKind?: string) => number
  getGoldMultiplierForEnemyKill: () => number
  getMaxHealthFlatBonus: () => number
  getMaxHealthMultiplier: () => number
  getMaxShieldFlatBonus: () => number
  getMaxShieldMultiplier: () => number
  getRateOfFireFlatBonus: () => number
  getRateOfFireMultiplier: () => number
}

export abstract class Artifact {
  readonly id: string
  readonly name: string
  readonly description: string

  protected constructor(id: string, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }

  abstract apply(player: Player): void

  /**
   * Unified callable bonus surface for this artifact.
   * Subclasses can override category methods to contribute non-default values.
   */
  getBonusFunctions(): ArtifactBonusFunctions {
    return {
      getGoldMultiplierForAnyGain: () => this.getGoldMultiplierForAnyGain(),
      getGoldMultiplierForQuestionAnswer: (questionKind?: string) =>
        this.getGoldMultiplierForQuestionAnswer(questionKind),
      getGoldMultiplierForEnemyKill: () => this.getGoldMultiplierForEnemyKill(),
      getMaxHealthFlatBonus: () => this.getMaxHealthFlatBonus(),
      getMaxHealthMultiplier: () => this.getMaxHealthMultiplier(),
      getMaxShieldFlatBonus: () => this.getMaxShieldFlatBonus(),
      getMaxShieldMultiplier: () => this.getMaxShieldMultiplier(),
      getRateOfFireFlatBonus: () => this.getRateOfFireFlatBonus(),
      getRateOfFireMultiplier: () => this.getRateOfFireMultiplier(),
    }
  }

  /**
   * Optional: Returns a global gold multiplier bonus that applies to all gold gains.
   * Default is 1 (no bonus). Can be overridden by subclasses.
   */
  getGoldMultiplierForAnyGain(): number {
    return 1
  }

  /**
   * Optional: Returns gold multiplier bonus for quiz correct answer rewards.
   * Default follows getGoldMultiplierForAnyGain. Can be overridden by subclasses.
   */
  getGoldMultiplierForQuestionAnswer(_questionKind?: string): number {
    return this.getGoldMultiplierForAnyGain()
  }

  /**
   * Optional: Returns gold multiplier bonus for enemy kill rewards.
   * Default follows getGoldMultiplierForAnyGain. Can be overridden by subclasses.
   */
  getGoldMultiplierForEnemyKill(): number {
    return this.getGoldMultiplierForAnyGain()
  }

  /**
   * Optional: flat max-health bonus added by this artifact.
   */
  getMaxHealthFlatBonus(): number {
    return 0
  }

  /**
   * Optional: multiplicative max-health growth bonus from this artifact.
   */
  getMaxHealthMultiplier(): number {
    return 1
  }

  /**
   * Optional: flat max-shield bonus added by this artifact.
   */
  getMaxShieldFlatBonus(): number {
    return 0
  }

  /**
   * Optional: multiplicative max-shield growth bonus from this artifact.
   */
  getMaxShieldMultiplier(): number {
    return 1
  }

  /**
   * Optional: flat rate-of-fire bonus from this artifact.
   * Units are shots/second added directly to baseline calculations.
   */
  getRateOfFireFlatBonus(): number {
    return 0
  }

  /**
   * Optional: multiplicative rate-of-fire bonus from this artifact.
   */
  getRateOfFireMultiplier(): number {
    return 1
  }
}
