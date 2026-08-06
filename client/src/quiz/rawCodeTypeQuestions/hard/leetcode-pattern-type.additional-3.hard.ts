import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  brief: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem: ${params.brief}\n` +
    `Input/Output: ${params.io}\n` +
    `Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-median-data-stream-2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 295 - Find Median from Data Stream (Advanced Framing)',
      brief: 'Maintain structure supporting online insertion and immediate median query at any point.',
      io: 'Implement addNum / findMedian API efficiently.',
      constraints: 'Data stream is unbounded; recomputing sorted order each query is too slow.',
      objective: 'Choose balancing heaps pattern for split lower/upper partitions.',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Max-heap lower half + min-heap upper half gives efficient online median maintenance.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-concatenated-words',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 472 - Concatenated Words',
      brief: 'Find words that can be formed by concatenating at least two shorter words in dictionary.',
      io: 'Return all concatenated words.',
      constraints: 'Need efficient prefix checks across many candidate words.',
      objective: 'Choose dictionary prefix-index structure to reduce repeated scans.',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie-based prefix matching speeds decomposition checks of candidate words.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-window-subsequence',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 727 - Minimum Window Subsequence',
      brief: 'Find shortest substring of s where t appears as subsequence in order.',
      io: 'Return minimum qualifying window or empty string.',
      constraints: 'Different from anagram windows; ordering must be preserved as subsequence.',
      objective: 'Choose two-boundary scan pattern with forward match and backward contraction.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Typical solution advances pointers for subsequence match then contracts from matched end.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-all-people-secret',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2092 - Find All People With Secret',
      brief: 'Meetings occur at times; secret propagates through connected participants at each time slice.',
      io: 'Return people who know secret after all meetings.',
      constraints: 'Connectivity must be processed per timestamp group with resets between groups.',
      objective: 'Choose dynamic connectivity pattern with union operations over temporal batches.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find across same-time meetings efficiently models temporary connectivity components.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-super-egg-drop',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 887 - Super Egg Drop',
      brief: 'Determine minimum moves to find critical floor with k eggs and n floors.',
      io: 'Return minimum guaranteed moves in worst case.',
      constraints: 'Decision function is monotonic in moves and floor coverage.',
      objective: 'Choose pattern that binary-searches feasible answer threshold.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Advanced formulations binary-search moves while DP checks if coverage >= n floors.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-course-schedule-iv',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1462 - Course Schedule IV',
      brief: 'Given prerequisites and many queries, determine if one course is prerequisite of another.',
      io: 'Return boolean result per query.',
      constraints: 'Requires transitive closure over course dependency graph.',
      objective: 'Choose all-pairs reachability dynamic pattern.',
    }),
    correctPattern: 'Floyd-Warshall Algorithm',
    correctExplanation: 'Floyd-Warshall transitive closure answers many prerequisite reachability queries efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-contains-duplicate-iii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 220 - Contains Duplicate III',
      brief: 'Check if there exist i,j with |i-j|<=k and |nums[i]-nums[j]|<=t.',
      io: 'Return true/false existence.',
      constraints: 'Need to maintain recent window order statistics over value buckets/ranges.',
      objective: 'Choose sliding boundary pattern maintaining fixed recent-index region.',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Core constraint on index distance defines a fixed-width recency window.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-burst-balloons',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 312 - Burst Balloons',
      brief: 'Maximize coins by choosing balloon burst order where neighbors change dynamically.',
      io: 'Return maximum achievable coin total.',
      constraints: 'Optimal choice depends on interval subproblems and last-burst perspective.',
      objective: 'Choose interval-based dynamic programming family.',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'While not palindrome-specific, this is classic interval DP over subarray boundaries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-trapping-rain-water-ii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 407 - Trapping Rain Water II',
      brief: 'Given elevation map grid, compute total trapped water volume.',
      io: 'Return total trapped units.',
      constraints: 'Boundary governs inward water levels; need globally lowest frontier expansion.',
      objective: 'Choose priority-queue graph expansion pattern for non-uniform costs.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Min-heap frontier expansion by boundary height mirrors Dijkstra-like relaxation.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-evaluate-division',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 399 - Evaluate Division',
      brief: 'Given equations a/b=value and queries, compute implied division results.',
      io: 'Return numeric answer per query, or -1 if disconnected.',
      constraints: 'Variables form weighted graph; query asks path-product ratio.',
      objective: 'Choose graph traversal pattern for weighted path value composition.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS/BFS over weighted edges multiplies ratios along discovered path.',
  }),
]

export default data
