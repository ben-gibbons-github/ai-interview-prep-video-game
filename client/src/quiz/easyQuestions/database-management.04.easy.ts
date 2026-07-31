const data = [
  {
    "id": "easy-database-management-04-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact."
    ],
    "correctIndex": 1,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. "
  },
  {
    "id": "easy-database-management-04-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Choose isolation level based on anomaly tolerance and critical invariants.",
      "Skip backup drills because snapshots always restore exactly as expected."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. "
  }
]

export default data
