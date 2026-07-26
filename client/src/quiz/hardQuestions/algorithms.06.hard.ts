const data = [
  {
    "id": "hard-algorithms-06-q1",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for using greedy methods safely?",
    "options": [
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Define state transitions and overlapping subproblems before coding DP.",
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost."
    ],
    "correctIndex": 1,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithms-06-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for dynamic programming setup?",
    "options": [
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Choose structures that optimize the dominant operation under expected loads.",
      "Assume hash lookups are constant-time under all collision patterns."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose structures that optimize the dominant operation under expected loads. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
