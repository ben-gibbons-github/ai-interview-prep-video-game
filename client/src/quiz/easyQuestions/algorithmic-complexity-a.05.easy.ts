const data = [
  {
    "id": "easy-algorithmic-complexity-a-05-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for big-O growth comparison?",
    "options": [
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Use amortized reasoning when occasional expensive operations are spread across many cheap ones.",
      "Count only average-case paths and ignore worst-case growth."
    ],
    "correctIndex": 2,
    "correctExplanation": "Use amortized reasoning when occasional expensive operations are spread across many cheap ones. "
  },
  {
    "id": "easy-algorithmic-complexity-a-05-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for amortized analysis in arrays?",
    "options": [
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Measure complexity against input dimensions instead of line-by-line syntax."
    ],
    "correctIndex": 3,
    "correctExplanation": "Measure complexity against input dimensions instead of line-by-line syntax. "
  }
]

export default data
