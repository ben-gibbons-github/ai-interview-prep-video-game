const data = [
  {
    "id": "easy-database-management-03-q1",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for partitioning hot tables?",
    "options": [
      "Partition by access patterns and enforce key distribution to reduce hotspots.",
      "Scale reads by randomly splitting tables without key-level traffic analysis.",
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases."
    ],
    "correctIndex": 0,
    "correctExplanation": "Partition by access patterns and enforce key distribution to reduce hotspots. "
  },
  {
    "id": "easy-database-management-03-q2",
    "difficulty": "easy",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact."
    ],
    "correctIndex": 1,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. "
  }
]

export default data
