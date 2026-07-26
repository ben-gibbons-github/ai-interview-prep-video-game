const data = [
  {
    id: 'medium-complete-code-backend-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend | Rate Limit Sliding Window Trim Case 9401)\\n\\nChoose the missing line that keeps rate-limiting accurate and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction allow(nowMs: number, hits: number[], windowMs: number, limit: number): boolean {\n  while (hits.length && nowMs - hits[0] >= windowMs) {\n    // __BLANK__\n  }\n  if (hits.length >= limit) return false\n  hits.push(nowMs)\n  return true\n}\\n```\\n\\nQuestion seed: 9401',
    options: ['hits.shift()', 'hits.pop()', 'return false', 'break'],
    correctIndex: 0,
    correctExplanation:
      'Evict oldest timestamps first so the active window only contains recent requests.',
  },
  {
    id: 'medium-complete-code-backend-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend | Outbox Poller Lease Guard Case 9402)\\n\\nChoose the missing line that prevents two workers from claiming the same job.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Row = { id: string; leaseUntil: number }\n\nfunction canClaim(row: Row, nowMs: number): boolean {\n  // __BLANK__\n}\n```\\n\\nQuestion seed: 9402',
    options: [
      'return row.leaseUntil <= nowMs',
      'return row.leaseUntil > nowMs',
      'return true',
      'return row.id.length > 0',
    ],
    correctIndex: 0,
    correctExplanation:
      'A task is claimable only when its lease is expired or unset in the past.',
  },
  {
    id: 'medium-complete-code-backend-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend | Optimistic Version Check Case 9403)\\n\\nChoose the missing line that enforces optimistic concurrency.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction shouldApplyUpdate(currentVersion: number, expectedVersion: number): boolean {\n  // __BLANK__\n}\n```\\n\\nQuestion seed: 9403',
    options: [
      'return currentVersion === expectedVersion',
      'return currentVersion >= expectedVersion',
      'return currentVersion !== expectedVersion',
      'return true',
    ],
    correctIndex: 0,
    correctExplanation:
      'Optimistic writes succeed only when the stored version exactly matches the caller expectation.',
  },
]

export default data
