const data = [
  {
    id: 'easy-system-design-scenarios-rate-limiter-1',
    difficulty: 'easy',
    prompt: 'For a public API that needs per-user request caps every minute, which approach is usually the best first implementation?',
    options: [
      'Token bucket or fixed-window counters in Redis with expirations',
      'Synchronous writes to an analytics warehouse on every request',
      'A globally serialized lock service for each API call',
      'Client-side JavaScript counters with no server enforcement',
    ],
    correctIndex: 0,
    correctExplanation:
      'A Redis-backed limiter is simple, fast, and operationally proven. It gives predictable enforcement without coupling the hot path to heavy storage systems.',
  },
  {
    id: 'easy-system-design-scenarios-chat-delivery-2',
    difficulty: 'easy',
    prompt: 'In a chat app, what is the most practical way to improve perceived reliability when mobile clients reconnect?',
    options: [
      'Store messages durably and let clients fetch missed messages by sequence/timestamp',
      'Drop all messages sent while clients are offline',
      'Keep state only in process memory without persistence',
      'Require full app reinstall to resync state',
    ],
    correctIndex: 0,
    correctExplanation:
      'Durable message storage plus replay on reconnect is foundational for real-world chat reliability. It decouples delivery from transient client connectivity.',
  },
  {
    id: 'easy-system-design-scenarios-news-feed-3',
    difficulty: 'easy',
    prompt: 'For a social feed service at moderate scale, what usually reduces user-facing latency the most?',
    options: [
      'Cache precomputed feed pages for active users',
      'Run full-table scans at read time for each request',
      'Disable all caching to avoid stale reads',
      'Compute all ranking synchronously in the gateway',
    ],
    correctIndex: 0,
    correctExplanation:
      'Serving feed results from cache avoids repeated expensive joins/ranking on the critical read path and improves p95 latency.',
  },
  {
    id: 'easy-system-design-scenarios-file-upload-4',
    difficulty: 'easy',
    prompt: 'For large file uploads, which architecture is typically best for API server scalability?',
    options: [
      'Client uploads directly to object storage using signed URLs',
      'Route all binary payloads through app servers only',
      'Encode files in cookies for retries',
      'Store all files in relational database blobs by default',
    ],
    correctIndex: 0,
    correctExplanation:
      'Signed direct uploads remove heavy bandwidth load from app servers and let object storage handle large payloads efficiently.',
  },
  {
    id: 'easy-system-design-scenarios-search-index-5',
    difficulty: 'easy',
    prompt: 'When records change in the source database, what is a robust way to keep a search index updated?',
    options: [
      'Publish change events and update index asynchronously',
      'Rebuild the full index on every single row update',
      'Update index manually via admin scripts only',
      'Assume eventual consistency without any update mechanism',
    ],
    correctIndex: 0,
    correctExplanation:
      'Event-driven async indexing is scalable and decoupled. It handles continuous updates without expensive full rebuilds per write.',
  },
  {
    id: 'easy-system-design-scenarios-metrics-6',
    difficulty: 'easy',
    prompt: 'For high-cardinality request telemetry, what pattern best protects the main request path?',
    options: [
      'Buffer metrics/events and ship asynchronously',
      'Block requests until analytics writes complete',
      'Send each metric synchronously to cold storage',
      'Disable observability in production',
    ],
    correctIndex: 0,
    correctExplanation:
      'Asynchronous telemetry avoids making user-facing latency depend directly on analytics pipeline availability/performance.',
  },
  {
    id: 'easy-system-design-scenarios-cache-invalidation-7',
    difficulty: 'easy',
    prompt: 'What is a practical strategy to reduce stale reads with cache + database?',
    options: [
      'Use TTLs and targeted invalidation on writes',
      'Never expire or invalidate cached objects',
      'Invalidate the entire cache cluster for every write',
      'Disable database writes and serve cache forever',
    ],
    correctIndex: 0,
    correctExplanation:
      'Combining TTLs with targeted invalidation gives a balance between freshness and operational cost.',
  },
  {
    id: 'easy-system-design-scenarios-leaderboard-8',
    difficulty: 'easy',
    prompt: 'For a game leaderboard that needs frequent rank lookups and score updates, which storage primitive is commonly a good fit?',
    options: [
      'Sorted sets (or equivalent ordered index)',
      'Append-only text files on local disk',
      'Per-request full sort over all players in application memory',
      'Client-side ranking only with no backend state',
    ],
    correctIndex: 0,
    correctExplanation:
      'Ordered data structures are optimized for ranking and top-N queries while supporting frequent score updates.',
  },
]

export default data
