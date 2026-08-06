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
    id: 'leetcode-pattern-type-easy-valid-palindrome',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 125 - Valid Palindrome',
      brief: 'Check whether a string is palindrome after removing non-alphanumeric chars and ignoring case.',
      io: 'Return boolean result.',
      constraints: 'Ignore punctuation/spacing and avoid building excessive temporary strings.',
      objective: 'Choose pointer strategy that compares ends while moving inward.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Compare normalized characters from both ends, skipping non-alphanumerics.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-remove-duplicates-sorted-array',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 26 - Remove Duplicates from Sorted Array',
      brief: 'Remove duplicates in-place from sorted array so each element appears once.',
      io: 'Return new length k; first k positions hold unique values.',
      constraints: 'In-place updates only; preserve sorted order among kept elements.',
      objective: 'Pick same-direction pointer compaction strategy.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A write pointer tracks next unique slot while scan pointer advances through array.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-min-size-subarray-sum',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 209 - Minimum Size Subarray Sum',
      brief: 'Find minimal length of contiguous subarray whose sum is at least target.',
      io: 'Return minimum length or 0 if no such subarray exists.',
      constraints: 'All values positive, enabling shrink/expand behavior.',
      objective: 'Choose variable-size window pattern with two moving boundaries.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'With positive numbers, expand until valid then shrink greedily to minimize length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-running-sum',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1480 - Running Sum of 1d Array',
      brief: 'Transform array so each index stores cumulative sum from start to that index.',
      io: 'Return transformed running-sum array.',
      constraints: 'Single pass expected; repeated summation per index is unnecessary.',
      objective: 'Pick cumulative aggregation pattern.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Each value depends on previous cumulative total plus current number.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-next-greater-element-i',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 496 - Next Greater Element I',
      brief: 'For each value in nums1, find next greater value to its right in nums2.',
      io: 'Return array of next greater values or -1 where missing.',
      constraints: 'Need faster approach than right-side scan for every query.',
      objective: 'Choose nearest-greater discovery pattern on linear data.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'A decreasing stack computes next greater relationships in linear time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-insert-interval',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 57 - Insert Interval',
      brief: 'Insert new interval into sorted non-overlapping intervals and merge as needed.',
      io: 'Return updated non-overlapping interval list.',
      constraints: 'Must preserve ordering and merge overlaps correctly.',
      objective: 'Choose interval merge processing pattern.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Scan intervals and merge intersections with the inserted range.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-diameter-binary-tree',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 543 - Diameter of Binary Tree',
      brief: 'Compute length of longest path between any two nodes in binary tree.',
      io: 'Return edge count of diameter path.',
      constraints: 'Path may or may not pass through root.',
      objective: 'Choose tree pattern that aggregates longest-through-node candidates.',
    }),
    correctPattern: 'Tree Diameter / Longest Path Pattern',
    correctExplanation: 'At each node, combine left and right depths to update global longest path.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-climbing-stairs',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 70 - Climbing Stairs',
      brief: 'Count distinct ways to reach nth stair using 1-step or 2-step moves.',
      io: 'Return integer count of ways.',
      constraints: 'Recurrence depends on previous two states.',
      objective: 'Choose linear recurrence DP pattern.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'ways[n] = ways[n-1] + ways[n-2] exactly matches Fibonacci-style DP.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-min-stack',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 155 - Min Stack',
      brief: 'Design stack supporting push/pop/top and retrieving current minimum in O(1).',
      io: 'Implement API with constant-time operations.',
      constraints: 'Minimum query must not scan full stack.',
      objective: 'Choose stack-adjacent monotonic metadata pattern.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Track running minima alongside values to answer min in O(1).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-grid-spiral-order',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 54 - Spiral Matrix',
      brief: 'Return all matrix elements in clockwise spiral traversal order.',
      io: 'Output flattened list of visited values.',
      constraints: 'Must peel matrix boundaries layer by layer without revisits.',
      objective: 'Choose matrix traversal pattern for spiral/layered walking.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Spiral traversal is a direct layer-boundary matrix traversal pattern.',
  }),
]

export default data
