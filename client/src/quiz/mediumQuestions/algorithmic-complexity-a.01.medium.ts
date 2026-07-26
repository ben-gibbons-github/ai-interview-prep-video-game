const data = [
  {
    "id": "medium-algorithmic-complexity-a-01-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones."
    ],
    "correctIndex": 3,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-a-01-q2",
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
  }
]

export default data
