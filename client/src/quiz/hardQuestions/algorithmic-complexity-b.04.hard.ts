const data = [
  {
    "id": "hard-algorithmic-complexity-b-04-q1",
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
  },
  {
    "id": "hard-algorithmic-complexity-b-04-q2",
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
  }
]

export default data
