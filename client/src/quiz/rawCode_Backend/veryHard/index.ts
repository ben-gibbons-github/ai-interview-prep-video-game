import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-backend-very-hard-idempotency-0001',
    difficulty: 'veryHard',
    prompt:
      'Backend Coding Challenge (Idempotency Key Handling)\n\nImplement solve(input) where input = { requests: { key: string, payloadHash: string }[] }. Return statuses per request: FIRST_SEEN for first key, REPLAY for same key with same payloadHash, CONFLICT for same key with different payloadHash.',
    correctExplanation:
      'Track the first payload hash observed for each idempotency key. When a key appears for the first time, mark it as FIRST_SEEN and store its payload hash. If the same key appears again with the same payload hash, return REPLAY because the request is a safe retry. If the same key appears with a different payload hash, return CONFLICT because the client reused the idempotency key for a different operation. Example: [k1:a, k1:a, k1:b] becomes [FIRST_SEEN, REPLAY, CONFLICT].',
    tests: [
      { input: [{ requests: [{ key: 'k1', payloadHash: 'a' }, { key: 'k1', payloadHash: 'a' }, { key: 'k1', payloadHash: 'b' }] }], expected: ['FIRST_SEEN', 'REPLAY', 'CONFLICT'] },
      { input: [{ requests: [{ key: 'x', payloadHash: '1' }, { key: 'y', payloadHash: '2' }, { key: 'x', payloadHash: '1' }] }], expected: ['FIRST_SEEN', 'FIRST_SEEN', 'REPLAY'] },
      { input: [{ requests: [] }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-backend-very-hard-token-bucket-0002',
    difficulty: 'veryHard',
    prompt:
      'Backend Coding Challenge (Token Bucket Simulation)\n\nImplement solve(input) where input = { capacity: number, refillPerSec: number, events: { atMs: number, cost: number }[] }. Starting full, process events in order and return boolean[] allowed/denied. Tokens refill continuously between events.',
    correctExplanation:
      'Track current tokens and last timestamp. Before each event, add refill based on elapsed time: tokens += refillPerSec * (deltaMs/1000), capped at capacity. If tokens >= cost, allow and subtract cost; otherwise deny. Use floating point math for partial token refills.',
    tests: [
      { input: [{ capacity: 5, refillPerSec: 1, events: [{ atMs: 0, cost: 3 }, { atMs: 500, cost: 3 }, { atMs: 2000, cost: 2 }] }], expected: [true, false, true] },
      { input: [{ capacity: 2, refillPerSec: 2, events: [{ atMs: 0, cost: 2 }, { atMs: 250, cost: 1 }, { atMs: 500, cost: 1 }] }], expected: [true, false, true] },
      { input: [{ capacity: 1, refillPerSec: 0.5, events: [{ atMs: 0, cost: 1 }, { atMs: 1000, cost: 1 }] }], expected: [true, false] },
    ],
  },
  {
    id: 'raw-coding-backend-very-hard-fanout-merge-0003',
    difficulty: 'veryHard',
    prompt:
      'Backend Coding Challenge (Fanout Result Merge)\n\nImplement solve(input) where input = { shards: { source: string, items: { id: string, score: number }[] }[] }. Merge by id keeping max score, and return items sorted by score desc then id asc.',
    correctExplanation:
      'Aggregate across shards using map id -> bestScore via max. Then convert to array and sort by score descending; for equal scores sort id ascending for deterministic output.',
    tests: [
      { input: [{ shards: [{ source: 'a', items: [{ id: 'u1', score: 3 }, { id: 'u2', score: 8 }] }, { source: 'b', items: [{ id: 'u1', score: 5 }, { id: 'u3', score: 2 }] }] }], expected: [{ id: 'u2', score: 8 }, { id: 'u1', score: 5 }, { id: 'u3', score: 2 }] },
      { input: [{ shards: [{ source: 'x', items: [] }] }], expected: [] },
      { input: [{ shards: [{ source: 'a', items: [{ id: 'k', score: 1 }] }, { source: 'b', items: [{ id: 'k', score: 1 }, { id: 'j', score: 1 }] }] }], expected: [{ id: 'j', score: 1 }, { id: 'k', score: 1 }] },
    ],
  },
  {
    id: 'raw-coding-backend-very-hard-partition-rebalance-0004',
    difficulty: 'veryHard',
    prompt:
      'Backend Coding Challenge (Partition Rebalance Plan)\n\nYou are building a rebalance planner for a sharded backend. Each shard has a current load, and you want to identify which shards must move work so the final distribution is as even as possible.\n\nImplement solve(input) where input = { shards: { id: string, load: number }[] }.\n\nReturn an array of shard ids that are strictly above the average load, sorted by load descending and then id ascending. If no shard is above average, return [].\n\nThis does not move work itself; it just identifies the overloaded shards that should donate capacity during a rebalance pass.',
    correctExplanation:
      'First compute the average load across all shards. Then keep only the shards whose load is strictly greater than that average. Sort those overloaded shards by load descending, using id ascending to break ties, and return only the ids. The average should be computed from the full input, not from the filtered subset.',
    tests: [
      { input: [{ shards: [{ id: 'a', load: 10 }, { id: 'b', load: 30 }, { id: 'c', load: 20 }] }], expected: ['b'] },
      { input: [{ shards: [{ id: 'x', load: 5 }, { id: 'y', load: 5 }] }], expected: [] },
      { input: [{ shards: [{ id: 'm', load: 40 }, { id: 'n', load: 10 }, { id: 'o', load: 30 }] }], expected: ['m'] },
    ],
  },
]

export default data
