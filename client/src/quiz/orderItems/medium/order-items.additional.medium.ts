const data = [
  {
    id: 'medium-order-items-database-migration-9',
    difficulty: 'medium',
    prompt: 'Order a safe database migration workflow.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A safe migration flow is to deploy backward-compatible code first, then migrate data, then switch reads or writes, and finally clean up.',
    orderItems: {
      helperText: 'Arrange the migration steps in the safest order.',
      items: [
        'Deploy backward-compatible application code',
        'Run the schema or data migration',
        'Switch traffic to the new code path',
        'Remove old compatibility code after validation',
      ],
      correctOrder: [0, 1, 2, 3],
    },
  },
  {
    id: 'medium-order-items-system-design-outline-9',
    difficulty: 'medium',
    prompt: 'Order a compact system design interview outline.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A good outline starts with requirements, then estimates, then core components, data flow, and finally bottlenecks and tradeoffs.',
    orderItems: {
      helperText: 'Put the design discussion in a sensible interview order.',
      items: [
        'Clarify functional and non-functional requirements',
        'Estimate scale and traffic',
        'Choose core components and data model',
        'Walk through request flow and failure handling',
        'Discuss bottlenecks and tradeoffs',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
]

export default data