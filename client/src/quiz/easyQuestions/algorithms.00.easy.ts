const data = [
  {
    "id": "easy-algorithms-00-q1",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states."
    ],
    "correctIndex": 1,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. "
  },
  {
    "id": "easy-algorithms-00-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Validate greedy choice property before relying on local-optimum decisions.",
      "Sort first for every problem to simplify implementation regardless of cost."
    ],
    "correctIndex": 2,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. "
  }
]

export default data
