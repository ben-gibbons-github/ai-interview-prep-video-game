import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-react-veryhard-virtual-list-0001',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Virtualized List Window)\n\nYou are implementing a virtual list component that renders only visible rows:\n\n```jsx\nfunction VirtualList({ items, rowHeight, containerHeight, scrollTop }) {\n  const { startIndex, endIndex, offsetTop } = computeWindow({\n    items, rowHeight, containerHeight, scrollTop\n  })\n  // render items[startIndex..endIndex] with paddingTop=offsetTop\n}\n```\n\nImplement `solve(input)` where `input = { itemCount: number, rowHeight: number, containerHeight: number, scrollTop: number }`. Return `{ startIndex: number, endIndex: number, offsetTop: number }`. `startIndex = Math.floor(scrollTop / rowHeight)`. `endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + containerHeight) / rowHeight))`. `offsetTop = startIndex * rowHeight`.',
    correctExplanation:
      'Virtual list windowing reduces DOM nodes from O(n) to O(visible). The window is computed from scroll position and item height, with an offset to position the rendered slab correctly in the scroll container.',
    tests: [
      { input: [{ itemCount: 1000, rowHeight: 40, containerHeight: 400, scrollTop: 0 }], expected: { startIndex: 0, endIndex: 10, offsetTop: 0 } },
      { input: [{ itemCount: 1000, rowHeight: 40, containerHeight: 400, scrollTop: 400 }], expected: { startIndex: 10, endIndex: 20, offsetTop: 400 } },
      { input: [{ itemCount: 5, rowHeight: 40, containerHeight: 400, scrollTop: 120 }], expected: { startIndex: 3, endIndex: 4, offsetTop: 120 } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-compound-component-0002',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Compound Component State)\n\nYou are building a compound `<Accordion>` component using context:\n\n```jsx\nconst AccordionContext = createContext()\n\nfunction Accordion({ children }) {\n  const [openId, setOpenId] = useState(null)\n  // context value: { openId, toggle }\n}\n\nfunction AccordionItem({ id }) {\n  const { openId, toggle } = useContext(AccordionContext)\n  const isOpen = openId === id\n  // renders with isOpen\n}\n```\n\nImplement `solve(input)` where `input = { events: { type: "toggle", id: string }[], initialOpenId: string | null }`. Starting from `initialOpenId`, apply each toggle event: if `id === openId`, close it (set null); otherwise open it. Return the final `openId`.',
    correctExplanation:
      'Compound components share state through context. The Accordion toggle is exclusive open/close: clicking an open panel closes it; clicking a closed panel opens it and implicitly closes others.',
    tests: [
      { input: [{ events: [{ type: 'toggle', id: 'a' }], initialOpenId: null }], expected: 'a' },
      { input: [{ events: [{ type: 'toggle', id: 'a' }], initialOpenId: 'a' }], expected: null },
      { input: [{ events: [{ type: 'toggle', id: 'a' }, { type: 'toggle', id: 'b' }], initialOpenId: null }], expected: 'b' },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-render-prop-filter-0003',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Render Prop Data Transform)\n\nYou are using a `<DataFetcher>` render-prop component:\n\n```jsx\n<DataFetcher url="/api/users">\n  {({ data, loading, error }) => {\n    if (loading) return <Spinner />\n    if (error)   return <ErrorMsg />\n    const filtered = data.filter(u => u.active)\n    return <UserList users={filtered} />\n  }}\n</DataFetcher>\n```\n\nImplement `solve(input)` where `input = { state: "loading" | "error" | "success", data: { id: string, active: boolean }[] }`. Return `{ component: "Spinner" | "ErrorMsg" | "UserList", userCount?: number }`. For success, `userCount` is the number of active users.',
    correctExplanation:
      'Render props pass state downward via a function child. The consumer applies transformations (filter) before rendering, making the data component fully reusable. The three-branch guard (loading, error, data) is the canonical async render pattern.',
    tests: [
      { input: [{ state: 'loading', data: [] }], expected: { component: 'Spinner' } },
      { input: [{ state: 'error', data: [] }], expected: { component: 'ErrorMsg' } },
      { input: [{ state: 'success', data: [{ id: 'a', active: true }, { id: 'b', active: false }, { id: 'c', active: true }] }], expected: { component: 'UserList', userCount: 2 } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-suspense-boundary-0004',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Suspense Boundary Fallback)\n\nYou have nested Suspense boundaries:\n\n```jsx\n<Suspense fallback={<AppShell />}>\n  <Suspense fallback={<Spinner />}>\n    <LazyWidget />\n  </Suspense>\n  <EagerContent />\n</Suspense>\n```\n\nImplement `solve(input)` where `input = { widgetStatus: "loading" | "ready", eagerStatus: "loading" | "ready" }`. Return `{ visibleFallback: "AppShell" | "Spinner" | null, visibleContent: ("Widget" | "EagerContent")[] }`. Suspense shows the nearest ancestor fallback when any descendant suspends. `AppShell` shows only when both inner and eager are loading.',
    correctExplanation:
      'Suspense boundary resolution: the inner boundary catches LazyWidget suspense and shows Spinner while EagerContent still renders. Only when EagerContent also suspends does the outer boundary trigger showing AppShell.',
    tests: [
      { input: [{ widgetStatus: 'loading', eagerStatus: 'ready' }], expected: { visibleFallback: 'Spinner', visibleContent: ['EagerContent'] } },
      { input: [{ widgetStatus: 'loading', eagerStatus: 'loading' }], expected: { visibleFallback: 'AppShell', visibleContent: [] } },
      { input: [{ widgetStatus: 'ready', eagerStatus: 'ready' }], expected: { visibleFallback: null, visibleContent: ['Widget', 'EagerContent'] } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-useimperativehandle-0005',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (useImperativeHandle Contract)\n\nYou are building a `<DatePicker>` that exposes an imperative API:\n\n```jsx\nconst DatePicker = forwardRef(function DatePicker({ min, max }, ref) {\n  const [value, setValue] = useState(null)\n\n  useImperativeHandle(ref, () => ({\n    getValue: () => value,\n    reset: () => setValue(null),\n    isValid: () => value !== null && value >= min && value <= max,\n  }))\n})\n```\n\nImplement `solve(input)` where `input = { value: string | null, min: string, max: string, call: "getValue" | "reset" | "isValid" }`. Return the result of calling the method. `getValue` returns value. `reset` returns null. `isValid` returns boolean. Dates compare lexicographically (ISO strings).',
    correctExplanation:
      'useImperativeHandle customizes what a parent can call on a ref. The three exposed methods encapsulate internal state access, mutation, and validation, keeping the component controlled from outside without exposing setState directly.',
    tests: [
      { input: [{ value: '2024-06-15', min: '2024-01-01', max: '2024-12-31', call: 'getValue' }], expected: '2024-06-15' },
      { input: [{ value: '2024-06-15', min: '2024-01-01', max: '2024-12-31', call: 'isValid' }], expected: true },
      { input: [{ value: '2025-01-01', min: '2024-01-01', max: '2024-12-31', call: 'isValid' }], expected: false },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-stale-closure-0006',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Stale Closure Detection)\n\nYou are debugging a component with a stale closure bug:\n\n```jsx\nfunction Timer() {\n  const [count, setCount] = useState(0)\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setCount(count + 1) // BUG: stale closure\n    }, 1000)\n    return () => clearInterval(id)\n  }, []) // empty deps = runs once, captures count=0\n}\n```\n\nImplement `solve(input)` where `input = { initialCount: number, ticks: number, usesFunctionalUpdate: boolean }`. With `usesFunctionalUpdate = false` (stale closure), count never increases past `initialCount + 1` no matter how many ticks — it always sets to `(captured count) + 1`. With `usesFunctionalUpdate = true`, count correctly increments by 1 per tick. Return the count after `ticks` ticks.',
    correctExplanation:
      'The stale closure bug freezes count at initialCount+1 because the interval captures the initial count value. The fix is `setCount(c => c + 1)` which reads the latest state instead of the captured value.',
    tests: [
      { input: [{ initialCount: 0, ticks: 5, usesFunctionalUpdate: false }], expected: 1 },
      { input: [{ initialCount: 0, ticks: 5, usesFunctionalUpdate: true }], expected: 5 },
      { input: [{ initialCount: 3, ticks: 4, usesFunctionalUpdate: false }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-selective-update-0007',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Selective Hook Update Triggering)\n\nYou have a component with multiple useEffect hooks:\n\n```jsx\nfunction Dashboard({ user, settings, theme }) {\n  useEffect(() => { loadUserData(user) }, [user])\n  useEffect(() => { applySettings(settings) }, [settings])\n  useEffect(() => { applyTheme(theme) }, [theme])\n}\n```\n\nImplement `solve(input)` where `input = { prevProps: { user, settings, theme }, nextProps: { user, settings, theme } }`. Return `{ effectsTriggered: string[] }` listing which effects re-run based on dependency changes.',
    correctExplanation:
      'Each useEffect runs independently based on its dependency array. Only when a dependency changes (by ===) does that specific effect re-run. This allows fine-grained control over side effects.',
    tests: [
      { input: [{ prevProps: { user: 'a', settings: 's1', theme: 'dark' }, nextProps: { user: 'b', settings: 's1', theme: 'dark' } }], expected: { effectsTriggered: ['loadUserData'] } },
      { input: [{ prevProps: { user: 'a', settings: 's1', theme: 'dark' }, nextProps: { user: 'a', settings: 's1', theme: 'dark' } }], expected: { effectsTriggered: [] } },
      { input: [{ prevProps: { user: 'a', settings: 's1', theme: 'dark' }, nextProps: { user: 'a', settings: 's2', theme: 'light' } }], expected: { effectsTriggered: ['applySettings', 'applyTheme'] } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-concurrent-suspense-retry-0008',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Concurrent Suspense Retries)\n\nYou are modeling resource retries in Suspense:\n\n```jsx\n<Suspense fallback={<Spinner />} key={userId}>\n  <UserProfile userId={userId} />\n</Suspense>\n```\n\nImplement `solve(input)` where `input = { attempts: number, maxAttempts: number, resourceReady: boolean }`. Suspense retries on error/loading. Return `{ shouldSuspend: boolean, retryCount: number }`.',
    correctExplanation:
      'Suspense catches resource promise rejections and retries. The boundary key change forces remount. In concurrent mode, Suspense can pause higher-priority work and resume when the resource settles.',
    tests: [
      { input: [{ attempts: 1, maxAttempts: 3, resourceReady: false }], expected: { shouldSuspend: true, retryCount: 1 } },
      { input: [{ attempts: 3, maxAttempts: 3, resourceReady: true }], expected: { shouldSuspend: false, retryCount: 3 } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-use-transition-fetch-0009',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (useTransition with Resource Fetching)\n\nYou are managing a deferred search query:\n\n```jsx\nfunction Search() {\n  const [query, setQuery] = useState("")\n  const [isPending, startTransition] = useTransition()\n  const results = useMemo(() => search(query), [query])\n}\n```\n\nImplement `solve(input)` where `input = { queryText: string, fetchTime: number }`. When query changes, startTransition defers the search. Return `{ pending: boolean, allowInterrupt: boolean }`.',
    correctExplanation:
      'useTransition marks work as low-priority, allowing urgent updates (like typing a new character) to interrupt. This keeps UI responsive during expensive computations without blocking input.',
    tests: [
      { input: [{ queryText: 'react', fetchTime: 100 }], expected: { pending: true, allowInterrupt: true } },
      { input: [{ queryText: '', fetchTime: 0 }], expected: { pending: false, allowInterrupt: false } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-controlled-async-validation-0010',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Controlled Async Validation)\n\nYou have a form field that validates asynchronously:\n\n```jsx\nfunction EmailInput({ value }) {\n  const [validating, setValidating] = useState(false)\n  const [valid, setValid] = useState(null)\n  useEffect(() => {\n    setValidating(true)\n    validateEmail(value).then(v => setValid(v)).finally(() => setValidating(false))\n  }, [value])\n}\n```\n\nImplement `solve(input)` where `input = { value: string, checkTime: number, isValid: boolean }`. The validation state machine transitions: idle → validating → valid/invalid. Return `{ state: "idle"|"validating"|"valid"|"invalid" }`.',
    correctExplanation:
      'Async validation requires state machine logic: track pending, success, and error states. This prevents race conditions where an old validation result overwrites a newer one.',
    tests: [
      { input: [{ value: 'test@example.com', checkTime: 50, isValid: true }], expected: { state: 'valid' } },
      { input: [{ value: 'invalid', checkTime: 0, isValid: false }], expected: { state: 'invalid' } },
    ],
  },
  {
    id: 'raw-coding-react-veryhard-reducer-time-travel-0011',
    difficulty: 'veryHard',
    prompt:
      'React Component Coding (Reducer with Time Travel)\n\nYou are implementing undo/redo in a reducer:\n\n```jsx\nfunction stateReducer(state, action) {\n  switch (action.type) {\n    case "ACTION": // normal action\n      return { ...state, history: [...state.history, newState] }\n    case "UNDO":\n      return state.history[state.history.length - 2]\n    case "REDO": // future states\n  }\n}\n```\n\nImplement `solve(input)` where `input = { actions: ("ACTION" | "UNDO" | "REDO")[] }`. Maintain a history of states and a future stack. Return the final state index.',
    correctExplanation:
      'Time travel requires dual stacks: history for undo and future for redo. Each normal action clears the future stack (can\'t redo after a new action). This is the core pattern used in Redux DevTools.',
    tests: [
      { input: [{ actions: ['ACTION', 'ACTION', 'UNDO'] }], expected: 1 },
      { input: [{ actions: ['ACTION', 'UNDO', 'REDO'] }], expected: 2 },
    ],
  },
]

export default data
