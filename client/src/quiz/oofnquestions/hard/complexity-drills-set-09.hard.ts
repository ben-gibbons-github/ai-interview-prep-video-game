const data = [
  {
    id: 'hard-oofn-code-09-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total histogram bars.\n\n```ts\nfunction largestRectangleLinear(heights) {\n  // Case S09Q1\n  const st = [];\n  let best = 0;\n  for (let i = 0; i <= heights.length; i++) {\n    const h = i === heights.length ? 0 : heights[i];\n    while (st.length && heights[st[st.length - 1]] > h) {\n      const top = st.pop();\n      const left = st.length ? st[st.length - 1] + 1 : 0;\n      best = Math.max(best, heights[top] * (i - left));\n    }\n    st.push(i);\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each index is pushed and popped at most once from the stack, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-09-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total stream entries.\n\n```ts\nfunction nextGreaterElementsCircular(nums) {\n  // Case S09Q2\n  const n = nums.length;\n  const ans = new Array(n).fill(-1);\n  const st = [];\n  for (let i = 0; i < 2 * n; i++) {\n    const idx = i % n;\n    while (st.length && nums[st[st.length - 1]] < nums[idx]) {\n      ans[st.pop()] = nums[idx];\n    }\n    if (i < n) st.push(idx);\n  }\n  return ans;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Despite looping 2N times, each index is pushed/popped a bounded number of times, so O(N).',
  },
  {
    id: 'hard-oofn-code-09-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes in both lists.\n\n```ts\nfunction intersectLinkedHeads(a, b) {\n  // Case S09Q3\n  let p = a;\n  let q = b;\n  while (p !== q) {\n    p = p ? p.next : b;\n    q = q ? q.next : a;\n  }\n  return p;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each pointer traverses at most combined list lengths, yielding O(N) runtime.',
  },
  {
    id: 'hard-oofn-code-09-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total token count.\n\n```ts\nfunction collapsePathSegments(parts) {\n  // Case S09Q4\n  const st = [];\n  for (let i = 0; i < parts.length; i++) {\n    const p = parts[i];\n    if (p === "" || p === ".") continue;\n    if (p === "..") {\n      if (st.length) st.pop();\n    } else {\n      st.push(p);\n    }\n  }\n  return st;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Each segment is processed once with amortized O(1) stack operations, so O(N).',
  },
  {
    id: 'hard-oofn-code-09-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total vertices plus edges seen.\n\n```ts\nfunction detectCycleUndirected(start, adj) {\n  // Case S09Q5\n  const q = [[start, -1]];\n  let head = 0;\n  const seen = new Set([start]);\n  while (head < q.length) {\n    const [node, parent] = q[head++];\n    for (const nxt of adj[node]) {\n      if (nxt === parent) continue;\n      if (seen.has(nxt)) return true;\n      seen.add(nxt);\n      q.push([nxt, node]);\n    }\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'BFS-style traversal checks each reachable edge/node at most a constant number of times: O(N).',
  },
  {
    id: 'hard-oofn-code-09-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 09 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total matrix cells.\n\n```ts\nfunction spiralCollect(grid) {\n  // Case S09Q6\n  const out = [];\n  let top = 0, bottom = grid.length - 1;\n  let left = 0, right = grid[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) out.push(grid[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) out.push(grid[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) out.push(grid[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) out.push(grid[r][left]);\n      left++;\n    }\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every cell is appended exactly once, so runtime is linear in cell count: O(N).',
  },
]

export default data
