const data = [
  {
    "id": "medium-security-03-q1",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for vulnerability remediation?",
    "options": [
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage."
    ],
    "correctIndex": 1,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-security-03-q2",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for audit logging coverage?",
    "options": [
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Use short-lived credentials and rotate secrets through managed workflows.",
      "Rely on network location alone as proof of identity between services."
    ],
    "correctIndex": 2,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
