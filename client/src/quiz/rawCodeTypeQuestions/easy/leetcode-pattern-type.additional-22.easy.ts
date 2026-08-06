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
    id: 'leetcode-pattern-type-easy-lc88-merge-sorted-array-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 88 - Merge Sorted Array',
      fullProblem: 'You are given two sorted integer arrays nums1 and nums2, with nums1 having enough trailing space to hold all elements. Merge nums2 into nums1 in non-decreasing order in-place.',
      io: 'Input: nums1, m, nums2, n. Output: nums1 mutated to sorted merge of first m nums1 elements plus n nums2 elements.',
      constraints: 'Must avoid extra output array and keep O(1) auxiliary memory by writing into nums1 from the back.',
      objective: 'Which pointer pattern compares both ends and places larger values from right to left?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Place the larger of nums1[i] and nums2[j] at the back index k, moving pointers inward until complete.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc83-remove-duplicates-from-sorted-list-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 83 - Remove Duplicates from Sorted List',
      fullProblem: 'Given the head of a sorted linked list, delete all duplicates such that each element appears only once.',
      io: 'Input: linked-list head. Output: deduplicated linked-list head.',
      constraints: 'Sorted order allows local adjacent comparisons with linear traversal.',
      objective: 'Which same-direction pointer scan rewires next links when duplicate runs are detected?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Traverse with a current pointer; when next has same value, skip it, otherwise advance.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc53-maximum-subarray-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 53 - Maximum Subarray',
      fullProblem: 'Given an integer array nums, find the contiguous subarray (containing at least one number) with the largest sum.',
      io: 'Input: nums array. Output: maximum contiguous subarray sum.',
      constraints: 'Need linear-time dynamic choice between extending prior subarray or restarting at current element.',
      objective: 'Which linear dynamic pattern tracks best-ending-here and global best in one pass?',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'Maintain currentMax = max(nums[i], currentMax + nums[i]) and global maximum across all positions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc70-climbing-stairs-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 70 - Climbing Stairs',
      fullProblem: 'You can climb 1 or 2 steps at a time. Given n, return how many distinct ways there are to reach the top.',
      io: 'Input: integer n. Output: number of distinct ways.',
      constraints: 'Each state depends on the previous two states.',
      objective: 'Which one-dimensional recurrence pattern is the canonical fit for this staircase counting problem?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'ways[i] = ways[i-1] + ways[i-2], with base cases for first two steps.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc111-minimum-depth-of-binary-tree-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 111 - Minimum Depth of Binary Tree',
      fullProblem: 'Given a binary tree, find its minimum depth, defined as number of nodes along the shortest path from root to a leaf.',
      io: 'Input: binary tree root. Output: minimum depth integer.',
      constraints: 'Need shortest leaf depth, so first leaf discovered by depth layer is optimal.',
      objective: 'Which level-order traversal pattern naturally returns the first leaf depth?',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'BFS visits tree by levels; the first encountered leaf gives minimum depth immediately.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc257-binary-tree-paths-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 257 - Binary Tree Paths',
      fullProblem: 'Return all root-to-leaf paths in a binary tree as strings with arrow separators.',
      io: 'Input: binary tree root. Output: list of root-to-leaf path strings.',
      constraints: 'Need branch-specific path accumulation and backtracking over recursive calls.',
      objective: 'Which depth-first traversal pattern carries and expands path prefixes from parent to children?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order DFS appends current node to path and emits full path when reaching leaves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc268-missing-number-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 268 - Missing Number',
      fullProblem: 'Given array nums containing n distinct numbers from range [0, n], return the only number missing from the range.',
      io: 'Input: nums array. Output: missing integer.',
      constraints: 'Prefer O(n) time with O(1) extra space.',
      objective: 'Which index-placement pattern can reorder values and identify the mismatch position?',
    }),
    correctPattern: 'Cyclic Sort',
    correctExplanation: 'Place each value at its matching index when possible; the index not matching value reveals the missing number.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc349-intersection-of-two-arrays-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 349 - Intersection of Two Arrays',
      fullProblem: 'Given two integer arrays, return their intersection where each element in result must be unique.',
      io: 'Input: nums1 and nums2 arrays. Output: unique common elements.',
      constraints: 'Need de-duplication and fast membership checks.',
      objective: 'Which hashing-based marking pattern is the direct approach for uniqueness plus intersection?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use sets/hashes to track values and emit only unique shared elements.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc350-intersection-of-two-arrays-ii-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 350 - Intersection of Two Arrays II',
      fullProblem: 'Given two arrays, return their intersection allowing duplicates; each value appears as many times as shown in both arrays.',
      io: 'Input: nums1 and nums2 arrays. Output: intersection with multiplicities.',
      constraints: 'Need frequency accounting across arrays.',
      objective: 'Which frequency-map pattern tracks remaining counts while scanning the second array?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count occurrences from one array, decrement while matching values from the other array.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc674-longest-continuous-increasing-subsequence-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 674 - Longest Continuous Increasing Subsequence',
      fullProblem: 'Find length of longest strictly increasing contiguous subsequence in an array.',
      io: 'Input: nums array. Output: maximum LCIS length.',
      constraints: 'Need one-pass tracking of current run and best run.',
      objective: 'Which same-direction scan pattern updates run boundaries and best length incrementally?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Track start of current increasing run and update answer as end pointer advances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc744-find-smallest-letter-greater-than-target-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 744 - Find Smallest Letter Greater Than Target',
      fullProblem: 'Given sorted letters with wrap-around behavior, return smallest letter strictly greater than target.',
      io: 'Input: sorted letters array and target character. Output: next greatest letter with wrap rule.',
      constraints: 'Need boundary search over sorted domain.',
      objective: 'Which first-true boundary pattern locates the earliest value greater than target?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search first index where letters[i] > target; if none, wrap to letters[0].',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc914-x-of-a-kind-in-a-deck-of-cards-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 914 - X of a Kind in a Deck of Cards',
      fullProblem: 'Given deck integers, determine if cards can be partitioned into groups of size X >= 2 where each group has identical integers.',
      io: 'Input: deck array. Output: boolean partition possibility.',
      constraints: 'Need frequency counts and common group size divisibility across all counts.',
      objective: 'Which number-theory pattern on counts tests whether a shared grouping factor exists?',
    }),
    correctPattern: 'Euclidean Algorithm',
    correctExplanation: 'Compute gcd of all frequency counts; valid partition exists iff gcd >= 2.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2529-maximum-count-of-positive-integer-and-negative-integer-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2529 - Maximum Count of Positive Integer and Negative Integer',
      fullProblem: 'Given non-decreasing array, count positive and negative integers and return the larger count (zeros ignored).',
      io: 'Input: sorted nums array. Output: max(negativeCount, positiveCount).',
      constraints: 'Need fast boundary discovery for zero split points.',
      objective: 'Which ordered search pattern can find first non-negative and first positive boundaries efficiently?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Use two boundary searches to compute counts of negatives and positives in O(log n).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc119-pascals-triangle-ii-additional-22b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: "LeetCode 119 - Pascal's Triangle II",
      fullProblem: 'Return the rowIndex-th row of Pascal\'s Triangle using minimal extra space.',
      io: 'Input: integer rowIndex. Output: row array.',
      constraints: 'Each cell depends on previous row neighbors and in-place updates must avoid overwriting needed values too early.',
      objective: 'Which 1D dynamic programming style update pattern is used here?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Update row from right to left so each entry uses values from the prior iteration state.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1295-find-numbers-with-even-number-of-digits-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1295 - Find Numbers with Even Number of Digits',
      fullProblem: 'Given integer array nums, return how many numbers contain an even number of digits.',
      io: 'Input: nums array. Output: count of elements with even digit length.',
      constraints: 'Need linear scan with per-element digit-length evaluation.',
      objective: 'Which straightforward forward-scan pointer pattern is a natural fit for this counting pass?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A single forward traversal counts values satisfying the even-digit predicate.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2037-minimum-number-of-moves-to-seat-everyone-additional-22',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2037 - Minimum Number of Moves to Seat Everyone',
      fullProblem: 'Given positions of seats and students, each move shifts one student by 1. Return minimum total moves to seat everyone.',
      io: 'Input: seats array and students array. Output: minimum move count.',
      constraints: 'Optimal pairing occurs after sorting both lists and matching by rank.',
      objective: 'Which same-direction paired scan pattern compares sorted arrays index by index?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Sort both arrays and sum absolute differences of corresponding elements.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1046-last-stone-weight-additional-22b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1046 - Last Stone Weight',
      fullProblem: 'Repeatedly smash the two heaviest stones; if unequal, push difference back. Return final stone weight or 0.',
      io: 'Input: stones array. Output: final remaining weight.',
      constraints: 'Need efficient repeated access to current largest elements.',
      objective: 'Which top-k extraction pattern with priority queue supports this process efficiently?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'A max-heap gives O(log n) insertion/removal for repeatedly selecting the heaviest stones.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc303-range-sum-query-immutable-additional-22b',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 303 - Range Sum Query - Immutable',
      fullProblem: 'Design a structure supporting many sumRange(left,right) queries on an immutable array.',
      io: 'Input: fixed nums and many range queries. Output: sums for query intervals.',
      constraints: 'Need preprocessing that makes each query constant time.',
      objective: 'Which cumulative preprocessing pattern answers range sums via two prefix lookups?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Prefix totals allow sum(l,r) to be derived as prefix[r+1] - prefix[l].',
  }),
]

export default data
