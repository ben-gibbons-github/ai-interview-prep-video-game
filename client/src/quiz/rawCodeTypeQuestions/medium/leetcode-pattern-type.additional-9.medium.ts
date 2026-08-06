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
    id: 'leetcode-pattern-type-medium-car-pooling-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1094 - Car Pooling',
      scenario: 'Trips define passengers, start, and end points on a number line. Decide if vehicle capacity is never exceeded along route.',
      io: 'Return true if all trips can be completed without capacity overflow.',
      constraints: 'Many overlapping intervals; need event aggregation rather than simulating every mile.',
      objective: 'Identify boundary-event accumulation over pickup and dropoff points.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Add passenger deltas at boundaries, sweep in coordinate order, and track running load.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-find-duplicate-number-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 287 - Find the Duplicate Number',
      scenario: 'Array contains n+1 integers in [1, n] with exactly one repeated number; find duplicate without modifying array and O(1) extra space.',
      io: 'Return duplicate integer.',
      constraints: 'No sorting or in-place marking allowed by stricter formulation.',
      objective: 'Recognize value-to-index functional graph cycle interpretation and detect cycle entry.',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'Treat nums[i] as next pointer; duplicate creates cycle, and Floyd detects cycle entry as duplicate.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-path-sum-iii-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 437 - Path Sum III',
      scenario: 'Count number of downward paths in a binary tree whose node-value sum equals target.',
      io: 'Return total valid path count.',
      constraints: 'Path can start and end anywhere as long as direction is parent to child.',
      objective: 'Choose prefix-sum frequency pattern adapted to DFS traversal state.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'During DFS, count prior prefix sums equal to currentSum-target to tally paths ending at current node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-pacific-atlantic-water-flow-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 417 - Pacific Atlantic Water Flow',
      scenario: 'Given heights matrix, return coordinates from which water can flow to both Pacific and Atlantic edges under non-increasing flow rule.',
      io: 'Return list of cells reaching both oceans.',
      constraints: 'Reverse-flow perspective from ocean boundaries avoids expensive per-cell flood simulation.',
      objective: 'Identify multi-source graph traversal from boundary sets and intersect reachable regions.',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Run BFS/DFS from each ocean boundary to mark reachable cells, then intersect marks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximal-square-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 221 - Maximal Square',
      scenario: 'Find area of largest square containing only 1s in a binary matrix.',
      io: 'Return maximal square area.',
      constraints: 'Need local recurrence using neighboring states to avoid O(n^3) expansion checks.',
      objective: 'Choose grid-based DP pattern where each cell derives maximal square side from adjacent states.',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP[i][j] = 1 + min(top, left, topleft) when matrix cell is 1; track max side globally.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-target-sum-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 494 - Target Sum',
      scenario: 'Assign + or - signs to each number so resulting expression equals target; count number of valid assignments.',
      io: 'Return number of sign assignments producing target.',
      constraints: 'State branches on each element, creating exponential naive tree without memoization.',
      objective: 'Identify subset-sum/knapsack transformation for counting combinations under derived capacity.',
    }),
    correctPattern: '0/1 Knapsack Pattern',
    correctExplanation: 'Transform into counting subsets reaching (sum+target)/2 and solve with 0/1 knapsack counting DP.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-course-schedule-ii-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 210 - Course Schedule II',
      scenario: 'Given prerequisite pairs, return one valid course ordering to finish all courses or empty if impossible.',
      io: 'Return topological ordering array or empty array on cycle.',
      constraints: 'Need explicit ordering output, not just cycle-detection boolean.',
      objective: 'Choose indegree-based DAG processing that emits nodes in dependency-satisfying order.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Start with zero-indegree courses, remove edges as processed, and collect ordering sequence.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-length-pair-chain-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 646 - Maximum Length of Pair Chain',
      scenario: 'Given pairs [a,b], find longest chain where next pair starts after previous ends.',
      io: 'Return maximum chain length.',
      constraints: 'Ordering by end boundaries leads to optimal greedy transitions.',
      objective: 'Identify interval scheduling style pattern over sorted pair endpoints.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Sort by pair end and greedily choose compatible next pair to maximize chain length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-insert-interval-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 57 - Insert Interval',
      scenario: 'Insert a new interval into non-overlapping sorted intervals, merging as needed to maintain sorted non-overlapping output.',
      io: 'Return resulting interval list after insertion and merge.',
      constraints: 'Need single linear pass partitioning into before, overlap, and after segments.',
      objective: 'Choose overlap detection and merge accumulation strategy for interval maintenance.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Scan intervals, append non-overlapping left, merge overlaps with new interval, then append right remainder.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-width-of-binary-tree-crazy-9',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 662 - Maximum Width of Binary Tree',
      scenario: 'Compute maximum width among all binary tree levels, where null gaps between end nodes count toward width.',
      io: 'Return integer maximum width.',
      constraints: 'Need position indexing while traversing breadth levels to account for gaps accurately.',
      objective: 'Identify level-order traversal pattern enhanced with conceptual heap-index coordinates.',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'BFS per level with normalized positional indices yields accurate width as last-first+1.',
  }),
]

export default data
