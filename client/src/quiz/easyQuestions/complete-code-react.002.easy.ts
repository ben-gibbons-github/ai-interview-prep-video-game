const data = [
  {
    id: 'easy-complete-code-react-00003-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Array State Append Case R1301)\\n\\nComplete the missing line so a new note is appended immutably.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction Notes(): JSX.Element {\\n  const [notes, setNotes] = useState<string[]>([])\\n  const add = (text: string) => {\\n    // __BLANK__\\n  }\\n  return <div>{notes.length}</div>\\n}\\n```\\n\\nQuestion seed: R1301',
    options: [
      'setNotes((prev) => [...prev, text])',
      'notes.push(text); setNotes(notes)',
      'setNotes([text])',
      'setNotes((prev) => prev)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Array spread creates a new array reference for correct React updates.',
  },
  {
    id: 'easy-complete-code-react-00003-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | useRef DOM Focus Case R1302)\\n\\nComplete the missing line so input receives focus on mount.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect, useRef } from "react"\\n\\nfunction SearchBox(): JSX.Element {\\n  const inputRef = useRef<HTMLInputElement | null>(null)\\n  useEffect(() => {\\n    // __BLANK__\\n  }, [])\\n  return <input ref={inputRef} />\\n}\\n```\\n\\nQuestion seed: R1302',
    options: [
      'inputRef.current?.focus()',
      'inputRef.focus()',
      'document.focus()',
      'return inputRef.current',
    ],
    correctIndex: 0,
    correctExplanation:
      'Refs expose DOM nodes via current, which can be safely optional-chained.',
  },
  {
    id: 'easy-complete-code-react-00003-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Props Destructure Alias Case R1303)\\n\\nComplete the missing line so component uses concise alias for title prop.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Header(props: { title: string }): JSX.Element {\\n  // __BLANK__\\n  return <h1>{text}</h1>\\n}\\n```\\n\\nQuestion seed: R1303',
    options: [
      'const { title: text } = props',
      'const text = props',
      'const text = title',
      'const text = props.text',
    ],
    correctIndex: 0,
    correctExplanation:
      'Destructuring with alias extracts title and renames it to text locally.',
  },
  {
    id: 'easy-complete-code-react-00003-04',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Optional Callback Invoke Case R1304)\\n\\nComplete the missing line so callback is called only when provided.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Retry({ onRetry }: { onRetry?: () => void }): JSX.Element {\\n  return <button onClick={() => {\\n    // __BLANK__\\n  }}>Retry</button>\\n}\\n```\\n\\nQuestion seed: R1304',
    options: [
      'onRetry?.()',
      'onRetry()',
      'return onRetry as unknown as void',
      'onRetry = undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Optional chaining safely invokes optional function props.',
  },
  {
    id: 'easy-complete-code-react-00003-05',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Count Label Pluralization Case R1305)\\n\\nComplete the missing line so item count label is grammatically correct.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction CountLabel({ count }: { count: number }): JSX.Element {\\n  // __BLANK__\\n  return <span>{label}</span>\\n}\\n```\\n\\nQuestion seed: R1305',
    options: [
      'const label = `${count} item${count === 1 ? "" : "s"}`',
      'const label = `${count} items`',
      'const label = "item" + count',
      'const label = String(count === 1)',
    ],
    correctIndex: 0,
    correctExplanation:
      'A simple ternary handles singular versus plural display.',
  },
  {
    id: 'easy-complete-code-react-00003-06',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Event CurrentTarget Value Case R1306)\\n\\nComplete the missing line so textarea value is read from currentTarget.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction Bio(): JSX.Element {\\n  const [bio, setBio] = useState("")\\n  return <textarea value={bio} onChange={(event) => {\\n    // __BLANK__\\n  }} />\\n}\\n```\\n\\nQuestion seed: R1306',
    options: [
      'setBio(event.currentTarget.value)',
      'setBio(event.target as unknown as string)',
      'setBio(String(event))',
      'setBio("bio")',
    ],
    correctIndex: 0,
    correctExplanation:
      'currentTarget is correctly typed for the element receiving the handler.',
  },
  {
    id: 'easy-complete-code-react-00003-07',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Inline Style Number Unit Case R1307)\\n\\nComplete the missing line so box width is driven by numeric prop.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Box({ width }: { width: number }): JSX.Element {\\n  return <div style={{\\n    // __BLANK__\\n  }} />\\n}\\n```\\n\\nQuestion seed: R1307',
    options: [
      'width',
      'width: `${width}px` as unknown as number',
      'size: width',
      'className: width',
    ],
    correctIndex: 0,
    correctExplanation:
      'React inline style accepts numeric width and appends px for unitful properties.',
  },
  {
    id: 'easy-complete-code-react-00003-08',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Simple Memoized Value Case R1308)\\n\\nComplete the missing line so expensive label recomputes only when name changes.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useMemo } from "react"\\n\\nfunction NameBadge({ name }: { name: string }): JSX.Element {\\n  const value = useMemo(() => name.trim().toUpperCase(), [name])\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: R1308',
    options: [
      'return <span>{value}</span>',
      'return value as unknown as JSX.Element',
      'return <span>{name}</span>',
      'return null as unknown as JSX.Element',
    ],
    correctIndex: 0,
    correctExplanation:
      'Render the memoized value to benefit from controlled recomputation.',
  },
  {
    id: 'easy-complete-code-react-00003-09',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Optional Chaining Render Case R1309)\\n\\nComplete the missing line so nested profile data renders safely.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype User = { profile?: { nickname?: string } }\\n\\nfunction Nick({ user }: { user: User }): JSX.Element {\\n  return <p>{\\n    // __BLANK__\\n  }</p>\\n}\\n```\\n\\nQuestion seed: R1309',
    options: [
      'user.profile?.nickname ?? "Anonymous"',
      'user.profile.nickname',
      'user.nickname ?? "Anonymous"',
      'String(user)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Optional chaining plus fallback avoids crashes on missing nested fields.',
  },
  {
    id: 'easy-complete-code-react-00003-10',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Extract List Count Case R1310)\\n\\nComplete the missing line so summary text reflects total todos.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction Summary({ todos }: { todos: { id: string }[] }): JSX.Element {\\n  // __BLANK__\\n  return <p>{text}</p>\\n}\\n```\\n\\nQuestion seed: R1310',
    options: [
      'const text = `Total: ${todos.length}`',
      'const text = todos as unknown as string',
      'const text = "Total"',
      'const text = `${todos}`',
    ],
    correctIndex: 0,
    correctExplanation:
      'Explicitly deriving display text from array length keeps intent clear.',
  },
]

export default data
