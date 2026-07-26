const data = [
  {
    "id": "hard-clean_code-naming-1",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles naming while preserving correctness?",
    "options": [
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Refactor continuously in small safe steps while preserving behavior",
      "Handle failures explicitly instead of hiding exceptions silently",
      "Design boundaries so behavior can be tested without heavy mocks",
      "Limit hidden side effects by making state mutation explicit"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because name modules by intent rather than low-level implementation detail. For hard difficulty, this option most directly addresses naming without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-single-responsibility-2",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles single responsibility while preserving correctness?",
    "options": [
      "Prefer short functions with one clear behavioral purpose",
      "Depend on stable abstractions instead of volatile details",
      "Keep each class focused on one cohesive reason to change",
      "Extract repeated logic into one trusted source of behavior",
      "Limit hidden side effects by making state mutation explicit",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because keep each class focused on one cohesive reason to change. For hard difficulty, this option most directly addresses single responsibility without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-small-functions-3",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles small functions while preserving correctness?",
    "options": [
      "Keep each class focused on one cohesive reason to change",
      "Depend on stable abstractions instead of volatile details",
      "Extract repeated logic into one trusted source of behavior",
      "Prefer short functions with one clear behavioral purpose",
      "Limit hidden side effects by making state mutation explicit",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because prefer short functions with one clear behavioral purpose. For hard difficulty, this option most directly addresses small functions without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-dependency-direction-4",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles dependency direction while preserving correctness?",
    "options": [
      "Keep each class focused on one cohesive reason to change",
      "Prefer short functions with one clear behavioral purpose",
      "Extract repeated logic into one trusted source of behavior",
      "Limit hidden side effects by making state mutation explicit",
      "Depend on stable abstractions instead of volatile details",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because depend on stable abstractions instead of volatile details. For hard difficulty, this option most directly addresses dependency direction without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-explicit-errors-5",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles explicit errors while preserving correctness?",
    "options": [
      "Design boundaries so behavior can be tested without heavy mocks",
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Refactor continuously in small safe steps while preserving behavior",
      "Limit hidden side effects by making state mutation explicit",
      "Handle failures explicitly instead of hiding exceptions silently"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because handle failures explicitly instead of hiding exceptions silently. For hard difficulty, this option most directly addresses explicit errors without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-testability-6",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles testability while preserving correctness?",
    "options": [
      "Design boundaries so behavior can be tested without heavy mocks",
      "Handle failures explicitly instead of hiding exceptions silently",
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Limit hidden side effects by making state mutation explicit",
      "Refactor continuously in small safe steps while preserving behavior"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because design boundaries so behavior can be tested without heavy mocks. For hard difficulty, this option most directly addresses testability without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-duplication-7",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles duplication while preserving correctness?",
    "options": [
      "Depend on stable abstractions instead of volatile details",
      "Extract repeated logic into one trusted source of behavior",
      "Limit hidden side effects by making state mutation explicit",
      "Keep each class focused on one cohesive reason to change",
      "Prefer short functions with one clear behavioral purpose",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because extract repeated logic into one trusted source of behavior. For hard difficulty, this option most directly addresses duplication without relying on weaker side optimizations."
  },
  {
    "id": "hard-clean_code-side-effects-8",
    "difficulty": "hard",
    "prompt": "In a high-scale clean code principles scenario with failures and concurrency, which option best handles side effects while preserving correctness?",
    "options": [
      "Extract repeated logic into one trusted source of behavior",
      "Depend on stable abstractions instead of volatile details",
      "Limit hidden side effects by making state mutation explicit",
      "Keep each class focused on one cohesive reason to change",
      "Prefer short functions with one clear behavioral purpose",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because limit hidden side effects by making state mutation explicit. For hard difficulty, this option most directly addresses side effects without relying on weaker side optimizations."
  }
]

export default data
