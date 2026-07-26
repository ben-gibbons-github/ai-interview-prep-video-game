import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-ds-easy-valid-parens-3201',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Valid Parentheses)\n\nScenario:\nA JSON parser needs to validate brace matching before processing nested payloads.\n\nTask:\nImplement `solve(input)` where `input = string` containing only chars `(`, `)`, `{`, `}`, `[`, `]`.\n\nReturn:\n`true` if all brackets are properly matched and nested, `false` otherwise.\n\nConstraints:\n- Empty string is valid.\n- No spaces or other chars.\n\nHint:\nStack: push opening, pop and match closing.',
    correctExplanation:
      'Push opening brackets onto stack, pop and validate match on closing brackets. Empty stack at end = valid. Time O(n), Space O(n).',
    tests: [
      {
        input: ['()'],
        expected: true,
      },
      {
        input: ['([{}])'],
        expected: true,
      },
      {
        input: ['(]'],
        expected: false,
      },
      {
        input: [''],
        expected: true,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-reverse-linked-list-3202',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Reverse Linked List)\n\nScenario:\nA message pipeline needs to reverse order of connections to comply with a downstream protocol.\n\nTask:\nImplement `solve(input)` where `input = number[]` represents linked-list values.\n\nReturn:\nThe reversed linked-list as an array.\n\nConstraints:\n- Empty list is valid.\n- Do not use extra arrays; simulate node operations.\n\nHint:\nThree pointers: prev, curr, next.',
    correctExplanation:
      'Iterate forward, at each node reverse its next pointer to prev, advance prev=curr, curr=next. Time O(n), Space O(1).',
    tests: [
      {
        input: [[1, 2, 3, 4, 5]],
        expected: [5, 4, 3, 2, 1],
      },
      {
        input: [[]],
        expected: [],
      },
      {
        input: [[1]],
        expected: [1],
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-contains-duplicate-3203',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Contains Duplicate)\n\nScenario:\nA user-id deduplication pass must detect if any account ID appears twice in a logged session stream.\n\nTask:\nImplement `solve(input)` where `input = number[]`.\n\nReturn:\n`true` if any value appears at least twice, `false` if all values are unique.\n\nHint:\nHashset lookup.',
    correctExplanation:
      'Iterate through array, adding values to set. If already in set, return true. Return false after complete traversal. Time O(n), Space O(n).',
    tests: [
      {
        input: [[1, 2, 3, 1]],
        expected: true,
      },
      {
        input: [[1, 2, 3, 4]],
        expected: false,
      },
      {
        input: [[]],
        expected: false,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-majority-element-3204',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Majority Element)\n\nScenario:\nA voting aggregator detects which error code dominates a batch of telemetry by appearing in over half the records.\n\nTask:\nImplement `solve(input)` where `input = number[]` with length >= 1.\n\nReturn:\nThe element appearing more than `n/2` times. Guaranteed to exist.\n\nHint:\nBoyer-Moore majority vote algorithm or hash-count approach.',
    correctExplanation:
      'Count frequencies with map and return any value exceeding n/2 threshold. Alternately, Boyer-Moore maintains candidate and count in O(1) space.',
    tests: [
      {
        input: [[3, 2, 3]],
        expected: 3,
      },
      {
        input: [[2, 2, 1, 1, 1, 2, 2]],
        expected: 2,
      },
      {
        input: [[1]],
        expected: 1,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-binary-tree-max-depth-3205',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Binary Tree Max Depth)\n\nScenario:\nA file system analyzer computes directory nesting depth to warn users of excessively deep hierarchies.\n\nTask:\nImplement `solve(input)` where `input = { val: number, left?: object, right?: object }` (nested tree structure) or null.\n\nReturn:\nThe maximum depth (number of nodes along longest root-to-leaf path).\n\nConstraints:\n- Empty tree has depth 0.\n\nHint:\nRecursive DFS or BFS level counting.',
    correctExplanation:
      'Recursively compute max depth of left and right subtrees, return 1 + max(leftDepth, rightDepth). Base case: null returns 0.',
    tests: [
      {
        input: [
          {
            val: 3,
            left: { val: 9 },
            right: { val: 20, left: { val: 15 }, right: { val: 7 } },
          },
        ],
        expected: 3,
      },
      {
        input: [null],
        expected: 0,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-invert-binary-tree-3206',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Invert Binary Tree)\n\nScenario:\nA rendering engine needs to mirror a scene tree for left-right flip animation.\n\nTask:\nImplement `solve(input)` where `input = { val: number, left?: object, right?: object }` (nested tree) or null.\n\nReturn:\nThe inverted tree (left/right pointers swapped recursively) as a serialized object.\n\nHint:\nSwap left/right at each node, recurse.',
    correctExplanation:
      'At each node, recursively invert left and right subtrees, then swap them. Time O(n), Space O(h) recursion depth.',
    tests: [
      {
        input: [
          {
            val: 2,
            left: { val: 1 },
            right: { val: 3 },
          },
        ],
        expected: {
          val: 2,
          left: { val: 3 },
          right: { val: 1 },
        },
      },
      {
        input: [null],
        expected: null,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-palindrome-linked-list-3207',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Palindrome Linked List)\n\nScenario:\nA string-pattern cache detects repeated sequences in log chains to improve compression.\n\nTask:\nImplement `solve(input)` where `input = number[]` representing linked-list values.\n\nReturn:\n`true` if list values form a palindrome, `false` otherwise.\n\nHint:\nSlow/fast pointers find middle, reverse second half, compare halves.',
    correctExplanation:
      'Use slow/fast pointers to find middle, reverse second half in-place, compare first half with reversed second half. Time O(n), Space O(1).',
    tests: [
      {
        input: [[1, 2, 2, 1]],
        expected: true,
      },
      {
        input: [[1, 2]],
        expected: false,
      },
      {
        input: [[1]],
        expected: true,
      },
    ],
  },
  {
    id: 'raw-coding-ds-easy-queue-from-stacks-3208',
    difficulty: 'easy',
    prompt:
      'Live coding Challenge (Implement Queue Using Stacks)\n\nScenario:\nA protocol adapter needs FIFO behavior but only has LIFO stack primitives available.\n\nTask:\nImplement `solve(input)` where `input = { ops: ({ type: "push", value: number } | { type: "pop" } | { type: "peek" } | { type: "empty" })[] }`.\n\nReturn:\nArray of outputs for each operation.\n\nRules:\n- `push(x)` enqueues.\n- `pop()` dequeues or `null`.\n- `peek()` returns front or `null`.\n- `empty()` returns boolean.\n\nHint:\nTwo stacks: in-stack for push, out-stack for pop/peek.',
    correctExplanation:
      'Maintain in-stack (push) and out-stack. For pop/peek, if out-stack empty, reverse all from in-stack. Amortized O(1) per operation.',
    tests: [
      {
        input: [
          {
            ops: [
              { type: 'push', value: 1 },
              { type: 'push', value: 2 },
              { type: 'peek' },
              { type: 'pop' },
              { type: 'empty' },
            ],
          },
        ],
        expected: [1, 1, false],
      },
      {
        input: [{ ops: [{ type: 'empty' }] }],
        expected: [true],
      },
    ],
  },
]

export default data
