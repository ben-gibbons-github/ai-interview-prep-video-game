const data = [
  {
    "id": "hard-when-is-two-pointers-usually-the-right-pattern-1",
    "difficulty": "hard",
    "prompt": "When is two-pointers usually the right pattern?",
    "options": [
      "When scanning ordered data from both ends efficiently",
      "When graph shortest paths need weighted edge handling",
      "When exhaustive recursion over all subsets is required",
      "When binary trees need postorder structural mutation",
      "When dynamic programming state transitions are dense",
      "When hash collisions must be cryptographically minimized"
    ],
    "correctIndex": 0,
    "correctExplanation": "Two-pointers excels on sorted or structured linear inputs where moving boundaries can reduce time complexity compared with nested loops."
  },
  {
    "id": "hard-sliding-window-is-best-used-for-2",
    "difficulty": "hard",
    "prompt": "Sliding window is best used for:",
    "options": [
      "Contiguous subarray or substring constraints",
      "Topological sorting in directed acyclic graphs",
      "Backtracking over permutation generation tasks",
      "Union-find connectivity checks across components",
      "Balancing binary search trees after each insertion",
      "Matrix diagonal traversal with random access jumps"
    ],
    "correctIndex": 0,
    "correctExplanation": "Sliding window maintains a moving range and incremental state, making contiguous constraint problems far more efficient than recomputation."
  },
  {
    "id": "hard-a-monotonic-stack-often-helps-with-3",
    "difficulty": "hard",
    "prompt": "A monotonic stack often helps with:",
    "options": [
      "Next greater/smaller element style problems",
      "Stable sorting of linked lists in linear time",
      "String edit distance dynamic programming tables",
      "Immutable range sum queries with segment merging",
      "Distributed lock acquisition fairness guarantees",
      "Bitmask enumeration over exponential state spaces"
    ],
    "correctIndex": 0,
    "correctExplanation": "Monotonic stacks preserve ordered candidates so nearest dominance relationships can be computed in linear time."
  },
  {
    "id": "hard-fast-and-slow-pointers-are-commonly-used-to-4",
    "difficulty": "hard",
    "prompt": "Fast and slow pointers are commonly used to:",
    "options": [
      "Detect cycles and find middle nodes in linked structures",
      "Enforce mutual exclusion in multithreaded schedulers",
      "Perform balanced partitioning in knapsack variants",
      "Apply divide-and-conquer on sorted matrix columns",
      "Compute all-pairs shortest paths in dense graphs",
      "Build suffix arrays for substring ranking tasks"
    ],
    "correctIndex": 0,
    "correctExplanation": "Differential pointer speeds expose structural properties like cycles and middle points with constant extra space."
  },
  {
    "id": "hard-prefix-sums-are-most-useful-when-you-need-to-5",
    "difficulty": "hard",
    "prompt": "Prefix sums are most useful when you need to:",
    "options": [
      "Answer repeated range-sum queries quickly",
      "Compute strongly connected components in graphs",
      "Sort arbitrary strings lexicographically in place",
      "Apply greedy matching in weighted bipartite cases",
      "Rotate matrices layer by layer in constant memory",
      "Perform exact pattern matching with backreferences"
    ],
    "correctIndex": 0,
    "correctExplanation": "Prefix sums trade preprocessing for constant-time range aggregation, making repeated interval queries efficient."
  },
  {
    "id": "hard-binary-search-on-answer-is-appropriate-when-6",
    "difficulty": "hard",
    "prompt": "Binary search on answer is appropriate when:",
    "options": [
      "Feasibility is monotonic across candidate values",
      "Constraint checks require exponential brute force",
      "Optimal solutions depend on random tie-breaking",
      "No predicate can distinguish valid from invalid",
      "All candidate states are independent and unordered",
      "The objective function is purely non-deterministic"
    ],
    "correctIndex": 0,
    "correctExplanation": "If you can test a candidate and results change monotonically, binary search on the decision boundary can reduce complexity drastically."
  }
]

export default data
