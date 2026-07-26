const data = [
  {
    "id": "medium-database-management-00-q1",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Skip backup drills because snapshots always restore exactly as expected."
    ],
    "correctIndex": 2,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-database-management-00-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Choose isolation level based on anomaly tolerance and critical invariants."
    ],
    "correctIndex": 3,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
