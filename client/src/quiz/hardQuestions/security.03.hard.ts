const data = [
  {
    "id": "hard-security-03-q1",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for vulnerability remediation?",
    "options": [
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise.",
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Store long-lived keys in app configs so deployments are simpler to manage."
    ],
    "correctIndex": 2,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-security-03-q2",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for audit logging coverage?",
    "options": [
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services.",
      "Use short-lived credentials and rotate secrets through managed workflows."
    ],
    "correctIndex": 3,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
