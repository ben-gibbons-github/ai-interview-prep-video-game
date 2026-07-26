const data = [
  {
    id: 'medium-api_rest-openapi-client-gen-11',
    difficulty: 'medium',
    prompt: 'Why is a machine-readable API contract like OpenAPI especially useful for client generation?',
    options: [
      'It eliminates the need for authentication entirely',
      'It provides a structured schema that tools can use to generate clients consistently',
      'It guarantees zero breaking changes forever',
      'It replaces HTTP status codes',
      'It makes pagination unnecessary'
    ],
    correctIndex: 1,
    correctExplanation: 'Machine-readable contracts provide explicit request and response schemas that generation tools can consume reliably.'
  },
  {
    id: 'medium-api_rest-206-range-12',
    difficulty: 'medium',
    prompt: 'A client requests only a byte range from a large file and the server successfully returns that subset. Which status code is most appropriate?',
    options: [
      '200 OK',
      '202 Accepted',
      '206 Partial Content',
      '410 Gone',
      '501 Not Implemented'
    ],
    correctIndex: 2,
    correctExplanation: '206 Partial Content is the standard response for successful byte-range requests.'
  },
  {
    id: 'medium-api_rest-410-gone-13',
    difficulty: 'medium',
    prompt: 'An endpoint for a deprecated export format has been intentionally removed and will not return. Which code best communicates permanent removal?',
    options: [
      '302 Found',
      '404 Not Found',
      '410 Gone',
      '503 Service Unavailable',
      '204 No Content'
    ],
    correctIndex: 2,
    correctExplanation: '410 Gone explicitly signals that the resource used to exist but has been permanently removed.'
  },
  {
    id: 'medium-api_rest-503-retry-after-14',
    difficulty: 'medium',
    prompt: 'An API is temporarily overloaded during maintenance and wants clients to retry later. Which response is strongest?',
    options: [
      '401 Unauthorized',
      '409 Conflict',
      '503 Service Unavailable with Retry-After guidance',
      '304 Not Modified',
      '418 I\'m a teapot'
    ],
    correctIndex: 2,
    correctExplanation: '503 communicates a temporary server-side unavailability, and Retry-After gives clients explicit retry guidance.'
  },
  {
    id: 'medium-api_rest-collection-bulk-post-15',
    difficulty: 'medium',
    prompt: 'A client wants to submit a batch of new invoices to a collection endpoint. Which path and method combination is most conventional?',
    options: [
      'GET /invoices/bulkCreate',
      'POST /invoices/bulk',
      'DELETE /invoices',
      'HEAD /invoices/create',
      'TRACE /invoices'
    ],
    correctIndex: 1,
    correctExplanation: 'A POST to a collection-oriented bulk endpoint is a common pattern for batch creation operations.'
  },
  {
    id: 'medium-api_rest-field-selection-16',
    difficulty: 'medium',
    prompt: 'A mobile client only needs `id` and `name` fields for a list endpoint to reduce payload size. Which design is most reasonable?',
    options: [
      'Require a separate API version for every field subset',
      'Support explicit field selection such as `/users?fields=id,name`',
      'Always return every field for every client',
      'Use DELETE to remove unused fields from the response',
      'Return XML instead of JSON'
    ],
    correctIndex: 1,
    correctExplanation: 'Field selection can reduce bandwidth and parsing cost when the API contract defines it clearly.'
  },
  {
    id: 'medium-api_rest-if-modified-since-17',
    difficulty: 'medium',
    prompt: 'Which conditional request header can be used for time-based cache revalidation of a representation?',
    options: [
      'If-Modified-Since',
      'Content-Length',
      'Authorization',
      'Retry-After',
      'Transfer-Encoding'
    ],
    correctIndex: 0,
    correctExplanation: 'If-Modified-Since is a standard header for validating whether a representation has changed since a given time.'
  },
  {
    id: 'medium-api_rest-consistent-error-codes-18',
    difficulty: 'medium',
    prompt: 'Why are stable application-level error codes useful even when HTTP status codes are already present?',
    options: [
      'They allow every error to return 200 OK safely',
      'They give clients finer-grained machine-readable behavior within broad HTTP classes',
      'They remove the need for documentation',
      'They make transport security optional',
      'They prevent all retries'
    ],
    correctIndex: 1,
    correctExplanation: 'HTTP status codes are coarse categories, while stable app-level codes let clients distinguish domain-specific cases programmatically.'
  },
  {
    id: 'medium-api_rest-hateoas-limits-19',
    difficulty: 'medium',
    prompt: 'What is the main idea behind including navigational links in API responses?',
    options: [
      'To replace all identifiers with HTML forms',
      'To help clients discover available next actions or related resources dynamically',
      'To disable pagination',
      'To force every API to return XML',
      'To make authentication stateful'
    ],
    correctIndex: 1,
    correctExplanation: 'Links can help clients move through workflows and related resources without hardcoding every transition.'
  },
  {
    id: 'medium-api_rest-request-id-20',
    difficulty: 'medium',
    prompt: 'A support engineer needs to diagnose why one specific customer request failed across multiple services. What should the API expose or propagate?',
    options: [
      'Only larger response bodies',
      'A request or correlation ID that follows the request path',
      'Randomized status codes per service',
      'A new API version for each incident',
      'Hidden server timestamps only'
    ],
    correctIndex: 1,
    correctExplanation: 'Correlation IDs make logs and traces searchable across service boundaries for one logical request.'
  }
]

export default data
