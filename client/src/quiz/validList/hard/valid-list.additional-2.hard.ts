const data = [
  {
    id: 'hard-valid-list-distributed-idempotency-10',
    difficulty: 'hard',
    prompt: 'Select all controls that materially improve idempotent processing in distributed workflows.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Idempotency requires stable request identity, dedupe state, and deterministic side-effect handling.',
    validList: {
      helperText: 'Choose every control that directly supports idempotent behavior.',
      items: [
        'Require idempotency keys on mutating endpoints',
        'Persist key-to-result mapping for replay window',
        'Make downstream side effects conditional on dedupe outcome',
        'Use deterministic operation identifiers across retries',
        'Generate random IDs per retry attempt',
        'Expire dedupe records immediately after write',
        'Execute side effects before dedupe check',
        'Treat duplicate requests as new by default',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'hard-valid-list-query-scaling-10',
    difficulty: 'hard',
    prompt: 'Select all patterns that usually improve large-scale query performance safely.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Safe scaling combines data-model, indexing, and traffic-shaping techniques.',
    validList: {
      helperText: 'Pick all options that are common scalable query patterns.',
      items: [
        'Use covering indexes for frequent filtered reads',
        'Apply keyset pagination for deep scrolling',
        'Precompute heavy aggregates asynchronously',
        'Limit query fanout with bounded joins',
        'Scan full tables for every request',
        'Disable all query timeouts',
        'Store all entities in one giant partition key',
        'Run schema migrations synchronously in request path',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data
