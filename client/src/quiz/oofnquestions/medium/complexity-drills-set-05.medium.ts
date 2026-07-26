const data = [
  {
    id: 'medium-oofn-code-05-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction minLengthAfterRemovingPairs(chars) {\n  // Case S05Q1\n  const st = [];\n  for (let i = 0; i < chars.length; i++) {\n    if (st.length && st[st.length - 1] === chars[i]) st.pop();\n    else st.push(chars[i]);\n  }\n  return st.length;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each character is pushed at most once and popped at most once, so total stack work is O(N).',
  },
  {
    id: 'medium-oofn-code-05-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of temperatures.\n\n```ts\nfunction daysUntilWarmerLinear(temps) {\n  // Case S05Q2\n  const ans = new Array(temps.length).fill(0);\n  const st = [];\n\n  for (let i = 0; i < temps.length; i++) {\n    while (st.length && temps[i] > temps[st[st.length - 1]]) {\n      const idx = st.pop();\n      ans[idx] = i - idx;\n    }\n    st.push(i);\n  }\n\n  return ans;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Indices are pushed and popped at most once from the monotonic stack, giving O(N).',
  },
  {
    id: 'medium-oofn-code-05-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of items.\n\n```ts\nfunction partitionByThreshold(nums, threshold) {\n  // Case S05Q3\n  const low = [];\n  const high = [];\n\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] <= threshold) low.push(nums[i]);\n    else high.push(nums[i]);\n  }\n\n  return low.concat(high);\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'The pass is linear and concatenation is proportional to output size, so overall O(N).',
  },
  {
    id: 'medium-oofn-code-05-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent stream length.\n\n```ts\nfunction longestUniqueWindow(s) {\n  // Case S05Q4\n  const last = new Map();\n  let left = 0;\n  let best = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    const ch = s[right];\n    if (last.has(ch) && last.get(ch) >= left) {\n      left = last.get(ch) + 1;\n    }\n    last.set(ch, right);\n    best = Math.max(best, right - left + 1);\n  }\n\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Both pointers move forward and map ops are average O(1), so total runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-05-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent matrix cell count.\n\n```ts\nfunction rowSums(matrix) {\n  // Case S05Q5\n  const sums = [];\n  for (let r = 0; r < matrix.length; r++) {\n    let total = 0;\n    for (let c = 0; c < matrix[r].length; c++) {\n      total += matrix[r][c];\n    }\n    sums.push(total);\n  }\n  return sums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each matrix cell is visited once across all loops, so work is linear in total cells: O(N).',
  },
  {
    id: 'medium-oofn-code-05-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 05 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent linked-list length.\n\n```ts\nfunction middleNodeOnePass(head) {\n  // Case S05Q6\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Fast/slow pointers traverse the list in one pass, so dominant runtime is O(N).',
  },
]

export default data
