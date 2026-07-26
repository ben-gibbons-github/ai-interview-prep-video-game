const data = [
  {
    "id": "easy-complete-code-LiveCode-easy-00001-01",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Binary Search Boundary Case 1)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction search(nums: number[], target: number): number {\n  let left = 0\n  let right = nums.length - 1\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2)\n    if (nums[mid] === target) return mid\n    if (nums[mid] < target) {\n      // __BLANK__\n    } else {\n      right = mid - 1\n    }\n  }\n  return -1\n}\\n```\\n\\nQuestion seed: 1",
    "options": [
      "left = 0",
      "left = mid + 1",
      "left += 1",
      "right = mid + 1"
    ],
    "correctIndex": 1,
    "correctExplanation": "When mid is too small, discard left..mid by moving left to mid + 1."
  },
  {
    "id": "easy-complete-code-LiveCode-easy-00001-02",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Sliding Window Shrink Case 2)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction minLen(target: number, nums: number[]): number {\n  let left = 0\n  let sum = 0\n  let best = Infinity\n  for (let right = 0; right < nums.length; right += 1) {\n    sum += nums[right]\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1)\n      // __BLANK__\n    }\n  }\n  return best === Infinity ? 0 : best\n}\\n```\\n\\nQuestion seed: 2",
    "options": [
      "sum -= nums[left]; left += 1",
      "right += 1",
      "sum += nums[left]; left += 1",
      "left = 0"
    ],
    "correctIndex": 0,
    "correctExplanation": "After recording a valid window, remove the leftmost value and advance left."
  },
  {
    "id": "easy-complete-code-LiveCode-easy-00001-03",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Prefix Sum Build Case 3)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildPrefix(nums: number[]): number[] {\n  const prefix = new Array(nums.length + 1).fill(0)\n  for (let i = 0; i < nums.length; i += 1) {\n    // __BLANK__\n  }\n  return prefix\n}\\n```\\n\\nQuestion seed: 3",
    "options": [
      "prefix[i] = nums[i] - prefix[i]",
      "prefix[i] = nums[i]",
      "prefix[i + 1] = nums[i + 1]",
      "prefix[i + 1] = prefix[i] + nums[i]"
    ],
    "correctIndex": 3,
    "correctExplanation": "Each prefix entry accumulates the prior prefix plus current value."
  },
  {
    "id": "easy-complete-code-LiveCode-easy-00001-04",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (DFS Neighbor Expansion Case 4)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction dfs(node: number, graph: number[][], seen: boolean[]): void {\n  if (seen[node]) return\n  seen[node] = true\n  for (const nei of graph[node]) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 4",
    "options": [
      "return nei",
      "graph[nei].push(node)",
      "dfs(nei, graph, seen)",
      "seen[nei] = false"
    ],
    "correctIndex": 2,
    "correctExplanation": "DFS recursively visits each reachable unvisited neighbor."
  },
  {
    "id": "easy-complete-code-LiveCode-easy-00001-05",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Merge Sorted Streams Case 5)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction mergeSorted(a: number[], b: number[]): number[] {\n  const out: number[] = []\n  let i = 0\n  let j = 0\n  while (i < a.length && j < b.length) {\n    // __BLANK__\n  }\n  while (i < a.length) out.push(a[i++])\n  while (j < b.length) out.push(b[j++])\n  return out\n}\\n```\\n\\nQuestion seed: 5",
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
    "id": "easy-complete-code-LiveCode-easy-00001-06",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Monotonic Stack Daily Temps Case 6)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction dailyTemps(t: number[]): number[] {\n  const ans = new Array(t.length).fill(0)\n  const stack: number[] = []\n  for (let i = 0; i < t.length; i += 1) {\n    while (stack.length && t[i] > t[stack[stack.length - 1]]) {\n      const prev = stack.pop()!\n      ans[prev] = i - prev\n    }\n    // __BLANK__\n  }\n  return ans\n}\\n```\\n\\nQuestion seed: 6",
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
    "id": "easy-complete-code-LiveCode-easy-00001-07",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Backtracking Unchoose Case 7)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction subsets(nums: number[]): number[][] {\n  const out: number[][] = []\n  const path: number[] = []\n  const bt = (i: number) => {\n    if (i === nums.length) {\n      out.push([...path])\n      return\n    }\n    path.push(nums[i])\n    bt(i + 1)\n    // __BLANK__\n    bt(i + 1)\n  }\n  bt(0)\n  return out\n}\\n```\\n\\nQuestion seed: 7",
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
    "id": "easy-complete-code-LiveCode-easy-00001-08",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Top-K Min-Heap Trim Case 8)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction addToTopK(heap: number[], value: number, k: number) {\n  heap.push(value)\n  heap.sort((x, y) => x - y)\n  if (heap.length > k) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 8",
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
    "id": "easy-complete-code-LiveCode-easy-00001-09",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Frequency Map Count Case 9)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction countChars(s: string): Map<string, number> {\n  const freq = new Map<string, number>()\n  for (const ch of s) {\n    // __BLANK__\n  }\n  return freq\n}\\n```\\n\\nQuestion seed: 9",
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
    "id": "easy-complete-code-LiveCode-easy-00001-10",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Queue BFS Layer Walk Case 10)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction bfs(start: number, graph: number[][]): number[] {\n  const q: number[] = [start]\n  const seen = new Set<number>([start])\n  const order: number[] = []\n  while (q.length) {\n    const cur = q.shift()!\n    order.push(cur)\n    for (const nei of graph[cur]) {\n      if (!seen.has(nei)) {\n        // __BLANK__\n      }\n    }\n  }\n  return order\n}\\n```\\n\\nQuestion seed: 10",
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
    "id": "easy-complete-code-LiveCode-easy-00001-11",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Two Pointers Pair Sum Case 11)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasPair(nums: number[], target: number): boolean {\n  nums.sort((x, y) => x - y)\n  let left = 0\n  let right = nums.length - 1\n  while (left < right) {\n    const sum = nums[left] + nums[right]\n    if (sum === target) return true\n    if (sum < target) {\n      // __BLANK__\n    } else {\n      right -= 1\n    }\n  }\n  return false\n}\\n```\\n\\nQuestion seed: 11",
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
    "id": "easy-complete-code-LiveCode-easy-00001-12",
    "difficulty": "easy",
    "prompt": "LiveCode Complete This Code (Kadane Running Best Case 12)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction maxSubArray(nums: number[]): number {\n  let best = -Infinity\n  let cur = 0\n  for (const n of nums) {\n    cur = Math.max(n, cur + n)\n    // __BLANK__\n  }\n  return best\n}\\n```\\n\\nQuestion seed: 12",
    "options": [
      "best = Math.min(best, cur)",
      "best += cur",
      "best = Math.max(best, cur)",
      "cur = best"
    ],
    "correctIndex": 2,
    "correctExplanation": "Track global best against the current optimal ending-at-position sum."
  }
]

export default data
