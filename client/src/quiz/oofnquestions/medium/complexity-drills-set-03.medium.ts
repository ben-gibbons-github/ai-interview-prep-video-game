const data = [
  {
    id: 'medium-oofn-code-03-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction longestOnesAfterFlip(bits) {\n  // Case S03Q1\n  let left = 0;\n  let zeros = 0;\n  let best = 0;\n  for (let right = 0; right < bits.length; right++) {\n    if (bits[right] === 0) zeros++;\n    while (zeros > 1) {\n      if (bits[left] === 0) zeros--;\n      left++;\n    }\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Even with the inner while, each index advances left/right at most once, so total work is O(N).',
  },
  {
    id: 'medium-oofn-code-03-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction removeKFromBack(stack, k) {\n  // Case S03Q2\n  while (k > 0 && stack.length > 0) {\n    stack.pop();\n    k--;\n  }\n  return stack.length;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'In the worst case you pop all N elements once, making runtime O(N).',
  },
  {
    id: 'medium-oofn-code-03-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters processed.\n\n```ts\nfunction runLengthEncode(s) {\n  // Case S03Q3\n  if (s.length === 0) return \"\";\n  let out = \"\";\n  let count = 1;\n  for (let i = 1; i <= s.length; i++) {\n    if (i < s.length && s[i] === s[i - 1]) count++;\n    else {\n      out += s[i - 1] + String(count);\n      count = 1;\n    }\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correctIndex: 2,
    correctExplanation: 'The loop touches each input character once, so dominant processing is O(N).',
  },
  {
    id: 'medium-oofn-code-03-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction nextGreaterIndices(nums) {\n  // Case S03Q4\n  const ans = new Array(nums.length).fill(-1);\n  const st = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (st.length && nums[st[st.length - 1]] < nums[i]) {\n      ans[st.pop()] = i;\n    }\n    st.push(i);\n  }\n  return ans;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 0,
    correctExplanation: 'Each index is pushed once and popped at most once from the monotonic stack, so total work is O(N).',
  },
  {
    id: 'medium-oofn-code-03-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent the number of nodes.\n\n```ts\nfunction preorder(root) {\n  // Case S03Q5\n  if (!root) return [];\n  const st = [root];\n  const out = [];\n  while (st.length) {\n    const node = st.pop();\n    out.push(node.val);\n    if (node.right) st.push(node.right);\n    if (node.left) st.push(node.left);\n  }\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Every node is popped/processed once, so traversal runtime is O(N).',
  },
  {
    id: 'medium-oofn-code-03-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 03 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction rotateByK(arr, k) {\n  // Case S03Q6\n  const n = arr.length;\n  k %= n;\n  reverse(arr, 0, n - 1);\n  reverse(arr, 0, k - 1);\n  reverse(arr, k, n - 1);\n  return arr;\n}\n\nfunction reverse(a, l, r) {\n  while (l < r) {\n    const t = a[l];\n    a[l] = a[r];\n    a[r] = t;\n    l++;\n    r--;\n  }\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Three reversals each do linear work over disjoint/overlapping ranges with constant factors, so total is O(N).',
  },
]

export default data
