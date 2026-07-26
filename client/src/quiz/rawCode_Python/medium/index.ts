import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-python-medium-filter-evens-0001',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (Filter Even Numbers)\n\nImplement `solve(input)` where `input = list[int]`. Return a new list containing only the even numbers, in original order.',
    correctExplanation:
      'Use a list comprehension `[x for x in lst if x % 2 == 0]` or the filter() function. Time O(n), Space O(k) where k is the count of even numbers. Example: [1, 2, 3, 4, 5, 6] returns [2, 4, 6].',
    tests: [
      { input: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] },
      { input: [[1, 3, 5]], expected: [] },
      { input: [[2, 4, 6]], expected: [2, 4, 6] },
    ],
  },
  {
    id: 'raw-coding-python-medium-string-split-0002',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (String Split)\n\nImplement `solve(input)` where `input = { text: string, delimiter: string }`. Return the string split by the delimiter as a list of substrings.',
    correctExplanation:
      'Python strings have a `.split(delimiter)` method that splits on the given separator and returns a list. Time O(n), Space O(m) for the result. Example: splitting "a,b,c" on "," returns ["a", "b", "c"].',
    tests: [
      { input: [{ text: 'a,b,c', delimiter: ',' }], expected: ['a', 'b', 'c'] },
      { input: [{ text: 'hello world test', delimiter: ' ' }], expected: ['hello', 'world', 'test'] },
      { input: [{ text: 'abc', delimiter: ',' }], expected: ['abc'] },
    ],
  },
  {
    id: 'raw-coding-python-medium-dict-values-sum-0003',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (Dictionary Values Sum)\n\nImplement `solve(input)` where `input = dict[str, int]`. Return the sum of all values in the dictionary.',
    correctExplanation:
      'Access dictionary values with `.values()` and pass to `sum()`. Alternatively, iterate and accumulate. Time O(n) where n is the number of key-value pairs, Space O(1). Example: {"a": 10, "b": 20, "c": 30} returns 60.',
    tests: [
      { input: [{ a: 10, b: 20, c: 30 }], expected: 60 },
      { input: [{}], expected: 0 },
      { input: [{ x: 5, y: 15 }], expected: 20 },
    ],
  },
  {
    id: 'raw-coding-python-medium-sort-numbers-0004',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (Sort Numbers)\n\nImplement `solve(input)` where `input = list[int]`. Return a new list with all numbers sorted in ascending order.',
    correctExplanation:
      'Use the `sorted()` built-in function which returns a new sorted list without modifying the original. Time O(n log n), Space O(n) for the result. Example: [3, 1, 4, 1, 5] returns [1, 1, 3, 4, 5].',
    tests: [
      { input: [[3, 1, 4, 1, 5]], expected: [1, 1, 3, 4, 5] },
      { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
      { input: [[1]], expected: [1] },
    ],
  },
  {
    id: 'raw-coding-python-medium-string-replace-0005',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (String Replace)\n\nImplement `solve(input)` where `input = { text: string, old: string, new: string }`. Return the string with all occurrences of `old` replaced by `new`.',
    correctExplanation:
      'Python strings have a `.replace(old, new)` method that replaces all occurrences of the substring. Time O(n), Space O(n) for the new string. Example: replacing "o" with "0" in "hello world" returns "hell0 w0rld".',
    tests: [
      { input: [{ text: 'hello world', old: 'o', new: '0' }], expected: 'hell0 w0rld' },
      { input: [{ text: 'aaa', old: 'a', new: 'b' }], expected: 'bbb' },
      { input: [{ text: 'test', old: 'x', new: 'y' }], expected: 'test' },
    ],
  },
  {
    id: 'raw-coding-python-medium-list-contains-0006',
    difficulty: 'medium',
    prompt:
      'Python Raw Coding (List Contains)\n\nImplement `solve(input)` where `input = { lst: list[any], item: any }`. Return True if the item is in the list, False otherwise.',
    correctExplanation:
      'Use the `in` operator which checks membership efficiently. Time O(n) on average for lists, Space O(1). Example: checking if 3 is in [1, 2, 3, 4] returns True.',
    tests: [
      { input: [{ lst: [1, 2, 3, 4], item: 3 }], expected: true },
      { input: [{ lst: [1, 2, 3, 4], item: 5 }], expected: false },
      { input: [{ lst: ['a', 'b', 'c'], item: 'b' }], expected: true },
    ],
  },
]

export default data
