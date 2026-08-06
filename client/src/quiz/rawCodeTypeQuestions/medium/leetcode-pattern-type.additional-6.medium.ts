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
    id: 'leetcode-pattern-type-medium-search-in-rotated-sorted-array-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 33 - Search in Rotated Sorted Array',
      scenario: 'Find target index in rotated sorted array with distinct values.',
      io: 'Return index if found, else -1.',
      constraints: 'Need O(log n) complexity despite rotation pivot.',
      objective: 'Identify modified binary search logic that detects sorted half each step.',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Binary search determines which side is sorted, then narrows to plausible half.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-koko-eating-bananas-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 875 - Koko Eating Bananas',
      scenario: 'Find minimum integer eating speed to finish all piles within h hours.',
      io: 'Return smallest feasible speed.',
      constraints: 'Feasibility is monotonic in speed.',
      objective: 'Select answer-space binary search over speed domain with feasibility predicate.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Check candidate speed and binary-search smallest speed that satisfies time limit.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-reveal-cards-increasing-order-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 950 - Reveal Cards In Increasing Order',
      scenario: 'Arrange deck so reveal process outputs cards in increasing order.',
      io: 'Return initial deck ordering that produces sorted reveal.',
      constraints: 'Need simulation of queue-like index progression.',
      objective: 'Pick monotonic queue/deque style simulation for position scheduling.',
    }),
    correctPattern: 'Monotonic Queue',
    correctExplanation: 'Deque simulation of indices models reveal-then-rotate process cleanly.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-construct-bst-preorder-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 1008 - Construct Binary Search Tree from Preorder Traversal',
      scenario: 'Reconstruct BST from preorder sequence.',
      io: 'Return root of reconstructed BST.',
      constraints: 'Need to preserve preorder consumption and BST bounds correctness.',
      objective: 'Recognize root-left-right recursive tree construction traversal pattern.',
    }),
    correctPattern: 'Tree DFS (Pre-order)',
    correctExplanation: 'Preorder naturally defines root-first recursive subtree building with bounds.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-kth-smallest-bst-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 230 - Kth Smallest Element in a BST',
      scenario: 'Return k-th smallest value from binary search tree.',
      io: 'Return integer value at sorted rank k.',
      constraints: 'Need traversal yielding values in sorted order.',
      objective: 'Identify BST traversal pattern that enumerates nodes in ascending order.',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal of BST visits nodes in increasing value order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-delete-node-bst-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 450 - Delete Node in a BST',
      scenario: 'Delete key from BST while maintaining BST property.',
      io: 'Return root after deletion operation.',
      constraints: 'Must correctly handle leaf, one-child, and two-child cases.',
      objective: 'Choose canonical BST mutation pattern for insertion/deletion balancing rules.',
    }),
    correctPattern: 'BST Insertion, Deletion, and Balancing',
    correctExplanation: 'Deletion uses successor/predecessor replacement and subtree rewiring while preserving order.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-cheapest-flights-within-k-stops-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 787 - Cheapest Flights Within K Stops',
      scenario: 'Find cheapest flight path from src to dst with at most k stops.',
      io: 'Return minimal price or -1 if no valid route.',
      constraints: 'Edge weights positive, but stop constraint complicates pure Dijkstra state.',
      objective: 'Select edge-relaxation strategy with bounded iteration over path lengths.',
    }),
    correctPattern: 'Bellman-Ford Algorithm / SPFA',
    correctExplanation: 'Bounded Bellman-Ford relaxations over k+1 edges fit stop-limited shortest path.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-kth-largest-array-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 215 - Kth Largest Element in an Array',
      scenario: 'Find k-th largest value without fully sorting array when possible.',
      io: 'Return integer at k-th largest rank.',
      constraints: 'Need efficient top-k selection behavior.',
      objective: 'Choose top-k maintenance pattern using bounded heap or partition ideas.',
    }),
    correctPattern: 'Top K Elements',
    correctExplanation: 'Maintain size-k min-heap of best values while scanning array.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-minimum-height-trees-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 310 - Minimum Height Trees',
      scenario: 'Given tree graph, find all roots producing minimum possible tree height.',
      io: 'Return list of centroids.',
      constraints: 'Need layer-by-layer leaf trimming until 1-2 nodes remain.',
      objective: 'Identify indegree-based topological peeling process on undirected tree leaves.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Repeatedly remove current leaves like BFS layers to reach tree centroids.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-subarray-product-less-than-k-conceptual',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 713 - Subarray Product Less Than K',
      scenario: 'Count contiguous subarrays with product strictly less than k.',
      io: 'Return total count.',
      constraints: 'All numbers positive; exploit monotonic product behavior when window expands.',
      objective: 'Choose variable-size sliding window that grows and shrinks while preserving condition.',
    }),
    correctPattern: 'Sliding Window (Dynamic/Variable Size)',
    correctExplanation: 'Maintain product within limit by advancing left pointer when constraint breaks.',
  }),
]

export default data
