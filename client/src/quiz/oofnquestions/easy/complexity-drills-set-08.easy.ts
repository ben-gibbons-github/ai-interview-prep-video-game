const data = [
  {
    id: 'easy-oofn-code-08-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction countPositiveNumbers(nums) {\n  // Case S08Q1\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > 0) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop examines each element once, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-08-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of characters.\n\n```ts\nfunction lowercaseAscii(s) {\n  // Case S08Q2\n  const out = [];\n  for (let i = 0; i < s.length; i++) {\n    out.push(s[i].toLowerCase());\n  }\n  return out.join("");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each character is transformed once, so total runtime grows linearly: O(N).',
  },
  {
    id: 'easy-oofn-code-08-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent list length.\n\n```ts\nfunction shiftLeftByOne(nums) {\n  // Case S08Q3\n  if (nums.length === 0) return nums;\n  const first = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    nums[i - 1] = nums[i];\n  }\n  nums[nums.length - 1] = first;\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'The loop shifts each element once, resulting in O(N) time.',
  },
  {
    id: 'easy-oofn-code-08-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of rows.\n\n```ts\nfunction countNonEmptyRows(rows) {\n  // Case S08Q4\n  let total = 0;\n  for (let i = 0; i < rows.length; i++) {\n    if (rows[i].length > 0) total++;\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'It performs one pass over the rows array, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-08-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of words.\n\n```ts\nfunction totalWordLength(words) {\n  // Case S08Q5\n  let total = 0;\n  for (let i = 0; i < words.length; i++) {\n    total += words[i].length;\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each word contributes one constant-time length lookup in a single scan, so O(N).',
  },
  {
    id: 'easy-oofn-code-08-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 08 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent array length.\n\n```ts\nfunction hasAnyZero(nums) {\n  // Case S08Q6\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === 0) return true;\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Worst case scans every element once, giving O(N) runtime.',
  },
]

export default data
