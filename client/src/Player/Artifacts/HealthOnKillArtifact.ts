import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class HealthOnKillArtifact extends Artifact {
  constructor() {
    super('health-on-kill', 'Vampiric Core', 'Permanently increase max health by +5% on kill per stack.')
  }

  apply(player: Player) {
    player.addHealthOnKill(0.05)
  }
}
