const data = [
  {
    "id": "medium-clean_code-naming-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where naming is the main concern. Which option is the strongest approach?",
    "options": [
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Refactor continuously in small safe steps while preserving behavior",
      "Handle failures explicitly instead of hiding exceptions silently",
      "Design boundaries so behavior can be tested without heavy mocks"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because name modules by intent rather than low-level implementation detail. For medium difficulty, this option most directly addresses naming without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-single-responsibility-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where single responsibility is the main concern. Which option is the strongest approach?",
    "options": [
      "Prefer short functions with one clear behavioral purpose",
      "Depend on stable abstractions instead of volatile details",
      "Keep each class focused on one cohesive reason to change",
      "Extract repeated logic into one trusted source of behavior",
      "Limit hidden side effects by making state mutation explicit"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because keep each class focused on one cohesive reason to change. For medium difficulty, this option most directly addresses single responsibility without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-small-functions-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where small functions is the main concern. Which option is the strongest approach?",
    "options": [
      "Keep each class focused on one cohesive reason to change",
      "Depend on stable abstractions instead of volatile details",
      "Extract repeated logic into one trusted source of behavior",
      "Prefer short functions with one clear behavioral purpose",
      "Limit hidden side effects by making state mutation explicit"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because prefer short functions with one clear behavioral purpose. For medium difficulty, this option most directly addresses small functions without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-dependency-direction-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where dependency direction is the main concern. Which option is the strongest approach?",
    "options": [
      "Keep each class focused on one cohesive reason to change",
      "Prefer short functions with one clear behavioral purpose",
      "Extract repeated logic into one trusted source of behavior",
      "Limit hidden side effects by making state mutation explicit",
      "Depend on stable abstractions instead of volatile details"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because depend on stable abstractions instead of volatile details. For medium difficulty, this option most directly addresses dependency direction without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-explicit-errors-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where explicit errors is the main concern. Which option is the strongest approach?",
    "options": [
      "Handle failures explicitly instead of hiding exceptions silently",
      "Design boundaries so behavior can be tested without heavy mocks",
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Refactor continuously in small safe steps while preserving behavior"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because handle failures explicitly instead of hiding exceptions silently. For medium difficulty, this option most directly addresses explicit errors without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-testability-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where testability is the main concern. Which option is the strongest approach?",
    "options": [
      "Handle failures explicitly instead of hiding exceptions silently",
      "Design boundaries so behavior can be tested without heavy mocks",
      "Optimize code for reader comprehension before micro-optimizations",
      "Name modules by intent rather than low-level implementation detail",
      "Limit hidden side effects by making state mutation explicit"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because design boundaries so behavior can be tested without heavy mocks. For medium difficulty, this option most directly addresses testability without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-duplication-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where duplication is the main concern. Which option is the strongest approach?",
    "options": [
      "Depend on stable abstractions instead of volatile details",
      "Limit hidden side effects by making state mutation explicit",
      "Extract repeated logic into one trusted source of behavior",
      "Keep each class focused on one cohesive reason to change",
      "Prefer short functions with one clear behavioral purpose"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because extract repeated logic into one trusted source of behavior. For medium difficulty, this option most directly addresses duplication without relying on weaker side optimizations."
  },
  {
    "id": "medium-clean_code-side-effects-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a clean code principles design where side effects is the main concern. Which option is the strongest approach?",
    "options": [
      "Extract repeated logic into one trusted source of behavior",
      "Depend on stable abstractions instead of volatile details",
      "Keep each class focused on one cohesive reason to change",
      "Limit hidden side effects by making state mutation explicit",
      "Prefer short functions with one clear behavioral purpose"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because limit hidden side effects by making state mutation explicit. For medium difficulty, this option most directly addresses side effects without relying on weaker side optimizations."
  }
]

export default data
