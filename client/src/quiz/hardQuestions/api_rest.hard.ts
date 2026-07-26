const data = [
  {
    id: 'hard-api_rest-conditional-write-1',
    difficulty: 'hard',
    prompt: 'Multiple clients may update the same document concurrently. Which API design best prevents lost updates without forcing a lock service?',
    options: [
      'Always accept the last write silently',
      'Require conditional writes using validators such as `If-Match` with ETags',
      'Convert all writes to GET requests',
      'Return 200 even when versions diverge',
      'Throttle all writers to one request per minute',
      'Disable caching headers everywhere'
    ],
    correctIndex: 1,
    correctExplanation: 'Conditional writes with validators such as ETags let the server reject stale updates instead of silently overwriting newer state.'
  },
  {
    id: 'hard-api_rest-long-running-202-2',
    difficulty: 'hard',
    prompt: 'A report-generation request may take several minutes. What is the strongest REST-friendly design?',
    options: [
      'Hold the HTTP connection open until the job completes, no matter how long it takes',
      'Return 202 Accepted and provide a job resource clients can poll or subscribe to',
      'Return 204 immediately and never expose job state',
      'Use 301 to redirect the user to a random worker',
      'Return 200 instantly with fake data',
      'Force the client to retry POST every second'
    ],
    correctIndex: 1,
    correctExplanation: '202 Accepted plus a job/status resource makes asynchronous work explicit and gives clients a reliable contract for tracking progress.'
  },
  {
    id: 'hard-api_rest-cache-control-private-3',
    difficulty: 'hard',
    prompt: 'A personalized `/me` endpoint returns account data that is cacheable for the same user but must not be stored by shared proxies. Which cache approach is strongest?',
    options: [
      'Cache-Control: public, max-age=3600',
      'Cache-Control: private with appropriate freshness policy',
      'No headers at all, caches will infer correctly',
      'Use POST so caches are impossible',
      'Return different JSON key order for each user',
      'Always disable TLS session reuse'
    ],
    correctIndex: 1,
    correctExplanation: 'Private cache directives allow user-agent caching while preventing shared intermediaries from storing another user\'s personalized response.'
  },
  {
    id: 'hard-api_rest-idempotent-delete-4',
    difficulty: 'hard',
    prompt: 'Why is DELETE commonly described as idempotent even though the first call may remove data and the second call may find nothing left?',
    options: [
      'Because DELETE is guaranteed to return 204 forever',
      'Because repeated identical requests should leave server state in the same end condition',
      'Because DELETE must never require authorization',
      'Because DELETE always returns the deleted object body',
      'Because DELETE can only target collections',
      'Because DELETE disables retries automatically'
    ],
    correctIndex: 1,
    correctExplanation: 'Idempotency is about resulting server state, not identical response bodies. After the resource is gone, additional DELETEs should not create new side effects.'
  },
  {
    id: 'hard-api_rest-webhook-signing-5',
    difficulty: 'hard',
    prompt: 'Your platform delivers webhooks to third parties and must defend against spoofed callbacks and duplicate deliveries. Which design is strongest?',
    options: [
      'Send unsigned payloads and trust source IPs only',
      'Sign payloads, retry safely, and include stable event IDs for idempotent consumers',
      'Use GET for all webhook deliveries',
      'Compress responses more aggressively',
      'Remove timestamps from all events',
      'Return 404 for successful deliveries'
    ],
    correctIndex: 1,
    correctExplanation: 'Webhook signatures validate authenticity, retries handle transient failures, and stable event IDs let consumers deduplicate deliveries safely.'
  },
  {
    id: 'hard-api_rest-breaking-change-6',
    difficulty: 'hard',
    prompt: 'Which change is most likely to be a breaking API change for existing clients?',
    options: [
      'Adding a new optional field to a JSON response',
      'Adding a new endpoint under the same version',
      'Changing a field type from integer to string in an existing response',
      'Adding a new filter query parameter that is optional',
      'Returning the same data with an extra response header',
      'Documenting a stricter timeout recommendation'
    ],
    correctIndex: 2,
    correctExplanation: 'Changing an established field type can break parsers, validation, and client behavior. Additive optional changes are typically safer.'
  },
  {
    id: 'hard-api_rest-bulk-partial-failure-7',
    difficulty: 'hard',
    prompt: 'A bulk mutation endpoint may succeed for some items and fail for others. Which response design gives clients the clearest recovery path?',
    options: [
      'Return 200 with no per-item detail',
      'Return a response that includes per-item outcomes and stable error codes',
      'Return 500 for any partial failure and hide which items succeeded',
      'Return only the first failed ID',
      'Retry the full batch forever on the server',
      'Convert the batch into a redirect chain'
    ],
    correctIndex: 1,
    correctExplanation: 'Per-item status information lets clients retry only failed items and reason accurately about mixed outcomes.'
  },
  {
    id: 'hard-api_rest-upsert-choice-8',
    difficulty: 'hard',
    prompt: 'A client knows the canonical resource URI ahead of time, such as `/users/alice@example.com/preferences`, and wants to create or fully replace that representation. Which method is usually the strongest fit?',
    options: [
      'PATCH',
      'PUT',
      'OPTIONS',
      'TRACE',
      'CONNECT',
      'HEAD'
    ],
    correctIndex: 1,
    correctExplanation: 'PUT is a strong fit when the client knows the target resource URI and wants full replacement semantics, often including create-if-absent behavior depending on API contract.'
  },
  {
    id: 'hard-api_rest-openapi-contract-9',
    difficulty: 'hard',
    prompt: 'A team wants client SDKs, schema validation, and contract reviews to stay aligned as the API evolves. Which practice is strongest?',
    options: [
      'Keep the API undocumented and let clients inspect traffic',
      'Maintain an explicit machine-readable contract such as OpenAPI and review changes against it',
      'Hide response schemas behind feature flags only',
      'Ship SDKs without any source schema',
      'Avoid version control for API changes',
      'Use screenshots instead of contracts in reviews'
    ],
    correctIndex: 1,
    correctExplanation: 'A machine-readable contract creates a single source of truth for documentation, validation, code generation, and compatibility review.'
  },
  {
    id: 'hard-api_rest-observability-10',
    difficulty: 'hard',
    prompt: 'An API spans multiple services and clients need support teams to trace one failing request end to end. Which design decision helps most directly?',
    options: [
      'Compress all responses with gzip',
      'Include request or trace identifiers that propagate across services',
      'Use random status codes for internal errors',
      'Return HTML instead of structured JSON errors',
      'Disable logs in downstream services',
      'Remove correlation metadata from responses'
    ],
    correctIndex: 1,
    correctExplanation: 'Request and trace IDs are foundational for distributed observability because they let logs, metrics, and traces be correlated across service boundaries.'
  }
]

export default data
