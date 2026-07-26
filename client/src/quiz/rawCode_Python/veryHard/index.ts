import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-python-veryhard-lru-cache-0001',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (LRU Cache Simulation)\n\nImplement `solve(input)` where `input = { capacity: int, operations: { op: "get" | "put", key: int, value?: int }[] }`. Simulate an LRU (Least Recently Used) cache with the given capacity. Return an array of results: -1 for get misses, the value for get hits, and null for puts.',
    correctExplanation:
      'Use a doubly-linked list and hash map together. The hash map provides O(1) lookup, and the linked list tracks access order. On get/put, move the node to the front (most recent). When capacity is exceeded, remove the back node (least recent). Time O(n) for n operations, Space O(capacity). This is a classic interview problem testing data structure design.',
    tests: [
      { input: [{ capacity: 2, operations: [{ op: 'put', key: 1, value: 1 }, { op: 'put', key: 2, value: 2 }, { op: 'get', key: 1 }, { op: 'put', key: 3, value: 3 }, { op: 'get', key: 2 }] }], expected: [null, null, 1, null, -1] },
      { input: [{ capacity: 1, operations: [{ op: 'put', key: 1, value: 1 }, { op: 'get', key: 1 }] }], expected: [null, 1] },
      { input: [{ capacity: 2, operations: [{ op: 'get', key: 1 }] }], expected: [-1] },
    ],
  },
  {
    id: 'raw-coding-python-veryhard-word-ladder-0002',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (Word Ladder)\n\nImplement `solve(input)` where `input = { beginWord: string, endWord: string, wordList: string[] }`. Return the number of words in the shortest transformation sequence from beginWord to endWord, where each transformation changes exactly one letter and the new word must be in wordList. Return 0 if no path exists.',
    correctExplanation:
      'Use BFS (breadth-first search) treating each word as a node. Build an adjacency list of words that differ by exactly one letter. BFS finds the shortest path. Time O(n * l^2 * 26) where n is list size and l is word length, Space O(n). Example: "hit" -> "hot" -> "dot" -> "dog" -> "log" has length 5.',
    tests: [
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'] }], expected: 5 },
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] }], expected: 0 },
      { input: [{ beginWord: 'a', endWord: 'c', wordList: ['a', 'b', 'c'] }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-python-veryhard-expression-eval-0003',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (Expression Evaluation)\n\nImplement `solve(input)` where `input = string` representing a mathematical expression with +, -, *, / operators and integers. Return the evaluated result, respecting operator precedence (* and / before + and -).',
    correctExplanation:
      'Parse the expression and handle operator precedence. One approach: use a stack. Iterate through tokens: for numbers, push to stack; for +/-, push the negated number; for */÷, pop, compute, and push back. Sum the stack at the end. Time O(n), Space O(n). Example: "2+3*4" returns 14 not 20.',
    tests: [
      { input: ['2+3*4'], expected: 14 },
      { input: ['6-2/2'], expected: 5 },
      { input: ['10'], expected: 10 },
    ],
  },
  {
    id: 'raw-coding-python-veryhard-longest-substring-0004',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (Longest Substring Without Repeating Characters)\n\nImplement `solve(input)` where `input = string`. Return the length of the longest substring without repeating characters.',
    correctExplanation:
      'Use a sliding window with a hash map tracking character positions. Expand the window by moving the right pointer. If a character repeats, move the left pointer past the previous occurrence. Track the maximum window size. Time O(n), Space O(k) where k is alphabet size. Example: "abcabcbb" returns 3 for "abc".',
    tests: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-python-veryhard-permutation-sequence-0005',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (Kth Permutation Sequence)\n\nImplement `solve(input)` where `input = { n: int, k: int }`. Return the kth permutation (1-indexed) of the digits 1 through n in lexicographic order.',
    correctExplanation:
      'Use a factorial number system. For each position, determine which number should go there based on k and factorials. Time O(n^2), Space O(n). Example: n=3, k=2 returns "132" (permutations: 123, 132, 213, 231, 312, 321).',
    tests: [
      { input: [{ n: 3, k: 3 }], expected: '213' },
      { input: [{ n: 4, k: 9 }], expected: '2314' },
      { input: [{ n: 1, k: 1 }], expected: '1' },
    ],
  },
  {
    id: 'raw-coding-python-veryhard-build-tree-0006',
    difficulty: 'veryHard',
    prompt:
      'Python Raw Coding (Build Binary Tree from Traversals)\n\nImplement `solve(input)` where `input = { inorder: int[], postorder: int[] }`. Return a representation of the binary tree built from inorder and postorder traversals.',
    correctExplanation:
      'The postorder last element is the root. Find it in inorder to split left and right subtrees. Recursively build left and right subtrees. Return a nested structure representing the tree. Time O(n^2) without hashing, O(n) with hash map, Space O(n). This tests understanding of tree reconstruction algorithms.',
    tests: [
      { input: [{ inorder: [9, 3, 15, 20, 7], postorder: [9, 15, 7, 20, 3] }], expected: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } } },
      { input: [{ inorder: [1], postorder: [1] }], expected: { val: 1, left: null, right: null } },
      { input: [{ inorder: [1, 2], postorder: [2, 1] }], expected: { val: 1, left: { val: 2, left: null, right: null }, right: null } },
    ],
  },
]

export default data
