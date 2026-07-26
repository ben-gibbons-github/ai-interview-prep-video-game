const data = [
  {
    "id": "hard-system-design-whiteboarding-06-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized."
    ],
    "correctIndex": 1,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-06-q2",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 2,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
