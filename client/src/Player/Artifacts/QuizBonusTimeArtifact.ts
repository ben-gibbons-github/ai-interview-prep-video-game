import type { Player } from '../Player'
import { Artifact } from './Artifact'

export class QuizBonusTimeArtifact extends Artifact {
  constructor() {
    super(
      'quiz-bonus-time',
      'Quiz Freeze Time',
      'Increases correct-answer quiz freeze duration by +5 seconds per stack.',
    )
  }

  apply(player: Player) {
    player.addQuizFreezeDurationSeconds(5)
  }
}
