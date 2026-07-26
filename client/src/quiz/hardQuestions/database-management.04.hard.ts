const data = [
  {
    "id": "hard-database-management-04-q1",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Profile workload first, then choose indexes that match dominant query patterns."
    ],
    "correctIndex": 3,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-database-management-04-q2",
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
  }
]

export default data
