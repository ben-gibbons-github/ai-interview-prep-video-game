const data = [
  {
    "id": "easy-in-clean-code-what-is-the-core-goal-of-meaningful-names-1",
    "difficulty": "easy",
    "prompt": "In Clean Code, what is the core goal of meaningful names?",
    "options": [
      "To communicate intent without needing extra explanation",
      "To encode full implementation details in every variable",
      "To satisfy linter rules even when names are ambiguous",
      "To minimize file size by reducing identifier length"
    ],
    "correctIndex": 0,
    "correctExplanation": "Clear names reduce cognitive load. Readers should infer purpose quickly without decoding abbreviations or reading distant implementation details."
  },
  {
    "id": "easy-what-does-the-single-responsibility-principle-emphasize-2",
    "difficulty": "easy",
    "prompt": "What does the Single Responsibility Principle emphasize?",
    "options": [
      "A module should have one clear reason to change",
      "A package should depend on all sibling packages",
      "A class should contain only one public method always",
      "A service should own every concern in its domain layer"
    ],
    "correctIndex": 0,
    "correctExplanation": "SRP is about cohesion and change vectors. Group behavior that changes together, and split behavior that changes for different reasons."
  },
  {
    "id": "easy-according-to-open-closed-principle-software-entities-should-be-3",
    "difficulty": "easy",
    "prompt": "According to Open/Closed Principle, software entities should be:",
    "options": [
      "Open for extension, closed for direct modification",
      "Closed to abstractions so implementation is explicit",
      "Open only to inheritance and not composition",
      "Open for edits by any team at any time"
    ],
    "correctIndex": 0,
    "correctExplanation": "OCP encourages adding behavior through extensions rather than rewriting stable code paths. This reduces regressions and improves maintainability."
  },
  {
    "id": "easy-what-does-dependency-inversion-principle-recommend-4",
    "difficulty": "easy",
    "prompt": "What does Dependency Inversion Principle recommend?",
    "options": [
      "Depend on abstractions, not concrete implementations",
      "Depend on the newest framework classes everywhere",
      "Depend on static utilities instead of interfaces",
      "Depend on global singletons for easier access"
    ],
    "correctIndex": 0,
    "correctExplanation": "DIP decouples high-level policy from low-level details. Abstractions allow substitutability, testing flexibility, and cleaner architectural boundaries."
  },
  {
    "id": "easy-a-clean-function-should-usually-be-5",
    "difficulty": "easy",
    "prompt": "A clean function should usually be:",
    "options": [
      "Small, focused, and explicit about one behavior",
      "Packed with multiple side effects for convenience",
      "Large enough to avoid function-call overhead",
      "Designed to hide control flow from callers"
    ],
    "correctIndex": 0,
    "correctExplanation": "Focused functions improve readability and testability. Smaller units are easier to reason about, reuse, and refactor safely."
  },
  {
    "id": "easy-why-are-code-reviews-aligned-with-clean-code-principles-6",
    "difficulty": "easy",
    "prompt": "Why are code reviews aligned with Clean Code principles?",
    "options": [
      "They catch readability and design issues early",
      "They guarantee bug-free releases across teams",
      "They remove need for architecture documentation",
      "They replace unit tests for production correctness"
    ],
    "correctIndex": 0,
    "correctExplanation": "Reviews provide feedback loops for design clarity and maintainability, helping teams converge on understandable patterns before complexity compounds."
  }
]

export default data
