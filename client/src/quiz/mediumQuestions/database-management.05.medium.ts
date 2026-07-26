const data = [
  {
    "id": "medium-database-management-05-q1",
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
  },
  {
    "id": "medium-database-management-05-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Test recovery runbooks regularly with realistic restore-time targets.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis."
    ],
    "correctIndex": 0,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
