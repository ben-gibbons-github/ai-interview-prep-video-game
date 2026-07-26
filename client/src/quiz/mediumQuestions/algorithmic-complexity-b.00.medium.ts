const data = [
  {
    "id": "medium-algorithmic-complexity-b-00-q1",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for complexity notation interpretation?",
    "options": [
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Evaluate growth rates with realistic N ranges and workload distributions.",
      "Treat O(N log N) as always slower than O(N) in practical systems."
    ],
    "correctIndex": 2,
    "correctExplanation": "Evaluate growth rates with realistic N ranges and workload distributions. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  },
  {
    "id": "medium-algorithmic-complexity-b-00-q2",
    "difficulty": "medium",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Optimize for best-case input because real traffic is usually clean.",
      "Document both worst-case and expected-case complexity when behavior diverges."
    ],
    "correctIndex": 3,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. For medium difficulty, choose the option that addresses the main tradeoff while remaining practical to operate."
  }
]

export default data
