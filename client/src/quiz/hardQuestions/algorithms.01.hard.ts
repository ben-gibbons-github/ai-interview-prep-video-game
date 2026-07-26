const data = [
  {
    "id": "hard-algorithms-01-q1",
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
  },
  {
    "id": "hard-algorithms-01-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for dynamic programming setup?",
    "options": [
      "Implement DP by memoizing everything, even unrelated states.",
      "Define state transitions and overlapping subproblems before coding DP.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns."
    ],
    "correctIndex": 1,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
