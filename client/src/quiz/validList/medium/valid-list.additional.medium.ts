const data = [
  {
    id: 'medium-valid-list-scale-signals-9',
    difficulty: 'medium',
    prompt: 'Select all signals that usually indicate a system needs horizontal scaling.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Horizontal scaling becomes attractive when a service is CPU-bound, request queues are growing, or a single node cannot absorb peak traffic reliably.',
    validList: {
      helperText: 'Choose every sign that scaling out is probably the right direction.',
      items: [
        'CPU saturation on app instances during peak traffic',
        'Request queues growing faster than workers can drain them',
        'A single node cannot meet availability targets alone',
        'Traffic spikes require adding more identical stateless instances',
        'Every request is already fully idle and cheap',
        'No bottleneck exists anywhere in the path',
        'The team wants to avoid all operational complexity forever',
        'The workload is strictly write-only and tiny',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
  {
    id: 'medium-valid-list-search-design-9',
    difficulty: 'medium',
    prompt: 'Select all design choices that are usually valid for a large search service.',
    options: ['Correct subset selected', 'Incorrect subset selected'],
    correctIndex: 0,
    correctExplanation:
      'Large search systems typically shard indexes, cache popular queries, and decouple indexing with a queue or stream.',
    validList: {
      helperText: 'Pick every choice that supports scalable search.',
      items: [
        'Partition the index into shards',
        'Cache hot query results',
        'Buffer indexing writes through a queue or stream',
        'Maintain metadata in a separate database',
        'Store all search data in one giant table with no partitioning',
        'Reject all read traffic until indexing is complete',
        'Remove query caching to ensure every search is unique',
        'Only allow one process to own the entire index',
      ],
      validIndices: [0, 1, 2, 3],
    },
  },
]

export default data