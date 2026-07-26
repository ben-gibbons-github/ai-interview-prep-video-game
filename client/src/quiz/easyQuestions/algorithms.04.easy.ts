const data = [
  {
    "id": "easy-algorithms-04-q1",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct."
    ],
    "correctIndex": 1,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithms-04-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Validate greedy choice property before relying on local-optimum decisions.",
      "Implement DP by memoizing everything, even unrelated states."
    ],
    "correctIndex": 2,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
