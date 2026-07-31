const data = [
  {
    "id": "easy-security-02-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for least privilege design?",
    "options": [
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise.",
      "Grant minimal permissions and periodically remove unused access paths."
    ],
    "correctIndex": 3,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. "
  },
  {
    "id": "easy-security-02-q2",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for vulnerability remediation?",
    "options": [
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage."
    ],
    "correctIndex": 0,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. "
  }
]

export default data
