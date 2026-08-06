import { buildLeetcodePatternQuestion } from '../patternOptions'

function richPrompt(params: {
  title: string
  brief: string
  io: string
  constraints: string
  objective: string
}): string {
  return (
    `${params.title}\n\n` +
    `Problem: ${params.brief}\n` +
    `Input/Output: ${params.io}\n` +
    `Constraints: ${params.constraints}\n\n` +
    `Interview Objective: ${params.objective}`
  )
}

const data = [
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-permutations',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 46 - Permutations',
      brief: 'Generate all orderings of distinct numbers.',
      io: 'Return list of all permutations.',
      constraints: 'Need exhaustive generation with state restoration.',
      objective: 'Choose the pattern for ordering-based combinatorial enumeration.',
    }),
    correctPattern: 'Permutations',
    correctExplanation: 'Backtracking over choices with visited/swap semantics generates all permutations.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-subsets',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 78 - Subsets',
      brief: 'Generate all possible subsets of a set of distinct elements.',
      io: 'Return power set (including empty and full set).',
      constraints: 'Need complete include/exclude exploration.',
      objective: 'Pick pattern for power-set style decision trees.',
    }),
    correctPattern: 'Subsets and Power Set',
    correctExplanation: 'Include/exclude recursion is the canonical subsets pattern.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-combination-sum-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 40 - Combination Sum II',
      brief: 'Find unique combinations summing to target, each candidate used at most once.',
      io: 'Return all unique valid combinations.',
      constraints: 'Duplicates in input require deduped path generation.',
      objective: 'Choose constrained combination-building backtracking pattern.',
    }),
    correctPattern: 'Combinations / Combination Sum',
    correctExplanation: 'Combination Sum family uses index progression + remaining target pruning.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-unique-paths',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 62 - Unique Paths',
      brief: 'Count number of paths from top-left to bottom-right with only right/down moves.',
      io: 'Return integer count of distinct paths.',
      constraints: 'Grid DP transition from top and left states.',
      objective: 'Pick dynamic programming pattern for 2D path counting.',
    }),
    correctPattern: 'Matrix / Grid DP',
    correctExplanation: 'Each cell count derives from neighbors in a 2D DP table.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-edit-distance',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 72 - Edit Distance',
      brief: 'Compute minimum operations to convert one string to another.',
      io: 'Return integer minimum edit count.',
      constraints: 'Operation choices depend on prefixes of both strings.',
      objective: 'Choose 2D sequence-alignment style dynamic programming pattern.',
    }),
    correctPattern: 'Longest Common Subsequence (LCS) Pattern',
    correctExplanation: 'Edit distance and LCS-style problems share 2D DP over string prefix pairs.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-house-robber',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 198 - House Robber',
      brief: 'Maximize stolen money without robbing adjacent houses in a line.',
      io: 'Return maximum achievable sum.',
      constraints: 'Each index depends on prior one/two states.',
      objective: 'Pick simple linear-state dynamic programming recurrence pattern.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'State transition uses previous one or two positions in linear DP.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-kth-largest-element',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 215 - Kth Largest Element in an Array',
      brief: 'Return kth largest value in unsorted array.',
      io: 'Output scalar kth largest.',
      constraints: 'Full sort is acceptable but not always optimal for very large n.',
      objective: 'Choose heap-based selection pattern for top-k extraction.',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Maintain heap of size k or equivalent top-k selection strategy.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-graph-bipartite',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 785 - Is Graph Bipartite?',
      brief: 'Determine if vertices can be split into two groups with no intra-group edges.',
      io: 'Return true/false.',
      constraints: 'May have multiple connected components.',
      objective: 'Pick graph-coloring pattern for 2-partition feasibility.',
    }),
    correctPattern: 'Bipartite Graph Check (Coloring)',
    correctExplanation: 'Two-color BFS/DFS detects odd-cycle conflicts and bipartite validity.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-accounts-merge',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 721 - Accounts Merge',
      brief: 'Merge user accounts that share any email address.',
      io: 'Return merged account groups with combined emails.',
      constraints: 'Need dynamic connectivity across many pairwise overlaps.',
      objective: 'Pick connectivity pattern optimized for repeated union operations.',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union-Find merges connected email sets and supports efficient grouping.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-word-ladder',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 127 - Word Ladder',
      brief: 'Find shortest transformation sequence length between words with one-letter changes.',
      io: 'Return shortest step count or 0 if no path.',
      constraints: 'All transitions equal weight; level expansion is natural.',
      objective: 'Choose shortest-path traversal pattern for unweighted state graph.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS over dictionary graph finds minimum transformations by depth layers.',
  }),
]

export default data
