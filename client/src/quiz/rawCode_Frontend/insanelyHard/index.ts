import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-frontend-insanely-hard-list-window-0001',
    difficulty: 'insanelyHard',
    prompt:
      'Frontend Coding Challenge (Virtual List Window)\n\nYou are building a virtualized list renderer for a large feed. Only a small contiguous range of rows should be rendered based on scroll position.\n\nImplement solve(input) where input = { total: number, itemHeight: number, viewportHeight: number, scrollTop: number, overscan: number }.\n\nReturn [startIndex, endIndex] (inclusive) for the rows to render.\n\nRequirements:\n- Compute visible range using fixed-height rows.\n- Expand visible range by overscan rows on both top and bottom.\n- Clamp final indexes to valid bounds [0, total - 1].\n- If total <= 0, return [-1, -1].\n- Treat output as inclusive bounds, not a half-open range.\n\nExample intuition:\nIf rows 10..14 are visible and overscan is 2, render 8..16 (then clamp if needed).',
    correctExplanation:
      'Think in terms of row indexes, not pixels. First compute the first visible index as floor(scrollTop / itemHeight). Then compute the last visible index as floor((scrollTop + viewportHeight - 1) / itemHeight). Expand both sides by overscan, then clamp the start to 0 and the end to total - 1. Return the inclusive pair [startIndex, endIndex]. Example: total=100, itemHeight=20, viewportHeight=100, scrollTop=0, overscan=2 gives visible rows 0..4, expanded to 0..6.',
    tests: [
      { input: [{ total: 100, itemHeight: 20, viewportHeight: 100, scrollTop: 0, overscan: 2 }], expected: [0, 6] },
      { input: [{ total: 50, itemHeight: 10, viewportHeight: 35, scrollTop: 120, overscan: 1 }], expected: [11, 16] },
      { input: [{ total: 5, itemHeight: 30, viewportHeight: 90, scrollTop: 60, overscan: 3 }], expected: [0, 4] },
    ],
  },
  {
    id: 'raw-coding-frontend-insanely-hard-render-batch-groups-0002',
    difficulty: 'insanelyHard',
    prompt:
      'Frontend Coding Challenge (Render Batch Groups)\n\nYou are implementing cooperative rendering where a long list of component IDs is processed in small chunks to keep the UI responsive.\n\nImplement solve(input) where input = { ids: string[], batchSize: number }.\n\nReturn string[][] where:\n- Each inner array is one render batch.\n- Batch size is at most batchSize.\n- Original order is preserved exactly.\n- All IDs appear exactly once across batches.\n\nEdge cases and constraints:\n- If ids is empty, return [].\n- If batchSize is larger than ids.length, return a single batch with all ids.\n- Assume batchSize is a positive integer.\n\nThis is an array chunking problem with strict order preservation.',
    correctExplanation:
      'Chunk the array into consecutive slices of batchSize. Keep order and include a final short batch when remainder exists. This is common for incremental rendering or work scheduling.',
    tests: [
      { input: [{ ids: ['a', 'b', 'c', 'd', 'e'], batchSize: 2 }], expected: [['a', 'b'], ['c', 'd'], ['e']] },
      { input: [{ ids: ['x'], batchSize: 3 }], expected: [['x']] },
      { input: [{ ids: [], batchSize: 4 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-frontend-insanely-hard-scroll-anchor-adjust-0003',
    difficulty: 'insanelyHard',
    prompt:
      'Frontend Coding Challenge (Scroll Anchor Adjust)\n\nYou are fixing scroll jump in a dynamic list where item heights are remeasured after data or font changes. The user should keep seeing the same anchor item at the same visual spot.\n\nImplement solve(input) where input = { oldHeights: number[], newHeights: number[], anchorIndex: number, oldScrollTop: number }.\n\nReturn newScrollTop such that the item at anchorIndex keeps the same viewport offset after height updates above it.\n\nRules:\n- Only height differences for items strictly above anchorIndex affect the adjustment.\n- Height changes at anchorIndex or below do not move the anchor position.\n- Use: newScrollTop = oldScrollTop + (newAbove - oldAbove), where oldAbove/newAbove are sums of heights [0..anchorIndex-1].\n- If anchorIndex is 0, return oldScrollTop.\n\nAssume oldHeights and newHeights align by index and contain non-negative numbers.',
    correctExplanation:
      'Compute total height above anchor before and after: sum oldHeights[0..anchorIndex-1] and newHeights[0..anchorIndex-1]. Adjust scroll by delta = newAbove - oldAbove. newScrollTop = oldScrollTop + delta.',
    tests: [
      { input: [{ oldHeights: [20, 20, 20], newHeights: [30, 20, 20], anchorIndex: 2, oldScrollTop: 40 }], expected: 50 },
      { input: [{ oldHeights: [10, 10], newHeights: [10, 10], anchorIndex: 1, oldScrollTop: 5 }], expected: 5 },
      { input: [{ oldHeights: [15, 15, 15], newHeights: [10, 20, 15], anchorIndex: 0, oldScrollTop: 12 }], expected: 12 },
    ],
  },
  {
    id: 'raw-coding-frontend-insanely-hard-sticky-header-map-0004',
    difficulty: 'insanelyHard',
    prompt:
      'Frontend Coding Challenge (Sticky Header Map)\n\nYou are building a long document viewer with section headers that become sticky as the user scrolls. For each scroll position, the UI needs to know which section header should be pinned to the top.\n\nImplement solve(input) where input = { sections: { title: string, start: number, end: number }[], scrollPositions: number[] }.\n\nReturn an array of titles, one per scroll position, indicating the active section at that scroll offset. A section is active when start <= scrollPosition <= end. If no section matches, return null for that position. If multiple sections overlap, choose the one with the highest start value.\n\nThis models a sticky navigation lookup with overlap resolution.',
    correctExplanation:
      'For each scroll position, inspect all sections whose range contains that position. If several sections overlap, choose the one with the greatest start value so the deepest nested section wins. If no section contains the scroll position, return null. This is a range lookup with a deterministic tie-breaker.',
    tests: [
      { input: [{ sections: [{ title: 'Intro', start: 0, end: 99 }, { title: 'Guide', start: 100, end: 199 }, { title: 'API', start: 180, end: 260 }], scrollPositions: [0, 150, 190, 300] }], expected: ['Intro', 'Guide', 'API', null] },
      { input: [{ sections: [{ title: 'A', start: 0, end: 10 }, { title: 'B', start: 5, end: 15 }], scrollPositions: [7] }], expected: ['B'] },
      { input: [{ sections: [], scrollPositions: [1, 2, 3] }], expected: [null, null, null] },
    ],
  },
  {
    id: 'raw-coding-frontend-insanely-hard-react-suspense-waterfall-0005',
    difficulty: 'insanelyHard',
    prompt:
      'React Coding Challenge (Suspense Waterfall Time)\n\nImplement solve(input) where input = { chainMs: number[] }. Each component suspends until its own data resolves, but child request starts only after parent resolves (waterfall). Return total render-ready time in ms.',
    correctExplanation:
      'In a strict waterfall, latencies add. Sum all chain durations to get total time until deepest child can render.',
    tests: [
      { input: [{ chainMs: [100, 200, 50] }], expected: 350 },
      { input: [{ chainMs: [20] }], expected: 20 },
      { input: [{ chainMs: [] }], expected: 0 },
    ],
  },
  {
    id: 'raw-coding-frontend-insanely-hard-vue-flush-order-0006',
    difficulty: 'insanelyHard',
    prompt:
      'Vue Coding Challenge (Watcher Flush Order)\n\nImplement solve(input) where input = { pre: string[], post: string[], sync: string[] }. Return execution order for one tick assuming sync watchers run immediately in input order, then pre queue, then post queue.',
    correctExplanation:
      'Vue flush phases are deterministic. Compose final order as [...sync, ...pre, ...post] preserving relative order inside each phase.',
    tests: [
      { input: [{ pre: ['p1', 'p2'], post: ['o1'], sync: ['s1'] }], expected: ['s1', 'p1', 'p2', 'o1'] },
      { input: [{ pre: [], post: ['o1', 'o2'], sync: [] }], expected: ['o1', 'o2'] },
      { input: [{ pre: ['p'], post: [], sync: ['s1', 's2'] }], expected: ['s1', 's2', 'p'] },
    ],
  },
]

export default data
