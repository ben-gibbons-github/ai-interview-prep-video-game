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
    id: 'leetcode-pattern-type-medium-linked-list-cycle-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 142 - Linked List Cycle II',
      brief: 'Detect whether a cycle exists in a linked list and return its entry node if present.',
      io: 'Return the node where cycle begins, or null when there is no cycle.',
      constraints: 'Do not mutate the list; target O(1) extra memory.',
      objective: 'Choose the cycle-detection pattern that also recovers cycle start.',
    }),
    correctPattern: "Fast and Slow Pointers (Floyd's Cycle Detection)",
    correctExplanation: 'Use tortoise and hare to detect cycle, then reset one pointer to locate cycle entry.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-sort-list',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 148 - Sort List',
      brief: 'Sort a singly linked list in ascending order.',
      io: 'Return the head of the sorted linked list.',
      constraints: 'Target O(n log n) time; linked-list structure limits random access.',
      objective: 'Identify the split strategy used to divide linked lists for merge-based sorting.',
    }),
    correctPattern: 'Fast and Slow Pointers (Midpoint)',
    correctExplanation: 'Find list midpoint for merge-sort split using fast/slow pointers.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-reverse-k-group',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 25 - Reverse Nodes in k-Group',
      brief: 'Reverse nodes in contiguous groups of size k in a linked list.',
      io: 'Return the new head after each full k-group is reversed; tail remainder stays in place.',
      constraints: 'Only pointer rewiring is allowed; values cannot be reassigned.',
      objective: 'Pick the core in-place linked-list transformation pattern used for segment reversals.',
    }),
    correctPattern: 'In-place Linked List Reversal',
    correctExplanation: 'Reverse linked-list segments in place per group while reconnecting boundaries.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-remove-nth-from-end',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 19 - Remove Nth Node From End of List',
      brief: 'Remove the nth node counted from the end of the list.',
      io: 'Return the updated head after removal.',
      constraints: 'One-pass approach preferred; be careful with head-removal edge case.',
      objective: 'Select the fixed-gap pointer pattern for end-relative node access.',
    }),
    correctPattern: 'Two Pointers (Kth Node from End)',
    correctExplanation: 'Keep a fixed gap of n between pointers to remove target node in one pass.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-koko-bananas',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 875 - Koko Eating Bananas',
      brief: 'Find minimum integer speed k so all banana piles can be eaten within h hours.',
      io: 'Return smallest feasible k.',
      constraints: 'Feasibility is monotonic with speed; direct linear scan over all speeds is expensive.',
      objective: 'Pick the pattern that searches over a monotonic decision boundary.',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Search the smallest feasible eating speed using monotonic feasibility checks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-rotated-array-search',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 33 - Search in Rotated Sorted Array',
      brief: 'Locate target in a distinct sorted array rotated around unknown pivot.',
      io: 'Return target index or -1 when absent.',
      constraints: 'O(log n) expected; each step has one sorted half and one pivot-crossing half.',
      objective: 'Choose the binary-search variant specialized for rotated order.',
    }),
    correctPattern: 'Rotated Sorted Array Search',
    correctExplanation: 'Exploit sorted half at each step to discard impossible ranges.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-first-last-position',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 34 - Find First and Last Position of Element in Sorted Array',
      brief: 'Find full boundary range for target occurrences in a sorted array.',
      io: 'Return [leftmostIndex, rightmostIndex] or [-1, -1] if target does not exist.',
      constraints: 'O(log n) required; duplicates may span a range.',
      objective: 'Pick the boundary-focused binary-search pattern for first/last occurrence.',
    }),
    correctPattern: 'Binary Search for Boundary / First-Last Occurrence',
    correctExplanation: 'Run boundary-focused binary searches to find leftmost and rightmost matches.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-search-2d-matrix-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 240 - Search a 2D Matrix II',
      brief: 'Check whether target exists in matrix with row- and column-wise sorted ordering.',
      io: 'Return true/false for target existence.',
      constraints: 'Matrix can be large; avoid full O(m*n) scan.',
      objective: 'Choose the matrix-search pattern that prunes regions using sorted structure.',
    }),
    correctPattern: 'Matrix Binary Search',
    correctExplanation: 'Use ordered rows/columns to eliminate regions quickly with binary-search-style moves.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-kth-smallest-bst',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 230 - Kth Smallest Element in a BST',
      brief: 'Given BST root and k, retrieve the kth smallest key.',
      io: 'Return one integer value corresponding to sorted-order rank k.',
      constraints: 'Must leverage BST ordering property; avoid materializing all nodes when possible.',
      objective: 'Select traversal pattern that visits BST keys in sorted order naturally.',
    }),
    correctPattern: 'Tree DFS (In-order)',
    correctExplanation: 'In-order traversal of BST visits values in sorted order, enabling kth extraction.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-binary-tree-level-order',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 102 - Binary Tree Level Order Traversal',
      brief: 'Traverse binary tree by levels from root depth outward.',
      io: 'Return nested list where each inner list contains one depth level.',
      constraints: 'Maintain depth grouping order; left-to-right within each level.',
      objective: 'Choose the queue-based traversal pattern designed for level-grouped output.',
    }),
    correctPattern: 'Tree BFS / Level Order',
    correctExplanation: 'Queue-based breadth-first traversal naturally groups nodes by depth.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-number-of-islands',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 200 - Number of Islands',
      brief: 'Count connected components of land cells in a grid.',
      io: 'Return total island count using 4-direction adjacency.',
      constraints: 'Need linear-ish pass over cells; revisits must be controlled via visited marking.',
      objective: 'Select the graph traversal pattern for component discovery on implicit grids.',
    }),
    correctPattern: 'Graph DFS (Connected Components / Path Finding)',
    correctExplanation: 'Flood-fill each unvisited land cell to count connected components.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-medium-course-schedule-ii',
    difficulty: 'medium',
    prompt: richPrompt({
      title: 'LeetCode 210 - Course Schedule II',
      brief: 'Produce a valid ordering of courses given prerequisite dependencies.',
      io: 'Return an ordering list, or empty list when dependency cycle blocks completion.',
      constraints: 'Directed graph may include cycles; dependency-safe order is required.',
      objective: 'Choose the canonical DAG dependency-ordering pattern.',
    }),
    correctPattern: "Topological Sort (Kahn's Algorithm - Indegree BFS)",
    correctExplanation: 'Indegree tracking with queue yields valid DAG ordering or detects impossibility.',
  }),
]

export default data
