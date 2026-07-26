const data = [
  {
    id: 'medium-sysdesign-social-feed',
    difficulty: 'medium',
    prompt:
      'Design a social media news feed: 80,000 reads/s, 5,000 writes/s, p95 < 200ms. Users follow up to 1,000 others. Feed freshness is important.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A social feed under high read load benefits from a precomputed feed Cache (LRU, short TTL). A Message Queue fans out writes to followers asynchronously. Multiple App Servers behind a Load Balancer handle fan-in reads. Read Replicas offload the DB for timeline queries.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'queue', 'message-queue', 'cdn', 'rate-limiter'],
        maxNodes: 10,
        readQps: 80_000,
        writeQps: 5_000,
        latencyTargetMs: 200,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'cache', 'database', 'message-queue'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'cache' },
          { from: 'app-server', to: 'message-queue' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['read-replica', 'api-gateway', 'rate-limiter'],
      },
    },
  },
  {
    id: 'medium-sysdesign-notification',
    difficulty: 'medium',
    prompt:
      'Design a notification delivery service: 2,000 sends/s, 10,000 status reads/s, p95 send latency < 500ms. Delivery must survive app server restarts.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Notifications must not be lost on crash — a Message Queue with at-least-once delivery provides durability. App Servers consume the queue and write delivery status to the Database. A Cache helps serve status reads at scale.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'rate-limiter'],
        maxNodes: 9,
        readQps: 10_000,
        writeQps: 2_000,
        latencyTargetMs: 500,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'database', 'message-queue'],
        requiredFlows: [
          { from: 'app-server', to: 'message-queue' },
          { from: 'message-queue', to: 'app-server' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['load-balancer', 'cache', 'api-gateway'],
      },
    },
  },
  {
    id: 'medium-sysdesign-rate-limited-api',
    difficulty: 'medium',
    prompt:
      'Design a public API platform with rate limiting: 30,000 reads/s, 3,000 writes/s, per-user rate limits enforced in < 10ms, p95 < 150ms overall.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Rate limiting at the API Gateway or a dedicated Rate Limiter node using a Cache (Redis) for per-user counters is the standard approach. The Cache lookup for rate state must be low-latency. App Servers behind a Load Balancer handle the business logic.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'rate-limiter', 'cdn'],
        maxNodes: 9,
        readQps: 30_000,
        writeQps: 3_000,
        latencyTargetMs: 150,
        sloAvailability: 0.999,
        requiredComponents: ['rate-limiter', 'app-server', 'database'],
        requiredFlows: [
          { from: 'api-gateway', to: 'rate-limiter' },
          { from: 'rate-limiter', to: 'app-server' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['load-balancer', 'cache', 'read-replica'],
      },
    },
  },
]

export default data
