const data = [
  {
    id: 'easy-oofn-code-09-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of values.\n\n```ts\nfunction sumEvenValues(nums) {\n  // Case S09Q1\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if ((nums[i] & 1) === 0) total += nums[i];\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'A single pass processes each element once, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-09-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent string length.\n\n```ts\nfunction reverseCopyText(s) {\n  // Case S09Q2\n  const out = [];\n  for (let i = s.length - 1; i >= 0; i--) {\n    out.push(s[i]);\n  }\n  return out.join("");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The loop visits each character once, giving O(N) runtime.',
  },
  {
    id: 'easy-oofn-code-09-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of readings.\n\n```ts\nfunction countBelowLimit(readings, limit) {\n  // Case S09Q3\n  let count = 0;\n  for (let i = 0; i < readings.length; i++) {\n    if (readings[i] < limit) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Each reading is checked once in a linear scan, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-09-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of entries.\n\n```ts\nfunction clampToRange(nums, low, high) {\n  // Case S09Q4\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] < low) nums[i] = low;\n    else if (nums[i] > high) nums[i] = high;\n  }\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'In-place clamping still requires one pass over all entries, so O(N).',
  },
  {
    id: 'easy-oofn-code-09-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of indices.\n\n```ts\nfunction copyByIndex(source, idx) {\n  // Case S09Q5\n  const out = new Array(idx.length);\n  for (let i = 0; i < idx.length; i++) {\n    out[i] = source[idx[i]];\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop runs once per requested index, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-09-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 09 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of booleans.\n\n```ts\nfunction allTrue(flags) {\n  // Case S09Q6\n  for (let i = 0; i < flags.length; i++) {\n    if (!flags[i]) return false;\n  }\n  return true;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Worst case checks all flags once, so asymptotic runtime is O(N).',
  },
]

export default data
