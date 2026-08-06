import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  scenario: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem Scenario: ${params.scenario}\n` +
    `Input/Output Expectations: ${params.io}\n` +
    `Operational Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-largest-color-value-directed-graph-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1857 - Largest Color Value in a Directed Graph',
      scenario: 'Given directed graph and node colors, compute largest number of occurrences of any single color along a valid path; return -1 if graph has cycle.',
      io: 'Return maximum color count on any path or -1 on cyclic graph.',
      constraints: 'Need both cycle detection and DP-like propagation of color-frequency state through DAG ordering.',
      objective: 'Choose topological processing pattern with per-node state propagation.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Kahn traversal detects cycles and allows forward DP propagation of color counts along edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-number-of-non-overlapping-substrings-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1520 - Maximum Number of Non-Overlapping Substrings',
      scenario: 'Extract maximum count of non-overlapping substrings such that each chosen substring contains all occurrences of every char it includes.',
      io: 'Return list of selected substrings.',
      constraints: 'Need interval expansion/validation then choose optimal non-overlapping subset.',
      objective: 'Identify boundary-event interval derivation and selection strategy.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Character occurrence boundaries expand to valid intervals; greedy interval selection maximizes count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-arithmetic-slices-ii-subsequence-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 446 - Arithmetic Slices II - Subsequence',
      scenario: 'Count arithmetic subsequences of length >= 3 in an array.',
      io: 'Return total count of arithmetic subsequences.',
      constraints: 'Need pairwise difference state tracking per ending index; naive subsequence enumeration is intractable.',
      objective: 'Choose dynamic programming over index-difference state maps.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Per-index hash maps accumulate counts by difference and extend prior sequences.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-constrained-subsequence-sum-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1425 - Constrained Subsequence Sum',
      scenario: 'Find maximum subsequence sum where consecutive chosen indices differ by at most k.',
      io: 'Return maximal constrained subsequence sum.',
      constraints: 'Need efficient max over sliding DP window of previous states.',
      objective: 'Identify monotonic queue optimization for DP transition maxima.',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Deque maintains candidate DP values in decreasing order for O(1) max transition lookup.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-time-to-visit-a-cell-in-a-grid-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2577 - Minimum Time to Visit a Cell In a Grid',
      scenario: 'Each cell has earliest entry time; moving takes one unit and may require waiting parity adjustments. Find minimal arrival time to destination.',
      io: 'Return minimum feasible arrival time, or -1 if impossible.',
      constraints: 'Weighted temporal transitions and waiting effects invalidate plain BFS.',
      objective: 'Choose weighted shortest-path algorithm over time-dependent state transitions.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra handles varying effective edge costs from waiting/parity-adjusted movement times.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-best-position-for-service-centre-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1515 - Best Position for a Service Centre (Search Framing)',
      scenario: 'Given customer coordinates, find point minimizing sum of Euclidean distances to all customers.',
      io: 'Return minimum possible total distance within accepted precision.',
      constraints: 'Continuous optimization over 2D plane; objective is convex-like but non-trivial.',
      objective: 'Identify answer-space search/optimization framing for converging on minimal objective value.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'This is treated as continuous search over objective landscape, commonly solved by iterative narrowing methods.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-common-supersequence-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1092 - Shortest Common Supersequence',
      scenario: 'Build shortest string that has str1 and str2 as subsequences.',
      io: 'Return one shortest common supersequence string.',
      constraints: 'Need alignments preserving order in both strings while minimizing total length.',
      objective: 'Choose two-string DP foundation via longest-common-subsequence reconstruction.',
    }),
    correctPattern: 'Longest Common Subsequence (LCS) Pattern',
    correctExplanation: 'Compute LCS grid, then reconstruct supersequence by weaving unmatched chars around shared LCS backbone.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-race-car-state-space-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 818 - Race Car (State-Space Framing)',
      scenario: 'Commands A and R alter position and speed; find shortest instruction sequence to reach target.',
      io: 'Return minimum command count.',
      constraints: 'Implicit state graph over (position,speed) can explode without pruning bounds.',
      objective: 'Identify unweighted shortest-path traversal over augmented control states.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over reachable states guarantees shortest command sequence when transitions cost equally.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-stickers-to-spell-word-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 691 - Stickers to Spell Word',
      scenario: 'Given sticker words, compute minimum number of stickers needed to form target string by cutting letters from chosen stickers.',
      io: 'Return minimum sticker count or -1 if impossible.',
      constraints: 'Target states are subsets/multisets of remaining letters; naive recursion is exponential without memoized state compression.',
      objective: 'Choose compressed-state DP/memoization strategy over remaining target coverage.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Bitmask or compressed remainder state memoization captures progress and avoids recomputing equivalent subproblems.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-the-city-threshold-distance-crazy-10',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1334 - Find the City With the Smallest Number of Neighbors at a Threshold Distance (All-Pairs Framing)',
      scenario: 'For each city, count how many other cities are reachable within a threshold shortest-path distance and return city with smallest count (tie by largest index).',
      io: 'Return selected city index.',
      constraints: 'Requires shortest paths between many node pairs, making repeated single-source passes less direct for dense graphs.',
      objective: 'Choose all-pairs path relaxation pattern with cubic complexity appropriate for moderate n.',
    }),
    correctPattern: 'Floyd-Warshall Algorithm',
    correctExplanation: 'Floyd-Warshall computes all-pairs shortest paths, after which threshold-reachability counts are straightforward.',
  }),
]

export default data
