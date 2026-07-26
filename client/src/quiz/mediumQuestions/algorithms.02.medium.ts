const data = [
  {
    "id": "medium-algorithms-02-q1",
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
  },
  {
    "id": "medium-algorithms-02-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for tradeoff between sorting and hashing?",
    "options": [
      "Sort first for every problem to simplify implementation regardless of cost.",
      "Choose structures that optimize the dominant operation under expected loads.",
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload."
    ],
    "correctIndex": 1,
    "correctExplanation": "Choose structures that optimize the dominant operation under expected loads. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
