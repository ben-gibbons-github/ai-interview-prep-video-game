import type { Player } from './Player'
import { Consumable } from './Consumables/Consumable'

export class Inventory {
  private readonly consumables: Consumable[] = []

  addConsumable(consumable: Consumable) {
    this.consumables.push(consumable)
  }

  getConsumables() {
    return [...this.consumables]
  }

  getSize() {
    return this.consumables.length
  }

  consumeAt(index: number, player: Player) {
    if (index < 0 || index >= this.consumables.length) {
      return null
    }

    const [consumable] = this.consumables.splice(index, 1)
    consumable.use(player)
    return consumable
  }
}
