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
    id: 'leetcode-pattern-type-hard-find-city-smallest-neighbors',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1334 - Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      brief: 'For each city, count reachable cities within threshold and choose city with smallest reach (tie by largest index).',
      io: 'Return selected city index.',
      constraints: 'Need all-pairs distance info for n up to moderate size.',
      objective: 'Choose all-pairs shortest-path dynamic relaxation pattern.',
    }),
    correctPattern: 'Floyd-Warshall Algorithm',
    correctExplanation: 'Floyd-Warshall computes all-pairs shortest paths in O(V^3), matching this requirement.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-cost-to-connect-cities',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode-style Minimum Cost to Connect Cities',
      brief: 'Given weighted undirected edges between cities, find minimum cost to connect all cities or fail if impossible.',
      io: 'Return total MST cost or -1 if disconnected.',
      constraints: 'Edge list provided explicitly; connectivity may be partial.',
      objective: 'Choose edge-sorting + component-union MST pattern.',
    }),
    correctPattern: "Minimum Spanning Tree (Kruskal's Algorithm)",
    correctExplanation: 'Kruskal sorts edges by cost and unions disjoint components until spanning tree forms.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-swim-in-rising-water',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 778 - Swim in Rising Water',
      brief: 'Find minimum time t to travel from top-left to bottom-right where you can enter cells with elevation <= t.',
      io: 'Return minimal feasible t.',
      constraints: 'Path cost determined by maximum elevation encountered along route.',
      objective: 'Choose priority-based shortest-path pattern over weighted state expansions.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra on minimax-style path state finds minimal maximum elevation required.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-serialize-deserialize-binary-tree',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 297 - Serialize and Deserialize Binary Tree',
      brief: 'Encode and decode binary tree preserving exact structure and values.',
      io: 'Implement serialize(root) and deserialize(data).',
      constraints: 'Must preserve null-child structure, not just value multiset.',
      objective: 'Choose traversal pattern that emits/restores top-down structural markers.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order with null markers is a common canonical serialize/deserialize strategy.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximal-rectangle',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 85 - Maximal Rectangle',
      brief: 'Find largest rectangle containing only 1s in binary matrix.',
      io: 'Return maximal area.',
      constraints: 'Need efficient reuse of histogram computations per row.',
      objective: 'Choose stack-based boundary pattern used in histogram rectangle optimization.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Each row builds histogram heights then uses largest-rectangle-in-histogram monotonic stack.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-palindrome-partitioning-ii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 132 - Palindrome Partitioning II',
      brief: 'Partition string into palindromic substrings with minimum cuts.',
      io: 'Return minimum cut count.',
      constraints: 'Need fast palindrome validity reuse across intervals.',
      objective: 'Choose palindrome interval DP family pattern.',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'Precomputing palindrome intervals enables DP for minimum cuts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-increasing-path-matrix',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 329 - Longest Increasing Path in a Matrix',
      brief: 'Find longest strictly increasing path moving 4-directionally in matrix.',
      io: 'Return maximum path length.',
      constraints: 'DAG-like dependencies from lower to higher neighbors.',
      objective: 'Choose graph ordering pattern that processes dependency direction over indegrees.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Model cells as DAG edges low->high and count longest levels via topological peeling.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shopping-offers',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 638 - Shopping Offers',
      brief: 'Minimize purchase cost with individual prices and bundle offers under item needs.',
      io: 'Return minimum possible total cost.',
      constraints: 'State space on remaining needs is small enough for compressed representation.',
      objective: 'Choose compact combinational DP state encoding pattern.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Small-dimensional need states are often memoized/encoded in compressed state DP.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-best-time-stock-iv',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 188 - Best Time to Buy and Sell Stock IV',
      brief: 'Maximize profit with at most k transactions.',
      io: 'Return maximum achievable profit.',
      constraints: 'State depends on day index, transaction count, and holding status.',
      objective: 'Choose explicit state-machine DP trading pattern.',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'Track buy/sell states per transaction layer for optimal transitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-word-search-ii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 212 - Word Search II',
      brief: 'Given board and many words, return all words present by adjacent path traversal.',
      io: 'Return set/list of found words.',
      constraints: 'Need shared-prefix pruning across many candidate words.',
      objective: 'Choose prefix-structure + DFS pattern for multi-word grid search.',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie enables prefix pruning while DFS explores board paths.',
  }),
]

export default data
