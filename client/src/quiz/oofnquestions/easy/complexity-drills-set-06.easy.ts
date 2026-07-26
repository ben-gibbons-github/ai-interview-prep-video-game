const data = [
  {
    id: 'easy-oofn-code-06-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction tallyGreaterThan(nums, threshold) {\n  // Case S06Q1\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > threshold) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop reads each element once and performs O(1) work per element, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-06-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction normalizeSigns(nums) {\n  // Case S06Q2\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] < 0) nums[i] = -nums[i];\n  }\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'A single linear pass updates elements in place, so dominant complexity is O(N).',
  },
  {
    id: 'easy-oofn-code-06-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters in the string.\n\n```ts\nfunction countUppercaseChars(s) {\n  // Case S06Q3\n  let total = 0;\n  for (let i = 0; i < s.length; i++) {\n    const ch = s[i];\n    if (ch >= "A" && ch <= "Z") total++;\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The function scans each character once, so runtime grows linearly: O(N).',
  },
  {
    id: 'easy-oofn-code-06-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction edgeSum(nums) {\n  // Case S06Q4\n  if (nums.length === 0) return 0;\n  let sum = nums[0];\n  for (let i = 1; i < nums.length - 1; i++) {\n    sum += nums[i] * 0;\n  }\n  if (nums.length > 1) sum += nums[nums.length - 1];\n  return sum;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'The middle loop still touches almost all elements, making total runtime O(N).',
  },
  {
    id: 'easy-oofn-code-06-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction firstMismatchIndex(a, b) {\n  // Case S06Q5\n  const n = Math.min(a.length, b.length);\n  for (let i = 0; i < n; i++) {\n    if (a[i] !== b[i]) return i;\n  }\n  return n;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 2,
    correctExplanation: 'Worst case compares all positions once, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-06-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 06 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent list length.\n\n```ts\nfunction duplicateArray(arr) {\n  // Case S06Q6\n  const out = new Array(arr.length);\n  for (let i = 0; i < arr.length; i++) {\n    out[i] = arr[i];\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Copying each element once produces linear runtime O(N).',
  },
]

export default data
