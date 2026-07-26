const data = [
  {
    id: 'easy-oofn-code-04-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction sumAbsoluteValues(nums) {\n  // Case S04Q1\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) {\n    total += Math.abs(nums[i]);\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One loop visits every element once with O(1) work each iteration, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-04-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction findPivotIndexLinear(nums) {\n  // Case S04Q2\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) total += nums[i];\n\n  let left = 0;\n  for (let i = 0; i < nums.length; i++) {\n    const right = total - left - nums[i];\n    if (left === right) return i;\n    left += nums[i];\n  }\n\n  return -1;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Two linear passes still sum to linear work, so dominant runtime remains O(N).',
  },
  {
    id: 'easy-oofn-code-04-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters in both strings.\n\n```ts\nfunction mergeAlternatingChars(a, b) {\n  // Case S04Q3\n  let i = 0;\n  let j = 0;\n  let out = \"\";\n  while (i < a.length || j < b.length) {\n    if (i < a.length) out += a[i++];\n    if (j < b.length) out += b[j++];\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each character from both strings is consumed once, so total work is linear in combined size: O(N).',
  },
  {
    id: 'easy-oofn-code-04-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction isMonotonicOnce(nums) {\n  // Case S04Q4\n  let nonDecreasing = true;\n  let nonIncreasing = true;\n\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] < nums[i - 1]) nonDecreasing = false;\n    if (nums[i] > nums[i - 1]) nonIncreasing = false;\n  }\n\n  return nonDecreasing || nonIncreasing;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'There is one pass over the array and constant work per step, giving O(N).',
  },
  {
    id: 'easy-oofn-code-04-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction compactNonZeroes(nums) {\n  // Case S04Q5\n  let write = 0;\n  for (let read = 0; read < nums.length; read++) {\n    if (nums[read] !== 0) {\n      nums[write] = nums[read];\n      write++;\n    }\n  }\n\n  while (write < nums.length) {\n    nums[write] = 0;\n    write++;\n  }\n\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'The read pointer and write pointer both move forward at most N times, so total is O(N).',
  },
  {
    id: 'easy-oofn-code-04-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 04 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction countTransitions(bits) {\n  // Case S04Q6\n  if (bits.length === 0) return 0;\n  let changes = 0;\n  for (let i = 1; i < bits.length; i++) {\n    if (bits[i] !== bits[i - 1]) changes++;\n  }\n  return changes;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One linear scan across adjacent entries makes runtime O(N).',
  },
]

export default data
