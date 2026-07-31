const data = [
  {
    "id": "easy-sysadmin-05-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for service uptime hardening?",
    "options": [
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Patch in staged rings with rollback plans and verification gates.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility."
    ],
    "correctIndex": 2,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. "
  },
  {
    "id": "easy-sysadmin-05-q2",
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
  }
]

export default data
