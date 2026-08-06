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
    id: 'leetcode-pattern-type-medium-snapshot-array-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1146 - Snapshot Array',
      scenario: 'Implement versioned array supporting set(index,val), snap(), and get(index,snap_id) queries.',
      io: 'Return snap id on snap calls and historical values on get calls.',
      constraints: 'Need efficient historical lookup for specific index across increasing snapshot ids.',
      objective: 'Choose boundary binary search over per-index change history keyed by snapshot id.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Store (snapId,value) history per index and binary-search rightmost snapId <= query.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-closed-islands-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1254 - Number of Closed Islands',
      scenario: 'Count land components (0-cells) fully surrounded by water and not touching matrix boundary.',
      io: 'Return count of closed islands.',
      constraints: 'Need component traversal and boundary-touch detection for each region.',
      objective: 'Identify DFS/BFS connected-component traversal with region property aggregation.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Flood-fill each land component and track whether traversal touches boundary to classify closure.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-sort-characters-by-frequency-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 451 - Sort Characters By Frequency',
      scenario: 'Reorder characters in string so higher-frequency characters appear first.',
      io: 'Return frequency-sorted output string.',
      constraints: 'Need efficient frequency counting plus ordering by descending counts.',
      objective: 'Choose top-frequency extraction pattern after frequency aggregation.',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Build char frequency map and extract entries by descending frequency using bucket/heap/sort strategy.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-diagonal-traverse-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 498 - Diagonal Traverse',
      scenario: 'Traverse matrix in zig-zag diagonal order alternating upward-right and downward-left movement.',
      io: 'Return flattened traversal sequence.',
      constraints: 'Need precise boundary handling when direction hits matrix edges.',
      objective: 'Identify matrix directional traversal pattern with controlled direction flips.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Simulate diagonal direction and bounce at boundaries to continue full matrix coverage.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-longest-string-chain-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1048 - Longest String Chain',
      scenario: 'Find longest chain where each next word can be formed by inserting one character into previous word.',
      io: 'Return maximum chain length.',
      constraints: 'Need ordering by word length and predecessor transition reuse across many words.',
      objective: 'Choose one-dimensional DP over sorted states with predecessor relation checks.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Sort by length and compute best chain ending at each word from valid predecessor deletions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-product-of-word-lengths-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 318 - Maximum Product of Word Lengths',
      scenario: 'Find max product of lengths of two words that share no common letters.',
      io: 'Return maximum length product.',
      constraints: 'Need fast disjoint-letter checks over many word pairs.',
      objective: 'Identify bitmask-encoding strategy for character sets and efficient overlap testing.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Represent each word letters as 26-bit mask; disjoint words satisfy (maskA & maskB) == 0.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-single-threaded-cpu-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1834 - Single-Threaded CPU',
      scenario: 'Given tasks with enqueue and processing times, simulate CPU selecting available task with smallest processing time then index tie-break.',
      io: 'Return task execution order by original indices.',
      constraints: 'Need time-ordered availability feed and min-selection among current candidates.',
      objective: 'Choose event sweep plus heap scheduling pattern for timeline processing.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sort tasks by enqueue time, sweep current time forward, and use min-heap for available task choice.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-shortest-path-in-grid-with-obstacles-elimination-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1293 - Shortest Path in a Grid with Obstacles Elimination',
      scenario: 'Find shortest path from top-left to bottom-right where you may eliminate up to k obstacles.',
      io: 'Return minimum steps, or -1 if impossible.',
      constraints: 'State must include remaining eliminations, not just position.',
      objective: 'Identify BFS over expanded state space with dominance pruning.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over (row,col,remainingK) gives shortest steps while tracking resource state.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-kth-smallest-element-in-sorted-matrix-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 378 - Kth Smallest Element in a Sorted Matrix',
      scenario: 'Matrix rows and columns are sorted ascending; find the k-th smallest value.',
      io: 'Return k-th smallest matrix element.',
      constraints: 'Need better than flatten-and-sort when matrix is large.',
      objective: 'Choose monotonic value-space binary search with counting predicate over matrix.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search value range and count elements <= mid using sorted-row/col properties.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-shortest-way-to-form-string-crazy-10',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1055 - Shortest Way to Form String',
      scenario: 'Using repeated subsequences of source, form target with minimum number of subsequence passes.',
      io: 'Return minimum passes required, or -1 if impossible.',
      constraints: 'Need efficient next-occurrence navigation through source for repeated matching.',
      objective: 'Identify forward pointer scan pattern with subsequence restarts.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Walk target with pointer while scanning source; restart source scan when a pass ends.',
  }),
]

export default data
