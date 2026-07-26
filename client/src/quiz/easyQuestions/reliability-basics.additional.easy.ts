const data = [
  {
    id: 'easy-reliability-health-check-purpose-2026-01',
    difficulty: 'easy',
    prompt: 'Reliability basics: why do services expose health check endpoints?',
    options: [
      'To publish every internal debug secret to clients.',
      'To let orchestration systems detect unhealthy instances quickly.',
      'To remove the need for logging and metrics.',
      'To force all traffic through a single server.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Health checks let load balancers and orchestrators route around unhealthy instances so users see fewer failures.',
  },
  {
    id: 'easy-reliability-circuit-breaker-goal-2026-02',
    difficulty: 'easy',
    prompt: 'Reliability basics: what is the main goal of a circuit breaker around a dependency?',
    options: [
      'Send more traffic to a failing dependency for faster recovery.',
      'Fail fast when a dependency is unhealthy to avoid cascading failures.',
      'Guarantee every request succeeds eventually with no retries.',
      'Replace all timeout configuration automatically.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Circuit breakers stop repeated expensive calls to a failing service, protecting callers and improving overall stability.',
  },
  {
    id: 'easy-reliability-retry-backoff-2026-03',
    difficulty: 'easy',
    prompt: 'When retries are needed, why is exponential backoff usually better than immediate repeated retries?',
    options: [
      'It reduces pressure on a struggling dependency during failure windows.',
      'It guarantees exactly-once semantics by itself.',
      'It always lowers user latency for every request.',
      'It removes the need for timeout values.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Backoff spaces retry attempts and avoids retry storms that can worsen outages.',
  },
  {
    id: 'easy-observability-log-correlation-id-2026-04',
    difficulty: 'easy',
    prompt: 'Observability: why include a correlation/request ID in logs across services?',
    options: [
      'To increase log volume without adding value.',
      'To trace one user request end-to-end through multiple services.',
      'To avoid collecting metrics.',
      'To ensure every request bypasses caches.',
    ],
    correctIndex: 1,
    correctExplanation:
      'A shared request ID makes multi-service debugging far faster by connecting related log lines.',
  },
  {
    id: 'easy-data-consistency-cache-ttl-2026-05',
    difficulty: 'easy',
    prompt: 'Caching: what does TTL (time-to-live) primarily control?',
    options: [
      'How many CPU cores a cache can use.',
      'How long cached data may be served before refresh or expiry.',
      'How many requests a service can accept per second.',
      'How many replicas a database should run.',
    ],
    correctIndex: 1,
    correctExplanation:
      'TTL sets freshness bounds by limiting how long entries remain valid in cache.',
  },
  {
    id: 'easy-api-pagination-benefit-2026-06',
    difficulty: 'easy',
    prompt: 'API design: why is pagination important on list endpoints?',
    options: [
      'It makes responses deterministic by removing sorting.',
      'It avoids large payloads and improves latency and memory usage.',
      'It guarantees stronger consistency than transactions.',
      'It removes the need for indexes in storage.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Pagination keeps response sizes bounded and improves reliability for clients and servers.',
  },
  {
    id: 'easy-security-least-privilege-2026-07',
    difficulty: 'easy',
    prompt: 'Security principle: what does least privilege mean?',
    options: [
      'Every service account should get admin rights to avoid access errors.',
      'Users and services should only have permissions required for their tasks.',
      'Only production should have authentication enabled.',
      'Only databases need authorization controls.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Least privilege limits blast radius by minimizing unnecessary permissions.',
  },
  {
    id: 'easy-release-feature-flags-2026-08',
    difficulty: 'easy',
    prompt: 'Releases: why are feature flags useful during rollout?',
    options: [
      'They replace all testing and QA before release.',
      'They let teams enable or disable features quickly without full redeploys.',
      'They guarantee no bugs in newly released code.',
      'They remove the need for monitoring after launch.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Feature flags provide runtime control and safer staged rollout/rollback behavior.',
  },
]

export default data