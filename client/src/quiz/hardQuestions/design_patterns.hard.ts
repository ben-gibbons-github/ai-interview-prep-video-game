const data = [
  {
    "id": "hard-design_patterns-strategy-1",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles strategy while preserving correctness?",
    "options": [
      "Use Observer to publish state changes to subscribed listeners",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Command objects to encapsulate actions and enable undo",
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Factory creation to decouple object construction from usage",
      "Use Template Method for fixed flow with overridable steps"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use Strategy to swap algorithms without changing caller code. For hard difficulty, this option most directly addresses strategy without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-factory-2",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles factory while preserving correctness?",
    "options": [
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Repository to isolate persistence concerns from domain logic",
      "Use Factory creation to decouple object construction from usage",
      "Use Observer to publish state changes to subscribed listeners",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Builder when constructing complex objects with optional fields"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use Factory creation to decouple object construction from usage. For hard difficulty, this option most directly addresses factory without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-adapter-3",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles adapter while preserving correctness?",
    "options": [
      "Use Builder when constructing complex objects with optional fields",
      "Use Repository to isolate persistence concerns from domain logic",
      "Use Factory creation to decouple object construction from usage",
      "Use Adapter to bridge incompatible interfaces at integration boundaries",
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Observer to publish state changes to subscribed listeners"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because use Adapter to bridge incompatible interfaces at integration boundaries. For hard difficulty, this option most directly addresses adapter without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-observer-4",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles observer while preserving correctness?",
    "options": [
      "Use Strategy to swap algorithms without changing caller code",
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Factory creation to decouple object construction from usage",
      "Use Command objects to encapsulate actions and enable undo",
      "Use Observer to publish state changes to subscribed listeners",
      "Use Repository to isolate persistence concerns from domain logic"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because use Observer to publish state changes to subscribed listeners. For hard difficulty, this option most directly addresses observer without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-command-5",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles command while preserving correctness?",
    "options": [
      "Use Template Method for fixed flow with overridable steps",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Decorator to add behavior without subclass explosion",
      "Use Observer to publish state changes to subscribed listeners",
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Command objects to encapsulate actions and enable undo"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because use Command objects to encapsulate actions and enable undo. For hard difficulty, this option most directly addresses command without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-decorator-6",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles decorator while preserving correctness?",
    "options": [
      "Use Decorator to add behavior without subclass explosion",
      "Use Template Method for fixed flow with overridable steps",
      "Use Command objects to encapsulate actions and enable undo",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Observer to publish state changes to subscribed listeners",
      "Use State objects to model behavior changes by lifecycle phase"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because use Decorator to add behavior without subclass explosion. For hard difficulty, this option most directly addresses decorator without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-state-7",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles state while preserving correctness?",
    "options": [
      "Use Factory creation to decouple object construction from usage",
      "Use State objects to model behavior changes by lifecycle phase",
      "Use Observer to publish state changes to subscribed listeners",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Repository to isolate persistence concerns from domain logic",
      "Use Command objects to encapsulate actions and enable undo"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because use State objects to model behavior changes by lifecycle phase. For hard difficulty, this option most directly addresses state without relying on weaker side optimizations."
  },
  {
    "id": "hard-design_patterns-template-method-8",
    "difficulty": "hard",
    "prompt": "In a high-scale coding design patterns scenario with failures and concurrency, which option best handles template method while preserving correctness?",
    "options": [
      "Use Command objects to encapsulate actions and enable undo",
      "Use Decorator to add behavior without subclass explosion",
      "Use Template Method for fixed flow with overridable steps",
      "Use Strategy to swap algorithms without changing caller code",
      "Use Observer to publish state changes to subscribed listeners",
      "Use State objects to model behavior changes by lifecycle phase"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because use Template Method for fixed flow with overridable steps. For hard difficulty, this option most directly addresses template method without relying on weaker side optimizations."
  }
]

export default data
