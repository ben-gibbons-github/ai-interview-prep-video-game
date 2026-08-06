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
    id: 'leetcode-pattern-type-easy-two-sum-ii',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 167 - Two Sum II (Input Array Is Sorted)',
      brief: 'Given a 1-indexed sorted array, find two numbers that sum to target.',
      io: 'Return the two 1-indexed positions of the matching pair; exactly one solution exists.',
      constraints: 'Array is sorted ascending; use O(1) extra memory; avoid O(n^2).',
      objective: 'Choose the primary pattern that exploits sorted order and converges efficiently.',
    }),
    correctPattern: 'Two Pointers (Opposite Direction)',
    correctExplanation: 'Use left/right pointers moving toward each other in the sorted array to find the target sum in linear time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-move-zeroes',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 283 - Move Zeroes',
      brief: 'Reorder an array in-place so all zeroes move to the end while non-zero order remains stable.',
      io: 'Modify the same array; no return array required.',
      constraints: 'In-place operation only; preserve relative order of non-zero elements; target linear time.',
      objective: 'Identify the pattern used for stable in-place compaction with minimal extra memory.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Track the next write position with one pointer while scanning with another to do in-place compaction.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-max-average-subarray',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 643 - Maximum Average Subarray I',
      brief: 'Find the maximum average value among all contiguous subarrays of fixed length k.',
      io: 'Return a numeric maximum average over all valid windows.',
      constraints: 'Window size is constant (exactly k); brute-force recomputation per window is too slow.',
      objective: 'Pick the pattern best suited for efficient rolling computation over fixed-width windows.',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Window size is fixed at k, so maintain rolling sum while sliding one step at a time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-longest-substring-without-repeat',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 3 - Longest Substring Without Repeating Characters',
      brief: 'Compute the longest contiguous substring containing no duplicate characters.',
      io: 'Return the maximum length (integer), not the substring itself.',
      constraints: 'As you scan rightward, duplicates may force left-boundary adjustments.',
      objective: 'Select the pattern for expandable/shrinkable contiguous windows under validity constraints.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Expand and shrink the window while enforcing uniqueness constraints on characters.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-subarray-sum-equals-k',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 560 - Subarray Sum Equals K',
      brief: 'Count contiguous subarrays whose sum is exactly k.',
      io: 'Return the number of qualifying subarrays.',
      constraints: 'Values may be negative, zero, or positive; two-pointer-only logic is insufficient.',
      objective: 'Choose the pattern that enables fast subarray sum counting with cumulative state.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Prefix sums with a frequency map let you count target-sum subarrays in linear time.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-product-except-self',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 238 - Product of Array Except Self',
      brief: 'For each index, compute product of all other elements except the current one.',
      io: 'Return an output array where output[i] excludes nums[i].',
      constraints: 'No division; target O(n) time; near-constant auxiliary memory (excluding output).',
      objective: 'Identify the pattern that combines left and right aggregate products efficiently.',
    }),
    correctPattern: 'Suffix Sum / Product',
    correctExplanation: 'Combine prefix products and suffix products for each index without division.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-maximum-subarray',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 53 - Maximum Subarray',
      brief: 'Find the contiguous subarray with the largest possible sum.',
      io: 'Return the best sum value, not indices.',
      constraints: 'Negative values may appear; solution should be O(n), not O(n^2).',
      objective: 'Pick the canonical linear-time pattern for best-running-subarray optimization.',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'Kadane keeps the best running subarray sum ending at each position in O(n).',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-sort-colors',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 75 - Sort Colors',
      brief: 'Sort an array of only 0s, 1s, and 2s in-place.',
      io: 'Mutate the array so equal colors are grouped in ascending order.',
      constraints: 'One pass preferred; O(1) extra space; do not rely on general comparison sort.',
      objective: 'Choose the partitioning pattern designed for 3-category in-place rearrangement.',
    }),
    correctPattern: 'Dutch National Flag (3-Way Partitioning)',
    correctExplanation: 'Partition 0s, 1s, and 2s in one pass with low/mid/high pointers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-majority-element',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 169 - Majority Element',
      brief: 'Return the value appearing more than floor(n/2) times in the array.',
      io: 'Output the majority value (guaranteed to exist).',
      constraints: 'Linear time and constant space are desirable interview targets.',
      objective: 'Pick the dominant pattern that cancels non-majority votes in one pass.',
    }),
    correctPattern: 'Boyer-Moore Voting Algorithm',
    correctExplanation: 'Voting cancellation finds the majority candidate in O(n) time and O(1) space.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-disappeared-numbers',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 448 - Find All Numbers Disappeared in an Array',
      brief: 'Values are in [1, n]; some appear twice and others are missing. Return all missing numbers.',
      io: 'Return list of numbers from 1..n absent from nums.',
      constraints: 'O(n) time target; avoid extra hash maps/sets when possible.',
      objective: 'Choose the pattern that repurposes array indices as presence markers.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Use value-to-index mapping and sign marking in-place to track seen numbers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-daily-temperatures',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 739 - Daily Temperatures',
      brief: 'For each index, find distance to next greater temperature in the future.',
      io: 'Return an array of wait lengths, using 0 when no warmer day exists.',
      constraints: 'Need better than nested scans; preserve original index relationships.',
      objective: 'Pick the pattern built for efficient next-greater-element discovery.',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Maintain a decreasing stack of indices to find next warmer day efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-merge-intervals',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 56 - Merge Intervals',
      brief: 'Combine overlapping intervals into minimal non-overlapping ranges.',
      io: 'Return merged intervals covering exactly the same union of ranges.',
      constraints: 'Input intervals can be unsorted; ordering and overlap logic are both required.',
      objective: 'Identify the pattern for sorted interval processing and overlap consolidation.',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Sort by start time and merge overlapping ranges into consolidated intervals.',
  }),
]

export default data
