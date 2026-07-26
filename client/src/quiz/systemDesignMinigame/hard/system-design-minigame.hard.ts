const data = [
  {
    id: 'hard-sysdesign-multi-region-writes',
    difficulty: 'hard',
    prompt:
      'Design a globally distributed key-value store: 200,000 reads/s, 20,000 writes/s, p99 < 100ms globally, 99.99% availability. Writes must propagate across regions within 500ms.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Multi-region writes require a Message Queue (or replication stream) to propagate changes asynchronously. A CDN handles globally cached reads. Each region needs its own App Servers and Cache. The primary Database uses read replicas per region. Rate Limiters protect against thundering herds.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'queue', 'message-queue', 'cdn', 'rate-limiter'],
        maxNodes: 12,
        readQps: 200_000,
        writeQps: 20_000,
        latencyTargetMs: 100,
        sloAvailability: 0.9999,
        requiredComponents: ['app-server', 'cache', 'database', 'message-queue', 'read-replica'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'cache' },
          { from: 'app-server', to: 'database' },
          { from: 'database', to: 'message-queue' },
          { from: 'message-queue', to: 'read-replica' },
        ],
        optimalComponents: ['cdn', 'api-gateway', 'rate-limiter'],
      },
    },
  },
  {
    id: 'hard-sysdesign-event-streaming',
    difficulty: 'hard',
    prompt:
      'Design a real-time event analytics pipeline: 500,000 events/s ingest, 50,000 query reads/s, results must be queryable within 5 seconds of ingestion.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'High-throughput ingest requires a Message Queue as a buffer between producers and processors. App Servers (stream processors) consume from the queue, compute aggregations, and write to a Database. A Cache serves hot query results. Near-real-time requires low queue consumer lag.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'object-storage', 'rate-limiter'],
        maxNodes: 10,
        readQps: 50_000,
        writeQps: 500_000,
        latencyTargetMs: 5000,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'message-queue', 'database'],
        requiredFlows: [
          { from: 'api-gateway', to: 'message-queue' },
          { from: 'message-queue', to: 'app-server' },
          { from: 'app-server', to: 'database' },
          { from: 'app-server', to: 'cache' },
        ],
        optimalComponents: ['load-balancer', 'object-storage', 'rate-limiter'],
      },
    },
  },
  {
    id: 'hard-sysdesign-distributed-search',
    difficulty: 'hard',
    prompt:
      'Design a distributed search service (like Elasticsearch): 100,000 search queries/s, 5,000 document index writes/s, p95 < 200ms for search, full-text search across 10TB of data.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Large-scale search needs index partitioning (shards). A Message Queue buffers indexing writes to prevent index-write storms. App Servers fan out queries to shards and merge results. A Cache serves popular query results. Blob Storage holds raw documents; the Database tracks metadata.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'queue', 'message-queue', 'object-storage', 'rate-limiter'],
        maxNodes: 11,
        readQps: 100_000,
        writeQps: 5_000,
        latencyTargetMs: 200,
        sloAvailability: 0.9999,
        requiredComponents: ['app-server', 'cache', 'database', 'message-queue'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'cache' },
          { from: 'message-queue', to: 'app-server' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['object-storage', 'read-replica', 'api-gateway'],
      },
    },
  },
]

export default data
