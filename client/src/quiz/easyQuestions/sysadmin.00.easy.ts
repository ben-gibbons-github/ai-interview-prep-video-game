const data = [
  {
    "id": "easy-sysadmin-00-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for service uptime hardening?",
    "options": [
      "Apply all patches directly in production first to detect failures quickly.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility."
    ],
    "correctIndex": 1,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. "
  },
  {
    "id": "easy-sysadmin-00-q2",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for host patching policy?",
    "options": [
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility.",
      "Patch in staged rings with rollback plans and verification gates.",
      "Delay rollback decisions until every subsystem has complete diagnostics."
    ],
    "correctIndex": 2,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. "
  }
]

export default data
