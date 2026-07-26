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
  }
]

export default data
