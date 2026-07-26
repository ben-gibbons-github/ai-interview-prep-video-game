const data = [
  {
    "id": "medium-database-management-04-q1",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Run all workloads at serializable isolation regardless of throughput impact."
    ],
    "correctIndex": 2,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-database-management-04-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Choose isolation level based on anomaly tolerance and critical invariants."
    ],
    "correctIndex": 3,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
