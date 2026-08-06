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
    id: 'leetcode-pattern-type-medium-lc438-find-all-anagrams-in-a-string-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 438 - Find All Anagrams in a String',
      fullProblem: 'Given strings s and p, return start indices of all substrings in s that are anagrams of p.',
      io: 'Input: s and p. Output: list of starting indices.',
      constraints: 'Need frequency alignment for windows of exact length p.length.',
      objective: 'Which fixed-length window pattern updates counts incrementally as boundaries move?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Track character counts for a fixed-size window and compare/maintain differences as it slides.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc560-subarray-sum-equals-k-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 560 - Subarray Sum Equals K',
      fullProblem: 'Count the number of contiguous subarrays whose sum equals k.',
      io: 'Input: nums array and integer k. Output: count of qualifying subarrays.',
      constraints: 'Array can include negative values, so plain sliding-window monotonicity does not hold.',
      objective: 'Which prefix-accumulation pattern with hash frequency enables O(n) counting?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'For each running sum S, add count of previous sums equal to S-k from hash map.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc752-open-the-lock-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 752 - Open the Lock',
      fullProblem: 'Lock has 4 wheels from 0000. Given deadends and target, return minimum turns to reach target or -1.',
      io: 'Input: deadends list and target string. Output: minimum number of moves or -1.',
      constraints: 'Each move changes one wheel by +1 or -1 and all edges have equal cost.',
      objective: 'Which shortest-path pattern in unweighted state graph finds minimum turns?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS explores lock combinations layer-by-layer, so first reach to target is minimum turns.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc450-delete-node-in-a-bst-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 450 - Delete Node in a BST',
      fullProblem: 'Delete a node with given key from BST and return new root while preserving BST properties.',
      io: 'Input: BST root and key. Output: updated BST root.',
      constraints: 'Need handle leaf, one-child, and two-child cases correctly.',
      objective: 'Which BST structural operation pattern directly addresses keyed deletion and replacement?',
    }),
    correctPattern: 'BST Insertion, Deletion, and Balancing',
    correctExplanation: 'Locate key recursively and restructure using inorder successor/predecessor when both children exist.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc236-lowest-common-ancestor-of-a-binary-tree-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 236 - Lowest Common Ancestor of a Binary Tree',
      fullProblem: 'Given binary tree and nodes p and q, return their lowest common ancestor.',
      io: 'Input: root, p, q nodes. Output: LCA node reference.',
      constraints: 'Need combine subtree search results and bubble ancestor candidates upward.',
      objective: 'Which bottom-up tree traversal pattern returns findings from children to parent?',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Post-order recursion checks children first; current node becomes LCA when both sides report hits.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc91-decode-ways-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 91 - Decode Ways',
      fullProblem: 'A string of digits maps 1->A ... 26->Z. Count number of valid decodings.',
      io: 'Input: digit string s. Output: number of decode combinations.',
      constraints: 'Zero handling and one/two-digit transitions create overlapping subproblems.',
      objective: 'Which one-dimensional DP recurrence counts ways from prior positions?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'dp[i] depends on valid one-digit decode from i-1 and valid two-digit decode from i-2.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc300-longest-increasing-subsequence-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 300 - Longest Increasing Subsequence',
      fullProblem: 'Given unsorted array of integers, return length of longest strictly increasing subsequence.',
      io: 'Input: nums array. Output: LIS length.',
      constraints: 'Need efficient improvement over O(n^2) where possible.',
      objective: 'Which sequence-optimization pattern is named specifically for this task?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Use patience-sorting tails array with binary search or classic DP to compute LIS length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc287-find-the-duplicate-number-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 287 - Find the Duplicate Number',
      fullProblem: 'Array nums has n+1 integers in [1,n] with exactly one repeated value. Return duplicate without modifying array and with O(1) extra space.',
      io: 'Input: nums array. Output: duplicated integer.',
      constraints: 'Need detect duplicate by interpreting values as next pointers in an implicit linked structure.',
      objective: 'Which fast/slow cycle-detection pattern is used on value-index transition graph?',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'Treat nums[i] as next index, find meeting point, then locate cycle entrance which is duplicate value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc162-find-peak-element-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 162 - Find Peak Element',
      fullProblem: 'Return index of any peak element where nums[i] > nums[i-1] and nums[i] > nums[i+1].',
      io: 'Input: nums array. Output: index of a peak.',
      constraints: 'Need O(log n) approach using slope direction.',
      objective: 'Which midpoint-halving pattern chooses search side based on ascending or descending trend near mid?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'If nums[mid] < nums[mid+1], a peak exists on right; otherwise a peak exists on left including mid.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc2791-count-paths-that-can-form-a-palindrome-in-a-tree-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2791 - Count Paths That Can Form a Palindrome in a Tree',
      fullProblem: 'Each edge has a lowercase character. Count node pairs whose path characters can be rearranged into a palindrome.',
      io: 'Input: parent array and string s for edge labels. Output: number of valid node pairs.',
      constraints: 'Need parity-mask trick over root-to-node character counts and near-match masks differing by one bit.',
      objective: 'Which bit-level state encoding pattern supports fast parity comparisons for palindrome feasibility?',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'Use XOR bitmask parity per path; two masks form palindrome-compatible multiset if equal or differ by one bit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc323-number-of-connected-components-in-an-undirected-graph-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 323 - Number of Connected Components in an Undirected Graph',
      fullProblem: 'Given n and undirected edges, count connected components.',
      io: 'Input: node count n and edge list. Output: number of components.',
      constraints: 'Need efficient unions for potentially sparse/disconnected graph.',
      objective: 'Which component-merging pattern supports near-constant amortized union/find operations?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union edge endpoints and count distinct representatives after processing all edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc986-interval-list-intersections-additional-21',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 986 - Interval List Intersections',
      fullProblem: 'Given two sorted disjoint interval lists, return all intersections between them.',
      io: 'Input: firstList and secondList intervals. Output: intersecting intervals.',
      constraints: 'Need linear merge-like sweep across two ordered lists.',
      objective: 'Which interval overlap pattern compares current ranges and advances the one ending first?',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'At each step compute overlap of current intervals then move pointer with smaller endpoint.',
  }),
]

export default data
