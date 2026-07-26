const data = [
  {
    "id": "hard-sysadmin-04-q1",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible."
    ],
    "correctIndex": 3,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-sysadmin-04-q2",
    "difficulty": "hard",
    "prompt": "Sysadmin: what is the best approach for service uptime hardening?",
    "options": [
      "Patch in staged rings with rollback plans and verification gates.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Alert only on CPU percentage and ignore latency or error rate signals.",
      "Keep manual one-off fixes undocumented to preserve deployment flexibility."
    ],
    "correctIndex": 0,
    "correctExplanation": "Patch in staged rings with rollback plans and verification gates. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
