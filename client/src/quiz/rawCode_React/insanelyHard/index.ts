import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-react-insane-scheduler-priority-0001',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Scheduler Lane Priority)\n\nReact 18 uses lanes to assign priority to updates. You are modeling a simplified scheduler:\n\n```\nLanes (highest to lowest): SyncLane(1) > InputLane(4) > DefaultLane(16) > IdleLane(256)\n```\n\nImplement `solve(input)` where `input = { updates: { lane: number, work: string }[] }`. Process updates in priority order (lowest lane number = highest priority). When multiple updates share the same lane, preserve their original order. Return an array of `work` strings in execution order.',
    correctExplanation:
      'React Fiber scheduler orders updates by lane bitmask value — lower bits = higher priority. This is how useState, startTransition, and Suspense interact in concurrent mode to defer non-urgent work.',
    tests: [
      {
        input: [{ updates: [{ lane: 16, work: 'fetch' }, { lane: 1, work: 'keypress' }, { lane: 4, work: 'click' }] }],
        expected: ['keypress', 'click', 'fetch'],
      },
      {
        input: [{ updates: [{ lane: 256, work: 'idle' }, { lane: 4, work: 'a' }, { lane: 4, work: 'b' }] }],
        expected: ['a', 'b', 'idle'],
      },
      {
        input: [{ updates: [{ lane: 1, work: 'sync1' }, { lane: 1, work: 'sync2' }] }],
        expected: ['sync1', 'sync2'],
      },
    ],
  },
  {
    id: 'raw-coding-react-insane-fiber-reconcile-0002',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Fiber Reconciliation Diff)\n\nReact\'s reconciler compares old and new child fiber lists by key:\n\n```\nOld: [A(k=1), B(k=2), C(k=3)]\nNew: [C(k=3), A(k=1), D(k=4)]\n→ Reuse A and C, delete B, create D, move C to front\n```\n\nImplement `solve(input)` where `input = { oldList: { key: string, type: string }[], newList: { key: string, type: string }[] }`. Return `{ reused: string[], created: string[], deleted: string[], moved: string[] }`. `reused` = keys present in both lists. `created` = keys only in new. `deleted` = keys only in old. `moved` = reused keys whose new position index differs from old position index.',
    correctExplanation:
      'React reconciliation uses key-based identity to determine which fibers to reuse vs create vs delete. Movement detection prevents unnecessary DOM operations. This is the core algorithm that makes React lists efficient.',
    tests: [
      {
        input: [{
          oldList: [{ key: '1', type: 'A' }, { key: '2', type: 'B' }, { key: '3', type: 'C' }],
          newList: [{ key: '3', type: 'C' }, { key: '1', type: 'A' }, { key: '4', type: 'D' }],
        }],
        expected: { reused: ['1', '3'], created: ['4'], deleted: ['2'], moved: ['3'] },
      },
      {
        input: [{
          oldList: [{ key: 'a', type: 'X' }, { key: 'b', type: 'Y' }],
          newList: [{ key: 'a', type: 'X' }, { key: 'b', type: 'Y' }],
        }],
        expected: { reused: ['a', 'b'], created: [], deleted: [], moved: [] },
      },
      {
        input: [{
          oldList: [{ key: 'x', type: 'P' }],
          newList: [{ key: 'y', type: 'Q' }],
        }],
        expected: { reused: [], created: ['y'], deleted: ['x'], moved: [] },
      },
    ],
  },
  {
    id: 'raw-coding-react-insane-selector-rerender-0003',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Redux Selector Re-render Analysis)\n\nYou are analyzing which components will re-render when Redux state changes:\n\n```jsx\n// Three components select from the same store:\nconst A = () => { const x = useSelector(s => s.x); return <div>{x}</div> }\nconst B = () => { const y = useSelector(s => s.y); return <div>{y}</div> }\nconst C = () => { const z = useSelector(s => s.x + s.y); return <div>{z}</div> }\n```\n\nImplement `solve(input)` where `input = { prevState: { x: number, y: number }, nextState: { x: number, y: number } }`. Return `{ rerenders: string[] }` — the component names (from ["A","B","C"]) that will re-render, based on whether their selected value changed (===). Selector for A: s.x, B: s.y, C: s.x + s.y.',
    correctExplanation:
      'useSelector skips re-render when the selected value is shallowly equal (===). Understanding which selectors return new values on a given state change is essential for Redux performance tuning.',
    tests: [
      { input: [{ prevState: { x: 1, y: 2 }, nextState: { x: 2, y: 2 } }], expected: { rerenders: ['A', 'C'] } },
      { input: [{ prevState: { x: 1, y: 2 }, nextState: { x: 1, y: 3 } }], expected: { rerenders: ['B', 'C'] } },
      { input: [{ prevState: { x: 1, y: 2 }, nextState: { x: 1, y: 2 } }], expected: { rerenders: [] } },
    ],
  },
  {
    id: 'raw-coding-react-insane-hook-deps-graph-0004',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Hook Dependency Graph)\n\nYou are tracing hook execution order when dependencies change:\n\n```jsx\nfunction Comp({ a, b }) {\n  const x = useMemo(() => compute(a), [a])        // hook 1\n  const y = useMemo(() => compute(b), [b])        // hook 2\n  const z = useMemo(() => combine(x, y), [x, y]) // hook 3\n\n  useEffect(() => {                               // hook 4\n    sync(z)\n  }, [z])\n}\n```\n\nImplement `solve(input)` where `input = { prevProps: { a: number, b: number }, nextProps: { a: number, b: number } }`. Hooks re-run when their inputs change. Return `{ rerunHooks: number[] }` — sorted list of hook numbers that will re-run. Hook 3 re-runs if x or y changes. Hook 4 re-runs if z changes.',
    correctExplanation:
      'Hook dependency graphs cascade: changing `a` re-runs hook 1 → x changes → hook 3 re-runs → z changes → hook 4 re-runs. This analysis is key to understanding React performance and avoiding over-computation.',
    tests: [
      { input: [{ prevProps: { a: 1, b: 2 }, nextProps: { a: 2, b: 2 } }], expected: { rerunHooks: [1, 3, 4] } },
      { input: [{ prevProps: { a: 1, b: 2 }, nextProps: { a: 1, b: 3 } }], expected: { rerunHooks: [2, 3, 4] } },
      { input: [{ prevProps: { a: 1, b: 2 }, nextProps: { a: 1, b: 2 } }], expected: { rerunHooks: [] } },
    ],
  },
  {
    id: 'raw-coding-react-insane-ssr-hydration-mismatch-0005',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (SSR Hydration Mismatch Detection)\n\nDuring React SSR hydration, mismatches between server HTML and client render cause warnings or errors:\n\n```jsx\nfunction Timestamp({ iso }) {\n  const display = formatDate(iso) // may differ server/client\n  return <span>{display}</span>\n}\n```\n\nImplement `solve(input)` where `input = { serverOutput: string, clientOutput: string, suppressHydrationWarning: boolean }`. Return `{ hasMismatch: boolean, behaviour: "silent" | "warn" | "remount" }`. If outputs match: no mismatch, silent. If mismatch and suppressHydrationWarning: hasMismatch=true but behaviour="silent". If mismatch and not suppressed: hasMismatch=true, behaviour="warn". Edge case: if serverOutput is empty string and clientOutput is not: behaviour="remount".',
    correctExplanation:
      'React SSR hydration compares server-rendered HTML to the client render. Mismatches cause warnings; suppressHydrationWarning silences them for dynamic content like timestamps. An empty server string with content triggers a full remount fallback.',
    tests: [
      { input: [{ serverOutput: 'Jan 1', clientOutput: 'Jan 1', suppressHydrationWarning: false }], expected: { hasMismatch: false, behaviour: 'silent' } },
      { input: [{ serverOutput: 'Jan 1', clientOutput: 'Jan 2', suppressHydrationWarning: false }], expected: { hasMismatch: true, behaviour: 'warn' } },
      { input: [{ serverOutput: '', clientOutput: 'Jan 2', suppressHydrationWarning: false }], expected: { hasMismatch: true, behaviour: 'remount' } },
    ],
  },
  {
    id: 'raw-coding-react-insane-concurrent-render-interleave-0006',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Concurrent Render Interleaving)\n\nIn React concurrent mode, a render can be interrupted and restarted. You are modeling a simplified concurrent render:\n\n```\nEach render task has: { id, priority, work[] }\nReact processes the highest priority task; if a higher priority task arrives mid-render, it interrupts.\n```\n\nImplement `solve(input)` where `input = { tasks: { id: string, priority: number, steps: number }[] }`. Tasks arrive in order. Lower priority number = higher priority. Process one step at a time from the current highest-priority task. If a new task arrives (by index in the array) before the current task finishes, switch to it if it has higher priority. Return the order task ids complete in.',
    correctExplanation:
      'Concurrent React can pause, discard, and restart renders. This interleaving model — where high-priority tasks preempt low-priority ones — is the core mental model for understanding Suspense, transitions, and the scheduler.',
    tests: [
      {
        input: [{ tasks: [{ id: 'A', priority: 2, steps: 3 }, { id: 'B', priority: 1, steps: 1 }] }],
        expected: ['B', 'A'],
      },
      {
        input: [{ tasks: [{ id: 'A', priority: 1, steps: 2 }, { id: 'B', priority: 2, steps: 1 }] }],
        expected: ['A', 'B'],
      },
      {
        input: [{ tasks: [{ id: 'X', priority: 3, steps: 1 }, { id: 'Y', priority: 3, steps: 1 }, { id: 'Z', priority: 1, steps: 1 }] }],
        expected: ['X', 'Y', 'Z'],
      },
    ],
  },
  {
    id: 'raw-coding-react-insane-lane-inheritance-0007',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Fiber Lane Inheritance)\n\nReact assigns lanes to updates. A parent update\'s lane can influence children:\n\n```\nIf parent has SyncLane update and child has DefaultLane,\nchild may elevate to SyncLane to avoid stale renders.\n```\n\nImplement `solve(input)` where `input = { parentLane: number, childLane: number }`. Return the effective lane for the child: if parentLane is higher priority (lower value), child inherits it. Otherwise use childLane.',
    correctExplanation:
      'Lane inheritance ensures parent-child consistency. A high-priority parent update automatically prioritizes its children to prevent inconsistent intermediate states during partial renders.',
    tests: [
      { input: [{ parentLane: 1, childLane: 16 }], expected: 1 },
      { input: [{ parentLane: 16, childLane: 4 }], expected: 4 },
      { input: [{ parentLane: 4, childLane: 4 }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-react-insane-bailout-optimization-0008',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Bailout Optimization with Multiple Providers)\n\nWhen a component wrapped in multiple Contexts doesn\'t change:\n\n```jsx\n<ContextA.Provider value={a}>\n  <ContextB.Provider value={b}>\n    <Child /> {/* can bailout if neither a nor b changed */}\n  </ContextB.Provider>\n</ContextA.Provider>\n```\n\nImplement `solve(input)` where `input = { contextChanges: boolean[], propsChanged: boolean }`. Return `{ shouldBailout: boolean }`. Bailout only if props didn\'t change AND all context values are stable (===).',
    correctExplanation:
      'Bailout skips child render if props and context values are reference-equal. This optimization is critical for performance in deeply nested provider hierarchies. Context bailout requires all provider values to be unchanged.',
    tests: [
      { input: [{ contextChanges: [false, false], propsChanged: false }], expected: { shouldBailout: true } },
      { input: [{ contextChanges: [true, false], propsChanged: false }], expected: { shouldBailout: false } },
      { input: [{ contextChanges: [false, false], propsChanged: true }], expected: { shouldBailout: false } },
    ],
  },
  {
    id: 'raw-coding-react-insane-double-invoke-strict-mode-0009',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Double-Invoking in Strict Mode)\n\nIn development, React StrictMode intentionally double-invokes functions to catch bugs:\n\n```jsx\nfunction Component() {\n  // Called twice in Strict Mode to detect side effects\n  const data = loadData() // should be pure\n  return <div>{data}</div>\n}\n```\n\nImplement `solve(input)` where `input = { strictModeEnabled: boolean, sideEffectCount: number }`. In Strict Mode, functions are called twice (mount and remount). Return `{ totalInvocations: number }`.',
    correctExplanation:
      'Strict Mode double-invokes component functions and effect setups to catch impure functions and missing cleanup. This is intentional in development only, not production, to improve code quality.',
    tests: [
      { input: [{ strictModeEnabled: true, sideEffectCount: 1 }], expected: { totalInvocations: 2 } },
      { input: [{ strictModeEnabled: false, sideEffectCount: 1 }], expected: { totalInvocations: 1 } },
    ],
  },
  {
    id: 'raw-coding-react-insane-time-slicing-long-tasks-0010',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Time Slicing with Long Tasks)\n\nReact breaks long renders into chunks to keep UI responsive:\n\n```\nRender tasks: [Task1(10ms), Task2(30ms), Task3(25ms)]\nTime slice budget: 5ms per slice\nMax frame budget: 16.67ms per frame (60fps)\n```\n\nImplement `solve(input)` where `input = { tasks: number[], timeSlice: number, frameBudget: number }`. Return `{ framesNeeded: number, tasksPerFrame: number[] }`. Distribute tasks across frames respecting slice budget.',
    correctExplanation:
      'Time slicing distributes render work across multiple frames to prevent jank. Each frame gets up to frameBudget time, divided into slices. This is how React concurrent mode keeps the UI responsive during expensive renders.',
    tests: [
      { input: [{ tasks: [10, 30, 25], timeSlice: 5, frameBudget: 16 }], expected: { framesNeeded: 3, tasksPerFrame: [1, 1, 1] } },
      { input: [{ tasks: [2, 3, 2, 3], timeSlice: 10, frameBudget: 20 }], expected: { framesNeeded: 2, tasksPerFrame: [2, 2] } },
    ],
  },
  {
    id: 'raw-coding-react-insane-hydration-cache-invalidate-0011',
    difficulty: 'insanelyHard',
    prompt:
      'React Component Coding (Hydration Cache Invalidation)\n\nWhen hydrating from SSR, client state may diverge from server state:\n\n```jsx\nfunction App() {\n  // Server rendered with: { version: 1 }\n  // Client hydrates but receives new version: { version: 2 }\n  // Must invalidate cache and re-render\n}\n```\n\nImplement `solve(input)` where `input = { serverData: object, clientData: object }`. Compare versions: if different, invalidate client cache. Return `{ cacheValid: boolean, shouldRerender: boolean }`.',
    correctExplanation:
      'Hydration mismatches occur when server and client data diverge. React detects these and may warn, fallback to client render, or re-render to sync state. Proper cache invalidation prevents stale data bugs.',
    tests: [
      { input: [{ serverData: { version: 1 }, clientData: { version: 1 } }], expected: { cacheValid: true, shouldRerender: false } },
      { input: [{ serverData: { version: 1 }, clientData: { version: 2 } }], expected: { cacheValid: false, shouldRerender: true } },
    ],
  },
]

export default data
