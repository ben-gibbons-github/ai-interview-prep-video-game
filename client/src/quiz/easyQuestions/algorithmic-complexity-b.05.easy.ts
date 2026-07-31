const data = [
  {
    "id": "easy-algorithmic-complexity-b-05-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for complexity notation interpretation?",
    "options": [
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Document both worst-case and expected-case complexity when behavior diverges.",
      "Treat O(N log N) as always slower than O(N) in practical systems."
    ],
    "correctIndex": 2,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. "
  },
  {
    "id": "easy-algorithmic-complexity-b-05-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Prefer simpler linear passes when they satisfy latency and memory targets."
    ],
    "correctIndex": 3,
    "correctExplanation": "Prefer simpler linear passes when they satisfy latency and memory targets. "
  }
]

export default data
