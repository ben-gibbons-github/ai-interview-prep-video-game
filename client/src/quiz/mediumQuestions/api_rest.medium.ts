const data = [
  {
    id: 'medium-api_rest-put-vs-patch-1',
    difficulty: 'medium',
    prompt: 'A client wants to change only the `displayName` field on an existing user resource without replacing the rest of the representation. Which method is usually the best fit?',
    options: [
      'GET',
      'PATCH',
      'TRACE',
      'HEAD',
      'CONNECT'
    ],
    correctIndex: 1,
    correctExplanation: 'PATCH is designed for partial updates, while PUT is generally interpreted as replacing the full resource representation.'
  },
  {
    id: 'medium-api_rest-201-location-2',
    difficulty: 'medium',
    prompt: 'After successfully creating a new resource with POST, what extra response detail is most useful for clients?',
    options: [
      'A 304 status code',
      'A Location header pointing to the new resource',
      'A Retry-After header for all creates',
      'A 204 response with no body or metadata',
      'A DELETE link for cleanup only'
    ],
    correctIndex: 1,
    correctExplanation: 'For successful creation, `201 Created` plus a `Location` header is a strong convention because it tells clients where the new resource lives.'
  },
  {
    id: 'medium-api_rest-cache-etag-3',
    difficulty: 'medium',
    prompt: 'Which mechanism lets a client revalidate a cached representation and receive `304 Not Modified` when nothing changed?',
    options: [
      'Basic auth credentials',
      'ETag with conditional requests such as `If-None-Match`',
      'A larger page size',
      'Using POST instead of GET',
      'An idempotency key'
    ],
    correctIndex: 1,
    correctExplanation: 'ETags combined with conditional headers allow efficient cache revalidation without retransmitting the full body when the representation is unchanged.'
  },
  {
    id: 'medium-api_rest-409-conflict-4',
    difficulty: 'medium',
    prompt: 'Two users try to reserve the same unique username at nearly the same time. One request must fail because the resource state now conflicts with the request. Which code fits best?',
    options: [
      '202 Accepted',
      '204 No Content',
      '409 Conflict',
      '418 I\'m a teapot',
      '502 Bad Gateway'
    ],
    correctIndex: 2,
    correctExplanation: '409 Conflict is the conventional response when the request cannot be completed because of a conflict with current resource state.'
  },
  {
    id: 'medium-api_rest-429-retry-5',
    difficulty: 'medium',
    prompt: 'An API rate limit is exceeded. Which combination is most helpful to well-behaved clients?',
    options: [
      '404 Not Found with no extra data',
      '429 Too Many Requests with retry guidance such as `Retry-After`',
      '500 Internal Server Error with a stack trace',
      '301 redirect to a slower endpoint',
      '204 No Content and silent throttling'
    ],
    correctIndex: 1,
    correctExplanation: '429 clearly communicates throttling, and retry guidance helps clients back off instead of retrying blindly.'
  },
  {
    id: 'medium-api_rest-cursor-pagination-6',
    difficulty: 'medium',
    prompt: 'A feed receives many inserts between page fetches, so offset pagination causes duplicates and skipped items. Which approach is generally more robust?',
    options: [
      'Disable pagination entirely',
      'Use cursor-based pagination anchored to stable sort order',
      'Sort randomly on every request',
      'Return all rows every time',
      'Use DELETE to advance pages'
    ],
    correctIndex: 1,
    correctExplanation: 'Cursor pagination is more stable under concurrent inserts because it continues from a logical position rather than a shifting offset.'
  },
  {
    id: 'medium-api_rest-idempotent-retry-7',
    difficulty: 'medium',
    prompt: 'A payment creation API may be retried by clients after network timeouts. Which design most directly prevents duplicate charges?',
    options: [
      'Require larger request bodies',
      'Use idempotency keys scoped to the mutation request',
      'Switch the endpoint to GET',
      'Return 200 for all failures',
      'Force clients to sleep before every request'
    ],
    correctIndex: 1,
    correctExplanation: 'Idempotency keys let the server recognize logical retries of the same mutation and avoid applying the side effect twice.'
  },
  {
    id: 'medium-api_rest-nested-resource-8',
    difficulty: 'medium',
    prompt: 'Which path best expresses a collection of comments that belong to a specific post?',
    options: [
      '/commentsForPost?id=42',
      '/posts/42/comments',
      '/postComments/42/run',
      '/comments/create/post/42',
      '/comments/for/post/42/handler'
    ],
    correctIndex: 1,
    correctExplanation: 'Nested resource paths like `/posts/42/comments` clearly express ownership and resource hierarchy in a REST-style API.'
  },
  {
    id: 'medium-api_rest-400-vs-422-9',
    difficulty: 'medium',
    prompt: 'A JSON request is syntactically valid, but a business validation rule fails because `startDate` is after `endDate`. Which response is most appropriate in many APIs?',
    options: [
      '200 OK',
      '304 Not Modified',
      '422 Unprocessable Entity',
      '503 Service Unavailable',
      '101 Switching Protocols'
    ],
    correctIndex: 2,
    correctExplanation: '422 is often used when the request body is well-formed but semantically invalid according to domain rules.'
  },
  {
    id: 'medium-api_rest-head-10',
    difficulty: 'medium',
    prompt: 'A client only wants to know whether a large object exists and inspect headers like content length without downloading the body. Which method is most appropriate?',
    options: [
      'HEAD',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS'
    ],
    correctIndex: 0,
    correctExplanation: 'HEAD returns the same headers a GET would return, but without the response body, making it useful for metadata checks.'
  }
]

export default data
