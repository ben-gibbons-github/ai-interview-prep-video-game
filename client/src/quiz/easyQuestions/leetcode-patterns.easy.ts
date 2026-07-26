const data = [
  {
    "id": "easy-when-is-two-pointers-usually-the-right-pattern-1",
    "difficulty": "easy",
    "prompt": "When is two-pointers usually the right pattern?",
    "options": [
      "When scanning ordered data from both ends efficiently",
      "When graph shortest paths need weighted edge handling",
      "When exhaustive recursion over all subsets is required",
      "When hash collisions must be cryptographically minimized"
    ],
    "correctIndex": 0,
    "correctExplanation": "Two-pointers excels on sorted or structured linear inputs where moving boundaries can reduce time complexity compared with nested loops."
  },
  {
    "id": "easy-sliding-window-is-best-used-for-2",
    "difficulty": "easy",
    "prompt": "Sliding window is best used for:",
    "options": [
      "Contiguous subarray or substring constraints",
      "Topological sorting in directed acyclic graphs",
      "Balancing binary search trees after each insertion",
      "Arbitrary non-contiguous subset optimization problems"
    ],
    "correctIndex": 0,
    "correctExplanation": "Sliding window maintains a moving range and incremental state, making contiguous constraint problems far more efficient than recomputation."
  },
  {
    "id": "easy-a-monotonic-stack-often-helps-with-3",
    "difficulty": "easy",
    "prompt": "A monotonic stack often helps with:",
    "options": [
      "Next greater/smaller element style problems",
      "Immutable range sum queries with segment merging",
      "Bitmask enumeration over exponential state spaces",
      "Weighted shortest paths with negative cycle detection"
    ],
    "correctIndex": 0,
    "correctExplanation": "Monotonic stacks preserve ordered candidates so nearest dominance relationships can be computed in linear time."
  },
  {
    "id": "easy-fast-and-slow-pointers-are-commonly-used-to-4",
    "difficulty": "easy",
    "prompt": "Fast and slow pointers are commonly used to:",
    "options": [
      "Detect cycles and find middle nodes in linked structures",
      "Perform balanced partitioning in knapsack variants",
      "Compute all-pairs shortest paths in dense graphs",
      "Build suffix arrays for substring ranking tasks"
    ],
    "correctIndex": 0,
    "correctExplanation": "Differential pointer speeds expose structural properties like cycles and middle points with constant extra space."
  },
  {
    "id": "easy-prefix-sums-are-most-useful-when-you-need-to-5",
    "difficulty": "easy",
    "prompt": "Prefix sums are most useful when you need to:",
    "options": [
      "Answer repeated range-sum queries quickly",
      "Compute strongly connected components in graphs",
      "Sort arbitrary strings lexicographically in place",
      "Track disjoint set membership with path compression"
    ],
    "correctIndex": 0,
    "correctExplanation": "Prefix sums trade preprocessing for constant-time range aggregation, making repeated interval queries efficient."
  },
  {
    "id": "easy-binary-search-on-answer-is-appropriate-when-6",
    "difficulty": "easy",
    "prompt": "Binary search on answer is appropriate when:",
    "options": [
      "Feasibility is monotonic across candidate values",
      "Constraint checks require exponential brute force",
      "Optimal solutions depend on random tie-breaking",
      "All candidate states are independent and unordered"
    ],
    "correctIndex": 0,
    "correctExplanation": "If you can test a candidate and results change monotonically, binary search on the decision boundary can reduce complexity drastically."
  }
]

export default data
