const data = [
  {
    "id": "easy-system-design-whiteboarding-04-q1",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for tradeoff communication to panel?",
    "options": [
      "Optimize only for peak throughput and defer reliability considerations.",
      "Define requirements, estimate scale, then justify architecture against bottlenecks.",
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand."
    ],
    "correctIndex": 1,
    "correctExplanation": "Define requirements, estimate scale, then justify architecture against bottlenecks. "
  },
  {
    "id": "easy-system-design-whiteboarding-04-q2",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for design interview framing?",
    "options": [
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Surface assumptions early and revisit them as the design evolves.",
      "Treat all storage tiers as interchangeable for consistency and latency."
    ],
    "correctIndex": 2,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. "
  }
]

export default data
