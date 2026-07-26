const data = [
  {
    id: 'hard-complete-code-frontend-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend | Optimistic Mutation Rollback Case 9801)\\n\\nSelect the missing line that restores UI state when the server write fails.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function applyOptimistic<T>(current: T, setState: (value: T) => void, optimistic: T, commit: () => Promise<void>): Promise<void> {\n  setState(optimistic)\n  try {\n    await commit()\n  } catch {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 9801',
    options: [
      'setState(current)',
      'setState(optimistic)',
      'return',
      'throw new Error("retry")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Rollback to the previous snapshot keeps client state consistent after failed optimistic writes.',
  },
  {
    id: 'hard-complete-code-frontend-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend | Suspense Resource Cache Promise Reuse Case 9802)\\n\\nSelect the missing line that prevents duplicate fetches for the same key.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nconst inFlight = new Map<string, Promise<unknown>>()\n\nfunction getResource(key: string, fetcher: () => Promise<unknown>): Promise<unknown> {\n  const existing = inFlight.get(key)\n  if (existing) return existing\n  const p = fetcher().finally(() => inFlight.delete(key))\n  // __BLANK__\n  return p\n}\\n```\\n\\nQuestion seed: 9802',
    options: [
      'inFlight.set(key, p)',
      'inFlight.clear()',
      'inFlight.delete(key)',
      'return Promise.resolve(null)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Store promise immediately so concurrent readers share a single request.',
  },
  {
    id: 'hard-complete-code-frontend-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend | List Diff Stable Key Mapping Case 9803)\\n\\nSelect the missing line that preserves stable identity during rerenders.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Row = { id: string; title: string }\n\nfunction toRenderItems(rows: Row[]): Array<{ key: string; title: string }> {\n  return rows.map((row) => ({\n    // __BLANK__\n  }))\n}\\n```\\n\\nQuestion seed: 9803',
    options: [
      'key: row.id, title: row.title',
      'key: String(Math.random()), title: row.title',
      'key: row.title, title: row.title',
      'title: row.title',
    ],
    correctIndex: 0,
    correctExplanation:
      'Stable unique IDs should be used as keys so reconciliation tracks item identity correctly.',
  },
]

export default data
