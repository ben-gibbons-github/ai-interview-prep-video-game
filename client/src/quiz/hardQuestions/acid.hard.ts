const data = [
  {
    "id": "hard-acid-atomicity-1",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles atomicity while preserving correctness?",
    "options": [
      "Reject writes that violate declared data invariants",
      "Commit only after every step succeeds as one unit",
      "Detect lock cycles and abort one transaction quickly",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Record intent in a durable log before data pages change"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because commit only after every step succeeds as one unit. For hard difficulty, this option most directly addresses atomicity without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-consistency-2",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles consistency while preserving correctness?",
    "options": [
      "Detect lock cycles and abort one transaction quickly",
      "Commit only after every step succeeds as one unit",
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Record intent in a durable log before data pages change"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because reject writes that violate declared data invariants. For hard difficulty, this option most directly addresses consistency without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-isolation-3",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles isolation while preserving correctness?",
    "options": [
      "Read from a stable snapshot while writes proceed separately",
      "Revert partial updates when an operation fails mid-flight",
      "Use serializable checks for invariants spanning many rows",
      "Prevent concurrent transactions from leaking intermediate state",
      "Record intent in a durable log before data pages change",
      "Persist committed writes before acknowledging success"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because prevent concurrent transactions from leaking intermediate state. For hard difficulty, this option most directly addresses isolation without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-durability-4",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles durability while preserving correctness?",
    "options": [
      "Retry safely by making transaction effects idempotent",
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants",
      "Record intent in a durable log before data pages change",
      "Persist committed writes before acknowledging success",
      "Commit only after every step succeeds as one unit"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because persist committed writes before acknowledging success. For hard difficulty, this option most directly addresses durability without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-rollback-5",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles rollback while preserving correctness?",
    "options": [
      "Use serializable checks for invariants spanning many rows",
      "Record intent in a durable log before data pages change",
      "Read from a stable snapshot while writes proceed separately",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Revert partial updates when an operation fails mid-flight"
    ],
    "correctIndex": 5,
    "correctExplanation": "This is correct because revert partial updates when an operation fails mid-flight. For hard difficulty, this option most directly addresses rollback without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-write-ahead-log-6",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles write ahead log while preserving correctness?",
    "options": [
      "Record intent in a durable log before data pages change",
      "Persist committed writes before acknowledging success",
      "Revert partial updates when an operation fails mid-flight",
      "Retry safely by making transaction effects idempotent",
      "Use serializable checks for invariants spanning many rows",
      "Detect lock cycles and abort one transaction quickly"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because record intent in a durable log before data pages change. For hard difficulty, this option most directly addresses write ahead log without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-idempotent-retry-7",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles idempotent retry while preserving correctness?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants",
      "Record intent in a durable log before data pages change",
      "Commit only after every step succeeds as one unit"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because retry safely by making transaction effects idempotent. For hard difficulty, this option most directly addresses idempotent retry without relying on weaker side optimizations."
  },
  {
    "id": "hard-acid-deadlock-handling-8",
    "difficulty": "hard",
    "prompt": "In a high-scale acid scenario with failures and concurrency, which option best handles deadlock handling while preserving correctness?",
    "options": [
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success",
      "Detect lock cycles and abort one transaction quickly",
      "Retry safely by making transaction effects idempotent",
      "Commit only after every step succeeds as one unit",
      "Record intent in a durable log before data pages change"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because detect lock cycles and abort one transaction quickly. For hard difficulty, this option most directly addresses deadlock handling without relying on weaker side optimizations."
  }
]

export default data
