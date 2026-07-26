const data = [
  {
    id: 'easy-capacity-url-shortener-qps-1',
    difficulty: 'easy',
    prompt: 'A URL shortener has 12 million daily redirects. Estimate average read QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Average QPS is daily requests divided by 86,400 seconds. This is baseline average before peak multipliers.',
    capacityQuestion: {
      targetValue: 138.89,
      unitLabel: 'QPS',
      helperText: 'Use 12,000,000 / 86,400.',
    },
  },
  {
    id: 'easy-capacity-messaging-write-qps-2',
    difficulty: 'easy',
    prompt: 'A chat app sends 43.2 million messages per day. Estimate average message write QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Average writes per second come from total daily writes divided by seconds in a day.',
    capacityQuestion: {
      targetValue: 500,
      unitLabel: 'QPS',
      helperText: 'Compute 43,200,000 / 86,400.',
    },
  },
  {
    id: 'easy-capacity-media-storage-growth-3',
    difficulty: 'easy',
    prompt: 'A service stores 250,000 photos/day at 1.6 MB each. Estimate daily storage growth in GB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Multiply uploads by size, then convert MB to GB using 1,000 MB = 1 GB for rough interview math.',
    capacityQuestion: {
      targetValue: 400,
      unitLabel: 'GB/day',
      helperText: '250,000 * 1.6 MB then convert to GB.',
    },
  },
  {
    id: 'easy-capacity-api-bandwidth-out-4',
    difficulty: 'easy',
    prompt: 'An API serves 2,000 requests/second with a 12 KB average response. Estimate outbound bandwidth in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Bandwidth is request rate times payload size. Convert KB/s to MB/s after multiplication.',
    capacityQuestion: {
      targetValue: 24,
      unitLabel: 'MB/s',
      helperText: '2,000 * 12 KB then divide by 1,000.',
    },
  },
  {
    id: 'easy-capacity-cache-memory-5',
    difficulty: 'easy',
    prompt: 'You want to cache 8 million keys at 120 bytes each. Estimate required memory in GB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Total memory is key count times per-entry bytes, then convert bytes to GB for rough sizing.',
    capacityQuestion: {
      targetValue: 0.96,
      unitLabel: 'GB',
      helperText: '8,000,000 * 120 bytes then convert to GB.',
    },
  },
]

export default data
