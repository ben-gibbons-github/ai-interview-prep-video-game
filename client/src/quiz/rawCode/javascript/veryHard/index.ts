import type { RawCodingQuestionData } from '../../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-javascript-very-hard-lru-cache-0001',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (LRU Cache)\n\nDesign an LRU (Least Recently Used) cache simulator.\n\nImplement `solve(input)` where `input = { capacity: number, operations: { type: string, key: string, value?: any }[] }`.\n\nBehavior:\n- `set(key, value)`: insert or update key and mark it most-recently-used.\n- `get(key)`: return the value and mark key most-recently-used; return `null` if missing.\n- If insertion exceeds `capacity`, evict the least-recently-used key first.\n\nReturn:\n- An array containing one entry per `get` operation in order.\n- Ignore `set` in the return output.\n\nLiveCode-style notes:\n- `capacity >= 1`.\n- Operation count can be large, so target O(1) average time per operation.\n- Recency updates must happen on both successful `get` and `set`.',
    correctExplanation:
      'Use a Map to represent the cache because Map preserves insertion order. On `get`, if the key exists, remove it and insert it again so it becomes the most recently used entry. On `set`, update an existing key the same way; if the cache is full, delete the oldest key, which is the first key in Map iteration order. This is the standard JavaScript LRU pattern. Time O(1) average per operation, Space O(capacity).',
    tests: [
      { input: [{ capacity: 2, operations: [{ type: 'set', key: 'a', value: 1 }, { type: 'set', key: 'b', value: 2 }, { type: 'get', key: 'a' }, { type: 'set', key: 'c', value: 3 }, { type: 'get', key: 'b' }, { type: 'get', key: 'c' }] }], expected: [1, null, 3] },
      { input: [{ capacity: 1, operations: [{ type: 'set', key: 'x', value: 9 }, { type: 'get', key: 'x' }, { type: 'set', key: 'y', value: 8 }, { type: 'get', key: 'x' }, { type: 'get', key: 'y' }] }], expected: [9, null, 8] },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-deep-equal-0002',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Deep Equality)\n\nImplement structural deep-equality for JSON-like values.\n\nImplement `solve(input)` where `input = { left: any, right: any }`.\n\nEquality rules:\n- Primitive values compare by value.\n- Arrays compare by length and element order, recursively.\n- Plain objects compare by key set and per-key value recursively.\n- Object key order does not matter.\n- `null` is a valid value.\n\nReturn:\n- `true` if structures are deeply equal under the rules above; otherwise `false`.\n\nLiveCode-style notes:\n- Assume acyclic inputs (no circular references).\n- Target O(n) over visited nodes where possible.\n- Be explicit about array-vs-object handling.',
    correctExplanation:
      'Compare types first. If the values are primitives, compare directly. If they are arrays, compare length and then compare each element recursively. If they are plain objects, compare the set of keys and then compare values for every key recursively. The order of object keys does not matter. This is a classic JavaScript interview problem because plain `===` only checks reference equality for objects. Time O(n) over visited structure size, Space O(d) for recursion depth.',
    tests: [
      { input: [{ left: { a: [1, 2], b: { c: 3 } }, right: { b: { c: 3 }, a: [1, 2] } }], expected: true },
      { input: [{ left: [1, { x: 2 }], right: [1, { x: 3 }] }], expected: false },
      { input: [{ left: null, right: null }], expected: true },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-rate-limiter-0003',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Rate Limiter)\n\nImplement a per-user sliding-window rate limiter.\n\nImplement `solve(input)` where `input = { requests: { userId: string, at: number }[], limit: number, windowMs: number }`.\n\nPolicy:\n- For each request, consider only prior accepted requests for the same user whose timestamp is inside the active window.\n- If accepted-count in window is `< limit`, accept current request; otherwise reject.\n- Window is evaluated relative to each request timestamp.\n\nReturn:\n- A boolean array aligned with `requests`, where each entry indicates allow/reject for that request.\n\nLiveCode-style notes:\n- Requests are processed in given order.\n- Timestamps are numeric and can be large.\n- Use an efficient queue/deque-like cleanup approach per user.',
    correctExplanation:
      'Track recent request timestamps for each user in a queue-like structure. When a new request arrives, remove timestamps that are older than the current window, then check how many remain. If the number of active requests is below the limit, allow the request and record its timestamp; otherwise reject it. This is the usual sliding-window rate limiting strategy in JavaScript. The key is to keep only timestamps that still fall inside the active time window.',
    tests: [
      { input: [{ limit: 2, windowMs: 10, requests: [{ userId: 'u1', at: 0 }, { userId: 'u1', at: 1 }, { userId: 'u1', at: 2 }, { userId: 'u1', at: 11 }] }], expected: [true, true, false, true] },
      { input: [{ limit: 1, windowMs: 5, requests: [{ userId: 'a', at: 0 }, { userId: 'b', at: 1 }, { userId: 'a', at: 6 }] }], expected: [true, true, true] },
      { input: [{ limit: 3, windowMs: 100, requests: [{ userId: 'x', at: 0 }, { userId: 'x', at: 10 }, { userId: 'x', at: 20 }] }], expected: [true, true, true] },
    ],
  },

  {
    id: 'raw-coding-javascript-very-hard-promise-any-0004',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Promise.any Result)\n\nModel `Promise.any` semantics from already-settled result records.\n\nImplement `solve(input)` where `input = { promises: { status: string, value?: any, reason?: any }[] }`.\n\nSemantics:\n- Find the first record in input order with `status === "fulfilled"` and return its `value`.\n- If no fulfilled record exists, return `{ errors: any[] }` with rejection reasons in input order.\n\nReturn:\n- Either a fulfilled value (any type) or an error object containing aggregated reasons.\n\nLiveCode-style notes:\n- This is a deterministic model, not real async scheduling.\n- Distinguish from `Promise.race`: rejections do not short-circuit if a later fulfillment exists.\n- Handle empty arrays as all-rejected with empty `errors`.',
    correctExplanation:
      'This mirrors the behavior of `Promise.any`, except the promises are already represented as settled records. Scan the array from left to right and return as soon as you find the first fulfilled entry. If no fulfillment exists, gather each rejection reason into an `errors` array. The key distinction from `Promise.race` is that rejections do not immediately end the search if a later fulfillment exists. Time O(n), Space O(n) only in the all-rejected case.',
    tests: [
      { input: [{ promises: [{ status: 'rejected', reason: 'x' }, { status: 'fulfilled', value: 42 }, { status: 'fulfilled', value: 99 }] }], expected: 42 },
      { input: [{ promises: [{ status: 'rejected', reason: 'timeout' }, { status: 'rejected', reason: 'offline' }] }], expected: { errors: ['timeout', 'offline'] } },
      { input: [{ promises: [{ status: 'fulfilled', value: { ok: true } }] }], expected: { ok: true } },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-promise-all-timeline-0005',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Promise.all Timeline)\n\nSimulate completion timing for `Promise.all` with pre-defined outcomes.\n\nImplement `solve(input)` where `input = { promises: { duration: number, status: string, value?: any, reason?: any }[] }`. Assume all promises start at time `0`.\n\nSemantics:\n- If all are fulfilled: combined result is fulfilled at `max(duration)` with values in original order.\n- If any reject: combined result rejects at the earliest rejection time with that rejection reason.\n\nReturn:\n- `{ status, completedAt, value?, reason? }` with exactly one of `value` or `reason` populated.\n\nLiveCode-style notes:\n- Empty input fulfills immediately at time `0` with `value: []`.\n- When multiple rejections tie on earliest duration, use input order for tie-break.',
    correctExplanation:
      'For `Promise.all`, every promise begins immediately. If any promise rejects, the combined promise rejects at the earliest rejection time with that rejection reason. If all fulfill, the combined promise fulfills at the maximum duration because it must wait for the slowest promise, and the fulfillment values stay in the original input order. This is a good JavaScript reasoning problem because timing and ordering are easy to confuse. Time O(n), Space O(n).',
    tests: [
      { input: [{ promises: [{ duration: 3, status: 'fulfilled', value: 'a' }, { duration: 5, status: 'fulfilled', value: 'b' }] }], expected: { status: 'fulfilled', completedAt: 5, value: ['a', 'b'] } },
      { input: [{ promises: [{ duration: 7, status: 'fulfilled', value: 1 }, { duration: 2, status: 'rejected', reason: 'bad' }, { duration: 4, status: 'rejected', reason: 'later' }] }], expected: { status: 'rejected', completedAt: 2, reason: 'bad' } },
      { input: [{ promises: [] }], expected: { status: 'fulfilled', completedAt: 0, value: [] } },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-await-batched-groups-0006',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Await Batched Groups)\n\nCompute total runtime of batched concurrency execution.\n\nImplement `solve(input)` where `input = { durations: number[], batchSize: number }`.\n\nExecution model:\n- Partition tasks in order into consecutive batches of size `batchSize` (last batch may be smaller).\n- Tasks within a batch run concurrently (`Promise.all` semantics).\n- Next batch starts only after current batch fully completes.\n\nReturn:\n- Total completion time across all batches.\n\nLiveCode-style notes:\n- Batch time is the max duration in that batch.\n- Total time is sum of per-batch maxima.\n- Assume `batchSize >= 1` and durations are non-negative.',
    correctExplanation:
      'Split the durations into consecutive batches. Inside a batch, tasks run at the same time, so the batch finishes when its longest task finishes. Because the next batch waits for the current batch, the total time is the sum of each batch maximum. This models a common `for` loop with `await Promise.all(batch)` in JavaScript. Time O(n), Space O(1) beyond the input.',
    tests: [
      { input: [{ durations: [2, 5, 1, 4], batchSize: 2 }], expected: 9 },
      { input: [{ durations: [3, 3, 3], batchSize: 5 }], expected: 3 },
      { input: [{ durations: [7, 1, 2, 8, 1], batchSize: 1 }], expected: 19 },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-fetch-pagination-0007',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Fetch Pagination Summary)\n\nSimulate cursor-based pagination consumption and summarize results.\n\nImplement `solve(input)` where `input = { pages: { items: any[], nextCursor: string | null }[] }`.\n\nBehavior:\n- Consume pages in order starting from index 0.\n- Stop immediately after consuming the first page whose `nextCursor` is `null`.\n- Any records after the stop point are ignored.\n\nReturn:\n- `{ totalItems, cursorsVisited }`\n- `totalItems`: sum of item counts in consumed pages.\n- `cursorsVisited`: number of consumed pages.\n\nLiveCode-style notes:\n- Empty `pages` returns `{ totalItems: 0, cursorsVisited: 0 }`.\n- A first page with `nextCursor: null` means exactly one page visit.',
    correctExplanation:
      'Iterate over the page list in order, counting items and consumed pages. Stop after processing the first page whose `nextCursor` is null because pagination would end there in a real `fetch` loop. Ignore any extra page records after that stop point. This models a common JavaScript pagination helper that keeps requesting pages until the cursor disappears. Time O(n + total items), Space O(1).',
    tests: [
      { input: [{ pages: [{ items: [1, 2], nextCursor: 'a' }, { items: [3], nextCursor: 'b' }, { items: [4, 5, 6], nextCursor: null }] }], expected: { totalItems: 6, cursorsVisited: 3 } },
      { input: [{ pages: [{ items: [], nextCursor: null }, { items: [1], nextCursor: null }] }], expected: { totalItems: 0, cursorsVisited: 1 } },
      { input: [{ pages: [] }], expected: { totalItems: 0, cursorsVisited: 0 } },
    ],
  },
  {
    id: 'raw-coding-javascript-very-hard-promise-throttle-schedule-0008',
    difficulty: 'veryHard',
    prompt:
      'JavaScript Raw Coding (Promise Throttle Schedule)\n\nSchedule tasks under a fixed concurrency limit and report finish times.\n\nImplement `solve(input)` where `input = { tasks: { label: string, duration: number }[], limit: number }`.\n\nScheduling rules:\n- Process tasks in input order.\n- At most `limit` tasks can run concurrently.\n- Assign each new task to the earliest-available slot/worker.\n- A task finishes at `slotAvailableTime + duration`, then updates that slot availability.\n\nReturn:\n- An object mapping each task `label` to its finish time.\n\nLiveCode-style notes:\n- Assume labels are unique.\n- If `tasks` is empty, return `{}`.\n- Target O(n log limit) with a min-heap of slot availability times.',
    correctExplanation:
      'Schedule tasks in input order onto the earliest available of `limit` running slots. Each task finishes at its assigned slot availability plus its duration, then that slot becomes free at the new finish time. This is the same core logic as a throttled promise pool, but the output keeps per-task finish times instead of only the total makespan. Time O(n log limit) with a min-heap, Space O(limit + n).',
    tests: [
      { input: [{ tasks: [{ label: 'a', duration: 5 }, { label: 'b', duration: 2 }, { label: 'c', duration: 4 }], limit: 2 }], expected: { a: 5, b: 2, c: 6 } },
      { input: [{ tasks: [{ label: 'x', duration: 3 }, { label: 'y', duration: 3 }, { label: 'z', duration: 3 }, { label: 'w', duration: 3 }], limit: 2 }], expected: { x: 3, y: 3, z: 6, w: 6 } },
      { input: [{ tasks: [], limit: 3 }], expected: {} },
    ],
  },
]

export default data
