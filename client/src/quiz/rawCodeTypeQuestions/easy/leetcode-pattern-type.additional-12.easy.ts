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
    id: 'leetcode-pattern-type-easy-find-the-highest-altitude-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1732 - Find the Highest Altitude',
      fullProblem: 'A biker starts at altitude 0 and gain[i] represents net altitude change between points i and i+1. Return the highest altitude reached at any point.',
      io: 'Input: gain array. Output: maximum altitude value over cumulative path.',
      constraints: 'Need linear accumulation with running maximum tracking.',
      objective: 'Which cumulative pattern incrementally builds prefix totals and tracks best seen value?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Maintain running altitude prefix sum and update global maximum during one pass.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-replace-elements-with-greatest-element-on-right-side-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1299 - Replace Elements with Greatest Element on Right Side',
      fullProblem: 'For each index, replace value with maximum element among values strictly to its right; last element becomes -1.',
      io: 'Input: nums array. Output: transformed array after right-max replacement.',
      constraints: 'Need O(n) right-to-left pass instead of nested scanning.',
      objective: 'Which pattern leverages suffix-oriented running aggregate from right to left?',
    }),
    correctPattern: 'Suffix Sum / Product',
    correctExplanation: 'Track running right-side maximum (a suffix aggregate) while iterating backward.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-maximum-average-subarray-i-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 643 - Maximum Average Subarray I',
      fullProblem: 'Find contiguous subarray of length k with maximum average and return that average.',
      io: 'Input: nums and k. Output: maximum average value.',
      constraints: 'Fixed-size windows with overlap require O(1) rolling updates.',
      objective: 'Which pattern is ideal for fixed-length contiguous segment optimization?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain rolling sum of k elements and update max sum while shifting one index at a time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-matrix-diagonal-sum-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1572 - Matrix Diagonal Sum',
      fullProblem: 'Given square matrix, sum primary and secondary diagonals without double-counting center element when n is odd.',
      io: 'Input: square matrix. Output: total diagonal sum.',
      constraints: 'Need deterministic index traversal with center overlap handling.',
      objective: 'Which matrix-focused traversal pattern naturally computes diagonal aggregates?',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Iterate row index i and accumulate mat[i][i] and mat[i][n-1-i], subtracting center once if needed.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-flipping-an-image-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 832 - Flipping an Image',
      fullProblem: 'For each row in binary matrix, reverse row order and then invert every bit (0<->1).',
      io: 'Input: binary matrix. Output: transformed matrix after horizontal flip and bit inversion.',
      constraints: 'Need in-place row manipulation with controlled swaps and bit toggles.',
      objective: 'Which pattern best models deterministic row-wise matrix operations and index mapping?',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Traverse each row with mirrored indices, swap/transform entries, and handle middle element for odd widths.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-count-negative-numbers-in-a-sorted-matrix-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1351 - Count Negative Numbers in a Sorted Matrix',
      fullProblem: 'Rows and columns are sorted in non-increasing order. Count how many matrix elements are negative.',
      io: 'Input: sorted matrix. Output: count of negative entries.',
      constraints: 'Need better than scanning all entries when sorted structure allows faster boundary detection.',
      objective: 'Which pattern applies boundary-finding search inside ordered rows/columns?',
    }),
    correctPattern: 'Matrix Binary Search',
    correctExplanation: 'Binary search each row for first negative index or use staircase traversal exploiting sorted monotonicity.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-backspace-string-compare-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 844 - Backspace String Compare',
      fullProblem: 'Given strings s and t where # means backspace, determine whether they are equal after processing typing effects.',
      io: 'Input: strings s and t. Output: true if resulting strings are equal, else false.',
      constraints: 'Need efficient simulation of typed text with deletion semantics.',
      objective: 'Which pattern naturally models push/pop text construction under backspace operations?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use stack-like buffers to apply characters and backspaces, then compare final sequences.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-minimum-time-to-type-word-using-special-typewriter-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1974 - Minimum Time to Type Word Using Special Typewriter',
      fullProblem: 'A circular typewriter has lowercase letters. Pointer starts at a. Rotating one step costs 1, typing current letter costs 1. Compute min total time to type word.',
      io: 'Input: word string. Output: minimum time steps to type entire word.',
      constraints: 'Need shortest rotation direction each transition on cyclic alphabet.',
      objective: 'Which pattern compares mirrored directional distances with two-end style reasoning?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'For each char transition, evaluate clockwise vs counterclockwise distance and choose smaller path.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-the-middle-index-in-array-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1991 - Find the Middle Index in Array',
      fullProblem: 'Find leftmost index where sum of elements on left equals sum of elements on right.',
      io: 'Input: nums array. Output: middle index or -1 if none exists.',
      constraints: 'Need linear pass with constant extra memory.',
      objective: 'Which cumulative-sum pattern computes both-side sums from running totals?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Maintain running left sum and derive right sum from total-left-current at each index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-all-k-distant-indices-in-an-array-additional-12',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2200 - Find All K-Distant Indices in an Array',
      fullProblem: 'Return all indices i such that there exists some index j with nums[j] == key and |i-j| <= k.',
      io: 'Input: nums, key, k. Output: sorted list of qualifying indices.',
      constraints: 'Need avoid adding duplicate indices while expanding key neighborhoods.',
      objective: 'Which pattern uses forward interval union/scan logic around discovered anchor positions?',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Treat each key occurrence as interval [j-k, j+k], merge overlaps, and output covered indices once.',
  }),
]

export default data
