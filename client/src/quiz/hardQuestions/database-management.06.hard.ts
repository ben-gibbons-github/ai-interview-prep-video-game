const data = [
  {
    "id": "hard-database-management-06-q1",
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
  },
  {
    "id": "hard-database-management-06-q2",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for backup and restore planning?",
    "options": [
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Increase pool size until lock waits disappear completely under peak load."
    ],
    "correctIndex": 2,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
