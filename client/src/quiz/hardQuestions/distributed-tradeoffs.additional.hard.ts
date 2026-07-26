const data = [
  {
    id: 'hard-tradeoff-consensus-vs-availability-9',
    difficulty: 'hard',
    prompt: 'Tradeoffs: when a system needs strict write ordering across regions, what is usually the best architectural direction?',
    options: [
      'Use a single shared leader or consensus layer to serialize writes.',
      'Always choose eventual consistency because it is simpler.',
      'Avoid all replication so conflicts cannot happen.',
      'Let every region accept writes independently with no coordination.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Strict global ordering generally requires a coordination mechanism such as a leader or consensus protocol, because fully independent regional writes cannot guarantee a single order.',
  },
  {
    id: 'hard-tradeoff-hot-partition-mitigation-9',
    difficulty: 'hard',
    prompt: 'Tradeoffs: why is hot-partition mitigation critical in a large distributed system?',
    options: [
      'Because a single skewed key can bottleneck throughput and raise latency.',
      'Because partitions always balance perfectly without intervention.',
      'Because hot keys only matter for batch jobs, never online services.',
      'Because fixing hot partitions removes the need for capacity planning.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Even if average traffic looks healthy, a hot key or partition can become the bottleneck. Mitigation matters because skew can dominate tail latency and overall throughput.',
  },
  {
    id: 'hard-tradeoff-idempotent-consumers-9',
    difficulty: 'hard',
    prompt: 'Tradeoffs: why do high-scale queue consumers usually need idempotency?',
    options: [
      'Because queue delivery can be duplicated or retried under failure.',
      'Because idempotency guarantees no retries are ever needed.',
      'Because consumers only process one message per day.',
      'Because queues cannot store more than one message at a time.',
    ],
    correctIndex: 0,
    correctExplanation:
      'At-least-once systems can redeliver messages, so consumers must tolerate duplicates without producing duplicate side effects.',
  },
  {
    id: 'hard-tradeoff-backpressure-lag-9',
    difficulty: 'hard',
    prompt: 'Operations: why does backpressure matter in stream or queue-based systems?',
    options: [
      'It slows producers before the system becomes unstable.',
      'It makes consumers process work instantly.',
      'It removes the need for monitoring consumer lag.',
      'It guarantees every upstream request succeeds.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Backpressure helps protect the system from overload by slowing the input rate before queues and buffers grow without bound.',
  },
]

export default data