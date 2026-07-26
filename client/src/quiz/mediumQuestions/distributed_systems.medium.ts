const data = [
  {
    "id": "medium-distributed_systems-consensus-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where consensus is the main concern. Which option is the strongest approach?",
    "options": [
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Resolve concurrent updates with deterministic merge semantics",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use consensus for leader election and ordered replicated state. For medium difficulty, this option most directly addresses consensus without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-quorum-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where quorum is the main concern. Which option is the strongest approach?",
    "options": [
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Use fencing tokens to block stale leaders from writing",
      "Tune read write quorum sizes for target consistency goals",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because tune read write quorum sizes for target consistency goals. For medium difficulty, this option most directly addresses quorum without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-partition-tolerance-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where partition tolerance is the main concern. Which option is the strongest approach?",
    "options": [
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Use consensus for leader election and ordered replicated state",
      "Combine at-least-once delivery with idempotent effect processing",
      "Design explicitly for partitions and delayed cross-region links",
      "Resolve concurrent updates with deterministic merge semantics"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because design explicitly for partitions and delayed cross-region links. For medium difficulty, this option most directly addresses partition tolerance without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-conflict-resolution-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where conflict resolution is the main concern. Which option is the strongest approach?",
    "options": [
      "Minimize cross-region coordination on synchronous write paths",
      "Use consensus for leader election and ordered replicated state",
      "Design explicitly for partitions and delayed cross-region links",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Resolve concurrent updates with deterministic merge semantics"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because resolve concurrent updates with deterministic merge semantics. For medium difficulty, this option most directly addresses conflict resolution without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-causality-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where causality is the main concern. Which option is the strongest approach?",
    "options": [
      "Track causal relationships when event ordering affects correctness",
      "Combine at-least-once delivery with idempotent effect processing",
      "Design explicitly for partitions and delayed cross-region links",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Use consensus for leader election and ordered replicated state"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because track causal relationships when event ordering affects correctness. For medium difficulty, this option most directly addresses causality without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-clock-skew-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where clock skew is the main concern. Which option is the strongest approach?",
    "options": [
      "Tune read write quorum sizes for target consistency goals",
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Use fencing tokens to block stale leaders from writing",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because avoid trusting wall clocks for strict ordering guarantees. For medium difficulty, this option most directly addresses clock skew without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-fencing-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where fencing is the main concern. Which option is the strongest approach?",
    "options": [
      "Tune read write quorum sizes for target consistency goals",
      "Avoid trusting wall clocks for strict ordering guarantees",
      "Use fencing tokens to block stale leaders from writing",
      "Resolve concurrent updates with deterministic merge semantics",
      "Minimize cross-region coordination on synchronous write paths"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use fencing tokens to block stale leaders from writing. For medium difficulty, this option most directly addresses fencing without relying on weaker side optimizations."
  },
  {
    "id": "medium-distributed_systems-anti-entropy-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a distributed systems design where anti entropy is the main concern. Which option is the strongest approach?",
    "options": [
      "Design explicitly for partitions and delayed cross-region links",
      "Use consensus for leader election and ordered replicated state",
      "Combine at-least-once delivery with idempotent effect processing",
      "Run anti-entropy repair to converge diverged replicas gradually",
      "Resolve concurrent updates with deterministic merge semantics"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because run anti-entropy repair to converge diverged replicas gradually. For medium difficulty, this option most directly addresses anti entropy without relying on weaker side optimizations."
  }
]

export default data
