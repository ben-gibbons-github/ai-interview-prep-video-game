const data = [
  {
    "id": "medium-algorithmic-complexity-a-02-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for nested loop complexity check?",
    "options": [
      "Measure complexity against input dimensions instead of line-by-line syntax.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets."
    ],
    "correctIndex": 0,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-a-02-q2",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for memory-vs-time tradeoff?",
    "options": [
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Prefer lower asymptotic growth when scale dominates fixed startup costs.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase."
    ],
    "correctIndex": 1,
    "correctExplanation": "Prefer lower asymptotic growth when scale dominates fixed startup costs. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
