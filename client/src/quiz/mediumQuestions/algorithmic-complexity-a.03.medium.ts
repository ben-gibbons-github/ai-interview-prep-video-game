const data = [
  {
    "id": "medium-algorithmic-complexity-a-03-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for memory-vs-time tradeoff?",
    "options": [
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Prefer lower asymptotic growth when scale dominates fixed startup costs.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase."
    ],
    "correctIndex": 1,
    "correctExplanation": "Prefer lower asymptotic growth when scale dominates fixed startup costs. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-a-03-q2",
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
  }
]

export default data
