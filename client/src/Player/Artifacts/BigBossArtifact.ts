import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class BigBossArtifact extends Artifact {
  constructor() {
    super(
      'big-boss',
      'Big Boss',
      'Each correct answer has +50% chance per stack to summon a persistent heavy ally.',
    )
  }

  apply(player: Player) {
    player.addBigBossSummonChancePerCorrect(0.5)
  }
}
