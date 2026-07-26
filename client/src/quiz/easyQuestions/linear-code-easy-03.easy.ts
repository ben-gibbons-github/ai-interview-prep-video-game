const data = [
  {
    "id": "easy-linear-scan-03-q1",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction walk(list: number[]): number {\n  let seen = 0\n  for (const value of list) {\n    if (value >= 0) seen += 1\n  }\n  return seen\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q2",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q3",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction allReady(tasks: { ready: boolean }[]): boolean {\n  for (const task of tasks) {\n    if (!task.ready) return false\n  }\n  return true\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q4",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction inspect(values: string[]): number {\n  let count = 0\n  for (let i = 0; i < values.length; i += 1) {\n    if (values[i].length > 0) count += 1\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q5",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction walk(list: number[]): number {\n  let seen = 0\n  for (const value of list) {\n    if (value >= 0) seen += 1\n  }\n  return seen\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q6",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q7",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction findMax(nums: number[]): number {\n  let best = Number.NEGATIVE_INFINITY\n  for (const value of nums) {\n    if (value > best) best = value\n  }\n  return best\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q8",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction inspect(values: string[]): number {\n  let count = 0\n  for (let i = 0; i < values.length; i += 1) {\n    if (values[i].length > 0) count += 1\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q9",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction walk(list: number[]): number {\n  let seen = 0\n  for (const value of list) {\n    if (value >= 0) seen += 1\n  }\n  return seen\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  },
  {
    "id": "easy-linear-scan-03-q10",
    "difficulty": "easy",
    "prompt": "Look at this code:\n\n```ts\nfunction analyze(items: number[]): number {\n  let total = 0\n  for (const item of items) {\n    total += item\n  }\n  return total\n}\n```\n\nthen pick the right complexity from the list of answers.",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)",
      "O(N^2)"
    ],
    "correctIndex": 2,
    "correctExplanation": "This is O(N) because the code performs a single linear pass over the input and processes each element a constant number of times. For easy difficulty, look for the answer that matches a single pass over the input."
  }
]

export default data
