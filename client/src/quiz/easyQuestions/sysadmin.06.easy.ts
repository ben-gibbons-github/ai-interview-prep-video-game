const data = [
  {
    "id": "easy-sysadmin-06-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Alert on user-facing SLO signals first, then supporting host metrics."
    ],
    "correctIndex": 3,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. "
  },
  {
    "id": "easy-sysadmin-06-q2",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Practice rollback and failover operations before incidents happen.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends."
    ],
    "correctIndex": 0,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. "
  }
]

export default data
