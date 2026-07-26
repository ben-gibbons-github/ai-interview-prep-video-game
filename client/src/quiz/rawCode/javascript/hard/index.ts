import type { RawCodingQuestionData } from '../../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-javascript-hard-deep-merge-0001',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Deep Merge Plain Objects)\n\nImplement `solve(input)` where `input = { left: object, right: object }`. Return a new plain object that deep-merges `right` into `left`. Arrays should be replaced, not merged.',
    correctExplanation:
      'Walk both objects recursively. When both sides have a plain object at the same key, merge their children instead of replacing the whole branch. For arrays or primitive values, take the right-hand value. Always create new containers so the original inputs are not mutated. This is a common JavaScript utility because nested configuration objects are often layered from defaults and overrides. Time roughly O(n) over visited keys, Space O(d) for recursion depth plus output.',
    tests: [
      { input: [{ left: { a: 1, nested: { x: 1 } }, right: { b: 2, nested: { y: 3 } } }], expected: { a: 1, b: 2, nested: { x: 1, y: 3 } } },
      { input: [{ left: { list: [1, 2], enabled: false }, right: { list: [3], enabled: true } }], expected: { list: [3], enabled: true } },
      { input: [{ left: {}, right: { flag: true } }], expected: { flag: true } },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-pick-best-candidate-0002',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Pick Best Candidate)\n\nImplement `solve(input)` where `input = { candidates: { name: string, score: number, years: number }[] }`. Return the best candidate ordered by highest score, then most years, then lexicographically smallest name.',
    correctExplanation:
      'Sort with a multi-key comparator or scan once while tracking the current best candidate. Compare score first, then years, then name. The JavaScript-specific part is writing a stable, deterministic comparison on object records. Time O(n log n) with sort or O(n) with a one-pass scan, Space O(1) or O(n) depending on the approach. Example: the candidate with the best score wins, and ties break in a predictable order.',
    tests: [
      { input: [{ candidates: [{ name: 'Mia', score: 91, years: 4 }, { name: 'Ava', score: 91, years: 6 }, { name: 'Zoe', score: 88, years: 10 }] }], expected: { name: 'Ava', score: 91, years: 6 } },
      { input: [{ candidates: [{ name: 'Ben', score: 100, years: 2 }, { name: 'Ada', score: 100, years: 2 }] }], expected: { name: 'Ada', score: 100, years: 2 } },
      { input: [{ candidates: [{ name: 'Solo', score: 1, years: 1 }] }], expected: { name: 'Solo', score: 1, years: 1 } },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-cache-ttl-0003',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Cache Entries With TTL)\n\nImplement `solve(input)` where `input = { operations: { type: string, key?: string, value?: any, now: number }[], ttl: number }`. Return the values produced by every `get` operation, or `null` when a key has expired or is missing.',
    correctExplanation:
      'Store each key with both its value and the timestamp when it expires. On `set`, write the value and set expiration to now + ttl. On `get`, first check whether the entry exists and whether it is still alive at the provided timestamp; if it has expired, treat it as missing. This mirrors a simple TTL cache implementation in JavaScript with a Map. The returned array contains the result of each `get` in order. Example: after a key expires, later reads return null even if it was set before.',
    tests: [
      { input: [{ ttl: 10, operations: [{ type: 'set', key: 'a', value: 1, now: 0 }, { type: 'get', key: 'a', now: 5 }, { type: 'get', key: 'a', now: 11 }] }], expected: [1, null] },
      { input: [{ ttl: 3, operations: [{ type: 'set', key: 'x', value: 7, now: 2 }, { type: 'get', key: 'x', now: 4 }, { type: 'get', key: 'x', now: 6 }] }], expected: [7, null] },
      { input: [{ ttl: 5, operations: [{ type: 'get', key: 'missing', now: 1 }] }], expected: [null] },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-fetch-retry-summary-0004',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Fetch Retry Summary)\n\nImplement `solve(input)` where `input = { responses: { ok: boolean, status: number }[], maxRetries: number, retryDelayMs: number }`. Simulate a `fetch` loop with retries. Stop on the first successful response, on the first non-retryable failure, or when retries are exhausted. Treat status `429` and all `5xx` statuses as retryable. Return `{ attempts: number, success: boolean, totalDelay: number, finalStatus: number | null }`.',
    correctExplanation:
      'Walk the response list in order, counting each attempted request. If a response is successful, stop immediately. If it fails with a retryable status such as 429 or any 5xx code, retry only when retries remain; each retry adds `retryDelayMs` to the total delay. Any other failure, such as 400 or 404, stops the loop immediately because retrying would not help. This mirrors a common JavaScript `fetch` retry helper. Time O(n), Space O(1).',
    tests: [
      { input: [{ responses: [{ ok: false, status: 500 }, { ok: false, status: 502 }, { ok: true, status: 200 }], maxRetries: 3, retryDelayMs: 100 }], expected: { attempts: 3, success: true, totalDelay: 200, finalStatus: 200 } },
      { input: [{ responses: [{ ok: false, status: 404 }, { ok: true, status: 200 }], maxRetries: 5, retryDelayMs: 50 }], expected: { attempts: 1, success: false, totalDelay: 0, finalStatus: 404 } },
      { input: [{ responses: [{ ok: false, status: 503 }, { ok: false, status: 503 }, { ok: false, status: 503 }], maxRetries: 1, retryDelayMs: 25 }], expected: { attempts: 2, success: false, totalDelay: 25, finalStatus: 503 } },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-promise-chain-result-0005',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Promise Chain Result)\n\nImplement `solve(input)` where `input = { initial: number, steps: ({ type: "add", value: number } | { type: "multiply", value: number } | { type: "reject", reason: string } | { type: "recover", value: number })[] }`. Simulate a promise chain from left to right. `add` and `multiply` transform the current fulfilled value. `reject` switches the chain into a rejected state. `recover` only applies when the chain is currently rejected, replacing the rejection with the provided fulfilled value. Return the final fulfilled value, or `{ error: reason }` if the chain ends rejected.',
    correctExplanation:
      'Track two pieces of state: whether the chain is fulfilled or rejected, and the current value or error. Fulfilled chains apply `add` and `multiply`; rejected chains ignore those until a `recover` step appears. A later `reject` overrides the current fulfilled value and moves the chain back into the rejected state. This models how `.then(...)` and `.catch(...)` can transform or recover promise chains in JavaScript. Time O(n), Space O(1).',
    tests: [
      { input: [{ initial: 2, steps: [{ type: 'add', value: 3 }, { type: 'multiply', value: 4 }] }], expected: 20 },
      { input: [{ initial: 5, steps: [{ type: 'reject', reason: 'bad' }, { type: 'add', value: 1 }, { type: 'recover', value: 10 }, { type: 'multiply', value: 2 }] }], expected: 20 },
      { input: [{ initial: 1, steps: [{ type: 'add', value: 2 }, { type: 'reject', reason: 'stop' }] }], expected: { error: 'stop' } },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-fetch-json-successes-0006',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Fetch JSON Successes)\n\nImplement `solve(input)` where `input = { responses: { ok: boolean, body: string }[] }`. Each successful response contains JSON text in `body`. Return an array of parsed JSON values from only the successful responses, preserving order.',
    correctExplanation:
      'Filter to responses whose `ok` flag is true, then `JSON.parse` each body and append the parsed value to the output. Ignore unsuccessful responses entirely. This reflects a common JavaScript pattern after `fetch`, where only successful responses are parsed and consumed. Time O(n + total JSON size), Space O(n).',
    tests: [
      { input: [{ responses: [{ ok: true, body: '{"id":1}' }, { ok: false, body: '{"id":2}' }, { ok: true, body: '[1,2]' }] }], expected: [{ id: 1 }, [1, 2]] },
      { input: [{ responses: [{ ok: false, body: 'null' }] }], expected: [] },
      { input: [{ responses: [] }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-await-with-timeout-0007',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Await With Timeout)\n\nImplement `solve(input)` where `input = { tasks: { label: string, duration: number }[], timeoutMs: number }`. Each task is awaited individually with a timeout. Return an array where each entry is the task label if it finishes within `timeoutMs`, or the string `"timeout:" + label` otherwise.',
    correctExplanation:
      'Compare each task duration against the timeout threshold independently. In JavaScript this models wrapping each awaited task with a timeout helper built from `Promise.race`. Tasks whose duration is less than or equal to the timeout succeed; longer tasks time out. Preserve input order in the returned array. Time O(n), Space O(n).',
    tests: [
      { input: [{ tasks: [{ label: 'a', duration: 50 }, { label: 'b', duration: 120 }, { label: 'c', duration: 100 }], timeoutMs: 100 }], expected: ['a', 'timeout:b', 'c'] },
      { input: [{ tasks: [{ label: 'slow', duration: 5 }], timeoutMs: 1 }], expected: ['timeout:slow'] },
      { input: [{ tasks: [], timeoutMs: 10 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-javascript-hard-callback-waterfall-time-0008',
    difficulty: 'hard',
    prompt:
      'JavaScript Raw Coding (Callback Waterfall Time)\n\nImplement `solve(input)` where `input = { steps: { duration: number, error: string | null }[] }`. A callback waterfall runs each step only if the previous one succeeded. Return `{ completedSteps, totalTime, error }`, where `error` is the first non-null error encountered or `null` if all steps succeed.',
    correctExplanation:
      'Walk the steps from left to right, adding each duration to the running time as the step executes. If a step has a non-null error, stop immediately after counting that step and return the first error. Otherwise continue until all steps complete. This mirrors classic callback waterfall control flow in JavaScript where later work never begins after a failure. Time O(n), Space O(1).',
    tests: [
      { input: [{ steps: [{ duration: 10, error: null }, { duration: 20, error: null }, { duration: 5, error: 'boom' }, { duration: 99, error: null }] }], expected: { completedSteps: 3, totalTime: 35, error: 'boom' } },
      { input: [{ steps: [{ duration: 7, error: null }] }], expected: { completedSteps: 1, totalTime: 7, error: null } },
      { input: [{ steps: [] }], expected: { completedSteps: 0, totalTime: 0, error: null } },
    ],
  },
]

export default data
