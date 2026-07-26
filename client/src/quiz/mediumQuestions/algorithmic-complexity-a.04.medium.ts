const data = [
  {
    "id": "medium-algorithmic-complexity-a-04-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for input-scaling bottleneck analysis?",
    "options": [
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Estimate upper bounds from dominant operations and ignore lower-order terms for large N.",
      "Assume one nested loop always means O(N^2) regardless of bounds."
    ],
    "correctIndex": 2,
    "correctExplanation": "Estimate upper bounds from dominant operations and ignore lower-order terms for large N. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-a-04-q2",
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
  }
]

export default data
