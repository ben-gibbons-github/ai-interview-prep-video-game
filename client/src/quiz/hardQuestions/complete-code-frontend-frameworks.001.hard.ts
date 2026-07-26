const data = [
  {
    id: 'hard-complete-code-frontend-framework-001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | React Concurrent Request Cancellation Case F3101)\\n\\nSelect the missing line that prevents stale fetches from writing state after unmount.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { useEffect } from "react"\\n\\nfunction useUsers(setUsers: (rows: string[]) => void): void {\\n  useEffect(() => {\\n    const controller = new AbortController()\\n    fetch("/api/users", { signal: controller.signal })\\n      .then((res) => res.json())\\n      .then((rows) => setUsers(rows as string[]))\\n      .catch(() => undefined)\\n    // __BLANK__\\n  }, [setUsers])\\n}\\n```\\n\\nQuestion seed: F3101',
    options: [
      'return () => controller.abort()',
      'return () => setUsers([])',
      'controller.abort(); return undefined',
      'return () => fetch("/api/users") as unknown as void',
    ],
    correctIndex: 0,
    correctExplanation:
      'Abort in cleanup to cancel in-flight request and avoid stale completion side effects.',
  },
  {
    id: 'hard-complete-code-frontend-framework-001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | Next.js Cache Revalidation Path Case F3102)\\n\\nSelect the missing line that invalidates stale dashboard data after server mutation.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nimport { revalidatePath } from "next/cache"\\n\\nexport async function updateSettings(): Promise<void> {\\n  await Promise.resolve()\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: F3102',
    options: [
      'revalidatePath("/dashboard")',
      'revalidatePath("dashboard")',
      'revalidatePath("/", "layout") as unknown as void',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Revalidating the affected route path ensures users see fresh server-rendered data.',
  },
  {
    id: 'hard-complete-code-frontend-framework-001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Frontend Framework | Redux Toolkit Immutable Case Reducer Case F3103)\\n\\nSelect the missing line that updates one entity in normalized state safely.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype User = { id: string; name: string }\\ntype State = { byId: Record<string, User> }\\n\\nfunction rename(state: State, payload: { id: string; name: string }): void {\\n  const user = state.byId[payload.id]\\n  if (!user) return\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: F3103',
    options: [
      'user.name = payload.name',
      'state.byId = { [payload.id]: { id: payload.id, name: payload.name } }',
      'state = { byId: {} } as unknown as State',
      'return user as unknown as void',
    ],
    correctIndex: 0,
    correctExplanation:
      'In Redux Toolkit Immer-backed reducers, direct field assignment is the intended update style.',
  },
]

export default data
