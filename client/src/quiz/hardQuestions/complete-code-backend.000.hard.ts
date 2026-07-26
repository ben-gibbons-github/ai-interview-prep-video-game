const data = [
  {
    id: 'hard-complete-code-backend-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend | Distributed Idempotency Conditional Write Case 9701)\\n\\nSelect the missing line that preserves correctness under concurrent retries.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction tryInsertIdempotency(recordKey: string, exists: (key: string) => boolean, insert: (key: string) => boolean): boolean {\n  if (exists(recordKey)) return false\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9701',
    options: [
      'return insert(recordKey)',
      'insert(recordKey); return true',
      'return true',
      'return !exists(recordKey)',
    ],
    correctIndex: 0,
    correctExplanation:
      'You need the atomic insert result so race losers fail cleanly even after a stale exists check.',
  },
  {
    id: 'hard-complete-code-backend-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend | Circuit Breaker Half-Open Probe Gate Case 9702)\\n\\nSelect the missing line that allows only one probe request in half-open state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Breaker = { state: "closed" | "open" | "half_open"; probeInFlight: boolean }\n\nfunction mayCall(b: Breaker): boolean {\n  if (b.state === "open") return false\n  if (b.state === "half_open") {\n    if (b.probeInFlight) return false\n    // __BLANK__\n  }\n  return true\n}\\n```\\n\\nQuestion seed: 9702',
    options: [
      'b.probeInFlight = true',
      'b.state = "closed"',
      'b.state = "open"',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'Half-open permits exactly one trial call; mark probe in-flight before returning true.',
  },
  {
    id: 'hard-complete-code-backend-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend | Exactly-Once Consumer Dedup Commit Order Case 9703)\\n\\nSelect the missing line that maintains exactly-once semantics with at-least-once delivery.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction handleMessage(id: string, seen: Set<string>, apply: () => void): void {\n  if (seen.has(id)) return\n  apply()\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9703',
    options: [
      'seen.add(id)',
      'seen.delete(id)',
      'apply()',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Record the message ID after successful apply so replayed deliveries are ignored.',
  },
]

export default data
