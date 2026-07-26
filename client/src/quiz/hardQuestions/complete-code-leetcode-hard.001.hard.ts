const data = [
  {
    id: 'hard-complete-code-LiveCode-hard-00002-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Dijkstra Relaxation Case 8101)\\n\\nContext:\\n- dist[x] is the current best-known distance from source to node x.\\n- heap stores [distance, node] entries for a min-priority queue (lazy duplicates are allowed).\\n- This helper is called while exploring edge u -> v with non-negative weight w.\\n\\nGoal:\\nIf going through u improves v, update the shortest-known state for v and enqueue the new candidate so it can be processed later.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction relax(u: number, v: number, w: number, dist: number[], heap: Array<[number, number]>): void {\n  const cand = dist[u] + w\n  if (cand < dist[v]) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 8101',
    options: [
      'dist[v] = cand; heap.push([cand, v])',
      'dist[u] = cand; heap.push([cand, u])',
      'heap.push([dist[v], v])',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'On improvement, update dist[v] and push the new tentative distance to the priority queue.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Union Find Path Compression Case 8102)\\n\\nContext:\\n- parent[i] points to i\'s current representative parent in a disjoint-set forest.\\n- A root satisfies parent[root] === root.\\n- find(x) must return x\'s root.\\n\\nGoal:\\nWhen x is not a root, recursively find the root and compress x directly to that root to keep future operations near-constant time.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction find(x: number, parent: number[]): number {\n  if (parent[x] !== x) {\n    // __BLANK__\n  }\n  return parent[x]\n}\\n```\\n\\nQuestion seed: 8102',
    options: [
      'parent[x] = find(parent[x], parent)',
      'parent[x] = x',
      'return x',
      'parent[parent[x]] = x',
    ],
    correctIndex: 0,
    correctExplanation:
      'Recursive compression flattens the tree, reducing future find operations to near-constant time.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Segment Tree Range Query Combine Case 8103)\\n\\nContext:\\n- tree[node] stores the sum for interval [l, r].\\n- Non-overlap contributes identity value 0.\\n- On partial overlap, query recurses into both children.\\n\\nGoal:\\nCombine child query results using the same operation the tree represents (sum).\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction query(node: number, l: number, r: number, ql: number, qr: number, tree: number[]): number {\n  if (qr < l || r < ql) return 0\n  if (ql <= l && r <= qr) return tree[node]\n  const mid = Math.floor((l + r) / 2)\n  const left = query(node * 2, l, mid, ql, qr, tree)\n  const right = query(node * 2 + 1, mid + 1, r, ql, qr, tree)\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 8103',
    options: ['return left + right', 'return Math.max(left, right)', 'return tree[node]', 'return 0'],
    correctIndex: 0,
    correctExplanation:
      'For a sum segment tree, partial results from child ranges are added.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-04',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Trie Wildcard DFS Branch Case 8104)\\n\\nContext:\\n- searchAt(node, word, i) checks whether suffix word[i..] matches starting at this trie node.\\n- "." is a wildcard matching exactly one character.\\n- For wildcard, every child branch must be considered.\\n\\nGoal:\\nInside the wildcard loop, recurse to i + 1 and short-circuit success as soon as any branch matches.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\ntype TrieNode = { next: Map<string, TrieNode>; end: boolean }\n\nfunction searchAt(node: TrieNode, word: string, i: number): boolean {\n  if (i === word.length) return node.end\n  const ch = word[i]\n  if (ch === ".") {\n    for (const child of node.next.values()) {\n      // __BLANK__\n    }\n    return false\n  }\n  const nxt = node.next.get(ch)\n  return nxt ? searchAt(nxt, word, i + 1) : false\n}\\n```\\n\\nQuestion seed: 8104',
    options: [
      'if (searchAt(child, word, i + 1)) return true',
      'return searchAt(child, word, i)',
      'node.end = true',
      'continue',
    ],
    correctIndex: 0,
    correctExplanation:
      'Wildcard must try every child; if any branch matches remaining suffix, search succeeds.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-05',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Sliding Window Maximum Deque Trim Case 8105)\\n\\nContext:\\n- dq stores indices, and nums[dq[0]] should always be the current window maximum candidate.\\n- dq must remain monotonic decreasing by value from front to back.\\n- This helper adds new index i before window-expiry cleanup happens elsewhere.\\n\\nGoal:\\nRemove weaker or equal tail candidates so i is inserted in the correct monotonic position.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction pushIndex(i: number, nums: number[], dq: number[]): void {\n  while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) {\n    // __BLANK__\n  }\n  dq.push(i)\n}\\n```\\n\\nQuestion seed: 8105',
    options: ['dq.pop()', 'dq.shift()', 'return', 'dq.push(i)'],
    correctIndex: 0,
    correctExplanation:
      'Maintain decreasing deque by removing weaker trailing candidates before pushing i.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-06',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Edit Distance Memo DFS Case 8106)\\n\\nContext:\\n- dist(i, j) means minimum edits needed to transform a[i..] into b[j..].\\n- key uniquely identifies subproblem (i, j).\\n- ans is the computed optimal value for this subproblem after trying insert/delete/replace.\\n\\nGoal:\\nCache the computed result before returning so repeated states are not recomputed exponentially.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction dist(i: number, j: number, a: string, b: string, memo: Map<string, number>): number {\n  const key = `${i},${j}`\n  if (memo.has(key)) return memo.get(key)!\n  if (i === a.length) return b.length - j\n  if (j === b.length) return a.length - i\n  if (a[i] === b[j]) return dist(i + 1, j + 1, a, b, memo)\n  const ans = 1 + Math.min(\n    dist(i + 1, j, a, b, memo),\n    dist(i, j + 1, a, b, memo),\n    dist(i + 1, j + 1, a, b, memo),\n  )\n  // __BLANK__\n  return ans\n}\\n```\\n\\nQuestion seed: 8106',
    options: ['memo.set(key, ans)', 'memo.set(key, 0)', 'memo.delete(key)', 'return memo.get(key)!'],
    correctIndex: 0,
    correctExplanation:
      'Store computed subproblem result so repeated states are answered in O(1) lookup.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-07',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Tarjan Lowlink Back Edge Case 8107)\\n\\nContext:\\n- disc[x] is discovery time of node x in DFS order.\\n- low[x] is the earliest discovery time reachable from x (including back edges).\\n- When edge u -> v points to a node currently in recursion stack, it is a back edge to current SCC context.\\n\\nGoal:\\nUpdate low[u] using v\'s discovery timestamp so SCC boundaries are computed correctly.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction handleBackEdge(u: number, v: number, inStack: boolean[], disc: number[], low: number[]): void {\n  if (inStack[v]) {\n    // __BLANK__\n  }\n}\\n```\\n\\nQuestion seed: 8107',
    options: ['low[u] = Math.min(low[u], disc[v])', 'disc[u] = disc[v]', 'low[v] = low[u]', 'return'],
    correctIndex: 0,
    correctExplanation:
      'Back edge to an ancestor lowers u\'s lowlink using ancestor discovery time.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-08',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Bitmask TSP Transition Case 8108)\\n\\nContext:\\n- dp[mask][u] is the minimum cost to visit exactly nodes in mask and end at u.\\n- v is currently unvisited in this state (guard already checked).\\n- nextMask is mask after adding city v.\\n\\nGoal:\\nApply the DP relaxation from (mask, u) to (nextMask, v) by minimizing with travel cost dist[u][v].\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction transition(mask: number, u: number, v: number, dist: number[][], dp: number[][]): void {\n  if ((mask & (1 << v)) !== 0) return\n  const nextMask = mask | (1 << v)\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 8108',
    options: [
      'dp[nextMask][v] = Math.min(dp[nextMask][v], dp[mask][u] + dist[u][v])',
      'dp[mask][u] = dp[nextMask][v]',
      'dp[nextMask][u] = dist[u][v]',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Transition extends path from state (mask, u) to unvisited city v and minimizes cost.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-09',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (N-Queens Diagonal Guard Case 8109)\\n\\nContext:\\n- cols tracks occupied columns.\\n- diag1 tracks occupied main diagonals keyed by (r - c).\\n- diag2 tracks occupied anti-diagonals keyed by (r + c).\\n\\nGoal:\\nReturn true only when column and both diagonals for (r, c) are all currently free.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction canPlace(r: number, c: number, cols: Set<number>, diag1: Set<number>, diag2: Set<number>): boolean {\n  // diag1 uses (r - c), diag2 uses (r + c)\n  // __BLANK__\n}\\n```\\n\\nQuestion seed: 8109',
    options: [
      'return !cols.has(c) && !diag1.has(r - c) && !diag2.has(r + c)',
      'return !cols.has(c)',
      'return !diag1.has(r + c)',
      'return true',
    ],
    correctIndex: 0,
    correctExplanation:
      'A queen is valid only if column and both diagonals are currently unused.',
  },
  {
    id: 'hard-complete-code-LiveCode-hard-00002-10',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Word Ladder BFS Frontier Expansion Case 8110)\\n\\nContext:\\n- q stores BFS frontier entries as [word, distanceFromStart].\\n- seen prevents revisiting words and guarantees shortest-path layering.\\n- expand generates all one-letter mutations of current word.\\n\\nGoal:\\nFor each valid unseen neighbor in dict, mark it seen immediately and enqueue it at the next BFS depth (steps + 1).\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```ts\\nfunction expand(word: string, steps: number, dict: Set<string>, seen: Set<string>, q: Array<[string, number]>): void {\n  for (let i = 0; i < word.length; i += 1) {\n    for (let code = 97; code <= 122; code += 1) {\n      const next = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1)\n      if (dict.has(next) && !seen.has(next)) {\n        // __BLANK__\n      }\n    }\n  }\n}\\n```\\n\\nQuestion seed: 8110',
    options: [
      'seen.add(next); q.push([next, steps + 1])',
      'q.push([next, steps])',
      'dict.delete(word)',
      'return',
    ],
    correctIndex: 0,
    correctExplanation:
      'Mark before enqueue to avoid revisits and increment depth for the next BFS layer.',
  },
]

export default data
