const data = [
  {
    "id": "hard-system-design-whiteboarding-00-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for design interview framing?",
    "options": [
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Define requirements, estimate scale, then justify architecture against bottlenecks."
    ],
    "correctIndex": 3,
    "correctExplanation": "Define requirements, estimate scale, then justify architecture against bottlenecks. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-00-q2",
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
  }
]

export default data
