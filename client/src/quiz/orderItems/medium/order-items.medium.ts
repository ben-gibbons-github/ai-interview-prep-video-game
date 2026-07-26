const data = [
  {
    id: 'medium-order-items-system-design-interview-flow-1',
    difficulty: 'medium',
    prompt: 'Order the phases of a system design interview from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Interviewers usually expect a progression from requirements to rough sizing, architecture, deep dives, and explicit tradeoff discussion before wrapping up.',
    orderItems: {
      helperText: 'Arrange the design process in the order you would present it.',
      items: [
        'Discuss tradeoffs and bottlenecks',
        'Estimate scale and capacity',
        'Clarify functional and non-functional requirements',
        'Dive into data model and key APIs',
        'Sketch high-level architecture',
        'Summarize and call out next improvements',
      ],
      correctOrder: [2, 1, 4, 3, 0, 5],
    },
  },
  {
    id: 'medium-order-items-system-design-deep-dive-2',
    difficulty: 'medium',
    prompt: 'Order a focused deep-dive segment in a system design interview from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A useful deep dive frames the target risk first, then walks through data flow, failure handling, and tradeoffs.',
    orderItems: {
      helperText: 'Arrange these deep-dive moves in a high-signal order.',
      items: [
        'Pick one risky subsystem to zoom into',
        'Explain read and write request flow',
        'Discuss failure and retry behavior',
        'Mention scaling bottlenecks',
        'Offer tradeoffs and alternatives',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'medium-order-items-capacity-estimation-3',
    difficulty: 'medium',
    prompt: 'Order a capacity-estimation workflow for interview discussion from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Reliable estimates start with assumptions, then traffic, storage, throughput, and finally headroom planning.',
    orderItems: {
      helperText: 'Put these sizing actions in the order you would present them.',
      items: [
        'State traffic and usage assumptions',
        'Estimate peak requests per second',
        'Estimate daily and yearly storage growth',
        'Estimate read/write bandwidth needs',
        'Estimate compute or shard count',
        'Add safety margin and growth headroom',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'medium-order-items-requirements-clarification-4',
    difficulty: 'medium',
    prompt: 'Order requirement clarification questions for a new design prompt from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Start broad with goal and scope, then quantify load, define consistency, and lock non-functional targets.',
    orderItems: {
      helperText: 'Arrange the clarification sequence.',
      items: [
        'Define core user goal and scope',
        'Ask for scale and peak traffic',
        'Ask for latency and availability targets',
        'Ask for consistency and durability expectations',
        'Confirm major constraints and exclusions',
      ],
      correctOrder: [0, 1, 3, 2, 4],
    },
  },
  {
    id: 'medium-order-items-incident-response-5',
    difficulty: 'medium',
    prompt: 'Order a production incident response flow from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Strong incident handling prioritizes impact containment before root cause, then verification and communication.',
    orderItems: {
      helperText: 'Arrange these incident-response steps in priority order.',
      items: [
        'Assess blast radius and customer impact',
        'Mitigate and stop further damage',
        'Establish timeline and likely trigger',
        'Identify root cause',
        'Validate recovery and monitor closely',
        'Publish summary and prevention actions',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'medium-order-items-cache-strategy-6',
    difficulty: 'medium',
    prompt: 'Order the process for introducing a cache safely from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Safe cache rollouts begin with target access pattern, then policy, invalidation, fallback, and observability.',
    orderItems: {
      helperText: 'Arrange this caching strategy sequence.',
      items: [
        'Identify hot read paths and hit-rate target',
        'Choose cache key and TTL policy',
        'Define invalidation strategy',
        'Define fallback behavior on cache miss or outage',
        'Add metrics for hit rate and stale responses',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'medium-order-items-message-queue-design-7',
    difficulty: 'medium',
    prompt: 'Order a message-queue design explanation from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Queue design explanations should establish producer/consumer contract, delivery semantics, failure handling, and monitoring.',
    orderItems: {
      helperText: 'Place these queue-design topics in a coherent interview order.',
      items: [
        'Define producer and consumer responsibilities',
        'Define message schema and partitioning key',
        'Choose delivery semantics and retries',
        'Handle dead-letter and poison messages',
        'Measure lag and processing throughput',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'medium-order-items-api-rollout-plan-8',
    difficulty: 'medium',
    prompt: 'Order a safe API rollout plan from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Safe rollout order is compatibility planning, staged release, validation, then full rollout with monitoring.',
    orderItems: {
      helperText: 'Arrange these rollout tasks by execution order.',
      items: [
        'Design backward-compatible contract changes',
        'Deploy behind feature flag or canary',
        'Validate key success and error metrics',
        'Expand rollout gradually',
        'Finalize and monitor for regressions',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
]

export default data
