const data = [
  {
    "id": "medium-security-05-q1",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for credential management?",
    "options": [
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Enforce mutual authentication and explicit authorization at service boundaries."
    ],
    "correctIndex": 3,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-security-05-q2",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Grant minimal permissions and periodically remove unused access paths.",
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences."
    ],
    "correctIndex": 0,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
