const data = [
  {
    "id": "hard-system-design-whiteboarding-04-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for tradeoff communication to panel?",
    "options": [
      "Optimize only for peak throughput and defer reliability considerations.",
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Define requirements, estimate scale, then justify architecture against bottlenecks."
    ],
    "correctIndex": 3,
    "correctExplanation": "Define requirements, estimate scale, then justify architecture against bottlenecks. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-04-q2",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for design interview framing?",
    "options": [
      "Surface assumptions early and revisit them as the design evolves.",
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Skip traffic estimates because autoscaling can handle unknown demand.",
      "Treat all storage tiers as interchangeable for consistency and latency."
    ],
    "correctIndex": 0,
    "correctExplanation": "Surface assumptions early and revisit them as the design evolves. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
