const data = [
  {
    id: 'easy-complete-code-cpp-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (C++ | Vector Frequency Count Case C1101)\n\nComplete the missing line so each value updates its count in the unordered_map.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nunordered_map<int, int> countValues(const vector<int>& nums) {\n    unordered_map<int, int> freq;\n    for (int n : nums) {\n        // __BLANK__\n    }\n    return freq;\n}\n```\n\nQuestion seed: C1101',
    options: [
      'freq[n] += 1;',
      'freq.insert({n, 1});',
      'freq[n] = 1;',
      '++n;',
    ],
    correctIndex: 0,
    correctExplanation:
      'Using operator[] initializes missing keys to 0, so incrementing accumulates true counts.',
  },
  {
    id: 'easy-complete-code-cpp-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (C++ | Two-Pointer Palindrome Move Case C1102)\n\nComplete the missing line so pointers move inward after a character match.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\nbool isPalindrome(const string& s) {\n    int left = 0;\n    int right = static_cast<int>(s.size()) - 1;\n    while (left < right) {\n        if (s[left] != s[right]) return false;\n        // __BLANK__\n    }\n    return true;\n}\n```\n\nQuestion seed: C1102',
    options: [
      'left += 1; right -= 1;',
      'left = 0; right -= 1;',
      'right += 1;',
      'return false;',
    ],
    correctIndex: 0,
    correctExplanation:
      'After confirming equality at both ends, advance left and retreat right.',
  },
  {
    id: 'easy-complete-code-cpp-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (C++ | Queue BFS Neighbor Visit Case C1103)\n\nComplete the missing line so each unvisited neighbor is marked then enqueued.\n\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\n\n```cpp\n#include <queue>\n#include <vector>\nusing namespace std;\n\nvoid addNeighbor(int nei, vector<int>& seen, queue<int>& q) {\n    if (!seen[nei]) {\n        // __BLANK__\n    }\n}\n```\n\nQuestion seed: C1103',
    options: [
      'seen[nei] = 1; q.push(nei);',
      'q.push(nei);',
      'seen[nei] = 0;',
      'q.pop();',
    ],
    correctIndex: 0,
    correctExplanation:
      'BFS should mark visited before enqueueing to prevent duplicate queue entries.',
  },
]

export default data
