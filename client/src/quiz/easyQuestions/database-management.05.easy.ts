const data = [
  {
    "id": "easy-database-management-05-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for database indexing strategy?",
    "options": [
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Choose isolation level based on anomaly tolerance and critical invariants.",
      "Skip backup drills because snapshots always restore exactly as expected."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-database-management-05-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Test recovery runbooks regularly with realistic restore-time targets."
    ],
    "correctIndex": 3,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
