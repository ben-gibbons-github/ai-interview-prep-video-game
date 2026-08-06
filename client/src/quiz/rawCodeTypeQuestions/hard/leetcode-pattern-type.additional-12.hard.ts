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
    id: 'leetcode-pattern-type-hard-maximum-employees-to-be-invited-to-a-meeting-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2127 - Maximum Employees to Be Invited to a Meeting',
      fullProblem: 'Each employee picks one favorite colleague. Build largest invitation set where everyone sits so each invited person sits next to their favorite under circular constraints.',
      io: 'Input: favorite array representing directed graph. Output: maximum invite count.',
      constraints: 'Need handle directed cycles and chains feeding mutual pairs separately.',
      objective: 'Which cycle-detection pattern based on fast/slow pointer ideas is central for identifying cycle structures?',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'Core structure analysis depends on directed-cycle discovery and chain depth accounting around cycle nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-profit-in-job-scheduling-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1235 - Maximum Profit in Job Scheduling',
      fullProblem: 'Each job has start time, end time, and profit. Choose non-overlapping jobs to maximize total profit.',
      io: 'Input: startTime, endTime, profit arrays. Output: maximum achievable profit.',
      constraints: 'Need jump to next compatible job quickly after sorting by start/end criteria.',
      objective: 'Which pattern uses boundary binary search inside DP transitions for next non-overlapping interval?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'After sorting jobs, binary search finds next job with start >= current end for weighted interval DP transition.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-cost-to-hire-k-workers-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 857 - Minimum Cost to Hire K Workers',
      fullProblem: 'Workers have quality and minimum wage expectation. Any hired group must be paid with common wage/quality ratio meeting each expectation. Minimize total cost for exactly k workers.',
      io: 'Input: quality, wage arrays and integer k. Output: minimum feasible total wage.',
      constraints: 'Need process workers by ratio and keep best quality sum among selected set size k.',
      objective: 'Which pattern maintains bounded top-k candidate set efficiently while sweeping sorted ratio events?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Sort by wage-to-quality ratio and use heap to keep k smallest qualities for minimal ratio-scaled total.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-weighted-subgraph-with-the-required-paths-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2203 - Minimum Weighted Subgraph With the Required Paths',
      fullProblem: 'In weighted directed graph, find minimum total weight of a subgraph allowing src1->dest and src2->dest paths.',
      io: 'Input: n, edges, src1, src2, dest. Output: minimum total weight or -1.',
      constraints: 'Need combine shortest path distances from multiple sources and to destination via reversed graph.',
      objective: 'Which weighted shortest-path pattern should be run multiple times and combined for optimal meeting node?',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Run Dijkstra from src1, src2, and dest on reversed edges; combine distances at each candidate merge node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-last-day-where-you-can-still-cross-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1970 - Last Day Where You Can Still Cross',
      fullProblem: 'Cells flood day by day. Determine latest day when a path from top row to bottom row through unflooded cells still exists.',
      io: 'Input: row, col, and flood order cells. Output: latest feasible crossing day index.',
      constraints: 'Feasibility of crossing is monotonic over day number.',
      objective: 'Which pattern binary-searches day answer with a graph reachability feasibility check?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search day d and run BFS/DFS on grid state flooded up to d to test crossing feasibility.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-longest-awesome-substring-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1542 - Find Longest Awesome Substring',
      fullProblem: 'Given digit string, find longest substring that can be rearranged into palindrome (at most one digit with odd count).',
      io: 'Input: numeric string. Output: length of longest awesome substring.',
      constraints: 'Need parity-state tracking across prefixes with constant-size digit alphabet.',
      objective: 'Which compressed-state pattern encodes odd/even parity of counts for quick palindrome-feasibility checks?',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Maintain prefix parity mask; equal masks or one-bit-different masks indicate palindrome-permutable substring.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-similar-string-groups-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 839 - Similar String Groups',
      fullProblem: 'Strings are similar if two positions can be swapped in one to equal the other (or already equal). Count number of connected groups under transitive similarity.',
      io: 'Input: array of anagram strings. Output: number of similarity groups.',
      constraints: 'Need dynamic connectivity among strings under pairwise similarity relation.',
      objective: 'Which pattern unions related entities and counts resulting connected components?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union indices whose strings are similar; final number of unique roots is the group count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-distinct-subsequences-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 115 - Distinct Subsequences (Two-String DP Framing)',
      fullProblem: 'Count number of distinct subsequences of string s that equal string t.',
      io: 'Input: strings s and t. Output: count of distinct subsequences producing t.',
      constraints: 'Need careful combinational counting across prefix pairs with large overlap of subproblems.',
      objective: 'Which two-sequence DP pattern with include/exclude transitions best captures this count?',
    }),
    correctPattern: 'Longest Common Subsequence (LCS) Pattern',
    correctExplanation: '2D DP over i,j prefixes uses matching-char include plus skip transitions akin LCS-table style reasoning.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-smallest-range-covering-elements-from-k-lists-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 632 - Smallest Range Covering Elements from K Lists',
      fullProblem: 'Given k sorted integer lists, find shortest interval [a,b] containing at least one element from each list.',
      io: 'Input: list of sorted lists. Output: smallest valid range [a,b].',
      constraints: 'Need coordinated pointer advancement across lists while maintaining current global min and max.',
      objective: 'Which pattern merges k sorted streams with priority queue over current heads?',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Use min-heap of current heads and track current max; update best range while advancing popped list pointer.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-path-with-different-adjacent-characters-additional-12',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2246 - Longest Path With Different Adjacent Characters',
      fullProblem: 'Given rooted tree and character label per node, find longest path such that adjacent nodes on path have different characters.',
      io: 'Input: parent array and string s. Output: maximum valid path length.',
      constraints: 'Need combine best child chains per node while filtering same-character edges.',
      objective: 'Which tree path-aggregation pattern computes global best by combining top child contributions?',
    }),
    correctPattern: 'Tree Diameter / Longest Path Pattern',
    correctExplanation: 'Postorder computes best downward chain per node and combines top two compatible chains to update global maximum.',
  }),
]

export default data
