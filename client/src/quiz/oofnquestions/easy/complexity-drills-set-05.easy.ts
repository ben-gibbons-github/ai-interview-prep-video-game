const data = [
  {
    id: 'easy-oofn-code-05-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction firstNegativeIndex(nums) {\n  // Case S05Q1\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] < 0) return i;\n  }\n  return -1;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'In the worst case the loop checks all elements once, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-05-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction countLocalPeaks(nums) {\n  // Case S05Q2\n  if (nums.length < 3) return 0;\n  let peaks = 0;\n  for (let i = 1; i < nums.length - 1; i++) {\n    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) peaks++;\n  }\n  return peaks;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'A single pass through the middle elements with O(1) checks gives O(N).',
  },
  {
    id: 'easy-oofn-code-05-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total elements in both arrays.\n\n```ts\nfunction appendAll(left, right) {\n  // Case S05Q3\n  const out = [];\n  for (let i = 0; i < left.length; i++) out.push(left[i]);\n  for (let j = 0; j < right.length; j++) out.push(right[j]);\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each input element is copied once, so total work is linear in combined length: O(N).',
  },
  {
    id: 'easy-oofn-code-05-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction runningMinimums(nums) {\n  // Case S05Q4\n  const mins = [];\n  let best = Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    best = Math.min(best, nums[i]);\n    mins.push(best);\n  }\n  return mins;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'One pass with constant-time min updates and pushes yields O(N).',
  },
  {
    id: 'easy-oofn-code-05-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of characters.\n\n```ts\nfunction countDigitsInString(s) {\n  // Case S05Q5\n  let digits = 0;\n  for (let i = 0; i < s.length; i++) {\n    const ch = s[i];\n    if (ch >= \"0\" && ch <= \"9\") digits++;\n  }\n  return digits;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The code scans each character once and does O(1) work per char, so O(N).',
  },
  {
    id: 'easy-oofn-code-05-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 05 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction anyEqualAdjacent(nums) {\n  // Case S05Q6\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] === nums[i - 1]) return true;\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Worst case checks every adjacent pair once, so runtime is O(N).',
  },
]

export default data
