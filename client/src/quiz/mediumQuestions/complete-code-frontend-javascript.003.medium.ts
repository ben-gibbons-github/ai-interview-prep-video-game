const data = [
  {
    id: 'medium-complete-code-frontend-javascript-003-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Promise Timeout Race Case JF2301)\\n\\nChoose the missing line that rejects when request takes too long.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nasync function fetchWithTimeout(run: () => Promise<unknown>, ms: number): Promise<unknown> {\\n  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF2301',
    options: ['return Promise.race([run(), timeout])', 'return run()', 'await timeout; return run()', 'return Promise.all([run(), timeout])'],
    correctIndex: 0,
    correctExplanation:
      'Promise.race resolves or rejects with whichever promise settles first.',
  },
  {
    id: 'medium-complete-code-frontend-javascript-003-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | Immutable Nested Merge Case JF2302)\\n\\nChoose the missing line that updates nested theme color without mutating original state.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype UiState = { settings: { theme: { color: string; contrast: string } } }\\n\\nfunction updateColor(state: UiState, color: string): UiState {\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF2302',
    options: [
      'return { ...state, settings: { ...state.settings, theme: { ...state.settings.theme, color } } }',
      'state.settings.theme.color = color; return state',
      'return { settings: { theme: { color } } } as UiState',
      'return state',
    ],
    correctIndex: 0,
    correctExplanation:
      'Each object layer must be copied so nested update remains immutable end-to-end.',
  },
  {
    id: 'medium-complete-code-frontend-javascript-003-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Frontend JavaScript | IntersectionObserver Unobserve Guard Case JF2303)\\n\\nChoose the missing line that prevents repeated load-more triggers after first intersection.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction onIntersect(entry: IntersectionObserverEntry, observer: IntersectionObserver, el: Element, loadMore: () => void): void {\\n  if (!entry.isIntersecting) return\\n  loadMore()\\n  // __BLANK__\\n}\\n```\\n\\nQuestion seed: JF2303',
    options: ['observer.unobserve(el)', 'observer.observe(el)', 'observer.disconnect(); observer.observe(el)', 'return'],
    correctIndex: 0,
    correctExplanation:
      'Unobserving the sentinel after trigger avoids duplicate pagination requests.',
  },
]

export default data
