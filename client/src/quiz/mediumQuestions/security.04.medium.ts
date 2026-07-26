const data = [
  {
    "id": "medium-security-04-q1",
    "difficulty": "medium",
    "prompt": "Security: what is the best approach for audit logging coverage?",
    "options": [
      "Log only successful requests to reduce storage costs and noise.",
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Use short-lived credentials and rotate secrets through managed workflows.",
      "Rely on network location alone as proof of identity between services."
    ],
    "correctIndex": 2,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-security-04-q2",
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
  }
]

export default data
