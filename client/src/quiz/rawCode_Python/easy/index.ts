import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-python-easy-list-sum-0001',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (List Sum)\n\nImplement `solve(input)` where `input = list[int]`. Return the sum of all integers in the list.',
    correctExplanation:
      'Python provides a built-in `sum()` function that adds all numbers in an iterable. Alternatively, loop through and accumulate. Time O(n), Space O(1). Example: [1, 2, 3, 4] returns 10.',
    tests: [
      { input: [[1, 2, 3, 4]], expected: 10 },
      { input: [[]], expected: 0 },
      { input: [[-1, 5, 0, 3]], expected: 7 },
    ],
  },
  {
    id: 'raw-coding-python-easy-reverse-string-0002',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (Reverse String)\n\nImplement `solve(input)` where `input = string`. Return the string reversed.',
    correctExplanation:
      'Python string slicing with a negative step [::-1] is the idiomatic way. Alternatively, use reversed() and join. Time O(n), Space O(n) for the new string. Example: "hello" returns "olleh".',
    tests: [
      { input: ['hello'], expected: 'olleh' },
      { input: ['a'], expected: 'a' },
      { input: ['racecar'], expected: 'racecar' },
    ],
  },
  {
    id: 'raw-coding-python-easy-dict-key-count-0003',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (Dictionary Key Count)\n\nImplement `solve(input)` where `input = dict`. Return the number of keys in the dictionary.',
    correctExplanation:
      'Use Python\'s built-in `len()` function on the dictionary. Time O(1) since dictionaries track their size. Example: {"a": 1, "b": 2, "c": 3} returns 3.',
    tests: [
      { input: [{ a: 1, b: 2, c: 3 }], expected: 3 },
      { input: [{}], expected: 0 },
      { input: [{ x: 100, y: 200 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-python-easy-list-to-set-0004',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (List to Set)\n\nImplement `solve(input)` where `input = list[any]`. Return a list of unique elements from the input, in any order.',
    correctExplanation:
      'Convert to a set to remove duplicates, then convert back to a list. Time O(n) on average, Space O(k) where k is the number of unique elements. Example: [1, 2, 2, 3, 3, 3] returns [1, 2, 3] in some order.',
    tests: [
      { input: [[1, 2, 2, 3, 3, 3]], expected: [1, 2, 3] },
      { input: [[]], expected: [] },
      { input: [['a', 'a', 'b']], expected: ['a', 'b'] },
    ],
  },
  {
    id: 'raw-coding-python-easy-uppercase-string-0005',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (Uppercase String)\n\nImplement `solve(input)` where `input = string`. Return the string with all characters converted to uppercase.',
    correctExplanation:
      'Python strings have a built-in `.upper()` method. Time O(n), Space O(n) for the new string. Example: "hello world" returns "HELLO WORLD".',
    tests: [
      { input: ['hello world'], expected: 'HELLO WORLD' },
      { input: ['Python'], expected: 'PYTHON' },
      { input: ['123abc'], expected: '123ABC' },
    ],
  },
  {
    id: 'raw-coding-python-easy-list-length-0006',
    difficulty: 'easy',
    prompt:
      'Python Raw Coding (List Length)\n\nImplement `solve(input)` where `input = list[any]`. Return the number of elements in the list.',
    correctExplanation:
      'Use Python\'s built-in `len()` function. Time O(1) since Python lists track their size. Example: [1, 2, 3, 4, 5] returns 5.',
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 5 },
      { input: [[]], expected: 0 },
      { input: [['a', 'b']], expected: 2 },
    ],
  },
]

export default data
