import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class DeflectionShieldsArtifact extends Artifact {
  constructor() {
    super(
      'deflection-shields',
      'Deflection Shields',
      'Each shield hit has +20% chance to fire a deflected shot at enemy targets.',
    )
  }

  apply(player: Player) {
    player.addDeflectionShieldChancePercent(20)
  }
}
