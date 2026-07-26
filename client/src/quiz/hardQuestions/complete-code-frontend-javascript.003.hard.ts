const data = [
  {
    id: 'hard-complete-code-frontend-javascript-003-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Event Loop Microtask Scheduling Case JF3301)\\n\\nSelect the missing line that schedules callback as a microtask.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction scheduleMicrotask(cb: () => void): void {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF3301',
    options: ['queueMicrotask(cb)', 'setTimeout(cb, 0)', 'requestAnimationFrame(() => cb())', 'cb()'],
    correctIndex: 0,
    correctExplanation:
      'queueMicrotask places work in the microtask queue, ahead of next macrotask.',
  },
  {
    id: 'hard-complete-code-frontend-javascript-003-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Shared Worker Request Dedup Case JF3302)\\n\\nSelect the missing line that joins an existing in-flight request instead of duplicating it.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nconst pendingByKey = new Map<string, Promise<string>>()\\n\\nfunction loadKey(key: string, run: () => Promise<string>): Promise<string> {\\n  const existing = pendingByKey.get(key)\\n  if (existing) {\\n    // __BLANK__\\n  }\\n  const created = run().finally(() => pendingByKey.delete(key))\\n  pendingByKey.set(key, created)\\n  return created\\n}\\n```\\n\\nQuestion seed: JF3302',
    options: ['return existing', 'pendingByKey.delete(key)', 'return Promise.resolve(key)', 'throw new Error("duplicate")'],
    correctIndex: 0,
    correctExplanation:
      'Returning the existing promise coalesces concurrent callers onto one request.',
  },
  {
    id: 'hard-complete-code-frontend-javascript-003-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Stable Merge Sort Comparator Case JF3303)\\n\\nSelect the missing line that keeps merge step stable when values tie.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction pickLeftFirst(leftVal: number, rightVal: number): boolean {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF3303',
    options: ['return leftVal <= rightVal', 'return leftVal < rightVal', 'return rightVal < leftVal', 'return leftVal === rightVal'],
    correctIndex: 0,
    correctExplanation:
      'Using <= preserves original order for equal keys, which is required for stability.',
  },
]

export default data
