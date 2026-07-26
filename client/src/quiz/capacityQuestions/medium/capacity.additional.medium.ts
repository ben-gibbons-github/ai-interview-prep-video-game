const data = [
  {
    id: 'medium-capacity-chat-message-load-9',
    difficulty: 'medium',
    prompt: 'A chat platform has 26 million daily messages. Estimate average message write QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Convert daily volume into average per-second write throughput by dividing by seconds per day.',
    capacityQuestion: {
      targetValue: 300.93,
      unitLabel: 'QPS',
      helperText: '26,000,000 / 86,400.',
    },
  },
  {
    id: 'medium-capacity-cache-footprint-9',
    difficulty: 'medium',
    prompt: 'A feature flag store keeps 180 million entries at 96 bytes each. Estimate total storage in GB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Multiply entry count by bytes per entry and convert bytes into GB for rough capacity planning.',
    capacityQuestion: {
      targetValue: 17.28,
      unitLabel: 'GB',
      helperText: '180,000,000 * 96 bytes, then convert to GB.',
    },
  },
]

export default data