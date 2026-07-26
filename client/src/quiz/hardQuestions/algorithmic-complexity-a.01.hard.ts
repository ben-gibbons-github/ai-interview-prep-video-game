const data = [
  {
    "id": "hard-algorithmic-complexity-a-01-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude."
    ],
    "correctIndex": 0,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-a-01-q2",
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
  }
]

export default data
