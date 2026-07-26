import type { Player } from '../Player'
import { Consumable } from './Consumable'

export class AdrenalineShotConsumable extends Consumable {
  constructor() {
    super('adrenaline-shot', 'Adrenaline Shot', 'Grants a temporary burst of firing speed for this wave.')
  }

  use(player: Player) {
    player.addTemporaryAttackSpeedMultiplier(0.72, 16, this.name, this.id)
  }
}
