const data = [
  {
    id: 'easy-order-items-incident-flow-9',
    difficulty: 'easy',
    prompt: 'Order the steps for a simple production incident response flow.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A practical incident flow is to detect the problem, mitigate impact, investigate root cause, and then document follow-up work.',
    orderItems: {
      helperText: 'Arrange these incident actions in the best order.',
      items: [
        'Detect or acknowledge the incident',
        'Mitigate user impact',
        'Investigate root cause',
        'Write follow-up actions and lessons learned',
      ],
      correctOrder: [0, 1, 2, 3],
    },
  },
  {
    id: 'easy-order-items-release-checklist-9',
    difficulty: 'easy',
    prompt: 'Order a safe release checklist from start to finish.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A safe release flow starts with validation in staging, then rollout, then observation and rollback readiness.',
    orderItems: {
      helperText: 'Put the release steps in order.',
      items: [
        'Run tests in staging',
        'Deploy gradually',
        'Watch dashboards and logs',
        'Rollback if the rollout regresses',
      ],
      correctOrder: [0, 1, 2, 3],
    },
  },
]

export default data