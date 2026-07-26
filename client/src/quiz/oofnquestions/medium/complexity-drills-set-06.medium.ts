const data = [
  {
    id: 'medium-oofn-code-06-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total elements.\n\n```ts\nfunction stablePartitionByParity(nums) {\n  // Case S06Q1\n  const evens = [];\n  const odds = [];\n  for (let i = 0; i < nums.length; i++) {\n    if ((nums[i] & 1) === 0) evens.push(nums[i]);\n    else odds.push(nums[i]);\n  }\n  return evens.concat(odds);\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each item is processed once and output once, so dominant runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-06-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent the number of nodes in the list.\n\n```ts\nfunction hasCycleFloyd(head) {\n  // Case S06Q2\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The two pointers traverse nodes with bounded forward movement, so total runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-06-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total events.\n\n```ts\nfunction coalesceRuns(events) {\n  // Case S06Q3\n  if (events.length === 0) return [];\n  const out = [[events[0], 1]];\n  for (let i = 1; i < events.length; i++) {\n    const last = out[out.length - 1];\n    if (last[0] === events[i]) last[1]++;\n    else out.push([events[i], 1]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'The scan is one pass over the input with constant-time updates, so runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-06-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total processed characters.\n\n```ts\nfunction decodeEscapesLinear(s) {\n  // Case S06Q4\n  const out = [];\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === "\\" && i + 1 < s.length) {\n      out.push(s[i + 1]);\n      i++;\n    } else {\n      out.push(s[i]);\n    }\n  }\n  return out.join("");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The index moves forward through the string and never rewinds, giving O(N).',
  },
  {
    id: 'medium-oofn-code-06-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of intervals.\n\n```ts\nfunction countContainingIntervals(sortedByStart) {\n  // Case S06Q5\n  let maxEnd = -Infinity;\n  let contained = 0;\n  for (let i = 0; i < sortedByStart.length; i++) {\n    const end = sortedByStart[i][1];\n    if (end <= maxEnd) contained++;\n    maxEnd = Math.max(maxEnd, end);\n  }\n  return contained;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Given pre-sorted intervals, the algorithm does one linear sweep, so runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-06-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 06 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total vertices and edges.\n\n```ts\nfunction componentSizeDfs(start, adj) {\n  // Case S06Q6\n  const st = [start];\n  const seen = new Set([start]);\n  while (st.length) {\n    const node = st.pop();\n    for (const nxt of adj[node]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      st.push(nxt);\n    }\n  }\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'DFS visits each reachable vertex and edge once, represented here as O(N).',
  },
]

export default data
