import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BonusSkipArtifact extends Artifact {
  constructor() {
    super('bonus-skip', 'Bonus Skip', 'Gain +1 skip. Cost doubles each purchase.')
  }

  apply(player: Player) {
    player.addSkip(1)
  }
}
