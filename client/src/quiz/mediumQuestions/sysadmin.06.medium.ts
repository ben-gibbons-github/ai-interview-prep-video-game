const data = [
  {
    "id": "medium-sysadmin-06-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert on user-facing SLO signals first, then supporting host metrics.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics."
    ],
    "correctIndex": 0,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-06-q2",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Practice rollback and failover operations before incidents happen.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Size systems only from current-day utilization and ignore trends."
    ],
    "correctIndex": 1,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
