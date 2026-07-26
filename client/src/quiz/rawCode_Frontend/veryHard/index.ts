import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-frontend-very-hard-query-merge-0001',
    difficulty: 'veryHard',
    prompt:
      'Frontend Coding Challenge (Merge Query Params)\n\nYou are implementing the query-param merge helper used by a client-side router in a large SPA. Product flows repeatedly apply partial updates to the current URL state as users navigate tabs, add filters, and clear search fields. The helper must be deterministic, immutable, and safe to call from many independent UI features in sequence.\n\nImplement `solve(input)` where `input.current` is the existing query param map (`Record<string, string>`) and `input.updates` is a partial patch (`Record<string, string | null>`). A string value in `updates` means set/overwrite that key, while `null` means remove that key entirely from the result.\n\nReturn a brand-new object containing the merged state. Do not mutate `input.current` or `input.updates`. Preserve all untouched keys from `current`, apply every update key exactly once, and ensure explicit removals are reflected as key deletions rather than `null` values.\n\nThis helper models the exact behavior needed for URL synchronization in router-driven frontend apps.',
    correctExplanation:
      'Return a new object rather than mutating current. Start by copying the existing query params, then process each update key. If the new value is a string, overwrite or add that key. If the new value is null, delete that key from the result entirely. This mirrors how URL query updates often work in a client router. Example: { page: "2", q: "react", sort: "new" } merged with { page: "3", q: null } becomes { page: "3", sort: "new" }.',
    tests: [
      { input: [{ current: { page: '2', q: 'react', sort: 'new' }, updates: { page: '3', q: null } }], expected: { page: '3', sort: 'new' } },
      { input: [{ current: {}, updates: { tab: 'settings' } }], expected: { tab: 'settings' } },
      { input: [{ current: { a: '1', b: '2' }, updates: { b: null, c: '3' } }], expected: { a: '1', c: '3' } },
    ],
  },
  {
    id: 'raw-coding-frontend-very-hard-selection-range-0002',
    difficulty: 'veryHard',
    prompt:
      'Frontend Coding Challenge (Shift-Click Selection Range)\n\nYou are building desktop-style multi-select behavior for a web file table. Users can click one row, then Shift-click another row to select the full contiguous range between them. Existing selections must remain, range additions must be stable, and the final output must follow the canonical row order shown in the UI.\n\nImplement `solve(input)` where `input.ids` is the full ordered list of row IDs as rendered, `input.selected` is the current selected subset, `input.anchorId` is the selection anchor from the previous click, and `input.targetId` is the row the user Shift-clicked now.\n\nReturn a new selected ID list where every ID between `anchorId` and `targetId` (inclusive) has been added to selection. Keep output ordered by `ids`, not by click sequence. If either anchor or target cannot be found in `ids`, return the existing selection normalized to `ids` order with no additional range expansion.\n\nThis mirrors production file explorers, mail clients, and data-grid selection UX.',
    correctExplanation:
      'Find anchor and target indices in ids, compute inclusive range between min/max, union with existing selected set, then output in ids order. This mirrors file-list shift-selection behavior.',
    tests: [
      { input: [{ ids: ['a', 'b', 'c', 'd', 'e'], selected: ['a'], anchorId: 'b', targetId: 'd' }], expected: ['a', 'b', 'c', 'd'] },
      { input: [{ ids: ['x', 'y', 'z'], selected: [], anchorId: 'z', targetId: 'x' }], expected: ['x', 'y', 'z'] },
      { input: [{ ids: ['1', '2'], selected: ['2'], anchorId: 'missing', targetId: '2' }], expected: ['2'] },
    ],
  },
  {
    id: 'raw-coding-frontend-very-hard-batched-state-queue-0003',
    difficulty: 'veryHard',
    prompt:
      'Frontend Coding Challenge (Batched State Queue)\n\nYou are simulating a simplified UI state engine that queues updates during one event loop turn and then flushes them in order. Different component handlers can enqueue overwrite and increment operations, and correctness depends entirely on processing order, not operation type priority.\n\nImplement `solve(input)` where `input.initial` is the starting numeric state and `input.ops` is an ordered list of operations. An op of `{ type: "set", value }` replaces the current state with `value`. An op of `{ type: "inc", by }` increments the current state by `by` using the latest state at that point in the queue.\n\nSimulate the queue exactly in sequence and return the final numeric state. Do not reorder operations, do not coalesce operations, and do not assume commutativity.\n\nThis challenge models batched state application logic used by frontend runtimes and custom store implementations.',
    correctExplanation:
      'Process operations sequentially: set overwrites current value; inc adds to current value. This models queued state updaters where order is authoritative.',
    tests: [
      { input: [{ initial: 0, ops: [{ type: 'inc', by: 1 }, { type: 'inc', by: 2 }, { type: 'set', value: 10 }, { type: 'inc', by: 3 }] }], expected: 13 },
      { input: [{ initial: 5, ops: [] }], expected: 5 },
      { input: [{ initial: 1, ops: [{ type: 'set', value: 4 }, { type: 'set', value: 9 }] }], expected: 9 },
    ],
  },
  {
    id: 'raw-coding-frontend-very-hard-viewport-restore-0004',
    difficulty: 'veryHard',
    prompt:
      'Frontend Coding Challenge (Viewport Restore Plan)\n\nYou are implementing scroll-anchor preservation for an infinite feed/chat interface. New items can be inserted above the user’s current viewport while they are reading older content. Because rows have variable heights, preserving an anchor by index is insufficient; you must compute exact pixel compensation so the same visual content remains pinned in place after insertion.\n\nImplement `solve(input)` where `input.insertedHeights` is the ordered list of pixel heights for newly inserted rows above the anchor, and `input.anchorOffset` is provided as metadata from the caller (not required for this calculation in the supplied tests).\n\nReturn the number of pixels the scroll position must move downward to keep the anchored content in the same on-screen position after insertion. The calculation must reflect total inserted height above the anchor.\n\nTreat this as deterministic layout math used by production-grade timeline UIs where visual jumps are unacceptable.',
    correctExplanation:
      'The answer is the total height of the inserted content above the anchor. Sum the insertedHeights array and return that value. In a UI, this would be used as the scroll adjustment needed to preserve the visual position of the anchored content.',
    tests: [
      { input: [{ insertedHeights: [20, 30, 10], anchorOffset: 0 }], expected: 60 },
      { input: [{ insertedHeights: [5], anchorOffset: 0 }], expected: 5 },
      { input: [{ insertedHeights: [], anchorOffset: 12 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-frontend-very-hard-react-batched-events-0005',
    difficulty: 'veryHard',
    prompt:
      'React Coding Challenge (Batched setState Reduction)\n\nYou are modeling a React-style update queue to explain why mixed value-form and function-form state updates can produce surprising results when batched. During one event, several handlers enqueue updates that are then reduced in strict queue order against a single evolving accumulator.\n\nImplement `solve(input)` where `input.initial` is the starting state and `input.updates` is an ordered list of update descriptors. `{ kind: "value", value }` means replace state immediately with `value`. `{ kind: "fn", by }` means derive next state from the latest queued state by adding `by`.\n\nApply every update in sequence with no special precedence and return the final state after the batch flushes.\n\nThis problem captures real-world React debugging scenarios around stale assumptions and batched update semantics.',
    correctExplanation:
      'Model the update queue sequentially. Value-form updates replace state, function-form updates derive from latest queued state. Order matters exactly.',
    tests: [
      { input: [{ initial: 0, updates: [{ kind: 'fn', by: 1 }, { kind: 'fn', by: 2 }, { kind: 'value', value: 10 }, { kind: 'fn', by: 3 }] }], expected: 13 },
      { input: [{ initial: 5, updates: [{ kind: 'value', value: 1 }, { kind: 'value', value: 2 }] }], expected: 2 },
      { input: [{ initial: 7, updates: [] }], expected: 7 },
    ],
  },
  {
    id: 'raw-coding-frontend-very-hard-vue-keyed-patch-0006',
    difficulty: 'veryHard',
    prompt:
      'Vue Coding Challenge (Keyed Patch Operations)\n\nYou are implementing a diagnostics helper for a keyed virtual-DOM patcher. Given an old keyed child list and a new keyed child list, you need to summarize what changed: which nodes were inserted, which were removed, and which retained nodes must move because their relative index changed. This summary is later used for profiler visualizations and debugging reconciliation behavior.\n\nImplement `solve(input)` where `input.oldKeys` is the previous render key sequence and `input.newKeys` is the next render key sequence. Return an object `{ insert, remove, move }` where:\n- `insert` includes keys present only in `newKeys`\n- `remove` includes keys present only in `oldKeys`\n- `move` includes keys present in both arrays whose index changed between old and new\n\nSort each output array alphabetically before returning, so diagnostics output is deterministic across environments.\n\nThis challenge reflects practical keyed-diff analysis used in frontend rendering systems.',
    correctExplanation:
      'Vue keyed patch keeps shared keys, inserts new keys, removes missing keys, and may move retained keys. Compute set differences plus index change detection for common keys.',
    tests: [
      { input: [{ oldKeys: ['a', 'b', 'c'], newKeys: ['b', 'a', 'd'] }], expected: { insert: ['d'], remove: ['c'], move: ['a', 'b'] } },
      { input: [{ oldKeys: ['x'], newKeys: ['x'] }], expected: { insert: [], remove: [], move: [] } },
      { input: [{ oldKeys: [], newKeys: ['k'] }], expected: { insert: ['k'], remove: [], move: [] } },
    ],
  },
]

export default data
