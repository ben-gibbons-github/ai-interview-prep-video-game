const data = [
  {
    id: 'hard-complete-code-python-00001-01',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Python | LRU Cache Move-To-End Case P3101)\\n\\nSelect the missing line that refreshes key recency on cache hit.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\nfrom collections import OrderedDict\\n\\ndef lru_get(cache: OrderedDict, key):\\n    if key not in cache:\\n        return None\\n    value = cache[key]\\n    # __BLANK__\\n    return value\\n```\\n\\nQuestion seed: P3101',
    options: [
      'cache.move_to_end(key)',
      'cache.popitem(last=False)',
      'cache[key] = None',
      'del cache[key]',
    ],
    correctIndex: 0,
    correctExplanation:
      'LRU implementations move accessed keys to the end to mark them as most recently used.',
  },
  {
    id: 'hard-complete-code-python-00001-02',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Python | Async Gather Error Propagation Case P3102)\\n\\nSelect the missing line that runs tasks concurrently and raises on first exception.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\nimport asyncio\\n\\nasync def load_all(fetch_user, fetch_orders):\\n    # __BLANK__\\n    return user, orders\\n```\\n\\nQuestion seed: P3102',
    options: [
      'user, orders = await asyncio.gather(fetch_user(), fetch_orders())',
      'user = await fetch_user(); orders = await fetch_orders()',
      'user, orders = asyncio.gather(fetch_user(), fetch_orders())',
      'user, orders = None, None',
    ],
    correctIndex: 0,
    correctExplanation:
      'await asyncio.gather runs coroutines concurrently and propagates exceptions by default.',
  },
  {
    id: 'hard-complete-code-python-00001-03',
    difficulty: 'hard',
    prompt:
      'LiveCode Complete This Code (Python | Decorator Preserve Metadata Case P3103)\\n\\nSelect the missing line that preserves function name and docstring in a decorator.\\n\\nDefinitions:\n- __BLANK__: Insert exactly one missing line or expression at this location.\n- Preserve the current function contract (inputs, outputs, and side-effect expectations).\n- Prefer the minimal correct change that matches the stated Goal/behavior.\n- If multiple choices compile, pick the one that preserves correctness and maintainability.\n\nLook at this code:\\n\\n```py\\nfrom functools import wraps\\n\\ndef logged(fn):\\n    # __BLANK__\\n    def inner(*args, **kwargs):\\n        return fn(*args, **kwargs)\\n    return inner\\n```\\n\\nQuestion seed: P3103',
    options: [
      '@wraps(fn)',
      '@logged',
      '@staticmethod',
      '@property',
    ],
    correctIndex: 0,
    correctExplanation:
      'functools.wraps copies metadata from wrapped function onto the wrapper.',
  },
]

export default data
