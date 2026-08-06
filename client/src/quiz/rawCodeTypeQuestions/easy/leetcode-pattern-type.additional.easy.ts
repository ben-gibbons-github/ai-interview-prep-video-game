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
    id: 'leetcode-pattern-type-easy-first-missing-positive',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 41 - First Missing Positive',
      brief: 'Find the smallest missing positive integer from an unsorted array.',
      io: 'Return one integer answer.',
      constraints: 'Target O(n) time and O(1) extra space.',
      objective: 'Choose the in-place index-placement pattern used for 1..n domains.',
    }),
    correctPattern: 'Cyclic Sort',
    correctExplanation: 'Cyclic placement puts each value v at index v-1, exposing the first mismatch as the answer.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-sliding-window-maximum',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 239 - Sliding Window Maximum',
      brief: 'Return the maximum value in every contiguous window of size k.',
      io: 'Output array length n-k+1 of per-window maxima.',
      constraints: 'Need near O(n) performance; repeated scans per window are too slow.',
      objective: 'Pick the pattern that maintains a decreasing structure for window extrema.',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'A deque stores useful indices in decreasing order to get each window maximum in O(1) amortized.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-meeting-rooms-ii',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 253 - Meeting Rooms II',
      brief: 'Given meeting intervals, compute minimum rooms required to host all meetings.',
      io: 'Return one integer room count.',
      constraints: 'Starts/ends overlap in time; order by time progression matters.',
      objective: 'Choose the interval-event pattern that processes starts and ends chronologically.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sorting start/end events and tracking active meetings yields peak concurrent usage.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-rotate-image',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 48 - Rotate Image',
      brief: 'Rotate an n x n matrix by 90 degrees clockwise in place.',
      io: 'Mutate matrix directly; no separate matrix allocation.',
      constraints: 'In-place transformation with index/layer manipulation.',
      objective: 'Pick the matrix-layer traversal and transform pattern.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Rotate Image is a classic matrix transform using transpose+reverse or layer swaps.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-merge-two-sorted-lists',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 21 - Merge Two Sorted Lists',
      brief: 'Merge two sorted linked lists into one sorted list.',
      io: 'Return merged list head.',
      constraints: 'Must handle empty lists and head changes cleanly.',
      objective: 'Choose the boundary-safe linked-list construction pattern.',
    }),
    correctPattern: 'Dummy Head Technique',
    correctExplanation: 'Dummy head simplifies pointer wiring and avoids special-casing the first insertion.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-search',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 704 - Binary Search',
      brief: 'Search for target in sorted array and return index if found.',
      io: 'Return target index or -1.',
      constraints: 'O(log n) expected.',
      objective: 'Pick the standard midpoint halving search pattern.',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Classic binary search repeatedly halves search interval in a sorted sequence.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-shortest-path-binary-matrix',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1091 - Shortest Path in Binary Matrix',
      brief: 'Find shortest path from top-left to bottom-right in unweighted grid with blocked cells.',
      io: 'Return shortest path length or -1 if unreachable.',
      constraints: 'All edges equal weight; nearest-layer expansion is optimal.',
      objective: 'Choose the unweighted shortest-path graph traversal pattern.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS explores by distance layers, guaranteeing first reach is shortest in unweighted graphs.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-rotting-oranges',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 994 - Rotting Oranges',
      brief: 'Each minute, rotten oranges infect adjacent fresh oranges. Find minutes until no fresh remain.',
      io: 'Return elapsed minutes or -1 if impossible.',
      constraints: 'Many starting rotten sources spread simultaneously.',
      objective: 'Pick traversal pattern that begins from multiple initial frontier nodes.',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Initialize queue with all rotten cells and expand simultaneously minute by minute.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-top-k-frequent-elements',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 347 - Top K Frequent Elements',
      brief: 'Return the k values that appear most frequently in the array.',
      io: 'Output any order list of k frequent values.',
      constraints: 'Need better than full sort over all unique values for large inputs.',
      objective: 'Choose the frequency+selection pattern dedicated to top-k by count.',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Frequency map paired with heap/bucket strategy efficiently extracts k most frequent entries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-median-stream',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 295 - Find Median from Data Stream',
      brief: 'Design structure supporting addNum and findMedian operations online.',
      io: 'After each insertion, median query should be efficient.',
      constraints: 'Stream is dynamic; repeated full sorting is too expensive.',
      objective: 'Pick balancing pattern that maintains lower/upper halves of values.',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'A max-heap for lower half and min-heap for upper half yields O(log n) insert and O(1) median.',
  }),
]

export default data
