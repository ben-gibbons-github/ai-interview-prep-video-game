const data = [
  {
    "id": "easy-security-05-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for credential management?",
    "options": [
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services.",
      "Enforce mutual authentication and explicit authorization at service boundaries.",
      "Assign broad admin roles to avoid permission-related deployment failures."
    ],
    "correctIndex": 2,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-security-05-q2",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences.",
      "Grant minimal permissions and periodically remove unused access paths."
    ],
    "correctIndex": 3,
    "correctExplanation": "Grant minimal permissions and periodically remove unused access paths. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
