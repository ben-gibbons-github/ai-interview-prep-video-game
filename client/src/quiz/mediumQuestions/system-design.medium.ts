const data = [
  {
    "id": "medium-in-a-url-shortener-what-should-be-optimized-first-for-user-experience-1",
    "difficulty": "medium",
    "prompt": "In a URL shortener, what should be optimized first for user experience?",
    "options": [
      "Low-latency reads for redirection lookups",
      "Disabling CDN caching to guarantee origin visibility",
      "Synchronous cross-region writes for every metadata change",
      "Manual cache invalidation workflows owned by support teams",
      "Overly complex admin dashboards before core redirect paths"
    ],
    "correctIndex": 0,
    "correctExplanation": "Short-link products are read-heavy on redirect paths. Users feel success as instant redirection, so the first design target is fast, reliable lookup on the hot read path, while analytics and admin features can be decoupled."
  },
  {
    "id": "medium-what-is-the-best-reason-to-place-a-queue-between-upload-and-video-transcoding-2",
    "difficulty": "medium",
    "prompt": "What is the best reason to place a queue between upload and video transcoding?",
    "options": [
      "To absorb traffic bursts and decouple producer from worker speed",
      "To guarantee exactly-once delivery without idempotent workers",
      "To replace durable object storage as the source of truth",
      "To eliminate the need for retry and dead-letter handling",
      "To avoid horizontal scaling by constraining throughput"
    ],
    "correctIndex": 0,
    "correctExplanation": "Queues protect systems during uneven load. Upload spikes can be accepted quickly while workers process jobs at sustainable rates, which improves resilience and smooths throughput without tightly coupling services."
  },
  {
    "id": "medium-why-is-pagination-essential-in-high-cardinality-list-apis-3",
    "difficulty": "medium",
    "prompt": "Why is pagination essential in high-cardinality list APIs?",
    "options": [
      "It bounds response size and server work per request",
      "It replaces cache-control and CDN strategy decisions",
      "It removes the need for indexes on filter columns",
      "It guarantees global transactionality across paged reads",
      "It allows clients to skip authentication for later pages"
    ],
    "correctIndex": 0,
    "correctExplanation": "Pagination sets practical limits on payload and computation. Without it, list endpoints can produce huge scans and large responses, hurting latency, memory use, and reliability for both servers and clients."
  },
  {
    "id": "medium-what-does-an-api-gateway-most-commonly-centralize-4",
    "difficulty": "medium",
    "prompt": "What does an API gateway most commonly centralize?",
    "options": [
      "Authentication, routing, throttling, and edge policies",
      "Database schema migration and index compaction scheduling",
      "Frontend state reconciliation and browser rendering logic",
      "Offline machine-learning model training pipelines",
      "Distributed transaction coordination inside storage engines"
    ],
    "correctIndex": 0,
    "correctExplanation": "Gateway layers are best at shared edge concerns. They enforce consistent ingress behavior and reduce duplication, while domain logic and data modeling remain inside downstream services."
  },
  {
    "id": "medium-for-a-global-static-website-which-architecture-gives-the-fastest-first-byte-times-5",
    "difficulty": "medium",
    "prompt": "For a global static website, which architecture gives the fastest first-byte times?",
    "options": [
      "CDN edge caching close to end users",
      "A single origin region with no edge replication",
      "Server-side rendering every static asset per request",
      "Cross-region synchronous replication on each page read",
      "Origin-only gzip disabled for predictable payload sizes"
    ],
    "correctIndex": 0,
    "correctExplanation": "Edge caching reduces geographic round trips and origin pressure. For static assets, CDN distribution is usually the most direct way to cut latency and improve availability under global traffic."
  },
  {
    "id": "medium-what-is-the-key-benefit-of-health-checks-behind-a-load-balancer-6",
    "difficulty": "medium",
    "prompt": "What is the key benefit of health checks behind a load balancer?",
    "options": [
      "They prevent routing traffic to unhealthy instances",
      "They replace retry and timeout strategy in clients",
      "They guarantee zero-downtime deployments by themselves",
      "They remove the need for autoscaling policies entirely",
      "They eliminate the need for application-level monitoring"
    ],
    "correctIndex": 0,
    "correctExplanation": "Health checks provide liveness/readiness signals to routing layers. This helps load balancers avoid broken nodes and improve user-facing reliability, especially during failures and deployments."
  }
]

export default data
