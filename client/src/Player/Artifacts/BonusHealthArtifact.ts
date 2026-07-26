import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BonusHealthArtifact extends Artifact {
  constructor() {
    super('bonus-health-flat', 'Bonus Health', 'Increase max health by +45.')
  }

  apply(player: Player) {
    player.addFlatMaxHealth(45)
  }
}
