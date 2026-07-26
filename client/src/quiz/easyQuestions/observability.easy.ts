const data = [
  {
    "id": "easy-what-is-the-strongest-primary-use-of-metrics-in-production-1",
    "difficulty": "easy",
    "prompt": "What is the strongest primary use of metrics in production?",
    "options": [
      "Tracking trends, SLOs, and alerting at scale",
      "Replacing traces for distributed request correlation",
      "Storing complete exception stack frames indefinitely",
      "Reconstructing full payload-level user request context"
    ],
    "correctIndex": 0,
    "correctExplanation": "Metrics are compact and aggregatable, making them ideal for time-series monitoring, SLO tracking, and alerting across large systems."
  },
  {
    "id": "easy-why-are-traces-critical-in-microservice-architectures-2",
    "difficulty": "easy",
    "prompt": "Why are traces critical in microservice architectures?",
    "options": [
      "They show end-to-end request paths and latency breakdowns",
      "They guarantee exactly-once processing in event pipelines",
      "They replace load testing for all performance questions",
      "They eliminate need for timeout and retry policies"
    ],
    "correctIndex": 0,
    "correctExplanation": "Tracing connects spans across services, revealing bottlenecks and propagation delays that are hard to identify from isolated logs or metrics."
  },
  {
    "id": "easy-a-practical-purpose-of-structured-logs-is-to-3",
    "difficulty": "easy",
    "prompt": "A practical purpose of structured logs is to:",
    "options": [
      "Enable fast query/filter workflows for incidents",
      "Replace domain-level monitoring dashboards entirely",
      "Remove need for request identifiers and correlation IDs",
      "Guarantee zero storage growth over time"
    ],
    "correctIndex": 0,
    "correctExplanation": "Structured logs are machine-parsable and searchable, improving incident response speed and consistency across tooling."
  },
  {
    "id": "easy-what-does-high-cardinality-telemetry-risk-primarily-affect-4",
    "difficulty": "easy",
    "prompt": "What does high-cardinality telemetry risk primarily affect?",
    "options": [
      "Storage cost, query performance, and aggregation efficiency",
      "TLS termination correctness in ingress gateways",
      "Language runtime memory safety guarantees",
      "Database durability semantics on commit"
    ],
    "correctIndex": 0,
    "correctExplanation": "Excessive cardinality can explode metric dimensions and degrade observability systems, increasing cost and lowering signal usability."
  },
  {
    "id": "easy-why-pair-slos-with-error-budgets-5",
    "difficulty": "easy",
    "prompt": "Why pair SLOs with error budgets?",
    "options": [
      "To balance reliability goals against delivery velocity",
      "To avoid defining user-centric availability metrics",
      "To replace postmortems with weekly status meetings",
      "To enforce zero incidents before any deployment"
    ],
    "correctIndex": 0,
    "correctExplanation": "Error budgets operationalize reliability targets and create explicit tradeoff boundaries between stability work and feature velocity."
  },
  {
    "id": "easy-what-is-the-value-of-synthetic-checks-in-monitoring-6",
    "difficulty": "easy",
    "prompt": "What is the value of synthetic checks in monitoring?",
    "options": [
      "They test critical user journeys proactively",
      "They remove need for business KPI observability",
      "They replace real-user monitoring for all traffic",
      "They guarantee every third-party dependency is healthy"
    ],
    "correctIndex": 0,
    "correctExplanation": "Synthetic probes provide consistent baseline checks for key paths and can detect regressions before user reports spike."
  }
]

export default data
