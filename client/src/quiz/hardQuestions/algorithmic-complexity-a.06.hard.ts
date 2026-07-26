const data = [
  {
    "id": "hard-algorithmic-complexity-a-06-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Measure complexity against input dimensions instead of line-by-line syntax.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude."
    ],
    "correctIndex": 1,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-a-06-q2",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for nested loop complexity check?",
    "options": [
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Prefer lower asymptotic growth when scale dominates fixed startup costs.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets."
    ],
    "correctIndex": 2,
    "correctExplanation": "Prefer lower asymptotic growth when scale dominates fixed startup costs. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
