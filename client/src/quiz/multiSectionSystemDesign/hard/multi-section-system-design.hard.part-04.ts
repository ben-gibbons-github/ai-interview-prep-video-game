const data = [
  {
      id: 'hard-multi-section-system-design-global-notifications',
      difficulty: 'hard',
      prompt:
        'Design a global notifications platform handling 1.8M sends/s across push, email, and SMS with strict dedupe and user preference controls. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers lock event-to-delivery semantics and user preferences first, then define latency/accuracy SLOs, then choose queueing, throttling, and provider failover. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Notifications Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
        scenarioSummary:
          'High-volume, multi-channel delivery with dedupe, opt-out compliance, and provider resilience. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'notif-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
            title: 'Phase 1 - Functional requirements: delivery contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs.',
            prompt: 'What must be explicit first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
            options: [
              'Idempotent send contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Versioned delivery contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'Channel routing contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Preference evaluation contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Retry semantics contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Provider failover contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
          ],
          correctIndex: 0,
            helperText: 'Idempotency prevents duplicate notifications.',
          },
          {
            id: 'notif-functional-preferences',
            title: 'Phase 1 - Functional requirements: user preferences',
            prompt: 'How should preferences be treated?',
            options: [
  
  
              'Hard gate before send.',
              'Best effort filter. wi',
              'Filter after send. wit',
              'Campaign-only filter..',
              'Manual review only. wi',
              'Ignore preferences. wi',
          ],
          correctIndex: 0,
            helperText: 'Preference checks must happen in the critical path.',
          },
          {
            id: 'notif-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: latency',
            prompt: 'What latency target is best?',
            options: [
  
  
              'Channel-specific p95 SLOs.',
              'Tenant-tiered latency with',
              'Campaign-priority latency.',
              'Provider-specific latency.',
              'Region-specific latency wi',
              'Delivery-stage latency wit',
          ],
          correctIndex: 0,
            helperText: 'Each channel has different delivery characteristics.',
          },
          {
            id: 'notif-capacity-queueing',
            title: 'Phase 3 - Scaling and capacity: queue design',
            prompt: 'What queue shape is best?',
            options: [
  
  
              'Partitioned durable queues.',
              'Partitioned delayed queues.',
              'Ordered regional queues. wi',
              'Replicated priority queues.',
              'Tenant-isolated retry with.',
              'Provider-scoped intake with',
          ],
          correctIndex: 0,
            helperText: 'Durable partitioned queues are required at this scale.',
          },
          {
            id: 'notif-capacity-throttling',
            title: 'Phase 3 - Scaling and capacity: throttling',
            prompt: 'How to handle provider limits?',
            options: [
  
  
              'Per-provider token buckets.',
              'Per-tenant token buckets. w',
              'Per-region rate budgets. wi',
              'Priority-weighted send with',
              'Adaptive queue backpressure',
              'Concurrency-limited worker.',
          ],
          correctIndex: 0,
            helperText: 'Need adaptive, per-provider controls.',
          },
          {
            id: 'notif-architecture-routing',
            title: 'Phase 4 - Architecture decisions: channel routing',
            prompt: 'How should channel selection work?',
            options: [
  
  
              'Policy engine + fallback chain.',
              'Scored routing decision tree. w',
              'Channel cost optimization. with',
              'Tenant-pinned channel routing..',
              'Provider-affinity routing plan.',
              'Regional routing fallback. with',
          ],
          correctIndex: 0,
            helperText: 'Routing needs policy + graceful fallback.',
          },
          {
            id: 'notif-deep-dive-dedupe',
            title: 'Phase 5 - Component deep dive: dedupe',
            prompt: 'Best dedupe strategy?',
            options: [
  
  
              'Idempotency key store.',
              'Payload hash only. wit',
              'Client dedupe only. wi',
              'No dedupe layer. with.',
              'Daily dedupe batch. wi',
              'Email subject dedupe..',
          ],
          correctIndex: 0,
            helperText: 'Explicit idempotency keys are robust and auditable.',
          },
          {
            id: 'notif-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which metrics matter most?',
            options: [
  
  
              'Delivery rate + lag + duplicates.',
              'Retry age + backlog + saturation.',
              'Error rate + backlog + saturation',
              'Provider latency + backlog + with',
              'Opt-out rate + backlog + with cle',
              'Queue churn + backlog + with clea',
          ],
          correctIndex: 0,
            helperText: 'Need throughput, latency, and correctness metrics.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-realtime-matchmaking',
      difficulty: 'hard',
      prompt:
        'Design a real-time game matchmaking service for 12M DAU with p95 match time under 8 seconds and strict anti-smurf safeguards. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define match quality and fairness constraints first, then set queue-time SLOs, then design pool partitioning, candidate search, and abuse controls. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Real-Time Matchmaking Service with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
        scenarioSummary:
          'Low-latency, fair match formation with skill balancing, queue-time control, and abuse resistance. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'mm-functional-quality with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
            title: 'Phase 1 - Functional requirements: match quality with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
            prompt: 'What must be defined first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
            options: [
              'Quality score formula. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'UI queue animation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
              'Chat feature list. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Replay system first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Skins economy first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Server brand first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
          ],
          correctIndex: 0,
            helperText: 'Quality targets shape the whole matching algorithm.',
          },
          {
            id: 'mm-functional-party-rules',
            title: 'Phase 1 - Functional requirements: party and role rules',
            prompt: 'What rule set is best?',
            options: [
  
  
              'Explicit role + party constraints.',
              'Random fill only. with clear trade',
              'No party support. with clear trade',
              'Role ignored. with clear trade-off',
              'Manual lobby only. with clear trad',
              'Queue by ping only. with clear tra',
          ],
          correctIndex: 0,
            helperText: 'Party and role constraints are first-class requirements.',
          },
          {
            id: 'mm-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: queue time',
            prompt: 'How should queue SLOs be set?',
            options: [
  
  
              'Bracketed p95 queue SLOs.',
              'Bracketed p99 queue SLOs.',
              'Region-tiered queue SLOs.',
              'Mode-specific queue SLOs.',
              'Role-specific queue SLOs.',
              'Population-wide queue wit',
          ],
          correctIndex: 0,
            helperText: 'Different skill brackets need explicit queue budgets.',
          },
          {
            id: 'mm-capacity-pools',
            title: 'Phase 3 - Scaling and capacity: pool partitioning',
            prompt: 'How should queues be partitioned?',
            options: [
  
  
              'Region + mode + MMR.',
              'Region + role + with',
              'Mode + role + latenc',
              'MMR + platform + wit',
              'Region + platform +.',
              'MMR + party + region',
          ],
          correctIndex: 0,
            helperText: 'Partitioning must preserve fairness and latency.',
          },
          {
            id: 'mm-capacity-expansion',
            title: 'Phase 3 - Scaling and capacity: search expansion',
            prompt: 'How should search widen over time?',
            options: [
  
  
              'Progressive range widening.',
              'Fixed strict range. with cl',
              'Immediate global search. wi',
              'Random opponents. with clea',
              'Manual fallback only. with.',
              'No widening logic. with cle',
          ],
          correctIndex: 0,
            helperText: 'Progressive widening balances speed and quality.',
          },
          {
            id: 'mm-architecture-state',
            title: 'Phase 4 - Architecture decisions: queue state',
            prompt: 'Where should queue state live?',
            options: [
  
  
              'In-memory + durable log.',
              'Spreadsheet backend. wit',
              'Client-only state. with.',
              'Flat files. with clear t',
              'No persistence. with cle',
              'DB only sync path. with.',
          ],
          correctIndex: 0,
            helperText: 'Fast state with durable recovery is the right pattern.',
          },
          {
            id: 'mm-deep-dive-anti-smurf',
            title: 'Phase 5 - Component deep dive: anti-smurfing',
            prompt: 'Best anti-smurf strategy?',
            options: [
  
  
              'Anomaly model + trust score.',
              'Smurf score + decay. with cl',
              'Progression model + review..',
              'Device graph + review. with.',
              'Behavior score + throttles..',
              'Placement match + decay. wit',
          ],
          correctIndex: 0,
            helperText: 'Need multi-signal detection and adaptive ranking impact.',
          },
          {
            id: 'mm-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be monitored?',
            options: [
  
  
              'Queue time + quality drift.',
              'Match latency + fairness wi',
              'Pool depth + fairness with.',
              'Cancel rate + quality with.',
              'Win rate + quality drift. w',
              'Region lag + quality drift.',
          ],
          correctIndex: 0,
            helperText: 'Need both latency and quality guardrails.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-feature-flags',
      difficulty: 'hard',
      prompt:
        'Design a global feature flag platform serving 25M evaluations/s with < 8ms p99 eval latency, strict auditability, and instant rollback support. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o'],
      correctIndex: 0,
      correctExplanation:
        'Great answers define evaluation semantics and safety requirements first, then set latency and consistency goals, then choose rule storage, propagation, and rollback architecture. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Feature Flag Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
        scenarioSummary:
          'Massive low-latency flag evaluation with policy safety, versioned rollouts, and full audit trails. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'flags-functional-eval-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
            title: 'Phase 1 - Functional requirements: evaluation semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
            prompt: 'What must be explicit first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
            options: [
              'Deterministic eval contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
              'Versioned targeting contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Stable rollout contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Consistent fallback contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Context schema contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Cohort assignment contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
          ],
          correctIndex: 0,
            helperText: 'Deterministic evaluation is non-negotiable.',
          },
          {
            id: 'flags-functional-safety',
            title: 'Phase 1 - Functional requirements: safety controls',
            prompt: 'What safety control is essential?',
            options: [
  
  
              'Instant global kill switch.',
              'Instant regional kill with.',
              'Scoped service kill switch.',
              'Two-step rollback workflow.',
              'Guardrailed rollout with cl',
              'Staged rollback workflow. w',
          ],
          correctIndex: 0,
            helperText: 'Rollback speed is the primary risk control.',
          },
          {
            id: 'flags-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: eval latency',
            prompt: 'How should latency be set?',
            options: [
  
  
              'p99 < 8ms eval SLO.',
              'p50 only. with clea',
              'No hard latency. wi',
              'Batch eval target..',
              'Median by region. w',
              'SDK decides locally',
          ],
          correctIndex: 0,
            helperText: 'Tail latency governs user-facing reliability.',
          },
          {
            id: 'flags-capacity-rule-storage',
            title: 'Phase 3 - Scaling and capacity: rule storage',
            prompt: 'Where should rules be evaluated?',
            options: [
  
  
              'Local cache + versioned rules.',
              'DB per request. with clear tra',
              'Network call always. with clea',
              'Static compile only. with clea',
              'No local cache. with clear tra',
              'Client guesses value. with cle',
          ],
          correctIndex: 0,
            helperText: 'Local evaluation with versioning meets latency goals.',
          },
          {
            id: 'flags-capacity-propagation',
            title: 'Phase 3 - Scaling and capacity: update propagation',
            prompt: 'How should updates propagate?',
            options: [
  
  
              'Pub/sub delta stream.',
              'Hourly polling. with.',
              'Daily sync job. with.',
              'Manual refresh. with.',
              'Versionless push. wit',
              'Restart to refresh. w',
          ],
          correctIndex: 0,
            helperText: 'Low-latency deltas are needed for safe rollouts.',
          },
          {
            id: 'flags-architecture-audit',
            title: 'Phase 4 - Architecture decisions: audit trail',
            prompt: 'What audit model is best?',
            options: [
  
  
              'Immutable change log.',
              'Editable changelog. w',
              'No actor metadata. wi',
              'Sampled audit only. w',
              'Daily summary only. w',
              'Best effort logs. wit',
          ],
          correctIndex: 0,
            helperText: 'Immutability is key for compliance and incident review.',
          },
          {
            id: 'flags-deep-dive-targeting',
            title: 'Phase 5 - Component deep dive: targeting correctness',
            prompt: 'How should targeting stay consistent?',
            options: [
  
  
              'Stable hashing + salts.',
              'Random per request. wit',
              'Clock-based split. with',
              'Region random split. wi',
              'Client random split. wi',
              'No stickiness. with cle',
          ],
          correctIndex: 0,
            helperText: 'Stable hashing preserves cohort consistency.',
          },
          {
            id: 'flags-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be observed?',
            options: [
  
  
              'Eval latency + error rate.',
              'Propagation lag + miss wit',
              'Assignment drift + miss wi',
              'SDK timeout + miss rate. w',
              'Cache churn + miss rate. w',
              'Policy mismatch + miss wit',
          ],
          correctIndex: 0,
            helperText: 'Need evaluation health plus propagation correctness.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-search-ranking',
      difficulty: 'hard',
      prompt:
        'Design a large-scale search ranking platform for product discovery with 500k QPS peak, p95 under 120ms, and robust relevance freshness. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear t'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define ranking goals and relevance signals first, then set latency budgets, then design retrieval/ranking pipelines and freshness controls. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Search Ranking Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
        scenarioSummary:
          'High-throughput query serving with multi-stage ranking, low latency, and fast index refresh. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'sr-functional-objective with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
            title: 'Phase 1 - Functional requirements: ranking objective with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
            prompt: 'What should be defined first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
            options: [
              'Ranking objective function. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Search bar theme. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'A/B dashboard first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Ads layout first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Promo banners first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'No clear objective. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
          ],
          correctIndex: 0,
            helperText: 'Objective definition is core to ranking quality.',
          },
          {
            id: 'sr-functional-signals',
            title: 'Phase 1 - Functional requirements: relevance signals',
            prompt: 'How should relevance signals be treated?',
            options: [
  
  
              'Versioned signal contracts.',
              'Ad-hoc feature dumps. with.',
              'Signals in UI only. with cl',
              'No feature governance. with',
              'Manual weekly updates. with',
              'Single static signal. with.',
          ],
          correctIndex: 0,
            helperText: 'Signals need stable definitions and lineage.',
          },
          {
            id: 'sr-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: latency budget',
            prompt: 'How should latency be allocated?',
            options: [
  
  
              'Budget per pipeline stage.',
              'One global average. with c',
              'No stage budgets. with cle',
              'Only p50 target. with clea',
              'Batch latency target. with',
              'Let services decide. with.',
          ],
          correctIndex: 0,
            helperText: 'Per-stage budgets protect p95 end-to-end latency.',
          },
          {
            id: 'sr-capacity-retrieval',
            title: 'Phase 3 - Scaling and capacity: retrieval tier',
            prompt: 'What retrieval approach fits best?',
            options: [
  
  
              'Two-stage retrieve then rank.',
              'Rank all docs directly. with.',
              'Single shard only. with clear',
              'Client-side retrieval. with c',
              'No candidate pruning. with cl',
              'Offline-only ranking. with cl',
          ],
          correctIndex: 0,
            helperText: 'Candidate pruning is required at high QPS.',
          },
          {
            id: 'sr-capacity-cache',
            title: 'Phase 3 - Scaling and capacity: query caching',
            prompt: 'How should caching be done?',
            options: [
  
  
              'Result cache with TTL tiers.',
              'No caching at all. with clea',
              'Cache forever. with clear tr',
              'Cache only failures. with cl',
              'Random cache expiry. with cl',
              'Manual cache clears. with cl',
          ],
          correctIndex: 0,
            helperText: 'Tiered TTLs balance freshness and performance.',
          },
          {
            id: 'sr-architecture-index-freshness',
            title: 'Phase 4 - Architecture decisions: freshness',
            prompt: 'How to keep index fresh?',
            options: [
  
  
              'Streaming incremental updates.',
              'Nightly full rebuild only. wit',
              'Weekly refresh only. with clea',
              'Manual upload only. with clear',
              'Refresh on deploy only. with c',
              'No freshness pipeline. with cl',
          ],
          correctIndex: 0,
            helperText: 'Incremental updates keep relevance current.',
          },
          {
            id: 'sr-deep-dive-experiments',
            title: 'Phase 5 - Component deep dive: experiments',
            prompt: 'How should ranking experiments run?',
            options: [
  
  
              'Deterministic bucket assignment.',
              'Random per request. with clear t',
              'Manual toggles only. with clear.',
              'No holdout groups. with clear tr',
              'One test forever. with clear tra',
              'No experiment layer. with clear.',
          ],
          correctIndex: 0,
            helperText: 'Stable bucketing avoids experiment contamination.',
          },
          {
            id: 'sr-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be monitored most?',
            options: [
  
  
              'Latency + relevance + drift.',
              'Recall + precision + drift..',
              'Latency + freshness + drift.',
              'Clicks + conversions + with.',
              'Cache + recall + drift. with',
              'Recall + diversity + drift..',
          ],
          correctIndex: 0,
            helperText: 'Need quality and performance guardrails together.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-payments-ledger',
      difficulty: 'hard',
      prompt:
        'Design a global payments ledger service processing 90k tx/s with strict no-double-spend guarantees and full audit traceability. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define ledger invariants first, then set durability/latency SLOs, then design transaction flows, idempotency, and reconciliation. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Payments Ledger Service with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
        scenarioSummary:
          'High-integrity financial ledger with idempotent writes, consistency guarantees, and reconciliation workflows. with clear trade-offs and explicit operational constraints w',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'ledger-functional-invariants with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs a',
            title: 'Phase 1 - Functional requirements: invariants with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with c',
            prompt: 'What is most critical to define first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
            options: [
              'Double-entry invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Posting-order invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Reversal-safety invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Currency-balance invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Idempotency-window invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
              'Reconciliation-safety invariants. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
          ],
          correctIndex: 0,
            helperText: 'Ledger correctness starts with immutable invariants.',
          },
          {
            id: 'ledger-functional-idempotency',
            title: 'Phase 1 - Functional requirements: idempotency',
            prompt: 'How should retries be handled?',
            options: [
  
  
              'Idempotency key enforcement.',
              'Idempotency window enforceme',
              'Request hash enforcement. wi',
              'Client nonce enforcement. wi',
              'Replay token enforcement. wi',
              'Settlement lock enforcement.',
          ],
          correctIndex: 0,
            helperText: 'Financial APIs must be safely retryable.',
          },
          {
            id: 'ledger-nfr-consistency',
            title: 'Phase 2 - Non-functional requirements: consistency',
            prompt: 'What consistency target is right?',
            options: [
  
  
              'Strict write ordering.',
              'Quorum commit ordering',
              'Shard-local write with',
              'Bounded lag ordering..',
              'Region-primary write w',
              'Dual-write reconciliat',
          ],
          correctIndex: 0,
            helperText: 'Order and atomicity are mandatory for ledgers.',
          },
          {
            id: 'ledger-capacity-partitioning',
            title: 'Phase 3 - Scaling and capacity: partitioning',
            prompt: 'How should writes be partitioned?',
            options: [
  
  
              'Account-range partitioning.',
              'One primary node. with clea',
              'Random shard writes. with c',
              'Client-chosen shard. with c',
              'No partition strategy. with',
              'File-based partitioning. wi',
          ],
          correctIndex: 0,
            helperText: 'Partitioning should preserve transactional constraints.',
          },
          {
            id: 'ledger-capacity-failover',
            title: 'Phase 3 - Scaling and capacity: failover',
            prompt: 'How should failover work?',
            options: [
  
  
              'Quorum-based leader failover.',
              'Lease-based leader failover..',
              'Witness-backed leader with cl',
              'Region-primary leader with cl',
              'Synchronous standby failover.',
              'Fast-fence leader failover. w',
          ],
          correctIndex: 0,
            helperText: 'Need safe leadership changes under failure.',
          },
          {
            id: 'ledger-architecture-journal',
            title: 'Phase 4 - Architecture decisions: storage model',
            prompt: 'Best storage pattern?',
            options: [
  
  
              'Append-only journal + snapshots.',
              'In-place row updates. with clear',
              'Delete-and-rewrite. with clear t',
              'Client-side history. with clear.',
              'No historical log. with clear tr',
              'Cache-only storage. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Append-only journaling supports audit and replay.',
          },
          {
            id: 'ledger-deep-dive-reconciliation',
            title: 'Phase 5 - Component deep dive: reconciliation',
            prompt: 'How should reconciliation run?',
            options: [
  
  
              'Automated diff + repair queue.',
              'Realtime diff + repair queue..',
              'Periodic diff + repair queue..',
              'Threshold diff + repair queue.',
              'Ledger replay + repair queue..',
              'Snapshot diff + repair queue..',
          ],
          correctIndex: 0,
            helperText: 'Continuous reconciliation catches silent drift.',
          },
          {
            id: 'ledger-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which signals are most important?',
            options: [
  
  
              'Commit lag + mismatch rate.',
              'Write lag + mismatch rate..',
              'Replay lag + mismatch rate.',
              'Checkpoint lag + mismatch w',
              'Failover lag + mismatch wit',
              'Drift lag + mismatch rate..',
          ],
          correctIndex: 0,
            helperText: 'Need correctness and durability visibility first.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-realtime-fraud-detection',
      difficulty: 'hard',
      prompt:
        'Design a real-time fraud detection platform scoring 300k events/s with sub-40ms decision latency and high recall under strict false-positive controls. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define decision policies and risk tiers first, then set precision/recall SLOs, then design feature pipelines, model serving, and feedback loops. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Real-Time Fraud Detection Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
        scenarioSummary:
          'Low-latency decision engine combining rules and models with continuous feedback and drift monitoring. with clear trade-offs and explicit operational constraints with clear trade-offs an',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'fraud-functional-policy with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
            title: 'Phase 1 - Functional requirements: decision policy with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade',
            prompt: 'What should be defined first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
            options: [
              'Allow/challenge/block policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
              'Dashboard widgets first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Case UI first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Batch reports first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'ML model name first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'No explicit policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
          ],
          correctIndex: 0,
            helperText: 'Decision actions are the core product contract.',
          },
          {
            id: 'fraud-functional-feedback',
            title: 'Phase 1 - Functional requirements: feedback loop',
            prompt: 'How should outcomes feed back?',
            options: [
  
  
              'Labeled outcomes pipeline.',
              'No feedback capture. with.',
              'Manual notes only. with cl',
              'Quarterly labels only. wit',
              'Model retrain never. with.',
              'Client-side labels only. w',
          ],
          correctIndex: 0,
            helperText: 'Outcome labels are required for model quality.',
          },
          {
            id: 'fraud-nfr-metrics',
            title: 'Phase 2 - Non-functional requirements: quality metrics',
            prompt: 'What quality metrics are key?',
            options: [
  
  
              'Recall and false-positive rate.',
              'Only throughput. with clear tra',
              'Only p50 latency. with clear tr',
              'Only model size. with clear tra',
              'Only CPU usage. with clear trad',
              'No quality metric. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Fraud systems must balance capture and user friction.',
          },
          {
            id: 'fraud-capacity-feature-store',
            title: 'Phase 3 - Scaling and capacity: feature serving',
            prompt: 'How should online features be served?',
            options: [
  
  
              'Low-latency feature store.',
              'Batch warehouse only. with',
              'Per-request joins only. wi',
              'Client computes features..',
              'No feature cache. with cle',
              'Static feature table. with',
          ],
          correctIndex: 0,
            helperText: 'Online inference needs dedicated feature serving.',
          },
          {
            id: 'fraud-capacity-backpressure',
            title: 'Phase 3 - Scaling and capacity: overload handling',
            prompt: 'What should happen under overload?',
            options: [
  
  
              'Priority queue + graceful degrade.',
              'Drop all traffic. with clear trade',
              'Block indefinitely. with clear tra',
              'Disable fraud checks. with clear t',
              'Manual scaling only. with clear tr',
              'Retry storm allowed. with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Graceful degradation preserves core protections.',
          },
          {
            id: 'fraud-architecture-serving',
            title: 'Phase 4 - Architecture decisions: scoring stack',
            prompt: 'Best scoring architecture?',
            options: [
  
  
              'Rules + model ensemble.',
              'Rules only forever. wit',
              'Model only forever. wit',
              'Manual review only. wit',
              'Client-side model only.',
              'No deterministic rules.',
          ],
          correctIndex: 0,
            helperText: 'Hybrid stacks combine precision with control.',
          },
          {
            id: 'fraud-deep-dive-drift',
            title: 'Phase 5 - Component deep dive: model drift',
            prompt: 'How should drift be managed?',
            options: [
  
  
              'Drift alarms + auto rollback.',
              'Ignore drift. with clear trad',
              'Annual retrain only. with cle',
              'Manual checks only. with clea',
              'No baseline tracking. with cl',
              'Drift seen in logs only. with',
          ],
          correctIndex: 0,
            helperText: 'Drift detection must tie to safe rollback paths.',
          },
          {
            id: 'fraud-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What must be monitored?',
            options: [
  
  
              'Decision latency + FP/FN trends.',
              'Only API uptime. with clear trad',
              'Only model CPU. with clear trade',
              'Only event throughput. with clea',
              'Only storage growth. with clear.',
              'Only log volume. with clear trad',
          ],
          correctIndex: 0,
            helperText: 'Need real-time quality and system health tracking.',
          },
        ],
      },
    }
]

export default data
