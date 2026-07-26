import type { Player } from '../Player'

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
}
