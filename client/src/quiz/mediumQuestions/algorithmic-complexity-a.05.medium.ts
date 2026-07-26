const data = [
  {
    "id": "medium-algorithmic-complexity-a-05-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for big-O growth comparison?",
    "options": [
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones."
    ],
    "correctIndex": 3,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-a-05-q2",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Measure complexity against input dimensions instead of line-by-line syntax.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude."
    ],
    "correctIndex": 0,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
