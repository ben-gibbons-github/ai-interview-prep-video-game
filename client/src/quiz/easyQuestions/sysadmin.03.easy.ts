const data = [
  {
    "id": "easy-sysadmin-03-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for incident rollback procedure?",
    "options": [
      "Practice rollback and failover operations before incidents happen.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly."
    ],
    "correctIndex": 0,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. "
  },
  {
    "id": "easy-sysadmin-03-q2",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals."
    ],
    "correctIndex": 1,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. "
  }
]

export default data
