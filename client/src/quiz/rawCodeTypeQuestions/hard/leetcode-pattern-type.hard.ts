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
    id: 'leetcode-pattern-type-hard-cheapest-flights-k-stops',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 787 - Cheapest Flights Within K Stops',
      brief: 'Find minimum travel cost from source to destination with at most k stops.',
      io: 'Return cheapest valid route cost or -1 if no route satisfies stop bound.',
      constraints: 'Directed weighted graph; edge count constraint changes standard shortest-path behavior.',
      objective: 'Pick pattern for bounded-relaxation shortest path with stop-limited transitions.',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Bounded-edge relaxations align with Bellman-Ford style dynamic relaxations across up to K+1 edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-critical-connections',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1192 - Critical Connections in a Network',
      brief: 'Identify all bridge edges in an undirected connected graph.',
      io: 'Return list of edges that, when removed, increase number of components.',
      constraints: 'Need linear-time bridge logic; naive edge-removal simulation is too slow.',
      objective: 'Select low-link-based graph algorithm for bridge/articulation-style analysis.',
    }),
    correctPattern: "Tarjan's / Kosaraju's Algorithm",
    correctExplanation: 'Bridge discovery in an undirected graph is a classic Tarjan low-link application.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-network-delay-time',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 743 - Network Delay Time',
      brief: 'Compute time for signal from source to reach every node in directed weighted graph.',
      io: 'Return maximum shortest-path distance from source, or -1 if any node is unreachable.',
      constraints: 'All weights are non-negative; efficiency matters for larger sparse graphs.',
      objective: 'Choose the single-source shortest-path pattern for non-negative edge weights.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Single-source shortest paths with non-negative weights is a Dijkstra fit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-min-cost-connect-points',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1584 - Min Cost to Connect All Points',
      brief: 'Connect all points with edges weighted by Manhattan distance at minimum total cost.',
      io: 'Return scalar minimum connection cost over all points.',
      constraints: 'Need full connectivity with no cycles that add unnecessary weight.',
      objective: 'Identify the minimum spanning tree strategy that grows cheapest global connection.',
    }),
    correctPattern: "Minimum Spanning Tree (Prim's Algorithm)",
    correctExplanation: 'Build a minimum spanning tree over all points to minimize total connection cost.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-merge-k-sorted-lists',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 23 - Merge k Sorted Lists',
      brief: 'Merge k pre-sorted linked lists into one globally sorted list.',
      io: 'Return merged linked-list head.',
      constraints: 'k can be large; repeatedly scanning all heads each step is suboptimal.',
      objective: 'Choose the priority-queue pattern for efficient multi-stream merge.',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Repeatedly pop the minimum head from a heap across k lists.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-word-search',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 79 - Word Search',
      brief: 'Determine if a target word exists via adjacent grid traversal without cell reuse in path.',
      io: 'Return true if such a path exists, otherwise false.',
      constraints: '4-direction adjacency only; must backtrack visited state correctly.',
      objective: 'Pick the recursive search pattern for constrained path construction in grids.',
    }),
    correctPattern: 'Grid Backtracking (Word Search)',
    correctExplanation: 'DFS with backtracking and visited restoration across 4-directional moves is the core pattern.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-sudoku-solver',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 37 - Sudoku Solver',
      brief: 'Fill empty Sudoku cells to produce a valid completed board.',
      io: 'Mutate board in-place with one valid completion.',
      constraints: 'Must enforce row, column, and 3x3 constraints while exploring assignments.',
      objective: 'Select search pattern emphasizing aggressive pruning and constraint propagation.',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Backtracking with aggressive pruning via row/col/box constraints is the key optimization.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-partition-equal-subset-sum',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 416 - Partition Equal Subset Sum',
      brief: 'Decide whether nums can be partitioned into two subsets with identical total sum.',
      io: 'Return boolean feasibility result.',
      constraints: 'Each item may be chosen at most once; pseudo-polynomial DP is acceptable.',
      objective: 'Pick the subset-capacity dynamic programming pattern with no repetition.',
    }),
    correctPattern: '0/1 Knapsack Pattern',
    correctExplanation: 'Each number is used at most once while targeting subset sum capacity.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-coin-change',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 322 - Coin Change',
      brief: 'Compute minimum number of coins to form target amount.',
      io: 'Return minimum count or -1 when impossible.',
      constraints: 'Coin denominations can be reused arbitrarily many times.',
      objective: 'Choose the dynamic programming pattern for repeated-choice item usage.',
    }),
    correctPattern: 'Unbounded Knapsack Pattern',
    correctExplanation: 'Coins can be reused multiple times, matching unbounded knapsack transitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-russian-doll-envelopes',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 354 - Russian Doll Envelopes',
      brief: 'Find longest strictly increasing nesting chain across envelope dimensions.',
      io: 'Return maximum number of envelopes in valid chain.',
      constraints: 'Need dimension-aware sorting plus efficient increasing-sequence logic.',
      objective: 'Identify sequence optimization pattern commonly reduced to LIS after preprocessing.',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Sort strategically, then solve longest increasing chain on one dimension as LIS.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-palindromic-substring',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 5 - Longest Palindromic Substring',
      brief: 'Find longest contiguous palindrome contained in given string.',
      io: 'Return the substring itself (or equivalent maximal palindrome answer).',
      constraints: 'Need efficient boundary expansion or interval-state reuse; naive all-substring check is too slow.',
      objective: 'Choose the interval/palindrome dynamic approach centered on mirrored boundaries.',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'DP or center-expansion reasoning around palindrome boundaries is the dominant approach family.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-house-robber-iii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 337 - House Robber III',
      brief: 'Maximize robbed value in a binary tree with parent-child mutual exclusion.',
      io: 'Return maximum obtainable sum under adjacency constraint.',
      constraints: 'Each node decision impacts children; global optimum depends on subtree state composition.',
      objective: 'Pick tree-structured dynamic programming with include/exclude states per node.',
    }),
    correctPattern: 'DP on Trees',
    correctExplanation: 'Compute include/exclude states bottom-up from children to parent nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-best-time-stock-cooldown',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 309 - Best Time to Buy and Sell Stock with Cooldown',
      brief: 'Maximize stock-trading profit with cooldown day after each sale.',
      io: 'Return scalar max profit over timeline.',
      constraints: 'Unlimited transactions allowed but constrained by hold/sell/cooldown transitions.',
      objective: 'Choose the day-indexed state-transition DP pattern for trading constraints.',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'Track state transitions (hold/sell/cooldown) across days with DP.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-implement-trie',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 208 - Implement Trie (Prefix Tree)',
      brief: 'Design data structure with insert, exact-word search, and startsWith operations.',
      io: 'Support dynamic string updates and O(length)-style query behavior.',
      constraints: 'Prefix operations must avoid scanning every stored word each time.',
      objective: 'Select the dedicated prefix-indexed structure pattern for string dictionaries.',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Use a trie node graph keyed by characters for prefix search and insertion.',
  }),
]

export default data
