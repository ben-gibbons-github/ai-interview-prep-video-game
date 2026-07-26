const data = [
  {
    "id": "hard-when-is-the-strategy-pattern-most-useful-1",
    "difficulty": "hard",
    "prompt": "When is the Strategy pattern most useful?",
    "options": [
      "When behavior varies and should be swappable at runtime",
      "When a singleton global instance is always required",
      "When database schema evolution is the main concern",
      "When constructors must perform all business logic",
      "When thread pools must be replaced with recursion",
      "When class inheritance depth should be maximized"
    ],
    "correctIndex": 0,
    "correctExplanation": "Strategy encapsulates interchangeable algorithms behind a stable interface, reducing conditional complexity and enabling flexible composition."
  },
  {
    "id": "hard-what-problem-does-factory-method-solve-2",
    "difficulty": "hard",
    "prompt": "What problem does Factory Method solve?",
    "options": [
      "It abstracts object creation behind a common interface",
      "It guarantees object immutability in all languages",
      "It replaces dependency injection containers fully",
      "It removes need for polymorphism and interfaces",
      "It enforces singleton scope for all products",
      "It maps SQL rows directly into UI components"
    ],
    "correctIndex": 0,
    "correctExplanation": "Factory Method centralizes construction decisions and decouples callers from concrete types, making extension and testing easier."
  },
  {
    "id": "hard-observer-pattern-is-ideal-when-3",
    "difficulty": "hard",
    "prompt": "Observer pattern is ideal when:",
    "options": [
      "Multiple subscribers react to state changes in a subject",
      "Handlers must execute in deterministic lexical order",
      "Only one caller should ever receive notifications",
      "Tight compile-time coupling is required by design",
      "All updates must be persisted before publishing",
      "Polling is preferred over event-driven updates"
    ],
    "correctIndex": 0,
    "correctExplanation": "Observer supports one-to-many notification relationships and helps decouple publishers from subscribers, especially in event-driven systems."
  },
  {
    "id": "hard-decorator-pattern-is-mainly-used-to-4",
    "difficulty": "hard",
    "prompt": "Decorator pattern is mainly used to:",
    "options": [
      "Add responsibilities dynamically without subclass explosion",
      "Serialize decorated objects into relational schemas",
      "Bypass interfaces for direct private field access",
      "Guarantee lock-free concurrency in all wrappers",
      "Force inheritance for every optional behavior",
      "Replace composition with global mutable state"
    ],
    "correctIndex": 0,
    "correctExplanation": "Decorator composes behavior incrementally around a core component, keeping code extensible while avoiding large inheritance hierarchies."
  },
  {
    "id": "hard-what-is-a-key-benefit-of-adapter-pattern-5",
    "difficulty": "hard",
    "prompt": "What is a key benefit of Adapter pattern?",
    "options": [
      "It lets incompatible interfaces collaborate safely",
      "It removes versioning concerns in third-party APIs",
      "It guarantees no performance overhead for conversion",
      "It enforces one canonical domain model for all teams",
      "It auto-generates persistence layers from API schemas",
      "It converts asynchronous systems into synchronous ones"
    ],
    "correctIndex": 0,
    "correctExplanation": "Adapter bridges interface mismatch so existing components can interoperate without invasive changes to either side."
  },
  {
    "id": "hard-command-pattern-is-valuable-because-it-6",
    "difficulty": "hard",
    "prompt": "Command pattern is valuable because it:",
    "options": [
      "Encapsulates requests as objects for queuing and undo",
      "Replaces authorization logic for privileged operations",
      "Eliminates need for transaction boundaries in services",
      "Guarantees commands are idempotent without design effort",
      "Removes requirement for audit logging in critical systems",
      "Stores every command directly in UI view classes"
    ],
    "correctIndex": 0,
    "correctExplanation": "Commands model actions as first-class objects, enabling flexible execution pipelines, logging, retries, and reversible operations."
  }
]

export default data
