import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class ShieldGeneratorArtifact extends Artifact {
  constructor() {
    super('shield-generator', 'Shield Generator', 'Recharge +20% shield at the start of each wave per stack.')
  }

  apply(player: Player) {
    player.setBaseShieldPerWave(player.getMaxShield() * 0.2)
  }
}
