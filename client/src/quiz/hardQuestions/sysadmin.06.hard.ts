const data = [
  {
    "id": "hard-sysadmin-06-q1",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Alert on user-facing SLO signals first, then supporting host metrics.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics."
    ],
    "correctIndex": 1,
    "correctExplanation": "Alert on user-facing SLO signals first, then supporting host metrics. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-sysadmin-06-q2",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for resource saturation alerting?",
    "options": [
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Practice rollback and failover operations before incidents happen.",
      "Size systems only from current-day utilization and ignore trends."
    ],
    "correctIndex": 2,
    "correctExplanation": "Practice rollback and failover operations before incidents happen. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
