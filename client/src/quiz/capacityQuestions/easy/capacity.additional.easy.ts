const data = [
  {
    id: 'easy-capacity-email-delivery-qps-9',
    difficulty: 'easy',
    prompt: 'An email service sends 18 million emails per day. Estimate average send QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Divide daily sends by 86,400 seconds to get average throughput.',
    capacityQuestion: {
      targetValue: 208.33,
      unitLabel: 'QPS',
      helperText: '18,000,000 / 86,400.',
    },
  },
  {
    id: 'easy-capacity-audio-stream-egress-9',
    difficulty: 'easy',
    prompt: 'A podcast platform serves 900 requests/second at 48 KB average response size. Estimate outbound bandwidth in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Bandwidth is request rate times payload size, converted to MB/s for rough sizing.',
    capacityQuestion: {
      targetValue: 43.2,
      unitLabel: 'MB/s',
      helperText: '900 * 48 KB, then divide by 1,000.',
    },
  },
]

export default data