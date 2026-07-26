import type { RawCodingQuestionData } from '../../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-javascript-medium-flatten-one-level-0001',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Flatten One Level)\n\nImplement `solve(input)` where `input = any[]`. Return a new array with exactly one level of nesting removed.',
    correctExplanation:
      'Iterate through the outer array. If an item is itself an array, append each of its elements into the result; otherwise append the item directly. This is the same behavior as a shallow flatten. Time O(n), Space O(n). Example: [1, [2, 3], 4, [5]] becomes [1, 2, 3, 4, 5].',
    tests: [
      { input: [[1, [2, 3], 4, [5]]], expected: [1, 2, 3, 4, 5] },
      { input: [[['a'], ['b', 'c']]], expected: ['a', 'b', 'c'] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-group-by-type-0002',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Group By Type)\n\nImplement `solve(input)` where `input = any[]`. Return an object whose keys are `typeof` groups and whose values are arrays of the original items in order.',
    correctExplanation:
      'Build a result object keyed by `typeof value`. For each item, compute its type and push it into the matching array. Preserve the original order within each group. Time O(n), Space O(n). Example: [1, "x", true, 2, null] groups into { number: [1, 2], string: ["x"], boolean: [true], object: [null] } because `typeof null` is `object` in JavaScript.',
    tests: [
      { input: [[1, 'x', true, 2, null]], expected: { number: [1, 2], string: ['x'], boolean: [true], object: [null] } },
      { input: [[undefined, 5, 'hi', false]], expected: { undefined: [undefined], number: [5], string: ['hi'], boolean: [false] } },
      { input: [[{}, [], 3]], expected: { object: [{}, []], number: [3] } },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-deduplicate-objects-0003',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Deduplicate Objects By Key)\n\nImplement `solve(input)` where `input = { items: { id: string, value: any }[] }`. Return a new array keeping only the first object for each `id`.',
    correctExplanation:
      'Use a Map or Set to remember which ids have already been seen. As you scan the array from left to right, keep the first object for each id and skip later duplicates. This is a common JavaScript data-shaping pattern. Time O(n), Space O(n). Example: if id `a` appears three times, only the first object survives.',
    tests: [
      { input: [{ items: [{ id: 'a', value: 1 }, { id: 'b', value: 2 }, { id: 'a', value: 3 }] }], expected: [{ id: 'a', value: 1 }, { id: 'b', value: 2 }] },
      { input: [{ items: [{ id: 'x', value: 9 }] }], expected: [{ id: 'x', value: 9 }] },
      { input: [{ items: [] }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-build-fetch-url-0004',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Build Fetch URL)\n\nImplement `solve(input)` where `input = { baseUrl: string, params: Record<string, string | number | boolean | null | undefined> }`. Return the URL you would pass to `fetch`, appending a query string built from `params`. Skip keys whose value is `null` or `undefined`, sort remaining keys alphabetically, and URL-encode both keys and values.',
    correctExplanation:
      'Collect the entries whose value is not null or undefined, sort them by key, and convert each pair into `encodeURIComponent(key)=encodeURIComponent(String(value))`. Join them with `&`, then append the query string only when at least one parameter remains. This is a practical JavaScript utility around `fetch` request construction. Time O(n log n) because of sorting, Space O(n).',
    tests: [
      { input: [{ baseUrl: 'https://api.example.com/users', params: { page: 2, q: 'tea time', active: true, extra: null } }], expected: 'https://api.example.com/users?active=true&page=2&q=tea%20time' },
      { input: [{ baseUrl: 'https://service.dev/search', params: { tag: 'a/b', limit: 10 } }], expected: 'https://service.dev/search?limit=10&tag=a%2Fb' },
      { input: [{ baseUrl: 'https://x.test/items', params: { skip: undefined, take: null } }], expected: 'https://x.test/items' },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-callback-batch-summary-0005',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Callback Batch Summary)\n\nImplement `solve(input)` where `input = { calls: { error: string | null, duration: number }[] }`. Return `{ successCount, failureCount, averageSuccessDuration }`, where `averageSuccessDuration` is `0` when there are no successful calls.',
    correctExplanation:
      'This is a small aggregation problem over Node-style callback outcomes. Count how many records have `error === null` versus a non-null error, and sum durations only for the successful ones. Divide by the number of successful calls to get the average, or return 0 if there were none. Time O(n), Space O(1).',
    tests: [
      { input: [{ calls: [{ error: null, duration: 100 }, { error: 'boom', duration: 50 }, { error: null, duration: 200 }] }], expected: { successCount: 2, failureCount: 1, averageSuccessDuration: 150 } },
      { input: [{ calls: [{ error: 'x', duration: 10 }] }], expected: { successCount: 0, failureCount: 1, averageSuccessDuration: 0 } },
      { input: [{ calls: [] }], expected: { successCount: 0, failureCount: 0, averageSuccessDuration: 0 } },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-await-sequential-finish-times-0006',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Await Sequential Finish Times)\n\nImplement `solve(input)` where `input = { durations: number[] }`. Each duration represents an async task you `await` one at a time in order. Return an array of the finish times for each task.',
    correctExplanation:
      'When async tasks are awaited sequentially, each task starts only after the previous one finishes. Keep a running total and append it after adding each duration. This models the timeline of `await` inside a simple `for...of` loop in JavaScript. Time O(n), Space O(n).',
    tests: [
      { input: [{ durations: [3, 1, 2] }], expected: [3, 4, 6] },
      { input: [{ durations: [5] }], expected: [5] },
      { input: [{ durations: [] }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-fetch-method-counts-0007',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Fetch Method Counts)\n\nImplement `solve(input)` where `input = { requests: { method?: string }[] }`. Return an object counting how many requests use each HTTP method. Treat missing methods as `GET`, and compare methods case-insensitively while storing result keys in uppercase.',
    correctExplanation:
      'Normalize each method by defaulting missing values to `GET`, converting the method to uppercase, and then incrementing the corresponding counter in the result object. This mirrors how JavaScript code often normalizes `fetch` options before sending requests. Preserve only the counts; the order of object keys does not matter. Time O(n), Space O(k) for the distinct methods.',
    tests: [
      { input: [{ requests: [{ method: 'get' }, { method: 'POST' }, {}, { method: 'post' }] }], expected: { GET: 2, POST: 2 } },
      { input: [{ requests: [{ method: 'delete' }, { method: 'DELETE' }, { method: 'patch' }] }], expected: { DELETE: 2, PATCH: 1 } },
      { input: [{ requests: [] }], expected: {} },
    ],
  },
  {
    id: 'raw-coding-javascript-medium-promise-settle-order-0008',
    difficulty: 'medium',
    prompt:
      'JavaScript Raw Coding (Promise Settle Order)\n\nImplement `solve(input)` where `input = { promises: { label: string, duration: number }[] }`. All promises start at time 0 and fulfill after their duration. Return the labels in the order the promises settle. If two promises settle at the same time, preserve their original order.',
    correctExplanation:
      'Sort the promise records by increasing duration, using original input position as a tie-breaker. This models the completion order of promises that all start together and only differ by how long they take. The JavaScript reasoning point is that settlement order can differ from creation order. Time O(n log n), Space O(n) if you sort a copied array.',
    tests: [
      { input: [{ promises: [{ label: 'a', duration: 5 }, { label: 'b', duration: 2 }, { label: 'c', duration: 4 }] }], expected: ['b', 'c', 'a'] },
      { input: [{ promises: [{ label: 'x', duration: 1 }, { label: 'y', duration: 1 }, { label: 'z', duration: 2 }] }], expected: ['x', 'y', 'z'] },
      { input: [{ promises: [] }], expected: [] },
    ],
  },
]

export default data
