const data = [
  {
    id: 'easy-complete-code-python-00001-01',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Python | Frequency Count Dictionary Case P1101)\\n\\nComplete the missing line so each number count is incremented correctly.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\ndef count_values(nums):\\n    freq = {}\\n    for n in nums:\\n        # __BLANK__\\n    return freq\\n```\\n\\nQuestion seed: P1101',
    options: [
      'freq[n] = freq.get(n, 0) + 1',
      'freq[n] = 1',
      'freq.get(n, 0) + 1',
      'freq.append(n)',
    ],
    correctIndex: 0,
    correctExplanation:
      'Use dict.get with a default so first occurrence starts at 0 then increments to 1.',
  },
  {
    id: 'easy-complete-code-python-00001-02',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Python | List Comprehension Filter Case P1102)\\n\\nComplete the missing line so only even numbers are squared.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\ndef even_squares(nums):\\n    # __BLANK__\\n```\\n\\nQuestion seed: P1102',
    options: [
      'return [n * n for n in nums if n % 2 == 0]',
      'return [n * n for n in nums]',
      'return (n * n for n in nums if n % 2 == 0)',
      'return [n for n in nums if n % 2 == 0]',
    ],
    correctIndex: 0,
    correctExplanation:
      'The requirement is both filtering evens and mapping each to its square.',
  },
  {
    id: 'easy-complete-code-python-00001-03',
    difficulty: 'easy',
    prompt:
      'LiveCode Complete This Code (Python | Try Except Integer Parse Case P1103)\\n\\nComplete the missing line so invalid integers return 0 instead of crashing.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\ndef parse_or_zero(raw):\\n    try:\\n        # __BLANK__\\n    except ValueError:\\n        return 0\\n```\\n\\nQuestion seed: P1103',
    options: [
      'return int(raw)',
      'int(raw)',
      'return float(raw)',
      'raise ValueError()',
    ],
    correctIndex: 0,
    correctExplanation:
      'Convert and return inside try so ValueError is caught by except and mapped to 0.',
  },
]

export default data
