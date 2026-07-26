import type { Player } from '../Player'
import { Consumable } from './Consumable'

export class RepairKitConsumable extends Consumable {
  constructor() {
    super('repair-kit', 'Repair Kit', 'Instantly restores 28 HP.')
  }

  use(player: Player) {
    player.heal(28)
  }
}
