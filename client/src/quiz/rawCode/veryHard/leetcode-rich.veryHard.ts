import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-very-hard-rich-regex-match-dp-4001",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Regex Matching (., *))\n\nProblem Explanation:\nBuild a full-string matcher for a simplified regex language. Pattern `p` may contain normal lowercase letters, dot `.` (match any single character), and star `*` (match zero or more of the immediately previous token). Matching must consume the entire string `s`, not just a substring.\n\nImplement:\n`solve(input)` where `input = { s: string, p: string }`.\n\nReturn:\n`true` if and only if `p` fully matches `s`, otherwise `false`.\n\nHints:\n1. Use DP where state represents whether suffix/prefix portions of `s` and `p` match.\n2. For a `*` at pattern position `j+1`, branch into: use zero occurrences, or consume one matching char and stay on same pattern token.\n3. Carefully define base case for empty string vs remaining pattern like `a*b*c*`.\n\nEdge Cases To Think About:\n- Empty `s` and/or empty `p`.\n- Patterns ending in `*` chains.\n- Dot-star patterns like `.*` that can swallow arbitrary spans.",
    "correctExplanation": "dp[i][j] means s[i:] matches p[j:]; handle star as zero or many preceding-char matches. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          {
            "s": "aa",
            "p": "a"
          }
        ],
        "expected": false
      },
      {
        "input": [
          {
            "s": "aa",
            "p": "a*"
          }
        ],
        "expected": true
      },
      {
        "input": [
          {
            "s": "ab",
            "p": ".*"
          }
        ],
        "expected": true
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-burst-balloons-4002",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Burst Balloons Max Coins)\n\nProblem Explanation:\nYou have balloons with values. Bursting balloon `i` earns `left * nums[i] * right`, where `left` and `right` are the nearest still-unburst neighbors at that moment. Because neighbors change as bursts happen, order matters heavily.\n\nImplement:\n`solve(input)` where `input = number[]` balloon values.\n\nReturn:\nThe maximum total coins achievable by choosing an optimal burst order.\n\nHints:\n1. Add virtual boundaries with value `1` on both sides.\n2. Use interval DP: for interval `(l, r)`, assume `k` is the last balloon burst in that interval.\n3. Transition: best of `dp[l][k] + dp[k][r] + val[l]*val[k]*val[r]`.\n\nEdge Cases To Think About:\n- Very short arrays (`n = 1` or `2`).\n- Repeated values and zeros.\n- Why 'choose last' is easier than 'choose first'.",
    "correctExplanation": "dp[l][r] = max coins from open interval (l,r); try each k in (l,r) as last burst. Time O(n^3), Space O(n^2).",
    "tests": [
      {
        "input": [
          [
            3,
            1,
            5,
            8
          ]
        ],
        "expected": 167
      },
      {
        "input": [
          [
            1,
            5
          ]
        ],
        "expected": 10
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-skyline-keypoints-4003",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (The Skyline Problem)\n\nProblem Explanation:\nGiven buildings as `[left, right, height]`, produce the outer skyline silhouette as keypoints `[x, h]` where the visible height changes. Overlapping buildings can hide shorter ones, and the skyline drops when active tallest buildings end.\n\nImplement:\n`solve(input)` where `input = number[][]` buildings.\n\nReturn:\nAn ordered list of skyline keypoints `[x, height]` with no redundant consecutive equal heights.\n\nHints:\n1. Convert each building into sweep events: entering edge and leaving edge.\n2. Maintain active heights with a max-structure (heap + delayed removal/map).\n3. After processing all events at an `x`, compare current max height to previous; emit point only on change.\n\nEdge Cases To Think About:\n- Multiple events at the same `x`.\n- Completely nested buildings.\n- Last drop to height `0`.",
    "correctExplanation": "Process entering/exiting edges by x, update active heights, emit point when max changes. Time O(n log n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            [
              2,
              9,
              10
            ],
            [
              3,
              7,
              15
            ],
            [
              5,
              12,
              12
            ],
            [
              15,
              20,
              10
            ],
            [
              19,
              24,
              8
            ]
          ]
        ],
        "expected": [
          [
            2,
            10
          ],
          [
            3,
            15
          ],
          [
            7,
            12
          ],
          [
            12,
            0
          ],
          [
            15,
            10
          ],
          [
            20,
            8
          ],
          [
            24,
            0
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-edit-distance-4004",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Edit Distance)\n\nProblem Explanation:\nCompute the minimum number of operations to transform string `a` into string `b`. Allowed operations are insert one character, delete one character, or replace one character.\n\nImplement:\n`solve(input)` where `input = { a: string, b: string }`.\n\nReturn:\nMinimum edit count (Levenshtein distance).\n\nHints:\n1. Let `dp[i][j]` represent min edits for `a[:i]` -> `b[:j]`.\n2. If chars match, carry diagonal value. Otherwise take `1 + min(replace, delete, insert)`.\n3. Initialize first row/column for converting to/from empty string.\n\nEdge Cases To Think About:\n- One string empty.\n- Identical strings.\n- Highly different lengths.",
    "correctExplanation": "dp[i][j]=min ops for prefixes a[:i], b[:j] via insert/delete/replace recurrence. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          {
            "a": "horse",
            "b": "ros"
          }
        ],
        "expected": 3
      },
      {
        "input": [
          {
            "a": "intention",
            "b": "execution"
          }
        ],
        "expected": 5
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-max-profit-k-transactions-4005",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Best Time To Buy/Sell Stock IV)\n\nProblem Explanation:\nYou are given daily prices and can perform at most `k` buy/sell transactions. You must sell before buying again, so you can hold at most one stock at a time.\n\nImplement:\n`solve(input)` where `input = { k: number, prices: number[] }`.\n\nReturn:\nMaximum possible profit.\n\nHints:\n1. Track DP states by transaction count with two modes: holding vs not holding.\n2. Use rolling arrays or `buy[t]` / `sell[t]` style updates for each day.\n3. Optimization: if `k >= n/2`, this reduces to unlimited transactions greedily summing positive differences.\n\nEdge Cases To Think About:\n- Empty or single-day price arrays.\n- `k = 0`.\n- Large `k` relative to days.",
    "correctExplanation": "Track best buy/sell states per transaction using rolling arrays. Time O(k*n), Space O(k).",
    "tests": [
      {
        "input": [
          {
            "k": 2,
            "prices": [
              2,
              4,
              1
            ]
          }
        ],
        "expected": 2
      },
      {
        "input": [
          {
            "k": 2,
            "prices": [
              3,
              2,
              6,
              5,
              0,
              3
            ]
          }
        ],
        "expected": 7
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-palindrome-pairs-4006",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Palindrome Pairs)\n\nProblem Explanation:\nGiven words, find all index pairs `[i, j]` (`i != j`) such that concatenation `words[i] + words[j]` is a palindrome. Output pairs sorted lexicographically by index pair.\n\nImplement:\n`solve(input)` where `input = string[]`.\n\nReturn:\nAll valid pairs `[i, j]` in lexicographic order.\n\nHints:\n1. Build a lookup map from word (or reversed word) to index.\n2. For each split point in a word, test palindrome prefix/suffix cases.\n3. If prefix is palindrome, look for reversed suffix as a left partner; similarly for suffix-palindrome case.\n\nEdge Cases To Think About:\n- Empty string interactions.\n- Duplicate-like structural matches with different indices.\n- Avoid duplicate pair emission.",
    "correctExplanation": "Map reversed words to indices and test palindrome prefix/suffix cases. Time roughly O(n * L^2), Space O(n*L).",
    "tests": [
      {
        "input": [
          [
            "abcd",
            "dcba",
            "lls",
            "s",
            "sssll"
          ]
        ],
        "expected": [
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            2,
            4
          ],
          [
            3,
            2
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-minimum-window-subsequence-4007",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Minimum Window Subsequence Length)\n\nProblem Explanation:\nFind the shortest contiguous window in `s` such that `t` appears inside it as a subsequence (characters in order, not necessarily adjacent). Return only the window length. If impossible, return `0`.\n\nImplement:\n`solve(input)` where `input = { s: string, t: string }`.\n\nReturn:\nMinimum valid window length, or `0` if no window contains `t` as subsequence.\n\nHints:\n1. Use forward scan to find a right boundary where full `t` is matched.\n2. Then scan backward to shrink the left boundary while preserving subsequence validity.\n3. Repeat from next candidate start/right position and track best length.\n\nEdge Cases To Think About:\n- `t` longer than `s`.\n- No matching character at all.\n- Multiple overlapping candidate windows.",
    "correctExplanation": "For each possible end match, rewind to tighten start and update best length. Time O(|s|*|t|) typical, Space O(1).",
    "tests": [
      {
        "input": [
          {
            "s": "abcdebdde",
            "t": "bde"
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "s": "jmeqksfrsdcmsiwvaovztaqenprpvnbstl",
            "t": "u"
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-word-search-ii-count-4008",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Word Search II Count Found)\n\nProblem Explanation:\nGiven a character board and dictionary words, count how many distinct words can be formed by walking adjacent cells (up/down/left/right). A cell cannot be reused within the same word path.\n\nImplement:\n`solve(input)` where `input = { board: string[][], words: string[] }`.\n\nReturn:\nNumber of distinct dictionary words that are discoverable on the board.\n\nHints:\n1. Build a trie from all words to share prefix work.\n2. DFS from each cell, pruning immediately when path prefix is absent in trie.\n3. Mark found words to avoid double counting; use backtracking with temporary visited marks.\n\nEdge Cases To Think About:\n- Duplicate words in list.\n- Board with repeated letters causing many paths.\n- Very small boards.",
    "correctExplanation": "Build trie of words, DFS board with backtracking, and mark found words once. Trie-guided search with strong pruning.",
    "tests": [
      {
        "input": [
          {
            "board": [
              [
                "o",
                "a",
                "a",
                "n"
              ],
              [
                "e",
                "t",
                "a",
                "e"
              ],
              [
                "i",
                "h",
                "k",
                "r"
              ],
              [
                "i",
                "f",
                "l",
                "v"
              ]
            ],
            "words": [
              "oath",
              "pea",
              "eat",
              "rain"
            ]
          }
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-split-array-largest-sum-4009",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Split Array Largest Sum)\n\nProblem Explanation:\nSplit `nums` into exactly `m` non-empty contiguous subarrays while minimizing the largest subarray sum among those parts.\n\nImplement:\n`solve(input)` where `input = { nums: number[], m: number }`.\n\nReturn:\nMinimum achievable value of the largest chunk sum.\n\nHints:\n1. Binary search answer range from `max(nums)` to `sum(nums)`.\n2. For a candidate limit `X`, greedily count how many subarrays are needed if each part must stay `<= X`.\n3. If required parts `<= m`, candidate is feasible; otherwise increase limit.\n\nEdge Cases To Think About:\n- `m = 1` (whole array).\n- `m = nums.length` (each element alone).\n- Large values and long arrays.",
    "correctExplanation": "Search threshold X and test if array can be split into <=m parts with each part sum<=X. Time O(n log(sum(nums))), Space O(1).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              7,
              2,
              5,
              10,
              8
            ],
            "m": 2
          }
        ],
        "expected": 18
      },
      {
        "input": [
          {
            "nums": [
              1,
              2,
              3,
              4,
              5
            ],
            "m": 2
          }
        ],
        "expected": 9
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-trapping-rain-2d-4010",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Trapping Rain Water II)\n\nProblem Explanation:\nGiven a 2D elevation map, compute total water trapped after raining. Water level at an interior cell depends on the lowest surrounding boundary that can leak outward.\n\nImplement:\n`solve(input)` where `input = number[][]` heightMap.\n\nReturn:\nTotal trapped water volume.\n\nHints:\n1. Push all boundary cells into a min-heap and mark visited.\n2. Pop lowest boundary, expand to neighbors, and compute trapped water as `max(0, boundaryHeight - neighborHeight)`.\n3. Push neighbor with effective height `max(neighborHeight, boundaryHeight)` (Dijkstra-like flood fill).\n\nEdge Cases To Think About:\n- Single row/column maps (cannot trap).\n- Flat maps and strictly increasing boundaries.\n- Correct visited handling to avoid double counting.",
    "correctExplanation": "Seed heap with boundary cells, expand inward maintaining current water level. Time O(m*n log(m*n)), Space O(m*n).",
    "tests": [
      {
        "input": [
          [
            [
              1,
              4,
              3,
              1,
              3,
              2
            ],
            [
              3,
              2,
              1,
              3,
              2,
              4
            ],
            [
              2,
              3,
              3,
              2,
              3,
              1
            ]
          ]
        ],
        "expected": 4
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-maximum-gap-4011",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Maximum Gap (Linear Bucket))\n\nProblem Explanation:\nFind the maximum difference between consecutive elements in the sorted order of an unsorted array, but target near-linear complexity rather than full comparison sort.\n\nImplement:\n`solve(input)` where `input = number[]`.\n\nReturn:\nLargest adjacent gap after conceptual sorting; return `0` if fewer than 2 numbers.\n\nHints:\n1. Use pigeonhole principle buckets over `[minVal, maxVal]`.\n2. Store only bucket min and max; gaps inside a bucket are never the global max when bucket size is chosen properly.\n3. Scan non-empty buckets and compute gap between current bucket min and previous non-empty bucket max.\n\nEdge Cases To Think About:\n- All values equal.\n- Very small arrays.\n- Negative numbers and wide ranges.",
    "correctExplanation": "Place numbers in range buckets and compute gaps across non-empty bucket boundaries. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            3,
            6,
            9,
            1
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            10
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-critical-connections-count-4012",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Critical Connections Count)\n\nProblem Explanation:\nIn an undirected connected graph, a bridge (critical connection) is an edge whose removal increases number of connected components. Count how many such edges exist.\n\nImplement:\n`solve(input)` where `input = { n: number, edges: number[][] }`.\n\nReturn:\nCount of bridge edges.\n\nHints:\n1. Run DFS and track discovery time `disc[u]` and low-link `low[u]`.\n2. For DFS tree edge `(u, v)`, after exploring `v`, if `low[v] > disc[u]`, then `(u, v)` is a bridge.\n3. Handle parent edge separately to avoid false back-edge updates.\n\nEdge Cases To Think About:\n- Tree graphs (every edge is a bridge).\n- Dense graphs with many cycles (few/no bridges).\n- Node numbering and adjacency building.",
    "correctExplanation": "Compute discovery times and low values; edge (u,v) is bridge if low[v] > disc[u]. Time O(V+E), Space O(V+E).",
    "tests": [
      {
        "input": [
          {
            "n": 4,
            "edges": [
              [
                0,
                1
              ],
              [
                1,
                2
              ],
              [
                2,
                0
              ],
              [
                1,
                3
              ]
            ]
          }
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-maximum-frequency-stack-sim-4013",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Maximum Frequency Stack Simulation)\n\nProblem Explanation:\nSimulate a frequency stack with operations push/pop. `pop` must remove and return the value with highest frequency; if multiple values tie, return the most recently pushed among them.\n\nImplement:\n`solve(input)` where `input = { ops: ({type:\"push\",value:number}|{type:\"pop\"})[] }`.\n\nReturn:\nArray of values returned by each `pop` in execution order.\n\nHints:\n1. Keep `freq[value]` map.\n2. Keep `group[f]` stack of values that reached frequency `f`.\n3. Track `maxFreq`; `pop` from `group[maxFreq]`, decrement freq, and lower `maxFreq` when stack empties.\n\nEdge Cases To Think About:\n- Multiple ties across many pushes.\n- Consecutive pops reducing `maxFreq`.\n- Correct recency behavior under equal frequency.",
    "correctExplanation": "Track max frequency and per-frequency stacks to serve pops in O(1) amortized. Each op O(1) amortized.",
    "tests": [
      {
        "input": [
          {
            "ops": [
              {
                "type": "push",
                "value": 5
              },
              {
                "type": "push",
                "value": 7
              },
              {
                "type": "push",
                "value": 5
              },
              {
                "type": "push",
                "value": 7
              },
              {
                "type": "push",
                "value": 4
              },
              {
                "type": "push",
                "value": 5
              },
              {
                "type": "pop"
              },
              {
                "type": "pop"
              },
              {
                "type": "pop"
              },
              {
                "type": "pop"
              }
            ]
          }
        ],
        "expected": [
          5,
          7,
          5,
          4
        ]
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-shortest-palindrome-length-4014",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Shortest Palindrome Add-Front Length)\n\nProblem Explanation:\nYou may only prepend characters to the front of a string. Compute the minimum number of characters needed so the resulting full string is a palindrome.\n\nImplement:\n`solve(input)` where `input = string`.\n\nReturn:\nMinimum prepend count required.\n\nHints:\n1. Find the longest palindromic prefix of `s`.\n2. KMP trick: build `combined = s + '#' + reverse(s)` and compute prefix-function/LPS on it.\n3. If longest pal-prefix length is `L`, answer is `s.length - L`.\n\nEdge Cases To Think About:\n- Already-palindrome string (answer 0).\n- Single character or empty string.\n- Strings with repeated prefix/suffix patterns.",
    "correctExplanation": "Use pattern s + # + reverse(s) prefix-function to get longest pal-prefix. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          "aacecaaa"
        ],
        "expected": 1
      },
      {
        "input": [
          "abcd"
        ],
        "expected": 3
      }
    ]
  },
  {
    "id": "raw-coding-very-hard-rich-largest-island-flip-4015",
    "difficulty": "veryHard",
    "prompt": "Live coding Challenge (Making A Large Island)\n\nProblem Explanation:\nIn a binary grid, you may flip at most one `0` to `1`. Determine the largest island area possible afterward, using 4-directional connectivity.\n\nImplement:\n`solve(input)` where `input = number[][]` grid of `0/1`.\n\nReturn:\nMaximum island size achievable after at most one flip.\n\nHints:\n1. First pass: label each existing island with unique ID and record its size.\n2. For each `0`, inspect up/down/left/right neighboring island IDs, sum unique sizes plus `1` for the flip.\n3. Track best across all zeros; also handle all-ones grid directly.\n\nEdge Cases To Think About:\n- Grid already all land.\n- Grid all water.\n- Avoid double-counting same neighboring island ID.",
    "correctExplanation": "First label components; then evaluate each 0 by summing adjacent unique island sizes +1. Time O(n^2), Space O(n^2).",
    "tests": [
      {
        "input": [
          [
            [
              1,
              0
            ],
            [
              0,
              1
            ]
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            [
              1,
              1
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": 4
      }
    ]
  }
]

export default data
