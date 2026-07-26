import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class CodeBrainArtifact extends Artifact {
  constructor() {
    super(
      'code-brain',
      'Code Brain',
      'Raw coding gold rewards are doubled each time this artifact is purchased.',
    )
  }

  apply(player: Player) {
    player.multiplyRawCodingGoldMultiplier(2)
  }

  getGoldMultiplierForQuestionAnswer(questionKind?: string): number {
    return questionKind === 'rawCoding' ? 2 : 1
  }
}
