const data = [
  {
    id: 'hard-oofn-code-07-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of readings.\n\n```ts\nfunction nearestGreaterToLeft(nums) {\n  // Case S07Q1\n  const st = [];\n  const ans = new Array(nums.length).fill(-1);\n  for (let i = 0; i < nums.length; i++) {\n    while (st.length && st[st.length - 1] <= nums[i]) st.pop();\n    if (st.length) ans[i] = st[st.length - 1];\n    st.push(nums[i]);\n  }\n  return ans;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each value is pushed once and popped at most once from the monotonic stack, yielding O(N).',
  },
  {
    id: 'hard-oofn-code-07-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total jobs.\n\n```ts\nfunction scheduleByArrival(arrivals) {\n  // Case S07Q2\n  const q = [];\n  let time = 0;\n  for (let i = 0; i < arrivals.length; i++) {\n    const job = arrivals[i];\n    if (job.start > time) time = job.start;\n    q.push(job);\n    while (q.length && q[0].start <= time) {\n      const cur = q.shift();\n      time += cur.duration;\n    }\n  }\n  while (q.length) time += q.shift().duration;\n  return time;\n}\n```\n\nWhat is the dominant Big-O time complexity assuming dequeue is O(1)?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each job is enqueued and dequeued once, with bounded constant work per job, so O(N).',
  },
  {
    id: 'hard-oofn-code-07-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of commands.\n\n```ts\nfunction undoableTextReplay(commands) {\n  // Case S07Q3\n  const text = [];\n  const history = [];\n  for (let i = 0; i < commands.length; i++) {\n    const c = commands[i];\n    if (c.type === "append") {\n      text.push(c.ch);\n      history.push(c);\n    } else if (c.type === "delete" && text.length) {\n      const ch = text.pop();\n      history.push({ type: "restore", ch });\n    } else if (c.type === "undo" && history.length) {\n      const last = history.pop();\n      if (last.type === "append" && text.length) text.pop();\n      else if (last.type === "restore") text.push(last.ch);\n    }\n  }\n  return text.join("");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each command performs O(1) stack/array operations, so processing N commands is O(N).',
  },
  {
    id: 'hard-oofn-code-07-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total matrix cells.\n\n```ts\nfunction diagonalChecksum(matrix) {\n  // Case S07Q4\n  let sum = 0;\n  for (let r = 0; r < matrix.length; r++) {\n    for (let c = 0; c < matrix[r].length; c++) {\n      if (r === c || r + c === matrix.length - 1) {\n        sum += matrix[r][c];\n      }\n    }\n  }\n  return sum;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every cell is checked exactly once, so runtime is linear in total cells, modeled as O(N).',
  },
  {
    id: 'hard-oofn-code-07-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total edges across all queried nodes.\n\n```ts\nfunction indegreeZeroQueue(adj) {\n  // Case S07Q5\n  const n = adj.length;\n  const indeg = new Array(n).fill(0);\n  for (let u = 0; u < n; u++) {\n    for (const v of adj[u]) indeg[v]++;\n  }\n\n  const q = [];\n  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);\n\n  let processed = 0;\n  let head = 0;\n  while (head < q.length) {\n    const u = q[head++];\n    processed++;\n    for (const v of adj[u]) {\n      indeg[v]--;\n      if (indeg[v] === 0) q.push(v);\n    }\n  }\n\n  return processed;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'This is Kahn-style linear traversal over vertices and edges, represented as O(N).',
  },
  {
    id: 'hard-oofn-code-07-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 07 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total tokens.\n\n```ts\nfunction evalReversePolish(tokens) {\n  // Case S07Q6\n  const st = [];\n  for (let i = 0; i < tokens.length; i++) {\n    const t = tokens[i];\n    if (t === "+" || t === "-" || t === "*" || t === "/") {\n      const b = st.pop();\n      const a = st.pop();\n      if (t === "+") st.push(a + b);\n      else if (t === "-") st.push(a - b);\n      else if (t === "*") st.push(a * b);\n      else st.push(Math.trunc(a / b));\n    } else {\n      st.push(Number(t));\n    }\n  }\n  return st[0];\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Each token is consumed once with constant-time stack operations, so runtime is O(N).',
  },
]

export default data
