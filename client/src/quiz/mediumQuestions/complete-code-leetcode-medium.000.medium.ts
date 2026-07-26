const data = [
  {
    "id": "medium-complete-code-LiveCode-medium-00001-01",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Merge Sorted Streams Case 3061)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction mergeSorted(a: number[], b: number[]): number[] {\n  const out: number[] = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    // __BLANK__\n  }\n  while (i < a.length) out.push(a[i++])\n  while (j < b.length) out.push(b[j++])\n  return out\n}\\n```\\n\\nQuestion seed: 3061",
    "options": [
      "out.push(Math.max(a[i], b[j])); i += 1; j += 1",
      "if (a[i] >= b[j]) out.push(a[i++]); else out.push(b[j++])",
      "if (a[i] <= b[j]) out.push(a[i++]); else out.push(b[j++])",
      "out.push(a[i] + b[j]); i += 1; j += 1"
    ],
    "correctIndex": 2,
    "correctExplanation": "Emit the smaller head element each step to preserve global sort order."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-02",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Monotonic Stack Daily Temps Case 3062)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction dailyTemps(t: number[]): number[] {\n  const ans = new Array(t.length).fill(0)\n  const stack: number[] = []\n  for (let i = 0; i < t.length; i += 1) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      const prev = stack.pop()!\n      ans[prev] = i - prev\n    }\n    // __BLANK__\n  }\n  return ans\n}\\n```\\n\\nQuestion seed: 3062",
    "options": [
      "stack.push(i)",
      "stack.push(t[i])",
      "ans[i] = t[i]",
      "stack.shift()"
    ],
    "correctIndex": 0,
    "correctExplanation": "Store indices so you can compute waiting distance when a warmer day appears."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-03",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Backtracking Unchoose Case 3063)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction subsets(nums: number[]): number[][] {\n  const out: number[][] = []\n  const path: number[] = []\n  const bt = (i: number) => {\n    if (i === nums.length) {\n      out.push([...path])\n      return\n    }\n    path.push(nums[i])\n    bt(i + 1)\n    // __BLANK__\n    bt(i + 1)\n  }\n  bt(0)\n  return out\n}\\n```\\n\\nQuestion seed: 3063",
    "options": [
      "path.shift()",
      "out.pop()",
      "path.push(i)",
      "path.pop()"
    ],
    "correctIndex": 3,
    "correctExplanation": "Backtracking must undo the decision before exploring the alternate branch."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-04",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Top-K Min-Heap Trim Case 3064)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction addToTopK(heap: number[], value: number, k: number) {\n  heap.push(value)\n  heap.sort((x, y) => x - y)\n  if (heap.length > k) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 3064",
    "options": [
      "heap.unshift(value)",
      "heap.shift()",
      "heap.pop()",
      "heap.reverse()"
    ],
    "correctIndex": 1,
    "correctExplanation": "After sorting ascending, remove the smallest item to keep only k largest values."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-05",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Frequency Map Count Case 3065)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction countChars(s: string): Map<string, number> {\n  const freq = new Map<string, number>()\n  for (const ch of s) {\n    // __BLANK__\n  }\n  return freq\n}\\n```\\n\\nQuestion seed: 3065",
    "options": [
      "freq.set(ch, (freq.get(ch) ?? 0) + 1)",
      "freq.set(ch, 1)",
      "freq.delete(ch)",
      "freq.set(ch, ch.length)"
    ],
    "correctIndex": 0,
    "correctExplanation": "Increment current count using default 0 when character is first seen."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-06",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Queue BFS Layer Walk Case 3066)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction bfs(start: number, graph: number[][]): number[] {\n  const q: number[] = [start]\n  const seen = new Set<number>([start])\n  const order: number[] = []\n  while (q.length) {\n    const cur = q.shift()!\n    order.push(cur)\n    for (const nei of graph[cur]) {\n      if (!seen.has(nei)) {\n        // __BLANK__\n      }\n    }\n  }\n  return order\n}\\n```\\n\\nQuestion seed: 3066",
    "options": [
      "seen.add(nei); q.push(nei)",
      "q.unshift(nei)",
      "order.push(nei)",
      "seen.delete(nei)"
    ],
    "correctIndex": 0,
    "correctExplanation": "Mark before enqueue to avoid duplicate visits and keep BFS O(V + E)."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-07",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Two Pointers Pair Sum Case 3067)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasPair(nums: number[], target: number): boolean {\n  nums.sort((x, y) => x - y)\n  let left = 0\n  let right = nums.length - 1\n  while (left < right) {\n    const sum = nums[left] + nums[right]\n    if (sum === target) return true\n    if (sum < target) {\n      // __BLANK__\n    } else {\n      right -= 1\n    }\n  }\n  return false\n}\\n```\\n\\nQuestion seed: 3067",
    "options": [
      "right += 1",
      "left += 1",
      "left = 0",
      "return false"
    ],
    "correctIndex": 1,
    "correctExplanation": "If sum is too small, move left pointer rightward to increase total."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-08",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Kadane Running Best Case 3068)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction maxSubArray(nums: number[]): number {\n  let best = -Infinity\n  let cur = 0\n  for (const n of nums) {\n    cur = Math.max(n, cur + n)\n    // __BLANK__\n  }\n  return best\n}\\n```\\n\\nQuestion seed: 3068",
    "options": [
      "best = Math.min(best, cur)",
      "best += cur",
      "best = Math.max(best, cur)",
      "cur = best"
    ],
    "correctIndex": 2,
    "correctExplanation": "Track global best against the current optimal ending-at-position sum."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-09",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Rotting Grid BFS Time Case 3069)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction pushIfFresh(grid: number[][], r: number, c: number, q: Array<[number, number]>): void {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return\n  if (grid[r][c] !== 1) return\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 3069",
    "options": [
      "grid[r][c] = 2; q.push([r, c])",
      "grid[r][c] = 0",
      "q.unshift([r, c])",
      "return [r, c]"
    ],
    "correctIndex": 0,
    "correctExplanation": "Convert fresh to rotten and enqueue it so BFS propagates minute by minute."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-10",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Interval Merge Sweep Case 3070)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction mergeIntervals(intervals: Array<[number, number]>): Array<[number, number]> {\n  intervals.sort((a, b) => a[0] - b[0])\n  const out: Array<[number, number]> = []\n  for (const cur of intervals) {\n    if (!out.length || out[out.length - 1][1] < cur[0]) {\n      out.push([cur[0], cur[1]])\n    } else {\n      // __BLANK__\n    }\n  }\n  return out\n}\\n```\\n\\nQuestion seed: 3070",
    "options": [
      "out[out.length - 1][1] = Math.max(out[out.length - 1][1], cur[1])",
      "out.push(cur)",
      "out[out.length - 1][0] = cur[0]",
      "out.shift()"
    ],
    "correctIndex": 0,
    "correctExplanation": "For overlapping intervals, extend the tail end to the farther right boundary."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-11",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Matrix Prefix Query Case 3071)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction regionSum(prefix: number[][], r1: number, c1: number, r2: number, c2: number): number {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 3071",
    "options": [
      "return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]",
      "return prefix[r2][c2]",
      "return prefix[r1][c1] + prefix[r2][c2]",
      "return 0"
    ],
    "correctIndex": 0,
    "correctExplanation": "Use inclusion-exclusion with 1-based prefix matrix indexing."
  },
  {
    "id": "medium-complete-code-LiveCode-medium-00001-12",
    "difficulty": "medium",
    "prompt": "LiveCode Complete This Code (Two Sum Hash Lookup Case 3072)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction twoSum(nums: number[], target: number): number[] {\n  const seen = new Map<number, number>()\n  for (let i = 0; i < nums.length; i += 1) {\n    const need = target - nums[i]\n    // __BLANK__\n    seen.set(nums[i], i)\n  }\n  return []\n}\\n```\\n\\nQuestion seed: 3072",
    "options": [
      "if (seen.has(need)) return [seen.get(need)!, i]",
      "if (need === nums[i]) return [i, i]",
      "if (seen.size > 0) return [0, i]",
      "if (target % nums[i] === 0) return [i, 0]"
    ],
    "correctIndex": 0,
    "correctExplanation": "Check whether the complement was seen before, then return the matching pair in O(1) average lookup time."
  }
]

export default data
