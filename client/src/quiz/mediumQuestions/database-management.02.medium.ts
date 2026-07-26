const data = [
  {
    "id": "medium-database-management-02-q1",
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
  },
  {
    "id": "medium-database-management-02-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for partitioning hot tables?",
    "options": [
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases."
    ],
    "correctIndex": 1,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
