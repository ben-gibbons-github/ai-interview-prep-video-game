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
    id: 'leetcode-pattern-type-medium-permutations-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 46 - Permutations',
      scenario: 'Generate all possible orderings of distinct integers.',
      io: 'Return list of all permutations.',
      constraints: 'Need complete state-space enumeration without duplicates.',
      objective: 'Pick the recursive construction pattern that explores every ordering choice per depth.',
    }),
    correctPattern: 'Permutations',
    correctExplanation: 'Backtracking chooses one remaining candidate per position and recurses.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-combination-sum-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 39 - Combination Sum',
      scenario: 'Find unique combinations summing to target using unlimited candidate reuse.',
      io: 'Return all valid combinations.',
      constraints: 'Must avoid duplicate ordering variants of same combination.',
      objective: 'Choose combinational search pattern with controlled start-index progression.',
    }),
    correctPattern: 'Combinations / Combination Sum',
    correctExplanation: 'Backtracking with start index prevents permutation duplicates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-find-peak-element-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 162 - Find Peak Element',
      scenario: 'Find index of any element larger than its neighbors.',
      io: 'Return a peak index.',
      constraints: 'Need O(log n) approach rather than linear scan.',
      objective: 'Select answer-space monotonic insight enabling binary descent toward a peak.',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search on slope direction guarantees convergence to a peak.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-accounts-merge-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 721 - Accounts Merge',
      scenario: 'Merge account lists sharing any common email under same owner.',
      io: 'Return merged accounts with sorted emails.',
      constraints: 'Overlaps form components not limited to pairwise direct intersections.',
      objective: 'Identify dynamic connectivity pattern for unioning related account records.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union emails/accounts by shared identifiers, then aggregate by root.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-course-schedule-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 207 - Course Schedule',
      scenario: 'Given prerequisites, decide if all courses can be completed.',
      io: 'Return true if no cycle prevents completion.',
      constraints: 'Directed graph cycle detection required at scale.',
      objective: 'Choose indegree-based DAG processing pattern for cycle detection.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'If topological ordering includes all nodes, graph is acyclic and feasible.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-validate-stack-sequences-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 946 - Validate Stack Sequences',
      scenario: 'Given push/pop sequences, determine if pop order is possible.',
      io: 'Return true if sequences are stack-valid, false otherwise.',
      constraints: 'Need simulate push/pop interactions under strict order.',
      objective: 'Identify canonical stack simulation pattern.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Use stack simulation and pop while top matches next target in popped.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-friend-circles-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 547 - Number of Provinces (Union-Find Framing)',
      scenario: 'Given adjacency matrix of direct friendships, count friend groups.',
      io: 'Return number of connected groups.',
      constraints: 'Connectivity is transitive; repeated merges expected.',
      objective: 'Choose disjoint-set merging pattern to collapse connected entities.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union directly connected nodes; final root count gives groups.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-set-matrix-zeroes-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 73 - Set Matrix Zeroes',
      scenario: 'If cell is 0, set its entire row and column to 0 in-place.',
      io: 'Modify matrix in-place.',
      constraints: 'Aim for O(1) extra space using matrix first row/column markers.',
      objective: 'Identify matrix traversal and marker propagation pattern.',
    }),
    correctPattern: 'Matrix Traversal (Spiral / Diagonal / Rotate)',
    correctExplanation: 'Traverse matrix to mark rows/cols then apply markers in second pass.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-partition-labels-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 763 - Partition Labels',
      scenario: 'Split string into largest number of parts so each letter appears in at most one part.',
      io: 'Return lengths of partitions.',
      constraints: 'Need rightmost occurrence boundaries to decide segment closes.',
      objective: 'Choose boundary-sweep interval style pattern.',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Track current partition end as max last-occurrence boundary while scanning.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-sort-colors-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 75 - Sort Colors',
      scenario: 'Sort array of 0,1,2 in-place without library sort.',
      io: 'Reorder array to [0..0,1..1,2..2].',
      constraints: 'Single-pass in-place partitioning is preferred.',
      objective: 'Recognize 3-way partition invariant pattern.',
    }),
    correctPattern: 'Dutch National Flag (3-Way Partitioning)',
    correctExplanation: 'Maintain low/mid/high pointers to place 0s left and 2s right.',
  }),
]

export default data
