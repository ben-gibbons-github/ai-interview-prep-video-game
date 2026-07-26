const data = [
  {
    id: 'hard-order-items-behavioral-interview-flow-1',
    difficulty: 'hard',
    prompt: 'Order the strongest flow for answering a behavioral interview question from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A high-signal behavioral answer quickly sets context, highlights your ownership and decisions, then closes with measurable outcomes and reflection.',
    orderItems: {
      helperText: 'Build the answer flow you would speak out loud in an interview.',
      items: [
        'Reflect on what you learned and would improve',
        'Set context with concise Situation and Task',
        'State measurable Result and impact',
        'Describe your specific Actions and decisions',
        'Highlight constraints and tradeoffs you managed',
      ],
      correctOrder: [1, 4, 3, 2, 0],
    },
  },
  {
    id: 'hard-order-items-multi-region-write-design-2',
    difficulty: 'hard',
    prompt: 'Order the design sequence for introducing multi-region writes from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Robust multi-region design starts with consistency goals, then conflict strategy, routing, replication, and failure drills.',
    orderItems: {
      helperText: 'Arrange these multi-region design decisions in order.',
      items: [
        'Define consistency and conflict tolerance requirements',
        'Choose conflict resolution model',
        'Define write routing and ownership strategy',
        'Define replication and propagation guarantees',
        'Design failover and partition behavior',
        'Define observability for divergence and lag',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'hard-order-items-consensus-rollout-3',
    difficulty: 'hard',
    prompt: 'Order a safe rollout for a consensus-backed control plane from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Consensus rollout should prove quorum assumptions first, then stage deployment and verify leadership behavior under failure.',
    orderItems: {
      helperText: 'Build the rollout order for a quorum-based system.',
      items: [
        'Validate quorum and fault model assumptions',
        'Deploy to non-critical environment first',
        'Run leader-election and failover drills',
        'Roll out gradually to production shards',
        'Track commit latency and election churn',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'hard-order-items-performance-investigation-4',
    difficulty: 'hard',
    prompt: 'Order an advanced performance investigation flow from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'High-quality investigations isolate user-facing regression first, then tie it to metrics, traces, and constrained experiments.',
    orderItems: {
      helperText: 'Arrange these investigation steps to minimize time-to-root-cause.',
      items: [
        'Define exact latency or throughput regression signal',
        'Slice by endpoint, tenant, and time window',
        'Correlate with infra and deploy events',
        'Trace critical path and identify hot spans',
        'Run focused experiment to validate hypothesis',
        'Ship fix and confirm regression resolved',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'hard-order-items-migration-cutover-plan-5',
    difficulty: 'hard',
    prompt: 'Order a zero-downtime datastore migration cutover plan from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Cutovers need compatibility, dual-run confidence, controlled switch, and rollback readiness before full commitment.',
    orderItems: {
      helperText: 'Arrange these migration tasks by execution phase.',
      items: [
        'Establish schema and API compatibility layer',
        'Backfill historical data',
        'Enable dual writes and consistency checks',
        'Shadow read and compare responses',
        'Switch primary reads/writes gradually',
        'Deactivate old path after stability window',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'hard-order-items-incident-postmortem-6',
    difficulty: 'hard',
    prompt: 'Order a strong postmortem workflow after a severe outage from 1 to 5.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'A strong postmortem captures timeline and impact, then root causes, corrective actions, and ownership with deadlines.',
    orderItems: {
      helperText: 'Arrange these postmortem sections in order.',
      items: [
        'Document customer impact and outage timeline',
        'Identify technical and process root causes',
        'List corrective actions with owners',
        'Define prevention guardrails and detection changes',
        'Review completion and effectiveness later',
      ],
      correctOrder: [0, 1, 2, 3, 4],
    },
  },
  {
    id: 'hard-order-items-behavioral-leadership-conflict-7',
    difficulty: 'hard',
    prompt: 'Order a leadership-level behavioral answer about team conflict from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'High-level behavioral answers should show context, stake alignment, intervention, measurable outcome, and long-term process improvement.',
    orderItems: {
      helperText: 'Arrange this conflict-resolution narrative in the strongest interview order.',
      items: [
        'State context and why conflict mattered',
        'Describe viewpoints and constraints of each side',
        'Describe how you facilitated alignment',
        'Describe decision and execution path',
        'Quantify team or delivery outcome',
        'Share sustained process improvement afterward',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    id: 'hard-order-items-security-incident-triage-8',
    difficulty: 'hard',
    prompt: 'Order the triage flow for a suspected security incident from 1 to 6.',
    options: ['Correct order submitted', 'Incorrect order submitted'],
    correctIndex: 0,
    correctExplanation:
      'Security response prioritizes containment and evidence integrity before eradication, recovery, and compliance communication.',
    orderItems: {
      helperText: 'Arrange these actions in incident-response priority order.',
      items: [
        'Assess alert credibility and scope quickly',
        'Contain affected systems and credentials',
        'Preserve forensic evidence and timelines',
        'Eradicate root cause and vulnerabilities',
        'Recover services with heightened monitoring',
        'Notify stakeholders and complete reporting',
      ],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
  },
]

export default data
