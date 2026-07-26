const data = [
  {
    "id": "easy-algorithmic-complexity-a-01-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude."
    ],
    "correctIndex": 2,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-a-01-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for nested loop complexity check?",
    "options": [
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Measure complexity against input dimensions instead of line-by-line syntax."
    ],
    "correctIndex": 3,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
