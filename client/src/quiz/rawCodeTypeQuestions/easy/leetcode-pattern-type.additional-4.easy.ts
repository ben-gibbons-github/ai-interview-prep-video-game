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
    id: 'leetcode-pattern-type-easy-two-sum-sorted-ii-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 167 - Two Sum II (Sorted Input)',
      scenario: 'Given a 1-indexed sorted array, find two numbers whose sum equals target and return their positions.',
      io: 'Return [i, j] with i < j and exactly one valid answer.',
      constraints: 'Must use constant extra space and leverage sorted ordering.',
      objective: 'Identify the pattern that shrinks search space from both ends based on comparison to target.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Start left/right and move the side that makes sum closer to target.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-running-sum-array-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1480 - Running Sum of 1d Array',
      scenario: 'Transform nums so each index stores the sum of all values from 0..i.',
      io: 'Return resulting running-sum array.',
      constraints: 'Single pass expected; no complex data structures needed.',
      objective: 'Select the pattern centered on incrementally carrying a cumulative total.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Each output position reuses previously accumulated sum plus current value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-richest-customer-wealth-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1672 - Richest Customer Wealth',
      scenario: 'Each row is a customer and each column an account balance; find max row sum.',
      io: 'Return largest total wealth among customers.',
      constraints: 'Matrix is modest; straightforward nested scan is enough.',
      objective: 'Recognize matrix traversal pattern for aggregate evaluation over rows.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Core operation is deterministic traversal through matrix cells to compute row sums.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-next-greater-element-i-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 496 - Next Greater Element I',
      scenario: 'For each number in nums1, find first greater number to its right in nums2.',
      io: 'Return array of next-greater values or -1.',
      constraints: 'Need efficient right-side-greater lookup reused across queries.',
      objective: 'Choose stack-based monotonic structure that tracks unresolved smaller elements.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'A decreasing stack pops when a larger value appears, resolving next-greater answers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-valid-palindrome-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 125 - Valid Palindrome',
      scenario: 'Decide whether a string is palindrome after removing non-alphanumeric chars and ignoring case.',
      io: 'Return true if valid palindrome, otherwise false.',
      constraints: 'Should avoid constructing many intermediate strings.',
      objective: 'Identify pointer movement strategy that compares symmetric characters while skipping noise.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Compare from both ends, skipping invalid chars until pointers cross.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-isomorphic-strings-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 205 - Isomorphic Strings',
      scenario: 'Determine if characters from s can map one-to-one to t preserving order.',
      io: 'Return true for valid bijection mapping, false otherwise.',
      constraints: 'Need consistency and reverse-uniqueness checks.',
      objective: 'Choose compact indexing/hash marking pattern for one-pass mapping validation.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use hash/array maps to store forward and reverse mappings for consistency.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-contains-duplicate-ii-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 219 - Contains Duplicate II',
      scenario: 'Check if there are equal values whose indices differ by at most k.',
      io: 'Return true if such pair exists, else false.',
      constraints: 'Need to focus only on recent k-index neighborhood while scanning.',
      objective: 'Recognize fixed-width local region tracking as a window pattern.',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain a set/map for the last k elements while moving the window forward.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-minimum-depth-binary-tree-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 111 - Minimum Depth of Binary Tree',
      scenario: 'Find minimum number of nodes from root to nearest leaf.',
      io: 'Return minimum depth integer.',
      constraints: 'Shortest root-to-leaf path is desired, not total traversal order.',
      objective: 'Select traversal strategy that discovers nearest leaf in increasing depth order.',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'BFS returns first encountered leaf at the minimum depth level.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-the-difference-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 389 - Find the Difference',
      scenario: 'String t is formed by shuffling s and adding one extra char. Find that char.',
      io: 'Return the extra character.',
      constraints: 'Prefer constant-space arithmetic/bit trick style solution.',
      objective: 'Identify low-level bitwise cancellation pattern that isolates unmatched symbol.',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'XOR all characters from both strings; pairs cancel, leaving extra char.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-range-sum-query-immutable-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 303 - Range Sum Query (Immutable)',
      scenario: 'Preprocess array so repeated sumRange(left, right) queries are fast.',
      io: 'Implement NumArray with O(1) query after preprocessing.',
      constraints: 'Array immutable; many queries expected.',
      objective: 'Choose precomputation pattern that converts range sums into subtraction of cumulative values.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Prefix sums make each query answerable as prefix[r+1] - prefix[l].',
  }),
]

export default data
