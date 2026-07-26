const data = [
  {
    id: 'medium-oofn-code-08-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total prices.\n\n```ts\nfunction spanFromLeft(prices) {\n  // Case S08Q1\n  const span = new Array(prices.length).fill(1);\n  const st = [];\n  for (let i = 0; i < prices.length; i++) {\n    while (st.length && prices[st[st.length - 1]] <= prices[i]) st.pop();\n    span[i] = st.length === 0 ? i + 1 : i - st[st.length - 1];\n    st.push(i);\n  }\n  return span;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Indices are pushed and popped at most once from the monotonic stack, so runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-08-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of entries.\n\n```ts\nfunction compressSortedPairs(arr) {\n  // Case S08Q2\n  if (arr.length === 0) return [];\n  const out = [[arr[0], 1]];\n  for (let i = 1; i < arr.length; i++) {\n    const last = out[out.length - 1];\n    if (last[0] === arr[i]) last[1]++;\n    else out.push([arr[i], 1]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'The algorithm performs one forward scan with O(1) updates per element, so O(N).',
  },
  {
    id: 'medium-oofn-code-08-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent command count.\n\n```ts\nfunction evaluateSimplePath(commands) {\n  // Case S08Q3\n  let x = 0;\n  let y = 0;\n  for (let i = 0; i < commands.length; i++) {\n    const c = commands[i];\n    if (c === "U") y++;\n    else if (c === "D") y--;\n    else if (c === "L") x--;\n    else if (c === "R") x++;\n  }\n  return [x, y];\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each command is processed once with constant work, so runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-08-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of bars.\n\n```ts\nfunction trapPrefixSuffix(height) {\n  // Case S08Q4\n  const n = height.length;\n  const left = new Array(n);\n  const right = new Array(n);\n  let best = 0;\n  for (let i = 0; i < n; i++) {\n    best = Math.max(best, height[i]);\n    left[i] = best;\n  }\n  best = 0;\n  for (let i = n - 1; i >= 0; i--) {\n    best = Math.max(best, height[i]);\n    right[i] = best;\n  }\n  let water = 0;\n  for (let i = 0; i < n; i++) water += Math.min(left[i], right[i]) - height[i];\n  return water;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Three linear passes over arrays still sum to O(N).',
  },
  {
    id: 'medium-oofn-code-08-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes reached.\n\n```ts\nfunction breadthLevels(root) {\n  // Case S08Q5\n  if (!root) return 0;\n  const q = [root];\n  let head = 0;\n  let levels = 0;\n  while (head < q.length) {\n    const levelEnd = q.length;\n    while (head < levelEnd) {\n      const node = q[head++];\n      if (node.left) q.push(node.left);\n      if (node.right) q.push(node.right);\n    }\n    levels++;\n  }\n  return levels;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Each node is enqueued/dequeued once, so total runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-08-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 08 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent stream size.\n\n```ts\nfunction firstUniquePrefix(stream) {\n  // Case S08Q6\n  const count = new Map();\n  const order = [];\n  for (let i = 0; i < stream.length; i++) {\n    const x = stream[i];\n    count.set(x, (count.get(x) ?? 0) + 1);\n    order.push(x);\n    while (order.length && (count.get(order[0]) ?? 0) > 1) order.shift();\n  }\n  return order.length ? order[0] : null;\n}\n```\n\nWhat is the dominant Big-O time complexity assuming queue front removal is O(1)?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each item enters and leaves the queue at most once with O(1) map ops, so O(N).',
  },
]

export default data
