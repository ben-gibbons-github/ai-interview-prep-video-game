import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  brief: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem: ${params.brief}\n` +
    `Input/Output: ${params.io}\n` +
    `Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-validate-bst',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 98 - Validate Binary Search Tree',
      brief: 'Check whether a binary tree satisfies strict BST ordering constraints.',
      io: 'Return true for valid BST, false otherwise.',
      constraints: 'Ordering must hold across whole subtree ranges, not just parent-child pair.',
      objective: 'Choose traversal pattern naturally exposing sorted BST order.',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal must produce strictly increasing sequence for valid BST.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lca-binary-tree',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 236 - Lowest Common Ancestor of a Binary Tree',
      brief: 'Find lowest node that has both target nodes in its subtree.',
      io: 'Return LCA node reference.',
      constraints: 'Targets can be in different branches; parent pointers unavailable.',
      objective: 'Choose bottom-up subtree-return traversal pattern.',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Post-order propagates found targets upward and detects merge point.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-employee-free-time',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 759 - Employee Free Time',
      brief: 'Given each employee schedule intervals, find common free intervals.',
      io: 'Return sorted finite free intervals across all employees.',
      constraints: 'Need event ordering across many interval lists.',
      objective: 'Choose chronological boundary-event interval pattern.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Process interval starts/ends globally to find gaps where active count is zero.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-longest-consecutive-sequence',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 128 - Longest Consecutive Sequence',
      brief: 'Find longest run of consecutive integers in unsorted array.',
      io: 'Return maximum run length.',
      constraints: 'Expected O(n) style approach using structure for fast lookups.',
      objective: 'Choose set/hash-driven expansion strategy from sequence starts.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'This family relies on hash-style presence checks and start-of-run expansion logic.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-gas-station',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 134 - Gas Station',
      brief: 'Determine if there is a starting station to complete circular route.',
      io: 'Return start index or -1 if impossible.',
      constraints: 'Local deficits can invalidate preceding starts; linear greedy pass expected.',
      objective: 'Choose one-pass same-direction pointer/scan compaction style pattern.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Linear scan resets candidate start after deficit, effectively advancing a moving start boundary.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-task-scheduler',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 621 - Task Scheduler',
      brief: 'Schedule tasks with cooldown n to minimize total intervals.',
      io: 'Return least intervals needed to execute all tasks.',
      constraints: 'High-frequency tasks dominate idle-slot structure.',
      objective: 'Choose top-frequency extraction pattern for repeated highest-priority selection.',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Frequency-centric formulation is the core; schedule length derives from max-frequency buckets.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-redundant-connection',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 684 - Redundant Connection',
      brief: 'Given edges of a tree plus one extra edge, return edge creating cycle.',
      io: 'Return redundant edge pair.',
      constraints: 'Edges processed incrementally; need fast cycle detection in undirected graph.',
      objective: 'Choose dynamic connectivity structure for online union checks.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find quickly detects when two endpoints are already connected.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-product-subarray',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 152 - Maximum Product Subarray',
      brief: 'Find contiguous subarray with largest product.',
      io: 'Return maximal product value.',
      constraints: 'Negative values can flip min/max role between steps.',
      objective: 'Choose linear dynamic running-extrema pattern akin subarray optimization.',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'Variant of Kadane tracks running max/min products per index to handle sign flips.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-coin-change-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 518 - Coin Change II',
      brief: 'Count number of combinations to make amount using unlimited coins.',
      io: 'Return combination count.',
      constraints: 'Order does not matter; repeated coin use allowed.',
      objective: 'Choose repeated-choice knapsack counting DP pattern.',
    }),
    correctPattern: 'Unbounded Knapsack Pattern',
    correctExplanation: 'Unlimited coin usage maps directly to unbounded knapsack transitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-minimum-window-substring',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 76 - Minimum Window Substring',
      brief: 'Find smallest substring in s containing all chars from t with multiplicity.',
      io: 'Return minimum valid window or empty string.',
      constraints: 'Need dynamic grow/shrink with frequency validity checks.',
      objective: 'Choose variable-size sliding window pattern with deficit tracking.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Expand to satisfy requirements, then shrink to minimize while preserving validity.',
  }),
]

export default data
