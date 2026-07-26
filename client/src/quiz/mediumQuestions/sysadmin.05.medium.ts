const data = [
  {
    "id": "medium-sysadmin-05-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for service uptime hardening?",
    "options": [
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Patch in staged rings with rollback plans and verification gates."
    ],
    "correctIndex": 3,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-05-q2",
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
  }
]

export default data
