const data = [
  {
    "id": "medium-algorithms-00-q1",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for choosing a graph traversal?",
    "options": [
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Implement DP by memoizing everything, even unrelated states."
    ],
    "correctIndex": 2,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithms-00-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Validate greedy choice property before relying on local-optimum decisions."
    ],
    "correctIndex": 3,
    "correctExplanation": "Validate greedy choice property before relying on local-optimum decisions. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
