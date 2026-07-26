import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-medium-running-sum-0001',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Running Sum)\\n\\nImplement `solve(input)` where `input = number[]`. Return a new array with running totals.',
    correctExplanation:
      'Initialize sum=0. For each element, add it to sum and push sum to result array. Returns array of cumulative totals. Time O(n), Space O(n). Example: [1,2,3,4] → [1, 1+2=3, 3+3=6, 6+4=10].'
,
    tests: [
      { input: [[1, 2, 3, 4]], expected: [1, 3, 6, 10] },
      { input: [[3, -1, 2]], expected: [3, 2, 4] },
      { input: [[]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-medium-scale-array-0002',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Scale Array)\\n\\nImplement `solve(input)` where `input = { nums: number[], factor: number }`. Return a new array where each value is multiplied by `factor`.',
    correctExplanation:
      'Use map(num → num * factor) or loop: for each num, multiply by factor and push to result. Time O(n), Space O(n). Example: nums=[1,2,3], factor=2 → [1*2, 2*2, 3*2] → [2,4,6].'
,
    tests: [
      { input: [{ nums: [1, 2, 3], factor: 2 }], expected: [2, 4, 6] },
      { input: [{ nums: [5, -1], factor: 3 }], expected: [15, -3] },
      { input: [{ nums: [], factor: 7 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-medium-sum-even-values-0003',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Sum Even Values)\\n\\nImplement `solve(input)` where `input = number[]`. Return the sum of only even numbers.',
    correctExplanation:
      'Iterate through array and conditionally add values where (num % 2 === 0). Time O(n), Space O(1). Example: [1,2,3,4,5] → 2+4=6. [7,9] → no even values → 0. [-2,-4,3] → -2+(-4)=-6.'
,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 6 },
      { input: [[7, 9]], expected: 0 },
      { input: [[-2, -4, 3]], expected: -6 },
    ],
  },
  {
    id: 'raw-coding-medium-rotate-right-0004',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Rotate Array Right)\\n\\nImplement `solve(input)` where `input = { nums: number[], k: number }`. Return a new array rotated right by `k` steps.',
    correctExplanation:
      'Normalize k: k = k % length. If length=0 return []. Otherwise, split array at (length - k): result = nums.slice(length - k) + nums.slice(0, length - k). Time O(n), Space O(n). Example: [1,2,3,4,5], k=2 → k%5=2, split at 3 → [4,5]+[1,2,3] → [4,5,1,2,3].'
,
    tests: [
      { input: [{ nums: [1, 2, 3, 4, 5], k: 2 }], expected: [4, 5, 1, 2, 3] },
      { input: [{ nums: [1, 2], k: 3 }], expected: [2, 1] },
      { input: [{ nums: [], k: 4 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-medium-longest-common-prefix-0005',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Longest Common Prefix)\\n\\nImplement `solve(input)` where `input = string[]`. Return the longest common prefix across all strings.',
    correctExplanation:
      'Find shortest string length m. Compare character-by-character at each position 0..m-1 across all strings. When a mismatch occurs, return prefix up to that point. Time O(n*m), Space O(m). Example: ["flower", "flow", "flight"] → position 0: f==f==f, position 1: l==l==l, position 2: o!=i → return "fl".'
,
    tests: [
      { input: [['flower', 'flow', 'flight']], expected: 'fl' },
      { input: [['dog', 'racecar', 'car']], expected: '' },
      { input: [[]], expected: '' },
    ],
  },
  {
    id: 'raw-coding-medium-merge-intervals-0006',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Merge Intervals)\\n\\nImplement `solve(input)` where `input = number[][]` of `[start, end]`. Merge overlaps and return sorted merged intervals.',
    correctExplanation:
      'Sort intervals by start time. Initialize result with first interval. For each subsequent interval, if it overlaps with result[-1], merge by extending end. Otherwise, push as new interval. Time O(n log n), Space O(n). Example: [[1,3],[2,6],[8,10],[15,18]] → after sort: merge [1,3] and [2,6] to [1,6], keep [8,10], keep [15,18] → [[1,6],[8,10],[15,18]].'
,
    tests: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { input: [[]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-medium-transpose-matrix-0007',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Transpose Matrix)\\n\\nImplement `solve(input)` where `input = number[][]`. Return the matrix transpose.',
    correctExplanation:
      'Create output matrix with dimensions [cols][rows]. For each input[r][c], set output[c][r] = input[r][c]. Time O(rows*cols), Space O(rows*cols). Example: [[1,2,3],[4,5,6]] (2x3) → [[1,4],[2,5],[3,6]] (3x2).'
,
    tests: [
      { input: [[[1, 2, 3], [4, 5, 6]]], expected: [[1, 4], [2, 5], [3, 6]] },
      { input: [[[7]]], expected: [[7]] },
      { input: [[[1, 2], [3, 4], [5, 6]]], expected: [[1, 3, 5], [2, 4, 6]] },
    ],
  },
  {
    id: 'raw-coding-medium-first-non-repeating-char-0008',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (First Non-Repeating Character Index)\\n\\nImplement `solve(input)` where `input = string`. Return the index of the first non-repeating character, or `-1` if none exists.',
    correctExplanation:
      'Count frequency of each character using a map/object. Then scan the string left-to-right and return the index of the first char with frequency=1. If none, return -1. Time O(n), Space O(k) where k=unique chars. Example: "LiveCode" → freq: l=1, e=3, t=1, c=1, o=1, d=1 → scan left: l at index 0 has freq 1 → return 0.'
,
    tests: [
      { input: ['LiveCode'], expected: 0 },
      { input: ['aabb'], expected: -1 },
      { input: ['loveLiveCode'], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-medium-move-zeroes-0009',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Move Zeroes To End)\n\nImplement `solve(input)` where `input = number[]`. Return a new array with all zeroes moved to the end while preserving the order of non-zero values.',
    correctExplanation:
      'Collect all non-zero values in order, count total zeroes, then append that many zeroes to the result. Time O(n), Space O(n). Example: [0,1,0,3,12] → non-zeros: [1,3,12] (count=3), zeroes: 2 → [1,3,12,0,0].'
,
    tests: [
      { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
      { input: [[0, 0]], expected: [0, 0] },
    ],
  },
  {
    id: 'raw-coding-medium-remove-duplicates-sorted-0010',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Remove Duplicates From Sorted Array)\n\nImplement `solve(input)` where `input = number[]` sorted ascending. Return a new array containing each value once.',
    correctExplanation:
      'Scan once through the sorted array. Keep track of the previous value. Only add current value if it differs from previous. Time O(n), Space O(n). Example: [1,1,2,2,3] → keep 1 (first), skip 1 (same), keep 2, skip 2, keep 3 → [1,2,3].'
,
    tests: [
      { input: [[1, 1, 2, 2, 3]], expected: [1, 2, 3] },
      { input: [[4, 4, 4]], expected: [4] },
      { input: [[]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-medium-sort-by-parity-0011',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Sort Array By Parity)\n\nImplement `solve(input)` where `input = number[]`. Return a new array with all even values first and all odd values after, preserving relative order within each group.',
    correctExplanation:
      'Stable partition: separate into even and odd lists while preserving order within each group, then concatenate even + odd. Time O(n), Space O(n). Example: [3,1,2,4] → evens=[2,4], odds=[3,1] → result=[2,4,3,1].'
,
    tests: [
      { input: [[3, 1, 2, 4]], expected: [2, 4, 3, 1] },
      { input: [[2, 6, 8]], expected: [2, 6, 8] },
      { input: [[1, 5, 7]], expected: [1, 5, 7] },
    ],
  },
  {
    id: 'raw-coding-medium-majority-element-0012',
    difficulty: 'medium',
    prompt:
      'Raw Coding Simple Ops (Majority Element)\n\nImplement `solve(input)` where `input = number[]` and a majority element is guaranteed to exist. Return the value that appears more than `n / 2` times.',
    correctExplanation:
      'Count frequency of each element in a map. The element with count > n/2 is the majority. Or use Boyer-Moore majority vote: maintain a candidate and counter; when counter hits 0, reset candidate. Time O(n), Space O(n) or O(1). Example: [3,2,3] → freq: 3 appears 2 times, 2 appears 1 time. n/2=1.5, so 3 (count=2 > 1.5) is majority.'
,
    tests: [
      { input: [[3, 2, 3]], expected: 3 },
      { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
      { input: [[5]], expected: 5 },
    ],
  },
  {
    id: 'raw-coding-medium-dfs-connected-components-0013',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (DFS Connected Components)\n\nImplement `solve(input)` where `input = { n: number, edges: number[][] }` for an undirected graph with nodes `[0..n-1]`. Return the number of connected components.',
    correctExplanation:
      'Build an adjacency list, track visited nodes, and run DFS from each unvisited node. Each DFS marks one full component. Count how many DFS launches happen. Time O(n + e), Space O(n + e). Example: n=5, edges=[[0,1],[1,2],[3,4]] has components {0,1,2} and {3,4}, so answer is 2.'
,
    tests: [
      { input: [{ n: 5, edges: [[0, 1], [1, 2], [3, 4]] }], expected: 2 },
      { input: [{ n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }], expected: 1 },
      { input: [{ n: 4, edges: [] }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-medium-bfs-shortest-path-unweighted-0014',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (BFS Shortest Path Unweighted Graph)\n\nImplement `solve(input)` where `input = { n: number, edges: number[][], start: number, target: number }` for an undirected unweighted graph. Return the minimum number of edges from `start` to `target`, or `-1` if unreachable.',
    correctExplanation:
      'Use BFS from start because BFS explores by distance layers in unweighted graphs. The first time target is dequeued, you have the shortest edge count. Track visited to avoid cycles. Time O(n + e), Space O(n + e). Example: path 0->1->2->4 has 3 edges, so answer is 3.'
,
    tests: [
      { input: [{ n: 6, edges: [[0, 1], [1, 2], [2, 4], [0, 3], [3, 4]], start: 0, target: 4 }], expected: 2 },
      { input: [{ n: 5, edges: [[0, 1], [1, 2]], start: 0, target: 4 }], expected: -1 },
      { input: [{ n: 3, edges: [[0, 1], [1, 2]], start: 2, target: 2 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-medium-longest-substring-no-repeat-0015',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Sliding Window Longest Unique Substring)\n\nImplement `solve(input)` where `input = string`. Return the length of the longest substring without repeating characters.',
    correctExplanation:
      'Use sliding window with map/set and left pointer. Expand right, and while duplicate exists, shrink from left. Track max window length. Time O(n), Space O(k).'
,
    tests: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-medium-generate-parentheses-check-0016',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Valid Parentheses String)\n\nImplement `solve(input)` where `input = string` containing only parentheses chars `(` and `)`. Return `true` if the string is valid and balanced.',
    correctExplanation:
      'Track running balance. Increment on `(` and decrement on `)`. If balance goes negative at any point, invalid. Valid if final balance is zero. Time O(n), Space O(1).'
,
    tests: [
      { input: ['()()'], expected: true },
      { input: ['(()'], expected: false },
      { input: [')('], expected: false },
    ],
  },
  {
    id: 'raw-coding-medium-top-k-frequent-numbers-0017',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Top K Frequent Numbers)\n\nImplement `solve(input)` where `input = { nums: number[], k: number }`. Return the k most frequent numbers sorted by frequency descending, then value ascending for ties.',
    correctExplanation:
      'Count frequencies in map, sort unique values by (-count, value), and take first k. Time O(n + m log m), Space O(m).'
,
    tests: [
      { input: [{ nums: [1, 1, 1, 2, 2, 3], k: 2 }], expected: [1, 2] },
      { input: [{ nums: [4, 4, 5, 5, 6], k: 2 }], expected: [4, 5] },
      { input: [{ nums: [9], k: 1 }], expected: [9] },
    ],
  },
  {
    id: 'raw-coding-medium-product-except-self-0018',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Product of Array Except Self)\n\nImplement `solve(input)` where `input = number[]`. Return array `ans` where `ans[i]` is product of all nums except nums[i], without division.',
    correctExplanation:
      'Build prefix products and suffix products in one output array: first pass stores prefix, second pass multiplies suffix. Time O(n), Space O(1) extra excluding output.'
,
    tests: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { input: [[2, 3]], expected: [3, 2] },
    ],
  },
  {
    id: 'raw-coding-medium-group-anagrams-0019',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Group Anagrams)\n\nImplement `solve(input)` where `input = string[]`. Group words that are anagrams and return groups sorted internally, then sorted by first word.',
    correctExplanation:
      'Use sorted-character signature as key in hashmap to collect words. Sort each group and then sort groups by first element for deterministic output.'
,
    tests: [
      { input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']] },
      { input: [['']], expected: [['']] },
      { input: [['a']], expected: [['a']] },
    ],
  },
  {
    id: 'raw-coding-medium-kadane-max-subarray-0020',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Maximum Subarray Sum)\n\nImplement `solve(input)` where `input = number[]`. Return the maximum sum of any contiguous subarray.',
    correctExplanation:
      'Use Kadane\'s algorithm: keep a running best sum ending at the current index, resetting to the current value when extending would be worse. Track the global maximum. Time O(n), Space O(1).',
    tests: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
  },
  {
    id: 'raw-coding-medium-daily-temperatures-0021',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Daily Temperatures)\n\nImplement `solve(input)` where `input = number[]`. Return an array where each entry is the number of days until a warmer temperature.',
    correctExplanation:
      'Maintain a monotonic decreasing stack of indices. When the current temperature is warmer than the temperature at the top index, pop and fill in the wait time. Time O(n), Space O(n).',
    tests: [
      { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { input: [[30, 30, 30]], expected: [0, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-medium-coin-change-min-coins-0020',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Coin Change Min Coins)\n\nImplement `solve(input)` where `input = { coins: number[], amount: number }`. Return minimum coins to make amount, or -1 if impossible.',
    correctExplanation:
      'Bottom-up DP where dp[x] is min coins to make x. For each amount, try all coins and transition from dp[x-coin]. Time O(amount * coins), Space O(amount).'
,
    tests: [
      { input: [{ coins: [1, 2, 5], amount: 11 }], expected: 3 },
      { input: [{ coins: [2], amount: 3 }], expected: -1 },
      { input: [{ coins: [1], amount: 0 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-medium-rotate-matrix-0021',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Rotate Matrix 90 Degrees)\n\nImplement `solve(input)` where `input = number[][]` representing a square matrix. Return a new matrix rotated 90 degrees clockwise.',
    correctExplanation:
      'Create a new n x n matrix. For each cell at row r and column c, place it at output[c][n-1-r]. Time O(n^2), Space O(n^2).',
    tests: [
      { input: [[[1, 2], [3, 4]]], expected: [[3, 1], [4, 2]] },
      { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { input: [[[1]]], expected: [[1]] },
    ],
  },
  {
    id: 'raw-coding-medium-longest-palindromic-substring-0022',
    difficulty: 'medium',
    prompt:
      'Raw Coding LiveCode Pattern (Longest Palindromic Substring)\n\nImplement `solve(input)` where `input = string`. Return the longest palindromic substring.',
    correctExplanation:
      'Expand around each possible center, considering both odd-length and even-length palindromes. Track the longest span found and return that substring. Time O(n^2), Space O(1).',
    tests: [
      { input: ['babad'], expected: 'bab' },
      { input: ['cbbd'], expected: 'bb' },
      { input: ['a'], expected: 'a' },
    ],
  },
]

export default data
