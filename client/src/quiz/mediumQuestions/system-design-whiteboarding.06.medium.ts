const data = [
  {
    "id": "medium-system-design-whiteboarding-06-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized."
    ],
    "correctIndex": 0,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-06-q2",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 1,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
