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
    id: 'leetcode-pattern-type-hard-split-array-largest-sum-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 410 - Split Array Largest Sum',
      fullProblem: 'Split array into exactly k non-empty contiguous subarrays such that the largest subarray sum is minimized.',
      io: 'Input: nums, integer k. Output: minimum possible value of the largest subarray sum under valid split.',
      constraints: 'Feasibility of a candidate maximum sum is monotonic and can be checked greedily.',
      objective: 'Which pattern binary-searches answer space using a monotonic feasibility predicate?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search candidate max sum and greedily count required partitions to test feasibility.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-value-of-equation-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1499 - Max Value of Equation',
      fullProblem: 'Given points sorted by x and integer k, maximize yi + yj + |xi - xj| with i < j and xj - xi <= k.',
      io: 'Input: points and k. Output: maximum equation value.',
      constraints: 'Need rolling candidate optimum of transformed expression under sliding x-distance bound.',
      objective: 'Which pattern keeps best candidates in a deque while expiring out-of-range points?',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Maintain deque by descending (yi-xi), pop expired by x-distance, evaluate each new point against best front.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-word-ladder-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 127 - Word Ladder',
      fullProblem: 'Transform beginWord to endWord by changing one letter at a time, each intermediate word must belong to dictionary. Find shortest transformation length.',
      io: 'Input: beginWord, endWord, wordList. Output: minimum number of words in transformation sequence, or 0 if impossible.',
      constraints: 'Need shortest path in unweighted implicit graph over valid dictionary words.',
      objective: 'Which pattern explores states level-by-level to guarantee minimal transformation steps?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over valid one-letter transformations finds shortest chain first due to layer expansion.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-cherry-pickup-ii-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1463 - Cherry Pickup II',
      fullProblem: 'Two robots start at top row columns 0 and n-1 and move down one row at a time with column shifts -1,0,+1. Collect maximum cherries without double-counting same cell.',
      io: 'Input: grid of cherries. Output: maximum cherries collectible by both robots.',
      constraints: 'State depends on row and both robot column positions, creating 3D transition space.',
      objective: 'Which dynamic programming pattern handles multi-index state transitions over matrix rows?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP[row][c1][c2] captures best cherries from row onward for both robot positions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-palindrome-partitioning-iii-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1278 - Palindrome Partitioning III',
      fullProblem: 'Split string s into exactly k substrings, changing minimum number of characters so every substring is a palindrome.',
      io: 'Input: string s and integer k. Output: minimum number of edits needed.',
      constraints: 'Requires substring palindrome-cost preprocessing plus partition DP across cut positions.',
      objective: 'Which DP family over palindromic intervals and partition counts best fits this problem?',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'Precompute edit-cost for each substring to become palindrome, then DP over partitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-path-with-minimum-effort-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1631 - Path With Minimum Effort',
      fullProblem: 'Find path from top-left to bottom-right minimizing maximum absolute difference between adjacent cells along path.',
      io: 'Input: heights grid. Output: minimum effort value.',
      constraints: 'Edge cost composition is minimax, requiring frontier relaxation by current best effort.',
      objective: 'Which weighted graph shortest-path pattern naturally solves minimax path effort?',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra variant uses path cost = max(previous effort, edge diff) and picks next state by least effort.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-cost-to-cut-a-stick-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1547 - Minimum Cost to Cut a Stick (Interval DP Framing)',
      fullProblem: 'Given stick length n and cut positions, each cut costs current segment length. Minimize total cost of performing all cuts.',
      io: 'Input: n and cuts array. Output: minimum total cut cost.',
      constraints: 'Cost depends on boundaries of current interval; order of cuts changes total.',
      objective: 'Which interval DP pattern over substring-like boundaries should be applied?',
    }),
    correctPattern: 'Palindromic Substring / Subsequence DP',
    correctExplanation: 'Interval DP tries each cut as partition point and combines optimal left/right interval costs.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-visiting-all-nodes-alt-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 847 - Shortest Path Visiting All Nodes (State Compression Framing)',
      fullProblem: 'Given connected undirected graph, find length of shortest path that visits every node at least once.',
      io: 'Input: adjacency list graph. Output: minimum path length.',
      constraints: 'State must include both current node and visited-node subset.',
      objective: 'Which compressed-state pattern captures subset coverage and transition costs efficiently?',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'BFS/DP over (node, visitedMask) states finds minimum edges to cover all nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-most-stones-removed-with-same-row-or-column-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 947 - Most Stones Removed with Same Row or Column',
      fullProblem: 'Remove as many stones as possible where a stone can be removed if another stone remains in same row or column.',
      io: 'Input: stone coordinates. Output: maximum removable stones.',
      constraints: 'Equivalent to counting connected components under row/column adjacency.',
      objective: 'Which connectivity-maintenance pattern can union stones sharing row or column?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union stones by shared row/column; answer is total stones minus number of connected components.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-best-team-with-no-conflicts-additional-11',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1626 - Best Team With No Conflicts',
      fullProblem: 'Given players with age and score, build team maximizing total score with no younger player having strictly higher score than older teammate.',
      io: 'Input: scores and ages arrays. Output: maximum team score.',
      constraints: 'Requires sorted ordering plus subsequence-like DP transitions under score constraints.',
      objective: 'Which subsequence optimization pattern over sorted entities is most suitable?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'After sorting by age/score, DP similar to weighted LIS accumulates best non-conflicting team score.',
  }),
]

export default data
