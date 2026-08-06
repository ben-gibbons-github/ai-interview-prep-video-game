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
    id: 'leetcode-pattern-type-easy-move-zeroes-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 283 - Move Zeroes',
      scenario: 'Reorder an integer array in-place so that all zeros are moved to the end while preserving the relative order of non-zero elements.',
      io: 'Mutate the input array directly and preserve stability among non-zero values.',
      constraints: 'Linear pass with constant extra space is expected; avoid repeatedly swapping zero blocks back and forth.',
      objective: 'Identify a forward-compaction pointer pattern where one pointer writes the next non-zero slot while another scans.',
    }),
    correctPattern: 'Two Pointers (Same Direction / Fast and Slow)',
    correctExplanation: 'Fast scans elements, slow tracks placement boundary for non-zero values, producing stable compaction.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-guess-number-higher-lower-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 374 - Guess Number Higher or Lower',
      scenario: 'An API indicates whether your guess is high, low, or correct; find the hidden number within 1..n using minimum calls.',
      io: 'Return the exact hidden number.',
      constraints: 'Search space is ordered and oracle responses are monotonic with respect to guesses.',
      objective: 'Choose logarithmic halving over a sorted numeric interval.',
    }),
    correctPattern: 'Classic Binary Search',
    correctExplanation: 'Binary search minimizes oracle calls by discarding half the interval each iteration.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-power-of-three-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 326 - Power of Three',
      scenario: 'Determine whether an integer can be expressed as 3^k for some non-negative integer k.',
      io: 'Return true for powers of three, false otherwise.',
      constraints: 'Prefer a constant-time numerical/bit-style trick or tightly bounded arithmetic strategy.',
      objective: 'Pick the low-level numeric property checking approach used for power recognition.',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'Although base-3 specific, this class uses compact arithmetic/bit-style invariants for power checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-min-cost-climbing-stairs-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 746 - Min Cost Climbing Stairs',
      scenario: 'Each step has a cost; you can climb 1 or 2 steps. Find minimum total cost to reach the top.',
      io: 'Return the minimum achievable cumulative cost.',
      constraints: 'Transition only depends on recent states, enabling rolling optimization.',
      objective: 'Recognize the short-memory linear dynamic programming recurrence pattern.',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'State at index i depends on min of previous one-step and two-step transitions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-tree-postorder-traversal-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 145 - Binary Tree Postorder Traversal',
      scenario: 'Return traversal in left-right-root order for a binary tree.',
      io: 'Return list of node values in postorder sequence.',
      constraints: 'Need complete tree coverage while preserving strict postorder visitation semantics.',
      objective: 'Choose depth-first traversal where parent is processed after both children.',
    }),
    correctPattern: 'Tree DFS (Post-order)',
    correctExplanation: 'Postorder recursion/stack strategy naturally outputs left, right, then node.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-tree-preorder-traversal-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 144 - Binary Tree Preorder Traversal',
      scenario: 'Return traversal in root-left-right order for a binary tree.',
      io: 'Return list of node values in preorder sequence.',
      constraints: 'Must preserve root-first ordering while still visiting entire tree.',
      objective: 'Choose depth-first traversal that processes node before recursive subtrees.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Preorder emits each node before traversing its left and right descendants.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-binary-tree-inorder-traversal-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 94 - Binary Tree Inorder Traversal',
      scenario: 'Produce traversal in left-root-right order for a binary tree.',
      io: 'Return inorder sequence of node values.',
      constraints: 'For BST this order corresponds to sorted values, but traversal should work for any binary tree.',
      objective: 'Identify in-order DFS sequencing pattern for tree recursion/stack.',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'Inorder traversal visits left subtree, then node, then right subtree.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-find-if-path-exists-in-graph-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 1971 - Find if Path Exists in Graph',
      scenario: 'Given an undirected graph and two nodes, decide whether any path connects source to destination.',
      io: 'Return true if a path exists, false otherwise.',
      constraints: 'Graph can be sparse or dense; need full connectivity exploration from source until target found.',
      objective: 'Choose graph traversal strategy focused on reachability in unweighted graphs.',
    }),
    correctPattern: 'Graph BFS (Shortest Path in Unweighted Graph)',
    correctExplanation: 'BFS explores reachable nodes layer-by-layer and quickly confirms path existence.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-time-needed-to-buy-tickets-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 2073 - Time Needed to Buy Tickets',
      scenario: 'People in queue buy one ticket per turn then rotate to end if they still need more tickets; compute when person k finishes.',
      io: 'Return total number of turns/seconds until person k completes purchases.',
      constraints: 'Need efficient counting logic without full heavy simulation for large values.',
      objective: 'Recognize accumulation-by-position pattern that aggregates each person contribution to total time.',
    }),
    correctPattern: 'Prefix Sum / Cumulative Sum',
    correctExplanation: 'Total time can be summed directly from min(ticket[i], ticket[k]) style contributions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-easy-buddy-strings-additional-8',
    difficulty: 'easy',
    prompt: richPrompt({
      title: 'LeetCode 859 - Buddy Strings',
      scenario: 'Determine if two strings can become equal by swapping exactly one pair of characters in the first string.',
      io: 'Return true if one swap can make strings equal, otherwise false.',
      constraints: 'Need mismatch tracking and duplicate-character checks when strings are already equal.',
      objective: 'Choose compact frequency/mismatch bookkeeping pattern over characters.',
    }),
    correctPattern: 'In-place Array Hashing / Marking',
    correctExplanation: 'Frequency and mismatch bookkeeping via arrays/maps drives the one-swap feasibility test.',
  }),
]

export default data
