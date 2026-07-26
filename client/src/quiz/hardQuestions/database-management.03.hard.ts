const data = [
  {
    "id": "hard-database-management-03-q1",
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
  },
  {
    "id": "hard-database-management-03-q2",
    "difficulty": "hard",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Run all workloads at serializable isolation regardless of throughput impact.",
      "Profile workload first, then choose indexes that match dominant query patterns."
    ],
    "correctIndex": 3,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
