const data = [
  {
    id: 'medium-complete-code-frontend-framework-001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | React Memo Dependency Guard Case F2101)\\n\\nChoose the missing line that keeps memoized filtering correct.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { useMemo } from "react"\n\nfunction useVisible(items: string[], query: string): string[] {\n  return useMemo(() => {\n    return items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))\n    // __BLANK__\n  }, [])\n}\\n```\\n\\nQuestion seed: F2101',
    options: ['}, [items, query])', '}, [items])', '}, [query])', '}, [])'],
    correctIndex: 0,
    correctExplanation:
      'Both items and query are read in the memo function, so both must be dependencies.',
  },
  {
    id: 'medium-complete-code-frontend-framework-001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | Next.js Server Action FormData Read Case F2102)\\n\\nChoose the missing line so server action extracts and validates email input.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nexport async function createSubscriber(formData: FormData): Promise<{ ok: boolean }> {\n  const emailValue = formData.get("email")\n  if (typeof emailValue !== "string" || emailValue.length === 0) return { ok: false }\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: F2102',
    options: [
      'return { ok: true }',
      'return { ok: emailValue as unknown as boolean }',
      'throw new Error("invalid")',
      'return { ok: false }',
    ],
    correctIndex: 0,
    correctExplanation:
      'After type and emptiness checks pass, action can safely return success.',
  },
  {
    id: 'medium-complete-code-frontend-framework-001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | React Router Protected Route Case F2103)\\n\\nChoose the missing line so unauthenticated users are redirected.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { Navigate } from "react-router-dom"\n\nfunction Protected({ authed, children }: { authed: boolean; children: JSX.Element }): JSX.Element {\n  if (!authed) {\n    // __BLANK__\n  }\n  return children\n}\\n```\\n\\nQuestion seed: F2103',
    options: [
      'return <Navigate to="/login" replace />',
      'return children',
      'return <div>Denied</div>',
      'return <Navigate to="/" /> as unknown as JSX.Element[]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Protected route wrappers should return a Navigate component when access is denied.',
  },
]

export default data
