const data = [
  {
    "id": "medium-system-design-whiteboarding-05-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for design interview framing?",
    "options": [
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Surface assumptions early and revisit them as the design evolves."
    ],
    "correctIndex": 3,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-05-q2",
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
  }
]

export default data
