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
    id: 'leetcode-pattern-type-hard-lc1579-remove-max-number-of-edges-to-keep-graph-fully-traversable-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1579 - Remove Max Number of Edges to Keep Graph Fully Traversable',
      fullProblem: 'Graph has type-1 edges for Alice, type-2 for Bob, and type-3 shared edges. Remove maximum edges while keeping both Alice and Bob graphs fully traversable.',
      io: 'Input: n and typed edges. Output: maximum removable edge count or -1.',
      constraints: 'Need process shared edges first while maintaining two connectivity structures.',
      objective: 'Which connectivity pattern supports union operations and component checks for two users?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Use separate DSUs for Alice/Bob, greedily consume shared edges, then private edges, counting redundant ones.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1691-maximum-height-by-stacking-cuboids-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1691 - Maximum Height by Stacking Cuboids',
      fullProblem: 'Rotate cuboids and stack them so each upper cuboid dimensions are <= lower cuboid dimensions. Maximize total height.',
      io: 'Input: cuboids dimensions list. Output: maximum stack height.',
      constraints: 'Need sort dimensions and then compute best non-decreasing stack sequence.',
      objective: 'Which subsequence optimization pattern over sorted states applies?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'After normalizing/sorting dimensions, DP akin weighted LIS finds best compatible predecessor chain.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1713-minimum-operations-to-make-a-subsequence-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1713 - Minimum Operations to Make a Subsequence',
      fullProblem: 'Given target and arr, return minimum insert operations needed so target becomes a subsequence of arr.',
      io: 'Input: target array and arr array. Output: minimum insertions.',
      constraints: 'Map arr values to target indices and compute longest index-increasing subsequence.',
      objective: 'Which pattern turns this into LIS over index stream?',
    }),
    correctPattern: 'Longest Increasing Subsequence (LIS) Pattern',
    correctExplanation: 'Transform arr into target-index sequence then compute LIS length; answer is target.length - LIS.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1938-maximum-genetic-difference-query-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1938 - Maximum Genetic Difference Query',
      fullProblem: 'Given rooted tree and queries(node, val), return max XOR between val and any ancestor value on node path (including node).',
      io: 'Input: parent array and queries. Output: XOR maximum per query.',
      constraints: 'Need online ancestor set insert/remove while DFS over tree.',
      objective: 'Which advanced data-structure pattern is designed for max XOR queries on dynamic integer set?',
    }),
    correctPattern: 'Trie + Bitwise XOR',
    correctExplanation: 'Maintain binary trie of current root-to-node path values during DFS; answer each query via opposite-bit greedy walk.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc1998-gcd-sort-of-an-array-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 1998 - GCD Sort of an Array',
      fullProblem: 'You may swap nums[i], nums[j] if gcd(nums[i], nums[j]) > 1. Determine if array can be sorted non-decreasingly.',
      io: 'Input: nums array. Output: true if sortable under allowed swaps.',
      constraints: 'Need connectivity by shared prime factors, not direct all-pairs swapping.',
      objective: 'Which pattern captures transitive swap reachability through factor-linked components?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Union numbers through prime factors; each value must be movable within its component to target sorted position.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2071-maximum-number-of-tasks-you-can-assign-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2071 - Maximum Number of Tasks You Can Assign',
      fullProblem: 'Assign tasks to workers with optional strength pills. Each pill boosts one worker by fixed strength once. Maximize number of assigned tasks.',
      io: 'Input: tasks, workers, pills, strength. Output: maximum assignable task count.',
      constraints: 'Feasibility for assigning x tasks is monotonic.',
      objective: 'Which pattern searches monotonic answer count with greedy feasibility verification?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Binary search task count x and greedily test if strongest eligible workers/pills can satisfy x hardest tasks.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2141-maximum-running-time-of-n-computers-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2141 - Maximum Running Time of N Computers',
      fullProblem: 'Given n computers and batteries, batteries can be swapped anytime. Find maximum minutes all n computers run simultaneously.',
      io: 'Input: n and batteries array. Output: maximum feasible runtime.',
      constraints: 'Runtime feasibility is monotonic in candidate time T.',
      objective: 'Which pattern binary-searches runtime and checks total usable energy against n*T?',
    }),
    correctPattern: 'Binary Search on Answer Space',
    correctExplanation: 'Check if sum(min(battery, T)) across batteries is at least n*T, then binary search largest feasible T.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2157-groups-of-strings-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2157 - Groups of Strings',
      fullProblem: 'Words are connected if one can become another by adding, removing, or replacing one letter (set-of-letters view). Return number of groups and largest group size.',
      io: 'Input: words array. Output: [groupCount, largestSize].',
      constraints: 'Need connect masks that differ by one bit operation efficiently.',
      objective: 'Which pattern unions related word masks into connected components?',
    }),
    correctPattern: 'Disjoint Set Union (DSU / Union-Find)',
    correctExplanation: 'Represent each word as bitmask and union indices whose masks are one edit apart in mask space.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2172-maximum-and-sum-of-array-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2172 - Maximum AND Sum of Array',
      fullProblem: 'Place numbers into slots (each slot capacity 2) to maximize sum of (num AND slotIndex).',
      io: 'Input: nums and numSlots. Output: maximum possible AND-sum.',
      constraints: 'Small numSlots allows compressed slot-occupancy state exploration.',
      objective: 'Which DP pattern uses bitmask/ternary-like compressed states to optimize assignment?',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'DP over occupancy state stores best score, transitioning by placing next number into available slot positions.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2281-sum-of-total-strength-of-wizards-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2281 - Sum of Total Strength of Wizards',
      fullProblem: 'For every subarray, total strength is min(subarray) * sum(subarray). Return total over all subarrays modulo mod.',
      io: 'Input: strength array. Output: total strength modulo mod.',
      constraints: 'Need contribution counting by treating each element as subarray minimum with weighted range sums.',
      objective: 'Which pattern finds previous/next smaller boundaries for each element efficiently?',
    }),
    correctPattern: 'Monotonic Stack',
    correctExplanation: 'Monotonic stack determines influence interval where each element is minimum; prefix sums handle range-sum weighting.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2463-minimum-total-distance-traveled-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2463 - Minimum Total Distance Traveled',
      fullProblem: 'Robots on line must be assigned to factories with capacities, minimizing total travel distance.',
      io: 'Input: robot positions and [factoryPosition, capacity] list. Output: minimum total distance.',
      constraints: 'Sorted ordering and capacity-constrained assignment imply dynamic transitions over prefix states.',
      objective: 'Which DP pattern over ordered lists and capacities is most suitable?',
    }),
    correctPattern: '1D DP (Fibonacci / Climbing Stairs Pattern)',
    correctExplanation: 'After sorting, DP over prefixes with factory capacities computes minimal cost assignments incrementally.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lc2589-minimum-time-to-complete-all-tasks-additional-17',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 2589 - Minimum Time to Complete All Tasks',
      fullProblem: 'Each task has [start,end,duration]. Turn on computer at integer times; while on, it can satisfy any active task. Minimize total on-time to satisfy all durations.',
      io: 'Input: tasks list. Output: minimum number of on-time seconds.',
      constraints: 'Need timeline interval accounting and greedy placement near deadlines.',
      objective: 'Which interval boundary-event style pattern best fits this timeline scheduling problem?',
    }),
    correctPattern: 'Sweep Line Algorithm / Interval Boundary Events',
    correctExplanation: 'Sort by end time, count already-on slots in interval, then greedily activate latest free times to meet remaining duration.',
  }),
]

export default data
