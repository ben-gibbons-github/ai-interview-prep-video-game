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
    id: 'leetcode-pattern-type-medium-subarray-sum-equals-k-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 560 - Subarray Sum Equals K',
      scenario: 'Count number of continuous subarrays whose sum equals k.',
      io: 'Return total count of valid subarrays.',
      constraints: 'Array can include negatives, so simple two-pointer window is unreliable.',
      objective: 'Pick pattern that converts subarray sum queries into cumulative differences with frequency tracking.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Use running prefix and count prior prefixes equal to current - k.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-daily-temperatures-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 739 - Daily Temperatures',
      scenario: 'For each day, compute how many days until a warmer temperature occurs.',
      io: 'Return array of wait lengths; 0 if none.',
      constraints: 'Need near-linear time and avoid nested future scans per index.',
      objective: 'Select monotonic data structure that postpones and resolves unanswered indices.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Store decreasing temps by index and resolve when warmer day appears.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-k-closest-points-origin-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 973 - K Closest Points to Origin',
      scenario: 'Choose k points with smallest Euclidean distance from origin.',
      io: 'Return any order of k closest points.',
      constraints: 'n can be large; sorting all points is not always ideal.',
      objective: 'Choose top-k maintenance pattern over computed distance keys.',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Use heap/selection to keep only k best candidates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-network-delay-time-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 743 - Network Delay Time',
      scenario: 'From source k, compute time for all nodes to receive signal in weighted directed graph.',
      io: 'Return max shortest-path distance or -1 if unreachable nodes exist.',
      constraints: 'Positive weights; need single-source shortest paths.',
      objective: 'Pick graph pattern that repeatedly finalizes next minimum-distance frontier node.',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra computes shortest distances from one source with non-negative weights.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-open-the-lock-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 752 - Open the Lock',
      scenario: 'Starting at 0000, rotate wheels to reach target avoiding deadends with minimum turns.',
      io: 'Return minimum turns or -1 if impossible.',
      constraints: 'State space is unweighted transitions among lock combinations.',
      objective: 'Choose shortest-path pattern for unweighted implicit graph states.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS layers correspond to number of turns, guaranteeing minimal steps.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-house-robber-ii-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 213 - House Robber II',
      scenario: 'Maximize robbed sum in circular street where adjacent houses cannot both be robbed.',
      io: 'Return maximum non-adjacent circular sum.',
      constraints: 'Circular dependency splits into two linear subproblems.',
      objective: 'Recognize compact 1D transition DP pattern over sequential choices.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Linear robber DP recurrence applied twice handles circle constraint.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-islands-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 200 - Number of Islands',
      scenario: 'Count connected groups of 1s in a 2D grid using 4-direction adjacency.',
      io: 'Return number of islands.',
      constraints: 'Must mark visited cells and avoid recounting components.',
      objective: 'Select traversal pattern for component discovery in graph-like grids.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS flood-fill from each unvisited land cell counts one island per traversal.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-search-2d-matrix-ii-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 240 - Search a 2D Matrix II',
      scenario: 'Matrix rows and columns sorted ascending; determine if target exists.',
      io: 'Return true if target appears in matrix.',
      constraints: 'Need sublinear elimination strategy leveraging monotonic matrix ordering.',
      objective: 'Choose matrix search pattern that discards row/column each step.',
    }),
    correctPattern: 'Matrix Binary Search',
    correctExplanation: 'Treat top-right (or bottom-left) walk as monotonic matrix search strategy.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-design-twitter-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 355 - Design Twitter',
      scenario: 'Implement posting, follow relations, and retrieval of 10 most recent tweets in feed.',
      io: 'Support postTweet, follow/unfollow, and getNewsFeed operations.',
      constraints: 'Need to merge multiple users recent tweet streams by recency.',
      objective: 'Choose multi-source ordered merge pattern for feed assembly.',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Use heap over heads of followed users timelines to produce recent merged feed.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-implement-trie-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 208 - Implement Trie (Prefix Tree)',
      scenario: 'Build data structure supporting insert, exact search, and prefix search.',
      io: 'Implement Trie class with required operations.',
      constraints: 'Operations should be proportional to word/prefix length.',
      objective: 'Identify canonical prefix-index data structure pattern for string dictionaries.',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie nodes encode shared prefixes and support efficient prefix queries.',
  }),
]

export default data
