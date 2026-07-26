const data = [
  {
    id: 'hard-oofn-code-11-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total array positions touched.\n\n```ts\nfunction shortestSubarrayAtLeastTarget(nums, target) {\n  // Case S11Q1\n  let left = 0;\n  let sum = 0;\n  let best = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return Number.isFinite(best) ? best : -1;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each pointer advances forward at most N times total, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-11-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of nodes in traversed graph region.\n\n```ts\nfunction topoLayerCounts(adj) {\n  // Case S11Q2\n  const n = adj.length;\n  const indeg = new Array(n).fill(0);\n  for (let u = 0; u < n; u++) {\n    for (const v of adj[u]) indeg[v]++;\n  }\n  const q = [];\n  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);\n  let head = 0;\n  const layers = [];\n  while (head < q.length) {\n    const end = q.length;\n    let count = 0;\n    while (head < end) {\n      const u = q[head++];\n      count++;\n      for (const v of adj[u]) {\n        indeg[v]--;\n        if (indeg[v] === 0) q.push(v);\n      }\n    }\n    layers.push(count);\n  }\n  return layers;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'This Kahn-style traversal touches each node/edge in linear total work.',
  },
  {
    id: 'hard-oofn-code-11-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes in the tree.\n\n```ts\nfunction inorderIterativeValues(root) {\n  // Case S11Q3\n  const st = [];\n  const out = [];\n  let cur = root;\n  while (cur || st.length) {\n    while (cur) {\n      st.push(cur);\n      cur = cur.left;\n    }\n    cur = st.pop();\n    out.push(cur.val);\n    cur = cur.right;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each node is pushed and popped once, so total runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-11-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total tasks.\n\n```ts\nfunction executeWithCooldown(tasks, cooldown) {\n  // Case S11Q4\n  const q = [];\n  let time = 0;\n  for (let i = 0; i < tasks.length; i++) {\n    q.push([tasks[i], time + cooldown]);\n    while (q.length && q[0][1] <= time) q.shift();\n    time++;\n  }\n  while (q.length) {\n    time = Math.max(time + 1, q[0][1]);\n    q.shift();\n  }\n  return time;\n}\n```\n\nAssume queue front removal is O(1). What is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each task enters/leaves the queue once, so linear total work under the assumption.',
  },
  {
    id: 'hard-oofn-code-11-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total elements.\n\n```ts\nfunction circularPrefixPeaks(nums) {\n  // Case S11Q5\n  const n = nums.length;\n  const peaks = [];\n  for (let i = 0; i < n; i++) {\n    const prev = nums[(i - 1 + n) % n];\n    const next = nums[(i + 1) % n];\n    if (nums[i] > prev && nums[i] > next) peaks.push(i);\n  }\n  return peaks;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Each index is evaluated once with O(1) neighbor checks, giving O(N).',
  },
  {
    id: 'hard-oofn-code-11-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 11 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total intervals.\n\n```ts\nfunction intersectSortedIntervals(a, b) {\n  // Case S11Q6\n  const out = [];\n  let i = 0;\n  let j = 0;\n  while (i < a.length && j < b.length) {\n    const lo = Math.max(a[i][0], b[j][0]);\n    const hi = Math.min(a[i][1], b[j][1]);\n    if (lo <= hi) out.push([lo, hi]);\n    if (a[i][1] < b[j][1]) i++;\n    else j++;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Two pointers each move forward at most once per interval, so total is O(N).',
  },
]

export default data
