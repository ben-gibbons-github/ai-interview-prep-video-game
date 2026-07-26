const data = [
  {
    "id": "easy-algorithmic-complexity-a-00-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for big-O growth comparison?",
    "options": [
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Estimate upper bounds from dominant operations and ignore lower-order terms for large N.",
      "Assume one nested loop always means O(N^2) regardless of bounds.",
      "Count only average-case paths and ignore worst-case growth."
    ],
    "correctIndex": 1,
    "correctExplanation": "Estimate upper bounds from dominant operations and ignore lower-order terms for large N. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-a-00-q2",
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
  }
]

export default data
