const data = [
  {
    id: 'hard-valid-list-distributed-systems-9',
    difficulty: 'hard',
    prompt: 'Select all valid techniques for keeping a large distributed system stable under bursty traffic.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Stability usually comes from backpressure, rate limiting, partitioning, caching, and graceful degradation.',
    validList: {
      helperText: 'Choose every technique that generally improves stability under load.',
      items: [
        'Use rate limiting at the ingress tier',
        'Partition work so one hot shard cannot dominate all traffic',
        'Buffer bursts with a queue or stream',
        'Degrade non-critical functionality under stress',
        'Let every request bypass all protection',
        'Disable observability to reduce overhead',
        'Route all traffic to one instance to reduce coordination',
        'Remove retries so clients must fail permanently',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'hard-valid-list-search-architecture-9',
    difficulty: 'hard',
    prompt: 'Select all valid choices when designing a large-scale search backend.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Search backends usually need sharding, indexing pipelines, caches for hot queries, and metadata storage separated from raw content.',
    validList: {
      helperText: 'Pick every choice that makes the search system more scalable and operationally sane.',
      items: [
        'Shard the search index',
        'Use a queue or stream for index updates',
        'Cache popular queries',
        'Store raw documents separately from metadata',
        'Put the entire corpus into one monolithic primary table',
        'Force every query to recompute the full index',
        'Treat the search tier as fully write-only',
        'Disable all query caching to guarantee freshness',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data