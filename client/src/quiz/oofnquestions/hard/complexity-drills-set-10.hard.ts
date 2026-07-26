const data = [
  {
    id: 'hard-oofn-code-10-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes visited.\n\n```ts\nfunction binaryTreeRightSideView(root) {\n  // Case S10Q1\n  if (!root) return [];\n  const q = [root];\n  let head = 0;\n  const out = [];\n  while (head < q.length) {\n    const levelEnd = q.length;\n    let rightMost = null;\n    while (head < levelEnd) {\n      const node = q[head++];\n      rightMost = node.val;\n      if (node.left) q.push(node.left);\n      if (node.right) q.push(node.right);\n    }\n    out.push(rightMost);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each tree node is enqueued and visited once, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-10-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total bits in the integer representation.\n\n```ts\nfunction bitCountShift(n) {\n  // Case S10Q2\n  let bits = 0;\n  while (n > 0) {\n    bits += n & 1;\n    n >>>= 1;\n  }\n  return bits;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'The loop runs once per bit position, so runtime is O(log n) in the integer value, i.e. O(N) in bit-length.',
  },
  {
    id: 'hard-oofn-code-10-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total values processed.\n\n```ts\nfunction maxSlidingWindowFirst(nums, k) {\n  // Case S10Q3\n  if (k <= 0 || k > nums.length) return [];\n  const out = [];\n  const dq = [];\n  let head = 0;\n  for (let i = 0; i < nums.length; i++) {\n    while (head < dq.length && dq[dq.length - 1] <= nums[i]) dq.pop();\n    dq.push(nums[i]);\n    if (i >= k - 1) {\n      out.push(dq[head]);\n      if (nums[i - k + 1] === dq[head]) head++;\n    }\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Monotonic deque operations are amortized O(1) per element, so O(N).',
  },
  {
    id: 'hard-oofn-code-10-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total edges explored.\n\n```ts\nfunction markReachableCycles(start, adj) {\n  // Case S10Q4\n  const st = [[start, 0]];\n  const seen = new Set();\n  while (st.length) {\n    const [node, state] = st.pop();\n    if (state === 0) {\n      if (seen.has(node)) continue;\n      seen.add(node);\n      st.push([node, 1]);\n      for (const nxt of adj[node]) st.push([nxt, 0]);\n    }\n  }\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each node/edge is pushed a bounded number of times in a traversal-like process, so O(N).',
  },
  {
    id: 'hard-oofn-code-10-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total tokens.\n\n```ts\nfunction parseAndReduce(tokens) {\n  // Case S10Q5\n  const st = [];\n  for (let i = 0; i < tokens.length; i++) {\n    const t = tokens[i];\n    if (t === "+" || t === "-" || t === "*" || t === "/") {\n      const b = st.pop();\n      const a = st.pop();\n      st.push(0);\n      if (t === "+") st[st.length - 1] = a + b;\n      else if (t === "-") st[st.length - 1] = a - b;\n      else if (t === "*") st[st.length - 1] = a * b;\n      else st[st.length - 1] = Math.trunc(a / b);\n    } else {\n      st.push(Number(t));\n    }\n  }\n  return st[0];\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each token triggers constant work, so processing tokens is linear.',
  },
  {
    id: 'hard-oofn-code-10-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 10 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total matrix cells.\n\n```ts\nfunction floodFillCount(grid, sr, sc, target) {\n  // Case S10Q6\n  const rows = grid.length;\n  const cols = grid[0].length;\n  const q = [[sr, sc]];\n  let head = 0;\n  let filled = 0;\n  while (head < q.length) {\n    const [r, c] = q[head++];\n    if (r < 0 || c < 0 || r >= rows || c >= cols) continue;\n    if (grid[r][c] !== target) continue;\n    grid[r][c] = null;\n    filled++;\n    q.push([r + 1, c]);\n    q.push([r - 1, c]);\n    q.push([r, c + 1]);\n    q.push([r, c - 1]);\n  }\n  return filled;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each cell can be processed a bounded number of times, so total runtime is linear in grid size.',
  },
]

export default data
