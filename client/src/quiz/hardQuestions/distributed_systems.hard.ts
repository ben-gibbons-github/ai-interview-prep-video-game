const data = [
  {
    "id": "hard-distributed_systems-consensus-1",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles consensus while preserving correctness?",
    "options": [
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Resolve concurrent updates with deterministic merge semantics",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Minimize cross-region coordination on synchronous write paths",
      "Combine at-least-once delivery with idempotent effect processing"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use consensus for leader election and ordered replicated state. For hard difficulty, this option most directly addresses consensus without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-quorum-2",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles quorum while preserving correctness?",
    "options": [
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Use fencing tokens to block stale leaders from writing",
      "Tune read write quorum sizes for target consistency goals",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because tune read write quorum sizes for target consistency goals. For hard difficulty, this option most directly addresses quorum without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-partition-tolerance-3",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles partition tolerance while preserving correctness?",
    "options": [
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Use consensus for leader election and ordered replicated state",
      "Combine at-least-once delivery with idempotent effect processing",
      "Design explicitly for partitions and delayed cross-region links",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because design explicitly for partitions and delayed cross-region links. For hard difficulty, this option most directly addresses partition tolerance without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-conflict-resolution-4",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles conflict resolution while preserving correctness?",
    "options": [
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state",
      "Design explicitly for partitions and delayed cross-region links",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Resolve concurrent updates with deterministic merge semantics",
      "Combine at-least-once delivery with idempotent effect processing"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because resolve concurrent updates with deterministic merge semantics. For hard difficulty, this option most directly addresses conflict resolution without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-causality-5",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles causality while preserving correctness?",
    "options": [
      "Combine at-least-once delivery with idempotent effect processing",
      "Design explicitly for partitions and delayed cross-region links",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Use consensus for leader election and ordered replicated state",
      "Resolve concurrent updates with deterministic merge semantics",
      "Track causal relationships when event ordering affects correctness"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because track causal relationships when event ordering affects correctness. For hard difficulty, this option most directly addresses causality without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-clock-skew-6",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles clock skew while preserving correctness?",
    "options": [
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Tune read write quorum sizes for target consistency goals",
      "Use fencing tokens to block stale leaders from writing",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because avoid trusting wall clocks for strict ordering guarantees. For hard difficulty, this option most directly addresses clock skew without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-fencing-7",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles fencing while preserving correctness?",
    "options": [
      "Tune read write quorum sizes for target consistency goals",
      "Use fencing tokens to block stale leaders from writing",
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use fencing tokens to block stale leaders from writing. For hard difficulty, this option most directly addresses fencing without relying on weaker side optimizations."
  },
  {
    "id": "hard-distributed_systems-anti-entropy-8",
    "difficulty": "hard",
    "prompt": "In a high-scale distributed systems scenario with failures and concurrency, which option best handles anti entropy while preserving correctness?",
    "options": [
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Combine at-least-once delivery with idempotent effect processing",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because run anti-entropy repair to converge diverged replicas gradually. For hard difficulty, this option most directly addresses anti entropy without relying on weaker side optimizations."
  }
]

export default data
