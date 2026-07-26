const data = [
  {
    "id": "easy-algorithmic-complexity-b-02-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for tradeoffs between O(N) and O(N log N)?",
    "options": [
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Assume tail latency cannot be affected by algorithmic complexity.",
      "Prefer simpler linear passes when they satisfy latency and memory targets."
    ],
    "correctIndex": 3,
    "correctExplanation": "Prefer simpler linear passes when they satisfy latency and memory targets. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-b-02-q2",
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
  }
]

export default data
