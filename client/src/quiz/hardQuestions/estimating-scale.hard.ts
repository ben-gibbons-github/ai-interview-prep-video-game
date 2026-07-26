const data = [
  {
    id: 'hard-estimating-scale-global-traffic-skew-1',
    difficulty: 'hard',
    prompt: 'A global product has 150,000 average RPS overall. The busiest region carries 46% of traffic, and regional peak is 3x that region\'s average. What regional peak RPS should capacity plans cover?',
    options: ['About 207,000 RPS', 'About 69,000 RPS', 'About 450,000 RPS', 'About 138,000 RPS'],
    correctIndex: 0,
    correctExplanation:
      'Busiest region average is 150,000 * 0.46 = 69,000 RPS. At 3x peak, that region needs about 207,000 RPS capacity.',
  },
  {
    id: 'hard-estimating-scale-messaging-retention-2',
    difficulty: 'hard',
    prompt: 'A messaging system handles 2.4 million messages/sec, average encoded size 340 bytes. It keeps 14 days online with replication factor 2. What storage estimate is closest?',
    options: ['About 2.0 PB', 'About 6.5 PB', 'About 1.3 PB', 'About 26 PB'],
    correctIndex: 0,
    correctExplanation:
      'Ingress is 2.4M * 340 = 816 MB/s. Per day this is about 70.5 TB. For 14 days, about 987 TB. With replication factor 2, storage is about 1.97 PB, so approximately 2.0 PB.',
  },
  {
    id: 'hard-estimating-scale-read-write-split-3',
    difficulty: 'hard',
    prompt: 'An OLTP cluster sees 40,000 tx/sec with read:write ratio of 7:3. If one write costs 5x CPU of one read, what fraction of CPU load comes from writes?',
    options: ['About 68%', 'About 30%', 'About 50%', 'About 83%'],
    correctIndex: 0,
    correctExplanation:
      'For 10 operations, reads contribute 7 * 1 = 7 CPU units, writes contribute 3 * 5 = 15 units. Total 22 units, so writes are 15/22 = about 68%.',
  },
  {
    id: 'hard-estimating-scale-failure-headroom-4',
    difficulty: 'hard',
    prompt: 'A service runs on 12 equal nodes and steady load uses 55% of total cluster capacity. You need to survive loss of any 3 nodes while keeping utilization under 80%. Is current sizing sufficient?',
    options: ['Yes, it remains under 80% utilization after losing 3 nodes', 'No, it will exceed 80% utilization', 'Yes, but only if traffic drops by at least 20%', 'Impossible to determine without p99 latency'],
    correctIndex: 0,
    correctExplanation:
      'Baseline load is 55% of 12-node capacity. After losing 3 nodes, remaining capacity is 75% of original. New utilization is 55/75 = 73.3%, which is below 80%, so sizing is sufficient for that failure target.',
  },
  {
    id: 'hard-estimating-scale-cdn-offload-5',
    difficulty: 'hard',
    prompt: 'An edge-cached API has 120,000 incoming RPS at the CDN with 92% cache hit ratio. Origin can safely handle 12,000 RPS at p99 target. Is origin capacity enough?',
    options: ['Yes; miss traffic is 9,600 RPS', 'No; miss traffic is 14,400 RPS', 'No; origin must handle full 120,000 RPS', 'Yes; hit ratio removes all origin reads'],
    correctIndex: 0,
    correctExplanation:
      'Miss ratio is 8%, so origin sees 120,000 * 0.08 = 9,600 RPS, which is below 12,000 safe capacity.',
  },
  {
    id: 'hard-estimating-scale-backfill-window-6',
    difficulty: 'hard',
    prompt: 'You must backfill 2.1 trillion records in 36 hours. A worker processes 14,000 records/sec sustained. Ignoring overhead, roughly how many workers are required?',
    options: ['About 1,160 workers', 'About 420 workers', 'About 2,300 workers', 'About 800 workers'],
    correctIndex: 0,
    correctExplanation:
      'Needed throughput is 2.1e12 / (36*3600) = about 16.2 million records/sec. Divide by 14,000 per worker for about 1,157 workers, so roughly 1,160.',
  },
  {
    id: 'hard-estimating-scale-dau-session-pressure-7',
    difficulty: 'hard',
    prompt: 'A collaboration product has 48 million DAU. On busy weekdays, 14% of DAU open the app during the busiest 10-minute window, and average active session length is 12 minutes. What peak concurrency estimate is closest?',
    options: ['About 8.1 million concurrent users', 'About 6.7 million concurrent users', 'About 3.4 million concurrent users', 'About 12.2 million concurrent users'],
    correctIndex: 0,
    correctExplanation:
      'Users entering during the 10-minute window are 48M * 0.14 = 6.72M. Because average session length is 12 minutes, concurrency in that period scales by 12/10, giving about 8.06M, or 8.1 million concurrent users.',
  },
  {
    id: 'hard-estimating-scale-server-count-with-failure-budget-8',
    difficulty: 'hard',
    prompt: 'A stateless API must sustain 240,000 peak RPS. Each server can handle 9,000 RPS at target p99. You also need N+2 redundancy, meaning the fleet must still serve peak load after losing any 2 servers. Minimum server count?',
    options: ['29 servers', '27 servers', '30 servers', '24 servers'],
    correctIndex: 0,
    correctExplanation:
      'Let n be server count. Surviving capacity after losing 2 servers is (n - 2) * 9,000. This must be at least 240,000. So n - 2 >= 26.67, meaning n >= 28.67. Round up to 29 servers.',
  },
  {
    id: 'hard-estimating-scale-memory-hotset-9',
    difficulty: 'hard',
    prompt: 'A feed service keeps a hot in-memory index for 420 million posts. Each entry needs 96 bytes for ranking features and 40 bytes for metadata. Memory allocator and fragmentation add 35% overhead. What RAM estimate is closest?',
    options: ['About 77 GB', 'About 57 GB', 'About 104 GB', 'About 140 GB'],
    correctIndex: 0,
    correctExplanation:
      'Per entry raw size is 96 + 40 = 136 bytes. Raw total is 420M * 136 = 57.12 GB. Add 35% overhead: 57.12 * 1.35 = 77.1 GB, about 77 GB.',
  },
  {
    id: 'hard-estimating-scale-worker-fleet-10',
    difficulty: 'hard',
    prompt: 'A video pipeline ingests 75,000 encoding jobs per minute. One worker node runs 24 parallel encoders, each averaging 0.9 jobs/sec sustained. To keep queue growth at zero with 15% spare capacity, how many worker nodes are needed?',
    options: ['69 nodes', '58 nodes', '82 nodes', '104 nodes'],
    correctIndex: 0,
    correctExplanation:
      'Required throughput is 75,000 / 60 = 1,250 jobs/sec. With 15% spare capacity, usable utilization is 85%, so target total capacity is 1,250 / 0.85 = 1,470.6 jobs/sec. One node handles 24 * 0.9 = 21.6 jobs/sec. 1,470.6 / 21.6 = 68.1, so round up to 69 nodes.',
  },
]

export default data
