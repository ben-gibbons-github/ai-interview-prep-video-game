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
    id: 'leetcode-pattern-type-easy-arranging-coins-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 441 - Arranging Coins',
      scenario: 'You have n coins and want to build a staircase where row i has exactly i coins. Determine how many complete rows can be formed before coins run out.',
      io: 'Return the number of full staircase rows.',
      constraints: 'Input can be large, so iterative subtraction may overflow or run slowly in naive forms.',
      objective: 'Identify monotonic feasibility and search over candidate row counts instead of linearly constructing rows one by one.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'The predicate k*(k+1)/2 <= n is monotonic in k, making answer-space binary search precise and efficient.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-logger-rate-limiter-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 359 - Logger Rate Limiter',
      scenario: 'Design a logger that prints a message only if it has not been printed in the last 10 seconds. Each call includes timestamp and message text.',
      io: 'Return true when message should print now, false when throttled.',
      constraints: 'Need fast repeated updates keyed by message identity with minimal overhead.',
      objective: 'Choose a direct timestamp lookup-and-update strategy based on key-indexed state.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'A hash map keyed by message to last-printed timestamp provides O(1) average throttling checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-fair-candy-swap-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 888 - Fair Candy Swap',
      scenario: 'Alice and Bob each have candy sizes; swap exactly one candy each so total amounts become equal.',
      io: 'Return one valid pair [aliceCandy, bobCandy].',
      constraints: 'Need to reason with total-difference target and search for complement quickly.',
      objective: 'Identify cumulative-sum balancing transformation that converts swap condition into a direct lookup equation.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compute totals, derive delta, and find value pairs satisfying a - b = delta/2 using a set lookup.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-can-place-flowers-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 605 - Can Place Flowers',
      scenario: 'Given a flowerbed array with 0 for empty and 1 for planted, decide if n new flowers can be placed with no adjacent flowers.',
      io: 'Return true if placement is feasible, otherwise false.',
      constraints: 'Single linear scan preferred; careful local neighbor checks avoid invalid placements.',
      objective: 'Choose local two-boundary pointer reasoning for adjacency-safe placement while moving forward.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A forward scan with local neighbor checks behaves as a same-direction pointer placement sweep.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-smallest-letter-greater-target-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 744 - Find Smallest Letter Greater Than Target',
      scenario: 'Given sorted circular letters array, return smallest character strictly greater than target, wrapping to first element if needed.',
      io: 'Return one character answer.',
      constraints: 'Need logarithmic lookup; circular fallback should be handled cleanly.',
      objective: 'Identify first-greater boundary search in sorted array with wrap rule.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search for first index with letters[i] > target; if none exists, wrap to letters[0].',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-words-formed-by-characters-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1160 - Find Words That Can Be Formed by Characters',
      scenario: 'Given candidate words and a source string chars, sum lengths of words that can be formed from chars at most once per character.',
      io: 'Return total length of valid words.',
      constraints: 'Need repeated per-word frequency checks against base inventory.',
      objective: 'Choose compact counting map strategy for multiset containment validation.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Frequency arrays/maps compare each word character demand against available character counts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-n-unique-integers-sum-zero-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1304 - Find N Unique Integers Sum up to Zero',
      scenario: 'Construct any array of n distinct integers whose sum is exactly zero.',
      io: 'Return an array meeting distinctness and sum constraints.',
      constraints: 'There are many valid outputs; construction should be systematic and provably correct.',
      objective: 'Identify symmetric pair construction logic with optional center zero when n is odd.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Generate pairs x and -x from opposite conceptual ends to maintain uniqueness and zero total.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-count-odd-numbers-interval-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1523 - Count Odd Numbers in an Interval Range',
      scenario: 'Count how many odd integers exist in inclusive interval [low, high].',
      io: 'Return odd count as integer.',
      constraints: 'Need O(1) arithmetic approach rather than iteration through range.',
      objective: 'Choose cumulative counting math transformation for parity totals across numeric interval boundaries.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compute odd-count prefix up to high minus prefix up to low-1 using parity arithmetic.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-reverse-vowels-string-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 345 - Reverse Vowels of a String',
      scenario: 'Reverse only the vowels in a string while leaving all non-vowel characters in original positions.',
      io: 'Return transformed string with vowel order reversed.',
      constraints: 'Need to skip non-vowels efficiently and perform in-place style swaps conceptually.',
      objective: 'Identify bidirectional pointer convergence pattern with conditional advancement.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Left and right pointers move inward, stopping at vowels and swapping them before continuing.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-distribute-candies-crazy-9',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 575 - Distribute Candies',
      scenario: 'A sister gets exactly half the candies; maximize number of distinct candy types she can receive.',
      io: 'Return maximum distinct types possible for sister.',
      constraints: 'Need cardinality of unique types versus half-length cap.',
      objective: 'Choose hashing/set counting pattern that separates uniqueness from quantity limit.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Distinct type count from set is compared with n/2 to produce final maximum.',
  }),
]

export default data
