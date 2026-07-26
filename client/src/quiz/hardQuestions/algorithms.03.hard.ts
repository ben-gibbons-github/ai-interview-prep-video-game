const data = [
  {
    "id": "hard-algorithms-03-q1",
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
  },
  {
    "id": "hard-algorithms-03-q2",
    "difficulty": "hard",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Prefer greedy solutions because they are always easier to prove correct.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees."
    ],
    "correctIndex": 3,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
