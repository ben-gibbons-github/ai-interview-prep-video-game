const data = [
  {
    id: 'easy-sysdesign-url-shortener',
    difficulty: 'easy',
    prompt:
      'Design a URL shortener service: 15,000 reads/s, 500 writes/s, p95 latency < 200ms. Drag components, connect them, and configure their properties.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A URL shortener at this scale needs a Load Balancer + 2+ App Servers for redundancy, a Cache (LRU, short TTL) to absorb the 30:1 read:write ratio, and a Database. CDN helps for even lower redirect latency.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'cdn', 'rate-limiter'],
        maxNodes: 9,
        readQps: 15_000,
        writeQps: 500,
        latencyTargetMs: 200,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'database'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['load-balancer', 'cache', 'cdn'],
      },
    },
  },
  {
    id: 'easy-sysdesign-user-profile',
    difficulty: 'easy',
    prompt:
      'Design a read-heavy user profile service: 20,000 reads/s, 200 writes/s, p95 < 150ms. Profiles are rarely updated but read constantly.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A read-heavy profile service benefits greatly from a Cache layer (high TTL, LRU eviction) to reduce database load. Load Balancer + multiple App Servers handle traffic. A Read Replica offloads the primary DB.',
    systemDesign: {
      scenario: {
        availableComponents: ['load-balancer', 'app-server', 'cache', 'database', 'read-replica', 'cdn', 'rate-limiter'],
        maxNodes: 8,
        readQps: 20_000,
        writeQps: 200,
        latencyTargetMs: 150,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'cache', 'database'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'cache' },
          { from: 'app-server', to: 'database' },
        ],
        optimalComponents: ['load-balancer', 'read-replica'],
      },
    },
  },
  {
    id: 'easy-sysdesign-image-cdn',
    difficulty: 'easy',
    prompt:
      'Design an image hosting service: 50,000 image reads/s, 1,000 uploads/s, p95 < 100ms for reads. Images are immutable once uploaded.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'Immutable images are perfect for CDN offloading. The App Server handles uploads to Blob Storage, while the CDN serves cached images globally. A high CDN TTL (3600s+) dramatically reduces origin load.',
    systemDesign: {
      scenario: {
        availableComponents: ['load-balancer', 'app-server', 'cache', 'database', 'cdn', 'object-storage', 'rate-limiter'],
        maxNodes: 8,
        readQps: 50_000,
        writeQps: 1_000,
        latencyTargetMs: 100,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'cdn', 'object-storage'],
        requiredFlows: [
          { from: 'app-server', to: 'object-storage' },
          { from: 'cdn', to: 'object-storage' },
        ],
        optimalComponents: ['load-balancer', 'database', 'cache'],
      },
    },
  },
]

export default data
