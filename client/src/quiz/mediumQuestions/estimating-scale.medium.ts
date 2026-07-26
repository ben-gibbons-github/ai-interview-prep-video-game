const data = [
  {
    id: 'medium-estimating-scale-rps-and-p95-1',
    difficulty: 'medium',
    prompt: 'An API sees 18,000 average RPS and 3.5x peak. Each request fans out to 2 internal calls. Approximately what peak internal call rate should downstreams tolerate?',
    options: ['About 126,000 calls/sec', 'About 63,000 calls/sec', 'About 36,000 calls/sec', 'About 252,000 calls/sec'],
    correctIndex: 0,
    correctExplanation:
      'Peak external RPS is 18,000 * 3.5 = 63,000. With fanout of 2, internal calls/sec are about 126,000.',
  },
  {
    id: 'medium-estimating-scale-storage-with-replication-2',
    difficulty: 'medium',
    prompt: 'A data pipeline stores 1.8 TB/day raw data and keeps 45 days. If storage replication factor is 3, what total storage budget is closest?',
    options: ['About 243 TB', 'About 81 TB', 'About 540 TB', 'About 60 TB'],
    correctIndex: 0,
    correctExplanation:
      'Raw retained data is 1.8 * 45 = 81 TB. With 3x replication, required storage is about 243 TB.',
  },
  {
    id: 'medium-estimating-scale-partition-throughput-3',
    difficulty: 'medium',
    prompt: 'A queue shard can safely handle 8 MB/s ingest. Your workload is 140 MB/s sustained ingest and you want 25% headroom. Minimum shard count?',
    options: ['24 shards', '18 shards', '14 shards', '30 shards'],
    correctIndex: 0,
    correctExplanation:
      'With 25% headroom, effective required capacity is 140 / 0.75 = 186.7 MB/s. Divide by 8 MB/s per shard: 23.3, so round up to 24 shards.',
  },
  {
    id: 'medium-estimating-scale-cache-memory-4',
    difficulty: 'medium',
    prompt: 'You need to cache 60 million keys. Average key+metadata footprint is 180 bytes, and value is 420 bytes. With 30% memory overhead, roughly how much RAM is required?',
    options: ['About 47 GB', 'About 28 GB', 'About 36 GB', 'About 60 GB'],
    correctIndex: 0,
    correctExplanation:
      'Per item size is 180 + 420 = 600 bytes. Total is 60,000,000 * 600 = 36 GB. Adding 30% overhead gives 46.8 GB, about 47 GB.',
  },
  {
    id: 'medium-estimating-scale-egress-bandwidth-5',
    difficulty: 'medium',
    prompt: 'A media API serves 9,000 responses/sec at an average payload of 220 KB. Approximate required outbound bandwidth?',
    options: ['About 15.8 Gbps', 'About 1.58 Gbps', 'About 158 Gbps', 'About 7.9 Gbps'],
    correctIndex: 0,
    correctExplanation:
      'Throughput is 9,000 * 220 KB = 1,980,000 KB/s, about 1.98 GB/s. Multiply by 8 for bits: about 15.8 Gbps.',
  },
  {
    id: 'medium-estimating-scale-write-iops-6',
    difficulty: 'medium',
    prompt: 'A database receives 24,000 write transactions/sec. Each transaction averages 3 index updates and 1 table write. If each update is one I/O op, what write IOPS estimate is closest?',
    options: ['About 96,000 IOPS', 'About 24,000 IOPS', 'About 72,000 IOPS', 'About 120,000 IOPS'],
    correctIndex: 0,
    correctExplanation:
      'Each transaction drives 4 writes (3 index + 1 table). 24,000 * 4 = about 96,000 write IOPS.',
  },
  {
    id: 'medium-estimating-scale-dau-to-concurrency-7',
    difficulty: 'medium',
    prompt: 'A consumer app has 36 million DAU. If 8% of DAU are concurrently online during peak hour, what peak concurrent-user estimate is closest?',
    options: ['About 2.9 million', 'About 290 thousand', 'About 1.8 million', 'About 5.8 million'],
    correctIndex: 0,
    correctExplanation:
      'Peak concurrency estimate is 36,000,000 * 0.08 = 2,880,000, or about 2.9 million users.',
  },
  {
    id: 'medium-estimating-scale-server-headroom-8',
    difficulty: 'medium',
    prompt: 'A service must handle 84,000 peak RPS. Each server handles 4,000 RPS at target latency, and you want 20% spare capacity. Minimum server count?',
    options: ['27 servers', '21 servers', '18 servers', '32 servers'],
    correctIndex: 0,
    correctExplanation:
      'With 20% spare capacity, effective usable capacity is 80%. Required total capacity is 84,000 / 0.8 = 105,000 RPS. Divide by 4,000 gives 26.25, so round up to 27 servers.',
  },
  {
    id: 'medium-estimating-scale-memory-with-overhead-9',
    difficulty: 'medium',
    prompt: 'A recommendation service keeps embeddings for 75 million items in RAM. Average embedding and metadata footprint is 320 bytes, and allocator plus bookkeeping overhead is 25%. Roughly how much memory is required?',
    options: ['About 30 GB', 'About 24 GB', 'About 40 GB', 'About 75 GB'],
    correctIndex: 0,
    correctExplanation:
      'Raw memory is 75,000,000 * 320 bytes = 24 GB. Adding 25% overhead gives 30 GB.',
  },
  {
    id: 'medium-estimating-scale-worker-threads-10',
    difficulty: 'medium',
    prompt: 'A crawler must process 1.2 million URLs per minute. One worker node runs 40 threads, and each thread averages 15 URLs/sec. About how many worker nodes are needed?',
    options: ['34 nodes', '20 nodes', '50 nodes', '80 nodes'],
    correctIndex: 0,
    correctExplanation:
      'Required throughput is 1,200,000 / 60 = 20,000 URLs/sec. One node handles 40 * 15 = 600 URLs/sec. 20,000 / 600 = 33.3, so round up to 34 nodes.',
  },
]

export default data
