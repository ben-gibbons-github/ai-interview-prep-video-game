const data = [
  {
    "id": "hard-global-ordering-cost",
    "difficulty": "hard",
    "prompt": "Strict global ordering across regions is expensive because it needs:",
    "options": [
      "Focus on strict tuning only, not the core requirement.",
      "Cross-region coordination on critical write paths",
      "Prioritize strict over global, not the core requirement.",
      "Focus on strict tuning only, not the dominant bottleneck.",
      "Center the design on strict and ordering.",
      "Prioritize strict over global, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because strict global ordering means writes cannot be finalized independently in each region. The system has to coordinate across long network paths to decide a single order, which raises latency and makes the system more sensitive to partitions and quorum loss."
  },
  {
    "id": "hard-exactly-once-practical",
    "difficulty": "hard",
    "prompt": "In production, exactly-once effects are commonly achieved with:",
    "options": [
      "Center the design on production and once.",
      "At-least-once delivery plus idempotent processing",
      "Focus on production tuning only, not the core requirement.",
      "Treat production as the main objective.",
      "Optimize production and exactly first.",
      "Prioritize production over exactly, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because in practical systems the transport layer often cannot guarantee that a message is delivered exactly once under all failure modes. Instead, teams usually accept at-least-once delivery and make consumers idempotent so repeated processing still produces the correct final effect."
  },
  {
    "id": "hard-active-active-conflict",
    "difficulty": "hard",
    "prompt": "The core challenge in active-active multi-region writes is:",
    "options": [
      "Center the design on core and active.",
      "Conflict resolution for concurrent updates",
      "Optimize core and challenge first.",
      "Treat core as the main objective.",
      "Focus on core tuning only, not the core requirement.",
      "Prioritize core over challenge."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because once multiple regions can accept writes at the same time, conflicting updates are inevitable. The hard part is not accepting the writes, but deciding how those concurrent changes are merged, rejected, or resolved consistently across replicas."
  },
  {
    "id": "hard-tail-latency-p99",
    "difficulty": "hard",
    "prompt": "To reduce p99 latency, prioritize:",
    "options": [
      "Focus on reduce tuning only, not the core requirement.",
      "Managing stragglers, queueing, retries, and fanout",
      "Prioritize reduce over latency, not the core requirement.",
      "Focus on reduce tuning only, not the dominant bottleneck.",
      "Center the design on reduce and prioritize.",
      "Prioritize reduce over latency, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because p99 problems usually come from slow-path behavior such as queue buildup, retries, fanout, or occasional stragglers rather than average-case performance. If a design only optimizes the median path, the user experience can still be poor at scale."
  },
  {
    "id": "hard-cdc-purpose",
    "difficulty": "hard",
    "prompt": "Change Data Capture is mainly used to:",
    "options": [
      "Prioritize change over data, not the core requirement.",
      "Stream committed DB changes to downstream systems",
      "Focus on change tuning only, not the core requirement.",
      "Prioritize change over data, not the dominant bottleneck.",
      "Optimize change and data first, not the core requirement.",
      "Focus on change tuning only, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because CDC is about streaming committed database changes to other systems that need to react to them. It lets a database remain the source of truth while search indexes, analytics pipelines, caches, or downstream services stay synchronized without constant polling."
  },
  {
    "id": "hard-consensus-goal",
    "difficulty": "hard",
    "prompt": "Consensus protocols like Raft provide:",
    "options": [
      "Focus on consensus tuning only, not the core requirement.",
      "Agreement on replicated log/state despite failures",
      "Focus on consensus tuning only, not the dominant bottleneck.",
      "Center the design on consensus and like.",
      "Optimize consensus and protocols first.",
      "Prioritize consensus over protocols, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because protocols like Raft exist to make a replicated group behave like one coherent state machine despite failures. They ensure nodes agree on the order of operations before those operations are applied, which is the core of safe replicated coordination."
  },
  {
    "id": "hard-pacelc-tradeoff",
    "difficulty": "hard",
    "prompt": "PACELC extends CAP by saying when no partition exists, systems trade:",
    "options": [
      "Storage and compute costs",
      "Latency and consistency",
      "CPU and memory efficiency",
      "Throughput and power usage",
      "Network and disk bandwidth",
      "Compression and cache size"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because PACELC extends the CAP conversation beyond partitions. It points out that even when the system is healthy, designers still choose between lower latency and stronger consistency, so tradeoffs do not disappear just because the network is behaving."
  },
  {
    "id": "hard-saga-pattern",
    "difficulty": "hard",
    "prompt": "Saga orchestration is used when:",
    "options": [
      "Treat saga as the main objective, not the dominant bottleneck.",
      "Long-running cross-service workflows need compensating actions",
      "Prioritize saga over orchestration, not the core requirement.",
      "Center the design on saga and long, not the core requirement.",
      "Prioritize saga over orchestration, not the dominant bottleneck.",
      "Optimize saga and orchestration first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because saga orchestration is useful for long-running workflows that span multiple services where a single global ACID transaction is either impractical or too expensive. Each step commits locally, and if something later fails, compensating actions unwind the business effect."
  },
  {
    "id": "hard-linearizability",
    "difficulty": "hard",
    "prompt": "Linearizability guarantees that operations appear:",
    "options": [
      "Treat linearizability as the main objective.",
      "As if executed atomically in real-time order",
      "Prioritize linearizability over guarantees.",
      "Optimize linearizability and guarantees first.",
      "Focus on linearizability tuning only.",
      "Center the design on linearizability and operations."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because linearizability gives the illusion that every operation happened atomically against one current copy of the data. It is a very strong guarantee because the observed order must also respect real-time ordering from the perspective of clients."
  },
  {
    "id": "hard-snapshot-isolation-anomaly",
    "difficulty": "hard",
    "prompt": "A classic anomaly under snapshot isolation is:",
    "options": [
      "Deadlock-free",
      "Write skew",
      "No phantom reads",
      "No write skew risk",
      "Always serializable",
      "Conflict-free writes"
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because snapshot isolation prevents many anomalies, but it does not guarantee full serializability. Write skew is the classic example where two concurrent transactions each observe a valid snapshot and commit changes that together violate an invariant."
  },
  {
    "id": "hard-bloom-filter-use",
    "difficulty": "hard",
    "prompt": "Bloom filters are useful in storage systems to:",
    "options": [
      "Focus on bloom tuning only, not the core requirement.",
      "Quickly rule out non-existent keys with small memory",
      "Prioritize bloom over filters, not the core requirement.",
      "Focus on bloom tuning only, not the dominant bottleneck.",
      "Prioritize bloom over filters, not the dominant bottleneck.",
      "Optimize bloom and filters first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because bloom filters are valuable when the system needs a fast and compact way to rule out keys that definitely do not exist. They save work by avoiding expensive lookups, while accepting a bounded false-positive rate in exchange for low memory use."
  },
  {
    "id": "hard-lsm-tree-compaction",
    "difficulty": "hard",
    "prompt": "In LSM-tree databases, compaction primarily:",
    "options": [
      "Focus on tree tuning only, not the core requirement.",
      "Merges sorted files to control read amplification",
      "Focus on tree tuning only, not the dominant bottleneck.",
      "Prioritize tree over databases, not the core requirement.",
      "Center the design on tree and compaction.",
      "Treat tree as the main objective, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because LSM-tree compaction is the mechanism that merges and reorganizes immutable files over time. That work is essential to keep read amplification under control and reclaim obsolete data, even though it introduces background IO cost and write amplification."
  },
  {
    "id": "hard-fencing-tokens",
    "difficulty": "hard",
    "prompt": "Fencing tokens are used to prevent:",
    "options": [
      "Focus on fencing tuning only, not the core requirement.",
      "Stale leaders from issuing writes after lease loss",
      "Prioritize fencing over tokens, not the core requirement.",
      "Focus on fencing tuning only, not the dominant bottleneck.",
      "Center the design on fencing and prevent.",
      "Prioritize fencing over tokens, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because fencing tokens protect against stale leaders or lease holders continuing to write after they should have lost authority. A downstream system can compare tokens and reject older writers, which is much safer than trusting leases alone."
  },
  {
    "id": "hard-monotonic-reads",
    "difficulty": "hard",
    "prompt": "Monotonic-read consistency ensures a client:",
    "options": [
      "Treat monotonic as the main objective.",
      "Never goes backward in observed versions",
      "Optimize monotonic and read first.",
      "Center the design on monotonic and consistency.",
      "Prioritize monotonic over read.",
      "Focus on monotonic tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because monotonic reads are a session-level consistency guarantee. Once a client has seen a newer version of data, the system should not later send that same client backward to an older version, even if replicas are unevenly updated."
  },
  {
    "id": "hard-crdt-purpose",
    "difficulty": "hard",
    "prompt": "CRDTs are designed to:",
    "options": [
      "Focus on crdts tuning only, not the core requirement.",
      "Allow conflict-free merges of concurrent updates",
      "Focus on crdts tuning only, not the dominant bottleneck.",
      "Prioritize crdts over designed, not the core requirement.",
      "Center the design on crdts and allow.",
      "Prioritize crdts over designed, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because CRDTs are explicitly designed so concurrent updates can be merged deterministically without requiring coordination at write time. They are useful when availability matters and the data type can be expressed with safe merge semantics."
  },
  {
    "id": "hard-data-locality",
    "difficulty": "hard",
    "prompt": "Data locality optimization aims to:",
    "options": [
      "Focus on data tuning only, not the dominant bottleneck.",
      "Place compute near data to reduce transfer latency/cost",
      "Prioritize data over locality, not the core requirement.",
      "Focus on data tuning only, not the core requirement.",
      "Prioritize data over locality, not the dominant bottleneck.",
      "Optimize data and locality first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because data locality is about minimizing unnecessary movement across the network. When compute runs closer to the data it needs, the system often sees lower latency, less bandwidth cost, and fewer tail problems caused by remote access."
  },
  {
    "id": "hard-anti-entropy",
    "difficulty": "hard",
    "prompt": "Anti-entropy protocols in distributed stores help:",
    "options": [
      "Center the design on anti and protocols.",
      "Reconcile divergent replicas over time",
      "Treat anti as the main objective.",
      "Optimize anti and entropy first.",
      "Prioritize anti over entropy.",
      "Focus on anti tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because anti-entropy protocols are background reconciliation mechanisms that help replicas converge after divergence. They do not eliminate inconsistency instantly, but they are important for long-term repair in distributed storage systems."
  },
  {
    "id": "hard-raft-commit-index",
    "difficulty": "hard",
    "prompt": "In Raft, the commit index indicates entries that are:",
    "options": [
      "Center the design on raft and index.",
      "Safely replicated and ready to apply",
      "Treat raft as the main objective.",
      "Optimize raft and commit first.",
      "Prioritize raft over commit.",
      "Focus on raft tuning only."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because in Raft, the commit index marks log entries that are known to be safely replicated according to the protocol's rules. Once an entry reaches that point, it can be applied to the replicated state machine without risking protocol-level inconsistency."
  },
  {
    "id": "hard-split-brain",
    "difficulty": "hard",
    "prompt": "Split-brain in distributed systems refers to:",
    "options": [
      "Center the design on split and distributed.",
      "Multiple nodes acting as primary simultaneously",
      "Focus on split tuning only, not the core requirement.",
      "Prioritize split over brain, not the core requirement.",
      "Focus on split tuning only, not the dominant bottleneck.",
      "Prioritize split over brain, not the dominant bottleneck."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because split brain means the system has lost agreement about who is the legitimate leader. If two primaries both accept writes, the cluster can diverge badly, which is why quorum, fencing, and careful failover design are critical."
  },
  {
    "id": "hard-multi-region-failover-rto-rpo",
    "difficulty": "hard",
    "prompt": "RTO and RPO in disaster recovery measure:",
    "options": [
      "Focus on disaster tuning only, not the core requirement.",
      "Recovery time objective and acceptable data loss window",
      "Focus on disaster tuning only, not the dominant bottleneck.",
      "Prioritize disaster over recovery, not the core requirement.",
      "Prioritize disaster over recovery, not the dominant bottleneck.",
      "Optimize disaster and recovery first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because these two metrics define disaster-recovery expectations from different angles. RTO measures how quickly service should be restored, while RPO measures how much recent data loss the business is willing to tolerate after a failure."
  },
  {
    "id": "hard-vector-clocks",
    "difficulty": "hard",
    "prompt": "Vector clocks are primarily useful for:",
    "options": [
      "Focus on vector tuning only, not the core requirement.",
      "Tracking causal ordering/concurrency between updates",
      "Prioritize vector over clocks, not the core requirement.",
      "Focus on vector tuning only, not the dominant bottleneck.",
      "Prioritize vector over clocks, not the dominant bottleneck.",
      "Optimize vector and clocks first, not the core requirement."
    ],
    "correctIndex": 1,
    "correctExplanation": "This answer is right because vector clocks capture causal relationships between updates rather than trying to rely on wall-clock time. That makes them useful for detecting whether one write happened after another or whether the two writes were concurrent and need conflict resolution."
  }
]

export default data
