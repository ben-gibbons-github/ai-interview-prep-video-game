const data = [
  {
    "id": "easy-system-design-whiteboarding-03-q1",
    "difficulty": "easy",
    "prompt": "System Design Whiteboarding: what is the best approach for component boundary definition?",
    "options": [
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations.",
      "Draw a final architecture immediately and backfill assumptions afterward."
    ],
    "correctIndex": 0,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. "
  },
  {
    "id": "easy-system-design-whiteboarding-03-q2",
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
  }
]

export default data
