const data = [
  {
    "id": "hard-sysadmin-02-q1",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Alert on user-facing SLO signals first, then supporting host metrics.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends."
    ],
    "correctIndex": 1,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-sysadmin-02-q2",
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
  }
]

export default data
