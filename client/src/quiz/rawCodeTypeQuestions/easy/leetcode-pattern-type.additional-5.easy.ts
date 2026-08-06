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
    id: 'leetcode-pattern-type-easy-find-pivot-index-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 724 - Find Pivot Index',
      scenario: 'Return index where sum of left side equals sum of right side.',
      io: 'Return pivot index or -1 if absent.',
      constraints: 'Linear pass preferred over recalculating sums each index.',
      objective: 'Select accumulation pattern that derives right sum from total and running left sum.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Track running left sum and compute right as total - left - current.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-squares-of-sorted-array-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 977 - Squares of a Sorted Array',
      scenario: 'Square each number in sorted array and return result sorted non-decreasing.',
      io: 'Return sorted squared array.',
      constraints: 'Negative values mean squaring can disrupt order.',
      objective: 'Choose end-to-center pointer strategy using largest absolute values first.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Compare absolute values at ends and fill result from back to front.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-baseball-game-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 682 - Baseball Game',
      scenario: 'Given operation list, compute final score with cancel/double/sum-last-two semantics.',
      io: 'Return total score after processing all operations.',
      constraints: 'Need structure supporting push/pop and top history access.',
      objective: 'Recognize stack pattern for reversible operation history.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'A stack naturally models score history for C, D, and + operations.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-search-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 704 - Binary Search',
      scenario: 'Find target index in sorted integer array.',
      io: 'Return index if found, else -1.',
      constraints: 'Logarithmic search expected.',
      objective: 'Choose textbook halving strategy over sorted search space.',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Midpoint comparison discards half of remaining search interval each step.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-middle-linked-list-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 876 - Middle of the Linked List',
      scenario: 'Return middle node; when even length, return second middle.',
      io: 'Return node reference to middle.',
      constraints: 'Single traversal desired with O(1) extra space.',
      objective: 'Pick pointer-speed differential technique for midpoint discovery.',
    }),
    correctPattern: 'Fast and Slow Pointers (Midpoint)',
    correctExplanation: 'Slow advances 1 while fast advances 2; slow lands at middle.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-flood-fill-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 733 - Flood Fill',
      scenario: 'Replace connected component of starting color in image grid with new color.',
      io: 'Return recolored image grid.',
      constraints: 'Connectivity is 4-directional and must avoid infinite revisits.',
      objective: 'Choose component traversal pattern in grid-as-graph representation.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS/BFS from seed pixel recolors all reachable same-color cells.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-lucky-integer-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1394 - Find Lucky Integer in an Array',
      scenario: 'Lucky integer equals its own frequency; return largest lucky value.',
      io: 'Return largest lucky integer or -1.',
      constraints: 'Need frequency counting across array domain.',
      objective: 'Identify counting/hash-marking pattern for value-frequency relation checks.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Frequency map/array lets you test value == count efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-is-subsequence-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 392 - Is Subsequence',
      scenario: 'Check if string s is a subsequence of string t.',
      io: 'Return true if all chars of s appear in order in t.',
      constraints: 'Streaming-style one pass over t preferred.',
      objective: 'Choose forward-only pointer advancement pattern over two strings.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Advance pointer in s only on match while always moving through t.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-unique-email-addresses-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 929 - Unique Email Addresses',
      scenario: 'Normalize local names with dot and plus rules, then count unique destinations.',
      io: 'Return number of unique normalized emails.',
      constraints: 'String processing and uniqueness tracking are central.',
      objective: 'Choose lightweight hashing/marking pattern for canonical form deduplication.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Normalize each address then place in set for deduplicated count.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-determine-if-string-halves-are-alike-v2',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1704 - Determine if String Halves Are Alike',
      scenario: 'Split even-length string into two halves and compare vowel counts.',
      io: 'Return true if both halves have equal vowels.',
      constraints: 'Direct linear scan with counters expected.',
      objective: 'Select cumulative counting pattern that compares balanced totals across ranges.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Equivalent to counting cumulative vowel contributions in each half.',
  }),
]

export default data
