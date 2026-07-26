const data = [
  {
    id: 'hard-complete-code-database-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Database | Serializable Retry Loop Case 9901)\\n\\nSelect the missing line that correctly retries serialization failures only.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction shouldRetry(errorCode: string): boolean {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9901',
    options: [
      'return errorCode === "40001"',
      'return errorCode !== "40001"',
      'return true',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'SQLSTATE 40001 indicates serialization failure and is the classic retryable case.',
  },
  {
    id: 'hard-complete-code-database-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Database | Keyset Pagination Tie-Break Predicate Case 9902)\\n\\nSelect the missing line that avoids skipping or duplicating rows with equal timestamps.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildKeysetPredicate(): string {\n  return [\n    "WHERE (created_at < ?)",\n    // __BLANK__\n  ].join(" ")\n}\\n```\\n\\nQuestion seed: 9902',
    options: [
      '"OR (created_at = ? AND id < ?)"',
      '"OR (created_at = ? AND id > ?)"',
      '"OR id = ?"',
      '"AND created_at > ?"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Use the same sort direction in tie-breaks to produce stable, gap-free keyset pagination.',
  },
  {
    id: 'hard-complete-code-database-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Database | Write-Ahead Outbox Atomic Transaction Case 9903)\\n\\nSelect the missing line that guarantees state change and event publish intent are atomic.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function persistOrderAndOutbox(tx: { exec: (sql: string, args: unknown[]) => Promise<void> }, orderId: string, payload: string): Promise<void> {\n  await tx.exec("INSERT INTO orders(id) VALUES(?)", [orderId])\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9903',
    options: [
      'await tx.exec("INSERT INTO outbox(order_id, payload) VALUES(?, ?)", [orderId, payload])',
      'await tx.exec("DELETE FROM orders WHERE id = ?", [orderId])',
      'await tx.exec("SELECT * FROM outbox", [])',
      'await tx.exec("COMMIT", [])',
    ],
    correctIndex: 0,
    correctExplanation:
      'Outbox row must be written in the same transaction as the domain write for reliable publish.',
  },
]

export default data
