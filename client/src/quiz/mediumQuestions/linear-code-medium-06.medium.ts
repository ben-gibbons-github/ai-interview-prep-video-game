const data = [
  {
    "id": "medium-linear-scan-06-q1",
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
    "id": "medium-linear-scan-06-q2",
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
    "id": "medium-linear-scan-06-q3",
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
    "id": "medium-linear-scan-06-q4",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction clone(values: string[]): string[] {\n  const copy: string[] = []\n  for (const value of values) {\n    copy.push(value)\n  }\n  return copy\n}\n```\n\nthen pick the right complexity from the list of answers.",
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
    "id": "medium-linear-scan-06-q5",
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
    "id": "medium-linear-scan-06-q6",
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
    "id": "medium-linear-scan-06-q7",
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
    "id": "medium-linear-scan-06-q8",
    "difficulty": "medium",
    "prompt": "Look at this code:\n\n```ts\nfunction joinNames(names: string[]): string {\n  let output = ''\n  for (const name of names) {\n    output += name + ','\n  }\n  return output\n}\n```\n\nthen pick the right complexity from the list of answers.",
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
    "id": "medium-linear-scan-06-q9",
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
    "id": "medium-linear-scan-06-q10",
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
  }
]

export default data
