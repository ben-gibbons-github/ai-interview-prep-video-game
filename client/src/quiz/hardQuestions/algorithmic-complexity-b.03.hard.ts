const data = [
  {
    "id": "hard-algorithmic-complexity-b-03-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for throughput modeling at scale?",
    "options": [
      "Optimize for best-case input because real traffic is usually clean.",
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Use complexity to forecast scaling risk before production traffic grows.",
      "Use worst-case complexity only for academic discussion, not architecture decisions."
    ],
    "correctIndex": 2,
    "correctExplanation": "Use complexity to forecast scaling risk before production traffic grows. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-b-03-q2",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for latency tail impact from superlinear work?",
    "options": [
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Evaluate growth rates with realistic N ranges and workload distributions."
    ],
    "correctIndex": 3,
    "correctExplanation": "Evaluate growth rates with realistic N ranges and workload distributions. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
