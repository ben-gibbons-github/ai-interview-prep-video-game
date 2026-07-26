const data = [
  {
    id: 'hard-order-items-shard-migration-9',
    difficulty: 'hard',
    prompt: 'Order a safe sharded-database migration workflow.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A safe shard migration usually starts with routing abstraction, then dual writes or backfills, then cutover, and only after validation does cleanup happen.',
    orderItems: {
      helperText: 'Arrange these migration steps in the safest sequence.',
      items: [
        'Introduce routing or lookup abstraction',
        'Backfill existing data into the new shard layout',
        'Enable dual writes or shadow traffic',
        'Cut over reads and writes to the new shards',
        'Remove legacy paths after validation',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'hard-order-items-global-rollout-9',
    difficulty: 'hard',
    prompt: 'Order the steps for a low-risk global rollout of a new backend feature.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A low-risk rollout uses instrumentation first, then a small exposure, then gradual expansion, and finally post-rollout cleanup.',
    orderItems: {
      helperText: 'Put the rollout steps in the most operationally safe order.',
      items: [
        'Add metrics and alerts',
        'Roll out to a small canary cohort',
        'Gradually expand traffic if healthy',
        'Remove temporary safeguards after full rollout',
      ],
      correctOrder: [0, 1, 2, 3],
    },
  },
]

export default data