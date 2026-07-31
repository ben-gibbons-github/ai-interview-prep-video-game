import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    "id": "raw-coding-hard-rich-lru-cache-sim-3001",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (LRU Cache Simulation)\n\nScenario: An edge node replays cache operations and needs resulting state for diagnostics. Production incidents have shown that engineers often know the sequence of reads and writes but not the final eviction order, so this replay tool is used to reconstruct exactly what remained in cache after pressure events.\n\nImplement `solve(input)` where `input.capacity` is the maximum number of keys the cache can hold, and `input.ops` is the ordered list of operations to replay. Each operation has `type`, `key`, and optionally `value`: `type = \"put\"` stores `value` at `key`, while `type = \"get\"` reads `key`.\n\nReturn: `{ gets: (number|null)[], finalKeysMostRecentFirst: string[] }`.\n\nConstraints & Notes: get on missing key returns null. Reads also refresh recency, and puts on an existing key should both update the value and move that key to the most-recent position. The returned key order should reflect the exact eviction policy state after all operations finish.\n\nHint: Use map + doubly-linked list or ordered map emulation.",
    "correctExplanation": "Maintain recency order and evict least-recently-used when capacity exceeded. Target O(1) per op with proper structure.",
    "tests": [
      {
        "input": [
          {
            "capacity": 2,
            "ops": [
              {
                "type": "put",
                "key": "a",
                "value": 1
              },
              {
                "type": "put",
                "key": "b",
                "value": 2
              },
              {
                "type": "get",
                "key": "a"
              },
              {
                "type": "put",
                "key": "c",
                "value": 3
              },
              {
                "type": "get",
                "key": "b"
              }
            ]
          }
        ],
        "expected": {
          "gets": [
            1,
            null
          ],
          "finalKeysMostRecentFirst": [
            "c",
            "a"
          ]
        }
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-min-window-length-3002",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Minimum Window Length Containing Target)\n\nScenario: A query planner minimizes substring scan windows while preserving all required tokens. In the real system, each character represents a token class in a serialized request trace, and the planner wants the smallest contiguous region that still contains every required token with the right multiplicity before launching a heavier downstream scan.\n\nImplement `solve(input)` where `input.s` is the full source string to scan and `input.t` is the target multiset of required characters that must all appear in the window.\n\nReturn: length of minimum valid window (0 if none).\n\nConstraints & Notes: Multiplicity of chars matters. A window is only valid if it contains at least as many copies of each character as `t` requires, and the answer is the window length rather than the substring itself because a later pipeline stage handles the actual slice extraction.\n\nHint: Sliding window with need/have counters.",
    "correctExplanation": "Expand right until valid, then contract left while valid, tracking best length. Time O(|s|+|t|), Space O(1) alphabet-bound.",
    "tests": [
      {
        "input": [
          {
            "s": "ADOBECODEBANC",
            "t": "ABC"
          }
        ],
        "expected": 4
      },
      {
        "input": [
          {
            "s": "a",
            "t": "aa"
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-serialize-interval-insert-3003",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Insert Interval And Merge)\n\nScenario: A booking service inserts one reservation and emits normalized, non-overlapping blocks. The downstream billing and conflict-checking systems assume the reservation stream is always canonical, so after a new booking arrives the service must rewrite the timeline into the smallest sorted set of non-overlapping ranges.\n\nImplement `solve(input)` where `input.intervals` is the existing sorted list of intervals as `[start, end]` pairs, and `input.newInterval` is one additional `[start, end]` pair to insert into that timeline.\n\nReturn: merged non-overlapping intervals.\n\nConstraints & Notes: Input intervals already sorted and non-overlapping. The new interval may land entirely before all intervals, entirely after them, or overlap a long middle span that must collapse into one merged block. Preserve sorted order in the returned result.\n\nHint: Three-phase scan: left / merge / right.",
    "correctExplanation": "Append intervals before overlap, merge overlapping into one, append rest unchanged. Time O(n), Space O(n).",
    "tests": [
      {
        "input": [
          {
            "intervals": [
              [
                1,
                3
              ],
              [
                6,
                9
              ]
            ],
            "newInterval": [
              2,
              5
            ]
          }
        ],
        "expected": [
          [
            1,
            5
          ],
          [
            6,
            9
          ]
        ]
      },
      {
        "input": [
          {
            "intervals": [
              [
                1,
                2
              ],
              [
                3,
                5
              ],
              [
                6,
                7
              ],
              [
                8,
                10
              ],
              [
                12,
                16
              ]
            ],
            "newInterval": [
              4,
              8
            ]
          }
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            3,
            10
          ],
          [
            12,
            16
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-graph-clone-adjlist-3004",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Clone Undirected Graph (Adj List))\n\nScenario: A sandbox duplicates graph topology for isolated simulation experiments. Engineers need a deep clone before applying destructive rewrites, because the original dependency graph is still being used by another simulation worker in the same request path.\n\nImplement `solve(input)` where `input` is an adjacency list: `input[i]` contains the neighbor node indices for node `i`, and nodes are numbered from `0` through `input.length - 1`.\n\nReturn: deep-cloned adjacency list identical in structure.\n\nConstraints & Notes: Graph may contain cycles and self-loops. Treat the input as a complete graph description, not as a tree, and make sure your reconstruction preserves every edge relationship exactly once in adjacency-list form.\n\nHint: DFS/BFS with old->new mapping.",
    "correctExplanation": "Traverse all nodes and recreate neighbor edges using mapped clone nodes. Time O(V+E), Space O(V+E).",
    "tests": [
      {
        "input": [
          [
            [
              1,
              2
            ],
            [
              0,
              2
            ],
            [
              0,
              1,
              3
            ],
            [
              2
            ]
          ]
        ],
        "expected": [
          [
            1,
            2
          ],
          [
            0,
            2
          ],
          [
            0,
            1,
            3
          ],
          [
            2
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-network-delay-time-3005",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Network Delay Time)\n\nScenario: An SRE probe estimates worst-case propagation delay from one source host. The probe sends one synthetic signal and wants to know how long it takes until the slowest reachable host receives it, which is used to set alert thresholds for fan-out control planes.\n\nImplement `solve(input)` where `input.times` is a list of directed edges `[u, v, w]`, meaning a signal can travel from node `u` to node `v` in `w` time units, `input.n` is the total number of nodes labeled `1` through `n`, and `input.k` is the starting source node that sends the signal.\n\nReturn: time for all nodes to receive signal, or -1 if unreachable.\n\nConstraints & Notes: Nodes are 1-indexed. Each edge is directed, the weight is transmission time, and the answer is based on shortest paths from `k`, not on traversing edges in input order. If even one node cannot be reached, the probe treats the rollout as incomplete.\n\nHint: Dijkstra shortest paths from source.",
    "correctExplanation": "Compute shortest distance to each node; answer is maximum finite distance if all reached. Time O((V+E) log V), Space O(V+E).",
    "tests": [
      {
        "input": [
          {
            "times": [
              [
                2,
                1,
                1
              ],
              [
                2,
                3,
                1
              ],
              [
                3,
                4,
                1
              ]
            ],
            "n": 4,
            "k": 2
          }
        ],
        "expected": 2
      },
      {
        "input": [
          {
            "times": [
              [
                1,
                2,
                1
              ]
            ],
            "n": 2,
            "k": 1
          }
        ],
        "expected": 1
      },
      {
        "input": [
          {
            "times": [
              [
                1,
                2,
                1
              ]
            ],
            "n": 2,
            "k": 2
          }
        ],
        "expected": -1
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-palindrome-partition-mincut-3006",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Palindrome Partition Min Cut)\n\nScenario: A compiler pass minimizes segmentation points while ensuring each fragment is palindrome-safe. Think of the string as a token stream that must be broken into the fewest independently valid symmetric chunks before a specialized optimizer can run on each chunk in parallel.\n\nImplement `solve(input)` where `input` is the string to partition into palindrome substrings.\n\nReturn: minimum cuts needed to partition into palindrome substrings.\n\nConstraints & Notes: `n` refers to `input.length`, with size in the usual interview range. A cut splits the string between characters, and the goal is to minimize the number of such splits while guaranteeing every resulting substring is a palindrome.\n\nHint: Precompute palindrome table + DP on cuts.",
    "correctExplanation": "Use palindrome expansion/table and dp[i]=min cuts for prefix ending at i. Time O(n^2), Space O(n^2).",
    "tests": [
      {
        "input": [
          "aab"
        ],
        "expected": 1
      },
      {
        "input": [
          "a"
        ],
        "expected": 0
      },
      {
        "input": [
          "abccbc"
        ],
        "expected": 2
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-max-path-sum-tree-array-3007",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Binary Tree Maximum Path Sum)\n\nScenario: A ranking model computes strongest connected-score chain through hierarchical nodes. Each node contributes positive or negative signal, and the model wants the single best connected path anywhere in the tree to explain the most influential local corridor of decisions.\n\nImplement `solve(input)` where `input = TreeNode | null` and `TreeNode = { val: number, left: TreeNode | null, right: TreeNode | null }.\n\nReturn: maximum path sum between any two nodes.\n\nConstraints & Notes: Path can start/end anywhere but must be connected. The optimal path does not need to pass through the root, and negative branches should be ignored when they would only reduce the total.\n\nHint: Postorder DFS returning max gain to parent.",
    "correctExplanation": "At each node, combine positive left/right gains for candidate answer and return node+maxGain child. Time O(n), Space O(h).",
    "tests": [
      {
        "input": [
          {
            "val": 1,
            "left": {
              "val": 2,
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
        "expected": 6
      },
      {
        "input": [
          {
            "val": -10,
            "left": {
              "val": 9,
              "left": null,
              "right": null
            },
            "right": {
              "val": 20,
              "left": {
                "val": 15,
                "left": null,
                "right": null
              },
              "right": {
                "val": 7,
                "left": null,
                "right": null
              }
            }
          }
        ],
        "expected": 42
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-word-ladder-length-3008",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Word Ladder Length)\n\nScenario: A transform engine computes minimum mutation hops between two tokens. The engine is used in a recovery tool that proposes the smallest valid sequence of one-character edits needed to turn one identifier into another while staying inside an approved dictionary at every intermediate step.\n\nImplement `solve(input)` where `input.beginWord` is the starting word, `input.endWord` is the target word to reach, and `input.wordList` is the dictionary of allowed intermediate and destination words.\n\nReturn: shortest transformation sequence length, or 0 if impossible.\n\nConstraints & Notes: Each step changes exactly one character to a dictionary word. Count both the begin and end words in the returned length, and if `endWord` is absent from the dictionary the transformation should immediately be treated as impossible.\n\nHint: BFS over wildcard pattern graph.",
    "correctExplanation": "Pre-index wildcard patterns to neighbors and BFS by levels from beginWord. Time O(N * L^2) typical, Space O(N * L).",
    "tests": [
      {
        "input": [
          {
            "beginWord": "hit",
            "endWord": "cog",
            "wordList": [
              "hot",
              "dot",
              "dog",
              "lot",
              "log",
              "cog"
            ]
          }
        ],
        "expected": 5
      },
      {
        "input": [
          {
            "beginWord": "hit",
            "endWord": "cog",
            "wordList": [
              "hot",
              "dot",
              "dog",
              "lot",
              "log"
            ]
          }
        ],
        "expected": 0
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-find-median-stream-3009",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Median Finder Stream Simulation)\n\nScenario: A telemetry stream emits inserts and snapshot queries for running median. The monitoring UI asks for the current median repeatedly while new measurements are still arriving, so the stream processor must answer each snapshot without re-sorting the full history from scratch.\n\nImplement `solve(input)` where `input.ops` is the ordered list of stream operations. Each op is either `{ type: \"add\", value: number }` to insert one number into the data stream or `{ type: \"median\" }` to request the current median at that moment.\n\nReturn: array of medians emitted at each median op.\n\nConstraints & Notes: For even count, median is average as number. Operations are sequential and stateful, so every `median` query should reflect all prior `add` operations and none of the later ones.\n\nHint: Two heaps (max-left, min-right).",
    "correctExplanation": "Balance heaps so sizes differ by at most one and left contains lower half. Add O(log n), median O(1).",
    "tests": [
      {
        "input": [
          {
            "ops": [
              {
                "type": "add",
                "value": 1
              },
              {
                "type": "add",
                "value": 2
              },
              {
                "type": "median"
              },
              {
                "type": "add",
                "value": 3
              },
              {
                "type": "median"
              }
            ]
          }
        ],
        "expected": [
          1.5,
          2
        ]
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-n-queens-count-3010",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (N-Queens Count Solutions)\n\nScenario: A combinatorics service reports number of valid non-attacking queen layouts. Downstream planners only care about the total count, not the board renderings, because the count is used as a feasibility score inside a much larger search routine.\n\nImplement `solve(input)` where `input` is the board size `n`, meaning you must place `n` queens on an `n x n` chessboard.\n\nReturn: count of valid placements.\n\nConstraints & Notes: Classic N-Queens constraints. You must place exactly one queen in each row and each column, and no two queens may share a diagonal. Return the number of complete valid boards, not the boards themselves.\n\nHint: Backtracking with columns and diagonals sets.",
    "correctExplanation": "Place row by row, pruning occupied columns/diagonals, and count complete states. Exponential backtracking with strong pruning.",
    "tests": [
      {
        "input": [
          4
        ],
        "expected": 2
      },
      {
        "input": [
          1
        ],
        "expected": 1
      },
      {
        "input": [
          5
        ],
        "expected": 10
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-reconstruct-itinerary-3011",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Reconstruct Itinerary)\n\nScenario: A travel planner rebuilds lexical-min route using all ticket edges exactly once. This comes from an audit tool that receives an unordered bag of tickets from a partially failed booking transaction and must recover the one valid route with the smallest lexical ordering when more than one Eulerian traversal exists.\n\nImplement `solve(input)` where `input` is the list of airline tickets, and each ticket is a `[from, to]` airport pair representing one directed flight that must be used exactly once.\n\nReturn: itinerary path starting from \"JFK\".\n\nConstraints & Notes: Use all tickets exactly once; choose lexical smallest valid path. The lexical rule applies at the point of route construction, not after generating all possible paths, so the intended solution needs to respect ordering while still consuming every edge exactly once.\n\nHint: Hierholzer algorithm with lexical adjacency order.",
    "correctExplanation": "Use DFS postorder on min-ordered adjacency; reverse collected route. Time O(E log E), Space O(E).",
    "tests": [
      {
        "input": [
          [
            [
              "MUC",
              "LHR"
            ],
            [
              "JFK",
              "MUC"
            ],
            [
              "SFO",
              "SJC"
            ],
            [
              "LHR",
              "SFO"
            ]
          ]
        ],
        "expected": [
          "JFK",
          "MUC",
          "LHR",
          "SFO",
          "SJC"
        ]
      },
      {
        "input": [
          [
            [
              "JFK",
              "KUL"
            ],
            [
              "JFK",
              "NRT"
            ],
            [
              "NRT",
              "JFK"
            ]
          ]
        ],
        "expected": [
          "JFK",
          "NRT",
          "JFK",
          "KUL"
        ]
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-min-cost-connect-points-3012",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Min Cost To Connect Points)\n\nScenario: An infra planner links geo nodes with minimum total Manhattan MST cost. Imagine each point as a deployment site in a grid-like city where laying cable between two sites costs Manhattan distance, and finance wants the cheapest network that still connects every site into one reachable system.\n\nImplement `solve(input)` where `input` is the list of points, and each point is an `[x, y]` coordinate on the grid.\n\nReturn: minimum total connection cost.\n\nConstraints & Notes: Cost between two points is |x1-x2| + |y1-y2|. You do not need all pairwise links, only enough edges to make the full set connected with minimum total cost.\n\nHint: Prim MST with min-edge expansion.",
    "correctExplanation": "Grow MST from arbitrary start, always adding smallest edge to an unvisited node. Time O(n^2) with array implementation, Space O(n).",
    "tests": [
      {
        "input": [
          [
            [
              0,
              0
            ],
            [
              2,
              2
            ],
            [
              3,
              10
            ],
            [
              5,
              2
            ],
            [
              7,
              0
            ]
          ]
        ],
        "expected": 20
      },
      {
        "input": [
          [
            [
              3,
              12
            ],
            [
              -2,
              5
            ],
            [
              -4,
              1
            ]
          ]
        ],
        "expected": 18
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-accounts-merge-3013",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Accounts Merge)\n\nScenario: Identity service merges account records sharing at least one email. The ingestion pipeline receives fragmented account snapshots from multiple products, and the merge stage must collapse any records that are provably the same person while leaving unrelated people with the same display name separated.\n\nImplement `solve(input)` where `input` is the list of account rows, and each row has the form `[name, email1, email2, ...]` for one raw account record.\n\nReturn: merged accounts sorted emails and deterministic record order by name then first email.\n\nConstraints & Notes: Same name may belong to different people unless emails connect. Email overlap is the only identity link, so a chain of shared emails across several rows should merge all connected records into one component.\n\nHint: Union-find by email or graph connected components.",
    "correctExplanation": "Build email graph/DSU, collect connected email sets, sort each set, emit merged rows. Near O(N α(N)) with DSU plus sorting.",
    "tests": [
      {
        "input": [
          [
            [
              "John",
              "johnsmith@mail.com",
              "john_newyork@mail.com"
            ],
            [
              "John",
              "johnsmith@mail.com",
              "john00@mail.com"
            ],
            [
              "Mary",
              "mary@mail.com"
            ],
            [
              "John",
              "johnnybravo@mail.com"
            ]
          ]
        ],
        "expected": [
          [
            "John",
            "john00@mail.com",
            "john_newyork@mail.com",
            "johnsmith@mail.com"
          ],
          [
            "John",
            "johnnybravo@mail.com"
          ],
          [
            "Mary",
            "mary@mail.com"
          ]
        ]
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-task-scheduler-3014",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Task Scheduler Cooldown)\n\nScenario: A worker orchestrator enforces cooldown windows between equal task labels. Think of repeated labels as using the same limited hardware lane, where the scheduler must leave enough time between matching tasks or explicitly idle if nothing else is available to run.\n\nImplement `solve(input)` where `input.tasks` is the list of task labels to execute and `input.n` is the cooldown length, meaning the scheduler must wait at least `n` intervals before running the same label again.\n\nReturn: minimum intervals needed to finish all tasks.\n\nConstraints & Notes: Each interval executes one task or idle. The answer is the shortest possible total schedule length, not a specific ordering, and idles are only inserted when the cooldown rule makes them unavoidable.\n\nHint: Greedy count-frequency formula.",
    "correctExplanation": "Use max frequency f and count of tasks with frequency f to compute frame length. Time O(taskCount), Space O(1) alphabet-bound.",
    "tests": [
      {
        "input": [
          {
            "tasks": [
              "A",
              "A",
              "A",
              "B",
              "B",
              "B"
            ],
            "n": 2
          }
        ],
        "expected": 8
      },
      {
        "input": [
          {
            "tasks": [
              "A",
              "A",
              "A",
              "B",
              "B",
              "B"
            ],
            "n": 0
          }
        ],
        "expected": 6
      }
    ]
  },
  {
    "id": "raw-coding-hard-rich-merge-k-lists-arrays-3015",
    "difficulty": "hard",
    "prompt": "Live coding Challenge (Merge K Sorted Lists (Array Form))\n\nScenario: A feed aggregator merges multiple sorted channels into one final timeline. Each inner list is already sorted by timestamp, but the aggregator must interleave all channels into one globally sorted stream without losing duplicates or assuming the lists have equal lengths.\n\nImplement `solve(input)` where `input` is the collection of sorted lists, so `input[i]` is the `i`th sorted number array and the total number of inner lists is `k = input.length`.\n\nReturn: single sorted merged list.\n\nConstraints & Notes: Allow empty inner lists. This is the array form of the classic merge-k-lists problem, so the goal is still to emit all values in sorted order while touching only the current frontier element from each list at any moment.\n\nHint: Min-heap over current heads.",
    "correctExplanation": "Push head from each list, repeatedly pop min and push next from same list. Time O(N log k), Space O(k).",
    "tests": [
      {
        "input": [
          [
            [
              1,
              4,
              5
            ],
            [
              1,
              3,
              4
            ],
            [
              2,
              6
            ]
          ]
        ],
        "expected": [
          1,
          1,
          2,
          3,
          4,
          4,
          5,
          6
        ]
      },
      {
        "input": [
          [
            []
          ]
        ],
        "expected": []
      }
    ]
  }
]

export default data
