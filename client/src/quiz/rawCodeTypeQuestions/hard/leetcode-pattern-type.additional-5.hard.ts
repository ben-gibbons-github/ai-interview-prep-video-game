import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  scenario: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem Scenario: ${params.scenario}\n` +
    `Input/Output Expectations: ${params.io}\n` +
    `Operational Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-frequency-stack-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 895 - Maximum Frequency Stack',
      scenario: 'Design stack-like structure where pop returns most frequent element, tie by recency.',
      io: 'Implement push and pop operations.',
      constraints: 'Must support many updates with near O(1) amortized behavior.',
      objective: 'Choose layered frequency-indexed stack pattern with hash-backed group buckets.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Frequency map plus stacks-per-frequency uses hash-indexed grouping strategy.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-median-from-data-stream-v3',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 295 - Find Median from Data Stream (Heap-Oriented)',
      scenario: 'Process incoming integers and return current median after arbitrary insertions.',
      io: 'Implement addNum and findMedian APIs.',
      constraints: 'Online updates require balanced representation of two halves.',
      objective: 'Identify dual-heap balancing pattern.',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Maintain lower max-heap and upper min-heap with size balance invariant.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-race-car-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 818 - Race Car',
      scenario: 'Car starts at position 0 speed 1; commands A or R. Reach target with minimum commands.',
      io: 'Return minimum command count.',
      constraints: 'State includes position and speed; transitions are unweighted commands.',
      objective: 'Choose shortest-step exploration pattern over implicit state graph.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over (position, speed) states finds minimum command sequence length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-recover-bst-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 99 - Recover Binary Search Tree',
      scenario: 'Two BST nodes are swapped by mistake; recover tree without changing structure.',
      io: 'Mutate tree to valid BST.',
      constraints: 'Follow-up asks for constant extra space solution.',
      objective: 'Identify in-order traversal variant that avoids recursion stack.',
    }),
    correctPattern: 'Morris In-Order Traversal',
    correctExplanation: 'Morris in-order detects inversions with O(1) extra space via threading.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-cost-valid-path-grid-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1368 - Minimum Cost to Make at Least One Valid Path in a Grid',
      scenario: 'Grid arrows imply free direction; changing arrow costs 1. Find min cost path to end.',
      io: 'Return minimal total modification cost.',
      constraints: 'Edge costs are 0 or 1 over grid graph transitions.',
      objective: 'Choose shortest-path pattern robust to weighted transitions.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Weighted shortest path (or 0-1 BFS variant) captures minimal modification cost.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-subarray-at-least-k-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 862 - Shortest Subarray with Sum at Least K',
      scenario: 'Given possibly negative numbers, find shortest non-empty subarray with sum >= k.',
      io: 'Return shortest length or -1 if none.',
      constraints: 'Negative values break standard positive-only sliding window assumptions.',
      objective: 'Identify prefix-sum plus monotonic candidate queue optimization pattern.',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Deque maintains increasing prefix sums for optimal shortest qualifying intervals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-edit-distance-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 72 - Edit Distance',
      scenario: 'Compute minimum operations to transform word1 into word2 using insert/delete/replace.',
      io: 'Return minimal edit count.',
      constraints: 'Local choices interact globally across both string prefixes.',
      objective: 'Select two-sequence dynamic programming pattern with row/column transitions.',
    }),
    correctPattern: 'Longest Common Subsequence (LCS) Pattern',
    correctExplanation: 'Edit-distance DP is a close relative of LCS-style 2D prefix-state transitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-sum-of-distances-tree-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 834 - Sum of Distances in Tree',
      scenario: 'For each node in tree, compute sum of distances to all other nodes.',
      io: 'Return array of distance sums per node.',
      constraints: 'Need rerooting transitions after postorder aggregation.',
      objective: 'Choose tree-structured dynamic programming pattern.',
    }),
    correctPattern: 'DP on Trees',
    correctExplanation: 'Postorder + reroot DP computes subtree counts and distance sums efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-count-smaller-after-self-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 315 - Count of Smaller Numbers After Self',
      scenario: 'For each index, count smaller numbers to its right.',
      io: 'Return count array aligned to input indices.',
      constraints: 'Need efficient dynamic prefix-frequency querying over value ranks.',
      objective: 'Identify indexed cumulative-frequency tree pattern.',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Fenwick tree supports point updates and prefix count queries in O(log n).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-negative-weights-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode-style Single-Source Shortest Path with Possible Negative Edges',
      scenario: 'Find shortest distances from source in directed graph that may contain negative-weight edges but no negative cycles reachable from source.',
      io: 'Return shortest path distances to all vertices.',
      constraints: 'Algorithms assuming non-negative edges are invalid here.',
      objective: 'Choose relaxation-based shortest-path pattern designed for negative edge support.',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Bellman-Ford repeatedly relaxes edges and handles negative weights correctly.',
  }),
]

export default data
