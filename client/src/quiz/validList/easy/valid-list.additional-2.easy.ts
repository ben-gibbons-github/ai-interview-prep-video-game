const data = [
  {
    id: 'easy-valid-list-observability-basics-10',
    difficulty: 'easy',
    prompt: 'Select all practices that improve baseline observability.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Reliable observability starts with logs, metrics, traces, and actionable alerts.',
    validList: {
      helperText: 'Choose every option that is a standard observability best practice.',
      items: [
        'Structured logs with request IDs',
        'Dashboards for latency/error/traffic/saturation',
        'Distributed tracing for cross-service calls',
        'Alert on SLO burn rate',
        'Only sample logs during incidents',
        'Disable tracing in production permanently',
        'Use random alert thresholds without baselines',
        'Track only average latency',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'easy-valid-list-cache-safety-10',
    difficulty: 'easy',
    prompt: 'Select all cache safety techniques that reduce stale or invalid data risk.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Versioning keys, bounded TTLs, and explicit invalidation reduce stale-data issues.',
    validList: {
      helperText: 'Pick all options that make cache behavior safer.',
      items: [
        'Use key versioning when schema changes',
        'Set bounded TTLs',
        'Invalidate cache entries on source-of-truth writes',
        'Apply jitter to TTL to avoid stampedes',
        'Use infinite TTL for all entries',
        'Bypass source writes to keep cache warm',
        'Never handle cache misses',
        'Return stale data forever by default',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data
