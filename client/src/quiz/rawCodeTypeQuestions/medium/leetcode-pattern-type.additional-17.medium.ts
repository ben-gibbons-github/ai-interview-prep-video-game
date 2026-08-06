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
    id: 'leetcode-pattern-type-medium-lc1658-minimum-operations-to-reduce-x-to-zero-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1658 - Minimum Operations to Reduce X to Zero',
      fullProblem: 'You can remove numbers from either left or right end of array and subtract from x. Return minimum operations to reduce x exactly to zero, or -1.',
      io: 'Input: nums and x. Output: minimum removal operations.',
      constraints: 'Equivalent transform seeks longest middle subarray with target sum total-x.',
      objective: 'Which variable-window pattern is used to find longest subarray meeting transformed sum condition?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'For positive arrays, a dynamic window finds longest subarray summing to total-x, minimizing end removals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1466-reorder-routes-to-make-all-paths-lead-to-the-city-zero-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1466 - Reorder Routes to Make All Paths Lead to the City Zero',
      fullProblem: 'Given directed roads forming a tree over n cities, count minimum edges to reverse so every city can reach city 0.',
      io: 'Input: n and directed edges. Output: minimum reversals required.',
      constraints: 'Need traverse undirected structure while tracking original edge orientation cost.',
      objective: 'Which graph exploration pattern traverses components and aggregates orientation corrections?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Build bidirectional adjacency with orientation flags and DFS/BFS from 0 counting edges pointing away.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1482-minimum-number-of-days-to-make-m-bouquets-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1482 - Minimum Number of Days to Make m Bouquets',
      fullProblem: 'Given bloomDay array, each bouquet needs k adjacent bloomed flowers. Find minimum day to make m bouquets or -1.',
      io: 'Input: bloomDay, m, k. Output: minimum feasible day or -1.',
      constraints: 'Feasibility of making bouquets is monotonic in day threshold.',
      objective: 'Which pattern binary-searches a monotonic day answer using a linear feasibility check?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search day D and scan bloomDay to count how many k-adjacent bouquets can be formed by day D.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1870-minimum-speed-to-arrive-on-time-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1870 - Minimum Speed to Arrive on Time',
      fullProblem: 'Given train distances and hour deadline, each segment except last rounds travel time up to next integer hour. Find minimum integer speed to arrive on time.',
      io: 'Input: dist array and hour. Output: minimum speed or -1.',
      constraints: 'Arrival feasibility is monotonic as speed increases.',
      objective: 'Which pattern searches speed space with monotonic predicate checks?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Check total travel time at speed v; binary search smallest v meeting the hour constraint.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc2444-count-subarrays-with-fixed-bounds-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2444 - Count Subarrays With Fixed Bounds',
      fullProblem: 'Count subarrays whose minimum equals minK and maximum equals maxK exactly.',
      io: 'Input: nums, minK, maxK. Output: count of valid subarrays.',
      constraints: 'Need linear counting based on last invalid index and latest positions of minK/maxK.',
      objective: 'Which dynamic window counting pattern computes valid endings in O(n)?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Track last positions of minK, maxK, and invalid values; each index contributes valid starts count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc2516-take-k-of-each-character-from-left-and-right-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2516 - Take K of Each Character From Left and Right',
      fullProblem: 'String contains only a,b,c. In one minute take one char from left or right. Find minimum minutes to take at least k of each char, or -1.',
      io: 'Input: string s and integer k. Output: minimum minutes or -1.',
      constraints: 'Equivalent transform finds longest middle substring you can leave while remaining outside chars satisfy quotas.',
      objective: 'Which variable-size window pattern finds maximal keepable middle segment?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Use a dynamic window for kept middle section while ensuring removed outside counts meet all k requirements.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1161-maximum-level-sum-of-a-binary-tree-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1161 - Maximum Level Sum of a Binary Tree',
      fullProblem: 'Return level number (1-indexed) with maximum sum of node values in binary tree; if tie, return smallest level.',
      io: 'Input: tree root. Output: level index with highest sum.',
      constraints: 'Need grouped processing by depth.',
      objective: 'Which tree traversal pattern processes nodes level-by-level with queue batching?',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'Level-order traversal computes sum per depth and tracks best level index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1376-time-needed-to-inform-all-employees-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1376 - Time Needed to Inform All Employees',
      fullProblem: 'Company hierarchy forms a tree with headID. Each manager needs informTime[i] minutes to inform direct reports. Return total time to inform all employees.',
      io: 'Input: n, headID, manager[], informTime[]. Output: total minutes.',
      constraints: 'Need propagate elapsed time from root down hierarchy.',
      objective: 'Which top-down tree traversal pattern carries cumulative time through child subtrees?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'DFS from head accumulates current elapsed time and updates global maximum at leaves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1519-number-of-nodes-in-the-sub-tree-with-the-same-label-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1519 - Number of Nodes in the Sub-Tree With the Same Label',
      fullProblem: 'For each node in tree, compute number of nodes in its subtree (including itself) that share its label character.',
      io: 'Input: n, edges, labels. Output: answer array of counts per node.',
      constraints: 'Need subtree aggregate counting and parent-child merge of frequency arrays.',
      objective: 'Which bottom-up tree traversal pattern merges child summaries into parent state?',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Post-order DFS aggregates label frequencies from children then derives node answer from merged counts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1631-path-with-minimum-effort-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1631 - Path With Minimum Effort',
      fullProblem: 'Find path from top-left to bottom-right minimizing maximum absolute height difference between consecutive cells on path.',
      io: 'Input: heights grid. Output: minimum effort value.',
      constraints: 'Path cost is minimax over edge differences and needs global frontier ordering.',
      objective: 'Which weighted shortest-path pattern handles minimax edge accumulation?',
    }),
    correctPattern: "Dijkstra's Algorithm",
    correctExplanation: 'Dijkstra with path cost defined as max(currentEffort, edgeCost) yields minimum possible effort to each cell.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc1838-frequency-of-the-most-frequent-element-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1838 - Frequency of the Most Frequent Element',
      fullProblem: 'You can increment elements by 1 up to k total times. Return max possible frequency of any element after operations.',
      io: 'Input: nums and k. Output: maximum achievable frequency.',
      constraints: 'Sorted array plus dynamic window with cost formula using cumulative sums.',
      objective: 'Which variable-size window pattern checks affordability of equalizing a window to its rightmost value?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'After sorting, maintain window where cost to raise all values to nums[r] stays <= k; shrink when over budget.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc2007-find-original-array-from-doubled-array-additional-17',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2007 - Find Original Array From Doubled Array',
      fullProblem: 'Given changed array formed by taking original array values and their doubles then shuffling, recover original array or return empty if impossible.',
      io: 'Input: changed array. Output: original array or empty.',
      constraints: 'Need ordered frequency consumption with special handling around zero values.',
      objective: 'Which counting/hash pattern tracks remaining multiplicities while pairing x with 2x?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Sort by absolute value and consume counts in map by pairing each value with its double.',
  }),
]

export default data
