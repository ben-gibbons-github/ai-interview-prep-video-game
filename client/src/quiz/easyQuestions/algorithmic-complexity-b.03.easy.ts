const data = [
  {
    "id": "easy-algorithmic-complexity-b-03-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for throughput modeling at scale?",
    "options": [
      "Use complexity to forecast scaling risk before production traffic grows.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Use worst-case complexity only for academic discussion, not architecture decisions."
    ],
    "correctIndex": 0,
    "correctExplanation": "Use complexity to forecast scaling risk before production traffic grows. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-b-03-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for latency tail impact from superlinear work?",
    "options": [
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Evaluate growth rates with realistic N ranges and workload distributions.",
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict."
    ],
    "correctIndex": 1,
    "correctExplanation": "Evaluate growth rates with realistic N ranges and workload distributions. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
