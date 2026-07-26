const data = [
  {
    "id": "easy-distributed_systems-consensus-1",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses consensus?",
    "options": [
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Resolve concurrent updates with deterministic merge semantics",
      "Run anti-entropy repair to converge diverged replicas gradually"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use consensus for leader election and ordered replicated state. For easy difficulty, this option most directly addresses consensus without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-quorum-2",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses quorum?",
    "options": [
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Use fencing tokens to block stale leaders from writing",
      "Tune read write quorum sizes for target consistency goals",
      "Resolve concurrent updates with deterministic merge semantics"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because tune read write quorum sizes for target consistency goals. For easy difficulty, this option most directly addresses quorum without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-partition-tolerance-3",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses partition tolerance?",
    "options": [
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Use consensus for leader election and ordered replicated state",
      "Combine at-least-once delivery with idempotent effect processing",
      "Design explicitly for partitions and delayed cross-region links"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because design explicitly for partitions and delayed cross-region links. For easy difficulty, this option most directly addresses partition tolerance without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-conflict-resolution-4",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses conflict resolution?",
    "options": [
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state",
      "Design explicitly for partitions and delayed cross-region links"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because resolve concurrent updates with deterministic merge semantics. For easy difficulty, this option most directly addresses conflict resolution without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-causality-5",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses causality?",
    "options": [
      "Combine at-least-once delivery with idempotent effect processing",
      "Track causal relationships when event ordering affects correctness",
      "Design explicitly for partitions and delayed cross-region links",
      "Run anti-entropy repair to converge diverged replicas gradually"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because track causal relationships when event ordering affects correctness. For easy difficulty, this option most directly addresses causality without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-clock-skew-6",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses clock skew?",
    "options": [
      "Tune read write quorum sizes for target consistency goals",
      "Use fencing tokens to block stale leaders from writing",
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Resolve concurrent updates with deterministic merge semantics"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because avoid trusting wall clocks for strict ordering guarantees. For easy difficulty, this option most directly addresses clock skew without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-fencing-7",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses fencing?",
    "options": [
      "Tune read write quorum sizes for target consistency goals",
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Resolve concurrent updates with deterministic merge semantics",
      "Use fencing tokens to block stale leaders from writing"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because use fencing tokens to block stale leaders from writing. For easy difficulty, this option most directly addresses fencing without relying on weaker side optimizations."
  },
  {
    "id": "easy-distributed_systems-anti-entropy-8",
    "difficulty": "easy",
    "prompt": "Distributed Systems: which choice best addresses anti entropy?",
    "options": [
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Combine at-least-once delivery with idempotent effect processing"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because run anti-entropy repair to converge diverged replicas gradually. For easy difficulty, this option most directly addresses anti entropy without relying on weaker side optimizations."
  }
]

export default data
