const data = [
  {
    id: 'medium-oofn-code-04-01-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q1)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction minSubarrayAtLeastTarget(nums, target) {\n  // Case S04Q1\n  let left = 0;\n  let sum = 0;\n  let best = Infinity;\n\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n\n  return Number.isFinite(best) ? best : 0;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each index enters and exits the window at most once, so total pointer movement is O(N).',
  },
  {
    id: 'medium-oofn-code-04-02-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q2)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction productExceptSelfLinear(nums) {\n  // Case S04Q2\n  const out = new Array(nums.length).fill(1);\n\n  let prefix = 1;\n  for (let i = 0; i < nums.length; i++) {\n    out[i] *= prefix;\n    prefix *= nums[i];\n  }\n\n  let suffix = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    out[i] *= suffix;\n    suffix *= nums[i];\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Two linear passes over the array keep complexity linear: O(N).',
  },
  {
    id: 'medium-oofn-code-04-03-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q3)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total pushes and pops.\n\n```ts\nfunction validateStackSequencesLinear(pushed, popped) {\n  // Case S04Q3\n  const st = [];\n  let j = 0;\n  for (let i = 0; i < pushed.length; i++) {\n    st.push(pushed[i]);\n    while (st.length && j < popped.length && st[st.length - 1] === popped[j]) {\n      st.pop();\n      j++;\n    }\n  }\n  return j === popped.length;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(1)', 'O(N)', 'O(N^2)', 'O(N^3)'],
    correctIndex: 1,
    correctExplanation: 'Every value can be pushed once and popped once, so total operations are linear: O(N).',
  },
  {
    id: 'medium-oofn-code-04-04-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q4)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent input size.\n\n```ts\nfunction maxProfitOnePass(prices) {\n  // Case S04Q4\n  let minSeen = Infinity;\n  let best = 0;\n  for (let i = 0; i < prices.length; i++) {\n    minSeen = Math.min(minSeen, prices[i]);\n    best = Math.max(best, prices[i] - minSeen);\n  }\n  return best;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'The loop processes each price once and maintains constant-size state, giving O(N).',
  },
  {
    id: 'medium-oofn-code-04-05-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q5)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total characters in the string.\n\n```ts\nfunction removeAdjacentDuplicates(s) {\n  // Case S04Q5\n  const st = [];\n  for (let i = 0; i < s.length; i++) {\n    if (st.length && st[st.length - 1] === s[i]) st.pop();\n    else st.push(s[i]);\n  }\n  return st.join(\"\");\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correctIndex: 0,
    correctExplanation: 'Each character is pushed once and popped at most once, so stack work is O(N).',
  },
  {
    id: 'medium-oofn-code-04-06-2026',
    difficulty: 'medium',
    prompt: 'LiveCode Complexity Drill (MEDIUM Set 04 Q6)\n\nAnalyze the runtime complexity of the following code snippet. Let N represent total elements across both sorted arrays.\n\n```ts\nfunction intersectSortedTwoPointers(a, b) {\n  // Case S04Q6\n  let i = 0;\n  let j = 0;\n  const out = [];\n\n  while (i < a.length && j < b.length) {\n    if (a[i] === b[j]) {\n      out.push(a[i]);\n      i++;\n      j++;\n    } else if (a[i] < b[j]) {\n      i++;\n    } else {\n      j++;\n    }\n  }\n\n  return out;\n}\n```\n\nWhat is the dominant Big-O time complexity?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N^2)'],
    correctIndex: 1,
    correctExplanation: 'Each pointer advances monotonically, so each element is considered at most once: O(N).',
  },
]

export default data
