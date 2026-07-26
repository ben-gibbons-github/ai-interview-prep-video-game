const data = [
  {
    id: 'medium-complete-code-database-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Database | Cursor Pagination Predicate Case 9601)\\n\\nChoose the missing line that ensures stable forward pagination.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildCursorQuery(): string {\n  return [\n    "SELECT id, created_at FROM events",\n    "WHERE created_at < ?",\n    // __BLANK__\n  ].join(" ")\n}\\n```\\n\\nQuestion seed: 9601',
    options: [
      '"ORDER BY created_at DESC, id DESC LIMIT ?"',
      '"ORDER BY created_at ASC LIMIT ?"',
      '"GROUP BY created_at"',
      '"OFFSET ?"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cursor pagination needs deterministic ordering and a bounded page size.',
  },
  {
    id: 'medium-complete-code-database-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Database | Read-Modify-Write Lost Update Guard Case 9602)\\n\\nChoose the missing line that avoids lost updates under contention.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildVersionedUpdate(): string {\n  return [\n    "UPDATE account_balance",\n    "SET cents = ?, version = version + 1",\n    // __BLANK__\n  ].join(" ")\n}\\n```\\n\\nQuestion seed: 9602',
    options: [
      '"WHERE account_id = ? AND version = ?"',
      '"WHERE account_id = ?"',
      '"ORDER BY version DESC"',
      '"LIMIT 1"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Matching version in the WHERE clause makes conflicting writes fail instead of overwrite.',
  },
  {
    id: 'medium-complete-code-database-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Database | TTL Cleanup Batch Predicate Case 9603)\\n\\nChoose the missing line that deletes only expired rows in bounded batches.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildTtlDeleteSql(): string {\n  return [\n    "DELETE FROM session_cache",\n    // __BLANK__\n  ].join(" ")\n}\\n```\\n\\nQuestion seed: 9603',
    options: [
      '"WHERE expires_at <= ? ORDER BY expires_at ASC LIMIT ?"',
      '"WHERE expires_at > ?"',
      '"GROUP BY expires_at"',
      '"SET expires_at = NULL"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cleanup should target expired rows only and cap deletion size per run.',
  },
]

export default data
