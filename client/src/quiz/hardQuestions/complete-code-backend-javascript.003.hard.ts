const data = [
  {
    id: 'hard-complete-code-backend-javascript-003-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Exponential Jitter Backoff Case JB3301)\\n\\nSelect the missing line that computes decorrelated jitter-style delay floor.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction nextDelay(baseMs: number, attempt: number, rand01: number): number {\\n  const cap = baseMs * 2 ** attempt\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JB3301',
    options: ['return Math.floor(cap * (0.5 + rand01 * 0.5))', 'return cap', 'return baseMs', 'return Math.floor(rand01)'],
    correctIndex: 0,
    correctExplanation:
      'Jitter randomizes retry timing to avoid synchronized retry storms.',
  },
  {
    id: 'hard-complete-code-backend-javascript-003-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Read-Write Lock Reader Gate Case JB3302)\\n\\nSelect the missing line that allows readers only when no writer holds the lock.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype LockState = { readers: number; writer: boolean }\\n\\nfunction tryAcquireRead(state: LockState): boolean {\\n  if (state.writer) return false\\n  // __BLANK__\\n  return true\\n}\\n```\\n\\nQuestion seed: JB3302',
    options: ['state.readers += 1', 'state.writer = true', 'state.readers = 0', 'return false'],
    correctIndex: 0,
    correctExplanation:
      'Reader acquisition increments active reader count when no writer is present.',
  },
  {
    id: 'hard-complete-code-backend-javascript-003-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Backend JavaScript | Deterministic Job Ordering Comparator Case JB3303)\\n\\nSelect the missing line that sorts by priority descending and createdAt ascending for ties.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Job = { priority: number; createdAt: number }\\n\\nfunction sortJobs(jobs: Job[]): Job[] {\\n  return [...jobs].sort((a, b) => {\\n    if (a.priority !== b.priority) return b.priority - a.priority\\n    // __BLANK__\\n  })\\n}\\n```\\n\\nQuestion seed: JB3303',
    options: ['return a.createdAt - b.createdAt', 'return b.createdAt - a.createdAt', 'return 0', 'return a.priority - b.priority'],
    correctIndex: 0,
    correctExplanation:
      'Tie-break by creation time ascending to keep scheduling deterministic and fair.',
  },
]

export default data
