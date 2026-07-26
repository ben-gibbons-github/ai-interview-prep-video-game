const data = [
  {
    id: 'easy-api_rest-http-get-safe-1',
    difficulty: 'easy',
    prompt: 'A client needs to fetch a user profile without changing any server state. Which HTTP method is the best fit?',
    options: [
      'GET',
      'POST',
      'PATCH',
      'DELETE'
    ],
    correctIndex: 0,
    correctExplanation: 'GET is the standard method for safe, read-only retrieval. It communicates that the request should not create, update, or delete server-side state.'
  },
  {
    id: 'easy-api_rest-post-create-2',
    difficulty: 'easy',
    prompt: 'You are creating a new order under `/orders` and the server will assign the order ID. Which method is usually the best choice?',
    options: [
      'GET',
      'POST',
      'PUT',
      'HEAD'
    ],
    correctIndex: 1,
    correctExplanation: 'POST is commonly used when creating a new resource in a collection and the server decides the final identifier.'
  },
  {
    id: 'easy-api_rest-delete-status-3',
    difficulty: 'easy',
    prompt: 'An API successfully deletes a resource and returns no response body. Which status code is the most conventional?',
    options: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '409 Conflict'
    ],
    correctIndex: 2,
    correctExplanation: '204 No Content is the conventional choice when the operation succeeds and there is nothing meaningful to return in the body.'
  },
  {
    id: 'easy-api_rest-not-found-4',
    difficulty: 'easy',
    prompt: 'A client requests `/users/9999`, but that resource does not exist. Which response code is most appropriate?',
    options: [
      '301 Moved Permanently',
      '400 Bad Request',
      '404 Not Found',
      '500 Internal Server Error'
    ],
    correctIndex: 2,
    correctExplanation: '404 Not Found indicates that the request was valid enough to understand, but the target resource does not exist.'
  },
  {
    id: 'easy-api_rest-auth-required-5',
    difficulty: 'easy',
    prompt: 'A client calls a protected API endpoint without any valid authentication credentials. Which response code should it usually receive first?',
    options: [
      '200 OK',
      '401 Unauthorized',
      '403 Forbidden',
      '429 Too Many Requests'
    ],
    correctIndex: 1,
    correctExplanation: '401 Unauthorized is the standard response when authentication is required and the client has not provided valid credentials.'
  },
  {
    id: 'easy-api_rest-forbidden-6',
    difficulty: 'easy',
    prompt: 'A user is authenticated successfully but does not have permission to access an admin-only endpoint. Which code best fits?',
    options: [
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found',
      '503 Service Unavailable'
    ],
    correctIndex: 1,
    correctExplanation: '403 Forbidden is appropriate when identity is known but the caller is not allowed to perform the action.'
  },
  {
    id: 'easy-api_rest-query-filter-7',
    difficulty: 'easy',
    prompt: 'Which URL design is the most REST-friendly way to filter active users in a collection?',
    options: [
      '/getActiveUsers',
      '/users?status=active',
      '/users/active/filter',
      '/users/runActiveQuery'
    ],
    correctIndex: 1,
    correctExplanation: 'Query parameters are the conventional way to filter or search within a collection resource without inventing RPC-style paths.'
  },
  {
    id: 'easy-api_rest-pagination-param-8',
    difficulty: 'easy',
    prompt: 'An API returns a long list of invoices. What is the main reason to add pagination?',
    options: [
      'To make every request require authentication',
      'To reduce payload size and bound response latency',
      'To avoid using JSON responses',
      'To replace resource IDs with offsets'
    ],
    correctIndex: 1,
    correctExplanation: 'Pagination prevents unbounded responses, which helps latency, memory use, and backend stability.'
  },
  {
    id: 'easy-api_rest-content-type-9',
    difficulty: 'easy',
    prompt: 'A client sends JSON in the request body. Which header tells the server how that body is encoded?',
    options: [
      'Accept',
      'Authorization',
      'Content-Type',
      'ETag'
    ],
    correctIndex: 2,
    correctExplanation: 'Content-Type describes the media type of the request body, such as `application/json`.'
  },
  {
    id: 'easy-api_rest-accept-header-10',
    difficulty: 'easy',
    prompt: 'A client wants the response in JSON format when multiple formats are possible. Which header is used to express that preference?',
    options: [
      'Accept',
      'Location',
      'Retry-After',
      'Host'
    ],
    correctIndex: 0,
    correctExplanation: 'The Accept header tells the server which response media types the client can handle, such as `application/json`.'
  }
]

export default data
