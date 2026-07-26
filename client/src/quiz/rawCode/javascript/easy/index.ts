import type { RawCodingQuestionData } from '../../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-javascript-easy-trim-collapse-spaces-0001',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (Trim and Collapse Spaces)\n\nImplement `solve(input)` where `input = string`. Return the string with leading and trailing spaces removed and every internal run of whitespace collapsed to a single space.',
    correctExplanation:
      'A practical JavaScript approach is to split on whitespace with a regular expression, remove empty pieces, then join the remaining words with a single space. Trimming first also works. Time O(n), Space O(n). Example: "  hello   world  " becomes "hello world".',
    tests: [
      { input: ['  hello   world  '], expected: 'hello world' },
      { input: ['one\ttwo\nthree'], expected: 'one two three' },
      { input: ['   '], expected: '' },
    ],
  },
  {
    id: 'raw-coding-javascript-easy-count-truthy-0002',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (Count Truthy Values)\n\nImplement `solve(input)` where `input = any[]`. Return how many array values are truthy in JavaScript.',
    correctExplanation:
      'Use a counter or filter(Boolean). JavaScript truthiness treats values like 0, empty string, null, undefined, false, and NaN as falsy, while most other values are truthy. Time O(n), Space O(1) if you count directly. Example: [0, 1, "", "js", null, [], {}] has four truthy values because arrays and objects are truthy.',
    tests: [
      { input: [[0, 1, '', 'js', null, [], {}]], expected: 4 },
      { input: [[false, 0, NaN, undefined]], expected: 0 },
      { input: [['a', 'b', 3]], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-javascript-easy-first-unique-char-0003',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (First Unique Character)\n\nImplement `solve(input)` where `input = string`. Return the first character that appears exactly once, or an empty string if none exists.',
    correctExplanation:
      'Count characters with a plain object or Map, then scan the string again from left to right. The first character whose count is 1 is the answer. Time O(n), Space O(k) for the number of distinct characters. Example: "swiss" returns "w" because s appears three times, w once, i once, and the first unique character is w.',
    tests: [
      { input: ['swiss'], expected: 'w' },
      { input: ['aabbcc'], expected: '' },
      { input: ['javascript'], expected: 'j' },
    ],
  },
  {
    id: 'raw-coding-javascript-easy-callback-success-values-0004',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (Callback Success Values)\n\nImplement `solve(input)` where `input = { calls: { error: string | null, value?: any }[] }`. Return an array containing the `value` from every successful callback invocation, where success means `error === null`. Preserve order.',
    correctExplanation:
      'This models the common Node-style callback shape where the first argument is an error and the second is the successful value. Scan the callback records from left to right and collect the values whose error is null. Ignore failed entries. Time O(n), Space O(n) for the returned array. Example: callbacks like `(null, "a")`, `(\'boom\', "b")`, `(null, "c")` produce `["a", "c"]`.',
    tests: [
      { input: [{ calls: [{ error: null, value: 'alpha' }, { error: 'boom', value: 'beta' }, { error: null, value: 'gamma' }] }], expected: ['alpha', 'gamma'] },
      { input: [{ calls: [{ error: 'x', value: 1 }, { error: 'y', value: 2 }] }], expected: [] },
      { input: [{ calls: [] }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-javascript-easy-promise-status-counts-0005',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (Promise Status Counts)\n\nImplement `solve(input)` where `input = { promises: { status: string }[] }`. Return an object with counts for `{ fulfilled, rejected, pending }` based on the status of each promise-like record.',
    correctExplanation:
      'Scan the array once and increment the appropriate counter for each status. This mirrors reading the state of promise-like records in JavaScript tooling or debugging output. Initialize all three counters to zero so missing categories still appear in the result. Time O(n), Space O(1).',
    tests: [
      { input: [{ promises: [{ status: 'fulfilled' }, { status: 'rejected' }, { status: 'fulfilled' }, { status: 'pending' }] }], expected: { fulfilled: 2, rejected: 1, pending: 1 } },
      { input: [{ promises: [] }], expected: { fulfilled: 0, rejected: 0, pending: 0 } },
      { input: [{ promises: [{ status: 'pending' }, { status: 'pending' }] }], expected: { fulfilled: 0, rejected: 0, pending: 2 } },
    ],
  },
  {
    id: 'raw-coding-javascript-easy-fetch-header-lookup-0006',
    difficulty: 'easy',
    prompt:
      'JavaScript Raw Coding (Fetch Header Lookup)\n\nImplement `solve(input)` where `input = { headers: [string, string][], key: string }`. Return the value of the first header whose name matches `key` case-insensitively, or an empty string if it does not exist.',
    correctExplanation:
      'HTTP header names are case-insensitive, which is a common detail when working with `fetch` response or request headers in JavaScript. Convert both the lookup key and each header name to a shared case such as lowercase, then return the first matching value. If no header matches, return an empty string. Time O(n), Space O(1) beyond temporary lowercase strings.',
    tests: [
      { input: [{ headers: [['Content-Type', 'application/json'], ['X-Trace', 'abc']], key: 'content-type' }], expected: 'application/json' },
      { input: [{ headers: [['accept', 'text/plain'], ['ACCEPT', 'application/json']], key: 'Accept' }], expected: 'text/plain' },
      { input: [{ headers: [['Server', 'edge']], key: 'x-request-id' }], expected: '' },
    ],
  },
]

export default data
