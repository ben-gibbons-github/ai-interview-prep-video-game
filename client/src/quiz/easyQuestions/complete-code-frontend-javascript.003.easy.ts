const data = [
  {
    id: 'easy-complete-code-frontend-javascript-003-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Safe Query Selector Null Guard Case JF1301)\\n\\nComplete the missing line so missing elements do not crash click binding.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction wireSubmit(root: Document): boolean {\\n  const button = root.querySelector("#submit") as HTMLButtonElement | null\\n  if (!button) {\\n    // __BLANK__\\n  }\\n  button.addEventListener("click", () => undefined)\\n  return true\\n}\\n```\\n\\nQuestion seed: JF1301',
    options: ['return false', 'return true', 'throw new Error("missing")', 'button = null as unknown as HTMLButtonElement'],
    correctIndex: 0,
    correctExplanation:
      'Return early when selector fails so the code never dereferences a null element.',
  },
  {
    id: 'easy-complete-code-frontend-javascript-003-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | URLSearchParams Read Case JF1302)\\n\\nComplete the missing line so query parameter value is extracted safely.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction getTab(search: string): string {\\n  const params = new URLSearchParams(search)\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF1302',
    options: ['return params.get("tab") ?? "overview"', 'return params.toString()', 'return "tab"', 'return String(params.has("tab"))'],
    correctIndex: 0,
    correctExplanation:
      'Use get for a specific key and provide a default when the key is missing.',
  },
  {
    id: 'easy-complete-code-frontend-javascript-003-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Array Sort Numeric Compare Case JF1303)\\n\\nComplete the missing line so numbers sort ascending numerically, not lexicographically.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction sortScores(values: number[]): number[] {\\n  const out = [...values]\\n  // __BLANK__\\n  return out\\n}\\n```\\n\\nQuestion seed: JF1303',
    options: ['out.sort((a, b) => a - b)', 'out.sort()', 'out.reverse()', 'out.sort((a, b) => (a > b ? -1 : 1))'],
    correctIndex: 0,
    correctExplanation:
      'JavaScript default sort is string-based; numeric sort needs a comparator.',
  },
]

export default data
