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
    id: 'leetcode-pattern-type-easy-lc1210-remove-all-adjacent-duplicates-in-string-ii-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1209 - Remove All Adjacent Duplicates in String II',
      fullProblem: 'Given a string s and integer k, repeatedly remove any group of k identical adjacent characters until no such group remains. Return the final string.',
      io: 'Input: string s and integer k. Output: reduced string after all valid removals.',
      constraints: 'Need repeated local removals that can cascade across boundaries.',
      objective: 'Which stack pattern naturally supports adjacent cancellation and backtracking through repeated deletions?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Track groups in a stack so repeated adjacent removals can collapse and expose new matches.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc543-diameter-of-binary-tree-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 543 - Diameter of Binary Tree',
      fullProblem: 'Given a binary tree, return the length of the longest path between any two nodes in the tree.',
      io: 'Input: binary tree root. Output: diameter length in edges.',
      constraints: 'Need combine deepest left and right branch lengths at each node while still returning one side upward.',
      objective: 'Which tree traversal pattern computes branch lengths bottom-up and updates a global longest path?',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Post-order DFS returns height to parent and updates diameter using leftHeight + rightHeight at each node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc704-binary-search-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 704 - Binary Search',
      fullProblem: 'Given a sorted array nums and a target value, return its index if found or -1 if not found.',
      io: 'Input: sorted nums array and target. Output: index or -1.',
      constraints: 'Must run in logarithmic time and handle empty input cleanly.',
      objective: 'Which classic ordered-search pattern repeatedly halves the search interval?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Compare middle element with target and discard the half that cannot contain the answer.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc66-plus-one-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 66 - Plus One',
      fullProblem: 'Given a non-negative integer represented as an array of digits, increment the number by one and return the resulting digits.',
      io: 'Input: digits array. Output: digits array after adding one.',
      constraints: 'Need carry propagation from least significant digit and possible array growth.',
      objective: 'Which right-to-left pointer pattern handles digit carry in-place?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Scan from the end, propagate carry leftward, and allocate a new leading digit if carry remains.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc338-counting-bits-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 338 - Counting Bits',
      fullProblem: 'For every integer from 0 to n, compute the number of set bits in its binary representation.',
      io: 'Input: integer n. Output: array of bit counts for all values from 0..n.',
      constraints: 'Need a recurrence that leverages previously computed results.',
      objective: 'Which simple one-dimensional DP recurrence fits bit-count accumulation?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Use relations like dp[i] = dp[i >> 1] + (i & 1) to derive counts efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc88-merge-sorted-array-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 88 - Merge Sorted Array',
      fullProblem: 'Merge two sorted arrays in-place into the first array while preserving sorted order.',
      io: 'Input: nums1, m, nums2, n. Output: nums1 after merging.',
      constraints: 'Need write from back to avoid overwriting unprocessed values in nums1.',
      objective: 'Which two-pointer merge pattern is best when one buffer already contains enough trailing space?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Use back pointers for both arrays and fill nums1 from the end with the larger current value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc448-find-all-numbers-disappeared-in-an-array-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 448 - Find All Numbers Disappeared in an Array',
      fullProblem: 'Given an array containing numbers from 1..n with some duplicates and some missing, return all missing numbers.',
      io: 'Input: nums array. Output: list of missing values from 1..n.',
      constraints: 'Need O(n) time and ideally no extra array for visitation.',
      objective: 'Which index-placement pattern reveals missing values by sorting values to their natural slots?',
    }),
    correctPattern: 'Cyclic Sort',
    correctExplanation: 'Swap numbers into their correct index positions; any mismatch after placement indicates a missing value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc189-rotate-array-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 189 - Rotate Array',
      fullProblem: 'Rotate an array nums to the right by k steps in-place.',
      io: 'Input: nums array and integer k. Output: nums rotated right by k.',
      constraints: 'Must do in-place, and k can exceed array length.',
      objective: 'Which in-place two-pointer reversal strategy rotates the array efficiently?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Reverse the whole array, then reverse the first k and the remaining n-k elements.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc53-maximum-subarray-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 53 - Maximum Subarray',
      fullProblem: 'Find the maximum sum over all contiguous subarrays of a given integer array.',
      io: 'Input: nums array. Output: maximum contiguous subarray sum.',
      constraints: 'Need a linear-time running best that can reset when the current segment becomes harmful.',
      objective: 'Which running-sum optimization pattern tracks whether to extend or restart the current segment?',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'At each step, either extend the current subarray or start fresh at the current element, then update global best.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc141-linked-list-cycle-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 141 - Linked List Cycle',
      fullProblem: 'Determine whether a singly linked list contains a cycle.',
      io: 'Input: linked list head. Output: boolean indicating cycle existence.',
      constraints: 'Need O(1) extra space if possible and reliable cycle detection.',
      objective: 'Which pointer-speed pattern detects cycles with two runners moving at different speeds?',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'If fast and slow pointers ever meet, the list contains a cycle.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc242-valid-anagram-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 242 - Valid Anagram',
      fullProblem: 'Check if two strings are anagrams of each other, meaning they contain the same characters with the same multiplicity.',
      io: 'Input: strings s and t. Output: boolean anagram result.',
      constraints: 'Need efficient frequency counting rather than sorting for large strings.',
      objective: 'Which counting pattern stores and compares character frequencies directly?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count characters in one string and decrement using the other, or compare two frequency maps.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc605-can-place-flowers-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 605 - Can Place Flowers',
      fullProblem: 'Given flowerbed array where 0 means empty and 1 means planted, determine if n new flowers can be planted without adjacent flowers.',
      io: 'Input: flowerbed array and n. Output: boolean feasibility result.',
      constraints: 'Need inspect local neighborhoods while greedily placing flowers when space permits.',
      objective: 'Which same-direction scan pattern can greedily place flowers while checking neighbors?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Traverse once and plant only when current slot and its neighbors are empty.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc58-length-of-last-word-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 58 - Length of Last Word',
      fullProblem: 'Return the length of the last word in a string that may contain leading and trailing spaces.',
      io: 'Input: string s. Output: integer length of final word.',
      constraints: 'Need ignore trailing spaces before counting the last contiguous run of letters.',
      objective: 'Which reverse-scanning pointer pattern isolates the final word cleanly?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move from the end to skip spaces, then count until the next space or the string start.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc27-remove-element-additional-23',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 27 - Remove Element',
      fullProblem: 'Remove all instances of val from nums in-place and return the new length.',
      io: 'Input: nums array and val. Output: new length after removal.',
      constraints: 'Need compact array in-place without preserving removed values.',
      objective: 'Which forward compaction pattern writes only the kept values as it scans?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Fast scans every element while slow writes only values not equal to val.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc69-sqrtx-additional-23b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 69 - Sqrt(x)',
      fullProblem: 'Given a non-negative integer x, compute the integer square root floor(sqrt(x)).',
      io: 'Input: integer x. Output: floor square root.',
      constraints: 'Need logarithmic time and integer arithmetic safety on large x.',
      objective: 'Which binary-search boundary pattern zeroes in on the largest valid square root candidate?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Search integer candidates and maintain the largest value whose square does not exceed x.',
  }),
]

export default data
