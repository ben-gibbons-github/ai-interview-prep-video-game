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
    id: 'leetcode-pattern-type-medium-lc2-add-two-numbers-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2 - Add Two Numbers',
      fullProblem: 'Two non-empty linked lists represent two non-negative integers in reverse digit order. Add them and return sum as linked list.',
      io: 'Input: l1 and l2 linked-list heads. Output: linked-list head of sum digits in reverse order.',
      constraints: 'Need carry propagation and robust head handling as result list grows node by node.',
      objective: 'Which linked-list construction pattern simplifies appending nodes without special first-node case?',
    }),
    correctPattern: 'Dummy Head Technique',
    correctExplanation: 'Use a dummy node and tail pointer to append result digits while processing carry and input nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc61-rotate-list-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 61 - Rotate List',
      fullProblem: 'Given head of linked list, rotate the list to the right by k positions.',
      io: 'Input: head and integer k. Output: rotated list head.',
      constraints: 'Need locate new tail that is k nodes before current tail after modulo length reduction.',
      objective: 'Which kth-from-end pointer-gap pattern identifies the cut position in one traversal after setup?',
    }),
    correctPattern: 'Two Pointers (Kth Node from End)',
    correctExplanation: 'After normalizing k, maintain pointer gap to find node before new head, then reconnect links.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc209-minimum-size-subarray-sum-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 209 - Minimum Size Subarray Sum',
      fullProblem: 'Given positive integer array and target, return minimal length of contiguous subarray with sum >= target, or 0 if none.',
      io: 'Input: target and nums. Output: minimum qualifying length.',
      constraints: 'Values are positive, enabling monotonic shrink/expand behavior for a moving window.',
      objective: 'Which variable-size window pattern expands to satisfy sum then shrinks to optimize length?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Grow right until reaching target sum, then move left while preserving condition to minimize length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc105-construct-binary-tree-from-preorder-and-inorder-traversal-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 105 - Construct Binary Tree from Preorder and Inorder Traversal',
      fullProblem: 'Given preorder and inorder traversal arrays of the same binary tree, reconstruct and return the tree root.',
      io: 'Input: preorder and inorder arrays. Output: binary tree root.',
      constraints: 'Need partition inorder ranges around root positions while recursively building left and right subtrees.',
      objective: 'Which top-down tree recursion pattern processes root first and then recurses into partitions?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Preorder gives root order; map inorder indices to split subtree segments recursively.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc102-binary-tree-level-order-traversal-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 102 - Binary Tree Level Order Traversal',
      fullProblem: 'Return the level order traversal of a binary tree node values from top to bottom.',
      io: 'Input: binary tree root. Output: nested array by levels.',
      constraints: 'Need process nodes grouped by depth.',
      objective: 'Which queue-based tree traversal pattern visits nodes level by level?',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'Use queue with level-size batching to collect node values per depth.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc230-kth-smallest-element-in-a-bst-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 230 - Kth Smallest Element in a BST',
      fullProblem: 'Given BST and integer k, return kth smallest value among all nodes.',
      io: 'Input: BST root and k. Output: kth smallest value.',
      constraints: 'BST property provides sorted order through specific traversal sequence.',
      objective: 'Which DFS order yields values in ascending order so counting visits finds kth element?',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal of BST is sorted, so the kth visited node is the kth smallest.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc452-minimum-number-of-arrows-to-burst-balloons-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 452 - Minimum Number of Arrows to Burst Balloons',
      fullProblem: 'Balloons are intervals on x-axis. One arrow shot at x bursts all balloons containing x. Return minimum arrows needed to burst all balloons.',
      io: 'Input: intervals points. Output: minimum arrow count.',
      constraints: 'Need greedy interval overlap management after sorting by end coordinate.',
      objective: 'Which overlap-interval pattern merges compatible ranges and increments count on separation?',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Sort by end, shoot arrow at current end, and start new arrow only when next interval starts after it.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc215-kth-largest-element-in-an-array-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 215 - Kth Largest Element in an Array',
      fullProblem: 'Find the kth largest element in an unsorted array (not kth distinct).',
      io: 'Input: nums array and k. Output: kth largest value.',
      constraints: 'Need efficient selection without fully sorting when possible.',
      objective: 'Which top-k selection pattern maintains k best candidates using a heap?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Maintain min-heap of size k; top element is kth largest after scanning all numbers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc695-max-area-of-island-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 695 - Max Area of Island',
      fullProblem: 'Given binary grid, return maximum area of an island (connected 1s by 4-direction adjacency).',
      io: 'Input: grid matrix. Output: maximum island cell count.',
      constraints: 'Need component exploration and area aggregation with visited marking.',
      objective: 'Which graph traversal pattern explores each island and sums component size?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS from each unvisited land cell counts component area and tracks global maximum.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1091-shortest-path-in-binary-matrix-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1091 - Shortest Path in Binary Matrix',
      fullProblem: 'In an n x n binary grid, move in 8 directions through zeros. Return shortest clear path length from top-left to bottom-right, or -1.',
      io: 'Input: binary grid. Output: shortest path length or -1.',
      constraints: 'Unweighted moves imply level-based shortest path search.',
      objective: 'Which graph traversal pattern computes shortest distance in an unweighted grid?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS visits cells by increasing distance, so first reach to target gives shortest path length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc394-decode-string-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 394 - Decode String',
      fullProblem: 'Decode nested encoded strings where k[encoded] means the encoded substring repeated k times.',
      io: 'Input: encoded string s. Output: decoded string.',
      constraints: 'Need nested context handling for counts and partial strings.',
      objective: 'Which stack-centric pattern handles nested bracket decoding naturally?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use stacks to store prior strings and repeat counts when entering nested brackets.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc378-kth-smallest-element-in-a-sorted-matrix-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 378 - Kth Smallest Element in a Sorted Matrix',
      fullProblem: 'Given n x n matrix sorted by rows and columns ascending, return the kth smallest element.',
      io: 'Input: sorted matrix and k. Output: kth smallest value.',
      constraints: 'Need avoid flattening full matrix and full sort when possible.',
      objective: 'Which multi-stream merge pattern treats each row as sorted list and extracts k times?',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Push first element of each row into min-heap and repeatedly pop/push next in row to reach kth extraction.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc211-design-add-and-search-words-data-structure-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 211 - Design Add and Search Words Data Structure',
      fullProblem: 'Design structure supporting addWord and search where search may include wildcard . matching any single letter.',
      io: 'Input: sequence of insert/search operations. Output: boolean search answers.',
      constraints: 'Need efficient prefix navigation and wildcard branching for queries.',
      objective: 'Which prefix-tree pattern is tailored to incremental word insertion and wildcard traversal?',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie stores words by character edges; wildcard search branches across all children at that level.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc62-unique-paths-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 62 - Unique Paths',
      fullProblem: 'Robot starts at top-left and can move only right or down in m x n grid. Count distinct paths to bottom-right.',
      io: 'Input: integers m and n. Output: total number of unique paths.',
      constraints: 'State count at each cell depends on top and left neighbors.',
      objective: 'Which grid DP pattern fills a 2D table from local transition counts?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'dp[r][c] = dp[r-1][c] + dp[r][c-1] with base row/column initialization.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc64-minimum-path-sum-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 64 - Minimum Path Sum',
      fullProblem: 'Given grid of non-negative numbers, find path from top-left to bottom-right minimizing sum, moving only right or down.',
      io: 'Input: grid matrix. Output: minimum path sum.',
      constraints: 'Need optimal substructure over cell prefixes.',
      objective: 'Which table-based grid DP pattern computes minimum cumulative cost per cell?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]) with border handling.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc213-house-robber-ii-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 213 - House Robber II',
      fullProblem: 'Houses are arranged in a circle. Maximize robbery amount without robbing adjacent houses.',
      io: 'Input: nums array in circular order. Output: maximum non-adjacent sum.',
      constraints: 'First and last houses are adjacent, forcing split into two linear cases.',
      objective: 'Which 1D recurrence pattern is reused on two ranges and combined for final answer?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Compute linear robber DP on [0..n-2] and [1..n-1], then take max of both results.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc787-cheapest-flights-within-k-stops-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 787 - Cheapest Flights Within K Stops',
      fullProblem: 'Find cheapest price from src to dst with at most k stops in weighted directed graph of flights.',
      io: 'Input: n, flights list, src, dst, k. Output: minimum price or -1.',
      constraints: 'Need relaxation with bounded number of edges rather than unrestricted shortest-path finalization.',
      objective: 'Which repeated-edge-relaxation pattern is ideal for shortest path under stop count constraints?',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Run up to k+1 relaxation rounds, each using previous-round distances to respect stop limits.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc131-palindrome-partitioning-additional-22',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 131 - Palindrome Partitioning',
      fullProblem: 'Partition string s so every substring in partition is a palindrome. Return all possible palindrome partitions.',
      io: 'Input: string s. Output: list of palindrome partition lists.',
      constraints: 'Need exhaustive subset-like branch choices of cut positions with palindrome pruning.',
      objective: 'Which combinatorial generation pattern explores all valid partition choices recursively?',
    }),
    correctPattern: 'Combinations / Combination Sum',
    correctExplanation: 'Backtracking chooses next palindrome segment and recurses to enumerate all valid partitions.',
  }),
]

export default data
