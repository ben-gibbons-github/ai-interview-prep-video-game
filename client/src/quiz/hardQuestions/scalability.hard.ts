const data = [
  {
    "id": "hard-scalability-horizontal-scale-1",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles horizontal scale while preserving correctness?",
    "options": [
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Scale horizontally behind stateless services and load balancing",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits",
      "Scale on saturation signals not just average CPU percentage"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because scale horizontally behind stateless services and load balancing. For hard difficulty, this option most directly addresses horizontal scale without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-caching-tier-2",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles caching tier while preserving correctness?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Plan capacity with headroom for burst and failure scenarios",
      "Choose shard keys that distribute read write load evenly",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use multi-layer caching to offload repetitive read traffic. For hard difficulty, this option most directly addresses caching tier without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-queue-buffering-3",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles queue buffering while preserving correctness?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits",
      "Scale on saturation signals not just average CPU percentage"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because buffer spikes with queues to smooth producer consumer mismatch. For hard difficulty, this option most directly addresses queue buffering without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-shard-key-4",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles shard key while preserving correctness?",
    "options": [
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Scale on saturation signals not just average CPU percentage",
      "Plan capacity with headroom for burst and failure scenarios",
      "Choose shard keys that distribute read write load evenly",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because choose shard keys that distribute read write load evenly. For hard difficulty, this option most directly addresses shard key without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-read-replicas-5",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles read replicas while preserving correctness?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits",
      "Scale on saturation signals not just average CPU percentage",
      "Offload read-heavy traffic to replicas with staleness awareness"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because offload read-heavy traffic to replicas with staleness awareness. For hard difficulty, this option most directly addresses read replicas without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-autoscaling-signal-6",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles autoscaling signal while preserving correctness?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Plan capacity with headroom for burst and failure scenarios",
      "Use multi-layer caching to offload repetitive read traffic",
      "Apply backpressure before queues grow beyond recovery limits",
      "Limit fanout breadth to reduce tail latency amplification",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because scale on saturation signals not just average CPU percentage. For hard difficulty, this option most directly addresses autoscaling signal without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-backpressure-7",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles backpressure while preserving correctness?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Apply backpressure before queues grow beyond recovery limits",
      "Plan capacity with headroom for burst and failure scenarios",
      "Use multi-layer caching to offload repetitive read traffic",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Scale horizontally behind stateless services and load balancing"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because apply backpressure before queues grow beyond recovery limits. For hard difficulty, this option most directly addresses backpressure without relying on weaker side optimizations."
  },
  {
    "id": "hard-scalability-batching-8",
    "difficulty": "hard",
    "prompt": "In a high-scale scalability scenario with failures and concurrency, which option best handles batching while preserving correctness?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits",
      "Scale on saturation signals not just average CPU percentage"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because batch expensive operations to reduce per-request overhead costs. For hard difficulty, this option most directly addresses batching without relying on weaker side optimizations."
  }
]

export default data
