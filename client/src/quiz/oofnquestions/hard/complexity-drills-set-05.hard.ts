const data = [
  {
    id: 'hard-oofn-code-05-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of nodes in the structure.\n\n```ts\nfunction cloneGraphBfs(start) {\n  // Case S05Q1\n  if (!start) return null;\n  const map = new Map();\n  const q = [start];\n  let head = 0;\n  map.set(start, { val: start.val, neighbors: [] });\n\n  while (head < q.length) {\n    const node = q[head++];\n    const copy = map.get(node);\n    for (const nei of node.neighbors) {\n      if (!map.has(nei)) {\n        map.set(nei, { val: nei.val, neighbors: [] });\n        q.push(nei);\n      }\n      copy.neighbors.push(map.get(nei));\n    }\n  }\n\n  return map.get(start);\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'BFS visits each node/edge once, giving O(V+E), represented in this drill as O(N).',
  },
  {
    id: 'hard-oofn-code-05-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of bars.\n\n```ts\nfunction maxAreaTwoPointer(heights) {\n  // Case S05Q2\n  let left = 0;\n  let right = heights.length - 1;\n  let best = 0;\n\n  while (left < right) {\n    const area = Math.min(heights[left], heights[right]) * (right - left);\n    best = Math.max(best, area);\n    if (heights[left] <= heights[right]) left++;\n    else right--;\n  }\n\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each pointer moves inward at most N times total, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-05-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total intervals after sorting is already done.\n\n```ts\nfunction overlapCountLinear(sortedIntervals) {\n  // Case S05Q3\n  if (sortedIntervals.length === 0) return 0;\n  let overlaps = 0;\n  let currentEnd = sortedIntervals[0][1];\n\n  for (let i = 1; i < sortedIntervals.length; i++) {\n    const [start, end] = sortedIntervals[i];\n    if (start <= currentEnd) overlaps++;\n    currentEnd = Math.max(currentEnd, end);\n  }\n\n  return overlaps;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Given intervals are already sorted, one scan computes overlap stats in O(N).',
  },
  {
    id: 'hard-oofn-code-05-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of list nodes.\n\n```ts\nfunction removeNthFromEndLinear(head, n) {\n  // Case S05Q4\n  const dummy = { next: head };\n  let fast = dummy;\n  let slow = dummy;\n\n  for (let i = 0; i <= n; i++) fast = fast.next;\n  while (fast) {\n    fast = fast.next;\n    slow = slow.next;\n  }\n\n  slow.next = slow.next.next;\n  return dummy.next;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The list is traversed with two pointers in linear time, so complexity is O(N).',
  },
  {
    id: 'hard-oofn-code-05-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total number of values.\n\n```ts\nfunction mergeKQueuesRoundRobin(queues) {\n  // Case S05Q5\n  const out = [];\n  let active = true;\n\n  while (active) {\n    active = false;\n    for (let i = 0; i < queues.length; i++) {\n      if (queues[i].length > 0) {\n        out.push(queues[i].shift());\n        active = true;\n      }\n    }\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity assuming dequeue is O(1)?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each value is dequeued and appended once, so total work is linear in total values: O(N).',
  },
  {
    id: 'hard-oofn-code-05-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 05 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes in both trees.\n\n```ts\nfunction sameTreeIterative(a, b) {\n  // Case S05Q6\n  const q = [[a, b]];\n  let head = 0;\n\n  while (head < q.length) {\n    const [x, y] = q[head++];\n    if (!x && !y) continue;\n    if (!x || !y || x.val !== y.val) return false;\n    q.push([x.left, y.left]);\n    q.push([x.right, y.right]);\n  }\n\n  return true;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each paired node is visited once, so runtime is linear in total compared nodes: O(N).',
  },
]

export default data
