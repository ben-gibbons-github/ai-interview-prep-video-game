const data = [
  {
    id: 'medium-capacity-chat-events-10',
    difficulty: 'medium',
    prompt: 'A chat platform has 18 million DAU. Each user sends 22 messages/day on average. Estimate average message ingest QPS.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Compute daily events then divide by seconds/day for average ingest rate.',
    capacityQuestion: {
      targetValue: 4583.33,
      unitLabel: 'QPS',
      helperText: '18,000,000 * 22 / 86,400.',
      tolerancePercent: 0.2,
    },
  },
  {
    id: 'medium-capacity-video-metadata-storage-10',
    difficulty: 'medium',
    prompt: 'A service ingests 65 million videos/year. Metadata per video averages 3.2 KB replicated 3x. Estimate yearly metadata storage growth in TB.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Multiply objects by metadata size and replication factor, then convert to TB.',
    capacityQuestion: {
      targetValue: 0.624,
      unitLabel: 'TB/year',
      helperText: '65,000,000 * 3.2 KB * 3, convert KB to TB.',
      tolerancePercent: 0.25,
    },
  },
]

export default data
