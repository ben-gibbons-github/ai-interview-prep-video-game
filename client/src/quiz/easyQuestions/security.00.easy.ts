const data = [
  {
    "id": "easy-security-00-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for credential management?",
    "options": [
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Use short-lived credentials and rotate secrets through managed workflows.",
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures."
    ],
    "correctIndex": 1,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. "
  },
  {
    "id": "easy-security-00-q2",
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
  }
]

export default data
