const data = [
  {
    "id": "easy-algorithms-01-q1",
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
  },
  {
    "id": "easy-algorithms-01-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for dynamic programming setup?",
    "options": [
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns.",
      "Define state transitions and overlapping subproblems before coding DP."
    ],
    "correctIndex": 3,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. "
  }
]

export default data
