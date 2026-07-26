const data = [
  {
    id: 'hard-complete-code-frontend-javascript-002-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Request Coalescing Keyed Promise Cache Case JF3201)\\n\\nSelect the missing line that ensures concurrent calls share a single in-flight promise.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nconst pending = new Map<string, Promise<unknown>>()\\n\\nfunction coalescedFetch(key: string, run: () => Promise<unknown>): Promise<unknown> {\\n  const existing = pending.get(key)\\n  if (existing) return existing\\n  const p = run().finally(() => pending.delete(key))\\n  // __BLANK__\\n  return p\\n}\\n```\\n\\nQuestion seed: JF3201',
    options: [
      'pending.set(key, p)',
      'pending.clear()',
      'pending.delete(key)',
      'return Promise.resolve(null)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Store the promise immediately so other callers reuse it instead of starting duplicates.',
  },
  {
    id: 'hard-complete-code-frontend-javascript-002-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Diff Patch Minimal Update Case JF3202)\\n\\nSelect the missing line that records only changed keys between next and prev snapshots.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildPatch(prev: Record<string, unknown>, next: Record<string, unknown>): Record<string, unknown> {\\n  const patch: Record<string, unknown> = {}\\n  for (const key of Object.keys(next)) {\\n    if (next[key] !== prev[key]) {\\n      // __BLANK__\\n    }\\n  }\\n  return patch\\n}\\n```\\n\\nQuestion seed: JF3202',
    options: [
      'patch[key] = next[key]',
      'patch[key] = prev[key]',
      'delete patch[key]',
      'return patch',
    ],
    correctIndex: 0,
    correctExplanation:
      'Changed fields should carry the new value into the outgoing patch document.',
  },
  {
    id: 'hard-complete-code-frontend-javascript-002-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Priority Task Queue Insert Order Case JF3203)\\n\\nSelect the missing line that keeps tasks sorted by ascending priority.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Task = { id: string; priority: number }\\n\\nfunction enqueue(queue: Task[], task: Task): void {\\n  let i = 0\\n  while (i < queue.length && queue[i].priority <= task.priority) i += 1\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF3203',
    options: [
      'queue.splice(i, 0, task)',
      'queue.push(task)',
      'queue.unshift(task)',
      'queue[i] = task',
    ],
    correctIndex: 0,
    correctExplanation:
      'Insert at computed index so global queue order remains stable and sorted.',
  },
]

export default data
