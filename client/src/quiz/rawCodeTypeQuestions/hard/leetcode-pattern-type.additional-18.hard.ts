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
    id: 'leetcode-pattern-type-hard-lc84-largest-rectangle-in-histogram-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 84 - Largest Rectangle in Histogram',
      fullProblem: 'Given bar heights in histogram, find area of largest rectangle that can be formed from contiguous bars.',
      io: 'Input: heights array. Output: maximum rectangle area.',
      constraints: 'Need nearest smaller boundaries to left/right for each bar in linear time.',
      objective: 'Which stack-based pattern computes previous/next smaller element indices efficiently?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Maintain increasing stack of indices; when a lower bar appears, popped bars resolve maximal widths.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc85-maximal-rectangle-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 85 - Maximal Rectangle',
      fullProblem: 'Given binary matrix, find largest rectangle containing only 1s and return its area.',
      io: 'Input: binary matrix. Output: maximum all-ones rectangle area.',
      constraints: 'Each row can be transformed into histogram heights and solved repeatedly.',
      objective: 'Which pattern repeatedly solves histogram largest-rectangle subproblem in O(cols) per row?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Build running heights per row and apply monotonic-stack histogram algorithm each iteration.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc295-find-median-from-data-stream-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 295 - Find Median from Data Stream',
      fullProblem: 'Design data structure supporting addNum and findMedian for streaming integers.',
      io: 'Input: stream of insert/query operations. Output: median values on query.',
      constraints: 'Need balanced split of lower and upper halves with fast insertion and median retrieval.',
      objective: 'Which dual-priority-queue pattern is the canonical approach for online median maintenance?',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Use max-heap for lower half and min-heap for upper half, rebalancing sizes to expose median.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc407-trapping-rain-water-ii-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 407 - Trapping Rain Water II',
      fullProblem: 'Given elevation map matrix, compute total trapped rainwater after raining.',
      io: 'Input: heightMap grid. Output: total trapped water volume.',
      constraints: 'Boundary controls inward fill level; need always expand current lowest boundary cell first.',
      objective: 'Which heap-driven frontier expansion pattern over a grid solves this minimax waterline process?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Min-heap of boundary cells expands inward; each neighbor traps water relative to current boundary height.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc432-all-oone-data-structure-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 432 - All O`one Data Structure',
      fullProblem: 'Design data structure supporting O(1) inc(key), dec(key), getMaxKey, and getMinKey.',
      io: 'Input: operation sequence. Output: key strings for max/min queries.',
      constraints: 'Need constant-time frequency bucket updates and quick min/max retrieval.',
      objective: 'Which cache-style constant-time key-frequency management pattern best aligns with this design?',
    }),
    correctPattern: 'LRU Cache',
    correctExplanation: 'A doubly-linked bucket list plus hash maps gives O(1) updates and extremum key access, similar to cache patterns.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc127-word-ladder-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 127 - Word Ladder',
      fullProblem: 'Given beginWord, endWord, and dictionary, find shortest transformation sequence length where each step changes one character and intermediate words must be in dictionary.',
      io: 'Input: beginWord, endWord, wordList. Output: shortest path length or 0.',
      constraints: 'All edges have equal weight and objective is minimum number of steps.',
      objective: 'Which unweighted shortest-path graph traversal pattern should be used?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS explores transformations level-by-level, so first time reaching endWord gives shortest sequence length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc399-evaluate-division-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 399 - Evaluate Division',
      fullProblem: 'Given equations like a/b = value and queries x/y, return division result if path exists else -1.',
      io: 'Input: equations, values, queries. Output: floating results per query.',
      constraints: 'Variables form weighted graph where path product gives ratio.',
      objective: 'Which graph traversal pattern computes path product across connected component?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Build weighted adjacency and DFS from numerator to denominator accumulating multiplicative weights.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc828-count-unique-characters-of-all-substrings-of-a-given-string-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 828 - Count Unique Characters of All Substrings of a Given String',
      fullProblem: 'For every substring of s, define unique count as number of characters appearing exactly once in that substring. Return total unique counts across all substrings.',
      io: 'Input: uppercase string s. Output: total sum of unique-character counts.',
      constraints: 'Need contribution method based on previous/next occurrence of each character.',
      objective: 'Which cumulative contribution pattern with index tracking is most suitable?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'For each occurrence, compute number of substrings where it is unique using distances to previous and next occurrence.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc239-sliding-window-maximum-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 239 - Sliding Window Maximum',
      fullProblem: 'Given array nums and window size k, return maximum value in each contiguous window of size k.',
      io: 'Input: nums and k. Output: list of window maxima.',
      constraints: 'Need O(n) total, not O(nk), with efficient eviction and max maintenance.',
      objective: 'Which pattern maintains candidates for maximum in decreasing order as window slides?',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Deque stores indices with decreasing values; front is current max and expired indices are popped as window advances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc327-count-of-range-sum-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 327 - Count of Range Sum',
      fullProblem: 'Count subarrays whose sum lies in [lower, upper].',
      io: 'Input: nums, lower, upper. Output: number of valid range sums.',
      constraints: 'Need efficient prefix-sum range counting over many thresholds.',
      objective: 'Which indexed frequency-aggregation pattern supports dynamic prefix count queries?',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Coordinate-compress prefix sums and use BIT to query counts in value ranges while scanning prefixes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc887-super-egg-drop-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 887 - Super Egg Drop',
      fullProblem: 'Given k eggs and n floors, determine minimum number of moves needed to find critical floor where eggs begin to break in worst case.',
      io: 'Input: k and n. Output: minimum worst-case moves.',
      constraints: 'State transitions combine break/not-break outcomes and require minimax optimization.',
      objective: 'Which dynamic-programming state-machine style pattern is typically applied here?',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'DP state over moves/eggs/floors models transitions from two outcomes per drop and finds minimal required moves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1574-shortest-subarray-to-be-removed-to-make-array-sorted-additional-18',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1574 - Shortest Subarray to be Removed to Make Array Sorted',
      fullProblem: 'Remove one contiguous subarray so remaining elements are non-decreasing. Return shortest length to remove.',
      io: 'Input: integer array. Output: minimum removal length.',
      constraints: 'Need detect sorted prefix/suffix and then bridge them efficiently.',
      objective: 'Which bidirectional pointer strategy merges prefix and suffix boundaries to minimize deletion?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Find maximal sorted prefix/suffix, then move pointers to stitch feasible join with minimum middle removal.',
  }),
]

export default data
