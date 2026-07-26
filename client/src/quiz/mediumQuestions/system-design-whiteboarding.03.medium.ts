const data = [
  {
    "id": "medium-system-design-whiteboarding-03-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for component boundary definition?",
    "options": [
      "Ignore operational tooling until after core components are finalized.",
      "Explain tradeoffs explicitly across consistency, latency, cost, and operability.",
      "Optimize only for peak throughput and defer reliability considerations.",
      "Draw a final architecture immediately and backfill assumptions afterward."
    ],
    "correctIndex": 1,
    "correctExplanation": "Explain tradeoffs explicitly across consistency, latency, cost, and operability. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-03-q2",
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
  }
]

export default data
