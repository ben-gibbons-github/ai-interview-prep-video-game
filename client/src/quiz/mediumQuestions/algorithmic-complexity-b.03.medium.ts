const data = [
  {
    "id": "medium-algorithmic-complexity-b-03-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for throughput modeling at scale?",
    "options": [
      "Optimize for best-case input because real traffic is usually clean.",
      "Use complexity to forecast scaling risk before production traffic grows.",
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Use worst-case complexity only for academic discussion, not architecture decisions."
    ],
    "correctIndex": 1,
    "correctExplanation": "Use complexity to forecast scaling risk before production traffic grows. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-b-03-q2",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for latency tail impact from superlinear work?",
    "options": [
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Evaluate growth rates with realistic N ranges and workload distributions.",
      "Ignore constant factors entirely when N is small but response times are strict."
    ],
    "correctIndex": 2,
    "correctExplanation": "Evaluate growth rates with realistic N ranges and workload distributions. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
