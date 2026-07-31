const data = [
  {
    "id": "easy-database-management-06-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for transaction isolation choice?",
    "options": [
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Test recovery runbooks regularly with realistic restore-time targets."
    ],
    "correctIndex": 3,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. "
  },
  {
    "id": "easy-database-management-06-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for backup and restore planning?",
    "options": [
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load."
    ],
    "correctIndex": 0,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. "
  }
]

export default data
