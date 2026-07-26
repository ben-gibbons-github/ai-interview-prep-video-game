const data = [
  {
    id: 'hard-system-design-scenarios-global-counter-1',
    difficulty: 'hard',
    prompt: 'You need near-real-time globally visible counters (likes/views) at very high write volume. Which architecture is usually the most practical?',
    options: [
      'Regional write aggregation with periodic merge plus read-time approximation/finalization',
      'Strongly consistent single-row global transaction for every increment',
      'Client-side counters with no server reconciliation',
      'Batch updates once per day only',
      'Synchronous two-phase commit across all regions per increment',
      'Store counters in app server memory only',
    ],
    correctIndex: 0,
    correctExplanation:
      'At extreme scale, exact global linearizability for every increment is often too expensive. Aggregation + merge gives high throughput with acceptable staleness semantics.',
  },
  {
    id: 'hard-system-design-scenarios-index-migration-2',
    difficulty: 'hard',
    prompt: 'How do you safely roll out a major search-index schema change with minimal downtime and rollback risk?',
    options: [
      'Dual-write old and new indexes, shadow-read, compare, then cut over with rollback guard',
      'Drop old index and switch instantly with no validation',
      'Pause all writes during migration window of several hours',
      'Ship client changes first and rely on eventual backend compatibility',
      'Only update one shard and extrapolate behavior',
      'Avoid backups to speed migration',
    ],
    correctIndex: 0,
    correctExplanation:
      'Dual-write + shadow validation de-risks correctness and performance before full cutover, and keeps rollback straightforward.',
  },
  {
    id: 'hard-system-design-scenarios-data-deletion-3',
    difficulty: 'hard',
    prompt: 'A product must honor hard-delete requests across OLTP DB, cache, search, and analytics systems. Which strategy best ensures completion and auditability?',
    options: [
      'Use a durable deletion workflow with per-system completion markers and retryable tasks',
      'Delete only from primary DB and assume downstream systems eventually notice',
      'Run best-effort scripts without status tracking',
      'Rely on cache TTL expiration only',
      'Perform deletes only during quarterly maintenance windows',
      'Ignore analytics copies to simplify operations',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cross-system deletion needs orchestration, idempotency, and observability. Completion markers and retries provide provable progress and compliance evidence.',
  },
  {
    id: 'hard-system-design-scenarios-queue-backpressure-4',
    difficulty: 'hard',
    prompt: 'A critical event pipeline falls behind during traffic spikes. Which control loop is most robust for protecting downstream services while preserving high-priority events?',
    options: [
      'Priority queues + admission control + dynamic consumer autoscaling + load shedding of low-priority events',
      'Unlimited queue growth with no producer throttling',
      'Reject all traffic when lag rises above zero',
      'Scale only producers and keep consumers fixed',
      'Disable retries to reduce queue length quickly',
      'Drain queue by replaying events without ordering guarantees',
    ],
    correctIndex: 0,
    correctExplanation:
      'Backpressure requires coordinated producer and consumer behavior. Priority handling plus controlled shedding preserves core business events under stress.',
  },
  {
    id: 'hard-system-design-scenarios-multi-tenant-isolation-5',
    difficulty: 'hard',
    prompt: 'In a multi-tenant SaaS platform, what architecture best limits blast radius from one noisy tenant while keeping cost reasonable?',
    options: [
      'Logical isolation with tenant quotas plus selective dedicated resources for top tiers',
      'Single shared pool with no quotas and no tenant-level observability',
      'Dedicated full stack for every tenant regardless of size',
      'Rate-limit only by source IP and ignore tenant identity',
      'Allow each tenant to tune global retry policy for all tenants',
      'Force all tenants into one synchronous database transaction domain',
    ],
    correctIndex: 0,
    correctExplanation:
      'Hybrid isolation gives strong noisy-neighbor control and a cost/performance path across tenant tiers without overprovisioning everyone.',
  },
  {
    id: 'hard-system-design-scenarios-recommendation-serving-6',
    difficulty: 'hard',
    prompt: 'A recommendation API must serve p99 under 120ms while combining candidate generation, feature fetch, and ranking. Which decomposition usually improves tail latency control?',
    options: [
      'Separate stages with per-stage budgets, fallback paths, and partial-result serving',
      'Single giant synchronous RPC with no internal deadlines',
      'Fetch all features from one monolithic database every request',
      'Disable caching to avoid stale recommendations',
      'Use only client-side ranking for all users',
      'Treat p50 latency as sufficient for SLOs',
    ],
    correctIndex: 0,
    correctExplanation:
      'Stage budgets and fallbacks let teams reason about tail latency contributors and degrade gracefully when one dependency slows down.',
  },
  {
    id: 'hard-system-design-scenarios-online-schema-change-7',
    difficulty: 'hard',
    prompt: 'You need to add a non-null column to a massive hot table without downtime. Which sequence is safest?',
    options: [
      'Add nullable column, backfill in chunks, dual-read/write, then enforce non-null',
      'Add non-null column with default in one blocking migration',
      'Pause all writes and perform full table rewrite instantly',
      'Apply schema only to read replicas and skip primary',
      'Backfill with one transaction touching all rows',
      'Use random client retries until migration finishes',
    ],
    correctIndex: 0,
    correctExplanation:
      'Expand-migrate-contract style changes reduce lock risk and let correctness be validated incrementally before strict enforcement.',
  },
  {
    id: 'hard-system-design-scenarios-consistency-model-8',
    difficulty: 'hard',
    prompt: 'For a collaborative document app, which consistency strategy best balances responsiveness and conflict safety?',
    options: [
      'Operational transform or CRDT-based merge with server ordering and conflict metadata',
      'Last-write-wins only with client clocks as source of truth',
      'Synchronous global lock for entire document on every keystroke',
      'No conflict handling; newest packet always overwrites',
      'Persist only final document snapshots once per day',
      'Require users to manually merge text diffs in production',
    ],
    correctIndex: 0,
    correctExplanation:
      'Collaborative editing needs structured conflict resolution. OT/CRDT-like approaches preserve intent better than naive last-write-wins under concurrent edits.',
  },
]

export default data
