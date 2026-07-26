const data = [
  {
    id: 'easy-estimating-capacity-bandwidth-1',
    difficulty: 'easy',
    prompt: 'A service returns 5,000 responses per second, and each response averages 40 KB. About how much outbound bandwidth is needed?',
    options: ['About 200 MB/s', 'About 20 MB/s', 'About 2 GB/s', 'About 500 MB/s'],
    correctIndex: 0,
    correctExplanation:
      '5,000 * 40 KB = 200,000 KB/s, which is about 200 MB/s of outbound throughput.',
  },
  {
    id: 'easy-estimating-capacity-retention-2',
    difficulty: 'easy',
    prompt: 'A system stores 120 GB of new data per day and retains it for 20 days. How much storage is needed before replication?',
    options: ['About 2.4 TB', 'About 240 GB', 'About 24 TB', 'About 1.2 TB'],
    correctIndex: 0,
    correctExplanation:
      '120 GB/day * 20 days = 2,400 GB, which is about 2.4 TB.',
  },
  {
    id: 'easy-estimating-capacity-shards-3',
    difficulty: 'easy',
    prompt: 'One partition can safely process 2,000 writes per second. If a workload needs 9,500 writes per second, what is the minimum partition count?',
    options: ['5 partitions', '4 partitions', '6 partitions', '8 partitions'],
    correctIndex: 0,
    correctExplanation:
      '9,500 / 2,000 = 4.75, and you must round up, so 5 partitions are needed.',
  },
  {
    id: 'easy-estimating-capacity-replication-4',
    difficulty: 'easy',
    prompt: 'If raw retained data is 8 TB and replication factor is 3, what total storage should you budget for replicas?',
    options: ['24 TB', '16 TB', '8 TB', '32 TB'],
    correctIndex: 0,
    correctExplanation:
      'Replication factor 3 means three copies, so total storage is 8 * 3 = 24 TB.',
  },
  {
    id: 'easy-estimating-capacity-network-gbps-5',
    difficulty: 'easy',
    prompt: 'A backend emits 125 MB/s of traffic. Approximately what network rate is that in Gbps?',
    options: ['About 1 Gbps', 'About 10 Gbps', 'About 0.1 Gbps', 'About 8 Gbps'],
    correctIndex: 0,
    correctExplanation:
      '125 MB/s * 8 = 1,000 Mb/s, which is about 1 Gbps.',
  },
  {
    id: 'easy-estimating-capacity-storage-growth-6',
    difficulty: 'easy',
    prompt: 'Data volume is 4 TB today and grows by 1 TB every month. About how much data will there be after 6 more months?',
    options: ['About 10 TB', 'About 6 TB', 'About 12 TB', 'About 24 TB'],
    correctIndex: 0,
    correctExplanation:
      'Starting at 4 TB and adding 6 TB over 6 months gives about 10 TB total.',
  },
]

export default data
