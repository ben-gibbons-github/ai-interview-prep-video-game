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
    id: 'leetcode-pattern-type-easy-lc125-valid-palindrome-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 125 - Valid Palindrome',
      fullProblem: 'Given a string s, determine if it is a palindrome after converting uppercase letters to lowercase and removing all non-alphanumeric characters.',
      io: 'Input: string s. Output: true if normalized string reads same forward and backward, else false.',
      constraints: 'Need to skip punctuation and spaces while comparing symmetric characters efficiently in one pass.',
      objective: 'Which pattern compares mirrored positions from both ends while conditionally skipping characters?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Use left/right pointers, skip non-alphanumerics, lowercase compare, and move inward until mismatch or completion.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc283-move-zeroes-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 283 - Move Zeroes',
      fullProblem: 'Move all zeros in an array to the end while preserving relative order of non-zero elements, in-place.',
      io: 'Input: nums array. Output: same array mutated with all zeros moved to the back.',
      constraints: 'Must avoid extra array and minimize writes while keeping stable order.',
      objective: 'Which same-direction pointer pattern compacts desired elements and fills remainder?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A fast pointer scans all values, while a slow pointer tracks next non-zero placement index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc121-best-time-to-buy-and-sell-stock-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 121 - Best Time to Buy and Sell Stock',
      fullProblem: 'Given daily stock prices, pick one day to buy and a later day to sell for maximum profit. Return 0 if no profit possible.',
      io: 'Input: prices array. Output: maximum single-transaction profit.',
      constraints: 'Need linear pass tracking best buy-so-far and best profit-so-far.',
      objective: 'Which cumulative-extrema scan pattern best captures this single-pass optimization?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Track running minimum price and update max profit using current price minus that minimum.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc26-remove-duplicates-from-sorted-array-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 26 - Remove Duplicates from Sorted Array',
      fullProblem: 'Given sorted array nums, remove duplicates in-place so each unique element appears once. Return number of unique elements.',
      io: 'Input: sorted integer array. Output: integer k where first k positions are unique values.',
      constraints: 'Must do in-place with O(1) extra memory by reusing same array.',
      objective: 'Which fast/slow pointer pattern overwrites duplicates while retaining sorted unique prefix?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Slow pointer marks end of unique prefix; fast pointer discovers next distinct value to copy forward.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc118-pascals-triangle-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: "LeetCode 118 - Pascal's Triangle",
      fullProblem: 'Generate the first numRows of Pascal\'s Triangle where each interior element is sum of two values above it.',
      io: 'Input: numRows. Output: nested list of rows.',
      constraints: 'Each row depends directly on previous row structure.',
      objective: 'Which simple row-by-row dynamic construction pattern naturally models this dependency?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Each new row is built from prior row adjacent sums, a classic iterative DP dependency.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc136-single-number-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 136 - Single Number',
      fullProblem: 'Every element appears twice except one. Find the element that appears exactly once.',
      io: 'Input: integer array. Output: the unique singleton value.',
      constraints: 'Target O(n) time and O(1) extra space preferred.',
      objective: 'Which bitwise cancellation pattern isolates the unique value directly?',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'XOR of all numbers cancels duplicates (a^a=0), leaving only the single number.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc338-counting-bits-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 338 - Counting Bits',
      fullProblem: 'For every integer i in [0, n], compute number of 1 bits in binary representation and return array of counts.',
      io: 'Input: n. Output: array ans where ans[i] is popcount(i).',
      constraints: 'Need avoid calling expensive popcount independently for each number if possible.',
      objective: 'Which iterative DP recurrence over previous results is typically used for this sequence?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Use recurrence like dp[i] = dp[i >> 1] + (i & 1) or dp[i] = dp[i & (i-1)] + 1.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc69-sqrtx-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 69 - Sqrt(x)',
      fullProblem: 'Given non-negative integer x, return floor(sqrt(x)) without using built-in exponent operators.',
      io: 'Input: integer x. Output: integer floor square root.',
      constraints: 'Need efficient search over ordered integer space of possible roots.',
      objective: 'Which ordered-search pattern repeatedly halves candidate interval to find boundary root?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search m where m^2 <= x and (m+1)^2 > x yields integer floor sqrt.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc733-flood-fill-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 733 - Flood Fill',
      fullProblem: 'From starting pixel in image matrix, recolor all 4-directionally connected pixels of same original color.',
      io: 'Input: image grid, start row/col, new color. Output: recolored grid.',
      constraints: 'Need avoid revisiting and remain within grid boundaries while exploring region.',
      objective: 'Which graph traversal pattern explores connected component in a grid from one start cell?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS over 4-neighbor cells with same source color recolors the entire connected region.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc20-valid-parentheses-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 20 - Valid Parentheses',
      fullProblem: 'Given string of (), {}, [], determine if every opening bracket is closed by the same type in correct order.',
      io: 'Input: bracket string. Output: true if valid nesting sequence else false.',
      constraints: 'Need LIFO matching of recent unmatched opening bracket.',
      objective: 'Which pattern with last-opened-first-closed behavior is the standard solution?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'A stack stores pending opens; each close must match stack top type, and stack must end empty.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc217-contains-duplicate-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 217 - Contains Duplicate',
      fullProblem: 'Given integer array nums, return true if any value appears at least twice, else false.',
      io: 'Input: nums array. Output: boolean duplicate-exists indicator.',
      constraints: 'Need fast detection while scanning large arrays.',
      objective: 'Which hashing pattern marks seen values and detects repeats in O(1)-average lookups?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Insert values into a set/hash structure; encountering a pre-existing value confirms duplicate.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc938-range-sum-of-bst-additional-18',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 938 - Range Sum of BST',
      fullProblem: 'Given BST root and range [low, high], return sum of all node values within the range inclusive.',
      io: 'Input: BST root, low, high. Output: integer range sum.',
      constraints: 'Can prune traversal using BST order properties to skip impossible subtrees.',
      objective: 'Which recursive tree pattern walks nodes and applies branch pruning based on current value?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'DFS can skip left subtree when node < low and skip right subtree when node > high, summing valid nodes.',
  }),
]

export default data
