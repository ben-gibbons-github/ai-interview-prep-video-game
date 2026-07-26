const data = [
  {
    id: 'hard-oofn-code-08-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes plus edges explored.\n\n```ts\nfunction topoOrderKahn(adj) {\n  // Case S08Q1\n  const n = adj.length;\n  const indeg = new Array(n).fill(0);\n  for (let u = 0; u < n; u++) {\n    for (const v of adj[u]) indeg[v]++;\n  }\n  const q = [];\n  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);\n  let head = 0;\n  const out = [];\n  while (head < q.length) {\n    const u = q[head++];\n    out.push(u);\n    for (const v of adj[u]) {\n      indeg[v]--;\n      if (indeg[v] === 0) q.push(v);\n    }\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Kahn traversal touches each node/edge a constant number of times, modeled as O(N).',
  },
  {
    id: 'hard-oofn-code-08-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of values.\n\n```ts\nfunction nearestSmallerRight(values) {\n  // Case S08Q2\n  const ans = new Array(values.length).fill(-1);\n  const st = [];\n  for (let i = values.length - 1; i >= 0; i--) {\n    while (st.length && st[st.length - 1] >= values[i]) st.pop();\n    if (st.length) ans[i] = st[st.length - 1];\n    st.push(values[i]);\n  }\n  return ans;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each element is pushed and popped at most once from the stack, so O(N).',
  },
  {
    id: 'hard-oofn-code-08-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of characters.\n\n```ts\nfunction longestValidParenLinear(s) {\n  // Case S08Q3\n  const st = [-1];\n  let best = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === "(") st.push(i);\n    else {\n      st.pop();\n      if (st.length === 0) st.push(i);\n      else best = Math.max(best, i - st[st.length - 1]);\n    }\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Single pass plus stack operations that are amortized O(1) per char gives O(N).',
  },
  {
    id: 'hard-oofn-code-08-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total intervals.\n\n```ts\nfunction removeCovered(sortedIntervals) {\n  // Case S08Q4\n  let kept = 0;\n  let maxEnd = -Infinity;\n  for (let i = 0; i < sortedIntervals.length; i++) {\n    const end = sortedIntervals[i][1];\n    if (end > maxEnd) {\n      kept++;\n      maxEnd = end;\n    }\n  }\n  return kept;\n}\n```\n\nWhat is the dominant Big-O time complexity when intervals are already sorted by start asc, end desc?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Given sorted input, one sweep is enough, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-08-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of tokens.\n\n```ts\nfunction simplifyUnixPath(parts) {\n  // Case S08Q5\n  const st = [];\n  for (let i = 0; i < parts.length; i++) {\n    const p = parts[i];\n    if (p === "" || p === ".") continue;\n    if (p === "..") {\n      if (st.length) st.pop();\n    } else {\n      st.push(p);\n    }\n  }\n  return "/" + st.join("/");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Each token is handled once with O(1) stack ops, so total runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-08-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 08 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes visited.\n\n```ts\nfunction zigzagByDeque(root) {\n  // Case S08Q6\n  if (!root) return [];\n  const q = [root];\n  let head = 0;\n  const out = [];\n  let leftToRight = true;\n  while (head < q.length) {\n    const size = q.length - head;\n    const row = new Array(size);\n    for (let i = 0; i < size; i++) {\n      const node = q[head++];\n      const idx = leftToRight ? i : size - 1 - i;\n      row[idx] = node.val;\n      if (node.left) q.push(node.left);\n      if (node.right) q.push(node.right);\n    }\n    out.push(row);\n    leftToRight = !leftToRight;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each tree node is visited once and placed once, resulting in O(N).',
  },
]

export default data
