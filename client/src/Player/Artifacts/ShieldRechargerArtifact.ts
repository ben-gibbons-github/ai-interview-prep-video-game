import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class ShieldRechargerArtifact extends Artifact {
  constructor() {
    super('shield-recharger', 'Max Shield Boost', 'Increase max shields by +45 per stack.')
  }

  apply(player: Player) {
    player.addFlatMaxShield(45)
  }
}
