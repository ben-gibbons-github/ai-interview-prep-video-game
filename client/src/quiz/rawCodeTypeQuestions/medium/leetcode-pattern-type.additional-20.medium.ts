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
    id: 'leetcode-pattern-type-medium-lc15-3sum-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 15 - 3Sum',
      fullProblem: 'Given integer array nums, return all unique triplets [a,b,c] such that a + b + c = 0.',
      io: 'Input: nums array. Output: list of unique triplets summing to zero.',
      constraints: 'Need avoid duplicate triplets and improve over cubic brute force.',
      objective: 'After sorting and fixing one index, which pattern efficiently searches for complementary pairs?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'For each fixed index, run left/right pointers on the suffix and skip duplicates while targeting -nums[i].',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc11-container-with-most-water-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 11 - Container With Most Water',
      fullProblem: 'Given heights of vertical lines, choose two lines forming container with x-axis that holds maximum water area.',
      io: 'Input: height array. Output: maximum area integer.',
      constraints: 'Need linear-time strategy deciding which boundary to move each step.',
      objective: 'Which inward two-pointer pattern discards dominated width-height combinations?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Start at both ends and move shorter side inward, because area is limited by shorter height.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc142-linked-list-cycle-ii-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 142 - Linked List Cycle II',
      fullProblem: 'Given linked list, return node where cycle begins. Return null if no cycle.',
      io: 'Input: linked list head. Output: entry node of cycle or null.',
      constraints: 'Need O(1) memory solution and precise cycle-entry localization.',
      objective: 'Which cycle-detection pattern first finds meeting point, then derives the cycle entry?',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'After fast/slow meet, reset one pointer to head; moving both one step finds entry node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc19-remove-nth-node-from-end-of-list-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 19 - Remove Nth Node From End of List',
      fullProblem: 'Remove the nth node from end of singly linked list and return the head.',
      io: 'Input: list head and integer n. Output: head after deletion.',
      constraints: 'Need one-pass approach and careful head-removal handling.',
      objective: 'Which offset-pointer pattern keeps exactly n-node gap to locate deletion predecessor?',
    }),
    correctPattern: 'Two Pointers (Kth Node from End)',
    correctExplanation: 'Advance fast pointer n steps, then move both until fast reaches tail so slow is before target.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc153-find-minimum-in-rotated-sorted-array-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 153 - Find Minimum in Rotated Sorted Array',
      fullProblem: 'An ascending sorted array is rotated at unknown pivot. Find the minimum element in O(log n).',
      io: 'Input: rotated sorted nums with distinct values. Output: minimum value.',
      constraints: 'Need identify unsorted side containing pivot using midpoint comparisons.',
      objective: 'Which rotated-array binary-search pattern directly targets pivot/minimum location?',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Compare middle against right boundary to decide whether minimum lies to left or right of mid.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc34-find-first-and-last-position-of-element-in-sorted-array-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 34 - Find First and Last Position of Element in Sorted Array',
      fullProblem: 'Given sorted array nums and target, return start and end index of target or [-1, -1] if absent.',
      io: 'Input: sorted nums and target. Output: two-index boundary pair.',
      constraints: 'Need logarithmic time, usually via two boundary searches.',
      objective: 'Which boundary binary-search pattern finds leftmost and rightmost occurrences?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Run binary search variants for first index >= target and first index > target, then derive range.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc199-binary-tree-right-side-view-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 199 - Binary Tree Right Side View',
      fullProblem: 'Return values of nodes visible when looking at binary tree from the right side.',
      io: 'Input: binary tree root. Output: list of visible node values by depth.',
      constraints: 'Need per-level grouping to identify rightmost node each depth.',
      objective: 'Which level-wise tree traversal pattern naturally extracts last node at each depth?',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'Process nodes level by level and record the final node visited per level.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc98-validate-binary-search-tree-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 98 - Validate Binary Search Tree',
      fullProblem: 'Determine if a binary tree is a valid BST where all left subtree values are smaller and all right subtree values are larger for every node.',
      io: 'Input: binary tree root. Output: boolean validity result.',
      constraints: 'Need global ordering validation, not just local parent-child checks.',
      objective: 'Which traversal pattern verifies strict increasing order of visited values for BST validity?',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal of a valid BST must be strictly increasing with no duplicates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc200-number-of-islands-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 200 - Number of Islands',
      fullProblem: 'Given 2D grid of 1s (land) and 0s (water), count number of connected islands using 4-direction adjacency.',
      io: 'Input: grid matrix. Output: number of islands.',
      constraints: 'Need mark visited land to avoid recounting components.',
      objective: 'Which connected-component traversal pattern explores and marks each island once?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS from each unvisited land cell marks entire component, and each DFS launch counts one island.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc743-network-delay-time-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 743 - Network Delay Time',
      fullProblem: 'Given directed weighted edges times and source node k, return time for all nodes to receive signal, or -1 if unreachable.',
      io: 'Input: n, edge list times, source k. Output: max shortest-path distance or -1.',
      constraints: 'Need shortest paths from one source over non-negative weighted graph.',
      objective: 'Which shortest-path pattern with a priority queue is the standard choice?',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra computes minimum distance to every node with greedy extraction of nearest unfinalized node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc279-perfect-squares-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 279 - Perfect Squares',
      fullProblem: 'Given n, return least number of perfect square numbers that sum to n.',
      io: 'Input: integer n. Output: minimum count of perfect squares.',
      constraints: 'Need optimize over repeated subproblems from 1..n.',
      objective: 'Which one-dimensional DP pattern computes optimal count by building solutions bottom-up?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'dp[i] = 1 + min(dp[i - square]) across valid squares yields minimum count for each i.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc416-partition-equal-subset-sum-additional-20',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 416 - Partition Equal Subset Sum',
      fullProblem: 'Determine whether array can be partitioned into two subsets with equal sum.',
      io: 'Input: nums array. Output: true if equal partition exists, else false.',
      constraints: 'Equivalent target is half total sum and each number can be used at most once.',
      objective: 'Which subset-selection dynamic programming pattern models pick-or-skip with single use per item?',
    }),
    correctPattern: '0/1 Knapsack Pattern',
    correctExplanation: 'Use boolean DP for reachable sums up to total/2 where each number is considered once.',
  }),
]

export default data
