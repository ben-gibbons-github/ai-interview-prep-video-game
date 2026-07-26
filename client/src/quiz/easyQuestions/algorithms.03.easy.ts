const data = [
  {
    "id": "easy-algorithms-03-q1",
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
  },
  {
    "id": "easy-algorithms-03-q2",
    "difficulty": "easy",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct."
    ],
    "correctIndex": 1,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
