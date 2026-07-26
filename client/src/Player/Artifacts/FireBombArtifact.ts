import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class FireBombArtifact extends Artifact {
  constructor() {
    super(
      'fire-bomb',
      'Question Nuke',
      'Each correct answer queues one nuke per stack at your current target.',
    )
  }

  apply(player: Player) {
    player.addFireBombDamagePerSecond(1)
  }
}
