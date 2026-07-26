const data = [
  {
    "id": "medium-sysadmin-01-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Delay rollback decisions until every subsystem has complete diagnostics.",
      "Patch in staged rings with rollback plans and verification gates."
    ],
    "correctIndex": 3,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-01-q2",
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
  }
]

export default data
