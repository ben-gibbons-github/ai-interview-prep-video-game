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
    id: 'leetcode-pattern-type-easy-lc9-palindrome-number-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 9 - Palindrome Number',
      fullProblem: 'Given an integer x, return true if x reads the same forward and backward; otherwise return false.',
      io: 'Input: integer x. Output: palindrome boolean result.',
      constraints: 'Negative numbers are not palindromes and digit symmetry must be validated accurately.',
      objective: 'Which mirrored comparison pattern checks equality from both ends of the representation?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Compare symmetric positions from left and right (often via string conversion) until pointers cross or mismatch.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc167-two-sum-ii-input-array-is-sorted-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 167 - Two Sum II - Input Array Is Sorted',
      fullProblem: 'Given a 1-indexed sorted array, find two numbers such that they add up to target and return their indices.',
      io: 'Input: sorted numbers array and target. Output: two 1-based indices.',
      constraints: 'Exactly one solution exists and extra memory should be minimized.',
      objective: 'Which bidirectional pointer strategy exploits sorted order to adjust sum toward target?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move left/right pointers inward based on whether current sum is below or above target.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc160-intersection-of-two-linked-lists-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 160 - Intersection of Two Linked Lists',
      fullProblem: 'Given heads of two singly linked lists, return node where they intersect, or null if they do not intersect.',
      io: 'Input: headA and headB. Output: intersecting node reference or null.',
      constraints: 'Need O(1) extra memory without modifying lists.',
      objective: 'Which synchronized pointer traversal pattern equalizes path lengths by switching heads?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Traverse both lists with two pointers and switch to opposite head at tail; they meet at intersection or null.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc226-invert-binary-tree-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 226 - Invert Binary Tree',
      fullProblem: 'Invert a binary tree by swapping each node\'s left and right children recursively or iteratively.',
      io: 'Input: binary tree root. Output: root of inverted tree.',
      constraints: 'Every node needs exactly one swap while preserving tree structure.',
      objective: 'Which depth-first tree traversal pattern naturally performs local swap then descends?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Swap children at current node and recursively invert both subtrees.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc108-convert-sorted-array-to-binary-search-tree-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 108 - Convert Sorted Array to Binary Search Tree',
      fullProblem: 'Given sorted array, build a height-balanced BST containing all values.',
      io: 'Input: sorted nums array. Output: BST root.',
      constraints: 'Need balanced construction and proper BST ordering for all recursive partitions.',
      objective: 'Which recursive tree-building traversal pattern chooses a root then constructs subtrees top-down?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pick middle value as root, then recursively build left and right subtrees from array halves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc367-valid-perfect-square-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 367 - Valid Perfect Square',
      fullProblem: 'Given positive integer num, return true if it is a perfect square without using sqrt library.',
      io: 'Input: integer num. Output: boolean perfect-square indicator.',
      constraints: 'Must search integer root space efficiently.',
      objective: 'Which logarithmic ordered-search pattern checks candidate roots by squaring midpoints?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search integer m where m*m compares against num.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc234-palindrome-linked-list-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 234 - Palindrome Linked List',
      fullProblem: 'Determine whether a singly linked list is a palindrome.',
      io: 'Input: linked list head. Output: boolean palindrome result.',
      constraints: 'Need near O(1) extra space by splitting around middle and comparing halves.',
      objective: 'Which midpoint-finding pointer pattern is the key first step before second-half reversal and comparison?',
    }),
    correctPattern: 'Fast and Slow Pointers (Midpoint)',
    correctExplanation: 'Use fast/slow to find the middle, reverse second half, and compare node values pairwise.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc455-assign-cookies-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 455 - Assign Cookies',
      fullProblem: 'Each child has greed factor and each cookie has size. Assign at most one cookie per child to maximize content children.',
      io: 'Input: greed array and cookie-size array. Output: maximum number of satisfied children.',
      constraints: 'Need efficient matching after sorting without backtracking.',
      objective: 'Which same-direction pointer strategy greedily pairs smallest feasible cookie to each child?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Sort both arrays and advance pointers while assigning the smallest cookie that satisfies current child.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc171-excel-sheet-column-number-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 171 - Excel Sheet Column Number',
      fullProblem: 'Convert Excel column title (A, B, ..., Z, AA, AB, ...) to corresponding column number.',
      io: 'Input: uppercase string columnTitle. Output: integer column index.',
      constraints: 'Need base-26 positional accumulation from left to right.',
      objective: 'Which cumulative-scan pattern multiplies running value then adds current symbol contribution?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Accumulate result as result = result*26 + letterValue while scanning characters.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc496-next-greater-element-i-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 496 - Next Greater Element I',
      fullProblem: 'For each value in nums1, find its next greater element in nums2 where nums1 is subset of nums2.',
      io: 'Input: nums1 and nums2 arrays. Output: next-greater list aligned with nums1.',
      constraints: 'Need precompute next greater relation in linear time over nums2.',
      objective: 'Which stack-based pattern resolves pending elements when a larger value appears?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Maintain decreasing stack in nums2; current value resolves next-greater for popped smaller values.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc303-range-sum-query-immutable-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 303 - Range Sum Query - Immutable',
      fullProblem: 'Design NumArray to return sumRange(left,right) quickly for immutable array values.',
      io: 'Input: nums with repeated range-sum queries. Output: sums for each query.',
      constraints: 'Need fast O(1) query time after preprocessing.',
      objective: 'Which preprocessing pattern stores cumulative totals so each range sum is a subtraction?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Build prefix array where sum(l,r)=prefix[r+1]-prefix[l].',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1-two-sum-additional-21',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1 - Two Sum',
      fullProblem: 'Given integer array nums and target, return indices of two numbers that add to target.',
      io: 'Input: nums and target. Output: pair of indices.',
      constraints: 'Need better than O(n^2) brute force and must handle duplicates correctly.',
      objective: 'Which hashing pattern stores seen values and complementary targets for one-pass lookup?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Store value-to-index in hash map and check whether target-current has already appeared.',
  }),
]

export default data
