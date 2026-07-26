const data = [
  {
    "id": "medium-sysadmin-00-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for service uptime hardening?",
    "options": [
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility."
    ],
    "correctIndex": 2,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-00-q2",
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
  }
]

export default data
