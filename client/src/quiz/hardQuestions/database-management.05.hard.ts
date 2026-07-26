const data = [
  {
    "id": "hard-database-management-05-q1",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Choose isolation level based on anomaly tolerance and critical invariants.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected."
    ],
    "correctIndex": 0,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-database-management-05-q2",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Test recovery runbooks regularly with realistic restore-time targets.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis."
    ],
    "correctIndex": 1,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
