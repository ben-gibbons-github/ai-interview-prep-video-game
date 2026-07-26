const data = [
  {
    id: 'hard-estimating-capacity-cross-region-bandwidth-1',
    difficulty: 'hard',
    prompt: 'A service replicates 85,000 writes/sec cross-region. Each replicated mutation averages 1.8 KB on the wire after protocol overhead. If only 60% of writes require cross-region sync, what sustained inter-region bandwidth is closest?',
    options: ['About 734 Mbps', 'About 1.22 Gbps', 'About 367 Mbps', 'About 7.34 Gbps'],
    correctIndex: 0,
    correctExplanation:
      'Replicated writes are 85,000 * 0.6 = 51,000/sec. Data rate is 51,000 * 1.8 KB = 91,800 KB/s, about 91.8 MB/s. Multiply by 8 to get about 734 Mbps.',
  },
  {
    id: 'hard-estimating-capacity-long-retention-2',
    difficulty: 'hard',
    prompt: 'An analytics lake ingests 14 TB/day compressed data. It retains 180 days online. If effective storage multiplier for replicas, parity, manifests, and compaction overhead is 1.8x, what total storage budget is closest?',
    options: ['About 4.5 PB', 'About 2.5 PB', 'About 1.8 PB', 'About 6.8 PB'],
    correctIndex: 0,
    correctExplanation:
      'Raw retained data is 14 * 180 = 2,520 TB, or 2.52 PB. Multiply by 1.8 to get about 4.54 PB, roughly 4.5 PB.',
  },
  {
    id: 'hard-estimating-capacity-hot-memory-tier-3',
    difficulty: 'hard',
    prompt: 'A search service keeps 1.4 billion postings in an in-memory hot tier. Each posting consumes 18 bytes compressed, and heap plus indexing overhead adds 60%. If 15% of RAM should remain free, what memory estimate is closest?',
    options: ['About 47 GB', 'About 38 GB', 'About 84 GB', 'About 120 GB'],
    correctIndex: 0,
    correctExplanation:
      'Raw memory is 1.4B * 18 bytes = 25.2 GB. With 60% overhead that becomes 40.32 GB. To leave 15% free, divide by 0.85 to get 47.4 GB, so about 47 GB is the closest estimate.',
  },
  {
    id: 'hard-estimating-capacity-shard-count-with-rebuild-4',
    difficulty: 'hard',
    prompt: 'A key-value store shard handles 18,000 read QPS safely. Peak reads are 410,000 QPS. You also require that after losing one shard, the cluster still serves peak traffic while any replacement shard rebuilds. Minimum shard count?',
    options: ['24 shards', '23 shards', '25 shards', '18 shards'],
    correctIndex: 0,
    correctExplanation:
      'Let n be shard count. After losing one shard, remaining capacity is (n - 1) * 18,000. This must still be at least 410,000. So n - 1 >= 22.78, meaning n >= 23.78. Round up to 24 shards.',
  },
  {
    id: 'hard-estimating-capacity-worker-pool-5',
    difficulty: 'hard',
    prompt: 'A fraud system must score 320,000 events/sec. Each worker node has 32 threads, and each thread can score 140 events/sec at p99 target. To cap fleet utilization at 70%, about how many worker nodes are needed?',
    options: ['103 nodes', '72 nodes', '86 nodes', '128 nodes'],
    correctIndex: 0,
    correctExplanation:
      'One node handles 32 * 140 = 4,480 events/sec at 100% utilization. At 70% target, usable throughput is 3,136 events/sec per node. 320,000 / 3,136 = 102.0, so about 103 nodes are needed.',
  },
  {
    id: 'hard-estimating-capacity-storage-rebuild-window-6',
    difficulty: 'hard',
    prompt: 'A storage cluster loses one 96 TB node and must rebuild its data in 8 hours. If rebuild traffic should use at most 35% of available 25 Gbps network capacity on the replacement path, is that enough bandwidth?',
    options: ['Yes, the allowed rebuild bandwidth is enough', 'No, because required rebuild rate exceeds allowed bandwidth', 'Yes, 25 Gbps is always enough for 96 TB in 8 hours', 'Impossible to estimate without CPU metrics'],
    correctIndex: 1,
    correctExplanation:
      '96 TB over 8 hours requires about 3.33 GB/s sustained rebuild throughput. 35% of 25 Gbps is 8.75 Gbps, which is about 1.09 GB/s. That is well below the required rebuild rate, so bandwidth is not enough.',
  },
]

export default data
