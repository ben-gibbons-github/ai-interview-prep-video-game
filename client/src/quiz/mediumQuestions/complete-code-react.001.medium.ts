const data = [
  {
    id: 'medium-complete-code-react-00002-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useMemo Derived Sort Case R2201)\\n\\nChoose the missing line that keeps sorted users memoized by source list.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\ntype User = { id: string; score: number }\\n\\nfunction useSorted(users: User[]): User[] {\\n  return useMemo(() => [...users].sort((a, b) => b.score - a.score), [\\n    // __BLANK__\\n  ])\\n}\\n```\\n\\nQuestion seed: R2201',
    options: [
      'users',
      'users.length',
      'JSON.stringify(users)',
      '[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Dependency should be the referenced object used by the memo callback.',
  },
  {
    id: 'medium-complete-code-react-00002-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useCallback Dependency Closure Case R2202)\\n\\nChoose the missing line so save callback always uses latest draft value.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useCallback } from "react"\\n\\nfunction useSaveDraft(draft: string, commit: (v: string) => void): () => void {\\n  return useCallback(() => commit(draft), [\\n    // __BLANK__\\n  ])\\n}\\n```\\n\\nQuestion seed: R2202',
    options: [
      'commit, draft',
      'commit',
      'draft',
      '[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Both commit and draft are captured values and must be dependencies.',
  },
  {
    id: 'medium-complete-code-react-00002-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Reducer Add Item Case R2203)\\n\\nChoose the missing line that appends payload immutably in reducer.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype State = { items: string[] }\\ntype Action = { type: "add"; payload: string }\\n\\nfunction reducer(state: State, action: Action): State {\\n  if (action.type === "add") {\\n    // __BLANK__\\n  }\\n  return state\\n}\\n```\\n\\nQuestion seed: R2203',
    options: [
      'return { ...state, items: [...state.items, action.payload] }',
      'state.items.push(action.payload); return state',
      'return { items: [action.payload] }',
      'return state as unknown as State',
    ],
    correctIndex: 0,
    correctExplanation:
      'Reducer updates should create new references rather than mutate in place.',
  },
  {
    id: 'medium-complete-code-react-00002-04',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Effect Subscription Cleanup Case R2204)\\n\\nChoose the missing line so event listener is removed during cleanup.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useResize(onResize: () => void): void {\\n  useEffect(() => {\\n    window.addEventListener("resize", onResize)\\n    // __BLANK__\\n  }, [onResize])\\n}\\n```\\n\\nQuestion seed: R2204',
    options: [
      'return () => window.removeEventListener("resize", onResize)',
      'window.removeEventListener("resize", onResize)',
      'return onResize()',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cleanup prevents duplicate listeners and memory leaks on re-renders/unmount.',
  },
  {
    id: 'medium-complete-code-react-00002-05',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Stable List Update By Id Case R2205)\\n\\nChoose the missing line that updates one row while preserving others.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Row = { id: string; title: string }\\n\\nfunction rename(rows: Row[], id: string, title: string): Row[] {\\n  return rows.map((row) => {\\n    if (row.id !== id) return row\\n    // __BLANK__\\n  })\\n}\\n```\\n\\nQuestion seed: R2205',
    options: [
      'return { ...row, title }',
      'row.title = title; return row',
      'return { id, title }',
      'return rows as unknown as Row',
    ],
    correctIndex: 0,
    correctExplanation:
      'Return a copied object for the target row to preserve immutable semantics.',
  },
  {
    id: 'medium-complete-code-react-00002-06',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Async Effect Cancel Flag Case R2206)\\n\\nChoose the missing line so completed request does not update state after unmount.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useLoad(load: () => Promise<void>): void {\\n  useEffect(() => {\\n    let cancelled = false\\n    load().then(() => {\\n      if (cancelled) return\\n    })\\n    // __BLANK__\\n  }, [load])\\n}\\n```\\n\\nQuestion seed: R2206',
    options: [
      'return () => { cancelled = true }',
      'cancelled = true',
      'return load()',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cancellation flags are set in cleanup so stale completions are ignored.',
  },
  {
    id: 'medium-complete-code-react-00002-07',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Context Provider Value Memo Case R2207)\\n\\nChoose the missing line so provider value identity changes only when count changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\nfunction useCounterValue(count: number): { count: number } {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2207',
    options: [
      'return useMemo(() => ({ count }), [count])',
      'return { count }',
      'return useMemo(() => ({ count }), [])',
      'return useMemo(() => count as unknown as { count: number }, [count])',
    ],
    correctIndex: 0,
    correctExplanation:
      'Memoizing object values avoids unnecessary context consumer re-renders.',
  },
  {
    id: 'medium-complete-code-react-00002-08',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Keyed Reset Pattern Case R2208)\\n\\nChoose the missing line so editor state resets when document changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Shell({ docId }: { docId: string }): JSX.Element {\\n  return <Editor\\n    // __BLANK__\\n  />\\n}\\n\\nfunction Editor(): JSX.Element {\\n  return <textarea />\\n}\\n```\\n\\nQuestion seed: R2208',
    options: [
      'key={docId}',
      'id={docId}',
      'name={docId}',
      'data-doc={docId}',
    ],
    correctIndex: 0,
    correctExplanation:
      'Changing key intentionally remounts component to reset internal state.',
  },
  {
    id: 'medium-complete-code-react-00002-09',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Controlled Select State Case R2209)\\n\\nChoose the missing line so selected role is updated from select changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction RolePicker(): JSX.Element {\\n  const [role, setRole] = useState("viewer")\\n  return <select value={role} onChange={(e) => {\\n    // __BLANK__\\n  }}>\\n    <option value="viewer">Viewer</option>\\n    <option value="admin">Admin</option>\\n  </select>\\n}\\n```\\n\\nQuestion seed: R2209',
    options: [
      'setRole(e.target.value)',
      'setRole(role)',
      'setRole("admin")',
      'setRole(String(e))',
    ],
    correctIndex: 0,
    correctExplanation:
      'Controlled selects must mirror the DOM value in React state.',
  },
  {
    id: 'medium-complete-code-react-00002-10',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Derived Filtered Rows Case R2210)\\n\\nChoose the missing line that computes filtered rows without mutating source.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Row = { id: string; active: boolean }\\n\\nfunction visible(rows: Row[]): Row[] {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2210',
    options: [
      'return rows.filter((row) => row.active)',
      'rows.splice(0, rows.length); return rows',
      'return rows.sort(() => 0)',
      'return rows as unknown as Row[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Filter is a non-mutating way to derive active rows.',
  },
]

export default data
