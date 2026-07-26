const data = [
  {
    id: 'easy-complete-code-frontend-framework-001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | React useEffect Cleanup Case F1101)\\n\\nComplete the missing line so the interval is cleaned up on unmount.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { useEffect } from "react"\n\nfunction useTicker(tick: () => void): void {\n  useEffect(() => {\n    const id = setInterval(tick, 1000)\n    // __BLANK__\n  }, [tick])\n}\\n```\\n\\nQuestion seed: F1101',
    options: [
      'return () => clearInterval(id)',
      'clearInterval(id)',
      'return tick()',
      'setInterval(tick, 1000)',
    ],
    correctIndex: 0,
    correctExplanation:
      'React effects should return a cleanup function to avoid leaked timers.',
  },
  {
    id: 'easy-complete-code-frontend-framework-001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | Next.js Route Param Read Case F1102)\\n\\nComplete the missing line to read a dynamic route segment in App Router.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { useParams } from "next/navigation"\n\nfunction ProfileHeader(): string {\n  const params = useParams<{ userId: string }>()\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: F1102',
    options: [
      'return `Profile ${params.userId}`',
      'return `Profile ${params.id}`',
      'return "Profile"',
      'params.userId = "x"; return params.userId',
    ],
    correctIndex: 0,
    correctExplanation:
      'The dynamic segment key should match the route param name userId.',
  },
  {
    id: 'easy-complete-code-frontend-framework-001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | React State Setter Callback Case F1103)\\n\\nComplete the missing line so increments are based on latest state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { useState } from "react"\n\nfunction CounterButton(): { onClick: () => void; count: number } {\n  const [count, setCount] = useState(0)\n  return {\n    count,\n    onClick: () => {\n      // __BLANK__\n    },\n  }\n}\\n```\\n\\nQuestion seed: F1103',
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
]

export default data
