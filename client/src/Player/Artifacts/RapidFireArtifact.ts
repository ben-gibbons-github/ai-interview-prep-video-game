import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class RapidFireArtifact extends Artifact {
  constructor() {
    super('rapid-fire-core', 'Rapid Fire Core', 'Permanent buff: +20% rate of fire per stack (additive).')
  }

  apply(player: Player) {
    player.addPermanentAttackSpeedMultiplier(0.2)
  }
}
