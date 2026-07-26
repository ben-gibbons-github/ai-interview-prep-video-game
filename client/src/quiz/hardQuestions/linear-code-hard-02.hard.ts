const data = [
  {
    "id": "hard-linear-scan-02-q1",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction preprocess(items: number[]) {\n  const normalized = items.map((value) => value * 3)\n  const flags = normalized.map((value) => value > 0)\n  return flags.filter(Boolean).length\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "This uses three linear passes over proportional data, so the closest class is O(3N)."
  },
  {
    "id": "hard-linear-scan-02-q2",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction adjacencyMatrix(edges: Array<[number, number]>, n: number) {\n  const matrix = Array.from({ length: n }, () => Array(n).fill(0))\n  for (const [a, b] of edges) matrix[a][b] = 1\n  for (let i = 0; i < n; i += 1) {\n    for (let j = 0; j < n; j += 1) {\n      matrix[i][j] += 0\n    }\n  }\n  return matrix\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "The dense matrix traversal is quadratic in n and dominates, so runtime is O(N^2)."
  },
  {
    "id": "hard-linear-scan-02-q3",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction stableRank(items: number[]) {\n  const sorted = [...items].sort((a, b) => a - b)\n  const rank = new Map<number, number>()\n  for (let i = 0; i < sorted.length; i += 1) rank.set(sorted[i], i)\n  return items.map((value) => rank.get(value) ?? -1)\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Sorting introduces O(N log N), which dominates the additional linear mapping passes."
  },
  {
    "id": "hard-linear-scan-02-q4",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction enumerateSubsets(values: number[], i = 0): number {\n  if (i === values.length) return 1\n  const left = enumerateSubsets(values, i + 1)\n  const right = enumerateSubsets(values, i + 1)\n  return left + right\n}\n```",
    "options": ["O(2N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 3,
    "correctExplanation": "Binary recursion over depth N builds an exponential tree with about 2^N leaves."
  },
  {
    "id": "hard-linear-scan-02-q5",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction deepNary(n: number, depth = n): number {\n  if (depth === 0) return 1\n  let total = 0\n  for (let branch = 0; branch < n; branch += 1) {\n    total += deepNary(n, depth - 1)\n  }\n  return total\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 4,
    "correctExplanation": "Branching factor N for N levels yields dominant growth of O(N^N)."
  },
  {
    "id": "hard-linear-scan-02-q6",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction twoLinearValidations(rows: string[]) {\n  let asciiOnly = 0\n  for (const row of rows) {\n    if (/^[\\x00-\\x7F]*$/.test(row)) asciiOnly += 1\n  }\n\n  let nonEmpty = 0\n  for (const row of rows) {\n    if (row.length > 0) nonEmpty += 1\n  }\n\n  return asciiOnly + nonEmpty\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "Two independent full scans over N rows gives O(2N)."
  },
  {
    "id": "hard-linear-scan-02-q7",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction halfAndMerge(items: number[]): number[] {\n  if (items.length <= 1) return items\n  const mid = items.length >> 1\n  const left = halfAndMerge(items.slice(0, mid))\n  const right = halfAndMerge(items.slice(mid))\n  return merge(left, right)\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "This is classic divide-and-conquer with linear merge per level, resulting in O(N log N)."
  },
  {
    "id": "hard-linear-scan-02-q8",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction tripleAudit(items: number[]) {\n  let negatives = 0\n  for (const value of items) if (value < 0) negatives += 1\n\n  let zeros = 0\n  for (const value of items) if (value === 0) zeros += 1\n\n  let positives = 0\n  for (const value of items) if (value > 0) positives += 1\n\n  return { negatives, zeros, positives }\n}\n```",
    "options": ["O(N^2)", "O(3N)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 1,
    "correctExplanation": "The function runs three full linear passes, so the closest runtime label is O(3N)."
  },
  {
    "id": "hard-linear-scan-02-q9",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction exactLinearFold(items: number[]) {\n  let acc = 0\n  for (const value of items) acc = (acc + value) % 1_000_000_007\n  return acc\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "One pass, constant work per element, so runtime is O(N)."
  },
  {
    "id": "hard-linear-scan-02-q10",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction halfStrideNormalization(items: number[]) {\n  let norm = 0\n  for (let i = 0; i < items.length; i += 2) {\n    norm += Math.abs(items[i])\n  }\n  return norm\n}\n```",
    "options": ["O(N^2)", "O(N/2)", "O(2N)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Only every other element is visited, so this executes about N/2 iterations: O(N/2)."
  },
  {
    "id": "hard-linear-scan-02-q11",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction twoStageGuardrails(items: number[]) {\n  let valid = 0\n  for (const value of items) if (Number.isFinite(value)) valid += 1\n\n  let bounded = 0\n  for (const value of items) if (value >= -1_000 && value <= 1_000) bounded += 1\n\n  return valid + bounded\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Two full linear validations makes the closest form O(2N)."
  },
  {
    "id": "hard-linear-scan-02-q12",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction fourStagePipeline(items: number[]) {\n  let s1 = 0\n  for (const value of items) s1 += value\n  let s2 = 0\n  for (const value of items) s2 += value * value\n  let s3 = 0\n  for (const value of items) s3 += Math.trunc(value / 3)\n  let s4 = 0\n  for (const value of items) s4 += value % 7 === 0 ? 1 : 0\n  return s1 + s2 + s3 + s4\n}\n```",
    "options": ["O(4N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 0,
    "correctExplanation": "Four independent linear stages over N elements gives O(4N)."
  },
  {
    "id": "hard-linear-scan-02-q13",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction fiveStagePipeline(items: number[]) {\n  let a = 0\n  for (const value of items) a += value\n  let b = 0\n  for (const value of items) b += value * 2\n  let c = 0\n  for (const value of items) c += value > 100 ? 1 : 0\n  let d = 0\n  for (const value of items) d += value < -100 ? 1 : 0\n  let e = 0\n  for (const value of items) e += value === 0 ? 1 : 0\n  return a + b + c + d + e\n}\n```",
    "options": ["O(3N)", "O(5N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Five separate full passes over N items yields O(5N)."
  },
  {
    "id": "hard-linear-scan-02-q14",
    "difficulty": "hard",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction tenPassInstrumentation(items: number[]) {\n  let metric = 0\n  for (let pass = 0; pass < 10; pass += 1) {\n    for (const value of items) metric += (value + pass) % 3\n  }\n  return metric\n}\n```",
    "options": ["O(2N)", "O(5N)", "O(10N)", "O(N^2)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "The outer loop count is constant (10), each pass is linear in N, giving O(10N)."
  }
]

export default data
