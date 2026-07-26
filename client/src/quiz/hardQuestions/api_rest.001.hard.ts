const data = [
  {
    id: 'hard-api_rest-cache-invalidation-11',
    difficulty: 'hard',
    prompt: 'A resource is aggressively cached at the edge, but clients must see updates quickly after writes. Which design is strongest overall?',
    options: [
      'Never cache the resource under any circumstance',
      'Use explicit cache policy plus revalidation or purge strategy tied to writes',
      'Return 200 for stale and fresh data without distinction',
      'Switch the endpoint to TRACE',
      'Disable resource identifiers',
      'Use random URLs for each read'
    ],
    correctIndex: 1,
    correctExplanation: 'Fast freshness under caching usually requires a deliberate invalidation or revalidation design connected to write behavior.'
  },
  {
    id: 'hard-api_rest-eventual-consistency-12',
    difficulty: 'hard',
    prompt: 'An API writes to a primary store and serves reads from replicas that may lag. Which response design helps clients reason about eventual consistency?',
    options: [
      'Hide all timing and version metadata',
      'Expose version, timestamp, or read-after-write guarantees clearly in the contract',
      'Return 500 during all replica lag',
      'Use DELETE for stale reads',
      'Force every read through a browser redirect',
      'Remove all caching headers and documentation'
    ],
    correctIndex: 1,
    correctExplanation: 'Clients need an explicit consistency contract to understand whether stale reads are possible and how to react when they occur.'
  },
  {
    id: 'hard-api_rest-idempotency-window-13',
    difficulty: 'hard',
    prompt: 'A payment API uses idempotency keys. What additional contract detail matters most for clients to use them correctly?',
    options: [
      'Whether gzip is enabled',
      'The retention window and scope for deduplicating the key',
      'The HTML title of the docs page',
      'Whether the endpoint supports HEAD',
      'The server\'s CPU model',
      'How often logs are rotated'
    ],
    correctIndex: 1,
    correctExplanation: 'Clients need to know how long keys are remembered and what constitutes the same logical request for deduplication.'
  },
  {
    id: 'hard-api_rest-optimistic-concurrency-14',
    difficulty: 'hard',
    prompt: 'Why is optimistic concurrency often a better fit than coarse-grained locking for public APIs?',
    options: [
      'It requires no version metadata at all',
      'It avoids holding server-side locks across unreliable client interactions while still detecting stale writes',
      'It guarantees no conflicts can ever occur',
      'It makes writes safe to perform with GET',
      'It removes the need for retries entirely',
      'It prevents cache usage'
    ],
    correctIndex: 1,
    correctExplanation: 'Public APIs cannot assume reliable long-lived client coordination, so optimistic concurrency detects conflicting updates without lock orchestration.'
  },
  {
    id: 'hard-api_rest-webhook-replay-15',
    difficulty: 'hard',
    prompt: 'A webhook consumer receives a validly signed event twice because the sender retried after a timeout. What is the strongest consumer behavior?',
    options: [
      'Reject all retries permanently',
      'Deduplicate by stable event ID and keep processing idempotent',
      'Treat the second delivery as a security attack automatically',
      'Require a new API version before processing',
      'Delete the subscription immediately',
      'Return 500 until the sender stops retrying'
    ],
    correctIndex: 1,
    correctExplanation: 'Well-designed webhook consumers should expect retries and handle duplicate deliveries safely through idempotent processing and event IDs.'
  },
  {
    id: 'hard-api_rest-filter-vs-search-16',
    difficulty: 'hard',
    prompt: 'When should an API expose a dedicated search endpoint instead of only collection filters?',
    options: [
      'Whenever there is more than one query parameter',
      'When the operation has different semantics, ranking, or query behavior than simple collection filtering',
      'Only when the API supports XML',
      'Never, because all searches must be PATCH requests',
      'Only for authenticated users',
      'Only if the database is relational'
    ],
    correctIndex: 1,
    correctExplanation: 'A dedicated search resource can make sense when the behavior is more than straightforward filtering, such as ranking, fuzzy matching, or multi-index query semantics.'
  },
  {
    id: 'hard-api_rest-backward-compatible-enums-17',
    difficulty: 'hard',
    prompt: 'Which client strategy is most resilient when an API may add new enum values in the future?',
    options: [
      'Fail parsing on any unknown value with no fallback path',
      'Handle known values explicitly and preserve or safely default unknown values',
      'Convert every enum to a boolean',
      'Ignore the entire response body',
      'Require the server to freeze the enum forever',
      'Map all unknown values to HTTP 500'
    ],
    correctIndex: 1,
    correctExplanation: 'Forward-compatible clients should anticipate additive enum expansion and degrade safely when they encounter unknown values.'
  },
  {
    id: 'hard-api_rest-bulk-async-18',
    difficulty: 'hard',
    prompt: 'A bulk export may process millions of rows and cannot complete during a normal request timeout. Which design is strongest?',
    options: [
      'Stream the whole export synchronously from the transactional database every time',
      'Create an asynchronous export job resource and let clients poll or fetch the result later',
      'Return 204 immediately and never expose status',
      'Force the client to reconnect with WebSockets only',
      'Split one export into random redirects',
      'Return 404 while the export is running'
    ],
    correctIndex: 1,
    correctExplanation: 'Asynchronous job resources are a strong fit for expensive work that exceeds normal request-response timing expectations.'
  },
  {
    id: 'hard-api_rest-multi-tenant-authz-19',
    difficulty: 'hard',
    prompt: 'In a multi-tenant API, what is the strongest principle for authorization checks?',
    options: [
      'Trust any tenant ID sent by the browser if the user is logged in',
      'Evaluate authorization at the resource boundary using authenticated identity and tenant ownership rules',
      'Authorize only in frontend code for faster requests',
      'Skip authz on read endpoints',
      'Use 200 OK for denied requests to avoid leaking information',
      'Base access solely on URL length'
    ],
    correctIndex: 1,
    correctExplanation: 'Resource-boundary authorization is the reliable server-side control in multi-tenant systems because frontend checks and client-provided tenant data are not trustworthy by themselves.'
  },
  {
    id: 'hard-api_rest-rate-limit-fairness-20',
    difficulty: 'hard',
    prompt: 'A public API has both heavy enterprise tenants and many small tenants. What is the strongest reason to design rate limits around identity or tenant boundaries instead of a single global bucket?',
    options: [
      'It makes the API easier to implement than any other option',
      'It prevents one actor from consuming disproportionate shared capacity and improves fairness',
      'It guarantees zero abuse forever',
      'It removes the need for status code 429',
      'It allows every request to skip authentication',
      'It eliminates the need for observability'
    ],
    correctIndex: 1,
    correctExplanation: 'Tenant- or identity-aware rate limiting protects shared systems from noisy neighbors and creates a fairer capacity model.'
  }
]

export default data
