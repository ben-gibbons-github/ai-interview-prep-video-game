const data = [
  {
    "id": "easy-system-design-whiteboarding-01-q1",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Surface assumptions early and revisit them as the design evolves.",
      "Ignore operational tooling until after core components are finalized."
    ],
    "correctIndex": 2,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. "
  },
  {
    "id": "easy-system-design-whiteboarding-01-q2",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations.",
      "Discuss failure scenarios and mitigation strategies before implementation details."
    ],
    "correctIndex": 3,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. "
  }
]

export default data
