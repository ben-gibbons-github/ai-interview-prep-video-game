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
    id: 'leetcode-pattern-type-hard-sliding-window-median-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 480 - Sliding Window Median',
      scenario: 'For each window of size k across an array, compute median of window values as it slides one step at a time.',
      io: 'Return list of medians for every window position.',
      constraints: 'Need efficient insertion, deletion, and median retrieval under moving boundary updates.',
      objective: 'Choose dual-heap balancing pattern with lazy deletion to support dynamic windows.',
    }),
    correctPattern: 'Two Heaps (Median Finder)',
    correctExplanation: 'Maintain lower and upper halves in heaps; rebalance and lazily prune expired elements to extract medians.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-loud-and-rich-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 851 - Loud and Rich',
      scenario: 'Given richer-than relations and quietness scores, for each person find least quiet person among everyone at least as rich as them.',
      io: 'Return answer array where answer[i] is chosen person for i.',
      constraints: 'Directed acyclic relation graph allows dependency-driven propagation of best candidate.',
      objective: 'Identify DAG processing pattern that propagates optimal metadata along topological order.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Process nodes in topological order and propagate quieter representative through outgoing edges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-minimum-window-substring-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 76 - Minimum Window Substring (Deep Constraint Framing)',
      scenario: 'Find smallest substring of s containing all characters from t with multiplicities.',
      io: 'Return minimum covering substring or empty string when impossible.',
      constraints: 'Need coupled expand-and-contract behavior with live deficit accounting.',
      objective: 'Choose variable-size sliding window pattern with exact requirement satisfaction tracking.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Expand right to satisfy counts, then contract left while maintaining validity to minimize window.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-minimum-in-rotated-sorted-array-ii-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 154 - Find Minimum in Rotated Sorted Array II',
      scenario: 'Find minimum in rotated sorted array that may contain duplicates.',
      io: 'Return minimum element.',
      constraints: 'Duplicates reduce certainty of sorted-half detection and require careful boundary moves.',
      objective: 'Identify rotated-array binary search variant robust to duplicate ambiguity.',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Binary search compares mid and right boundaries, shrinking cautiously when duplicates obscure ordering.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-optimize-water-distribution-village-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1168 - Optimize Water Distribution in a Village',
      scenario: 'Each house can build its own well or connect with pipes; minimize total cost to supply water to all houses.',
      io: 'Return minimum total infrastructure cost.',
      constraints: 'Model includes virtual source for well options plus pipe edges between houses.',
      objective: 'Choose edge-sorted global connection strategy using disjoint-set connectivity checks.',
    }),
    correctPattern: "Minimum Spanning Tree (Kruskal's Algorithm)",
    correctExplanation: 'Add virtual node edges for wells, then run Kruskal to find cheapest spanning structure.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-with-alternating-colors-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1129 - Shortest Path with Alternating Colors',
      scenario: 'Directed graph has red/blue edges; compute shortest distances from node 0 when successive edges must alternate colors.',
      io: 'Return distance array, -1 for unreachable nodes.',
      constraints: 'State must include last edge color to enforce alternation constraint.',
      objective: 'Identify unweighted BFS over expanded state space (node, lastColor).',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS on augmented state graph finds shortest alternating path lengths correctly.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-number-of-good-paths-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2421 - Number of Good Paths',
      scenario: 'Count paths whose endpoints share same value and all interior values are <= endpoint value.',
      io: 'Return total number of good paths.',
      constraints: 'Need process nodes grouped by value while maintaining connectivity under threshold activation.',
      objective: 'Choose DSU progression by sorted value levels with component-level counting.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union eligible edges in nondecreasing value order and count equal-value endpoint combinations per component.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-vacation-days-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 568 - Maximum Vacation Days',
      scenario: 'Given flights matrix and vacation days matrix, maximize total vacation days across weeks with allowed weekly city transitions.',
      io: 'Return maximum obtainable vacation days.',
      constraints: 'Week-by-week decisions depend on prior reachable cities and chosen transitions.',
      objective: 'Choose dynamic programming over time and city states.',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP[week][city] captures max vacation achievable by arriving at each city each week.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-reducing-dishes-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1402 - Reducing Dishes',
      scenario: 'Chef can choose subset and order of dishes with satisfaction values to maximize sum(time * satisfaction).',
      io: 'Return maximum like-time coefficient.',
      constraints: 'Order matters and negative values may still be useful when paired with larger positives later.',
      objective: 'Identify cumulative contribution optimization pattern after strategic sorting and prefix evaluation.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Sorted traversal with running prefix sum reveals when adding another dish increases total score.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximal-rectangle-crazy-9',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 85 - Maximal Rectangle (Histogram Reduction Framing)',
      scenario: 'Given binary matrix, compute area of largest rectangle containing only 1s.',
      io: 'Return maximal rectangle area.',
      constraints: 'Need combine row-wise height accumulation with fast largest-rectangle computation per histogram.',
      objective: 'Choose monotonic stack span-discovery pattern for histogram boundaries.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Each row builds histogram heights; monotonic stack computes largest rectangle in O(cols) per row.',
  }),
]

export default data
