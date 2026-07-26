import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-react-medium-usestate-derived-0001',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Derived State from useState)\n\nYou are building a `<PasswordInput>` component:\n\n```jsx\nfunction PasswordInput({ password }) {\n  const strength = deriveStrength(password)\n  // renders a strength bar\n}\n\nfunction deriveStrength(password) {\n  // your logic here\n}\n```\n\nImplement `solve(props)` where `props = { password: string }`. Return a strength label: `"weak"` if length < 6, `"medium"` if length >= 6 and contains at least one digit, `"strong"` if length >= 10 and contains a digit and a special character (non-alphanumeric).',
    correctExplanation:
      'Derived values from props are computed during render without extra state. This mirrors a strength meter component that reacts to controlled input without side effects.',
    tests: [
      { input: [{ password: 'abc' }], expected: 'weak' },
      { input: [{ password: 'abc123' }], expected: 'medium' },
      { input: [{ password: 'abc123!@#XY' }], expected: 'strong' },
    ],
  },
  {
    id: 'raw-coding-react-medium-reducer-action-0002',
    difficulty: 'medium',
    prompt:
      'React Component Coding (useReducer Action Handler)\n\nYou are implementing a `useReducer` for a shopping cart:\n\n```jsx\nfunction cartReducer(state, action) {\n  switch (action.type) {\n    case "ADD":    // add item or increment qty\n    case "REMOVE": // remove item entirely\n    case "CLEAR":  // empty cart\n  }\n}\n```\n\nImplement `solve(input)` where `input = { state: { items: { id: string, qty: number }[] }, action: { type: string, id?: string } }`. Return the next `items` array after applying the action. ADD adds id with qty 1 or increments existing. REMOVE removes the item with that id. CLEAR returns [].',
    correctExplanation:
      'Reducers handle actions immutably. ADD must check for an existing item and merge rather than duplicate. REMOVE filters by id. CLEAR resets. None mutate the original state.',
    tests: [
      { input: [{ state: { items: [{ id: 'a', qty: 1 }] }, action: { type: 'ADD', id: 'a' } }], expected: [{ id: 'a', qty: 2 }] },
      { input: [{ state: { items: [{ id: 'a', qty: 1 }, { id: 'b', qty: 2 }] }, action: { type: 'REMOVE', id: 'a' } }], expected: [{ id: 'b', qty: 2 }] },
      { input: [{ state: { items: [{ id: 'a', qty: 3 }] }, action: { type: 'CLEAR' } }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-react-medium-context-consumer-merge-0003',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Context Value Merge)\n\nYou have two React contexts consumed by a component:\n\n```jsx\nconst ThemeContext = createContext({ mode: "light", accent: "blue" })\nconst UserContext  = createContext({ role: "guest", name: "" })\n\nfunction Dashboard() {\n  const theme = useContext(ThemeContext)\n  const user  = useContext(UserContext)\n  const config = mergeConfig(theme, user)\n  // renders using config\n}\n```\n\nImplement `solve(input)` where `input = { theme: { mode: string, accent: string }, user: { role: string, name: string } }`. Return merged config: `{ mode, accent, role, isAdmin }` where `isAdmin` is true if `user.role === "admin"`.',
    correctExplanation:
      'Context consumers often project multiple context values into a single derived config object, keeping render logic clean. isAdmin is a derived boolean, not stored state.',
    tests: [
      { input: [{ theme: { mode: 'dark', accent: 'red' }, user: { role: 'admin', name: 'Ada' } }], expected: { mode: 'dark', accent: 'red', role: 'admin', isAdmin: true } },
      { input: [{ theme: { mode: 'light', accent: 'blue' }, user: { role: 'guest', name: '' } }], expected: { mode: 'light', accent: 'blue', role: 'guest', isAdmin: false } },
      { input: [{ theme: { mode: 'light', accent: 'green' }, user: { role: 'editor', name: 'Bo' } }], expected: { mode: 'light', accent: 'green', role: 'editor', isAdmin: false } },
    ],
  },
  {
    id: 'raw-coding-react-medium-ref-callback-0004',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Controlled Input Cursor)\n\nYou are building an auto-formatted phone input. After formatting, you need to restore the cursor position:\n\n```jsx\nfunction formatPhone(raw) { /* formats to (XXX) XXX-XXXX */ }\n\nfunction PhoneInput({ value, cursorPos }) {\n  const formatted = formatPhone(value)\n  const adjustedCursor = computeCursor(value, formatted, cursorPos)\n  // sets inputRef.current.selectionStart = adjustedCursor\n}\n```\n\nImplement `solve(input)` where `input = { rawLength: number, formattedLength: number, cursorPos: number }`. Return adjusted cursor: `cursorPos + (formattedLength - rawLength)`, clamped to [0, formattedLength].',
    correctExplanation:
      'When a formatter adds or removes characters, the cursor must shift by the delta in string length, clamped to the new valid range. This is a common controlled-input cursor management pattern.',
    tests: [
      { input: [{ rawLength: 10, formattedLength: 14, cursorPos: 10 }], expected: 14 },
      { input: [{ rawLength: 10, formattedLength: 14, cursorPos: 3 }], expected: 7 },
      { input: [{ rawLength: 10, formattedLength: 8, cursorPos: 2 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-react-medium-memo-should-skip-0005',
    difficulty: 'medium',
    prompt:
      'React Component Coding (React.memo Comparison)\n\nYou are wrapping a `<Row>` component with `React.memo` and a custom comparison:\n\n```jsx\nconst Row = React.memo(\n  function Row({ id, label, count }) { /* renders */ },\n  (prev, next) => !shouldUpdate(prev, next)\n)\n```\n\nThe comparison should skip re-render when `id` and `label` are equal, regardless of `count` changes.\n\nImplement `solve(input)` where `input = { prev: { id: string, label: string, count: number }, next: { id: string, label: string, count: number } }`. Return `true` if React should skip the re-render (props are equal enough), `false` if it must re-render.',
    correctExplanation:
      'Custom memo comparators return true to bail out (skip render) and false to allow it. Here only id and label equality matters — count is intentionally ignored as a display-only derived value.',
    tests: [
      { input: [{ prev: { id: '1', label: 'Alpha', count: 0 }, next: { id: '1', label: 'Alpha', count: 99 } }], expected: true },
      { input: [{ prev: { id: '1', label: 'Alpha', count: 0 }, next: { id: '1', label: 'Beta', count: 0 } }], expected: false },
      { input: [{ prev: { id: '1', label: 'A', count: 5 }, next: { id: '2', label: 'A', count: 5 } }], expected: false },
    ],
  },
  {
    id: 'raw-coding-react-medium-lazy-initial-state-0006',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Lazy Initial State Computation)\n\nYou have a component that reads initial state from localStorage:\n\n```jsx\nfunction Dashboard({ userId }) {\n  const [prefs, setPrefs] = useState(() => loadPrefs(userId))\n}\n\nfunction loadPrefs(userId) {\n  // your logic\n}\n```\n\nImplement `solve(input)` where `input = { userId: string, store: Record<string, { theme: string, lang: string }> }`. Return the stored prefs for `userId` if they exist, otherwise return `{ theme: "light", lang: "en" }`.',
    correctExplanation:
      'Lazy initializers run once on mount. Providing a function to useState prevents expensive work on every render. This is a localStorage-backed prefs pattern with safe fallback defaults.',
    tests: [
      { input: [{ userId: 'u1', store: { u1: { theme: 'dark', lang: 'fr' } } }], expected: { theme: 'dark', lang: 'fr' } },
      { input: [{ userId: 'u2', store: { u1: { theme: 'dark', lang: 'fr' } } }], expected: { theme: 'light', lang: 'en' } },
      { input: [{ userId: 'u3', store: {} }], expected: { theme: 'light', lang: 'en' } },
    ],
  },
  {
    id: 'raw-coding-react-medium-custom-hook-0007',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Custom Hook Composition)\n\nYou are building a custom hook that combines two pieces of state:\n\n```jsx\nfunction useForm(initialValues) {\n  const [values, setValues] = useState(initialValues)\n  const [touched, setTouched] = useState({})\n  return { values, setValues, touched, setTouched }\n}\n```\n\nImplement `solve(input)` where `input = { initialValues: Record<string, string>, changes: { field: string, value: string }[] }`. Apply each change to `values`, and mark the field in `touched` as true. Return `{ values, touched }`.',
    correctExplanation:
      'Custom hooks encapsulate state and logic reuse. This mirrors form library patterns where tracking touched fields helps show validation errors only on user interactions.',
    tests: [
      { input: [{ initialValues: { email: '', name: '' }, changes: [{ field: 'email', value: 'a@b.com' }] }], expected: { values: { email: 'a@b.com', name: '' }, touched: { email: true } } },
      { input: [{ initialValues: { x: '1' }, changes: [{ field: 'x', value: '2' }, { field: 'x', value: '3' }] }], expected: { values: { x: '3' }, touched: { x: true } } },
    ],
  },
  {
    id: 'raw-coding-react-medium-portal-lifecycle-0008',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Portal Mounting)\n\nYou are using React.createPortal to render outside the component tree:\n\n```jsx\nfunction Modal({ isOpen, children }) {\n  if (!isOpen) return null\n  return createPortal(\n    <div className="modal">{children}</div>,\n    document.body\n  )\n}\n```\n\nImplement `solve(input)` where `input = { isOpen: boolean, portalTarget: "body" | "root" }`. Return `{ mounted: boolean, domTarget: string }`. Portal mounts when `isOpen` is true, targeting the specified element.',
    correctExplanation:
      'createPortal renders a component to a different DOM node. Portals are ideal for modals, tooltips, and overlays that must break out of the CSS stacking context.',
    tests: [
      { input: [{ isOpen: true, portalTarget: 'body' }], expected: { mounted: true, domTarget: 'body' } },
      { input: [{ isOpen: false, portalTarget: 'body' }], expected: { mounted: false, domTarget: 'body' } },
    ],
  },
  {
    id: 'raw-coding-react-medium-effect-vs-layout-0009',
    difficulty: 'medium',
    prompt:
      'React Component Coding (useEffect vs useLayoutEffect)\n\nYou are measuring DOM dimensions after render:\n\n```jsx\nfunction MeasureBox({ trigger }) {\n  const [width, setWidth] = useState(0)\n  useLayoutEffect(() => { // runs synchronously after layout\n    setWidth(document.getElementById("box").offsetWidth)\n  }, [trigger])\n}\n```\n\nImplement `solve(input)` where `input = { hook: "useEffect" | "useLayoutEffect", measureTime: number }`. useLayoutEffect blocks paint until measurement completes (synchronous). useEffect allows paint before measuring. Return `{ rendersBeforeMeasure: number }`.',
    correctExplanation:
      'useLayoutEffect runs synchronously after DOM mutations, blocking paint. useEffect is asynchronous and runs after paint. Use useLayoutEffect for DOM reads that affect the next paint.',
    tests: [
      { input: [{ hook: 'useLayoutEffect', measureTime: 0 }], expected: { rendersBeforeMeasure: 0 } },
      { input: [{ hook: 'useEffect', measureTime: 16 }], expected: { rendersBeforeMeasure: 1 } },
    ],
  },
  {
    id: 'raw-coding-react-medium-forward-ref-callback-0010',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Ref Callback Cleanup)\n\nYou are using a callback ref to track DOM node changes:\n\n```jsx\nfunction Input({ inputRef }) {\n  return <input ref={inputRef} />\n}\n\nfunction Parent() {\n  useEffect(() => {\n    return () => { /* cleanup */ }\n  }, [])\n  return <Input inputRef={node => { /* called on mount and unmount */ }} />\n}\n```\n\nImplement `solve(input)` where `input = { mounted: boolean }`. When mounted, callback is called with the DOM node. On unmount, callback is called with null. Return the number of times the callback runs.',
    correctExplanation:
      'Callback refs are called when the ref changes: on mount (ref = node) and unmount (ref = null). This is useful for cleanup logic tied to DOM node lifecycle.',
    tests: [
      { input: [{ mounted: true }], expected: 1 },
      { input: [{ mounted: false }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-react-medium-batch-state-update-0011',
    difficulty: 'medium',
    prompt:
      'React Component Coding (Batched State Renders)\n\nYou are updating multiple state variables in an event handler:\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  const [label, setLabel] = useState("")\n  function handleClick() {\n    setCount(count + 1)\n    setLabel("updated")\n    // React 18 batches both into one render\n  }\n}\n```\n\nImplement `solve(input)` where `input = { stateUpdates: number }`. In React 18, all state updates in one event handler are batched into a single re-render. Return `{ renderCount: number }`.',
    correctExplanation:
      'React 18 automatic batching combines multiple setState calls in an event handler into one re-render, improving performance. This is different from callbacks or promises, which each trigger a new batch.',
    tests: [
      { input: [{ stateUpdates: 1 }], expected: { renderCount: 1 } },
      { input: [{ stateUpdates: 3 }], expected: { renderCount: 1 } },
      { input: [{ stateUpdates: 5 }], expected: { renderCount: 1 } },
    ],
  },
]

export default data
