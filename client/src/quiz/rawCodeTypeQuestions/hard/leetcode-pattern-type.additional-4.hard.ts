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
    id: 'leetcode-pattern-type-hard-trapping-rain-water-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 42 - Trapping Rain Water',
      scenario: 'Given elevation bars, compute total trapped rainwater after raining.',
      io: 'Return integer water units trapped.',
      constraints: 'Need linear-time approach with constant auxiliary memory.',
      objective: 'Choose synchronized boundary contraction pattern that maintains leftMax and rightMax.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move smaller side inward while accumulating trapped water from known boundary max.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-sliding-window-maximum-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 239 - Sliding Window Maximum',
      scenario: 'For each window of size k, output maximum element as window moves right.',
      io: 'Return list of window maxima.',
      constraints: 'Must avoid recomputing max by full scan at each shift.',
      objective: 'Identify monotonic queue strategy that preserves candidates in decreasing order.',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Deque stores indices with decreasing values; front is window max.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-critical-connections-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1192 - Critical Connections in a Network',
      scenario: 'Return all bridges in undirected connected graph where edge removal disconnects network.',
      io: 'Return list of critical edges.',
      constraints: 'Need low-link discovery semantics from DFS timestamps.',
      objective: 'Choose SCC/low-link family algorithm that identifies bridge edges.',
    }),
    correctPattern: "Tarjan's / Kosaraju's Algorithm",
    correctExplanation: 'Tarjan-style low-link DFS detects bridge edges where child low > parent disc.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-obstacle-removal-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2290 - Minimum Obstacle Removal to Reach Corner',
      scenario: 'Move on grid with 0/1 cells where entering obstacle costs 1 removal.',
      io: 'Return minimum obstacles removed to reach destination.',
      constraints: 'Edge costs are non-negative and state graph can be large.',
      objective: 'Choose weighted shortest-path frontier pattern.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Treat each move as weighted edge and run Dijkstra for minimum total cost.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-min-cost-cut-stick-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1547 - Minimum Cost to Cut a Stick',
      scenario: 'Given stick length and cut positions, minimize total cutting cost.',
      io: 'Return minimal total cost.',
      constraints: 'Cost of each cut depends on current segment boundaries.',
      objective: 'Identify interval dynamic-programming recurrence over partition points.',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'This is interval DP: choose last/first cut in subsegment and combine subcosts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-distinct-subsequences-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 115 - Distinct Subsequences',
      scenario: 'Count number of distinct subsequences of s equal to target string t.',
      io: 'Return count of matching subsequences.',
      constraints: 'Need combinational counting with overlapping subproblems across prefixes.',
      objective: 'Choose two-string dynamic programming pattern over prefix pairs.',
    }),
    correctPattern: 'Longest Common Subsequence (LCS) Pattern',
    correctExplanation: 'State definition across indices of two strings mirrors LCS-style 2D DP framing.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-max-sum-submatrix-no-larger-k-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 363 - Max Sum of Rectangle No Larger Than K',
      scenario: 'Find rectangle in matrix with largest sum not exceeding k.',
      io: 'Return best valid sum.',
      constraints: 'Need fast submatrix-sum computation during boundary enumeration.',
      objective: 'Identify cumulative-sum transformation used to reduce 2D sums to 1D queries.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compress rows/cols and apply prefix-sum logic to bounded subarray sum checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-ipo-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 502 - IPO',
      scenario: 'Choose up to k projects to maximize capital, with each project requiring minimum capital and yielding profit.',
      io: 'Return maximized capital after at most k selections.',
      constraints: 'Feasible project set changes as capital grows over rounds.',
      objective: 'Pick dual-priority strategy that tracks affordable candidates and best profit choices.',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Two-heap style management (min-capital + max-profit) is the canonical greedy structure.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-max-points-line-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 149 - Max Points on a Line',
      scenario: 'Given points on plane, find maximum number that lie on same straight line.',
      io: 'Return maximal collinear count.',
      constraints: 'Need robust slope normalization and duplicate-point handling.',
      objective: 'Choose hash-marking/compression pattern for repeated slope signatures from each anchor.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Per-anchor slope frequency maps capture line memberships efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-visiting-all-nodes-v2',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 847 - Shortest Path Visiting All Nodes',
      scenario: 'Find shortest walk length that visits every node in an unweighted connected graph.',
      io: 'Return minimum number of steps.',
      constraints: 'State must track current node plus visited-set coverage.',
      objective: 'Identify compressed-state graph traversal pattern using visitation bitmasks.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'BFS/DP over (node, visitedMask) is the standard bitmask-state approach.',
  }),
]

export default data
