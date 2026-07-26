const data = [
  {
    id: 'hard-capacity-fanout-notifications-10',
    difficulty: 'hard',
    prompt: 'A notification system receives 140k trigger events/minute. Each event fans out to 38 recipients. Estimate downstream notification writes per second.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Convert trigger rate to per-second then multiply by fanout.',
    capacityQuestion: {
      targetValue: 88666.67,
      unitLabel: 'writes/s',
      helperText: '(140,000 / 60) * 38.',
      tolerancePercent: 0.18,
    },
  },
  {
    id: 'hard-capacity-query-cpu-budget-10',
    difficulty: 'hard',
    prompt: 'A service handles 24k RPS. Average CPU per request is 3.8 ms on one core. Estimate cores required at 65% target utilization.',
    options: ['Estimate submitted', 'Estimate outside tolerance'],
    correctIndex: 0,
    correctExplanation: 'Compute total CPU-seconds per second then divide by utilization target.',
    capacityQuestion: {
      targetValue: 140.31,
      unitLabel: 'cores',
      helperText: '24,000 * 0.0038 / 0.65.',
      tolerancePercent: 0.2,
    },
  },
]

export default data
