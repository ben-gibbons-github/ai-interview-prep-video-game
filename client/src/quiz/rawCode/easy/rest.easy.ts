import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-easy-rest-normalize-method-0001',
    difficulty: 'easy',
    prompt:
      'Raw Coding REST (Normalize HTTP Method)\n\nImplement `solve(input)` where `input = string`. Return the HTTP method uppercased and trimmed. If the string is empty after trim, return `"GET"`.',
    correctExplanation:
      'Trim whitespace, check for empty string, and normalize with uppercase. This mirrors simple API gateway normalization. Time O(n), Space O(n).',
    tests: [
      { input: [' post '], expected: 'POST' },
      { input: ['GET'], expected: 'GET' },
      { input: ['   '], expected: 'GET' },
    ],
  },
  {
    id: 'raw-coding-easy-rest-success-status-0002',
    difficulty: 'easy',
    prompt:
      'Raw Coding REST (Is Success Status)\n\nImplement `solve(input)` where `input = number` status code. Return `true` if status is in `[200, 299]`, else `false`.',
    correctExplanation:
      'HTTP success codes are the 2xx range. A range check is enough. Time O(1), Space O(1).',
    tests: [
      { input: [200], expected: true },
      { input: [204], expected: true },
      { input: [404], expected: false },
    ],
  },
  {
    id: 'raw-coding-easy-rest-resource-path-0003',
    difficulty: 'easy',
    prompt:
      'Raw Coding REST (Build Resource Path)\n\nImplement `solve(input)` where `input = { collection: string, id: string | number }`. Return a REST path in the format `"/{collection}/{id}"` with collection trimmed and lowercased.',
    correctExplanation:
      'Normalize the collection name, stringify the id, and format a canonical path. Time O(n), Space O(n).',
    tests: [
      { input: [{ collection: ' Users ', id: 42 }], expected: '/users/42' },
      { input: [{ collection: 'Orders', id: 'A-7' }], expected: '/orders/A-7' },
      { input: [{ collection: 'Items', id: 0 }], expected: '/items/0' },
    ],
  },
  {
    id: 'raw-coding-easy-rest-auth-header-0004',
    difficulty: 'easy',
    prompt:
      'Raw Coding REST (Has Bearer Auth Header)\n\nImplement `solve(input)` where `input = Record<string, string>`. Return `true` if there is an `Authorization` header (case-insensitive) that starts with `"Bearer "`, else `false`.',
    correctExplanation:
      'Scan headers by key in a case-insensitive way and validate the bearer prefix. Time O(h), Space O(1), where h is number of headers.',
    tests: [
      { input: [{ Authorization: 'Bearer abc123' }], expected: true },
      { input: [{ authorization: 'Bearer token' }], expected: true },
      { input: [{ Authorization: 'Basic Zm9vOmJhcg==' }], expected: false },
    ],
  },
]

export default data
