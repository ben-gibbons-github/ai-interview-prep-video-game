const data = [
  {
    id: 'hard-complete-code-react-00003-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Promise Cache Reuse Case R3301)\\n\\nSelect the missing line that reuses in-flight promise for same key.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nconst pending = new Map<string, Promise<string>>()\\n\\nfunction load(key: string, run: () => Promise<string>): Promise<string> {\\n  const existing = pending.get(key)\\n  if (existing) {\\n    // __BLANK__\\n  }\\n  const created = run().finally(() => pending.delete(key))\\n  pending.set(key, created)\\n  return created\\n}\\n```\\n\\nQuestion seed: R3301',
    options: [
      'return existing',
      'pending.delete(key)',
      'return Promise.resolve("")',
      'throw new Error("duplicate")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Returning existing promise coalesces duplicate concurrent requests.',
  },
  {
    id: 'hard-complete-code-react-00003-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Selector Memo Dependency Case R3302)\\n\\nSelect the missing line so expensive selector recomputes only when inputs change.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\nfunction useVisible(ids: string[], selected: Set<string>): string[] {\\n  return useMemo(() => ids.filter((id) => selected.has(id)), [\\n    // __BLANK__\\n  ])\\n}\\n```\\n\\nQuestion seed: R3302',
    options: [
      'ids, selected',
      'ids',
      'selected',
      '[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'All referenced inputs should be listed to keep memoized data correct.',
  },
  {
    id: 'hard-complete-code-react-00003-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Hydration Mismatch Client Gate Case R3303)\\n\\nSelect the missing line so client-only rendering waits until mounted.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect, useState } from "react"\\n\\nfunction ClientOnly({ children }: { children: JSX.Element }): JSX.Element | null {\\n  const [ready, setReady] = useState(false)\\n  useEffect(() => {\\n    setReady(true)\\n  }, [])\\n  if (!ready) {\\n    // __BLANK__\\n  }\\n  return children\\n}\\n```\\n\\nQuestion seed: R3303',
    options: [
      'return null',
      'return children',
      'throw new Error("not ready")',
      'setReady(true)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Returning null until mount avoids rendering client-only content too early.',
  },
  {
    id: 'hard-complete-code-react-00003-04',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | useLayoutEffect Measurement Order Case R3304)\\n\\nSelect the missing line so DOM measurement runs before browser paint.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useLayoutEffect, useRef } from "react"\\n\\nfunction useWidth(): React.RefObject<HTMLDivElement | null> {\\n  const ref = useRef<HTMLDivElement | null>(null)\\n  useLayoutEffect(() => {\\n    const width = ref.current?.getBoundingClientRect().width ?? 0\\n    void width\\n  }, [])\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3304',
    options: [
      'return ref',
      'return null',
      'return width as unknown as React.RefObject<HTMLDivElement | null>',
      'return { current: null }',
    ],
    correctIndex: 0,
    correctExplanation:
      'Hook should return the same ref used by layout effect for measurement.',
  },
  {
    id: 'hard-complete-code-react-00003-05',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Event Listener Option Symmetry Case R3305)\\n\\nSelect the missing line so removeEventListener matches capture option used during add.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useCaptureClick(handler: () => void): void {\\n  useEffect(() => {\\n    window.addEventListener("click", handler, true)\\n    // __BLANK__\\n  }, [handler])\\n}\\n```\\n\\nQuestion seed: R3305',
    options: [
      'return () => window.removeEventListener("click", handler, true)',
      'return () => window.removeEventListener("click", handler)',
      'window.removeEventListener("click", handler, true)',
      'return handler as unknown as () => void',
    ],
    correctIndex: 0,
    correctExplanation:
      'Listener removal must match type, callback, and options for guaranteed cleanup.',
  },
  {
    id: 'hard-complete-code-react-00003-06',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Stable Updater Callback Case R3306)\\n\\nSelect the missing line so callback does not depend on current count variable.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useCallback, useState } from "react"\\n\\nfunction useIncrement(): [number, () => void] {\\n  const [count, setCount] = useState(0)\\n  const inc = useCallback(() => {\\n    // __BLANK__\\n  }, [])\\n  return [count, inc]\\n}\\n```\\n\\nQuestion seed: R3306',
    options: [
      'setCount((c) => c + 1)',
      'setCount(count + 1)',
      'count += 1',
      'setCount(1)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Functional updater avoids stale closure when callback has empty deps.',
  },
  {
    id: 'hard-complete-code-react-00003-07',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Store Update Fanout Snapshot Case R3307)\\n\\nSelect the missing line so all listeners are notified after state assignment.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nconst listeners = new Set<() => void>()\\nlet value = 0\\n\\nfunction setValue(next: number): void {\\n  value = next\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R3307',
    options: [
      'listeners.forEach((listener) => listener())',
      'listeners.clear()',
      'value += 1',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'External-store subscribers need notification after commits to refresh snapshots.',
  },
  {
    id: 'hard-complete-code-react-00003-08',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Ref Callback Detach Handling Case R3308)\\n\\nSelect the missing line so callback ref handles both attach and detach safely.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction makeRef(assign: (el: HTMLDivElement | null) => void): (el: HTMLDivElement | null) => void {\\n  return (el) => {\\n    // __BLANK__\\n  }\\n}\\n```\\n\\nQuestion seed: R3308',
    options: [
      'assign(el)',
      'if (!el) return',
      'assign(document.body as unknown as HTMLDivElement)',
      'throw new Error("missing")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Callback refs receive null on detach, so both cases must be forwarded.',
  },
  {
    id: 'hard-complete-code-react-00003-09',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Out-of-Order Mutation Guard Case R3309)\\n\\nSelect the missing line so older mutation response cannot overwrite newer revision.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nasync function commit(rev: number, state: { rev: number; text: string }, run: () => Promise<string>): Promise<void> {\\n  state.rev = rev\\n  const text = await run()\\n  if (rev < state.rev) {\\n    // __BLANK__\\n  }\\n  state.text = text\\n}\\n```\\n\\nQuestion seed: R3309',
    options: [
      'return',
      'state.text = ""',
      'throw new Error("stale")',
      'state.rev = rev - 1',
    ],
    correctIndex: 0,
    correctExplanation:
      'Revision checks prevent stale async completions from clobbering fresh state.',
  },
  {
    id: 'hard-complete-code-react-00003-10',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (React | Suspense Cache Populate Ordering Case R3310)\\n\\nSelect the missing line so promise is cached before returning to caller.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nconst cache = new Map<string, Promise<string>>()\\n\\nfunction read(key: string, run: () => Promise<string>): Promise<string> {\\n  const hit = cache.get(key)\\n  if (hit) return hit\\n  const p = run().finally(() => cache.delete(key))\\n  // __BLANK__\\n  return p\\n}\\n```\\n\\nQuestion seed: R3310',
    options: [
      'cache.set(key, p)',
      'cache.clear()',
      'cache.delete(key)',
      'return Promise.resolve("")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Immediate cache insertion ensures same-key calls share one in-flight request.',
  },
]

export default data
