const data = [
  {
    "id": "easy-algorithms-05-q1",
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
  },
  {
    "id": "easy-algorithms-05-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Define state transitions and overlapping subproblems before coding DP."
    ],
    "correctIndex": 3,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
