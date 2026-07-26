const data = [
  {
    "id": "medium-linear-scan-05-q1",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction countActive(flags: boolean[]): number {\n  let count = 0\n  for (const flag of flags) {\n    if (flag) count += 1\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
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
    "id": "medium-linear-scan-05-q2",
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
    "id": "medium-linear-scan-05-q3",
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
    "id": "medium-linear-scan-05-q4",
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
    "id": "medium-linear-scan-05-q5",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction positives(nums: number[]): number[] {\n  const result: number[] = []\n  for (const num of nums) {\n    if (num > 0) result.push(num)\n  }\n  return result\n}\n```\n\nthen pick the right complexity from the list of answers.",
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
    "id": "medium-linear-scan-05-q6",
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
    "id": "medium-linear-scan-05-q7",
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
    "id": "medium-linear-scan-05-q8",
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
    "id": "medium-linear-scan-05-q9",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction flattenLength(groups: string[][]): number {\n  let count = 0\n  for (const group of groups) {\n    count += group.length\n  }\n  return count\n}\n```\n\nthen pick the right complexity from the list of answers.",
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
    "id": "medium-linear-scan-05-q10",
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
  }
]

export default data
