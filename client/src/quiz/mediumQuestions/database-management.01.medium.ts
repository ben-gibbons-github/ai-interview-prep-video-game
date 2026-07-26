const data = [
  {
    "id": "medium-database-management-01-q1",
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
  },
  {
    "id": "medium-database-management-01-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for backup and restore planning?",
    "options": [
      "Test recovery runbooks regularly with realistic restore-time targets.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load."
    ],
    "correctIndex": 0,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
