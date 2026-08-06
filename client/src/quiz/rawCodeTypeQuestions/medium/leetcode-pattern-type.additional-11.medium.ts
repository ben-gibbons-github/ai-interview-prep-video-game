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
    id: 'leetcode-pattern-type-medium-longest-continuous-subarray-abs-diff-limit-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1438 - Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit',
      fullProblem: 'Given nums and limit, find maximum length subarray where absolute difference between any two elements in the subarray is <= limit.',
      io: 'Input: array nums, integer limit. Output: maximum valid subarray length.',
      constraints: 'Need to maintain current window min and max efficiently while expanding/shrinking.',
      objective: 'Which pattern uses monotonic deques to track extrema in a dynamic sliding window?',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Use one decreasing deque for max and one increasing deque for min, shrinking window when max-min exceeds limit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-count-number-of-nice-subarrays-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1248 - Count Number of Nice Subarrays',
      fullProblem: 'Count contiguous subarrays containing exactly k odd numbers.',
      io: 'Input: nums and k. Output: total count of subarrays with exactly k odd elements.',
      constraints: 'Need avoid O(n^2) enumeration of all subarrays.',
      objective: 'Which pattern turns exact-count subarray queries into frequency lookups over cumulative transforms?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Track prefix count of odds; number of prior prefixes equal to current-k contributes new valid subarrays.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-asteroid-collision-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 735 - Asteroid Collision',
      fullProblem: 'Asteroids move left or right by sign. Collisions occur when right-moving asteroid meets left-moving one; smaller explodes, equal both explode.',
      io: 'Input: asteroid array by signed sizes. Output: final asteroid state after all collisions.',
      constraints: 'Need ordered resolution of chained collisions among recent right-moving asteroids.',
      objective: 'Which pattern models pending collision candidates with LIFO resolution semantics?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use stack to keep surviving asteroids; resolve collisions while top moves right and incoming moves left.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-jump-game-iii-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1306 - Jump Game III',
      fullProblem: 'Given array arr and start index, you can jump to i + arr[i] or i - arr[i]. Determine if you can reach any index with value 0.',
      io: 'Input: arr and start. Output: true if any zero-value index is reachable.',
      constraints: 'Need cycle-safe graph traversal on implicit directed edges.',
      objective: 'Which pattern fits reachability search over unweighted implicit graph states?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS/DFS with visited set explores reachable indices and stops once value 0 is found.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-delete-and-earn-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 740 - Delete and Earn',
      fullProblem: 'Choosing number x gives you x points times its frequency, but forces deletion of all x-1 and x+1 values. Maximize total points.',
      io: 'Input: nums array. Output: maximum achievable points.',
      constraints: 'Need aggregate by value then solve adjacency-exclusion optimization.',
      objective: 'Which linear DP pattern mirrors House Robber after value compression?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'After summing points per value, choose between taking current value bucket or skipping, like House Robber recurrence.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-enclaves-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1020 - Number of Enclaves',
      fullProblem: 'Given binary grid land/water, count land cells that cannot reach boundary via 4-direction moves.',
      io: 'Input: grid. Output: number of enclave land cells.',
      constraints: 'Need remove or mark all boundary-reachable land before counting remaining land.',
      objective: 'Which traversal pattern discovers connected components and excludes boundary-connected regions?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Flood-fill from boundary land cells first, then count unvisited land cells as enclaves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-sum-of-subarray-ranges-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2104 - Sum of Subarray Ranges',
      fullProblem: 'For every subarray, compute max(subarray)-min(subarray) and return total sum over all subarrays.',
      io: 'Input: integer array nums. Output: total range sum.',
      constraints: 'Need contribution-counting approach for minima/maxima, not explicit O(n^2) subarray enumeration.',
      objective: 'Which pattern extracts previous/next greater and smaller boundaries efficiently?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use monotonic stacks to count how many subarrays treat each element as max and as min; subtract contributions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-find-champion-ii-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2924 - Find Champion II',
      fullProblem: 'In directed graph of teams where edge u->v means u is stronger than v, find unique node with indegree 0 if it exists, otherwise return -1.',
      io: 'Input: n teams and edge list. Output: champion node or -1.',
      constraints: 'Need indegree accounting and uniqueness check.',
      objective: 'Which DAG-oriented counting pattern identifies nodes with no incoming dependencies?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Compute indegrees and identify whether exactly one node has indegree zero.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-subarrays-of-size-k-and-average-greater-than-threshold-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1343 - Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold',
      fullProblem: 'Count contiguous subarrays of exact length k whose average is at least threshold.',
      io: 'Input: arr, k, threshold. Output: number of qualifying subarrays.',
      constraints: 'Need O(n) fixed-window updates; avoid recomputing full window sums.',
      objective: 'Which pattern applies rolling updates to constant-size windows?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain window sum in O(1) per step and compare against k*threshold.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-path-with-maximum-gold-additional-11',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1219 - Path with Maximum Gold',
      fullProblem: 'In grid with gold values, start at any non-zero cell and move 4-directionally without revisiting a cell or stepping on zero. Maximize collected gold.',
      io: 'Input: gold grid. Output: maximum gold collectable on one path.',
      constraints: 'Need exhaustive search with pruning; each path has local visited state.',
      objective: 'Which pattern focuses on backtracking with branch constraints in grid traversal?',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Depth-first backtracking with visited marking explores paths while pruning invalid moves.',
  }),
]

export default data
