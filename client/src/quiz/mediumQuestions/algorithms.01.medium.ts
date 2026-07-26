const data = [
  {
    "id": "medium-algorithms-01-q1",
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
  },
  {
    "id": "medium-algorithms-01-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for dynamic programming setup?",
    "options": [
      "Define state transitions and overlapping subproblems before coding DP.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns."
    ],
    "correctIndex": 0,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
