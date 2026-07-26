const data = [
  {
    id: 'easy-complete-code-LiveCode-easy-00002-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Valid Parentheses Stack Case 101)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction isValid(s: string): boolean {\n  const stack: string[] = []\n  const pairs = new Map([[\')\', \"(\"], [\']\', \"[\"], [\'}\', \"{\"]])\n  for (const ch of s) {\n    if (ch === \"(\" || ch === \"[\" || ch === \"{\") {\n      stack.push(ch)\n    } else {\n      // __BLANK__\n    }\n  }\n  return stack.length === 0\n}\\n```\\n\\nQuestion seed: 101',
    options: [
      'stack.push(ch)',
      'if (stack.pop() !== pairs.get(ch)) return false',
      'if (stack.length) return true',
      'return ch === stack[0]',
    ],
    correctIndex: 1,
    correctExplanation:
      'Closing brackets must match the most recent opening bracket to preserve stack order.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Palindrome Two Pointers Case 102)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction isPalindrome(s: string): boolean {\n  let left = 0\n  let right = s.length - 1\n  while (left < right) {\n    if (s[left] !== s[right]) return false\n    // __BLANK__\n  }\n  return true\n}\\n```\\n\\nQuestion seed: 102',
    options: [
      'left += 1; right -= 1',
      'left = 0; right -= 1',
      'right += 1',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'After matching a pair, move both pointers inward to check the next mirrored characters.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Reverse Linked List Iterative Case 103)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype Node = { val: number; next: Node | null }\n\nfunction reverse(head: Node | null): Node | null {\n  let prev: Node | null = null\n  let cur = head\n  while (cur) {\n    const next = cur.next\n    cur.next = prev\n    prev = cur\n    // __BLANK__\n  }\n  return prev\n}\\n```\\n\\nQuestion seed: 103',
    options: ['cur = next', 'prev = next', 'cur.next = next', 'return cur'],
    correctIndex: 0,
    correctExplanation:
      'Advance current pointer to the saved next node after rewiring links.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-04',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Anagram Frequency Compare Case 104)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction isAnagram(a: string, b: string): boolean {\n  if (a.length !== b.length) return false\n  const freq = new Map<string, number>()\n  for (const ch of a) freq.set(ch, (freq.get(ch) ?? 0) + 1)\n  for (const ch of b) {\n    const count = freq.get(ch) ?? 0\n    if (count === 0) return false\n    // __BLANK__\n  }\n  return true\n}\\n```\\n\\nQuestion seed: 104',
    options: [
      'freq.set(ch, count - 1)',
      'freq.set(ch, count + 1)',
      'freq.delete(ch)',
      'return false',
    ],
    correctIndex: 0,
    correctExplanation:
      'Subtracting each character from b ensures multiset counts match exactly.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-05',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Climbing Stairs DP Case 105)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction climbStairs(n: number): number {\n  if (n <= 2) return n\n  const dp = new Array(n + 1).fill(0)\n  dp[1] = 1\n  dp[2] = 2\n  for (let i = 3; i <= n; i += 1) {\n    // __BLANK__\n  }\n  return dp[n]\n}\\n```\\n\\nQuestion seed: 105',
    options: [
      'dp[i] = dp[i - 1] + dp[i - 2]',
      'dp[i] = dp[i - 1] - dp[i - 2]',
      'dp[i] = dp[i - 1]',
      'dp[i] = i',
    ],
    correctIndex: 0,
    correctExplanation:
      'Ways to reach step i equals ways from i-1 plus ways from i-2.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-06',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Flood Fill BFS Enqueue Case 106)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction visit(grid: number[][], r: number, c: number, q: Array<[number, number]>, target: number): void {\n  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return\n  if (grid[r][c] !== target) return\n  grid[r][c] = -1\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 106',
    options: [
      'q.push([r, c])',
      'q.unshift([r, c]); q.pop()',
      'return [r, c] as unknown as void',
      'grid[r][c] = target',
    ],
    correctIndex: 0,
    correctExplanation:
      'After marking visited, enqueue the cell so BFS processes its neighbors.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-07',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Matrix Transpose Swap Case 107)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction transpose(m: number[][]): number[][] {\n  const rows = m.length\n  const cols = m[0].length\n  const out = Array.from({ length: cols }, () => new Array(rows).fill(0))\n  for (let r = 0; r < rows; r += 1) {\n    for (let c = 0; c < cols; c += 1) {\n      // __BLANK__\n    }\n  }\n  return out\n}\\n```\\n\\nQuestion seed: 107',
    options: ['out[c][r] = m[r][c]', 'out[r][c] = m[c][r]', 'out[r][c] = m[r][c]', 'return out'],
    correctIndex: 0,
    correctExplanation:
      'Transpose maps element (r, c) to (c, r).',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-08',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Product Except Self Prefix Pass Case 108)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction productExceptSelf(nums: number[]): number[] {\n  const out = new Array(nums.length).fill(1)\n  let prefix = 1\n  for (let i = 0; i < nums.length; i += 1) {\n    out[i] = prefix\n    // __BLANK__\n  }\n  return out\n}\\n```\\n\\nQuestion seed: 108',
    options: ['prefix *= nums[i]', 'prefix += nums[i]', 'out[i] *= nums[i]', 'prefix = out[i]'],
    correctIndex: 0,
    correctExplanation:
      'Update running prefix product after writing the current prefix contribution.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-09',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Contains Duplicate Set Check Case 109)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction hasDuplicate(nums: number[]): boolean {\n  const seen = new Set<number>()\n  for (const value of nums) {\n    if (seen.has(value)) return true\n    // __BLANK__\n  }\n  return false\n}\\n```\\n\\nQuestion seed: 109',
    options: ['seen.add(value)', 'seen.delete(value)', 'return true', 'continue'],
    correctIndex: 0,
    correctExplanation:
      'Record each unseen value so future repeats can be detected in O(1) average time.',
  },
  {
    id: 'easy-complete-code-LiveCode-easy-00002-10',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Best Time To Buy And Sell Stock Case 110)\\n\\nComplete the missing line so the implementation stays correct and efficient.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction maxProfit(prices: number[]): number {\n  let best = 0\n  let minPrice = Infinity\n  for (const p of prices) {\n    minPrice = Math.min(minPrice, p)\n    // __BLANK__\n  }\n  return best\n}\\n```\\n\\nQuestion seed: 110',
    options: [
      'best = Math.max(best, p - minPrice)',
      'best = Math.min(best, p - minPrice)',
      'minPrice = p - minPrice',
      'best += p',
    ],
    correctIndex: 0,
    correctExplanation:
      'Profit at each day is current price minus best buy-so-far price; keep the maximum.',
  },
]

export default data
