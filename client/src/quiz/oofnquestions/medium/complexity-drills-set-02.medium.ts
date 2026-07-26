const data = [
  {
    "id": "medium-oofn-code-02-01-2026",
    "difficulty": "medium",
    "prompt": "LiveCode Complexity Drill (MEDIUM Set 02 Q1)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction query(blocks, left, right) {\n  // Case S02Q1\n  let ans = 0;\n  while (left <= right) {\n    ans += 1;\n    left += Math.max(1, Math.floor(Math.sqrt(blocks.length)));\n  }\n  return ans;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N^4)",
      "O(N^2)",
      "O(N)",
      "O(sqrt N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "The query touches roughly sqrt(N) chunks, so complexity is O(sqrt N). This snippet's dominant term is O(sqrt N)."
  },
  {
    "id": "medium-oofn-code-02-02-2026",
    "difficulty": "medium",
    "prompt": "LiveCode Complexity Drill (MEDIUM Set 02 Q2)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction buildAndSort(n) {\n  // Case S02Q2\n  const vals = [];\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n; j++) vals.push(i * n + j);\n  }\n  vals.sort((a, b) => a - b);\n  return vals.length;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(N^2 log N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Building is O(N^2), sorting N^2 items costs O(N^2 log N). This snippet's dominant term is O(N^2 log N)."
  },
  {
    "id": "medium-oofn-code-02-03-2026",
    "difficulty": "medium",
    "prompt": "LiveCode Complexity Drill (MEDIUM Set 02 Q3)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction countTriples(n) {\n  // Case S02Q3\n  let c = 0;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n; j++) {\n      for (let k = 0; k < n; k++) c++;\n    }\n  }\n  return c;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(N^4)",
      "O(sqrt N)",
      "O(N^2)",
      "O(N^3)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Three independent loops of size N produce O(N^3) total work. This snippet's dominant term is O(N^3)."
  },
  {
    "id": "medium-oofn-code-02-04-2026",
    "difficulty": "medium",
    "prompt": "LiveCode Complexity Drill (MEDIUM Set 02 Q4)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction brute4D(n) {\n  // Case S02Q4\n  let c = 0;\n  for (let a = 0; a < n; a++)\n    for (let b = 0; b < n; b++)\n      for (let c2 = 0; c2 < n; c2++)\n        for (let d = 0; d < n; d++) c++;\n  return c;\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(sqrt N)",
      "O(N^2 log N)",
      "O(N log N)",
      "O(N^4)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Four nested loops bounded by N yield O(N^4). This snippet's dominant term is O(N^4)."
  },
  {
    "id": "medium-oofn-code-02-05-2026",
    "difficulty": "medium",
    "prompt": "LiveCode Complexity Drill (MEDIUM Set 02 Q5)\\n\\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\\n\\n```ts\\nfunction exploreSubsets(i, nums) {\n  // Case S02Q5\n  if (i === nums.length) return 1;\n  return exploreSubsets(i + 1, nums) + exploreSubsets(i + 1, nums);\n}\\n```\\n\\nWhat is the dominant Big-O time complexity?",
    "options": [
      "O(sqrt N)",
      "O(N log N)",
      "O(N^2 log N)",
      "O(2^N)"
    ],
    "correctIndex": 3,
    "correctExplanation": "Each level branches into 2 calls across N levels, giving O(2^N). This snippet's dominant term is O(2^N)."
  }
]

export default data
