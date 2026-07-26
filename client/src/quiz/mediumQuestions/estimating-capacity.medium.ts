const data = [
  {
    id: 'medium-estimating-capacity-origin-bandwidth-1',
    difficulty: 'medium',
    prompt: 'An API serves 18,000 responses/sec at 28 KB each. A CDN absorbs 70% of requests. Approximately how much outbound bandwidth must the origin serve?',
    options: ['About 151 MB/s', 'About 504 MB/s', 'About 90 MB/s', 'About 1.2 GB/s'],
    correctIndex: 0,
    correctExplanation:
      'Origin serves 30% of requests: 18,000 * 0.3 = 5,400 responses/sec. At 28 KB each, that is 151,200 KB/s, about 151 MB/s.',
  },
  {
    id: 'medium-estimating-capacity-retention-with-replicas-2',
    difficulty: 'medium',
    prompt: 'A logging system ingests 2.2 TB/day. It keeps 21 days hot and uses replication factor 2.5 after compression and erasure coding overhead are considered. What storage estimate is closest?',
    options: ['About 116 TB', 'About 46 TB', 'About 92 TB', 'About 150 TB'],
    correctIndex: 0,
    correctExplanation:
      'Raw retained data is 2.2 * 21 = 46.2 TB. Multiply by 2.5 effective replica/overhead factor to get about 115.5 TB, or roughly 116 TB.',
  },
  {
    id: 'medium-estimating-capacity-partition-headroom-3',
    difficulty: 'medium',
    prompt: 'A Kafka partition can safely sustain 12 MB/s. Your stream is 160 MB/s sustained, and you want 33% spare capacity. Minimum partition count?',
    options: ['20 partitions', '14 partitions', '18 partitions', '24 partitions'],
    correctIndex: 0,
    correctExplanation:
      'With 33% spare capacity, usable utilization is 67%. Required total capacity is 160 / 0.67 ≈ 238.8 MB/s. Divide by 12 MB/s to get 19.9, so round up to 20 partitions.',
  },
  {
    id: 'medium-estimating-capacity-memory-cache-4',
    difficulty: 'medium',
    prompt: 'A cache stores 14 million objects. Average serialized size is 1.1 KB, and total metadata plus allocator overhead adds 45%. Roughly how much RAM is needed?',
    options: ['About 22 GB', 'About 15 GB', 'About 30 GB', 'About 11 GB'],
    correctIndex: 0,
    correctExplanation:
      'Raw memory is 14,000,000 * 1.1 KB = 15.4 GB. With 45% overhead, total is about 22.3 GB, so about 22 GB.',
  },
  {
    id: 'medium-estimating-capacity-db-shards-5',
    difficulty: 'medium',
    prompt: 'A database shard handles 7,500 write QPS at target latency. The product needs 52,000 peak write QPS, and you want one extra shard worth of slack for failover and rebalancing. Minimum shard count?',
    options: ['8 shards', '7 shards', '9 shards', '6 shards'],
    correctIndex: 0,
    correctExplanation:
      'Base shard requirement is 52,000 / 7,500 = 6.93, so 7 shards. Adding one extra shard of slack gives 8 total shards.',
  },
  {
    id: 'medium-estimating-capacity-batch-workers-6',
    difficulty: 'medium',
    prompt: 'A batch system must process 540 million records in 3 hours. Each worker handles 18,000 records/sec sustained. About how many workers are needed before extra headroom?',
    options: ['3 workers', '9 workers', '30 workers', '1 worker'],
    correctIndex: 0,
    correctExplanation:
      'Required throughput is 540,000,000 / 10,800 seconds = 50,000 records/sec. Divide by 18,000 to get 2.78, so round up to 3 workers.',
  },
]

export default data
