import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-backend-easy-status-group-0001',
    difficulty: 'easy',
    prompt:
      'Backend Coding Challenge (Group Status Codes)\n\nImplement solve(input) where input = number[] HTTP status codes. Return { ok: number, clientError: number, serverError: number } based on 2xx, 4xx, 5xx counts.',
    correctExplanation:
      'Scan the list once and classify each code into a bucket. Count 200-299 as ok, 400-499 as clientError, and 500-599 as serverError. Ignore everything else for this question. Return an object with all three counters. Example: [200,201,404,500,503] becomes { ok: 2, clientError: 1, serverError: 2 }.',
    tests: [
      { input: [[200, 201, 404, 500, 503]], expected: { ok: 2, clientError: 1, serverError: 2 } },
      { input: [[301, 302]], expected: { ok: 0, clientError: 0, serverError: 0 } },
      { input: [[]], expected: { ok: 0, clientError: 0, serverError: 0 } },
    ],
  },
  {
    id: 'raw-coding-backend-easy-normalize-header-map-0002',
    difficulty: 'easy',
    prompt:
      'Backend Coding Challenge (Normalize Header Map)\n\nImplement solve(input) where input = Record<string, string>. Return a new object where all keys are lowercased and trimmed. If duplicate keys collide after normalization, keep the last value.',
    correctExplanation:
      'Iterate over all entries, normalize each key by trim() + toLowerCase(), then assign into a new object. Later assignments overwrite earlier ones, so the last value wins for collisions like "Content-Type" and " content-type ". Time O(n), space O(n).',
    tests: [
      { input: [{ 'Content-Type': 'json', ' content-type ': 'xml', Authorization: 'token' }], expected: { 'content-type': 'xml', authorization: 'token' } },
      { input: [{ Host: 'api.local' }], expected: { host: 'api.local' } },
      { input: [{}], expected: {} },
    ],
  },
  {
    id: 'raw-coding-backend-easy-latency-buckets-0003',
    difficulty: 'easy',
    prompt:
      'Backend Coding Challenge (Latency Buckets)\n\nImplement solve(input) where input = number[] latencies in ms. Return { lt100: number, lt500: number, gte500: number } with counts for <100, [100..499], and >=500.',
    correctExplanation:
      'Scan once and increment one of three counters per latency. Values <100 go to lt100, values from 100 up to 499 go to lt500, and values >=500 go to gte500. Return all counters even when 0.',
    tests: [
      { input: [[20, 99, 100, 300, 499, 500]], expected: { lt100: 2, lt500: 3, gte500: 1 } },
      { input: [[700, 900]], expected: { lt100: 0, lt500: 0, gte500: 2 } },
      { input: [[]], expected: { lt100: 0, lt500: 0, gte500: 0 } },
    ],
  },
  {
    id: 'raw-coding-backend-easy-feature-flag-counts-0004',
    difficulty: 'easy',
    prompt:
      'Backend Coding Challenge (Feature Flag Counts)\n\nYou are building a small admin dashboard that summarizes which feature flags are present in a rollout payload.\n\nImplement solve(input) where input = string[] flags. Each flag may contain extra whitespace and mixed casing, such as " Dark_Mode " or "beta-users".\n\nReturn an object mapping each normalized flag name to the number of times it appears. Normalization rules:\n- trim surrounding whitespace\n- convert to lowercase\n- ignore empty strings after trimming\n\nReturn counts for every normalized flag that appears at least once. This is a frequency-counting helper with a small amount of normalization.',
    correctExplanation:
      'Normalize each incoming flag by trimming whitespace and lowercasing it. Skip flags that become empty after trimming. Then count occurrences in a plain object keyed by the normalized flag name. This is a standard frequency map problem with basic input cleanup. For example, [" Dark_Mode ", "dark_mode", "BETA"] becomes { dark_mode: 2, beta: 1 }.',
    tests: [
      { input: [[ ' Dark_Mode ', 'dark_mode', 'BETA' ]], expected: { dark_mode: 2, beta: 1 } },
      { input: [['  ', 'A', 'a', 'A  ']], expected: { a: 3 } },
      { input: [[]], expected: {} },
    ],
  },
]

export default data
