import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-insanely-hard-rich-distinct-subseq-5001",
    "difficulty": "insanelyHard",
    "prompt": "Live coding Challenge (Distinct Subsequences Count)\n\nYou are given two strings `s` and `t`. Count how many distinct subsequences of `s` are exactly equal to `t`.\nA subsequence is formed by deleting zero or more characters without changing the order of the remaining characters.\n\nImplement `solve(input)` where `input = { s: string, t: string }`.\n\nReturn a number: total distinct ways to form `t` from `s`.\n\nImportant details:\n- Different deletion choices count as different ways, even if they produce the same visible string.\n- If `t` is empty, the answer is 1 (choose nothing).\n- If `s` is empty and `t` is non-empty, answer is 0.\n- Assume answers fit in JavaScript number for provided tests.\n\nHint: Dynamic programming with include/skip transitions.",
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
    "prompt": "Live coding Challenge (Minimum Cost To Cut A Stick)\n\nYou have a stick of length `n` with required cut positions in `cuts`. You may perform cuts in any order.\nWhenever you cut a segment, the cost of that cut is the current segment length being cut.\nYour goal is to choose the cut order that minimizes total cost.\n\nImplement `solve(input)` where `input = { n: number, cuts: number[] }`.\n\nReturn a number: minimum possible total cutting cost.\n\nImportant details:\n- Every position in `cuts` must be cut exactly once.\n- Cut order changes cost significantly.\n- Typical approach: sort cuts and include boundaries 0 and n.\n\nHint: Interval DP where each possible first cut splits into two subproblems.",
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
    "prompt": "Live coding Challenge (Maximum Score From Multiplication Operations)\n\nYou are given `nums` and `multipliers`. You must perform exactly `multipliers.length` operations.\nOn operation `i`, pick either the leftmost or rightmost value from current `nums`, multiply by `multipliers[i]`, and add to score.\nThe picked number is removed from `nums`.\n\nImplement `solve(input)` where `input = { nums: number[], multipliers: number[] }`.\n\nReturn a number: maximum score achievable after all operations.\n\nImportant details:\n- You cannot skip operations.\n- You always pick from one of the two ends only.\n- Values may be negative, so greedy local choices can fail.\n\nHint: DP by operation index and count picked from left.",
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
    "prompt": "Live coding Challenge (Race Car Min Instructions)\n\nA car starts at position 0 with speed +1 on an infinite number line.\nYou can issue two commands:\n- `A` (accelerate): `position += speed`, then `speed *= 2`\n- `R` (reverse): if speed > 0 then speed = -1, else speed = +1 (position unchanged)\n\nGiven `target` (positive integer), find the minimum number of commands needed to land exactly on `target`.\n\nImplement `solve(input)` where `input = number` target.\n\nReturn a number: minimum instruction count.\n\nImportant details:\n- Exact hit required; passing target is allowed only if you later reverse and return.\n- State space is large, so memoized DP or BFS pruning is expected.\n\nHint: Use bit-length / nearest power-of-two overshoot and undershoot transitions.",
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
    "prompt": "Live coding Challenge (Cherry Pickup II (Two Robots))\n\nTwo robots move through a grid row by row to collect cherries.\n- Robot A starts at row 0, col 0\n- Robot B starts at row 0, col `cols - 1`\nEach step both robots move to the next row, and each robot may shift column by -1, 0, or +1.\nIf both land on the same cell in a row, that cell's cherries are counted once (not twice).\n\nImplement `solve(input)` where `input = number[][]` grid.\n\nReturn a number: maximum total cherries both robots can collect by the time they reach last row.\n\nImportant details:\n- Robots must stay inside bounds.\n- Both robots move simultaneously one row at a time.\n\nHint: DP state by `(row, col1, col2)`.",
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
    "prompt": "Live coding Challenge (Smallest Sufficient Team Size)\n\nYou are given required skills and a list of people, where each person has a subset of skills.\nFind the minimum number of people needed so that the union of their skills covers every required skill.\n\nImplement `solve(input)` where `input = { reqSkills: string[], people: string[][] }`.\n\nReturn a number: size of the smallest sufficient team.\n\nImportant details:\n- You only need the minimum size, not the actual team indices.\n- People can have irrelevant skills; required skills coverage is what matters.\n- Assume at least one sufficient team exists for test cases.\n\nHint: Bitmask each skill and do DP over covered-skill masks.",
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
    "prompt": "Live coding Challenge (Number Of Ways To Stay In Same Place)\n\nYou start at index 0 in an array of length `arrLen`. You must take exactly `steps` moves.\nAt each move, you may:\n- stay in place\n- move left by 1\n- move right by 1\nYou must always remain within index range `[0, arrLen - 1]`.\n\nImplement `solve(input)` where `input = { steps: number, arrLen: number }`.\n\nReturn a number: total ways to end at index 0 after exactly `steps` moves, modulo `1_000_000_007`.\n\nImportant details:\n- Count distinct move sequences.\n- Effective reachable width is limited by step count.\n\nHint: DP by step and position.",
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
    "prompt": "Live coding Challenge (Shortest Common Supersequence Length)\n\nGiven strings `a` and `b`, compute the length of the shortest string that contains both `a` and `b` as subsequences.\nA subsequence preserves order but may skip characters.\n\nImplement `solve(input)` where `input = { a: string, b: string }`.\n\nReturn a number: length of the shortest common supersequence (SCS).\n\nImportant details:\n- You only need the length, not the constructed string.\n- A standard identity is `SCS length = a.length + b.length - LCS(a, b)`.\n\nHint: Compute LCS length via DP, then derive SCS length.",
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
    "prompt": "Live coding Challenge (Max Dot Product Of Two Subsequences)\n\nPick one non-empty subsequence from `a` and one non-empty subsequence from `b` of the same length, then compute their dot product.\nFind the maximum possible dot product.\n\nImplement `solve(input)` where `input = { a: number[], b: number[] }`.\n\nReturn a number: maximum dot product.\n\nImportant details:\n- Both chosen subsequences must be non-empty.\n- Order within each array must be preserved.\n- Values can be negative; answer may also be negative.\n\nHint: 2D DP that considers pair-now, extend-previous, or skip-one-side transitions.",
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
    "prompt": "Live coding Challenge (Odd Even Jump Good Starts)\n\nGiven array `arr`, from index `i` you perform alternating jumps:\n- 1st jump (odd): go to index `j > i` with smallest value `arr[j]` such that `arr[j] >= arr[i]`\n- 2nd jump (even): go to index `j > i` with largest value `arr[j]` such that `arr[j] <= arr[i]`\nIf multiple candidates exist, choose the smallest index `j`.\nAn index is \"good\" if starting there (with an odd jump first) can eventually reach the last index.\n\nImplement `solve(input)` where `input = number[]`.\n\nReturn a number: count of good starting indices.\n\nHint: Precompute next indices for odd/even jumps, then DP backwards for reachability.",
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
    "prompt": "Live coding Challenge (Palindrome Partitioning III Min Changes)\n\nSplit string `s` into exactly `k` non-empty substrings.\nFor each substring, you may change characters so that substring becomes a palindrome.\nEach character change costs 1.\n\nImplement `solve(input)` where `input = { s: string, k: number }`.\n\nReturn a number: minimum total changes needed across all `k` substrings.\n\nImportant details:\n- Partitions must cover entire string in order.\n- Substrings cannot be empty.\n\nHint: Precompute palindrome-conversion cost for every interval, then do partition DP.",
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
    "prompt": "Live coding Challenge (Profitable Schemes Count)\n\nYou have `m` jobs. Job `i` requires `group[i]` members and yields `profit[i]` profit.\nYou can choose any subset of jobs, each at most once, with total members used <= `n`.\nA scheme is valid if total profit >= `minProfit`.\n\nImplement `solve(input)` where `input = { n: number, minProfit: number, group: number[], profit: number[] }`.\n\nReturn a number: count of valid schemes modulo `1_000_000_007`.\n\nImportant details:\n- Profit can be capped at `minProfit` in DP state to reduce dimensions.\n- This is a 0/1 knapsack counting variant.",
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
    "prompt": "Live coding Challenge (Stickers To Spell Word Min Count)\n\nYou are given sticker words and a target word.\nYou may use unlimited copies of each sticker.\nFrom each sticker copy, you can take any subset of its letters (each letter at most as many times as it appears on that sticker).\nFind the minimum number of sticker copies needed to form the target exactly.\n\nImplement `solve(input)` where `input = { stickers: string[], target: string }`.\n\nReturn a number: minimum sticker count, or `-1` if impossible.\n\nHint: Memoized DFS/DP on remaining target state with character frequency reduction.",
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
    "prompt": "Live coding Challenge (Minimum Incompatibility)\n\nPartition `nums` into exactly `k` subsets of equal size.\nFor each subset, incompatibility is `(max value - min value)`.\nTotal score is sum of subset incompatibilities.\nYou must minimize this total.\n\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\n\nReturn a number: minimum total incompatibility, or `-1` if no valid partition exists.\n\nImportant details:\n- A subset is invalid if it contains duplicate values.\n- All numbers must be used exactly once.\n\nHint: Precompute valid subset costs, then bitmask DP over used elements.",
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
    "prompt": "Live coding Challenge (Maximum Employees To Be Invited)\n\nThere are `n` employees labeled `0..n-1`. `favorite[i]` is the one employee that `i` wants to sit next to.\nYou want to invite the largest possible set such that everyone invited can be seated around a table and each invited employee sits next to their favorite.\n\nImplement `solve(input)` where `input = number[]` representing `favorite`.\n\nReturn a number: maximum employees that can be invited.\n\nImportant details:\n- Each node has out-degree 1 (directed graph of cycles with incoming chains).\n- Answer comes from max of: longest cycle, or sum of all 2-cycles extended by their best incoming chains.\n\nHint: Use indegree trimming for chain lengths plus cycle detection.",
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
