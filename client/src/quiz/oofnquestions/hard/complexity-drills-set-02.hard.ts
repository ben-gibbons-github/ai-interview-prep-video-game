const data = [
  {
    "id": "hard-oofn-code-02-01-2026",
    "difficulty": "hard",
    "prompt": "LiveCode Complexity Drill (HARD Set 02 Q1)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction nestedBinarySearch(nums, target) {\n  // Case S02Q1\n  let lo = 0, hi = nums.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    let l2 = 0, h2 = nums.length - 1;\n    while (l2 <= h2) {\n      const m2 = Math.floor((l2 + h2) / 2);\n      if (nums[m2] === target) return true;\n      if (nums[m2] < target) l2 = m2 + 1; else h2 = m2 - 1;\n    }\n    if (nums[mid] < target) lo = mid + 1; else hi = mid - 1;\n  }\n  return false;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(2^N)",
      "O(N^2)",
      "O(N!)",
      "O((log N)^2)"
    ],
    "correctIndex": 3,
    "correctExplanation": "An O(log N) outer loop containing O(log N) inner search gives O((log N)^2). This snippet's dominant term is O((log N)^2)."
  },
  {
    "id": "hard-oofn-code-02-02-2026",
    "difficulty": "hard",
    "prompt": "LiveCode Complexity Drill (HARD Set 02 Q2)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction subsetAndScan(i, nums) {\n  // Case S02Q2\n  if (i === nums.length) {\n    let sum = 0;\n    for (let k = 0; k < nums.length; k++) sum += nums[k];\n    return sum;\n  }\n  return subsetAndScan(i + 1, nums) + subsetAndScan(i + 1, nums);\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N log N)",
      "O(N!)",
      "O(N^2)",
      "O(N * 2^N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "There are 2^N leaves and each does O(N) scan work, so O(N * 2^N). This snippet's dominant term is O(N * 2^N)."
  },
  {
    "id": "hard-oofn-code-02-03-2026",
    "difficulty": "hard",
    "prompt": "LiveCode Complexity Drill (HARD Set 02 Q3)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction brute5D(n) {\n  // Case S02Q3\n  let c = 0;\n  for (let a = 0; a < n; a++)\n    for (let b = 0; b < n; b++)\n      for (let c2 = 0; c2 < n; c2++)\n        for (let d = 0; d < n; d++)\n          for (let e = 0; e < n; e++) c++;\n  return c;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N log N)",
      "O((log N)^2)",
      "O(N^2)",
      "O(N^5)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Five independent loops bounded by N gives O(N^5). This snippet's dominant term is O(N^5)."
  },
  {
    "id": "hard-oofn-code-02-04-2026",
    "difficulty": "hard",
    "prompt": "LiveCode Complexity Drill (HARD Set 02 Q4)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction permute(nums, used, path) {\n  // Case S02Q4\n  if (path.length === nums.length) return 1;\n  let total = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (used[i]) continue;\n    used[i] = true;\n    total += permute(nums, used, path.concat(nums[i]));\n    used[i] = false;\n  }\n  return total;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N^5)",
      "O(N log N)",
      "O(N^N)",
      "O(N!)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Generating all permutations of N distinct elements is O(N!). This snippet's dominant term is O(N!)."
  },
  {
    "id": "hard-oofn-code-02-05-2026",
    "difficulty": "hard",
    "prompt": "LiveCode Complexity Drill (HARD Set 02 Q5)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction assignLabels(depth, n) {\n  // Case S02Q5\n  if (depth === n) return 1;\n  let total = 0;\n  for (let label = 0; label < n; label++) {\n    total += assignLabels(depth + 1, n);\n  }\n  return total;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O((log N)^2)",
      "O(N log N)",
      "O(N * 2^N)",
      "O(N^N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "N branches across N levels results in O(N^N). This snippet's dominant term is O(N^N)."
  }
]

export default data
