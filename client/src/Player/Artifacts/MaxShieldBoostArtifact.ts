import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class MaxShieldBoostArtifact extends Artifact {
  constructor() {
    super('max-shield-boost', 'Max Shield Boost', 'Increase max shields by +45 per stack.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(50)
  }
}