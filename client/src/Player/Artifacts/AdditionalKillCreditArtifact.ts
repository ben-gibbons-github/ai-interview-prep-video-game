import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class AdditionalKillCreditArtifact extends Artifact {
  constructor() {
    super(
      'additional-kill-credit',
      'Echo Core',
      'Each enemy kill counts as +1 additional kill for healing, shield, and damage bonuses. Stacks infinitely.',
    )
  }

  apply(player: Player) {
    player.addAdditionalKillCredits(1)
  }
}
