const data = [
  {
    "id": "easy-linear-scan-04-q1",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction twoPasses(items: number[]) {\n  let sum = 0\n  for (const value of items) sum += value\n\n  let nonNegative = 0\n  for (const value of items) {\n    if (value >= 0) nonNegative += 1\n  }\n\n  return { sum, nonNegative }\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "There are two full linear passes over N items, so this is O(2N) (which simplifies to linear growth)."
  },
  {
    "id": "easy-linear-scan-04-q2",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction threePasses(items: number[]) {\n  let min = Number.POSITIVE_INFINITY\n  for (const value of items) min = Math.min(min, value)\n\n  let max = Number.NEGATIVE_INFINITY\n  for (const value of items) max = Math.max(max, value)\n\n  let sum = 0\n  for (const value of items) sum += value\n\n  return { min, max, sum }\n}\n```",
    "options": ["O(N^2)", "O(3N)", "O(2^N)", "O(N log N)", "O(N^N)"],
    "correctIndex": 1,
    "correctExplanation": "The function performs three independent linear scans, so the closest class is O(3N)."
  },
  {
    "id": "easy-linear-scan-04-q3",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction allPairs(items: number[]) {\n  let matches = 0\n  for (let i = 0; i < items.length; i += 1) {\n    for (let j = 0; j < items.length; j += 1) {\n      if (items[i] === items[j]) matches += 1\n    }\n  }\n  return matches\n}\n```",
    "options": ["O(2N)", "O(N log N)", "O(N^2)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Two nested loops each run N times, giving N * N operations: O(N^2)."
  },
  {
    "id": "easy-linear-scan-04-q4",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction mergeSortCount(items: number[]): number[] {\n  if (items.length <= 1) return items\n  const mid = Math.floor(items.length / 2)\n  const left = mergeSortCount(items.slice(0, mid))\n  const right = mergeSortCount(items.slice(mid))\n  return merge(left, right)\n}\n```\n\nAssume merge runs in linear time for each level.",
    "options": ["O(N^2)", "O(3N)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Merge sort splits by halves (log N levels) and does O(N) merge work per level, so total runtime is O(N log N)."
  },
  {
    "id": "easy-linear-scan-04-q5",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction countSubsets(nums: number[], index = 0): number {\n  if (index === nums.length) return 1\n  const includeCurrent = countSubsets(nums, index + 1)\n  const skipCurrent = countSubsets(nums, index + 1)\n  return includeCurrent + skipCurrent\n}\n```",
    "options": ["O(2N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 3,
    "correctExplanation": "Each level branches into two recursive calls and depth is N, so the call tree has about 2^N leaves: O(2^N)."
  },
  {
    "id": "easy-linear-scan-04-q6",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction nBranchTree(n: number, depth = n): number {\n  if (depth === 0) return 1\n  let total = 0\n  for (let i = 0; i < n; i += 1) {\n    total += nBranchTree(n, depth - 1)\n  }\n  return total\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 4,
    "correctExplanation": "The recursion has branching factor N and depth N, producing roughly N^N calls in the dominant term."
  },
  {
    "id": "easy-linear-scan-04-q7",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction compareRows(matrix: number[][]) {\n  let score = 0\n  for (let row = 0; row < matrix.length; row += 1) {\n    for (let col = 0; col < matrix[row].length; col += 1) {\n      if (matrix[row][col] % 2 === 0) score += 1\n    }\n  }\n  return score\n}\n```\n\nAssume matrix is N by N.",
    "options": ["O(2N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 1,
    "correctExplanation": "For an N by N matrix, the nested traversal touches N^2 elements, so runtime is O(N^2)."
  },
  {
    "id": "easy-linear-scan-04-q8",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction sortThenScan(items: number[]) {\n  items.sort((a, b) => a - b)\n  let unique = 0\n  for (let i = 0; i < items.length; i += 1) {\n    if (i === 0 || items[i] !== items[i - 1]) unique += 1\n  }\n  return unique\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Sorting dominates at O(N log N); the extra linear scan does not change the overall class."
  },
  {
    "id": "easy-linear-scan-04-q9",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction singlePassCount(items: number[]) {\n  let count = 0\n  for (const value of items) {\n    if (value > 0) count += 1\n  }\n  return count\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "A single full traversal over N items is O(N)."
  },
  {
    "id": "easy-linear-scan-04-q10",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction skipEveryOther(items: number[]) {\n  let total = 0\n  for (let i = 0; i < items.length; i += 2) {\n    total += items[i]\n  }\n  return total\n}\n```",
    "options": ["O(N^2)", "O(N/2)", "O(2N)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Stepping by 2 visits about half the array, so this is O(N/2), which is still linear."
  },
  {
    "id": "easy-linear-scan-04-q11",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction twoValidations(items: number[]) {\n  let positives = 0\n  for (const value of items) if (value > 0) positives += 1\n\n  let evens = 0\n  for (const value of items) if (value % 2 === 0) evens += 1\n\n  return positives + evens\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "There are two independent linear passes, so the closest form is O(2N)."
  },
  {
    "id": "easy-linear-scan-04-q12",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction fourPassSummary(items: number[]) {\n  let a = 0\n  for (const value of items) a += value\n  let b = 0\n  for (const value of items) b += Math.abs(value)\n  let c = 0\n  for (const value of items) c += value > 0 ? 1 : 0\n  let d = 0\n  for (const value of items) d += value % 2 === 0 ? 1 : 0\n  return a + b + c + d\n}\n```",
    "options": ["O(4N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 0,
    "correctExplanation": "Four complete scans over N items gives O(4N), which is linear growth."
  },
  {
    "id": "easy-linear-scan-04-q13",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction fivePassSummary(items: number[]) {\n  let p1 = 0\n  for (const value of items) p1 += value\n  let p2 = 0\n  for (const value of items) p2 += value * value\n  let p3 = 0\n  for (const value of items) p3 += value > 10 ? 1 : 0\n  let p4 = 0\n  for (const value of items) p4 += value < 0 ? 1 : 0\n  let p5 = 0\n  for (const value of items) p5 += value === 0 ? 1 : 0\n  return p1 + p2 + p3 + p4 + p5\n}\n```",
    "options": ["O(2N)", "O(5N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Five separate linear passes gives O(5N)."
  },
  {
    "id": "easy-linear-scan-04-q14",
    "difficulty": "easy",
    "prompt": "Look at this code and choose the closest runtime class.\n\n```ts\nfunction tenStageScan(items: number[]) {\n  let total = 0\n  for (let stage = 0; stage < 10; stage += 1) {\n    for (const value of items) total += value + stage\n  }\n  return total\n}\n```",
    "options": ["O(2N)", "O(5N)", "O(10N)", "O(N^2)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "The outer loop runs a constant 10 times, each doing a linear pass, so this is O(10N)."
  }
]

export default data
