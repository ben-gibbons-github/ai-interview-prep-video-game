const data = [
  {
    id: 'hard-complete-code-cpp-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (C++ | Union-Find Path Compression Case C3101)\n\nSelect the missing line that performs recursive path compression in find().\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <vector>\nusing namespace std;\n\nint findRoot(int x, vector<int>& parent) {\n    if (parent[x] != x) {\n        // __BLANK__\n    }\n    return parent[x];\n}\n```\n\nQuestion seed: C3101',
    options: [
      'parent[x] = findRoot(parent[x], parent);',
      'parent[x] = x;',
      'return x;',
      'parent[parent[x]] = x;',
    ],
    correctIndex: 0,
    correctExplanation:
      'Path compression rewires each node directly to the representative root.',
  },
  {
    id: 'hard-complete-code-cpp-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (C++ | Dijkstra Relaxation Update Case C3102)\n\nSelect the missing line that applies standard edge relaxation.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <queue>\n#include <vector>\nusing namespace std;\n\nvoid relax(int u, int v, int w, vector<int>& dist, priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>>& pq) {\n    int cand = dist[u] + w;\n    if (cand < dist[v]) {\n        // __BLANK__\n    }\n}\n```\n\nQuestion seed: C3102',
    options: [
      'dist[v] = cand; pq.push({cand, v});',
      'dist[u] = cand; pq.push({cand, u});',
      'pq.push({dist[v], v});',
      'return;',
    ],
    correctIndex: 0,
    correctExplanation:
      'On improvement, update destination distance and push the new tentative pair.',
  },
  {
    id: 'hard-complete-code-cpp-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (C++ | Monotonic Deque Window Max Case C3103)\n\nSelect the missing line that preserves decreasing order in deque indices.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <deque>\n#include <vector>\nusing namespace std;\n\nvoid pushIndex(int i, const vector<int>& nums, deque<int>& dq) {\n    while (!dq.empty() && nums[dq.back()] <= nums[i]) {\n        // __BLANK__\n    }\n    dq.push_back(i);\n}\n```\n\nQuestion seed: C3103',
    options: [
      'dq.pop_back();',
      'dq.pop_front();',
      'break;',
      'return;',
    ],
    correctIndex: 0,
    correctExplanation:
      'Discard weaker trailing candidates so deque front always holds window maximum candidate.',
  },
]

export default data
