import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class FreezeBombArtifact extends Artifact {
  constructor() {
    super(
      'freeze-bomb',
      'Freeze Ray',
      'Each correct answer queues one freeze ray per stack.',
    )
  }

  apply(player: Player) {
    player.addFreezeBombSecondsPerCorrect(1)
  }
}
