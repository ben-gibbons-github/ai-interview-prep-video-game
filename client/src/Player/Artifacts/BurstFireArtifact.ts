import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BurstFireArtifact extends Artifact {
  constructor() {
    super('burst-fire', 'Burst Fire', 'Each stack adds +0.2 burst size.')
  }

  apply(player: Player) {
    player.addBurstSize(0.2)
  }
}
