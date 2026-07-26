const data = [
  {
    id: 'hard-order-items-saga-compensation-10',
    difficulty: 'hard',
    prompt: 'Order a typical saga execution with compensation on downstream failure.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Execute forward steps with durable state transitions; on failure, run compensations in reverse dependency order.',
    orderItems: {
      helperText: 'Arrange saga and compensation flow correctly.',
      items: [
        'Persist saga start and initial state',
        'Execute forward step A and persist success',
        'Execute forward step B and persist success',
        'Forward step C fails after retries',
        'Run compensation for step B',
        'Run compensation for step A',
        'Mark saga as failed with terminal reason',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5, 6],
    },
  },
  {
    id: 'hard-order-items-multi-region-failover-10',
    difficulty: 'hard',
    prompt: 'Order a controlled multi-region failover process.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Validate failure, freeze risky writes, promote standby, redirect traffic, then verify and communicate.',
    orderItems: {
      helperText: 'Put failover actions in the right order.',
      items: [
        'Confirm primary-region failure and blast radius',
        'Apply write safety mode to prevent split-brain',
        'Promote standby region/control plane',
        'Shift read/write traffic via routing controls',
        'Validate consistency and service health',
        'Broadcast failover completion and next steps',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
]

export default data
