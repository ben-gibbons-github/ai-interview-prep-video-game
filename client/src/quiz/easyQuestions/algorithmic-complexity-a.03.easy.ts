const data = [
  {
    "id": "easy-algorithmic-complexity-a-03-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for memory-vs-time tradeoff?",
    "options": [
      "Prefer lower asymptotic growth when scale dominates fixed startup costs.",
      "Use constant-space algorithms even when they increase runtime by orders of magnitude.",
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase."
    ],
    "correctIndex": 0,
    "correctExplanation": "Prefer lower asymptotic growth when scale dominates fixed startup costs. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-a-03-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) I: what is the best approach for input-scaling bottleneck analysis?",
    "options": [
      "Choose algorithms from microbenchmarks that use tiny fixed datasets.",
      "Estimate upper bounds from dominant operations and ignore lower-order terms for large N.",
      "Treat O(N) and O(log N) as equivalent because both eventually increase.",
      "Assume one nested loop always means O(N^2) regardless of bounds."
    ],
    "correctIndex": 1,
    "correctExplanation": "Estimate upper bounds from dominant operations and ignore lower-order terms for large N. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
