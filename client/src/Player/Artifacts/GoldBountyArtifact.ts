import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class GoldBountyArtifact extends Artifact {
  constructor() {
    super('gold-bounty', 'Gold Bounty', 'Gain +10% gold from enemy kills (stacks).')
  }

  apply(_player: Player) {}

  getGoldMultiplierForAnyGain(): number {
    return 1.1
  }
}
