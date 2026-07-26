const data = [
  {
    "id": "medium-api_design-idempotency-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where idempotency is the main concern. Which option is the strongest approach?",
    "options": [
      "Apply rate limits per tenant to protect shared capacity",
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts",
      "Paginate large collections to bound latency and payload size"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use idempotency keys for retry-safe mutation endpoints. For medium difficulty, this option most directly addresses idempotency without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-versioning-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where versioning is the main concern. Which option is the strongest approach?",
    "options": [
      "Paginate large collections to bound latency and payload size",
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Apply rate limits per tenant to protect shared capacity"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because version APIs with explicit backward-compatibility contracts. For medium difficulty, this option most directly addresses versioning without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-pagination-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where pagination is the main concern. Which option is the strongest approach?",
    "options": [
      "Evolve schemas additively to avoid breaking existing clients",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Paginate large collections to bound latency and payload size",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because paginate large collections to bound latency and payload size. For medium difficulty, this option most directly addresses pagination without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-rate-limiting-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where rate limiting is the main concern. Which option is the strongest approach?",
    "options": [
      "Use idempotency keys for retry-safe mutation endpoints",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Version APIs with explicit backward-compatibility contracts",
      "Paginate large collections to bound latency and payload size",
      "Apply rate limits per tenant to protect shared capacity"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because apply rate limits per tenant to protect shared capacity. For medium difficulty, this option most directly addresses rate limiting without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-error-model-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where error model is the main concern. Which option is the strongest approach?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Set explicit client and server timeouts with clear retry semantics",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Paginate large collections to bound latency and payload size"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because return structured errors with stable codes and actionable details. For medium difficulty, this option most directly addresses error model without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-timeouts-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where timeouts is the main concern. Which option is the strongest approach?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Set explicit client and server timeouts with clear retry semantics",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Paginate large collections to bound latency and payload size"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because set explicit client and server timeouts with clear retry semantics. For medium difficulty, this option most directly addresses timeouts without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-authz-boundary-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where authz boundary is the main concern. Which option is the strongest approach?",
    "options": [
      "Return structured errors with stable codes and actionable details",
      "Deliver webhooks with signatures retries and idempotent event IDs",
      "Enforce authorization at resource boundaries not UI assumptions",
      "Paginate large collections to bound latency and payload size",
      "Set explicit client and server timeouts with clear retry semantics"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because enforce authorization at resource boundaries not UI assumptions. For medium difficulty, this option most directly addresses authz boundary without relying on weaker side optimizations."
  },
  {
    "id": "medium-api_design-schema-evolution-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a api design design where schema evolution is the main concern. Which option is the strongest approach?",
    "options": [
      "Paginate large collections to bound latency and payload size",
      "Version APIs with explicit backward-compatibility contracts",
      "Include trace IDs and request IDs for end-to-end debugging",
      "Evolve schemas additively to avoid breaking existing clients",
      "Enforce authorization at resource boundaries not UI assumptions"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because evolve schemas additively to avoid breaking existing clients. For medium difficulty, this option most directly addresses schema evolution without relying on weaker side optimizations."
  }
]

export default data
