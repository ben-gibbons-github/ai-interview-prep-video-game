import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ds-insane-edit-distance-3401',
    difficulty: 'insanelyHard',
    prompt:
      'Live coding Challenge (Edit Distance / Levenshtein Distance)\n\nScenario:\nA fuzzy-match spell-checker computes edit distance between user input and dictionary words to rank autocomplete suggestions.\n\nTask:\nImplement `solve(input)` where `input = { word1: string, word2: string }`.\n\nReturn:\nThe minimum number of single-character operations (insert, delete, replace) to transform word1 into word2.\n\nHint:\nDP[i][j] = edit distance between word1[0..i-1] and word2[0..j-1].',
    correctExplanation:
      'DP table: initialize first row/col with insert/delete costs. For each cell, if chars match copy diagonal, else take min(replace, insert, delete) + 1. Time O(m*n), Space O(m*n).',
    tests: [
      {
        input: [{ word1: 'horse', word2: 'ros' }],
        expected: 3,
      },
      {
        input: [{ word1: 'intention', word2: 'execution' }],
        expected: 5,
      },
      {
        input: [{ word1: 'a', word2: 'a' }],
        expected: 0,
      },
    ],
  },
  {
    id: 'raw-coding-ds-insane-sliding-window-max-3402',
    difficulty: 'insanelyHard',
    prompt:
      'Live coding Challenge (Sliding Window Maximum)\n\nScenario:\nA time-series monitor tracks the maximum value in each rolling window of sensor readings for spike detection.\n\nTask:\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\n\nReturn:\nArray of maximum values in each sliding window of size `k`.\n\nPerformance Goal:\nO(n) time (not O(n*k)).\n\nHint:\nMonotonic deque stores indices of decreasing values.',
    correctExplanation:
      'Use deque keeping indices in decreasing value order. Slide window: remove expired indices, pop smaller elements, add current. Front is window max. Time O(n).',
    tests: [
      {
        input: [{ nums: [1, 3, 1, 2, 0, 5], k: 3 }],
        expected: [3, 3, 2, 5],
      },
      {
        input: [{ nums: [1], k: 1 }],
        expected: [1],
      },
      {
        input: [{ nums: [1, 3, 1, 2, 0, 5], k: 2 }],
        expected: [3, 3, 2, 2, 5],
      },
    ],
  },
  {
    id: 'raw-coding-ds-insane-longest-palindromic-substrings-3403',
    difficulty: 'insanelyHard',
    prompt:
      'Live coding Challenge (Longest Palindromic Substrings Count)\n\nScenario:\nA string analytics engine counts all maximal palindromic regions for pattern discovery.\n\nTask:\nImplement `solve(input)` where `input = string`.\n\nReturn:\nThe number of distinct palindromic substrings of length > 1 (contiguous, case-sensitive).\n\nNote:\nCounting distinct substrings; if "aa" appears twice, count as 1.\n\nHint:\nDP or expand-around-center with set tracking.',
    correctExplanation:
      'For each center (single char or between chars), expand outward and record palindromes in a set. Final set size is count of distinct palindromes. Time O(n^2).',
    tests: [
      {
        input: ['abc'],
        expected: 0,
      },
      {
        input: ['abacabad'],
        expected: 5,
      },
      {
        input: ['aa'],
        expected: 1,
      },
    ],
  },
  {
    id: 'raw-coding-ds-insane-alien-dict-order-3404',
    difficulty: 'insanelyHard',
    prompt:
      'Live coding Challenge (Alien Dictionary Topological Order)\n\nScenario:\nA linguistics model infers the alphabetic ordering of an alien language from a sorted word list.\n\nTask:\nImplement `solve(input)` where `input = string[]` (sorted words in alien language).\n\nReturn:\nString representing alien dictionary order. If input is invalid, return empty string.\n\nRules:\n- Words are sorted; compare consecutive pairs to build ordering.\n- If a word is a prefix of a later word, order is invalid.\n\nHint:\nBuild graph, detect cycles with Kahn topological sort.',
    correctExplanation:
      'Extract ordering from consecutive word pairs, build directed graph of char dependencies, perform topological sort. Detect cycle if needed. Time O(N + E).',
    tests: [
      {
        input: [['wrt', 'wrf', 'er', 'ett', 'rftt']],
        expected: 'wertf',
      },
      {
        input: [['z', 'x']],
        expected: 'zx',
      },
      {
        input: [['z', 'zx']],
        expected: '',
      },
    ],
  },
  {
    id: 'raw-coding-ds-insane-range-sum-query-2d-3405',
    difficulty: 'insanelyHard',
    prompt:
      'Live coding Challenge (Range Sum Query 2D Immutable)\n\nScenario:\nA OLAP data warehouse pre-computes 2D prefix sums for instant range-sum queries across a matrix.\n\nTask:\nImplement `solve(input)` where `input = { matrix: number[][], queries: { row1: number, col1: number, row2: number, col2: number }[] }`.\n\nReturn:\nArray of sums for each rectangle query [row1,col1] to [row2,col2] inclusive.\n\nPerformance Goal:\nQuery must be O(1) after O(m*n) precomputation.\n\nHint:\n2D prefix-sum array: prefixSum[i][j] = sum of all elements from (0,0) to (i-1,j-1).',
    correctExplanation:
      'Build 2D prefix-sum array where ps[i+1][j+1] = matrix[i][j] + ps[i+1][j] + ps[i][j+1] - ps[i][j]. Query = ps[r2+1][c2+1] - ps[r1][c2+1] - ps[r2+1][c1] + ps[r1][c1].',
    tests: [
      {
        input: [
          {
            matrix: [[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]],
            queries: [
              { row1: 2, col1: 1, row2: 4, col2: 3 },
              { row1: 1, col1: 1, row2: 2, col2: 2 },
            ],
          },
        ],
        expected: [8, 11],
      },
      {
        input: [
          {
            matrix: [[1]],
            queries: [{ row1: 0, col1: 0, row2: 0, col2: 0 }],
          },
        ],
        expected: [1],
      },
    ],
  },
]

export default data
