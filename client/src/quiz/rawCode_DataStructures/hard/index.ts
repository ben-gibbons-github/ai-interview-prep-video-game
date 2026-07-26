import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ds-hard-allone-3101',
    difficulty: 'hard',
    prompt:
      'Live coding Challenge (All O(1) Data Structure Simulation)\n\nScenario:\nA feature-flag analytics service tracks key frequencies and must support constant-time increment/decrement and constant-time retrieval of any max/min-frequency key. Validation runs from an operation transcript.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "inc", key: string } | { type: "dec", key: string } | { type: "getMaxKey" } | { type: "getMinKey" })[] }`.\n\nRules:\n- `inc(key)`: increase count by 1; insert key if absent.\n- `dec(key)`: decrease count by 1; remove key when count hits 0.\n- `getMaxKey()`: return any key with maximal count, or empty string if none.\n- `getMinKey()`: return any key with minimal count, or empty string if none.\n\nDeterministic Requirement for This Challenge:\nWhen multiple keys tie for max/min, return lexicographically smallest among the tied keys.\n\nReturn:\nArray of outputs for `getMaxKey` and `getMinKey` operations in order.\n\nHint:\nUse doubly linked count buckets + key-to-bucket map.',
    correctExplanation:
      'Maintain ordered count buckets with key sets and a key->bucket map. Move keys between adjacent buckets on inc/dec, removing empty buckets. Max/min from tail/head.',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'inc', key: 'hello' },
              { type: 'inc', key: 'world' },
              { type: 'inc', key: 'hello' },
              { type: 'getMaxKey' },
              { type: 'getMinKey' },
              { type: 'dec', key: 'hello' },
              { type: 'getMaxKey' },
              { type: 'getMinKey' },
            ],
          },
        ],
        expected: ['hello', 'world', 'hello', 'hello'],
      },
      {
        input: [
          {
            ops: [
              { type: 'getMaxKey' },
              { type: 'getMinKey' },
              { type: 'inc', key: 'a' },
              { type: 'dec', key: 'a' },
              { type: 'getMaxKey' },
              { type: 'getMinKey' },
            ],
          },
        ],
        expected: ['', '', '', ''],
      },
    ],
  },
  {
    id: 'raw-coding-ds-hard-design-skiplist-3102',
    difficulty: 'hard',
    prompt:
      'Live coding Challenge (Skiplist Command Processor)\n\nScenario:\nA storage index team wants skiplist-like semantics under deterministic test mode. You need to process mixed add/search/erase operations and report query outcomes.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "add", value: number } | { type: "search", value: number } | { type: "erase", value: number })[] }`.\n\nBehavior:\n- `add(v)`: insert one occurrence of `v`.\n- `search(v)`: true if at least one occurrence exists.\n- `erase(v)`: remove one occurrence if present, returning true/false success.\n\nReturn:\nArray of outputs for `search` and `erase` operations in order.\n\nNote:\nImplementation does not need probabilistic levels for this grader; correctness of multiset semantics is required.\n\nHint:\nBalanced ordered map/multiset behavior is enough for these tests.',
    correctExplanation:
      'Maintain counts in ordered structure (or hash + aux order as needed). `search` checks count>0, `erase` decrements/removes one occurrence and reports success.',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'add', value: 1 },
              { type: 'add', value: 2 },
              { type: 'add', value: 2 },
              { type: 'search', value: 2 },
              { type: 'erase', value: 2 },
              { type: 'search', value: 2 },
              { type: 'erase', value: 2 },
              { type: 'search', value: 2 },
            ],
          },
        ],
        expected: [true, true, true, true, false],
      },
      {
        input: [
          {
            ops: [
              { type: 'search', value: 7 },
              { type: 'erase', value: 7 },
            ],
          },
        ],
        expected: [false, false],
      },
    ],
  },
  {
    id: 'raw-coding-ds-hard-trie-word-dictionary-3103',
    difficulty: 'hard',
    prompt:
      'Live coding Challenge (Word Dictionary With Wildcards)\n\nScenario:\nAn abuse-detection rule engine stores blocked terms and supports wildcard lookups where `.` matches any single character. Query throughput is high and repeated lookups are common.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "addWord", word: string } | { type: "search", pattern: string })[] }`.\n\nBehavior:\n- `addWord(word)`: add word to dictionary.\n- `search(pattern)`: return true if any added word matches pattern where `.` is wildcard for exactly one character.\n\nReturn:\nArray of booleans for each `search` operation in order.\n\nHint:\nTrie + DFS/stack branch on wildcard nodes.',
    correctExplanation:
      'Store words in trie; for search, traverse deterministically and branch on `.` by exploring all children at that depth. Full match requires terminal node.',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'addWord', word: 'bad' },
              { type: 'addWord', word: 'dad' },
              { type: 'addWord', word: 'mad' },
              { type: 'search', pattern: 'pad' },
              { type: 'search', pattern: 'bad' },
              { type: 'search', pattern: '.ad' },
              { type: 'search', pattern: 'b..' },
            ],
          },
        ],
        expected: [false, true, true, true],
      },
      {
        input: [
          {
            ops: [
              { type: 'addWord', word: 'a' },
              { type: 'search', pattern: '.' },
              { type: 'search', pattern: 'aa' },
            ],
          },
        ],
        expected: [true, false],
      },
    ],
  },
  {
    id: 'raw-coding-ds-hard-serialize-deserialize-bst-3104',
    difficulty: 'hard',
    prompt:
      'Live coding Challenge (Serialize/Deserialize BST)\n\nScenario:\nA state-sync service snapshots BST-based ranking trees and must restore them exactly during failover. You are given insertion-order values for a BST, and must validate round-trip codec behavior.\n\nTask:\nImplement `solve(input)` where `input = number[]` (insertion order into a BST).\n\nRequired Steps:\n1. Build BST by inserting values in given order.\n2. Serialize BST to a string format of your choice.\n3. Deserialize back to BST.\n4. Return inorder traversal of restored BST.\n\nReturn:\nInorder traversal array of the deserialized tree.\n\nHint:\nPreorder with bounds is a common BST codec strategy.',
    correctExplanation:
      'Any lossless BST codec is valid. Build original BST, serialize, deserialize, then inorder traversal should be sorted multiset respecting inserted values.',
    tests: [
      {
        input: [[8, 3, 10, 1, 6, 14, 4, 7, 13]],
        expected: [1, 3, 4, 6, 7, 8, 10, 13, 14],
      },
      {
        input: [[]],
        expected: [],
      },
    ],
  },
]

export default data
