import type { QuizQuestionBankEntry, RawCodingDifficulty } from '../QuizQuestionManager'

export const LEETCODE_PATTERN_OPTIONS: string[] = [
  'Two Pointers (Opposite Direction)',
  'Two Pointers (Same Direction / Fast and Slow)',
  'Sliding Window (Fixed Size)',
  'Sliding Window (Dynamic/Variable Size)',
  'Prefix Sum / Cumulative Sum',
  'Suffix Sum / Product',
  "Kadane's Algorithm",
  'Dutch National Flag (3-Way Partitioning)',
  'Boyer-Moore Voting Algorithm',
  'In-place Array Hashing / Marking',
  'Cyclic Sort',
  'Monotonic Stack',
  'Monotonic Queue',
  'Overlapping Intervals / Merge Intervals',
  'Sweep Line Algorithm / Interval Boundary Events',
  'Matrix Traversal (Spiral / Diagonal / Rotate)',
  "Fast and Slow Pointers (Floyd's Cycle Detection)",
  'Fast and Slow Pointers (Midpoint)',
  'In-place Linked List Reversal',
  'Dummy Head Technique',
  'Two Pointers (Kth Node from End)',
  'Classic Binary Search',
  'Binary Search on Answer Space',
  'Rotated Sorted Array Search',
  'Binary Search for Boundary / First-Last Occurrence',
  'Matrix Binary Search',
  'Tree DFS (Pre-order)',
  'Tree DFS (In-order)',
  'Tree DFS (Post-order)',
  'Tree BFS / Level Order',
  'Tree Diameter / Longest Path Pattern',
  'BST Insertion, Deletion, and Balancing',
  'Morris In-Order Traversal',
  'Graph DFS (Connected Components / Path Finding)',
  'Graph BFS (Shortest Path in Unweighted Graph)',
  'Multi-Source BFS',
  "Topological Sort (Kahn's Algorithm - Indegree BFS)",
  'Topological Sort (DFS)',
  'Disjoint Set Union (DSU / Union-Find)',
  "Dijkstra's Algorithm",
  'Bellman-Ford Algorithm / SPFA',
  'Floyd-Warshall Algorithm',
  "Minimum Spanning Tree (Kruskal's Algorithm)",
  "Minimum Spanning Tree (Prim's Algorithm)",
  'Bipartite Graph Check (Coloring)',
  "Tarjan's / Kosaraju's Algorithm",
  'Top K Elements',
  'Top K Frequent Elements',
  'Two Heaps (Median Finder)',
  'K-Way Merge',
  'Subsets and Power Set',
  'Combinations / Combination Sum',
  'Permutations',
  'Grid Backtracking (Word Search)',
  'Pruning and Constraint Propagation',
  '1D DP (Fibonacci / Climbing Stairs Pattern)',
  '0/1 Knapsack Pattern',
  'Unbounded Knapsack Pattern',
  'Longest Common Subsequence (LCS) Pattern',
  'Longest Increasing Subsequence (LIS) Pattern',
  'Palindromic Substring / Subsequence DP',
  'Matrix / Grid DP',
  'DP on Trees',
  'Bitmask DP',
  'State Machine / Buy-Sell Stock DP',
  'Trie (Prefix Tree)',
  'Trie + Bitwise XOR',
  'Segment Tree',
  'Fenwick Tree (Binary Indexed Tree / BIT)',
  'LRU Cache',
  'LFU Cache',
  'Bit Manipulation Tricks',
  'Sieve of Eratosthenes',
  'Euclidean Algorithm',
  'Fast Powering / Exponentiation by Squaring',
]

interface BuildLeetcodePatternQuestionInput {
  id: string
  difficulty: RawCodingDifficulty
  prompt: string
  correctPattern: string
  correctExplanation: string
}

export function buildLeetcodePatternQuestion({
  id,
  difficulty,
  prompt,
  correctPattern,
  correctExplanation,
}: BuildLeetcodePatternQuestionInput): QuizQuestionBankEntry {
  const correctIndex = LEETCODE_PATTERN_OPTIONS.indexOf(correctPattern)
  if (correctIndex < 0) {
    throw new Error(`Unknown LeetCode pattern option: ${correctPattern}`)
  }

  return {
    id,
    difficulty,
    prompt,
    options: LEETCODE_PATTERN_OPTIONS,
    correctIndex,
    correctExplanation,
    leetcodePatternTypeQuestion: {
      helperText: 'Pick the primary LeetCode pattern that best fits the problem.',
    },
  }
}
