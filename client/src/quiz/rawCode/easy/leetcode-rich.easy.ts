import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-easy-rich-two-sum-exists-1001",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Two Sum Existence)\n\nScenario: A junior backend endpoint needs a quick guard that checks if any two charges add up to a fraud threshold.\n\nImplement `solve(input)` where `input = { nums: number[], target: number }`.\n\nReturn: `true` if any pair sums to target, otherwise `false`.\n\nConstraints & Notes: Do not reuse one element twice. Any pair is acceptable.\n\nHint: Track seen values in a hash set while scanning left to right.",
    "correctExplanation": "Scan once. For each value x, check whether target-x was seen already; if yes return true, otherwise add x. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              2,
              7,
              11,
              15
            ],
            "target": 9
          }
        ],
        "expected": true
      },
      {
        "input": [
          {
            "nums": [
              1,
              2,
              3,
              4
            ],
            "target": 8
          }
        ],
        "expected": false
      },
      {
        "input": [
          {
            "nums": [
              3,
              3
            ],
            "target": 6
          }
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-valid-parentheses-basic-1002",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Valid Parentheses)\n\nScenario: A parser pre-check validates if bracketed expressions are balanced before deeper compilation.\n\nImplement `solve(input)` where `input = string` containing only ()[]{}.\n\nReturn: `true` if balanced and properly nested, else `false`.\n\nConstraints & Notes: Input size can be large; fail fast on invalid close.\n\nHint: Use a stack of opening brackets.",
    "correctExplanation": "Push openings, and for each closing bracket verify it matches the latest opening. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          "()[]{}"
        ],
        "expected": true
      },
      {
        "input": [
          "([)]"
        ],
        "expected": false
      },
      {
        "input": [
          "(((())))"
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-merge-sorted-1003",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Merge Sorted Arrays)\n\nScenario: Two event streams arrive sorted by timestamp and must be merged for display.\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }` with both sorted ascending.\n\nReturn: a single merged sorted `number[]`.\n\nConstraints & Notes: Preserve duplicates.\n\nHint: Two-pointer merge.",
    "correctExplanation": "Walk both arrays with pointers, repeatedly append the smaller current value. Time O(n+m), Space O(n+m).",
    "tests": [
      {
        "input": [
          {
            "a": [
              1,
              3,
              5
            ],
            "b": [
              2,
              4,
              6
            ]
          }
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "input": [
          {
            "a": [],
            "b": [
              1,
              1
            ]
          }
        ],
        "expected": [
          1,
          1
        ]
      },
      {
        "input": [
          {
            "a": [
              2,
              2
            ],
            "b": [
              2
            ]
          }
        ],
        "expected": [
          2,
          2,
          2
        ]
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-max-profit-once-1004",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Best Time To Buy/Sell Stock I)\n\nScenario: A trading dashboard estimates max single-transaction profit for quick strategy previews.\n\nImplement `solve(input)` where `input = number[]` daily prices.\n\nReturn: max profit from one buy then one sell (or 0 if none).\n\nConstraints & Notes: Must buy before sell.\n\nHint: Track minimum seen price and best gain so far.",
    "correctExplanation": "Maintain minPrice and update answer with price-minPrice at each day. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        ],
        "expected": 5
      },
      {
        "input": [
          [
            7,
            6,
            4,
            3,
            1
          ]
        ],
        "expected": 0
      },
      {
        "input": [
          [
            2,
            4,
            1
          ]
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-is-anagram-1005",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Valid Anagram)\n\nScenario: A text feature checks if two tags are character rearrangements.\n\nImplement `solve(input)` where `input = { s: string, t: string }`.\n\nReturn: `true` if t is an anagram of s else `false`.\n\nConstraints & Notes: Assume lowercase english letters only.\n\nHint: Count frequencies.",
    "correctExplanation": "If lengths differ return false; increment counts for s and decrement for t; all zeros means match. Time O(n), Space O(1) alphabet-bound.",
    "tests": [
      {
        "input": [
          {
            "s": "anagram",
            "t": "nagaram"
          }
        ],
        "expected": true
      },
      {
        "input": [
          {
            "s": "rat",
            "t": "car"
          }
        ],
        "expected": false
      },
      {
        "input": [
          {
            "s": "",
            "t": ""
          }
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-binary-search-index-1006",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Binary Search Index)\n\nScenario: A lookup service maps id to sorted index pages and needs fast existence checks.\n\nImplement `solve(input)` where `input = { nums: number[], target: number }` with nums sorted.\n\nReturn: index of target or -1.\n\nConstraints & Notes: Use logarithmic strategy.\n\nHint: Classic low/high mid loop.",
    "correctExplanation": "Narrow range by comparing target against nums[mid] until found or exhausted. Time O(log n), Space O(1).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              -1,
              0,
              3,
              5,
              9,
              12
            ],
            "target": 9
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "nums": [
              -1,
              0,
              3,
              5,
              9,
              12
            ],
            "target": 2
          }
        ],
        "expected": -1
      },
      {
        "input": [
          {
            "nums": [
              5
            ],
            "target": 5
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-flood-fill-lite-1007",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Flood Fill)\n\nScenario: A drawing tool recolors connected pixels from a clicked cell.\n\nImplement `solve(input)` where `input = { image: number[][], sr: number, sc: number, color: number }`.\n\nReturn: the recolored image.\n\nConstraints & Notes: 4-directional adjacency only.\n\nHint: DFS/BFS from start color.",
    "correctExplanation": "Capture original color, traverse connected same-color cells, repaint to new color. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          {
            "image": [
              [
                1,
                1,
                1
              ],
              [
                1,
                1,
                0
              ],
              [
                1,
                0,
                1
              ]
            ],
            "sr": 1,
            "sc": 1,
            "color": 2
          }
        ],
        "expected": [
          [
            2,
            2,
            2
          ],
          [
            2,
            2,
            0
          ],
          [
            2,
            0,
            1
          ]
        ]
      },
      {
        "input": [
          {
            "image": [
              [
                0,
                0,
                0
              ],
              [
                0,
                0,
                0
              ]
            ],
            "sr": 0,
            "sc": 0,
            "color": 0
          }
        ],
        "expected": [
          [
            0,
            0,
            0
          ],
          [
            0,
            0,
            0
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-palindrome-clean-1008",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Valid Palindrome (Alnum))\n\nScenario: An input normalizer validates mirrored token patterns while ignoring punctuation.\n\nImplement `solve(input)` where `input = string`.\n\nReturn: `true` if alphanumeric lowercase-normalized string is palindrome.\n\nConstraints & Notes: Ignore non-alphanumeric chars.\n\nHint: Two pointers with skip logic.",
    "correctExplanation": "Move pointers inward, skipping non-alnum and comparing lowercase chars. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          "A man, a plan, a canal: Panama"
        ],
        "expected": true
      },
      {
        "input": [
          "race a car"
        ],
        "expected": false
      },
      {
        "input": [
          " "
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-missing-number-1009",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Missing Number)\n\nScenario: Telemetry IDs from 0..n arrive with one missing and need reconstruction.\n\nImplement `solve(input)` where `input = number[]` containing n distinct values in [0,n].\n\nReturn: the missing value.\n\nConstraints & Notes: Exactly one missing.\n\nHint: Use arithmetic sum or xor.",
    "correctExplanation": "Compute expected sum n*(n+1)/2 and subtract actual sum. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          [
            3,
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            0,
            1
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            9,
            6,
            4,
            2,
            3,
            5,
            7,
            0,
            1
          ]
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-climb-stairs-1010",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Climbing Stairs)\n\nScenario: A game computes how many 1-step/2-step move sequences reach level n.\n\nImplement `solve(input)` where `input = number` n.\n\nReturn: number of distinct ways.\n\nConstraints & Notes: n >= 1\n\nHint: Fibonacci recurrence.",
    "correctExplanation": "dp[i]=dp[i-1]+dp[i-2], with base cases 1 and 2. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      },
      {
        "input": [
          5
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-invert-binary-tree-array-1011",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Invert Binary Tree)\n\nScenario: A visualization engine mirrors tree layouts for UI symmetry mode.\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }.\n\nReturn: the inverted tree root object after recursively swapping left/right at every node.\n\nHint: DFS or BFS swap at each node.",
    "correctExplanation": "Traverse the node graph, and at each node swap its left/right references, then recurse/iterate into children. Time O(n), Space O(h) recursion or O(n) iterative.",
    "tests": [
      {
        "input": [
          {
            "val": 4,
            "left": {
              "val": 2,
              "left": {
                "val": 1,
                "left": null,
                "right": null
              },
              "right": {
                "val": 3,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 7,
              "left": {
                "val": 6,
                "left": null,
                "right": null
              },
              "right": {
                "val": 9,
                "left": null,
                "right": null
              }
            }
          }
        ],
        "expected": [
          {
            "val": 4,
            "left": {
              "val": 7,
              "left": {
                "val": 9,
                "left": null,
                "right": null
              },
              "right": {
                "val": 6,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 2,
              "left": {
                "val": 3,
                "left": null,
                "right": null
              },
              "right": {
                "val": 1,
                "left": null,
                "right": null
              }
            }
          }
        ]
      },
      {
        "input": [
          {
            "val": 2,
            "left": {
              "val": 1,
              "left": null,
              "right": null
            },
            "right": {
              "val": 3,
              "left": null,
              "right": null
            }
          }
        ],
        "expected": [
          {
            "val": 2,
            "left": {
              "val": 3,
              "left": null,
              "right": null
            },
            "right": {
              "val": 1,
              "left": null,
              "right": null
            }
          }
        ]
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-find-pivot-index-1012",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Find Pivot Index)\n\nScenario: A balancing dashboard finds index where left and right sums match.\n\nImplement `solve(input)` where `input = number[]`.\n\nReturn: leftmost pivot index or -1.\n\nConstraints & Notes: Pivot satisfies left sum == right sum.\n\nHint: Use total sum and running left sum.",
    "correctExplanation": "At i, right = total - left - nums[i]; compare left/right and update left. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          [
            1,
            7,
            3,
            6,
            5,
            6
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": -1
      },
      {
        "input": [
          [
            2,
            1,
            -1
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-intersection-two-arrays-1013",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Intersection Of Two Arrays)\n\nScenario: A permissions sync job computes unique overlaps between two ID sets.\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }`.\n\nReturn: unique common values sorted ascending.\n\nConstraints & Notes: No duplicates in output.\n\nHint: Hash set intersection.",
    "correctExplanation": "Store smaller array in set, collect matches from other array into result set, sort final list. Time O(n+m), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "a": [
              1,
              2,
              2,
              1
            ],
            "b": [
              2,
              2
            ]
          }
        ],
        "expected": [
          2
        ]
      },
      {
        "input": [
          {
            "a": [
              4,
              9,
              5
            ],
            "b": [
              9,
              4,
              9,
              8,
              4
            ]
          }
        ],
        "expected": [
          4,
          9
        ]
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-valid-mountain-array-1014",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Valid Mountain Array)\n\nScenario: A signal monitor labels sequences as mountain-shaped spikes.\n\nImplement `solve(input)` where `input = number[]`.\n\nReturn: `true` if strictly increases then strictly decreases with both sides non-empty.\n\nConstraints & Notes: No equal adjacent values.\n\nHint: Walk up then walk down.",
    "correctExplanation": "Climb while increasing, ensure peak not first/last, then descend while decreasing to end. Time O(n), Space O(1).",
    "tests": [
      {
        "input": [
          [
            0,
            3,
            2,
            1
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            3,
            5,
            5
          ]
        ],
        "expected": false
      },
      {
        "input": [
          [
            2,
            1
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "raw-coding-easy-rich-find-the-difference-1015",
    "difficulty": "easy",
    "prompt": "Live coding Challenge (Find Added Character)\n\nScenario: A checksum layer compares two near-identical payload keys and identifies the extra char.\n\nImplement `solve(input)` where `input = { s: string, t: string }` where t is s plus one extra char shuffled.\n\nReturn: the extra character.\n\nConstraints & Notes: Exactly one extra char exists.\n\nHint: Use xor or frequency diff.",
    "correctExplanation": "Count chars in s then decrement with t; char whose count becomes negative is extra. Time O(n), Space O(1) alphabet-bound.",
    "tests": [
      {
        "input": [
          {
            "s": "abcd",
            "t": "abcde"
          }
        ],
        "expected": "e"
      },
      {
        "input": [
          {
            "s": "",
            "t": "y"
          }
        ],
        "expected": "y"
      },
      {
        "input": [
          {
            "s": "aabb",
            "t": "ababb"
          }
        ],
        "expected": "b"
      }
    ]
  }
]

export default data
