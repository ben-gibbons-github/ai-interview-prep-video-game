const data = [
  {
    id: 'easy-complete-code-backend-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend | Express Auth Middleware Case 9101)\\n\\nComplete the missing line so the request is rejected when no API key is provided.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction requireApiKey(req: { headers: Record<string, string | undefined> }, res: { status: (n: number) => { json: (x: unknown) => void } }, next: () => void): void {\n  const apiKey = req.headers["x-api-key"]\n  if (!apiKey) {\n    // __BLANK__\n  }\n  next()\n}\\n```\\n\\nQuestion seed: 9101',
    options: [
      'return res.status(401).json({ error: "missing_api_key" })',
      'res.status(200).json({ ok: true })',
      'next()',
      'apiKey = "test" as unknown as string',
    ],
    correctIndex: 0,
    correctExplanation:
      'Middleware should short-circuit unauthorized requests before calling next().',
  },
  {
    id: 'easy-complete-code-backend-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend | Pagination Slice Bounds Case 9102)\\n\\nComplete the missing line so pagination starts at the right offset.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction paginate<T>(rows: T[], page: number, pageSize: number): T[] {\n  const safePage = Math.max(1, page)\n  const start = (safePage - 1) * pageSize\n  // __BLANK__\n  return rows.slice(start, end)\n}\\n```\\n\\nQuestion seed: 9102',
    options: [
      'const end = start + pageSize',
      'const end = pageSize',
      'const end = rows.length - pageSize',
      'const end = safePage + pageSize',
    ],
    correctIndex: 0,
    correctExplanation:
      'End should be one page-size ahead of start so each page has at most pageSize items.',
  },
  {
    id: 'easy-complete-code-backend-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend | Idempotency Cache Hit Case 9103)\\n\\nComplete the missing line so duplicate requests return cached responses.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction handleWithIdempotency(key: string, cache: Map<string, { status: number; body: unknown }>): { status: number; body: unknown } | null {\n  if (cache.has(key)) {\n    // __BLANK__\n  }\n  return null\n}\\n```\\n\\nQuestion seed: 9103',
    options: [
      'return cache.get(key) ?? null',
      'cache.set(key, { status: 200, body: {} })',
      'return { status: 500, body: null }',
      'cache.clear()',
    ],
    correctIndex: 0,
    correctExplanation:
      'Idempotency should replay the original stored response when the key already exists.',
  },
]

export default data
