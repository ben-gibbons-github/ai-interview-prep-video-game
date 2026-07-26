const data = [
  {
    "id": "medium-system-design-whiteboarding-01-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Surface assumptions early and revisit them as the design evolves."
    ],
    "correctIndex": 3,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-01-q2",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 0,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
