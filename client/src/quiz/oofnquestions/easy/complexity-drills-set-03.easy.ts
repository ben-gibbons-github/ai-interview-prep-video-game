const data = [
  {
    id: 'easy-oofn-code-03-01-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction countPositives(nums) {\n  // Case S03Q1\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > 0) count++;\n  }\n  return count;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'One full pass through the array with constant work per element is O(N).',
  },
  {
    id: 'easy-oofn-code-03-02-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction reverseInPlace(arr) {\n  // Case S03Q2\n  let left = 0;\n  let right = arr.length - 1;\n  while (left < right) {\n    const tmp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = tmp;\n    left++;\n    right--;\n  }\n  return arr;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Two pointers move toward the center, doing at most N/2 swaps, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-03-03-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction buildPrefixSums(nums) {\n  // Case S03Q3\n  const pref = new Array(nums.length);\n  let running = 0;\n  for (let i = 0; i < nums.length; i++) {\n    running += nums[i];\n    pref[i] = running;\n  }\n  return pref;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Each element is processed once to update the running total, so runtime is O(N).',
  },
  {
    id: 'easy-oofn-code-03-04-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction maxAdjacentDiff(nums) {\n  // Case S03Q4\n  if (nums.length < 2) return 0;\n  let best = 0;\n  for (let i = 1; i < nums.length; i++) {\n    best = Math.max(best, Math.abs(nums[i] - nums[i - 1]));\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 2,
    correctExplanation: 'A single loop over adjacent pairs does constant work each iteration, giving O(N).',
  },
  {
    id: 'easy-oofn-code-03-05-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction copyEvenThenOdd(nums) {\n  // Case S03Q5\n  const out = [];\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] % 2 === 0) out.push(nums[i]);\n  }\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] % 2 !== 0) out.push(nums[i]);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N^2)', 'O(N^3)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Two separate linear passes still add to linear work: O(N) + O(N) = O(N).',
  },
  {
    id: 'easy-oofn-code-03-06-2026',
    difficulty: 'easy',
    prompt: 'LiveCode Complexity Drill (EASY Set 03 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction containsDuplicate(nums) {\n  // Case S03Q6\n  const seen = new Set();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(nums[i])) return true;\n    seen.add(nums[i]);\n  }\n  return false;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'With average O(1) set operations, the loop is linear in N, so dominant runtime is O(N).',
  },
]

export default data
