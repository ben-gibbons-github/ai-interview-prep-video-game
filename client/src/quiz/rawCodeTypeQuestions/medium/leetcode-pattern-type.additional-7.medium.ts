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
    id: 'leetcode-pattern-type-medium-odd-even-linked-list-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 328 - Odd Even Linked List',
      scenario: 'Group nodes by odd indices then even indices while preserving relative order.',
      io: 'Return reordered linked list head.',
      constraints: 'Need in-place pointer rewiring with O(1) extra space.',
      objective: 'Choose pointer-relinking list mutation pattern for stable odd/even partition.',
    }),
    correctPattern: 'In-place Linked List Reversal',
    correctExplanation: 'Though not literal reversal, it is in-place linked-list pointer rewiring with O(1) space.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-binary-tree-level-order-traversal-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 102 - Binary Tree Level Order Traversal',
      scenario: 'Return node values level by level from top to bottom.',
      io: 'Return nested array where each inner list is one depth level.',
      constraints: 'Need to preserve depth grouping boundaries.',
      objective: 'Select breadth-first traversal pattern that processes queue by layer size.',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'BFS naturally visits nodes in non-decreasing depth and supports level buckets.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-word-search-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 79 - Word Search',
      scenario: 'Determine if a word exists in grid via adjacent cells without reusing a cell.',
      io: 'Return true if word can be formed, false otherwise.',
      constraints: 'Must track visited cells per path and backtrack on mismatches.',
      objective: 'Choose grid-oriented backtracking traversal pattern.',
    }),
    correctPattern: 'Grid Backtracking (Word Search)',
    correctExplanation: 'DFS with backtracking and visited marking explores candidate paths safely.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-combinations-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 77 - Combinations',
      scenario: 'Generate all k-sized subsets chosen from integers 1..n.',
      io: 'Return list of all unique combinations.',
      constraints: 'Need structured exploration without duplicate orderings.',
      objective: 'Identify combinational backtracking pattern with incremental start index.',
    }),
    correctPattern: 'Combinations / Combination Sum',
    correctExplanation: 'Backtracking chooses next candidate from increasing start to avoid duplicates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-subsets-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 78 - Subsets',
      scenario: 'Return power set of distinct integers.',
      io: 'Return all possible subsets.',
      constraints: 'Need exhaustive yet structured enumeration of include/exclude decisions.',
      objective: 'Select subset generation pattern over binary decision tree.',
    }),
    correctPattern: 'Subsets and Power Set',
    correctExplanation: 'Each element branches into include or exclude, generating all subsets.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-prune-invalid-parentheses-search-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 301 - Remove Invalid Parentheses (Search Framing)',
      scenario: 'Remove minimum invalid parentheses and return all possible valid results.',
      io: 'Return all distinct valid strings with minimum removals.',
      constraints: 'Search space explodes without strong pruning conditions.',
      objective: 'Choose branch-pruning and constraint-propagation strategy for feasible exploration.',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Prune impossible branches using remaining-removal counts and validity constraints.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-width-ramp-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 962 - Maximum Width Ramp',
      scenario: 'Find max j - i where i < j and nums[i] <= nums[j].',
      io: 'Return largest valid width.',
      constraints: 'Need better than O(n^2) pair checks.',
      objective: 'Pick monotonic stack candidate-index pattern plus backward sweep.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Build decreasing stack of candidate starts, then scan from right to maximize width.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-range-addition-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 370 - Range Addition',
      scenario: 'Apply many increment updates on intervals and return final array.',
      io: 'Return resulting array after all range operations.',
      constraints: 'Need avoid O(n * updates) direct range loops.',
      objective: 'Choose cumulative difference/prefix reconstruction pattern.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Use difference array for boundary updates, then prefix-sum to materialize values.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-minimum-size-subarray-sum-v2',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 209 - Minimum Size Subarray Sum',
      scenario: 'Find shortest contiguous subarray with sum >= target for positive numbers.',
      io: 'Return minimal length, or 0 if none.',
      constraints: 'Positive numbers allow monotonic window adjustments.',
      objective: 'Identify dynamic window contraction/expansion pattern for minimal satisfying segment.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Expand right to satisfy, then shrink left to minimize window length.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-task-scheduler-ii-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2365 - Task Scheduler II',
      scenario: 'Execute tasks in order with required cooldown gap for same task types.',
      io: 'Return minimum total days to finish tasks.',
      constraints: 'Need jump forward when cooldown not yet satisfied.',
      objective: 'Choose hash-based last-seen-day marking pattern with timeline accumulation.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Track last execution day per task and compute next allowed day directly.',
  }),
]

export default data
