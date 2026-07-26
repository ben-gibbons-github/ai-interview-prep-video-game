const data = [
  {
    id: 'easy-complete-code-frontend-javascript-002-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | LocalStorage JSON Parse Guard Case JF1201)\\n\\nComplete the missing line so invalid JSON does not crash the app.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction loadSettings(raw: string | null): Record<string, unknown> {\\n  if (!raw) return {}\\n  try {\\n    // __BLANK__\\n  } catch {\\n    return {}\\n  }\\n}\\n```\\n\\nQuestion seed: JF1201',
    options: [
      'return JSON.parse(raw) as Record<string, unknown>',
      'return raw as unknown as Record<string, unknown>',
      'return { raw }',
      'throw new Error("bad")',
    ],
    correctIndex: 0,
    correctExplanation:
      'Use JSON.parse in a try/catch so malformed persisted values fail safely.',
  },
  {
    id: 'easy-complete-code-frontend-javascript-002-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | DOM Event Delegation Match Case JF1202)\\n\\nComplete the missing line so clicks are handled only for matching child buttons.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction bindList(root: HTMLElement, onDelete: (id: string) => void): void {\\n  root.addEventListener("click", (event) => {\\n    const target = event.target as HTMLElement | null\\n    if (!target) return\\n    // __BLANK__\\n    const id = target.getAttribute("data-id")\\n    if (id) onDelete(id)\\n  })\\n}\\n```\\n\\nQuestion seed: JF1202',
    options: [
      'if (!target.matches("button[data-id]")) return',
      'if (target.matches("button[data-id]")) return',
      'target.remove()',
      'event.preventDefault()',
    ],
    correctIndex: 0,
    correctExplanation:
      'Delegation handlers should early-return unless the click target matches the intended selector.',
  },
  {
    id: 'easy-complete-code-frontend-javascript-002-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Fetch Status Check Case JF1203)\\n\\nComplete the missing line so non-2xx HTTP responses throw.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function fetchJson(url: string): Promise<unknown> {\\n  const response = await fetch(url)\\n  if (!response.ok) {\\n    // __BLANK__\\n  }\\n  return response.json()\\n}\\n```\\n\\nQuestion seed: JF1203',
    options: [
      'throw new Error(`HTTP ${response.status}`)',
      'return null',
      'console.error(response.status)',
      'response.json()',
    ],
    correctIndex: 0,
    correctExplanation:
      'Fail fast on non-ok responses so callers can handle errors consistently.',
  },
]

export default data
