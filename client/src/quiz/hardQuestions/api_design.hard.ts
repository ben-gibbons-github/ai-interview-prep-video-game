const data = [
  {
    "id": "hard-api_design-idempotency-1",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles idempotency while preserving correctness?",
    "options": [
      "Apply rate limits per tenant to protect shared capacity",
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts",
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use idempotency keys for retry-safe mutation endpoints. For hard difficulty, this option most directly addresses idempotency without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-versioning-2",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles versioning while preserving correctness?",
    "options": [
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Apply rate limits per tenant to protect shared capacity",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because version APIs with explicit backward-compatibility contracts. For hard difficulty, this option most directly addresses versioning without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-pagination-3",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles pagination while preserving correctness?",
    "options": [
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Paginate large collections to bound latency and payload size",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Apply rate limits per tenant to protect shared capacity"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because paginate large collections to bound latency and payload size. For hard difficulty, this option most directly addresses pagination without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-rate-limiting-4",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles rate limiting while preserving correctness?",
    "options": [
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts",
      "Paginate large collections to bound latency and payload size",
      "Apply rate limits per tenant to protect shared capacity",
      "Evolve schemas additively to avoid breaking existing clients"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because apply rate limits per tenant to protect shared capacity. For hard difficulty, this option most directly addresses rate limiting without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-error-model-5",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles error model while preserving correctness?",
    "options": [
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Set explicit client and server timeouts with clear retry semantics",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients",
      "Return structured errors with stable codes and actionable details"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because return structured errors with stable codes and actionable details. For hard difficulty, this option most directly addresses error model without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-timeouts-6",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles timeouts while preserving correctness?",
    "options": [
      "Set explicit client and server timeouts with clear retry semantics",
      "Return structured errors with stable codes and actionable details",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because set explicit client and server timeouts with clear retry semantics. For hard difficulty, this option most directly addresses timeouts without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-authz-boundary-7",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles authz boundary while preserving correctness?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Paginate large collections to bound latency and payload size",
      "Set explicit client and server timeouts with clear retry semantics",
      "Evolve schemas additively to avoid breaking existing clients"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because enforce authorization at resource boundaries not UI assumptions. For hard difficulty, this option most directly addresses authz boundary without relying on weaker side optimizations."
  },
  {
    "id": "hard-api_design-schema-evolution-8",
    "difficulty": "hard",
    "prompt": "In a high-scale api design scenario with failures and concurrency, which option best handles schema evolution while preserving correctness?",
    "options": [
      "Paginate large collections to bound latency and payload size",
      "Version APIs with explicit backward-compatibility contracts",
      "Evolve schemas additively to avoid breaking existing clients",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Apply rate limits per tenant to protect shared capacity"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because evolve schemas additively to avoid breaking existing clients. For hard difficulty, this option most directly addresses schema evolution without relying on weaker side optimizations."
  }
]

export default data
