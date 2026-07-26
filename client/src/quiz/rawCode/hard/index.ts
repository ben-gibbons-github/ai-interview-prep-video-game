import type { RawCodingQuestionData } from '../../RawCodeManager'

const baseData: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-hard-two-sum-0001',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Two Sum Indices)\\n\\nGiven an integer array `nums` and an integer `target`, find two distinct indices whose values sum to `target`.\\n\\nImplement `solve(input)` where `input = { nums: number[], target: number }`.\\n\\nReturn:\\n- `[i, j]` with `i < j` when such a pair exists.\\n- `[]` when no valid pair exists.\\n\\nNotes:\\n- Use array indices from the original array.\\n- Do not reuse the same element twice.\\n- Any one valid pair is acceptable.',
    correctExplanation:
      'Create a map {value: firstIndex}. For each element x at index i, compute complement = target - x. If complement exists in map with index j < i, return [j, i]. Otherwise, add x to map. Time O(n), Space O(n). Example: nums=[2,7,11,15], target=9 → see 2, complement=7 (not found), add {2:0}; see 7, complement=2 (found at 0) → return [0,1].'
,
    tests: [
      { input: [{ nums: [2, 7, 11, 15], target: 9 }], expected: [0, 1] },
      { input: [{ nums: [3, 2, 4], target: 6 }], expected: [1, 2] },
      { input: [{ nums: [1, 2, 3], target: 7 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-hard-valid-parentheses-0002',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Valid Parentheses)\\n\\nGiven a string containing only bracket characters `()[]{}`, determine whether the bracket sequence is valid.\\n\\nImplement `solve(input)` where `input` is a string.\\n\\nA sequence is valid if:\\n- Every opening bracket has a matching closing bracket of the same type.\\n- Brackets close in the correct order.\\n- No closing bracket appears before its matching opener.\\n\\nReturn `true` if valid; otherwise return `false`.',
    correctExplanation:
      'Use a stack. Iterate through string: on opening bracket (,[ { push to stack; on closing bracket ), ] }, pop stack and check match. If mismatch or empty stack, return false. If loop ends with empty stack, return true. Time O(n), Space O(n). Example: "()[]{}" → push(, pop match ), push[, pop match ], push{, pop match } → stack empty → true.'
,
    tests: [
      { input: ['()[]{}'], expected: true },
      { input: ['([{}])'], expected: true },
      { input: ['(]'], expected: false },
    ],
  },
  {
    id: 'raw-coding-hard-binary-search-first-index-0003',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Search First Index)\\n\\nGiven a sorted (ascending) integer array `nums`, return the first index where `target` appears.\\n\\nImplement `solve(input)` where `input = { nums: number[], target: number }`.\\n\\nReturn:\\n- The leftmost index of `target` if found.\\n- `-1` if `target` does not exist in `nums`.\\n\\nNotes:\\n- `nums` may contain duplicates.\\n- Target runtime should be `O(log n)`.',
    correctExplanation:
      'Standard binary search but on finding target at mid, do NOT return; instead, move right = mid - 1 to continue searching left for earlier occurrence. If target not found at mid, use standard bounds logic. Time O(log n), Space O(1). Example: nums=[1,2,2,2,3], target=2 → binary search: left=1,mid=2 finds 2, set right=0 (search left); continue until finding first 2 at index 1.'
,
    tests: [
      { input: [{ nums: [1, 2, 2, 2, 3], target: 2 }], expected: 1 },
      { input: [{ nums: [1, 3, 5], target: 4 }], expected: -1 },
      { input: [{ nums: [], target: 10 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-hard-top-k-frequent-0004',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Top K Frequent Elements)\\n\\nGiven an integer array `nums` and an integer `k`, return the `k` most frequent values.\\n\\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\\n\\nReturn:\\n- An array of length `k`.\\n- Sort by frequency descending.\\n- If two values have the same frequency, sort those tied values ascending by numeric value.',
    correctExplanation:
      'Count each value\'s frequency using a map. Create pairs of [count, value]. Sort by count descending, then value ascending. Return the values from the first k pairs. Time O(n + m log m) where m is unique values, Space O(m). Example: nums=[1,1,1,2,2,3], k=2 → freq: {1:3, 2:2, 3:1} → sort by count desc: [[3,1],[2,2],[1,3]] → take first 2 values → [1,2].'
,
    tests: [
      { input: [{ nums: [1, 1, 1, 2, 2, 3], k: 2 }], expected: [1, 2] },
      { input: [{ nums: [4, 4, 5, 5, 6], k: 2 }], expected: [4, 5] },
      { input: [{ nums: [7], k: 1 }], expected: [7] },
    ],
  },
  {
    id: 'raw-coding-hard-level-order-traversal-0005',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Tree Level Order)\\n\\nYou are given a binary tree encoded as a level-order array, where missing children are represented by `null`.\\n\\nImplement `solve(input)` where `input` is that array representation.\\n\\nReturn:\\n- A `number[][]` where each inner array contains node values at one depth level from left to right.\\n\\nNotes:\\n- Ignore `null` entries as nodes.\\n- If the tree is empty, return `[]`.',
    correctExplanation:
      'Use BFS with level tracking. Start with root at index 0 in a queue, also track depth. Process level-by-level: for each node at index i, children are at 2*i+1 (left) and 2*i+2 (right), skip if null. Group visited nodes by depth. Time O(n), Space O(w) where w is max width. Example: array [3,9,20,null,null,15,7] → level 0: [3]; level 1: [9,20]; level 2: [15,7].'
,
    tests: [
      { input: [[[3, 9, 20, null, null, 15, 7]]], expected: [[3], [9, 20], [15, 7]] },
      { input: [[[1]]], expected: [[1]] },
      { input: [[[1, null, 2, 3]]], expected: [[1], [2], [3]] },
    ],
  },
  {
    id: 'raw-coding-hard-minimum-path-sum-0006',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Minimum Path Sum Grid)\\n\\nGiven a 2D grid of non-negative integers, find a path from top-left to bottom-right with minimum possible sum.\\n\\nImplement `solve(input)` where `input` is `number[][]`.\\n\\nRules:\\n- You may only move right or down at each step.\\n- Include both start and end cells in the total.\\n\\nReturn the minimum path sum.',
    correctExplanation:
      'Create DP table where dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize first row and column with cumulative sums. Time O(m*n), Space O(m*n). Example: [[1,3,1],[1,5,1],[4,2,1]] → dp[0][0]=1, dp[0][1]=1+3=4, dp[1][0]=1+1=2, dp[1][1]=5+min(4,2)=7, ...final=7.'
,
    tests: [
      { input: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7 },
      { input: [[[1, 2, 3], [4, 5, 6]]], expected: 12 },
      { input: [[[5]]], expected: 5 },
    ],
  },
  {
    id: 'raw-coding-hard-decode-string-0007',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Decode String)\\n\\nGiven an encoded string, decode it using the rule `k[encoded_string]`, where the bracketed substring repeats exactly `k` times.\\n\\nImplement `solve(input)` where `input` is a string.\\n\\nExamples of encoding:\\n- `3[a]` -> `aaa`\\n- `2[ab3[c]]` -> `abcccabccc`\\n\\nReturn the fully decoded string.\\n\\nNotes:\\n- Input is valid and brackets are well-formed.\\n- Repeat counts may have multiple digits.',
    correctExplanation:
      'Use two stacks: numStack for numbers, opStack for operators. When encountering "[", push 1 and "*" (multiplicative identity). When encountering "]", pop and apply operations. When encountering digits, form full number. Time O(n), Space O(n). Example: "3[a]2[bc]" → process 3, [, a, ] (repeats a 3 times → "aaa"), then 2,[, bc, ] (repeats bc 2 times → "bcbc") → "aaabcbc".'
,
    tests: [
      { input: ['3[a]2[bc]'], expected: 'aaabcbc' },
      { input: ['3[a2[c]]'], expected: 'accaccacc' },
      { input: ['2[abc]3[cd]ef'], expected: 'abcabccdcdcdef' },
    ],
  },
  {
    id: 'raw-coding-hard-daily-temperatures-0008',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Daily Temperatures)\\n\\nGiven an array `temperatures`, compute for each day how many days you must wait to encounter a strictly warmer temperature.\\n\\nImplement `solve(input)` where `input` is `number[]`.\\n\\nReturn:\\n- An array `answer` of the same length.\\n- `answer[i]` is the number of days until a warmer day after day `i`.\\n- If no warmer day exists, `answer[i] = 0`.',
    correctExplanation:
      'Use a monotonic decreasing stack storing indices. For each temp, pop all indices with temps lower than current (record days), then push current index. Remaining unpoped indices have no warmer day (result=0). Time O(n), Space O(n). Example: temps=[73,74,75,71,...] → push 73(idx=0); 74>73 pop (days=1-0=1), push 74; 75>74 pop (days=2-1=1), push 75; ...'
,
    tests: [
      { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { input: [[30, 30, 30]], expected: [0, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-hard-evaluate-rpn-0009',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Evaluate Reverse Polish Notation)\\n\\nEvaluate an arithmetic expression provided in Reverse Polish Notation (postfix form).\\n\\nImplement `solve(input)` where `input` is `string[]` tokens.\\n\\nRules:\\n- Valid operators are `+`, `-`, `*`, `/`.\\n- Operands are integer strings (possibly negative).\\n- Division truncates toward zero.\\n\\nReturn the final integer result.',
    correctExplanation:
      'Use a stack. Push operands, pop two and apply operation on operators (+,-,*,/). Push result back. Division truncates toward zero. Time O(n), Space O(n). Example: ["2","1","+","3","*"] → push 2, push 1, pop 2,1 compute 1+2=3 push 3, push 3, pop 3,3 compute 3*3=9, return 9.'
,
    tests: [
      { input: [['2', '1', '+', '3', '*']], expected: 9 },
      { input: [['4', '13', '5', '/', '+']], expected: 6 },
      { input: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expected: 22 },
    ],
  },
  {
    id: 'raw-coding-hard-search-rotated-array-0010',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Search In Rotated Sorted Array)\\n\\nAn array sorted in ascending order was rotated at an unknown pivot. Given that rotated array and a target value, find the target index.\\n\\nImplement `solve(input)` where `input = { nums: number[], target: number }`.\\n\\nReturn:\\n- Index of `target` if present.\\n- `-1` if `target` is not present.\\n\\nNotes:\\n- All values are distinct.\\n- Target runtime should be `O(log n)`.',
    correctExplanation:
      'Modified binary search: at each mid, determine which half is sorted (compare nums[left] and nums[mid]). Check if target is in sorted half; if yes, search there, else search other half. Time O(log n), Space O(1). Example: nums=[4,5,6,7,0,1,2], target=0 → left half [4,5,6,7] is sorted, target not in it → search right half [0,1,2] → find at index 4.'
,
    tests: [
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }], expected: 4 },
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }], expected: -1 },
      { input: [{ nums: [1], target: 0 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-hard-container-most-water-0011',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Container With Most Water)\\n\\nYou are given an array `height` where each element represents a vertical line at that index.\\n\\nImplement `solve(input)` where `input` is `number[]`.\\n\\nChoose two lines `i` and `j` (`i < j`) to form a container with the x-axis.\\nThe area is `min(height[i], height[j]) * (j - i)`.\\n\\nReturn the maximum possible area.',
    correctExplanation:
      'Two pointers from both ends. Area = min(height[left], height[right]) * (right - left). Move the shorter side inward to explore potentially taller containers. Track max area. Time O(n), Space O(1). Example: heights=[1,8,6,2,5,4,8,3,7] → left=0(h=1), right=8(h=7) → area=1*8=8; move left (shorter); eventually find max=8*7=56 at indices 1,8.'
,
    tests: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17 },
    ],
  },
  {
    id: 'raw-coding-hard-bfs-shortest-path-binary-matrix-0012',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (BFS Shortest Path in Binary Matrix)\\n\\nGiven an `n x n` binary matrix where `0` means open cell and `1` means blocked cell, find the shortest clear path from top-left to bottom-right.\\n\\nImplement `solve(input)` where `input` is `number[][]`.\\n\\nPath rules:\\n- Start at `(0, 0)` and end at `(n-1, n-1)`.\\n- You may move to any of the 8 neighboring cells (including diagonals).\\n- Path length is measured as number of cells in the path.\\n\\nReturn:\\n- Shortest path length if reachable.\\n- `-1` if no valid path exists.',
    correctExplanation:
      'Run BFS from (0,0) if both endpoints are open. Push neighbors in 8 directions and track visited. BFS guarantees the first reach of bottom-right is minimum path length in an unweighted grid. Time O(m*n), Space O(m*n). Example: [[0,1],[1,0]] can go diagonally in length 2.'
,
    tests: [
      { input: [[[0, 1], [1, 0]]], expected: 2 },
      { input: [[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], expected: 4 },
      { input: [[[1, 0], [0, 0]]], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-hard-dfs-all-paths-source-target-0013',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (DFS All Paths From Source To Target)\\n\\nGiven a directed acyclic graph (DAG) in adjacency-list form, enumerate every path from node `0` to node `n-1`.\\n\\nImplement `solve(input)` where `input` is `number[][]` and `input[u]` lists all neighbors of node `u`.\\n\\nReturn:\\n- `number[][]` containing all valid paths.\\n- Each path should list node ids from source to target in visit order.',
    correctExplanation:
      'Use DFS backtracking from node 0, carrying the current path. When reaching node n-1, copy the path into results. Backtrack to explore other branches. Time O(total paths * average path length), Space O(path length + output). Example: [[1,2],[3],[3],[]] returns [[0,1,3],[0,2,3]].'
,
    tests: [
      { input: [[[1, 2], [3], [3], []]], expected: [[0, 1, 3], [0, 2, 3]] },
      { input: [[[4, 3, 1], [3, 2, 4], [3], [4], []]], expected: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]] },
      { input: [[[1], [2], [3], []]], expected: [[0, 1, 2, 3]] },
    ],
  },
  {
    id: 'raw-coding-hard-kth-largest-element-0014',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (Kth Largest Element)\\n\\nGiven an unsorted integer array `nums` and integer `k`, return the `k`th largest element by sorted order (not the `k`th distinct value).\\n\\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\\n\\nReturn a single number: the `k`th largest value in `nums`.',
    correctExplanation:
      'Maintain a min-heap of size k. Push each number and pop when size exceeds k. Heap root is kth largest. Time O(n log k), Space O(k).'
,
    tests: [
      { input: [{ nums: [3, 2, 1, 5, 6, 4], k: 2 }], expected: 5 },
      { input: [{ nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }], expected: 4 },
      { input: [{ nums: [1], k: 1 }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-hard-house-robber-0015',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (House Robber)\\n\\nA robber wants to steal from houses arranged in a line. Each house has a non-negative value, but adjacent houses cannot both be robbed in the same night.\\n\\nImplement `solve(input)` where `input` is `number[]`.\\n\\nReturn the maximum total amount that can be robbed without robbing adjacent houses.',
    correctExplanation:
      'DP with rolling states: at each house decide rob (prev2 + value) or skip (prev1). Keep max. Time O(n), Space O(1).'
,
    tests: [
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[2, 7, 9, 3, 1]], expected: 12 },
      { input: [[2]], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-hard-course-schedule-ii-0016',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (Course Schedule II)\\n\\nThere are `numCourses` labeled `0..numCourses-1`. Each prerequisite pair `[a, b]` means you must complete course `b` before course `a`.\\n\\nImplement `solve(input)` where `input = { numCourses: number, prerequisites: number[][] }`.\\n\\nReturn:\\n- Any valid ordering of all courses that satisfies prerequisites.\\n- `[]` if it is impossible to finish all courses (cycle exists).',
    correctExplanation:
      'Use Kahn topological sort with indegrees. Push zero-indegree courses into queue and build order while removing edges. If order length < numCourses, cycle exists -> [].'
,
    tests: [
      { input: [{ numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2]] }], expected: [0, 1, 2, 3] },
      { input: [{ numCourses: 2, prerequisites: [[1, 0], [0, 1]] }], expected: [] },
      { input: [{ numCourses: 1, prerequisites: [] }], expected: [0] },
    ],
  },
  {
    id: 'raw-coding-hard-word-break-0017',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (Word Break)\\n\\nGiven a string `s` and a dictionary `wordDict`, determine whether `s` can be segmented into one or more dictionary words.\\n\\nImplement `solve(input)` where `input = { s: string, wordDict: string[] }`.\\n\\nReturn `true` if a full segmentation exists; otherwise return `false`.\\n\\nNotes:\\n- Dictionary words may be reused multiple times.\\n- Match contiguous substrings only.',
    correctExplanation:
      'Use DP over prefix length. dp[i] true if exists j < i with dp[j] true and s[j..i) in dictionary set. Time O(n^2), Space O(n).'
,
    tests: [
      { input: [{ s: 'LiveCode', wordDict: ['leet', 'code'] }], expected: true },
      { input: [{ s: 'applepenapple', wordDict: ['apple', 'pen'] }], expected: true },
      { input: [{ s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] }], expected: false },
    ],
  },
  {
    id: 'raw-coding-hard-min-window-substring-length-0018',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (Minimum Window Substring Length)\\n\\nGiven strings `s` and `t`, find the smallest window in `s` that contains every character from `t`, including multiplicity.\\n\\nImplement `solve(input)` where `input = { s: string, t: string }`.\\n\\nReturn:\\n- The length of the minimum valid window.\\n- `0` if no substring of `s` can satisfy all required characters from `t`.',
    correctExplanation:
      'Sliding window with frequency maps. Expand right to satisfy all required counts, then shrink left greedily while valid to minimize length. Time O(|s|+|t|).'
,
    tests: [
      { input: [{ s: 'ADOBECODEBANC', t: 'ABC' }], expected: 4 },
      { input: [{ s: 'a', t: 'a' }], expected: 1 },
      { input: [{ s: 'a', t: 'aa' }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-hard-number-of-islands-0019',
    difficulty: 'hard',
    prompt:
      'Raw Coding LiveCode Pattern (Number of Islands)\\n\\nGiven a 2D grid of `"1"` (land) and `"0"` (water), count how many disconnected islands exist.\\n\\nImplement `solve(input)` where `input` is `string[][]`.\\n\\nIsland rules:\\n- Land cells connect only in 4 directions (up, down, left, right).\\n- Grid edges are bounded by water.\\n\\nReturn the total number of islands.',
    correctExplanation:
      'Scan grid; when an unvisited land cell is found, DFS/BFS flood-fill all connected land (4-directional) and increment island count. Time O(m*n), Space O(m*n).'
,
    tests: [
      { input: [[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']]], expected: 3 },
      { input: [[['1', '1', '1'], ['0', '1', '0'], ['1', '1', '1']]], expected: 1 },
      { input: [[['0', '0'], ['0', '0']]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-hard-binary-tree-maximum-depth-0020',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Tree Maximum Depth)\n\nGiven a binary tree in level-order array form with `null` placeholders, return the maximum depth of the tree.',
    correctExplanation:
      'Use BFS or DFS. Count the number of levels on a breadth-first traversal, or recursively return 1 + max(depth(left), depth(right)). Time O(n), Space O(h) for DFS or O(n) for BFS. Example: [3,9,20,null,null,15,7] has depth 3.',
    tests: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { input: [[1, null, 2]], expected: 2 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-hard-binary-tree-same-tree-0021',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Tree Same Tree)\n\nGiven two binary trees in level-order array form with `null` placeholders, return `true` if they are structurally identical and have the same values.',
    correctExplanation:
      'Recursively compare corresponding nodes. If both are null, they match. If only one is null or values differ, return false. Otherwise compare left children and right children. Time O(n), Space O(h).',
    tests: [
      { input: [[1, 2, 3], [1, 2, 3]], expected: true },
      { input: [[1, 2], [1, null, 2]], expected: false },
      { input: [[], []], expected: true },
    ],
  },
  {
    id: 'raw-coding-hard-binary-tree-zigzag-level-order-0022',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Tree Zigzag Level Order)\n\nGiven a binary tree in level-order array form with `null` placeholders, return values level by level, alternating left-to-right and right-to-left order on each row.',
    correctExplanation:
      'Do a breadth-first traversal one level at a time. For even levels, append node values left to right; for odd levels, append them in reverse order. Time O(n), Space O(n).',
    tests: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [20, 9], [15, 7]] },
      { input: [[1]], expected: [[1]] },
      { input: [[]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-hard-path-sum-ii-0023',
    difficulty: 'hard',
    prompt:
      'Raw Coding Challenge (Binary Tree Path Sum II)\n\nGiven a binary tree in level-order array form with `null` placeholders and a target sum, return all root-to-leaf paths whose values sum to the target.',
    correctExplanation:
      'Use DFS backtracking. Carry the running sum and current path. When a leaf is reached, compare the total to the target and copy the path if it matches. Time O(n + output), Space O(h).',
    tests: [
      { input: [{ tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], target: 22 }], expected: [[5, 4, 11, 2], [5, 8, 4, 5]] },
      { input: [{ tree: [1, 2, 3], target: 5 }], expected: [] },
      { input: [{ tree: [1], target: 1 }], expected: [[1]] },
    ],
  },
]

const PROMPT_EXPANSIONS: Record<string, string> = {
  'raw-coding-hard-two-sum-0001':
    'Scenario:\nYou are implementing a lookup helper for a transaction system where each value is an amount and you must find one matching pair quickly without brute force.\n\nInput/Output Details:\n- `nums` may include negatives, zeros, duplicates, and large values.\n- Return indices (not values), and preserve original indexing.\n- If multiple valid pairs exist, returning any single valid pair is acceptable.\n\nEdge Cases To Handle:\n- Arrays with fewer than 2 elements.\n- Repeated values where the complement equals the current number (must use distinct indices).\n- No-solution inputs should return `[]` exactly.',
  'raw-coding-hard-valid-parentheses-0002':
    'Scenario:\nThis models a parser pre-check step where malformed bracket order should fail fast before expensive compilation logic runs.\n\nInput/Output Details:\n- Input contains only bracket tokens from `()[]{}`.\n- A valid sequence must be fully matched and properly nested.\n- Return a boolean only (`true` / `false`).\n\nEdge Cases To Handle:\n- Empty string should be considered valid.\n- Early closing bracket with no opener should fail immediately.\n- Leftover openers after processing entire string should fail.',
  'raw-coding-hard-binary-search-first-index-0003':
    'Scenario:\nYou are querying a sorted event index where duplicate timestamps exist and downstream logic must anchor to the first occurrence.\n\nInput/Output Details:\n- Input array is sorted ascending and may contain duplicates.\n- Return the leftmost matching index when target exists.\n- Return `-1` when not found.\n\nEdge Cases To Handle:\n- Empty array.\n- Target at index `0` or at the final position.\n- All elements equal to target (must still return first index).',
  'raw-coding-hard-top-k-frequent-0004':
    'Scenario:\nYou are producing a ranked analytics panel where frequency determines ordering and deterministic tie-breaking is required for stable UI snapshots.\n\nInput/Output Details:\n- `k` is expected to be within the number of unique values.\n- Sort by frequency descending.\n- For equal frequency, sort by numeric value ascending.\n\nEdge Cases To Handle:\n- All values unique.\n- All values identical.\n- Mixed negative and positive values with ties.',
  'raw-coding-hard-level-order-traversal-0005':
    'Scenario:\nYou are converting compact persisted tree data into level-grouped output for a visualization component that renders one row per depth.\n\nInput/Output Details:\n- Input is a level-order array with `null` placeholders for missing children.\n- Treat only non-null entries as actual nodes.\n- Return `number[][]` grouped by depth, left to right.\n\nEdge Cases To Handle:\n- Empty input array.\n- Sparse trees with many null gaps.\n- Single-node tree.',
  'raw-coding-hard-minimum-path-sum-0006':
    'Scenario:\nThis represents a route-planning pass where each grid cell is traversal cost and you need the cheapest valid path under movement constraints.\n\nInput/Output Details:\n- Grid contains non-negative integers.\n- Only moves to the right or down are allowed.\n- Include start and end cell costs in the total sum.\n\nEdge Cases To Handle:\n- 1x1 grid.\n- Single-row or single-column grids.\n- Large values where greedy local choice alone can fail.',
  'raw-coding-hard-decode-string-0007':
    'Scenario:\nYou are decoding compressed payload fragments where nested repeat groups can appear and counts may span multiple digits.\n\nInput/Output Details:\n- Encoding rule is `k[segment]` and segments may nest.\n- Input is guaranteed well-formed.\n- Return the fully expanded string.\n\nEdge Cases To Handle:\n- Deep nesting like `2[a3[b2[c]]]`.\n- Multi-digit repeats like `12[a]`.\n- Mixed literal text before/after bracket groups.',
  'raw-coding-hard-daily-temperatures-0008':
    'Scenario:\nYou are generating a forward-looking weather wait metric where each day needs the offset to the next strictly warmer reading.\n\nInput/Output Details:\n- Output length must exactly match input length.\n- Use strictly warmer (`>`), not warmer-or-equal.\n- Days with no future warmer reading must map to `0`.\n\nEdge Cases To Handle:\n- Monotonic decreasing temperatures.\n- Flat plateaus with equal values.\n- Immediate next-day warmer transitions.',
  'raw-coding-hard-evaluate-rpn-0009':
    'Scenario:\nThis emulates an expression executor in a stack-based VM where operators consume prior operands in postfix order.\n\nInput/Output Details:\n- Tokens are integers or one of `+ - * /`.\n- Division truncates toward zero.\n- Return the final integer result after full evaluation.\n\nEdge Cases To Handle:\n- Negative operands and negative intermediate values.\n- Long token chains with many operations.\n- Correct operand order for subtraction/division (`a op b`).',
  'raw-coding-hard-search-rotated-array-0010':
    'Scenario:\nYou are querying a rotated time-series shard where one sorted run wraps around; the lookup still needs logarithmic behavior.\n\nInput/Output Details:\n- Values are distinct and originally sorted ascending before rotation.\n- Return index of target if present, otherwise `-1`.\n- Aim for `O(log n)` search.\n\nEdge Cases To Handle:\n- Array not rotated at all.\n- Very small arrays (size 0 or 1).\n- Target located near pivot boundary.',
  'raw-coding-hard-container-most-water-0011':
    'Scenario:\nYou are estimating maximum containment capacity between vertical supports in a simulation where width and limiting height both matter.\n\nInput/Output Details:\n- Choose any two indices `i < j`.\n- Area is `min(height[i], height[j]) * (j - i)`.\n- Return only the maximum area value.\n\nEdge Cases To Handle:\n- Minimum-size arrays with 2 elements.\n- High bars separated by long distances.\n- Cases where moving the taller pointer is suboptimal.',
  'raw-coding-hard-bfs-shortest-path-binary-matrix-0012':
    'Scenario:\nYou are pathfinding on an occupancy grid where diagonal movement is allowed and each move has equal cost.\n\nInput/Output Details:\n- `0` means traversable, `1` means blocked.\n- Movement allowed in 8 directions.\n- Return shortest path length in number of visited cells, else `-1`.\n\nEdge Cases To Handle:\n- Blocked start or blocked destination.\n- Tiny grids (1x1).\n- Multiple possible routes where BFS must find the shortest.',
  'raw-coding-hard-dfs-all-paths-source-target-0013':
    'Scenario:\nThis is a DAG workflow explorer where you must enumerate every valid execution route from source to terminal node.\n\nInput/Output Details:\n- Graph is adjacency-list form.\n- Start node is always `0`; destination is `n-1`.\n- Return all full paths as arrays of node ids.\n\nEdge Cases To Handle:\n- Single straight path.\n- Many branches converging on target.\n- Ensure path copies are independent during backtracking.',
  'raw-coding-hard-kth-largest-element-0014':
    'Scenario:\nYou are maintaining a leaderboard cutoff where duplicates count as separate entries and only the kth rank threshold is needed.\n\nInput/Output Details:\n- `k` is 1-indexed by descending order.\n- Duplicates are not removed.\n- Return one number: the kth largest value.\n\nEdge Cases To Handle:\n- `k = 1` (maximum element).\n- `k = nums.length` (minimum element).\n- Heavy duplication around the kth boundary.',
  'raw-coding-hard-house-robber-0015':
    'Scenario:\nYou are optimizing theft planning under adjacency alarms: robbing neighboring houses in one run triggers detection.\n\nInput/Output Details:\n- Values are non-negative integers.\n- You may rob any subset with no adjacent indices.\n- Return the maximum achievable sum.\n\nEdge Cases To Handle:\n- Single house input.\n- Alternating high/low values.\n- Cases where skipping a large immediate value yields better global total.',
  'raw-coding-hard-course-schedule-ii-0016':
    'Scenario:\nYou are constructing an academic planning sequence from prerequisite constraints and must either produce a valid order or detect impossibility.\n\nInput/Output Details:\n- Courses are labeled `0..numCourses-1`.\n- Pair `[a, b]` means `b` must come before `a`.\n- Return any valid full ordering, or `[]` if a cycle prevents completion.\n\nEdge Cases To Handle:\n- No prerequisites at all.\n- Disconnected prerequisite components.\n- Cycles of length 2 or larger.',
  'raw-coding-hard-word-break-0017':
    'Scenario:\nThis models tokenization feasibility: determine whether an input string can be fully decomposed into approved dictionary fragments.\n\nInput/Output Details:\n- Dictionary entries can be reused unlimited times.\n- Segmentation must cover the entire string contiguously.\n- Return boolean feasibility only.\n\nEdge Cases To Handle:\n- Repeated word reuse (e.g. multiple same tokens).\n- Prefix overlaps that require trying alternate splits.\n- Strings that almost segment but fail near the end.',
  'raw-coding-hard-min-window-substring-length-0018':
    'Scenario:\nYou are finding the shortest log segment containing all required marker characters with multiplicity for diagnostics extraction.\n\nInput/Output Details:\n- Window must include every character in `t` with at least required counts.\n- Return only the minimum valid window length.\n- Return `0` when impossible.\n\nEdge Cases To Handle:\n- `t` longer than `s`.\n- Repeated required characters in `t` (e.g. `AABC`).\n- Multiple valid windows where only smallest length matters.',
  'raw-coding-hard-number-of-islands-0019':
    'Scenario:\nYou are counting independent land masses in a map service where each component of connected land cells should be reported once.\n\nInput/Output Details:\n- Grid values are strings: `"1"` for land and `"0"` for water.\n- Connectivity is 4-directional only (no diagonal merging).\n- Return total island count as a number.\n\nEdge Cases To Handle:\n- All water / all land grids.\n- Thin snake-like islands.\n- Multiple islands touching diagonally only (must remain separate).',
}

const data: RawCodingQuestionData[] = baseData.map((question) => ({
  ...question,
  prompt: `${question.prompt}\n\n${PROMPT_EXPANSIONS[question.id] ?? ''}`,
}))

export default data
