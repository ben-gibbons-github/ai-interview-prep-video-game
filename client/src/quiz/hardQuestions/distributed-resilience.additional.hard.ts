const data = [
  {
    id: 'hard-consensus-quorum-intersection-2026-01',
    difficulty: 'hard',
    prompt: 'Consensus systems: why must read/write quorums intersect in quorum-based protocols?',
    options: [
      'To ensure at least one common replica can carry latest committed state.',
      'To reduce network hops to exactly one.',
      'To eliminate leader election permanently.',
      'To prevent any node from ever failing.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Quorum intersection preserves correctness by ensuring operations overlap on at least one replica with up-to-date data.',
  },
  {
    id: 'hard-global-ordering-tradeoff-2026-02',
    difficulty: 'hard',
    prompt: 'Global write ordering across regions usually increases which cost the most?',
    options: [
      'Storage compression ratio.',
      'Write latency due to coordination across failure domains.',
      'Observability clarity.',
      'CPU cache locality in clients.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Strong global ordering requires cross-region coordination that typically raises write latency.',
  },
  {
    id: 'hard-saga-orchestration-risk-2026-03',
    difficulty: 'hard',
    prompt: 'Saga orchestration: what is a key failure mode teams must design for?',
    options: [
      'Compensation steps failing and leaving partially completed state.',
      'Perfect exactly-once delivery with no retries.',
      'No need for idempotency in participants.',
      'No need for timeout handling between services.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Sagas need robust retry, timeout, and compensation logic because rollback paths can fail too.',
  },
  {
    id: 'hard-stream-processing-watermark-2026-04',
    difficulty: 'hard',
    prompt: 'Stream processing: what problem do watermarks solve?',
    options: [
      'They encrypt stream payloads at rest.',
      'They estimate event-time progress to handle out-of-order data windows.',
      'They guarantee no duplicate events are ever emitted.',
      'They make batch jobs unnecessary.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Watermarks let systems decide when windows are complete enough despite delayed/out-of-order events.',
  },
  {
    id: 'hard-backpressure-propagation-2026-05',
    difficulty: 'hard',
    prompt: 'High-throughput pipelines: why should backpressure propagate upstream?',
    options: [
      'To hide overload by dropping all metrics.',
      'To prevent unbounded queue growth and memory collapse downstream.',
      'To maximize producer throughput regardless of consumer health.',
      'To remove retries from the architecture.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Without upstream backpressure, producers can outrun consumers, causing runaway queues and instability.',
  },
  {
    id: 'hard-consistent-hashing-rebalance-2026-06',
    difficulty: 'hard',
    prompt: 'Consistent hashing is especially useful because it minimizes what during node membership changes?',
    options: [
      'Replica count and fault tolerance.',
      'The amount of key remapping during rebalancing.',
      'Need for request routing logic.',
      'CPU usage on every client machine.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Consistent hashing limits key movement when nodes join/leave, reducing rebalance churn.',
  },
  {
    id: 'hard-cache-invalidation-write-path-2026-07',
    difficulty: 'hard',
    prompt: 'Cache invalidation on write-heavy systems: why can write-through or write-behind policies be risky?',
    options: [
      'They always guarantee perfect consistency under partitions.',
      'They introduce failure-mode complexity around ordering, durability, and stale reads.',
      'They remove any need for cache eviction strategy.',
      'They make cache hit rate irrelevant to performance.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Cache + write path coupling can create subtle consistency and durability edge cases under partial failures.',
  },
  {
    id: 'hard-failover-split-brain-protection-2026-08',
    difficulty: 'hard',
    prompt: 'Leader failover: why is split-brain protection critical?',
    options: [
      'It allows two active primaries to improve availability.',
      'It prevents concurrent leaders from accepting conflicting writes.',
      'It eliminates network partitions in distributed systems.',
      'It guarantees zero recovery time for every outage.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Split-brain conditions can corrupt data when multiple primaries accept writes independently.',
  },
]

export default data