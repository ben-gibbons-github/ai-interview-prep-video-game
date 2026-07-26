const data = [
  {
    id: 'medium-order-items-database-migration-10',
    difficulty: 'medium',
    prompt: 'Order a safe zero-downtime schema migration strategy.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Expand first, dual-read/write if needed, migrate data, switch traffic, then contract.',
    orderItems: {
      helperText: 'Put migration steps in the safest order.',
      items: [
        'Deploy schema expansion (additive changes)',
        'Deploy app that supports old and new schema',
        'Backfill or migrate historical data',
        'Switch reads/writes fully to new schema',
        'Remove deprecated schema paths',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'medium-order-items-incident-comms-10',
    difficulty: 'medium',
    prompt: 'Order the communication timeline during a major incident.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Start with declaration, then updates, mitigation status, and final postmortem summary.',
    orderItems: {
      helperText: 'Arrange incident communication steps in order.',
      items: [
        'Declare incident and assign commander',
        'Send initial stakeholder update',
        'Post regular status updates during mitigation',
        'Announce service recovery and monitor',
        'Publish postmortem follow-ups',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
]

export default data
