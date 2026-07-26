import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-easy-sum-array-0001',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Sum All Values)\\n\\nImplement `solve(input)` where `input = number[]`. Return the sum of all numbers.',
    correctExplanation:
      'Iterate through the array, accumulating each value into a running total, then return it. Time O(n), Space O(1). Example: [1,2,3] → 0+1+2+3 = 6.'
,
    tests: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[5, -1, 10]], expected: 14 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-first-plus-last-0002',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (First Plus Last)\\n\\nImplement `solve(input)` where `input = number[]`. Return `first + last`. If the array is empty, return `0`.',
    correctExplanation:
      'Check if array is empty, return 0 if so. Otherwise, access array[0] and array[array.length-1], then sum them. Time O(1), Space O(1). Example: [4,9,2] → 4+2=6, [7] → 7+7=14.'
,
    tests: [
      { input: [[4, 9, 2]], expected: 6 },
      { input: [[7]], expected: 14 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-count-positive-0003',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Count Positive Numbers)\\n\\nImplement `solve(input)` where `input = number[]`. Return how many values are greater than 0.',
    correctExplanation:
      'Iterate through the array and increment a counter for each value > 0. Time O(n), Space O(1). Example: [-1,0,2,3] → values 2 and 3 satisfy > 0, return 2.'
,
    tests: [
      { input: [[-1, 0, 2, 3]], expected: 2 },
      { input: [[1, 1, 1]], expected: 3 },
      { input: [[-3, -2]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-max-value-0004',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Max Value)\\n\\nImplement `solve(input)` where `input = number[]`. Return the largest value. If the array is empty, return `null`.',
    correctExplanation:
      'If array is empty, return null. Otherwise, iterate and keep track of the largest value seen so far. Time O(n), Space O(1). Example: [4,2,9,1] → max is 9 after comparing all values.'
,
    tests: [
      { input: [[4, 2, 9, 1]], expected: 9 },
      { input: [[-7, -2, -5]], expected: -2 },
      { input: [[]], expected: null },
    ],
  },
  {
    id: 'raw-coding-easy-reverse-string-0005',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Reverse String)\\n\\nImplement `solve(input)` where `input = string`. Return the reversed string.',
    correctExplanation:
      'Convert string to array, reverse the array, then join back to string. Or build result by iterating from last character to first. Time O(n), Space O(n). Example: "abcd" → [a,b,c,d] → [d,c,b,a] → "dcba".'
,
    tests: [
      { input: ['abcd'], expected: 'dcba' },
      { input: ['a'], expected: 'a' },
      { input: ['racecar'], expected: 'racecar' },
    ],
  },
  {
    id: 'raw-coding-easy-count-vowels-0006',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Count Vowels)\\n\\nImplement `solve(input)` where `input = string`. Return how many vowels (`a,e,i,o,u`) appear, case-insensitive.',
    correctExplanation:
      'Convert string to lowercase, then iterate through each character and count how many are in the set {a,e,i,o,u}. Time O(n), Space O(1). Example: "hello" → h(no), e(yes), l(no), l(no), o(yes) → count=2.'
,
    tests: [
      { input: ['hello'], expected: 2 },
      { input: ['AEIOU'], expected: 5 },
      { input: ['rhythm'], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-contains-duplicate-0007',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Contains Duplicate)\\n\\nImplement `solve(input)` where `input = number[]`. Return `true` if any value appears at least twice; otherwise return `false`.',
    correctExplanation:
      'Maintain a set of values encountered. For each value in the array, if it already exists in the set, return true immediately. If loop completes without finding a duplicate, return false. Time O(n), Space O(n). Example: [1,2,3,1] → see 1, add to set. Later see 1 again → return true.'
,
    tests: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[5, 5]], expected: true },
    ],
  },
  {
    id: 'raw-coding-easy-clamp-value-0008',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Clamp Value)\\n\\nImplement `solve(input)` where `input = { value: number, min: number, max: number }`. Return the value clamped into the inclusive range `[min, max]`.',
    correctExplanation:
      'Return max(value, min) if value > min, else min. Then return min(result, max) if result < max, else max. Or: if (value < min) return min; if (value > max) return max; return value. Time O(1), Space O(1). Example: value=8, min=0, max=5 → 8>5 → return 5.'
,
    tests: [
      { input: [{ value: 8, min: 0, max: 5 }], expected: 5 },
      { input: [{ value: -3, min: -2, max: 7 }], expected: -2 },
      { input: [{ value: 4, min: 0, max: 10 }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-easy-is-palindrome-0009',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Palindrome String)\n\nImplement `solve(input)` where `input = string`. Return `true` if the string reads the same forward and backward, otherwise `false`.',
    correctExplanation:
      'Use two pointers from opposite ends and compare characters while moving inward. If any pair doesn\'t match, return false. If loop completes, return true. Time O(n), Space O(1). Example: "level" → l==l, e==e, v==v → true. "chatgpt" → c!=t → false.'
,
    tests: [
      { input: ['level'], expected: true },
      { input: ['chatgpt'], expected: false },
      { input: ['a'], expected: true },
    ],
  },
  {
    id: 'raw-coding-easy-min-value-0010',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Minimum Value)\n\nImplement `solve(input)` where `input = number[]`. Return the smallest value. If the array is empty, return `null`.',
    correctExplanation:
      'If array is empty, return null. Otherwise, iterate and maintain the smallest value seen. Time O(n), Space O(1). Example: [9,4,7,1] → 9(min=9), 4(min=4), 7(min=4), 1(min=1) → return 1.'
,
    tests: [
      { input: [[9, 4, 7, 1]], expected: 1 },
      { input: [[-2, -8, 3]], expected: -8 },
      { input: [[]], expected: null },
    ],
  },
  {
    id: 'raw-coding-easy-count-odd-0011',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Count Odd Numbers)\n\nImplement `solve(input)` where `input = number[]`. Return how many values are odd.',
    correctExplanation:
      'Iterate through the array and count values where (value % 2 !== 0) or (value % 2 === 1 || value % 2 === -1). For negative odds, check if Math.abs(value) % 2 === 1. Time O(n), Space O(1). Example: [1,2,3,4,5] → 1,3,5 are odd → count=3.'
,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 3 },
      { input: [[2, 4, 6]], expected: 0 },
      { input: [[-3, -2, -1]], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-easy-title-case-0012',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Title Case Words)\n\nImplement `solve(input)` where `input = string[]`. Return a new array where each word has its first character uppercased and the rest lowercased.',
    correctExplanation:
      'For each word, check if it\'s empty; if so, keep it empty. Otherwise, take word[0].toUpperCase() + word.slice(1).toLowerCase(). Time O(n*m) where m is avg word length, Space O(n*m). Example: ["hello", "WORLD"] → ["Hello", "World"].'
,
    tests: [
      { input: [['hello', 'WORLD']], expected: ['Hello', 'World'] },
      { input: [['jAvAsCrIpT']], expected: ['Javascript'] },
      { input: [['', 'a']], expected: ['', 'A'] },
    ],
  },
  {
    id: 'raw-coding-easy-fizz-buzz-0013',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (FizzBuzz)\n\nImplement `solve(input)` where `input = number`. Return an array of strings from 1..n using: multiples of 3 => "Fizz", multiples of 5 => "Buzz", multiples of both => "FizzBuzz", else the number as a string.',
    correctExplanation:
      'Loop from 1 to n. For each number, check divisibility by 15 first, then 3, then 5, else stringify number. Time O(n), Space O(n). Example: n=5 -> ["1","2","Fizz","4","Buzz"].'
,
    tests: [
      { input: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { input: [1], expected: ['1'] },
      { input: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] },
    ],
  },
  {
    id: 'raw-coding-easy-valid-anagram-0014',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Valid Anagram)\n\nImplement `solve(input)` where `input = { s: string, t: string }`. Return `true` if `t` is an anagram of `s`, otherwise `false`.',
    correctExplanation:
      'If lengths differ, return false. Count characters of s in a map, decrement with t, and verify all counts end at zero. Time O(n), Space O(k).'
,
    tests: [
      { input: [{ s: 'anagram', t: 'nagaram' }], expected: true },
      { input: [{ s: 'rat', t: 'car' }], expected: false },
      { input: [{ s: '', t: '' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-easy-binary-search-0015',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Binary Search)\n\nImplement `solve(input)` where `input = { nums: number[], target: number }` and `nums` is sorted ascending. Return index of `target`, or `-1`.',
    correctExplanation:
      'Use left/right pointers and repeatedly check mid. Narrow to half that can contain target. Time O(log n), Space O(1).'
,
    tests: [
      { input: [{ nums: [-1, 0, 3, 5, 9, 12], target: 9 }], expected: 4 },
      { input: [{ nums: [-1, 0, 3, 5, 9, 12], target: 2 }], expected: -1 },
      { input: [{ nums: [7], target: 7 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-contains-duplicate-0016',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Contains Duplicate)\n\nImplement `solve(input)` where `input = number[]`. Return `true` if any value appears at least twice, else `false`.',
    correctExplanation:
      'Use a set to track seen values. If a value is already in the set, return true. If loop ends, no duplicates. Time O(n), Space O(n).'
,
    tests: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[]], expected: false },
    ],
  },
  {
    id: 'raw-coding-easy-two-sum-indices-0017',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Two Sum Indices)\n\nImplement `solve(input)` where `input = { nums: number[], target: number }`. Return indices `[i, j]` of two numbers adding to target with `i < j`, or `[]` if none.',
    correctExplanation:
      'Use hashmap from value to index. For each num, check if complement exists; if yes return [storedIndex, currentIndex]. Otherwise store current index. Time O(n), Space O(n).'
,
    tests: [
      { input: [{ nums: [2, 7, 11, 15], target: 9 }], expected: [0, 1] },
      { input: [{ nums: [3, 2, 4], target: 6 }], expected: [1, 2] },
      { input: [{ nums: [1, 2, 3], target: 7 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-easy-merge-sorted-arrays-0018',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Merge Two Sorted Arrays)\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }`. Return a merged sorted array containing all values.',
    correctExplanation:
      'Use two pointers over both arrays, always taking the smaller front element, then append leftovers. Time O(n+m), Space O(n+m).'
,
    tests: [
      { input: [{ a: [1, 3, 5], b: [2, 4, 6] }], expected: [1, 2, 3, 4, 5, 6] },
      { input: [{ a: [], b: [1, 2] }], expected: [1, 2] },
      { input: [{ a: [1, 2, 2], b: [2, 2, 3] }], expected: [1, 2, 2, 2, 2, 3] },
    ],
  },
  {
    id: 'raw-coding-easy-sum-digits-0019',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Sum Digits)\n\nImplement `solve(input)` where `input = string`. Return the sum of all digit characters in the string. Ignore non-digit characters.',
    correctExplanation:
      'Scan the string character by character. If a character is between 0 and 9, convert it to a number and add it to the running total. Time O(n), Space O(1). Example: "a1b2c3" → 1+2+3 = 6.',
    tests: [
      { input: ['a1b2c3'], expected: 6 },
      { input: ['007'], expected: 7 },
      { input: ['no digits here'], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-is-sorted-0020',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Is Sorted Ascending)\n\nImplement `solve(input)` where `input = number[]`. Return `true` if the array is sorted in non-decreasing order, otherwise `false`.',
    correctExplanation:
      'Compare each adjacent pair from left to right. If any previous value is greater than the next value, return false. If the scan finishes, return true. Time O(n), Space O(1). Example: [1,2,2,5] is sorted; [1,3,2] is not.',
    tests: [
      { input: [[1, 2, 2, 5]], expected: true },
      { input: [[5, 4, 4]], expected: false },
      { input: [[]], expected: true },
    ],
  },
  {
    id: 'raw-coding-easy-count-characters-0021',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Count Character Occurrences)\n\nImplement `solve(input)` where `input = { text: string, char: string }`. Return how many times `char` appears in `text`.',
    correctExplanation:
      'Scan the string once and count each character equal to the target char. Return the final total. Time O(n), Space O(1). Example: text="banana", char="a" → 3.',
    tests: [
      { input: [{ text: 'banana', char: 'a' }], expected: 3 },
      { input: [{ text: 'mississippi', char: 's' }], expected: 4 },
      { input: [{ text: 'hello', char: 'z' }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-easy-interleave-arrays-0022',
    difficulty: 'easy',
    prompt:
      'Raw Coding Quick Check (Interleave Two Arrays)\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }`. Return a new array by alternating values from `a` and `b`, then appending leftovers from the longer array.',
    correctExplanation:
      'Walk both arrays with two indices. On each step, push from a if available, then from b if available. When one array ends, append the remaining values from the other. Time O(n+m), Space O(n+m).',
    tests: [
      { input: [{ a: [1, 3, 5], b: [2, 4, 6] }], expected: [1, 2, 3, 4, 5, 6] },
      { input: [{ a: [1, 2], b: [9, 8, 7] }], expected: [1, 9, 2, 8, 7] },
      { input: [{ a: [], b: [4, 5] }], expected: [4, 5] },
    ],
  },
]

export default data
