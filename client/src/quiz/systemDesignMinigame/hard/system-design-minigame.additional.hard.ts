const data = [
  {
    id: 'hard-sysdesign-global-chat-9',
    difficulty: 'hard',
    prompt:
      'Design a global chat system: 180,000 reads/s, 40,000 writes/s, p99 < 120ms in-region and < 300ms cross-region. Messages should replicate across regions with minimal loss.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A global chat system needs region-local App Servers, a durable Message Queue or replication stream, a Database for persistence, Cache for recent messages, and a Load Balancer per region to keep the fast path local.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'queue', 'message-queue', 'cdn', 'rate-limiter'],
        maxNodes: 12,
        readQps: 180_000,
        writeQps: 40_000,
        latencyTargetMs: 120,
        sloAvailability: 0.9999,
        requiredComponents: ['app-server', 'database', 'message-queue', 'read-replica'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'message-queue' },
          { from: 'app-server', to: 'database' },
          { from: 'message-queue', to: 'read-replica' },
        ],
        optimalComponents: ['cache', 'api-gateway', 'rate-limiter'],
      },
    },
  },
  {
    id: 'hard-sysdesign-real-time-analytics-9',
    difficulty: 'hard',
    prompt:
      'Design a real-time analytics platform: 1,000,000 events/s ingest, 80,000 dashboard reads/s, results visible within 10 seconds. Burst traffic should not lose data.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'This workload needs a queue or stream to absorb bursts, a processing tier for aggregation, a database for durable results, and cache for dashboard reads.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'object-storage', 'rate-limiter'],
        maxNodes: 11,
        readQps: 80_000,
        writeQps: 1_000_000,
        latencyTargetMs: 10_000,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'message-queue', 'database'],
        requiredFlows: [
          { from: 'api-gateway', to: 'message-queue' },
          { from: 'message-queue', to: 'app-server' },
          { from: 'app-server', to: 'database' },
          { from: 'app-server', to: 'cache' },
        ],
        optimalComponents: ['object-storage', 'load-balancer', 'rate-limiter'],
      },
    },
  },
]

export default data