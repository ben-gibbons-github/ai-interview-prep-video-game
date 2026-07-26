const data = [
  {
    "id": "medium-shard-hotspot",
    "difficulty": "medium",
    "prompt": "The main danger of a poor shard key is:",
    "options": [
      "Optimize danger and poor first.",
      "Hot partitions and uneven load",
      "Prioritize danger over poor.",
      "Focus on danger tuning only.",
      "Treat danger as the main objective."
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
      "Treat eventual as the main objective."
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
      "Prioritize circuit over breaker."
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
      "Prioritize high over write, not the dominant bottleneck."
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
      "Focus on statement tuning only, not the dominant bottleneck."
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
      "Prioritize backpressure over about."
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
      "Treat quorum as the main objective, not the core requirement."
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
      "Prioritize replica over causes."
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
      "Focus on transactional tuning only, not the dominant bottleneck."
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
      "Treat bulkhead as the main objective, not the core requirement."
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
      "Prioritize avoid over purely, not the dominant bottleneck."
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
      "Center the design on token and limiter."
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
      "Prioritize primary over failover, not the dominant bottleneck."
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
      "Optimize write and amplification first."
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
      "Center the design on large and latency."
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
      "Prioritize hedged over requests, not the core requirement."
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
      "Prioritize materialized over views, not the core requirement."
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
      "Optimize timeouts and call first, not the core requirement."
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
      "Center the design on soft and followed."
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
      "Prioritize noisy over neighbor."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because noisy-neighbor problems are fundamentally resource isolation problems. Per-tenant quotas, rate controls, and pool isolation keep one aggressive or misbehaving tenant from degrading latency and availability for everyone else."
  }
]

export default data
