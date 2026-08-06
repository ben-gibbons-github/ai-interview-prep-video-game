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
    id: 'leetcode-pattern-type-medium-rotting-oranges-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 994 - Rotting Oranges',
      scenario: 'Each minute, rotten oranges contaminate adjacent fresh oranges. Compute the minimum minutes to rot all, or detect impossibility.',
      io: 'Return total minutes required, or -1 when some fresh oranges are unreachable.',
      constraints: 'All initially rotten cells act as simultaneous infection sources at minute zero.',
      objective: 'Select graph traversal pattern that starts from multiple sources and expands in synchronized time layers.',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Queue all initial rotten cells, then BFS by levels to model minute-by-minute spread.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-as-far-from-land-as-possible-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1162 - As Far from Land as Possible',
      scenario: 'In a binary grid, find ocean cell with maximum distance to nearest land cell.',
      io: 'Return maximal nearest-land distance, or -1 for all-water/all-land edge cases.',
      constraints: 'Distance metric is Manhattan with 4-direction movement.',
      objective: 'Recognize simultaneous outward expansion from all land cells to compute nearest-land distances in one pass.',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Starting BFS from every land cell assigns each water cell its nearest-land distance by first visit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-longest-increasing-subsequence-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 300 - Longest Increasing Subsequence',
      scenario: 'Given an unsorted integer array, compute length of the longest strictly increasing subsequence.',
      io: 'Return LIS length.',
      constraints: 'Need stronger than O(n^2) when possible; order must be preserved though elements are not contiguous.',
      objective: 'Choose canonical subsequence optimization pattern with tails tracking or DP formulation.',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'LIS pattern uses DP or patience-sorting tails with binary replacement updates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-coin-change-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 322 - Coin Change',
      scenario: 'Given coin denominations with unlimited supply, find minimum number of coins needed to make amount.',
      io: 'Return minimum coin count, or -1 if impossible.',
      constraints: 'Coins can be reused arbitrarily; local greedy choices are not always globally optimal.',
      objective: 'Identify repeated-choice dynamic programming pattern where each denomination may be used multiple times.',
    }),
    correctPattern: 'Unbounded Knapsack Pattern',
    correctExplanation: 'Unbounded knapsack transitions naturally model unlimited reuse per coin denomination.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-ones-and-zeroes-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 474 - Ones and Zeroes',
      scenario: 'Choose largest subset of binary strings with at most m zeros and n ones.',
      io: 'Return maximum number of strings selectable under resource limits.',
      constraints: 'Each string can be chosen at most once, producing two-dimensional capacity constraints.',
      objective: 'Select bounded-choice knapsack DP pattern where each item contributes fixed resource costs.',
    }),
    correctPattern: '0/1 Knapsack Pattern',
    correctExplanation: 'Each string is a one-time item with (zeros, ones) costs and unit value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-queue-reconstruction-by-height-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 406 - Queue Reconstruction by Height',
      scenario: 'People are described by [height, k] where k is number of people in front with height >= this person; reconstruct a valid queue.',
      io: 'Return one valid reconstructed queue.',
      constraints: 'Ordering by one key influences insertion positions by a second key.',
      objective: 'Choose interval/boundary-event style ordering strategy that stabilizes insertion logic.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sort by height and insert by k; processing order acts like boundary-controlled event scheduling.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-is-graph-bipartite-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 785 - Is Graph Bipartite?',
      scenario: 'Determine whether undirected graph vertices can be split into two sets with no intra-set edges.',
      io: 'Return true if bipartition exists.',
      constraints: 'Graph may be disconnected, so every component must be validated.',
      objective: 'Recognize two-color consistency checking over graph components.',
    }),
    correctPattern: 'Bipartite Graph Check (Coloring)',
    correctExplanation: 'DFS/BFS coloring with opposite colors across edges detects odd-cycle conflicts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-cheapest-flights-within-k-stops-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 787 - Cheapest Flights Within K Stops (Alternative Framing)',
      scenario: 'Find cheapest path from src to dst using at most k stops in directed weighted graph.',
      io: 'Return minimal cost, or -1 if no valid route under stop budget.',
      constraints: 'Need path-cost relaxation with explicit bound on number of edges used.',
      objective: 'Select shortest-path approach based on bounded rounds of edge relaxation.',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Applying relaxations for up to k+1 edges captures cheapest feasible constrained routes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-next-greater-element-ii-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 503 - Next Greater Element II',
      scenario: 'For circular array, find next greater element for each index while wrapping around once.',
      io: 'Return array of next-greater values, or -1 when none exists.',
      constraints: 'Circularity makes naive right-only scans expensive.',
      objective: 'Choose monotonic candidate stack strategy with doubled index traversal.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Traverse twice with modulo indexing and resolve pending smaller elements via stack pops.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-subarrays-with-bounded-maximum-additional-8',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 795 - Number of Subarrays with Bounded Maximum',
      scenario: 'Count subarrays whose maximum value lies in [left, right].',
      io: 'Return total count of valid subarrays.',
      constraints: 'Need linear counting formulation; direct max computation per subarray is too slow.',
      objective: 'Identify running-window counting pattern that tracks valid segment contributions per index.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Count valid endings incrementally by tracking last boundary breaks and in-range hits.',
  }),
]

export default data
