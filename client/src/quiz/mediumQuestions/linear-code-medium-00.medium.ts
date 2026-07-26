const data = [
  {
    "id": "medium-linear-scan-00-q1",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q2",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction total(items: number[]): number {\n  let sum = 0\n  for (let index = 0; index < items.length; index += 1) {\n    sum += items[index]\n  }\n  return sum\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q3",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction inspect(values: string[]): number {\n  let count = 0\n  for (let i = 0; i < values.length; i += 1) {\n    if (values[i].length > 0) count += 1\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q4",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction walk(list: number[]): number {\n  let seen = 0\n  for (const value of list) {\n    if (value >= 0) seen += 1\n  }\n  return seen\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q5",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q6",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction histogram(words: string[]) {\n  const counts = new Map<string, number>()\n  for (const word of words) {\n    counts.set(word, (counts.get(word) ?? 0) + 1)\n  }\n  return counts\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q7",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction inspect(values: string[]): number {\n  let count = 0\n  for (let i = 0; i < values.length; i += 1) {\n    if (values[i].length > 0) count += 1\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q8",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction walk(list: number[]): number {\n  let seen = 0\n  for (const value of list) {\n    if (value >= 0) seen += 1\n  }\n  return seen\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q9",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  },
  {
    "id": "medium-linear-scan-00-q10",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction sumCounts(entries: Map<string, number>) {\n  let total = 0\n  for (const value of entries.values()) {\n    total += value\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For medium difficulty, identify whether there is any hidden extra pass or sorting step; here there is not."
  }
]

export default data
