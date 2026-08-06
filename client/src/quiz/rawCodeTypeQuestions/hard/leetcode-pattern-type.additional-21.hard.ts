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
    id: 'leetcode-pattern-type-hard-lc4-median-of-two-sorted-arrays-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 4 - Median of Two Sorted Arrays',
      fullProblem: 'Find median of two sorted arrays in O(log(min(m,n))) time.',
      io: 'Input: nums1 and nums2 sorted arrays. Output: median as float.',
      constraints: 'Need partition boundaries where left half and right half satisfy ordering conditions.',
      objective: 'Which boundary-finding binary-search pattern is used to locate valid partition cut?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search partition index in smaller array until maxLeft <= minRight across both arrays.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc72-edit-distance-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 72 - Edit Distance',
      fullProblem: 'Given words word1 and word2, return minimum operations (insert, delete, replace) to convert word1 to word2.',
      io: 'Input: word1 and word2 strings. Output: minimum edit distance.',
      constraints: 'State depends on prefixes of both strings with three transition choices.',
      objective: 'Which 2D dynamic programming pattern over string indices best models this?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'dp[i][j] stores min edits for prefixes and transitions from insert/delete/replace neighboring states.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc312-burst-balloons-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 312 - Burst Balloons',
      fullProblem: 'Given balloons with values, bursting i yields nums[left]*nums[i]*nums[right]. Maximize coins by choosing order.',
      io: 'Input: nums array. Output: maximum total coins.',
      constraints: 'Optimal substructure is interval-based by choosing last balloon burst in sub-interval.',
      objective: 'Which interval-table DP family computes best value for every [l,r] range?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'Use interval DP with padded boundaries and try each k as last burst within interval.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc329-longest-increasing-path-in-a-matrix-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 329 - Longest Increasing Path in a Matrix',
      fullProblem: 'Return length of longest strictly increasing path in a matrix moving 4 directions.',
      io: 'Input: integer matrix. Output: maximum increasing path length.',
      constraints: 'Need avoid exponential recomputation of paths from each cell.',
      objective: 'Which graph-traversal pattern with memoized depth expansion solves this efficiently?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS from each cell with memoization computes longest increasing path starting there once.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc765-couples-holding-hands-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 765 - Couples Holding Hands',
      fullProblem: 'People seated in row; couples are numbered (0,1), (2,3), etc. Minimum swaps so every couple sits together.',
      io: 'Input: row array. Output: minimum swaps needed.',
      constraints: 'Need connect components of couple IDs induced by seat pairs.',
      objective: 'Which connectivity-component pattern models swaps via unions of mismatched couples?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union couple groups sharing seats; swaps needed equals component size minus one summed over components.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc864-shortest-path-to-get-all-keys-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 864 - Shortest Path to Get All Keys',
      fullProblem: 'Grid has walls, locks, and keys. Starting at @, collect all keys with shortest number of steps.',
      io: 'Input: grid of chars. Output: minimum steps to collect all keys, or -1.',
      constraints: 'State must include position and collected-key subset to handle revisits correctly.',
      objective: 'Which compressed-state pattern using bitmasks is central for representing key possession?',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Represent key set as bitmask and traverse states (r,c,mask), avoiding revisiting weaker equivalent states.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc815-bus-routes-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 815 - Bus Routes',
      fullProblem: 'Given bus routes and source/target stops, return minimum number of buses needed to travel from source to target.',
      io: 'Input: routes matrix, source stop, target stop. Output: minimum buses or -1.',
      constraints: 'All transfers have equal step cost in route graph abstraction.',
      objective: 'Which unweighted shortest-path traversal pattern yields minimum transfers?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over routes/stops layers guarantees first time reaching target stop uses fewest buses.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc980-unique-paths-iii-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 980 - Unique Paths III',
      fullProblem: 'Grid has start, end, obstacles, and empty cells. Count paths from start to end that visit every non-obstacle cell exactly once.',
      io: 'Input: grid matrix. Output: number of valid Hamiltonian-like paths.',
      constraints: 'Need exhaustive path search with backtracking and visited-state control.',
      objective: 'Which grid-focused backtracking pattern is purpose-built for explore/unchoose traversal?',
    }),
    correctPattern: 'Grid Backtracking (Word Search)',
    correctExplanation: 'DFS with mark/unmark explores all path permutations while enforcing visit-each-cell-once constraints.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1632-rank-transform-of-a-matrix-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1632 - Rank Transform of a Matrix',
      fullProblem: 'Assign rank to each cell so equal values connected by row/col constraints share compatible ranks and larger values receive larger ranks when constrained.',
      io: 'Input: integer matrix. Output: rank-transformed matrix.',
      constraints: 'Need process values in increasing order and resolve dependency ordering among grouped components.',
      objective: 'Which ordering pattern over dependency graph (after grouping equal values) can finalize rank levels?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Dependency edges among components can be processed in indegree order to assign increasing ranks consistently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1723-find-minimum-time-to-finish-all-jobs-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1723 - Find Minimum Time to Finish All Jobs',
      fullProblem: 'Distribute jobs among k workers minimizing maximum working time of any worker.',
      io: 'Input: jobs array and k. Output: minimum possible makespan.',
      constraints: 'State-space assignment can be compressed by subset masks for workers/jobs in DP-based formulations.',
      objective: 'Which subset-state optimization pattern commonly appears in exact solutions for constrained assignment?',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Bitmask DP enumerates assigned job subsets and transitions while tracking best achievable worker load bounds.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1289-minimum-falling-path-sum-ii-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1289 - Minimum Falling Path Sum II',
      fullProblem: 'Choose one element from each row of square grid; adjacent rows cannot choose same column. Minimize total sum.',
      io: 'Input: n x n grid. Output: minimum constrained falling-path sum.',
      constraints: 'Each row state depends on previous row minimum excluding same column.',
      objective: 'Which grid/table dynamic programming pattern computes constrained row-to-row transitions?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP row transitions use smallest and second-smallest previous-row values to avoid same-column reuse.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1425-constrained-subsequence-sum-additional-21',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1425 - Constrained Subsequence Sum',
      fullProblem: 'Find maximum subsequence sum where indices of consecutive chosen elements differ by at most k.',
      io: 'Input: nums and k. Output: maximum constrained subsequence sum.',
      constraints: 'Need maintain best DP values over sliding window of recent indices.',
      objective: 'Which deque pattern maintains candidates in decreasing order for windowed maximum DP transitions?',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Use deque of indices with decreasing dp values; front gives best prior state within distance k.',
  }),
]

export default data
