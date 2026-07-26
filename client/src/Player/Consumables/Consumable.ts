import type { Player } from '../Player'

export abstract class Consumable {
  readonly id: string
  readonly name: string
  readonly description: string

  protected constructor(id: string, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }

  abstract use(player: Player): void
}
