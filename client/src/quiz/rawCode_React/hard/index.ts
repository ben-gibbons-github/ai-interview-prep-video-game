import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-react-hard-usereducer-normalize-0001',
    difficulty: 'hard',
    prompt:
      'React Component Coding (useReducer Normalized State)\n\nYou store entities in a normalized shape:\n\n```jsx\n// state = { byId: Record<string, Item>, allIds: string[] }\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "UPSERT": // add or update item by id\n    case "DELETE": // remove item from byId and allIds\n  }\n}\n```\n\nImplement `solve(input)` where `input = { state: { byId: Record<string, object>, allIds: string[] }, action: { type: string, item?: { id: string, [key: string]: any }, id?: string } }`. Return the next `{ byId, allIds }`. UPSERT merges item into byId (append id to allIds only if new). DELETE removes from both structures.',
    correctExplanation:
      'Normalized state keeps entities in byId for O(1) lookup and allIds for ordered iteration. UPSERT must check allIds membership to avoid duplicates. DELETE must remove from both structures without mutation.',
    tests: [
      {
        input: [{ state: { byId: {}, allIds: [] }, action: { type: 'UPSERT', item: { id: 'a', name: 'Alpha' } } }],
        expected: { byId: { a: { id: 'a', name: 'Alpha' } }, allIds: ['a'] },
      },
      {
        input: [{ state: { byId: { a: { id: 'a', name: 'Alpha' } }, allIds: ['a'] }, action: { type: 'UPSERT', item: { id: 'a', name: 'Alpha Updated' } } }],
        expected: { byId: { a: { id: 'a', name: 'Alpha Updated' } }, allIds: ['a'] },
      },
      {
        input: [{ state: { byId: { a: { id: 'a' }, b: { id: 'b' } }, allIds: ['a', 'b'] }, action: { type: 'DELETE', id: 'a' } }],
        expected: { byId: { b: { id: 'b' } }, allIds: ['b'] },
      },
    ],
  },
  {
    id: 'raw-coding-react-hard-usecallback-stable-0002',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Stable Callback Dependencies)\n\nYou are auditing a component for unnecessary re-renders:\n\n```jsx\nfunction Parent({ userId, onNotify }) {\n  const handleClick = useCallback(() => {\n    fetchData(userId).then(onNotify)\n  }, [/* deps */])\n  return <Child onClick={handleClick} />\n}\n```\n\nImplement `solve(input)` where `input = { prevDeps: any[], nextDeps: any[], prevCalled: number }`. The callback re-creates when any dep changes (shallow equality). Return `{ reCreated: boolean, callbackVersion: number }`. `callbackVersion` starts at 1 and increments by 1 each time the callback is re-created.',
    correctExplanation:
      'useCallback returns the same function reference when all deps are shallowly equal. When any dep changes, a new function is created, causing child re-renders. callbackVersion tracks this.',
    tests: [
      { input: [{ prevDeps: ['u1', 'fn1'], nextDeps: ['u1', 'fn1'], prevCalled: 1 }], expected: { reCreated: false, callbackVersion: 1 } },
      { input: [{ prevDeps: ['u1', 'fn1'], nextDeps: ['u2', 'fn1'], prevCalled: 1 }], expected: { reCreated: true, callbackVersion: 2 } },
      { input: [{ prevDeps: ['u1', 'fn1'], nextDeps: ['u1', 'fn2'], prevCalled: 3 }], expected: { reCreated: true, callbackVersion: 4 } },
    ],
  },
  {
    id: 'raw-coding-react-hard-portal-event-bubble-0003',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Portal Event Bubbling)\n\nA Modal is rendered in a React portal (mounted to `document.body`) but event bubbling follows the React tree, not the DOM tree:\n\n```jsx\nfunction App() {\n  // clicking inside Modal still bubbles to App in React\n  return (\n    <div onClick={() => log("App clicked")}>\n      <Modal /> {/* portaled to body */}\n    </div>\n  )\n}\n```\n\nImplement `solve(input)` where `input = { clickTarget: "modal-inner" | "modal-overlay" | "outside", stopPropagationAt: "modal-inner" | "modal-overlay" | null }`. Return the list of React component names that would handle the click, in bubbling order: innermost first. Components in order: `["ModalInner", "ModalOverlay", "App"]`. Stop the list at `stopPropagationAt` (inclusive).',
    correctExplanation:
      'React portal events bubble through the React component tree, not the DOM tree. stopPropagation halts the React synthetic event. Understanding this distinction prevents subtle bugs with portals and overlays.',
    tests: [
      { input: [{ clickTarget: 'modal-inner', stopPropagationAt: null }], expected: ['ModalInner', 'ModalOverlay', 'App'] },
      { input: [{ clickTarget: 'modal-inner', stopPropagationAt: 'modal-inner' }], expected: ['ModalInner'] },
      { input: [{ clickTarget: 'modal-overlay', stopPropagationAt: null }], expected: ['ModalOverlay', 'App'] },
    ],
  },
  {
    id: 'raw-coding-react-hard-batched-update-order-0004',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Batched State Update Order)\n\nIn React 18, all state updates in an event handler are batched:\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  const [log, setLog]     = useState([])\n\n  function handleClick() {\n    setCount(c => c + 1)\n    setCount(c => c + 1)\n    setLog(l => [...l, "clicked"])\n  }\n}\n```\n\nImplement `solve(input)` where `input = { initialCount: number, initialLog: string[], clicks: number }`. Return the state after `clicks` handleClick calls: `{ count: number, log: string[] }`. Each click: count += 2, log gets one "clicked" appended.',
    correctExplanation:
      'React 18 automatic batching coalesces all state updates in an event into one re-render. Functional updaters (c => c+1) run sequentially against pending state, so two increments per click are both applied.',
    tests: [
      { input: [{ initialCount: 0, initialLog: [], clicks: 1 }], expected: { count: 2, log: ['clicked'] } },
      { input: [{ initialCount: 0, initialLog: [], clicks: 3 }], expected: { count: 6, log: ['clicked', 'clicked', 'clicked'] } },
      { input: [{ initialCount: 10, initialLog: ['prev'], clicks: 2 }], expected: { count: 14, log: ['prev', 'clicked', 'clicked'] } },
    ],
  },
  {
    id: 'raw-coding-react-hard-error-boundary-retry-0005',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Error Boundary State)\n\nYou are implementing an Error Boundary with retry logic:\n\n```jsx\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false, retries: 0 }\n\n  static getDerivedStateFromError() {\n    return { hasError: true }\n  }\n\n  handleRetry = () => {\n    this.setState(s => ({ hasError: false, retries: s.retries + 1 }))\n  }\n}\n```\n\nImplement `solve(input)` where `input = { events: ("error" | "retry")[] }`. Starting from `{ hasError: false, retries: 0 }`, apply each event in order. An "error" event sets `hasError: true`. A "retry" event sets `hasError: false` and increments `retries`. Return final state `{ hasError, retries }`.',
    correctExplanation:
      'Error boundaries catch render errors via getDerivedStateFromError. Retry logic must clear hasError and increment a counter to force remount of the child subtree. Events apply in sequence to the accumulated state.',
    tests: [
      { input: [{ events: ['error'] }], expected: { hasError: true, retries: 0 } },
      { input: [{ events: ['error', 'retry'] }], expected: { hasError: false, retries: 1 } },
      { input: [{ events: ['error', 'retry', 'error', 'retry', 'retry'] }], expected: { hasError: false, retries: 3 } },
    ],
  },
  {
    id: 'raw-coding-react-hard-concurrent-transition-0006',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Transition Priority)\n\nIn React 18, `startTransition` marks updates as low priority:\n\n```jsx\nfunction Search({ query }) {\n  const [urgentQ, setUrgentQ] = useState("")\n  const [deferredQ, setDeferredQ] = useState("")\n\n  function handleChange(val) {\n    setUrgentQ(val)          // urgent\n    startTransition(() => {\n      setDeferredQ(val)      // deferred\n    })\n  }\n}\n```\n\nImplement `solve(input)` where `input = { updates: { val: string, isTransition: boolean }[] }`. Simulate processing: urgent updates always apply immediately, transition updates apply only when no urgent updates are pending in the same batch. Return `{ urgentQ: string, deferredQ: string }` after all updates. A "batch" here is the full updates array — if any update is urgent, only urgent updates apply to deferredQ as well (it stays at its last committed value before this batch).',
    correctExplanation:
      'startTransition yields to urgent work. If urgent updates interrupt a transition, the deferred state stays stale until the transition can commit uninterrupted. Modeling this teaches React 18 concurrent rendering intuition.',
    tests: [
      {
        input: [{ updates: [{ val: 'a', isTransition: false }, { val: 'a', isTransition: true }] }],
        expected: { urgentQ: 'a', deferredQ: 'a' },
      },
      {
        input: [{ updates: [{ val: 'b', isTransition: false }, { val: 'b', isTransition: true }, { val: 'c', isTransition: false }] }],
        expected: { urgentQ: 'c', deferredQ: 'b' },
      },
      {
        input: [{ updates: [{ val: 'x', isTransition: true }] }],
        expected: { urgentQ: '', deferredQ: 'x' },
      },
    ],
  },
  {
    id: 'raw-coding-react-hard-infinite-scroll-observer-0007',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Infinite Scroll Intersection Observer)\n\nYou are implementing infinite scroll with a sentinel element:\n\n```jsx\nconst sentinelRef = useRef(null)\nuseEffect(() => {\n  const observer = new IntersectionObserver(entries => {\n    if (entries[0].isIntersecting) loadMore()\n  })\n  observer.observe(sentinelRef.current)\n  return () => observer.disconnect()\n}, [])\n```\n\nImplement `solve(input)` where `input = { scrolledItems: number, threshold: number, containerHeight: number }`. When sentinel becomes visible (inView), trigger loadMore. Return `{ shouldLoadMore: boolean }`.',
    correctExplanation:
      'Intersection Observer detects when a sentinel element enters the viewport and triggers data loading. This is more efficient than scroll event listeners and enables seamless infinite pagination.',
    tests: [
      { input: [{ scrolledItems: 95, threshold: 90, containerHeight: 600 }], expected: { shouldLoadMore: true } },
      { input: [{ scrolledItems: 50, threshold: 90, containerHeight: 600 }], expected: { shouldLoadMore: false } },
    ],
  },
  {
    id: 'raw-coding-react-hard-memoization-deep-equality-0008',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Memoization with Deep Equality)\n\nYou are optimizing a complex component that receives nested object props:\n\n```jsx\nconst Widget = React.memo(\n  function Widget({ config }) { /* renders */ },\n  (prev, next) => deepEqual(prev.config, next.config)\n)\n```\n\nImplement `solve(input)` where `input = { prevConfig: object, nextConfig: object }`. Return `true` if configs are deeply equal (same values at all levels), `false` otherwise. For simplicity, only check top-level properties.',
    correctExplanation:
      'Deep equality comparison prevents re-renders from shallow object changes. However, naive deep equality is expensive; React.memo should use shallow checks for most cases and only deep-check when necessary.',
    tests: [
      { input: [{ prevConfig: { a: 1, b: { c: 2 } }, nextConfig: { a: 1, b: { c: 2 } } }], expected: true },
      { input: [{ prevConfig: { a: 1, b: 2 }, nextConfig: { a: 1, b: 3 } }], expected: false },
    ],
  },
  {
    id: 'raw-coding-react-hard-callback-deps-array-0009',
    difficulty: 'hard',
    prompt:
      'React Component Coding (useCallback Dependency Array)\n\nYou have a callback with a complex dependency array:\n\n```jsx\nconst memoizedCallback = useCallback(() => {\n  doSomething(a, b, c)\n}, [a, b, c])\n```\n\nImplement `solve(input)` where `input = { prevDeps: any[], nextDeps: any[] }`. The callback re-creates when any dependency changes. Return `{ recreated: boolean }` by comparing deps using shallow equality.',
    correctExplanation:
      'useCallback dependency arrays use reference equality (===) for each element. If any dep fails === check, the callback is recreated. This is the same mechanism as useMemo and useEffect.',
    tests: [
      { input: [{ prevDeps: [1, 2, 3], nextDeps: [1, 2, 3] }], expected: { recreated: false } },
      { input: [{ prevDeps: [1, 2, 3], nextDeps: [1, 2, 4] }], expected: { recreated: true } },
      { input: [{ prevDeps: [{}, {}], nextDeps: [{}, {}] }], expected: { recreated: true } },
    ],
  },
  {
    id: 'raw-coding-react-hard-render-phase-effects-0010',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Render Phase Side Effects)\n\nUnderstanding what runs during render vs commit:\n\n```jsx\nfunction Component() {\n  // This runs during every render\n  console.log("render phase")\n\n  useEffect(() => {\n    // This runs after commit\n    console.log("commit phase")\n  }, [])\n}\n```\n\nImplement `solve(input)` where `input = { events: ("render" | "effect" | "compute" | "state")[] }`. Return `{ executionOrder: string[] }` showing which events ran, in order of React lifecycle: compute → render → state changes → effect.',
    correctExplanation:
      'React\'s render phase (pure computations, component body) is separate from the commit phase (side effects, DOM mutations). Understanding this order is essential for debugging performance issues.',
    tests: [
      { input: [{ events: ['compute', 'render', 'state', 'effect'] }], expected: { executionOrder: ['compute', 'render', 'state', 'effect'] } },
      { input: [{ events: ['state', 'compute', 'render'] }], expected: { executionOrder: ['compute', 'render', 'state'] } },
    ],
  },
  {
    id: 'raw-coding-react-hard-async-validation-0011',
    difficulty: 'hard',
    prompt:
      'React Component Coding (Async Validation in Effect)\n\nYou are validating user input asynchronously:\n\n```jsx\nfunction Form({ email }) {\n  const [error, setError] = useState(null)\n  useEffect(() => {\n    const timer = setTimeout(async () => {\n      const valid = await checkEmail(email)\n      if (!valid) setError("Invalid")\n    }, 500)\n    return () => clearTimeout(timer)\n  }, [email])\n}\n```\n\nImplement `solve(input)` where `input = { email: string, previousEmail: string }`. When email changes, reset error and debounce validation. Return `{ errorState: string | null, pendingValidation: boolean }`.',
    correctExplanation:
      'Debounced async validation avoids excessive API calls. The cleanup function clears the timer if the effect re-runs before the timer fires, and using a cleanup prevents stale responses from overwriting newer validations.',
    tests: [
      { input: [{ email: 'new@test.com', previousEmail: 'old@test.com' }], expected: { errorState: null, pendingValidation: true } },
      { input: [{ email: '', previousEmail: '' }], expected: { errorState: null, pendingValidation: false } },
    ],
  },
]

export default data
