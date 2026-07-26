const data = [
  {
    id: 'medium-oofn-code-10-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total values.\n\n```ts\nfunction alternatingPrefixSum(nums) {\n  // Case S10Q1\n  const out = new Array(nums.length);\n  let sum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    sum += i % 2 === 0 ? nums[i] : -nums[i];\n    out[i] = sum;\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One pass with constant-time arithmetic gives O(N).',
  },
  {
    id: 'medium-oofn-code-10-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of items.\n\n```ts\nfunction groupByParity(nums) {\n  // Case S10Q2\n  const even = [];\n  const odd = [];\n  for (let i = 0; i < nums.length; i++) {\n    if ((nums[i] & 1) === 0) even.push(nums[i]);\n    else odd.push(nums[i]);\n  }\n  return { even, odd };\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each item is routed once into one of two arrays, so runtime is linear.',
  },
  {
    id: 'medium-oofn-code-10-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent stream length.\n\n```ts\nfunction rollingMax(nums) {\n  // Case S10Q3\n  const out = [];\n  let best = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    best = Math.max(best, nums[i]);\n    out.push(best);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'A single scan with constant updates is O(N).',
  },
  {
    id: 'medium-oofn-code-10-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent graph nodes reachable from the start.\n\n```ts\nfunction reachableCountDfs(start, adj) {\n  // Case S10Q4\n  const st = [start];\n  const seen = new Set([start]);\n  let count = 0;\n  while (st.length) {\n    const node = st.pop();\n    count++;\n    for (const nxt of adj[node]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      st.push(nxt);\n    }\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'DFS-style traversal visits each reachable vertex and edge once, so O(N).',
  },
  {
    id: 'medium-oofn-code-10-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of words.\n\n```ts\nfunction mostFrequentWord(words) {\n  // Case S10Q5\n  const counts = new Map();\n  let bestWord = "";\n  let bestCount = 0;\n  for (let i = 0; i < words.length; i++) {\n    const nextCount = (counts.get(words[i]) ?? 0) + 1;\n    counts.set(words[i], nextCount);\n    if (nextCount > bestCount) {\n      bestCount = nextCount;\n      bestWord = words[i];\n    }\n  }\n  return bestWord;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One pass with average O(1) map updates gives O(N).',
  },
  {
    id: 'medium-oofn-code-10-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 10 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of intervals.\n\n```ts\nfunction intervalUnionLength(sortedIntervals) {\n  // Case S10Q6\n  if (sortedIntervals.length === 0) return 0;\n  let total = 0;\n  let start = sortedIntervals[0][0];\n  let end = sortedIntervals[0][1];\n  for (let i = 1; i < sortedIntervals.length; i++) {\n    const [s, e] = sortedIntervals[i];\n    if (s <= end) end = Math.max(end, e);\n    else {\n      total += end - start;\n      start = s;\n      end = e;\n    }\n  }\n  return total + (end - start);\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Given sorted intervals, one scan merges and accumulates lengths in O(N).',
  },
]

export default data
