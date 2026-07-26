const data = [
  {
    "id": "hard-complete-code-LiveCode-hard-00001-01",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Frequency Map Count Case 6121)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction countChars(s: string): Map<string, number> {\n  const freq = new Map<string, number>()\n  for (const ch of s) {\n    // __BLANK__\n  }\n  return freq\n}\\n```\\n\\nQuestion seed: 6121",
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
    "id": "hard-complete-code-LiveCode-hard-00001-02",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Queue BFS Layer Walk Case 6122)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction bfs(start: number, graph: number[][]): number[] {\n  const q: number[] = [start]\n  const seen = new Set<number>([start])\n  const order: number[] = []\n  while (q.length) {\n    const cur = q.shift()!\n    order.push(cur)\n    for (const nei of graph[cur]) {\n      if (!seen.has(nei)) {\n        // __BLANK__\n      }\n    }\n  }\n  return order\n}\\n```\\n\\nQuestion seed: 6122",
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
    "id": "hard-complete-code-LiveCode-hard-00001-03",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Two Pointers Pair Sum Case 6123)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasPair(nums: number[], target: number): boolean {\n  nums.sort((x, y) => x - y)\n  let left = 0\n  let right = nums.length - 1\n  while (left < right) {\n    const sum = nums[left] + nums[right]\n    if (sum === target) return true\n    if (sum < target) {\n      // __BLANK__\n    } else {\n      right -= 1\n    }\n  }\n  return false\n}\\n```\\n\\nQuestion seed: 6123",
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
    "id": "hard-complete-code-LiveCode-hard-00001-04",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Kadane Running Best Case 6124)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction maxSubArray(nums: number[]): number {\n  let best = -Infinity\n  let cur = 0\n  for (const n of nums) {\n    cur = Math.max(n, cur + n)\n    // __BLANK__\n  }\n  return best\n}\\n```\\n\\nQuestion seed: 6124",
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
    "id": "hard-complete-code-LiveCode-hard-00001-05",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Rotting Grid BFS Time Case 6125)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction pushIfFresh(grid: number[][], r: number, c: number, q: Array<[number, number]>): void {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return\n  if (grid[r][c] !== 1) return\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 6125",
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
    "id": "hard-complete-code-LiveCode-hard-00001-06",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Interval Merge Sweep Case 6126)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction mergeIntervals(intervals: Array<[number, number]>): Array<[number, number]> {\n  intervals.sort((a, b) => a[0] - b[0])\n  const out: Array<[number, number]> = []\n  for (const cur of intervals) {\n    if (!out.length || out[out.length - 1][1] < cur[0]) {\n      out.push([cur[0], cur[1]])\n    } else {\n      // __BLANK__\n    }\n  }\n  return out\n}\\n```\\n\\nQuestion seed: 6126",
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
    "id": "hard-complete-code-LiveCode-hard-00001-07",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Matrix Prefix Query Case 6127)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction regionSum(prefix: number[][], r1: number, c1: number, r2: number, c2: number): number {\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 6127",
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
    "id": "hard-complete-code-LiveCode-hard-00001-08",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Two Sum Hash Lookup Case 6128)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction twoSum(nums: number[], target: number): number[] {\n  const seen = new Map<number, number>()\n  for (let i = 0; i < nums.length; i += 1) {\n    const need = target - nums[i]\n    // __BLANK__\n    seen.set(nums[i], i)\n  }\n  return []\n}\\n```\\n\\nQuestion seed: 6128",
    "options": [
      "if (seen.has(need)) return [seen.get(need)!, i]",
      "if (need === nums[i]) return [i, i]",
      "if (seen.size > 0) return [0, i]",
      "if (target % nums[i] === 0) return [i, 0]"
    ],
    "correctIndex": 0,
    "correctExplanation": "Check whether the complement was seen before, then return the matching pair in O(1) average lookup time."
  },
  {
    "id": "hard-complete-code-LiveCode-hard-00001-09",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Binary Search Boundary Case 6129)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction search(nums: number[], target: number): number {\n  let left = 0\n  let right = nums.length - 1\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2)\n    if (nums[mid] === target) return mid\n    if (nums[mid] < target) {\n      // __BLANK__\n    } else {\n      right = mid - 1\n    }\n  }\n  return -1\n}\\n```\\n\\nQuestion seed: 6129",
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
    "id": "hard-complete-code-LiveCode-hard-00001-10",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Sliding Window Shrink Case 6130)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction minLen(target: number, nums: number[]): number {\n  let left = 0\n  let sum = 0\n  let best = Infinity\n  for (let right = 0; right < nums.length; right += 1) {\n    sum += nums[right]\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1)\n      // __BLANK__\n    }\n  }\n  return best === Infinity ? 0 : best\n}\\n```\\n\\nQuestion seed: 6130",
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
    "id": "hard-complete-code-LiveCode-hard-00001-11",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (Prefix Sum Build Case 6131)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction buildPrefix(nums: number[]): number[] {\n  const prefix = new Array(nums.length + 1).fill(0)\n  for (let i = 0; i < nums.length; i += 1) {\n    // __BLANK__\n  }\n  return prefix\n}\\n```\\n\\nQuestion seed: 6131",
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
    "id": "hard-complete-code-LiveCode-hard-00001-12",
    "difficulty": "hard",
    "prompt": "LiveCode Complete This Code (DFS Neighbor Expansion Case 6132)\\n\\nSelect the missing line that keeps both correctness and asymptotic behavior intact.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction dfs(node: number, graph: number[][], seen: boolean[]): void {\n  if (seen[node]) return\n  seen[node] = true\n  for (const nei of graph[node]) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 6132",
    "options": [
      "return nei",
      "graph[nei].push(node)",
      "dfs(nei, graph, seen)",
      "seen[nei] = false"
    ],
    "correctIndex": 2,
    "correctExplanation": "DFS recursively visits each reachable unvisited neighbor."
  }
]

export default data
