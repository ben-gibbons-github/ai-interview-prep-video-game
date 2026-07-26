const data = [
  {
    "id": "easy-oofn-code-02-01-2026",
    "difficulty": "easy",
    "prompt": "LiveCode Complexity Drill (EASY Set 02 Q1)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction countPairs(nums) {\n  // Case S02Q1\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < nums.length; j++) {\n      if (nums[i] < nums[j]) count++;\n    }\n  }\n  return count;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(log N)",
      "O(2^N)",
      "O(N)",
      "O(N^2)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Two independent loops each run N times, so total operations are proportional to N^2. This snippet's dominant term is O(N^2)."
  },
  {
    "id": "easy-oofn-code-02-02-2026",
    "difficulty": "easy",
    "prompt": "LiveCode Complexity Drill (EASY Set 02 Q2)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction firstOrMinusOne(nums) {\n  // Case S02Q2\n  if (nums.length === 0) return -1;\n  return nums[0];\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(2^N)",
      "O(log N)",
      "O(N log N)",
      "O(1)"
    ],
    "correctIndex": 3,
    "correctExplanation": "The number of operations does not grow with N, so runtime is O(1). This snippet's dominant term is O(1)."
  },
  {
    "id": "easy-oofn-code-02-03-2026",
    "difficulty": "easy",
    "prompt": "LiveCode Complexity Drill (EASY Set 02 Q3)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction solve(arr) {\n  // Case S02Q3\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(1)",
      "O(N log N)",
      "O(log N)",
      "O(N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "One loop over N elements with O(1) work per iteration gives O(N). This snippet's dominant term is O(N)."
  },
  {
    "id": "easy-oofn-code-02-04-2026",
    "difficulty": "easy",
    "prompt": "LiveCode Complexity Drill (EASY Set 02 Q4)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction hasTarget(nums, target) {\n  // Case S02Q4\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (nums[mid] === target) return true;\n    if (nums[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return false;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(1)",
      "O(N log N)",
      "O(N)",
      "O(log N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "The search interval is halved every iteration, so runtime is O(log N). This snippet's dominant term is O(log N)."
  },
  {
    "id": "easy-oofn-code-02-05-2026",
    "difficulty": "easy",
    "prompt": "LiveCode Complexity Drill (EASY Set 02 Q5)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction divideAndMerge(nums) {\n  // Case S02Q5\n  if (nums.length <= 1) return nums;\n  const mid = Math.floor(nums.length / 2);\n  const left = divideAndMerge(nums.slice(0, mid));\n  const right = divideAndMerge(nums.slice(mid));\n  return merge(left, right); // O(N) merge work per level\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "There are log N levels and each level performs O(N) merge work, so O(N log N). This snippet's dominant term is O(N log N)."
  }
]

export default data
