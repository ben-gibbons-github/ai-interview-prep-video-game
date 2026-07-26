const data = [
  {
    id: 'hard-capacity-kv-cache-peak-9',
    difficulty: 'hard',
    prompt: 'A key-value cache averages 90,000 reads/s and peaks at 4.2x average. Estimate peak reads/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Peak capacity planning should multiply average load by a conservative burst factor.',
    capacityQuestion: {
      targetValue: 378000,
      unitLabel: 'QPS',
      helperText: '90,000 * 4.2.',
    },
  },
  {
    id: 'hard-capacity-fanout-mail-9',
    difficulty: 'hard',
    prompt: 'A notification system sends 7.5 million messages/day with a 1.2 KB average payload and 30% fanout overhead. Estimate outbound bandwidth in MB/s.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation:
      'Multiply daily volume by payload and overhead, then divide by seconds per day and convert to MB/s.',
    capacityQuestion: {
      targetValue: 124.31,
      unitLabel: 'MB/s',
      helperText: '7,500,000 * 1.2 KB * 1.3 / 86,400.',
    },
  },
]

export default data