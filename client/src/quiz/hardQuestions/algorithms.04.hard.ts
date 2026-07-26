const data = [
  {
    "id": "hard-algorithms-04-q1",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees."
    ],
    "correctIndex": 3,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithms-04-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Validate greedy choice property before relying on local-optimum decisions.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states."
    ],
    "correctIndex": 0,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
