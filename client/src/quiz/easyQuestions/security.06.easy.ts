const data = [
  {
    "id": "easy-security-06-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Grant minimal permissions and periodically remove unused access paths."
    ],
    "correctIndex": 3,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. "
  },
  {
    "id": "easy-security-06-q2",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for least privilege design?",
    "options": [
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Log only successful requests to reduce storage costs and noise."
    ],
    "correctIndex": 0,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. "
  }
]

export default data
