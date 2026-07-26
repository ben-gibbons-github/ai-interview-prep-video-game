const data = [
  {
    "id": "hard-reliability-circuit-breaker-1",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles circuit breaker while preserving correctness?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others",
      "Drive reliability decisions with SLO error budget consumption",
      "Validate resilience assumptions with controlled chaos experiments"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because fail fast with circuit breakers when dependencies are unhealthy. For hard difficulty, this option most directly addresses circuit breaker without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-retry-backoff-2",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles retry backoff while preserving correctness?",
    "options": [
      "Provide fallback responses for known downstream outage paths",
      "Drive reliability decisions with SLO error budget consumption",
      "Retry transient failures with exponential backoff and jitter",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because retry transient failures with exponential backoff and jitter. For hard difficulty, this option most directly addresses retry backoff without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-bulkhead-3",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles bulkhead while preserving correctness?",
    "options": [
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others",
      "Use dead-letter queues for poison messages requiring manual triage",
      "Fail fast with circuit breakers when dependencies are unhealthy"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because isolate resource pools so one failure domain cannot starve others. For hard difficulty, this option most directly addresses bulkhead without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-health-checks-4",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles health checks while preserving correctness?",
    "options": [
      "Degrade gracefully by serving partial functionality under stress",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Use dead-letter queues for poison messages requiring manual triage"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because route traffic only to instances passing meaningful health checks. For hard difficulty, this option most directly addresses health checks without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-graceful-degradation-5",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles graceful degradation while preserving correctness?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments",
      "Use dead-letter queues for poison messages requiring manual triage",
      "Degrade gracefully by serving partial functionality under stress"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because degrade gracefully by serving partial functionality under stress. For hard difficulty, this option most directly addresses graceful degradation without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-dlq-6",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles dlq while preserving correctness?",
    "options": [
      "Use dead-letter queues for poison messages requiring manual triage",
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Fail fast with circuit breakers when dependencies are unhealthy"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because use dead-letter queues for poison messages requiring manual triage. For hard difficulty, this option most directly addresses dlq without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-slo-budget-7",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles slo budget while preserving correctness?",
    "options": [
      "Retry transient failures with exponential backoff and jitter",
      "Drive reliability decisions with SLO error budget consumption",
      "Provide fallback responses for known downstream outage paths",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because drive reliability decisions with SLO error budget consumption. For hard difficulty, this option most directly addresses slo budget without relying on weaker side optimizations."
  },
  {
    "id": "hard-reliability-chaos-validation-8",
    "difficulty": "hard",
    "prompt": "In a high-scale reliability scenario with failures and concurrency, which option best handles chaos validation while preserving correctness?",
    "options": [
      "Isolate resource pools so one failure domain cannot starve others",
      "Route traffic only to instances passing meaningful health checks",
      "Validate resilience assumptions with controlled chaos experiments",
      "Degrade gracefully by serving partial functionality under stress",
      "Use dead-letter queues for poison messages requiring manual triage",
      "Fail fast with circuit breakers when dependencies are unhealthy"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because validate resilience assumptions with controlled chaos experiments. For hard difficulty, this option most directly addresses chaos validation without relying on weaker side optimizations."
  }
]

export default data
