const data = [
  {
      id: 'hard-multi-section-system-design-backend-webhook-delivery',
      difficulty: 'hard',
      prompt:
        'Design a backend webhook delivery system for a payment platform sending 180M webhooks/day to third-party endpoints with at-least-once guarantees, signed payloads, backoff retries, and per-destination isolation. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers clarify event contracts and retry semantics first, then define durability and latency SLOs, then design queueing, signer/dispatcher components, and abuse safeguards. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Webhook Delivery Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
        scenarioSummary:
          'Reliable outbound event delivery to untrusted external destinations with security, retries, and tenant isolation. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'webhook-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
            title: 'Phase 1 - Functional requirements: delivery contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
            prompt: 'What should be nailed down first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
            options: [
              'Event versioning, signature format, and retry semantics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Receiver onboarding and support model. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'SDK rollout and support policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Operations ownership and escalation model. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
              'Payload formatting and readability policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
              'Endpoint validation and registration policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
          ],
          correctIndex: 0,
            helperText: 'Delivery contracts are critical for receiver integrations.',
          },
          {
            id: 'webhook-functional-idempotency',
            title: 'Phase 1 - Functional requirements: receiver behavior',
            prompt: 'What receiver guidance is most important?',
            options: [
  
  
              'Document idempotent handling using event IDs.',
              'Assume every receiver handles duplicates with',
              'Require receivers to acknowledge in under wit',
              'Disable retries if receiver returns any 4xx..',
              'Send unsigned payloads for easier debugging..',
              'Allow arbitrary replay without audit logs. wi',
          ],
          correctIndex: 0,
            helperText: 'At-least-once delivery requires duplicate-safe receivers.',
          },
          {
            id: 'webhook-nfr-reliability',
            title: 'Phase 2 - Non-functional requirements: reliability',
            prompt: 'What target set is realistic for this system?',
            options: [
  
  
              'Durable enqueue SLO, max retry horizon, and eventual delivery rate.',
              'Median dispatch latency across destinations. with clear trade-offs.',
              'Unbounded retry horizon with aging. with clear trade-offs and expli',
              'Throughput-first reliability target. with clear trade-offs and expl',
              'Compute-efficiency operational target. with clear trade-offs and ex',
              'Single unsegmented delivery SLA. with clear trade-offs and explicit',
          ],
          correctIndex: 0,
            helperText: 'Need durability and retry outcomes, not just latency.',
          },
          {
            id: 'webhook-capacity-queue-model',
            title: 'Phase 3 - Scaling and capacity: queue model',
            prompt: 'How should dispatch queues be organized?',
            options: [
  
  
              'Partition by destination with bounded concurrency per partition.',
              'Single global queue with unlimited worker pull. with clear trade',
              'Queue per region but no destination awareness. with clear trade-',
              'In-memory queue only for lower latency. with clear trade-offs an',
              'No queue; synchronous send from API thread. with clear trade-off',
              'Manual queue assignment for each tenant. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Destination partitioning isolates failures and retries.',
          },
          {
            id: 'webhook-capacity-backoff',
            title: 'Phase 3 - Scaling and capacity: retry strategy',
            prompt: 'What retry policy should be used?',
            options: [
  
  
              'Exponential backoff with jitter and max retry window.',
              'Fixed 1-second retries forever. with clear trade-offs',
              'No retries after first failure. with clear trade-offs',
              'Linear retry with no upper bound. with clear trade-of',
              'Retry only on network timeouts, never on 5xx. with cl',
              'Global retry pause during peak traffic. with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Bounded backoff with jitter avoids synchronized storms.',
          },
          {
            id: 'webhook-architecture-security',
            title: 'Phase 4 - Architecture decisions: security model',
            prompt: 'What security controls are essential?',
            options: [
  
  
              'Per-tenant signing keys, rotation, and replay protection.',
              'Single global secret shared across all tenants. with clea',
              'No signature if endpoint is HTTPS. with clear trade-offs.',
              'Signature optional for high-volume tenants. with clear tr',
              'Manual key rotation once per year only. with clear trade-',
              'Store keys in plain config files for simplicity. with cle',
          ],
          correctIndex: 0,
            helperText: 'Signing and key hygiene are mandatory for trust.',
          },
          {
            id: 'webhook-deep-dive-destination-health',
            title: 'Phase 5 - Component deep dive: unhealthy destinations',
            prompt: 'How should persistent destination failures be handled?',
            options: [
  
  
              'Auto-quarantine with alerts and replay tooling.',
              'Keep retrying forever with no destination with.',
              'Silently drop failed events after 3 attempts. w',
              'Pause all tenants while one endpoint is down. w',
              'Require manual DBA intervention for every with.',
              'Disable signatures while endpoint is unhealthy.',
          ],
          correctIndex: 0,
            helperText: 'Quarantine limits blast radius while preserving recoverability.',
          },
          {
            id: 'webhook-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which metrics should lead incident triage?',
            options: [
  
  
              'Per-destination success, retry age, and queue depth distribution.',
              'Global attempt volume by minute. with clear trade-offs and explic',
              'Worker resource saturation trends. with clear trade-offs and expl',
              'Registered endpoint growth trends. with clear trade-offs and expl',
              'Global 2xx response percentage. with clear trade-offs and explici',
              'Tenant webhook usage trends. with clear trade-offs and explicit o',
          ],
          correctIndex: 0,
            helperText: 'Need fine-grained destination-level health signals.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-experimentation-platform',
      difficulty: 'hard',
      prompt:
        'Design a frontend experimentation platform for a global consumer app with 220M MAU. It must evaluate experiments in < 10ms on client startup, support sticky bucketing across devices, and provide statistically valid analysis pipelines. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const'],
      correctIndex: 0,
      correctExplanation:
        'Realistic interview answers define assignment semantics and experiment guardrails first, then set latency and data-quality SLOs, then design assignment SDKs, telemetry, and analysis correctness. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Frontend Experimentation Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
        scenarioSummary:
          'Client-side assignment and telemetry stack enabling fast, safe experiments with trusted measurement. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'exp-functional-assignment-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
            title: 'Phase 1 - Functional requirements: assignment semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
            prompt: 'What should be formalized first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
            options: [
              'Deterministic assignment and stickiness rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
              'Experiment ownership and naming rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
              'Authoring workflow and approval rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
              'Metric authoring and review rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
              'Weekly experiment capacity targets. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cl',
              'Loose assignment defaults in v1. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
          ],
          correctIndex: 0,
            helperText: 'Assignment consistency is foundational for valid experiments.',
          },
          {
            id: 'exp-functional-guardrails',
            title: 'Phase 1 - Functional requirements: safety guardrails',
            prompt: 'Which guardrail is most critical?',
            options: [
  
  
              'Kill switch and exposure caps per experiment.',
              'Quarterly experiment rollout caps. with clear',
              'Interaction-aware overlap scheduling. with cl',
              'Regression-triggered rollback workflow. with.',
              'Operator-driven disable workflow. with clear.',
              'Sampled experiment logging policy. with clear',
          ],
          correctIndex: 0,
            helperText: 'Fast rollback and bounded exposure reduce user risk.',
          },
          {
            id: 'exp-nfr-performance',
            title: 'Phase 2 - Non-functional requirements: performance and quality',
            prompt: 'What NFR bundle is most realistic?',
            options: [
  
  
              'Assignment latency, event loss rate, and analysis delay SLOs.',
              'Startup CPU cost on flagship devices. with clear trade-offs a',
              'Median assignment latency target. with clear trade-offs and e',
              'Telemetry volume-first loss target. with clear trade-offs and',
              'Dashboard freshness as core SLO. with clear trade-offs and ex',
              'Single cross-platform measurement SLA. with clear trade-offs.',
          ],
          correctIndex: 0,
            helperText: 'Need performance and data-quality constraints together.',
          },
          {
            id: 'exp-capacity-client-sdk',
            title: 'Phase 3 - Scaling and capacity: client SDK delivery',
            prompt: 'How should flag/experiment config reach clients?',
            options: [
  
  
              'Versioned config snapshots with delta updates and local cache.',
              'Fetch full config for every screen render. with clear trade-of',
              'Bundle all experiment rules in app binary forever. with clear.',
              'No local cache; rely on network each startup. with clear trade',
              'Manual config updates tied to app releases. with clear trade-o',
              'Only server-side assignment with no client support. with clear',
          ],
          correctIndex: 0,
            helperText: 'Snapshot + delta model balances freshness and startup speed.',
          },
          {
            id: 'exp-capacity-telemetry',
            title: 'Phase 3 - Scaling and capacity: telemetry pipeline',
            prompt: 'How should exposure/conversion events be captured?',
            options: [
  
  
              'Schema-validated event pipeline with dedupe keys.',
              'Client logs only, uploaded when users open with c',
              'No explicit exposure events, infer from page with',
              'Allow dynamic event schemas with no validation. w',
              'Sample 90% of events to reduce storage costs. wit',
              'Store telemetry only in browser local storage. wi',
          ],
          correctIndex: 0,
            helperText: 'Exposure correctness is essential for inference validity.',
          },
          {
            id: 'exp-architecture-cross-device',
            title: 'Phase 4 - Architecture decisions: cross-device stickiness',
            prompt: 'What is the best stickiness approach?',
            options: [
  
  
              'Stable user identity key with fallback hierarchy.',
              'Session-scoped assignment for reach. with clear t',
              'Device-only IDs with merge lag. with clear trade-',
              'Periodic rebucketing after app restart. with clea',
              'Operator-assigned cohorts by market. with clear t',
              'Network identity as primary key. with clear trade',
          ],
          correctIndex: 0,
            helperText: 'Stable identity strategy prevents cohort drift.',
          },
          {
            id: 'exp-deep-dive-analysis-correctness',
            title: 'Phase 5 - Component deep dive: analysis correctness',
            prompt: 'How should statistical validity be protected?',
            options: [
  
  
              'Pre-registered metrics, guardrails, and SRM checks.',
              'Pick winning metric after seeing results. with clea',
              'Run until p-value drops below threshold once. with.',
              'Ignore sample ratio mismatch warnings. with clear t',
              'Only compare raw conversion percentages. with clear',
              'Allow unlimited peeking without corrections. with c',
          ],
          correctIndex: 0,
            helperText: 'Guardrails and SRM checks catch broken experiments early.',
          },
          {
            id: 'exp-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which dashboard view is most operationally useful?',
            options: [
  
  
              'Assignment latency, exposure drop-off, and SRM alert rates.',
              'Active experiment count by team. with clear trade-offs and.',
              'Monthly audience reach trends. with clear trade-offs and ex',
              'Server resource saturation trends. with clear trade-offs an',
              'Admin workflow engagement trends. with clear trade-offs and',
              'Config publication velocity trends. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Operational dashboards must show assignment and measurement health.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-edge-personalization',
      difficulty: 'hard',
      prompt:
        'Design a frontend edge-personalization architecture for an e-commerce homepage serving 70k RPS globally. Requirements: p95 TTFB under 220ms, personalized hero modules, privacy constraints, and graceful fallback when profile services are unavailable. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational'],
      correctIndex: 0,
      correctExplanation:
        'Strong interview responses clarify personalization contracts and privacy constraints first, then define latency/fallback SLOs, then design edge decisioning, cache keying, and observability. with clear trade-offs wi',
      multiSectionSystemDesign: {
        title: 'Frontend Edge Personalization with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with wi',
        scenarioSummary:
          'Edge-rendered homepage personalization balancing latency, cache efficiency, privacy, and reliability. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with c',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'edge-fe-functional-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with with',
            title: 'Phase 1 - Functional requirements: personalization contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit w',
            prompt: 'What should be defined first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with wi',
            options: [
              'Personalization inputs, outputs, and fallback defaults. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with.',
              'Homepage merchandising rule direction. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with clear',
              'Recommendation slot allocation policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational with clear',
              'Release cadence and change policy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Soft fallback defaults in v1. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with wi',
              'Session-randomized hero selection. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
          ],
          correctIndex: 0,
            helperText: 'Contracts and fallbacks prevent brittle page behavior.',
          },
          {
            id: 'edge-fe-functional-privacy',
            title: 'Phase 1 - Functional requirements: privacy handling',
            prompt: 'Which privacy stance is most appropriate?',
            options: [
  
  
              'Consent-aware personalization with data minimization.',
              'Use full user profile even without consent. with clea',
              'Store raw personal data at every edge POP. with clear',
              'Disable audit logging for privacy events. with clear.',
              'Allow third-party scripts unrestricted access. with c',
              'Treat all users as opted in by default. with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Consent and minimization should shape data flow.',
          },
          {
            id: 'edge-fe-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: latency and availability',
            prompt: 'What SLO framing is most realistic?',
            options: [
  
  
              'TTFB p95, fallback hit rate, and personalization success SLOs.',
              'Regional average TTFB target. with clear trade-offs and explic',
              'Fallback success without explicit rate. with clear trade-offs.',
              'Profile API latency-led target. with clear trade-offs and expl',
              'Median page render target. with clear trade-offs and explicit.',
              'Single global edge SLA. with clear trade-offs and explicit ope',
          ],
          correctIndex: 0,
            helperText: 'Must track both speed and personalization reliability.',
          },
          {
            id: 'edge-fe-capacity-cache-keys',
            title: 'Phase 3 - Scaling and capacity: cache strategy',
            prompt: 'How should edge cache keys be designed?',
            options: [
  
  
              'Coarse segments to bound cache cardinality.',
              'Unique key per user for full personalizatio',
              'One global cache key for all users. with cl',
              'No edge caching for personalized pages. wit',
              'Key by full user profile JSON payload. with',
              'Randomized cache keys to avoid collisions..',
          ],
          correctIndex: 0,
            helperText: 'Segmented keys keep hit rate and memory usage healthy.',
          },
          {
            id: 'edge-fe-capacity-fallbacks',
            title: 'Phase 3 - Scaling and capacity: degraded mode',
            prompt: 'What degraded-mode strategy works best?',
            options: [
  
  
              'Serve cached generic modules with async profile refresh.',
              'Block page render until profile API returns. with clear.',
              'Return error page on any profile timeout. with clear tra',
              'Disable caching during profile incidents. with clear tra',
              'Retry profile fetch infinitely before response. with cle',
              'Ask user to refresh manually each time. with clear trade',
          ],
          correctIndex: 0,
            helperText: 'Graceful fallback protects availability and UX.',
          },
          {
            id: 'edge-fe-architecture-decisioning',
            title: 'Phase 4 - Architecture decisions: where decisions run',
            prompt: 'Where should personalization decisions execute?',
            options: [
  
  
              'Edge decision engine with strict data contracts.',
              'Browser-led decisioning with bounded context. wi',
              'Origin-led decisioning for all requests. with cl',
              'CDN-layer heuristic variant selection. with clea',
              'Hourly merchandising rule updates. with clear tr',
              'Looser rules-based decision engine. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Edge decisioning reduces latency while preserving control.',
          },
          {
            id: 'edge-fe-deep-dive-testing',
            title: 'Phase 5 - Component deep dive: testing and rollout',
            prompt: 'How should rollout risk be reduced?',
            options: [
  
  
              'Shadow evaluation + canary by geography/segment.',
              'Global flip for all users at once. with clear tr',
              'Test only in local dev environment. with clear t',
              'No rollback mechanism for personalization rules.',
              'Canary by random POP without observability. with',
              'Release only during holiday traffic peaks. with.',
          ],
          correctIndex: 0,
            helperText: 'Shadow + segmented canaries catch regressions safely.',
          },
          {
            id: 'edge-fe-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should the on-call dashboard emphasize?',
            options: [
  
  
              'Geo-level TTFB, fallback rate, and module error budgets.',
              'Homepage visits plus latency mix. with clear trade-offs.',
              'Edge CPU plus cache latency. with clear trade-offs and e',
              'Cache storage plus miss rate. with clear trade-offs and.',
              'Deploy count plus rollback rate. with clear trade-offs a',
              'Profile API traffic plus latency. with clear trade-offs.',
          ],
          correctIndex: 0,
            helperText: 'Need user-impact metrics and reliability indicators.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-online-schema-migration',
      difficulty: 'hard',
      prompt:
        'Design a backend online schema migration system for a high-traffic OLTP service (250k writes/s) with zero downtime, strict backward compatibility, and rollback under 5 minutes. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and'],
      correctIndex: 0,
      correctExplanation:
        'Senior-level answers distinguish between multiple viable migration patterns and pick one that best fits rollback speed, compatibility windows, and operational risk. with clear trade-offs and wi',
      multiSectionSystemDesign: {
        title: 'Backend Online Schema Migration System with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit w',
        scenarioSummary:
          'Safely evolve production schemas under constant write load with bounded blast radius and fast rollback. with clear trade-offs and explicit operational constraints with clear trade-offs and with',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'schema-functional-compat-window with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with cle',
            title: 'Phase 1 - Functional requirements: compatibility contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
            prompt: 'What contract is most important to define first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and.',
            options: [
              'Explicit backward/forward compatibility window by service version. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with wit',
              'Backward-only compatibility by version. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Lockstep rollout across service tiers. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit w',
              'Test-validated compatibility defaults. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit w',
              'Storage-level compatibility boundaries. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Deferred compatibility after migration. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'The compatibility window governs safe deployment sequencing.',
          },
          {
            id: 'schema-functional-rollout-unit',
            title: 'Phase 1 - Functional requirements: rollout granularity',
            prompt: 'What rollout granularity is most practical?',
            options: [
  
  
              'Progressive rollout by traffic slice with migration checkpoints.',
              'Staging-validated big-bang rollout path. with clear trade-offs a',
              'Host-sliced rollout without traffic guards. with clear trade-off',
              'Region-first rollout with service coupling. with clear trade-off',
              'Write-first rollout without dual reads. with clear trade-offs an',
              'Operator-driven host rollout workflow. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Progressive traffic slicing minimizes migration blast radius.',
          },
          {
            id: 'schema-nfr-safety-slos',
            title: 'Phase 2 - Non-functional requirements: safety targets',
            prompt: 'Which target bundle is most realistic?',
            options: [
  
  
              'Rollback time, error budget impact, and replication lag limits.',
              'Migration duration as primary KPI. with clear trade-offs and ex',
              'Median query latency during migration. with clear trade-offs an',
              'Backup-backed rollback expectations. with clear trade-offs and.',
              'Approval latency for each phase. with clear trade-offs and expl',
              'Single success metric across services. with clear trade-offs an',
          ],
          correctIndex: 0,
            helperText: 'Need explicit operational safety thresholds, not just speed.',
          },
          {
            id: 'schema-capacity-write-strategy',
            title: 'Phase 3 - Scaling and capacity: write-path strategy',
            prompt: 'For high write throughput, which pattern is best initially?',
            options: [
  
  
              'Expand-contract with dual-write/read adapters during transition.',
              'Dual-write directly in app code without validation hooks. with c',
              'Shadow writes only, no production write switching. with clear tr',
              'Freeze writes during migration windows nightly. with clear trade',
              'Migrate via one-time full table rewrite only. with clear trade-o',
              'Read-only mode during every schema step. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Expand-contract with guarded adapters balances safety and speed.',
          },
          {
            id: 'schema-capacity-backfill',
            title: 'Phase 3 - Scaling and capacity: backfill execution',
            prompt: 'How should large backfills be run?',
            options: [
  
  
              'Chunked throttled backfill with lag-aware pacing and resume tokens.',
              'Fast-path backfill to reduce duration. with clear trade-offs and ex',
              'Transactional backfill for consistency. with clear trade-offs and e',
              'Peak-hour SQL batch backfill. with clear trade-offs and explicit op',
              'Cutover-first backfill execution plan. with clear trade-offs and ex',
              'Row-count-only backfill verification. with clear trade-offs and exp',
          ],
          correctIndex: 0,
            helperText: 'Lag-aware throttling avoids replica and cache collapse.',
          },
          {
            id: 'schema-architecture-cutover',
            title: 'Phase 4 - Architecture decisions: cutover model',
            prompt: 'Which cutover strategy best supports fast rollback?',
            options: [
  
  
              'Feature-flagged cutover with reversible read/write routing.',
              'DDL cutover immediately after backfill completion. with cle',
              'DNS-based cutover between old/new schema clusters. with cle',
              'Code-only cutover with no runtime toggles. with clear trade',
              'Permanent dual-write with no final cutover. with clear trad',
              'Cutover by operator command without automated checks. with.',
          ],
          correctIndex: 0,
            helperText: 'Runtime-reversible routing is critical for 5-minute rollback.',
          },
          {
            id: 'schema-deep-dive-validation',
            title: 'Phase 5 - Component deep dive: correctness validation',
            prompt: 'What validation is strongest during migration?',
            options: [
  
  
              'Online parity checks plus sampled semantic diff verification.',
              'Row-count parity across old and new. with clear trade-offs an',
              'API canary error-rate monitoring. with clear trade-offs and e',
              'Support-led spot verification after launch. with clear trade-',
              'Predeploy test-based validation only. with clear trade-offs a',
              'End-of-run checksum verification only. with clear trade-offs.',
          ],
          correctIndex: 0,
            helperText: 'Parity checks need semantic, not just structural, equivalence.',
          },
          {
            id: 'schema-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which dashboard is most decision-useful for on-call?',
            options: [
  
  
              'Cutover flag state, parity drift, lag, and migration error budget burn.',
              'DB resource trends during migration. with clear trade-offs and explicit',
              'Migration completion percentage by phase. with clear trade-offs and exp',
              'Median API latency by endpoint. with clear trade-offs and explicit oper',
              'Executed migration step count. with clear trade-offs and explicit opera',
              'Global request throughput trends. with clear trade-offs and explicit op',
          ],
          correctIndex: 0,
            helperText: 'On-call needs rollback signals, not just system utilization.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-bff-streaming-ssr',
      difficulty: 'hard',
      prompt:
        'Design a frontend + BFF architecture for a commerce app using streaming SSR, route-level data dependencies, and personalized modules. Requirements: p95 LCP < 2.2s on mobile, strict cache consistency rules, and safe partial failure handling. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and'],
      correctIndex: 0,
      correctExplanation:
        'Strong senior responses compare several valid rendering and data-fetch models, then choose based on latency budget partitioning, cache behavior, and failure isolation. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Frontend BFF with Streaming SSR with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
        scenarioSummary:
          'Route orchestration and incremental HTML streaming with resilient data composition and cache-aware personalization. with clear trade-offs and explicit operational constraints with clear trade-o',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'ssr-functional-data-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
            title: 'Phase 1 - Functional requirements: route data contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
            prompt: 'What is most critical to define first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
            options: [
              'Route-level data ownership and stale-tolerance contract. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
              'Whether all components use the same CSS methodology. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs.',
              'A single universal API response shape for every route. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
              'Only SEO metadata generation strategy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'No explicit contract if BFF owns composition. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Client-side data ownership only, SSR optional. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
          ],
          correctIndex: 0,
            helperText: 'Clear route contracts prevent hidden waterfall coupling.',
          },
          {
            id: 'ssr-functional-failure-mode',
            title: 'Phase 1 - Functional requirements: failure behavior',
            prompt: 'Which failure policy is strongest?',
            options: [
  
  
              'Per-module fallback boundaries with priority content guarantees.',
              'Fail whole page whenever any module API fails. with clear trade-',
              'Always render stale shell and skip all module content. with clea',
              'Retry module calls indefinitely before streaming starts. with cl',
              'Disable personalization if any dependency is slow. with clear tr',
              'Only show generic error page for all failures. with clear trade-',
          ],
          correctIndex: 0,
            helperText: 'Granular fallbacks preserve critical journeys under partial failure.',
          },
          {
            id: 'ssr-nfr-budgeting',
            title: 'Phase 2 - Non-functional requirements: latency budgeting',
            prompt: 'How should the performance budget be framed?',
            options: [
  
  
              'Budget TTFB, stream chunk timings, and hydration cost separately.',
              'Use only a global LCP target with no sub-budgets. with clear trad',
              'Optimize only backend TTFB; frontend can absorb the rest. with cl',
              'Optimize only JS bundle size; ignore server streaming. with clear',
              'Track p50 only because p95 varies by device. with clear trade-off',
              'No budget split; tune components independently. with clear trade-',
          ],
          correctIndex: 0,
            helperText: 'Sub-budgets keep teams aligned on end-to-end LCP goals.',
          },
          {
            id: 'ssr-capacity-composition',
            title: 'Phase 3 - Scaling and capacity: BFF composition',
            prompt: 'Which composition strategy is most practical at scale?',
            options: [
  
  
              'Dependency graph execution with parallel fanout and bounded joins.',
              'Sequential fetch chain to simplify debugging. with clear trade-off',
              'Client fetches every module after initial HTML render. with clear.',
              'Single mega-endpoint with no internal decomposition. with clear tr',
              'Per-module BFF processes with no shared orchestration. with clear.',
              'Randomized fanout to spread load across services. with clear trade',
          ],
          correctIndex: 0,
            helperText: 'Parallel fanout plus bounded joins reduces waterfalls safely.',
          },
          {
            id: 'ssr-capacity-cache-key',
            title: 'Phase 3 - Scaling and capacity: cache key design',
            prompt: 'What cache-key strategy best balances hit rate and correctness?',
            options: [
  
  
              'Key by route + coarse user segment + critical feature flags.',
              'Key by full user profile payload for exact personalization..',
              'Single cache key per route globally. with clear trade-offs a',
              'Disable server cache for personalized routes entirely. with.',
              'Key only by AB bucket and ignore route context. with clear t',
              'Key by raw cookie blob for maximum specificity. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Coarse segmentation keeps hit rates viable while preserving correctness.',
          },
          {
            id: 'ssr-architecture-streaming',
            title: 'Phase 4 - Architecture decisions: stream orchestration',
            prompt: 'Which streaming pattern best fits these constraints?',
            options: [
  
  
              'Send critical shell first, then prioritized module streams.',
              'Wait for all modules, then send one complete HTML response.',
              'Send empty shell only and rely on full client hydration. wi',
              'Always stream non-critical modules before primary content..',
              'Disable streaming for personalized pages. with clear trade-',
              'Use polling from browser to request each HTML fragment. wit',
          ],
          correctIndex: 0,
            helperText: 'Priority-first streaming improves perceived performance and LCP.',
          },
          {
            id: 'ssr-deep-dive-consistency',
            title: 'Phase 5 - Component deep dive: consistency semantics',
            prompt: 'How should data consistency be modeled across modules?',
            options: [
  
  
              'Declare per-module freshness classes with explicit reconciliation rules.',
              'Require strict snapshot consistency for all modules always. with clear t',
              'Allow each module to choose freshness at runtime ad hoc. with clear trad',
              'Ignore consistency; UI can reconcile visual drift later. with clear trad',
              'Force every module to use same TTL regardless of volatility. with clear.',
              'Synchronize all modules by delaying response until slowest source. with.',
          ],
          correctIndex: 0,
            helperText: 'Different modules often need different freshness guarantees.',
          },
          {
            id: 'ssr-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What telemetry best drives production decisions?',
            options: [
  
  
              'Chunk timing waterfall, fallback activation rate, and module error budget burn.',
              'Only total SSR request volume by minute. with clear trade-offs and explicit ope',
              'Only p50 response time of the BFF service. with clear trade-offs and explicit o',
              'Only JS bundle download size over time. with clear trade-offs and explicit oper',
              'Only number of rendered modules per route. with clear trade-offs and explicit o',
              'Only cache hit rate with no route segmentation. with clear trade-offs and expli',
          ],
          correctIndex: 0,
            helperText: 'Need visibility into where user-facing latency and failures originate.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-global-quotas',
      difficulty: 'hard',
      prompt:
        'Design a backend global quota and rate-limiting service for APIs in 12 regions with mixed hard and soft quotas, p99 check latency under 8ms, and consistency requirements that vary by product tier. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with c'],
      correctIndex: 0,
      correctExplanation:
        'Senior interview answers compare consistency/latency tradeoffs per quota class and choose tier-aware enforcement rather than a single global policy. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Quota and Rate-Limiting Service with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
        scenarioSummary:
          'Cross-region quota checks with tier-aware consistency and low-latency enforcement for heterogeneous API traffic. with clear trade-offs and explicit operational constraints wi',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'quota-functional-policy-model with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and.',
            title: 'Phase 1 - Functional requirements: policy model with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
            prompt: 'What should be explicitly modeled first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
            options: [
              'Quota classes (hard/soft) and enforcement semantics per tier. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constr',
              'One universal quota type for every API product. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
              'Only per-minute limits with no longer windows. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
              'Limits defined only in API docs, not enforceable config. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'No per-tenant policy model; use defaults for all. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with c',
              'Manual policy edits during incidents only. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Different products need different quota guarantees.',
          },
          {
            id: 'quota-functional-idempotency',
            title: 'Phase 1 - Functional requirements: request semantics',
            prompt: 'Which check semantics is most robust?',
            options: [
  
  
              'Atomic check-and-consume with idempotency key support.',
              'Separate check then consume calls for flexibility. wit',
              'Consume first then validate asynchronously. with clear',
              'Client-managed counters with periodic sync. with clear',
              'Best-effort checks without duplicate protection. with.',
              'Only log overages and bill later. with clear trade-off',
          ],
          correctIndex: 0,
            helperText: 'Atomic semantics avoid race conditions and double charges.',
          },
          {
            id: 'quota-nfr-tradeoff',
            title: 'Phase 2 - Non-functional requirements: latency vs consistency',
            prompt: 'What NFR strategy is most realistic?',
            options: [
  
  
              'Tiered SLOs: strict consistency for hard quotas, bounded staleness for soft quotas.',
              'Strong global consistency for all quota checks, regardless of latency. with clear t',
              'Eventual consistency for all quotas to minimize costs. with clear trade-offs and ex',
              'No explicit consistency targets if p99 latency is met. with clear trade-offs and ex',
              'Latency target only for premium tier, none for others. with clear trade-offs and ex',
              'Single SLA with no distinction between quota classes. with clear trade-offs and exp',
          ],
          correctIndex: 0,
            helperText: 'Quota classes should drive consistency policy choices.',
          },
          {
            id: 'quota-capacity-counter-design',
            title: 'Phase 3 - Scaling and capacity: counter architecture',
            prompt: 'Which counter design best fits p99 < 8ms globally?',
            options: [
  
  
              'Region-local hot counters with periodic global reconciliation.',
              'Single global strongly consistent counter store for all with c',
              'Client-side counters trusted by gateway signatures. with clear',
              'Batch counter updates every 5 seconds for all tiers. with clea',
              'One counter shard per API endpoint only. with clear trade-offs',
              'No counter caching to keep logic simple. with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Local hot-path counters are often necessary for latency.',
          },
          {
            id: 'quota-capacity-failure-mode',
            title: 'Phase 3 - Scaling and capacity: failure semantics',
            prompt: 'How should enforcement behave during control-plane outages?',
            options: [
  
  
              'Policy-driven fail-open/closed mode per quota class.',
              'Always fail-open to maximize availability. with clea',
              'Always fail-closed to avoid any overage risk. with c',
              'Let each API team choose behavior at runtime. with c',
              'Random fail-open sampling to spread risk. with clear',
              'Disable limits globally until manual recovery. with.',
          ],
          correctIndex: 0,
            helperText: 'Outage behavior must be predeclared by policy and risk.',
          },
          {
            id: 'quota-architecture-enforcement-point',
            title: 'Phase 4 - Architecture decisions: enforcement placement',
            prompt: 'Where should enforcement primarily happen?',
            options: [
  
  
              'Gateway-side fast checks with signed policy snapshots.',
              'Application service checks only after business logic w',
              'Client-side SDK checks before requests are sent. with.',
              'Database triggers enforcing API quotas centrally. with',
              'Async billing pipeline deciding quota violations. with',
              'Manual support review for suspicious tenants. with cle',
          ],
          correctIndex: 0,
            helperText: 'Gateway enforcement minimizes wasted downstream work.',
          },
          {
            id: 'quota-deep-dive-reconciliation',
            title: 'Phase 5 - Component deep dive: reconciliation',
            prompt: 'How should overage reconciliation be implemented?',
            options: [
  
  
              'Continuous drift detection with compensating adjustments and audit logs.',
              'Monthly reconciliation reports with no automatic correction. with clear.',
              'Ignore drift if aggregate monthly usage is close enough. with clear trad',
              'Reset counters daily to clear inconsistencies. with clear trade-offs and',
              'Manual support tickets for every mismatch. with clear trade-offs and exp',
              'Reconcile only for top 10 tenants. with clear trade-offs and explicit op',
          ],
          correctIndex: 0,
            helperText: 'Continuous reconciliation prevents silent quota skew.',
          },
          {
            id: 'quota-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'Which dashboard is most useful in real incidents?',
            options: [
  
  
              'Decision latency percentile, deny-rate by policy, and drift alarms by region.',
              'Only total request throughput and region uptime. with clear trade-offs and ex',
              'Only count of configured quota policies. with clear trade-offs and explicit o',
              'Only CPU and memory of limiter nodes. with clear trade-offs and explicit oper',
              'Only daily billed overage revenue. with clear trade-offs and explicit operati',
              'Only gateway 5xx trends with no quota context. with clear trade-offs and expl',
          ],
          correctIndex: 0,
            helperText: 'Incident response needs policy outcomes and correctness signals.',
          },
        ],
      },
    }
]

export default data
