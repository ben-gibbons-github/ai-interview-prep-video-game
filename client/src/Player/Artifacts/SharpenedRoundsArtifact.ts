import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class SharpenedRoundsArtifact extends Artifact {
  constructor() {
    super('sharpened-rounds', 'Sharpened Rounds', 'Permanent buff: +20% player damage per stack (additive).')
  }

  apply(player: Player) {
    // Base damage is 20, so +20% additive per stack is +4 damage per stack.
    player.addPermanentAttackDamage(4)
  }
}
