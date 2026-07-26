const data = [
  {
    "id": "hard-security-00-q1",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for credential management?",
    "options": [
      "Store long-lived keys in app configs so deployments are simpler to manage.",
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Use short-lived credentials and rotate secrets through managed workflows."
    ],
    "correctIndex": 3,
    "correctExplanation": "Use short-lived credentials and rotate secrets through managed workflows. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-security-00-q2",
    "difficulty": "hard",
    "prompt": "Security: what is the best approach for service-to-service auth?",
    "options": [
      "Enforce mutual authentication and explicit authorization at service boundaries.",
      "Rely on network location alone as proof of identity between services.",
      "Assign broad admin roles to avoid permission-related deployment failures.",
      "Patch only critical CVEs and ignore dependency update cadences."
    ],
    "correctIndex": 0,
    "correctExplanation": "Enforce mutual authentication and explicit authorization at service boundaries. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
