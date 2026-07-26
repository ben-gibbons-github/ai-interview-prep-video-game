const data = [
  {
    id: 'medium-sysdesign-real-time-chat-9',
    difficulty: 'medium',
    prompt:
      'Design a real-time chat system: 60,000 reads/s, 8,000 writes/s, p95 < 120ms. Messages should appear quickly and survive app restarts.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A chat system needs App Servers behind a Load Balancer, a Message Queue for persistence or fanout, a Database for message history, and a Cache for recent conversations.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'rate-limiter', 'cdn'],
        maxNodes: 10,
        readQps: 60_000,
        writeQps: 8_000,
        latencyTargetMs: 120,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'database', 'message-queue'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'message-queue' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['cache', 'api-gateway', 'rate-limiter'],
      },
    },
  },
  {
    id: 'medium-sysdesign-analytics-dashboard-9',
    difficulty: 'medium',
    prompt:
      'Design an analytics dashboard: 25,000 reads/s, 2,500 writes/s, p95 < 250ms. Dashboards can tolerate a few seconds of freshness lag.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Analytics dashboards benefit from caching and pre-aggregation, with a queue or streaming path feeding the aggregates and a database storing the results.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'object-storage', 'rate-limiter'],
        maxNodes: 9,
        readQps: 25_000,
        writeQps: 2_500,
        latencyTargetMs: 250,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'cache', 'database'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'cache' },
          { from: 'app-server', to: 'database' },
          { from: 'queue', to: 'app-server' },
        ],
        optimalComponents: ['queue', 'object-storage', 'api-gateway'],
      },
    },
  },
]

export default data