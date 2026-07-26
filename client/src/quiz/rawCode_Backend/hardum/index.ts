import type { RawCodingQuestionData } from '../../RawCodeManager'

const data: RawCodingQuestionData[] = [
  {
    id: 'raw-coding-backend-hard-authz-policy-0001',
    difficulty: 'hard',
    prompt:
      'Backend Coding Challenge (Authorization Policy)\n\nImplement solve(input) where input = { role: string, action: string, ownerId: string, resourceOwnerId: string }. Rules: admin allows all; editor allows read/update on any resource; viewer allows read only; any non-admin can delete only if ownerId equals resourceOwnerId.',
    correctExplanation:
      'Evaluate the role/action matrix in order. Admin is a shortcut: all actions are allowed. Editor can read and update any resource, but delete is only allowed when the caller owns the resource. Viewer can read only, and every other action is denied. The delete ownership rule applies to all non-admin roles, so even an editor must own the resource to delete it. Example: editor + update should pass, viewer + update should fail, and editor + delete only passes when ownerId matches resourceOwnerId.',
    tests: [
      { input: [{ role: 'admin', action: 'delete', ownerId: 'u1', resourceOwnerId: 'u2' }], expected: true },
      { input: [{ role: 'editor', action: 'update', ownerId: 'u1', resourceOwnerId: 'u2' }], expected: true },
      { input: [{ role: 'viewer', action: 'update', ownerId: 'u1', resourceOwnerId: 'u1' }], expected: false },
      { input: [{ role: 'editor', action: 'delete', ownerId: 'u1', resourceOwnerId: 'u1' }], expected: true },
      { input: [{ role: 'editor', action: 'delete', ownerId: 'u1', resourceOwnerId: 'u9' }], expected: false },
    ],
  },
  {
    id: 'raw-coding-backend-hard-lock-leases-0002',
    difficulty: 'hard',
    prompt:
      'Backend Coding Challenge (Lock Lease Validity)\n\nImplement solve(input) where input = { now: number, leases: { resource: string, owner: string, expiresAt: number }[] }. Return Record<string, string | null> mapping each resource to active owner or null when expired. If multiple active leases exist for same resource, keep the one with latest expiresAt.',
    correctExplanation:
      'Filter leases where expiresAt > now (strictly active), then choose one owner per resource by max expiresAt. Expired entries map to null if no active lease remains for that resource. This models lease takeover with last-valid-until precedence.',
    tests: [
      { input: [{ now: 100, leases: [{ resource: 'r1', owner: 'a', expiresAt: 90 }, { resource: 'r1', owner: 'b', expiresAt: 130 }, { resource: 'r2', owner: 'c', expiresAt: 120 }] }], expected: { r1: 'b', r2: 'c' } },
      { input: [{ now: 50, leases: [{ resource: 'x', owner: 'o1', expiresAt: 60 }, { resource: 'x', owner: 'o2', expiresAt: 55 }] }], expected: { x: 'o1' } },
      { input: [{ now: 10, leases: [{ resource: 'q', owner: 'z', expiresAt: 10 }] }], expected: { q: null } },
    ],
  },
  {
    id: 'raw-coding-backend-hard-retry-backoff-0003',
    difficulty: 'hard',
    prompt:
      'Backend Coding Challenge (Retry Backoff Schedule)\n\nImplement solve(input) where input = { baseMs: number, factor: number, attempts: number, maxMs: number }. Return retry delays array length attempts where delay_i = min(maxMs, baseMs * factor^i).',
    correctExplanation:
      'Generate attempts delays by exponentiating factor from 0..attempts-1, cap each delay by maxMs, and preserve order. This is classic exponential backoff with ceiling.',
    tests: [
      { input: [{ baseMs: 100, factor: 2, attempts: 5, maxMs: 1000 }], expected: [100, 200, 400, 800, 1000] },
      { input: [{ baseMs: 50, factor: 3, attempts: 4, maxMs: 200 }], expected: [50, 150, 200, 200] },
      { input: [{ baseMs: 10, factor: 2, attempts: 0, maxMs: 100 }], expected: [] },
    ],
  },
  {
    id: 'raw-coding-backend-hard-queue-drain-plan-0004',
    difficulty: 'hard',
    prompt:
      'Backend Coding Challenge (Queue Drain Plan)\n\nYou are writing a job scheduler that drains a work queue in batches to avoid overloading downstream services. Each job has a cost, and each drain cycle has a fixed budget.\n\nImplement solve(input) where input = { jobs: { id: string, cost: number }[], budget: number }.\n\nReturn an array of job id arrays, one array per drain cycle. In each cycle, take jobs from the front in order until adding the next job would exceed the budget. Then start a new cycle with the remaining jobs. Every job must appear exactly once, and the original order must be preserved.\n\nThis is a greedy batching problem that mirrors queue draining and rate-limited work execution.',
    correctExplanation:
      'Walk the jobs from left to right and accumulate a running cost for the current batch. If the next job would exceed the budget, close the current batch and start a new one. Continue until every job has been assigned. Because the input order must be preserved, this is a straightforward greedy partitioning pass.',
    tests: [
      { input: [{ jobs: [{ id: 'a', cost: 2 }, { id: 'b', cost: 3 }, { id: 'c', cost: 4 }, { id: 'd', cost: 1 }], budget: 5 }], expected: [['a', 'b'], ['c', 'd']] },
      { input: [{ jobs: [{ id: 'x', cost: 6 }, { id: 'y', cost: 1 }], budget: 5 }], expected: [['x'], ['y']] },
      { input: [{ jobs: [], budget: 10 }], expected: [] },
    ],
  },
]

export default data
