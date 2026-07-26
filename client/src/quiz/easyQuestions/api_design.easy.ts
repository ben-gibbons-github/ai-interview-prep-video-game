const data = [
  {
    "id": "easy-api_design-idempotency-1",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses idempotency?",
    "options": [
      "Apply rate limits per tenant to protect shared capacity",
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use idempotency keys for retry-safe mutation endpoints. For easy difficulty, this option most directly addresses idempotency without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-versioning-2",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses versioning?",
    "options": [
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because version APIs with explicit backward-compatibility contracts. For easy difficulty, this option most directly addresses versioning without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-pagination-3",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses pagination?",
    "options": [
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Paginate large collections to bound latency and payload size"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because paginate large collections to bound latency and payload size. For easy difficulty, this option most directly addresses pagination without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-rate-limiting-4",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses rate limiting?",
    "options": [
      "Apply rate limits per tenant to protect shared capacity",
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because apply rate limits per tenant to protect shared capacity. For easy difficulty, this option most directly addresses rate limiting without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-error-model-5",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses error model?",
    "options": [
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Return structured errors with stable codes and actionable details",
      "Set explicit client and server timeouts with clear retry semantics",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because return structured errors with stable codes and actionable details. For easy difficulty, this option most directly addresses error model without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-timeouts-6",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses timeouts?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Set explicit client and server timeouts with clear retry semantics",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because set explicit client and server timeouts with clear retry semantics. For easy difficulty, this option most directly addresses timeouts without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-authz-boundary-7",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses authz boundary?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Paginate large collections to bound latency and payload size",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because enforce authorization at resource boundaries not UI assumptions. For easy difficulty, this option most directly addresses authz boundary without relying on weaker side optimizations."
  },
  {
    "id": "easy-api_design-schema-evolution-8",
    "difficulty": "easy",
    "prompt": "API Design: which choice best addresses schema evolution?",
    "options": [
      "Evolve schemas additively to avoid breaking existing clients",
      "Paginate large collections to bound latency and payload size",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because evolve schemas additively to avoid breaking existing clients. For easy difficulty, this option most directly addresses schema evolution without relying on weaker side optimizations."
  }
]

export default data
