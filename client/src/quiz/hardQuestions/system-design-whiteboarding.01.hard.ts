const data = [
  {
    "id": "hard-system-design-whiteboarding-01-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Surface assumptions early and revisit them as the design evolves.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized."
    ],
    "correctIndex": 0,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-01-q2",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 1,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
