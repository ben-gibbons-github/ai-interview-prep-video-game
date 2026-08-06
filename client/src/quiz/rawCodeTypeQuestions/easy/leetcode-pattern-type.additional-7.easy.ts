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
    id: 'leetcode-pattern-type-easy-valid-anagram-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 242 - Valid Anagram',
      scenario: 'Determine if t is an anagram of s.',
      io: 'Return true when both strings contain same char frequencies.',
      constraints: 'Linear-time counting over alphabet is expected.',
      objective: 'Choose compact frequency-marking pattern for character multisets.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Frequency arrays/maps compare character counts efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-first-bad-version-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 278 - First Bad Version',
      scenario: 'API tells whether a version is bad; find first bad version among 1..n.',
      io: 'Return earliest bad version index.',
      constraints: 'Need minimal API calls with logarithmic search.',
      objective: 'Select boundary-focused binary search for first true in monotonic boolean range.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search narrows toward leftmost bad version boundary.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-maximum-subarray-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 53 - Maximum Subarray',
      scenario: 'Find contiguous subarray with largest sum.',
      io: 'Return maximal sum value.',
      constraints: 'Need O(n) scan using local/global running optimum.',
      objective: 'Identify dynamic accumulation reset pattern for best contiguous sum.',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'Track best ending here and global best while scanning once.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-climbing-stairs-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 70 - Climbing Stairs',
      scenario: 'Count distinct ways to reach n-th stair taking 1 or 2 steps.',
      io: 'Return number of ways.',
      constraints: 'Transition depends on prior two states.',
      objective: 'Choose classic linear recurrence DP pattern.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'ways[i] = ways[i-1] + ways[i-2] with base initialization.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-same-tree-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 100 - Same Tree',
      scenario: 'Determine whether two binary trees are structurally identical with equal node values.',
      io: 'Return true if trees match exactly.',
      constraints: 'Need synchronized traversal of both trees with null handling.',
      objective: 'Identify recursive tree traversal pattern comparing nodes before subtrees.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order comparison checks current nodes then recursively checks left/right pairs.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-invert-binary-tree-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 226 - Invert Binary Tree',
      scenario: 'Swap every node left and right child pointers throughout tree.',
      io: 'Return root of inverted tree.',
      constraints: 'Must traverse entire tree and apply local swap operation each node.',
      objective: 'Choose depth-first tree traversal pattern for full-node mutation.',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Process children and swap links recursively; DFS covers all nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-valid-parentheses-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 20 - Valid Parentheses',
      scenario: 'Check if bracket sequence is properly opened/closed and nested.',
      io: 'Return true if expression is valid.',
      constraints: 'Need LIFO matching for nested pairs.',
      objective: 'Identify stack-driven delimiter matching pattern.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Push openers and pop/check on closers to validate nesting order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-fibonacci-number-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 509 - Fibonacci Number',
      scenario: 'Compute nth Fibonacci number where F(n)=F(n-1)+F(n-2).',
      io: 'Return F(n).',
      constraints: 'Iterative dynamic approach should avoid exponential recursion.',
      objective: 'Choose simple linear-state dynamic programming recurrence.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Iteratively build sequence from prior two values.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-reverse-string-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 344 - Reverse String',
      scenario: 'Reverse character array in-place.',
      io: 'Mutate input array so characters are reversed.',
      constraints: 'Use O(1) extra space, in-place swaps only.',
      objective: 'Pick mirrored index contraction pattern from both ends.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Swap left/right characters while moving inward until pointers meet.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-all-numbers-disappeared-array-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 448 - Find All Numbers Disappeared in an Array',
      scenario: 'Array values are in [1, n], with some appearing twice and others missing.',
      io: 'Return all missing values from 1..n.',
      constraints: 'Need O(n) time and no extra list-sized counting structure.',
      objective: 'Choose in-place index-marking strategy tied to value-to-index mapping.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use sign flips or index marks based on value to record seen numbers.',
  }),
]

export default data
