const data = [
  {
    "id": "hard-algorithmic-complexity-a-02-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for nested loop complexity check?",
    "options": [
      "Count only average-case paths and ignore worst-case growth.",
      "Measure complexity against input dimensions instead of line-by-line syntax.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets."
    ],
    "correctIndex": 1,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-a-02-q2",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for memory-vs-time tradeoff?",
    "options": [
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Prefer lower asymptotic growth when scale dominates fixed startup costs.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase."
    ],
    "correctIndex": 2,
    "correctExplanation": "Prefer lower asymptotic growth when scale dominates fixed startup costs. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
