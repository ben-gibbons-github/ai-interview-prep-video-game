import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class ShieldOnKillArtifact extends Artifact {
  constructor() {
    super('shield-on-kill', 'Aegis Feed', 'Restore +20% max shields whenever you kill an enemy (stacks).')
  }

  apply(player: Player) {
    player.addShieldOnKill(0.2)
  }
}
