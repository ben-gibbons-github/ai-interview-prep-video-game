const data = [
  {
    "id": "medium-scalability-horizontal-scale-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where horizontal scale is the main concern. Which option is the strongest approach?",
    "options": [
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Scale horizontally behind stateless services and load balancing",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because scale horizontally behind stateless services and load balancing. For medium difficulty, this option most directly addresses horizontal scale without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-caching-tier-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where caching tier is the main concern. Which option is the strongest approach?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Plan capacity with headroom for burst and failure scenarios",
      "Choose shard keys that distribute read write load evenly"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use multi-layer caching to offload repetitive read traffic. For medium difficulty, this option most directly addresses caching tier without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-queue-buffering-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where queue buffering is the main concern. Which option is the strongest approach?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because buffer spikes with queues to smooth producer consumer mismatch. For medium difficulty, this option most directly addresses queue buffering without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-shard-key-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where shard key is the main concern. Which option is the strongest approach?",
    "options": [
      "Limit fanout breadth to reduce tail latency amplification",
      "Use multi-layer caching to offload repetitive read traffic",
      "Scale on saturation signals not just average CPU percentage",
      "Plan capacity with headroom for burst and failure scenarios",
      "Choose shard keys that distribute read write load evenly"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because choose shard keys that distribute read write load evenly. For medium difficulty, this option most directly addresses shard key without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-read-replicas-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where read replicas is the main concern. Which option is the strongest approach?",
    "options": [
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Scale horizontally behind stateless services and load balancing",
      "Batch expensive operations to reduce per-request overhead costs",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because offload read-heavy traffic to replicas with staleness awareness. For medium difficulty, this option most directly addresses read replicas without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-autoscaling-signal-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where autoscaling signal is the main concern. Which option is the strongest approach?",
    "options": [
      "Plan capacity with headroom for burst and failure scenarios",
      "Scale on saturation signals not just average CPU percentage",
      "Use multi-layer caching to offload repetitive read traffic",
      "Apply backpressure before queues grow beyond recovery limits",
      "Limit fanout breadth to reduce tail latency amplification"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because scale on saturation signals not just average CPU percentage. For medium difficulty, this option most directly addresses autoscaling signal without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-backpressure-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where backpressure is the main concern. Which option is the strongest approach?",
    "options": [
      "Scale on saturation signals not just average CPU percentage",
      "Plan capacity with headroom for burst and failure scenarios",
      "Apply backpressure before queues grow beyond recovery limits",
      "Use multi-layer caching to offload repetitive read traffic",
      "Buffer spikes with queues to smooth producer consumer mismatch"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because apply backpressure before queues grow beyond recovery limits. For medium difficulty, this option most directly addresses backpressure without relying on weaker side optimizations."
  },
  {
    "id": "medium-scalability-batching-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a scalability design where batching is the main concern. Which option is the strongest approach?",
    "options": [
      "Scale horizontally behind stateless services and load balancing",
      "Offload read-heavy traffic to replicas with staleness awareness",
      "Buffer spikes with queues to smooth producer consumer mismatch",
      "Batch expensive operations to reduce per-request overhead costs",
      "Apply backpressure before queues grow beyond recovery limits"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because batch expensive operations to reduce per-request overhead costs. For medium difficulty, this option most directly addresses batching without relying on weaker side optimizations."
  }
]

export default data
