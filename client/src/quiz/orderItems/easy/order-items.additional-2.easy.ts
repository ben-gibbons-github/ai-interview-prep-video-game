const data = [
  {
    id: 'easy-order-items-api-request-lifecycle-10',
    difficulty: 'easy',
    prompt: 'Order a typical API request lifecycle.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A request is received, authenticated, processed by business logic, then persisted and returned.',
    orderItems: {
      helperText: 'Put these lifecycle steps in order.',
      items: [
        'Receive request',
        'Authenticate and validate input',
        'Execute business logic',
        'Persist state changes',
        'Return response',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'easy-order-items-cache-miss-flow-10',
    difficulty: 'easy',
    prompt: 'Order a standard cache-miss handling flow.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'On miss, read source-of-truth, store cache, then return response.',
    orderItems: {
      helperText: 'Arrange cache miss steps correctly.',
      items: [
        'Check cache key',
        'Detect miss',
        'Read from source-of-truth',
        'Populate cache',
        'Return response',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
]

export default data
