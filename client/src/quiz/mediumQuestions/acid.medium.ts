const data = [
  {
    "id": "medium-acid-atomicity-1",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where atomicity is the main concern. Which option is the strongest approach?",
    "options": [
      "Reject writes that violate declared data invariants",
      "Commit only after every step succeeds as one unit",
      "Detect lock cycles and abort one transaction quickly",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because commit only after every step succeeds as one unit. For medium difficulty, this option most directly addresses atomicity without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-consistency-2",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where consistency is the main concern. Which option is the strongest approach?",
    "options": [
      "Detect lock cycles and abort one transaction quickly",
      "Commit only after every step succeeds as one unit",
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because reject writes that violate declared data invariants. For medium difficulty, this option most directly addresses consistency without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-isolation-3",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where isolation is the main concern. Which option is the strongest approach?",
    "options": [
      "Read from a stable snapshot while writes proceed separately",
      "Revert partial updates when an operation fails mid-flight",
      "Use serializable checks for invariants spanning many rows",
      "Prevent concurrent transactions from leaking intermediate state",
      "Record intent in a durable log before data pages change"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because prevent concurrent transactions from leaking intermediate state. For medium difficulty, this option most directly addresses isolation without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-durability-4",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where durability is the main concern. Which option is the strongest approach?",
    "options": [
      "Retry safely by making transaction effects idempotent",
      "Detect lock cycles and abort one transaction quickly",
      "Reject writes that violate declared data invariants",
      "Record intent in a durable log before data pages change",
      "Persist committed writes before acknowledging success"
    ],
    "correctIndex": 4,
    "correctExplanation": "This is correct because persist committed writes before acknowledging success. For medium difficulty, this option most directly addresses durability without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-rollback-5",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where rollback is the main concern. Which option is the strongest approach?",
    "options": [
      "Revert partial updates when an operation fails mid-flight",
      "Use serializable checks for invariants spanning many rows",
      "Record intent in a durable log before data pages change",
      "Read from a stable snapshot while writes proceed separately",
      "Persist committed writes before acknowledging success"
    ],
    "correctIndex": 0,
    "correctExplanation": "This is correct because revert partial updates when an operation fails mid-flight. For medium difficulty, this option most directly addresses rollback without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-write-ahead-log-6",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where write ahead log is the main concern. Which option is the strongest approach?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Record intent in a durable log before data pages change",
      "Revert partial updates when an operation fails mid-flight",
      "Retry safely by making transaction effects idempotent",
      "Use serializable checks for invariants spanning many rows"
    ],
    "correctIndex": 1,
    "correctExplanation": "This is correct because record intent in a durable log before data pages change. For medium difficulty, this option most directly addresses write ahead log without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-idempotent-retry-7",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where idempotent retry is the main concern. Which option is the strongest approach?",
    "options": [
      "Persist committed writes before acknowledging success",
      "Detect lock cycles and abort one transaction quickly",
      "Retry safely by making transaction effects idempotent",
      "Reject writes that violate declared data invariants",
      "Record intent in a durable log before data pages change"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is correct because retry safely by making transaction effects idempotent. For medium difficulty, this option most directly addresses idempotent retry without relying on weaker side optimizations."
  },
  {
    "id": "medium-acid-deadlock-handling-8",
    "difficulty": "medium",
    "prompt": "You are reviewing a acid design where deadlock handling is the main concern. Which option is the strongest approach?",
    "options": [
      "Reject writes that violate declared data invariants",
      "Persist committed writes before acknowledging success",
      "Retry safely by making transaction effects idempotent",
      "Detect lock cycles and abort one transaction quickly",
      "Commit only after every step succeeds as one unit"
    ],
    "correctIndex": 3,
    "correctExplanation": "This is correct because detect lock cycles and abort one transaction quickly. For medium difficulty, this option most directly addresses deadlock handling without relying on weaker side optimizations."
  }
]

export default data
