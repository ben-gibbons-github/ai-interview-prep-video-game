const data = [
  {
    id: 'easy-deployment-canary-rollout-9',
    difficulty: 'easy',
    prompt: 'Deployment safety: what is the best reason to start with a canary rollout?',
    options: [
      'It guarantees every bug will be found before release.',
      'It reduces blast radius by exposing the change to a small slice first.',
      'It removes the need for monitoring after deployment.',
      'It makes rollback impossible so the team stays disciplined.',
    ],
    correctIndex: 1,
    correctExplanation:
      'A canary rollout limits blast radius by sending only a small amount of traffic to the new version first, which makes regressions cheaper and safer to detect.',
  },
  {
    id: 'easy-retries-idempotent-writes-9',
    difficulty: 'easy',
    prompt: 'API safety: why should create or payment endpoints often be idempotent?',
    options: [
      'So retries do not create duplicate side effects.',
      'So the endpoint can ignore authentication.',
      'So the database never needs indexes.',
      'So the service can skip validation entirely.',
    ],
    correctIndex: 0,
    correctExplanation:
      'Idempotent write paths let clients retry safely without accidentally creating duplicate orders, duplicate charges, or duplicate records.',
  },
  {
    id: 'easy-timeouts-downstream-9',
    difficulty: 'easy',
    prompt: 'Reliability: why are timeouts important when calling downstream services?',
    options: [
      'They let requests wait forever for a slow dependency.',
      'They prevent one slow dependency from tying up all callers.',
      'They make the dependency faster by definition.',
      'They remove the need for retries or backoff.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Timeouts keep a slow or stuck dependency from consuming all caller resources. They let the system fail fast and recover instead of hanging indefinitely.',
  },
  {
    id: 'easy-observability-metrics-alerts-9',
    difficulty: 'easy',
    prompt: 'Observability: what is the main reason to track latency, error rate, and traffic metrics?',
    options: [
      'To replace logs and traces entirely.',
      'To monitor service health and spot regressions quickly.',
      'To make deployment slower but more predictable.',
      'To avoid setting any SLOs or alerts.',
    ],
    correctIndex: 1,
    correctExplanation:
      'Core service metrics provide a fast health signal for dashboards and alerts, which makes regressions easier to spot than relying on ad hoc debugging alone.',
  },
]

export default data