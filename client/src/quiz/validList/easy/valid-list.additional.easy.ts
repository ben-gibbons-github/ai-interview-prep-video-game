const data = [
  {
    id: 'easy-valid-list-backend-safety-9',
    difficulty: 'easy',
    prompt: 'Select all backend practices that usually improve reliability.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Reliability improves with timeouts, retries with backoff, health checks, and graceful degradation.',
    validList: {
      helperText: 'Choose every practice that is generally a reliability win.',
      items: [
        'Use request timeouts',
        'Retry with exponential backoff',
        'Expose health checks to load balancers',
        'Degrade non-critical features during incidents',
        'Ignore failures and hope they clear up',
        'Disable monitoring to reduce noise',
        'Send every request to one instance only',
        'Remove all fallback behavior',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'easy-valid-list-data-cache-fit-9',
    difficulty: 'easy',
    prompt: 'Select all situations where a cache is usually a good fit.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Caches shine on repeated reads, expensive recomputation, and hot data that can tolerate short staleness.',
    validList: {
      helperText: 'Pick every scenario where caching tends to help.',
      items: [
        'Repeated product detail lookups',
        'Hot leaderboard reads',
        'Expensive report aggregation',
        'User profile pages with moderate staleness tolerance',
        'Strictly unique one-time tokens',
        'Write-once audit logs',
        'Strongly consistent payment ledger writes',
        'Data that changes every millisecond and cannot be stale',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data