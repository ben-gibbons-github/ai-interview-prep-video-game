const data = [
  {
    "id": "hard-security-06-q1",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Rely on network location alone as proof of identity between services.",
      "Grant minimal permissions and periodically remove unused access paths.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences."
    ],
    "correctIndex": 1,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-security-06-q2",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for least privilege design?",
    "options": [
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Prioritize vulnerabilities by exploitability and blast radius.",
      "Log only successful requests to reduce storage costs and noise."
    ],
    "correctIndex": 2,
    "correctExplanation": "Prioritize vulnerabilities by exploitability and blast radius. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
