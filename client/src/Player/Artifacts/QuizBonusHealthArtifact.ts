import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class QuizBonusHealthArtifact extends Artifact {
  constructor() {
    super(
      'quiz-bonus-health',
      'Quiz Bonus Health',
      'Increases correct-answer quiz healing by +1% per stack.',
    )
  }

  apply(player: Player) {
    player.addQuizBonusHealthPercent(0.01)
  }
}
