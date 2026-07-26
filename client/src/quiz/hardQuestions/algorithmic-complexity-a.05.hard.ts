const data = [
  {
    "id": "hard-algorithmic-complexity-a-05-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for big-O growth comparison?",
    "options": [
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth."
    ],
    "correctIndex": 0,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-a-05-q2",
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
  }
]

export default data
