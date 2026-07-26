const data = [
  {
    id: 'easy-complete-code-backend-javascript-003-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | JSON Body Parse Fallback Case JB1301)\\n\\nComplete the missing line so malformed JSON returns empty object fallback.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction parseBody(raw: string): Record<string, unknown> {\\n  try {\\n    // __BLANK__\\n  } catch {\\n    return {}\\n  }\\n}\\n```\\n\\nQuestion seed: JB1301',
    options: ['return JSON.parse(raw) as Record<string, unknown>', 'return raw as unknown as Record<string, unknown>', 'return { raw }', 'throw new Error("bad")'],
    correctIndex: 0,
    correctExplanation:
      'Parsing inside try/catch keeps API handler resilient to invalid request payloads.',
  },
  {
    id: 'easy-complete-code-backend-javascript-003-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Status Code Family Bucket Case JB1302)\\n\\nComplete the missing line so HTTP status maps to its class bucket.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction statusBucket(status: number): number {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JB1302',
    options: ['return Math.floor(status / 100)', 'return status % 100', 'return status / 10', 'return status'],
    correctIndex: 0,
    correctExplanation:
      'Integer division by 100 yields the class: 2xx, 4xx, 5xx, etc.',
  },
  {
    id: 'easy-complete-code-backend-javascript-003-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Map Cache Set-Then-Return Case JB1303)\\n\\nComplete the missing line so computed value is cached before returning.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction getOrCompute(map: Map<string, number>, key: string, compute: () => number): number {\\n  const found = map.get(key)\\n  if (found !== undefined) return found\\n  const value = compute()\\n  // __BLANK__\\n  return value\\n}\\n```\\n\\nQuestion seed: JB1303',
    options: ['map.set(key, value)', 'map.delete(key)', 'compute()', 'return 0'],
    correctIndex: 0,
    correctExplanation:
      'Set cache on miss so repeated calls avoid recomputation.',
  },
]

export default data
