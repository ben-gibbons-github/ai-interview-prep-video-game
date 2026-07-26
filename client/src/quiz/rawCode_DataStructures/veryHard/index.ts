import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ds-veryhard-median-two-sorted-3301',
    difficulty: 'veryHard',
    prompt:
      'Live coding Challenge (Median of Two Sorted Arrays)\n\nScenario:\nA multi-shard analytics system computes global percentiles by merging pre-sorted shard results without materializing the full data.\n\nTask:\nImplement `solve(input)` where `input = { nums1: number[], nums2: number[] }`, both sorted ascending.\n\nReturn:\nThe median value:\n- If combined length is odd, return middle element.\n- If even, return average of two middle elements.\n\nPerformance Goal:\nO(log(min(m, n))) time using binary search, not merge-sort.\n\nHint:\nPartition one array to balance left/right halves.',
    correctExplanation:
      'Binary search on smaller array to partition it such that left half total length = right half (or right one more). Median is from boundary values. Time O(log min(m,n)).',
    tests: [
      {
        input: [{ nums1: [1, 3], nums2: [2] }],
        expected: 2,
      },
      {
        input: [{ nums1: [1, 2], nums2: [3, 4] }],
        expected: 2.5,
      },
      {
        input: [{ nums1: [], nums2: [1] }],
        expected: 1,
      },
    ],
  },
  {
    id: 'raw-coding-ds-veryhard-min-window-substring-3302',
    difficulty: 'veryHard',
    prompt:
      'Live coding Challenge (Minimum Window Substring)\n\nScenario:\nA compression filter needs to extract the shortest substring containing all required characters for metadata matching.\n\nTask:\nImplement `solve(input)` where `input = { s: string, t: string }`.\n\nReturn:\nThe shortest substring of `s` that contains all characters of `t` (with same frequency). Return empty string if impossible.\n\nHint:\nSliding window with character frequency maps.',
    correctExplanation:
      'Expand right pointer to include all chars, shrink left when valid, track minimum window. Use maps to track required vs current counts. Time O(m+n), Space O(1).',
    tests: [
      {
        input: [{ s: 'ADOBECODEBANC', t: 'ABC' }],
        expected: 'BANC',
      },
      {
        input: [{ s: 'a', t: 'a' }],
        expected: 'a',
      },
      {
        input: [{ s: 'a', t: 'aa' }],
        expected: '',
      },
    ],
  },
  {
    id: 'raw-coding-ds-veryhard-largest-rectangle-histogram-3303',
    difficulty: 'veryHard',
    prompt:
      'Live coding Challenge (Largest Rectangle in Histogram)\n\nScenario:\nA layout optimizer computes maximum rectangular area in a bar-chart histogram for optimal UI region allocation.\n\nTask:\nImplement `solve(input)` where `input = number[]` bar heights.\n\nReturn:\nThe area of the largest rectangle that can fit inside the histogram.\n\nHint:\nMonotonic increasing stack to track indices.',
    correctExplanation:
      'Use stack to maintain indices in height-increasing order. Pop when seeing smaller height; area = height * (right boundary - left boundary - 1). Time O(n).',
    tests: [
      {
        input: [[2, 1, 5, 6, 2, 3]],
        expected: 10,
      },
      {
        input: [[2, 4]],
        expected: 4,
      },
      {
        input: [[0, 1]],
        expected: 1,
      },
    ],
  },
  {
    id: 'raw-coding-ds-veryhard-trapping-rain-water-3304',
    difficulty: 'veryHard',
    prompt:
      'Live coding Challenge (Trapping Rain Water)\n\nScenario:\nA hydraulic simulation computes water volume trapped between elevation barriers in a terrain model.\n\nTask:\nImplement `solve(input)` where `input = number[]` terrain heights.\n\nReturn:\nTotal water volume trapped after raining on the terrain (in units).\n\nHint:\nFor each bar, water level = min(maxLeft, maxRight) - currentHeight.',
    correctExplanation:
      'Precompute max height to left and right of each index. Water at each position = min(maxLeft, maxRight) - height. Sum across all. Time O(n), Space O(n).',
    tests: [
      {
        input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expected: 6,
      },
      {
        input: [[4, 2, 0, 3, 2, 5]],
        expected: 9,
      },
      {
        input: [[0]],
        expected: 0,
      },
    ],
  },
  {
    id: 'raw-coding-ds-veryhard-regular-expression-matching-3305',
    difficulty: 'veryHard',
    prompt:
      'Live coding Challenge (Regular Expression Matching)\n\nScenario:\nA rule engine validates input strings against simple regex patterns using `.` (any char) and `*` (zero or more of preceding).\n\nTask:\nImplement `solve(input)` where `input = { s: string, p: string }`.\n\nReturn:\n`true` if string `s` matches pattern `p`, `false` otherwise.\n\nPattern Rules:\n- `.` matches any single character.\n- `*` matches zero or more of the preceding element.\n\nHint:\nDP[i][j] = does s[0..i-1] match p[0..j-1]?',
    correctExplanation:
      'DP table: dp[i][j] true if s[0..i-1] matches p[0..j-1]. Handle `*` by considering zero matches (skip pair) or one+ matches (consume char). Time O(m*n), Space O(m*n).',
    tests: [
      {
        input: [{ s: 'aa', p: 'a' }],
        expected: false,
      },
      {
        input: [{ s: 'aa', p: 'a*' }],
        expected: true,
      },
      {
        input: [{ s: 'ab', p: '.*' }],
        expected: true,
      },
    ],
  },
]

export default data
