const data = [
  {
    id: 'hard-complete-code-react-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | useSyncExternalStore Subscribe Cleanup Case R3101)\\n\\nSelect the missing line that unsubscribes correctly from external store updates.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction subscribe(listener: () => void): () => void {\\n  const id = window.setInterval(listener, 1000)\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3101',
    options: [
      'return () => window.clearInterval(id)',
      'window.clearInterval(id); return () => undefined',
      'return listener as unknown as () => void',
      'return () => window.setInterval(listener, 1000)',
    ],
    correctIndex: 0,
    correctExplanation:
      'External subscriptions must return teardown logic to prevent leaks and duplicate listeners.',
  },
  {
    id: 'hard-complete-code-react-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Transition Non-Blocking Update Case R3102)\\n\\nSelect the missing line that marks expensive filter update as a transition.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { startTransition } from "react"\\n\\nfunction applyQuery(nextQuery: string, setQuery: (value: string) => void): void {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3102',
    options: [
      'startTransition(() => setQuery(nextQuery))',
      'setQuery(nextQuery)',
      'queueMicrotask(() => setQuery(nextQuery))',
      'setTimeout(() => setQuery(nextQuery), 0)',
    ],
    correctIndex: 0,
    correctExplanation:
      'startTransition marks updates as interruptible to keep urgent interactions responsive.',
  },
  {
    id: 'hard-complete-code-react-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Suspense Resource Cache Hit Case R3103)\\n\\nSelect the missing line that reuses an in-flight promise for the same key.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nconst pending = new Map<string, Promise<string>>()\\n\\nfunction loadResource(key: string, run: () => Promise<string>): Promise<string> {\\n  const existing = pending.get(key)\\n  if (existing) {\\n    // __BLANK__\\n  }\\n  const created = run().finally(() => pending.delete(key))\\n  pending.set(key, created)\\n  return created\\n}\\n```\\n\\nQuestion seed: R3103',
    options: [
      'return existing',
      'pending.delete(key)',
      'return Promise.resolve("")',
      'throw new Error("duplicate")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Promise reuse prevents duplicate fetches and keeps Suspense cache behavior consistent.',
  },
  {
    id: 'hard-complete-code-react-00001-04',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Memoized Child Props Equality Case R3104)\\n\\nSelect the missing line that avoids re-rendering memoized child when id and status are unchanged.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Item = { id: string; status: string; label: string }\\n\\nfunction areEqual(prev: { item: Item }, next: { item: Item }): boolean {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3104',
    options: [
      'return prev.item.id === next.item.id && prev.item.status === next.item.status',
      'return prev.item === next.item',
      'return prev.item.label === next.item.label',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'Custom memo equality should compare only fields that affect child rendering output.',
  },
  {
    id: 'hard-complete-code-react-00001-05',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Batched Updates Functional Reducer Pattern Case R3105)\\n\\nSelect the missing line that safely applies two increments in one event.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction useDoubleIncrement(): [number, () => void] {\\n  const [count, setCount] = useState(0)\\n  const bump = () => {\\n    // __BLANK__\\n  }\\n  return [count, bump]\\n}\\n```\\n\\nQuestion seed: R3105',
    options: [
      'setCount((c) => c + 1); setCount((c) => c + 1)',
      'setCount(count + 1); setCount(count + 1)',
      'setCount(2)',
      'count += 2',
    ],
    correctIndex: 0,
    correctExplanation:
      'Functional setters compose correctly under batching, while captured values can go stale.',
  },
]

export default data
