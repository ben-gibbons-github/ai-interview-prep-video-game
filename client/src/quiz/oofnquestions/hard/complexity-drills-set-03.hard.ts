const data = [
  {
    id: 'hard-oofn-code-03-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters in the text and pattern.\n\n```ts\nfunction kmpSearch(text, pattern) {\n  // Case S03Q1\n  const lps = buildLps(pattern);\n  let i = 0, j = 0;\n  while (i < text.length) {\n    if (text[i] === pattern[j]) {\n      i++;\n      j++;\n      if (j === pattern.length) return true;\n    } else if (j > 0) {\n      j = lps[j - 1];\n    } else {\n      i++;\n    }\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'KMP preprocessing plus search runs in linear time over combined input size, so O(N).',
  },
  {
    id: 'hard-oofn-code-03-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total graph size (V + E).\n\n```ts\nfunction bfsAll(start, adj) {\n  // Case S03Q2\n  const q = [start];\n  const seen = new Set([start]);\n  let head = 0;\n  while (head < q.length) {\n    const node = q[head++];\n    for (const nxt of adj[node]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      q.push(nxt);\n    }\n  }\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'BFS visits each vertex and edge at most once, which is O(V+E), represented here as O(N).',
  },
  {
    id: 'hard-oofn-code-03-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction minWindowWithDeque(nums, k) {\n  // Case S03Q3\n  const dq = [];\n  let head = 0;\n  const out = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (head < dq.length && dq[head] <= i - k) head++;\n    while (dq.length > head && nums[dq[dq.length - 1]] >= nums[i]) dq.pop();\n    dq.push(i);\n    if (i >= k - 1) out.push(nums[dq[head]]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 0,
    correctExplanation: 'Each index enters and leaves the deque at most once, so despite nested while loops total work is O(N).',
  },
  {
    id: 'hard-oofn-code-03-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction unionFindOps(parent, ops) {\n  // Case S03Q4\n  function find(x) {\n    while (parent[x] !== x) {\n      parent[x] = parent[parent[x]];\n      x = parent[x];\n    }\n    return x;\n  }\n\n  for (const [a, b] of ops) {\n    const ra = find(a);\n    const rb = find(b);\n    if (ra !== rb) parent[rb] = ra;\n  }\n}\n```\n\nWhat is the dominant Big-O time complexity (amortized, simplified)?',
    options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
    correctIndex: 2,
    correctExplanation: 'With path compression, a sequence of operations is near-linear; simplified dominant classification is O(N).',
  },
  {
    id: 'hard-oofn-code-03-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent the number of histogram bars.\n\n```ts\nfunction largestRectangle(heights) {\n  // Case S03Q5\n  const st = [];\n  let best = 0;\n  for (let i = 0; i <= heights.length; i++) {\n    const h = i === heights.length ? 0 : heights[i];\n    while (st.length && heights[st[st.length - 1]] > h) {\n      const top = st.pop();\n      const left = st.length ? st[st.length - 1] : -1;\n      best = Math.max(best, heights[top] * (i - left - 1));\n    }\n    st.push(i);\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every index is pushed once and popped once in the monotonic stack, so total runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-03-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 03 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total number of elements.\n\n```ts\nfunction zigzagMerge(a, b) {\n  // Case S03Q6\n  let i = 0, j = 0;\n  const out = [];\n  while (i < a.length || j < b.length) {\n    if (i < a.length) out.push(a[i++]);\n    if (j < b.length) out.push(b[j++]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Pointers i and j each move forward only, so total processed elements are linear in combined size: O(N).',
  },
]

export default data
