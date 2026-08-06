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
    id: 'leetcode-pattern-type-hard-shortest-path-visiting-all-nodes',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 847 - Shortest Path Visiting All Nodes',
      brief: 'Find shortest path length that visits every node in an undirected graph.',
      io: 'Return minimum number of edges in such a walk.',
      constraints: 'State must include current node and visited set.',
      objective: 'Choose compact-state DP/search pattern using bit-level visited encoding.',
    }),
    correctPattern: 'Bitmask DP',
    correctExplanation: 'Node + visited-mask state is the canonical representation for this small-n all-visit problem.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-maximum-xor-two-numbers',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 421 - Maximum XOR of Two Numbers in an Array',
      brief: 'Find maximum XOR value obtainable from any pair in array.',
      io: 'Return maximum XOR scalar.',
      constraints: 'Need better than O(n^2) pair checking.',
      objective: 'Select bit-structured pattern that greedily maximizes XOR per bit.',
    }),
    correctPattern: 'Trie + Bitwise XOR',
    correctExplanation: 'Binary trie supports complementary-bit traversal to maximize XOR.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-range-sum-query-mutable',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 307 - Range Sum Query - Mutable',
      brief: 'Support point updates and range-sum queries on the same array.',
      io: 'Implement update(i,val) and sumRange(l,r).',
      constraints: 'Frequent updates + queries require sublinear per operation.',
      objective: 'Choose data structure for logarithmic updates and range aggregation.',
    }),
    correctPattern: 'Segment Tree',
    correctExplanation: 'Segment tree offers O(log n) point update and O(log n) range query.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-count-smaller-after-self',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 315 - Count of Smaller Numbers After Self',
      brief: 'For each index, count numbers to its right that are smaller.',
      io: 'Return counts array aligned with original indices.',
      constraints: 'Need efficient prefix-frequency updates/queries on value ranks.',
      objective: 'Pick indexed frequency structure for log-time prefix accumulation.',
    }),
    correctPattern: 'Fenwick Tree (Binary Indexed Tree / BIT)',
    correctExplanation: 'BIT supports fast prefix counts with updates after coordinate compression.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lru-cache',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 146 - LRU Cache',
      brief: 'Design cache with O(1) get/put and least-recently-used eviction.',
      io: 'Implement cache API exactly as specified.',
      constraints: 'Must update recency on access and insertion.',
      objective: 'Choose the constant-time eviction/access composite structure pattern.',
    }),
    correctPattern: 'LRU Cache',
    correctExplanation: 'Hash map + doubly linked list yields O(1) operations with recency ordering.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-lfu-cache',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 460 - LFU Cache',
      brief: 'Design cache evicting least-frequently-used keys, breaking ties by recency.',
      io: 'Implement O(1) average get/put API behavior.',
      constraints: 'Need to track frequency buckets and recency inside each frequency level.',
      objective: 'Choose frequency-aware cache design pattern for O(1) operations.',
    }),
    correctPattern: 'LFU Cache',
    correctExplanation: 'LFU requires maps + frequency-linked lists or equivalent bucketed structure.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-single-number-iii',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 260 - Single Number III',
      brief: 'In array where every value appears twice except two values, find those two unique numbers.',
      io: 'Return the two singletons in any order.',
      constraints: 'Linear time and constant extra space expected.',
      objective: 'Select low-level arithmetic/bit-state pattern exploiting XOR properties.',
    }),
    correctPattern: 'Bit Manipulation Tricks',
    correctExplanation: 'XOR cancellation and bit partitioning isolate the two unique values.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-count-primes',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 204 - Count Primes',
      brief: 'Count number of primes strictly less than n.',
      io: 'Return integer prime count.',
      constraints: 'Need significantly better than primality-test-per-number.',
      objective: 'Choose bulk-prime-generation pattern with optimized composite marking.',
    }),
    correctPattern: 'Sieve of Eratosthenes',
    correctExplanation: 'Sieve marks multiples efficiently for all numbers up to n.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-water-jug',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 365 - Water and Jug Problem',
      brief: 'Given jug capacities x and y, determine if exactly target liters can be measured.',
      io: 'Return true/false feasibility.',
      constraints: 'Math characterization via linear combination is central.',
      objective: 'Pick number-theory pattern for gcd-based reachability.',
    }),
    correctPattern: 'Euclidean Algorithm',
    correctExplanation: 'Feasibility depends on target being multiple of gcd(x,y) and within capacity bounds.',
  }),
  buildLeetcodePatternQuestion({
    id: 'leetcode-pattern-type-hard-powxn',
    difficulty: 'hard',
    prompt: richPrompt({
      title: 'LeetCode 50 - Pow(x, n)',
      brief: 'Compute x raised to integer exponent n efficiently.',
      io: 'Return floating-point x^n result.',
      constraints: 'n can be large or negative; linear multiplication is too slow.',
      objective: 'Choose logarithmic exponentiation pattern.',
    }),
    correctPattern: 'Fast Powering / Exponentiation by Squaring',
    correctExplanation: 'Exponentiation by squaring reduces multiplications from O(n) to O(log n).',
  }),
]

export default data
