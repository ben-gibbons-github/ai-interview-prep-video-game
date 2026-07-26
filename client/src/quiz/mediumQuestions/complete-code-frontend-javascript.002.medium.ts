const data = [
  {
    id: 'medium-complete-code-frontend-javascript-002-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Abortable Search Request Case JF2201)\\n\\nChoose the missing line that cancels previous in-flight request before starting a new one.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype SearchState = { controller: AbortController | null }\\n\\nasync function search(q: string, state: SearchState): Promise<void> {\\n  if (state.controller) {\\n    // __BLANK__\\n  }\\n  state.controller = new AbortController()\\n  await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: state.controller.signal })\\n}\\n```\\n\\nQuestion seed: JF2201',
    options: [
      'state.controller.abort()',
      'state.controller = null',
      'await Promise.resolve()',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Aborting the old controller prevents outdated responses from completing.',
  },
  {
    id: 'medium-complete-code-frontend-javascript-002-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Throttle Leading Edge Gate Case JF2202)\\n\\nChoose the missing line that enforces interval-based throttling.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction shouldRun(nowMs: number, state: { lastRunMs: number }, waitMs: number): boolean {\\n  if (nowMs - state.lastRunMs < waitMs) return false\\n  // __BLANK__\\n  return true\\n}\\n```\\n\\nQuestion seed: JF2202',
    options: [
      'state.lastRunMs = nowMs',
      'state.lastRunMs += waitMs',
      'state.lastRunMs = 0',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'When allowed, update lastRun timestamp so subsequent calls are gated correctly.',
  },
  {
    id: 'medium-complete-code-frontend-javascript-002-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | LRU Cache Touch Update Case JF2203)\\n\\nChoose the missing line that refreshes recency for cache hit in Map-based LRU.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction lruGet<K, V>(map: Map<K, V>, key: K): V | undefined {\\n  const value = map.get(key)\\n  if (value === undefined) return undefined\\n  map.delete(key)\\n  // __BLANK__\\n  return value\\n}\\n```\\n\\nQuestion seed: JF2203',
    options: [
      'map.set(key, value)',
      'map.clear()',
      'map.set(key, undefined as unknown as V)',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Delete+set moves the key to most-recent position in insertion-ordered Map.',
  },
]

export default data
