const data = [
  {
    id: 'medium-tradeoff-cache-vs-recompute-9',
    difficulty: 'medium',
    prompt: 'Tradeoffs: when is caching usually better than recomputing every request?',
    options: [
      'When the output is expensive to compute and frequently reused.',
      'When every request must produce unique random data.',
      'When the data changes every millisecond and stale reads are not acceptable.',
      'When the computation cost is always lower than a cache lookup.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Caching is most useful when the result is expensive and reused often enough that reuse beats recomputation plus invalidation cost.',
  },
  {
    id: 'medium-tradeoff-read-replica-9',
    difficulty: 'medium',
    prompt: 'Tradeoffs: what is the main benefit of adding a read replica to a primary database?',
    options: [
      'It removes all replication lag by itself.',
      'It scales read throughput without increasing write capacity much.',
      'It guarantees stronger consistency for all reads.',
      'It eliminates the need for backups and failover.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Read replicas are primarily a read-scaling tool. They improve throughput for read-heavy workloads, though they can introduce replication lag.',
  },
  {
    id: 'medium-tradeoff-queue-buffering-9',
    difficulty: 'medium',
    prompt: 'Tradeoffs: why add a queue between a user-facing API and background work?',
    options: [
      'To buffer bursts and decouple user latency from worker speed.',
      'To guarantee every task runs exactly once with no extra work.',
      'To force all background jobs to run synchronously.',
      'To remove the need for consumer retries and idempotency.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Queues decouple the request path from slower work so the API can stay responsive while workers absorb bursts asynchronously.',
  },
  {
    id: 'medium-tradeoff-observability-slo-9',
    difficulty: 'medium',
    prompt: 'Operations: why are SLOs and error budgets useful for a service team?',
    options: [
      'They replace incident reviews entirely.',
      'They give a measurable target for reliability and release tradeoffs.',
      'They guarantee the service never needs on-call support.',
      'They make metrics unnecessary because the target is already known.',
    ],
    correctIndex: 1,
    correctExplanation:
      'SLOs and error budgets turn reliability into a measurable contract, which helps teams balance feature velocity against stability.',
  },
]

export default data