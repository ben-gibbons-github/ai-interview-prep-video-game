import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-backend-medium-rate-limit-window-0001',
    difficulty: 'medium',
    prompt:
      'Backend Coding Challenge (Sliding Window Rate Limiter)\n\nImplement `solve(input)` where `input = { limit: number, windowMs: number, timestamps: number[] }`. Return a boolean array with one entry per timestamp in the same order. For each request time `t`, the request is allowed iff the number of previously allowed requests in the inclusive window `[t - windowMs + 1, t]` is strictly less than `limit`. If allowed, include this request in future windows; if denied, do not include it.',
    correctExplanation:
      'Treat this as a moving time window problem. At each request time t, you only care about previously allowed requests whose timestamps are still inside the inclusive window [t - windowMs + 1, t]. A standard approach is a queue of allowed timestamps. For each t: (1) pop from the front while timestamp < (t - windowMs + 1), because those are now outside the window, (2) if queue.length < limit, allow this request (true) and push t, otherwise deny it (false). Important: denied requests are not pushed, because they should not consume future capacity.\n\nWalkthrough for test 1: limit=2, windowMs=1000, timestamps=[0,100,200,1200,1300].\n- t=0, window=[-999,0], queue=[] -> allow, queue=[0]\n- t=100, window=[-899,100], queue=[0] -> allow, queue=[0,100]\n- t=200, window=[-799,200], queue=[0,100] has 2 already -> deny, queue unchanged\n- t=1200, window=[201,1200], remove 0 and 100 (both expired), queue=[] -> allow, queue=[1200]\n- t=1300, window=[301,1300], queue=[1200] -> allow, queue=[1200,1300]\nResult: [true,true,false,true,true].\n\nComplexity: O(n) total time across all requests because each timestamp enters and leaves the queue once, and O(limit) to O(n) space depending on input pattern.',
    tests: [
      { input: [{ limit: 2, windowMs: 1000, timestamps: [0, 100, 200, 1200, 1300] }], expected: [true, true, false, true, true] },
      { input: [{ limit: 1, windowMs: 10, timestamps: [5, 10, 15] }], expected: [true, false, true] },
      { input: [{ limit: 3, windowMs: 100, timestamps: [1, 2, 3, 4] }], expected: [true, true, true, false] },
    ],
  },
  {
    id: 'raw-coding-backend-medium-upsert-merge-0002',
    difficulty: 'medium',
    prompt:
      'Backend Coding Challenge (Upsert Merge by id)\n\nImplement solve(input) where input = { existing: { id: string, value: number }[], updates: { id: string, value: number }[] }. Return a new array after applying updates by id; existing ids are replaced, new ids are appended in update order.',
    correctExplanation:
      'Use a map from id -> index for existing items, clone the existing list, then process updates in order. If id already exists, replace that entry. If id does not exist, push to the end and update the map. This keeps replacement stable and append order deterministic.',
    tests: [
      { input: [{ existing: [{ id: 'a', value: 1 }, { id: 'b', value: 2 }], updates: [{ id: 'b', value: 7 }, { id: 'c', value: 3 }] }], expected: [{ id: 'a', value: 1 }, { id: 'b', value: 7 }, { id: 'c', value: 3 }] },
      { input: [{ existing: [], updates: [{ id: 'x', value: 9 }] }], expected: [{ id: 'x', value: 9 }] },
      { input: [{ existing: [{ id: 'k', value: 4 }], updates: [] }], expected: [{ id: 'k', value: 4 }] },
    ],
  },
  {
    id: 'raw-coding-backend-medium-sliding-error-rate-0003',
    difficulty: 'medium',
    prompt:
      'Backend Coding Challenge (Sliding Error Rate)\n\nImplement solve(input) where input = { events: { ok: boolean }[], window: number }. For each position i, return the error rate in the trailing window of size window ending at i as a decimal rounded to 2 digits.',
    correctExplanation:
      'Maintain counts of total and failed events in a moving window. As you advance i, add current event, and if window exceeded, remove event i-window. Error rate is failed/total for current window size; round with Number((rate).toFixed(2)).',
    tests: [
      { input: [{ events: [{ ok: true }, { ok: false }, { ok: false }, { ok: true }], window: 2 }], expected: [0, 0.5, 1, 0.5] },
      { input: [{ events: [{ ok: false }, { ok: false }, { ok: true }], window: 3 }], expected: [1, 1, 0.67] },
      { input: [{ events: [], window: 3 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-backend-medium-session-dedup-0004',
    difficulty: 'medium',
    prompt:
      'Backend Coding Challenge (Session Dedup by Latest Timestamp)\n\nYou are processing analytics sessions from multiple ingestion passes. The same session id may appear more than once, but only the newest record should survive.\n\nImplement solve(input) where input = { sessions: { id: string, userId: string, updatedAt: number }[] }.\n\nReturn an array of sessions containing only the latest record per id, sorted by updatedAt descending, then id ascending for ties. If two entries share the same id, keep the one with the greatest updatedAt. If updatedAt is equal, keep the last one in the input.\n\nThis models a common backend merge step for eventually consistent session state.',
    correctExplanation:
      'Track the best record for each session id while scanning the array. A record wins if it has a larger updatedAt, or if updatedAt is equal and it appears later in the input. After deduplication, sort the surviving sessions by updatedAt descending and use id as a tie-breaker to keep the output deterministic.',
    tests: [
      { input: [{ sessions: [{ id: 's1', userId: 'u1', updatedAt: 10 }, { id: 's2', userId: 'u2', updatedAt: 12 }, { id: 's1', userId: 'u1', updatedAt: 15 }] }], expected: [{ id: 's1', userId: 'u1', updatedAt: 15 }, { id: 's2', userId: 'u2', updatedAt: 12 }] },
      { input: [{ sessions: [{ id: 'x', userId: 'a', updatedAt: 5 }, { id: 'y', userId: 'b', updatedAt: 5 }] }], expected: [{ id: 'x', userId: 'a', updatedAt: 5 }, { id: 'y', userId: 'b', updatedAt: 5 }] },
      { input: [{ sessions: [] }], expected: [] },
    ],
  },
]

export default data
