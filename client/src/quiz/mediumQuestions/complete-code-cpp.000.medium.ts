const data = [
  {
    id: 'medium-complete-code-cpp-00001-01',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (C++ | Min-Heap Kth Largest Trim Case C2101)\n\nChoose the missing line that keeps heap size capped at k.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <queue>\n#include <vector>\nusing namespace std;\n\nint kthLargest(const vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minHeap;\n    for (int n : nums) {\n        minHeap.push(n);\n        if (static_cast<int>(minHeap.size()) > k) {\n            // __BLANK__\n        }\n    }\n    return minHeap.top();\n}\n```\n\nQuestion seed: C2101',
    options: [
      'minHeap.pop();',
      'minHeap.push(k);',
      'minHeap.top();',
      'return -1;',
    ],
    correctIndex: 0,
    correctExplanation:
      'Removing the smallest extra value keeps only the k largest elements in a min-heap.',
  },
  {
    id: 'medium-complete-code-cpp-00001-02',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (C++ | Sliding Window Shrink Update Case C2102)\n\nChoose the missing line that shrinks the window while maintaining correct sum.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\nint minSubarrayLen(int target, const vector<int>& nums) {\n    int left = 0;\n    int cur = 0;\n    int best = INT_MAX;\n    for (int right = 0; right < static_cast<int>(nums.size()); right += 1) {\n        cur += nums[right];\n        while (cur >= target) {\n            best = min(best, right - left + 1);\n            // __BLANK__\n        }\n    }\n    return best == INT_MAX ? 0 : best;\n}\n```\n\nQuestion seed: C2102',
    options: [
      'cur -= nums[left]; left += 1;',
      'left += 1;',
      'cur += nums[left];',
      'break;',
    ],
    correctIndex: 0,
    correctExplanation:
      'When moving left boundary, subtract outgoing value then advance pointer.',
  },
  {
    id: 'medium-complete-code-cpp-00001-03',
    difficulty: 'medium',
    prompt:
      'LiveCode Complete This Code (C++ | DFS Memoization Cache Write Case C2103)\n\nChoose the missing line that stores computed result for reuse.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <unordered_map>\nusing namespace std;\n\nint fibMemo(int n, unordered_map<int, int>& memo) {\n    if (n <= 1) return n;\n    if (memo.count(n)) return memo[n];\n    int ans = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    // __BLANK__\n    return ans;\n}\n```\n\nQuestion seed: C2103',
    options: [
      'memo[n] = ans;',
      'memo.clear();',
      'memo[n] += 1;',
      'return memo[n];',
    ],
    correctIndex: 0,
    correctExplanation:
      'Memoization writes the solved subproblem so repeated calls are O(1) lookups.',
  },
]

export default data
