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
    id: 'leetcode-pattern-type-easy-product-of-array-except-self-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 238 - Product of Array Except Self (Conceptual Framing)',
      scenario: 'For each index, compute product of all other values without using division.',
      io: 'Return output array where output[i] is product of nums excluding nums[i].',
      constraints: 'Need O(n) time; avoid division and handle zeros robustly.',
      objective: 'Choose accumulation pattern that combines left-prefix products and right-suffix products.',
    }),
    correctPattern: 'Suffix Sum / Product',
    correctExplanation: 'Compute prefix products and suffix products, then multiply complementary sides per index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-majority-element-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 169 - Majority Element',
      scenario: 'Find element appearing more than n/2 times in array.',
      io: 'Return majority value guaranteed to exist.',
      constraints: 'Constant-space linear-time strategy preferred.',
      objective: 'Recognize cancellation-vote technique that preserves majority candidate through scan.',
    }),
    correctPattern: 'Boyer-Moore Voting Algorithm',
    correctExplanation: 'Pairwise cancellation leaves majority candidate as final survivor.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-missing-number-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 268 - Missing Number',
      scenario: 'Array contains n distinct numbers from range [0, n] with one missing value.',
      io: 'Return the missing value.',
      constraints: 'Need linear runtime and minimal extra memory.',
      objective: 'Pick index-placement pattern that positions values where they belong and exposes gap.',
    }),
    correctPattern: 'Cyclic Sort',
    correctExplanation: 'Place each value at its index position; the mismatched index reveals missing number.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-linked-list-cycle-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 141 - Linked List Cycle',
      scenario: 'Determine whether singly linked list contains a cycle.',
      io: 'Return true if cycle exists, else false.',
      constraints: 'Do not modify list and use O(1) auxiliary memory.',
      objective: 'Choose pointer-speed differential detection pattern for loops in linked structures.',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'Fast and slow pointers meet if and only if a cycle exists.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-remove-linked-list-elements-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 203 - Remove Linked List Elements',
      scenario: 'Remove every node with target value from linked list and return new head.',
      io: 'Return filtered list head.',
      constraints: 'Head itself may be removed, including multiple leading nodes.',
      objective: 'Identify sentinel-node technique that simplifies head-removal edge cases.',
    }),
    correctPattern: 'Dummy Head Technique',
    correctExplanation: 'A dummy node before head makes deletions uniform, including original head removal.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-reverse-linked-list-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 206 - Reverse Linked List',
      scenario: 'Reverse singly linked list pointers iteratively.',
      io: 'Return new head after reversal.',
      constraints: 'Must rewire pointers in-place with O(1) extra memory.',
      objective: 'Recognize iterative pointer-flip strategy for in-place list reversal.',
    }),
    correctPattern: 'In-place Linked List Reversal',
    correctExplanation: 'Track prev/curr/next and redirect links one by one.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-remove-nth-from-end-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 19 - Remove Nth Node From End of List',
      scenario: 'Delete nth node from end in one pass if possible.',
      io: 'Return head after removal.',
      constraints: 'Need robust handling when removing first node.',
      objective: 'Choose gap-maintenance pointer pattern anchored by nth-distance offset.',
    }),
    correctPattern: 'Two Pointers (Kth Node from End)',
    correctExplanation: 'Advance fast by n, then move both until fast reaches end; slow sits before target.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-power-of-two-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 231 - Power of Two',
      scenario: 'Check whether integer n is exact power of two.',
      io: 'Return true or false.',
      constraints: 'Bit-level constant-time check is expected.',
      objective: 'Identify low-level binary property pattern for single-set-bit validation.',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'For positive n, power-of-two numbers satisfy n & (n - 1) == 0.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-count-primes-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 204 - Count Primes',
      scenario: 'Count prime numbers strictly less than n.',
      io: 'Return count of primes in range [0, n).',
      constraints: 'Need faster than per-number primality trial for large n.',
      objective: 'Choose classical sieving pattern that marks composite multiples efficiently.',
    }),
    correctPattern: 'Sieve of Eratosthenes',
    correctExplanation: 'Iteratively mark multiples of each prime starting from p^2.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-gcd-of-strings-conceptual',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1071 - Greatest Common Divisor of Strings',
      scenario: 'Find largest string that can repeatedly construct both input strings.',
      io: 'Return greatest common divisor string or empty if none.',
      constraints: 'Lengths and repetition relationships govern validity.',
      objective: 'Pick recursive remainder-style pattern over lengths for divisor reduction.',
    }),
    correctPattern: 'Euclidean Algorithm',
    correctExplanation: 'Use gcd of lengths and concatenation compatibility to derive maximal base pattern.',
  }),
]

export default data
