const data = [
  {
    "id": "easy-sysadmin-04-q1",
    "difficulty": "easy",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals."
    ],
    "correctIndex": 1,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. "
  },
  {
    "id": "easy-sysadmin-04-q2",
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
  }
]

export default data
