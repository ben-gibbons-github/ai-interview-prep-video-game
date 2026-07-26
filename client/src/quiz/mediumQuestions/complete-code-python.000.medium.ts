const data = [
  {
    id: 'medium-complete-code-python-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Python | Sliding Window Shrink Case P2101)\\n\\nChoose the missing line that restores the window invariant when sum exceeds target.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\ndef min_len_at_least(target, nums):\\n    left = 0\\n    cur = 0\\n    best = float("inf")\\n    for right, value in enumerate(nums):\\n        cur += value\\n        while cur >= target:\\n            best = min(best, right - left + 1)\\n            # __BLANK__\\n    return 0 if best == float("inf") else best\\n```\\n\\nQuestion seed: P2101',
    options: [
      'cur -= nums[left]; left += 1',
      'left += 1',
      'cur += nums[left]; left += 1',
      'break',
    ],
    correctIndex: 0,
    correctExplanation:
      'When shrinking, subtract the outgoing left value and then advance left pointer.',
  },
  {
    id: 'medium-complete-code-python-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Python | Heap Push Pop Order Case P2102)\\n\\nChoose the missing line that keeps only k largest values using a min-heap.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\nimport heapq\\n\\ndef kth_largest(nums, k):\\n    heap = []\\n    for n in nums:\\n        heapq.heappush(heap, n)\\n        if len(heap) > k:\\n            # __BLANK__\\n    return heap[0]\\n```\\n\\nQuestion seed: P2102',
    options: [
      'heapq.heappop(heap)',
      'heapq.heappush(heap, k)',
      'heap.sort()',
      'heap.pop()',
    ],
    correctIndex: 0,
    correctExplanation:
      'A min-heap of size k discards smallest extras so root stays kth-largest candidate.',
  },
  {
    id: 'medium-complete-code-python-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (Python | BFS Queue Expansion Case P2103)\\n\\nChoose the missing line that visits each neighbor exactly once.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\nfrom collections import deque\\n\\ndef bfs(graph, start):\\n    q = deque([start])\\n    seen = {start}\\n    order = []\\n    while q:\\n        node = q.popleft()\\n        order.append(node)\\n        for nei in graph.get(node, []):\\n            if nei not in seen:\\n                # __BLANK__\\n    return order\\n```\\n\\nQuestion seed: P2103',
    options: [
      'seen.add(nei); q.append(nei)',
      'q.append(nei)',
      'seen.add(node)',
      'q.appendleft(nei)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Mark as seen before enqueue to prevent duplicate enqueues through multiple parents.',
  },
]

export default data
