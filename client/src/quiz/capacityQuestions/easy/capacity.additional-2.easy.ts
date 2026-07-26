const data = [
  {
    id: 'easy-capacity-checkout-rps-10',
    difficulty: 'easy',
    prompt: 'A store processes 4.32 million checkout requests per day. Estimate average requests per second.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Convert daily volume into per-second rate by dividing by 86,400.',
    capacityQuestion: {
      targetValue: 50,
      unitLabel: 'RPS',
      helperText: '4,320,000 / 86,400.',
    },
  },
  {
    id: 'easy-capacity-image-egress-10',
    difficulty: 'easy',
    prompt: 'A service returns 12 KB thumbnails at 2,500 requests per second. Estimate outbound throughput in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Multiply request rate by payload size and convert to MB/s.',
    capacityQuestion: {
      targetValue: 30,
      unitLabel: 'MB/s',
      helperText: '2,500 * 12 KB, divide by 1,000.',
    },
  },
]

export default data
