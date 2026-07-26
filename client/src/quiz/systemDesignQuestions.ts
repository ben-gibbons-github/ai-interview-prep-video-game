const data = [
  {
    "id": "easy-cap-theorem-ap",
    "difficulty": "easy",
    "prompt": "During a network partition, an AP system favors:",
    "options": [
      "Treat network as the main objective.",
      "Availability and partition tolerance",
      "Optimize network and partition first.",
      "Prioritize network over partition."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because an AP system is explicitly choosing to remain available even when the network is partitioned. In practical terms, that means the system may return stale or divergent data for a while, but it avoids going fully unavailable just to preserve strict consistency."
  },
  {
    "id": "easy-cache-read-latency",
    "difficulty": "easy",
    "prompt": "A read-through cache is most useful for:",
    "options": [
      "Center the design on read and cache.",
      "Reducing read latency and database load",
      "Treat read as the main objective.",
      "Optimize read and through first."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because a read-through cache shortens the path for repeated lookups and shields the database from unnecessary read traffic. The main value is not that it changes schema or storage semantics, but that it reduces latency for hot reads while preserving backend capacity for work that actually requires the database."
  },
  {
    "id": "easy-load-balancer-purpose",
    "difficulty": "easy",
    "prompt": "A load balancer in front of stateless app servers mainly provides:",
    "options": [
      "Center the design on load and front.",
      "Traffic distribution across instances",
      "Optimize load and balancer first.",
      "Treat load as the main objective."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because the load balancer is the component that distributes incoming traffic across many application instances instead of overloading one machine. That improves both scale and resilience, since unhealthy nodes can be removed from rotation while healthy nodes continue serving requests."
  },
  {
    "id": "easy-idempotency-payments",
    "difficulty": "easy",
    "prompt": "Idempotency keys help payment APIs by:",
    "options": [
      "Treat idempotency as the main objective.",
      "Preventing duplicate effects on retries",
      "Optimize idempotency and keys first.",
      "Prioritize idempotency over keys."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because idempotency keys are specifically designed for mutation endpoints where retries are possible. They let the server recognize that a logically identical request was already processed, which prevents duplicate charges, duplicate orders, or other repeated side effects."
  },
  {
    "id": "easy-rate-limiting-goal",
    "difficulty": "easy",
    "prompt": "The primary purpose of API rate limiting is to:",
    "options": [
      "Center the design on primary and limiting.",
      "Protect service capacity from abuse and spikes",
      "Prioritize primary over rate, not the core requirement.",
      "Focus on primary tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because rate limiting is mainly a protection mechanism, not just a product policy. It helps keep the service stable under abuse, bot traffic, or sudden spikes by ensuring that one client or tenant cannot consume disproportionate capacity."
  },
  {
    "id": "easy-queue-decoupling",
    "difficulty": "easy",
    "prompt": "A message queue between services is mainly used for:",
    "options": [
      "Treat message as the main objective.",
      "Asynchronous decoupling and buffering",
      "Optimize message and queue first.",
      "Center the design on message and services."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because the biggest architectural value of a queue is decoupling. Producers can keep publishing work even if consumers are temporarily slower, which smooths bursts and lets each side scale and recover more independently."
  },
  {
    "id": "easy-cdn-static-assets",
    "difficulty": "easy",
    "prompt": "A CDN improves performance of static assets mostly by:",
    "options": [
      "Center the design on improves and static.",
      "Serving content from edge locations near users",
      "Optimize improves and performance first.",
      "Prioritize improves over performance."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because a CDN improves performance by moving static content closer to users geographically. That lowers round-trip time for downloads and also reduces repeated load on the origin, which is especially helpful for globally distributed traffic."
  },
  {
    "id": "easy-health-checks",
    "difficulty": "easy",
    "prompt": "Why are health checks used behind load balancers?",
    "options": [
      "Center the design on health and behind.",
      "To route traffic away from unhealthy instances",
      "Focus on health tuning only, not the core requirement.",
      "Prioritize health over checks, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because health checks give the load balancer the information it needs to stop routing requests to broken or degraded instances. Without that signal, the balancer might continue sending traffic to nodes that are up at the network layer but failing at the application layer."
  },
  {
    "id": "easy-replication-benefit",
    "difficulty": "easy",
    "prompt": "Adding read replicas typically helps with:",
    "options": [
      "Reducing write conflicts",
      "Scaling read throughput",
      "Avoiding all failovers",
      "Focus on read tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because read replicas are primarily a read-scaling mechanism. They let the system offload query traffic from the primary database, which increases total read throughput, though it also introduces the possibility of replica lag and stale reads."
  },
  {
    "id": "easy-pagination-purpose",
    "difficulty": "easy",
    "prompt": "Pagination in APIs primarily prevents:",
    "options": [
      "Center the design on pagination and prevents.",
      "Huge payloads and expensive full-list responses",
      "Treat pagination as the main objective.",
      "Prioritize pagination over apis, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because pagination keeps APIs from returning huge unbounded result sets in one call. That improves latency, reduces memory pressure on both client and server, and gives the application a practical way to handle large datasets incrementally."
  },
  {
    "id": "easy-authn-vs-authz",
    "difficulty": "easy",
    "prompt": "Authentication answers which question?",
    "options": [
      "What can you do?",
      "Who are you?",
      "How fast is your network?",
      "Where is your data stored?"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because authentication is fundamentally about proving identity. The system first needs to know who the caller is before it can make the separate authorization decision about what the caller is allowed to do."
  },
  {
    "id": "easy-retry-with-backoff",
    "difficulty": "easy",
    "prompt": "Why pair retries with exponential backoff?",
    "options": [
      "Center the design on retries and backoff.",
      "To avoid overwhelming a struggling dependency",
      "Optimize retries and exponential first.",
      "Prioritize retries over exponential."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because retries without backoff can make an incident worse by hammering an already unhealthy dependency. Exponential backoff spreads retry attempts over time, which reduces synchronized pressure and gives the downstream system a better chance to recover."
  },
  {
    "id": "easy-metrics-vs-logs",
    "difficulty": "easy",
    "prompt": "Metrics are best for:",
    "options": [
      "Treat metrics as the main objective.",
      "Tracking trends and alerting at scale",
      "Optimize metrics and best first.",
      "Center the design on metrics and tracking."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because metrics are optimized for aggregation and trend tracking over time. They are the most practical signal for dashboards, SLO monitoring, and alerting because they compress large amounts of behavior into low-cardinality quantitative trends."
  },
  {
    "id": "easy-ttl-cache",
    "difficulty": "easy",
    "prompt": "A cache TTL mostly controls:",
    "options": [
      "Center the design on cache and controls.",
      "How long cached data is considered fresh",
      "Treat cache as the main objective.",
      "Optimize cache and mostly first."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because TTL is the freshness boundary for cached data. It determines how long the system is willing to serve a cached response before forcing refresh or revalidation, which makes TTL a direct tradeoff between freshness and performance."
  },
  {
    "id": "easy-dead-letter-queue",
    "difficulty": "easy",
    "prompt": "A dead-letter queue stores messages that:",
    "options": [
      "Prioritize dead over letter.",
      "Failed processing repeatedly",
      "Focus on dead tuning only.",
      "Optimize dead and letter first."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because a dead-letter queue is meant for messages that keep failing and would otherwise block or destabilize normal processing. Moving them aside preserves throughput for healthy traffic while giving operators a place to inspect and remediate the bad cases."
  },
  {
    "id": "easy-api-gateway",
    "difficulty": "easy",
    "prompt": "An API gateway commonly centralizes:",
    "options": [
      "Prioritize gateway over commonly.",
      "Routing, auth, and rate limiting",
      "Focus on gateway tuning only.",
      "Optimize gateway and commonly first."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because an API gateway often centralizes concerns that are common across many backend services, such as authentication, routing, throttling, and request shaping. That keeps individual services simpler and creates a more consistent ingress policy."
  },
  {
    "id": "easy-connection-pooling",
    "difficulty": "easy",
    "prompt": "Connection pooling helps by:",
    "options": [
      "Center the design on connection and reusing, not the core requirement.",
      "Reusing expensive connections instead of creating new ones per request",
      "Treat connection as the main objective, not the dominant bottleneck.",
      "Optimize connection and pooling first, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because opening a new connection for every request is expensive and can overwhelm dependencies. Connection pooling reuses established connections, which lowers per-request overhead and prevents unnecessary churn on the backend."
  },
  {
    "id": "easy-read-repair",
    "difficulty": "easy",
    "prompt": "Read repair in distributed databases is used to:",
    "options": [
      "Center the design on read and distributed.",
      "Fix stale replicas discovered during reads",
      "Treat read as the main objective.",
      "Focus on read tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because read repair is a convergence mechanism that opportunistically fixes stale replicas when a discrepancy is discovered during a read. It does not eliminate inconsistency entirely, but it helps gradually move the system back toward agreement."
  },
  {
    "id": "easy-blue-green",
    "difficulty": "easy",
    "prompt": "Blue-green deployment mainly reduces:",
    "options": [
      "Center the design on blue and deployment.",
      "Risk during release by enabling fast rollback",
      "Focus on blue tuning only, not the core requirement.",
      "Prioritize blue over green, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because blue-green deployment lowers release risk by keeping two full environments available and switching traffic between them. If the new version misbehaves, rollback is operationally simple because the old version is still intact and routable."
  },
  {
    "id": "easy-feature-flags",
    "difficulty": "easy",
    "prompt": "Feature flags are most useful for:",
    "options": [
      "Focus on feature tuning only, not the core requirement.",
      "Gradual rollout and quick disable without redeploy",
      "Prioritize feature over flags, not the core requirement.",
      "Focus on feature tuning only, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because feature flags separate deployment from release. Teams can enable functionality gradually, test with subsets of users, and turn a feature off quickly without waiting for a fresh deploy if problems appear."
  },
  {
    "id": "medium-shard-hotspot",
    "difficulty": "medium",
    "prompt": "The main danger of a poor shard key is:",
    "options": [
      "Optimize danger and poor first.",
      "Hot partitions and uneven load",
      "Prioritize danger over poor.",
      "Focus on danger tuning only.",
      "Treat danger as the main objective.",
      "Center the design on danger and shard."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because a bad shard key creates imbalance, where some partitions receive far more reads, writes, or storage than others. That defeats the point of sharding, since one hot shard can become the real system bottleneck even when many other shards are underutilized."
  },
  {
    "id": "medium-eventual-consistency",
    "difficulty": "medium",
    "prompt": "Eventual consistency implies that replicas:",
    "options": [
      "Converge only after manual repair",
      "Converge over time if updates stop",
      "Guarantee identical read latency",
      "Prioritize eventual over consistency.",
      "Treat eventual as the main objective.",
      "Are always globally up to date"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because eventual consistency is about convergence over time, not immediate agreement. If updates stop propagating and the system continues syncing, replicas eventually reach the same state even though intermediate reads may be stale."
  },
  {
    "id": "medium-circuit-breaker-purpose",
    "difficulty": "medium",
    "prompt": "A circuit breaker helps systems by:",
    "options": [
      "Center the design on circuit and systems.",
      "Failing fast when a dependency is unhealthy",
      "Treat circuit as the main objective.",
      "Optimize circuit and breaker first.",
      "Prioritize circuit over breaker.",
      "Focus on circuit tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because the circuit breaker pattern exists to stop wasting resources on calls that are already likely to fail. By failing fast, the system avoids building up queue pressure and gives the unhealthy dependency room to recover while fallback behavior can take over."
  },
  {
    "id": "medium-log-based-ingest",
    "difficulty": "medium",
    "prompt": "For high write throughput, a common pattern is to:",
    "options": [
      "Prioritize high over write, not the core requirement.",
      "Append to a log and process downstream asynchronously",
      "Focus on high tuning only, not the core requirement.",
      "Focus on high tuning only, not the dominant bottleneck.",
      "Prioritize high over write, not the dominant bottleneck.",
      "Optimize high and write first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because appending to a log is a fast and scalable way to absorb heavy write traffic before more expensive downstream processing happens. It smooths spikes and lets consumers process asynchronously at a sustainable rate instead of forcing all work onto the critical write path."
  },
  {
    "id": "medium-sli-slo-sla",
    "difficulty": "medium",
    "prompt": "Which statement is correct?",
    "options": [
      "Center the design on statement and measurement.",
      "SLI is measurement, SLO is target, SLA is contract",
      "Focus on statement tuning only, not the core requirement.",
      "Prioritize statement over correct, not the core requirement.",
      "Focus on statement tuning only, not the dominant bottleneck.",
      "Treat statement as the main objective."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because these three terms represent different layers of reliability management. The SLI is the raw measurement, the SLO is the target the team tries to meet, and the SLA is the external promise with possible business consequences if it is missed."
  },
  {
    "id": "medium-backpressure",
    "difficulty": "medium",
    "prompt": "Backpressure is primarily about:",
    "options": [
      "Center the design on backpressure and slowing.",
      "Slowing producers when consumers are overloaded",
      "Treat backpressure as the main objective.",
      "Optimize backpressure and about first.",
      "Prioritize backpressure over about.",
      "Focus on backpressure tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because backpressure is the mechanism that keeps a pipeline stable when consumers fall behind. Instead of allowing unbounded queue growth, it slows producers or limits intake so downstream stages are not overwhelmed."
  },
  {
    "id": "medium-write-quorum",
    "difficulty": "medium",
    "prompt": "In quorum replication, increasing write quorum usually:",
    "options": [
      "Focus on quorum tuning only, not the dominant bottleneck.",
      "Improves consistency at the cost of availability/latency",
      "Focus on quorum tuning only, not the core requirement.",
      "Prioritize quorum over replication, not the core requirement.",
      "Treat quorum as the main objective, not the core requirement.",
      "Prioritize quorum over replication, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because raising the write quorum increases the chance that later reads overlap with a recent write, which improves consistency. The tradeoff is that writes now wait on more replicas, so latency can rise and availability can fall when replicas are unhealthy."
  },
  {
    "id": "medium-read-replica-lag",
    "difficulty": "medium",
    "prompt": "Replica lag mainly causes:",
    "options": [
      "Center the design on replica and stale.",
      "Stale reads from asynchronous replicas",
      "Treat replica as the main objective.",
      "Optimize replica and causes first.",
      "Prioritize replica over causes.",
      "Focus on replica tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because replica lag is the period between a primary committing a change and a replica catching up. During that gap, reads served from the replica may return older data even though the write already succeeded on the primary."
  },
  {
    "id": "medium-cdc-outbox",
    "difficulty": "medium",
    "prompt": "The transactional outbox pattern is used to:",
    "options": [
      "Focus on transactional tuning only, not the core requirement.",
      "Atomically persist state changes and publishable events",
      "Prioritize transactional over outbox, not the core requirement.",
      "Center the design on transactional and pattern.",
      "Focus on transactional tuning only, not the dominant bottleneck.",
      "Prioritize transactional over outbox, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because the transactional outbox pattern solves the classic dual-write problem. By storing the business change and the event-to-publish in one transaction, the system avoids a state where the database updates but the message is never emitted, or vice versa."
  },
  {
    "id": "medium-bulkhead",
    "difficulty": "medium",
    "prompt": "Bulkhead isolation prevents:",
    "options": [
      "Focus on bulkhead tuning only, not the core requirement.",
      "One failing subsystem from exhausting shared resources",
      "Focus on bulkhead tuning only, not the dominant bottleneck.",
      "Prioritize bulkhead over isolation, not the core requirement.",
      "Treat bulkhead as the main objective, not the core requirement.",
      "Prioritize bulkhead over isolation, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because bulkheads isolate resource pools so one overloaded subsystem does not drain all shared capacity. That is valuable during incidents, because it limits the blast radius and preserves partial functionality elsewhere in the system."
  },
  {
    "id": "medium-id-generation",
    "difficulty": "medium",
    "prompt": "Why avoid purely sequential IDs in highly sharded systems?",
    "options": [
      "Treat avoid as the main objective, not the dominant bottleneck.",
      "They can create write hotspots in index/order-sensitive storage",
      "Optimize avoid and purely first, not the dominant bottleneck.",
      "Treat avoid as the main objective, not the core requirement.",
      "Prioritize avoid over purely, not the dominant bottleneck.",
      "Optimize avoid and purely first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because sequential identifiers can create concentrated insert patterns in ordered storage systems. Instead of spreading writes evenly, they can pile work onto a narrow part of the index or shard space, which creates hotspots and weakens horizontal scaling."
  },
  {
    "id": "medium-token-bucket",
    "difficulty": "medium",
    "prompt": "A token bucket limiter allows:",
    "options": [
      "Focus on token tuning only, not the core requirement.",
      "Controlled bursts while enforcing long-term rate",
      "Prioritize token over bucket, not the core requirement.",
      "Focus on token tuning only, not the dominant bottleneck.",
      "Center the design on token and limiter.",
      "Prioritize token over bucket, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because token bucket rate limiting is designed to allow short bursts while still enforcing an average rate over time. The bucket stores unused capacity as tokens, which gives the system elasticity without abandoning control."
  },
  {
    "id": "medium-primary-failover",
    "difficulty": "medium",
    "prompt": "After primary DB failover, clients should ideally:",
    "options": [
      "Focus on primary tuning only, not the core requirement.",
      "Reconnect via service discovery and retry idempotently",
      "Focus on primary tuning only, not the dominant bottleneck.",
      "Prioritize primary over failover, not the core requirement.",
      "Prioritize primary over failover, not the dominant bottleneck.",
      "Optimize primary and failover first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because failover changes the active write endpoint, so clients need a dynamic way to rediscover where to connect. Pairing service discovery with idempotent retries makes the recovery path much safer than relying on static addressing or manual intervention."
  },
  {
    "id": "medium-write-amplification",
    "difficulty": "medium",
    "prompt": "Write amplification means:",
    "options": [
      "Focus on write tuning only, not the core requirement.",
      "One logical write causing multiple physical writes",
      "Focus on write tuning only, not the dominant bottleneck.",
      "Treat write as the main objective, not the core requirement.",
      "Optimize write and amplification first.",
      "Prioritize write over amplification, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because write amplification means the physical work done by the storage engine exceeds the single logical write the application requested. That commonly happens through index maintenance, journaling, compaction, or copy-on-write behavior."
  },
  {
    "id": "medium-tail-at-scale",
    "difficulty": "medium",
    "prompt": "At large fanout, end-to-end latency is often dominated by:",
    "options": [
      "Treat large as the main objective.",
      "Tail (slowest) sub-request latency",
      "Optimize large and fanout first.",
      "Prioritize large over fanout.",
      "Center the design on large and latency.",
      "Focus on large tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because once a request fans out to many downstream calls, the overall latency is often governed by the slowest branch rather than the median one. That is why tail latency becomes the dominant concern in highly distributed request paths."
  },
  {
    "id": "medium-hedged-requests",
    "difficulty": "medium",
    "prompt": "Hedged requests reduce latency by:",
    "options": [
      "Prioritize hedged over requests, not the dominant bottleneck.",
      "Sending a backup request after a delay to mitigate stragglers",
      "Optimize hedged and requests first, not the core requirement.",
      "Treat hedged as the main objective, not the core requirement.",
      "Prioritize hedged over requests, not the core requirement.",
      "Optimize hedged and requests first, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because hedged requests are specifically aimed at stragglers, not average latency. Sending a carefully delayed backup request can let the system use the faster of two responses and cut the worst-case tail without doubling load on every call."
  },
  {
    "id": "medium-materialized-view",
    "difficulty": "medium",
    "prompt": "Materialized views are useful when:",
    "options": [
      "Center the design on materialized and useful.",
      "Precomputed query results can speed repeated reads",
      "Treat materialized as the main objective.",
      "Focus on materialized tuning only, not the core requirement.",
      "Prioritize materialized over views, not the core requirement.",
      "Optimize materialized and views first."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because materialized views trade write-time complexity for faster reads. When the same expensive query pattern is used repeatedly, precomputing the result can greatly reduce latency and backend work on the read path."
  },
  {
    "id": "medium-timeouts-budget",
    "difficulty": "medium",
    "prompt": "Timeouts in a call chain should be set:",
    "options": [
      "Prioritize timeouts over call, not the core requirement.",
      "Using a latency budget split across downstream calls",
      "Focus on timeouts tuning only, not the core requirement.",
      "Prioritize timeouts over call, not the dominant bottleneck.",
      "Optimize timeouts and call first, not the core requirement.",
      "Focus on timeouts tuning only, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because timeouts should reflect an end-to-end latency budget, not be chosen independently without coordination. If one downstream dependency is allowed to consume too much of the budget, the entire user-facing request can miss its target even if everything else behaves well."
  },
  {
    "id": "medium-two-phase-delete",
    "difficulty": "medium",
    "prompt": "A soft-delete followed by async purge helps with:",
    "options": [
      "Focus on soft tuning only, not the core requirement.",
      "Safer recovery windows and compliance workflows",
      "Prioritize soft over delete, not the core requirement.",
      "Focus on soft tuning only, not the dominant bottleneck.",
      "Center the design on soft and followed.",
      "Prioritize soft over delete, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because soft-delete followed by asynchronous purge introduces a safety window between marking data as deleted and removing it permanently. That is useful for recovery, auditing, retention checks, and compliance workflows where irreversible deletion should not happen instantly."
  },
  {
    "id": "medium-multi-tenant-noisy-neighbor",
    "difficulty": "medium",
    "prompt": "Noisy-neighbor issues in multi-tenant systems are addressed by:",
    "options": [
      "Center the design on noisy and issues.",
      "Per-tenant quotas and resource isolation",
      "Optimize noisy and neighbor first.",
      "Treat noisy as the main objective.",
      "Prioritize noisy over neighbor.",
      "Focus on noisy tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because noisy-neighbor problems are fundamentally resource isolation problems. Per-tenant quotas, rate controls, and pool isolation keep one aggressive or misbehaving tenant from degrading latency and availability for everyone else."
  },
  {
    "id": "hard-global-ordering-cost",
    "difficulty": "hard",
    "prompt": "Strict global ordering across regions is expensive because it needs:",
    "options": [
      "Focus on strict tuning only, not the core requirement.",
      "Cross-region coordination on critical write paths",
      "Prioritize strict over global, not the core requirement.",
      "Focus on strict tuning only, not the dominant bottleneck.",
      "Center the design on strict and ordering.",
      "Prioritize strict over global, not the dominant bottleneck.",
      "Optimize strict and global first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because strict global ordering means writes cannot be finalized independently in each region. The system has to coordinate across long network paths to decide a single order, which raises latency and makes the system more sensitive to partitions and quorum loss."
  },
  {
    "id": "hard-exactly-once-practical",
    "difficulty": "hard",
    "prompt": "In production, exactly-once effects are commonly achieved with:",
    "options": [
      "Center the design on production and once.",
      "At-least-once delivery plus idempotent processing",
      "Focus on production tuning only, not the core requirement.",
      "Treat production as the main objective.",
      "Optimize production and exactly first.",
      "Prioritize production over exactly, not the core requirement.",
      "Focus on production tuning only, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because in practical systems the transport layer often cannot guarantee that a message is delivered exactly once under all failure modes. Instead, teams usually accept at-least-once delivery and make consumers idempotent so repeated processing still produces the correct final effect."
  },
  {
    "id": "hard-active-active-conflict",
    "difficulty": "hard",
    "prompt": "The core challenge in active-active multi-region writes is:",
    "options": [
      "Center the design on core and active.",
      "Conflict resolution for concurrent updates",
      "Optimize core and challenge first.",
      "Treat core as the main objective.",
      "Focus on core tuning only, not the core requirement.",
      "Prioritize core over challenge.",
      "Focus on core tuning only, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because once multiple regions can accept writes at the same time, conflicting updates are inevitable. The hard part is not accepting the writes, but deciding how those concurrent changes are merged, rejected, or resolved consistently across replicas."
  },
  {
    "id": "hard-tail-latency-p99",
    "difficulty": "hard",
    "prompt": "To reduce p99 latency, prioritize:",
    "options": [
      "Focus on reduce tuning only, not the core requirement.",
      "Managing stragglers, queueing, retries, and fanout",
      "Prioritize reduce over latency, not the core requirement.",
      "Focus on reduce tuning only, not the dominant bottleneck.",
      "Center the design on reduce and prioritize.",
      "Prioritize reduce over latency, not the dominant bottleneck.",
      "Optimize reduce and latency first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because p99 problems usually come from slow-path behavior such as queue buildup, retries, fanout, or occasional stragglers rather than average-case performance. If a design only optimizes the median path, the user experience can still be poor at scale."
  },
  {
    "id": "hard-cdc-purpose",
    "difficulty": "hard",
    "prompt": "Change Data Capture is mainly used to:",
    "options": [
      "Prioritize change over data, not the core requirement.",
      "Stream committed DB changes to downstream systems",
      "Focus on change tuning only, not the core requirement.",
      "Prioritize change over data, not the dominant bottleneck.",
      "Optimize change and data first, not the core requirement.",
      "Focus on change tuning only, not the dominant bottleneck.",
      "Center the design on change and capture."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because CDC is about streaming committed database changes to other systems that need to react to them. It lets a database remain the source of truth while search indexes, analytics pipelines, caches, or downstream services stay synchronized without constant polling."
  },
  {
    "id": "hard-consensus-goal",
    "difficulty": "hard",
    "prompt": "Consensus protocols like Raft provide:",
    "options": [
      "Focus on consensus tuning only, not the core requirement.",
      "Agreement on replicated log/state despite failures",
      "Focus on consensus tuning only, not the dominant bottleneck.",
      "Center the design on consensus and like.",
      "Optimize consensus and protocols first.",
      "Prioritize consensus over protocols, not the core requirement.",
      "Treat consensus as the main objective."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because protocols like Raft exist to make a replicated group behave like one coherent state machine despite failures. They ensure nodes agree on the order of operations before those operations are applied, which is the core of safe replicated coordination."
  },
  {
    "id": "hard-pacelc-tradeoff",
    "difficulty": "hard",
    "prompt": "PACELC extends CAP by saying when no partition exists, systems trade:",
    "options": [
      "Storage and compute costs",
      "Latency and consistency",
      "CPU and memory efficiency",
      "Throughput and power usage",
      "Network and disk bandwidth",
      "Compression and cache size",
      "Threading and lock overhead"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because PACELC extends the CAP conversation beyond partitions. It points out that even when the system is healthy, designers still choose between lower latency and stronger consistency, so tradeoffs do not disappear just because the network is behaving."
  },
  {
    "id": "hard-saga-pattern",
    "difficulty": "hard",
    "prompt": "Saga orchestration is used when:",
    "options": [
      "Treat saga as the main objective, not the dominant bottleneck.",
      "Long-running cross-service workflows need compensating actions",
      "Prioritize saga over orchestration, not the core requirement.",
      "Center the design on saga and long, not the core requirement.",
      "Prioritize saga over orchestration, not the dominant bottleneck.",
      "Optimize saga and orchestration first, not the core requirement.",
      "Center the design on saga and long, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because saga orchestration is useful for long-running workflows that span multiple services where a single global ACID transaction is either impractical or too expensive. Each step commits locally, and if something later fails, compensating actions unwind the business effect."
  },
  {
    "id": "hard-linearizability",
    "difficulty": "hard",
    "prompt": "Linearizability guarantees that operations appear:",
    "options": [
      "Treat linearizability as the main objective.",
      "As if executed atomically in real-time order",
      "Prioritize linearizability over guarantees.",
      "Optimize linearizability and guarantees first.",
      "Focus on linearizability tuning only.",
      "Center the design on linearizability and operations.",
      "Focus on linearizability tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because linearizability gives the illusion that every operation happened atomically against one current copy of the data. It is a very strong guarantee because the observed order must also respect real-time ordering from the perspective of clients."
  },
  {
    "id": "hard-snapshot-isolation-anomaly",
    "difficulty": "hard",
    "prompt": "A classic anomaly under snapshot isolation is:",
    "options": [
      "Deadlock-free",
      "Write skew",
      "Serial order guaranteed",
      "No phantom reads",
      "No write skew risk",
      "Always serializable",
      "Conflict-free writes"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because snapshot isolation prevents many anomalies, but it does not guarantee full serializability. Write skew is the classic example where two concurrent transactions each observe a valid snapshot and commit changes that together violate an invariant."
  },
  {
    "id": "hard-bloom-filter-use",
    "difficulty": "hard",
    "prompt": "Bloom filters are useful in storage systems to:",
    "options": [
      "Focus on bloom tuning only, not the core requirement.",
      "Quickly rule out non-existent keys with small memory",
      "Prioritize bloom over filters, not the core requirement.",
      "Focus on bloom tuning only, not the dominant bottleneck.",
      "Prioritize bloom over filters, not the dominant bottleneck.",
      "Optimize bloom and filters first, not the core requirement.",
      "Treat bloom as the main objective, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because bloom filters are valuable when the system needs a fast and compact way to rule out keys that definitely do not exist. They save work by avoiding expensive lookups, while accepting a bounded false-positive rate in exchange for low memory use."
  },
  {
    "id": "hard-lsm-tree-compaction",
    "difficulty": "hard",
    "prompt": "In LSM-tree databases, compaction primarily:",
    "options": [
      "Focus on tree tuning only, not the core requirement.",
      "Merges sorted files to control read amplification",
      "Focus on tree tuning only, not the dominant bottleneck.",
      "Prioritize tree over databases, not the core requirement.",
      "Center the design on tree and compaction.",
      "Treat tree as the main objective, not the core requirement.",
      "Prioritize tree over databases, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because LSM-tree compaction is the mechanism that merges and reorganizes immutable files over time. That work is essential to keep read amplification under control and reclaim obsolete data, even though it introduces background IO cost and write amplification."
  },
  {
    "id": "hard-fencing-tokens",
    "difficulty": "hard",
    "prompt": "Fencing tokens are used to prevent:",
    "options": [
      "Focus on fencing tuning only, not the core requirement.",
      "Stale leaders from issuing writes after lease loss",
      "Prioritize fencing over tokens, not the core requirement.",
      "Focus on fencing tuning only, not the dominant bottleneck.",
      "Center the design on fencing and prevent.",
      "Prioritize fencing over tokens, not the dominant bottleneck.",
      "Optimize fencing and tokens first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because fencing tokens protect against stale leaders or lease holders continuing to write after they should have lost authority. A downstream system can compare tokens and reject older writers, which is much safer than trusting leases alone."
  },
  {
    "id": "hard-monotonic-reads",
    "difficulty": "hard",
    "prompt": "Monotonic-read consistency ensures a client:",
    "options": [
      "Treat monotonic as the main objective.",
      "Never goes backward in observed versions",
      "Optimize monotonic and read first.",
      "Center the design on monotonic and consistency.",
      "Prioritize monotonic over read.",
      "Focus on monotonic tuning only.",
      "Prioritize monotonic over read, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because monotonic reads are a session-level consistency guarantee. Once a client has seen a newer version of data, the system should not later send that same client backward to an older version, even if replicas are unevenly updated."
  },
  {
    "id": "hard-crdt-purpose",
    "difficulty": "hard",
    "prompt": "CRDTs are designed to:",
    "options": [
      "Focus on crdts tuning only, not the core requirement.",
      "Allow conflict-free merges of concurrent updates",
      "Focus on crdts tuning only, not the dominant bottleneck.",
      "Prioritize crdts over designed, not the core requirement.",
      "Center the design on crdts and allow.",
      "Prioritize crdts over designed, not the dominant bottleneck.",
      "Optimize crdts and designed first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because CRDTs are explicitly designed so concurrent updates can be merged deterministically without requiring coordination at write time. They are useful when availability matters and the data type can be expressed with safe merge semantics."
  },
  {
    "id": "hard-data-locality",
    "difficulty": "hard",
    "prompt": "Data locality optimization aims to:",
    "options": [
      "Focus on data tuning only, not the dominant bottleneck.",
      "Place compute near data to reduce transfer latency/cost",
      "Prioritize data over locality, not the core requirement.",
      "Focus on data tuning only, not the core requirement.",
      "Prioritize data over locality, not the dominant bottleneck.",
      "Optimize data and locality first, not the core requirement.",
      "Treat data as the main objective, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because data locality is about minimizing unnecessary movement across the network. When compute runs closer to the data it needs, the system often sees lower latency, less bandwidth cost, and fewer tail problems caused by remote access."
  },
  {
    "id": "hard-anti-entropy",
    "difficulty": "hard",
    "prompt": "Anti-entropy protocols in distributed stores help:",
    "options": [
      "Center the design on anti and protocols.",
      "Reconcile divergent replicas over time",
      "Treat anti as the main objective.",
      "Optimize anti and entropy first.",
      "Prioritize anti over entropy.",
      "Focus on anti tuning only.",
      "Focus on anti tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because anti-entropy protocols are background reconciliation mechanisms that help replicas converge after divergence. They do not eliminate inconsistency instantly, but they are important for long-term repair in distributed storage systems."
  },
  {
    "id": "hard-raft-commit-index",
    "difficulty": "hard",
    "prompt": "In Raft, the commit index indicates entries that are:",
    "options": [
      "Center the design on raft and index.",
      "Safely replicated and ready to apply",
      "Treat raft as the main objective.",
      "Optimize raft and commit first.",
      "Prioritize raft over commit.",
      "Focus on raft tuning only.",
      "Focus on raft tuning only, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because in Raft, the commit index marks log entries that are known to be safely replicated according to the protocol's rules. Once an entry reaches that point, it can be applied to the replicated state machine without risking protocol-level inconsistency."
  },
  {
    "id": "hard-split-brain",
    "difficulty": "hard",
    "prompt": "Split-brain in distributed systems refers to:",
    "options": [
      "Center the design on split and distributed.",
      "Multiple nodes acting as primary simultaneously",
      "Focus on split tuning only, not the core requirement.",
      "Prioritize split over brain, not the core requirement.",
      "Focus on split tuning only, not the dominant bottleneck.",
      "Prioritize split over brain, not the dominant bottleneck.",
      "Optimize split and brain first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because split brain means the system has lost agreement about who is the legitimate leader. If two primaries both accept writes, the cluster can diverge badly, which is why quorum, fencing, and careful failover design are critical."
  },
  {
    "id": "hard-multi-region-failover-rto-rpo",
    "difficulty": "hard",
    "prompt": "RTO and RPO in disaster recovery measure:",
    "options": [
      "Focus on disaster tuning only, not the core requirement.",
      "Recovery time objective and acceptable data loss window",
      "Focus on disaster tuning only, not the dominant bottleneck.",
      "Prioritize disaster over recovery, not the core requirement.",
      "Prioritize disaster over recovery, not the dominant bottleneck.",
      "Optimize disaster and recovery first, not the core requirement.",
      "Treat disaster as the main objective, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because these two metrics define disaster-recovery expectations from different angles. RTO measures how quickly service should be restored, while RPO measures how much recent data loss the business is willing to tolerate after a failure."
  },
  {
    "id": "hard-vector-clocks",
    "difficulty": "hard",
    "prompt": "Vector clocks are primarily useful for:",
    "options": [
      "Focus on vector tuning only, not the core requirement.",
      "Tracking causal ordering/concurrency between updates",
      "Prioritize vector over clocks, not the core requirement.",
      "Focus on vector tuning only, not the dominant bottleneck.",
      "Prioritize vector over clocks, not the dominant bottleneck.",
      "Optimize vector and clocks first, not the core requirement.",
      "Treat vector as the main objective, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because vector clocks capture causal relationships between updates rather than trying to rely on wall-clock time. That makes them useful for detecting whether one write happened after another or whether the two writes were concurrent and need conflict resolution."
  }
  ,
  {
    "id": "easy-api-rate-limits-and-abuse",
    "difficulty": "easy",
    "prompt": "Why do public APIs usually add rate limits?",
    "options": [
      "To make the API slower for everyone.",
      "To protect capacity from abuse and traffic spikes.",
      "To remove the need for authentication.",
      "To guarantee all requests succeed eventually."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because rate limits are mainly a protection mechanism. They prevent one client or bot from consuming disproportionate capacity and help the service stay healthy during spikes or abuse."
  },
  {
    "id": "medium-shard-key-balance",
    "difficulty": "medium",
    "prompt": "A good shard key should usually:",
    "options": [
      "Create even load and match common access patterns.",
      "Be purely sequential for easier debugging.",
      "Put every hot request on the same partition.",
      "Avoid any need to think about traffic distribution."
    ],
    "correctIndex": 0,
    "correctExplanation": "This answer is right because a strong shard key spreads load evenly while still supporting the queries the application actually runs. Bad shard keys produce hotspots, which defeats the purpose of sharding."
  },
  {
    "id": "hard-leader-election-fencing",
    "difficulty": "hard",
    "prompt": "Why are fencing tokens useful in distributed leader election?",
    "options": [
      "They let old leaders continue writing forever.",
      "They prevent stale leaders from acting after failover.",
      "They replace the need for consensus entirely.",
      "They guarantee zero downtime in every failure mode."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because fencing tokens let the storage or coordination layer reject stale writers that think they are still the leader. That prevents split-brain style corruption after failover or network partitions."
  },
  {
    "id": "hard-idempotent-replay-protection",
    "difficulty": "hard",
    "prompt": "Why is replay protection important for distributed write APIs?",
    "options": [
      "Because retries can otherwise duplicate side effects or payments.",
      "Because replay protection makes every request synchronous.",
      "Because it removes the need for a database transaction.",
      "Because it guarantees the network never drops packets."
    ],
    "correctIndex": 0,
    "correctExplanation": "This answer is right because distributed systems often retry requests, and retries can replay a write that already succeeded. Replay protection keeps side effects from being applied twice when the caller is uncertain about the original outcome."
  }
]

export default data
