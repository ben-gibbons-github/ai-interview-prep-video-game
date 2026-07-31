const data = [
  {
    "id": "easy-security-04-q1",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for audit logging coverage?",
    "options": [
      "Log only successful requests to reduce storage costs and noise.",
      "Use short-lived credentials and rotate secrets through managed workflows.",
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services."
    ],
    "correctIndex": 1,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. "
  },
  {
    "id": "easy-security-04-q2",
    "difficulty": "easy",
    "prompt": "Security: what is the best approach for credential management?",
    "options": [
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services.",
      "Enforce mutual authentication and explicit authorization at service boundaries.",
      "Assign broad admin roles to avoid permission-related deployment failures."
    ],
    "correctIndex": 2,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. "
  }
]

export default data
