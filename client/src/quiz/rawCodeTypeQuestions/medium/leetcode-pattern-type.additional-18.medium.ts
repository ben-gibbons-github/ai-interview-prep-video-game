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
    id: 'leetcode-pattern-type-medium-lc3-longest-substring-without-repeating-characters-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 3 - Longest Substring Without Repeating Characters',
      fullProblem: 'Given string s, find length of longest substring containing no repeated characters.',
      io: 'Input: string s. Output: maximum length of duplicate-free contiguous substring.',
      constraints: 'Need linear-time approach that expands and shrinks a valid character window.',
      objective: 'Which dynamic window pattern tracks uniqueness while adjusting left boundary on repeats?',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Maintain window with char positions/frequencies and move left pointer to remove duplicates when needed.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc542-01-matrix-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 542 - 01 Matrix',
      fullProblem: 'For each cell in binary matrix, return distance to nearest 0 cell using Manhattan steps.',
      io: 'Input: binary matrix. Output: distance matrix.',
      constraints: 'Distances expand outward from all zeros simultaneously.',
      objective: 'Which graph pattern starts from multiple sources at once to fill shortest unweighted distances?',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Initialize queue with all zero cells distance 0, then BFS layer by layer to assign nearest-zero distances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc56-merge-intervals-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 56 - Merge Intervals',
      fullProblem: 'Given list of intervals, merge all overlapping intervals and return non-overlapping result covering same ranges.',
      io: 'Input: intervals array. Output: merged interval list.',
      constraints: 'Need sort and greedily extend current interval when overlap exists.',
      objective: 'Which interval processing pattern combines sorted ranges by overlap checks?',
    }),
    correctPattern: 'Overlapping Intervals / Merge Intervals',
    correctExplanation: 'Sort by start, then merge into output by comparing next start with current end.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc33-search-in-rotated-sorted-array-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 33 - Search in Rotated Sorted Array',
      fullProblem: 'Sorted array has been rotated at unknown pivot with distinct values. Find index of target or return -1.',
      io: 'Input: rotated sorted nums and target. Output: target index or -1.',
      constraints: 'Need logarithmic search while determining which half is ordered each step.',
      objective: 'Which specialized binary-search pattern handles a pivoted sorted array?',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'At each midpoint, identify sorted half and decide if target lies within it to discard the other half.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc739-daily-temperatures-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 739 - Daily Temperatures',
      fullProblem: 'For each day, compute number of days until a warmer temperature. If none, output 0.',
      io: 'Input: temperatures array. Output: waits array.',
      constraints: 'Need nearest greater element to the right for each index efficiently.',
      objective: 'Which stack pattern maintains unresolved indices in monotonic order to resolve next-warmer days?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Maintain decreasing temperature indices; when a warmer day arrives, pop and set wait distances.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc198-house-robber-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 198 - House Robber',
      fullProblem: 'Given non-negative money values in line of houses, maximize stolen amount without robbing adjacent houses.',
      io: 'Input: nums array. Output: maximum achievable non-adjacent sum.',
      constraints: 'Local choice depends on optimal subproblems i-1 and i-2.',
      objective: 'Which one-dimensional DP recurrence captures take-vs-skip decisions?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i]) models skipping or robbing current house.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc337-house-robber-iii-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 337 - House Robber III',
      fullProblem: 'Houses form a binary tree. If you rob a node, you cannot rob its children. Return maximum collectible amount.',
      io: 'Input: binary tree root. Output: maximum robbery sum.',
      constraints: 'Need per-node state for rob vs skip with subtree aggregation.',
      objective: 'Which DP-on-tree pattern computes paired states bottom-up?',
    }),
    correctPattern: 'DP on Trees',
    correctExplanation: 'Post-order returns [robThis, skipThis] for each node using children states to combine choices.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc208-implement-trie-prefix-tree-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 208 - Implement Trie (Prefix Tree)',
      fullProblem: 'Design trie supporting insert(word), search(word), and startsWith(prefix).',
      io: 'Input: operation sequence on words/prefixes. Output: boolean results for query operations.',
      constraints: 'Need efficient prefix sharing and character-by-character branching structure.',
      objective: 'Which dedicated prefix-index data structure pattern is intended for this API?',
    }),
    correctPattern: 'Trie (Prefix Tree)',
    correctExplanation: 'Trie nodes represent prefix paths, enabling O(L) insert/search/prefix checks by character traversal.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc994-rotting-oranges-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 994 - Rotting Oranges',
      fullProblem: 'Grid cells are empty, fresh orange, or rotten orange. Every minute, fresh oranges adjacent to rotten become rotten. Return minutes until no fresh remains or -1.',
      io: 'Input: grid matrix. Output: minimum minutes or -1.',
      constraints: 'Contagion spreads simultaneously from all initially rotten cells each minute.',
      objective: 'Which BFS variant models synchronized spread from many initial sources?',
    }),
    correctPattern: 'Multi-Source BFS',
    correctExplanation: 'Queue all rotten oranges initially and process level-by-level to represent elapsed minutes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc129-sum-root-to-leaf-numbers-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 129 - Sum Root to Leaf Numbers',
      fullProblem: 'Each root-to-leaf path forms a number by concatenating digits. Return sum of all path numbers.',
      io: 'Input: binary tree root of digit nodes. Output: total sum of all root-to-leaf numbers.',
      constraints: 'Need propagate current numeric prefix to children and finalize at leaves.',
      objective: 'Which depth-first traversal pattern carries accumulated state downward?',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Pre-order DFS updates currentValue = currentValue*10 + node.val and adds it at leaf nodes.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc875-koko-eating-bananas-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 875 - Koko Eating Bananas',
      fullProblem: 'Koko must eat all banana piles within h hours and eats at constant speed k bananas/hour. Find minimum integer k.',
      io: 'Input: piles and h. Output: smallest feasible speed k.',
      constraints: 'Feasibility (finish within h) is monotonic as speed increases.',
      objective: 'Which pattern binary-searches a numeric answer space with predicate checks?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Check hours needed at speed k, then binary search smallest k with required hours <= h.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-lc735-asteroid-collision-additional-18',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 735 - Asteroid Collision',
      fullProblem: 'Asteroids move in a line; positive right, negative left. Colliding asteroids annihilate smaller magnitude, equal both disappear. Return final state.',
      io: 'Input: asteroid list. Output: remaining asteroids in order.',
      constraints: 'Need repeatedly resolve newest incoming asteroid against most recent active opposite-direction candidate.',
      objective: 'Which LIFO conflict-resolution pattern models these chain reactions cleanly?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Stack stores survivors; new left-moving asteroid resolves against right-moving top until stable.',
  }),
]

export default data
