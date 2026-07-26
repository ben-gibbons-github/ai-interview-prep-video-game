const data = [
  {
    "id": "easy-acid-atomicity-1",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses atomicity?",
    "options": [
      "Reject writes that violate declared data invariants",
      "Commit only after every step succeeds as one unit",
      "Detect lock cycles and abort one transaction quickly",
      "Persist committed writes before acknowledging success"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because commit only after every step succeeds as one unit. For easy difficulty, this option most directly addresses atomicity without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-consistency-2",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses consistency?",
    "options": [
      "Detect lock cycles and abort one transaction quickly",
      "Commit only after every step succeeds as one unit",
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because reject writes that violate declared data invariants. For easy difficulty, this option most directly addresses consistency without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-isolation-3",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses isolation?",
    "options": [
      "Read from a stable snapshot while writes proceed separately",
      "Revert partial updates when an operation fails mid-flight",
      "Use serializable checks for invariants spanning many rows",
      "Prevent concurrent transactions from leaking intermediate state"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because prevent concurrent transactions from leaking intermediate state. For easy difficulty, this option most directly addresses isolation without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-durability-4",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses durability?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because persist committed writes before acknowledging success. For easy difficulty, this option most directly addresses durability without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-rollback-5",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses rollback?",
    "options": [
      "Use serializable checks for invariants spanning many rows",
      "Revert partial updates when an operation fails mid-flight",
      "Record intent in a durable log before data pages change",
      "Read from a stable snapshot while writes proceed separately"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because revert partial updates when an operation fails mid-flight. For easy difficulty, this option most directly addresses rollback without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-write-ahead-log-6",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses write ahead log?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Revert partial updates when an operation fails mid-flight",
      "Record intent in a durable log before data pages change",
      "Retry safely by making transaction effects idempotent"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because record intent in a durable log before data pages change. For easy difficulty, this option most directly addresses write ahead log without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-idempotent-retry-7",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses idempotent retry?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants",
      "Retry safely by making transaction effects idempotent"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because retry safely by making transaction effects idempotent. For easy difficulty, this option most directly addresses idempotent retry without relying on weaker side optimizations."
  },
  {
    "id": "easy-acid-deadlock-handling-8",
    "difficulty": "easy",
    "prompt": "ACID: which choice best addresses deadlock handling?",
    "options": [
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because detect lock cycles and abort one transaction quickly. For easy difficulty, this option most directly addresses deadlock handling without relying on weaker side optimizations."
  }
]

export default data
