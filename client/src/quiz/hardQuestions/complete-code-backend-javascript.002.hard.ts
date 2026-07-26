const data = [
  {
    id: 'hard-complete-code-backend-javascript-002-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | In-Memory Lock Release Finally Case JB3201)\\n\\nSelect the missing line that guarantees lock release after work completes or fails.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function withLock(locks: Set<string>, key: string, run: () => Promise<void>): Promise<void> {\\n  if (locks.has(key)) throw new Error("busy")\\n  locks.add(key)\\n  try {\\n    await run()\\n  } finally {\\n    // __BLANK__\\n  }\\n}\\n```\\n\\nQuestion seed: JB3201',
    options: [
      'locks.delete(key)',
      'locks.clear()',
      'locks.add(key)',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Lock cleanup belongs in finally so it runs on both success and error paths.',
  },
  {
    id: 'hard-complete-code-backend-javascript-002-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Async Generator Backpressure Yield Case JB3202)\\n\\nSelect the missing line that streams rows one-by-one to consumers.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function* streamRows(rows: string[]): AsyncGenerator<string> {\\n  for (const row of rows) {\\n    await Promise.resolve()\\n    // __BLANK__\\n  }\\n}\\n```\\n\\nQuestion seed: JB3202',
    options: [
      'yield row',
      'return row as unknown as never',
      'continue',
      'break',
    ],
    correctIndex: 0,
    correctExplanation:
      'Async generators emit incremental values via yield while preserving backpressure.',
  },
  {
    id: 'hard-complete-code-backend-javascript-002-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Safe JSON Stringify Replacer Case JB3203)\\n\\nSelect the missing line that prevents circular reference crashes while preserving repeated objects.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction safeStringify(value: unknown): string {\\n  const seen = new WeakSet<object>()\\n  return JSON.stringify(value, (_key, current) => {\\n    if (typeof current === "object" && current !== null) {\\n      if (seen.has(current)) return "[Circular]"\\n      // __BLANK__\\n    }\\n    return current\\n  })\\n}\\n```\\n\\nQuestion seed: JB3203',
    options: [
      'seen.add(current)',
      'seen.delete(current)',
      'return null',
      'throw new Error("circular")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Track each visited object before traversing deeper so cycles can be detected.',
  },
]

export default data
