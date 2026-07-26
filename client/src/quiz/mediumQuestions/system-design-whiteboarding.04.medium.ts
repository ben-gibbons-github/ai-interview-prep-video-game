const data = [
  {
    "id": "medium-system-design-whiteboarding-04-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for tradeoff communication to panel?",
    "options": [
      "Optimize only for peak throughput and defer reliability considerations.",
      "Draw a final architecture immediately and backfill assumptions afterward.",
      "Define requirements, estimate scale, then justify architecture against bottlenecks.",
      "Skip traffic estimates because autoscaling can handle unknown demand."
    ],
    "correctIndex": 2,
    "correctExplanation": "Define requirements, estimate scale, then justify architecture against bottlenecks. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-04-q2",
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
  }
]

export default data
