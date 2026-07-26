import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-insanely-hard-kth-largest-0001',
    difficulty: 'insanelyHard',
    prompt: `Kth Largest Element In Array (Heap Pattern)

**Problem:** Find the kth largest value in an unsorted array.

**Example:** [3,2,1,5,6,4] with k=2. Sorted descending is [6,5,4,3,2,1], so the 2nd largest is 5.

**Key Insight:** You don't need the entire sorted array—just maintain the k largest values seen so far. A min-heap of size k keeps the smallest among the k largest as its root, making it easy to compare new values and replace.

**Algorithm:**
1. Create a min-heap
2. For each number in the array:
   - If heap size < k, add the number
   - Else if the number > heap root, pop the root and add the number
3. Return the heap root (the kth largest)

**Why It Works:** The min-heap's root is always the boundary between "in top-k" and "out of top-k". Any number smaller than the root cannot make it into the top-k, so we skip it. Any larger number evicts the current minimum from the top-k group.

**Time Complexity:** O(n log k). Each insertion is log k, and we do this n times.

**Implement \`solve(input)\` where \`input = { nums: number[], k: number }\`. Return the kth largest value.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the heap root (the kth largest).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use a min-heap of size k. Step through each number: if the heap has fewer than k items, push it; otherwise, compare it to the heap root—if larger, pop the root and push the new number. The heap root is always the k-th largest. Walkthrough [3,2,1,5,6,4] with k=2: heap starts empty, add 3 and 2 → [2,3] (min-heap property), min=2. Next 1 is smaller than min-2, skip. Next 5 > 2, pop 2 and add 5 → [3,5]. Next 6 > 3, pop 3 and add 6 → [5,6], min=5. Next 4 is not > 5, skip. Final answer is 5.`,
    correctExplanation: `Use a min-heap of size k. Step through each number: if the heap has fewer than k items, push it; otherwise, compare it to the heap root—if larger, pop the root and push the new number. The heap root is always the k-th largest. Walkthrough [3,2,1,5,6,4] with k=2: heap starts empty, add 3 and 2 → [2,3] (min-heap property), min=2. Next 1 is smaller than min-2, skip. Next 5 > 2, pop 2 and add 5 → [3,5]. Next 6 > 3, pop 3 and add 6 → [5,6], min=5. Next 4 is not > 5, skip. Final answer is 5.`,
    tests: [
      { input: [{ nums: [3, 2, 1, 5, 6, 4], k: 2 }], expected: 5 },
      { input: [{ nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-product-except-self-0002',
    difficulty: 'insanelyHard',
    prompt: `Product Of Array Except Self (Prefix/Suffix Pattern)

**Problem:** For each position i, compute the product of all array values except the one at position i. Do NOT use division. Handle zeros correctly.

**Example:** [1,2,3,4] → [24,12,8,6] (position 0 sees 2×3×4=24, position 1 sees 1×3×4=12, etc.)

**Challenge:** You cannot divide because (a) it's forbidden in the rules, and (b) if there's a zero, you'd divide by zero.

**Key Insight:** Decompose the product into two parts:
- **Prefix**: all values to the LEFT of position i
- **Suffix**: all values to the RIGHT of position i
- Answer[i] = Prefix[i] × Suffix[i]

**Algorithm:**
1. Build prefix array: prefix[i] = product of all values left of i
2. Build suffix array: suffix[i] = product of all values right of i
3. For each i, compute result[i] = prefix[i] × suffix[i]

**Example Walkthrough:** [1,2,3,4]
- prefix = [1, 1, 1×2=2, 1×2×3=6]
- suffix = [2×3×4=24, 3×4=12, 4, 1]
- result[0] = 1 × 24 = 24 ✓
- result[1] = 1 × 12 = 12 ✓

**Space Optimization:** You can compute left-to-right in the result array for prefixes, then right-to-left for suffixes, avoiding the separate prefix array.

**Implement \`solve(input)\` where \`input = number[]\`. Return array of products excluding each position.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return array of products excluding each position.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Compute a prefix product array where prefix[i] holds the product of everything before index i, and a suffix array where suffix[i] holds the product of everything after index i. Multiply them: result[i] = prefix[i] × suffix[i]. This naturally handles zeros: any zero only affects the ranges that include it, leaving other positions with correct products. Example: [-1,1,0,-3,3]. Position 2 (the zero) gets prefix[2]×suffix[2]=(−1)×(−3)=3 multiplied by 0? No—we need both sides of the zero. The zero makes result[0]=0, result[1]=0, result[2]=(−1)×1×(−3)×3=9, result[3]=0, result[4]=0.`,
    correctExplanation: `Compute a prefix product array where prefix[i] holds the product of everything before index i, and a suffix array where suffix[i] holds the product of everything after index i. Multiply them: result[i] = prefix[i] × suffix[i]. This naturally handles zeros: any zero only affects the ranges that include it, leaving other positions with correct products. Example: [-1,1,0,-3,3]. Position 2 (the zero) gets prefix[2]×suffix[2]=(−1)×(−3)=3 multiplied by 0? No—we need both sides of the zero. The zero makes result[0]=0, result[1]=0, result[2]=(−1)×1×(−3)×3=9, result[3]=0, result[4]=0.`,
    tests: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-trapping-rain-water-0003',
    difficulty: 'insanelyHard',
    prompt: `Trapping Rain Water (Two-Pointer + Greedy)

**Problem:** Given elevation heights, compute how much water is trapped after rain (vertical bars only).

**Example:** [0,1,0,2,1,0,1,3,2,1,2,1]. Visualization:
\`\`\`
        |
      | | |
    | | | | |
  | | | | | | | |
  0 1 0 2 1 0 1 3 2 1 2 1
    ^ ^ ^ ^ ^ ^
\`\`\`
Water fills the valleys between peaks, totaling 6 units.

**Key Insight:** Water at position i is bounded by min(maxLeft, maxRight), which is the shorter of the tallest walls to its left and right. That's the "ceiling" height at position i.

**Algorithm (Two-Pointer):**
1. Use left and right pointers at both ends
2. Track maxLeft (highest seen from left) and maxRight (highest seen from right)
3. Move whichever pointer has the smaller maximum:
   - If maxLeft < maxRight, the limiting height at left is maxLeft regardless of what's on the right
   - Water at left = max(0, maxLeft - height[left])
4. Continue until pointers meet

**Why This Works:** At any position, water is limited by the shorter bounding wall. By always processing the shorter side, we know that side's answer definitively without waiting to process the other side.

**Example Step:** [0,1,0,2,1,0,1,3,2,1,2,1]
- left=0 (height 0), right=11 (height 1), maxLeft=0, maxRight=1
- maxLeft < maxRight, so process left: water[0] = 0 (height is 0, max is 0)
- left=1 (height 1), maxLeft=1, water[1]=0 (height matches max)
- left=2 (height 0), maxLeft=1, water[2]=1−0=1 ✓

**Time Complexity:** O(n) single pass. Space: O(1).

**Implement \`solve(input)\` where \`input = number[]\` elevations. Return total trapped water.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return total trapped water.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use two pointers and track the maximum height seen so far from each side. Water at each position is determined by the minimum of those two maxima minus the current height. Move the pointer on the shorter side inward, because that side's constraint is definitive—the other side has a taller wall, so the water level is set by the shorter one. Continue until pointers meet.`,
    correctExplanation: `Use two pointers and track the maximum height seen so far from each side. Water at each position is determined by the minimum of those two maxima minus the current height. Move the pointer on the shorter side inward, because that side's constraint is definitive—the other side has a taller wall, so the water level is set by the shorter one. Continue until pointers meet.`,
    tests: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { input: [[1, 2, 3]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-median-two-sorted-0004',
    difficulty: 'insanelyHard',
    prompt: `Median Of Two Sorted Arrays (Binary Search)

**Problem:** Find the median of two sorted arrays efficiently (O(log(min(m,n)))).

**Example:** [1,3] and [2] combined are [1,2,3] → median = 2.

**Example 2:** [1,2] and [3,4] combined are [1,2,3,4] → median = (2+3)/2 = 2.5.

**Key Challenge:** You cannot simply merge (that's O(m+n)). You need binary search.

**Key Insight:** Instead of merging, find a "partition" of both arrays such that:
- All values on the left of the partition ≤ all values on the right
- Total left side has the same count as total right side (or differs by 1)

Once the partition is correct, the median is either:
- The max of the left side (if total length is odd), or
- Average of max-left and min-right (if total length is even)

**Algorithm:**
1. Binary search on the smaller array's partition point
2. For each partition point in nums1, calculate the corresponding partition point in nums2 such that total-left ≈ total-right
3. Check if the partition is valid: all left values ≤ all right values
4. If valid, calculate median; if left-max > right-min, search left; otherwise search right

**Example Walkthrough:** [1,3] and [2], total length = 3 (odd, so median is the middle element)
- Partition after 1 element on each side: left = [1,2], right = [3]
- Left max = 2, right min = 3. Valid! Median = 2.

**Time Complexity:** O(log(min(m,n))).

**Implement \`solve(input)\` where \`input = { nums1: number[], nums2: number[] }\`. Return the median as a number.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the median as a number.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Binary search the partition point in the smaller array. For each candidate partition, compute the matching partition in the larger array such that the total left and right sides balance. Check if the partition is valid by verifying all left values ≤ all right values. The median emerges from the boundary values of this partition.`,
    correctExplanation: `Binary search the partition point in the smaller array. For each candidate partition, compute the matching partition in the larger array such that the total left and right sides balance. Check if the partition is valid by verifying all left values ≤ all right values. The median emerges from the boundary values of this partition.`,
    tests: [
      { input: [{ nums1: [1, 3], nums2: [2] }], expected: 2 },
      { input: [{ nums1: [1, 2], nums2: [3, 4] }], expected: 2.5 },
      { input: [{ nums1: [0, 0], nums2: [0, 0] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-permutation-in-string-0005',
    difficulty: 'insanelyHard',
    prompt: `Permutation In String (Sliding Window + Character Count)

**Problem:** Determine if any permutation of s1 appears as a substring in s2.

**Example:** s1 = "ab", s2 = "eidbaooo". The substring "ba" (in s2) is a permutation of "ab", so return true.

**Key Insight:** A permutation has the same character frequencies as the original. You don't need the exact order, just the right count of each character.

**Algorithm (Sliding Window):**
1. Count the frequency of each character in s1
2. Use a sliding window of length len(s1) on s2
3. For each window:
   - Count the characters in the window
   - If counts match s1's counts, return true immediately
   - Otherwise, slide the window by removing the leftmost char and adding the next char
4. If no match found, return false

**Optimization:** Instead of recomputing counts from scratch, maintain a running count:
- When moving the window right: increment the new character
- When moving the window left: decrement the old character
- Compare counts in O(1) by tracking mismatches

**Example Walkthrough:** s1 = "ab" (target: {a:1, b:1}), s2 = "eidbaooo"
- Window [e,i]: {e:1,i:1} ✗
- Window [i,d]: {i:1,d:1} ✗
- Window [d,b]: {d:1,b:1} ✗
- Window [b,a]: {b:1,a:1} ✓ Match!

**Time Complexity:** O(n) where n = len(s2).

**Implement \`solve(input)\` where \`input = { s1: string, s2: string }\`. Return \`true\` if any permutation of s1 is a substring of s2.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Count the character frequencies in s1. Then slide a window of that length across s2, maintaining character counts inside the window. When the window's counts match s1's counts exactly, a permutation exists. Use an optimized sliding window that incrementally updates counts as the window moves.`,
    correctExplanation: `Count the character frequencies in s1. Then slide a window of that length across s2, maintaining character counts inside the window. When the window's counts match s1's counts exactly, a permutation exists. Use an optimized sliding window that incrementally updates counts as the window moves.`,
    tests: [
      { input: [{ s1: 'ab', s2: 'eidbaooo' }], expected: true },
      { input: [{ s1: 'ab', s2: 'eidboaoo' }], expected: false },
      { input: [{ s1: 'adc', s2: 'dcda' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-maximal-rectangle-0006',
    difficulty: 'insanelyHard',
    prompt: `Maximal Rectangle (Histogram + Dynamic Programming)

**Problem:** Given a matrix of 0s and 1s, find the largest rectangular area containing only 1s.

**Example:**
\`\`\`
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
\`\`\`
Largest rectangle is 6 (3 rows × 2 cols in columns 2-3, rows 1-2).

**Key Insight:** Convert each row into a histogram where the height represents consecutive 1s above (including current). Then solve "largest rectangle in histogram" for each row.

**Algorithm:**
1. For each row, compute heights: height[col] = 0 if matrix[row][col]='0', else height[col]++
2. For each row's histogram, find the largest rectangle (use monotonic stack)
3. Return the maximum area found

**Largest Rectangle In Histogram (Monotonic Stack):**
- Use a stack to track bar indices in increasing height order
- For each new bar:
  - If taller than stack top, push it
  - If shorter, pop bars and compute area for each popped bar
  - Area = height[popped] × (currentIndex − leftBoundary)

**Example Walkthrough:**
\`\`\`
Row 0: heights = [1,0,1,0,0] → max area = 1
Row 1: heights = [2,0,2,1,1] → max area = 2
Row 2: heights = [3,1,3,2,2] → max area = 6 (height=3, width=2 at cols 2-3)
Row 3: heights = [4,0,0,3,0] → max area = 4
Final answer: 6
\`\`\`

**Time Complexity:** O(rows × cols) for height computation + O(cols) per row for histogram = O(rows × cols).

**Implement \`solve(input)\` where \`input = string[][]\` matrix of "0"/"1". Return the area of the largest rectangle.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the maximum area found.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Treat each row as the base of a histogram where height is the number of consecutive 1s above. For each histogram, solve the largest-rectangle-in-histogram problem using a monotonic stack. Push bar indices while the stack is increasing; when you encounter a shorter bar, pop and compute rectangles, then push the current bar. The area of a popped bar extends from the element now at the stack top (or the left boundary) to the current index.`,
    correctExplanation: `Treat each row as the base of a histogram where height is the number of consecutive 1s above. For each histogram, solve the largest-rectangle-in-histogram problem using a monotonic stack. Push bar indices while the stack is increasing; when you encounter a shorter bar, pop and compute rectangles, then push the current bar. The area of a popped bar extends from the element now at the stack top (or the left boundary) to the current index.`,
    tests: [
      {
        input: [[['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]],
        expected: 6,
      },
      { input: [[['0']]], expected: 0 },
      { input: [[['1']]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-merge-k-sorted-arrays-0007',
    difficulty: 'insanelyHard',
    prompt: `Merge K Sorted Arrays (Heap Pattern)

**Problem:** Merge k sorted arrays into one sorted array efficiently.

**Example:** [[1,4,5],[1,3,4],[2,6]] → [1,1,2,3,4,4,5,6].

**Naive Approach:** Concatenate and sort—O(nk log(nk)). Too slow.

**Better Approach:** Use a min-heap to always extract the globally smallest element next.

**Algorithm:**
1. Create a min-heap and populate it with the first element from each array (also track which array and next index)
2. While the heap is non-empty:
   - Pop the minimum element and append to result
   - If that array has more elements, push the next element from that array
3. The result is built in order

**Why Efficient:** At any moment, the heap contains only k elements (one per array), not all nk elements. Each pop-push is O(log k), done nk times, giving O(nk log k) total.

**Example Walkthrough:** [[1,4,5],[1,3,4],[2,6]]
- Heap: [(1, arr0, idx0), (1, arr1, idx0), (2, arr2, idx0)]
- Pop (1, arr0, idx0), push (4, arr0, idx1) → result=[1]
- Pop (1, arr1, idx0), push (3, arr1, idx1) → result=[1,1]
- Pop (2, arr2, idx0), push (6, arr2, idx1) → result=[1,1,2]
- Continue...

**Edge Cases:** Empty arrays in the list are handled naturally (never added to heap).

**Implement \`solve(input)\` where \`input = number[][]\` k sorted arrays. Return merged sorted array.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return merged sorted array.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use a min-heap storing one element from each array along with its source array and next index. Repeatedly pop the smallest, append it to the result, and push the next element from that array (if it exists). This keeps only k elements in the heap at a time, making each operation O(log k).`,
    correctExplanation: `Use a min-heap storing one element from each array along with its source array and next index. Repeatedly pop the smallest, append it to the result, and push the next element from that array (if it exists). This keeps only k elements in the heap at a time, making each operation O(log k).`,
    tests: [
      { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { input: [[[], [2], []]], expected: [2] },
      { input: [[[]]], expected: [] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-remove-k-digits-0008',
    difficulty: 'insanelyHard',
    prompt: `Remove K Digits (Greedy + Monotonic Stack)

**Problem:** Remove exactly k digits to produce the smallest possible non-negative number (as a string).

**Example:** num = "1432219", k = 3 → answer = "1219".
- Remove 4 (larger than 3), 3 (larger than 2), 2 (larger than 1), leaving "1219"

**Key Insight:** A number is smaller when its leftmost digits are smaller. Use a greedy approach:
- Keep digits left-to-right only if they don't exceed the next digit
- If current digit > next digit, drop the current digit and try the one before it
- Use a monotonic increasing stack to efficiently manage this

**Algorithm:**
1. Use a stack to build digits in increasing order
2. For each digit in the input:
   - While k > 0 and stack is not empty and top > current digit, pop (and decrement k)
   - Push current digit
3. If k > 0 remaining, remove k digits from the end (largest digits)
4. Strip leading zeros
5. Return "0" if the result is empty

**Example Walkthrough:** "1432219" with k=3
- Digit 1: stack=[1], k=3
- Digit 4: 4>1, so stack=[1,4], k=3
- Digit 3: 3<4, pop 4 (k=2), 3>1, stack=[1,3]
- Digit 2: 2<3, pop 3 (k=1), 2>1, stack=[1,2]
- Digit 2: 2≤2, stack=[1,2,2]
- Digit 1: 1<2, pop 2 (k=0), stack=[1,2,1]
- Digit 9: k=0, stack=[1,2,1,9]
- Final: "1219" ✓

**Edge Case:** "10200" with k=1
- Stack builds to [1,0,2,0,0], then we never pop because k is already 0
- Strip leading zeros (none), result = "10200"? No! We remove k=1 from the right: "10200"[:-1]="1020". Actually, we remove the FIRST digit > next, so at digit 1: 1>0, pop 1 (k=0), stack=[0,2,0,0]. Result "0200" → strip leading zeros → "200" ✓

**Implement \`solve(input)\` where \`input = { num: string, k: number }\`. Return the smallest number string after removing k digits.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return "0" if the result is empty.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use a monotonic increasing stack. For each digit, pop larger digits from the stack while k > 0, because removing a larger earlier digit makes the final number smaller. After processing all digits, if k > 0, remove k digits from the end. Strip leading zeros to handle cases like "0123" → "123". If the result is empty, return "0".`,
    correctExplanation: `Use a monotonic increasing stack. For each digit, pop larger digits from the stack while k > 0, because removing a larger earlier digit makes the final number smaller. After processing all digits, if k > 0, remove k digits from the end. Strip leading zeros to handle cases like "0123" → "123". If the result is empty, return "0".`,
    tests: [
      { input: [{ num: '1432219', k: 3 }], expected: '1219' },
      { input: [{ num: '10200', k: 1 }], expected: '200' },
      { input: [{ num: '10', k: 2 }], expected: '0' },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-sliding-window-maximum-0009',
    difficulty: 'insanelyHard',
    prompt: `Sliding Window Maximum (Deque Pattern)

**Problem:** For each window of size k in an array, return the maximum value in that window.

**Example:** nums = [1,3,-1,-3,5,3,6,7], k = 3
- Windows: [1,3,-1] → max=3, [3,-1,-3] → max=3, [-1,-3,5] → max=5, etc.
- Answer: [3,3,5,5,6,7]

**Naive Approach:** For each window, scan k elements—O(nk). Too slow.

**Efficient Approach:** Use a deque to track potentially useful indices in decreasing order of their values.

**Algorithm:**
1. Maintain a deque of indices (not values directly)
2. For each new index:
   - Remove indices from the back of the deque if their values ≤ current value (they can never be max while current is in range)
   - Remove indices from the front if they've slid out of the window
   - Append the current index
   - If we've processed at least k elements, the deque front is the max index for this window
3. Return the maximum values

**Why Efficient:** Each index is added once and removed at most once, so O(n) total.

**Example Walkthrough:** [1,3,-1,-3,5,3,6,7], k=3
- i=0: deque=[0], not yet k elements
- i=1: 3>1, so remove 0, deque=[1]
- i=2: -1<3, so add 2, deque=[1,2]. Now k=3 elements, max=nums[1]=3 ✓
- i=3: -3<-1, so add 3, deque=[1,2,3]. Window [3,-1,-3], max=nums[1]=3 ✓
- i=4: 5>-3, remove 3, 5>-1, remove 2, 5>3, remove 1, deque=[4]. Window [-1,-3,5], max=nums[4]=5 ✓

**Implement \`solve(input)\` where \`input = { nums: number[], k: number }\`. Return array of maximum values for each window.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the maximum value in that window.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use a deque storing indices in decreasing order of their values. Before adding a new index, remove indices from the back whose values are ≤ the new value (they're dominated). Remove indices from the front that have slid past the window. The front index is always the maximum in the current window. This maintains the invariant that the deque represents potential maxima in a useful order.`,
    correctExplanation: `Use a deque storing indices in decreasing order of their values. Before adding a new index, remove indices from the back whose values are ≤ the new value (they're dominated). Remove indices from the front that have slid past the window. The front index is always the maximum in the current window. This maintains the invariant that the deque represents potential maxima in a useful order.`,
    tests: [
      { input: [{ nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 }], expected: [3, 3, 5, 5, 6, 7] },
      { input: [{ nums: [1], k: 1 }], expected: [1] },
      { input: [{ nums: [9, 8, 7, 6], k: 2 }], expected: [9, 8, 7] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-find-duplicate-number-0010',
    difficulty: 'insanelyHard',
    prompt: `Find The Duplicate Number (Floyd Cycle Detection)

**Problem:** An array of length n+1 contains values in [1,n] with exactly one value repeated at least once. Find the duplicate (no sorting, O(1) space, O(n) time).

**Example:** [1,3,4,2,2]. The value 2 appears twice.

**Brilliant Insight:** Treat the array as an implicit linked list:
- Index i has a "next pointer" to index array[i]
- Since values are in [1,n] and the array has n+1 elements, a cycle must exist
- The duplicate value is where the cycle begins

**Floyd's Cycle Detection (Two Phases):**
1. **Phase 1:** Move slow pointer by 1 and fast pointer by 2 until they meet (they will, inside the cycle)
2. **Phase 2:** Reset one pointer to start, move both by 1 step until they meet again. This meeting point is the cycle entrance (the duplicate).

**Why Phase 2 Works:** When slow and fast meet in a cycle, slow has traveled d + c steps (where d = distance to cycle, c = steps inside cycle), and fast has traveled 2d + c steps. They meet when d + c ≡ 2(d) + c (mod cycle length), which simplifies to d ≡ (cycle length − c). Moving from the meeting point to the cycle entrance requires exactly d steps. So resetting one pointer to the start and advancing both by 1 guarantees they meet at the entrance.

**Example:** [1,3,4,2,2]
- Index chain: 0→1→3→2→4→2→4→... (forms a loop at 2→4→2)
- Phase 1: slow=0,1,2; fast=0,3,4. Slow and fast meet inside cycle.
- Phase 2: Reset slow to 0, advance both by 1 until they meet at 2 (the entrance/duplicate) ✓

**Implement \`solve(input)\` where \`input = number[]\` array of length n+1 with values in [1,n]. Return the duplicate value.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the duplicate value.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use Floyd cycle detection. Treat the array as a linked list where array[i] is a pointer to array[array[i]]. Initialize slow and fast pointers at the start; move slow by 1 and fast by 2 until they meet inside a cycle. Then reset slow to start and move both by 1 until they meet again; that meeting point is the cycle entrance, which corresponds to the duplicate value.`,
    correctExplanation: `Use Floyd cycle detection. Treat the array as a linked list where array[i] is a pointer to array[array[i]]. Initialize slow and fast pointers at the start; move slow by 1 and fast by 2 until they meet inside a cycle. Then reset slow to start and move both by 1 until they meet again; that meeting point is the cycle entrance, which corresponds to the duplicate value.`,
    tests: [
      { input: [[1, 3, 4, 2, 2]], expected: 2 },
      { input: [[3, 1, 3, 4, 2]], expected: 3 },
      { input: [[2, 2, 2, 2, 2]], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-edit-distance-0011',
    difficulty: 'insanelyHard',
    prompt: `Edit Distance (Levenshtein Distance | Dynamic Programming)

**Problem:** Find the minimum number of single-character edits (insert, delete, replace) to transform word1 into word2.

**Example:** "horse" → "ros":
- Replace h with r: "rorse"
- Delete r: "rose"
- Delete e: "ros" ✓
- Total: 3 edits

**Dynamic Programming Approach:**
- dp[i][j] = minimum edits to transform word1[0:i] into word2[0:j]
- Base cases:
  - dp[i][0] = i (delete all i characters)
  - dp[0][j] = j (insert all j characters)
- Recurrence:
  - If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1] (no edit needed)
  - Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    - dp[i-1][j] + 1: delete from word1
    - dp[i][j-1] + 1: insert into word1
    - dp[i-1][j-1] + 1: replace

**Example DP Table:** "horse" (length 5) to "ros" (length 3)
\`\`\`
    "" r  o  s
"" 0  1  2  3
h  1  1  2  3
o  2  2  1  2
r  3  2  2  2
s  4  3  3  2
e  5  4  4  3
\`\`\`
Answer: dp[5][3] = 3 ✓

**How to Read the Table:**
- dp[1][1]: "h" → "r" requires 1 replace
- dp[2][2]: "ho" → "ro" requires 1 replace (h→r) + keep o = 1
- dp[5][3]: "horse" → "ros" requires 3 edits

**Implement \`solve(input)\` where \`input = { word1: string, word2: string }\`. Return the minimum edit distance.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the minimum edit distance.**.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Build a DP table where dp[i][j] represents the minimum edits needed to transform the first i characters of word1 into the first j characters of word2. If characters match, copy the diagonal value. If they don't, take the minimum of three options (delete, insert, replace) and add 1. The answer is dp[m][n] where m and n are the lengths of the words.`,
    correctExplanation: `Build a DP table where dp[i][j] represents the minimum edits needed to transform the first i characters of word1 into the first j characters of word2. If characters match, copy the diagonal value. If they don't, take the minimum of three options (delete, insert, replace) and add 1. The answer is dp[m][n] where m and n are the lengths of the words.`,
    tests: [
      { input: [{ word1: 'horse', word2: 'ros' }], expected: 3 },
      { input: [{ word1: 'intention', word2: 'execution' }], expected: 5 },
      { input: [{ word1: '', word2: 'abc' }], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-valid-anagram-0012',
    difficulty: 'insanelyHard',
    prompt: `Valid Anagram (Character Frequency Matching)

**Problem:** Determine if two strings are anagrams (same characters, different order).

**Example:** "anagram" and "nagaram" are anagrams.

**Key Insight:** Two strings are anagrams if and only if:
1. They have the same length, AND
2. Every character appears the same number of times in both

**Algorithm Options:**
- **Option 1:** Sort both strings and compare (O(n log n))
- **Option 2:** Count characters in a map and compare (O(n))

For efficiency, use character counting.

**Implementation:**
1. Check if lengths match; if not, return false
2. Count character frequencies in string s using a map/array
3. For each character in t, decrement its count
4. If any count goes negative or doesn't reach zero at the end, return false
5. Otherwise, return true

**Example:** s = "anagram", t = "nagaram"
- Length check: both 7 ✓
- Count s: {a:3, n:1, g:1, r:1, m:1}
- Decrement with t: n(0), a(2), g(0), a(1), r(0), a(0), m(0) ✓
- All counts are 0, so true ✓

**Implement \`solve(input)\` where \`input = { s: string, t: string }\`. Return \`true\` if t is an anagram of s, \`false\` otherwise.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return false.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Check if lengths are equal. Then count the frequency of each character in s and in t. If all frequencies match (you can decrement s frequencies with t characters and all reach zero), they're anagrams. This is a character-frequency matching pattern.`,
    correctExplanation: `Check if lengths are equal. Then count the frequency of each character in s and in t. If all frequencies match (you can decrement s frequencies with t characters and all reach zero), they're anagrams. This is a character-frequency matching pattern.`,
    tests: [
      { input: [{ s: 'anagram', t: 'nagaram' }], expected: true },
      { input: [{ s: 'rat', t: 'car' }], expected: false },
      { input: [{ s: '', t: '' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-container-most-water-0013',
    difficulty: 'insanelyHard',
    prompt: `Container With Most Water (Two-Pointer Greedy)

**Problem:** Given heights, find two lines that can form the largest container (width = indices apart, height = min of the two heights).

**Example:** [1,8,6,2,5,4,8,3,7]. Maximum area is 49 (using indices 1 and 8 with heights 8 and 7).

**Visualization:**
\`\`\`
      |   |         |           [49 = min(8,7) × (8-1)]
      | | |   |     | |
    | | | | | |   | | |
  1 8 6 2 5 4 8 3 7
  ^                 ^
\`\`\`

**Greedy Insight:** Start with the widest container (leftmost and rightmost). The area is limited by the shorter line. To improve area, you must increase height (width will only decrease as pointers move closer). So move the shorter line inward, hoping to find a taller line.

**Why This Works:** If the left line is shorter, moving the right inward gives a smaller width and doesn't increase height (right is taller, so height is still limited by left). Moving the left inward has a chance to find a taller line. This greedy choice never misses the optimal solution.

**Algorithm:**
1. Initialize left = 0, right = n-1
2. While left < right:
   - Compute area = min(heights[left], heights[right]) × (right - left)
   - Update max area
   - If heights[left] < heights[right], move left inward (increment)
   - Else, move right inward (decrement)
3. Return max area

**Example Walkthrough:** [1,8,6,2,5,4,8,3,7]
- left=0 (h=1), right=8 (h=7): area=min(1,7)×8=8, h[0]<h[8] so left++
- left=1 (h=8), right=8 (h=7): area=min(8,7)×7=49, h[8]<h[1] so right--
- ...continue...
- Max area: 49

**Time Complexity:** O(n) single pass. Space: O(1).

**Implement \`solve(input)\` where \`input = number[]\` heights. Return the maximum water container area.**

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return max area.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use two pointers at the start and end. Compute the area between them, which is limited by the shorter height. Move the pointer on the shorter height inward because moving the taller pointer cannot increase the limiting height but decreases width. Keep track of the maximum area seen.`,
    correctExplanation: `Use two pointers at the start and end. Compute the area between them, which is limited by the shorter height. Move the pointer on the shorter height inward because moving the taller pointer cannot increase the limiting height but decreases width. Keep track of the maximum area seen.`,
    tests: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-word-ladder-ii-length-0014',
    difficulty: 'insanelyHard',
    prompt: `Word Ladder Length (Bidirectional BFS)

**Problem:** Given beginWord, endWord, and a wordList, return the length of the shortest transformation sequence where only one character changes per step and each intermediate word must exist in the list. Return 0 if impossible.

**Example:** begin="hit", end="cog", list=["hot","dot","dog","lot","log","cog"] → shortest chain is hit→hot→dot→dog→cog, length 5.

**Key Insight:** This is an unweighted shortest-path problem over an implicit graph (words are nodes, one-char changes are edges). Bidirectional BFS reduces branching by expanding from both ends.

**Implement \`solve(input)\` where \`input = { beginWord: string, endWord: string, wordList: string[] }\`. Return shortest transformation length or 0.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the length of the shortest transformation sequence where only one character changes per step and each intermediate word must exist in the list. Return 0 if impossible.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use bidirectional BFS with frontiers from beginWord and endWord. At each step expand the smaller frontier for efficiency. Generate neighbors by changing one character at each position. If frontiers meet, return current depth + 1. If search exhausts, return 0. Time roughly O(N * L * 26), Space O(N), where N is word count and L is word length.`,
    correctExplanation: `Use bidirectional BFS with frontiers from beginWord and endWord. At each step expand the smaller frontier for efficiency. Generate neighbors by changing one character at each position. If frontiers meet, return current depth + 1. If search exhausts, return 0. Time roughly O(N * L * 26), Space O(N), where N is word count and L is word length.`,
    tests: [
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'] }], expected: 5 },
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] }], expected: 0 },
      { input: [{ beginWord: 'a', endWord: 'c', wordList: ['a', 'b', 'c'] }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-alien-dictionary-order-0015',
    difficulty: 'insanelyHard',
    prompt: `Alien Dictionary (Topological Sort)

**Problem:** Given words sorted by an unknown alien alphabet, return a valid character order string. If no valid order exists, return an empty string.

**Example:** ["wrt","wrf","er","ett","rftt"] → one valid order is "wertf".

**Key Insight:** Compare adjacent words to extract precedence edges between first differing characters, then run topological sort.

**Implement \`solve(input)\` where \`input = string[]\`. Return order string or empty string if invalid/cyclic.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return a valid character order string. If no valid order exists, return an empty string.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Initialize graph nodes for every seen character. For each adjacent pair, find first differing char and add directed edge u->v. Handle invalid prefix case (e.g., ["abc","ab"]) by returning empty string. Run Kahn's algorithm using indegrees. If processed node count is less than total nodes, cycle exists, return empty.`,
    correctExplanation: `Initialize graph nodes for every seen character. For each adjacent pair, find first differing char and add directed edge u->v. Handle invalid prefix case (e.g., ["abc","ab"]) by returning empty string. Run Kahn's algorithm using indegrees. If processed node count is less than total nodes, cycle exists, return empty.`,
    tests: [
      { input: [['wrt', 'wrf', 'er', 'ett', 'rftt']], expected: 'wertf' },
      { input: [['z', 'x']], expected: 'zx' },
      { input: [['z', 'x', 'z']], expected: '' },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-critical-connections-0016',
    difficulty: 'insanelyHard',
    prompt: `Critical Connections In Network (Tarjan Bridges)

**Problem:** Given an undirected connected graph with n nodes and edges, return all critical connections (bridges). Removing a bridge increases connected components.

**Example:** n=4, edges=[[0,1],[1,2],[2,0],[1,3]] → bridge is [1,3].

**Key Insight:** Use DFS discovery times and low-link values. Edge (u,v) is a bridge if low[v] > disc[u].

**Implement \`solve(input)\` where \`input = { n: number, connections: number[][] }\`. Return sorted bridge edges as [min,max], sorted lexicographically.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return all critical connections (bridges). Removing a bridge increases connected components.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Build adjacency list and run DFS tracking discovery time and low-link for each node. For each tree edge u->v, recurse then update low[u] = min(low[u], low[v]). If low[v] > disc[u], record bridge [min(u,v), max(u,v)]. For back edges, update low[u] with discovery time of ancestor. Sort final bridges lexicographically.`,
    correctExplanation: `Build adjacency list and run DFS tracking discovery time and low-link for each node. For each tree edge u->v, recurse then update low[u] = min(low[u], low[v]). If low[v] > disc[u], record bridge [min(u,v), max(u,v)]. For back edges, update low[u] with discovery time of ancestor. Sort final bridges lexicographically.`,
    tests: [
      { input: [{ n: 4, connections: [[0, 1], [1, 2], [2, 0], [1, 3]] }], expected: [[1, 3]] },
      { input: [{ n: 5, connections: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]] }], expected: [[1, 3], [3, 4]] },
      { input: [{ n: 2, connections: [[0, 1]] }], expected: [[0, 1]] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-two-sum-ii-0017',
    difficulty: 'insanelyHard',
    prompt: `Two Sum II (Two Pointers)

What this question is asking:
- Given the provided input, compute 1-indexed indices \`[i, j]\` with \`i < j\` such that \`numbers[i-1] + numbers[j-1] = target\`.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: two-pointers

Implement \`solve(input)\` where \`input = { numbers: number[], target: number }\` and \`numbers\` is sorted ascending. Return 1-indexed indices \`[i, j]\` with \`i < j\` such that \`numbers[i-1] + numbers[j-1] = target\`.

Use O(1) extra space with a left/right pointer scan.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return exactly the result type/shape requested in the problem statement.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
With sorted numbers, start left=0 and right=n-1. If sum is too small, move left forward; if too large, move right backward. When sum matches target, return [left+1, right+1]. Time O(n), space O(1).`,
    correctExplanation: `With sorted numbers, start left=0 and right=n-1. If sum is too small, move left forward; if too large, move right backward. When sum matches target, return [left+1, right+1]. Time O(n), space O(1).`,
    tests: [
      { input: [{ numbers: [2, 7, 11, 15], target: 9 }], expected: [1, 2] },
      { input: [{ numbers: [2, 3, 4], target: 6 }], expected: [1, 3] },
      { input: [{ numbers: [-1, 0], target: -1 }], expected: [1, 2] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-char-replacement-0018',
    difficulty: 'insanelyHard',
    prompt: `Longest Repeating Character Replacement (Sliding Window)

What this question is asking:
- Given the provided input, compute the maximum length of a substring that can be turned into all one character by replacing at most \`k\` chars.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: sliding-window

Implement \`solve(input)\` where \`input = { s: string, k: number }\`. Return the maximum length of a substring that can be turned into all one character by replacing at most \`k\` chars.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return exactly the result type/shape requested in the problem statement.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Maintain a window with char counts and track max frequency in-window. If windowLength - maxFreq > k, shrink from the left. Track max valid window length. Time O(n).`,
    correctExplanation: `Maintain a window with char counts and track max frequency in-window. If windowLength - maxFreq > k, shrink from the left. Track max valid window length. Time O(n).`,
    tests: [
      { input: [{ s: 'ABAB', k: 2 }], expected: 4 },
      { input: [{ s: 'AABABBA', k: 1 }], expected: 4 },
      { input: [{ s: 'AAAA', k: 0 }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-daily-temperatures-0019',
    difficulty: 'insanelyHard',
    prompt: `Daily Temperatures (Monotonic Stack)

What this question is asking:
- Given the provided input, compute an array where each value is how many days to wait for a warmer temperature (0 if none).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: stack

Implement \`solve(input)\` where \`input = number[]\` temperatures. Return an array where each value is how many days to wait for a warmer temperature (0 if none).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return an array where each value is how many days to wait for a warmer temperature (0 if none).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use a decreasing stack of indices. For each day, pop colder indices and fill wait distance. Push current index. Time O(n), space O(n).`,
    correctExplanation: `Use a decreasing stack of indices. For each day, pop colder indices and fill wait distance. Push current index. Time O(n), space O(n).`,
    tests: [
      { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
      { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
      { input: [[30, 60, 90]], expected: [1, 1, 0] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-largest-rectangle-histogram-0020',
    difficulty: 'insanelyHard',
    prompt: `Largest Rectangle In Histogram (Monotonic Stack)

What this question is asking:
- Given the provided input, compute the largest rectangle area.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: stack

Implement \`solve(input)\` where \`input = number[]\` bar heights. Return the largest rectangle area.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the largest rectangle area.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use increasing stack of indices. When current bar is smaller than stack top, pop and compute area with popped height as min height and current index as right boundary. Time O(n).`,
    correctExplanation: `Use increasing stack of indices. When current bar is smaller than stack top, pop and compute area with popped height as min height and current index as right boundary. Time O(n).`,
    tests: [
      { input: [[2, 1, 5, 6, 2, 3]], expected: 10 },
      { input: [[2, 4]], expected: 4 },
      { input: [[1, 1, 1, 1]], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-search-rotated-array-0021',
    difficulty: 'insanelyHard',
    prompt: `Search In Rotated Sorted Array (Binary Search)

What this question is asking:
- Given the provided input, compute index of target or -1 if missing.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: binary-search

Implement \`solve(input)\` where \`input = { nums: number[], target: number }\`. Return index of target or -1 if missing.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return index of target or -1 if missing.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Binary search while identifying which half is sorted each step; determine if target belongs to sorted half and adjust bounds. Time O(log n).`,
    correctExplanation: `Binary search while identifying which half is sorted each step; determine if target belongs to sorted half and adjust bounds. Time O(log n).`,
    tests: [
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }], expected: 4 },
      { input: [{ nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }], expected: -1 },
      { input: [{ nums: [1], target: 0 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-find-min-rotated-array-0022',
    difficulty: 'insanelyHard',
    prompt: `Find Minimum In Rotated Sorted Array (Binary Search)

What this question is asking:
- Given the provided input, compute minimum value.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: binary-search

Implement \`solve(input)\` where \`input = number[]\` rotated sorted array with unique values. Return minimum value.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum value.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use binary search against right boundary. If mid value > right value, min is in right half; else min is in left half including mid. Time O(log n).`,
    correctExplanation: `Use binary search against right boundary. If mid value > right value, min is in right half; else min is in left half including mid. Time O(log n).`,
    tests: [
      { input: [[3, 4, 5, 1, 2]], expected: 1 },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
      { input: [[11, 13, 15, 17]], expected: 11 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-kth-smallest-bst-0023',
    difficulty: 'insanelyHard',
    prompt: `Kth Smallest Element In BST (Inorder Traversal)

What this question is asking:
- Given the provided input, compute the kth smallest value.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: trees

Implement \`solve(input)\` where \`input = { root: (number|null)[], k: number }\`. The tree is level-order with nulls. Return the kth smallest value.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the kth smallest value.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Inorder traversal of BST yields sorted values. Traverse iteratively/recursively and stop at kth visited node. Time O(h + k) average, O(n) worst.`,
    correctExplanation: `Inorder traversal of BST yields sorted values. Traverse iteratively/recursively and stop at kth visited node. Time O(h + k) average, O(n) worst.`,
    tests: [
      { input: [{ root: [3, 1, 4, null, 2], k: 1 }], expected: 1 },
      { input: [{ root: [5, 3, 6, 2, 4, null, null, 1], k: 3 }], expected: 3 },
      { input: [{ root: [2, 1, 3], k: 2 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-binary-tree-max-path-sum-0024',
    difficulty: 'insanelyHard',
    prompt: `Binary Tree Maximum Path Sum (Tree DP)

What this question is asking:
- Given the provided input, compute maximum path sum (path can start/end at any nodes, no repeated nodes).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: trees dp

Implement \`solve(input)\` where \`input = (number|null)[]\` level-order tree. Return maximum path sum (path can start/end at any nodes, no repeated nodes).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return maximum path sum (path can start/end at any nodes, no repeated nodes).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DFS returns best downward gain from each node. Global answer updates with node.val + max(0,leftGain) + max(0,rightGain). Return node.val + max(leftGain,rightGain,0).`,
    correctExplanation: `DFS returns best downward gain from each node. Global answer updates with node.val + max(0,leftGain) + max(0,rightGain). Return node.val + max(leftGain,rightGain,0).`,
    tests: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
      { input: [[-3]], expected: -3 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-lca-bst-0025',
    difficulty: 'insanelyHard',
    prompt: `Lowest Common Ancestor Of BST

What this question is asking:
- Given the provided input, compute the LCA node value in a BST.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: trees

Implement \`solve(input)\` where \`input = { root: (number|null)[], p: number, q: number }\`. Return the LCA node value in a BST.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the LCA node value in a BST.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
In BST, if both p and q are smaller than node, go left; if both larger, go right; otherwise current node is LCA. Time O(h).`,
    correctExplanation: `In BST, if both p and q are smaller than node, go left; if both larger, go right; otherwise current node is LCA. Time O(h).`,
    tests: [
      { input: [{ root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 }], expected: 6 },
      { input: [{ root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 }], expected: 2 },
      { input: [{ root: [2, 1], p: 2, q: 1 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-count-components-0026',
    difficulty: 'insanelyHard',
    prompt: `Count Connected Components In Undirected Graph

What this question is asking:
- Given the provided input, compute number of connected components.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: graphs dfs bfs union-find

Implement \`solve(input)\` where \`input = { n: number, edges: number[][] }\`. Return number of connected components.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of connected components.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Build adjacency list and run DFS/BFS from every unvisited node, counting traversals. Alternative: union-find over edges. Time O(n+e).`,
    correctExplanation: `Build adjacency list and run DFS/BFS from every unvisited node, counting traversals. Alternative: union-find over edges. Time O(n+e).`,
    tests: [
      { input: [{ n: 5, edges: [[0, 1], [1, 2], [3, 4]] }], expected: 2 },
      { input: [{ n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }], expected: 1 },
      { input: [{ n: 4, edges: [] }], expected: 4 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-rotting-oranges-0027',
    difficulty: 'insanelyHard',
    prompt: `Rotting Oranges (Multi-Source BFS)

What this question is asking:
- Given the provided input, compute minutes until all fresh rot, or -1 if impossible.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- BFS explores layer by layer, so the first time you reach a state gives the fewest steps in unweighted transitions.

Type: graphs bfs grid

Implement \`solve(input)\` where \`input = number[][]\` grid (0 empty, 1 fresh, 2 rotten). Return minutes until all fresh rot, or -1 if impossible.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minutes until all fresh rot, or -1 if impossible.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Push all rotten cells into queue with time 0. BFS in layers to rot neighbors. Track fresh count; when it hits 0 return elapsed minutes.`,
    correctExplanation: `Push all rotten cells into queue with time 0. BFS in layers to rot neighbors. Track fresh count; when it hits 0 return elapsed minutes.`,
    tests: [
      { input: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
      { input: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
      { input: [[[0, 2]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-cheapest-flights-k-stops-0028',
    difficulty: 'insanelyHard',
    prompt: `Cheapest Flights Within K Stops

What this question is asking:
- Given the provided input, compute cheapest price or -1.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- This is a shortest-path style objective: minimize cumulative cost/effort/time under the problem constraints.

Type: graphs shortest-path

Implement \`solve(input)\` where \`input = { n: number, flights: number[][], src: number, dst: number, k: number }\`. Return cheapest price or -1.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return cheapest price or -1.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use BFS by levels with cost relaxation (Bellman-Ford style up to k+1 edges) or Dijkstra state=(node,stops). Keep best known cost per node per stops bound.`,
    correctExplanation: `Use BFS by levels with cost relaxation (Bellman-Ford style up to k+1 edges) or Dijkstra state=(node,stops). Keep best known cost per node per stops bound.`,
    tests: [
      { input: [{ n: 4, flights: [[0, 1, 100], [1, 2, 100], [2, 3, 100], [0, 3, 500]], src: 0, dst: 3, k: 1 }], expected: 500 },
      { input: [{ n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dst: 2, k: 1 }], expected: 200 },
      { input: [{ n: 3, flights: [[0, 1, 100], [1, 2, 100]], src: 0, dst: 2, k: 0 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-network-delay-time-0029',
    difficulty: 'insanelyHard',
    prompt: `Network Delay Time (Dijkstra)

What this question is asking:
- Given the provided input, compute time for all nodes to receive signal from k, or -1 if unreachable.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- This is a shortest-path style objective: minimize cumulative cost/effort/time under the problem constraints.

Type: graphs dijkstra heap

Implement \`solve(input)\` where \`input = { times: number[][], n: number, k: number }\`. Nodes are 1..n. Return time for all nodes to receive signal from k, or -1 if unreachable.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return time for all nodes to receive signal from k, or -1 if unreachable.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Run Dijkstra from source k. Shortest path to each node is first finalized pop from min-heap. Answer is max shortest distance among nodes if all reached, else -1.`,
    correctExplanation: `Run Dijkstra from source k. Shortest path to each node is first finalized pop from min-heap. Answer is max shortest distance among nodes if all reached, else -1.`,
    tests: [
      { input: [{ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 }], expected: 2 },
      { input: [{ times: [[1, 2, 1]], n: 2, k: 1 }], expected: 1 },
      { input: [{ times: [[1, 2, 1]], n: 2, k: 2 }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-course-schedule-ii-0030',
    difficulty: 'insanelyHard',
    prompt: `Course Schedule II (Topological Ordering)

What this question is asking:
- Given the provided input, compute one valid course order, or [] if impossible.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A topological order is a linear order where every prerequisite/dependency appears before what depends on it.

Type: graphs topological-sort

Implement \`solve(input)\` where \`input = { numCourses: number, prerequisites: number[][] }\`. Return one valid course order, or [] if impossible.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return one valid course order, or [] if impossible.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Build graph pre->course and indegrees. Kahn BFS over zero-indegree nodes builds order. If output length < numCourses then cycle exists and return [].`,
    correctExplanation: `Build graph pre->course and indegrees. Kahn BFS over zero-indegree nodes builds order. If output length < numCourses then cycle exists and return [].`,
    tests: [
      { input: [{ numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2]] }], expected: [0, 1, 2, 3] },
      { input: [{ numCourses: 2, prerequisites: [[1, 0], [0, 1]] }], expected: [] },
      { input: [{ numCourses: 1, prerequisites: [] }], expected: [0] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-unique-paths-ii-0031',
    difficulty: 'insanelyHard',
    prompt: `Unique Paths II (DP Grid)

What this question is asking:
- Given the provided input, compute number of unique paths from top-left to bottom-right moving only right/down.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = number[][]\` obstacle grid (0 empty, 1 blocked). Return number of unique paths from top-left to bottom-right moving only right/down.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of unique paths from top-left to bottom-right moving only right/down.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP where dp[r][c]=0 if blocked, else dp[r-1][c]+dp[r][c-1]. Initialize start carefully for obstacle cases.`,
    correctExplanation: `DP where dp[r][c]=0 if blocked, else dp[r-1][c]+dp[r][c-1]. Initialize start carefully for obstacle cases.`,
    tests: [
      { input: [[[0, 0, 0], [0, 1, 0], [0, 0, 0]]], expected: 2 },
      { input: [[[0, 1], [0, 0]]], expected: 1 },
      { input: [[[1]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-decode-ways-0032',
    difficulty: 'insanelyHard',
    prompt: `Decode Ways (DP String)

What this question is asking:
- Given the provided input, compute number of valid decodings.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = string\` numeric message using mapping 1->A ... 26->Z. Return number of valid decodings.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of valid decodings.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
dp[i] = ways to decode prefix length i. Add dp[i-1] when single digit valid (1..9), add dp[i-2] when two-digit valid (10..26).`,
    correctExplanation: `dp[i] = ways to decode prefix length i. Add dp[i-1] when single digit valid (1..9), add dp[i-2] when two-digit valid (10..26).`,
    tests: [
      { input: ['12'], expected: 2 },
      { input: ['226'], expected: 3 },
      { input: ['06'], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-lis-binary-search-0033',
    difficulty: 'insanelyHard',
    prompt: `Longest Increasing Subsequence (DP + Binary Search)

What this question is asking:
- Given the provided input, compute LIS length in O(n log n).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A subsequence is formed by deleting zero or more elements without changing the order of what remains.
- Increasing means strictly increasing (each next value is greater, not equal).
- LIS length is the maximum number of elements in any strictly increasing subsequence.

Type: dynamic-programming binary-search

Implement \`solve(input)\` where \`input = number[]\`. Return LIS length in O(n log n).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return LIS length in O(n log n).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Maintain tails array: tails[len] = minimum tail value for increasing subsequence length len+1. Binary search insertion position per number.`,
    correctExplanation: `Maintain tails array: tails[len] = minimum tail value for increasing subsequence length len+1. Binary search insertion position per number.`,
    tests: [
      { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
      { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
      { input: [[7, 7, 7, 7, 7]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-meeting-rooms-ii-0034',
    difficulty: 'insanelyHard',
    prompt: `Meeting Rooms II (Intervals + Heap)

What this question is asking:
- Given the provided input, compute minimum number of rooms required.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- An interval [start, end] includes all time/positions between start and end.
- Overlap means two intervals share any portion in common.

Type: intervals heap

Implement \`solve(input)\` where \`input = number[][]\` meeting intervals [start,end]. Return minimum number of rooms required.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum number of rooms required.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Sort intervals by start. Min-heap tracks current meeting end times. Reuse room when earliest end <= next start; otherwise allocate new room.`,
    correctExplanation: `Sort intervals by start. Min-heap tracks current meeting end times. Reuse room when earliest end <= next start; otherwise allocate new room.`,
    tests: [
      { input: [[[0, 30], [5, 10], [15, 20]]], expected: 2 },
      { input: [[[7, 10], [2, 4]]], expected: 1 },
      { input: [[[1, 5], [2, 3], [3, 6]]], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-merge-intervals-0035',
    difficulty: 'insanelyHard',
    prompt: `Merge Intervals

What this question is asking:
- Given the provided input, compute merged non-overlapping intervals sorted by start.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- An interval [start, end] includes all time/positions between start and end.
- Overlap means two intervals share any portion in common.

Type: intervals sorting

Implement \`solve(input)\` where \`input = number[][]\` intervals. Return merged non-overlapping intervals sorted by start.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return merged non-overlapping intervals sorted by start.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Sort by start then sweep. If current overlaps last merged, extend last end; else append new interval.`,
    correctExplanation: `Sort by start then sweep. If current overlaps last merged, extend last end; else append new interval.`,
    tests: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { input: [[[1, 4], [0, 4]]], expected: [[0, 4]] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-erase-overlap-intervals-0036',
    difficulty: 'insanelyHard',
    prompt: `Non-overlapping Intervals (Greedy)

What this question is asking:
- Given the provided input, compute minimum intervals to remove to make rest non-overlapping.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- An interval [start, end] includes all time/positions between start and end.
- Overlap means two intervals share any portion in common.

Type: intervals greedy

Implement \`solve(input)\` where \`input = number[][]\` intervals. Return minimum intervals to remove to make rest non-overlapping.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum intervals to remove to make rest non-overlapping.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Sort by end time and greedily keep earliest-ending compatible intervals. Removed count = total - kept.`,
    correctExplanation: `Sort by end time and greedily keep earliest-ending compatible intervals. Removed count = total - kept.`,
    tests: [
      { input: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expected: 1 },
      { input: [[[1, 2], [1, 2], [1, 2]]], expected: 2 },
      { input: [[[1, 2], [2, 3]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-word-search-0037',
    difficulty: 'insanelyHard',
    prompt: `Word Search (Backtracking)

What this question is asking:
- Given the provided input, compute true if the word exists via adjacent (up/down/left/right) cells without reusing a cell.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking dfs-grid

Implement \`solve(input)\` where \`input = { board: string[][], word: string }\`. Return true if the word exists via adjacent (up/down/left/right) cells without reusing a cell.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true if the word exists via adjacent (up/down/left/right) cells without reusing a cell.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Backtrack from each matching starting cell with visited marking. DFS character by character and unmark on return.`,
    correctExplanation: `Backtrack from each matching starting cell with visited marking. DFS character by character and unmark on return.`,
    tests: [
      { input: [{ board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'ABCCED' }], expected: true },
      { input: [{ board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'SEE' }], expected: true },
      { input: [{ board: [['A', 'B'], ['C', 'D']], word: 'ABCD' }], expected: false },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-subsets-ii-0038',
    difficulty: 'insanelyHard',
    prompt: `Subsets II (Backtracking with Duplicates)

What this question is asking:
- Given the provided input, compute all unique subsets sorted lexicographically (compare subset values, then length). Each subset should be sorted ascending.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking

Implement \`solve(input)\` where \`input = number[]\`. Return all unique subsets sorted lexicographically (compare subset values, then length). Each subset should be sorted ascending.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return all unique subsets sorted lexicographically (compare subset values, then length). Each subset should be sorted ascending.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Sort input first, backtrack include/exclude while skipping duplicate branches at same depth. Sort final subsets lexicographically for deterministic output.`,
    correctExplanation: `Sort input first, backtrack include/exclude while skipping duplicate branches at same depth. Sort final subsets lexicographically for deterministic output.`,
    tests: [
      { input: [[1, 2, 2]], expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { input: [[0]], expected: [[], [0]] },
      { input: [[2, 2]], expected: [[], [2], [2, 2]] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-number-of-provinces-0039',
    difficulty: 'insanelyHard',
    prompt: `Number Of Provinces

What this question is asking:
- Given the provided input, compute number of provinces (connected components).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: union-find graphs

Implement \`solve(input)\` where \`input = number[][]\` adjacency matrix isConnected. Return number of provinces (connected components).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of provinces (connected components).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Union all connected city pairs or DFS over matrix. Provinces equal number of disjoint sets / traversals.`,
    correctExplanation: `Union all connected city pairs or DFS over matrix. Provinces equal number of disjoint sets / traversals.`,
    tests: [
      { input: [[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], expected: 2 },
      { input: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], expected: 3 },
      { input: [[[1, 1], [1, 1]]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-single-number-iii-0040',
    difficulty: 'insanelyHard',
    prompt: `Single Number III (Bit Manipulation)

What this question is asking:
- Given the provided input, compute the two unique numbers sorted ascending.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: bit-manipulation

Implement \`solve(input)\` where \`input = number[]\` and exactly two numbers appear once while all others appear twice. Return the two unique numbers sorted ascending.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the two unique numbers sorted ascending.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
XOR all numbers to get xor=a^b. Pick rightmost set bit to partition numbers into two groups, XOR each group to recover a and b. Sort output ascending.`,
    correctExplanation: `XOR all numbers to get xor=a^b. Pick rightmost set bit to partition numbers into two groups, XOR each group to recover a and b. Sort output ascending.`,
    tests: [
      { input: [[1, 2, 1, 3, 2, 5]], expected: [3, 5] },
      { input: [[-1, 0]], expected: [-1, 0] },
      { input: [[0, 1]], expected: [0, 1] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-min-cost-climbing-stairs-0041',
    difficulty: 'insanelyHard',
    prompt: `Min Cost Climbing Stairs

What this question is asking:
- Given the provided input, compute minimum cost to reach the top.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = number[]\` cost. You can start at step 0 or 1, and each move climbs 1 or 2 steps. Return minimum cost to reach the top.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum cost to reach the top.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP recurrence: dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Final answer is min(dp[n-1], dp[n-2]) since top is after last step.`,
    correctExplanation: `DP recurrence: dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Final answer is min(dp[n-1], dp[n-2]) since top is after last step.`,
    tests: [
      { input: [[10, 15, 20]], expected: 15 },
      { input: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], expected: 6 },
      { input: [[0, 0, 0]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-house-robber-ii-0042',
    difficulty: 'insanelyHard',
    prompt: `House Robber II

What this question is asking:
- Given the provided input, compute max money.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = number[]\` house values arranged in a circle. Adjacent houses cannot both be robbed. Return max money.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return max money.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Circular constraint means either rob range [0..n-2] or [1..n-1], then take max of standard linear robber DP on both ranges.`,
    correctExplanation: `Circular constraint means either rob range [0..n-2] or [1..n-1], then take max of standard linear robber DP on both ranges.`,
    tests: [
      { input: [[2, 3, 2]], expected: 3 },
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[1, 2, 3]], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-partition-equal-subset-sum-0043',
    difficulty: 'insanelyHard',
    prompt: `Partition Equal Subset Sum

What this question is asking:
- Given the provided input, compute true if array can be split into two subsets with equal sum.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming knapsack

Implement \`solve(input)\` where \`input = number[]\`. Return true if array can be split into two subsets with equal sum.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true if array can be split into two subsets with equal sum.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Total sum must be even. Then do subset-sum to target=sum/2 using boolean DP or bitset, iterating numbers once each.`,
    correctExplanation: `Total sum must be even. Then do subset-sum to target=sum/2 using boolean DP or bitset, iterating numbers once each.`,
    tests: [
      { input: [[1, 5, 11, 5]], expected: true },
      { input: [[1, 2, 3, 5]], expected: false },
      { input: [[2, 2, 1, 1]], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-target-sum-0044',
    difficulty: 'insanelyHard',
    prompt: `Target Sum

What this question is asking:
- Given the provided input, compute number of ways to assign + or - signs to reach target.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = { nums: number[], target: number }\`. Return number of ways to assign + or - signs to reach target.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of ways to assign + or - signs to reach target.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Transform to subset-count problem: find subsets with sum (S+target)/2 when feasible, or use hashmap DP over running sums.`,
    correctExplanation: `Transform to subset-count problem: find subsets with sum (S+target)/2 when feasible, or use hashmap DP over running sums.`,
    tests: [
      { input: [{ nums: [1, 1, 1, 1, 1], target: 3 }], expected: 5 },
      { input: [{ nums: [1], target: 1 }], expected: 1 },
      { input: [{ nums: [2, 3, 5], target: 0 }], expected: 2 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-longest-common-subsequence-0045',
    difficulty: 'insanelyHard',
    prompt: `Longest Common Subsequence

What this question is asking:
- Given the provided input, compute LCS length.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A subsequence keeps relative order but can skip elements.
- Common means the subsequence must appear in both inputs.
- Return the maximum possible length.

Type: dynamic-programming strings

Implement \`solve(input)\` where \`input = { text1: string, text2: string }\`. Return LCS length.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return LCS length.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
2D DP where dp[i][j] is LCS length for prefixes. If chars match: 1+dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1]).`,
    correctExplanation: `2D DP where dp[i][j] is LCS length for prefixes. If chars match: 1+dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1]).`,
    tests: [
      { input: [{ text1: 'abcde', text2: 'ace' }], expected: 3 },
      { input: [{ text1: 'abc', text2: 'abc' }], expected: 3 },
      { input: [{ text1: 'abc', text2: 'def' }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-coin-change-ii-0046',
    difficulty: 'insanelyHard',
    prompt: `Coin Change II

What this question is asking:
- Given the provided input, compute number of combinations to make amount using unlimited coins.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming combinations

Implement \`solve(input)\` where \`input = { amount: number, coins: number[] }\`. Return number of combinations to make amount using unlimited coins.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of combinations to make amount using unlimited coins.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
1D DP combinations: dp[0]=1. For each coin c, for v from c..amount: dp[v]+=dp[v-c]. Coin-first iteration avoids permutation overcounting.`,
    correctExplanation: `1D DP combinations: dp[0]=1. For each coin c, for v from c..amount: dp[v]+=dp[v-c]. Coin-first iteration avoids permutation overcounting.`,
    tests: [
      { input: [{ amount: 5, coins: [1, 2, 5] }], expected: 4 },
      { input: [{ amount: 3, coins: [2] }], expected: 0 },
      { input: [{ amount: 10, coins: [10] }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-burst-balloons-0047',
    difficulty: 'insanelyHard',
    prompt: `Burst Balloons

What this question is asking:
- Given the provided input, compute max coins.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: interval-dp

Implement \`solve(input)\` where \`input = number[]\` balloons. Bursting i yields nums[left]*nums[i]*nums[right] with current neighbors. Return max coins.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return max coins.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use interval DP with padding 1s at both ends. Let dp[l][r] be max coins in open interval (l,r). Try each k as last burst: dp[l][k]+dp[k][r]+arr[l]*arr[k]*arr[r].`,
    correctExplanation: `Use interval DP with padding 1s at both ends. Let dp[l][r] be max coins in open interval (l,r). Try each k as last burst: dp[l][k]+dp[k][r]+arr[l]*arr[k]*arr[r].`,
    tests: [
      { input: [[3, 1, 5, 8]], expected: 167 },
      { input: [[1, 5]], expected: 10 },
      { input: [[7]], expected: 7 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-palindrome-partitioning-0048',
    difficulty: 'insanelyHard',
    prompt: `Palindrome Partitioning

What this question is asking:
- Given the provided input, compute all palindrome partitions. Each partition should list substrings in order. Sort partitions lexicographically by joined form.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking

Implement \`solve(input)\` where \`input = string\`. Return all palindrome partitions. Each partition should list substrings in order. Sort partitions lexicographically by joined form.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return all palindrome partitions. Each partition should list substrings in order. Sort partitions lexicographically by joined form.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Backtrack over cut positions; extend with substring s[i..j] only if palindrome. Precompute palindrome table for speed or check on the fly.`,
    correctExplanation: `Backtrack over cut positions; extend with substring s[i..j] only if palindrome. Precompute palindrome table for speed or check on the fly.`,
    tests: [
      { input: ['aab'], expected: [['a', 'a', 'b'], ['aa', 'b']] },
      { input: ['a'], expected: [['a']] },
      { input: ['efe'], expected: [['e', 'f', 'e'], ['efe']] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-n-queens-count-0049',
    difficulty: 'insanelyHard',
    prompt: `N-Queens II (Count Solutions)

What this question is asking:
- Given the provided input, compute the number of valid N-Queens board configurations.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking bitmasks

Implement \`solve(input)\` where \`input = number\` n. Return the number of valid N-Queens board configurations.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the number of valid N-Queens board configurations.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Backtrack row by row with used columns and diagonals sets (or bitmasks). Count complete placements.`,
    correctExplanation: `Backtrack row by row with used columns and diagonals sets (or bitmasks). Count complete placements.`,
    tests: [
      { input: [4], expected: 2 },
      { input: [1], expected: 1 },
      { input: [5], expected: 10 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-pacific-atlantic-0050',
    difficulty: 'insanelyHard',
    prompt: `Pacific Atlantic Water Flow

What this question is asking:
- Given the provided input, compute cells that can flow to both oceans as sorted coordinates [[r,c],...].
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: graphs dfs bfs grid

Implement \`solve(input)\` where \`input = number[][]\` heights. Return cells that can flow to both oceans as sorted coordinates [[r,c],...].

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return cells that can flow to both oceans as sorted coordinates [[r,c],...].
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Reverse-flow from ocean edges: run DFS/BFS from Pacific borders and Atlantic borders to cells with non-decreasing heights. Intersect reachable sets.`,
    correctExplanation: `Reverse-flow from ocean edges: run DFS/BFS from Pacific borders and Atlantic borders to cells with non-decreasing heights. Intersect reachable sets.`,
    tests: [
      { input: [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]], expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] },
      { input: [[[1]]], expected: [[0, 0]] },
      { input: [[[1, 2], [4, 3]]], expected: [[0, 1], [1, 0], [1, 1]] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-reconstruct-itinerary-0051',
    difficulty: 'insanelyHard',
    prompt: `Reconstruct Itinerary

What this question is asking:
- Given the provided input, compute itinerary starting at "JFK" using all tickets once, lexicographically smallest among valid paths.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: graphs eulerian-path

Implement \`solve(input)\` where \`input = string[][]\` tickets [from,to]. Return itinerary starting at "JFK" using all tickets once, lexicographically smallest among valid paths.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return itinerary starting at "JFK" using all tickets once, lexicographically smallest among valid paths.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Hierholzer with lexical ordering: store destinations in min-ordered structure per source; DFS postorder to build Eulerian path, then reverse.`,
    correctExplanation: `Hierholzer with lexical ordering: store destinations in min-ordered structure per source; DFS postorder to build Eulerian path, then reverse.`,
    tests: [
      { input: [[['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]], expected: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'] },
      { input: [[['JFK', 'KUL'], ['JFK', 'NRT'], ['NRT', 'JFK']]], expected: ['JFK', 'NRT', 'JFK', 'KUL'] },
      { input: [[['JFK', 'A'], ['A', 'B'], ['B', 'JFK']]], expected: ['JFK', 'A', 'B', 'JFK'] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-redundant-connection-0052',
    difficulty: 'insanelyHard',
    prompt: `Redundant Connection

What this question is asking:
- Given the provided input, compute that edge.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: union-find

Implement \`solve(input)\` where \`input = number[][]\` undirected edges for nodes 1..n. Exactly one extra edge creates a cycle. Return that edge.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return that edge.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Union edges in order; first edge whose endpoints already share root is redundant.`,
    correctExplanation: `Union edges in order; first edge whose endpoints already share root is redundant.`,
    tests: [
      { input: [[[1, 2], [1, 3], [2, 3]]], expected: [2, 3] },
      { input: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], expected: [1, 4] },
      { input: [[[1, 2], [2, 3], [3, 1]]], expected: [3, 1] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-min-cost-connect-points-0053',
    difficulty: 'insanelyHard',
    prompt: `Min Cost To Connect All Points

What this question is asking:
- Given the provided input, compute minimum total cost to connect all points.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: mst prim

Implement \`solve(input)\` where \`input = number[][]\` points [x,y]. Cost to connect two points is Manhattan distance. Return minimum total cost to connect all points.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum total cost to connect all points.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Run Prim's MST: repeatedly add cheapest edge from built set to unvisited points, updating best connection costs.`,
    correctExplanation: `Run Prim's MST: repeatedly add cheapest edge from built set to unvisited points, updating best connection costs.`,
    tests: [
      { input: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], expected: 20 },
      { input: [[[3, 12], [-2, 5], [-4, 1]]], expected: 18 },
      { input: [[[0, 0]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-swim-rising-water-0054',
    difficulty: 'insanelyHard',
    prompt: `Swim In Rising Water

What this question is asking:
- Given the provided input, compute minimum t to go from (0,0) to (n-1,n-1).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- This is a shortest-path style objective: minimize cumulative cost/effort/time under the problem constraints.

Type: graphs dijkstra grid

Implement \`solve(input)\` where \`input = number[][]\` grid elevations. At time t you can enter cells with value <= t. Return minimum t to go from (0,0) to (n-1,n-1).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum t to go from (0,0) to (n-1,n-1).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Dijkstra on grid where path cost is max elevation seen along path. Priority by current path max elevation.`,
    correctExplanation: `Dijkstra on grid where path cost is max elevation seen along path. Priority by current path max elevation.`,
    tests: [
      { input: [[[0, 2], [1, 3]]], expected: 3 },
      { input: [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], expected: 16 },
      { input: [[[7]]], expected: 7 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-koko-eating-bananas-0055',
    difficulty: 'insanelyHard',
    prompt: `Koko Eating Bananas

What this question is asking:
- Given the provided input, compute minimum integer eating speed k so all bananas are eaten within h hours.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: binary-search answer-space

Implement \`solve(input)\` where \`input = { piles: number[], h: number }\`. Return minimum integer eating speed k so all bananas are eaten within h hours.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum integer eating speed k so all bananas are eaten within h hours.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Binary search k from 1..maxPile. Feasibility is total hours=sum(ceil(pile/k)) <= h.`,
    correctExplanation: `Binary search k from 1..maxPile. Feasibility is total hours=sum(ceil(pile/k)) <= h.`,
    tests: [
      { input: [{ piles: [3, 6, 7, 11], h: 8 }], expected: 4 },
      { input: [{ piles: [30, 11, 23, 4, 20], h: 5 }], expected: 30 },
      { input: [{ piles: [30, 11, 23, 4, 20], h: 6 }], expected: 23 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-kth-smallest-matrix-0056',
    difficulty: 'insanelyHard',
    prompt: `Kth Smallest Element In A Sorted Matrix

What this question is asking:
- Given the provided input, compute kth smallest value.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: binary-search matrix

Implement \`solve(input)\` where \`input = { matrix: number[][], k: number }\`. Matrix rows and columns are sorted ascending. Return kth smallest value.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return kth smallest value.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Binary search value range [min,max]. Count how many elements <= mid using O(n) staircase scan from bottom-left.`,
    correctExplanation: `Binary search value range [min,max]. Count how many elements <= mid using O(n) staircase scan from bottom-left.`,
    tests: [
      { input: [{ matrix: [[1, 5, 9], [10, 11, 13], [12, 13, 15]], k: 8 }], expected: 13 },
      { input: [{ matrix: [[-5]], k: 1 }], expected: -5 },
      { input: [{ matrix: [[1, 2], [1, 3]], k: 2 }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-jump-game-ii-0057',
    difficulty: 'insanelyHard',
    prompt: `Jump Game II

What this question is asking:
- Given the provided input, compute minimum jumps needed to reach last index (always reachable).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: greedy

Implement \`solve(input)\` where \`input = number[]\` jump lengths. Return minimum jumps needed to reach last index (always reachable).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum jumps needed to reach last index (always reachable).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Greedy BFS layers: track current range end and farthest reachable in next layer. Increment jumps when finishing current range.`,
    correctExplanation: `Greedy BFS layers: track current range end and farthest reachable in next layer. Increment jumps when finishing current range.`,
    tests: [
      { input: [[2, 3, 1, 1, 4]], expected: 2 },
      { input: [[2, 3, 0, 1, 4]], expected: 2 },
      { input: [[1]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-gas-station-0058',
    difficulty: 'insanelyHard',
    prompt: `Gas Station

What this question is asking:
- Given the provided input, compute start index to complete circuit once, or -1 if impossible.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: greedy

Implement \`solve(input)\` where \`input = { gas: number[], cost: number[] }\`. Return start index to complete circuit once, or -1 if impossible.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return start index to complete circuit once, or -1 if impossible.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
If total gas < total cost return -1. Otherwise one-pass accumulate tank; when tank<0 reset start to next index and tank=0.`,
    correctExplanation: `If total gas < total cost return -1. Otherwise one-pass accumulate tank; when tank<0 reset start to next index and tank=0.`,
    tests: [
      { input: [{ gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] }], expected: 3 },
      { input: [{ gas: [2, 3, 4], cost: [3, 4, 3] }], expected: -1 },
      { input: [{ gas: [5], cost: [4] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-task-scheduler-0059',
    difficulty: 'insanelyHard',
    prompt: `Task Scheduler

What this question is asking:
- Given the provided input, compute minimum intervals required to execute all tasks with cooldown n between equal tasks.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: greedy counting

Implement \`solve(input)\` where \`input = { tasks: string[], n: number }\`. Return minimum intervals required to execute all tasks with cooldown n between equal tasks.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum intervals required to execute all tasks with cooldown n between equal tasks.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Let maxFreq be highest task count and maxCount number of tasks with that count. Minimum slots is max(totalTasks, (maxFreq-1)*(n+1)+maxCount).`,
    correctExplanation: `Let maxFreq be highest task count and maxCount number of tasks with that count. Minimum slots is max(totalTasks, (maxFreq-1)*(n+1)+maxCount).`,
    tests: [
      { input: [{ tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 2 }], expected: 8 },
      { input: [{ tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 0 }], expected: 6 },
      { input: [{ tasks: ['A', 'A', 'A', 'A', 'B', 'B', 'C', 'C'], n: 2 }], expected: 10 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-hand-of-straights-0060',
    difficulty: 'insanelyHard',
    prompt: `Hand Of Straights

What this question is asking:
- Given the provided input, compute true if cards can be rearranged into groups of consecutive cards of size groupSize.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: greedy hashmap

Implement \`solve(input)\` where \`input = { hand: number[], groupSize: number }\`. Return true if cards can be rearranged into groups of consecutive cards of size groupSize.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true if cards can be rearranged into groups of consecutive cards of size groupSize.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Count frequencies. Process values in ascending order; for each value with count c, consume c copies from value..value+groupSize-1. Fail if any missing.`,
    correctExplanation: `Count frequencies. Process values in ascending order; for each value with count c, consume c copies from value..value+groupSize-1. Fail if any missing.`,
    tests: [
      { input: [{ hand: [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize: 3 }], expected: true },
      { input: [{ hand: [1, 2, 3, 4, 5], groupSize: 4 }], expected: false },
      { input: [{ hand: [1, 1, 2, 2, 3, 3], groupSize: 3 }], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-word-break-ii-count-0061',
    difficulty: 'insanelyHard',
    prompt: `Word Break Count (DP)

What this question is asking:
- Given the provided input, compute the number of valid segmentations of s using dictionary words.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming strings

Implement \`solve(input)\` where \`input = { s: string, wordDict: string[] }\`. Return the number of valid segmentations of s using dictionary words.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the number of valid segmentations of s using dictionary words.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP with dp[i]=ways for prefix length i. For each i, try words ending at i and add dp[i-word.length] when matched.`,
    correctExplanation: `DP with dp[i]=ways for prefix length i. For each i, try words ending at i and add dp[i-word.length] when matched.`,
    tests: [
      { input: [{ s: 'catsanddog', wordDict: ['cat', 'cats', 'and', 'sand', 'dog'] }], expected: 2 },
      { input: [{ s: 'pineapplepenapple', wordDict: ['apple', 'pen', 'applepen', 'pine', 'pineapple'] }], expected: 3 },
      { input: [{ s: 'LiveCode', wordDict: ['leet', 'codee'] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-distinct-subsequences-0062',
    difficulty: 'insanelyHard',
    prompt: `Distinct Subsequences

What this question is asking:
- Given the provided input, compute number of distinct subsequences of s that equal t.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A subsequence keeps original order but may skip elements.
- You cannot reorder characters/elements.

Type: dynamic-programming strings

Implement \`solve(input)\` where \`input = { s: string, t: string }\`. Return number of distinct subsequences of s that equal t.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of distinct subsequences of s that equal t.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP where dp[i][j] is ways to build first j chars of t from first i chars of s. If chars match, include + exclude paths.`,
    correctExplanation: `DP where dp[i][j] is ways to build first j chars of t from first i chars of s. If chars match, include + exclude paths.`,
    tests: [
      { input: [{ s: 'rabbbit', t: 'rabbit' }], expected: 3 },
      { input: [{ s: 'babgbag', t: 'bag' }], expected: 5 },
      { input: [{ s: 'abc', t: 'abcd' }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-interleaving-string-0063',
    difficulty: 'insanelyHard',
    prompt: `Interleaving String

What this question is asking:
- Given the provided input, compute true if s3 is an interleaving of s1 and s2.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming

Implement \`solve(input)\` where \`input = { s1: string, s2: string, s3: string }\`. Return true if s3 is an interleaving of s1 and s2.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true if s3 is an interleaving of s1 and s2.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
2D DP over indices i,j where dp[i][j] indicates s3 prefix length i+j can be formed. Transition from top/left when chars match.`,
    correctExplanation: `2D DP over indices i,j where dp[i][j] indicates s3 prefix length i+j can be formed. Transition from top/left when chars match.`,
    tests: [
      { input: [{ s1: 'aabcc', s2: 'dbbca', s3: 'aadbbcbcac' }], expected: true },
      { input: [{ s1: 'aabcc', s2: 'dbbca', s3: 'aadbbbaccc' }], expected: false },
      { input: [{ s1: '', s2: '', s3: '' }], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-minimum-window-subsequence-0064',
    difficulty: 'insanelyHard',
    prompt: `Minimum Window Subsequence

What this question is asking:
- Given the provided input, compute the shortest substring of s for which t is a subsequence, or empty string.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A subsequence keeps original order but may skip elements.
- You cannot reorder characters/elements.

Type: two-pointers strings

Implement \`solve(input)\` where \`input = { s: string, t: string }\`. Return the shortest substring of s for which t is a subsequence, or empty string.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the shortest substring of s for which t is a subsequence, or empty string.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Scan forward to match full t, then backtrack to tighten start, repeating from next start candidate.`,
    correctExplanation: `Scan forward to match full t, then backtrack to tighten start, repeating from next start candidate.`,
    tests: [
      { input: [{ s: 'abcdebdde', t: 'bde' }], expected: 'bcde' },
      { input: [{ s: 'jmeqksfrsdcmsiwvaovztaqenprpvnbstl', t: 'u' }], expected: '' },
      { input: [{ s: 'fgrqsqsnodwmxzkzxwqegkndaa', t: 'kzed' }], expected: 'kzxwqegknd' },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-longest-palindromic-substring-0065',
    difficulty: 'insanelyHard',
    prompt: `Longest Palindromic Substring

What this question is asking:
- Given the provided input, compute one longest palindromic substring.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: strings two-pointers

Implement \`solve(input)\` where \`input = string\`. Return one longest palindromic substring.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return one longest palindromic substring.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Expand around each center (odd and even). Track max-length window. O(n^2) time, O(1) extra space.`,
    correctExplanation: `Expand around each center (odd and even). Track max-length window. O(n^2) time, O(1) extra space.`,
    tests: [
      { input: ['babad'], expected: 'bab' },
      { input: ['cbbd'], expected: 'bb' },
      { input: ['a'], expected: 'a' },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-min-add-parentheses-0066',
    difficulty: 'insanelyHard',
    prompt: `Minimum Add To Make Parentheses Valid

What this question is asking:
- Given the provided input, compute minimum number of parentheses additions needed for validity.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: stack greedy

Implement \`solve(input)\` where \`input = string\` containing '(' and ')'. Return minimum number of parentheses additions needed for validity.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum number of parentheses additions needed for validity.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Track open count and required insertions for unmatched closing brackets. Final answer is insertions + open count.`,
    correctExplanation: `Track open count and required insertions for unmatched closing brackets. Final answer is insertions + open count.`,
    tests: [
      { input: ['())'], expected: 1 },
      { input: ['((('], expected: 3 },
      { input: ['()'], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-evaluate-rpn-0067',
    difficulty: 'insanelyHard',
    prompt: `Evaluate Reverse Polish Notation

What this question is asking:
- Given the provided input, compute evaluated integer. Division truncates toward zero.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: stack

Implement \`solve(input)\` where \`input = string[]\` tokens. Return evaluated integer. Division truncates toward zero.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return evaluated integer. Division truncates toward zero.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Push operands to stack; on operator pop right then left, apply, push result.`,
    correctExplanation: `Push operands to stack; on operator pop right then left, apply, push result.`,
    tests: [
      { input: [['2', '1', '+', '3', '*']], expected: 9 },
      { input: [['4', '13', '5', '/', '+']], expected: 6 },
      { input: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expected: 22 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-top-k-frequent-words-0068',
    difficulty: 'insanelyHard',
    prompt: `Top K Frequent Words

What this question is asking:
- Given the provided input, compute k most frequent words sorted by frequency desc, lexicographic asc for ties.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: heap hashmap sorting

Implement \`solve(input)\` where \`input = { words: string[], k: number }\`. Return k most frequent words sorted by frequency desc, lexicographic asc for ties.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return k most frequent words sorted by frequency desc, lexicographic asc for ties.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Count with map, then sort keys by (-count, word) or use heap with custom comparator.`,
    correctExplanation: `Count with map, then sort keys by (-count, word) or use heap with custom comparator.`,
    tests: [
      { input: [{ words: ['i', 'love', 'LiveCode', 'i', 'love', 'coding'], k: 2 }], expected: ['i', 'love'] },
      { input: [{ words: ['the', 'day', 'is', 'sunny', 'the', 'the', 'the', 'sunny', 'is', 'is'], k: 4 }], expected: ['the', 'is', 'sunny', 'day'] },
      { input: [{ words: ['a'], k: 1 }], expected: ['a'] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-find-k-closest-elements-0069',
    difficulty: 'insanelyHard',
    prompt: `Find K Closest Elements

What this question is asking:
- Given the provided input, compute k closest elements sorted ascending.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: binary-search two-pointers

Implement \`solve(input)\` where \`input = { arr: number[], k: number, x: number }\` with sorted arr. Return k closest elements sorted ascending.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return k closest elements sorted ascending.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Binary search left bound of size-k window: compare distances x-arr[mid] and arr[mid+k]-x.`,
    correctExplanation: `Binary search left bound of size-k window: compare distances x-arr[mid] and arr[mid+k]-x.`,
    tests: [
      { input: [{ arr: [1, 2, 3, 4, 5], k: 4, x: 3 }], expected: [1, 2, 3, 4] },
      { input: [{ arr: [1, 2, 3, 4, 5], k: 4, x: -1 }], expected: [1, 2, 3, 4] },
      { input: [{ arr: [1, 1, 2, 3, 4, 5], k: 4, x: 1 }], expected: [1, 1, 2, 3] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-subarray-product-less-than-k-0070',
    difficulty: 'insanelyHard',
    prompt: `Subarray Product Less Than K

What this question is asking:
- Given the provided input, compute count of contiguous subarrays with product < k.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: sliding-window

Implement \`solve(input)\` where \`input = { nums: number[], k: number }\`. Return count of contiguous subarrays with product < k.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return count of contiguous subarrays with product < k.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Maintain multiplicative window with left pointer; shrink while product >= k, add window length each step.`,
    correctExplanation: `Maintain multiplicative window with left pointer; shrink while product >= k, add window length each step.`,
    tests: [
      { input: [{ nums: [10, 5, 2, 6], k: 100 }], expected: 8 },
      { input: [{ nums: [1, 2, 3], k: 0 }], expected: 0 },
      { input: [{ nums: [1, 1, 1], k: 2 }], expected: 6 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-min-subarray-len-0071',
    difficulty: 'insanelyHard',
    prompt: `Minimum Size Subarray Sum

What this question is asking:
- Given the provided input, compute minimal length of subarray with sum >= target, else 0.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: sliding-window

Implement \`solve(input)\` where \`input = { target: number, nums: number[] }\`. Return minimal length of subarray with sum >= target, else 0.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimal length of subarray with sum >= target, else 0.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Expand right accumulating sum, then shrink left while sum>=target updating minimum length.`,
    correctExplanation: `Expand right accumulating sum, then shrink left while sum>=target updating minimum length.`,
    tests: [
      { input: [{ target: 7, nums: [2, 3, 1, 2, 4, 3] }], expected: 2 },
      { input: [{ target: 4, nums: [1, 4, 4] }], expected: 1 },
      { input: [{ target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-minimum-effort-path-0072',
    difficulty: 'insanelyHard',
    prompt: `Path With Minimum Effort

What this question is asking:
- Given the provided input, compute minimum effort from top-left to bottom-right.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- This is a shortest-path style objective: minimize cumulative cost/effort/time under the problem constraints.

Type: graphs dijkstra grid

Implement \`solve(input)\` where \`input = number[][]\` heights. Effort is max absolute difference along path. Return minimum effort from top-left to bottom-right.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum effort from top-left to bottom-right.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Dijkstra with path cost = max(currentEffort, edgeDiff). Relax neighbors by minimized maximum edge cost.`,
    correctExplanation: `Dijkstra with path cost = max(currentEffort, edgeDiff). Relax neighbors by minimized maximum edge cost.`,
    tests: [
      { input: [[[1, 2, 2], [3, 8, 2], [5, 3, 5]]], expected: 2 },
      { input: [[[1, 2, 3], [3, 8, 4], [5, 3, 5]]], expected: 1 },
      { input: [[[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-open-the-lock-0073',
    difficulty: 'insanelyHard',
    prompt: `Open The Lock

What this question is asking:
- Given the provided input, compute minimum wheel turns from "0000" to target avoiding deadends, else -1.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- BFS explores layer by layer, so the first time you reach a state gives the fewest steps in unweighted transitions.

Type: graphs bfs

Implement \`solve(input)\` where \`input = { deadends: string[], target: string }\`. Return minimum wheel turns from "0000" to target avoiding deadends, else -1.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum wheel turns from "0000" to target avoiding deadends, else -1.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Classic BFS on implicit graph of 10,000 combinations. Skip dead states, visited guard, expand by +/-1 per wheel.`,
    correctExplanation: `Classic BFS on implicit graph of 10,000 combinations. Skip dead states, visited guard, expand by +/-1 per wheel.`,
    tests: [
      { input: [{ deadends: ['0201', '0101', '0102', '1212', '2002'], target: '0202' }], expected: 6 },
      { input: [{ deadends: ['8888'], target: '0009' }], expected: 1 },
      { input: [{ deadends: ['0000'], target: '8888' }], expected: -1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-accounts-merge-count-0074',
    difficulty: 'insanelyHard',
    prompt: `Accounts Merge Count

What this question is asking:
- Given the provided input, compute the number of merged account groups after union by shared emails.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: union-find hashmap

Implement \`solve(input)\` where \`input = string[][]\` accounts [name,email1,...]. Return the number of merged account groups after union by shared emails.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the number of merged account groups after union by shared emails.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Map email to account index and union matching accounts. Count distinct roots among accounts that contain emails.`,
    correctExplanation: `Map email to account index and union matching accounts. Count distinct roots among accounts that contain emails.`,
    tests: [
      { input: [[['John', 'a@mail.com', 'b@mail.com'], ['John', 'b@mail.com', 'c@mail.com'], ['Mary', 'm@mail.com']]], expected: 2 },
      { input: [[['A', 'x@mail.com'], ['B', 'y@mail.com']]], expected: 2 },
      { input: [[['X', 'u@mail.com'], ['X', 'u@mail.com']]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-longest-consecutive-graph-0075',
    difficulty: 'insanelyHard',
    prompt: `Longest Consecutive Sequence

What this question is asking:
- Given the provided input, compute length of longest consecutive sequence in O(n).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: hashing

Implement \`solve(input)\` where \`input = number[]\`. Return length of longest consecutive sequence in O(n).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return length of longest consecutive sequence in O(n).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use set. Start counting only from numbers with no predecessor num-1, then expand forward.`,
    correctExplanation: `Use set. Start counting only from numbers with no predecessor num-1, then expand forward.`,
    tests: [
      { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { input: [[]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-find-all-anagrams-0076',
    difficulty: 'insanelyHard',
    prompt: `Find All Anagrams In A String

What this question is asking:
- Given the provided input, compute start indices of p's anagrams in s.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Two strings are anagrams/permutations if they contain exactly the same character counts.

Type: sliding-window hashing

Implement \`solve(input)\` where \`input = { s: string, p: string }\`. Return start indices of p's anagrams in s.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return start indices of p's anagrams in s.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Maintain fixed-length window frequency and compare against target count with rolling updates.`,
    correctExplanation: `Maintain fixed-length window frequency and compare against target count with rolling updates.`,
    tests: [
      { input: [{ s: 'cbaebabacd', p: 'abc' }], expected: [0, 6] },
      { input: [{ s: 'abab', p: 'ab' }], expected: [0, 1, 2] },
      { input: [{ s: 'aaaaa', p: 'b' }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-happy-number-0077',
    difficulty: 'insanelyHard',
    prompt: `Happy Number

What this question is asking:
- Given the provided input, compute true if n is happy (repeated sum of digit squares reaches 1).
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: two-pointers cycle-detection

Implement \`solve(input)\` where \`input = number\`. Return true if n is happy (repeated sum of digit squares reaches 1).

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true if n is happy (repeated sum of digit squares reaches 1).
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Treat transformation as linked list and use Floyd cycle detection (slow/fast) to detect cycles not containing 1.`,
    correctExplanation: `Treat transformation as linked list and use Floyd cycle detection (slow/fast) to detect cycles not containing 1.`,
    tests: [
      { input: [19], expected: true },
      { input: [2], expected: false },
      { input: [1], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-counting-bits-0078',
    difficulty: 'insanelyHard',
    prompt: `Counting Bits

What this question is asking:
- Given the provided input, compute array ans where ans[i] is number of 1 bits in i for i in [0..n].
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: bit-dp

Implement \`solve(input)\` where \`input = number\` n. Return array ans where ans[i] is number of 1 bits in i for i in [0..n].

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return array ans where ans[i] is number of 1 bits in i for i in [0..n].
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP relation ans[i] = ans[i >> 1] + (i & 1).`,
    correctExplanation: `DP relation ans[i] = ans[i >> 1] + (i & 1).`,
    tests: [
      { input: [2], expected: [0, 1, 1] },
      { input: [5], expected: [0, 1, 1, 2, 1, 2] },
      { input: [0], expected: [0] },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-sum-two-integers-0079',
    difficulty: 'insanelyHard',
    prompt: `Sum Of Two Integers Without + or -

What this question is asking:
- Given the provided input, compute a+b without using '+' or '-'. Assume 32-bit signed behavior.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: bit-manipulation

Implement \`solve(input)\` where \`input = { a: number, b: number }\`. Return a+b without using '+' or '-'. Assume 32-bit signed behavior.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return a+b without using '+' or '-'. Assume 32-bit signed behavior.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use iterative bit addition: sum = a XOR b, carry = (a AND b) << 1, repeat until carry is zero (with 32-bit masking).`,
    correctExplanation: `Use iterative bit addition: sum = a XOR b, carry = (a AND b) << 1, repeat until carry is zero (with 32-bit masking).`,
    tests: [
      { input: [{ a: 1, b: 2 }], expected: 3 },
      { input: [{ a: -2, b: 3 }], expected: 1 },
      { input: [{ a: -1, b: 1 }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-minimum-genetic-mutation-0080',
    difficulty: 'insanelyHard',
    prompt: `Minimum Genetic Mutation

What this question is asking:
- Given the provided input, compute min mutations from start to end changing one char each step, using only genes in bank; otherwise -1.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- BFS explores layer by layer, so the first time you reach a state gives the fewest steps in unweighted transitions.

Type: graphs bfs

Implement \`solve(input)\` where \`input = { startGene: string, endGene: string, bank: string[] }\`. Return min mutations from start to end changing one char each step, using only genes in bank; otherwise -1.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return min mutations from start to end changing one char each step, using only genes in bank; otherwise -1.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
BFS over valid genes; neighbors differ by exactly one position. Track visited to avoid cycles.`,
    correctExplanation: `BFS over valid genes; neighbors differ by exactly one position. Track visited to avoid cycles.`,
    tests: [
      { input: [{ startGene: 'AACCGGTT', endGene: 'AACCGGTA', bank: ['AACCGGTA'] }], expected: 1 },
      { input: [{ startGene: 'AACCGGTT', endGene: 'AAACGGTA', bank: ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'] }], expected: 2 },
      { input: [{ startGene: 'AAAAACCC', endGene: 'AACCCCCC', bank: ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'] }], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-frog-jump-0081',
    difficulty: 'insanelyHard',
    prompt: `Frog Jump

What this question is asking:
- Given the provided input, compute whether frog can reach last stone.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: dynamic-programming graph-state

Implement \`solve(input)\` where \`input = number[]\` sorted stone positions. Frog starts at stone 0 and first jump must be 1. If last jump was k, next jump can be k-1, k, or k+1 (positive only). Return whether frog can reach last stone.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return whether frog can reach last stone.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Track reachable jump sizes per stone (map<position, set<k>>). Propagate transitions k-1/k/k+1 to existing stones. Reachability of final stone decides result.`,
    correctExplanation: `Track reachable jump sizes per stone (map<position, set<k>>). Propagate transitions k-1/k/k+1 to existing stones. Reachability of final stone decides result.`,
    tests: [
      { input: [[0, 1, 3, 5, 6, 8, 12, 17]], expected: true },
      { input: [[0, 1, 2, 3, 4, 8, 9, 11]], expected: false },
      { input: [[0, 1]], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-word-ladder-ii-count-0082',
    difficulty: 'insanelyHard',
    prompt: `Word Ladder II Count

What this question is asking:
- Given the provided input, compute the number of shortest transformation sequences from beginWord to endWord, changing one letter at a time and staying in wordList.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- BFS explores layer by layer, so the first time you reach a state gives the fewest steps in unweighted transitions.

Type: bfs dfs shortest-path-dag

Implement \`solve(input)\` where \`input = { beginWord: string, endWord: string, wordList: string[] }\`. Return the number of shortest transformation sequences from beginWord to endWord, changing one letter at a time and staying in wordList.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the number of shortest transformation sequences from beginWord to endWord, changing one letter at a time and staying in wordList.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
BFS builds level graph of shortest distances; then count shortest paths in the DAG from beginWord to endWord using DFS+memo or DP by levels.`,
    correctExplanation: `BFS builds level graph of shortest distances; then count shortest paths in the DAG from beginWord to endWord using DFS+memo or DP by levels.`,
    tests: [
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'] }], expected: 2 },
      { input: [{ beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] }], expected: 0 },
      { input: [{ beginWord: 'a', endWord: 'c', wordList: ['a', 'b', 'c'] }], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-n-queens-count-0083',
    difficulty: 'insanelyHard',
    prompt: `N-Queens Count

What this question is asking:
- Given the provided input, compute the number of valid ways to place n queens on an n x n board such that none attack each other.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking bitmask

Implement \`solve(input)\` where \`input = number\` n. Return the number of valid ways to place n queens on an n x n board such that none attack each other.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return the number of valid ways to place n queens on an n x n board such that none attack each other.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Backtrack row by row while tracking used columns and diagonals. Bitmask optimization reduces overhead and keeps state transitions fast.`,
    correctExplanation: `Backtrack row by row while tracking used columns and diagonals. Bitmask optimization reduces overhead and keeps state transitions fast.`,
    tests: [
      { input: [4], expected: 2 },
      { input: [1], expected: 1 },
      { input: [5], expected: 10 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-edit-distance-0084',
    difficulty: 'insanelyHard',
    prompt: `Edit Distance

What this question is asking:
- Given the provided input, compute minimum operations (insert/delete/replace) to convert word1 to word2.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Edit distance is the minimum number of single-character insertions, deletions, and replacements to transform one string into another.

Type: dynamic-programming string

Implement \`solve(input)\` where \`input = { word1: string, word2: string }\`. Return minimum operations (insert/delete/replace) to convert word1 to word2.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return minimum operations (insert/delete/replace) to convert word1 to word2.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Classic DP where dp[i][j] is min edits for prefixes. Transition from insert, delete, replace; if chars equal, carry dp[i-1][j-1].`,
    correctExplanation: `Classic DP where dp[i][j] is min edits for prefixes. Transition from insert, delete, replace; if chars equal, carry dp[i-1][j-1].`,
    tests: [
      { input: [{ word1: 'horse', word2: 'ros' }], expected: 3 },
      { input: [{ word1: 'intention', word2: 'execution' }], expected: 5 },
      { input: [{ word1: '', word2: 'abc' }], expected: 3 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-burst-balloons-0085',
    difficulty: 'insanelyHard',
    prompt: `Burst Balloons

What this question is asking:
- Given the provided input, compute max coins.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: interval-dp

Implement \`solve(input)\` where \`input = number[]\`. You may burst balloons in any order. Bursting i gains nums[left] * nums[i] * nums[right] where left/right are nearest unburst neighbors (virtual 1 at boundaries). Return max coins.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return max coins.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Interval DP: choose last balloon to burst in (l,r). dp[l][r] = max over i in (l,r) of dp[l][i] + dp[i][r] + val[l]*val[i]*val[r].`,
    correctExplanation: `Interval DP: choose last balloon to burst in (l,r). dp[l][r] = max over i in (l,r) of dp[l][i] + dp[i][r] + val[l]*val[i]*val[r].`,
    tests: [
      { input: [[3, 1, 5, 8]], expected: 167 },
      { input: [[1, 5]], expected: 10 },
      { input: [[1, 2, 3]], expected: 12 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-distinct-subsequences-0086',
    difficulty: 'insanelyHard',
    prompt: `Distinct Subsequences

What this question is asking:
- Given the provided input, compute number of distinct subsequences of s equal to t.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- A subsequence keeps original order but may skip elements.
- You cannot reorder characters/elements.

Type: dynamic-programming strings

Implement \`solve(input)\` where \`input = { s: string, t: string }\`. Return number of distinct subsequences of s equal to t.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return number of distinct subsequences of s equal to t.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
DP over prefixes: if chars match, dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i][j] = dp[i-1][j]. Base dp[*][0]=1.`,
    correctExplanation: `DP over prefixes: if chars match, dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i][j] = dp[i-1][j]. Base dp[*][0]=1.`,
    tests: [
      { input: [{ s: 'rabbbit', t: 'rabbit' }], expected: 3 },
      { input: [{ s: 'babgbag', t: 'bag' }], expected: 5 },
      { input: [{ s: 'abc', t: 'abcd' }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-trapping-rain-water-ii-0087',
    difficulty: 'insanelyHard',
    prompt: `Trapping Rain Water II

What this question is asking:
- Given the provided input, compute total trapped water in 2D terrain.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: heap bfs grid

Implement \`solve(input)\` where \`input = number[][]\` elevation map. Return total trapped water in 2D terrain.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return total trapped water in 2D terrain.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Push all boundary cells into min-heap, then expand inward. Water trapped at a cell is max(0, boundaryHeight - cellHeight). Update boundary with max(currentBoundary, cellHeight).`,
    correctExplanation: `Push all boundary cells into min-heap, then expand inward. Water trapped at a cell is max(0, boundaryHeight - cellHeight). Update boundary with max(currentBoundary, cellHeight).`,
    tests: [
      { input: [[[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]]], expected: 4 },
      { input: [[[3, 3, 3], [3, 1, 3], [3, 3, 3]]], expected: 2 },
      { input: [[[1, 1, 1], [1, 1, 1]]], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-maximal-rectangle-0088',
    difficulty: 'insanelyHard',
    prompt: `Maximal Rectangle

What this question is asking:
- Given the provided input, compute area of largest rectangle containing only '1'.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: stack histogram dp

Implement \`solve(input)\` where \`input = string[][]\` binary matrix. Return area of largest rectangle containing only '1'.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return area of largest rectangle containing only '1'.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Treat each row as histogram heights of consecutive ones above it. For each row compute largest rectangle in histogram with monotonic stack; track global max.`,
    correctExplanation: `Treat each row as histogram heights of consecutive ones above it. For each row compute largest rectangle in histogram with monotonic stack; track global max.`,
    tests: [
      { input: [[['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]], expected: 6 },
      { input: [[['0']]], expected: 0 },
      { input: [[['1']]], expected: 1 },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-sudoku-solver-validity-0089',
    difficulty: 'insanelyHard',
    prompt: `Sudoku Solver Validity

What this question is asking:
- Given the provided input, compute true iff a valid complete solution exists.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: backtracking constraint-propagation

Implement \`solve(input)\` where \`input = string[][]\` 9x9 Sudoku board with '.' for empty. Fill board in-place conceptually and return true iff a valid complete solution exists.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return true iff a valid complete solution exists.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Backtrack selecting an empty cell, try digits respecting row/col/box constraints, and recurse. Use bitmasks/sets for fast validity checks.`,
    correctExplanation: `Backtrack selecting an empty cell, try digits respecting row/col/box constraints, and recurse. Use bitmasks/sets for fast validity checks.`,
    tests: [
      { input: [[['5', '3', '.', '.', '7', '.', '.', '.', '.'], ['6', '.', '.', '1', '9', '5', '.', '.', '.'], ['.', '9', '8', '.', '.', '.', '.', '6', '.'], ['8', '.', '.', '.', '6', '.', '.', '.', '3'], ['4', '.', '.', '8', '.', '3', '.', '.', '1'], ['7', '.', '.', '.', '2', '.', '.', '.', '6'], ['.', '6', '.', '.', '.', '.', '2', '8', '.'], ['.', '.', '.', '4', '1', '9', '.', '.', '5'], ['.', '.', '.', '.', '8', '.', '.', '7', '9']]], expected: true },
      { input: [[['5', '5', '.', '.', '7', '.', '.', '.', '.'], ['6', '.', '.', '1', '9', '5', '.', '.', '.'], ['.', '9', '8', '.', '.', '.', '.', '6', '.'], ['8', '.', '.', '.', '6', '.', '.', '.', '3'], ['4', '.', '.', '8', '.', '3', '.', '.', '1'], ['7', '.', '.', '.', '2', '.', '.', '.', '6'], ['.', '6', '.', '.', '.', '.', '2', '8', '.'], ['.', '.', '.', '4', '1', '9', '.', '.', '5'], ['.', '.', '.', '.', '8', '.', '.', '7', '9']]], expected: false },
      { input: [[['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.', '.', '.', '.', '.']]], expected: true },
    ],
  },
  {
    id: 'raw-coding-insanely-hard-count-smaller-after-self-0090',
    difficulty: 'insanelyHard',
    prompt: `Count of Smaller Numbers After Self

What this question is asking:
- Given the provided input, compute array where ans[i] is count of numbers smaller than nums[i] to its right.
- Solve exactly that contract, then optimize for the expected complexity.

Key definition(s):
- Use the exact input format from tests and compute exactly the requested result, not intermediate artifacts.

Type: fenwick-tree merge-sort-count

Implement \`solve(input)\` where \`input = number[]\`. Return array where ans[i] is count of numbers smaller than nums[i] to its right.

**Input Parameters (Detailed):**
- Use the exact input shape shown above and in the tests.
**Output Contract:**
- Return array where ans[i] is count of numbers smaller than nums[i] to its right.
**Implementation Notes:**
- Implement only \`solve(input)\` (single argument).
- Keep output shape exact (primitive vs array/object, ordering, and indexing rules).
- Handle edge cases from tests (empty input, minimal sizes, duplicates, and boundary values when applicable).

Clarified Deliverables:
- Restate the problem in your own words before coding so you are explicit about what must be computed.
- Use the exact input shape shown in this prompt/tests and return exactly the required output type/shape.
- Do not return helper/debug structures; return only the final expected value.

Implementation Expectations:
- Aim for an efficient algorithm appropriate for this difficulty (avoid brute force unless input size is trivially small).
- Validate boundary behavior: empty/minimal inputs, duplicates/repeats, sorted/unsorted extremes, and impossible cases when relevant.
- Keep the solution deterministic and stable with respect to ordering rules in the prompt.

Reasoning Guidance:
- Think in terms of state transitions/invariants for this pattern (window, graph frontier, DP state, stack monotonicity, etc.).
- Write down what each variable/data structure represents and why updates preserve correctness.
- Cross-check with provided examples/tests before finalizing.

Common Pitfalls To Avoid:
- Off-by-one mistakes (window bounds, 0-index vs 1-index, prefix lengths, inclusive/exclusive intervals).
- Violating output contract (wrong container type/order/format).
- Ignoring special-case behavior (zeros, negatives, duplicates, disconnected/empty structures).

Reference Strategy (Concise):
Use modified merge sort counting inversions per index or Fenwick tree with coordinate compression scanning right-to-left.`,
    correctExplanation: `Use modified merge sort counting inversions per index or Fenwick tree with coordinate compression scanning right-to-left.`,
    tests: [
      { input: [[5, 2, 6, 1]], expected: [2, 1, 1, 0] },
      { input: [[-1]], expected: [0] },
      { input: [[-1, -1]], expected: [0, 0] },
    ],
  },
]

export default data
