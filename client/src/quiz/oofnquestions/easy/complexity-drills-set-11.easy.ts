const data = [
  {
    id: 'easy-oofn-code-11-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction countAtOrAbove(nums, minValue) {\n  // Case S11Q1\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] >= minValue) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop checks each element once, so runtime grows linearly: O(N).',
  },
  {
    id: 'easy-oofn-code-11-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of letters.\n\n```ts\nfunction uppercaseAsciiCopy(s) {\n  // Case S11Q2\n  const out = [];\n  for (let i = 0; i < s.length; i++) {\n    out.push(s[i].toUpperCase());\n  }\n  return out.join("");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every character is transformed once, giving O(N) time.',
  },
  {
    id: 'easy-oofn-code-11-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent array length.\n\n```ts\nfunction prefixZeroCount(bits) {\n  // Case S11Q3\n  let count = 0;\n  for (let i = 0; i < bits.length; i++) {\n    if (bits[i] !== 0) break;\n    count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Worst case scans all elements once, so asymptotic runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-11-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of entries.\n\n```ts\nfunction negateInPlace(nums) {\n  // Case S11Q4\n  for (let i = 0; i < nums.length; i++) {\n    nums[i] = -nums[i];\n  }\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'One in-place pass over N items yields O(N) runtime.',
  },
  {
    id: 'easy-oofn-code-11-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of rows.\n\n```ts\nfunction firstRowWithValue(rows, target) {\n  // Case S11Q5\n  for (let i = 0; i < rows.length; i++) {\n    if (rows[i].includes(target)) return i;\n  }\n  return -1;\n}\n```\n\nAssume each includes check is O(1) for this drill. What is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Under the stated assumption, the outer loop dominates with O(N).',
  },
  {
    id: 'easy-oofn-code-11-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 11 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent string length.\n\n```ts\nfunction countSeparators(s, sep) {\n  // Case S11Q6\n  let parts = 1;\n  for (let i = 0; i < s.length; i++) {\n    if (s[i] === sep) parts++;\n  }\n  return parts;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The scan touches each character once, so complexity is O(N).',
  },
]

export default data
