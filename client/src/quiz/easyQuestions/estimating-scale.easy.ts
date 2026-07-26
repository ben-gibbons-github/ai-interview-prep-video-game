const data = [
  {
    id: 'easy-estimating-scale-dau-to-qps-1',
    difficulty: 'easy',
    prompt: 'A product has 8 million daily active users. Each user performs about 12 requests per day. Roughly what average read QPS should you plan for?',
    options: [
      'About 1,100 QPS',
      'About 110 QPS',
      'About 11,000 QPS',
      'About 110,000 QPS',
    ],
    correctIndex: 0,
    correctExplanation:
      'Total requests per day are 8,000,000 * 12 = 96,000,000. Dividing by 86,400 seconds gives about 1,111 QPS. This is average load; peak can be multiple times higher.',
  },
  {
    id: 'easy-estimating-scale-peak-headroom-2',
    difficulty: 'easy',
    prompt: 'If your average QPS is 2,500 and traffic peak is 4x average, what peak QPS should the system sustain?',
    options: ['10,000 QPS', '5,000 QPS', '7,500 QPS', '25,000 QPS'],
    correctIndex: 0,
    correctExplanation:
      'Peak planning uses multiplier * average. So 2,500 * 4 = 10,000 QPS.',
  },
  {
    id: 'easy-estimating-scale-event-size-3',
    difficulty: 'easy',
    prompt: 'A logging service receives 40,000 events per second, and each event averages 500 bytes. About how much inbound data rate is this?',
    options: ['About 20 MB/s', 'About 2 MB/s', 'About 200 MB/s', 'About 2 GB/s'],
    correctIndex: 0,
    correctExplanation:
      '40,000 * 500 bytes = 20,000,000 bytes per second, which is about 20 MB/s (decimal MB).',
  },
  {
    id: 'easy-estimating-scale-daily-storage-4',
    difficulty: 'easy',
    prompt: 'If the system writes 300 GB of data per day and keeps 30 days hot, how much hot storage is needed before replication overhead?',
    options: ['9 TB', '900 GB', '90 TB', '3 TB'],
    correctIndex: 0,
    correctExplanation:
      '300 GB/day * 30 days = 9,000 GB, which is about 9 TB.',
  },
  {
    id: 'easy-estimating-scale-cache-hit-5',
    difficulty: 'easy',
    prompt: 'A service handles 12,000 read QPS. If cache hit ratio is 85%, about how much read QPS reaches the database?',
    options: ['About 1,800 QPS', 'About 10,200 QPS', 'About 8,500 QPS', 'About 850 QPS'],
    correctIndex: 0,
    correctExplanation:
      'Miss ratio is 15%, so DB reads are 12,000 * 0.15 = 1,800 QPS.',
  },
  {
    id: 'easy-estimating-scale-multi-az-capacity-6',
    difficulty: 'easy',
    prompt: 'You run three AZs active-active and need to survive one AZ loss without overload. For a steady 9,000 QPS total, what per-AZ capacity target is safest?',
    options: ['At least 4,500 QPS per AZ', 'At least 3,000 QPS per AZ', 'At least 9,000 QPS per AZ', 'At least 1,500 QPS per AZ'],
    correctIndex: 0,
    correctExplanation:
      'After one AZ fails, two AZs remain. To serve 9,000 QPS with two zones, each must handle 4,500 QPS.',
  },
  {
    id: 'easy-estimating-scale-dau-signups-7',
    difficulty: 'easy',
    prompt: 'An app has 24 million monthly active users, and about 25% are active on a typical day. Roughly how many daily active users is that?',
    options: ['About 6 million DAU', 'About 600 thousand DAU', 'About 12 million DAU', 'About 18 million DAU'],
    correctIndex: 0,
    correctExplanation:
      '25% of 24 million is 6 million. This is a quick back-of-the-envelope DAU estimate from MAU.',
  },
  {
    id: 'easy-estimating-scale-server-count-8',
    difficulty: 'easy',
    prompt: 'A web tier must handle 18,000 peak RPS. If one server can safely handle 1,500 RPS, about how many servers are needed before extra headroom?',
    options: ['12 servers', '8 servers', '18 servers', '24 servers'],
    correctIndex: 0,
    correctExplanation:
      'Server count is total required throughput divided by per-server throughput: 18,000 / 1,500 = 12.',
  },
  {
    id: 'easy-estimating-scale-memory-per-user-9',
    difficulty: 'easy',
    prompt: 'A presence service stores 3 KB of in-memory state per connected user. If 2 million users are connected at once, about how much RAM is needed before overhead?',
    options: ['About 6 GB', 'About 600 MB', 'About 60 GB', 'About 600 GB'],
    correctIndex: 0,
    correctExplanation:
      '2,000,000 * 3 KB = 6,000,000 KB, which is about 6 GB of raw memory.',
  },
  {
    id: 'easy-estimating-scale-worker-count-10',
    difficulty: 'easy',
    prompt: 'A job queue gets 9,000 jobs per second. If one worker can process 300 jobs per second, how many workers are needed to keep up on average?',
    options: ['30 workers', '3 workers', '90 workers', '300 workers'],
    correctIndex: 0,
    correctExplanation:
      'Workers needed are 9,000 / 300 = 30. In practice you would add headroom beyond that baseline.',
  },
]

export default data
