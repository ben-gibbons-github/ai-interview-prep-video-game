const data = [
  {
    id: 'medium-oofn-code-09-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total items.\n\n```ts\nfunction dedupePreserveOrder(items) {\n  // Case S09Q1\n  const seen = new Set();\n  const out = [];\n  for (let i = 0; i < items.length; i++) {\n    if (seen.has(items[i])) continue;\n    seen.add(items[i]);\n    out.push(items[i]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Average O(1) set operations in one pass gives overall O(N).',
  },
  {
    id: 'medium-oofn-code-09-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of queries.\n\n```ts\nfunction runningBalance(changes) {\n  // Case S09Q2\n  const out = new Array(changes.length);\n  let bal = 0;\n  for (let i = 0; i < changes.length; i++) {\n    bal += changes[i];\n    out[i] = bal;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'The array is processed once from left to right, so complexity is O(N).',
  },
  {
    id: 'medium-oofn-code-09-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of packets.\n\n```ts\nfunction maxBurstWindow(nums, k) {\n  // Case S09Q3\n  if (k <= 0 || k > nums.length) return 0;\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let best = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    if (sum > best) best = sum;\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Window initialization plus one linear slide is O(N).',
  },
  {
    id: 'medium-oofn-code-09-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of symbols.\n\n```ts\nfunction nearestDistinctGap(arr) {\n  // Case S09Q4\n  const last = new Map();\n  let best = Infinity;\n  for (let i = 0; i < arr.length; i++) {\n    if (last.has(arr[i])) best = Math.min(best, i - last.get(arr[i]));\n    last.set(arr[i], i);\n  }\n  return Number.isFinite(best) ? best : -1;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One pass with average O(1) map operations gives O(N) overall.',
  },
  {
    id: 'medium-oofn-code-09-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total graph frontier expansions.\n\n```ts\nfunction bfsDistance(start, adj) {\n  // Case S09Q5\n  const q = [start];\n  let head = 0;\n  const dist = new Map([[start, 0]]);\n  while (head < q.length) {\n    const node = q[head++];\n    const d = dist.get(node);\n    for (const nxt of adj[node]) {\n      if (dist.has(nxt)) continue;\n      dist.set(nxt, d + 1);\n      q.push(nxt);\n    }\n  }\n  return dist;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'BFS visits reachable nodes and edges once, represented here as O(N).',
  },
  {
    id: 'medium-oofn-code-09-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 09 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent command count.\n\n```ts\nfunction validateParentheses(s) {\n  // Case S09Q6\n  const st = [];\n  for (let i = 0; i < s.length; i++) {\n    const ch = s[i];\n    if (ch === "(" || ch === "{" || ch === "[") st.push(ch);\n    else {\n      if (!st.length) return false;\n      const top = st.pop();\n      if ((ch === ")" && top !== "(") || (ch === "}" && top !== "{") || (ch === "]" && top !== "[")) return false;\n    }\n  }\n  return st.length === 0;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each character is pushed/popped at most once, so total work is O(N).',
  },
]

export default data
