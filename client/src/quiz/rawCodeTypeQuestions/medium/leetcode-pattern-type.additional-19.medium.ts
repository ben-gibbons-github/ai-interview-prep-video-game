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
    id: 'leetcode-pattern-type-medium-lc76-minimum-window-substring-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 76 - Minimum Window Substring',
      fullProblem: 'Given strings s and t, find the minimum window in s that contains all characters of t including multiplicity. Return empty string if no such window exists.',
      io: 'Input: s and t. Output: shortest valid substring of s.',
      constraints: 'Need maintain required character counts and shrink while validity holds.',
      objective: 'Which variable-size window pattern is the canonical approach for minimum-cover substring problems?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Expand right to satisfy counts, then shrink left greedily while keeping the window valid.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc347-top-k-frequent-elements-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 347 - Top K Frequent Elements',
      fullProblem: 'Return the k most frequent elements from integer array nums.',
      io: 'Input: nums and k. Output: list of k most frequent values in any order.',
      constraints: 'Need better than full sort by frequency when data is large.',
      objective: 'Which top-frequency extraction pattern is designed specifically for this class of problem?',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Count frequencies and use heap or bucket strategy to retrieve k highest-frequency elements efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc721-accounts-merge-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 721 - Accounts Merge',
      fullProblem: 'Accounts belong to same person if they share any email. Merge accounts and return consolidated account lists with sorted emails.',
      io: 'Input: accounts list with name and emails. Output: merged account groups.',
      constraints: 'Need merge transitive overlaps across many shared identifiers.',
      objective: 'Which connectivity-union pattern efficiently merges overlapping account indices?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union account indices that share an email, then aggregate emails by resulting representative roots.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc210-course-schedule-ii-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 210 - Course Schedule II',
      fullProblem: 'Given number of courses and prerequisites, return an order to finish all courses or empty list if impossible.',
      io: 'Input: numCourses and prerequisite pairs. Output: valid topological order or empty array.',
      constraints: 'Need detect cycles and produce dependency-respecting order.',
      objective: 'Which indegree-based ordering pattern builds a valid sequence from DAG prerequisites?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Queue courses with indegree 0, process them, decrement neighbors indegrees, and build order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc130-surrounded-regions-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 130 - Surrounded Regions',
      fullProblem: 'Given board of X and O, capture all regions fully surrounded by X by flipping surrounded O to X.',
      io: 'Input: char grid. Output: grid mutated with enclosed regions captured.',
      constraints: 'Border-connected O cells must be preserved while enclosed components are flipped.',
      objective: 'Which graph traversal pattern marks border-reachable components before final conversion pass?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Run DFS/BFS from border O cells to mark safe cells; flip unmarked O cells afterward.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc54-spiral-matrix-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 54 - Spiral Matrix',
      fullProblem: 'Return all elements of matrix in spiral order starting from top-left and moving right first.',
      io: 'Input: matrix. Output: array of elements in spiral traversal order.',
      constraints: 'Need boundary management for top, bottom, left, and right as layers are consumed.',
      objective: 'Which matrix traversal pattern explicitly handles spiral boundary contraction?',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Iteratively traverse top row, right column, bottom row, left column while shrinking boundaries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc973-k-closest-points-to-origin-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 973 - K Closest Points to Origin',
      fullProblem: 'Given points on 2D plane, return k points closest to origin by Euclidean distance.',
      io: 'Input: points array and k. Output: k closest points in any order.',
      constraints: 'Need avoid full sort when k is much smaller than n.',
      objective: 'Which top-k selection pattern keeps best candidates by priority ordering?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Use heap/selection approach to maintain k smallest distances while scanning points.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc981-time-based-key-value-store-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 981 - Time Based Key-Value Store',
      fullProblem: 'Implement TimeMap with set(key, value, timestamp) and get(key, timestamp) returning value with largest timestamp <= query time.',
      io: 'Input: operation sequence with timestamps. Output: string values for get queries.',
      constraints: 'Per key timestamps are non-decreasing; query needs rightmost timestamp not exceeding target.',
      objective: 'Which boundary-search pattern is used to find floor timestamp in sorted per-key history?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search each key history for the rightmost entry with timestamp <= query timestamp.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc146-lru-cache-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 146 - LRU Cache',
      fullProblem: 'Design LRU cache with O(1) get and put and fixed capacity, evicting least recently used item on overflow.',
      io: 'Input: cache operation sequence. Output: values for get operations.',
      constraints: 'Need constant-time key lookup and recency updates.',
      objective: 'Which data-structure design pattern combines hash map with recency list for O(1) operations?',
    }),
    correctPattern: 'LRU Cache',
    correctExplanation: 'Hash map points to doubly-linked nodes so gets/puts can move entries to MRU position in O(1).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc322-coin-change-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 322 - Coin Change',
      fullProblem: 'Given coin denominations and amount, return minimum number of coins needed to make amount, or -1 if impossible.',
      io: 'Input: coins array and amount. Output: minimum coin count or -1.',
      constraints: 'Can use each coin denomination unlimited times.',
      objective: 'Which unbounded-choice DP pattern fits repeated denomination usage with optimization objective?',
    }),
    correctPattern: 'Unbounded Knapsack Pattern',
    correctExplanation: 'DP over amounts uses transitions from amount-coin with unlimited reuse of each denomination.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1277-count-square-submatrices-with-all-ones-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1277 - Count Square Submatrices with All Ones',
      fullProblem: 'Count all square submatrices that consist entirely of 1 values in a binary matrix.',
      io: 'Input: binary matrix. Output: total number of all-ones squares.',
      constraints: 'Cell contribution depends on top, left, and top-left neighbors.',
      objective: 'Which grid dynamic programming pattern builds largest square ending at each cell?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'dp[r][c] = 1 + min(top, left, topLeft) for 1-cells gives count contribution per cell.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc207-course-schedule-additional-19',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 207 - Course Schedule',
      fullProblem: 'Determine if you can finish all courses given prerequisite pairs.',
      io: 'Input: numCourses and prerequisites. Output: true if all courses can be completed.',
      constraints: 'Need cycle detection in directed prerequisite graph.',
      objective: 'Which indegree-based topological processing pattern confirms acyclic completion feasibility?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'If Kahn processing visits all nodes, graph is acyclic and all courses are completable.',
  }),
]

export default data
