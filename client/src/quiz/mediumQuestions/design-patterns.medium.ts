const data = [
  {
    "id": "medium-when-is-the-strategy-pattern-most-useful-1",
    "difficulty": "medium",
    "prompt": "When is the Strategy pattern most useful?",
    "options": [
      "When behavior varies and should be swappable at runtime",
      "When a singleton global instance is always required",
      "When database schema evolution is the main concern",
      "When constructors must perform all business logic",
      "When class inheritance depth should be maximized"
    ],
    "correctIndex": 0,
    "correctExplanation": "Strategy encapsulates interchangeable algorithms behind a stable interface, reducing conditional complexity and enabling flexible composition."
  },
  {
    "id": "medium-what-problem-does-factory-method-solve-2",
    "difficulty": "medium",
    "prompt": "What problem does Factory Method solve?",
    "options": [
      "It abstracts object creation behind a common interface",
      "It guarantees object immutability in all languages",
      "It replaces dependency injection containers fully",
      "It removes need for polymorphism and interfaces",
      "It enforces singleton scope for all products"
    ],
    "correctIndex": 0,
    "correctExplanation": "Factory Method centralizes construction decisions and decouples callers from concrete types, making extension and testing easier."
  },
  {
    "id": "medium-observer-pattern-is-ideal-when-3",
    "difficulty": "medium",
    "prompt": "Observer pattern is ideal when:",
    "options": [
      "Multiple subscribers react to state changes in a subject",
      "Only one caller should ever receive notifications",
      "Tight compile-time coupling is required by design",
      "All updates must be persisted before publishing",
      "Polling is preferred over event-driven updates"
    ],
    "correctIndex": 0,
    "correctExplanation": "Observer supports one-to-many notification relationships and helps decouple publishers from subscribers, especially in event-driven systems."
  },
  {
    "id": "medium-decorator-pattern-is-mainly-used-to-4",
    "difficulty": "medium",
    "prompt": "Decorator pattern is mainly used to:",
    "options": [
      "Add responsibilities dynamically without subclass explosion",
      "Serialize decorated objects into relational schemas",
      "Bypass interfaces for direct private field access",
      "Guarantee lock-free concurrency in all wrappers",
      "Force inheritance for every optional behavior"
    ],
    "correctIndex": 0,
    "correctExplanation": "Decorator composes behavior incrementally around a core component, keeping code extensible while avoiding large inheritance hierarchies."
  },
  {
    "id": "medium-what-is-a-key-benefit-of-adapter-pattern-5",
    "difficulty": "medium",
    "prompt": "What is a key benefit of Adapter pattern?",
    "options": [
      "It lets incompatible interfaces collaborate safely",
      "It guarantees no performance overhead for conversion",
      "It enforces one canonical domain model for all teams",
      "It auto-generates persistence layers from API schemas",
      "It converts asynchronous systems into synchronous ones"
    ],
    "correctIndex": 0,
    "correctExplanation": "Adapter bridges interface mismatch so existing components can interoperate without invasive changes to either side."
  },
  {
    "id": "medium-command-pattern-is-valuable-because-it-6",
    "difficulty": "medium",
    "prompt": "Command pattern is valuable because it:",
    "options": [
      "Encapsulates requests as objects for queuing and undo",
      "Replaces authorization logic for privileged operations",
      "Eliminates need for transaction boundaries in services",
      "Guarantees commands are idempotent without design effort",
      "Removes requirement for audit logging in critical systems"
    ],
    "correctIndex": 0,
    "correctExplanation": "Commands model actions as first-class objects, enabling flexible execution pipelines, logging, retries, and reversible operations."
  }
]

export default data
