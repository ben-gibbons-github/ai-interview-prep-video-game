const data = [
  {
    "id": "easy-why-use-repository-pattern-in-backend-services-1",
    "difficulty": "easy",
    "prompt": "Why use repository pattern in backend services?",
    "options": [
      "To isolate domain logic from persistence implementation details",
      "To guarantee databases can be swapped with zero migration",
      "To remove need for transaction boundaries entirely",
      "To enforce one table per entity without exceptions"
    ],
    "correctIndex": 0,
    "correctExplanation": "Repository pattern can improve testability and separation of concerns by decoupling domain behavior from specific storage APIs."
  },
  {
    "id": "easy-what-is-a-practical-benefit-of-cqrs-in-suitable-domains-2",
    "difficulty": "easy",
    "prompt": "What is a practical benefit of CQRS in suitable domains?",
    "options": [
      "Independent optimization of read and write models",
      "No need for observability across command handlers",
      "Automatic correctness for distributed transactions",
      "Guaranteed elimination of eventual consistency concerns"
    ],
    "correctIndex": 0,
    "correctExplanation": "CQRS separates read and write concerns so each path can be tuned differently, at the cost of added complexity and consistency management."
  },
  {
    "id": "easy-why-is-idempotency-important-for-command-handlers-3",
    "difficulty": "easy",
    "prompt": "Why is idempotency important for command handlers?",
    "options": [
      "Retries should not produce duplicate side effects",
      "It makes commands execute faster than reads always",
      "It removes need for validation and authorization",
      "It guarantees ordering across all distributed workers"
    ],
    "correctIndex": 0,
    "correctExplanation": "Distributed retries are unavoidable. Idempotent command semantics keep outcomes correct when duplicate delivery or client retries occur."
  },
  {
    "id": "easy-what-does-the-unit-of-work-pattern-coordinate-4",
    "difficulty": "easy",
    "prompt": "What does the Unit of Work pattern coordinate?",
    "options": [
      "Consistent commit of related changes in one transaction scope",
      "Automatic rollback of external APIs without compensations",
      "Asynchronous fanout to all downstream microservices",
      "Runtime code generation for data-transfer objects"
    ],
    "correctIndex": 0,
    "correctExplanation": "Unit of Work tracks related mutations and commits them coherently, helping preserve consistency boundaries in application workflows."
  },
  {
    "id": "easy-a-clean-service-layer-should-primarily-5",
    "difficulty": "easy",
    "prompt": "A clean service layer should primarily:",
    "options": [
      "Orchestrate use-cases while keeping business rules explicit",
      "Inline SQL queries inside controllers for faster delivery",
      "Push all decisions into the UI to reduce backend logic",
      "Hide domain invariants inside ORM event hooks only"
    ],
    "correctIndex": 0,
    "correctExplanation": "Service layers coordinate workflows and dependency calls, while preserving clear boundaries around business policies and invariants."
  },
  {
    "id": "easy-why-use-feature-flags-in-iterative-delivery-6",
    "difficulty": "easy",
    "prompt": "Why use feature flags in iterative delivery?",
    "options": [
      "To decouple deployment from release and reduce rollout risk",
      "To eliminate testing because features can be toggled",
      "To remove observability needs during launch windows",
      "To avoid backward compatibility planning in clients"
    ],
    "correctIndex": 0,
    "correctExplanation": "Feature flags enable controlled exposure and fast rollback, improving release safety while still requiring disciplined testing and monitoring."
  }
]

export default data
