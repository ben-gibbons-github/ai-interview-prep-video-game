import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ds-medium-lru-cache-3001',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (LRU Cache Simulation)\n\nScenario:\nYou are implementing an in-memory edge cache for profile fragments. Product requires strict LRU eviction semantics, and correctness is verified from an operation transcript.\n\nTask:\nImplement `solve(input)` where `input = { capacity: number, ops: { type: "put" | "get", key: number, value?: number }[] }`.\n\nRules:\n1. `put(key, value)` inserts or updates key and marks it most recently used.\n2. `get(key)` returns value if present, otherwise `-1`, and marks key most recently used when found.\n3. If insert exceeds capacity, evict least recently used key.\n\nReturn:\nAn array containing outputs for each `get` operation in order.\n\nHint:\nUse hashmap + doubly linked list for O(1) get/put.',
    correctExplanation:
      'Use a hash map for node lookup and a doubly linked list for recency ordering. Move hit/updated nodes to front, evict from tail when capacity exceeded. Time O(1) per op.',
    tests: [
      {
        input: [
          {
            capacity: 2,
            ops: [
              { type: 'put', key: 1, value: 1 },
              { type: 'put', key: 2, value: 2 },
              { type: 'get', key: 1 },
              { type: 'put', key: 3, value: 3 },
              { type: 'get', key: 2 },
              { type: 'put', key: 4, value: 4 },
              { type: 'get', key: 1 },
              { type: 'get', key: 3 },
              { type: 'get', key: 4 },
            ],
          },
        ],
        expected: [1, -1, -1, 3, 4],
      },
      {
        input: [
          {
            capacity: 1,
            ops: [
              { type: 'put', key: 1, value: 9 },
              { type: 'get', key: 1 },
              { type: 'put', key: 2, value: 8 },
              { type: 'get', key: 1 },
              { type: 'get', key: 2 },
            ],
          },
        ],
        expected: [9, -1, 8],
      },
    ],
  },
  {
    id: 'raw-coding-ds-medium-min-stack-3002',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (Min Stack Command Stream)\n\nScenario:\nA telemetry processor needs constant-time minimum tracking while values are pushed and popped under burst traffic.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "push", value: number } | { type: "pop" } | { type: "top" } | { type: "getMin" })[] }`.\n\nRules:\n- `pop` removes top if present.\n- `top` returns current top or `null` if empty.\n- `getMin` returns minimum value or `null` if empty.\n\nReturn:\nArray of outputs from `top` and `getMin` operations in order.\n\nHint:\nMaintain value stack plus min stack.',
    correctExplanation:
      'Track regular stack and another stack of current minima. Push min(prevMin, x), pop both stacks together. `top` and `getMin` are O(1).',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'push', value: -2 },
              { type: 'push', value: 0 },
              { type: 'push', value: -3 },
              { type: 'getMin' },
              { type: 'pop' },
              { type: 'top' },
              { type: 'getMin' },
            ],
          },
        ],
        expected: [-3, 0, -2],
      },
      {
        input: [
          {
            ops: [{ type: 'pop' }, { type: 'top' }, { type: 'getMin' }],
          },
        ],
        expected: [null, null],
      },
    ],
  },
  {
    id: 'raw-coding-ds-medium-trie-ops-3003',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (Trie Insert/Search/Prefix)\n\nScenario:\nAn autocomplete service needs to validate dictionary behavior from an offline operation log before shipping a new trie implementation.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "insert", word: string } | { type: "search", word: string } | { type: "startsWith", prefix: string })[] }`.\n\nRules:\n- `insert(word)` adds word.\n- `search(word)` is true only for full-word matches.\n- `startsWith(prefix)` is true for any inserted word with that prefix.\n\nReturn:\nArray of booleans for `search` and `startsWith` operations in order.\n\nHint:\nTrie node stores children and end-of-word marker.',
    correctExplanation:
      'Use trie nodes keyed by character and mark terminal words. Walk nodes for both search and prefix checks, requiring end marker only for full search.',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'insert', word: 'apple' },
              { type: 'search', word: 'apple' },
              { type: 'search', word: 'app' },
              { type: 'startsWith', prefix: 'app' },
              { type: 'insert', word: 'app' },
              { type: 'search', word: 'app' },
            ],
          },
        ],
        expected: [true, false, true, true],
      },
      {
        input: [
          {
            ops: [
              { type: 'search', word: 'z' },
              { type: 'startsWith', prefix: 'z' },
            ],
          },
        ],
        expected: [false, false],
      },
    ],
  },
  {
    id: 'raw-coding-ds-medium-merge-k-lists-3004',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (Merge K Sorted Lists as Arrays)\n\nScenario:\nA stream normalizer receives `k` individually sorted shards and must produce one globally sorted feed with stable numeric ordering.\n\nTask:\nImplement `solve(input)` where `input = number[][]`, each inner array already sorted ascending.\n\nReturn:\nA single sorted array containing all values from all lists.\n\nConstraints & Notes:\n- Empty lists are valid.\n- Total element count can be large; avoid repeated full re-sorts.\n\nHint:\nUse a min-heap keyed by current head values.',
    correctExplanation:
      'Push first element of each list into min-heap, repeatedly pop smallest and push next from same list. Time O(N log k), Space O(k).',
    tests: [
      {
        input: [[[1, 4, 5], [1, 3, 4], [2, 6]]],
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
      },
      {
        input: [[[], [0], [], [2, 2]]],
        expected: [0, 2, 2],
      },
    ],
  },
  {
    id: 'raw-coding-ds-medium-bst-iterator-3005',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (BST Iterator Simulation)\n\nScenario:\nA ranking service verifies in-order traversal behavior from recorded BST operations before migrating to a new iterator implementation.\n\nTask:\nImplement `solve(input)` where `input = { values: number[], ops: ("next" | "hasNext")[] }`.\n\nRules:\n- Build a BST by inserting `values` in given order.\n- Iterator should traverse in ascending order.\n- `hasNext` returns boolean.\n- `next` returns next smallest number, or `null` if exhausted.\n\nReturn:\nArray of outputs for every op in order.\n\nHint:\nUse stack of left spine nodes.',
    correctExplanation:
      'Build BST by ordered insert. Iterator keeps stack of left path; `next` pops node and pushes left path of right child. Amortized O(1) next.',
    tests: [
      {
        input: [
          {
            values: [7, 3, 15, 9, 20],
            ops: ['hasNext', 'next', 'next', 'hasNext', 'next', 'next', 'next', 'hasNext'],
          },
        ],
        expected: [true, 3, 7, true, 9, 15, 20, false],
      },
      {
        input: [
          {
            values: [],
            ops: ['hasNext', 'next'],
          },
        ],
        expected: [false, null],
      },
    ],
  },
  {
    id: 'raw-coding-ds-medium-top-k-frequent-3006',
    difficulty: 'medium',
    prompt:
      'Live coding Challenge (Top K Frequent Elements)\n\nScenario:\nA telemetry dashboard needs the most frequent error codes for alert summaries. In ties, output must be deterministic for snapshot tests.\n\nTask:\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\n\nReturn:\n`k` most frequent values sorted by:\n1) frequency descending,\n2) value ascending on ties.\n\nHint:\nCount with hashmap, then bucket/heap/select and finalize deterministic ordering.',
    correctExplanation:
      'Build frequency map, select top k by frequency, and sort selected values by (freq desc, value asc) for deterministic output.',
    tests: [
      {
        input: [{ nums: [1, 1, 1, 2, 2, 3], k: 2 }],
        expected: [1, 2],
      },
      {
        input: [{ nums: [4, 4, 1, 1, 2, 2], k: 2 }],
        expected: [1, 2],
      },
    ],
  },
]

export default data
