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
    id: 'leetcode-pattern-type-hard-minimum-number-of-refueling-stops-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 871 - Minimum Number of Refueling Stops',
      scenario: 'Travel to a target distance with finite starting fuel and fuel stations along route; minimize number of refuel stops.',
      io: 'Return minimum stops needed, or -1 if target unreachable.',
      constraints: 'Need to decide refuels retrospectively among stations already passed when fuel becomes insufficient.',
      objective: 'Choose pattern that repeatedly extracts best prior candidate by magnitude to maximize future reach.',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'A max-heap of passed station fuels greedily chooses largest available refuel when needed.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-find-critical-and-pseudo-critical-edges-mst-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1489 - Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree',
      scenario: 'Classify each graph edge as critical, pseudo-critical, or neither with respect to MST cost impact.',
      io: 'Return two lists: critical edges and pseudo-critical edges.',
      constraints: 'Requires repeated MST recomputation under edge exclusion/inclusion experiments.',
      objective: 'Identify edge-sorted MST construction pattern suitable for deterministic what-if analysis.',
    }),
    correctPattern: "Minimum Spanning Tree (Kruskal's Algorithm)",
    correctExplanation: 'Kruskal with DSU is repeatedly applied to compare baseline MST against forced include/exclude scenarios.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-bridge-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 934 - Shortest Bridge',
      scenario: 'In a binary grid containing exactly two islands, flip minimal number of water cells to connect them.',
      io: 'Return minimum flips required.',
      constraints: 'Need to mark one island fully, then expand outward until reaching second island.',
      objective: 'Choose two-phase approach where frontier expansion from a full source region gives shortest crossing distance.',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'After marking one island, BFS from all its boundary/land cells finds shortest reach to other island.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-parallel-courses-ii-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1494 - Parallel Courses II',
      scenario: 'Given prerequisite graph and limit k courses per semester, compute minimum semesters to finish all courses.',
      io: 'Return smallest number of semesters required.',
      constraints: 'State must encode completed-course subset and available transitions respecting prerequisites and semester capacity.',
      objective: 'Identify subset-state dynamic programming approach over bitmask-encoded completion states.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'DP/BFS over bitmask states explores valid semester selections while minimizing semester count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-unsorted-continuous-subarray-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 581 - Shortest Unsorted Continuous Subarray (Stack Framing)',
      scenario: 'Find the shortest continuous subarray which, if sorted, makes the whole array sorted.',
      io: 'Return minimal subarray length.',
      constraints: 'Need linear strategy to detect left and right disorder boundaries.',
      objective: 'Choose monotonic stack boundary-discovery pattern for first/last inversion regions.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Increasing/decreasing stack passes identify earliest and latest positions violating sorted order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-sum-of-subarray-minimums-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 907 - Sum of Subarray Minimums',
      scenario: 'Compute sum of minimum element over every possible subarray.',
      io: 'Return sum modulo required constant.',
      constraints: 'Brute force over all subarrays is too slow; each element contribution must be counted combinatorially.',
      objective: 'Identify next-less/previous-less boundary counting pattern with monotonic structures.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Monotonic stacks find span where each value is minimum, enabling contribution counting.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-shortest-path-in-binary-matrix-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1091 - Shortest Path in Binary Matrix',
      scenario: 'Find shortest clear path from top-left to bottom-right in binary grid with 8-direction movement.',
      io: 'Return path length or -1 if unreachable.',
      constraints: 'Grid edges are unweighted and every move has uniform cost.',
      objective: 'Choose unweighted shortest-path traversal pattern on implicit graph cells.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over valid cells guarantees first arrival at destination has minimal step count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximal-network-rank-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1615 - Maximal Network Rank (Frequency Framing)',
      scenario: 'Given n cities and roads, compute maximum network rank among city pairs as total incident roads minus direct overlap.',
      io: 'Return maximal rank value.',
      constraints: 'Need efficient degree counting with adjacency checks for pair correction.',
      objective: 'Select counting-and-frequency style pattern based on cumulative degree accounting.',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Degree frequency/counting drives candidate high-rank pairs, with adjacency adjustment.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-happy-prefix-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1392 - Longest Happy Prefix (Rolling Prefix/Suffix Framing)',
      scenario: 'Find longest non-empty prefix of a string that is also a suffix, excluding full string.',
      io: 'Return the longest valid prefix string.',
      constraints: 'Need near-linear processing and stable comparison across many prefix lengths.',
      objective: 'Choose cumulative prefix/suffix comparison framing for boundary-equality detection.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'This framing relies on progressive prefix/suffix state buildup rather than brute-force substring checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-possible-bipartition-additional-8',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 886 - Possible Bipartition',
      scenario: 'People have mutual dislikes; determine if they can be split into two groups with no internal conflicts.',
      io: 'Return true if valid bipartition exists, false otherwise.',
      constraints: 'Graph may have multiple disconnected components and dense local conflicts.',
      objective: 'Identify two-color consistency checking over entire dislike graph.',
    }),
    correctPattern: 'Bipartite Graph Check (Coloring)',
    correctExplanation: 'Coloring each component with opposite colors across edges detects impossible odd cycles.',
  }),
]

export default data
