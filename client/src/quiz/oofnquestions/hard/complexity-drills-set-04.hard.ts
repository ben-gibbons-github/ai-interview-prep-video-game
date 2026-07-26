const data = [
  {
    id: 'hard-oofn-code-04-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total graph size (V + E).\n\n```ts\nfunction topoSortKahnLinear(adj, indegree) {\n  // Case S04Q1\n  const q = [];\n  for (let i = 0; i < indegree.length; i++) {\n    if (indegree[i] === 0) q.push(i);\n  }\n\n  let head = 0;\n  const order = [];\n  while (head < q.length) {\n    const node = q[head++];\n    order.push(node);\n    for (const nxt of adj[node]) {\n      indegree[nxt]--;\n      if (indegree[nxt] === 0) q.push(nxt);\n    }\n  }\n\n  return order;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each vertex is enqueued once and each edge is processed once, so runtime is O(V+E), represented as O(N).',
  },
  {
    id: 'hard-oofn-code-04-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction trapRainWithTwoPointers(height) {\n  // Case S04Q2\n  let left = 0;\n  let right = height.length - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let water = 0;\n\n  while (left < right) {\n    if (height[left] < height[right]) {\n      leftMax = Math.max(leftMax, height[left]);\n      water += leftMax - height[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, height[right]);\n      water += rightMax - height[right];\n      right--;\n    }\n  }\n\n  return water;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Left and right pointers move inward once each, so total runtime is linear: O(N).',
  },
  {
    id: 'hard-oofn-code-04-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes in the tree.\n\n```ts\nfunction invertTreeIterative(root) {\n  // Case S04Q3\n  if (!root) return null;\n  const q = [root];\n  let head = 0;\n\n  while (head < q.length) {\n    const node = q[head++];\n    const t = node.left;\n    node.left = node.right;\n    node.right = t;\n\n    if (node.left) q.push(node.left);\n    if (node.right) q.push(node.right);\n  }\n\n  return root;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each node is dequeued and swapped exactly once, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-04-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters in the expression.\n\n```ts\nfunction simplifyPathLinear(parts) {\n  // Case S04Q4\n  const st = [];\n  for (let i = 0; i < parts.length; i++) {\n    const token = parts[i];\n    if (token === \"\" || token === \".\") continue;\n    if (token === \"..\") {\n      if (st.length) st.pop();\n    } else {\n      st.push(token);\n    }\n  }\n  return \"/\" + st.join(\"/\");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each token is pushed or popped at most once, so total stack processing is O(N).',
  },
  {
    id: 'hard-oofn-code-04-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction firstGreaterOnRight(nums) {\n  // Case S04Q5\n  const out = new Array(nums.length).fill(-1);\n  const st = [];\n\n  for (let i = nums.length - 1; i >= 0; i--) {\n    while (st.length && st[st.length - 1] <= nums[i]) st.pop();\n    out[i] = st.length ? st[st.length - 1] : -1;\n    st.push(nums[i]);\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each element is pushed once and popped at most once from the stack, so total runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-04-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 04 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of intervals.\n\n```ts\nfunction mergeAlreadySortedIntervals(intervals) {\n  // Case S04Q6\n  if (intervals.length === 0) return [];\n\n  const out = [intervals[0].slice()];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = out[out.length - 1];\n    const cur = intervals[i];\n    if (cur[0] <= last[1]) {\n      last[1] = Math.max(last[1], cur[1]);\n    } else {\n      out.push(cur.slice());\n    }\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Given intervals are already sorted, one pass merges them in O(N).',
  },
]

export default data
