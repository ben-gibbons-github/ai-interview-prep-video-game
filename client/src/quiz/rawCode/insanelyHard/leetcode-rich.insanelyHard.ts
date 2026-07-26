import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-insanely-hard-rich-distinct-subseq-5001",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Distinct Subsequences Count)\n\nScenario: A sequence analytics backend counts how many ways target can be formed from source deletions.\n\nImplement `solve(input)` where `input = { s: string, t: string }`.\n\nReturn: number of distinct subsequences of s equal to t.\n\nConstraints & Notes: Counts can be large but fit JS number for tests.\n\nHint: DP where dp[i][j] uses include/exclude transitions.",
    "correctExplanation": "If chars match add both choose+skip paths, else carry skip path. Time O(|s|*|t|), Space O(|t|) optimized.",
    "tests": [
      {
        "input": [
          {
            "s": "rabbbit",
            "t": "rabbit"
          }
        ],
        "expected": 3
      },
      {
        "input": [
          {
            "s": "babgbag",
            "t": "bag"
          }
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-minimum-cost-cut-stick-5002",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Minimum Cost To Cut A Stick)\n\nScenario: A fabrication planner minimizes cumulative cut cost over required cut positions.\n\nImplement `solve(input)` where `input = { n: number, cuts: number[] }`.\n\nReturn: minimum total cost.\n\nConstraints & Notes: Cut cost equals current segment length.\n\nHint: Interval DP on sorted cut boundaries.",
    "correctExplanation": "Try each cut as first cut in interval and take min(subproblems + interval length). Time O(m^3), Space O(m^2).",
    "tests": [
      {
        "input": [
          {
            "n": 7,
            "cuts": [
              1,
              3,
              4,
              5
            ]
          }
        ],
        "expected": 16
      },
      {
        "input": [
          {
            "n": 9,
            "cuts": [
              5,
              6,
              1,
              4,
              2
            ]
          }
        ],
        "expected": 22
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-max-score-multiplication-5003",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Maximum Score From Multiplication Operations)\n\nScenario: A strategy model picks from array ends each round against weighted multipliers.\n\nImplement `solve(input)` where `input = { nums: number[], multipliers: number[] }`.\n\nReturn: maximum achievable score.\n\nConstraints & Notes: At each step choose left or right remaining number.\n\nHint: DP by operation index and how many taken from left.",
    "correctExplanation": "State (i,leftTaken) determines right index and best future score. Time O(m^2), Space O(m^2).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              1,
              2,
              3
            ],
            "multipliers": [
              3,
              2,
              1
            ]
          }
        ],
        "expected": 14
      },
      {
        "input": [
          {
            "nums": [
              -5,
              -3,
              -3,
              -2,
              7,
              1
            ],
            "multipliers": [
              -10,
              -5,
              3,
              4,
              6
            ]
          }
        ],
        "expected": 102
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-race-car-5004",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Race Car Min Instructions)\n\nScenario: A control system computes shortest command sequence to hit exact target position.\n\nImplement `solve(input)` where `input = number` target.\n\nReturn: minimum instruction count.\n\nConstraints & Notes: Commands: A (accelerate), R (reverse).\n\nHint: DP with nearest power-of-two overshoot/undershoot cases.",
    "correctExplanation": "Use memoized recursion on target based on bit-length strategy. Sub-quadratic DP over target range.",
    "tests": [
      {
        "input": [
          3
        ],
        "expected": 2
      },
      {
        "input": [
          6
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-cherry-pickup-5005",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Cherry Pickup II (Two Robots))\n\nScenario: A warehouse simulator routes two collectors to maximize pickup over grid rows.\n\nImplement `solve(input)` where `input = number[][]` grid.\n\nReturn: maximum cherries collectible.\n\nConstraints & Notes: Robots start at top-left and top-right, move to next row with -1/0/+1 col shifts.\n\nHint: 3D DP row,col1,col2.",
    "correctExplanation": "Transition over both robots’ next column choices and avoid double-counting same cell. Time O(r*c*c*9), Space O(c*c) rolling.",
    "tests": [
      {
        "input": [
          [
            [
              3,
              1,
              1
            ],
            [
              2,
              5,
              1
            ],
            [
              1,
              5,
              5
            ],
            [
              2,
              1,
              1
            ]
          ]
        ],
        "expected": 24
      },
      {
        "input": [
          [
            [
              1,
              0,
              0,
              0,
              0,
              0,
              1
            ],
            [
              2,
              0,
              0,
              0,
              0,
              3,
              0
            ],
            [
              2,
              0,
              9,
              0,
              0,
              0,
              0
            ],
            [
              0,
              3,
              0,
              5,
              4,
              0,
              0
            ],
            [
              1,
              0,
              2,
              3,
              0,
              0,
              6
            ]
          ]
        ],
        "expected": 28
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-smallest-sufficient-team-size-5006",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Smallest Sufficient Team Size)\n\nScenario: A staffing engine chooses minimal people set covering all required skills.\n\nImplement `solve(input)` where `input = { reqSkills: string[], people: string[][] }`.\n\nReturn: size of smallest sufficient team.\n\nConstraints & Notes: Any valid minimum size accepted.\n\nHint: Bitmask DP over skill coverage states.",
    "correctExplanation": "Map skills to bits, iterate people updating best team per covered mask. Time O(P * 2^S), Space O(2^S).",
    "tests": [
      {
        "input": [
          {
            "reqSkills": [
              "java",
              "nodejs",
              "reactjs"
            ],
            "people": [
              [
                "java"
              ],
              [
                "nodejs"
              ],
              [
                "nodejs",
                "reactjs"
              ]
            ]
          }
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-num-ways-stay-same-5007",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Number Of Ways To Stay In Same Place)\n\nScenario: A random walk model counts sequences of moves ending at origin after exact steps.\n\nImplement `solve(input)` where `input = { steps: number, arrLen: number }`.\n\nReturn: number of ways modulo 1_000_000_007.\n\nConstraints & Notes: Moves: left, right, stay; position bounded [0, arrLen-1].\n\nHint: DP by step and position with bounded effective width.",
    "correctExplanation": "Iteratively update next[position] from stay/left/right contributors. Time O(steps * min(arrLen, steps)), Space same.",
    "tests": [
      {
        "input": [
          {
            "steps": 3,
            "arrLen": 2
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "steps": 2,
            "arrLen": 4
          }
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-shortest-common-supersequence-length-5008",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Shortest Common Supersequence Length)\n\nScenario: A merge engine computes minimal composite string length containing two versions as subsequences.\n\nImplement `solve(input)` where `input = { a: string, b: string }`.\n\nReturn: length of shortest common supersequence.\n\nConstraints & Notes: Length = |a| + |b| - LCS(a,b).\n\nHint: Compute LCS length first.",
    "correctExplanation": "DP for LCS then derive SCS length via formula. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          {
            "a": "abac",
            "b": "cab"
          }
        ],
        "expected": 5
      },
      {
        "input": [
          {
            "a": "aaaaaaaa",
            "b": "aaaaaaaa"
          }
        ],
        "expected": 8
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-max-dot-product-subseq-5009",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Max Dot Product Of Two Subsequences)\n\nScenario: A signal matcher chooses non-empty subsequences maximizing similarity score.\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }`.\n\nReturn: maximum dot product of non-empty subsequences.\n\nConstraints & Notes: Must pick at least one pair.\n\nHint: DP with option to start new pair or extend prior best.",
    "correctExplanation": "dp[i][j] = max of pairing a[i]*b[j] alone, with previous, or skipping one side. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          {
            "a": [
              2,
              1,
              -2,
              5
            ],
            "b": [
              3,
              0,
              -6
            ]
          }
        ],
        "expected": 18
      },
      {
        "input": [
          {
            "a": [
              3,
              -2
            ],
            "b": [
              2,
              -6,
              7
            ]
          }
        ],
        "expected": 21
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-odd-even-jump-good-starts-5010",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Odd Even Jump Good Starts)\n\nScenario: A jumping-rule simulator counts start indices that can reach end under alternating rules.\n\nImplement `solve(input)` where `input = number[]`.\n\nReturn: count of good starting indices.\n\nConstraints & Notes: Odd jump chooses smallest higher/equal value index; even jump chooses largest lower/equal.\n\nHint: Monotonic stack after sorting indices by values for next-jump precomputation.",
    "correctExplanation": "Precompute oddNext/evenNext then DP backwards for reachability. Time O(n log n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            10,
            13,
            12,
            14,
            15
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            2,
            3,
            1,
            1,
            4
          ]
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-palindrome-partition-iii-5011",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Palindrome Partitioning III Min Changes)\n\nScenario: A text sanitizer partitions string into k segments minimizing edits needed per segment palindrome.\n\nImplement `solve(input)` where `input = { s: string, k: number }`.\n\nReturn: minimum total character changes.\n\nConstraints & Notes: Each segment non-empty.\n\nHint: Precompute cost[i][j] changes to make s[i..j] palindrome, then partition DP.",
    "correctExplanation": "Use interval mismatch costs and dp parts/end index transitions. Time O(n^2*k), Space O(n^2 + n*k).",
    "tests": [
      {
        "input": [
          {
            "s": "abc",
            "k": 2
          }
        ],
        "expected": 1
      },
      {
        "input": [
          {
            "s": "aabbc",
            "k": 3
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-profitable-schemes-5012",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Profitable Schemes Count)\n\nScenario: A planning tool counts subsets of jobs meeting min profit under member limit.\n\nImplement `solve(input)` where `input = { n: number, minProfit: number, group: number[], profit: number[] }`.\n\nReturn: number of schemes modulo 1_000_000_007.\n\nConstraints & Notes: Each job can be used at most once.\n\nHint: Knapsack-style DP over members and capped profit.",
    "correctExplanation": "Iterate jobs and update dp[members][profitCap] backwards. Time O(jobCount * n * minProfit), Space O(n * minProfit).",
    "tests": [
      {
        "input": [
          {
            "n": 5,
            "minProfit": 3,
            "group": [
              2,
              2
            ],
            "profit": [
              2,
              3
            ]
          }
        ],
        "expected": 2
      },
      {
        "input": [
          {
            "n": 10,
            "minProfit": 5,
            "group": [
              2,
              3,
              5
            ],
            "profit": [
              6,
              7,
              8
            ]
          }
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-stickers-spell-word-5013",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Stickers To Spell Word Min Count)\n\nScenario: A resource optimizer picks minimum sticker multiset to assemble target letters.\n\nImplement `solve(input)` where `input = { stickers: string[], target: string }`.\n\nReturn: minimum stickers required, or -1.\n\nConstraints & Notes: Can reuse stickers unlimited times.\n\nHint: Memoized DFS on remaining-target signature.",
    "correctExplanation": "Choose useful sticker reducing first char of remaining target and recurse with memoization. Exponential state space with heavy memo pruning.",
    "tests": [
      {
        "input": [
          {
            "stickers": [
              "with",
              "example",
              "science"
            ],
            "target": "thehat"
          }
        ],
        "expected": 3
      },
      {
        "input": [
          {
            "stickers": [
              "notice",
              "possible"
            ],
            "target": "basicbasic"
          }
        ],
        "expected": -1
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-minimum-incompatibility-5014",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Minimum Incompatibility)\n\nScenario: A partitioning engine groups numbers into k equal sets minimizing sum(max-min) per set.\n\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\n\nReturn: minimum incompatibility sum, or -1 if impossible.\n\nConstraints & Notes: No duplicate within a subset.\n\nHint: Bitmask DP over valid subset bundles.",
    "correctExplanation": "Precompute compatible subset costs of size n/k then DP over used-mask. Bitmask DP exponential but feasible for interview constraints.",
    "tests": [
      {
        "input": [
          {
            "nums": [
              1,
              2,
              1,
              4
            ],
            "k": 2
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "nums": [
              6,
              3,
              8,
              1,
              3,
              1,
              2,
              2
            ],
            "k": 4
          }
        ],
        "expected": 6
      }
    ]
  },
  {
    "id": "raw-coding-insanely-hard-rich-maximum-employees-invite-5015",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Maximum Employees To Be Invited)\n\nScenario: An org graph tool computes max invitation size under favorite-cycle seating rules.\n\nImplement `solve(input)` where `input = number[]` favorite mapping graph.\n\nReturn: maximum invite count.\n\nConstraints & Notes: Each employee favorites exactly one employee.\n\nHint: Combine largest cycle and mutual-pair chains.",
    "correctExplanation": "Topological trim for chain lengths into 2-cycles plus detect longest remaining cycle. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            2,
            2,
            1,
            2
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            1,
            2,
            0
          ]
        ],
        "expected": 3
      }
    ]
  }
]

export default data
