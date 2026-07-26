const data = [
  {
    "id": "easy-database-management-02-q1",
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
  },
  {
    "id": "easy-database-management-02-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for partitioning hot tables?",
    "options": [
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases."
    ],
    "correctIndex": 0,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
