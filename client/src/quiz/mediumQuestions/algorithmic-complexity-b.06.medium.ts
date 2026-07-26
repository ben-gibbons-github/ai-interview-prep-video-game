const data = [
  {
    "id": "medium-algorithmic-complexity-b-06-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Prefer simpler linear passes when they satisfy latency and memory targets.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean."
    ],
    "correctIndex": 0,
    "correctExplanation": "Prefer simpler linear passes when they satisfy latency and memory targets. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-b-06-q2",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for tradeoffs between O(N) and O(N log N)?",
    "options": [
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Use complexity to forecast scaling risk before production traffic grows.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Assume tail latency cannot be affected by algorithmic complexity."
    ],
    "correctIndex": 1,
    "correctExplanation": "Use complexity to forecast scaling risk before production traffic grows. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
