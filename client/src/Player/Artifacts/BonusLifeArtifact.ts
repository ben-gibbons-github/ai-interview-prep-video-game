import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BonusLifeArtifact extends Artifact {
  constructor() {
    super('bonus-life', 'Bonus Life', 'Gain +1 life. Cost doubles each purchase.')
  }

  apply(player: Player) {
    player.addLifeWithoutSkips(1)
  }
}
