const data = [
  {
    id: 'hard-capacity-global-api-peak-1',
    difficulty: 'hard',
    prompt: 'A global API averages 28,000 QPS and peak is 3.4x average. Estimate peak QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Peak planning multiplies average load by a realistic burst factor before choosing shard and instance counts.',
    capacityQuestion: {
      targetValue: 95200,
      unitLabel: 'QPS',
      helperText: '28,000 * 3.4.',
    },
  },
  {
    id: 'hard-capacity-multi-region-egress-2',
    difficulty: 'hard',
    prompt: 'A service serves 9,500 QPS globally with 38 KB average payload, and 40% of traffic crosses regions. Estimate cross-region egress in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Cross-region egress is total response throughput multiplied by cross-region traffic percentage.',
    capacityQuestion: {
      targetValue: 144.4,
      unitLabel: 'MB/s',
      helperText: '9,500 * 38 KB * 0.4 then convert to MB/s.',
    },
  },
  {
    id: 'hard-capacity-hot-partition-3',
    difficulty: 'hard',
    prompt: 'A key-value cluster handles 240,000 writes/s across 120 partitions, but hottest partition gets 7% of writes. Estimate hot-partition write QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Hot-key planning uses skewed traffic share rather than uniform partition assumptions.',
    capacityQuestion: {
      targetValue: 16800,
      unitLabel: 'QPS',
      helperText: '240,000 * 0.07.',
    },
  },
  {
    id: 'hard-capacity-consumer-backlog-recovery-4',
    difficulty: 'hard',
    prompt: 'A queue has 1.8 billion pending messages. Consumers process 95,000 msgs/s net of new writes. Estimate recovery time in hours.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Recovery time is backlog divided by effective net drain rate, then converted to hours.',
    capacityQuestion: {
      targetValue: 5.26,
      unitLabel: 'hours',
      helperText: '1,800,000,000 / 95,000 / 3,600.',
    },
  },
  {
    id: 'hard-capacity-shard-count-5',
    difficulty: 'hard',
    prompt: 'Each DB shard safely supports 14,500 peak writes/s. Planned peak is 162,000 writes/s with 25% headroom target. Estimate required shard count.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Required shards should include explicit headroom: ceil((peak * headroom factor) / shard capacity).',
    capacityQuestion: {
      targetValue: 14,
      unitLabel: 'shards',
      helperText: 'ceil(162,000 * 1.25 / 14,500).',
    },
  },
]

export default data
