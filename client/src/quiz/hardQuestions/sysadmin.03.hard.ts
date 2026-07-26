const data = [
  {
    "id": "hard-sysadmin-03-q1",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for incident rollback procedure?",
    "options": [
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends.",
      "Practice rollback and failover operations before incidents happen.",
      "Apply all patches directly in production first to detect failures quickly."
    ],
    "correctIndex": 2,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-sysadmin-03-q2",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible."
    ],
    "correctIndex": 3,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
