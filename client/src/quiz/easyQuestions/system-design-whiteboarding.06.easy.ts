const data = [
  {
    "id": "easy-system-design-whiteboarding-06-q1",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Discuss failure scenarios and mitigation strategies before implementation details."
    ],
    "correctIndex": 3,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-system-design-whiteboarding-06-q2",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 0,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
