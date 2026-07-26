import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BouncingBulletsArtifact extends Artifact {
  constructor() {
    super('bouncing-bullets', 'Bouncing Bullets', 'Each stack gives projectiles +20% chance to bounce.')
  }

  apply(player: Player) {
    player.addBounceChancePercent(20)
  }
}
