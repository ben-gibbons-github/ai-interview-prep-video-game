const data = [
  {
    id: 'easy-api_rest-resource-nouns-11',
    difficulty: 'easy',
    prompt: 'Which path is the most REST-style way to represent a collection of products?',
    options: [
      '/products',
      '/getProducts',
      '/runProductList',
      '/productService/listAll'
    ],
    correctIndex: 0,
    correctExplanation: 'REST paths typically use nouns for resources. `/products` clearly represents a collection resource.'
  },
  {
    id: 'easy-api_rest-single-resource-12',
    difficulty: 'easy',
    prompt: 'Which path most clearly represents a single order with ID 123?',
    options: [
      '/orders/get/123',
      '/order?id=123',
      '/orders/123',
      '/fetchOrder/123'
    ],
    correctIndex: 2,
    correctExplanation: 'A single resource is conventionally represented by a stable URI like `/orders/123`.'
  },
  {
    id: 'easy-api_rest-put-replace-13',
    difficulty: 'easy',
    prompt: 'Which HTTP method is most commonly associated with replacing an existing resource representation?',
    options: [
      'PUT',
      'GET',
      'OPTIONS',
      'TRACE'
    ],
    correctIndex: 0,
    correctExplanation: 'PUT is commonly used for full replacement semantics on a known resource URI.'
  },
  {
    id: 'easy-api_rest-json-error-14',
    difficulty: 'easy',
    prompt: 'Why is a structured JSON error body useful in an API response?',
    options: [
      'It guarantees the request will be retried',
      'It helps clients parse error codes and actionable details consistently',
      'It replaces the need for status codes entirely',
      'It makes authorization unnecessary'
    ],
    correctIndex: 1,
    correctExplanation: 'Structured errors make client behavior more reliable because code can read stable fields such as code, message, and details.'
  },
  {
    id: 'easy-api_rest-options-15',
    difficulty: 'easy',
    prompt: 'Which HTTP method is commonly used to discover what methods or CORS behaviors are supported for a resource?',
    options: [
      'PATCH',
      'OPTIONS',
      'DELETE',
      'HEAD'
    ],
    correctIndex: 1,
    correctExplanation: 'OPTIONS is used to ask the server what capabilities or allowed methods apply to a target resource.'
  },
  {
    id: 'easy-api_rest-created-16',
    difficulty: 'easy',
    prompt: 'Which response code most directly indicates that a new resource was successfully created?',
    options: [
      '200 OK',
      '201 Created',
      '206 Partial Content',
      '304 Not Modified'
    ],
    correctIndex: 1,
    correctExplanation: '201 Created is the conventional status code when a new resource has been created successfully.'
  },
  {
    id: 'easy-api_rest-method-not-allowed-17',
    difficulty: 'easy',
    prompt: 'A client sends DELETE to an endpoint that exists but does not support deletion. Which response is most appropriate?',
    options: [
      '404 Not Found',
      '405 Method Not Allowed',
      '409 Conflict',
      '502 Bad Gateway'
    ],
    correctIndex: 1,
    correctExplanation: '405 Method Not Allowed means the resource exists, but the attempted HTTP method is not supported for it.'
  },
  {
    id: 'easy-api_rest-bearer-token-18',
    difficulty: 'easy',
    prompt: 'Where is a bearer token most commonly sent in an HTTP API request?',
    options: [
      'In the Authorization header',
      'In the ETag header',
      'In the Retry-After header',
      'In the status code'
    ],
    correctIndex: 0,
    correctExplanation: 'Bearer tokens are conventionally sent in the `Authorization` header.'
  },
  {
    id: 'easy-api_rest-status-500-19',
    difficulty: 'easy',
    prompt: 'Which status code usually indicates an unexpected server-side failure?',
    options: [
      '201 Created',
      '301 Moved Permanently',
      '500 Internal Server Error',
      '204 No Content'
    ],
    correctIndex: 2,
    correctExplanation: '500 Internal Server Error is the general-purpose code for unexpected server failures.'
  },
  {
    id: 'easy-api_rest-query-sort-20',
    difficulty: 'easy',
    prompt: 'Which URL best expresses sorting users by creation time descending?',
    options: [
      '/users?sort=createdAt:desc',
      '/sortUsersByCreatedDesc',
      '/users/created/desc/sort',
      '/users/runSort?field=createdAt'
    ],
    correctIndex: 0,
    correctExplanation: 'Query parameters are the conventional way to express sort criteria on a collection resource.'
  }
]

export default data
