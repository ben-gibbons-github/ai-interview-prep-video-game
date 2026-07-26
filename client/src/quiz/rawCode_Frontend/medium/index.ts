import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-frontend-medium-reducer-counter-0001',
    difficulty: 'medium',
    prompt:
      'Frontend Coding Challenge (Reducer Counter State)\n\nYou are implementing a tiny state reducer for a dashboard widget that tracks a numeric counter and whether a network request is in progress.\n\nImplement solve(input) where input = { initial: { count: number, loading: boolean }, actions: { type: string, by?: number }[] }.\n\nApply each action in order and return the final state object.\n\nAction rules:\n- INC: increase count by action.by when provided, otherwise by 1\n- DEC: decrease count by action.by when provided, otherwise by 1\n- START_LOADING: set loading to true\n- STOP_LOADING: set loading to false\n\nTreat this exactly like reducer logic: deterministic, ordered, and based on the previous state after each step.',
    correctExplanation:
      'Treat this like a tiny Redux reducer. Start from initial state and process actions in order. INC adds by if it exists, otherwise adds 1. DEC subtracts by if it exists, otherwise subtracts 1. START_LOADING sets loading to true and STOP_LOADING sets it to false. Return the final state object after every action has been applied. Example: starting from { count: 0, loading: false } with actions [INC, INC by 4, DEC by 2] ends at { count: 3, loading: false }.',
    tests: [
      { input: [{ initial: { count: 0, loading: false }, actions: [{ type: 'INC' }, { type: 'INC', by: 4 }, { type: 'DEC', by: 2 }] }], expected: { count: 3, loading: false } },
      { input: [{ initial: { count: 10, loading: false }, actions: [{ type: 'START_LOADING' }, { type: 'DEC' }, { type: 'STOP_LOADING' }] }], expected: { count: 9, loading: false } },
      { input: [{ initial: { count: 5, loading: true }, actions: [] }], expected: { count: 5, loading: true } },
    ],
  },
  {
    id: 'raw-coding-frontend-medium-optimistic-list-update-0002',
    difficulty: 'medium',
    prompt:
      'Frontend Coding Challenge (Optimistic List Update)\n\nYou are building an optimistic UI update for a todo list. A user edits one item, and the UI should immediately reflect the latest local version while preserving list order semantics.\n\nImplement solve(input) where input = { items: { id: string, title: string }[], patch: { id: string, title: string } }.\n\nReturn a new items array with this behavior:\n- if an item with patch.id exists, replace that item with patch\n- if patch.id does not exist, append patch to the end of the list\n\nDo not mutate the input array. Return the resulting list snapshot the UI would render.',
    correctExplanation:
      'Clone list and replace item with same id if found. If no match exists, append patch at end. This is common optimistic UI list behavior.',
    tests: [
      { input: [{ items: [{ id: '1', title: 'A' }, { id: '2', title: 'B' }], patch: { id: '2', title: 'B2' } }], expected: [{ id: '1', title: 'A' }, { id: '2', title: 'B2' }] },
      { input: [{ items: [{ id: '1', title: 'A' }], patch: { id: '3', title: 'C' } }], expected: [{ id: '1', title: 'A' }, { id: '3', title: 'C' }] },
      { input: [{ items: [], patch: { id: 'x', title: 'X' } }], expected: [{ id: 'x', title: 'X' }] },
    ],
  },
  {
    id: 'raw-coding-frontend-medium-pagination-range-0003',
    difficulty: 'medium',
    prompt:
      'Frontend Coding Challenge (Pagination Range)\n\nA table component needs the exact inclusive index range to slice records for the current page.\n\nImplement solve(input) where input = { totalItems: number, pageSize: number, page: number }.\n\nReturn { start: number, end: number } using zero-based inclusive indices for that page.\n\nRules:\n- start should be page * pageSize\n- end should be clamped to the last valid item index\n- if the requested page contains no items, return { start: -1, end: -1 }\n\nYour result should be safe for direct array slicing logic in a paginated frontend view.',
    correctExplanation:
      'Compute start = page*pageSize and end = min(totalItems-1, start+pageSize-1). If start >= totalItems or totalItems is 0, return -1/-1. This is standard UI pagination slicing math.',
    tests: [
      { input: [{ totalItems: 50, pageSize: 10, page: 2 }], expected: { start: 20, end: 29 } },
      { input: [{ totalItems: 7, pageSize: 5, page: 1 }], expected: { start: 5, end: 6 } },
      { input: [{ totalItems: 0, pageSize: 10, page: 0 }], expected: { start: -1, end: -1 } },
    ],
  },
  {
    id: 'raw-coding-frontend-medium-diff-summary-0004',
    difficulty: 'medium',
    prompt:
      'Frontend Coding Challenge (List Diff Summary)\n\nA configuration screen compares a saved baseline against the latest edited values and needs a deterministic "what changed" summary panel.\n\nImplement solve(input) where input = { before: string[], after: string[] }.\n\nReturn { added: string[], removed: string[], kept: string[] }, where each output array is sorted alphabetically for stable rendering and testability.\n\nDefinitions:\n- added: present in after but not in before\n- removed: present in before but not in after\n- kept: present in both before and after\n\nTreat before and after as sets (ignore duplicate occurrences when deciding membership).',
    correctExplanation:
      'Convert both arrays into sets or equivalent membership maps, then compute three buckets: added, removed, and kept. Sort each bucket alphabetically before returning the final object so the output is deterministic. This mirrors a UI diff summary panel where the same item should not appear twice.',
    tests: [
      { input: [{ before: ['a', 'b', 'c'], after: ['b', 'c', 'd'] }], expected: { added: ['d'], removed: ['a'], kept: ['b', 'c'] } },
      { input: [{ before: ['x'], after: ['x'] }], expected: { added: [], removed: [], kept: ['x'] } },
      { input: [{ before: [], after: ['m', 'n'] }], expected: { added: ['m', 'n'], removed: [], kept: [] } },
    ],
  },
  {
    id: 'raw-coding-frontend-medium-react-keyed-reconcile-0005',
    difficulty: 'medium',
    prompt:
      'React Coding Challenge (Keyed List Reconcile Summary)\n\nYou are inspecting how a keyed React list changes between two renders and want a concise reconciliation summary for debugging.\n\nImplement solve(input) where input = { prevKeys: string[], nextKeys: string[] }.\n\nReturn { mounted: string[], unmounted: string[], persisted: string[] } with all arrays sorted lexicographically by key.\n\nDefinitions:\n- mounted: keys that appear only in nextKeys\n- unmounted: keys that appear only in prevKeys\n- persisted: keys that appear in both\n\nModel this as set comparison of keys between the two render snapshots.',
    correctExplanation:
      'React keyed diff preserves nodes whose keys remain, mounts keys only in next, and unmounts keys only in prev. Compute set differences/intersection and sort outputs.',
    tests: [
      { input: [{ prevKeys: ['a', 'b', 'c'], nextKeys: ['b', 'c', 'd'] }], expected: { mounted: ['d'], unmounted: ['a'], persisted: ['b', 'c'] } },
      { input: [{ prevKeys: [], nextKeys: ['x'] }], expected: { mounted: ['x'], unmounted: [], persisted: [] } },
      { input: [{ prevKeys: ['k'], nextKeys: ['k'] }], expected: { mounted: [], unmounted: [], persisted: ['k'] } },
    ],
  },
  {
    id: 'raw-coding-frontend-medium-vue-watch-trigger-0006',
    difficulty: 'medium',
    prompt:
      'Vue Coding Challenge (watch Trigger Count)\n\nA Vue component watches a scalar reactive value over time, and you need to compute exactly how many times the watcher callback executes for a known value stream.\n\nImplement solve(input) where input = { values: unknown[], immediate: boolean }. The values array is the chronological sequence observed by the watcher source.\n\nReturn the number of callback invocations using these rules:\n- the callback runs whenever consecutive values differ by strict equality (!==)\n- when immediate is true, include one initial callback run before processing changes\n\nThis models common watch behavior for scalar refs, including the edge case of an empty values array.',
    correctExplanation:
      'Count transitions where previous !== next. Add an initial invocation when immediate is enabled. This models common Vue watch behavior for scalar refs.',
    tests: [
      { input: [{ values: [1, 1, 2, 2, 3], immediate: false }], expected: 2 },
      { input: [{ values: [1, 1, 2], immediate: true }], expected: 2 },
      { input: [{ values: [], immediate: true }], expected: 1 },
    ],
  },
]

export default data
