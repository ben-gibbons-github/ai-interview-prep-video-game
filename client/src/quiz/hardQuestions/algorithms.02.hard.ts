const data = [
  {
    "id": "hard-algorithms-02-q1",
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
  },
  {
    "id": "hard-algorithms-02-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for tradeoff between sorting and hashing?",
    "options": [
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Assume hash lookups are constant-time under all collision patterns.",
      "Choose structures that optimize the dominant operation under expected loads.",
      "Use the asymptotically fastest method even when constants dominate your workload."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose structures that optimize the dominant operation under expected loads. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
