const data = [
  {
    "id": "medium-security-01-q1",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Enforce mutual authentication and explicit authorization at service boundaries."
    ],
    "correctIndex": 3,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-security-01-q2",
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
  }
]

export default data
