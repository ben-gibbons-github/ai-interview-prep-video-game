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
    id: 'leetcode-pattern-type-hard-lc42-trapping-rain-water-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 42 - Trapping Rain Water',
      fullProblem: 'Given n non-negative integers representing elevation map bars, compute how much water can be trapped after raining.',
      io: 'Input: height array. Output: total trapped water.',
      constraints: 'Need linear-time approach without per-index nested scans.',
      objective: 'Which opposing-pointer pattern uses running left/right maxima to accumulate trapped water?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move the side with lower boundary inward, updating max boundary and accumulating fill based on that side.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc460-lfu-cache-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 460 - LFU Cache',
      fullProblem: 'Design LFU cache with O(1) average get and put, evicting least frequently used key and least recently used among ties.',
      io: 'Input: operation sequence with capacity constraint. Output: query values for get calls.',
      constraints: 'Need frequency buckets and recency ordering per frequency.',
      objective: 'Which dedicated cache-design pattern explicitly targets frequency-first eviction with O(1) operations?',
    }),
    correctPattern: 'LFU Cache',
    correctExplanation: 'Use hash maps plus doubly-linked frequency buckets to support O(1) frequency updates and evictions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc297-serialize-and-deserialize-binary-tree-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 297 - Serialize and Deserialize Binary Tree',
      fullProblem: 'Design algorithms to serialize a binary tree to string and deserialize back to original structure.',
      io: 'Input: binary tree root / serialized data string. Output: string form and reconstructed root.',
      constraints: 'Need deterministic structural encoding including null children placeholders.',
      objective: 'Which root-first tree traversal pattern is commonly used to emit and rebuild node order with null markers?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order with null sentinels preserves structure; deserialization consumes tokens recursively in same order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc126-word-ladder-ii-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 126 - Word Ladder II',
      fullProblem: 'Return all shortest transformation sequences from beginWord to endWord, changing one letter at a time using dictionary words.',
      io: 'Input: beginWord, endWord, wordList. Output: all shortest transformation paths.',
      constraints: 'Need shortest-path layering in implicit graph before collecting all minimal routes.',
      objective: 'Which unweighted shortest-path pattern determines minimal depth frontier before path reconstruction?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS builds shortest-level parent relationships; then backtracking enumerates all paths at that minimal depth.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1463-cherry-pickup-ii-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1463 - Cherry Pickup II',
      fullProblem: 'Two robots start at top row corners and move down one row at a time (left/down-right variations). Collect maximum cherries without double-counting same cell.',
      io: 'Input: grid matrix. Output: maximum cherries collectable.',
      constraints: 'State needs row and both robot columns, with transitions from previous row positions.',
      objective: 'Which grid-style dynamic programming pattern models multi-agent row transitions?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP over (row, col1, col2) transitions from prior row candidate column pairs and accumulates cherries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc871-minimum-number-of-refueling-stops-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 871 - Minimum Number of Refueling Stops',
      fullProblem: 'Travel to target with initial fuel and stations along route. Find minimum refueling stops needed, or -1 if impossible.',
      io: 'Input: target, startFuel, stations [position, fuel]. Output: minimum stop count or -1.',
      constraints: 'Need greedily choose largest available fuel among reachable stations when fuel runs low.',
      objective: 'Which heap-based top-selection pattern repeatedly picks best previously reachable option?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Push reachable station fuels into max-heap and refuel from largest when needed to extend reach optimally.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc123-best-time-to-buy-and-sell-stock-iii-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 123 - Best Time to Buy and Sell Stock III',
      fullProblem: 'Given stock prices, return maximum profit with at most two complete transactions.',
      io: 'Input: prices array. Output: maximum total profit with <=2 transactions.',
      constraints: 'Need state transitions for buy/sell phases across transaction counts.',
      objective: 'Which stock-state dynamic programming pattern tracks hold/cash states through time?',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'Maintain states for first buy/sell and second buy/sell, updating each day for optimal profit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc154-find-minimum-in-rotated-sorted-array-ii-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 154 - Find Minimum in Rotated Sorted Array II',
      fullProblem: 'Find minimum element in rotated sorted array that may contain duplicates.',
      io: 'Input: rotated sorted nums with possible duplicates. Output: minimum value.',
      constraints: 'Duplicates can obscure sorted-half detection and may require cautious boundary shrink.',
      objective: 'Which rotated-array search pattern remains the base strategy for pivot/minimum discovery?',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Binary-search style comparisons with right boundary guide search, with duplicate handling by shrinking bounds.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc332-reconstruct-itinerary-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 332 - Reconstruct Itinerary',
      fullProblem: 'Given airline tickets [from,to], reconstruct itinerary using all tickets exactly once starting from JFK, choosing lexical order when multiple valid itineraries exist.',
      io: 'Input: ticket pairs. Output: ordered airport itinerary.',
      constraints: 'Need edge-consuming traversal in directed graph with lexical tie-breaking.',
      objective: 'Which depth-first graph traversal pattern is used for Eulerian-path style route construction?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Hierholzer-style DFS consumes edges and appends airports in post-order to build valid itinerary.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc878-nth-magical-number-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 878 - Nth Magical Number',
      fullProblem: 'A magical number is divisible by a or b. Return the nth magical number modulo 1e9+7.',
      io: 'Input: n, a, b. Output: nth magical value modulo mod.',
      constraints: 'Count of magical numbers <= X is monotonic and can be computed using lcm inclusion-exclusion.',
      objective: 'Which answer-space search pattern finds smallest X whose magical count reaches n?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search X and compute count = X/a + X/b - X/lcm(a,b) to locate minimal feasible value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc493-reverse-pairs-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 493 - Reverse Pairs',
      fullProblem: 'Count pairs (i,j) where i < j and nums[i] > 2*nums[j].',
      io: 'Input: nums array. Output: number of reverse pairs.',
      constraints: 'Need faster than O(n^2) with dynamic rank queries over processed suffix/prefix elements.',
      objective: 'Which indexed cumulative-frequency structure pattern supports range counting while scanning?',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Coordinate compression plus BIT enables counting prior values above/below transformed thresholds in O(log n).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc218-the-skyline-problem-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 218 - The Skyline Problem',
      fullProblem: 'Given building rectangles, output skyline key points where visible contour height changes.',
      io: 'Input: buildings [left,right,height]. Output: list of key points [x,height].',
      constraints: 'Need ordered boundary event processing and dynamic active-height maintenance.',
      objective: 'Which event-driven interval-boundary pattern is standard for skyline contour extraction?',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sort start/end events by x and update active heights to emit points whenever current max height changes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc827-making-a-large-island-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 827 - Making A Large Island',
      fullProblem: 'Given binary grid, you may change at most one 0 to 1. Return largest possible island area after that change.',
      io: 'Input: grid matrix. Output: maximum achievable island size.',
      constraints: 'Need component labeling and quick area aggregation of neighboring distinct components around each zero.',
      objective: 'Which connectivity-component pattern can label and merge neighboring sets efficiently?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union existing land cells into components, then for each zero sum unique adjacent component sizes plus one.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1883-minimum-skips-to-arrive-at-meeting-on-time-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1883 - Minimum Skips to Arrive at Meeting On Time',
      fullProblem: 'You traverse roads with travel times dist/speed and usually wait to next integer hour between roads. You may skip waiting on some transitions. Find minimum skips to arrive within deadline.',
      io: 'Input: dist array, speed, hoursBefore. Output: minimum skips or -1.',
      constraints: 'Need DP over road index and number of skips to track minimum elapsed time state.',
      objective: 'Which one-dimensional staged dynamic programming pattern over decisions per segment is applicable?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'DP by processed roads and skips tracks best achievable time, transitioning with wait or skip choices.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1293-shortest-path-in-a-grid-with-obstacles-elimination-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1293 - Shortest Path in a Grid with Obstacles Elimination',
      fullProblem: 'Find shortest path from top-left to bottom-right in grid where you may eliminate up to k obstacles.',
      io: 'Input: grid and integer k. Output: minimum path length or -1.',
      constraints: 'State requires position plus remaining eliminations, and all moves have equal cost.',
      objective: 'Which shortest-path traversal pattern over expanded state graph should be applied?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS on states (r,c,remainingK) guarantees shortest path length while respecting elimination budget.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1542-find-longest-awesome-substring-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1542 - Find Longest Awesome Substring',
      fullProblem: 'A string of digits is awesome if its characters can be rearranged into a palindrome. Find longest awesome substring length.',
      io: 'Input: digit string s. Output: maximum awesome-substring length.',
      constraints: 'Need parity-mask of digit counts and nearest prior positions for same/one-bit-different masks.',
      objective: 'Which bit-level parity-state pattern enables O(n * alphabet) checking for palindrome-rearrange condition?',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'Track prefix parity mask; valid substring masks are equal or differ by one bit, enabling quick max-length updates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc354-russian-doll-envelopes-additional-22',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 354 - Russian Doll Envelopes',
      fullProblem: 'Given envelopes [w,h], find maximum number you can nest such that both width and height increase strictly.',
      io: 'Input: envelope pairs. Output: maximum nested chain length.',
      constraints: 'Need sorting trick and then sequence optimization on one dimension.',
      objective: 'Which sequence-growth optimization pattern after sorting dimensions is the core strategy?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Sort by width asc and height desc for ties, then compute LIS on heights.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc887-super-egg-drop-additional-22b',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 887 - Super Egg Drop',
      fullProblem: 'Given k eggs and n floors, determine minimum number of moves needed in worst case to find critical floor.',
      io: 'Input: eggs k and floors n. Output: minimum worst-case moves.',
      constraints: 'Need structured state transitions balancing break and survive outcomes.',
      objective: 'Which decision-state dynamic programming pattern is typically used for this minimax process?',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'DP state progression over moves and eggs captures floors testable under break/survive branching.',
  }),
]

export default data
