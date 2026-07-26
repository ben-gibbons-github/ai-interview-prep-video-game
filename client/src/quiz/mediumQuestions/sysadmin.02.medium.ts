const data = [
  {
    "id": "medium-sysadmin-02-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Alert on user-facing SLO signals first, then supporting host metrics.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends."
    ],
    "correctIndex": 0,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-02-q2",
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
  }
]

export default data
