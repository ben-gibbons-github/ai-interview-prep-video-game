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
    id: 'leetcode-pattern-type-easy-valid-mountain-array-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 941 - Valid Mountain Array',
      scenario: 'Determine whether array strictly increases to one peak and then strictly decreases, with no plateaus.',
      io: 'Return true if shape matches mountain definition.',
      constraints: 'Need exactly one transition from up-slope to down-slope and peak cannot be first/last index.',
      objective: 'Identify single-pass directional pointer progression with phase transition validation.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'One forward pointer can consume increasing phase, then decreasing phase, validating strictness and boundaries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-number-alternating-bits-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 693 - Binary Number with Alternating Bits',
      scenario: 'Given positive integer n, verify whether binary representation has alternating 0 and 1 bits.',
      io: 'Return true if adjacent bits always differ, otherwise false.',
      constraints: 'Avoid converting to string if possible; bitwise arithmetic should solve directly.',
      objective: 'Choose low-level bitwise invariant check pattern for adjacency differences in binary form.',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'Bit-shift/XOR based checks can validate alternating patterns in constant time per machine word.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-monotonic-array-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 896 - Monotonic Array',
      scenario: 'Determine if array is entirely non-decreasing or entirely non-increasing.',
      io: 'Return true when either monotonic direction holds.',
      constraints: 'Need robust handling of equal adjacent values while preserving monotonic consistency.',
      objective: 'Identify one-pass directional consistency tracking with simple state flags.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A forward scan tracks violation flags for both directions and validates monotonicity.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-valid-perfect-square-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 367 - Valid Perfect Square',
      scenario: 'Given positive integer num, determine if it is a perfect square without using sqrt.',
      io: 'Return true for perfect squares, false otherwise.',
      constraints: 'Need safe arithmetic around potential overflow during midpoint squaring.',
      objective: 'Choose monotonic numeric decision search over candidate roots.',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search candidate root m and compare m*m to num with overflow-safe checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-heaters-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 475 - Heaters',
      scenario: 'Given house positions and heater positions on line, find minimum heating radius so every house is within range of some heater.',
      io: 'Return minimal required radius.',
      constraints: 'Need nearest-heater distance per house under sorted positions.',
      objective: 'Identify boundary-focused search for closest heater around each house.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'For each house, binary search insertion point in sorted heaters to compare nearest left/right distances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-check-if-it-is-straight-line-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1232 - Check If It Is a Straight Line',
      scenario: 'Given coordinate points, verify all points lie on one straight line in 2D plane.',
      io: 'Return true if all points are collinear.',
      constraints: 'Need avoid floating-point precision traps from slope division.',
      objective: 'Choose normalized delta comparison pattern using cross multiplication invariants.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use integer cross-product equivalence to compare directional ratios consistently without division.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-sum-of-all-odd-length-subarrays-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1588 - Sum of All Odd Length Subarrays',
      scenario: 'Compute total sum across all odd-length contiguous subarrays of input array.',
      io: 'Return aggregated sum value.',
      constraints: 'Need combinational counting contribution per index rather than enumerating all subarrays.',
      objective: 'Identify cumulative contribution math using counts of odd windows containing each element.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Each index contributes arr[i] multiplied by number of odd-length subarrays that include it.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-counting-bits-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 338 - Counting Bits',
      scenario: 'For every integer i in [0, n], compute number of set bits in binary representation.',
      io: 'Return array bits where bits[i] is popcount of i.',
      constraints: 'Need linear dynamic approach leveraging prior computed values.',
      objective: 'Choose 1D DP relation based on bit shifts or low-bit removal.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Use recurrence like bits[i] = bits[i >> 1] + (i & 1) or bits[i] = bits[i & (i-1)] + 1.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-kids-with-greatest-candies-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1431 - Kids With the Greatest Number of Candies',
      scenario: 'For each child, decide if giving extraCandies would make them have at least as many candies as current maximum.',
      io: 'Return boolean array per child.',
      constraints: 'Need one global maximum and per-child threshold comparison.',
      objective: 'Choose simple cumulative aggregate and per-element decision pattern.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compute max once, then compare candies[i] + extraCandies against that max for each index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-center-of-star-graph-crazy-10',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1791 - Find Center of Star Graph',
      scenario: 'Given edges of star graph, identify center node connected to all others.',
      io: 'Return center node value.',
      constraints: 'Center appears in every edge; solution should be O(1) or near-constant from first edges.',
      objective: 'Identify graph-degree inference pattern from minimal edge intersections.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'The center can be inferred immediately as common endpoint of first two edges; graph perspective focuses on hub connectivity.',
  }),
]

export default data
