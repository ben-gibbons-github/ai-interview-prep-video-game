const data = [
  {
    "id": "hard-system-design-whiteboarding-02-q1",
    "difficulty": "hard",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 1,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-system-design-whiteboarding-02-q2",
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
  }
]

export default data
