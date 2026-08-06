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
    id: 'leetcode-pattern-type-medium-lc739-daily-temperatures-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 739 - Daily Temperatures',
      fullProblem: 'Given temperatures array, return for each day how many days you would have to wait until a warmer temperature occurs. If none, output 0 for that day.',
      io: 'Input: temperatures array. Output: waits array with warmer-day offsets.',
      constraints: 'Need nearest-greater-to-right behavior in one pass.',
      objective: 'Which stack pattern tracks unresolved indices until a warmer value appears?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Keep a decreasing stack of indices; when a warmer temperature arrives, resolve all smaller top entries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc143-reorder-list-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 143 - Reorder List',
      fullProblem: 'Given head of linked list L0->L1->...->Ln, reorder it to L0->Ln->L1->Ln-1->L2->Ln-2 and so on.',
      io: 'Input: linked list head. Output: reordered linked list head.',
      constraints: 'Need midpoint split, reverse second half, then weave nodes alternately.',
      objective: 'Which linked-list pattern is usually the first step to locate the split point?',
    }),
    correctPattern: 'Fast and Slow Pointers (Midpoint)',
    correctExplanation: 'Find the middle, reverse the second half, and merge the two halves in alternating order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc55-jump-game-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 55 - Jump Game',
      fullProblem: 'Given nums where nums[i] is max jump length, determine if you can reach last index from first index.',
      io: 'Input: nums array. Output: boolean reachability result.',
      constraints: 'Need greedy tracking of farthest reachable index without exploring every path.',
      objective: 'Which same-direction scan pattern propagates the furthest reachable prefix while iterating?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Track the furthest reachable index while scanning; if current index exceeds it, reachability fails.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc322-coin-change-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 322 - Coin Change',
      fullProblem: 'Given coins of different denominations and an amount, return the minimum number of coins needed to make up that amount. If impossible, return -1.',
      io: 'Input: coins array and amount. Output: minimum coin count or -1.',
      constraints: 'Coins can be reused unlimited times.',
      objective: 'Which unbounded-choice optimization pattern naturally fits repeated coin usage?',
    }),
    correctPattern: 'Unbounded Knapsack Pattern',
    correctExplanation: 'For each amount, consider using any coin again by taking 1 + dp[amount - coin].',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc279-perfect-squares-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 279 - Perfect Squares',
      fullProblem: 'Given positive integer n, return the least number of perfect square numbers that sum to n.',
      io: 'Input: integer n. Output: minimum count of squares.',
      constraints: 'Need overlap-heavy optimization over all smaller totals.',
      objective: 'Which one-dimensional recurrence pattern is a direct fit for building answers up from smaller totals?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'dp[i] is the minimum over dp[i-square] + 1 for all square numbers <= i.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc200-number-of-islands-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 200 - Number of Islands',
      fullProblem: 'Count connected groups of 1s in a grid, where connections exist only horizontally or vertically.',
      io: 'Input: binary grid. Output: number of islands.',
      constraints: 'Need to mark visited cells and avoid recounting components.',
      objective: 'Which graph traversal pattern explores each connected land mass once?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Launch DFS from each unvisited land cell and mark its entire connected component.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc542-01-matrix-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 542 - 01 Matrix',
      fullProblem: 'For every cell containing 1, return the distance to the nearest 0 in the matrix.',
      io: 'Input: binary matrix. Output: matrix of shortest distances to 0.',
      constraints: 'Many sources can start distance expansion simultaneously.',
      objective: 'Which breadth-first traversal pattern launches from all zero cells at once?',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Initialize queue with all zeros and expand outward layer by layer to assign nearest distances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc230-kth-smallest-element-in-a-bst-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 230 - Kth Smallest Element in a BST',
      fullProblem: 'Return the kth smallest value in a binary search tree.',
      io: 'Input: BST root and k. Output: kth smallest element.',
      constraints: 'BST ordering is the key invariant.',
      objective: 'Which traversal order naturally visits values in sorted order?',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal of BST yields ascending values, so the kth visit is the answer.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1161-maximum-level-sum-of-a-binary-tree-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1161 - Maximum Level Sum of a Binary Tree',
      fullProblem: 'Find the level of a binary tree with the largest sum of node values.',
      io: 'Input: binary tree root. Output: 1-indexed level number with maximum sum.',
      constraints: 'Need aggregate nodes by depth.',
      objective: 'Which queue-based traversal pattern computes per-level sums naturally?',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'Process one depth level at a time and track the sum for each level.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc130-surrounded-regions-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 130 - Surrounded Regions',
      fullProblem: 'Capture all O regions fully surrounded by X on a board by turning them into X, while leaving border-connected O regions unchanged.',
      io: 'Input: board matrix. Output: board after captures.',
      constraints: 'Need mark all safe border-connected cells before flipping the rest.',
      objective: 'Which component-search pattern discovers border-reachable O cells before a final conversion pass?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS from border O cells marks safe regions; any unmarked O is enclosed and can be flipped.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc210-course-schedule-ii-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 210 - Course Schedule II',
      fullProblem: 'Given prerequisites, return a possible order to finish all courses, or an empty array if impossible.',
      io: 'Input: numCourses and prerequisite pairs. Output: valid topological ordering or empty list.',
      constraints: 'Need to respect directed edges and detect cycles.',
      objective: 'Which indegree-driven ordering pattern emits a valid dependency sequence?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Process indegree-zero nodes in a queue and append them to a course order until all nodes are visited.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc450-delete-node-in-a-bst-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 450 - Delete Node in a BST',
      fullProblem: 'Delete a value from BST while preserving BST invariants and returning the updated root.',
      io: 'Input: BST root and key. Output: updated BST root.',
      constraints: 'Need handle leaf, single-child, and two-child deletion cases correctly.',
      objective: 'Which BST mutation pattern covers insertion, deletion, and local restructuring?',
    }),
    correctPattern: 'BST Insertion, Deletion, and Balancing',
    correctExplanation: 'Recursively locate the key and replace it with inorder successor/predecessor when two children exist.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc394-decode-string-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 394 - Decode String',
      fullProblem: 'Decode strings of the form k[encoded_string], where nested bracket blocks can appear arbitrarily deep.',
      io: 'Input: encoded string s. Output: fully decoded string.',
      constraints: 'Need handle nested repeat counts and partial string prefixes cleanly.',
      objective: 'Which stack-based nested-context pattern best models this encoding format?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use stacks for previous strings and repeat counts when entering/leaving bracketed segments.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc375-guess-number-higher-or-lower-ii-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 375 - Guess Number Higher or Lower II',
      fullProblem: 'Choose numbers to minimize the worst-case amount of money needed to guarantee guessing a number between 1 and n.',
      io: 'Input: integer n. Output: minimal guaranteed cost.',
      constraints: 'Need optimize worst-case split decisions over numeric intervals.',
      objective: 'Which interval-based dynamic programming pattern is used for this adversarial cost problem?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'Interval DP tries each pivot as first guess and minimizes the maximum cost of the remaining subintervals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc300-longest-increasing-subsequence-additional-23',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 300 - Longest Increasing Subsequence',
      fullProblem: 'Return the length of the longest strictly increasing subsequence in an unsorted array.',
      io: 'Input: nums array. Output: LIS length.',
      constraints: 'Need dynamic substructure and possible binary-search optimization.',
      objective: 'Which named sequence-optimization pattern solves this class of growth problem?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Maintain a tails array or classic DP to compute the longest increasing subsequence length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc787-cheapest-flights-within-k-stops-additional-23b',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 787 - Cheapest Flights Within K Stops',
      fullProblem: 'Find minimum flight price from src to dst using at most k stops in a weighted directed graph.',
      io: 'Input: n, flights, src, dst, k. Output: minimum cost or -1.',
      constraints: 'Need relax edges a bounded number of rounds rather than unconstrained shortest path.',
      objective: 'Which repeated-relaxation shortest-path pattern is a natural fit for stop-limited travel?',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Run k+1 rounds of edge relaxation using previous-round distances to honor the stop cap.',
  }),
]

export default data
