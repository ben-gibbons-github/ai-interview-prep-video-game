import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class DamageOnKillArtifact extends Artifact {
  constructor() {
    super('damage-on-kill', 'Execution Lens', 'Gain +0.8 projectile damage whenever you kill an enemy.')
  }

  apply(player: Player) {
    player.addDamageOnKill(0.8)
  }
}
