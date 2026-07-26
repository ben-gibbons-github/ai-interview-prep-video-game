const data = [
  {
    id: 'medium-oofn-code-11-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent stream length.\n\n```ts\nfunction countPlateaus(nums) {\n  // Case S11Q1\n  if (nums.length === 0) return 0;\n  let plateaus = 1;\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] !== nums[i - 1]) plateaus++;\n  }\n  return plateaus;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The array is traversed once with constant-time comparisons, so O(N).',
  },
  {
    id: 'medium-oofn-code-11-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of readings.\n\n```ts\nfunction movingAverageFixed(nums, k) {\n  // Case S11Q2\n  if (k <= 0 || k > nums.length) return [];\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  const out = [sum / k];\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    out.push(sum / k);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Initialization plus one sliding pass is linear overall: O(N).',
  },
  {
    id: 'medium-oofn-code-11-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of updates.\n\n```ts\nfunction applyDeltaMap(pairs) {\n  // Case S11Q3\n  const map = new Map();\n  for (let i = 0; i < pairs.length; i++) {\n    const [key, delta] = pairs[i];\n    map.set(key, (map.get(key) ?? 0) + delta);\n  }\n  return map;\n}\n```\n\nAssume map ops are average O(1). What is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'One pass with constant average-time map operations gives O(N).',
  },
  {
    id: 'medium-oofn-code-11-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of queue operations.\n\n```ts\nfunction boundedQueueReplay(ops, cap) {\n  // Case S11Q4\n  const q = [];\n  for (let i = 0; i < ops.length; i++) {\n    const op = ops[i];\n    if (op.type === "push") {\n      q.push(op.value);\n      if (q.length > cap) q.shift();\n    } else if (op.type === "pop" && q.length) {\n      q.shift();\n    }\n  }\n  return q.length;\n}\n```\n\nAssume shift is O(1). What is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each operation does bounded constant work under the assumption, so O(N).',
  },
  {
    id: 'medium-oofn-code-11-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of vertices and edges touched.\n\n```ts\nfunction componentSizeBfs(start, adj) {\n  // Case S11Q5\n  const q = [start];\n  let head = 0;\n  const seen = new Set([start]);\n  while (head < q.length) {\n    const node = q[head++];\n    for (const nxt of adj[node]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      q.push(nxt);\n    }\n  }\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'BFS visits each reachable vertex/edge at most once, represented as O(N).',
  },
  {
    id: 'medium-oofn-code-11-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 11 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of digits.\n\n```ts\nfunction digitalSumSteps(chars) {\n  // Case S11Q6\n  let total = 0;\n  for (let i = 0; i < chars.length; i++) {\n    total += chars[i].charCodeAt(0) - 48;\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Each character is processed once, so runtime is O(N).',
  },
]

export default data
