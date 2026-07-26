const data = [
  {
    id: 'easy-complete-code-react-00002-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | useState Boolean Toggle Case R1201)\\n\\nComplete the missing line so open toggles between true and false.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction PanelToggle(): JSX.Element {\\n  const [open, setOpen] = useState(false)\\n  return <button onClick={() => {\\n    // __BLANK__\\n  }}>{open ? "Open" : "Closed"}</button>\\n}\\n```\\n\\nQuestion seed: R1201',
    options: [
      'setOpen((prev) => !prev)',
      'setOpen(true)',
      'open = !open',
      'setOpen(Boolean(open))',
    ],
    correctIndex: 0,
    correctExplanation:
      'Functional toggle reads latest state and avoids stale captured values.',
  },
  {
    id: 'easy-complete-code-react-00002-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Derived ClassName Inline Case R1202)\\n\\nComplete the missing line so className includes active modifier.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Tab({ active }: { active: boolean }): JSX.Element {\\n  const base = "tab"\\n  // __BLANK__\\n  return <div className={className}>Overview</div>\\n}\\n```\\n\\nQuestion seed: R1202',
    options: [
      'const className = active ? `${base} ${base}--active` : base',
      'const className = base + active',
      'const className = active',
      'const className = "active"',
    ],
    correctIndex: 0,
    correctExplanation:
      'Conditional concatenation keeps predictable BEM-like class names.',
  },
  {
    id: 'easy-complete-code-react-00002-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Map Render Empty State Case R1203)\\n\\nComplete the missing line so empty arrays show fallback text.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Tags({ tags }: { tags: string[] }): JSX.Element {\\n  // __BLANK__\\n  return <ul>{tags.map((t) => <li key={t}>{t}</li>)}</ul>\\n}\\n```\\n\\nQuestion seed: R1203',
    options: [
      'if (tags.length === 0) return <p>No tags</p>',
      'if (tags.length > 0) return <p>No tags</p>',
      'return <p>No tags</p>',
      'tags = ["No tags"]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Guard clauses make empty-state rendering explicit before mapping.',
  },
  {
    id: 'easy-complete-code-react-00002-04',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Child Prop Callback Case R1204)\\n\\nComplete the missing line so parent receives selected id from child click.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction UserRow({ id, onPick }: { id: string; onPick: (id: string) => void }): JSX.Element {\\n  return <button onClick={() => {\\n    // __BLANK__\\n  }}>Pick</button>\\n}\\n```\\n\\nQuestion seed: R1204',
    options: [
      'onPick(id)',
      'onPick("id")',
      'id = "picked" as unknown as string',
      'return onPick as unknown as void',
    ],
    correctIndex: 0,
    correctExplanation:
      'Forwarding the current row id keeps callback semantics correct.',
  },
  {
    id: 'easy-complete-code-react-00002-05',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | useEffect Document Title Case R1205)\\n\\nComplete the missing line so document title reflects score updates.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction useScoreTitle(score: number): void {\\n  useEffect(() => {\\n    // __BLANK__\\n  }, [score])\\n}\\n```\\n\\nQuestion seed: R1205',
    options: [
      'document.title = `Score: ${score}`',
      'window.alert(score)',
      'return () => score',
      'score += 1',
    ],
    correctIndex: 0,
    correctExplanation:
      'Side effects like document title updates belong inside useEffect.',
  },
  {
    id: 'easy-complete-code-react-00002-06',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Prevent Form Reload Case R1206)\\n\\nComplete the missing line so submit does not trigger full page refresh.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction LoginForm(): JSX.Element {\\n  return <form onSubmit={(e) => {\\n    // __BLANK__\\n  }}>\\n    <button type="submit">Login</button>\\n  </form>\\n}\\n```\\n\\nQuestion seed: R1206',
    options: [
      'e.preventDefault()',
      'e.stopPropagation()',
      'return false as unknown as void',
      'window.location.reload()',
    ],
    correctIndex: 0,
    correctExplanation:
      'preventDefault keeps SPA form handling inside React.',
  },
  {
    id: 'easy-complete-code-react-00002-07',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Numeric Input Parse Case R1207)\\n\\nComplete the missing line so quantity is stored as number state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction QtyField(): JSX.Element {\\n  const [qty, setQty] = useState(0)\\n  return <input value={qty} onChange={(e) => {\\n    // __BLANK__\\n  }} />\\n}\\n```\\n\\nQuestion seed: R1207',
    options: [
      'setQty(Number(e.target.value))',
      'setQty(e.target.value as unknown as number)',
      'setQty(qty + 1)',
      'setQty(parseInt("qty", 10))',
    ],
    correctIndex: 0,
    correctExplanation:
      'DOM input values are strings, so explicit numeric conversion is required.',
  },
  {
    id: 'easy-complete-code-react-00002-08',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Component Props Default Case R1208)\\n\\nComplete the missing line so label falls back to default text.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Badge({ label }: { label?: string }): JSX.Element {\\n  // __BLANK__\\n  return <span>{safeLabel}</span>\\n}\\n```\\n\\nQuestion seed: R1208',
    options: [
      'const safeLabel = label ?? "New"',
      'const safeLabel = label && "New"',
      'const safeLabel = undefined as unknown as string',
      'const safeLabel = String()',
    ],
    correctIndex: 0,
    correctExplanation:
      'Nullish coalescing preserves provided labels while filling missing values.',
  },
  {
    id: 'easy-complete-code-react-00002-09',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Loading Button Disable Case R1209)\\n\\nComplete the missing line so users cannot click while loading.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction SaveButton({ loading }: { loading: boolean }): JSX.Element {\\n  return <button\\n    // __BLANK__\\n  >Save</button>\\n}\\n```\\n\\nQuestion seed: R1209',
    options: [
      'disabled={loading}',
      'hidden={loading}',
      'aria-live={loading}',
      'id={String(loading)}',
    ],
    correctIndex: 0,
    correctExplanation:
      'disabled prevents duplicate submits from repeated clicks.',
  },
  {
    id: 'easy-complete-code-react-00002-10',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Conditional Element Render Case R1210)\\n\\nComplete the missing line so warning banner appears only when hasError is true.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Warning({ hasError }: { hasError: boolean }): JSX.Element {\\n  return <div>\\n    // __BLANK__\\n  </div>\\n}\\n```\\n\\nQuestion seed: R1210',
    options: [
      '{hasError && <p>Something went wrong</p>}',
      '{hasError || <p>Something went wrong</p>}',
      '{!hasError && <p>Something went wrong</p>}',
      '<p>Something went wrong</p>',
    ],
    correctIndex: 0,
    correctExplanation:
      'Logical-and rendering is the idiomatic pattern for optional JSX blocks.',
  },
]

export default data
