const data = [
  {
    "id": "easy-algorithms-02-q1",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for dynamic programming setup?",
    "options": [
      "Implement DP by memoizing everything, even unrelated states.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns.",
      "Define state transitions and overlapping subproblems before coding DP."
    ],
    "correctIndex": 3,
    "correctExplanation": "Define state transitions and overlapping subproblems before coding DP. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithms-02-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for tradeoff between sorting and hashing?",
    "options": [
      "Choose structures that optimize the dominant operation under expected loads.",
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload."
    ],
    "correctIndex": 0,
    "correctExplanation": "Choose structures that optimize the dominant operation under expected loads. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
