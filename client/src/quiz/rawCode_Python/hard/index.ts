import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-python-hard-flatten-nested-0001',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (Flatten Nested List)\n\nImplement `solve(input)` where `input = list[any]` which may contain nested lists. Return a single flat list containing all non-list elements in order.',
    correctExplanation:
      'Use recursion or iteration to flatten. A recursive approach checks if each element is a list; if so, recursively flatten it. Time O(n) where n is total elements, Space O(d) for recursion depth. Example: [1, [2, [3, 4]], 5] returns [1, 2, 3, 4, 5].',
    tests: [
      { input: [[1, [2, [3, 4]], 5]], expected: [1, 2, 3, 4, 5] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
      { input: [[]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-python-hard-groupby-key-0002',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (Group by Key)\n\nImplement `solve(input)` where `input = { items: list[dict], key: string }`. Return a dictionary where keys are unique values of the specified key, and values are lists of items with that key.',
    correctExplanation:
      'Iterate through items and group them by the value of the specified key. Use `dict.setdefault()` or `collections.defaultdict()` for efficient grouping. Time O(n), Space O(n). Example: grouping [{"type": "a", "val": 1}, {"type": "b", "val": 2}, {"type": "a", "val": 3}] by "type" produces {"a": [item1, item3], "b": [item2]}.',
    tests: [
      { input: [{ items: [{ type: 'a', val: 1 }, { type: 'b', val: 2 }, { type: 'a', val: 3 }], key: 'type' }], expected: { a: [{ type: 'a', val: 1 }, { type: 'a', val: 3 }], b: [{ type: 'b', val: 2 }] } },
      { input: [{ items: [], key: 'type' }], expected: {} },
      { input: [{ items: [{ x: 1 }, { x: 1 }], key: 'x' }], expected: { '1': [{ x: 1 }, { x: 1 }] } },
    ],
  },
  {
    id: 'raw-coding-python-hard-palindrome-check-0003',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (Palindrome Check)\n\nImplement `solve(input)` where `input = string`. Return True if the string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters.',
    correctExplanation:
      'Filter to keep only alphanumeric characters, convert to lowercase, then compare with its reverse. Time O(n), Space O(n) for the filtered string. Example: "A man, a plan, a canal: Panama" is a palindrome.',
    tests: [
      { input: ['A man, a plan, a canal: Panama'], expected: true },
      { input: ['hello'], expected: false },
      { input: ['12321'], expected: true },
    ],
  },
  {
    id: 'raw-coding-python-hard-unique-pairs-sum-0004',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (Unique Pairs Sum)\n\nImplement `solve(input)` where `input = { numbers: list[int], target: int }`. Return a list of unique pairs of indices [i, j] where i < j and numbers[i] + numbers[j] equals target.',
    correctExplanation:
      'Use a hash map to store seen numbers and their indices. For each number, check if target - number exists in the map. Time O(n), Space O(n). Example: [2, 7, 11, 15] with target 9 returns [[0, 1]] since numbers[0] + numbers[1] = 2 + 7 = 9.',
    tests: [
      { input: [{ numbers: [2, 7, 11, 15], target: 9 }], expected: [[0, 1]] },
      { input: [{ numbers: [3, 3], target: 6 }], expected: [[0, 1]] },
      { input: [{ numbers: [1, 2, 3], target: 10 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-python-hard-dict-merge-0005',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (Merge Dictionaries)\n\nImplement `solve(input)` where `input = list[dict]`. Merge all dictionaries in the list into a single dictionary. If a key exists in multiple dictionaries, the last occurrence wins.',
    correctExplanation:
      'Iterate through each dictionary and update a result dictionary with its items. Python dicts maintain insertion order as of 3.7+, so later values overwrite earlier ones. Time O(n) where n is total key-value pairs, Space O(k) where k is unique keys. Example: [{"a": 1}, {"b": 2}, {"a": 3}] returns {"a": 3, "b": 2}.',
    tests: [
      { input: [[{ a: 1 }, { b: 2 }, { a: 3 }]], expected: { a: 3, b: 2 } },
      { input: [[{}]], expected: {} },
      { input: [[{ x: 10, y: 20 }, { z: 30 }]], expected: { x: 10, y: 20, z: 30 } },
    ],
  },
  {
    id: 'raw-coding-python-hard-string-to-int-list-0006',
    difficulty: 'hard',
    prompt:
      'Python Raw Coding (String to Integer List)\n\nImplement `solve(input)` where `input = string` containing space-separated integers. Return a list of integers parsed from the string.',
    correctExplanation:
      'Split the string by spaces and convert each substring to an integer using int(). Time O(n), Space O(m) where m is the number of integers. Example: "1 2 3 4 5" returns [1, 2, 3, 4, 5].',
    tests: [
      { input: ['1 2 3 4 5'], expected: [1, 2, 3, 4, 5] },
      { input: ['10'], expected: [10] },
      { input: ['-1 0 1'], expected: [-1, 0, 1] },
    ],
  },
]

export default data
