const data = [
  {
    "id": "easy-security-01-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Enforce mutual authentication and explicit authorization at service boundaries.",
      "Patch only critical CVEs and ignore dependency update cadences."
    ],
    "correctIndex": 2,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. "
  },
  {
    "id": "easy-security-01-q2",
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
  }
]

export default data
