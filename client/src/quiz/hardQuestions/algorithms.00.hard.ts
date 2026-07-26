const data = [
  {
    "id": "hard-algorithms-00-q1",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees."
    ],
    "correctIndex": 3,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithms-00-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Validate greedy choice property before relying on local-optimum decisions.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost."
    ],
    "correctIndex": 0,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
