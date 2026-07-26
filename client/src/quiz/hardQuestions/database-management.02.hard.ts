const data = [
  {
    "id": "hard-database-management-02-q1",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for backup and restore planning?",
    "options": [
      "Skip backup drills because snapshots always restore exactly as expected.",
      "Test recovery runbooks regularly with realistic restore-time targets.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load."
    ],
    "correctIndex": 1,
    "correctExplanation": "Test recovery runbooks regularly with realistic restore-time targets. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-database-management-02-q2",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for partitioning hot tables?",
    "options": [
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load.",
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Add indexes to every column to guarantee better performance in all cases."
    ],
    "correctIndex": 2,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
