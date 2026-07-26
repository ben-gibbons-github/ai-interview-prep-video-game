const data = [
  {
    "id": "medium-sysadmin-03-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for incident rollback procedure?",
    "options": [
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Practice rollback and failover operations before incidents happen.",
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly."
    ],
    "correctIndex": 1,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-03-q2",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Alert only on CPU percentage and ignore latency or error rate signals."
    ],
    "correctIndex": 2,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
