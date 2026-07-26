import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-medium-rich-3sum-2001",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (3Sum Unique Triplets)\n\nScenario:\nYou are on a reliability analytics team that flags suspicious behavior by looking for 3-metric combinations that cancel to zero. The downstream dedupe service is strict: if output ordering is unstable or duplicate triplets appear, the nightly snapshot diff fails.\n\nTask:\nImplement `solve(input)` where `input = number[]`.\n\nOutput Requirements:\n1. Return all unique triplets whose sum is exactly 0.\n2. Each triplet must be sorted ascending.\n3. The full list of triplets must be sorted lexicographically.\n4. No duplicate triplets are allowed.\n\nEdge Cases to Consider:\n- Repeated numbers (heavy duplication).\n- All zeros.\n- Arrays with no valid triplet.\n\nPerformance Goal:\nAim for O(n^2) time after sorting and O(1) extra space excluding output.\n\nHint:\nSort once, anchor one index, then use a two-pointer sweep while skipping duplicates.",
    "correctExplanation": "Sort array, iterate anchor i, and run two-pointer sweep for complementary pairs while skipping duplicates. Time O(n^2), Space O(1) extra (excluding output).",
    "tests": [
      {
        "input": [
          [
            -1,
            0,
            1,
            2,
            -1,
            -4
          ]
        ],
        "expected": [
          [
            -1,
            -1,
            2
          ],
          [
            -1,
            0,
            1
          ]
        ]
      },
      {
        "input": [
          [
            0,
            0,
            0,
            0
          ]
        ],
        "expected": [
          [
            0,
            0,
            0
          ]
        ]
      },
      {
        "input": [
          [
            1,
            2,
            -2,
            -1
          ]
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-search-rotated-2002",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Search Rotated Sorted Array)\n\nScenario:\nA low-latency catalog index is stored as a sorted array, but deployment cutovers rotate it at an unknown pivot. Query handlers still need logarithmic lookup for strict p99 latency.\n\nTask:\nImplement `solve(input)` where `input = { nums: number[], target: number }`.\n\nOutput Requirements:\n- Return the index of `target` if present.\n- Return `-1` if `target` does not exist.\n\nConstraints & Notes:\n- All values in `nums` are distinct.\n- Preserve O(log n) search behavior.\n\nEdge Cases:\n- Array size 1.\n- Target in rotated half vs non-rotated half.\n- Target absent entirely.\n\nHint:\nDuring binary search, one side is always sorted; decide if target belongs there.",
    "correctExplanation": "Binary search while detecting sorted side and narrowing to side containing target. Time O(log n), Space O(1).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "target": 0
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "nums": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "target": 3
          }
        ],
        "expected": -1
      },
      {
        "input": [
          {
            "nums": [
              1
            ],
            "target": 1
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-product-except-self-2003",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Product Except Self)\n\nScenario:\nA feature-attribution pipeline computes each feature's influence as the product of all other feature factors. Division is disallowed because zero-valued factors are common and precision assumptions break in production.\n\nTask:\nImplement `solve(input)` where `input = number[]`.\n\nOutput Requirements:\n- Return an array where output[i] is the product of all values in `input` except `input[i]`.\n- Do not use division.\n\nConstraints & Notes:\n- Must handle one or more zeros correctly.\n- Prefer O(n) time and O(1) extra space (excluding the returned array).\n\nEdge Cases:\n- Exactly one zero.\n- Multiple zeros.\n- Negative values mixed with positives.\n\nHint:\nCompute prefix products in one pass, then multiply by rolling suffix products in reverse.",
    "correctExplanation": "Write prefix products into output, then multiply by rolling suffix from right. Time O(n), Space O(1) extra excluding output.",
    "tests": [
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          24,
          12,
          8,
          6
        ]
      },
      {
        "input": [
          [
            -1,
            1,
            0,
            -3,
            3
          ]
        ],
        "expected": [
          0,
          0,
          9,
          0,
          0
        ]
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-group-anagrams-2004",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Group Anagrams Deterministic)\n\nScenario:\nA message-normalization service groups equivalent tokens before cache compaction. Snapshot tests compare exact JSON output, so ordering must be deterministic across runs and environments.\n\nTask:\nImplement `solve(input)` where `input = string[]`.\n\nOutput Requirements:\n1. Group words that are anagrams of each other.\n2. Sort each group alphabetically.\n3. Sort all groups by each group's first element.\n\nConstraints & Notes:\n- Deterministic output order is mandatory.\n- Empty strings are valid tokens.\n\nPerformance Target:\nUse hashing/map grouping rather than pairwise comparison.\n\nHint:\nUse the sorted-character form of each word as the bucket key.",
    "correctExplanation": "Map each word by sorted chars, then sort each bucket and final bucket list. Time O(n*k log k), Space O(n*k).",
    "tests": [
      {
        "input": [
          [
            "eat",
            "tea",
            "tan",
            "ate",
            "nat",
            "bat"
          ]
        ],
        "expected": [
          [
            "ate",
            "eat",
            "tea"
          ],
          [
            "bat"
          ],
          [
            "nat",
            "tan"
          ]
        ]
      },
      {
        "input": [
          [
            ""
          ]
        ],
        "expected": [
          [
            ""
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-daily-temperatures-2005",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Daily Temperatures Wait Time)\n\nScenario:\nA weather timeline UI needs to annotate each day with how long users must wait until a strictly warmer temperature appears. The dataset can be large enough that quadratic scans time out.\n\nTask:\nImplement `solve(input)` where `input = number[]` temperatures.\n\nOutput Requirements:\n- Return an array `ans` where `ans[i]` is the number of days until a warmer temperature after day `i`.\n- If no warmer day exists, `ans[i] = 0`.\n\nConstraints & Notes:\n- Use an approach that is linear in the number of temperatures.\n\nEdge Cases:\n- Strictly increasing sequence.\n- Strictly decreasing sequence.\n- Repeated temperatures.\n\nHint:\nMaintain a monotonic decreasing stack of unresolved indices.",
    "correctExplanation": "Pop colder prior indices when current temp is warmer and fill wait distance. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            73,
            74,
            75,
            71,
            69,
            72,
            76,
            73
          ]
        ],
        "expected": [
          1,
          1,
          4,
          2,
          1,
          1,
          0,
          0
        ]
      },
      {
        "input": [
          [
            30,
            40,
            50,
            60
          ]
        ],
        "expected": [
          1,
          1,
          1,
          0
        ]
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-coin-change-2006",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Coin Change Min Count)\n\nScenario:\nYour billing fallback service must assemble an exact payout amount using available token packs. Product requires the smallest number of packs to reduce settlement operations.\n\nTask:\nImplement `solve(input)` where `input = { coins: number[], amount: number }`.\n\nOutput Requirements:\n- Return the minimum number of coins needed to form `amount`.\n- Return `-1` if exact construction is impossible.\n\nConstraints & Notes:\n- You may use unlimited copies of each coin denomination.\n- Prefer dynamic programming with predictable runtime.\n\nEdge Cases:\n- `amount = 0`.\n- No valid combination.\n- Sparse denomination sets.\n\nHint:\nBottom-up DP over all subtotals from 0..amount.",
    "correctExplanation": "For each subtotal, relax transitions using every coin and keep minimum count. Time O(amount * coinCount), Space O(amount).",
    "tests": [
      {
        "input": [
          {
            "coins": [
              1,
              2,
              5
            ],
            "amount": 11
          }
        ],
        "expected": 3
      },
      {
        "input": [
          {
            "coins": [
              2
            ],
            "amount": 3
          }
        ],
        "expected": -1
      },
      {
        "input": [
          {
            "coins": [
              1
            ],
            "amount": 0
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-word-break-2007",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Word Break Feasibility)\n\nScenario:\nAn NLP preprocessor receives compressed text and must verify if it can be segmented into approved dictionary terms before downstream parsing. False positives cause expensive parser failures, so correctness matters.\n\nTask:\nImplement `solve(input)` where `input = { s: string, wordDict: string[] }`.\n\nOutput Requirements:\n- Return `true` if `s` can be segmented into one or more dictionary words.\n- Return `false` otherwise.\n\nConstraints & Notes:\n- Words may be reused multiple times.\n- Favor polynomial DP over exponential backtracking.\n\nEdge Cases:\n- Prefixes that match but lead to dead ends.\n- Full-string direct dictionary match.\n- Repeated short words.\n\nHint:\nLet `dp[i]` represent whether prefix `s[0..i)` is segmentable.",
    "correctExplanation": "DP over prefix endpoints, checking dictionary matches from prior reachable cuts. Time O(n^2), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "s": "LiveCode",
            "wordDict": [
              "leet",
              "code"
            ]
          }
        ],
        "expected": true
      },
      {
        "input": [
          {
            "s": "catsandog",
            "wordDict": [
              "cats",
              "dog",
              "sand",
              "and",
              "cat"
            ]
          }
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-course-schedule-ii-2008",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Course Schedule Ordering)\n\nScenario:\nA curriculum orchestration service must generate a valid enrollment order from prerequisite relations. Product tests require deterministic output so UI snapshots and audit logs remain stable.\n\nTask:\nImplement `solve(input)` where `input = { numCourses: number, prerequisites: number[][] }`.\n\nOutput Requirements:\n- Return one valid topological ordering of all courses.\n- Return `[]` if no valid ordering exists (cycle detected).\n- When multiple courses are available, prefer lower numeric course IDs for deterministic output.\n\nConstraints & Notes:\n- Course IDs are in `[0, numCourses-1]`.\n- Prerequisite pair `[a, b]` means `b -> a`.\n\nHint:\nUse Kahn's algorithm with a min-priority selection policy.",
    "correctExplanation": "Compute indegrees, repeatedly pull smallest zero-indegree course, and update neighbors. Time O(V+E+V log V), Space O(V+E).",
    "tests": [
      {
        "input": [
          {
            "numCourses": 4,
            "prerequisites": [
              [
                1,
                0
              ],
              [
                2,
                0
              ],
              [
                3,
                1
              ],
              [
                3,
                2
              ]
            ]
          }
        ],
        "expected": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "input": [
          {
            "numCourses": 2,
            "prerequisites": [
              [
                1,
                0
              ],
              [
                0,
                1
              ]
            ]
          }
        ],
        "expected": []
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-num-islands-2009",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Number Of Islands)\n\nScenario:\nA geospatial processing service ingests binary raster tiles and must count disconnected land masses for each tile before ranking regions. The adjacency model is 4-directional (no diagonal merge).\n\nTask:\nImplement `solve(input)` where `input = string[][]` containing \"0\" and \"1\".\n\nOutput Requirements:\n- Return the number of islands.\n- Islands are connected components of \"1\" cells by up/down/left/right adjacency.\n\nConstraints & Notes:\n- Mutating a working copy is acceptable.\n- Prefer linear scan + traversal across the grid.\n\nEdge Cases:\n- All water.\n- Single-cell islands.\n- Thin bridges connecting components.\n\nHint:\nStart DFS/BFS whenever you find unseen land, marking the full component visited.",
    "correctExplanation": "Scan grid and launch traversal for each new island, marking visited cells. Time O(m*n), Space O(m*n).",
    "tests": [
      {
        "input": [
          [
            [
              "1",
              "1",
              "0"
            ],
            [
              "0",
              "1",
              "0"
            ],
            [
              "1",
              "0",
              "1"
            ]
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            [
              "0",
              "0"
            ],
            [
              "0",
              "0"
            ]
          ]
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-reorder-logs-2010",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Reorder Data Logs)\n\nScenario:\nA search ingestion stage receives mixed logs and must rank textual logs ahead of numeric telemetry logs. Compliance requires numeric logs to preserve original ingestion order.\n\nTask:\nImplement `solve(input)` where `input = string[]` logs.\n\nOutput Requirements:\n1. All letter-logs come before all digit-logs.\n2. Letter-logs are sorted by content, then by identifier on ties.\n3. Digit-logs remain in original relative order (stable).\n\nConstraints & Notes:\n- Each log has an identifier followed by payload tokens.\n- Sorting behavior must be deterministic.\n\nHint:\nPartition into letter/digit groups, sort only letter group, then concatenate.",
    "correctExplanation": "Split logs into letter/digit groups, sort letter group by keys, then concatenate. Time O(n log n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            "dig1 8 1 5 1",
            "let1 art can",
            "dig2 3 6",
            "let2 own kit dig",
            "let3 art zero"
          ]
        ],
        "expected": [
          "let1 art can",
          "let3 art zero",
          "let2 own kit dig",
          "dig1 8 1 5 1",
          "dig2 3 6"
        ]
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-k-closest-points-2011",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (K Closest Points To Origin)\n\nScenario:\nA location service must return the nearest candidate zones to origin for a fallback route computation. To avoid nondeterministic test failures, tie-breaking rules are explicit.\n\nTask:\nImplement `solve(input)` where `input = { points: number[][], k: number }`.\n\nOutput Requirements:\n- Return exactly `k` closest points to `(0,0)`.\n- Order result by ascending squared distance.\n- Break ties by `x`, then by `y`.\n\nConstraints & Notes:\n- Distance comparison should use squared Euclidean distance (no `sqrt` needed).\n- Deterministic ordering is required.\n\nHint:\nCompute comparable distance keys and sort deterministically before slicing `k`.",
    "correctExplanation": "Compute squared distances, sort deterministically, and take first k points. Time O(n log n), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "points": [
              [
                1,
                3
              ],
              [
                -2,
                2
              ],
              [
                2,
                -2
              ]
            ],
            "k": 2
          }
        ],
        "expected": [
          [
            -2,
            2
          ],
          [
            2,
            -2
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-subarray-sum-k-2012",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Subarray Sum Equals K)\n\nScenario:\nA transaction analytics stream needs to count how many contiguous windows produce exactly a target net delta. Values can be positive or negative, so sliding-window assumptions do not hold.\n\nTask:\nImplement `solve(input)` where `input = { nums: number[], k: number }`.\n\nOutput Requirements:\n- Return the count of contiguous subarrays whose sum equals `k`.\n\nConstraints & Notes:\n- Negative values are allowed.\n- Aim for O(n) time using prefix-sum accounting.\n\nEdge Cases:\n- Multiple overlapping valid windows.\n- Repeated prefix sums.\n- Arrays with zeros.\n\nHint:\nTrack frequency of seen prefix sums; for current prefix `p`, add count of `p-k`.",
    "correctExplanation": "For each prefix sum p, add occurrences of p-k seen before; then record p. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "nums": [
              1,
              1,
              1
            ],
            "k": 2
          }
        ],
        "expected": 2
      },
      {
        "input": [
          {
            "nums": [
              1,
              2,
              3
            ],
            "k": 3
          }
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-can-jump-2013",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Jump Game Reachability)\n\nScenario:\nA path simulator models each index as a checkpoint with a max forward jump range. You must decide if the agent can ever reach the terminal checkpoint under those movement limits.\n\nTask:\nImplement `solve(input)` where `input = number[]` max jump lengths.\n\nOutput Requirements:\n- Return `true` if the last index is reachable from index 0.\n- Return `false` otherwise.\n\nConstraints & Notes:\n- Prefer a greedy linear pass over DP.\n\nEdge Cases:\n- Early zero blocking progress.\n- Large first jump that skips bottlenecks.\n- Single-element array.\n\nHint:\nMaintain the farthest index reachable so far; fail if current index exceeds it.",
    "correctExplanation": "Iterate indices within current reach and update farthest; fail if index exceeds reach. Time O(n), Space O(1).",
    "tests": [
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
        "expected": true
      },
      {
        "input": [
          [
            3,
            2,
            1,
            0,
            4
          ]
        ],
        "expected": false
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-interval-overlap-count-2014",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Minimum Meeting Rooms)\n\nScenario:\nA capacity planner must compute the smallest number of simultaneous conference rooms needed for a schedule. Intervals are half-open `[start, end)`, so a meeting ending at `t` frees a room for another starting at `t`.\n\nTask:\nImplement `solve(input)` where `input = number[][]` intervals.\n\nOutput Requirements:\n- Return the minimum number of rooms required to host all meetings.\n\nConstraints & Notes:\n- Intervals may overlap heavily.\n- Exact boundary reuse (`end == nextStart`) should not increase room count.\n\nPerformance Goal:\nO(n log n) expected via sorting.\n\nHint:\nSort start times and end times separately, then perform a sweep-line overlap count.",
    "correctExplanation": "Sweep through sorted start/end arrays counting active meetings and max overlap. Time O(n log n), Space O(n).",
    "tests": [
      {
        "input": [
          [
            [
              0,
              30
            ],
            [
              5,
              10
            ],
            [
              15,
              20
            ]
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            [
              7,
              10
            ],
            [
              2,
              4
            ]
          ]
        ],
        "expected": 1
      }
    ]
  },
  {
    "id": "raw-coding-medium-rich-spiral-matrix-2015",
    "difficulty": "medium",
    "prompt": "Live coding Challenge (Spiral Matrix Traversal)\n\nScenario:\nAn image-processing pipeline needs deterministic spiral readout of matrix cells for a legacy encoder format. Inputs can be rectangular, not just square, and off-by-one boundary bugs are common.\n\nTask:\nImplement `solve(input)` where `input = number[][]`.\n\nOutput Requirements:\n- Return all matrix elements in clockwise spiral order starting from the top-left corner.\n\nConstraints & Notes:\n- Handle 1xN, Nx1, and rectangular matrices correctly.\n- Do not duplicate or skip cells as boundaries shrink.\n\nHint:\nTrack `top`, `bottom`, `left`, and `right` boundaries and peel layer by layer.",
    "correctExplanation": "Peel one border at a time updating boundaries until they cross. Time O(m*n), Space O(1) extra excluding output.",
    "tests": [
      {
        "input": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          6,
          9,
          8,
          7,
          4,
          5
        ]
      },
      {
        "input": [
          [
            [
              1,
              2,
              3,
              4
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4
        ]
      }
    ]
  }
]

export default data
