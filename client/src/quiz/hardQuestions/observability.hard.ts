const data = [
  {
    "id": "hard-what-is-the-strongest-primary-use-of-metrics-in-production-1",
    "difficulty": "hard",
    "prompt": "What is the strongest primary use of metrics in production?",
    "options": [
      "Tracking trends, SLOs, and alerting at scale",
      "Guaranteeing root-cause diagnosis without logs",
      "Replacing traces for distributed request correlation",
      "Storing complete exception stack frames indefinitely",
      "Eliminating cardinality tradeoffs in telemetry design",
      "Reconstructing full payload-level user request context"
    ],
    "correctIndex": 0,
    "correctExplanation": "Metrics are compact and aggregatable, making them ideal for time-series monitoring, SLO tracking, and alerting across large systems."
  },
  {
    "id": "hard-why-are-traces-critical-in-microservice-architectures-2",
    "difficulty": "hard",
    "prompt": "Why are traces critical in microservice architectures?",
    "options": [
      "They show end-to-end request paths and latency breakdowns",
      "They guarantee exactly-once processing in event pipelines",
      "They replace load testing for all performance questions",
      "They provide full retention of every log line forever",
      "They eliminate need for timeout and retry policies",
      "They avoid sampling tradeoffs under heavy traffic"
    ],
    "correctIndex": 0,
    "correctExplanation": "Tracing connects spans across services, revealing bottlenecks and propagation delays that are hard to identify from isolated logs or metrics."
  },
  {
    "id": "hard-a-practical-purpose-of-structured-logs-is-to-3",
    "difficulty": "hard",
    "prompt": "A practical purpose of structured logs is to:",
    "options": [
      "Enable fast query/filter workflows for incidents",
      "Replace domain-level monitoring dashboards entirely",
      "Avoid parsing considerations in log pipelines",
      "Prevent all false positives in paging systems",
      "Make telemetry schema evolution unnecessary",
      "Remove need for request identifiers and correlation IDs"
    ],
    "correctIndex": 0,
    "correctExplanation": "Structured logs are machine-parsable and searchable, improving incident response speed and consistency across tooling."
  },
  {
    "id": "hard-what-does-high-cardinality-telemetry-risk-primarily-affect-4",
    "difficulty": "hard",
    "prompt": "What does high-cardinality telemetry risk primarily affect?",
    "options": [
      "Storage cost, query performance, and aggregation efficiency",
      "Binary compatibility between deployment versions",
      "TLS termination correctness in ingress gateways",
      "Container image signature validation workflow",
      "Language runtime memory safety guarantees",
      "Kernel network driver interrupt behavior"
    ],
    "correctIndex": 0,
    "correctExplanation": "Excessive cardinality can explode metric dimensions and degrade observability systems, increasing cost and lowering signal usability."
  },
  {
    "id": "hard-why-pair-slos-with-error-budgets-5",
    "difficulty": "hard",
    "prompt": "Why pair SLOs with error budgets?",
    "options": [
      "To balance reliability goals against delivery velocity",
      "To disable experimentation in all production systems",
      "To avoid defining user-centric availability metrics",
      "To guarantee customer satisfaction independent of latency",
      "To replace postmortems with weekly status meetings",
      "To enforce zero incidents before any deployment"
    ],
    "correctIndex": 0,
    "correctExplanation": "Error budgets operationalize reliability targets and create explicit tradeoff boundaries between stability work and feature velocity."
  },
  {
    "id": "hard-what-is-the-value-of-synthetic-checks-in-monitoring-6",
    "difficulty": "hard",
    "prompt": "What is the value of synthetic checks in monitoring?",
    "options": [
      "They test critical user journeys proactively",
      "They eliminate regional outage blast radius",
      "They remove need for business KPI observability",
      "They replace real-user monitoring for all traffic",
      "They prevent false alarms in all alerting systems",
      "They guarantee every third-party dependency is healthy"
    ],
    "correctIndex": 0,
    "correctExplanation": "Synthetic probes provide consistent baseline checks for key paths and can detect regressions before user reports spike."
  }
]

export default data
