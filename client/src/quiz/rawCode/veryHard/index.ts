import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-very-hard-group-anagrams-0001',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Group Anagrams)\\n\\nImplement `solve(input)` where `input = string[]`. Return grouped anagrams as `string[][]` sorted by group key and each group sorted lexicographically.',
    correctExplanation:
      'Group strings by sorted-character signature: for each string, sort chars and use as map key. Collect all strings under each key, sort each group lexicographically, then sort groups by their first element. Time O(n*k log k) where k is avg string length, Space O(n*k). Example: ["eat","tea","tan","ate","nat","bat"] → keys: "aet":["ate","eat","tea"], "ant":["nat","tan"], "abt":["bat"].' ,
    tests: [
      {
        input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
        expected: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']],
      },
    ],
  },
  {
    id: 'raw-coding-very-hard-longest-unique-substring-0002',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Longest Substring Without Repeating Characters)\\n\\nImplement `solve(input)` where `input = string`. Return the max length of a substring with all unique characters.',
    correctExplanation:
      'Two pointers left/right; keep a set of seen characters. Expand right and add chars. When duplicate found, shrink from left until duplicate gone. Track max length. Time O(n), Space O(k) where k is charset size. Example: "abcabcbb" → expand [a,b,c] length 3; hit b again, shrink left to [c,a,b], continue → max=3.' ,
    tests: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-very-hard-word-break-0003',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Word Break)\\n\\nImplement `solve(input)` where `input = { s: string, wordDict: string[] }`. Return `true` if `s` can be segmented into dictionary words, else `false`.',
    correctExplanation:
      'DP array where dp[i]=true if s[0..i-1] can be segmented. For each i, check all j < i where dp[j]=true and s[j..i] is in word dict. Time O(n^2 * k) with dict check, Space O(n). Example: s="LiveCode", dict=["leet","code"] → dp[0]=true (empty), dp[4]=true ("leet"), dp[8]=true ("code") → return true.' ,
    tests: [
      { input: [{ s: 'LiveCode', wordDict: ['leet', 'code'] }], expected: true },
      { input: [{ s: 'applepenapple', wordDict: ['apple', 'pen'] }], expected: true },
      { input: [{ s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] }], expected: false },
    ],
  },
  {
    id: 'raw-coding-very-hard-can-finish-courses-0004',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Course Schedule)\\n\\nImplement `solve(input)` where `input = { numCourses: number, prerequisites: number[][] }`. Return `true` if all courses can be finished (no cycle), else `false`.',
    correctExplanation:
      'Build adjacency list from prerequisites. Use Kahn indegree or DFS cycle detection. For Kahn: compute indegree, process nodes with 0 indegree, decrement neighbors\' indegree. If all nodes processed, no cycle. Time O(V+E), Space O(V+E). Example: numCourses=2, prerequisites=[[1,0]] (0 must finish first) → graph: 0→ 1, indegree: 0:0, 1:1 → process 0, decrement 1 → return true.' ,
    tests: [
      { input: [{ numCourses: 2, prerequisites: [[1, 0]] }], expected: true },
      { input: [{ numCourses: 2, prerequisites: [[1, 0], [0, 1]] }], expected: false },
      { input: [{ numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2]] }], expected: true },
    ],
  },
  {
    id: 'raw-coding-very-hard-coin-change-min-0005',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Coin Change Minimum Coins)\\n\\nImplement `solve(input)` where `input = { coins: number[], amount: number }`. Return minimum number of coins to form amount, or `-1` if impossible.',
    correctExplanation:
      'DP where dp[x] = min coins to make value x. Initialize dp[0]=0, others=infinity. For each value x and each coin c, dp[x] = min(dp[x], dp[x-c]+1). Time O(amount * len(coins)), Space O(amount). Example: coins=[1,2,5], amount=11 → dp=[0,1,1,2,2,1,2,2,3,3,2,3] → dp[11]=3 (5+5+1).' ,
    tests: [
      { input: [{ coins: [1, 2, 5], amount: 11 }], expected: 3 },
      { input: [{ coins: [2], amount: 3 }], expected: -1 },
      { input: [{ coins: [1], amount: 0 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-spiral-order-0006',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Spiral Matrix Traversal)\\n\\nImplement `solve(input)` where `input = number[][]`. Return all values in spiral order.',
    correctExplanation:
      'Use pointers top/bottom/left/right. Add right column, move top down. Add bottom row, move right left. Add left column, move bottom up. Add top row, move left right. Repeat while boundaries valid. Time O(m*n), Space O(m*n) for result. Example: [[1,2,3],[4,5,6],[7,8,9]] → right:[1,2,3], bottom:[6,9], left:[8,7], top:[4,5] → spiral=[1,2,3,6,9,8,7,4,5].' ,
    tests: [
      { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { input: [[[1, 2, 3, 4]]], expected: [1, 2, 3, 4] },
      { input: [[[1], [2], [3]]], expected: [1, 2, 3] },
    ],
  },
  {
    id: 'raw-coding-very-hard-subarray-sum-k-0007',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Subarray Sum Equals K Count)\\n\\nImplement `solve(input)` where `input = { nums: number[], k: number }`. Return the count of subarrays whose sum equals `k`.',
    correctExplanation:
      'Map of prefix_sum → count. Iterate through array, accumulate prefix_sum, check if (prefix_sum - k) exists in map (that subarray sums to k). Time O(n), Space O(n). Example: nums=[1,1,1], k=2 → prefix_sums: 0,1,2,3; at i=1 prefix=1, (1-2)=-1 not in map; at i=2 prefix=2, (2-2)=0 in map (count=1) → found 1 subarray; at i=3 prefix=3, (3-2)=1 in map (count=2) → found 2nd → return 2.' ,
    tests: [
      { input: [{ nums: [1, 1, 1], k: 2 }], expected: 2 },
      { input: [{ nums: [1, 2, 3], k: 3 }], expected: 2 },
      { input: [{ nums: [1, -1, 0], k: 0 }], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-very-hard-number-of-islands-0008',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Number Of Islands)\n\nImplement `solve(input)` where `input = string[][]` containing `"0"` and `"1"`. Return the number of disconnected islands.',
    correctExplanation:
      'Create visited set. For each unvisited land cell ("1"), run DFS/BFS and increment island counter, marking all connected land as visited. Time O(m*n), Space O(m*n). Example: grid=[["1","1","0"],["0","1","0"]] → DFS from (0,0) marks all connected 1s → counter=1; no other unvisited land → return 1.' ,
    tests: [
      {
        input: [[['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']]],
        expected: 1,
      },
      {
        input: [[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']]],
        expected: 3,
      },
      { input: [[['0']]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-longest-consecutive-0009',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Longest Consecutive Sequence)\n\nImplement `solve(input)` where `input = number[]`. Return the length of the longest consecutive-value sequence.',
    correctExplanation:
      'Use a set to track all numbers. For each number, check if (num-1) exists; if not, start a chain. Count chain length from num, num+1, num+2, ... Time O(n), Space O(n) (set is used once). Example: [100,4,200,1,3,2] → chains: start at 1 → [1,2,3,4] length=4, start at 100 length=1, start at 200 length=1 → max=4.' ,
    tests: [
      { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-phone-letter-combinations-0010',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Phone Letter Combinations)\n\nImplement `solve(input)` where `input = string` digits from `2` to `9`. Return all possible letter combinations in lexicographic order.',
    correctExplanation:
      'Map digits to letters: 2→abc, 3→def, ..., 9→wxyz. Use backtracking to build all combinations by choosing one letter per digit. Time O(4^n) worst case, Space O(4^n). Example: input="23" → digit2=[a,b,c], digit3=[d,e,f] → combine: [ad,ae,af,bd,be,bf,cd,ce,cf].' ,
    tests: [
      { input: ['23'], expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
      { input: [''], expected: [] },
      { input: ['7'], expected: ['p', 'q', 'r', 's'] },
    ],
  },
  {
    id: 'raw-coding-very-hard-validate-sudoku-0011',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Validate Sudoku Board)\n\nImplement `solve(input)` where `input = string[][]` representing a partially filled Sudoku board with digits or `"."`. Return `true` if all filled cells obey row, column, and 3x3 box rules.',
    correctExplanation:
      'Use three sets: seen_rows, seen_cols, seen_boxes. For each filled cell, add digit to corresponding sets. If digit already in any set, return false. Else continue. Time O(1) (always 81 cells), Space O(1). Example: valid sudoku at (0,0)=5 → add 5 to row 0, col 0, box 0; later if 5 appears again in those regions, return false.' ,
    tests: [
      {
        input: [[
          ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
          ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
          ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
          ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
          ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
          ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
          ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
          ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
          ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
        ]],
        expected: true,
      },
      {
        input: [[
          ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
          ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
          ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
          ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
          ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
          ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
          ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
          ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
          ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
        ]],
        expected: false,
      },
    ],
  },
  {
    id: 'raw-coding-very-hard-top-k-frequent-numbers-0012',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Arrays and Hashing | Top K Frequent Numbers)\n\nImplement `solve(input)` where `input = { nums: number[], k: number }`. Return the `k` most frequent numbers sorted by frequency descending, then value ascending for ties.',
    correctExplanation:
      'Count frequencies with map. Create pairs [count, value]. Sort by count descending, value ascending. Take first k pairs\' values. Time O(n + m log m), Space O(m). Example: nums=[1,1,1,2,2,3], k=2 → freq: {1:3, 2:2, 3:1} → sorted pairs: [[3,1],[2,2],[1,3]] → result=[1,2].' ,
    tests: [
      { input: [{ nums: [1, 1, 1, 2, 2, 3], k: 2 }], expected: [1, 2] },
      { input: [{ nums: [4, 4, 4, 6, 6, 7, 7], k: 2 }], expected: [4, 6] },
      { input: [{ nums: [9], k: 1 }], expected: [9] },
    ],
  },
  {
    id: 'raw-coding-very-hard-three-sum-0013',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Two Pointers | 3Sum)\n\nImplement `solve(input)` where `input = number[]`. Return all unique triplets `[a,b,c]` such that `a+b+c=0`. Sort each triplet ascending, and sort output lexicographically.',
    correctExplanation:
      'Sort array. Fix first value, use two pointers for remaining pair. When sum too small, move left pointer right. When sum too large, move right pointer left. Skip duplicates at all levels to ensure uniqueness. Time O(n^2), Space O(1). Example: [-1,0,1,2,-1,-4] → sort → [-4,-1,-1,0,1,2] → fix -1, find pairs summing to 1 → [-1,-1,2], [-1,0,1].' ,
    tests: [
      { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 0, 0, 0]], expected: [[0, 0, 0]] },
      { input: [[1, 2, -2, -1]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-very-hard-min-window-substring-0014',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Sliding Window | Minimum Window Substring)\n\nImplement `solve(input)` where `input = { s: string, t: string }`. Return the smallest substring of `s` that contains all chars from `t` (with multiplicity), or empty string.',
    correctExplanation:
      'Two-pointer sliding window. Expand right to include chars of t until all are present. Then shrink left while still valid; track min-length window and positions. Time O(|s|+|t|), Space O(|t|). Example: s="ADOBECODEBANC", t="ABC" → window [ADOBEC...], shrink left to get [BANC] → return "BANC".' ,
    tests: [
      { input: [{ s: 'ADOBECODEBANC', t: 'ABC' }], expected: 'BANC' },
      { input: [{ s: 'a', t: 'aa' }], expected: '' },
      { input: [{ s: 'aaflslflsldkalskaaa', t: 'aaa' }], expected: 'aaa' },
    ],
  },
  {
    id: 'raw-coding-very-hard-search-rotated-array-0015',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Binary Search | Search In Rotated Sorted Array)\n\nImplement `solve(input)` where `input = { nums: number[], target: number }`. Return target index or `-1`.',
    correctExplanation:
      'Binary search on sorted rotated array. At mid, identify which half is properly sorted. Check if target is in that half; if yes, search there; else search other half. Time O(log n), Space O(1). Example: nums=[4,5,6,7,0,1,2], target=0 → left half [4,5,6,7] sorted, target not there → search right [0,1,2] → found at index 4.' ,
    tests: [
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }], expected: 4 },
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }], expected: -1 },
      { input: [{ nums: [1], target: 0 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-largest-rectangle-histogram-0016',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Stack | Largest Rectangle In Histogram)\n\nImplement `solve(input)` where `input = number[]` histogram heights. Return max rectangle area.',
    correctExplanation:
      'Use monotonic increasing stack of indices. For each bar, pop all shorter bars (compute area for each), push current. Remaining unpoped bars have height up to end. Time O(n), Space O(n). Example: heights=[2,1,5,6,2,3] → area when 2 pops (width depends on stack), when 1 pops → max area=10 at [5,6].' ,
    tests: [
      { input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
      { input: [[2, 4]], expected: 4 },
      { input: [[1, 1, 1]], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-very-hard-add-two-numbers-linked-list-0017',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Linked List | Add Two Numbers)\n\nImplement `solve(input)` where `input = { l1: number[], l2: number[] }`. Arrays represent reversed linked-list digits. Return resulting reversed digits array.',
    correctExplanation:
      'Link-list add: iterate both lists, sum digits with carry. Create new node with (sum % 10), carry=(sum/10). Continue until both lists exhausted and no carry. Time O(max(m,n)), Space O(max(m,n)). Example: l1=[2,4,3] (342), l2=[5,6,4] (465) → 2+5=7, 4+6=10 (carry 1), 3+4+1=8 → result=[7,0,8] (807).' ,
    tests: [
      { input: [{ l1: [2, 4, 3], l2: [5, 6, 4] }], expected: [7, 0, 8] },
      { input: [{ l1: [0], l2: [0] }], expected: [0] },
      { input: [{ l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
    ],
  },
  {
    id: 'raw-coding-very-hard-kth-smallest-bst-0018',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Kth Smallest Element In BST)\n\nImplement `solve(input)` where `input = { root: TreeNode | null, k: number }` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return kth smallest value.',
    correctExplanation:
      'Inorder traversal (left, node, right) of BST visits nodes in ascending order. Count nodes visited and return the kth. Time O(n) worst, O(k) best, Space O(h). Example: root 3 with left 1 (right child 2) and right 4, k=1 → inorder: [1,2,3,4] → 1st smallest is 1.' ,
    tests: [
      { input: [{ root: { val: 3, left: { val: 1, left: null, right: { val: 2, left: null, right: null } }, right: { val: 4, left: null, right: null } }, k: 1 }], expected: 1 },
      { input: [{ root: { val: 5, left: { val: 3, left: { val: 2, left: { val: 1, left: null, right: null }, right: null }, right: { val: 4, left: null, right: null } }, right: { val: 6, left: null, right: null } }, k: 3 }], expected: 3 },
      { input: [{ root: { val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }, k: 2 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-very-hard-top-k-frequent-words-0019',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Heap | Top K Frequent Words)\n\nImplement `solve(input)` where `input = { words: string[], k: number }`. Return top k words by frequency descending and lexicographic ascending for ties.',
    correctExplanation:
      'Frequency map over words. Heap (max-heap on count, min-heap on lexicographic for ties) or sort by (count desc, word asc). Take first k. Time O(n log k) heap or O(n log n) sort, Space O(n). Example: words=["i","love","LiveCode","i","love","coding"], k=2 → freq: {i:2, love:2, ...} → top 2 by count → [i,love].' ,
    tests: [
      { input: [{ words: ['i', 'love', 'LiveCode', 'i', 'love', 'coding'], k: 2 }], expected: ['i', 'love'] },
      { input: [{ words: ['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is'], k: 4 }], expected: ['the', 'is', 'sunny', 'day'] },
      { input: [{ words: ['z', 'y', 'x'], k: 1 }], expected: ['x'] },
    ],
  },
  {
    id: 'raw-coding-very-hard-insert-interval-0020',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Intervals | Insert Interval)\n\nImplement `solve(input)` where `input = { intervals: number[][], newInterval: number[] }`. Return merged non-overlapping intervals sorted by start.',
    correctExplanation:
      'Process left intervals: add all [start, end] where end <= newInterval.start. Merge phase: extend end while intervals overlap. Add merged. Append remaining right intervals. Time O(n), Space O(n). Example: intervals=[[1,3],[6,9]], newInterval=[2,5] → no left, merge [1,3] and [2,5] to [1,5], append [6,9] → [[1,5],[6,9]].' ,
    tests: [
      { input: [{ intervals: [[1, 3], [6, 9]], newInterval: [2, 5] }], expected: [[1, 5], [6, 9]] },
      {
        input: [{ intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] }],
        expected: [[1, 2], [3, 10], [12, 16]],
      },
      { input: [{ intervals: [], newInterval: [5, 7] }], expected: [[5, 7]] },
    ],
  },
  {
    id: 'raw-coding-very-hard-word-search-0021',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Backtracking | Word Search)\n\nImplement `solve(input)` where `input = { board: string[][], word: string }`. Return true if word exists via adjacent horizontal/vertical cells without reusing a cell.',
    correctExplanation:
      'DFS backtracking with visited marking. For each starting position, explore 4 directions recursively. Mark current cell visited, recurse, unmark. Return true if path found. Time O(m*n*4^len), Space O(m*n). Example: board=[[A,B,C,E],[S,F,C,S],[A,D,E,E]], word="ABCCED" → DFS from A(0,0), follow to B, C, C, E, D, E → return true.' ,
    tests: [
      { input: [{ board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'ABCCED' }], expected: true },
      { input: [{ board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'SEE' }], expected: true },
      { input: [{ board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'ABCB' }], expected: false },
    ],
  },
  {
    id: 'raw-coding-very-hard-shortest-path-binary-matrix-0022',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graphs | Shortest Path In Binary Matrix)\n\nImplement `solve(input)` where `input = number[][]` with `0` open and `1` blocked. Move in 8 directions. Return shortest path length from top-left to bottom-right, or `-1`.',
    correctExplanation:
      'BFS from top-left, track distance. Process nodes level-by-level in 8 directions. First time reaching bottom-right gives shortest path. If unreachable, return -1. Time O(m*n), Space O(m*n). Example: [[0,1],[1,0]] → BFS from (0,0) → distance=2 to reach (1,1).' ,
    tests: [
      { input: [[[0, 1], [1, 0]]], expected: 2 },
      { input: [[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: 4 },
      { input: [[[1, 0], [0, 0]]], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-replace-words-trie-0023',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trie | Replace Words)\n\nImplement `solve(input)` where `input = { dictionary: string[], sentence: string }`. Replace each word in sentence with the shortest root from dictionary that is a prefix. Return transformed sentence.',
    correctExplanation:
      'Build trie or set of prefixes. For each word in sentence, greedily find shortest matching prefix and replace. Time O(sentence_length * avg_prefix_length), Space O(total_dict_length). Example: dict=["cat","bat","rat"], sentence="the cattle was rattled..." → "cattle" matches prefix "cat" → replace with "cat".' ,
    tests: [
      { input: [{ dictionary: ['cat', 'bat', 'rat'], sentence: 'the cattle was rattled by the battery' }], expected: 'the cat was rat by the bat' },
      { input: [{ dictionary: ['a', 'b', 'c'], sentence: 'aadsfasf absbs bbab cadsfafs' }], expected: 'a a b c' },
      { input: [{ dictionary: ['abc'], sentence: 'xyz' }], expected: 'xyz' },
    ],
  },
  {
    id: 'raw-coding-very-hard-longest-increasing-subsequence-0024',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Dynamic Programming | Longest Increasing Subsequence)\n\nImplement `solve(input)` where `input = number[]`. Return LIS length.',
    correctExplanation:
      'DP where dp[i] = max length of LIS ending at i. For each i, find max dp[j] where j < i and nums[j] < nums[i], set dp[i] = dp[j]+1. Or use patience sorting with binary search for O(n log n). Time O(n log n), Space O(n). Example: nums=[10,9,2,5,3,7,101,18] → LIS could be [2,3,7,101] length 4.' ,
    tests: [
      { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
      { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
      { input: [[7, 7, 7, 7, 7]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-jump-game-ii-0025',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Greedy | Jump Game II)\n\nImplement `solve(input)` where `input = number[]` jump lengths. Return minimum jumps needed to reach last index.',
    correctExplanation:
      'BFS greedy: maintain max reachable index for current layer. When exhausting layer, increment jumps and update layer. Time O(n), Space O(1). Example: nums=[2,3,1,1,4] → layer 1: reach up to index 2, jumps=1; from layer, can reach up to 4 → jumps=2 → final=2.' ,
    tests: [
      { input: [[2, 3, 1, 1, 4]], expected: 2 },
      { input: [[2, 3, 0, 1, 4]], expected: 2 },
      { input: [[0]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-number-of-provinces-0026',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Union Find | Number Of Provinces)\n\nImplement `solve(input)` where `input = number[][]` adjacency matrix `isConnected`. Return number of connected components (provinces).',
    correctExplanation:
      'Union-find: union all connected city pairs. Count unique roots = number of provinces. Time O(n^2 * α(n)), Space O(n). Example: isConnected=[[1,1,0],[1,1,0],[0,0,1]] → union 0-1, union 1-0 (already), city 2 separate → 2 provinces.' ,
    tests: [
      { input: [[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], expected: 2 },
      { input: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], expected: 3 },
      { input: [[[1, 1], [1, 1]]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-prefix-sum-range-query-0027',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Prefix Sum | Range Sum Query)\n\nImplement `solve(input)` where `input = { nums: number[], queries: number[][] }` and each query is `[l, r]` inclusive. Return array of sums for each query.',
    correctExplanation:
      'Precompute prefix sums: prefix[i] = sum(nums[0..i-1]). For query [l,r] inclusive: answer = prefix[r+1] - prefix[l]. Time O(n) precompute, O(1) per query, Space O(n). Example: nums=[1,2,3,4], queries=[[0,1],[1,3]] → prefix=[0,1,3,6,10] → query[0,1]: prefix[2]-prefix[0]=3, query[1,3]: prefix[4]-prefix[1]=9.' ,
    tests: [
      { input: [{ nums: [1, 2, 3, 4], queries: [[0, 1], [1, 3], [0, 3]] }], expected: [3, 9, 10] },
      { input: [{ nums: [-2, 0, 3, -5, 2, -1], queries: [[0, 2], [2, 5], [0, 5]] }], expected: [1, -1, -3] },
      { input: [{ nums: [5], queries: [[0, 0]] }], expected: [5] },
    ],
  },
  {
    id: 'raw-coding-very-hard-clone-graph-0028',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graphs DFS/BFS | Clone Graph)\n\nImplement `solve(input)` where `input = { adjacency: number[][], start: number }`. `adjacency[i]` lists neighbors of node `i` in an undirected graph. Return a deep-cloned adjacency list reachable from `start` as `{ adjacency: number[][], visitedOrder: number[] }`, where `visitedOrder` is traversal order using BFS.',
    correctExplanation:
      'Use a map from original node to cloned node/entry and BFS from start. For each popped node, ensure all neighbors are cloned and linked in the clone adjacency list. Track visited to avoid loops. Return clone plus BFS order to prove traversal. Time O(V+E), Space O(V+E).'
,
    tests: [
      { input: [{ adjacency: [[1, 2], [0, 2], [0, 1, 3], [2]], start: 0 }], expected: { adjacency: [[1, 2], [0, 2], [0, 1, 3], [2]], visitedOrder: [0, 1, 2, 3] } },
      { input: [{ adjacency: [[], [2], [1]], start: 1 }], expected: { adjacency: [[], [2], [1]], visitedOrder: [1, 2] } },
      { input: [{ adjacency: [[]], start: 0 }], expected: { adjacency: [[]], visitedOrder: [0] } },
    ],
  },
  {
    id: 'raw-coding-very-hard-rotting-oranges-0029',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Multi-source BFS | Rotting Oranges)\n\nImplement `solve(input)` where `input = number[][]` grid with `0` empty, `1` fresh orange, `2` rotten orange. Each minute, fresh oranges adjacent in 4 directions to rotten ones become rotten. Return minutes until no fresh oranges remain, or `-1` if impossible.',
    correctExplanation:
      'Push all initially rotten oranges into a queue (multi-source BFS). Process level by level where each level is one minute, rotting adjacent fresh oranges and decrementing fresh count. If fresh becomes zero, return elapsed minutes; otherwise -1. Time O(m*n), Space O(m*n).'
,
    tests: [
      { input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { input: [[[0, 2]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-pacific-atlantic-water-flow-0030',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graphs DFS/BFS | Pacific Atlantic Water Flow)\n\nImplement `solve(input)` where `input = number[][]` heights. Water can flow from a cell to neighboring cell (4 directions) with height less than or equal to current. Return all coordinates that can reach both Pacific (top/left edges) and Atlantic (bottom/right edges), sorted lexicographically.',
    correctExplanation:
      'Reverse the flow: run DFS/BFS from ocean borders inward to cells of greater or equal height. Compute reachable sets for Pacific and Atlantic, then intersect them. Sort coordinate pairs for deterministic output. Time O(m*n), Space O(m*n).'
,
    tests: [
      {
        input: [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]],
        expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
      },
      { input: [[[1]]], expected: [[0, 0]] },
      { input: [[[2, 1], [1, 2]]], expected: [[0, 0], [0, 1], [1, 0], [1, 1]] },
    ],
  },
  {
    id: 'raw-coding-very-hard-network-delay-time-0031',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graphs Dijkstra | Network Delay Time)\n\nImplement `solve(input)` where `input = { times: number[][], n: number, k: number }`. Nodes are 1..n. Return time for all nodes to receive signal from k, or -1 if unreachable.',
    correctExplanation:
      'Run Dijkstra from source k over directed weighted edges. Track shortest arrival for each node. Answer is max shortest time if all nodes reached else -1.'
,
    tests: [
      { input: [{ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 }], expected: 2 },
      { input: [{ times: [[1, 2, 1]], n: 2, k: 1 }], expected: 1 },
      { input: [{ times: [[1, 2, 1]], n: 2, k: 2 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-word-search-ii-count-0032',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trie + DFS | Word Search II Count)\n\nImplement `solve(input)` where `input = { board: string[][], words: string[] }`. Return how many distinct words from the list exist in the board.',
    correctExplanation:
      'Build trie from words, DFS from each cell following trie branches, and mark found words to avoid double counting. Backtrack visited cells.'
,
    tests: [
      { input: [{ board: [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']], words: ['oath', 'pea', 'eat', 'rain'] }], expected: 2 },
      { input: [{ board: [['a', 'b'], ['c', 'd']], words: ['abcb', 'abcd', 'acdb'] }], expected: 1 },
      { input: [{ board: [['a']], words: ['a', 'aa'] }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-very-hard-regular-expression-matching-0033',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: DP | Regular Expression Matching)\n\nImplement `solve(input)` where `input = { s: string, p: string }`. Pattern supports `.` and `*` with LiveCode semantics. Return true if full string matches.',
    correctExplanation:
      'Use DP over i,j for s-prefix and p-prefix. `*` handles zero occurrences (dp[i][j-2]) or one+ when previous pattern char matches current text char.'
,
    tests: [
      { input: [{ s: 'aa', p: 'a' }], expected: false },
      { input: [{ s: 'aa', p: 'a*' }], expected: true },
      { input: [{ s: 'ab', p: '.*' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-very-hard-alien-dictionary-order-0034',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graph Topological Sort | Alien Dictionary)\n\nImplement `solve(input)` where `input = string[]` sorted words in alien language. Return one valid character order string, or empty string if invalid.',
    correctExplanation:
      'Build precedence edges from first differing characters of adjacent words, detect invalid prefix case, then topologically sort characters. Cycle or invalid prefix returns empty string.'
,
    tests: [
      { input: [['wrt', 'wrf', 'er', 'ett', 'rftt']], expected: 'wertf' },
      { input: [['z', 'x']], expected: 'zx' },
      { input: [['abc', 'ab']], expected: '' },
    ],
  },
  {
    id: 'raw-coding-very-hard-min-cost-connect-points-0035',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Graph MST | Min Cost to Connect Points)\n\nImplement `solve(input)` where `input = number[][]` points [x,y]. Cost between points is Manhattan distance. Return minimum total cost to connect all points.',
    correctExplanation:
      'Apply Prim algorithm for MST: grow connected set by always taking smallest edge to an unconnected point. Manhattan distance computed on demand. Time O(n^2) typical without heap optimization.'
,
    tests: [
      { input: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], expected: 20 },
      { input: [[[3, 12], [-2, 5], [-4, 1]]], expected: 18 },
      { input: [[[0, 0]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-sliding-window-median-0036',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Heaps | Sliding Window Median)\n\nImplement `solve(input)` where `input = { nums: number[], k: number }`. Return medians for each window as number[]; for even k median is average of middle two.',
    correctExplanation:
      'Maintain max-heap for lower half and min-heap for upper half with lazy deletion for outgoing elements. Rebalance heaps each step and emit median from heap tops.'
,
    tests: [
      { input: [{ nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 }], expected: [1, -1, -1, 3, 5, 6] },
      { input: [{ nums: [1, 2], k: 1 }], expected: [1, 2] },
      { input: [{ nums: [1, 4, 2, 3], k: 4 }], expected: [2.5] },
    ],
  },
  {
    id: 'raw-coding-very-hard-binary-tree-maximum-path-sum-0042',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Binary Tree Maximum Path Sum)\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return the maximum path sum in the tree, where a path can start and end at any nodes but must move parent-child along edges.',
    correctExplanation:
      'Use postorder DFS. For each node, compute the best downward path that can be extended to the parent, and separately update a global maximum using node value plus the best left and right contributions. Negative contributions should be clamped to zero when extending upward. Time O(n), Space O(h).',
    tests: [
      { input: [{ val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } }], expected: 6 },
      { input: [{ val: -10, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }], expected: 42 },
      { input: [{ val: -3, left: null, right: null }], expected: -3 },
    ],
  },
  {
    id: 'raw-coding-very-hard-trie-wildcard-search-0043',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trie | Wildcard Word Search)\n\nImplement `solve(input)` where `input = { operations: { type: "insert" | "search", word: string }[] }`. Search supports `.` as a wildcard matching any single character. Return booleans for each search in order.',
    correctExplanation:
      'Insert words into a trie. For search, recursively traverse trie branches; when the query character is `.`, try every child. Return true only if a full path ends on a terminal node. Time O(b^m) worst case for wildcards, Space O(total characters).',
    tests: [
      { input: [{ operations: [{ type: 'insert', word: 'bad' }, { type: 'insert', word: 'dad' }, { type: 'insert', word: 'mad' }, { type: 'search', word: 'pad' }, { type: 'search', word: 'bad' }, { type: 'search', word: '.ad' }, { type: 'search', word: 'b..' }] }], expected: [false, true, true, true] },
      { input: [{ operations: [{ type: 'insert', word: 'a' }, { type: 'search', word: '.' }, { type: 'search', word: 'a' }] }], expected: [true, true] },
      { input: [{ operations: [{ type: 'search', word: '...' }] }], expected: [false] },
    ],
  },
  {
    id: 'raw-coding-very-hard-construct-tree-preorder-inorder-0044',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Construct Binary Tree From Preorder And Inorder)\n\nImplement `solve(input)` where `input = { preorder: number[], inorder: number[] }`. Return the tree in level-order array form with `null` placeholders trimmed from the end.',
    correctExplanation:
      'The first preorder value is the root. Find that value in inorder to split left and right subtrees, then recurse on the corresponding slices. Use a hashmap for inorder index lookup to keep it efficient. Time O(n), Space O(n).',
    tests: [
      { input: [{ preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] }], expected: [3, 9, 20, null, null, 15, 7] },
      { input: [{ preorder: [1], inorder: [1] }], expected: [1] },
      { input: [{ preorder: [1, 2], inorder: [2, 1] }], expected: [1, 2] },
    ],
  },
  {
    id: 'raw-coding-very-hard-nary-tree-level-order-0045',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | N-ary Tree Level Order Traversal)\n\nImplement `solve(input)` where `input = { root: { val: number, children: any[] } | null }` and each node may have zero or more children. Return node values grouped by level from top to bottom.',
    correctExplanation:
      'Use BFS with a queue that stores each node and its depth. Push all children of a node into the queue in order. Group values by depth and return the grouped arrays. Time O(n), Space O(n).',
    tests: [
      { input: [{ root: { val: 1, children: [{ val: 3, children: [{ val: 5, children: [] }, { val: 6, children: [] }] }, { val: 2, children: [] }, { val: 4, children: [] }] } }], expected: [[1], [3, 2, 4], [5, 6]] },
      { input: [{ root: { val: 1, children: [] } }], expected: [[1]] },
      { input: [{ root: null }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-very-hard-diameter-binary-tree-0046',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Diameter Of Binary Tree)\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return the diameter of the tree measured in edges.',
    correctExplanation:
      'Use postorder DFS to compute subtree heights while updating a global maximum of leftHeight + rightHeight at each node. The diameter is the longest path between any two nodes, counted in edges. Time O(n), Space O(h).',
    tests: [
      { input: [{ val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: null } }], expected: 3 },
      { input: [{ val: 1, left: { val: 2, left: null, right: null }, right: null }], expected: 1 },
      { input: [{ val: 1, left: null, right: null }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-very-hard-binary-tree-right-side-view-0037',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Binary Tree Right Side View)\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return the values visible from the right side, top to bottom.',
    correctExplanation:
      'Traverse level by level and record the last node seen at each depth, or do a right-first DFS and capture the first node encountered at each depth. Time O(n), Space O(n). Example: root 1, children 2 and 3, with 2.right=5 and 3.right=4 → right side view [1,3,4].',
    tests: [
      { input: [{ val: 1, left: { val: 2, left: null, right: { val: 5, left: null, right: null } }, right: { val: 3, left: null, right: { val: 4, left: null, right: null } } }], expected: [1, 3, 4] },
      { input: [{ val: 1, left: null, right: { val: 3, left: null, right: null } }], expected: [1, 3] },
      { input: [null], expected: [] },
    ],
  },
  {
    id: 'raw-coding-very-hard-validate-bst-0038',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Validate Binary Search Tree)\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return true if the tree is a valid BST, otherwise false.',
    correctExplanation:
      'Validate with recursive lower/upper bounds or an inorder traversal that must be strictly increasing. Every node in the left subtree must be less than the node, and every node in the right subtree must be greater. Time O(n), Space O(h). Example: root 2 with children 1 and 3 is valid; root 5 with right child 4 and 4.left=3 is invalid because 3 appears in the right subtree of 5 but is less than 5.',
    tests: [
      { input: [{ val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }], expected: true },
      { input: [{ val: 5, left: { val: 1, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null }, right: { val: 6, left: null, right: null } } }], expected: false },
      { input: [{ val: 1, left: null, right: null }], expected: true },
    ],
  },
  {
    id: 'raw-coding-very-hard-lowest-common-ancestor-bst-0039',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Lowest Common Ancestor In BST)\n\nImplement `solve(input)` where `input = { root: TreeNode | null, p: number, q: number }` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. The tree is a valid BST and both values exist. Return the value of their lowest common ancestor.',
    correctExplanation:
      'Use the BST ordering property. If both targets are smaller than the current node, move left; if both are larger, move right; otherwise the current node is the split point and therefore the LCA. Time O(h), Space O(1).',
    tests: [
      { input: [{ root: { val: 6, left: { val: 2, left: { val: 0, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null }, right: { val: 5, left: null, right: null } } }, right: { val: 8, left: { val: 7, left: null, right: null }, right: { val: 9, left: null, right: null } } }, p: 2, q: 8 }], expected: 6 },
      { input: [{ root: { val: 6, left: { val: 2, left: { val: 0, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null }, right: { val: 5, left: null, right: null } } }, right: { val: 8, left: { val: 7, left: null, right: null }, right: { val: 9, left: null, right: null } } }, p: 2, q: 4 }], expected: 2 },
      { input: [{ root: { val: 2, left: { val: 1, left: null, right: null }, right: null }, p: 2, q: 1 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-very-hard-trie-implement-0040',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trie | Implement Trie Operations)\n\nImplement `solve(input)` where `input = { operations: { type: "insert" | "search" | "startsWith", word: string }[] }`. Return an array of booleans for every non-insert operation in order.',
    correctExplanation:
      'Build trie nodes with child links and an end-of-word flag. insert creates path nodes and marks the terminal node. search requires the full word path and terminal flag. startsWith only checks the prefix path. Time O(total characters), Space O(total characters). Example: insert apple, search app -> false, startsWith app -> true, search apple -> true.',
    tests: [
      { input: [{ operations: [{ type: 'insert', word: 'apple' }, { type: 'search', word: 'apple' }, { type: 'search', word: 'app' }, { type: 'startsWith', word: 'app' }, { type: 'insert', word: 'app' }, { type: 'search', word: 'app' }] }], expected: [true, false, true, true] },
      { input: [{ operations: [{ type: 'search', word: 'a' }, { type: 'startsWith', word: 'a' }] }], expected: [false, false] },
      { input: [{ operations: [{ type: 'insert', word: 'bat' }, { type: 'startsWith', word: 'ba' }, { type: 'search', word: 'bat' }] }], expected: [true, true] },
    ],
  },
  {
    id: 'raw-coding-very-hard-binary-tree-serialize-0041',
    difficulty: 'veryHard',
    prompt:
      'Raw Coding Challenge (Type: Trees | Serialize Binary Tree)\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }`. Return a normalized level-order serialization that trims trailing nulls but preserves interior nulls.',
    correctExplanation:
      'Traverse the provided tree object in level-order and emit values with interior null placeholders needed to preserve shape. Finally trim only trailing nulls. Time O(n), Space O(n). Example: root 1 with left 2 and right 3, and 3 having children 4 and 5 serializes to [1,2,3,null,null,4,5].',
    tests: [
      { input: [{ val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } } }], expected: [1, 2, 3, null, null, 4, 5] },
      { input: [{ val: 1, left: null, right: { val: 2, left: null, right: null } }], expected: [1, null, 2] },
      { input: [null], expected: [] },
    ],
  },
]

export default data
