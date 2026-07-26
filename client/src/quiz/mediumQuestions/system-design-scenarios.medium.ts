const data = [
  {
    id: 'medium-system-design-scenarios-fanout-1',
    difficulty: 'medium',
    prompt: 'For a social graph where some users have huge follower counts, what architecture usually prevents write-path overload when publishing posts?',
    options: [
      'Hybrid fanout: precompute for normal users, pull-on-read for very high-fanout users',
      'Fanout to all followers synchronously in a single database transaction',
      'Disable posting for high-follower accounts',
      'Store only one global feed and filter client-side',
      'Replicate full timelines to every region before acknowledging write',
    ],
    correctIndex: 0,
    correctExplanation:
      'Hybrid fanout handles celebrity skew: push for common cases, pull for extreme fanout, keeping write latency and queue pressure manageable.',
  },
  {
    id: 'medium-system-design-scenarios-idempotency-2',
    difficulty: 'medium',
    prompt: 'A payment API retries requests on timeout. Which design most directly prevents duplicate charges?',
    options: [
      'Require idempotency keys and deduplicate by key + request scope',
      'Rely on clients to avoid retries',
      'Disable timeouts entirely',
      'Accept duplicates and reconcile manually monthly',
      'Use random delays instead of deduplication',
    ],
    correctIndex: 0,
    correctExplanation:
      'Idempotency keys make retry behavior safe and deterministic, which is essential for financial correctness under partial failures.',
  },
  {
    id: 'medium-system-design-scenarios-multi-region-3',
    difficulty: 'medium',
    prompt: 'For user profile reads/writes with global users, which strategy often balances latency and consistency for most products?',
    options: [
      'Single write region with async replicas for reads, plus conflict-avoiding write routing',
      'Concurrent multi-master writes without conflict policy',
      'No replication, one database for every continent separately without sync',
      'Require all reads and writes to pass through a single edge POP',
      'Force synchronous quorum writes across all regions for every field',
    ],
    correctIndex: 0,
    correctExplanation:
      'Primary-write with read replicas is a common pragmatic baseline. It keeps write semantics simple while reducing read latency globally.',
  },
  {
    id: 'medium-system-design-scenarios-notifications-4',
    difficulty: 'medium',
    prompt: 'A notification service sends email, push, and SMS. Which pattern best improves reliability and independent scaling by channel?',
    options: [
      'Separate channel-specific queues/workers with retry and dead-letter policies',
      'One monolithic synchronous sender for all channels in request path',
      'Drop failed sends without retry metadata',
      'Use database triggers for all external API calls',
      'Perform retries only from user devices',
    ],
    correctIndex: 0,
    correctExplanation:
      'Decoupled channel pipelines isolate failures, allow channel-specific retry behavior, and prevent one provider outage from blocking all notifications.',
  },
  {
    id: 'medium-system-design-scenarios-search-consistency-5',
    difficulty: 'medium',
    prompt: 'Product detail updates must appear in search within 2 minutes. Which SLO-oriented mechanism is most direct?',
    options: [
      'Track indexing lag metrics and alert on lag budget breaches',
      'Rebuild the entire index every minute',
      'Let indexers run with no monitoring',
      'Depend on users to refresh until it appears',
      'Disable index refreshes during peak traffic permanently',
    ],
    correctIndex: 0,
    correctExplanation:
      'A freshness SLO requires measuring lag and enforcing a budget. Monitoring + alerting closes the loop between design intent and operations.',
  },
  {
    id: 'medium-system-design-scenarios-rate-limit-fairness-6',
    difficulty: 'medium',
    prompt: 'An API has tenants with very different traffic profiles. Which model most directly improves fairness while preserving burst tolerance?',
    options: [
      'Per-tenant token buckets with configurable refill rates and burst caps',
      'Single global limiter shared by all tenants equally',
      'Randomly reject requests when CPU rises',
      'Unlimited burst for all tenants with no quotas',
      'Limit only by client IP without tenant identity',
    ],
    correctIndex: 0,
    correctExplanation:
      'Tenant-scoped token buckets avoid noisy-neighbor abuse and let you tune sustained rate vs burst capacity per tenant tier.',
  },
  {
    id: 'medium-system-design-scenarios-uploads-dedup-7',
    difficulty: 'medium',
    prompt: 'A media platform wants to avoid storing duplicate files uploaded by many users. Which backend strategy is most effective?',
    options: [
      'Content hashing with reference metadata and object reuse',
      'Store every upload as unique regardless of bytes',
      'Use filename matching only for deduplication',
      'Deduplicate only once per year offline',
      'Disable uploads when storage utilization grows',
    ],
    correctIndex: 0,
    correctExplanation:
      'Hash-based dedup lets multiple metadata records reference the same blob, cutting storage and bandwidth costs significantly.',
  },
  {
    id: 'medium-system-design-scenarios-session-store-8',
    difficulty: 'medium',
    prompt: 'For stateless web servers with login sessions, which design best supports horizontal scaling?',
    options: [
      'External shared session store or signed tokens validated by all instances',
      'In-memory sessions on one sticky instance only',
      'Filesystem sessions local to each server with round-robin load balancing',
      'Manual session migration during deployments',
      'No session expiration handling',
    ],
    correctIndex: 0,
    correctExplanation:
      'Shared session state (or verifiable stateless tokens) removes server affinity constraints and supports elastic web tiers.',
  },
]

export default data
