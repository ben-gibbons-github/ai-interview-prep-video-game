const data = [
  {
    id: 'medium-complete-code-react-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useMemo Dependency Accuracy Case R2101)\\n\\nChoose the missing line that keeps memoized filtering correct.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\nfunction useVisible(items: string[], query: string): string[] {\\n  return useMemo(() => {\\n    return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))\\n    // __BLANK__\\n  }, [])\\n}\\n```\\n\\nQuestion seed: R2101',
    options: [
      '}, [items, query])',
      '}, [items])',
      '}, [query])',
      '}, [])',
    ],
    correctIndex: 0,
    correctExplanation:
      'Both items and query are read in the memo callback, so both must be dependencies.',
  },
  {
    id: 'medium-complete-code-react-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useCallback Stable Handler Case R2102)\\n\\nChoose the missing line so child memoization sees a stable callback identity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useCallback } from "react"\\n\\nfunction useSave(onSave: (id: string) => void): (id: string) => void {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2102',
    options: [
      'return useCallback((id: string) => onSave(id), [onSave])',
      'return (id: string) => onSave(id)',
      'return useCallback((id: string) => onSave(id), [])',
      'return onSave("x") as unknown as (id: string) => void',
    ],
    correctIndex: 0,
    correctExplanation:
      'useCallback with correct deps preserves function identity until dependencies change.',
  },
  {
    id: 'medium-complete-code-react-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Reducer Immutable Toggle Case R2103)\\n\\nChoose the missing line that toggles one item in reducer state immutably.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Item = { id: string; done: boolean }\\ntype State = { items: Item[] }\\n\\nfunction reduce(state: State, id: string): State {\\n  return {\\n    ...state,\\n    items: state.items.map((item) => {\\n      if (item.id !== id) return item\\n      // __BLANK__\\n    }),\\n  }\\n}\\n```\\n\\nQuestion seed: R2103',
    options: [
      'return { ...item, done: !item.done }',
      'item.done = !item.done; return item',
      'return { id, done: true }',
      'return state as unknown as Item',
    ],
    correctIndex: 0,
    correctExplanation:
      'Object spread on the matching item preserves immutability and referential correctness.',
  },
  {
    id: 'medium-complete-code-react-00001-04',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Context Usage Null Guard Case R2104)\\n\\nChoose the missing line so hook throws when provider is missing.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useContext } from "react"\\n\\nconst AuthContext = {} as unknown as React.Context<{ userId: string } | null>\\n\\nfunction useAuth(): { userId: string } {\\n  const value = useContext(AuthContext)\\n  // __BLANK__\\n  return value\\n}\\n```\\n\\nQuestion seed: R2104',
    options: [
      'if (!value) throw new Error("AuthContext missing provider")',
      'if (value) throw new Error("AuthContext missing provider")',
      'return { userId: "" }',
      'value = null as unknown as { userId: string }',
    ],
    correctIndex: 0,
    correctExplanation:
      'Custom hooks should fail loudly when required context provider is absent.',
  },
  {
    id: 'medium-complete-code-react-00001-05',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Stale Async Response Guard Case R2105)\\n\\nChoose the missing line so older async responses do not overwrite newer results.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nasync function load(runId: number, state: { latestRunId: number; rows: string[] }, fetchRows: () => Promise<string[]>): Promise<void> {\\n  state.latestRunId = runId\\n  const rows = await fetchRows()\\n  if (runId !== state.latestRunId) {\\n    // __BLANK__\\n  }\\n  state.rows = rows\\n}\\n```\\n\\nQuestion seed: R2105',
    options: [
      'return',
      'state.rows = []',
      'throw new Error("stale")',
      'state.latestRunId = runId + 1',
    ],
    correctIndex: 0,
    correctExplanation:
      'Returning early on stale responses preserves correctness under out-of-order completions.',
  },
]

export default data
