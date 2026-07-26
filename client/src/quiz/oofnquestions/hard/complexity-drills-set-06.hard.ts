const data = [
  {
    id: 'hard-oofn-code-06-01-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total edges in the flight list plus nodes reached.\n\n```ts\nfunction reachableAirportsBfs(source, graph) {\n  // Case S06Q1\n  const q = [source];\n  let head = 0;\n  const seen = new Set([source]);\n\n  while (head < q.length) {\n    const airport = q[head++];\n    for (const nxt of graph[airport]) {\n      if (seen.has(nxt)) continue;\n      seen.add(nxt);\n      q.push(nxt);\n    }\n  }\n\n  return seen.size;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The BFS processes each reached node and edge at most once, so runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-06-02-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent array length.\n\n```ts\nfunction minLengthSubarrayAtLeastK(nums, k) {\n  // Case S06Q2\n  let left = 0;\n  let sum = 0;\n  let best = Infinity;\n\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= k) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n\n  return Number.isFinite(best) ? best : 0;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Both pointers only move forward, and each element enters and exits the window once: O(N).',
  },
  {
    id: 'hard-oofn-code-06-03-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent the number of bits in the integer.\n\n```ts\nfunction popcountShift(n) {\n  // Case S06Q3\n  let c = 0;\n  while (n !== 0) {\n    c += n & 1;\n    n = n >>> 1;\n  }\n  return c;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'The loop iterates once per bit position, so in terms of bit-length N it is O(N).',
  },
  {
    id: 'hard-oofn-code-06-04-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total number of commands.\n\n```ts\nfunction browserHistoryReplay(commands) {\n  // Case S06Q4\n  const back = [];\n  const forward = [];\n  let page = "home";\n\n  for (let i = 0; i < commands.length; i++) {\n    const cmd = commands[i];\n    if (cmd.type === "visit") {\n      back.push(page);\n      page = cmd.url;\n      forward.length = 0;\n    } else if (cmd.type === "back" && back.length) {\n      forward.push(page);\n      page = back.pop();\n    } else if (cmd.type === "forward" && forward.length) {\n      back.push(page);\n      page = forward.pop();\n    }\n  }\n\n  return page;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each command triggers O(1) stack operations, and commands are processed once: O(N).',
  },
  {
    id: 'hard-oofn-code-06-05-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total nodes in all adjacency lists visited.\n\n```ts\nfunction iterativePostorder(root) {\n  // Case S06Q5\n  if (!root) return [];\n  const st = [root];\n  const out = [];\n\n  while (st.length) {\n    const node = st.pop();\n    out.push(node.val);\n    if (node.left) st.push(node.left);\n    if (node.right) st.push(node.right);\n  }\n\n  out.reverse();\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Every node is pushed/popped once and the final reverse is linear, so total runtime is O(N).',
  },
  {
    id: 'hard-oofn-code-06-06-2026',
    difficulty: 'hard',
    prompt: 'LiveCode Complexity Drill (HARD Set 06 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of windows plus total elements processed.\n\n```ts\nfunction fixedWindowSums(nums, k) {\n  // Case S06Q6\n  if (k <= 0 || k > nums.length) return [];\n\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n\n  const out = [sum];\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    out.push(sum);\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Initialization plus one pass over remaining elements yields overall linear runtime O(N).',
  },
]

export default data
