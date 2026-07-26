const data = [
  {
    "id": "medium-reliability-circuit-breaker-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where circuit breaker is the main concern. Which option is the strongest approach?",
    "options": [
      "Route traffic only to instances passing meaningful health checks",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others",
      "Drive reliability decisions with SLO error budget consumption"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because fail fast with circuit breakers when dependencies are unhealthy. For medium difficulty, this option most directly addresses circuit breaker without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-retry-backoff-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where retry backoff is the main concern. Which option is the strongest approach?",
    "options": [
      "Provide fallback responses for known downstream outage paths",
      "Drive reliability decisions with SLO error budget consumption",
      "Retry transient failures with exponential backoff and jitter",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Route traffic only to instances passing meaningful health checks"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because retry transient failures with exponential backoff and jitter. For medium difficulty, this option most directly addresses retry backoff without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-bulkhead-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where bulkhead is the main concern. Which option is the strongest approach?",
    "options": [
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Isolate resource pools so one failure domain cannot starve others",
      "Use dead-letter queues for poison messages requiring manual triage"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because isolate resource pools so one failure domain cannot starve others. For medium difficulty, this option most directly addresses bulkhead without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-health-checks-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where health checks is the main concern. Which option is the strongest approach?",
    "options": [
      "Degrade gracefully by serving partial functionality under stress",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because route traffic only to instances passing meaningful health checks. For medium difficulty, this option most directly addresses health checks without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-graceful-degradation-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where graceful degradation is the main concern. Which option is the strongest approach?",
    "options": [
      "Degrade gracefully by serving partial functionality under stress",
      "Route traffic only to instances passing meaningful health checks",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Isolate resource pools so one failure domain cannot starve others",
      "Validate resilience assumptions with controlled chaos experiments"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because degrade gracefully by serving partial functionality under stress. For medium difficulty, this option most directly addresses graceful degradation without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-dlq-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where dlq is the main concern. Which option is the strongest approach?",
    "options": [
      "Isolate resource pools so one failure domain cannot starve others",
      "Use dead-letter queues for poison messages requiring manual triage",
      "Validate resilience assumptions with controlled chaos experiments",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use dead-letter queues for poison messages requiring manual triage. For medium difficulty, this option most directly addresses dlq without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-slo-budget-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where slo budget is the main concern. Which option is the strongest approach?",
    "options": [
      "Retry transient failures with exponential backoff and jitter",
      "Provide fallback responses for known downstream outage paths",
      "Drive reliability decisions with SLO error budget consumption",
      "Fail fast with circuit breakers when dependencies are unhealthy",
      "Route traffic only to instances passing meaningful health checks"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because drive reliability decisions with SLO error budget consumption. For medium difficulty, this option most directly addresses slo budget without relying on weaker side optimizations."
  },
  {
    "id": "medium-reliability-chaos-validation-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a reliability design where chaos validation is the main concern. Which option is the strongest approach?",
    "options": [
      "Isolate resource pools so one failure domain cannot starve others",
      "Route traffic only to instances passing meaningful health checks",
      "Degrade gracefully by serving partial functionality under stress",
      "Validate resilience assumptions with controlled chaos experiments",
      "Use dead-letter queues for poison messages requiring manual triage"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because validate resilience assumptions with controlled chaos experiments. For medium difficulty, this option most directly addresses chaos validation without relying on weaker side optimizations."
  }
]

export default data
