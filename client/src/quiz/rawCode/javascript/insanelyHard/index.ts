import type { RawCodingQuestionData } from '../../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-javascript-insanely-hard-promise-all-settled-0001',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Promise All Settled Summary)\n\nImplement `solve(input)` where `input = { promises: { status: string, value?: any, reason?: any }[] }`. Return a summary object with counts for fulfilled and rejected items, plus arrays of fulfillment values and rejection reasons in the original order.',
    correctExplanation:
      'Model the input as already-settled promise outcomes. Scan the array once, increment the fulfilled or rejected counter, and append each value or reason to the corresponding output list. The JavaScript angle here is how `Promise.allSettled` preserves every result without short-circuiting. Keep the output deterministic by respecting the original order of the settled items. Time O(n), Space O(n).',
    tests: [
      { input: [{ promises: [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'bad' }, { status: 'fulfilled', value: 3 }] }], expected: { fulfilled: 2, rejected: 1, values: [1, 3], reasons: ['bad'] } },
      { input: [{ promises: [{ status: 'rejected', reason: 'x' }] }], expected: { fulfilled: 0, rejected: 1, values: [], reasons: ['x'] } },
      { input: [{ promises: [] }], expected: { fulfilled: 0, rejected: 0, values: [], reasons: [] } },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-parse-and-evaluate-0002',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Parse and Evaluate Expression)\n\nImplement `solve(input)` where `input = string` containing non-negative integers, `+`, `-`, `*`, `/`, and parentheses. Return the integer result using JavaScript-style truncating division.',
    correctExplanation:
      'Use a recursive descent parser or a shunting-yard style algorithm. Parentheses create a nested sub-expression that must be evaluated before the outer expression continues. Multiplication and division bind tighter than addition and subtraction, and division truncates toward zero. A stack-based solution usually keeps the running total and the most recent term so precedence can be applied without building an AST. This is a good JavaScript challenge because string parsing and integer coercion are both explicit concerns. Time O(n), Space O(n) for recursion or stack state.',
    tests: [
      { input: ['2*(3+4)'], expected: 14 },
      { input: ['18/5 + 2*3'], expected: 9 },
      { input: ['(10-4)*(2+1)'], expected: 18 },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-event-loop-order-0003',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Event Loop Order)\n\nImplement `solve(input)` where `input = { tasks: { type: string, label: string }[] }`. Simulate the execution order for `sync`, `microtask`, and `macrotask` queues and return the labels in the order they would run.',
    correctExplanation:
      'Treat synchronous work as running immediately. Microtasks run after the current synchronous turn finishes and before the next macrotask. Macrotasks run one turn later, after the microtask queue is empty. Process the input in that priority order while preserving FIFO order inside each queue. This captures the core scheduling rule that makes JavaScript event-loop questions tricky. Time O(n), Space O(n).',
    tests: [
      { input: [{ tasks: [{ type: 'sync', label: 'A' }, { type: 'microtask', label: 'B' }, { type: 'macrotask', label: 'C' }, { type: 'microtask', label: 'D' }, { type: 'sync', label: 'E' }] }], expected: ['A', 'E', 'B', 'D', 'C'] },
      { input: [{ tasks: [{ type: 'microtask', label: 'm1' }, { type: 'macrotask', label: 't1' }, { type: 'microtask', label: 'm2' }] }], expected: ['m1', 'm2', 't1'] },
      { input: [{ tasks: [{ type: 'sync', label: 'only' }] }], expected: ['only'] },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-await-concurrency-pool-0004',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Await Concurrency Pool)\n\nImplement `solve(input)` where `input = { durations: number[], limit: number }`. Each duration represents an asynchronous task that takes that many milliseconds once started. Assume you are `await`-ing tasks while allowing at most `limit` tasks to run concurrently. Return the minimum total time needed to finish all tasks.',
    correctExplanation:
      'This is the scheduling problem behind an async concurrency pool. Start up to `limit` tasks immediately, then whenever the earliest running task finishes, start the next waiting task. The total time is the largest completion time after all tasks have been assigned. A min-heap is the cleanest implementation because it always exposes the earliest finishing slot, though a sorted list also works for small inputs. Time O(n log limit) with a heap, Space O(limit).',
    tests: [
      { input: [{ durations: [5, 2, 4], limit: 2 }], expected: 6 },
      { input: [{ durations: [3, 3, 3, 3], limit: 2 }], expected: 6 },
      { input: [{ durations: [10, 1, 1], limit: 1 }], expected: 12 },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-promise-race-timeline-0005',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Promise.race Timeline)\n\nImplement `solve(input)` where `input = { promises: { duration: number, status: string, value?: any, reason?: any }[] }`. All promises start at time 0. Return `{ status, settledAt, value?, reason? }` for `Promise.race` semantics. If multiple promises settle at the same earliest time, choose the one that appears first in the array.',
    correctExplanation:
      'Find the smallest duration because `Promise.race` settles as soon as the earliest promise settles, regardless of whether it fulfills or rejects. If several promises tie on time, preserve input order and choose the first one. Then return either the fulfilled value or rejection reason from that winning entry. The subtle part is that a fast rejection beats a slower fulfillment. Time O(n), Space O(1).',
    tests: [
      { input: [{ promises: [{ duration: 5, status: 'fulfilled', value: 'slow' }, { duration: 2, status: 'rejected', reason: 'fast-fail' }, { duration: 3, status: 'fulfilled', value: 'mid' }] }], expected: { status: 'rejected', settledAt: 2, reason: 'fast-fail' } },
      { input: [{ promises: [{ duration: 1, status: 'fulfilled', value: 'a' }, { duration: 1, status: 'rejected', reason: 'b' }] }], expected: { status: 'fulfilled', settledAt: 1, value: 'a' } },
      { input: [{ promises: [{ duration: 4, status: 'fulfilled', value: 9 }] }], expected: { status: 'fulfilled', settledAt: 4, value: 9 } },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-await-dependency-graph-0006',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Await Dependency Graph Time)\n\nImplement `solve(input)` where `input = { tasks: { id: string, duration: number, dependsOn: string[] }[] }`. A task can start only after all tasks in `dependsOn` are complete. Independent tasks may run concurrently. Return the minimum total time required to finish all tasks.',
    correctExplanation:
      'This is the completion time of a dependency DAG under unlimited parallelism. The finish time of a task is its own duration plus the maximum finish time among its dependencies, or just its duration if it has none. Compute finish times with memoized DFS or topological dynamic programming, then return the maximum finish time across all tasks. This maps well to async workflows in JavaScript where `await` enforces dependency edges but unrelated work can still run in parallel. Time O(n + e), Space O(n + e).',
    tests: [
      { input: [{ tasks: [{ id: 'a', duration: 3, dependsOn: [] }, { id: 'b', duration: 4, dependsOn: ['a'] }, { id: 'c', duration: 2, dependsOn: ['a'] }] }], expected: 7 },
      { input: [{ tasks: [{ id: 'x', duration: 5, dependsOn: [] }, { id: 'y', duration: 1, dependsOn: [] }, { id: 'z', duration: 4, dependsOn: ['x', 'y'] }] }], expected: 9 },
      { input: [{ tasks: [{ id: 'solo', duration: 6, dependsOn: [] }] }], expected: 6 },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-microtask-checkpoint-order-0007',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Microtask Checkpoint Order)\n\nImplement `solve(input)` where `input = { steps: { type: string, label: string }[] }`. The supported step types are `sync`, `queueMicrotask`, and `setTimeout`. Simulate execution order assuming all steps are scheduled during a single initial script turn and that microtasks drain completely before timers run. Return the labels in execution order.',
    correctExplanation:
      'Synchronous steps execute immediately as the script is being evaluated. Calls represented by `queueMicrotask` are deferred until the current synchronous turn completes, and they then run FIFO before any timers. `setTimeout` callbacks run afterward, also in FIFO order. This captures the checkpoint rule behind many JavaScript event loop questions. Time O(n), Space O(n).',
    tests: [
      { input: [{ steps: [{ type: 'sync', label: 'A' }, { type: 'queueMicrotask', label: 'B' }, { type: 'setTimeout', label: 'C' }, { type: 'sync', label: 'D' }] }], expected: ['A', 'D', 'B', 'C'] },
      { input: [{ steps: [{ type: 'queueMicrotask', label: 'm1' }, { type: 'queueMicrotask', label: 'm2' }, { type: 'setTimeout', label: 't1' }] }], expected: ['m1', 'm2', 't1'] },
      { input: [{ steps: [{ type: 'setTimeout', label: 'only' }] }], expected: ['only'] },
    ],
  },
  {
    id: 'raw-coding-javascript-insanely-hard-fetch-backoff-plan-0008',
    difficulty: 'insanelyHard',
    prompt:
      'JavaScript Raw Coding (Fetch Exponential Backoff Plan)\n\nImplement `solve(input)` where `input = { failures: number, baseDelay: number, maxDelay: number }`. Return an array of retry delays using exponential backoff for each failure: `baseDelay * 2^i`, capped at `maxDelay`.',
    correctExplanation:
      'Generate one delay per failure attempt. For attempt index `i`, compute `baseDelay * 2^i` and cap it at `maxDelay` before appending it to the result. This models a common JavaScript `fetch` retry strategy with exponential backoff and a ceiling to prevent unbounded waits. Time O(n), Space O(n).',
    tests: [
      { input: [{ failures: 5, baseDelay: 100, maxDelay: 1000 }], expected: [100, 200, 400, 800, 1000] },
      { input: [{ failures: 3, baseDelay: 50, maxDelay: 60 }], expected: [50, 60, 60] },
      { input: [{ failures: 0, baseDelay: 10, maxDelay: 100 }], expected: [] },
    ],
  },
]

export default data
