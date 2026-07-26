import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-backend-insanely-hard-cursor-pagination-0001',
    difficulty: 'insanelyHard',
    prompt:
      'Backend Coding Challenge (Cursor Pagination Slice)\n\nYou are implementing the backend side of a paginated API for a feed, inbox, or search result list. Clients request the next page using a cursor that represents the last item they already saw.\n\nImplement solve(input) where input = { items: string[], cursor: string | null, limit: number }.\n\nReturn { page: string[], nextCursor: string | null }.\n\nRequirements:\n- Cursor is the value of the last item previously returned to the client.\n- If cursor is null, begin at the start of the array.\n- If cursor exists in items, start after that item.\n- If cursor is missing, fall back to the beginning so the client still gets a stable page instead of failing.\n- Return at most limit items in page.\n- nextCursor should be the last item in the returned page only when more items remain after that page. Otherwise return null.\n\nThink of this as a resilient cursor-based pagination helper rather than offset pagination.',
    correctExplanation:
      'Treat cursor as a marker for the last item the client already saw. If cursor is null, start from index 0. If cursor is found in items, start from the next index after that item. If cursor is missing from the array, fall back to the beginning so the client still gets a stable page. Slice at most limit items. Set nextCursor to the last item in the returned page only when there are more items after that page; otherwise return null. Example: items=[a,b,c,d], cursor=b, limit=2 returns page [c,d] and nextCursor null.',
    tests: [
      { input: [{ items: ['a', 'b', 'c', 'd'], cursor: null, limit: 2 }], expected: { page: ['a', 'b'], nextCursor: 'b' } },
      { input: [{ items: ['a', 'b', 'c', 'd'], cursor: 'b', limit: 2 }], expected: { page: ['c', 'd'], nextCursor: null } },
      { input: [{ items: ['x', 'y'], cursor: 'missing', limit: 1 }], expected: { page: ['x'], nextCursor: 'x' } },
    ],
  },
  {
    id: 'raw-coding-backend-insanely-hard-consistent-hash-route-0002',
    difficulty: 'insanelyHard',
    prompt:
      'Backend Coding Challenge (Consistent Hash Route)\n\nYou are simulating a routing layer for a distributed backend that uses a consistent-hash ring. Each node occupies a point on the ring, and each request should be routed clockwise to the first node at or after the request hash.\n\nImplement solve(input) where input = { ring: number[], keyHashes: number[] }. The ring array is already sorted ascending and contains node positions on the interval [0..359].\n\nReturn an array of ring indexes, one per key hash, using these rules:\n- Route to the first ring point that is greater than or equal to the hash.\n- If the hash is beyond the last ring point, wrap around to index 0.\n- Preserve the order of keyHashes exactly.\n- Return indexes, not ring values.\n\nThis is a lower-bound search with wrap-around behavior, which is the core of many sharding and partitioning systems.',
    correctExplanation:
      'For each key hash, binary search in ring for lower bound (first value >= hash). If found, route there; if not, wrap to index 0. This models consistent hashing clockwise lookup with wrap-around.',
    tests: [
      { input: [{ ring: [10, 90, 150, 300], keyHashes: [5, 10, 149, 359] }], expected: [0, 0, 2, 0] },
      { input: [{ ring: [0, 120, 240], keyHashes: [0, 1, 239, 240] }], expected: [0, 1, 2, 2] },
      { input: [{ ring: [100], keyHashes: [20, 100, 200] }], expected: [0, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-backend-insanely-hard-log-compaction-last-write-0003',
    difficulty: 'insanelyHard',
    prompt:
      'Backend Coding Challenge (Log Compaction Last Write Wins)\n\nYou are implementing a compaction step for an event log, message queue, or key-value replication stream. Multiple updates may exist for the same key, but only the latest one should survive after compaction.\n\nImplement solve(input) where input = { events: { key: string, value: string, offset: number }[] }.\n\nReturn the compacted state as an array of { key, value, offset } objects with these rules:\n- Keep only the event with the highest offset for each key.\n- If the same key appears multiple times, older offsets are discarded.\n- Sort the final array by key ascending for deterministic output.\n- Preserve the winning event\'s value and offset exactly as written.\n\nThis models a classic last-write-wins compaction pass used in durable storage systems and replicated logs.',
    correctExplanation:
      'Track key -> latest event by max offset. After processing all events, emit one record per key and sort by key ascending for deterministic output. This mirrors compaction where only final value per key survives.',
    tests: [
      { input: [{ events: [{ key: 'a', value: '1', offset: 2 }, { key: 'a', value: '2', offset: 5 }, { key: 'b', value: 'x', offset: 3 }] }], expected: [{ key: 'a', value: '2', offset: 5 }, { key: 'b', value: 'x', offset: 3 }] },
      { input: [{ events: [] }], expected: [] },
      { input: [{ events: [{ key: 'k', value: 'old', offset: 10 }, { key: 'k', value: 'new', offset: 9 }] }], expected: [{ key: 'k', value: 'old', offset: 10 }] },
    ],
  },
  {
    id: 'raw-coding-backend-insanely-hard-cold-start-throttle-0004',
    difficulty: 'insanelyHard',
    prompt:
      'Backend Coding Challenge (Cold Start Throttle Plan)\n\nYou are coordinating traffic for a service that should ramp up gradually after a deployment or outage. Each request has a priority and a cost, and only some requests can be admitted in the first recovery window.\n\nImplement solve(input) where input = { requests: { id: string, priority: number, cost: number }[], capacity: number }.\n\nReturn the ids of the requests that fit within capacity when considered in descending priority order, with id ascending as a tie-breaker. Once the sum of accepted request costs would exceed capacity, stop admitting more requests.\n\nThis models a startup throttle gate: select the most important work first, but never exceed the allowed recovery budget.',
    correctExplanation:
      'Sort requests by priority descending and id ascending for deterministic selection. Then walk that ordered list, accumulating cost until the next request would exceed capacity. Include accepted request ids in order and stop as soon as the budget is exhausted. This is a capacity-constrained priority selection problem.',
    tests: [
      { input: [{ requests: [{ id: 'a', priority: 5, cost: 3 }, { id: 'b', priority: 10, cost: 4 }, { id: 'c', priority: 7, cost: 2 }], capacity: 6 }], expected: ['b', 'c'] },
      { input: [{ requests: [{ id: 'x', priority: 1, cost: 10 }, { id: 'y', priority: 2, cost: 1 }], capacity: 5 }], expected: ['y'] },
      { input: [{ requests: [], capacity: 3 }], expected: [] },
    ],
  },
]

export default data
