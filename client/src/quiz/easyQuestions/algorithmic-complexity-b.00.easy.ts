const data = [
  {
    "id": "easy-algorithmic-complexity-b-00-q1",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for complexity notation interpretation?",
    "options": [
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Evaluate growth rates with realistic N ranges and workload distributions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems."
    ],
    "correctIndex": 1,
    "correctExplanation": "Evaluate growth rates with realistic N ranges and workload distributions. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  },
  {
    "id": "easy-algorithmic-complexity-b-00-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for best-case versus worst-case behavior?",
    "options": [
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Treat O(N log N) as always slower than O(N) in practical systems.",
      "Document both worst-case and expected-case complexity when behavior diverges.",
      "Optimize for best-case input because real traffic is usually clean."
    ],
    "correctIndex": 2,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
