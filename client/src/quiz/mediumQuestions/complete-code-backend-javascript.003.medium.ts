const data = [
  {
    id: 'medium-complete-code-backend-javascript-003-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Concurrent Batch Worker Pool Step Case JB2301)\\n\\nChoose the missing line that starts at most workerCount tasks at a time.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function runPool<T>(items: T[], workerCount: number, run: (item: T) => Promise<void>): Promise<void> {\\n  let index = 0\\n  async function worker(): Promise<void> {\\n    while (index < items.length) {\\n      const current = index\\n      // __BLANK__\\n      await run(items[current])\\n    }\\n  }\\n  await Promise.all(Array.from({ length: workerCount }, () => worker()))\\n}\\n```\\n\\nQuestion seed: JB2301',
    options: ['index += 1', 'index = current', 'index -= 1', 'return'],
    correctIndex: 0,
    correctExplanation:
      'Each worker must claim the next index before awaiting so work items are not duplicated.',
  },
  {
    id: 'medium-complete-code-backend-javascript-003-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Idempotency In-Flight Marker Case JB2302)\\n\\nChoose the missing line that marks key as running before async execution begins.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function executeOnce(key: string, inFlight: Set<string>, run: () => Promise<void>): Promise<boolean> {\\n  if (inFlight.has(key)) return false\\n  // __BLANK__\\n  try {\\n    await run()\\n    return true\\n  } finally {\\n    inFlight.delete(key)\\n  }\\n}\\n```\\n\\nQuestion seed: JB2302',
    options: ['inFlight.add(key)', 'inFlight.delete(key)', 'await run()', 'return true'],
    correctIndex: 0,
    correctExplanation:
      'Set membership should be established up front so concurrent requests can see active execution.',
  },
  {
    id: 'medium-complete-code-backend-javascript-003-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | LRU Eviction Oldest Key Case JB2303)\\n\\nChoose the missing line that evicts the least-recently-inserted key when capacity exceeded.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction lruSet<K, V>(map: Map<K, V>, key: K, value: V, capacity: number): void {\\n  if (map.has(key)) map.delete(key)\\n  map.set(key, value)\\n  if (map.size > capacity) {\\n    const oldest = map.keys().next().value as K\\n    // __BLANK__\\n  }\\n}\\n```\\n\\nQuestion seed: JB2303',
    options: ['map.delete(oldest)', 'map.clear()', 'map.set(oldest, value)', 'return'],
    correctIndex: 0,
    correctExplanation:
      'Map iteration order preserves insertion recency, so first key is eviction candidate.',
  },
]

export default data
