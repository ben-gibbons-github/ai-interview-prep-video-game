import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  fullProblem: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Full Problem Statement: ${params.fullProblem}\n` +
    `Input/Output Requirements: ${params.io}\n` +
    `Constraints and Edge Cases: ${params.constraints}\n\n` +
    `Pattern Selection Question: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc23-merge-k-sorted-lists-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 23 - Merge k Sorted Lists',
      fullProblem: 'Merge k sorted linked lists into one sorted linked list while preserving all values.',
      io: 'Input: array of sorted list heads. Output: head of merged sorted list.',
      constraints: 'Need repeated access to the smallest current list head among k active lists.',
      objective: 'Which multi-stream merge pattern uses a heap to repeatedly select the next smallest node?',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'A min-heap stores the current head of each list and yields the next smallest value efficiently.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc297-serialize-and-deserialize-binary-tree-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 297 - Serialize and Deserialize Binary Tree',
      fullProblem: 'Design methods to serialize a binary tree into a string and deserialize it back into the same tree structure.',
      io: 'Input: tree root or serialized string. Output: serialized string or reconstructed root.',
      constraints: 'Need deterministic structure preservation, including null children.',
      objective: 'Which root-first tree traversal pattern is typically used with null sentinels for this encoding?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order serialization with placeholders preserves structure and deserializes naturally with recursive parsing.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc126-word-ladder-ii-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 126 - Word Ladder II',
      fullProblem: 'Return all shortest transformation sequences from beginWord to endWord, changing one character at a time and staying in the dictionary.',
      io: 'Input: beginWord, endWord, wordList. Output: all shortest sequences.',
      constraints: 'Need shortest-level discovery before reconstructing every minimal path.',
      objective: 'Which unweighted shortest-path traversal pattern sets the depth frontier for path reconstruction?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS records shortest-depth parents, then backtracking enumerates every minimal path.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1463-cherry-pickup-ii-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1463 - Cherry Pickup II',
      fullProblem: 'Two robots start at top row ends and move downward together, collecting cherries while avoiding double counting if they land on same cell.',
      io: 'Input: grid matrix. Output: maximum cherries collectible.',
      constraints: 'Need multi-agent state over row and both robot columns.',
      objective: 'Which grid DP pattern handles simultaneous row-by-row transitions for two moving agents?',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'DP[r][c1][c2] tracks the best score for both robots at row r and columns c1,c2.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc871-minimum-number-of-refueling-stops-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 871 - Minimum Number of Refueling Stops',
      fullProblem: 'Travel to target with initial fuel and refueling stations. Determine the minimum number of refuel stops required.',
      io: 'Input: target, startFuel, stations. Output: minimum refuels or -1.',
      constraints: 'Need greedily select the best available fuel among stations already reachable.',
      objective: 'Which heap-based greedy pattern keeps the largest reachable refill options available?',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Use a max-heap of fuels from passed stations and refuel with the largest when needed to continue.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc123-best-time-to-buy-and-sell-stock-iii-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 123 - Best Time to Buy and Sell Stock III',
      fullProblem: 'Given daily stock prices, maximize profit with at most two complete transactions.',
      io: 'Input: prices array. Output: maximum achievable profit with <= 2 transactions.',
      constraints: 'Need phase transitions between holding and cash states for two transaction cycles.',
      objective: 'Which state-machine style DP models buy/sell phases across transactions?',
    }),
    correctPattern: 'State Machine / Buy-Sell Stock DP',
    correctExplanation: 'Track the best profit after each buy and sell stage, updating states day by day.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc154-find-minimum-in-rotated-sorted-array-ii-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 154 - Find Minimum in Rotated Sorted Array II',
      fullProblem: 'Find minimum in a rotated sorted array that may contain duplicate values.',
      io: 'Input: rotated sorted nums. Output: minimum value.',
      constraints: 'Duplicates can make half-selection ambiguous, so boundaries may need cautious shrinking.',
      objective: 'Which rotated-array search pattern is the base approach for pivot/minimum discovery?',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Use binary-search-style boundary comparisons, shrinking the search range as ambiguity allows.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc493-reverse-pairs-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 493 - Reverse Pairs',
      fullProblem: 'Count pairs (i,j) where i < j and nums[i] > 2 * nums[j].',
      io: 'Input: nums array. Output: count of reverse pairs.',
      constraints: 'Need subquadratic counting over transformed value comparisons.',
      objective: 'Which indexed frequency structure enables range counting over processed values?',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Coordinate compression plus BIT lets us count values by rank while scanning the array.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc218-the-skyline-problem-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 218 - The Skyline Problem',
      fullProblem: 'Given building rectangles, output the skyline critical points where the visible outline height changes.',
      io: 'Input: buildings [left,right,height]. Output: key points of the skyline.',
      constraints: 'Need event-based line sweep with dynamic tallest-active-building tracking.',
      objective: 'Which interval boundary event pattern is the standard contour-extraction approach?',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sort all start/end events and update an active-height structure to emit points when the max changes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc827-making-a-large-island-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 827 - Making A Large Island',
      fullProblem: 'You may flip at most one 0 to 1 in a binary grid. Return the largest possible island area after one flip.',
      io: 'Input: binary grid. Output: maximum island size after one change.',
      constraints: 'Need component labeling and unique-neighbor area aggregation for each zero cell.',
      objective: 'Which connectivity component pattern supports merging adjacent island sizes efficiently?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Label islands with DSU or component IDs, then evaluate each zero by combining distinct neighboring components.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1293-shortest-path-in-a-grid-with-obstacles-elimination-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1293 - Shortest Path in a Grid with Obstacles Elimination',
      fullProblem: 'Find shortest path in a grid where you may remove up to k obstacles while moving 4-directionally from start to finish.',
      io: 'Input: grid and k. Output: minimum path length or -1.',
      constraints: 'State must include remaining eliminations, so revisiting a cell with more budget matters.',
      objective: 'Which shortest-path pattern on an expanded state graph is appropriate?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS across states (row,col,remainingK) guarantees minimum steps under obstacle removal constraints.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1542-find-longest-awesome-substring-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1542 - Find Longest Awesome Substring',
      fullProblem: 'A substring is awesome if its digits can be rearranged into a palindrome. Return the length of the longest awesome substring.',
      io: 'Input: digit string s. Output: maximum awesome-substring length.',
      constraints: 'Need parity masks and fast matching of equal or one-bit-different masks.',
      objective: 'Which bitwise parity-state pattern is the core optimization technique?',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'Maintain prefix parity masks and use seen masks to detect palindrome-rearrangeable windows in O(10) per position.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc354-russian-doll-envelopes-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 354 - Russian Doll Envelopes',
      fullProblem: 'Given envelopes [w,h], find the maximum number that can be nested with both dimensions strictly increasing.',
      io: 'Input: list of envelope pairs. Output: maximum nesting count.',
      constraints: 'Need sort by one dimension then optimize a sequence on the other dimension.',
      objective: 'Which sequence optimization pattern is the standard follow-up after sorting widths?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Sort by width asc and height desc on ties, then run LIS on heights.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc301-remove-invalid-parentheses-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 301 - Remove Invalid Parentheses',
      fullProblem: 'Remove the minimum number of invalid parentheses to make the expression valid, and return all possible valid results.',
      io: 'Input: string s. Output: all valid strings with minimum deletions.',
      constraints: 'Need minimal-deletion guarantee before enumerating all solutions.',
      objective: 'Which shortest-path-in-state-space traversal pattern naturally explores by deletion count?',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS by deletion level ensures the first valid level uses the minimum number of removals.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1883-minimum-skips-to-arrive-at-meeting-on-time-additional-23',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1883 - Minimum Skips to Arrive at Meeting On Time',
      fullProblem: 'Given road travel times and a time limit, find the minimum number of skips of mandatory rest waits needed to arrive on time.',
      io: 'Input: dist array, speed, hoursBefore. Output: minimum skips or -1.',
      constraints: 'Need track best achievable time across prefix roads and number of skips used.',
      objective: 'Which dynamic programming pattern over sequential decisions is most suitable?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'DP by road index and skips used captures best arrival times while accounting for optional wait skipping.',
  }),
]

export default data
