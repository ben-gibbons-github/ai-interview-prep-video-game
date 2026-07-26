const data = [
  {
    "id": "hard-algorithmic-complexity-b-05-q1",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for complexity notation interpretation?",
    "options": [
      "Document both worst-case and expected-case complexity when behavior diverges.",
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems."
    ],
    "correctIndex": 0,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  },
  {
    "id": "hard-algorithmic-complexity-b-05-q2",
    "difficulty": "hard",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Prefer simpler linear passes when they satisfy latency and memory targets.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean."
    ],
    "correctIndex": 1,
    "correctExplanation": "Prefer simpler linear passes when they satisfy latency and memory targets. For hard difficulty, choose the option that best handles scale, failure behavior, and long-term operational tradeoffs."
  }
]

export default data
