import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-python-insanely-hard-median-stream-0001',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (Find Median from Data Stream)\n\nImplement `solve(input)` where `input = { operations: { op: "add", value: int } | { op: "getMedian" } }[]. Simulate adding integers and retrieving the median. Return an array of medians (or null for "add" operations).',
    correctExplanation:
      'Maintain two heaps: a max heap for the smaller half and a min heap for the larger half, keeping them balanced. When adding a number, insert into the appropriate heap and balance. When getting the median, return the top of the max heap (odd case) or average of both tops (even case). Time O(log n) per operation, Space O(n).',
    tests: [
      { input: [{ operations: [{ op: 'add', value: 1 }, { op: 'getMedian' }, { op: 'add', value: 2 }, { op: 'getMedian' }, { op: 'add', value: 3 }, { op: 'getMedian' }] }], expected: [null, 1, null, 1.5, null, 2] },
      { input: [{ operations: [{ op: 'add', value: 5 }, { op: 'getMedian' }] }], expected: [null, 5] },
      { input: [{ operations: [{ op: 'getMedian' }] }], expected: [null] },
    ],
  },
  {
    id: 'raw-coding-python-insanely-hard-trapping-rain-0002',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (Trapping Rain Water)\n\nImplement `solve(input)` where `input = list[int]` representing elevation heights. Return the total units of water that can be trapped after raining.',
    correctExplanation:
      'For each position, water level is min(max_left, max_right) - height. Precompute max heights to the left and right of each position. Time O(n), Space O(n). Example: [0,1,0,2,1,0,1,3,2,1,2,1] traps 6 units of water.',
    tests: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-python-insanely-hard-nqueen-count-0003',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (N-Queens Count)\n\nImplement `solve(input)` where `input = int` representing the board size. Return the number of distinct solutions to place n queens on an n×n chessboard such that no two queens threaten each other.',
    correctExplanation:
      'Use backtracking. For each row, try placing a queen in each column, checking conflicts. Maintain sets of occupied columns and diagonals for O(1) conflict detection. Time O(n!) worst case, Space O(n). This is a classic constraint satisfaction problem.',
    tests: [
      { input: [1], expected: 1 },
      { input: [4], expected: 2 },
      { input: [8], expected: 92 },
    ],
  },
  {
    id: 'raw-coding-python-insanely-hard-wildcard-match-0004',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (Wildcard Pattern Matching)\n\nImplement `solve(input)` where `input = { text: string, pattern: string }`. The pattern may contain "?" (matches one char) and "*" (matches zero or more chars). Return True if the text matches the pattern.',
    correctExplanation:
      'Use dynamic programming or greedy two-pointer approach. DP: dp[i][j] represents if text[0:i] matches pattern[0:j]. Handle "*" by trying match zero chars or one more char. Time O(n*m), Space O(n*m) or O(1) with greedy. Example: "aa" matches pattern "*".',
    tests: [
      { input: [{ text: 'aa', pattern: '*' }], expected: true },
      { input: [{ text: 'cb', pattern: '?a' }], expected: false },
      { input: [{ text: 'adceb', pattern: '*a*b' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-python-insanely-hard-alien-dict-order-0005',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (Alien Dictionary Order)\n\nImplement `solve(input)` where `input = list[string]` of words sorted in some alien dictionary order. Return the order of characters in the alien dictionary, or empty string if ordering is invalid.',
    correctExplanation:
      'Build a directed graph of character ordering by comparing adjacent words. Use topological sort (Kahn\'s or DFS) to find the order. Time O(n*l + c + e) where n=words, l=avg word length, c=unique chars, e=edges. Tricky: detecting cycles and invalid orderings.',
    tests: [
      { input: [['wrt', 'wrf', 'er', 'ett', 'rftt']], expected: 'wertf' },
      { input: [['z', 'x']], expected: 'zx' },
      { input: [['abc', 'ab']], expected: '' },
    ],
  },
  {
    id: 'raw-coding-python-insanely-hard-skyline-problem-0006',
    difficulty: 'insanelyHard',
    prompt:
      'Python Raw Coding (Skyline Problem)\n\nImplement `solve(input)` where `input = list[list[int]]` of buildings [left, right, height]. Return key points of the skyline as [x, y] where the height changes.',
    correctExplanation:
      'Use a sweep line algorithm with a multiset/heap. Process all x-coordinates in order, tracking active building heights. When max height changes, emit a key point. Time O(n log n), Space O(n). Example: [[0,2,3],[2,5,3]] produces [[0,3],[2,0],[5,0]].',
    tests: [
      { input: [[[0, 2, 3], [2, 5, 3]]], expected: [[0, 3], [5, 0]] },
      { input: [[[0, 2, 3], [2, 4, 3], [5, 7, 3]]], expected: [[0, 3], [5, 0], [5, 3], [7, 0]] },
      { input: [[]], expected: [] },
    ],
  },
]

export default data
