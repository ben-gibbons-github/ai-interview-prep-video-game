import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  scenario: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem Scenario: ${params.scenario}\n` +
    `Input/Output Expectations: ${params.io}\n` +
    `Operational Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-min-cost-to-connect-all-points-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1584 - Min Cost to Connect All Points',
      scenario: 'Given points in plane with Manhattan edge weights, connect all points at minimum total cost.',
      io: 'Return total minimum connection cost.',
      constraints: 'Complete graph implied; explicit edge generation can be heavy.',
      objective: 'Choose MST growth pattern expanding from visited set by cheapest frontier edge.',
    }),
    correctPattern: "Minimum Spanning Tree (Prim's Algorithm)",
    correctExplanation: 'Prim incrementally grows MST by selecting minimum edge crossing cut.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-redundant-connection-ii-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 685 - Redundant Connection II',
      scenario: 'Directed graph started as rooted tree then one extra edge added; remove one edge to restore rooted tree.',
      io: 'Return removable edge according to problem tie rules.',
      constraints: 'Need to handle both cycle and two-parents conflict cases.',
      objective: 'Select disjoint-set connectivity pattern with extra parent bookkeeping.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find detects cycle edges while parent tracking handles indegree-2 anomalies.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-longest-duplicate-substring-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1044 - Longest Duplicate Substring',
      scenario: 'Find longest substring appearing at least twice in string.',
      io: 'Return one longest duplicate substring, or empty if none.',
      constraints: 'Brute-force comparisons are too slow for long strings.',
      objective: 'Choose monotonic answer-length feasibility search with rolling hash validation.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search candidate length and test duplicate existence with rolling hash/set.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-smallest-range-covering-k-lists-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 632 - Smallest Range Covering Elements from K Lists',
      scenario: 'Given k sorted lists, find shortest interval containing at least one number from each list.',
      io: 'Return [start, end] of smallest valid range.',
      constraints: 'Must continuously track current minimum and maximum among chosen list heads.',
      objective: 'Identify multi-stream merge with priority queue over current heads.',
    }),
    correctPattern: 'K-Way Merge',
    correctExplanation: 'Min-heap over list pointers advances smallest element while tracking global max.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-serialize-deserialize-bst-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 449 - Serialize and Deserialize BST',
      scenario: 'Encode BST into compact string and reconstruct exact BST from that encoding.',
      io: 'Implement serialize and deserialize methods.',
      constraints: 'Need deterministic decode boundaries for subtrees.',
      objective: 'Choose root-first traversal representation with bound-based decode recursion.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order sequence with BST bounds reconstructs tree without explicit null markers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-russian-doll-envelopes-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 354 - Russian Doll Envelopes',
      scenario: 'Find maximum chain of envelopes where width and height both strictly increase.',
      io: 'Return maximum nesting count.',
      constraints: 'Need careful sorting tie-break plus subsequence optimization.',
      objective: 'Recognize reduction to longest increasing subsequence on one dimension.',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'After sorting by width and reverse height ties, solve LIS on heights.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-stone-game-iii-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1406 - Stone Game III',
      scenario: 'Players take 1-3 stones from front, maximizing score difference with optimal play.',
      io: 'Return winner: Alice, Bob, or Tie.',
      constraints: 'Decision at index depends on future optimal differences.',
      objective: 'Choose linear state-difference DP over suffix positions.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'DP at index stores best score differential achievable from remaining suffix.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-palindrome-pairs-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 336 - Palindrome Pairs',
      scenario: 'Given list of unique words, find index pairs where concatenation forms palindrome.',
      io: 'Return all valid index pairs.',
      constraints: 'Need fast prefix/suffix lookups across many word splits.',
      objective: 'Select prefix-tree pattern for efficient reverse-word and split matching.',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie over reversed words supports fast candidate discovery for palindrome splits.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-range-sum-query-mutable-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 307 - Range Sum Query Mutable',
      scenario: 'Support point updates and range sum queries over array.',
      io: 'Implement update and sumRange efficiently.',
      constraints: 'Frequent updates and queries require logarithmic operations.',
      objective: 'Choose indexed binary tree pattern for mutable prefix aggregation.',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'Fenwick tree provides O(log n) point update and prefix/range sum queries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-max-xor-of-two-numbers-conceptual',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 421 - Maximum XOR of Two Numbers in an Array',
      scenario: 'Find maximum XOR value obtainable from any pair of numbers.',
      io: 'Return maximal XOR result.',
      constraints: 'Need near-linear complexity with bitwise prefix exploration.',
      objective: 'Choose bitwise trie pattern that greedily matches opposite bits at each level.',
    }),
    correctPattern: 'Trie + Bitwise XOR',
    correctExplanation: 'Binary trie supports maximizing XOR by choosing complementary bits when available.',
  }),
]

export default data
