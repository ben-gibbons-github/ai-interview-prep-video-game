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
    id: 'leetcode-pattern-type-hard-lc23-merge-k-sorted-lists-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 23 - Merge k Sorted Lists',
      fullProblem: 'Merge k sorted linked lists and return one sorted linked list containing all nodes.',
      io: 'Input: array of linked-list heads. Output: merged sorted linked list head.',
      constraints: 'Need repeatedly extract smallest current node across k frontiers efficiently.',
      objective: 'Which multi-stream merge pattern uses priority ordering over list heads?',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Min-heap over current heads repeatedly yields next smallest node among all lists.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc212-word-search-ii-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 212 - Word Search II',
      fullProblem: 'Given board and list of words, return all words that can be formed by adjacent cells without reusing a cell per word path.',
      io: 'Input: char grid and words list. Output: list of found words.',
      constraints: 'Need prune prefix-infeasible DFS branches across many candidate words.',
      objective: 'Which prefix indexing structure combined with board search is the key optimization pattern?',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Insert words in trie and DFS board while following trie edges, pruning dead prefixes early.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc480-sliding-window-median-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 480 - Sliding Window Median',
      fullProblem: 'Given nums and window size k, return median for every sliding window of size k.',
      io: 'Input: nums and k. Output: array of medians per window position.',
      constraints: 'Need support insertions, delayed removals, and median queries while window moves.',
      objective: 'Which balanced two-heap pattern is commonly used for rolling median maintenance?',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Use max-heap and min-heap to keep lower/upper halves balanced and extract median per step.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc51-n-queens-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 51 - N-Queens',
      fullProblem: 'Place n queens on n x n chessboard so no two queens attack each other and return all distinct board configurations.',
      io: 'Input: integer n. Output: list of valid board configurations.',
      constraints: 'Need incremental row decisions with aggressive pruning of invalid columns/diagonals.',
      objective: 'Which search pattern explicitly uses pruning constraints during backtracking?',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Backtracking tries placements row-by-row while pruning attacked columns and diagonals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc37-sudoku-solver-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 37 - Sudoku Solver',
      fullProblem: 'Fill a partially completed 9x9 Sudoku board in-place to produce a valid completed puzzle.',
      io: 'Input: partially filled board. Output: solved board.',
      constraints: 'Must satisfy row, column, and 3x3 sub-box constraints for every digit placement.',
      objective: 'Which backtracking paradigm leverages constraint checking and propagation to cut search?',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Recursively fill empties and prune branches violating row/col/box constraints.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc188-best-time-to-buy-and-sell-stock-iv-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 188 - Best Time to Buy and Sell Stock IV',
      fullProblem: 'Given prices and integer k, find max profit with at most k stock transactions.',
      io: 'Input: prices array and k. Output: maximum achievable profit.',
      constraints: 'State depends on day, transactions used, and whether currently holding stock.',
      objective: 'Which state-machine dynamic programming pattern models buy/sell transitions best?',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'DP states for holding/not-holding across transaction counts capture optimal transitions each day.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc315-count-of-smaller-numbers-after-self-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 315 - Count of Smaller Numbers After Self',
      fullProblem: 'For each index i, count how many numbers to its right are strictly smaller than nums[i].',
      io: 'Input: nums array. Output: counts array.',
      constraints: 'Need online suffix counting and prefix query over value ranks.',
      objective: 'Which indexed cumulative-frequency data structure pattern is well-suited here?',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Coordinate-compress values and process from right to left with BIT updates and prefix-sum queries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc778-swim-in-rising-water-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 778 - Swim in Rising Water',
      fullProblem: 'Grid cell value is elevation/time. You can enter a cell once time >= elevation. Find minimum time to reach bottom-right from top-left.',
      io: 'Input: elevation grid. Output: minimum feasible arrival time.',
      constraints: 'Path cost is minimax of elevations encountered; need best-first frontier expansion.',
      objective: 'Which weighted shortest-path pattern adapts to minimax path costs on a grid?',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Use priority queue by current path cost where cost is max elevation seen so far along path.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc632-smallest-range-covering-elements-from-k-lists-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 632 - Smallest Range Covering Elements from K Lists',
      fullProblem: 'Given k sorted lists, find the smallest range [a,b] that includes at least one number from each list.',
      io: 'Input: list of sorted integer lists. Output: smallest covering interval.',
      constraints: 'Need maintain one candidate from each list and move only the list that limits current range.',
      objective: 'Which multi-list heap-based pattern incrementally advances merged frontiers?',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Track current heads in min-heap and current maximum value; pop min and advance its list.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc269-alien-dictionary-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 269 - Alien Dictionary',
      fullProblem: 'Given sorted list of words in an unknown alphabet, derive a valid character order or return empty if invalid.',
      io: 'Input: ordered words list. Output: string representing valid alien character order.',
      constraints: 'Need infer precedence edges from adjacent words and detect cycles.',
      objective: 'Which indegree-driven ordering pattern produces a topological character sequence?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Build directed graph of precedence constraints and perform Kahn BFS to extract valid order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc403-frog-jump-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 403 - Frog Jump',
      fullProblem: 'Frog starts on first stone and if last jump was k, next jump can be k-1, k, or k+1. Determine if frog can reach last stone.',
      io: 'Input: sorted stone positions. Output: boolean reachability result.',
      constraints: 'State requires position plus last jump length with many overlapping subproblems.',
      objective: 'Which one-dimensional style dynamic programming pattern over reachable states is suitable?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Track reachable jump lengths per stone using memoization/DP transitions from prior reachable states.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2246-longest-path-with-different-adjacent-characters-additional-19',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2246 - Longest Path With Different Adjacent Characters',
      fullProblem: 'Given rooted tree and string labels per node, find length of longest path where adjacent nodes have different characters.',
      io: 'Input: parent array and labels string. Output: longest valid path length.',
      constraints: 'Need combine best child chains at each node under character inequality constraint.',
      objective: 'Which tree longest-path pattern computes global best by merging top child contributions?',
    }),
    correctPattern: 'Tree Diameter / Longest Path Pattern',
    correctExplanation: 'DFS computes best downward chain per node and updates global answer by combining top valid child chains.',
  }),
]

export default data
