import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BonusHealthPercentArtifact extends Artifact {
  constructor() {
    super('bonus-health-percent', 'Bonus Health %', 'Increase max health by +22%.')
  }

  apply(player: Player) {
    player.addPercentMaxHealth(0.22)
  }
}
