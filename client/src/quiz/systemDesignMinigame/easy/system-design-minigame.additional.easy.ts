const data = [
  {
    id: 'easy-sysdesign-password-reset-9',
    difficulty: 'easy',
    prompt:
      'Design a password reset flow: 4,000 reads/s, 400 writes/s, p95 < 200ms. Users must receive reset links reliably and tokens must expire quickly.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'A reset flow needs App Servers plus a Database for token state, and a Message Queue or email delivery layer so email sending can be retried without blocking the user request path.',
    systemDesign: {
      scenario: {
        availableComponents: ['api-gateway', 'load-balancer', 'app-server', 'cache', 'database', 'queue', 'message-queue', 'rate-limiter'],
        maxNodes: 7,
        readQps: 4_000,
        writeQps: 400,
        latencyTargetMs: 200,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'database', 'message-queue'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'database' },
          { from: 'app-server', to: 'message-queue' },
        ],
        optimalComponents: ['api-gateway', 'rate-limiter', 'cache'],
      },
    },
  },
  {
    id: 'easy-sysdesign-image-upload-9',
    difficulty: 'easy',
    prompt:
      'Design an image upload service: 8,000 reads/s, 1,500 writes/s, p95 < 150ms for upload initiation. Images should be stored durably and served quickly after upload.',
    options: ['Design submitted', 'Design skipped'],
    correctIndex: 0,
    correctExplanation:
      'An upload service needs App Servers plus object storage for durability, and a CDN or cache path for fast reads after upload.',
    systemDesign: {
      scenario: {
        availableComponents: ['load-balancer', 'app-server', 'cache', 'database', 'cdn', 'object-storage', 'rate-limiter'],
        maxNodes: 8,
        readQps: 8_000,
        writeQps: 1_500,
        latencyTargetMs: 150,
        sloAvailability: 0.999,
        requiredComponents: ['app-server', 'object-storage'],
        requiredFlows: [
          { from: 'load-balancer', to: 'app-server' },
          { from: 'app-server', to: 'object-storage' },
          { from: 'cdn', to: 'object-storage' },
        ],
        optimalComponents: ['cdn', 'cache', 'rate-limiter'],
      },
    },
  },
]

export default data