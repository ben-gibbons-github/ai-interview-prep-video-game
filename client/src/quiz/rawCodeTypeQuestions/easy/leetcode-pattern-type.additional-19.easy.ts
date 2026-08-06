import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  fullProblem: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Full Problem Statement: ${params.fullProblem}\n` +
    `Input/Output Requirements: ${params.io}\n` +
    `Constraints and Edge Cases: ${params.constraints}\n\n` +
    `Pattern Selection Question: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc242-valid-anagram-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 242 - Valid Anagram',
      fullProblem: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
      io: 'Input: strings s and t. Output: boolean indicating whether they have identical character multiset.',
      constraints: 'Need compare character frequencies efficiently for potentially large strings.',
      objective: 'Which counting/marking pattern uses frequency storage for each character to verify multiset equality?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count occurrences for each character and compare totals across both strings.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc724-find-pivot-index-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 724 - Find Pivot Index',
      fullProblem: 'Find pivot index where sum of numbers strictly left equals sum of numbers strictly right. Return leftmost such index or -1.',
      io: 'Input: nums array. Output: pivot index or -1.',
      constraints: 'Need avoid recomputing left and right sums from scratch at each index.',
      objective: 'Which cumulative-sum pattern supports O(1) side-sum checks while scanning?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Track total sum and running left sum so right sum is total-left-current at each index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc35-search-insert-position-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 35 - Search Insert Position',
      fullProblem: 'Given sorted array and target, return index if found. If not found, return index where it would be inserted in order.',
      io: 'Input: sorted nums and target. Output: insertion index.',
      constraints: 'Need logarithmic time search over ordered array.',
      objective: 'Which halving-based ordered search pattern is the direct fit?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search narrows interval and final low pointer gives target or insertion position.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc392-is-subsequence-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 392 - Is Subsequence',
      fullProblem: 'Return true if string s is a subsequence of string t, meaning all characters of s appear in t in order.',
      io: 'Input: strings s and t. Output: boolean subsequence indicator.',
      constraints: 'Need single pass over larger string while matching smaller target sequence.',
      objective: 'Which same-direction pointer pattern advances match pointer only when characters align?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Scan t with one pointer and advance s pointer on matches; success when s pointer reaches end.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc345-reverse-vowels-of-a-string-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 345 - Reverse Vowels of a String',
      fullProblem: 'Given a string, reverse only its vowels while keeping consonants in place.',
      io: 'Input: string s. Output: new string with vowel positions reversed.',
      constraints: 'Need find vowel positions from both ends and swap efficiently.',
      objective: 'Which opposite-direction pointer pattern swaps target characters while skipping non-targets?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move left and right inward to next vowels, swap them, and continue until pointers cross.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc704-binary-search-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 704 - Binary Search',
      fullProblem: 'Given sorted integer array nums and target, return index of target or -1 if absent.',
      io: 'Input: sorted nums and target. Output: index or -1.',
      constraints: 'Must run in O(log n) time.',
      objective: 'Which baseline ordered search pattern repeatedly checks midpoint and halves search space?',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Compare target with middle element and discard half that cannot contain target.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc278-first-bad-version-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 278 - First Bad Version',
      fullProblem: 'Given versions 1..n and API isBadVersion(version), find first bad version where all later versions are also bad.',
      io: 'Input: integer n and monotonic boolean API. Output: first bad index.',
      constraints: 'Predicate transitions once from false to true; need minimum true index.',
      objective: 'Which boundary-focused binary search pattern is ideal for finding first true position?',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Binary search leftmost index satisfying isBadVersion by shrinking right bound on true.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc112-path-sum-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 112 - Path Sum',
      fullProblem: 'Given binary tree root and targetSum, determine if tree has any root-to-leaf path whose node values sum to targetSum.',
      io: 'Input: tree root and target sum. Output: boolean path-exists result.',
      constraints: 'Need explore root-to-leaf paths with running sum state.',
      objective: 'Which recursive tree traversal pattern naturally propagates remaining target down branches?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Subtract node value while descending; at leaf, check whether remaining sum equals node value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc844-backspace-string-compare-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 844 - Backspace String Compare',
      fullProblem: 'Strings s and t contain lowercase letters and # as backspace. Return true if both become equal after processing backspaces.',
      io: 'Input: strings s and t. Output: equality boolean after text editing simulation.',
      constraints: 'Need process backspaces without constructing full edited strings if possible.',
      objective: 'Which reverse two-pointer pattern skips deleted characters by maintaining pending backspace counts?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Walk both strings from end, skipping erased characters using counters, then compare live characters.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc448-find-all-numbers-disappeared-in-an-array-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 448 - Find All Numbers Disappeared in an Array',
      fullProblem: 'Array nums has values in [1,n], some appear twice and others missing. Return all numbers in [1,n] missing from nums.',
      io: 'Input: nums array. Output: list of missing integers.',
      constraints: 'Need O(n) time and O(1) extra (excluding output) by reordering or marking in place.',
      objective: 'Which index-placement pattern repeatedly swaps values toward their correct positions?',
    }),
    correctPattern: 'Cyclic Sort',
    correctExplanation: 'Place each value v at index v-1 via swaps; indices not holding expected value reveal missing numbers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc119-pascals-triangle-ii-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: "LeetCode 119 - Pascal's Triangle II",
      fullProblem: 'Given rowIndex, return the rowIndex-th row of Pascal\'s Triangle (0-indexed).',
      io: 'Input: integer rowIndex. Output: array for that row.',
      constraints: 'Need iterative dependency where each entry is based on previous row neighbors.',
      objective: 'Which one-dimensional DP-style construction pattern is commonly used to build rows progressively?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'Build row iteratively using prior row values, often updating from right to left to avoid overwrites.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc290-word-pattern-additional-19',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 290 - Word Pattern',
      fullProblem: 'Given pattern string and space-separated string s, determine if s follows same bijection mapping as pattern characters.',
      io: 'Input: pattern and words string. Output: boolean indicating consistent bijection.',
      constraints: 'Need one-to-one mapping between chars and words with collision checks in both directions.',
      objective: 'Which hashing/map pattern tracks forward and reverse associations to enforce bijection?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use two hash maps or one map with seen-state checks to ensure consistent two-way mapping.',
  }),
]

export default data
