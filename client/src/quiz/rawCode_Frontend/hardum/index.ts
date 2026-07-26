import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-frontend-hard-form-errors-0001',
    difficulty: 'hard',
    prompt:
      'Frontend Coding Challenge (Form Validation Errors)\n\nYou are implementing a signup form validator for a production auth flow. The UI renders inline field errors and needs a deterministic error object every time the user edits input. The validation pass should evaluate all fields independently so the user can see every problem at once rather than one-at-a-time failures.\n\nImplement `solve(input)` where `input.values = { email: string, password: string, confirm: string }`. Return an object shaped like `{ email?: string, password?: string, confirm?: string }` that only contains keys for failing fields.\n\nValidation rules:\n- `email` is valid only if it contains both `@` and `.`\n- `password` must have length >= 8\n- `confirm` must exactly equal `password`\n\nUse the expected error messages from tests. If a field is valid, omit it from the returned object entirely. This mirrors common frontend form state management patterns.',
    correctExplanation:
      'Validate each field independently and build an errors object that only contains failing keys. Email is valid only when it contains both "@" and ".". Password must be at least 8 characters long. Confirm must exactly match password. If a field passes, omit it from the result. For example, { email: "invalid-email", password: "short", confirm: "shorter" } should return { email: "Invalid email", password: "Password must be at least 8 characters", confirm: "Passwords do not match" }.',
    tests: [
      { input: [{ values: { email: 'a@b.com', password: 'password1', confirm: 'password1' } }], expected: {} },
      { input: [{ values: { email: 'invalid-email', password: 'short', confirm: 'shorter' } }], expected: { email: 'Invalid email', password: 'Password must be at least 8 characters', confirm: 'Passwords do not match' } },
      { input: [{ values: { email: 'dev@site.io', password: '12345678', confirm: '12345678' } }], expected: {} },
    ],
  },
  {
    id: 'raw-coding-frontend-hard-request-state-machine-0002',
    difficulty: 'hard',
    prompt:
      'Frontend Coding Challenge (Request State Machine)\n\nYou are building request state logic for a data panel in a frontend dashboard. To avoid impossible UI states (like showing success without a fetch), the screen uses a strict finite-state machine. Event logs are replayed during tests, and your reducer must produce the same final state every time.\n\nImplement `solve(input)` where `input.events` is an ordered array of event names. Initial state is `IDLE`. Allowed transitions are:\n- `FETCH` -> `LOADING` from `IDLE`, `ERROR`, or `SUCCESS`\n- `RESOLVE` -> `SUCCESS` only from `LOADING`\n- `REJECT` -> `ERROR` only from `LOADING`\n- `RESET` -> `IDLE` from any state\n\nApply events sequentially, ignore invalid transitions (leave state unchanged), and return the final state string.',
    correctExplanation:
      'Simulate the finite-state machine strictly. Ignore invalid transitions (state unchanged). Apply events sequentially and return the final state. Deterministic state machines help prevent impossible UI states.',
    tests: [
      { input: [{ events: ['FETCH', 'RESOLVE'] }], expected: 'SUCCESS' },
      { input: [{ events: ['FETCH', 'REJECT', 'FETCH', 'RESOLVE'] }], expected: 'SUCCESS' },
      { input: [{ events: ['RESOLVE', 'RESET'] }], expected: 'IDLE' },
    ],
  },
  {
    id: 'raw-coding-frontend-hard-table-filter-sort-0003',
    difficulty: 'hard',
    prompt:
      'Frontend Coding Challenge (Filter + Sort Rows)\n\nYou are implementing the transformation pipeline behind a leaderboard table component. Product requirements are explicit: first apply score filtering, then apply deterministic sorting so rerenders are stable across browsers, then project only row IDs for downstream rendering.\n\nImplement `solve(input)` where `input.rows` is an array of `{ id, name, score }` records and `input.minScore` is the cutoff. Keep only rows with `score >= minScore`. Sort remaining rows by `score` descending, and for score ties sort by `name` ascending (alphabetical).\n\nReturn an array of `id` values in the exact resulting order. Perform the operations in that order: filter -> sort -> map to IDs.',
    correctExplanation:
      'Apply filter first, then stable deterministic sort with score descending and name ascending tie-break. Finally project to ids. This mirrors many client table pipelines.',
    tests: [
      { input: [{ rows: [{ id: '1', name: 'Bob', score: 80 }, { id: '2', name: 'Ada', score: 80 }, { id: '3', name: 'Zo', score: 70 }], minScore: 75 }], expected: ['2', '1'] },
      { input: [{ rows: [{ id: 'a', name: 'A', score: 50 }], minScore: 60 }], expected: [] },
      { input: [{ rows: [], minScore: 0 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-frontend-hard-preference-merge-0004',
    difficulty: 'hard',
    prompt:
      'Frontend Coding Challenge (Preference Merge)\n\nYou are building a settings panel where final UI configuration is derived from baseline defaults plus user-level overrides loaded from storage. The merge must be immutable and predictable, because other components memoize based on object identity and exact key presence.\n\nImplement `solve(input)` where:\n- `input.defaults: Record<string, string>` is the base settings map\n- `input.overrides: Record<string, string | null>` is the patch map\n\nReturn a new merged object following these rules:\n- Start from defaults\n- Apply override keys in override object order\n- If override value is a string, set/replace that key\n- If override value is `null`, remove that key from the result entirely\n\nDo not mutate inputs. The output should represent the exact settings snapshot the frontend would use to render the preferences UI.',
    correctExplanation:
      'Clone the defaults first so the input is not mutated. Then walk the override entries. String values overwrite or create keys. Null values delete keys from the result. Because the output is a plain object, the final shape should reflect only the merged preferences that remain after removals.',
    tests: [
      { input: [{ defaults: { theme: 'light', density: 'cozy' }, overrides: { theme: 'dark' } }], expected: { theme: 'dark', density: 'cozy' } },
      { input: [{ defaults: { theme: 'light', locale: 'en' }, overrides: { locale: null, accent: 'blue' } }], expected: { theme: 'light', accent: 'blue' } },
      { input: [{ defaults: {}, overrides: {} }], expected: {} },
    ],
  },
  {
    id: 'raw-coding-frontend-hard-react-useeffect-cleanup-0005',
    difficulty: 'hard',
    prompt:
      'React Coding Challenge (Effect Cleanup Count)\n\nYou are writing an interview simulator question about React effect lifecycles. Candidates often confuse when cleanup runs, so your task is to compute the exact number of cleanup executions from a simplified lifecycle description.\n\nImplement `solve(input)` where `input = { mounts: number, dependencyChanges: number, unmounts: number }`, assuming one component instance lifecycle path. The effect executes on mount and after each dependency change. Cleanup behavior is:\n- Before every effect re-run caused by a dependency change, previous cleanup runs once\n- On unmount, latest cleanup runs once\n\nReturn the total number of cleanup executions. Treat transitions as deterministic lifecycle events, not asynchronous race conditions.',
    correctExplanation:
      'Cleanup count equals dependencyChanges (before each rerun) plus unmount cleanup if component unmounts at least once. For one lifecycle path with mount and optional unmount, compute deterministic total.',
    tests: [
      { input: [{ mounts: 1, dependencyChanges: 3, unmounts: 1 }], expected: 4 },
      { input: [{ mounts: 1, dependencyChanges: 0, unmounts: 1 }], expected: 1 },
      { input: [{ mounts: 1, dependencyChanges: 2, unmounts: 0 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-frontend-hard-vue-computed-cache-0006',
    difficulty: 'hard',
    prompt:
      'Vue Coding Challenge (Computed Cache Invalidation)\n\nYou are modeling computed-property caching for a Vue-like reactive system. The computed value is lazy: it only recomputes when first accessed or when cache has been invalidated. This question tests whether you can simulate cache validity over a read timeline with explicit invalidation points.\n\nImplement `solve(input)` where:\n- `input.reads: string[]` represents ordered read attempts\n- `input.dirtyAfterReadIndexes: number[]` lists read indices after which the cache becomes dirty\n\nRules:\n- First read computes once\n- Reads reuse cache while valid\n- If cache is dirtied after read index `i`, then the next read recomputes\n\nReturn total compute executions across all reads.',
    correctExplanation:
      'Track whether cache is valid. First read always computes. When dirtied, invalidate cache so next read recomputes. Count compute events across reads.',
    tests: [
      { input: [{ reads: ['r0', 'r1', 'r2', 'r3'], dirtyAfterReadIndexes: [1] }], expected: 2 },
      { input: [{ reads: ['r0', 'r1'], dirtyAfterReadIndexes: [] }], expected: 1 },
      { input: [{ reads: ['r0', 'r1', 'r2'], dirtyAfterReadIndexes: [0, 1] }], expected: 3 },
    ],
  },
]

export default data
