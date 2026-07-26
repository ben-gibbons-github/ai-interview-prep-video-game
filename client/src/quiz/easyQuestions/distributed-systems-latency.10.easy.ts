const data = [
  {
    id: 'easy-distributed-latency-10-q1',
    difficulty: 'easy',
    prompt: 'A user-facing API has random slow spikes. What is the best first step?',
    options: [
      'Add more CPU immediately without measuring',
      'Instrument p50/p95/p99 latency and isolate the slow endpoint',
      'Disable all retries globally',
      'Increase every timeout to 5 minutes',
    ],
    correctIndex: 1,
    correctExplanation:
      'Start by measuring latency percentiles and identifying the exact slow path before changing architecture.',
  },
  {
    id: 'easy-distributed-latency-10-q2',
    difficulty: 'easy',
    prompt: 'Which pattern usually reduces user-visible latency for read-heavy pages?',
    options: [
      'Compute every response from scratch each request',
      'Store hot responses in a cache with TTL',
      'Serialize every request through one worker',
      'Write logs synchronously before rendering',
    ],
    correctIndex: 1,
    correctExplanation: 'Caching hot reads reduces repeated backend work and improves response time.',
  },
  {
    id: 'easy-distributed-latency-10-q3',
    difficulty: 'easy',
    prompt: 'A request calls three downstream services in sequence. What usually helps most?',
    options: [
      'Call independent services in parallel when possible',
      'Add an extra network hop for observability',
      'Force all traffic through one region only',
      'Retry every successful call once',
    ],
    correctIndex: 0,
    correctExplanation: 'Parallelizing independent calls shortens total critical-path latency.',
  },
  {
    id: 'easy-distributed-latency-10-q4',
    difficulty: 'easy',
    prompt: 'Why are timeouts important in distributed systems?',
    options: [
      'They make all requests succeed eventually',
      'They prevent hanging calls from consuming resources forever',
      'They remove the need for monitoring',
      'They guarantee exactly-once processing',
    ],
    correctIndex: 1,
    correctExplanation: 'Timeouts cap waiting time and protect thread/connection pools.',
  },
  {
    id: 'easy-distributed-latency-10-q5',
    difficulty: 'easy',
    prompt: 'What does p99 latency primarily indicate?',
    options: [
      'Average response time for all requests',
      'The slowest 1% request behavior',
      'Only database latency',
      'The number of requests per second',
    ],
    correctIndex: 1,
    correctExplanation: 'p99 captures tail latency and user experience for worst-case requests.',
  },
  {
    id: 'easy-distributed-latency-10-q6',
    difficulty: 'easy',
    prompt: 'A queue grows continuously while workers are healthy. What is the most likely root issue?',
    options: [
      'Arrival rate exceeds processing capacity',
      'TLS certificates are too new',
      'Responses are too compressed',
      'Cache hit rate is too high',
    ],
    correctIndex: 0,
    correctExplanation: 'Persistent queue growth usually means throughput is below incoming load.',
  },
]

export default data
