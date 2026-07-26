const data = [
  {
    "id": "easy-scalability-horizontal-scale-1",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses horizontal scale?",
    "options": [
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Scale horizontally behind stateless services and load balancing",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because scale horizontally behind stateless services and load balancing. For easy difficulty, this option most directly addresses horizontal scale without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-caching-tier-2",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses caching tier?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Plan capacity with headroom for burst and failure scenarios"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use multi-layer caching to offload repetitive read traffic. For easy difficulty, this option most directly addresses caching tier without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-queue-buffering-3",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses queue buffering?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because buffer spikes with queues to smooth producer consumer mismatch. For easy difficulty, this option most directly addresses queue buffering without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-shard-key-4",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses shard key?",
    "options": [
      "Choose shard keys that distribute read write load evenly",
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Scale on saturation signals not just average CPU percentage"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because choose shard keys that distribute read write load evenly. For easy difficulty, this option most directly addresses shard key without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-read-replicas-5",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses read replicas?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because offload read-heavy traffic to replicas with staleness awareness. For easy difficulty, this option most directly addresses read replicas without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-autoscaling-signal-6",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses autoscaling signal?",
    "options": [
      "Plan capacity with headroom for burst and failure scenarios",
      "Use multi-layer caching to offload repetitive read traffic",
      "Scale on saturation signals not just average CPU percentage",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because scale on saturation signals not just average CPU percentage. For easy difficulty, this option most directly addresses autoscaling signal without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-backpressure-7",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses backpressure?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Plan capacity with headroom for burst and failure scenarios",
      "Use multi-layer caching to offload repetitive read traffic",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because apply backpressure before queues grow beyond recovery limits. For easy difficulty, this option most directly addresses backpressure without relying on weaker side optimizations."
  },
  {
    "id": "easy-scalability-batching-8",
    "difficulty": "easy",
    "prompt": "Scalability: which choice best addresses batching?",
    "options": [
      "Batch expensive operations to reduce per-request overhead costs",
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because batch expensive operations to reduce per-request overhead costs. For easy difficulty, this option most directly addresses batching without relying on weaker side optimizations."
  }
]

export default data
