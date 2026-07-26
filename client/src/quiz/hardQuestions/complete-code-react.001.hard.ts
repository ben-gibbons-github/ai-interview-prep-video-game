const data = [
  {
    id: 'hard-complete-code-react-00002-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | useSyncExternalStore Snapshot Consistency Case R3201)\\n\\nSelect the missing line so hook reads current snapshot from store getter.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useSyncExternalStore } from "react"\\n\\nfunction useValue(subscribe: (l: () => void) => () => void, getSnapshot: () => number): number {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3201',
    options: [
      'return useSyncExternalStore(subscribe, getSnapshot)',
      'return useSyncExternalStore(getSnapshot as unknown as (l: () => void) => () => void, subscribe as unknown as () => number)',
      'return getSnapshot()',
      'return 0',
    ],
    correctIndex: 0,
    correctExplanation:
      'useSyncExternalStore requires subscribe function and snapshot getter in that order.',
  },
  {
    id: 'hard-complete-code-react-00002-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Deferred Value Search Input Case R3202)\\n\\nSelect the missing line that delays expensive filtering relative to typing.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useDeferredValue } from "react"\\n\\nfunction useDeferredQuery(query: string): string {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3202',
    options: [
      'return useDeferredValue(query)',
      'return query',
      'return Promise.resolve(query) as unknown as string',
      'return String(query.length)',
    ],
    correctIndex: 0,
    correctExplanation:
      'useDeferredValue keeps urgent input responsive while expensive consumers lag safely.',
  },
  {
    id: 'hard-complete-code-react-00002-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Suspense Resource Throw Promise Case R3203)\\n\\nSelect the missing line so read() suspends while promise is pending.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction readResult(status: "pending" | "success", promise: Promise<string>, value: string): string {\\n  if (status === "pending") {\\n    // __BLANK__\\n  }\\n  return value\\n}\\n```\\n\\nQuestion seed: R3203',
    options: [
      'throw promise',
      'return "loading"',
      'await promise',
      'throw new Error("loading")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Suspense integration relies on throwing a thenable during pending state.',
  },
  {
    id: 'hard-complete-code-react-00002-04',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Request Race Winner Guard Case R3204)\\n\\nSelect the missing line that discards stale response by token mismatch.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nasync function applyLatest(token: number, state: { latest: number; value: string }, fetchValue: () => Promise<string>): Promise<void> {\\n  state.latest = token\\n  const next = await fetchValue()\\n  if (token !== state.latest) {\\n    // __BLANK__\\n  }\\n  state.value = next\\n}\\n```\\n\\nQuestion seed: R3204',
    options: [
      'return',
      'state.value = ""',
      'throw new Error("stale")',
      'state.latest = token + 1',
    ],
    correctIndex: 0,
    correctExplanation:
      'Early return is the standard stale-response guard for concurrent requests.',
  },
  {
    id: 'hard-complete-code-react-00002-05',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Batched Multi-Field Update Case R3205)\\n\\nSelect the missing line so both counters increment safely under batching.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\ntype Counters = { a: number; b: number }\\n\\nfunction useCounters(): [Counters, () => void] {\\n  const [state, setState] = useState<Counters>({ a: 0, b: 0 })\\n  const incBoth = () => {\\n    // __BLANK__\\n  }\\n  return [state, incBoth]\\n}\\n```\\n\\nQuestion seed: R3205',
    options: [
      'setState((prev) => ({ a: prev.a + 1, b: prev.b + 1 }))',
      'setState({ a: state.a + 1, b: state.b + 1 })',
      'state.a += 1; state.b += 1',
      'setState({ a: 1, b: 1 })',
    ],
    correctIndex: 0,
    correctExplanation:
      'Functional object update avoids stale captures and direct mutation bugs.',
  },
  {
    id: 'hard-complete-code-react-00002-06',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Memo Comparator Precision Case R3206)\\n\\nSelect the missing line so memoized row rerenders only when id or selected changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Props = { id: string; selected: boolean; label: string }\\n\\nfunction same(prev: Props, next: Props): boolean {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3206',
    options: [
      'return prev.id === next.id && prev.selected === next.selected',
      'return prev === next',
      'return prev.label === next.label',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'Comparator should include only fields that materially affect render output.',
  },
  {
    id: 'hard-complete-code-react-00002-07',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Transition Wrapping Expensive Set Case R3207)\\n\\nSelect the missing line so list recalculation is scheduled as non-urgent work.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { startTransition } from "react"\\n\\nfunction updateFilter(next: string, setFilter: (v: string) => void): void {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3207',
    options: [
      'startTransition(() => setFilter(next))',
      'setFilter(next)',
      'queueMicrotask(() => setFilter(next))',
      'setTimeout(() => setFilter(next), 0)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Transition marks update priority rather than changing execution timing only.',
  },
  {
    id: 'hard-complete-code-react-00002-08',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | StrictMode Safe Effect Teardown Case R3208)\\n\\nSelect the missing line so interval is always cleared before effect reruns.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useBeat(onBeat: () => void): void {\\n  useEffect(() => {\\n    const id = window.setInterval(onBeat, 1000)\\n    // __BLANK__\\n  }, [onBeat])\\n}\\n```\\n\\nQuestion seed: R3208',
    options: [
      'return () => window.clearInterval(id)',
      'window.clearInterval(id)',
      'return onBeat()',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'StrictMode can mount/unmount effects repeatedly, so cleanup must be correct.',
  },
  {
    id: 'hard-complete-code-react-00002-09',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | External Store Listener Set Case R3209)\\n\\nSelect the missing line so unsubscribe removes exact listener instance.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nconst listeners = new Set<() => void>()\\n\\nfunction subscribe(listener: () => void): () => void {\\n  listeners.add(listener)\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3209',
    options: [
      'return () => { listeners.delete(listener) }',
      'return () => { listeners.clear() }',
      'return listener as unknown as () => void',
      'return () => undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Removing the same function reference preserves other subscribers.',
  },
  {
    id: 'hard-complete-code-react-00002-10',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Optimistic Update Rollback Case R3210)\\n\\nSelect the missing line so failed mutation restores previous value.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nasync function optimisticSave(state: { name: string }, next: string, save: (v: string) => Promise<void>): Promise<void> {\\n  const prev = state.name\\n  state.name = next\\n  try {\\n    await save(next)\\n  } catch {\\n    // __BLANK__\\n  }\\n}\\n```\\n\\nQuestion seed: R3210',
    options: [
      'state.name = prev',
      'state.name = next',
      'throw new Error("rollback")',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Rollback restores UI consistency when optimistic persistence fails.',
  },
]

export default data
