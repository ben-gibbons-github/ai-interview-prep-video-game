const data = [
  {
    "id": "medium-linear-scan-03-q1",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction normalizeAndFilter(items: number[]) {\n  const doubled: number[] = []\n  for (const value of items) doubled.push(value * 2)\n\n  const filtered: number[] = []\n  for (const value of doubled) if (value > 10) filtered.push(value)\n\n  return filtered\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "Ignoring constant factors, this does two linear passes over proportional data, so the best matching label here is O(2N)."
  },
  {
    "id": "medium-linear-scan-03-q2",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction threeLinearStages(items: string[]) {\n  let chars = 0\n  for (const item of items) chars += item.length\n  for (const _ of items) chars += 1\n  for (const _ of items) chars += 2\n  return chars\n}\n```",
    "options": ["O(N log N)", "O(3N)", "O(N^2)", "O(2^N)", "O(N^N)"],
    "correctIndex": 1,
    "correctExplanation": "There are three separate linear loops over N, so this is O(3N)."
  },
  {
    "id": "medium-linear-scan-03-q3",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction pairDistance(points: number[]) {\n  let total = 0\n  for (let i = 0; i < points.length; i += 1) {\n    for (let j = i + 1; j < points.length; j += 1) {\n      total += Math.abs(points[i] - points[j])\n    }\n  }\n  return total\n}\n```",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "The inner loop runs about N times for each outer iteration, producing quadratic growth O(N^2)."
  },
  {
    "id": "medium-linear-scan-03-q4",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction sortAndRank(items: number[]) {\n  const copy = [...items]\n  copy.sort((a, b) => a - b)\n  return copy.map((value, index) => ({ value, rank: index }))\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Sorting dominates this function, giving O(N log N). The map pass is linear and lower order."
  },
  {
    "id": "medium-linear-scan-03-q5",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction countCombinations(items: number[], i = 0): number {\n  if (i === items.length) return 1\n  return countCombinations(items, i + 1) + countCombinations(items, i + 1)\n}\n```",
    "options": ["O(2N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 3,
    "correctExplanation": "Binary branching over depth N leads to an exponential recursion tree with O(2^N) calls."
  },
  {
    "id": "medium-linear-scan-03-q6",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction nWayExpansion(n: number, depth = n): number {\n  if (depth === 0) return 1\n  let total = 0\n  for (let i = 0; i < n; i += 1) {\n    total += nWayExpansion(n, depth - 1)\n  }\n  return total\n}\n```",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 4,
    "correctExplanation": "At each of N levels it fans out by N recursive calls, so the dominant growth is O(N^N)."
  },
  {
    "id": "medium-linear-scan-03-q7",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction compareAllBuckets(buckets: number[][]) {\n  let score = 0\n  for (const bucket of buckets) {\n    for (const value of bucket) {\n      score += value\n    }\n  }\n  return score\n}\n```\n\nAssume there are N buckets and each bucket has N values.",
    "options": ["O(2N)", "O(3N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "N buckets times N values each means N^2 element visits, so runtime is O(N^2)."
  },
  {
    "id": "medium-linear-scan-03-q8",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction mergeKinda(items: number[]) {\n  if (items.length <= 1) return items\n  const mid = Math.floor(items.length / 2)\n  const left = mergeKinda(items.slice(0, mid))\n  const right = mergeKinda(items.slice(mid))\n  return merge(left, right)\n}\n```\n\nAssume merge is linear in the size of left + right.",
    "options": ["O(3N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 2,
    "correctExplanation": "Divide-and-conquer split with linear merge at each level gives O(N log N)."
  },
  {
    "id": "medium-linear-scan-03-q9",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction linearChecksum(items: number[]) {\n  let checksum = 0\n  for (const value of items) checksum ^= value\n  return checksum\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 0,
    "correctExplanation": "One complete pass over N elements yields O(N)."
  },
  {
    "id": "medium-linear-scan-03-q10",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction halfSample(items: number[]) {\n  let sample = 0\n  for (let i = 1; i < items.length; i += 2) {\n    sample += items[i]\n  }\n  return sample\n}\n```",
    "options": ["O(N^2)", "O(N/2)", "O(2N)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Index increments by 2, so about half of elements are processed: O(N/2)."
  },
  {
    "id": "medium-linear-scan-03-q11",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction doubleAudit(items: number[]) {\n  let high = 0\n  for (const value of items) if (value > 100) high += 1\n\n  let low = 0\n  for (const value of items) if (value < -100) low += 1\n\n  return high + low\n}\n```",
    "options": ["O(N)", "O(2N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Two independent full scans over N items gives O(2N)."
  },
  {
    "id": "medium-linear-scan-03-q12",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction fourChecks(items: number[]) {\n  let c1 = 0\n  for (const value of items) c1 += value > 0 ? 1 : 0\n  let c2 = 0\n  for (const value of items) c2 += value < 0 ? 1 : 0\n  let c3 = 0\n  for (const value of items) c3 += value === 0 ? 1 : 0\n  let c4 = 0\n  for (const value of items) c4 += value % 2 === 0 ? 1 : 0\n  return c1 + c2 + c3 + c4\n}\n```",
    "options": ["O(4N)", "O(N^2)", "O(N log N)", "O(2^N)", "O(N^N)"],
    "correctIndex": 0,
    "correctExplanation": "There are four separate linear traversals, so the closest form is O(4N)."
  },
  {
    "id": "medium-linear-scan-03-q13",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction fiveChecks(items: number[]) {\n  let t1 = 0\n  for (const value of items) t1 += value\n  let t2 = 0\n  for (const value of items) t2 += value * value\n  let t3 = 0\n  for (const value of items) t3 += value * value * value\n  let t4 = 0\n  for (const value of items) t4 += value % 3 === 0 ? 1 : 0\n  let t5 = 0\n  for (const value of items) t5 += value % 5 === 0 ? 1 : 0\n  return t1 + t2 + t3 + t4 + t5\n}\n```",
    "options": ["O(3N)", "O(5N)", "O(N^2)", "O(N log N)", "O(2^N)"],
    "correctIndex": 1,
    "correctExplanation": "Five complete passes over N input elements yields O(5N)."
  },
  {
    "id": "medium-linear-scan-03-q14",
    "difficulty": "medium",
    "prompt": "Estimate runtime for this function.\n\n```ts\nfunction tenDiagnostics(items: number[]) {\n  let score = 0\n  for (let phase = 0; phase < 10; phase += 1) {\n    for (const value of items) score += (value + phase) & 1\n  }\n  return score\n}\n```",
    "options": ["O(2N)", "O(5N)", "O(10N)", "O(N^2)", "O(2^N)"],
    "correctIndex": 2,
    "correctExplanation": "Constant 10 phases each scan N items once, so the class is O(10N)."
  }
]

export default data
