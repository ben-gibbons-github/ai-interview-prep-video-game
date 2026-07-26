const data = [
  {
    "id": "medium-algorithms-05-q1",
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
  },
  {
    "id": "medium-algorithms-05-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Define state transitions and overlapping subproblems before coding DP.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost."
    ],
    "correctIndex": 0,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
