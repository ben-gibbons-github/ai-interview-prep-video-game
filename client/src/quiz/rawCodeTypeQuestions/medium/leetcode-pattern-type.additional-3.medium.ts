import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  brief: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem: ${params.brief}\n` +
    `Input/Output: ${params.io}\n` +
    `Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-top-k-frequent-words',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 692 - Top K Frequent Words',
      brief: 'Return k most frequent words with lexicographic tie-breaking.',
      io: 'Return ordered list of top-k words.',
      constraints: 'Need frequency counting plus bounded selection strategy.',
      objective: 'Choose dedicated top-k frequency extraction pattern.',
    }),
    correctPattern: 'Top K Frequent Elements',
    correctExplanation: 'Frequency map + heap/bucket handling is the key selection mechanism.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-merge-k-arrays',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode-style: Merge K Sorted Arrays',
      brief: 'Merge multiple individually sorted arrays into one global sorted output.',
      io: 'Return single sorted merged array.',
      constraints: 'k can be large; linear merge chaining can be suboptimal.',
      objective: 'Choose multi-source min-selection pattern.',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Heap of current heads from each sorted source gives optimal incremental merge.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-flatten-bst-to-sorted-list',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode-style BST Flatten to Sorted List with O(1) Extra Space',
      brief: 'Traverse BST in sorted order while avoiding recursion stack and explicit stack.',
      io: 'Output sorted visitation / rewired list according to in-order sequence.',
      constraints: 'Must use constant auxiliary memory.',
      objective: 'Choose threaded traversal pattern that avoids stack memory.',
    }),
    correctPattern: 'Morris In-Order Traversal',
    correctExplanation: 'Morris traversal threads predecessor links to walk in-order using O(1) extra space.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-design-underground-system',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1396 - Design Underground System',
      brief: 'Track check-ins/check-outs and compute average travel time between station pairs.',
      io: 'Implement API with update and aggregate query operations.',
      constraints: 'Need efficient incremental aggregation keyed by station pairs.',
      objective: 'Choose cumulative aggregation pattern over streaming events.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Maintain cumulative totals and counts per route to answer averages quickly.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-provinces',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 547 - Number of Provinces',
      brief: 'Given adjacency matrix, count connected components among cities.',
      io: 'Return number of provinces/components.',
      constraints: 'Cities belong to same province if transitively connected.',
      objective: 'Choose component counting graph traversal pattern.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Run DFS/BFS from unvisited nodes and count traversals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-time-based-key-value-store',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 981 - Time Based Key-Value Store',
      brief: 'Store values by key at timestamps; query latest value at or before target timestamp.',
      io: 'Implement set/get where get uses historical timestamp lookup.',
      constraints: 'Per-key timestamps are sorted by insertion order.',
      objective: 'Choose boundary-search pattern for timestamp floor lookup.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search finds rightmost timestamp <= query for each key history.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-jump-game-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 45 - Jump Game II',
      brief: 'Given max jump lengths at indices, find minimum jumps to reach last index.',
      io: 'Return minimum jump count.',
      constraints: 'Greedy frontier expansion parallels BFS levels over index graph.',
      objective: 'Choose shortest-layer expansion interpretation pattern.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'Each jump-count layer corresponds to reachability frontier in unweighted graph terms.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-largest-rectangle-histogram',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 84 - Largest Rectangle in Histogram',
      brief: 'Find maximum rectangular area in histogram bars.',
      io: 'Return maximal area value.',
      constraints: 'Need nearest smaller boundaries for each bar efficiently.',
      objective: 'Choose stack pattern for boundary discovery and area computation.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Monotonic stack gives left/right smaller boundaries in linear time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-spiral-matrix-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 59 - Spiral Matrix II',
      brief: 'Generate n x n matrix filled 1..n^2 in spiral order.',
      io: 'Return generated matrix.',
      constraints: 'Need controlled directional traversal with shrinking boundaries.',
      objective: 'Choose layered matrix traversal construction pattern.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Spiral boundary walking controls write order around layers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-interval-list-intersections',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 986 - Interval List Intersections',
      brief: 'Given two sorted interval lists, return all their intersections.',
      io: 'Output list of overlapping intervals.',
      constraints: 'Both lists sorted and non-overlapping internally.',
      objective: 'Choose interval overlap scan pattern with ordered pointers.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Linear scan compares current intervals and advances the one ending first.',
  }),
]

export default data
