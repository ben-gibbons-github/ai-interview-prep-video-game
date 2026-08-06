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
    id: 'leetcode-pattern-type-hard-lfu-cache-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 460 - LFU Cache',
      scenario: 'Design cache with get/put supporting LFU eviction and LRU tie-break within frequency.',
      io: 'Implement class with near O(1) average operations.',
      constraints: 'Need combined key lookup, frequency buckets, and recency ordering per bucket.',
      objective: 'Identify dedicated LFU cache design pattern.',
    }),
    correctPattern: 'LFU Cache',
    correctExplanation: 'LFU requires frequency-indexed lists/maps plus key-to-node references.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lru-cache-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 146 - LRU Cache',
      scenario: 'Build fixed-capacity cache evicting least recently used entry on overflow.',
      io: 'Implement get/put in O(1) average time.',
      constraints: 'Need fast lookup and fast recency updates on access.',
      objective: 'Choose standard LRU design with hash map + doubly linked list.',
    }),
    correctPattern: 'LRU Cache',
    correctExplanation: 'Map enables O(1) key lookup and doubly linked list maintains recency order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-largest-rectangle-histogram-segtree-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 84 - Largest Rectangle in Histogram (RMQ Divide-and-Conquer Framing)',
      scenario: 'Compute largest rectangle area; consider approach using range minimum queries.',
      io: 'Return maximal area.',
      constraints: 'Need faster minimum-index queries over subranges for recursive partitioning.',
      objective: 'Identify tree-based range-query structure suited for repeated interval minima.',
    }),
    correctPattern: 'Segment Tree',
    correctExplanation: 'Segment tree accelerates range minimum index queries used in divide-and-conquer.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-sum-distances-tree-reroot-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 834 - Sum of Distances in Tree (Reroot DP Framing)',
      scenario: 'Compute for each node the total distance to every other node.',
      io: 'Return array of distance sums by node index.',
      constraints: 'Need postorder aggregation plus reroot transition formulas.',
      objective: 'Choose tree dynamic programming pattern with subtree-size propagation.',
    }),
    correctPattern: 'DP on Trees',
    correctExplanation: 'Tree DP uses subtree counts and reroot updates to derive all-node answers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-checking-existence-edge-length-limited-paths-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1697 - Checking Existence of Edge Length Limited Paths',
      scenario: 'For each query (u,v,limit), decide if path exists using edges with weight < limit.',
      io: 'Return boolean answer per query in original order.',
      constraints: 'Need offline processing with incremental edge activation by weight threshold.',
      objective: 'Choose sorted-edge dynamic connectivity pattern.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Sort edges and queries by limit; union eligible edges then answer connectivity.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-network-delay-with-negative-edges-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'Single-Source Shortest Paths with Possible Negative Edges (Generalized Framing)',
      scenario: 'Compute shortest distances in directed weighted graph where some edges may be negative.',
      io: 'Return distances or detect negative-cycle effects where applicable.',
      constraints: 'Non-negative-only shortest path algorithms are invalid under negative edges.',
      objective: 'Pick edge-relaxation algorithm family that safely handles negative weights.',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Bellman-Ford/SPFA perform repeated relaxations and support negative-weight edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-eventual-safe-states-scc-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 802 - Find Eventual Safe States (SCC Framing)',
      scenario: 'Determine nodes that do not lead to cycles in directed graph.',
      io: 'Return sorted list of eventual safe node indices.',
      constraints: 'Need robust cycle condensation reasoning.',
      objective: 'Identify strongly connected component algorithmic family suitable for cycle condensation.',
    }),
    correctPattern: "Tarjan's / Kosaraju's Algorithm",
    correctExplanation: 'SCC decomposition isolates cyclic components and supports safe-state classification.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-common-subpath-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1923 - Longest Common Subpath',
      scenario: 'Given multiple paths, find maximum length subpath common to all.',
      io: 'Return longest common subpath length.',
      constraints: 'Need scalable approach over very long path arrays.',
      objective: 'Choose monotonic answer-length search with rolling hash verification.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search subpath length and verify feasibility across all paths using hashes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-friend-requests-restrictions-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2076 - Process Restricted Friend Requests',
      scenario: 'Process friendship requests while honoring restrictions that prohibit certain pairs from connecting.',
      io: 'Return acceptance boolean list for each request in order.',
      constraints: 'Each accepted request changes future connectivity landscape.',
      objective: 'Choose DSU-based conditional merge pattern with restriction checks.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find tracks components; each candidate merge is validated against restrictions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-all-keys-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 864 - Shortest Path to Get All Keys',
      scenario: 'Grid contains walls, keys, and locks; collect all keys with shortest steps.',
      io: 'Return minimum moves required, or -1 if impossible.',
      constraints: 'State depends on position plus set of collected keys.',
      objective: 'Choose compressed-state search pattern over key-bitmask state space.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Use BFS/DP over (row, col, keyMask) to represent navigation and inventory state.',
  }),
]

export default data
