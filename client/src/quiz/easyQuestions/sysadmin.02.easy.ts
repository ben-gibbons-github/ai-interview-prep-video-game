const data = [
  {
    "id": "easy-sysadmin-02-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends.",
      "Alert on user-facing SLO signals first, then supporting host metrics."
    ],
    "correctIndex": 3,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-sysadmin-02-q2",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for incident rollback procedure?",
    "options": [
      "Practice rollback and failover operations before incidents happen.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly."
    ],
    "correctIndex": 0,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
