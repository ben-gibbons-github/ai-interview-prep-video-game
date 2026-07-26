const data = [
  {
    "id": "easy-sysadmin-01-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Patch in staged rings with rollback plans and verification gates.",
      "Delay rollback decisions until every subsystem has complete diagnostics."
    ],
    "correctIndex": 2,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-sysadmin-01-q2",
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
  }
]

export default data
