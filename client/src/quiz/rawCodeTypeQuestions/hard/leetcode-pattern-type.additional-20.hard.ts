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
    id: 'leetcode-pattern-type-hard-lc25-reverse-nodes-in-k-group-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 25 - Reverse Nodes in k-Group',
      fullProblem: 'Given linked list, reverse nodes of list k at a time and return modified list. Remaining nodes fewer than k stay as-is.',
      io: 'Input: list head and integer k. Output: transformed list head.',
      constraints: 'Need local segment reversal with reconnecting boundaries repeatedly.',
      objective: 'Which linked-list pointer rewiring pattern is the core operation inside each group?',
    }),
    correctPattern: 'In-place Linked List Reversal',
    correctExplanation: 'Each full block of k nodes is reversed in place and reattached to previous/next sections.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc124-binary-tree-maximum-path-sum-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 124 - Binary Tree Maximum Path Sum',
      fullProblem: 'Find maximum path sum in a binary tree, where path may start and end at any nodes and follows parent-child links.',
      io: 'Input: binary tree root. Output: maximum path-sum integer.',
      constraints: 'Global optimum may pass through a node using both children while upward return can use at most one side.',
      objective: 'Which longest-path-on-tree pattern combines best downward branches and updates global answer?',
    }),
    correctPattern: 'Tree Diameter / Longest Path Pattern',
    correctExplanation: 'At each node, compute best downward gain and update global best with leftGain + node + rightGain.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc685-redundant-connection-ii-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 685 - Redundant Connection II',
      fullProblem: 'Directed graph started as rooted tree but has one extra edge. Remove one edge so graph becomes rooted tree again.',
      io: 'Input: directed edges list. Output: edge to remove.',
      constraints: 'Must handle two-parent conflict and cycle conflict cases.',
      objective: 'Which connectivity management pattern helps detect cycle-forming edges during incremental insertion?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find identifies cycle-causing insertions, combined with indegree analysis for two-parent scenarios.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc410-split-array-largest-sum-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 410 - Split Array Largest Sum',
      fullProblem: 'Split array into k non-empty contiguous subarrays to minimize the largest subarray sum.',
      io: 'Input: nums and k. Output: minimal possible largest subarray sum.',
      constraints: 'Feasibility of limiting max subarray sum to threshold T is monotonic in T.',
      objective: 'Which pattern binary-searches threshold answer and validates with greedy partition counting?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search max-sum cap T; greedily count required segments and check if count <= k.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1547-minimum-cost-to-cut-a-stick-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1547 - Minimum Cost to Cut a Stick',
      fullProblem: 'Stick length n with required cut positions. Each cut costs current stick segment length. Minimize total cost to perform all cuts.',
      io: 'Input: n and cuts array. Output: minimum total cutting cost.',
      constraints: 'Optimal order depends on interval decomposition and overlapping subproblems.',
      objective: 'Which interval dynamic programming family (2D table over ranges) best models this optimization?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'Sort cuts and run interval DP where dp[l][r] tries each middle cut as first cut in that segment.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1499-max-value-of-equation-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1499 - Max Value of Equation',
      fullProblem: 'Given points sorted by x and integer k, maximize yi + yj + |xi-xj| with i < j and xj - xi <= k.',
      io: 'Input: points and k. Output: maximum equation value.',
      constraints: 'Need maintain best candidate of (yi - xi) within sliding x-distance window.',
      objective: 'Which deque-based monotonic candidate maintenance pattern is used here?',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Keep deque of candidates with decreasing (y - x) and evict points outside distance k.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc336-palindrome-pairs-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 336 - Palindrome Pairs',
      fullProblem: 'Given list of unique words, return all index pairs (i,j) such that words[i] + words[j] is a palindrome.',
      io: 'Input: words array. Output: list of index pairs.',
      constraints: 'Need efficient prefix/suffix checks and reverse-lookups across many words.',
      objective: 'Which prefix indexing structure pattern can accelerate palindrome pair discovery?',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Insert reversed words into trie and query splits/palindrome suffix conditions to find valid pairs.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc834-sum-of-distances-in-tree-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 834 - Sum of Distances in Tree',
      fullProblem: 'For each node in an undirected tree, compute sum of distances to all other nodes.',
      io: 'Input: n and edges. Output: distance-sum array for every node.',
      constraints: 'Need re-rooting transitions after subtree size and partial sums are known.',
      objective: 'Which tree DP pattern with post-order plus re-root pass solves this efficiently?',
    }),
    correctPattern: 'DP on Trees',
    correctExplanation: 'First DFS computes subtree sizes and root sum; second DFS re-roots to derive all node answers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc301-remove-invalid-parentheses-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 301 - Remove Invalid Parentheses',
      fullProblem: 'Remove minimum number of invalid parentheses to make expression valid and return all possible results.',
      io: 'Input: string s. Output: all valid strings with minimum removals.',
      constraints: 'Need guarantee minimum deletions before enumerating all valid outcomes.',
      objective: 'Which shortest-path-in-state-space pattern explores by deletion levels to ensure minimal removals?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS by removing one parenthesis per level ensures first valid level corresponds to minimum deletions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1889-minimum-space-wasted-from-packaging-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1889 - Minimum Space Wasted From Packaging',
      fullProblem: 'Given package sizes and multiple suppliers with box sizes, choose one supplier minimizing total wasted space. If impossible, return -1.',
      io: 'Input: packages array and boxes per supplier. Output: minimum waste modulo 1e9+7 or -1.',
      constraints: 'Need fast counting of packages each sorted box size can cover.',
      objective: 'Which boundary-search pattern repeatedly finds rightmost package index fitting current box size?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Sort packages and use binary search boundaries with prefix sums to compute waste block-by-block.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc391-perfect-rectangle-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 391 - Perfect Rectangle',
      fullProblem: 'Given axis-aligned rectangles, determine if they exactly cover one rectangular region with no overlaps or gaps.',
      io: 'Input: list of rectangles. Output: true if perfect cover else false.',
      constraints: 'Need consistency of boundary events and area/corner integrity conditions.',
      objective: 'Which interval-boundary event reasoning pattern is commonly used to validate rectangle coverage?',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Use geometric boundary/event consistency checks alongside total area and corner parity constraints.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2392-build-a-matrix-with-conditions-additional-20',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2392 - Build a Matrix With Conditions',
      fullProblem: 'Place numbers 1..k in a k x k matrix so row and column precedence constraints are both satisfied.',
      io: 'Input: k, rowConditions, colConditions. Output: valid matrix or empty matrix.',
      constraints: 'Need separate acyclic ordering for rows and columns then combine positions.',
      objective: 'Which indegree-driven ordering pattern should be applied to each condition graph?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Compute topological orders for row and column constraints independently, then map each number to coordinates.',
  }),
]

export default data
