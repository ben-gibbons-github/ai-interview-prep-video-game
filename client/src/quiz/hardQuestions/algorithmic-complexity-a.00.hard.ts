const data = [
  {
    "id": "hard-algorithmic-complexity-a-00-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for big-O growth comparison?",
    "options": [
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Estimate upper bounds from dominant operations and ignore lower-order terms for large N."
    ],
    "correctIndex": 3,
    "correctExplanation": "Estimate upper bounds from dominant operations and ignore lower-order terms for large N. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-a-00-q2",
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
  }
]

export default data
