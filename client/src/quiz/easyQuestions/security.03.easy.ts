const data = [
  {
    "id": "easy-security-03-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for vulnerability remediation?",
    "options": [
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage."
    ],
    "correctIndex": 0,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-security-03-q2",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for audit logging coverage?",
    "options": [
      "Log only successful requests to reduce storage costs and noise.",
      "Use short-lived credentials and rotate secrets through managed workflows.",
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services."
    ],
    "correctIndex": 1,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
