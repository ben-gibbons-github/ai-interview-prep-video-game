const data = [
  {
    id: 'easy-oofn-code-07-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction accumulateAbsoluteMagnitude(nums) {\n  // Case S07Q1\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) {\n    total += Math.abs(nums[i]);\n  }\n  return total;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'Each element is visited once with constant-time work, so the runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-07-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction replaceZeros(nums, fallback) {\n  // Case S07Q2\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === 0) nums[i] = fallback;\n  }\n  return nums;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The function performs one linear pass through the array, giving O(N).',
  },
  {
    id: 'easy-oofn-code-07-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters.\n\n```ts\nfunction countVowels(s) {\n  // Case S07Q3\n  let count = 0;\n  for (let i = 0; i < s.length; i++) {\n    const ch = s[i].toLowerCase();\n    if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The string is scanned once and each check is O(1), so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-07-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction maxValue(nums) {\n  // Case S07Q4\n  let best = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > best) best = nums[i];\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 1,
    correctExplanation: 'Finding a max with a single pass is linear, so complexity is O(N).',
  },
  {
    id: 'easy-oofn-code-07-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent list length.\n\n```ts\nfunction countBitEdgeFlips(bits) {\n  // Case S07Q5\n  if (bits.length === 0) return 0;\n  let transitions = 0;\n  for (let i = 1; i < bits.length; i++) {\n    if (bits[i] !== bits[i - 1]) transitions++;\n  }\n  return transitions;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 2,
    correctExplanation: 'It compares adjacent values in one sweep, so worst-case runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-07-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 07 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent number of pairs.\n\n```ts\nfunction flattenPairs(pairs) {\n  // Case S07Q6\n  const out = [];\n  for (let i = 0; i < pairs.length; i++) {\n    out.push(pairs[i][0]);\n    out.push(pairs[i][1]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Each pair is handled once with constant operations, resulting in O(N).',
  },
]

export default data
