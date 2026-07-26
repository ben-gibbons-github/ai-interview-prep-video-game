import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class FireRoundsArtifact extends Artifact {
  constructor() {
    super('fire-rounds', 'Fire Rounds', 'Hits ignite enemies; burn damage and duration stack per copy.')
  }

  apply(player: Player) {
    player.setBurningProjectiles(6, 4)
  }
}
