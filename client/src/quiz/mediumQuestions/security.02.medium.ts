const data = [
  {
    "id": "medium-security-02-q1",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for least privilege design?",
    "options": [
      "Grant minimal permissions and periodically remove unused access paths.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise."
    ],
    "correctIndex": 0,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-security-02-q2",
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
  }
]

export default data
