const data = [
  {
    id: 'easy-complete-code-database-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Database | SQL Parameter Placeholder Case 9301)\\n\\nComplete the missing line so the query stays parameterized.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildUserByEmailQuery(): string {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9301',
    options: [
      'return "SELECT id, email FROM users WHERE email = ?"',
      'return "SELECT id, email FROM users WHERE email = " + email',
      'return "SELECT * FROM users"',
      'return "DELETE FROM users"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Use placeholders so user input is bound separately and not string-concatenated into SQL.',
  },
  {
    id: 'easy-complete-code-database-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Database | Transaction Rollback On Error Case 9302)\\n\\nComplete the missing line so failed operations do not partially commit.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function runTransfer(db: { begin: () => Promise<void>; commit: () => Promise<void>; rollback: () => Promise<void> }, work: () => Promise<void>): Promise<void> {\n  await db.begin()\n  try {\n    await work()\n    await db.commit()\n  } catch (error) {\n    // __BLANK__\n    throw error\n  }\n}\\n```\\n\\nQuestion seed: 9302',
    options: [
      'await db.rollback()',
      'await db.commit()',
      'return',
      'throw new Error("ignored")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Rollback restores consistency when any statement in the transaction fails.',
  },
  {
    id: 'easy-complete-code-database-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Database | Upsert Conflict Target Case 9303)\\n\\nComplete the missing line so duplicate email inserts update instead of failing.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildUpsertSql(): string {\n  return [\n    "INSERT INTO users (email, name) VALUES (?, ?)",\n    // __BLANK__\n  ].join(" ")\n}\\n```\\n\\nQuestion seed: 9303',
    options: [
      '"ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name"',
      '"GROUP BY email"',
      '"ORDER BY created_at DESC"',
      '"LIMIT 1"',
    ],
    correctIndex: 0,
    correctExplanation:
      'ON CONFLICT with the unique key enables deterministic upsert behavior.',
  },
]

export default data
