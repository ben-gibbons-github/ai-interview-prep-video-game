const data = [
  {
    id: 'medium-complete-code-LiveCode-medium-00002-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Longest Substring Sliding Window Case 4101)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction lengthOfLongestSubstring(s: string): number {\n  const seen = new Set<string>()\n  let left = 0\n  let best = 0\n  for (let right = 0; right < s.length; right += 1) {\n    while (seen.has(s[right])) {\n      seen.delete(s[left])\n      left += 1\n    }\n    seen.add(s[right])\n    // __BLANK__\n  }\n  return best\n}\\n```\\n\\nQuestion seed: 4101',
    options: [
      'best = Math.max(best, right - left + 1)',
      'best = right - left',
      'best += 1',
      'left = right',
    ],
    correctIndex: 0,
    correctExplanation:
      'After restoring uniqueness, update the best window length using inclusive bounds.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Rotated Array Binary Search Branch Case 4102)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction search(nums: number[], target: number): number {\n  let left = 0\n  let right = nums.length - 1\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2)\n    if (nums[mid] === target) return mid\n    if (nums[left] <= nums[mid]) {\n      if (nums[left] <= target && target < nums[mid]) right = mid - 1\n      else left = mid + 1\n    } else {\n      // __BLANK__\n    }\n  }\n  return -1\n}\\n```\\n\\nQuestion seed: 4102',
    options: [
      'if (nums[mid] < target && target <= nums[right]) left = mid + 1; else right = mid - 1',
      'left = left + 1',
      'right = right - 1',
      'return mid',
    ],
    correctIndex: 0,
    correctExplanation:
      'When right half is sorted, narrow to that half only if target is inside its value range.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Topological Sort Initial Queue Case 4103)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction findOrder(numCourses: number, prereq: Array<[number, number]>): number[] {\n  const graph: number[][] = Array.from({ length: numCourses }, () => [])\n  const indegree = new Array(numCourses).fill(0)\n  for (const [course, pre] of prereq) {\n    graph[pre].push(course)\n    indegree[course] += 1\n  }\n  const q: number[] = []\n  for (let i = 0; i < numCourses; i += 1) {\n    // __BLANK__\n  }\n  return q\n}\\n```\\n\\nQuestion seed: 4103',
    options: [
      'if (indegree[i] === 0) q.push(i)',
      'if (indegree[i] > 0) q.push(i)',
      'q.push(indegree[i])',
      'indegree[i] = 0',
    ],
    correctIndex: 0,
    correctExplanation:
      'Kahn\'s algorithm begins with all nodes that currently have zero incoming edges.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-04',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Coin Change DP Transition Case 4104)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction coinChange(coins: number[], amount: number): number {\n  const dp = new Array(amount + 1).fill(Infinity)\n  dp[0] = 0\n  for (const c of coins) {\n    for (let x = c; x <= amount; x += 1) {\n      // __BLANK__\n    }\n  }\n  return Number.isFinite(dp[amount]) ? dp[amount] : -1\n}\\n```\\n\\nQuestion seed: 4104',
    options: [
      'dp[x] = Math.min(dp[x], dp[x - c] + 1)',
      'dp[x] = dp[x - c]',
      'dp[x] = c',
      'dp[x - c] = dp[x]',
    ],
    correctIndex: 0,
    correctExplanation:
      'Transition either keeps old value or uses one coin c plus the best for x-c.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-05',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Course Schedule DFS Cycle State Case 4105)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasCycle(node: number, graph: number[][], state: number[]): boolean {\n  if (state[node] === 1) return true\n  if (state[node] === 2) return false\n  state[node] = 1\n  for (const nei of graph[node]) {\n    if (hasCycle(nei, graph, state)) return true\n  }\n  // __BLANK__\n  return false\n}\\n```\\n\\nQuestion seed: 4105',
    options: ['state[node] = 2', 'state[node] = 1', 'state[node] = 0', 'return true'],
    correctIndex: 0,
    correctExplanation:
      'Mark node as fully processed (2) after exploring descendants with no cycle.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-06',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Word Break DP Check Case 4106)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction wordBreak(s: string, dict: Set<string>): boolean {\n  const dp = new Array(s.length + 1).fill(false)\n  dp[0] = true\n  for (let i = 1; i <= s.length; i += 1) {\n    for (let j = 0; j < i; j += 1) {\n      // __BLANK__\n    }\n  }\n  return dp[s.length]\n}\\n```\\n\\nQuestion seed: 4106',
    options: [
      'if (dp[j] && dict.has(s.slice(j, i))) { dp[i] = true; break }',
      'if (dict.has(s)) dp[i] = true',
      'dp[j] = dp[i]',
      'if (j === i) dp[i] = false',
    ],
    correctIndex: 0,
    correctExplanation:
      'A prefix ending at i is valid if some split j has a valid prefix and a dictionary suffix.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-07',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Median Two Heaps Rebalance Case 4107)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction rebalance(low: number[], high: number[]): void {\n  if (low.length > high.length + 1) {\n    high.push(low.pop()!)\n  } else if (high.length > low.length) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 4107',
    options: ['low.push(high.pop()!)', 'high.push(low.shift()!)', 'return', 'low.sort((a, b) => a - b)'],
    correctIndex: 0,
    correctExplanation:
      'If upper heap gets bigger, move its smallest representative back to lower heap.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-08',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Merge K Lists Heap Successor Case 4108)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Node = { val: number; next: Node | null }\n\nfunction consume(node: Node, heap: Node[]): void {\n  // write node to output elsewhere\n  if (node.next) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 4108',
    options: ['heap.push(node.next)', 'heap.push(node)', 'heap.unshift(node.next)', 'return node.next as unknown as void'],
    correctIndex: 0,
    correctExplanation:
      'After popping a list head, push its successor so the heap still represents current heads.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-09',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Minimum Window Substring Need Match Case 4109)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction addChar(ch: string, need: Map<string, number>, have: Map<string, number>, met: { value: number }): void {\n  if (!need.has(ch)) return\n  have.set(ch, (have.get(ch) ?? 0) + 1)\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 4109',
    options: [
      'if (have.get(ch) === need.get(ch)) met.value += 1',
      'if (have.get(ch)! > need.get(ch)!) met.value -= 1',
      'met.value = need.size',
      'have.delete(ch)',
    ],
    correctIndex: 0,
    correctExplanation:
      'A required character is considered satisfied only when its count reaches the needed count.',
  },
  {
    id: 'medium-complete-code-LiveCode-medium-00002-10',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Spiral Matrix Direction Turn Case 4110)\\n\\nChoose the missing line that preserves the algorithmic invariant and expected complexity.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction maybeTurn(nextR: number, nextC: number, rows: number, cols: number, seen: boolean[][], dir: { value: number }): void {\n  if (nextR < 0 || nextC < 0 || nextR >= rows || nextC >= cols || seen[nextR][nextC]) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 4110',
    options: ['dir.value = (dir.value + 1) % 4', 'dir.value = 0', 'dir.value -= 1', 'seen[nextR][nextC] = true'],
    correctIndex: 0,
    correctExplanation:
      'When blocked, rotate to the next direction in the right-down-left-up cycle.',
  },
]

export default data
