const data = [
  {
    id: 'medium-capacity-social-feed-reads-1',
    difficulty: 'medium',
    prompt: 'A feed service has 18 million DAU. Each user opens feed 14 times/day. Estimate average feed-read QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Total daily feed reads are DAU * opens/day, then divide by 86,400 for average QPS.',
    capacityQuestion: {
      targetValue: 2916.67,
      unitLabel: 'QPS',
      helperText: '18,000,000 * 14 / 86,400.',
    },
  },
  {
    id: 'medium-capacity-video-upload-ingress-2',
    difficulty: 'medium',
    prompt: 'Users upload 1.2 million videos/day with average size 55 MB. Estimate average ingress bandwidth in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Ingress rate is daily bytes divided by day seconds; this is average, not peak.',
    capacityQuestion: {
      targetValue: 763.89,
      unitLabel: 'MB/s',
      helperText: '1,200,000 * 55 MB / 86,400.',
    },
  },
  {
    id: 'medium-capacity-index-size-3',
    difficulty: 'medium',
    prompt: 'A search index stores 850 million docs with 1.8 KB average index footprint. Estimate index size in TB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Multiply document count by per-document index bytes and convert to TB for high-level sizing.',
    capacityQuestion: {
      targetValue: 1.53,
      unitLabel: 'TB',
      helperText: '850,000,000 * 1.8 KB then convert to TB.',
    },
  },
  {
    id: 'medium-capacity-event-stream-throughput-4',
    difficulty: 'medium',
    prompt: 'An event pipeline processes 75,000 events/second at 650 bytes/event. Estimate throughput in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Throughput is events per second times bytes per event. Convert bytes/s to MB/s.',
    capacityQuestion: {
      targetValue: 48.75,
      unitLabel: 'MB/s',
      helperText: '75,000 * 650 bytes, then convert to MB/s.',
    },
  },
  {
    id: 'medium-capacity-replica-storage-annual-5',
    difficulty: 'medium',
    prompt: 'A database grows 420 GB/day raw and keeps 3 full replicas. Estimate annual storage in TB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Annual storage is daily growth * replicas * 365, then converted to TB.',
    capacityQuestion: {
      targetValue: 459.9,
      unitLabel: 'TB/year',
      helperText: '420 * 3 * 365 / 1,000.',
    },
  },
]

export default data
