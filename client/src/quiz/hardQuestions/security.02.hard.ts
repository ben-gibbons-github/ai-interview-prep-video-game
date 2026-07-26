const data = [
  {
    "id": "hard-security-02-q1",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for least privilege design?",
    "options": [
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Grant minimal permissions and periodically remove unused access paths.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise."
    ],
    "correctIndex": 1,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-security-02-q2",
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
  }
]

export default data
