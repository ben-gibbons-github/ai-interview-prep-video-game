const data = [
  {
    "id": "hard-algorithmic-complexity-b-01-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Document both worst-case and expected-case complexity when behavior diverges.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean."
    ],
    "correctIndex": 0,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-b-01-q2",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for tradeoffs between O(N) and O(N log N)?",
    "options": [
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Prefer simpler linear passes when they satisfy latency and memory targets.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Assume tail latency cannot be affected by algorithmic complexity."
    ],
    "correctIndex": 1,
    "correctExplanation": "Prefer simpler linear passes when they satisfy latency and memory targets. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
