const data = [
  {
    "id": "medium-sysadmin-04-q1",
    "difficulty": "medium",
    "prompt": "Sysadmin: what is the best approach for capacity trend forecasting?",
    "options": [
      "Size systems only from current-day utilization and ignore trends.",
      "Apply all patches directly in production first to detect failures quickly.",
      "Automate repeatable operations and keep changes small, reviewed, and reversible.",
      "Alert only on CPU percentage and ignore latency or error rate signals."
    ],
    "correctIndex": 2,
    "correctExplanation": "Automate repeatable operations and keep changes small, reviewed, and reversible. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-sysadmin-04-q2",
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
  }
]

export default data
