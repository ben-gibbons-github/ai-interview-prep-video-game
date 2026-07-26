import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-frontend-easy-toggle-map-0001',
    difficulty: 'easy',
    prompt:
      'Frontend Coding Challenge (Toggle Selection Map)\n\nImplement solve(input) where input = { selected: Record<string, boolean>, id: string }. Toggle selected[id] and return a new map.',
    correctExplanation:
      'Do not mutate the input object. Make a shallow copy of the selected map, flip the boolean for the requested id, and return the new object. If the id is missing, treat its current value as false so the toggle becomes true. Example: { a: true, b: false } with id="b" returns { a: true, b: true }, and an empty map with id="x" returns { x: true }.',
    tests: [
      { input: [{ selected: { a: true, b: false }, id: 'b' }], expected: { a: true, b: true } },
      { input: [{ selected: { a: true }, id: 'a' }], expected: { a: false } },
      { input: [{ selected: {}, id: 'x' }], expected: { x: true } },
    ],
  },
  {
    id: 'raw-coding-frontend-easy-dirty-fields-0002',
    difficulty: 'easy',
    prompt:
      'Frontend Coding Challenge (Dirty Field Keys)\n\nImplement solve(input) where input = { initial: Record<string, string>, current: Record<string, string> }. Return sorted string[] of keys whose values changed.',
    correctExplanation:
      'Take union of keys from initial and current, compare value by key, and keep keys where values differ. Sort keys ascending for deterministic output.',
    tests: [
      { input: [{ initial: { name: 'Ada', city: 'SF' }, current: { name: 'Ada', city: 'NYC' } }], expected: ['city'] },
      { input: [{ initial: { a: '1' }, current: { a: '2', b: '3' } }], expected: ['a', 'b'] },
      { input: [{ initial: {}, current: {} }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-frontend-easy-classname-join-0003',
    difficulty: 'easy',
    prompt:
      'Frontend Coding Challenge (Join Class Names)\n\nImplement solve(input) where input = (string | false | null | undefined)[] and return a single space-joined class string of truthy string values.',
    correctExplanation:
      'Filter values to strings that are not empty after trim, then join with single spaces. Ignore false/null/undefined. This mirrors a lightweight classnames helper.',
    tests: [
      { input: [['btn', false, 'primary', null, '']], expected: 'btn primary' },
      { input: [[undefined, 'card', 'highlight']], expected: 'card highlight' },
      { input: [[false, null, undefined]], expected: '' },
    ],
  },
  {
    id: 'raw-coding-frontend-easy-visible-badge-count-0004',
    difficulty: 'easy',
    prompt:
      'Frontend Coding Challenge (Visible Badge Count)\n\nYou are rendering a compact toolbar where only enabled items should display a count badge.\n\nImplement solve(input) where input = { items: { enabled: boolean, count: number }[] }.\n\nReturn the total count of all items where enabled is true. Disabled items contribute nothing, even if their count is large.\n\nThis is a simple filtering-and-summing task that mirrors a tiny UI aggregation step.',
    correctExplanation:
      'Iterate through the list and add count only when enabled is true. Ignore disabled items entirely. If the input array is empty, return 0. The key idea is to filter by enabled state before summing counts.',
    tests: [
      { input: [{ items: [{ enabled: true, count: 2 }, { enabled: false, count: 10 }, { enabled: true, count: 3 }] }], expected: 5 },
      { input: [{ items: [{ enabled: false, count: 100 }] }], expected: 0 },
      { input: [{ items: [] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-frontend-easy-react-usememo-deps-0005',
    difficulty: 'easy',
    prompt:
      'React Coding Challenge (useMemo Dependency Change)\n\nImplement solve(input) where input = { prevDeps: unknown[], nextDeps: unknown[] }. Return true if React useMemo/useEffect would re-run because at least one dependency changed by Object.is semantics; otherwise false.',
    correctExplanation:
      'React compares dependencies positionally using Object.is. If array lengths differ or any slot fails Object.is equality, the memo/effect reruns. Otherwise it does not.',
    tests: [
      { input: [{ prevDeps: [1, 'a', true], nextDeps: [1, 'a', true] }], expected: false },
      { input: [{ prevDeps: [1, 2], nextDeps: [1, 3] }], expected: true },
      { input: [{ prevDeps: [1], nextDeps: [1, 2] }], expected: true },
    ],
  },
  {
    id: 'raw-coding-frontend-easy-vue-class-binding-0006',
    difficulty: 'easy',
    prompt:
      'Vue Coding Challenge (Class Binding Object)\n\nImplement solve(input) where input = Record<string, boolean>. Return a sorted string[] containing keys whose value is true. This mirrors Vue :class object binding behavior where truthy keys become active classes.',
    correctExplanation:
      'Vue object class bindings include keys with truthy values. Filter true keys and sort for deterministic output.',
    tests: [
      { input: [{ active: true, disabled: false, large: true }], expected: ['active', 'large'] },
      { input: [{ a: false, b: false }], expected: [] },
      { input: [{}], expected: [] },
    ],
  },
]

export default data
