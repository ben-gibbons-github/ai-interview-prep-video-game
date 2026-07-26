const data = [
  {
    "id": "easy-algorithmic-complexity-b-04-q1",
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
  },
  {
    "id": "easy-algorithmic-complexity-b-04-q2",
    "difficulty": "easy",
    "prompt": "Algorithmic Complexity O(N) II: what is the best approach for complexity notation interpretation?",
    "options": [
      "Use worst-case complexity only for academic discussion, not architecture decisions.",
      "Ignore constant factors entirely when N is small but response times are strict.",
      "Document both worst-case and expected-case complexity when behavior diverges.",
      "Treat O(N log N) as always slower than O(N) in practical systems."
    ],
    "correctIndex": 2,
    "correctExplanation": "Document both worst-case and expected-case complexity when behavior diverges. For easy difficulty, choose the option that most directly solves the immediate problem with minimal unnecessary complexity."
  }
]

export default data
