const data = [
  {
    id: 'medium-oofn-code-07-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of values.\n\n```ts\nfunction dedupeSorted(nums) {\n  // Case S07Q1\n  if (nums.length === 0) return [];\n  const out = [nums[0]];\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] !== nums[i - 1]) out.push(nums[i]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The sorted list is scanned once and each item causes O(1) work, so O(N).',
  },
  {
    id: 'medium-oofn-code-07-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total list nodes.\n\n```ts\nfunction mergeTwoSortedListsLinear(a, b) {\n  // Case S07Q2\n  const out = [];\n  let i = 0;\n  let j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) out.push(a[i++]);\n    else out.push(b[j++]);\n  }\n  while (i < a.length) out.push(a[i++]);\n  while (j < b.length) out.push(b[j++]);\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every element from both inputs is copied exactly once, producing O(N).',
  },
  {
    id: 'medium-oofn-code-07-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent stream length.\n\n```ts\nfunction longestOnesRun(bits) {\n  // Case S07Q3\n  let best = 0;\n  let cur = 0;\n  for (let i = 0; i < bits.length; i++) {\n    if (bits[i] === 1) {\n      cur++;\n      if (cur > best) best = cur;\n    } else {\n      cur = 0;\n    }\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'One forward pass with constant updates gives linear runtime O(N).',
  },
  {
    id: 'medium-oofn-code-07-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of operations.\n\n```ts\nfunction processStackOps(ops) {\n  // Case S07Q4\n  const st = [];\n  for (let i = 0; i < ops.length; i++) {\n    const op = ops[i];\n    if (op.type === "push") st.push(op.value);\n    else if (op.type === "pop" && st.length) st.pop();\n    else if (op.type === "dup" && st.length) st.push(st[st.length - 1]);\n  }\n  return st.length;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each operation is handled once with O(1) stack work, so total runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-07-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of terms.\n\n```ts\nfunction prefixProducts(nums) {\n  // Case S07Q5\n  const out = new Array(nums.length);\n  let prod = 1;\n  for (let i = 0; i < nums.length; i++) {\n    prod *= nums[i];\n    out[i] = prod;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'It performs a single scan storing prefix values, so complexity is O(N).',
  },
  {
    id: 'medium-oofn-code-07-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 07 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total vertices plus traversed edges.\n\n```ts\nfunction countReachable(start, adj) {\n  // Case S07Q6\n  const q = [start];\n  let head = 0;\n  const seen = new Set([start]);\n  while (head < q.length) {\n    const node = q[head++];\n    for (const nxt of adj[node]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      q.push(nxt);\n    }\n  }\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'BFS visits each reachable node and edge once, modeled here as O(N).',
  },
]

export default data
