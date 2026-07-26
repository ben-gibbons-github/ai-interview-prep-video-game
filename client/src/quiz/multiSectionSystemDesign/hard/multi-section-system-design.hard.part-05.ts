const data = [
  {
      id: 'hard-multi-section-system-design-video-transcoding',
      difficulty: 'hard',
      prompt:
        'Design a cloud video transcoding platform processing 2.5M uploads/day with median start time under 20s and cost-aware autoscaling. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define ingest/output contracts first, then set latency/cost objectives, then design queueing, worker scheduling, and codec pipeline choices. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Cloud Video Transcoding Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
        scenarioSummary:
          'Large asynchronous media pipeline with predictable turnaround times and efficient compute utilization. with clear trade-offs and explicit operational constraints with clear trade-of',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'transcode-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
            title: 'Phase 1 - Functional requirements: job contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
            prompt: 'What should be explicit first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
            options: [
              'Input/output profile contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'UI progress bar first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
              'Theme system first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Billing page first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'CDN setup first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'No job contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
          ],
          correctIndex: 0,
            helperText: 'Profile contracts define the whole pipeline.',
          },
          {
            id: 'transcode-functional-retries',
            title: 'Phase 1 - Functional requirements: retry semantics',
            prompt: 'How should failed jobs retry?',
            options: [
  
  
              'Idempotent queued retries.',
              'Budgeted queued retries. w',
              'Priority-aware queued with',
              'Delayed queued retries. wi',
              'Shard-local queued with cl',
              'Backoff-driven queued with',
          ],
          correctIndex: 0,
            helperText: 'Retries must be safe and controlled.',
          },
          {
            id: 'transcode-nfr-targets',
            title: 'Phase 2 - Non-functional requirements: target metrics',
            prompt: 'Which target set is best?',
            options: [
  
  
              'Latency + cost + success SLOs.',
              'Latency + quality + success wi',
              'Queue + cost + success SLOs. w',
              'Latency + cost + freshness wit',
              'Throughput + cost + success wi',
              'Latency + cost + durability wi',
          ],
          correctIndex: 0,
            helperText: 'Need balanced targets for performance and cost.',
          },
          {
            id: 'transcode-capacity-queueing',
            title: 'Phase 3 - Scaling and capacity: queue strategy',
            prompt: 'How should jobs be queued?',
            options: [
  
  
              'Priority queues by SLA tier.',
              'One global FIFO. with clear.',
              'No durable queue. with clear',
              'Per-worker local queue. with',
              'Client-side queue. with clea',
              'Queue in cron files. with cl',
          ],
          correctIndex: 0,
            helperText: 'Priority queues protect paid and urgent workloads.',
          },
          {
            id: 'transcode-capacity-scheduling',
            title: 'Phase 3 - Scaling and capacity: worker scheduling',
            prompt: 'Best scheduling approach?',
            options: [
  
  
              'Bin-pack by codec profile.',
              'Random worker pick. with c',
              'First worker always. with.',
              'Manual assignment. with cl',
              'No scheduler logic. with c',
              'Region-agnostic only. with',
          ],
          correctIndex: 0,
            helperText: 'Profile-aware scheduling improves utilization.',
          },
          {
            id: 'transcode-architecture-storage',
            title: 'Phase 4 - Architecture decisions: media storage',
            prompt: 'How should artifacts be stored?',
            options: [
  
  
              'Object storage + manifest.',
              'Worker local disk only. wi',
              'Single DB blob store. with',
              'Client storage only. with.',
              'No manifest layer. with cl',
              'Temp files forever. with c',
          ],
          correctIndex: 0,
            helperText: 'Object storage with manifests is standard at scale.',
          },
          {
            id: 'transcode-deep-dive-quality',
            title: 'Phase 5 - Component deep dive: output quality',
            prompt: 'How should quality be validated?',
            options: [
  
  
              'Automated perceptual checks.',
              'Automated bitrate regression',
              'Automated decode regression.',
              'Automated frame regression..',
              'Automated manifest regressio',
              'Automated duration regressio',
          ],
          correctIndex: 0,
            helperText: 'Need objective quality gates before publish.',
          },
          {
            id: 'transcode-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What metrics matter most?',
            options: [
  
  
              'Queue delay + fail rate + cost/job.',
              'Queue age + fail rate + cost/job. w',
              'Start lag + fail rate + cost/job. w',
              'Queue delay + retry rate + with cle',
              'Queue delay + timeout rate + with c',
              'Queue delay + spot loss + cost/job.',
          ],
          correctIndex: 0,
            helperText: 'Need latency, reliability, and unit-cost visibility.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-event-bus',
      difficulty: 'hard',
      prompt:
        'Design a backend event bus for microservices handling 2M events/s with ordered delivery per key, replay support, and strict schema governance. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and exp'],
      correctIndex: 0,
      correctExplanation:
        'Strong backend answers define delivery and ordering semantics first, then set reliability SLOs, then design partitioning, consumer behavior, and schema evolution controls. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Backend Event Bus Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
        scenarioSummary:
          'High-throughput event backbone with key ordering, durable replay, and producer/consumer contract safety. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'be-bus-functional-semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
            title: 'Phase 1 - Functional requirements: delivery semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and',
            prompt: 'What should be fixed first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
            options: [
              'At-least-once + key order. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Topic colors first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
              'UI chart first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
              'Weekly export first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'No semantic contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
              'Only best effort. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
          ],
          correctIndex: 0,
            helperText: 'Semantics drive producer and consumer guarantees.',
          },
          {
            id: 'be-bus-functional-schema',
            title: 'Phase 1 - Functional requirements: schema policy',
            prompt: 'How should schemas be handled?',
            options: [
  
  
              'Versioned registry + checks.',
              'Raw JSON always. with clear.',
              'No schema validation. with c',
              'Client decides schema. with.',
              'Manual docs only. with clear',
              'One schema forever. with cle',
          ],
          correctIndex: 0,
            helperText: 'Schema governance prevents breaking changes.',
          },
          {
            id: 'be-bus-nfr-reliability',
            title: 'Phase 2 - Non-functional requirements: reliability',
            prompt: 'Which SLO set is best?',
            options: [
  
  
              'Durability + lag + drop rate.',
              'Only throughput. with clear t',
              'Only p50 latency. with clear.',
              'No reliability SLO. with clea',
              'Only CPU usage. with clear tr',
              'Only topic count. with clear.',
          ],
          correctIndex: 0,
            helperText: 'Bus health needs delivery correctness visibility.',
          },
          {
            id: 'be-bus-capacity-partitions',
            title: 'Phase 3 - Scaling and capacity: partitioning',
            prompt: 'How should partitions be keyed?',
            options: [
  
  
              'Domain key hashing.',
              'Single partition. w',
              'Random partition. w',
              'Client free choice.',
              'Time-only buckets..',
              'No partitioning. wi',
          ],
          correctIndex: 0,
            helperText: 'Keyed partitioning preserves local order at scale.',
          },
          {
            id: 'be-bus-capacity-backpressure',
            title: 'Phase 3 - Scaling and capacity: consumer lag',
            prompt: 'How to handle slow consumers?',
            options: [
  
  
              'Backpressure + lag alerts.',
              'Drop lagging consumers. wi',
              'Pause producers always. wi',
              'Ignore lag forever. with c',
              'Manual restart only. with.',
              'No lag tracking. with clea',
          ],
          correctIndex: 0,
            helperText: 'Need controlled pressure and observability.',
          },
          {
            id: 'be-bus-architecture-replay',
            title: 'Phase 4 - Architecture decisions: replay model',
            prompt: 'Best replay approach?',
            options: [
  
  
              'Offset checkpoint replay.',
              'No replay support. with c',
              'Replay by logs only. with',
              'Manual DB backfill. with.',
              'Full history delete. with',
              'Producer-side replay. wit',
          ],
          correctIndex: 0,
            helperText: 'Offset-driven replay is predictable and safe.',
          },
          {
            id: 'be-bus-deep-dive-dlq',
            title: 'Phase 5 - Component deep dive: poison messages',
            prompt: 'How should bad events be handled?',
            options: [
  
  
              'DLQ + retry budget.',
              'Infinite retries. w',
              'Drop silently. with',
              'Crash consumer. wit',
              'Manual grep only. w',
              'Block whole topic..',
          ],
          correctIndex: 0,
            helperText: 'DLQ isolates failures without global outages.',
          },
          {
            id: 'be-bus-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be monitored?',
            options: [
  
  
              'Lag + retries + schema errors.',
              'Only brokers up. with clear tr',
              'Only message count. with clear',
              'Only storage usage. with clear',
              'Only producer CPU. with clear.',
              'Only p50 latency. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Need correctness and operability metrics.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-api-gateway',
      difficulty: 'hard',
      prompt:
        'Design a backend API gateway for 800k RPS with authn/authz enforcement, per-tenant rate limits, and safe canary rollouts. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad'],
      correctIndex: 0,
      correctExplanation:
        'Great answers define gateway contracts and security first, then set latency and availability budgets, then design policy evaluation, routing, and resilience. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Backend API Gateway with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
        scenarioSummary:
          'Central traffic control plane for auth, limits, policy checks, and progressive backend routing. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'be-gw-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
            title: 'Phase 1 - Functional requirements: request contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
            prompt: 'What should be explicit first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
            options: [
              'Auth + routing contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
              'Auth + policy contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Auth + quota contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Auth + identity contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Auth + retry contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Auth + tenancy contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
          ],
          correctIndex: 0,
            helperText: 'Gateway behavior must be deterministic and documented.',
          },
          {
            id: 'be-gw-functional-limits',
            title: 'Phase 1 - Functional requirements: rate limiting',
            prompt: 'Best limit model?',
            options: [
  
  
              'Per-tenant token buckets.',
              'Global single limit. with',
              'No limit controls. with c',
              'Manual bans only. with cl',
              'Fixed sleep per call. wit',
              'Client self-limits. with.',
          ],
          correctIndex: 0,
            helperText: 'Tenant-aware limiting protects fairness.',
          },
          {
            id: 'be-gw-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: latency',
            prompt: 'How should latency be budgeted?',
            options: [
  
  
              'Gateway overhead budget.',
              'Gateway tail-latency wit',
              'Gateway saturation with.',
              'Gateway retry-latency wi',
              'Gateway auth-latency wit',
              'Gateway routing-latency.',
          ],
          correctIndex: 0,
            helperText: 'Gateway adds hops and must have strict budgets.',
          },
          {
            id: 'be-gw-capacity-routing',
            title: 'Phase 3 - Scaling and capacity: routing model',
            prompt: 'How should traffic route?',
            options: [
  
  
              'Stateless edge + service map.',
              'Stateless edge + route cache.',
              'Policy edge + service map. wi',
              'Auth edge + service map. with',
              'Quota edge + service map. wit',
              'Canary edge + service map. wi',
          ],
          correctIndex: 0,
            helperText: 'Stateless gateways scale and simplify failover.',
          },
          {
            id: 'be-gw-capacity-canary',
            title: 'Phase 3 - Scaling and capacity: canary rollout',
            prompt: 'How should canaries run?',
            options: [
  
  
              'Weighted traffic shifting.',
              'All-or-nothing deploy. wit',
              'Random full redirect. with',
              'Manual host edits. with cl',
              'No rollback controls. with',
              'Canary by time only. with.',
          ],
          correctIndex: 0,
            helperText: 'Weighted control enables safe progressive rollout.',
          },
          {
            id: 'be-gw-architecture-policy',
            title: 'Phase 4 - Architecture decisions: policy checks',
            prompt: 'Where should policies run?',
            options: [
  
  
              'In-gateway policy engine.',
              'Backend-only checks. with',
              'Client-only checks. with.',
              'Manual audits only. with.',
              'No unified policy. with c',
              'Spreadsheet allowlist. wi',
          ],
          correctIndex: 0,
            helperText: 'Centralized policy enforcement improves consistency.',
          },
          {
            id: 'be-gw-deep-dive-resilience',
            title: 'Phase 5 - Component deep dive: resilience',
            prompt: 'Best resilience pattern?',
            options: [
  
  
              'Circuit break + timeout budget.',
              'Retry budget + timeout budget..',
              'Hedged reads + timeout budget..',
              'Adaptive shed + timeout budget.',
              'Bulkhead pool + timeout budget.',
              'Health probe + timeout budget..',
          ],
          correctIndex: 0,
            helperText: 'Bounded retries and breakers prevent cascades.',
          },
          {
            id: 'be-gw-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be tracked?',
            options: [
  
  
              'p99 + 4xx/5xx + limit hits.',
              'p95 + 4xx/5xx + limit hits.',
              'p99 + auth denials + limit.',
              'p99 + retry storms + limit.',
              'p99 + route shifts + limit.',
              'p99 + policy errors + with.',
          ],
          correctIndex: 0,
            helperText: 'Need user impact and policy-impact metrics.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-rendering-platform',
      difficulty: 'hard',
      prompt:
        'Design a frontend rendering platform for a large web app with 150M MAU, sub-2.5s LCP on mid-tier devices, and safe incremental migration from legacy pages. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr'],
      correctIndex: 0,
      correctExplanation:
        'Strong frontend answers define rendering and hydration contracts first, then set Core Web Vitals SLOs, then design bundling, caching, and rollout strategy. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Frontend Rendering Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
        scenarioSummary:
          'Modern web rendering architecture balancing SSR/CSR tradeoffs, bundle control, and progressive migration. with clear trade-offs and explicit operational constraints with clear trade',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'fe-render-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
            title: 'Phase 1 - Functional requirements: rendering contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
            prompt: 'What should be locked first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
            options: [
              'SSR/CSR route contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Button style tokens. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Icon set first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Marketing copy first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'No route contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Theme switch first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
          ],
          correctIndex: 0,
            helperText: 'Route-level rendering policy drives architecture.',
          },
          {
            id: 'fe-render-functional-hydration',
            title: 'Phase 1 - Functional requirements: hydration behavior',
            prompt: 'How should hydration be handled?',
            options: [
  
  
              'Selective progressive hydration.',
              'Hydrate everything instantly. wi',
              'No hydration checks. with clear.',
              'Client-only rerender. with clear',
              'Manual hydration toggles. with c',
              'Hydration by cron. with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Selective hydration reduces main-thread pressure.',
          },
          {
            id: 'fe-render-nfr-web-vitals',
            title: 'Phase 2 - Non-functional requirements: UX metrics',
            prompt: 'Which targets are best?',
            options: [
  
  
              'LCP/INP/CLS SLOs.',
              'Only p50 load wit',
              'No UX SLOs. with.',
              'Only bundle size.',
              'Only FPS. with cl',
              'Only TTFB. with c',
          ],
          correctIndex: 0,
            helperText: 'Core Web Vitals are the right user-centric targets.',
          },
          {
            id: 'fe-render-capacity-bundles',
            title: 'Phase 3 - Scaling and capacity: bundle strategy',
            prompt: 'How should code split?',
            options: [
  
  
              'Route and island splitting.',
              'Single giant bundle. with c',
              'No lazy loading. with clear',
              'One bundle per team. with c',
              'Random split points. with c',
              'Split by file size only. wi',
          ],
          correctIndex: 0,
            helperText: 'Intentional split points control startup cost.',
          },
          {
            id: 'fe-render-capacity-cache',
            title: 'Phase 3 - Scaling and capacity: asset caching',
            prompt: 'Best static asset caching model?',
            options: [
  
  
              'Hashed assets + long TTL.',
              'No cache headers. with cl',
              'Short TTL always. with cl',
              'Manual cache busting. wit',
              'Single unversioned file..',
              'Cache by referrer. with c',
          ],
          correctIndex: 0,
            helperText: 'Content hashing enables safe long-lived caching.',
          },
          {
            id: 'fe-render-architecture-migration',
            title: 'Phase 4 - Architecture decisions: migration path',
            prompt: 'How should legacy migration happen?',
            options: [
  
  
              'Strangler route migration.',
              'Big-bang rewrite. with cle',
              'Freeze all features. with.',
              'Parallel full apps with cl',
              'Manual copy-paste migratio',
              'No migration plan. with cl',
          ],
          correctIndex: 0,
            helperText: 'Strangler migration reduces risk and downtime.',
          },
          {
            id: 'fe-render-deep-dive-resilience',
            title: 'Phase 5 - Component deep dive: frontend resilience',
            prompt: 'How should failures degrade?',
            options: [
  
  
              'Error boundaries + fallbacks.',
              'White screen on error. with c',
              'Crash full app. with clear tr',
              'Reload loop. with clear trade',
              'No runtime guards. with clear',
              'Manual refresh prompts. with.',
          ],
          correctIndex: 0,
            helperText: 'Graceful fallback protects core user journeys.',
          },
          {
            id: 'fe-render-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be tracked most?',
            options: [
  
  
              'Vitals + JS errors + route p95.',
              'Vitals + route shifts + route w',
              'Vitals + cache misses + route w',
              'Vitals + hydration stalls + wit',
              'Vitals + CPU stalls + route p95',
              'Vitals + API stalls + route p95',
          ],
          correctIndex: 0,
            helperText: 'Need user performance and runtime stability metrics.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-realtime-collab-ui',
      difficulty: 'hard',
      prompt:
        'Design a frontend real-time collaboration UI framework (docs/boards) with 500 concurrent editors per shard, low conflict UX, and smooth mobile performance. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit'],
      correctIndex: 0,
      correctExplanation:
        'Great frontend answers define local-first editing semantics first, then set interaction latency targets, then design state sync, conflict UX, and rendering performance controls. with clear trade-offs wi',
      multiSectionSystemDesign: {
        title: 'Frontend Real-Time Collaboration UI with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational w',
        scenarioSummary:
          'Conflict-aware, low-latency collaborative interfaces with optimistic updates and stable rendering under burst edits. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'fe-collab-functional-local-first with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with',
            title: 'Phase 1 - Functional requirements: editing semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and with.',
            prompt: 'What should be explicit first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with c',
            options: [
              'Local-first edit contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with clear',
              'Cursor color palette. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
              'Avatar style first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with.',
              'Theme presets first. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
              'No edit contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with wi',
              'Server-only edits. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with w',
          ],
          correctIndex: 0,
            helperText: 'Local-first behavior defines perceived responsiveness.',
          },
          {
            id: 'fe-collab-functional-conflicts',
            title: 'Phase 1 - Functional requirements: conflict UX',
            prompt: 'How should conflicts be surfaced?',
            options: [
  
  
              'Inline conflict indicators.',
              'Silent auto-overwrite. with',
              'Full page reload. with clea',
              'Manual merge modal only. wi',
              'No conflict signals. with c',
              'Email conflict alerts. with',
          ],
          correctIndex: 0,
            helperText: 'Users need immediate, contextual conflict feedback.',
          },
          {
            id: 'fe-collab-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: interaction latency',
            prompt: 'Best UX latency target?',
            options: [
  
  
              'Sub-100ms local feedback.',
              'Under 2s is fine. with cl',
              'No latency target. with c',
              'Only sync latency. with c',
              'Only backend p95. with cl',
              'Only startup target. with',
          ],
          correctIndex: 0,
            helperText: 'Instant local response is mandatory for editing UX.',
          },
          {
            id: 'fe-collab-capacity-state',
            title: 'Phase 3 - Scaling and capacity: state model',
            prompt: 'How should client state be modeled?',
            options: [
  
  
              'Patch stream + snapshots.',
              'Full doc per keystroke. w',
              'No local state. with clea',
              'DOM as source of truth. w',
              'Only polling sync. with c',
              'Global mutable singleton.',
          ],
          correctIndex: 0,
            helperText: 'Patch models reduce payload and rerender cost.',
          },
          {
            id: 'fe-collab-capacity-rendering',
            title: 'Phase 3 - Scaling and capacity: rendering performance',
            prompt: 'How to keep rendering smooth?',
            options: [
  
  
              'Virtualization + memoization.',
              'Rerender whole tree. with cle',
              'Disable diffing. with clear t',
              'Paint every event. with clear',
              'No perf profiling. with clear',
              'Inline all state globally. wi',
          ],
          correctIndex: 0,
            helperText: 'Scoped rerenders are essential during bursts.',
          },
          {
            id: 'fe-collab-architecture-sync',
            title: 'Phase 4 - Architecture decisions: sync strategy',
            prompt: 'Which sync strategy fits best?',
            options: [
  
  
              'OT/CRDT with optimistic UI.',
              'Last-write-wins only. with.',
              'Manual merge only. with cle',
              'Single editor lock. with cl',
              'Sync by periodic full save.',
              'No sync conflict model. wit',
          ],
          correctIndex: 0,
            helperText: 'Need deterministic merges with responsive local UX.',
          },
          {
            id: 'fe-collab-deep-dive-offline',
            title: 'Phase 5 - Component deep dive: offline editing',
            prompt: 'How should offline edits work?',
            options: [
  
  
              'Local queue + replay merge.',
              'Disable editing offline. wi',
              'Drop offline edits. with cl',
              'Read-only offline mode with',
              'Manual export/import. with.',
              'No reconnect logic. with cl',
          ],
          correctIndex: 0,
            helperText: 'Queued local edits preserve user intent.',
          },
          {
            id: 'fe-collab-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What frontend signals matter most?',
            options: [
  
  
              'Input lag + conflict rate + FPS.',
              'Only active editors. with clear.',
              'Only bundle size. with clear tra',
              'Only API success. with clear tra',
              'Only memory usage. with clear tr',
              'Only session length. with clear.',
          ],
          correctIndex: 0,
            helperText: 'Need interaction quality and conflict visibility.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-multi-tenant-analytics',
      difficulty: 'hard',
      prompt:
        'Design a multi-tenant backend analytics platform for B2B customers ingesting 1.2M events/s. Tenants need ad-hoc queries over 13 months of data, p95 query latency under 4s, strict tenant isolation, and predictable cost controls. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit'],
      correctIndex: 0,
      correctExplanation:
        'Real interview answers start with data contracts and isolation requirements, then define SLOs and cost guardrails, then pick storage/indexing and workload management strategies. with clear trade-offs wi',
      multiSectionSystemDesign: {
        title: 'Multi-Tenant Analytics Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with.',
        scenarioSummary:
          'Large-scale event ingestion and query serving with strong tenant isolation and bounded query cost. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with clea',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'analytics-functional-data-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational wi',
            title: 'Phase 1 - Functional requirements: data model contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and wit',
            prompt: 'What should be agreed on before architecture? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit wit',
            options: [
              'Event schema ownership and evolution policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with',
              'Metric ownership and query defaults. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Single-cloud deployment strategy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational wit',
              'Warehouse tenancy operating model. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational wi',
              'SQL dialect governance policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with c',
              'Daily ingest volume forecast. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with cl',
          ],
          correctIndex: 0,
            helperText: 'Schema governance prevents ingestion and query breakage.',
          },
          {
            id: 'analytics-functional-tenant-isolation',
            title: 'Phase 1 - Functional requirements: isolation semantics',
            prompt: 'Which tenant isolation requirement is most important?',
            options: [
  
  
              'Hard isolation for data, metadata, and access paths.',
              'Shared dashboards plus scoped roles. with clear trad',
              'Tiered isolation by tenant class. with clear trade-o',
              'Delayed isolation after launch. with clear trade-off',
              'Gateway-layer isolation controls. with clear trade-o',
              'Cost-aware isolation controls. with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Isolation must cover storage, compute, and auth.',
          },
          {
            id: 'analytics-nfr-slos',
            title: 'Phase 2 - Non-functional requirements: service targets',
            prompt: 'What is the most realistic target set?',
            options: [
  
  
              'Ingest freshness, p95 query latency, and error-budget SLOs.',
              'Global average query latency SLO. with clear trade-offs and',
              'Ingest throughput plus freshness SLO. with clear trade-offs',
              'Quarterly-tuned operational SLOs. with clear trade-offs and',
              'Median query latency SLO. with clear trade-offs and explici',
              'Single tier-agnostic query SLA. with clear trade-offs and e',
          ],
          correctIndex: 0,
            helperText: 'Need freshness, latency, and reliability objectives together.',
          },
          {
            id: 'analytics-capacity-storage-layout',
            title: 'Phase 3 - Scaling and capacity: storage strategy',
            prompt: 'Which storage layout best supports this workload?',
            options: [
  
  
              'Columnar partitions by tenant, time, and coarse dimensions.',
              'Single massive row-store table for all events. with clear t',
              'One database per customer with no common engine. with clear',
              'Blob files with full scans for every query. with clear trad',
              'Store all events only in in-memory caches. with clear trade',
              'Precompute every possible query forever. with clear trade-o',
          ],
          correctIndex: 0,
            helperText: 'Columnar partitioning aligns with analytics query patterns.',
          },
          {
            id: 'analytics-capacity-workload-mgmt',
            title: 'Phase 3 - Scaling and capacity: workload management',
            prompt: 'How should noisy-neighbor risk be controlled?',
            options: [
  
  
              'Per-tenant quotas, queueing, and admission controls.',
              'Run all tenant queries in one shared queue. with cle',
              'Let clients retry until queries eventually succeed..',
              'Pause all tenants when one tenant spikes. with clear',
              'No query limits for enterprise tenants. with clear t',
              'Manual ops intervention for every overload. with cle',
          ],
          correctIndex: 0,
            helperText: 'Fair scheduling and quota guardrails protect shared systems.',
          },
          {
            id: 'analytics-architecture-serving-path',
            title: 'Phase 4 - Architecture decisions: query serving path',
            prompt: 'What serving architecture is most practical?',
            options: [
  
  
              'Federated query layer with result cache and pushdown.',
              'Direct client access to storage internals. with clear',
              'One monolithic SQL process with no caching. with clea',
              'Only batch exports, no interactive queries. with clea',
              'Browser-side joins over raw event files. with clear t',
              'No query planner; execute in request order. with clea',
          ],
          correctIndex: 0,
            helperText: 'Federation and pushdown reduce latency and cost.',
          },
          {
            id: 'analytics-deep-dive-governance',
            title: 'Phase 5 - Component deep dive: governance and compliance',
            prompt: 'How should retention/deletion be implemented?',
            options: [
  
  
              'Policy engine with tenant-aware TTL and legal-hold controls.',
              'Hard-delete everything after 30 days for simplicity. with cl',
              'Never delete data to maximize future analytics. with clear t',
              'Manual deletion tickets handled monthly. with clear trade-of',
              'Delete by region but ignore tenant contracts. with clear tra',
              'Only hide deleted data in the UI. with clear trade-offs and.',
          ],
          correctIndex: 0,
            helperText: 'Retention logic must be policy-driven and auditable.',
          },
          {
            id: 'analytics-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which metrics best reveal real system health?',
            options: [
  
  
              'Freshness lag, p95 by tenant tier, and spill-to-disk rate.',
              'Aggregate QPS plus queue lag. with clear trade-offs and ex',
              'Cluster CPU plus spill rate. with clear trade-offs and exp',
              'Daily bill plus queue lag. with clear trade-offs and expli',
              'Dashboard usage plus queue lag. with clear trade-offs and.',
              'Query success plus queue lag. with clear trade-offs and ex',
          ],
          correctIndex: 0,
            helperText: 'Health must be segmented by tenant impact and bottlenecks.',
          },
        ],
      },
    }
]

export default data
