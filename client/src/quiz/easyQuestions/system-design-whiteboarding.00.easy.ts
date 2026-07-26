const data = [
  {
    "id": "easy-system-design-whiteboarding-00-q1",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for design interview framing?",
    "options": [
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Define requirements, estimate scale, then justify architecture against bottlenecks.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency."
    ],
    "correctIndex": 1,
    "correctExplanation": "Define requirements, estimate scale, then justify architecture against bottlenecks. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-system-design-whiteboarding-00-q2",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for capacity estimation under constraints?",
    "options": [
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Surface assumptions early and revisit them as the design evolves.",
      "Ignore operational tooling until after core components are finalized."
    ],
    "correctIndex": 2,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
