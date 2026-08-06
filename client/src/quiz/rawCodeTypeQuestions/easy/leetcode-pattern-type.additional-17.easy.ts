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
    id: 'leetcode-pattern-type-easy-lc2540-minimum-common-value-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2540 - Minimum Common Value',
      fullProblem: 'Given two sorted integer arrays nums1 and nums2, return the smallest integer that appears in both arrays. If no common integer exists, return -1.',
      io: 'Input: two sorted arrays. Output: minimum shared value or -1.',
      constraints: 'Need linear scan without hashing all values when both arrays are already sorted.',
      objective: 'Which pattern advances two ordered pointers to find first intersection efficiently?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Move the pointer with the smaller current value until values match or either array ends.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2215-find-the-difference-of-two-arrays-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2215 - Find the Difference of Two Arrays',
      fullProblem: 'Return two lists: unique values present in nums1 but not nums2, and unique values present in nums2 but not nums1.',
      io: 'Input: nums1, nums2. Output: [onlyInNums1, onlyInNums2].',
      constraints: 'Need duplicate elimination and fast membership checks across arrays.',
      objective: 'Which pattern uses hash-style marking to track uniqueness and set difference operations?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use set/hash containers to de-duplicate and test cross-array membership in O(1) average time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1491-average-salary-excluding-the-minimum-and-maximum-salary-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1491 - Average Salary Excluding the Minimum and Maximum Salary',
      fullProblem: 'Given unique salary values, compute the average after excluding the minimum and maximum salaries.',
      io: 'Input: salary array. Output: floating-point average excluding extremes.',
      constraints: 'Single pass should track running sum, min, and max without sorting.',
      objective: 'Which cumulative aggregation pattern naturally computes this in one scan?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Accumulate total sum and track min/max, then compute (sum-min-max)/(n-2).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc643-maximum-average-subarray-i-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 643 - Maximum Average Subarray I',
      fullProblem: 'Find the contiguous subarray of length k that has the maximum average value and return that maximum average.',
      io: 'Input: nums and k. Output: maximum average among all size-k windows.',
      constraints: 'Need O(n) rolling-window computation without rescanning each subarray.',
      objective: 'Which fixed-window pattern updates the current subarray sum in O(1) per shift?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain a running sum for exactly k elements while sliding one index at a time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2341-maximum-number-of-pairs-in-array-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2341 - Maximum Number of Pairs in Array',
      fullProblem: 'Given an array, repeatedly remove pairs of equal numbers. Return how many pairs can be formed and how many elements remain.',
      io: 'Input: nums array. Output: [pairCount, leftovers].',
      constraints: 'Need frequency counting over values and arithmetic from counts.',
      objective: 'Which pattern uses value-frequency mapping as a hash table to derive pair totals quickly?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count each value occurrence, accumulate count/2 pairs, and count%2 leftovers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1903-largest-odd-number-in-string-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1903 - Largest Odd Number in String',
      fullProblem: 'Given numeric string num, return the largest-valued odd-number substring that is a prefix of num. If no odd digit exists, return empty string.',
      io: 'Input: numeric string. Output: longest prefix ending at an odd digit.',
      constraints: 'Need right-to-left boundary search for the last odd digit.',
      objective: 'Which two-end scanning pattern can quickly identify the cutoff index?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Scan from the right toward the left until finding an odd digit, then return prefix through that index.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1046-last-stone-weight-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1046 - Last Stone Weight',
      fullProblem: 'Repeatedly take two heaviest stones, smash them, and if weights differ push the difference back. Return final stone weight or 0.',
      io: 'Input: stone weights array. Output: remaining weight.',
      constraints: 'Need repeated extraction of current maximum elements.',
      objective: 'Which top-k/heap pattern keeps largest elements accessible at each iteration?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'A max-heap repeatedly provides the two largest stones with logarithmic updates.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc409-longest-palindrome-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 409 - Longest Palindrome',
      fullProblem: 'Given letters in a string, compute the maximum length palindrome that can be built using those letters.',
      io: 'Input: string s. Output: maximum possible palindrome length.',
      constraints: 'Need pair counting plus optional single center character.',
      objective: 'Which hash-frequency pattern counts reusable pairs across characters?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Character counts contribute even portions fully; one odd-count character may contribute one center slot.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc1732-find-the-highest-altitude-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1732 - Find the Highest Altitude',
      fullProblem: 'A biker starts at altitude 0 and gain[i] is net gain between points. Return highest altitude reached.',
      io: 'Input: gain array. Output: maximum prefix altitude value.',
      constraints: 'Need incremental running sum and max tracking.',
      objective: 'Which cumulative-sum pattern is most direct for this altitude trace?',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Compute running altitude by prefix summation and track the maximum encountered value.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2239-find-closest-number-to-zero-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2239 - Find Closest Number to Zero',
      fullProblem: 'Return number in array with smallest absolute value. If tie, return the positive number.',
      io: 'Input: nums array. Output: closest value to zero with tie-breaking.',
      constraints: 'Single pass with custom comparison criterion.',
      objective: 'Which one-direction scan pattern compares candidates and updates best choice in-place?',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'A linear forward scan updates the current best candidate using absolute value and tie-breaking rules.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc2578-split-with-minimum-sum-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2578 - Split With Minimum Sum',
      fullProblem: 'Given integer num, split its digits into two new integers (using all digits) so their sum is minimized.',
      io: 'Input: integer num. Output: minimum possible sum of two constructed integers.',
      constraints: 'Need digit frequency ordering and alternating placement strategy.',
      objective: 'Which counting/sorting-by-value pattern is used to reconstruct minimum-sum numbers?',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Count/sort digits and distribute smallest digits alternately to balance place-value growth.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-lc58-length-of-last-word-additional-17',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 58 - Length of Last Word',
      fullProblem: 'Given string containing words and spaces, return length of the last word.',
      io: 'Input: string s. Output: integer length of final word token.',
      constraints: 'Need skip trailing spaces then count contiguous non-space segment.',
      objective: 'Which two-end pointer pattern scans from the right boundary to isolate the final token?',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Move from right to skip spaces, then continue counting characters until next space or start.',
  }),
]

export default data
