const data = [
  {
    id: 'medium-complete-code-react-00003-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Debounced Effect Timer Reset Case R2301)\\n\\nChoose the missing line so timeout is cleared when query changes quickly.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useDebouncedSearch(query: string, run: (q: string) => void): void {\\n  useEffect(() => {\\n    const id = window.setTimeout(() => run(query), 250)\\n    // __BLANK__\\n  }, [query, run])\\n}\\n```\\n\\nQuestion seed: R2301',
    options: [
      'return () => window.clearTimeout(id)',
      'window.clearTimeout(id)',
      'return run(query)',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Clearing timeout in cleanup prevents stale debounced invocations.',
  },
  {
    id: 'medium-complete-code-react-00003-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useRef Previous Value Case R2302)\\n\\nChoose the missing line so previous value is stored after render.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect, useRef } from "react"\\n\\nfunction usePrevious(value: string): string | undefined {\\n  const prev = useRef<string | undefined>(undefined)\\n  useEffect(() => {\\n    // __BLANK__\\n  }, [value])\\n  return prev.current\\n}\\n```\\n\\nQuestion seed: R2302',
    options: [
      'prev.current = value',
      'value = prev.current as unknown as string',
      'return value',
      'prev = value as unknown as { current: string | undefined }',
    ],
    correctIndex: 0,
    correctExplanation:
      'Refs persist mutable values across renders without causing re-renders.',
  },
  {
    id: 'medium-complete-code-react-00003-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Imperative Handle Exposure Case R2303)\\n\\nChoose the missing line so parent can call focus method through ref.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { forwardRef, useImperativeHandle, useRef } from "react"\\n\\nconst FancyInput = forwardRef<{ focus: () => void }>((_, ref) => {\\n  const innerRef = useRef<HTMLInputElement | null>(null)\\n  useImperativeHandle(ref, () => ({\\n    // __BLANK__\\n  }))\\n  return <input ref={innerRef} />\\n})\\n```\\n\\nQuestion seed: R2303',
    options: [
      'focus: () => innerRef.current?.focus()',
      'focus: innerRef.current?.focus()',
      'focus: () => document.body.focus()',
      'focus: () => undefined as unknown as void',
    ],
    correctIndex: 0,
    correctExplanation:
      'useImperativeHandle should expose stable methods that operate on inner ref.',
  },
  {
    id: 'medium-complete-code-react-00003-04',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Functional SetState Object Merge Case R2304)\\n\\nChoose the missing line that updates one field while preserving other fields.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\ntype Form = { email: string; name: string }\\n\\nfunction useNameForm(): [Form, (name: string) => void] {\\n  const [form, setForm] = useState<Form>({ email: "", name: "" })\\n  const setName = (name: string) => {\\n    // __BLANK__\\n  }\\n  return [form, setName]\\n}\\n```\\n\\nQuestion seed: R2304',
    options: [
      'setForm((prev) => ({ ...prev, name }))',
      'setForm({ name } as unknown as Form)',
      'form.name = name',
      'setForm((_) => ({ email: "", name }))',
    ],
    correctIndex: 0,
    correctExplanation:
      'Spread previous state to avoid dropping sibling fields in object state.',
  },
  {
    id: 'medium-complete-code-react-00003-05',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Error Boundary Fallback Render Case R2305)\\n\\nChoose the missing line so fallback UI renders when hasError is true.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction BoundaryView({ hasError }: { hasError: boolean }): JSX.Element {\\n  if (hasError) {\\n    // __BLANK__\\n  }\\n  return <div>OK</div>\\n}\\n```\\n\\nQuestion seed: R2305',
    options: [
      'return <div>Something failed</div>',
      'throw new Error("Something failed")',
      'return null as unknown as JSX.Element',
      'hasError = false as unknown as boolean',
    ],
    correctIndex: 0,
    correctExplanation:
      'Fallback rendering is the normal boundary path after catching an error.',
  },
  {
    id: 'medium-complete-code-react-00003-06',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Parallel Promise State Join Case R2306)\\n\\nChoose the missing line so both resources are awaited concurrently.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nasync function loadPage(getUser: () => Promise<string>, getPosts: () => Promise<string[]>): Promise<[string, string[]]> {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2306',
    options: [
      'return Promise.all([getUser(), getPosts()])',
      'return [await getUser(), await getPosts()]',
      'return Promise.resolve(["", []]) as Promise<[string, string[]]>',
      'return getUser() as unknown as Promise<[string, string[]]>',
    ],
    correctIndex: 0,
    correctExplanation:
      'Promise.all executes both requests concurrently and returns both results.',
  },
  {
    id: 'medium-complete-code-react-00003-07',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Memoized Child Prop Object Case R2307)\\n\\nChoose the missing line so config object identity stays stable for memoized child.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\nfunction useConfig(pageSize: number): { pageSize: number } {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2307',
    options: [
      'return useMemo(() => ({ pageSize }), [pageSize])',
      'return { pageSize }',
      'return useMemo(() => ({ pageSize }), [])',
      'return pageSize as unknown as { pageSize: number }',
    ],
    correctIndex: 0,
    correctExplanation:
      'Memoized object props help prevent avoidable memoized-child re-renders.',
  },
  {
    id: 'medium-complete-code-react-00003-08',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Derived Boolean From Array Case R2308)\\n\\nChoose the missing line so submit enablement depends on validation errors.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction canSubmit(errors: string[]): boolean {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2308',
    options: [
      'return errors.length === 0',
      'return errors.length > 0',
      'return Boolean(errors)',
      'return true',
    ],
    correctIndex: 0,
    correctExplanation:
      'Submitting should be enabled only when there are no validation errors.',
  },
  {
    id: 'medium-complete-code-react-00003-09',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | Array Item Remove By Id Case R2309)\\n\\nChoose the missing line that removes one item immutably from list state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Item = { id: string }\\n\\nfunction remove(items: Item[], id: string): Item[] {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R2309',
    options: [
      'return items.filter((item) => item.id !== id)',
      'items.pop(); return items',
      'return []',
      'return items.slice(1)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Filter returns a new array excluding the target item.',
  },
  {
    id: 'medium-complete-code-react-00003-10',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (React | useEffect Fetch Dependency Case R2310)\\n\\nChoose the missing line so effect reruns when endpoint changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useEndpoint(endpoint: string, load: (url: string) => void): void {\\n  useEffect(() => {\\n    load(endpoint)\\n  }, [\\n    // __BLANK__\\n  ])\\n}\\n```\\n\\nQuestion seed: R2310',
    options: [
      'endpoint, load',
      'endpoint',
      'load',
      '[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Dependencies should include every value read from effect scope.',
  },
]

export default data
