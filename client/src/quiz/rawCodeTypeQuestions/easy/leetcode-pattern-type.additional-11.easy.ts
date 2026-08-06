import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  fullProblem: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Full Problem Statement: ${params.fullProblem}\n` +
    `Input/Output Requirements: ${params.io}\n` +
    `Constraints and Edge Cases: ${params.constraints}\n\n` +
    `Pattern Selection Question: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-merge-strings-alternately-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1768 - Merge Strings Alternately',
      fullProblem: 'You are given two strings word1 and word2. Build a merged string by taking characters in alternating order, starting with word1. If one string is longer, append its remaining suffix at the end.',
      io: 'Input: two strings. Output: one merged string preserving relative order within each source string.',
      constraints: 'Need linear time with predictable character appends; must handle unequal lengths cleanly.',
      objective: 'Which LeetCode pattern best models parallel forward traversal over two sequences with synchronized advancement?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Use two forward indices, append from each string while both remain, then append leftover tail.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-left-and-right-sum-differences-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2574 - Left and Right Sum Differences',
      fullProblem: 'For each index i in nums, compute absolute difference between sum of elements to the left of i and sum of elements to the right of i.',
      io: 'Input: integer array nums. Output: integer array answer where answer[i] = |leftSum(i) - rightSum(i)|.',
      constraints: 'Avoid O(n^2) repeated summations; each index should be processed in O(1) incremental work.',
      objective: 'Which pattern uses cumulative totals to derive left and right range sums efficiently?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Track total sum and running left sum; compute right as total-left-current for each position.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-summary-ranges-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 228 - Summary Ranges',
      fullProblem: 'Given a sorted unique integer array, compress consecutive runs into minimal range strings like a->b or single value when run length is one.',
      io: 'Input: sorted unique nums. Output: list of range strings covering all elements exactly once.',
      constraints: 'Need contiguous run detection in one pass while preserving order.',
      objective: 'Which pattern best captures scanning with a moving start pointer and extending end pointer of current run?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'One pointer marks run start and another advances while values stay consecutive, then emits a range.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-design-ordered-stream-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1656 - Design an Ordered Stream',
      fullProblem: 'Implement OrderedStream with insert(idKey, value). Values are inserted out of order, and each call should return the largest consecutive chunk starting at the current pointer.',
      io: 'Input: insertion operations by id. Output: list of values emitted in order when contiguous segment becomes available.',
      constraints: 'Must support random insertion order with O(1) average access to each slot and monotonic pointer advancement.',
      objective: 'Which pattern is best for direct index placement with presence marking and sequential release?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Store value at index idKey-1, mark filled slots, and move pointer forward while contiguous entries exist.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-most-frequent-number-following-key-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2190 - Most Frequent Number Following Key In an Array',
      fullProblem: 'Given nums and integer key, every time nums[i] equals key consider nums[i+1] a target. Return target value with highest frequency.',
      io: 'Input: integer array nums, integer key. Output: integer target with maximum counted appearances after key.',
      constraints: 'Need linear scan and compact frequency counting across target candidates.',
      objective: 'Which pattern best models count-table updates keyed by encountered values?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Scan once and update target frequency map whenever nums[i] == key, then take max-frequency key.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-transpose-matrix-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 867 - Transpose Matrix',
      fullProblem: 'Given matrix A of size m x n, return its transpose B of size n x m such that B[j][i] = A[i][j].',
      io: 'Input: 2D array matrix. Output: new 2D array with swapped row/column indices.',
      constraints: 'Need full matrix traversal with correct index remapping; rectangular matrices are allowed.',
      objective: 'Which pattern fits deterministic traversal and remapping over 2D structures?',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Traverse every matrix coordinate and write to transposed coordinate in output matrix.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-relative-sort-array-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1122 - Relative Sort Array',
      fullProblem: 'Sort arr1 so numbers present in arr2 appear first in arr2 order, then remaining numbers appear in ascending order.',
      io: 'Input: arrays arr1 and arr2 (arr2 elements distinct and included in arr1). Output: reordered arr1.',
      constraints: 'Need stable frequency accounting for arr2 priority plus sorted handling of residual values.',
      objective: 'Which pattern best supports compact counting and reconstruction by predefined key order?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count frequencies, emit arr2 keys in specified order, then emit leftover keys in ascending order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-n-ary-tree-preorder-traversal-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 589 - N-ary Tree Preorder Traversal',
      fullProblem: 'Given root of an n-ary tree, return preorder traversal values where each node is visited before all its children from left to right.',
      io: 'Input: n-ary tree root. Output: list of integers in preorder.',
      constraints: 'Tree may be deep and branch factors vary; traversal must preserve child ordering.',
      objective: 'Which pattern is appropriate for root-first recursive/iterative depth traversal?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Preorder DFS processes node first, then recursively iterates children in given order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-diet-plan-performance-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1176 - Diet Plan Performance',
      fullProblem: 'Given daily calories and window size k, compute score by comparing each k-day window sum against lower and upper bounds.',
      io: 'Input: calories array, k, lower, upper. Output: final score after all windows are evaluated.',
      constraints: 'Need rolling sum updates across overlapping fixed-size windows in linear time.',
      objective: 'Which pattern best captures constant-time window-shift updates for fixed-length segments?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain a rolling k-window sum by adding entering element and removing leaving element.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-gcd-of-array-additional-11',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1979 - Find Greatest Common Divisor of Array',
      fullProblem: 'Return greatest common divisor of the smallest and largest numbers in the array.',
      io: 'Input: integer array nums. Output: gcd(min(nums), max(nums)).',
      constraints: 'Need efficient gcd computation after identifying bounds.',
      objective: 'Which pattern uses remainder-based recursion/iteration to compute gcd optimally?',
    }),
    correctPattern: 'Euclidean Algorithm',
    correctExplanation: 'After finding min and max, repeatedly apply a % b until remainder becomes zero.',
  }),
]

export default data
