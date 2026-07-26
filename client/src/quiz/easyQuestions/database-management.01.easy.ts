const data = [
  {
    "id": "easy-database-management-01-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Choose isolation level based on anomaly tolerance and critical invariants.",
      "Scale reads by randomly splitting tables without key-level traffic analysis."
    ],
    "correctIndex": 2,
    "correctExplanation": "Choose isolation level based on anomaly tolerance and critical invariants. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-database-management-01-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for backup and restore planning?",
    "options": [
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load.",
      "Test recovery runbooks regularly with realistic restore-time targets."
    ],
    "correctIndex": 3,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
