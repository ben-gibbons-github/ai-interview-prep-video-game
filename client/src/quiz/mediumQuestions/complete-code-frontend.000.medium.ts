const data = [
  {
    id: 'medium-complete-code-frontend-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend | Reducer Immutable Nested Update Case 9501)\\n\\nChoose the missing line that preserves immutability while updating one todo item.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Todo = { id: string; done: boolean }\ntype State = { todos: Todo[] }\n\nfunction toggleTodo(state: State, id: string): State {\n  return {\n    ...state,\n    todos: state.todos.map((todo) => {\n      if (todo.id !== id) return todo\n      // __BLANK__\n    }),\n  }\n}\n```\\n\\nQuestion seed: 9501',
    options: [
      'return { ...todo, done: !todo.done }',
      'todo.done = !todo.done; return todo',
      'return { id, done: true }',
      'return state as unknown as Todo',
    ],
    correctIndex: 0,
    correctExplanation:
      'Map + object spread updates only the target item while keeping references stable for others.',
  },
  {
    id: 'medium-complete-code-frontend-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend | In-Flight Request Stale Response Guard Case 9502)\\n\\nChoose the missing line that drops stale async responses.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function loadUsers(runId: number, state: { latestRunId: number; users: string[] }, fetcher: () => Promise<string[]>): Promise<void> {\n  state.latestRunId = runId\n  const rows = await fetcher()\n  if (runId !== state.latestRunId) {\n    // __BLANK__\n  }\n  state.users = rows\n}\\n```\\n\\nQuestion seed: 9502',
    options: ['return', 'state.users = []', 'throw new Error("stale")', 'state.latestRunId = runId + 1'],
    correctIndex: 0,
    correctExplanation:
      'If a newer request finished first, older responses must not overwrite current UI state.',
  },
  {
    id: 'medium-complete-code-frontend-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend | Virtual List Visible End Index Case 9503)\\n\\nChoose the missing line that computes the inclusive window correctly.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction visibleRange(scrollTop: number, rowHeight: number, viewportHeight: number, total: number): [number, number] {\n  const start = Math.max(0, Math.floor(scrollTop / rowHeight))\n  const count = Math.ceil(viewportHeight / rowHeight)\n  // __BLANK__\n  return [start, end]\n}\\n```\\n\\nQuestion seed: 9503',
    options: [
      'const end = Math.min(total - 1, start + count - 1)',
      'const end = start + count',
      'const end = total',
      'const end = start',
    ],
    correctIndex: 0,
    correctExplanation:
      'Window end is inclusive, so subtract one and clamp to last index.',
  },
]

export default data
