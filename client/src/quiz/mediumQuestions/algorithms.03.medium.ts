const data = [
  {
    "id": "medium-algorithms-03-q1",
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
  },
  {
    "id": "medium-algorithms-03-q2",
    "difficulty": "medium",
    "prompt": "Algorithms: what is the best approach for stream processing algorithm choice?",
    "options": [
      "Assume hash lookups are constant-time under all collision patterns.",
      "Use the asymptotically fastest method even when constants dominate your workload.",
      "Match algorithm choice to input constraints, access patterns, and correctness guarantees.",
      "Prefer greedy solutions because they are always easier to prove correct."
    ],
    "correctIndex": 2,
    "correctExplanation": "Match algorithm choice to input constraints, access patterns, and correctness guarantees. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
