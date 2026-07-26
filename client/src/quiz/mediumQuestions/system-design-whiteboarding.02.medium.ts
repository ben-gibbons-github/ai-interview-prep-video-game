const data = [
  {
    "id": "medium-system-design-whiteboarding-02-q1",
    "difficulty": "medium",
    "prompt": "System Design Whiteboarding: what is the best approach for failure-mode walkthrough?",
    "options": [
      "Discuss failure scenarios and mitigation strategies before implementation details.",
      "Treat all storage tiers as interchangeable for consistency and latency.",
      "Ignore operational tooling until after core components are finalized.",
      "Optimize only for peak throughput and defer reliability considerations."
    ],
    "correctIndex": 0,
    "correctExplanation": "Discuss failure scenarios and mitigation strategies before implementation details. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-system-design-whiteboarding-02-q2",
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
  }
]

export default data
