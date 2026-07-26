const data = [
  {
    "id": "hard-sysadmin-01-q1",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Patch in staged rings with rollback plans and verification gates.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics."
    ],
    "correctIndex": 0,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-sysadmin-01-q2",
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
  }
]

export default data
