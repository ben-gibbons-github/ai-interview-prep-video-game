const data = [
  {
    "id": "medium-database-management-03-q1",
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
  },
  {
    "id": "medium-database-management-03-q2",
    "difficulty": "medium",
    "prompt": "Database Management: what is the best approach for connection pool sizing?",
    "options": [
      "Increase pool size until lock waits disappear completely under peak load.",
      "Add indexes to every column to guarantee better performance in all cases.",
      "Profile workload first, then choose indexes that match dominant query patterns.",
      "Run all workloads at serializable isolation regardless of throughput impact."
    ],
    "correctIndex": 2,
    "correctExplanation": "Profile workload first, then choose indexes that match dominant query patterns. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
