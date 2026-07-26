const data = [
  {
    id: 'medium-scaling-shard-key-choice-2026-01',
    difficulty: 'medium',
    prompt: 'Sharding: what is the biggest risk when choosing a poor shard key?',
    options: [
      'Cold-start latencies disappear completely.',
      'Traffic skews to hot partitions that bottleneck the cluster.',
      'Replication lag is automatically solved.',
      'Schema migrations are no longer needed.',
    ],
    correctIndex: 1,
    correctExplanation:
      'A bad shard key can concentrate load and create hotspots, harming throughput and tail latency.',
  },
  {
    id: 'medium-read-write-split-consistency-2026-02',
    difficulty: 'medium',
    prompt: 'Read/write splitting: what user-facing issue can appear when reading from replicas immediately after write?',
    options: [
      'Guaranteed stronger consistency.',
      'Read-after-write staleness due to replication lag.',
      'Infinite write throughput.',
      'No need for failover planning.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Replica lag can cause recently written data to be temporarily missing on reads.',
  },
  {
    id: 'medium-api-idempotency-key-payment-2026-03',
    difficulty: 'medium',
    prompt: 'Payments API: what does an idempotency key primarily protect against?',
    options: [
      'Duplicate side effects when clients retry requests.',
      'SQL injection attacks in all queries.',
      'All eventual consistency tradeoffs.',
      'Cross-region network latency.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Idempotency keys let servers deduplicate retried operations and avoid duplicate charges/orders.',
  },
  {
    id: 'medium-eventual-consistency-compensation-2026-04',
    difficulty: 'medium',
    prompt: 'Distributed workflows: why are compensating actions important in eventual-consistency systems?',
    options: [
      'They replace durable storage.',
      'They undo or correct earlier steps when later steps fail.',
      'They guarantee zero failure rates.',
      'They remove ordering concerns from event streams.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Compensation provides practical recovery when multi-step distributed operations partially succeed.',
  },
  {
    id: 'medium-observability-golden-signals-2026-05',
    difficulty: 'medium',
    prompt: 'Observability: why do teams track latency, traffic, errors, and saturation together?',
    options: [
      'Because one metric is enough for all incidents.',
      'They give a balanced picture of user impact and system stress.',
      'To avoid defining SLOs.',
      'To remove the need for tracing.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Combining these signals helps detect failures, performance regressions, and capacity limits quickly.',
  },
  {
    id: 'medium-queue-dead-letter-purpose-2026-06',
    difficulty: 'medium',
    prompt: 'Messaging: what is a dead-letter queue mainly for?',
    options: [
      'To process high-priority messages faster than normal.',
      'To isolate repeatedly failing messages for inspection and remediation.',
      'To replace primary storage for all data.',
      'To guarantee exactly-once processing by itself.',
    ],
    correctIndex: 1,
    correctExplanation:
      'DLQs prevent poison messages from blocking normal processing and support targeted debugging.',
  },
  {
    id: 'medium-capacity-p99-vs-average-2026-07',
    difficulty: 'medium',
    prompt: 'Capacity planning: why can average latency be misleading for user experience?',
    options: [
      'Averages hide tail latency spikes that many users still feel.',
      'P99 is always lower than average latency.',
      'Average latency removes the need for autoscaling.',
      'Averages cannot be computed for web services.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Tail metrics (like p95/p99) better capture worst-case user-visible slowness under load.',
  },
  {
    id: 'medium-schema-migration-expand-contract-2026-08',
    difficulty: 'medium',
    prompt: 'Database migrations: why is expand-contract safer than a single big schema cutover?',
    options: [
      'It avoids all application code changes.',
      'It allows backward-compatible rollout phases and easier rollback.',
      'It removes the need to test migrations.',
      'It guarantees no lock contention.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Expand-contract lets old and new versions coexist while rolling out gradually, reducing migration risk.',
  },
]

export default data