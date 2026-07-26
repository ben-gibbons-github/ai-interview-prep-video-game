const data = [
  {
    "id": "hard-system-design-whiteboarding-03-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for component boundary definition?",
    "options": [
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations.",
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Draw a final architecture immediately and backfill assumptions afterward."
    ],
    "correctIndex": 2,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-03-q2",
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
  }
]

export default data
