const data = [
  {
    "id": "medium-algorithms-04-q1",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Prefer greedy solutions because they are always easier to prove correct."
    ],
    "correctIndex": 2,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithms-04-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Validate greedy choice property before relying on local-optimum decisions."
    ],
    "correctIndex": 3,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
