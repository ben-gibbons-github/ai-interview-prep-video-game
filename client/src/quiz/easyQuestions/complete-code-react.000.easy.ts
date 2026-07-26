const data = [
  {
    id: 'easy-complete-code-react-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Functional State Increment Case R1101)\\n\\nComplete the missing line so count increments based on latest state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction CounterButton(): JSX.Element {\\n  const [count, setCount] = useState(0)\\n  return <button onClick={() => {\\n    // __BLANK__\\n  }}>{count}</button>\\n}\\n```\\n\\nQuestion seed: R1101',
    options: [
      'setCount((prev) => prev + 1)',
      'setCount(count + 1); setCount(count + 1)',
      'count += 1',
      'setCount(1)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Functional updates avoid stale closure issues when updates are batched.',
  },
  {
    id: 'easy-complete-code-react-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | useEffect Cleanup Timer Case R1102)\\n\\nComplete the missing line so interval is cleared on unmount.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useEffect } from "react"\\n\\nfunction usePulse(tick: () => void): void {\\n  useEffect(() => {\\n    const id = window.setInterval(tick, 500)\\n    // __BLANK__\\n  }, [tick])\\n}\\n```\\n\\nQuestion seed: R1102',
    options: [
      'return () => window.clearInterval(id)',
      'window.clearInterval(id)',
      'return tick()',
      'return undefined',
    ],
    correctIndex: 0,
    correctExplanation:
      'Effects should return cleanup callbacks for timers and subscriptions.',
  },
  {
    id: 'easy-complete-code-react-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | List Render Stable Key Case R1103)\\n\\nComplete the missing line so list items use stable keys.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\ntype Todo = { id: string; text: string }\\n\\nfunction TodoList({ todos }: { todos: Todo[] }): JSX.Element {\\n  return <ul>{todos.map((todo) => (\\n    // __BLANK__\\n  ))}</ul>\\n}\\n```\\n\\nQuestion seed: R1103',
    options: [
      '<li key={todo.id}>{todo.text}</li>',
      '<li key={Math.random()}>{todo.text}</li>',
      '<li>{todo.text}</li>',
      '<li key={todo.text}>{todo.text}</li>',
    ],
    correctIndex: 0,
    correctExplanation:
      'Stable unique identifiers prevent unnecessary remounts during reconciliation.',
  },
  {
    id: 'easy-complete-code-react-00001-04',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Controlled Input Bind Case R1104)\\n\\nComplete the missing line so input updates state from the change event.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nimport { useState } from "react"\\n\\nfunction NameField(): JSX.Element {\\n  const [name, setName] = useState("")\\n  return <input value={name} onChange={(e) => {\\n    // __BLANK__\\n  }} />\\n}\\n```\\n\\nQuestion seed: R1104',
    options: [
      'setName(e.target.value)',
      'setName(name)',
      'name = e.target.value as unknown as string',
      'setName(String(e))',
    ],
    correctIndex: 0,
    correctExplanation:
      'Controlled inputs mirror DOM value into component state on every change.',
  },
  {
    id: 'easy-complete-code-react-00001-05',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (React | Conditional Rendering Guard Case R1105)\\n\\nComplete the missing line so loading UI appears while data is unavailable.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```tsx\\nfunction UserCard({ user }: { user: { name: string } | null }): JSX.Element {\\n  // __BLANK__\\n  return <div>{user.name}</div>\\n}\\n```\\n\\nQuestion seed: R1105',
    options: [
      'if (!user) return <div>Loading...</div>',
      'if (user) return <div>Loading...</div>',
      'user = { name: "" } as unknown as { name: string }',
      'return <div>Loading...</div>',
    ],
    correctIndex: 0,
    correctExplanation:
      'Null guards prevent runtime access errors and provide expected loading fallback.',
  },
]

export default data
