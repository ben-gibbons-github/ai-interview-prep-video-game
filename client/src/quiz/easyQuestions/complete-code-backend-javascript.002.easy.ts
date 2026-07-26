const data = [
  {
    id: 'easy-complete-code-backend-javascript-002-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Node Env Port Fallback Case JB1201)\\n\\nComplete the missing line so server port defaults safely when env var is absent.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction resolvePort(env: { PORT?: string }): number {\\n  const parsed = Number(env.PORT)\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JB1201',
    options: [
      'return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000',
      'return parsed',
      'return 0',
      'return env.PORT as unknown as number',
    ],
    correctIndex: 0,
    correctExplanation:
      'Guard against NaN/invalid values and use a known default for service startup.',
  },
  {
    id: 'easy-complete-code-backend-javascript-002-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Promise.all Parallel Fetch Case JB1202)\\n\\nComplete the missing line so both async calls run in parallel.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function loadSummary(getUsers: () => Promise<number>, getOrders: () => Promise<number>): Promise<{ users: number; orders: number }> {\\n  // __BLANK__\\n  return { users, orders }\\n}\\n```\\n\\nQuestion seed: JB1202',
    options: [
      'const [users, orders] = await Promise.all([getUsers(), getOrders()])',
      'const users = await getUsers(); const orders = await getOrders()',
      'const users = getUsers() as unknown as number; const orders = getOrders() as unknown as number',
      'const users = 0, orders = 0',
    ],
    correctIndex: 0,
    correctExplanation:
      'Promise.all starts both operations together and awaits both results.',
  },
  {
    id: 'easy-complete-code-backend-javascript-002-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Header Normalization Case JB1203)\\n\\nComplete the missing line so bearer prefix check is case-insensitive.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasBearer(authHeader: string | undefined): boolean {\\n  if (!authHeader) return false\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JB1203',
    options: [
      'return authHeader.toLowerCase().startsWith("bearer ")',
      'return authHeader.startsWith("Bearer")',
      'return authHeader.length > 0',
      'return true',
    ],
    correctIndex: 0,
    correctExplanation:
      'Normalize case before prefix matching to handle client capitalization differences.',
  },
]

export default data
