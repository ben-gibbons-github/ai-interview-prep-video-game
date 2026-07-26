import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-hard-rest-idempotency-decision-0001',
    difficulty: 'hard',
    prompt:
      'Raw Coding REST (Idempotency Decision)\n\nImplement `solve(input)` where `input = { existing: { key: string, payloadHash: string }[], request: { key: string, payloadHash: string } }`.\n\nReturn:\n- `"new"` if key was never seen\n- `"replay"` if same key and same payloadHash exists\n- `"conflict"` if same key exists with a different payloadHash.',
    correctExplanation:
      'Lookup by key and compare payload hashes for replay safety versus conflict detection. Time O(n), Space O(1) or O(n) if indexed map is built.',
    tests: [
      {
        input: [{ existing: [{ key: 'k1', payloadHash: 'h1' }], request: { key: 'k2', payloadHash: 'h9' } }],
        expected: 'new',
      },
      {
        input: [{ existing: [{ key: 'k1', payloadHash: 'h1' }], request: { key: 'k1', payloadHash: 'h1' } }],
        expected: 'replay',
      },
      {
        input: [{ existing: [{ key: 'k1', payloadHash: 'h1' }], request: { key: 'k1', payloadHash: 'h2' } }],
        expected: 'conflict',
      },
    ],
  },
  {
    id: 'raw-coding-hard-rest-conditional-get-0002',
    difficulty: 'hard',
    prompt:
      'Raw Coding REST (Conditional GET)\n\nImplement `solve(input)` where `input = { currentEtag: string, ifNoneMatch: string | null }`. Return status code `304` if `ifNoneMatch` exactly equals `currentEtag`; otherwise return `200`.',
    correctExplanation:
      'Conditional GET can return 304 Not Modified when validators match, avoiding full payload transfer. Time O(1), Space O(1).',
    tests: [
      { input: [{ currentEtag: '"v1"', ifNoneMatch: '"v1"' }], expected: 304 },
      { input: [{ currentEtag: '"v2"', ifNoneMatch: '"v1"' }], expected: 200 },
      { input: [{ currentEtag: 'abc', ifNoneMatch: null }], expected: 200 },
    ],
  },
  {
    id: 'raw-coding-hard-rest-rate-limit-window-0003',
    difficulty: 'hard',
    prompt:
      'Raw Coding REST (Sliding Window Rate Limit)\n\nImplement `solve(input)` where `input = { acceptedTimestamps: number[], requestTimestamp: number, windowSeconds: number, limit: number }`.\n\n`acceptedTimestamps` are epoch seconds for previously accepted requests. Return `true` if the new request should be accepted under a sliding window policy; otherwise `false`. A request counts if `timestamp > requestTimestamp - windowSeconds`.',
    correctExplanation:
      'Count accepted requests within the active window and compare to limit. This models a basic sliding-window limiter. Time O(n), Space O(1).',
    tests: [
      { input: [{ acceptedTimestamps: [100, 105, 109], requestTimestamp: 110, windowSeconds: 10, limit: 3 }], expected: false },
      { input: [{ acceptedTimestamps: [100, 105], requestTimestamp: 110, windowSeconds: 10, limit: 3 }], expected: true },
      { input: [{ acceptedTimestamps: [80, 85], requestTimestamp: 100, windowSeconds: 10, limit: 1 }], expected: true },
    ],
  },
  {
    id: 'raw-coding-hard-rest-bulk-outcome-0004',
    difficulty: 'hard',
    prompt:
      'Raw Coding REST (Bulk Response Classification)\n\nImplement `solve(input)` where `input = { items: { id: string, status: number }[], retryableStatuses: number[] }`. Return `{ successIds, retryIds, failedIds }` where:\n- successIds: status in [200..299]\n- retryIds: status is in retryableStatuses\n- failedIds: everything else',
    correctExplanation:
      'Classify each item by status class and retry policy so clients can retry only the right subset. Time O(n + r), Space O(n).',
    tests: [
      {
        input: [{ items: [{ id: 'a', status: 200 }, { id: 'b', status: 503 }, { id: 'c', status: 422 }], retryableStatuses: [429, 503] }],
        expected: { successIds: ['a'], retryIds: ['b'], failedIds: ['c'] },
      },
      {
        input: [{ items: [{ id: 'x', status: 201 }, { id: 'y', status: 429 }], retryableStatuses: [429] }],
        expected: { successIds: ['x'], retryIds: ['y'], failedIds: [] },
      },
      {
        input: [{ items: [{ id: 'm', status: 400 }], retryableStatuses: [503] }],
        expected: { successIds: [], retryIds: [], failedIds: ['m'] },
      },
    ],
  },
]

export default data
