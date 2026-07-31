const data = [
  {
    "id": "easy-database-management-00-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Add indexes to every column to guarantee better performance in all cases.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected."
    ],
    "correctIndex": 1,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. "
  },
  {
    "id": "easy-database-management-00-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Choose isolation level based on anomaly tolerance and critical invariants.",
      "Scale reads by randomly splitting tables without key-level traffic analysis."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. "
  }
]

export default data
