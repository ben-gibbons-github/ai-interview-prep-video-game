import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-medium-rest-pagination-meta-0001',
    difficulty: 'medium',
    prompt:
      'Raw Coding REST (Pagination Metadata)\n\nImplement `solve(input)` where `input = { page: number, pageSize: number, totalItems: number }`. Return `{ offset, limit, totalPages }` where `offset = (page - 1) * pageSize`, `limit = pageSize`, and `totalPages = ceil(totalItems / pageSize)`.',
    correctExplanation:
      'Use standard pagination formulas with integer math and ceiling division. Time O(1), Space O(1).',
    tests: [
      { input: [{ page: 1, pageSize: 20, totalItems: 95 }], expected: { offset: 0, limit: 20, totalPages: 5 } },
      { input: [{ page: 3, pageSize: 10, totalItems: 21 }], expected: { offset: 20, limit: 10, totalPages: 3 } },
      { input: [{ page: 2, pageSize: 50, totalItems: 0 }], expected: { offset: 50, limit: 50, totalPages: 0 } },
    ],
  },
  {
    id: 'raw-coding-medium-rest-parse-query-0002',
    difficulty: 'medium',
    prompt:
      'Raw Coding REST (Parse Query String)\n\nImplement `solve(input)` where `input = string` query like `"?status=active&limit=10"`. Return an object map of keys to string values. Ignore empty pairs and strip leading `?` if present.',
    correctExplanation:
      'Split by `&`, then split each pair by first `=`. Filter empty entries and build a dictionary. Time O(n), Space O(n).',
    tests: [
      { input: ['?status=active&limit=10'], expected: { status: 'active', limit: '10' } },
      { input: ['page=2&sort=createdAt'], expected: { page: '2', sort: 'createdAt' } },
      { input: [''], expected: {} },
    ],
  },
  {
    id: 'raw-coding-medium-rest-route-params-0003',
    difficulty: 'medium',
    prompt:
      'Raw Coding REST (Extract Route Params)\n\nImplement `solve(input)` where `input = { template: string, path: string }`. Templates contain `:param` segments (example: `/users/:userId/orders/:orderId`). Return a params object if segment counts match; otherwise return `null`.',
    correctExplanation:
      'Split template and path into segments, compare lengths, and map dynamic `:name` segments to path values. Time O(s), Space O(s), where s is segment count.',
    tests: [
      {
        input: [{ template: '/users/:userId/orders/:orderId', path: '/users/42/orders/abc' }],
        expected: { userId: '42', orderId: 'abc' },
      },
      { input: [{ template: '/teams/:id', path: '/teams/blue' }], expected: { id: 'blue' } },
      { input: [{ template: '/users/:id', path: '/users' }], expected: null },
    ],
  },
  {
    id: 'raw-coding-medium-rest-build-query-0004',
    difficulty: 'medium',
    prompt:
      'Raw Coding REST (Build Query String)\n\nImplement `solve(input)` where `input = Record<string, string | number | boolean | null | undefined>`. Return a query string that starts with `?`, uses keys sorted ascending, and skips null/undefined entries.',
    correctExplanation:
      'Collect valid entries, sort keys lexicographically, stringify values, and join as key=value pairs. Time O(k log k), Space O(k).',
    tests: [
      { input: [{ limit: 20, status: 'active', includeMeta: true }], expected: '?includeMeta=true&limit=20&status=active' },
      { input: [{ b: 2, a: 1, c: null }], expected: '?a=1&b=2' },
      { input: [{}], expected: '' },
    ],
  },
]

export default data
