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
    id: 'leetcode-pattern-type-medium-find-all-anagrams-in-a-string-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 438 - Find All Anagrams in a String',
      fullProblem: 'Given strings s and p, find all start indices in s where substring of length |p| is an anagram of p.',
      io: 'Input: s and p. Output: list of start indices for all anagram windows.',
      constraints: 'Need efficient character-frequency update while window slides one position.',
      objective: 'Which pattern is most appropriate for fixed-size frequency windows over strings?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Maintain rolling frequency counts for a window of size p.length and compare against target counts.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-remove-k-digits-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 402 - Remove K Digits',
      fullProblem: 'Given numeric string num and integer k, remove exactly k digits to produce smallest possible resulting number.',
      io: 'Input: num string and k. Output: smallest possible number string without leading zeros unless number is zero.',
      constraints: 'Need greedy local deletions where larger previous digits should be removed when smaller future digits appear.',
      objective: 'Which pattern uses monotonic structure to enforce increasing digit stack for minimal lexicographic numeric value?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Pop larger previous digits while removals remain and current digit is smaller; trim and normalize zeros.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-sum-circular-subarray-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 918 - Maximum Sum Circular Subarray',
      fullProblem: 'Find maximum possible sum of non-empty subarray in circular array where subarray can wrap end-to-start.',
      io: 'Input: integer array nums. Output: maximum circular subarray sum.',
      constraints: 'Need compare non-wrapping best with wrapping case using total sum and minimum subarray.',
      objective: 'Which linear running-optimum pattern supports both max and min subarray scans?',
    }),
    correctPattern: "Kadane's Algorithm",
    correctExplanation: 'Use Kadane for max subarray and min subarray; answer is max(non-wrap, total-min) with all-negative handling.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-subsets-ii-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 90 - Subsets II',
      fullProblem: 'Given integer array that may contain duplicates, return all possible subsets without duplicate subset entries.',
      io: 'Input: nums possibly with duplicates. Output: power set with unique subsets only.',
      constraints: 'Need duplicate suppression logic while exploring include/exclude choices.',
      objective: 'Which canonical pattern generates power sets while controlling duplicate branch expansion?',
    }),
    correctPattern: 'Subsets and Power Set',
    correctExplanation: 'Sort input and backtrack subsets while skipping duplicate starts at the same decision depth.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-non-decreasing-subsequences-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 491 - Non-decreasing Subsequences',
      fullProblem: 'Return all distinct subsequences of length at least 2 where sequence is non-decreasing.',
      io: 'Input: nums array. Output: list of unique valid subsequences.',
      constraints: 'Need branching with local duplicate elimination and monotonicity pruning.',
      objective: 'Which pattern emphasizes backtracking with constraint checks and branch pruning?',
    }),
    correctPattern: 'Pruning and Constraint Propagation',
    correctExplanation: 'Backtracking keeps only non-decreasing extensions and uses per-depth seen sets to avoid duplicate branches.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-max-area-of-island-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 695 - Max Area of Island',
      fullProblem: 'In binary grid, area of island is count of connected 1-cells via 4-directional adjacency. Return maximum island area.',
      io: 'Input: binary grid. Output: largest connected component area.',
      constraints: 'Need component traversal and area accumulation while marking visited cells.',
      objective: 'Which graph traversal pattern best fits connected-component area computation in grids?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'DFS/BFS flood-fill each island, count visited cells, and track maximum area.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-maximum-points-you-can-obtain-from-cards-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1423 - Maximum Points You Can Obtain from Cards',
      fullProblem: 'Pick exactly k cards from either beginning or end of array to maximize score.',
      io: 'Input: cardPoints and k. Output: maximum obtainable score.',
      constraints: 'Equivalent to removing a contiguous middle subarray of length n-k with minimum sum.',
      objective: 'Which pattern handles fixed-length window sums to optimize complementary selection?',
    }),
    correctPattern: 'Sliding Window (Fixed Size)',
    correctExplanation: 'Find minimum sum window of size n-k, then subtract from total to get maximum edge-pick score.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-find-all-possible-recipes-from-given-supplies-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 2115 - Find All Possible Recipes from Given Supplies',
      fullProblem: 'Recipes require ingredients, some ingredients are recipes themselves. Given initial supplies, determine all recipes that can eventually be made.',
      io: 'Input: recipes, ingredients lists, supplies. Output: list of makeable recipes.',
      constraints: 'Dependency graph may chain through multiple recipe levels.',
      objective: 'Which dependency-resolution pattern repeatedly unlocks nodes once indegree requirements are met?',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Model ingredients-to-recipe dependencies, decrement indegrees as supplies/recipes become available.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-surrounded-regions-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 130 - Surrounded Regions',
      fullProblem: 'In board of X and O, capture all O regions fully surrounded by X. Border-connected O cells must remain O.',
      io: 'Input: 2D board. Output: board modified in-place after captures.',
      constraints: 'Need preserve boundary-reachable regions before flipping interior candidates.',
      objective: 'Which graph traversal pattern starts from safe boundary regions and marks them before final transformation?',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Mark O cells reachable from borders as safe, then flip unmarked O cells to X.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-minimum-cost-for-tickets-additional-12',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 983 - Minimum Cost For Tickets',
      fullProblem: 'Given travel days and costs for 1-day, 7-day, and 30-day passes, compute minimum total cost to cover all travel days.',
      io: 'Input: days array and costs array. Output: minimum ticket cost.',
      constraints: 'Need choose pass lengths that overlap future days optimally, with repeated subproblem structure.',
      objective: 'Which DP pattern over sequential time states best captures minimal cumulative cost?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'DP by day/index computes minimum cost as min of buying each pass and jumping forward accordingly.',
  }),
]

export default data
