import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class MiniFleetArtifact extends Artifact {
  constructor() {
    super(
      'mini-fleet',
      'Mini Fleet',
      'Each correct answer summons +1 mini ally (stacks, survives across rounds).',
    )
  }

  apply(player: Player) {
    player.addMiniFleetAlliesPerCorrect(1)
  }
}
