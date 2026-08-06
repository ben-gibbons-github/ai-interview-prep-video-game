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
    id: 'leetcode-pattern-type-easy-search-insert-position',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 35 - Search Insert Position',
      brief: 'Find index of target in sorted array or index where it should be inserted.',
      io: 'Return insertion/search index.',
      constraints: 'Must run in O(log n).',
      objective: 'Choose boundary-finding binary-search variant.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Find left boundary where target should appear using binary search.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-search-2d-matrix',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 74 - Search a 2D Matrix',
      brief: 'Search target in matrix where rows are sorted and row starts exceed previous row ends.',
      io: 'Return true if target exists else false.',
      constraints: 'Treatable as flattened sorted structure.',
      objective: 'Choose binary-search matrix adaptation pattern.',
    }),
    correctPattern: 'Matrix Binary Search',
    correctExplanation: 'Binary search over virtual 1D indexing or row+col boundaries is optimal.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-invert-binary-tree',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 226 - Invert Binary Tree',
      brief: 'Swap left and right children for all nodes in binary tree.',
      io: 'Return root of inverted tree.',
      constraints: 'Every node must be visited once.',
      objective: 'Choose top-down DFS traversal pattern.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order/top-down recursion naturally swaps children then recurses.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-tree-max-depth',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 104 - Maximum Depth of Binary Tree',
      brief: 'Find maximum root-to-leaf depth.',
      io: 'Return integer depth.',
      constraints: 'Depth is derived from child subtree depths.',
      objective: 'Choose bottom-up tree aggregation traversal.',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Post-order returns child depths and combines them at parent.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-flood-fill',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 733 - Flood Fill',
      brief: 'Recolor connected region in image starting from source pixel.',
      io: 'Return updated image grid.',
      constraints: '4-direction connectivity and visited control are required.',
      objective: 'Choose graph component traversal for implicit grid nodes.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS from start pixel recolors all connected same-color neighbors.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-keys-and-rooms',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 841 - Keys and Rooms',
      brief: 'Determine whether all rooms can be visited using discovered keys.',
      io: 'Return true if every room becomes reachable.',
      constraints: 'Graph reachability over directed keys relation.',
      objective: 'Choose traversal pattern for connectivity exploration.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS/BFS explores reachable rooms from room 0 via key edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-missing-number',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 268 - Missing Number',
      brief: 'Given n distinct numbers in [0,n], find the one missing number.',
      io: 'Return missing integer.',
      constraints: 'Linear time and constant space expected.',
      objective: 'Choose algebraic accumulation pattern over ranges.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compute expected vs actual sum to recover missing value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-meeting-rooms',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 252 - Meeting Rooms',
      brief: 'Determine if a person can attend all meetings given intervals.',
      io: 'Return true if no overlaps exist.',
      constraints: 'Need overlap detection after ordering.',
      objective: 'Choose interval overlap processing pattern.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Sort by start and check adjacent overlap conditions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-all-anagrams',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 438 - Find All Anagrams in a String',
      brief: 'Find all start indices where an anagram of pattern p appears in s.',
      io: 'Return list of valid start indices.',
      constraints: 'Pattern length fixed; repeated recounting is expensive.',
      objective: 'Choose fixed-size window frequency pattern.',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain window counts of size |p| and compare to pattern signature.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-peak-element',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 162 - Find Peak Element',
      brief: 'Find an index where element is greater than neighbors.',
      io: 'Return any valid peak index.',
      constraints: 'Need O(log n) solution.',
      objective: 'Choose binary decision pattern on monotonic slope behavior.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Slope-based binary decisions converge to a peak in logarithmic time.',
  }),
]

export default data
