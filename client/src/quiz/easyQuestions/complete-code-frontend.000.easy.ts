const data = [
  {
    id: 'easy-complete-code-frontend-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend | React Immutable State Update Case 9201)\\n\\nComplete the missing line so state is updated without mutating the original object.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction incrementCount(state: { count: number; label: string }): { count: number; label: string } {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9201',
    options: [
      'return { ...state, count: state.count + 1 }',
      'state.count += 1; return state',
      'return { count: 1, label: state.label }',
      'return state',
    ],
    correctIndex: 0,
    correctExplanation:
      'React-friendly updates create a new object and preserve untouched fields.',
  },
  {
    id: 'easy-complete-code-frontend-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend | Debounce Timer Reset Case 9202)\\n\\nComplete the missing line so only the latest call executes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction scheduleSearch(term: string, state: { timer: ReturnType<typeof setTimeout> | null }, run: (q: string) => void): void {\n  if (state.timer) {\n    // __BLANK__\n  }\n  state.timer = setTimeout(() => run(term), 250)\n}\\n```\\n\\nQuestion seed: 9202',
    options: [
      'clearTimeout(state.timer)',
      'setTimeout(() => undefined, 0)',
      'run(term)',
      'state.timer = null',
    ],
    correctIndex: 0,
    correctExplanation:
      'Debounce cancels the previous pending timer before scheduling a new one.',
  },
  {
    id: 'easy-complete-code-frontend-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend | Query Param Merge Case 9203)\\n\\nComplete the missing line so existing params are preserved while updating one key.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction mergeParams(current: Record<string, string>, key: string, value: string): Record<string, string> {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 9203',
    options: [
      'return { ...current, [key]: value }',
      'return { [key]: value }',
      'current[key] = value; return current',
      'return {}',
    ],
    correctIndex: 0,
    correctExplanation:
      'Spread merge keeps the existing query state and overrides only the target key.',
  },
]

export default data
