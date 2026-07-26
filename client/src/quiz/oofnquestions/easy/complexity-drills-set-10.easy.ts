const data = [
  {
    id: 'easy-oofn-code-10-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction tallyGreaterThanAverage(nums) {\n  // Case S10Q1\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) total += nums[i];\n  const avg = total / nums.length;\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > avg) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Two linear passes still produce O(N) total runtime.',
  },
  {
    id: 'easy-oofn-code-10-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent string length.\n\n```ts\nfunction trimLeadingSpaces(s) {\n  // Case S10Q2\n  let i = 0;\n  while (i < s.length && s[i] === " ") i++;\n  return s.slice(i);\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The scan advances forward only once, so the runtime is linear.',
  },
  {
    id: 'easy-oofn-code-10-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of items.\n\n```ts\nfunction copyEveryOther(values) {\n  // Case S10Q3\n  const out = [];\n  for (let i = 0; i < values.length; i += 2) {\n    out.push(values[i]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop still visits a linear number of elements, so the time is O(N).',
  },
  {
    id: 'easy-oofn-code-10-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input length.\n\n```ts\nfunction countOddIndices(nums) {\n  // Case S10Q4\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if ((i & 1) === 1) count += nums[i] ? 1 : 0;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'A single pass over the array gives O(N).',
  },
  {
    id: 'easy-oofn-code-10-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of keys.\n\n```ts\nfunction valuesToList(record) {\n  // Case S10Q5\n  const out = [];\n  for (const key in record) {\n    out.push(record[key]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Iterating keys once is linear in the number of keys, so O(N).',
  },
  {
    id: 'easy-oofn-code-10-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 10 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction findLastZero(nums) {\n  // Case S10Q6\n  for (let i = nums.length - 1; i >= 0; i--) {\n    if (nums[i] === 0) return i;\n  }\n  return -1;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Worst case scans the whole array once, so runtime is O(N).',
  },
]

export default data
