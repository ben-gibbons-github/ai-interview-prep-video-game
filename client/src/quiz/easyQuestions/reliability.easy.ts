const data = [
  {
    "id": "easy-reliability-circuit-breaker-1",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses circuit breaker?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because fail fast with circuit breakers when dependencies are unhealthy. For easy difficulty, this option most directly addresses circuit breaker without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-retry-backoff-2",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses retry backoff?",
    "options": [
      "Provide fallback responses for known downstream outage paths",
      "Drive reliability decisions with SLO error budget consumption",
      "Retry transient failures with exponential backoff and jitter",
      "Fail fast with circuit breakers when dependencies are unhealthy"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because retry transient failures with exponential backoff and jitter. For easy difficulty, this option most directly addresses retry backoff without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-bulkhead-3",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses bulkhead?",
    "options": [
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because isolate resource pools so one failure domain cannot starve others. For easy difficulty, this option most directly addresses bulkhead without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-health-checks-4",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses health checks?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because route traffic only to instances passing meaningful health checks. For easy difficulty, this option most directly addresses health checks without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-graceful-degradation-5",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses graceful degradation?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because degrade gracefully by serving partial functionality under stress. For easy difficulty, this option most directly addresses graceful degradation without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-dlq-6",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses dlq?",
    "options": [
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments",
      "Use dead-letter queues for poison messages requiring manual triage",
      "Route traffic only to instances passing meaningful health checks"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use dead-letter queues for poison messages requiring manual triage. For easy difficulty, this option most directly addresses dlq without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-slo-budget-7",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses slo budget?",
    "options": [
      "Retry transient failures with exponential backoff and jitter",
      "Provide fallback responses for known downstream outage paths",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Drive reliability decisions with SLO error budget consumption"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because drive reliability decisions with SLO error budget consumption. For easy difficulty, this option most directly addresses slo budget without relying on weaker side optimizations."
  },
  {
    "id": "easy-reliability-chaos-validation-8",
    "difficulty": "easy",
    "prompt": "Reliability: which choice best addresses chaos validation?",
    "options": [
      "Validate resilience assumptions with controlled chaos experiments",
      "Isolate resource pools so one failure domain cannot starve others",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because validate resilience assumptions with controlled chaos experiments. For easy difficulty, this option most directly addresses chaos validation without relying on weaker side optimizations."
  }
]

export default data
