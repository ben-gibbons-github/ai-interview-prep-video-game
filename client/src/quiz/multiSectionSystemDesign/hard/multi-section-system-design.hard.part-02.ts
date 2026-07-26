const data = [
  {
      id: 'hard-multi-section-system-design-video-conferencing',
      difficulty: 'hard',
      prompt:
        'Design a global video conferencing platform for 1M concurrent participants with low latency and strong reliability.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers choose transport, media, and regional strategies that balance latency, quality, and fault containment. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Video Conferencing Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
        scenarioSummary: 'Realtime media at scale with transport, CAP, datastore, and provider choices. with clear trade-offs and explicit operational constraints with c',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'video-functional-meeting-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
            title: 'Phase 1 - Functional requirements: meeting contract with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
            prompt: 'What should be defined first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
            options: [
              'Define join/leave, host controls, mute rules, and recording semantics first. with clear trade-offs and explicit operational constraints with cl',
              'Define codec tuning first; meeting semantics can follow later. with clear trade-offs and explicit operational constraints with clear trade-offs',
              'Define UI themes first; backend behavior can be adjusted later. with clear trade-offs and explicit operational constraints with clear trade-off',
              'Define cloud vendors first; feature behavior can adapt to infrastructure. with clear trade-offs and explicit operational constraints with clear',
              'Define analytics schema first; call behavior can be backfilled. with clear trade-offs and explicit operational constraints with clear trade-off',
              'Define A/B tests first; core meeting states can be inferred later. with clear trade-offs and explicit operational constraints with clear trade-',
          ],
          correctIndex: 0,
            helperText: 'User-visible meeting rules come first.',
          },
          {
            id: 'video-tech-choice-transport',
            title: 'Phase 2 - Technology choice: media transport',
            prompt: 'Best base transport for browser/mobile live media?',
            options: [
  
  
              'Use WebRTC for realtime media with TURN fallback.',
              'Use plain HTTPS polling for audio/video packets..',
              'Use batch upload chunks every 5 seconds. with cle',
              'Use email-style message queues for media frames..',
              'Use long-poll JSON APIs for all media streams. wi',
              'Use only TCP sockets without congestion with clea',
          ],
          correctIndex: 0,
            helperText: 'Realtime media needs protocols built for latency and packet loss.',
          },
          {
            id: 'video-component-choice-topology',
            title: 'Phase 2 - Component choice: SFU vs MCU',
            prompt: 'For large interactive meetings, what is best?',
            options: [
  
  
              'Use SFU as default; reserve MCU for constrained edge cases.',
              'Use MCU for every meeting regardless of size. with clear tr',
              'Use peer-to-peer mesh for 200-person meetings. with clear t',
              'Use CDN-only fanout for two-way live calls. with clear trad',
              'Use one relay node globally for all media. with clear trade',
              'Use client-side transcoding as the primary mixer. with clea',
          ],
          correctIndex: 0,
            helperText: 'SFU usually scales better for large interactive calls.',
          },
          {
            id: 'video-cap-tradeoff-session-state',
            title: 'Phase 3 - CAP tradeoff: call control state',
            prompt: 'During regional partitions, what should call control prioritize?',
            options: [
  
  
              'Prioritize partition tolerance with bounded consistency and clear host authority.',
              'Prioritize full availability even if duplicate host actions conflict. with clear.',
              'Prioritize strict global consistency for every mute/unmute action. with clear tra',
              'Ignore partitions; users can refresh until control recovers. with clear trade-off',
              'Use eventual consistency for all moderation actions. with clear trade-offs and ex',
              'Disable host controls during any network instability. with clear trade-offs and e',
          ],
          correctIndex: 0,
            helperText: 'Control semantics should degrade predictably during partitions.',
          },
          {
            id: 'video-database-type-metadata',
            title: 'Phase 3 - Database type: meeting metadata',
            prompt: 'Best store for meeting metadata and permissions?',
            options: [
  
  
              'Use relational storage for metadata, ACLs, and audit trails.',
              'Use cache as canonical ACL and meeting state store. with cle',
              'Use object storage as canonical permission database. with cl',
              'Use search index as canonical meeting state. with clear trad',
              'Use time-series DB for ACL checks and host policies. with cl',
              'Use graph DB only for all metadata and moderation. with clea',
          ],
          correctIndex: 0,
            helperText: 'Relational constraints help keep permissions and metadata consistent.',
          },
          {
            id: 'video-provider-choice-media-stack',
            title: 'Phase 4 - Provider selection: media infrastructure',
            prompt: 'How should media provider strategy be chosen?',
            options: [
  
  
              'Use multi-region SFU fleet with provider failover in critical geos.',
              'Use one provider and one region for all traffic. with clear trade-o',
              'Choose providers only by lowest egress price. with clear trade-offs',
              'Choose providers only by brand popularity. with clear trade-offs an',
              'Let clients pick provider endpoints directly. with clear trade-offs',
              'Disable failover to keep routing simple. with clear trade-offs and.',
          ],
          correctIndex: 0,
            helperText: 'Provider choices should balance quality, latency, and resilience.',
          },
          {
            id: 'video-component-choice-recording',
            title: 'Phase 5 - Component deep dive: recording pipeline',
            prompt: 'Best recording architecture for reliability?',
            options: [
  
  
              'Use async recording workers with durable job state and retries.',
              'Record synchronously in the live signaling request path. with c',
              'Record only on client devices by default. with clear trade-offs',
              'Record by sampling random meeting segments. with clear trade-of',
              'Record only after meeting ends from volatile cache. with clear.',
              'Skip recording retries to avoid duplicate files. with clear tra',
          ],
          correctIndex: 0,
            helperText: 'Recording is a long-running workflow; durability matters.',
          },
          {
            id: 'video-observability-quality',
            title: 'Phase 5 - Component deep dive: quality observability',
            prompt: 'Which metrics matter most for call quality?',
            options: [
  
  
              'Track packet loss, jitter, RTT, freeze ratio, and join time.',
              'Track only CPU usage in media servers. with clear trade-offs',
              'Track only total meetings started. with clear trade-offs and',
              'Track only p50 API latency. with clear trade-offs and explic',
              'Track only cloud spend by region. with clear trade-offs and.',
              'Track only client app launch time. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Quality metrics should directly reflect user call experience.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-hardware-edge-inference',
      difficulty: 'hard',
      prompt:
        'Design a global edge AI hardware platform running inference on 1.8M cameras with p95 inference latency < 80ms and firmware rollout safety across 120 regions. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w'],
      correctIndex: 0,
      correctExplanation:
        'Strong hardware-focused answers define device and safety constraints first, then reason about thermal/power/network realities, and only then choose provisioning, rollout, and observability architecture. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Edge Inference Hardware Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear.',
        scenarioSummary:
          'Hardware fleet management, constrained inference compute, and safe firmware/model rollout at global scale. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'hw-functional-device-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
            title: 'Phase 1 - Functional requirements: device contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
            prompt: 'What should be specified before discussing hardware topology? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
            options: [
              'Define camera ingest format, inference SLA per frame, model fallback behavior, and local buffering rules during WAN loss. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Choose GPU vendor first and infer frame-processing behavior from benchmark results later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
              'Start with rack layout and postpone per-device behavior to firmware implementation details. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
              'Define cloud analytics dashboards first so edge compute behavior can be tuned after deployment. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tra',
              'Prioritize procurement lead times and defer interface contracts until hardware is in hand. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-of',
              'Pick model architecture first and let transport/encoding constraints be handled by integrators. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tra',
          ],
          correctIndex: 0,
            helperText: 'Hardware systems still need precise product-level behavior contracts.',
          },
          {
            id: 'hw-functional-failure-modes',
            title: 'Phase 1 - Functional requirements: failure behavior',
            prompt: 'Which failure mode policy is most important to define early?',
            options: [
  
  
              'Explicit degraded-mode rules for overheating, disk pressure, clock skew, and camera disconnects, including safe output semantics.',
              'Treat all hardware faults as reboot-worthy and avoid defining degraded operation to keep logic simple. with clear trade-offs and.',
              'Ignore thermal and power faults because most edge regions are climate-controlled by default. with clear trade-offs and explicit o',
              'Allow devices to continue outputting stale detections until operators manually intervene. with clear trade-offs and explicit oper',
              'Use cloud-side retries as the primary remedy for local hardware instability. with clear trade-offs and explicit operational const',
              'Postpone failure policy to operations runbooks after launch telemetry arrives. with clear trade-offs and explicit operational con',
          ],
          correctIndex: 0,
            helperText: 'Edge hardware must define deterministic behavior under partial failure.',
          },
          {
            id: 'hw-nfr-latency-power-thermal',
            title: 'Phase 2 - Non-functional requirements: latency, power, thermal',
            prompt: 'How should the key non-functional goals be framed?',
            options: [
  
  
              'Set p95/p99 inference latency SLOs plus device power and thermal envelopes, with hard throttling and drop policies when limits are exceeded.',
              'Track average latency only and treat thermal excursions as an ops-only concern. with clear trade-offs and explicit operational constraints w',
              'Optimize throughput alone because latency naturally improves when enough accelerators are deployed. with clear trade-offs and explicit opera',
              'Set one global timeout and accept any output that arrives before timeout regardless of thermal state. with clear trade-offs and explicit ope',
              'Use user satisfaction surveys as the primary NFR signal for edge quality. with clear trade-offs and explicit operational constraints with cl',
              'Focus on cooling design only and postpone latency SLOs to model optimization teams. with clear trade-offs and explicit operational constrain',
          ],
          correctIndex: 0,
            helperText: 'Hardware constraints and latency goals must be designed together.',
          },
          {
            id: 'hw-nfr-rollout-safety',
            title: 'Phase 2 - Non-functional requirements: rollout safety',
            prompt: 'What rollout safety objective set is strongest?',
            options: [
  
  
              'Require canary + staged firmware/model rollouts with automatic rollback triggers based on thermals, crash loops, and accuracy regression thresholds.',
              'Roll out globally in one wave to shorten drift windows between regions. with clear trade-offs and explicit operational constraints with clear trade-',
              'Allow each region to self-upgrade independently with no centralized rollback guardrails. with clear trade-offs and explicit operational constraints.',
              'Gate rollout only on device online percentage, not on quality or thermal indicators. with clear trade-offs and explicit operational constraints with',
              'Use manual approvals only and avoid automated rollback to prevent false positives. with clear trade-offs and explicit operational constraints with c',
              'Treat model and firmware changes as independent and skip compatibility testing. with clear trade-offs and explicit operational constraints with clea',
          ],
          correctIndex: 0,
            helperText: 'High-scale hardware rollouts require measurable and automatic safety rails.',
          },
          {
            id: 'hw-capacity-device-sizing',
            title: 'Phase 3 - Scaling and capacity: device sizing',
            prompt: 'How should per-node sizing be planned?',
            options: [
  
  
              'Model worst-case concurrent stream load, accelerator memory headroom, and thermal derating so steady-state sizing includes burst and failover margins.',
              'Size from average daytime load and rely on occasional frame drops during peaks. with clear trade-offs and explicit operational constraints with clear.',
              'Dimension for benchmark lab traffic only and adjust in production with firmware hacks. with clear trade-offs and explicit operational constraints with',
              'Allocate equal stream counts per device regardless of camera resolution skew. with clear trade-offs and explicit operational constraints with clear tr',
              'Prefer maximal stream density per node and address overheating after deployment. with clear trade-offs and explicit operational constraints with clear',
              'Overprovision CPU only, since accelerator pressure can be hidden via batching. with clear trade-offs and explicit operational constraints with clear t',
          ],
          correctIndex: 0,
            helperText: 'Capacity plans should include derating and hotspot behavior, not just averages.',
          },
          {
            id: 'hw-capacity-topology',
            title: 'Phase 3 - Scaling and capacity: topology and partitioning',
            prompt: 'What partitioning strategy is best for reliability and locality?',
            options: [
  
  
              'Partition by site and camera groups with active/standby edge nodes per site, and isolate failure domains to prevent cross-site cascades.',
              'Pool all cameras globally into one scheduler to maximize utilization. with clear trade-offs and explicit operational constraints with cl',
              'Partition by model version only, independent of geography and network domains. with clear trade-offs and explicit operational constraint',
              'Assign streams randomly each minute to smooth node variance regardless of locality. with clear trade-offs and explicit operational const',
              'Store all raw video centrally and run edge only as passthrough gateways. with clear trade-offs and explicit operational constraints with',
              'Avoid partitioning and rely on autoscaling to absorb regional outages. with clear trade-offs and explicit operational constraints with c',
          ],
          correctIndex: 0,
            helperText: 'Hardware partitions should mirror physical and network failure boundaries.',
          },
          {
            id: 'hw-architecture-control-plane',
            title: 'Phase 4 - Architecture decisions: control plane',
            prompt: 'What control-plane architecture best manages this fleet?',
            options: [
  
  
              'Use region-aware control services for inventory, rollout orchestration, and health policy, with signed config bundles and lease-based device coordination.',
              'Use one global control service with no regional failover to simplify state management. with clear trade-offs and explicit operational constraints with cle',
              'Push all control logic into device firmware and remove centralized scheduling entirely. with clear trade-offs and explicit operational constraints with cl',
              'Use ad-hoc scripts for rollout and rely on SSH access as the primary management interface. with clear trade-offs and explicit operational constraints with',
              'Have devices fetch unsigned config from CDN to reduce control-plane complexity. with clear trade-offs and explicit operational constraints with clear trad',
              'Use broker topic count as the only signal for fleet health and rollout safety. with clear trade-offs and explicit operational constraints with clear trade',
          ],
          correctIndex: 0,
            helperText: 'Fleet-scale hardware needs strong control-plane identity, policy, and rollback control.',
          },
          {
            id: 'hw-architecture-data-plane',
            title: 'Phase 4 - Architecture decisions: data plane',
            prompt: 'How should the edge data path be structured?',
            options: [
  
  
              'Use local ingest and pre-processing, bounded buffering, inference workers, and asynchronous event upload with backpressure-aware shedding policies.',
              'Send full raw streams to cloud first and run edge inference only as backup. with clear trade-offs and explicit operational constraints with clear t',
              'Run inference in one process per camera and avoid shared scheduling to reduce queueing complexity. with clear trade-offs and explicit operational c',
              'Drop all buffering to preserve low latency, even when transient outages occur. with clear trade-offs and explicit operational constraints with clea',
              'Use synchronous cloud acknowledgments before each local frame decision. with clear trade-offs and explicit operational constraints with clear trade',
              'Prioritize upload completion over local inference during network instability. with clear trade-offs and explicit operational constraints with clear',
          ],
          correctIndex: 0,
            helperText: 'Hardware data planes need explicit buffering and shed strategies under pressure.',
          },
          {
            id: 'hw-deep-dive-firmware-integrity',
            title: 'Phase 5 - Component deep dive: firmware integrity',
            prompt: 'Which firmware trust model is strongest?',
            options: [
  
  
              'Use secure boot, signed firmware images, measured attestation, and rollback-protected version counters enforced by hardware root of trust.',
              'Trust checksum validation over HTTP downloads because signatures add rollout latency. with clear trade-offs and explicit operational const',
              'Allow local operators to bypass signature checks during urgent updates. with clear trade-offs and explicit operational constraints with cl',
              'Store signing keys on devices so they can self-authorize emergency images. with clear trade-offs and explicit operational constraints with',
              'Verify integrity only on first boot to reduce recurring startup overhead. with clear trade-offs and explicit operational constraints with.',
              'Skip attestation and rely on network ACLs to prevent unauthorized binaries. with clear trade-offs and explicit operational constraints wit',
          ],
          correctIndex: 0,
            helperText: 'Edge fleets require hardware-backed integrity and anti-rollback guarantees.',
          },
          {
            id: 'hw-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: hardware observability',
            prompt: 'What observability signals should drive fleet operations?',
            options: [
  
  
              'Track per-device thermal margins, accelerator utilization, crash-loop rate, dropped-frame ratio, and model-quality drift with automated remediation hooks.',
              'Track only request counts and total bandwidth to keep telemetry volume low. with clear trade-offs and explicit operational constraints with clear trade-of',
              'Track only average CPU usage and ignore accelerator-specific counters. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Track uptime alone since hardware errors are visible through support tickets. with clear trade-offs and explicit operational constraints with clear trade-',
              'Track only cloud ingest success and assume local inference quality is stable. with clear trade-offs and explicit operational constraints with clear trade-',
              'Track p50 latency only because tail behavior is too noisy for operations. with clear trade-offs and explicit operational constraints with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Hardware operations depend on thermal, reliability, and quality signals together.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-backend-multitenant-workflow',
      difficulty: 'hard',
      prompt:
        'Design a multi-tenant backend workflow engine processing 75,000 workflow starts/s with strict idempotency, per-tenant isolation, and p95 API latency < 110ms. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat'],
      correctIndex: 0,
      correctExplanation:
        'Strong backend answers lock workflow semantics and tenant safety first, then define consistency and retry guarantees, then choose queueing, state storage, and orchestration internals. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Multi-Tenant Workflow Backend with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
        scenarioSummary:
          'Durable orchestration backend with retries, compensation, and tenant-level SLO/fairness isolation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'be-functional-state-machine-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
            title: 'Phase 1 - Functional requirements: workflow contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
            prompt: 'What must be specified before picking queue or storage technology? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs an',
            options: [
              'Workflow state machine semantics, retry policies, compensation behavior, and idempotent external action contracts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Start with broker selection and infer state machine constraints from broker capabilities. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Define dashboards first, then align workflow semantics to available metrics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tra',
              'Prioritize schema migration tooling before locking workflow transition rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
              'Use provider SDK defaults and postpone explicit compensation semantics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-of',
              'Defer idempotency requirements until downstream teams report duplicate side effects. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with c',
          ],
          correctIndex: 0,
            helperText: 'Workflow correctness starts with explicit transition and side-effect rules.',
          },
          {
            id: 'be-functional-tenant-boundaries',
            title: 'Phase 1 - Functional requirements: tenant boundaries',
            prompt: 'How should tenant isolation be expressed in requirements?',
            options: [
  
  
              'Define hard per-tenant quotas, burst limits, noisy-neighbor protections, and isolated dead-letter visibility/audit boundaries.',
              'Use best-effort fairness and trust global autoscaling to smooth tenant interference. with clear trade-offs and explicit operat',
              'Share all retry budgets globally because strict tenant limits reduce throughput. with clear trade-offs and explicit operationa',
              'Expose one global dead-letter queue and let tenants filter by metadata. with clear trade-offs and explicit operational constra',
              'Use one universal throttling profile regardless of tenant plan or workload shape. with clear trade-offs and explicit operation',
              'Delay isolation guarantees until after first-scale production incidents. with clear trade-offs and explicit operational constr',
          ],
          correctIndex: 0,
            helperText: 'Multi-tenant backends need explicit fairness and blast-radius limits.',
          },
          {
            id: 'be-nfr-consistency-idempotency',
            title: 'Phase 2 - Non-functional requirements: consistency and idempotency',
            prompt: 'What guarantee set is most appropriate?',
            options: [
  
  
              'Guarantee idempotent exactly-once business outcomes with at-least-once transport, durable dedupe records, and replay-safe handlers.',
              'Guarantee exactly-once transport end-to-end and skip application-level idempotency logic. with clear trade-offs and explicit operat',
              'Use at-most-once delivery to avoid duplicates even if some workflows are lost. with clear trade-offs and explicit operational const',
              'Rely on client retries only and avoid backend dedupe to keep latency low. with clear trade-offs and explicit operational constraint',
              'Guarantee only eventual workflow completion without explicit side-effect dedupe. with clear trade-offs and explicit operational con',
              'Treat duplicates as acceptable for non-financial tenants to simplify the platform. with clear trade-offs and explicit operational c',
          ],
          correctIndex: 0,
            helperText: 'Exactly-once business outcomes typically require idempotency above transport.',
          },
          {
            id: 'be-nfr-slo-error-budget',
            title: 'Phase 2 - Non-functional requirements: SLOs and error budgets',
            prompt: 'How should backend SLOs be defined?',
            options: [
  
  
              'Set endpoint-level p95 latency, workflow completion SLOs, and tenant-level error budgets with burn-rate alerting.',
              'Use one global median latency SLO and ignore completion/error metrics. with clear trade-offs and explicit operati',
              'Set only annual uptime targets without per-endpoint service goals. with clear trade-offs and explicit operational',
              'Define transport queue lag as the only reliability indicator. with clear trade-offs and explicit operational cons',
              'Use SLOs for premium tenants only and leave others best effort. with clear trade-offs and explicit operational co',
              'Track retries as success and exclude them from completion latency accounting. with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Backend SLOs should measure user-visible outcomes, not just infrastructure health.',
          },
          {
            id: 'be-capacity-queue-partitioning',
            title: 'Phase 3 - Scaling and capacity: queue partitioning',
            prompt: 'Which partitioning model best balances ordering and scale?',
            options: [
  
  
              'Partition by tenant + workflow key to preserve local ordering while scaling independently across shards.',
              'Use one global partition to preserve strict ordering for all workflow events. with clear trade-offs and.',
              'Partition randomly per message and rebuild ordering in consumers. with clear trade-offs and explicit ope',
              'Partition only by workflow type and ignore tenant skew. with clear trade-offs and explicit operational c',
              'Avoid partitioning and rely on larger brokers to absorb all load. with clear trade-offs and explicit ope',
              'Partition by API region only and merge tenant streams in memory later. with clear trade-offs and explici',
          ],
          correctIndex: 0,
            helperText: 'Key design should align with ordering boundaries and skew control.',
          },
          {
            id: 'be-capacity-state-storage',
            title: 'Phase 3 - Scaling and capacity: workflow state storage',
            prompt: 'How should workflow state be stored for replay and audit?',
            options: [
  
  
              'Persist durable workflow state transitions plus immutable event history, with snapshots for fast recovery and full audit replay.',
              'Store only latest state row and discard transition history to reduce storage cost. with clear trade-offs and explicit operationa',
              'Keep state in cache and periodically dump to object storage for backup. with clear trade-offs and explicit operational constrain',
              'Use log retention alone as source of truth and avoid persistent state tables. with clear trade-offs and explicit operational con',
              'Persist state only for failed workflows and treat successful runs as ephemeral. with clear trade-offs and explicit operational c',
              'Rely on downstream system logs to reconstruct orchestration decisions. with clear trade-offs and explicit operational constraint',
          ],
          correctIndex: 0,
            helperText: 'Replayable workflows require durable transitions and event lineage.',
          },
          {
            id: 'be-architecture-ingress',
            title: 'Phase 4 - Architecture decisions: ingress and API layer',
            prompt: 'What API architecture is strongest for this backend?',
            options: [
  
  
              'Use stateless API workers with strict auth/tenant policy checks, idempotency key enforcement, and durable enqueue before acknowledgment.',
              'Acknowledge immediately then attempt enqueue asynchronously to maximize throughput. with clear trade-offs and explicit operational const',
              'Run orchestration directly in request threads and avoid durable queues. with clear trade-offs and explicit operational constraints with.',
              'Expose broker endpoints to clients and move idempotency handling to SDKs. with clear trade-offs and explicit operational constraints wit',
              'Use one stateful API node per tenant to simplify ordering concerns. with clear trade-offs and explicit operational constraints with clea',
              'Batch all tenant requests in memory and flush when workers are idle. with clear trade-offs and explicit operational constraints with cle',
          ],
          correctIndex: 0,
            helperText: 'Ingress must protect correctness before expensive workflow execution.',
          },
          {
            id: 'be-architecture-execution',
            title: 'Phase 4 - Architecture decisions: execution engine',
            prompt: 'How should execution workers be organized?',
            options: [
  
  
              'Use pull-based worker pools with lease/heartbeat ownership, deterministic retries, and explicit compensation state transitions.',
              'Use push-only synchronous callbacks from broker to workers for each transition. with clear trade-offs and explicit operational.',
              'Allow workers to share in-memory state and elect owners opportunistically. with clear trade-offs and explicit operational const',
              'Run compensations manually from operations dashboards to avoid complexity. with clear trade-offs and explicit operational const',
              'Execute all retries immediately with zero jitter to reduce total completion time. with clear trade-offs and explicit operationa',
              'Store workflow decisions in worker memory and flush only on completion. with clear trade-offs and explicit operational constrai',
          ],
          correctIndex: 0,
            helperText: 'Deterministic ownership and retry behavior are essential at scale.',
          },
          {
            id: 'be-deep-dive-dedupe-store',
            title: 'Phase 5 - Component deep dive: dedupe store design',
            prompt: 'What dedupe approach best prevents duplicate side effects?',
            options: [
  
  
              'Use tenant-scoped idempotency keys + payload hash with durable status records and replay-safe response caching.',
              'Use request timestamp as dedupe key and expire immediately after acknowledgment. with clear trade-offs and expl',
              'Use in-memory dedupe maps per worker to avoid database overhead. with clear trade-offs and explicit operational',
              'Dedupe only on final step completion and ignore intermediate duplicate actions. with clear trade-offs and expli',
              'Use random UUID regeneration on retries to avoid key collisions. with clear trade-offs and explicit operational',
              'Rely solely on downstream APIs for duplicate suppression. with clear trade-offs and explicit operational constr',
          ],
          correctIndex: 0,
            helperText: 'Dedupe must survive retries, restarts, and multi-region failover.',
          },
          {
            id: 'be-deep-dive-backpressure',
            title: 'Phase 5 - Component deep dive: backpressure and fairness',
            prompt: 'How should overload be handled without tenant starvation?',
            options: [
  
  
              'Apply per-tenant token buckets, weighted fair scheduling, and queue-depth shedding with transparent retry-after contracts.',
              'Throttle globally when any queue crosses threshold to keep logic simple. with clear trade-offs and explicit operational co',
              'Disable retries during overload and fail all in-flight workflows immediately. with clear trade-offs and explicit operation',
              'Allow large tenants unlimited burst because they pay for higher usage. with clear trade-offs and explicit operational cons',
              'Pause dead-letter handling during overload to free worker capacity. with clear trade-offs and explicit operational constra',
              'Scale workers only on CPU and ignore queue-depth or age metrics. with clear trade-offs and explicit operational constraint',
          ],
          correctIndex: 0,
            helperText: 'Fairness-aware backpressure prevents noisy-neighbor collapse.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-mobile-offline-sync',
      difficulty: 'hard',
      prompt:
        'Design a mobile collaboration app with offline-first edits, 60M DAU, and sync convergence under 3 seconds after reconnect while preserving battery and data budgets. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation'],
      correctIndex: 0,
      correctExplanation:
        'Strong mobile design answers start with offline semantics and conflict rules, then optimize sync and battery/network cost, then choose data model, transport, and client-state strategies. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Mobile Offline-First Sync Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
        scenarioSummary:
          'Large-scale mobile architecture balancing offline reliability, fast sync convergence, and device constraints. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'mobile-functional-offline-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
            title: 'Phase 1 - Functional requirements: offline contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
            prompt: 'What should be specified first for mobile offline behavior? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
            options: [
              'Define offline create/edit/delete semantics, local commit guarantees, and user-visible conflict states before transport details. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Choose push provider first and infer offline semantics from reconnect notifications. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
              'Prioritize animation smoothness targets before deciding data consistency semantics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
              'Design server schema first and let mobile infer offline behavior from API failures. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
              'Use optimistic UI everywhere and postpone conflict handling to v2. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Disable offline edits for complex entities to avoid conflict rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and.',
          ],
          correctIndex: 0,
            helperText: 'Offline-first design begins with explicit local behavior guarantees.',
          },
          {
            id: 'mobile-functional-conflict-resolution',
            title: 'Phase 1 - Functional requirements: conflict resolution',
            prompt: 'How should conflicts be handled?',
            options: [
  
  
              'Define deterministic merge policy per entity type, plus user-visible resolution flows when automatic merge confidence is low.',
              'Use last-write-wins globally because it is easiest to implement at scale. with clear trade-offs and explicit operational cons',
              'Reject all edits made offline if any conflict is detected. with clear trade-offs and explicit operational constraints with cl',
              'Keep both versions indefinitely and let analytics infer the preferred outcome. with clear trade-offs and explicit operational',
              'Resolve conflicts only on server and never surface to users. with clear trade-offs and explicit operational constraints with.',
              'Resolve conflicts by whichever device reconnects first. with clear trade-offs and explicit operational constraints with clear',
          ],
          correctIndex: 0,
            helperText: 'Conflict policy must be deterministic and user-trust preserving.',
          },
          {
            id: 'mobile-nfr-battery-network',
            title: 'Phase 2 - Non-functional requirements: battery and data budget',
            prompt: 'Which NFR framing is most appropriate for mobile constraints?',
            options: [
  
  
              'Set sync freshness SLOs with explicit background battery and network byte budgets, including adaptive sync tiers by app/device state.',
              'Optimize freshness only and allow unrestricted background networking. with clear trade-offs and explicit operational constraints with',
              'Use fixed 1-second polling on all devices to keep sync logic simple. with clear trade-offs and explicit operational constraints with.',
              'Disable background sync entirely and force manual refresh on reconnect. with clear trade-offs and explicit operational constraints wi',
              'Use only median battery impact metrics and ignore heavy-tail device impact. with clear trade-offs and explicit operational constraint',
              'Treat battery use as an OS-level concern outside system design scope. with clear trade-offs and explicit operational constraints with',
          ],
          correctIndex: 0,
            helperText: 'Mobile quality is constrained by battery and bandwidth, not just latency.',
          },
          {
            id: 'mobile-nfr-reconnect-convergence',
            title: 'Phase 2 - Non-functional requirements: reconnect convergence',
            prompt: 'How should reconnect convergence be defined?',
            options: [
  
  
              'Define measurable convergence SLOs (for example, 95% of reconnects fully synced in < 3s) with bounded backlog replay behavior.',
              'Track only successful reconnect count and ignore convergence duration. with clear trade-offs and explicit operational constrai',
              'Treat convergence as eventual best effort without explicit timing targets. with clear trade-offs and explicit operational cons',
              'Require full-state resync on every reconnect to avoid delta complexity. with clear trade-offs and explicit operational constra',
              'Use one global timeout and classify partial sync as success. with clear trade-offs and explicit operational constraints with c',
              'Defer convergence SLOs until after launch due to device variance. with clear trade-offs and explicit operational constraints w',
          ],
          correctIndex: 0,
            helperText: 'Reconnect quality should be explicit and quantifiable.',
          },
          {
            id: 'mobile-capacity-sync-model',
            title: 'Phase 3 - Scaling and capacity: sync model',
            prompt: 'What sync strategy scales best for mobile clients?',
            options: [
  
  
              'Use incremental delta sync with version vectors/checkpoints and selective entity subscription, rather than full-state transfer.',
              'Use full snapshot downloads on every foreground resume. with clear trade-offs and explicit operational constraints with clear t',
              'Use push-only invalidation with no pull/delta fallback. with clear trade-offs and explicit operational constraints with clear t',
              'Use one global ordered feed for all users and filter on device. with clear trade-offs and explicit operational constraints with',
              'Use periodic CSV bundle downloads per account for deterministic sync. with clear trade-offs and explicit operational constraint',
              'Use stateless endpoints that ignore client sync cursors for simplicity. with clear trade-offs and explicit operational constrai',
          ],
          correctIndex: 0,
            helperText: 'Delta sync with bounded metadata is key for mobile scalability.',
          },
          {
            id: 'mobile-capacity-local-storage',
            title: 'Phase 3 - Scaling and capacity: local persistence',
            prompt: 'How should on-device storage be organized?',
            options: [
  
  
              'Use local transactional storage with operation log + materialized views, plus compaction and TTL policy for old sync metadata.',
              'Keep all state in memory and rehydrate from network on app resume. with clear trade-offs and explicit operational constraints.',
              'Store only rendered UI snapshots and infer data state from view models. with clear trade-offs and explicit operational constra',
              'Persist full server responses as opaque blobs with no indexing. with clear trade-offs and explicit operational constraints wit',
              'Use one table per API endpoint to mirror backend route layout. with clear trade-offs and explicit operational constraints with',
              'Delete local history frequently to avoid implementing compaction. with clear trade-offs and explicit operational constraints w',
          ],
          correctIndex: 0,
            helperText: 'Durable local logs and indexed views improve resilience and startup speed.',
          },
          {
            id: 'mobile-architecture-client-state',
            title: 'Phase 4 - Architecture decisions: client state architecture',
            prompt: 'Which client architecture best supports offline and sync correctness?',
            options: [
  
  
              'Use unidirectional state with explicit mutation queue, optimistic reducer updates, and reconciliation pipeline tied to sync acks.',
              'Mutate UI state directly per screen and sync opportunistically when navigation changes. with clear trade-offs and explicit operat',
              'Use only server-driven rendering to avoid local state complexity. with clear trade-offs and explicit operational constraints with',
              'Treat local cache as transient and re-request full entities after each action. with clear trade-offs and explicit operational con',
              'Drive all writes through background workers and avoid user-visible optimistic updates. with clear trade-offs and explicit operati',
              'Use shared global mutable singleton state without operation journaling. with clear trade-offs and explicit operational constraint',
          ],
          correctIndex: 0,
            helperText: 'Offline correctness depends on explicit mutation journaling and reconciliation.',
          },
          {
            id: 'mobile-architecture-transport',
            title: 'Phase 4 - Architecture decisions: transport and push',
            prompt: 'How should push and pull sync be combined?',
            options: [
  
  
              'Use push for invalidation hints and pull delta for authoritative sync, with backoff/jitter and foreground/background policies.',
              'Use push-only with no pull fallback for missed notifications. with clear trade-offs and explicit operational constraints with.',
              'Use pull-only fixed interval and ignore push channels to simplify infra. with clear trade-offs and explicit operational constr',
              'Use websocket-only sync in background regardless of OS restrictions. with clear trade-offs and explicit operational constraint',
              'Use one sync channel per entity type and keep them permanently connected. with clear trade-offs and explicit operational const',
              'Use manual user-triggered sync only for reliability. with clear trade-offs and explicit operational constraints with clear tra',
          ],
          correctIndex: 0,
            helperText: 'Reliable mobile sync combines hinting (push) with authoritative pulls.',
          },
          {
            id: 'mobile-deep-dive-duplicate-prevention',
            title: 'Phase 5 - Component deep dive: duplicate mutation prevention',
            prompt: 'What is the strongest duplicate prevention strategy?',
            options: [
  
  
              'Use client-generated operation ids with durable local mapping to server ack state and server-side idempotency validation.',
              'Use client timestamps as dedupe keys and drop close-time duplicates. with clear trade-offs and explicit operational const',
              'Dedupe only by payload hash at server and ignore operation identity. with clear trade-offs and explicit operational const',
              'Rely on transport exactly-once guarantees and skip app-layer dedupe. with clear trade-offs and explicit operational const',
              'Only dedupe while app is in memory; restart clears operation identity. with clear trade-offs and explicit operational con',
              'Issue fresh operation ids on every retry to avoid collisions. with clear trade-offs and explicit operational constraints.',
          ],
          correctIndex: 0,
            helperText: 'Operation identity must survive app restarts and network retries.',
          },
          {
            id: 'mobile-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: mobile observability',
            prompt: 'Which telemetry set best reflects mobile sync health?',
            options: [
  
  
              'Track sync convergence latency, conflict rate, operation retry depth, background battery cost, and bytes per active user segmented by device class.',
              'Track only app startup latency and crash-free sessions. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Track only API success rates without client-side queue metrics. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Track only median sync time and ignore long-tail reconnect failures. with clear trade-offs and explicit operational constraints with clear trade-of',
              'Track only push notification delivery rate. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Track only server CPU and memory metrics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
          ],
          correctIndex: 0,
            helperText: 'Mobile reliability needs both client and backend telemetry.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-global-app-shell',
      difficulty: 'hard',
      prompt:
        'Design a global frontend platform for a large web app serving 320,000 req/s with p95 TTI < 2.5s on mid-tier mobile devices and safe microfrontend rollout. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera'],
      correctIndex: 0,
      correctExplanation:
        'Great frontend answers define user-critical rendering flows first, then performance and resilience budgets, then pick delivery architecture, state boundaries, and rollout safeguards. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Frontend App Shell Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
        scenarioSummary:
          'Frontend architecture for fast rendering, microfrontend safety, and global reliability at high traffic. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'fe-functional-rendering-flows with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
            title: 'Phase 1 - Functional requirements: rendering flows with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
            prompt: 'What should be locked before deciding SSR/CSR details? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
            options: [
              'Define critical user journeys, above-the-fold content requirements, interaction readiness expectations, and offline/error UI behavior per route at scale. with clear trade-offs and explicit operational constra',
              'Choose the framework hydration strategy first, then derive user paths, layout rules, and interaction timing from the implementation constraints at scale. with clear trade-offs and explicit operational constra',
              'Start with bundler architecture, then derive rendering constraints, chunking rules, and route budgets from the tooling limits and release cadence in use. with clear trade-offs and explicit operational constra',
              'Define analytics schemas first because telemetry shapes route strategy, not because it defines the visible rendering contract for the app shell at scale. with clear trade-offs and explicit operational constra',
              'Choose the CDN provider first and postpone rendering semantics, cache behavior, and hydration policy until implementation details are locked down in use. with clear trade-offs and explicit operational constra',
              'Prioritize token system design before route-level performance behavior, hydration timing, and fallback rendering policy are fully defined for production. with clear trade-offs and explicit operational constra',
          ],
          correctIndex: 0,
            helperText: 'Frontend architecture should start from user-visible rendering outcomes.',
          },
          {
            id: 'fe-functional-failure-ux',
            title: 'Phase 1 - Functional requirements: failure UX',
            prompt: 'Which failure behavior should be explicitly required?',
            options: [
  
  
              'Define deterministic fallback UX for JS chunk load failure, stale config, API timeout, and partial microfrontend outage.',
              'Show a generic error page for any client-side failure to keep behavior simple. with clear trade-offs and explicit operat',
              'Retry indefinitely in the browser without exposing failure states to users. with clear trade-offs and explicit operation',
              'Treat microfrontend outage as acceptable and leave host shell unchanged. with clear trade-offs and explicit operational.',
              'Require full page reload on all API failures to avoid local error handling. with clear trade-offs and explicit operation',
              'Delay failure UX requirements until A/B test results are available. with clear trade-offs and explicit operational const',
          ],
          correctIndex: 0,
            helperText: 'Resilient frontend design includes clear degraded UX behavior.',
          },
          {
            id: 'fe-nfr-performance-budgets',
            title: 'Phase 2 - Non-functional requirements: performance budgets',
            prompt: 'How should frontend performance goals be framed?',
            options: [
  
  
              'Set route-level budgets for TTFB, LCP, TTI/INP, JS payload size, and hydration cost across representative device/network cohorts.',
              'Track only average page load time because percentile metrics vary too much by user. with clear trade-offs and explicit operationa',
              'Set one global page weight limit and treat all routes as equal. with clear trade-offs and explicit operational constraints with c',
              'Optimize desktop first and treat mobile regressions as acceptable trade-off. with clear trade-offs and explicit operational const',
              'Use synthetic lab p50 only and ignore real-user monitoring. with clear trade-offs and explicit operational constraints with clear',
              'Measure backend API latency only and infer frontend performance from it. with clear trade-offs and explicit operational constrain',
          ],
          correctIndex: 0,
            helperText: 'Frontend SLOs need route and cohort-specific budgets.',
          },
          {
            id: 'fe-nfr-rollout-safety',
            title: 'Phase 2 - Non-functional requirements: rollout safety',
            prompt: 'What rollout objective set best protects frontend reliability?',
            options: [
  
  
              'Use staged rollout with config flags, real-user guardrails, and automatic rollback on error-rate/performance regressions.',
              'Deploy all microfrontends simultaneously to avoid version drift. with clear trade-offs and explicit operational constrain',
              'Roll back only after manual triage to avoid false alarms. with clear trade-offs and explicit operational constraints with',
              'Gate rollout solely on synthetic test pass/fail without production telemetry. with clear trade-offs and explicit operatio',
              'Allow each microfrontend to deploy independently with no compatibility policy. with clear trade-offs and explicit operati',
              'Disable source maps in production so incident handling is faster. with clear trade-offs and explicit operational constrai',
          ],
          correctIndex: 0,
            helperText: 'Frontend safety requires telemetry-based progressive delivery.',
          },
          {
            id: 'fe-capacity-asset-delivery',
            title: 'Phase 3 - Scaling and capacity: asset delivery',
            prompt: 'What delivery strategy best handles global traffic bursts?',
            options: [
  
  
              'Use immutable content-hashed assets on CDN, route-level code splitting, and preconnect/prefetch hints for critical navigations.',
              'Serve assets from origin and let edge caching remain opportunistic. with clear trade-offs and explicit operational constraints.',
              'Bundle the app into one JS artifact to simplify request coordination. with clear trade-offs and explicit operational constraint',
              'Use short TTL mutable asset URLs to speed hotfix propagation. with clear trade-offs and explicit operational constraints with c',
              'Inline route code in HTML for simpler release management. with clear trade-offs and explicit operational constraints with clear',
              'Push all microfrontend assets through one shared versionless bundle. with clear trade-offs and explicit operational constraints',
          ],
          correctIndex: 0,
            helperText: 'Global scale frontend delivery depends on immutable caching and split points.',
          },
          {
            id: 'fe-capacity-rendering-mode',
            title: 'Phase 3 - Scaling and capacity: rendering mode selection',
            prompt: 'Which rendering strategy is strongest for mixed route types?',
            options: [
  
  
              'Use hybrid rendering: SSR/streaming for critical SEO and first-view routes, CSR for highly interactive authenticated surfaces.',
              'Use pure CSR for all routes regardless of SEO and first paint needs. with clear trade-offs and explicit operational constraint',
              'Use pure SSR for all routes including heavy dashboards and editors. with clear trade-offs and explicit operational constraints',
              'Use static export for every route and patch dynamic data client-side. with clear trade-offs and explicit operational constrain',
              'Use iframe-isolated rendering per feature to simplify ownership boundaries. with clear trade-offs and explicit operational con',
              'Use server HTML only and disable client hydration entirely. with clear trade-offs and explicit operational constraints with cl',
          ],
          correctIndex: 0,
            helperText: 'Route-level rendering choices should reflect UX and SEO requirements.',
          },
          {
            id: 'fe-architecture-microfrontend-boundaries',
            title: 'Phase 4 - Architecture decisions: microfrontend boundaries',
            prompt: 'How should boundaries be defined for microfrontends?',
            options: [
  
  
              'Define domain-based boundaries with versioned contracts, shared design/runtime primitives, and host-enforced compatibility checks.',
              'Split by team count only and allow free-form runtime integration patterns. with clear trade-offs and explicit operational constrai',
              'Share all global state directly between microfrontends for convenience. with clear trade-offs and explicit operational constraints',
              'Use independent CSS resets per microfrontend without host scoping. with clear trade-offs and explicit operational constraints with',
              'Allow each microfrontend to choose arbitrary router behavior in production. with clear trade-offs and explicit operational constra',
              'Treat boundary contracts as optional if end-to-end tests pass. with clear trade-offs and explicit operational constraints with cle',
          ],
          correctIndex: 0,
            helperText: 'Microfrontend scale depends on explicit contracts and isolation rules.',
          },
          {
            id: 'fe-architecture-state-and-data',
            title: 'Phase 4 - Architecture decisions: state and data fetching',
            prompt: 'What data/state strategy minimizes frontend inconsistency?',
            options: [
  
  
              'Use scoped state ownership with shared query/cache layer, normalized invalidation policy, and host-level auth/session lifecycle control.',
              'Use one global mutable state object across all microfrontends. with clear trade-offs and explicit operational constraints with clear tra',
              'Let each microfrontend invent independent auth token refresh logic. with clear trade-offs and explicit operational constraints with clea',
              'Disable client caching to prevent stale UI. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Fetch all data from host shell and pass every payload through props. with clear trade-offs and explicit operational constraints with cle',
              'Rely on browser reload for cross-feature data consistency. with clear trade-offs and explicit operational constraints with clear trade-o',
          ],
          correctIndex: 0,
            helperText: 'Frontend consistency requires clear ownership and shared fetch contracts.',
          },
          {
            id: 'fe-deep-dive-bundle-governance',
            title: 'Phase 5 - Component deep dive: bundle governance',
            prompt: 'How should bundle growth be controlled over time?',
            options: [
  
  
              'Enforce CI size budgets per route and dependency policy gates, with automatic regression diffing and owner accountability.',
              'Track only total app bundle size monthly and optimize manually when needed. with clear trade-offs and explicit operational',
              'Allow unlimited dependency additions and rely on CDN caching to offset bloat. with clear trade-offs and explicit operation',
              'Optimize only initial route and ignore post-login route growth. with clear trade-offs and explicit operational constraints',
              'Minify harder and skip structural code-splitting governance. with clear trade-offs and explicit operational constraints wi',
              'Measure bundle size in development builds for faster feedback. with clear trade-offs and explicit operational constraints.',
          ],
          correctIndex: 0,
            helperText: 'Sustainable frontend performance needs governance, not one-time tuning.',
          },
          {
            id: 'fe-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: frontend observability',
            prompt: 'Which observability stack is most useful for production quality?',
            options: [
  
  
              'Combine real-user performance metrics, client error tracing with release correlation, and feature-flag scoped health dashboards.',
              'Track only server logs because client telemetry is noisy and expensive. with clear trade-offs and explicit operational constrain',
              'Track only synthetic lighthouse scores in CI. with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Track only JS exception counts with no route or release dimensions. with clear trade-offs and explicit operational constraints w',
              'Track only conversion metrics and infer technical quality from business KPIs. with clear trade-offs and explicit operational con',
              'Use sampling so low that tail regressions are rarely captured. with clear trade-offs and explicit operational constraints with c',
          ],
          correctIndex: 0,
            helperText: 'Frontend incident response needs release-aware, route-aware client telemetry.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-global-search-indexing',
      difficulty: 'hard',
      prompt:
        'Design a global search indexing platform supporting 180,000 queries/s, 25,000 document writes/s, p95 query latency < 100ms, and index freshness within 5 seconds of ingest. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define query semantics and freshness contracts first, then reason about inverted index design, shard routing, and near-real-time ingestion before committing to ranking or replication architecture. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Search Indexing Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
        scenarioSummary:
          'High-throughput full-text search with near-real-time freshness, ranking, and multi-region read availability. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'search-functional-query-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
            title: 'Phase 1 - Functional requirements: query contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
            prompt: 'Which behaviors should be locked before indexing architecture is designed? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
            options: [
              'Full-text match semantics, field boosting rules, supported filter/facet dimensions, and pagination/cursor behavior with defined freshness SLA. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Choose the search framework first and infer feature depth from its operators. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Start with the ranking model and derive query DSL from feature dependencies. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Define storage layout first and constrain semantics to what indexes support cheaply. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Start with autocomplete behavior and treat full-text results as secondary. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Defer the query contract until production usage reveals actual demand. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
          ],
          correctIndex: 0,
            helperText: 'Query semantics drive index shape, not the other way around.',
          },
          {
            id: 'search-functional-freshness',
            title: 'Phase 1 - Functional requirements: freshness and delete propagation',
            prompt: 'What correctness requirements govern document lifecycle?',
            options: [
  
  
              'Define hard freshness SLAs for new documents and deletions, with explicit tombstone propagation, and document version conflict resolution on concurrent updates.',
              'Accept stale results for up to one hour to reduce indexing pressure. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Propagate deletions only in nightly batch to keep ingest pipelines simple. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Treat writes as additive and use ranking demotion for outdated content. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Resolve update conflicts by preferring the oldest version for stability. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Skip freshness requirements for lower-tier content categories. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
          ],
          correctIndex: 0,
            helperText: 'Freshness and deletion correctness are user-visible quality requirements.',
          },
          {
            id: 'search-nfr-latency-availability',
            title: 'Phase 2 - Non-functional requirements: latency and availability',
            prompt: 'How should query service goals be expressed?',
            options: [
  
  
              'Set p95/p99 query latency budgets per endpoint, availability targets per region, and degraded-mode behavior when primary shards are unavailable.',
              'Optimize median latency only since long-tail users tolerate worse networks. with clear trade-offs and explicit operational constraints with clea',
              'Define availability only as annual uptime and skip per-query latency goals. with clear trade-offs and explicit operational constraints with clea',
              'Allow unbounded latency on highly filtered queries. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Use single-region SLOs and treat cross-region traffic as best-effort. with clear trade-offs and explicit operational constraints with clear trad',
              'Track only indexing throughput and measure query latency later. with clear trade-offs and explicit operational constraints with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Search quality depends on both freshness and low-latency serving guarantees.',
          },
          {
            id: 'search-capacity-shard-design',
            title: 'Phase 3 - Scaling and capacity: shard design',
            prompt: 'What shard strategy best handles growth and hot queries?',
            options: [
  
  
              'Use content-aware hash sharding with bounded shard size, replica routing for read scaling, and pre-split policies for anticipated hot corpora.',
              'Use one large shard per region and scale vertically as latency rises. with clear trade-offs and explicit operational constraints with clear tr',
              'Shard by query origin so reads stay local to the requester. with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Shard only by document creation date for simple pruning. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Avoid sharding and lean on replication for read scaling. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Shard randomly per document to smooth write distribution. with clear trade-offs and explicit operational constraints with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Sharding must balance write distribution with query locality.',
          },
          {
            id: 'search-capacity-ingest-pipeline',
            title: 'Phase 3 - Scaling and capacity: ingest pipeline',
            prompt: 'What ingest design achieves 5-second freshness at 25k writes/s?',
            options: [
  
  
              'Use a partitioned durable write queue feeding stateless indexers with bounded processing latency, segment merging budgets, and backpressure-aware admission.',
              'Write directly to index shards synchronously and retry failures inline. with clear trade-offs and explicit operational constraints with clear trade-offs and',
              'Buffer writes in memory and flush every 60 seconds for efficiency. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Accept writes to object storage and rebuild segments nightly. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Force full index rebuilds on every batch for consistency. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Skip queueing and process ingest on the query fleet. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
          ],
          correctIndex: 0,
            helperText: 'Near-real-time freshness needs fast, bounded pipeline stages.',
          },
          {
            id: 'search-architecture-query-path',
            title: 'Phase 4 - Architecture decisions: query path',
            prompt: 'How should a query traverse the system to produce ranked results?',
            options: [
  
  
              'Fan out to shard replicas, gather top-K candidates, merge and re-rank through a dedicated ranking service, then apply ACL/visibility filters before response.',
              'Query all documents on a single node and rank after a full scan. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Apply ranking inside each shard and skip merge coordination. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
              'Cache entire result sets at CDN to avoid shard fan-out overhead. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Forward queries to one primary shard and retrieve results sequentially. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Delegate ranking to the client to reduce server CPU usage. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'Scatter-gather with a ranking merge step is the standard at scale.',
          },
          {
            id: 'search-architecture-ranking',
            title: 'Phase 4 - Architecture decisions: ranking and personalization',
            prompt: 'Where should ranking computation live?',
            options: [
  
  
              'Use a centralized ranking service with pre-computed feature cache, A/B-gated model versions, and fallback to heuristic scoring under dependency failures.',
              'Embed ranking directly in each shard to eliminate a network hop. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Compute ranking in the client browser to keep infrastructure stateless. with clear trade-offs and explicit operational constraints with clear trade-offs.',
              'Use only BM25 scores and avoid model-based ranking. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Run ranking in batch nightly and serve precomputed scores from cache. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Delegate ranking to the search framework\\\'s built-in relevance tuning. with clear trade-offs and explicit operational constraints with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Ranking services need versioning, failover, and feature isolation.',
          },
          {
            id: 'search-deep-dive-index-merge',
            title: 'Phase 5 - Component deep dive: segment merge strategy',
            prompt: 'How should background segment merging be balanced against query latency?',
            options: [
  
  
              'Use tiered merging with I/O budget caps during peak query hours and accelerated merge windows during off-peak, with shard-level circuit breakers on latency.',
              'Merge all segments immediately on ingest regardless of query load. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Disable background merging and let segment count grow over time. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Merge only when operators trigger it through a maintenance console. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Use one fixed merge schedule for all shards. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Tolerate unbounded segment growth to minimize merge CPU cost. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Merge scheduling directly affects both query latency and freshness.',
          },
          {
            id: 'search-deep-dive-multiregion-replication',
            title: 'Phase 5 - Component deep dive: multi-region replication',
            prompt: 'How should index state be made available globally with bounded lag?',
            options: [
  
  
              'Replicate mutation logs to follower regions asynchronously, with bounded replication lag alerts and regional read-fallback policy during primary outages.',
              'Maintain a single write region and accept higher latency elsewhere. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Independently re-index all documents in every region to avoid lag. with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Use object storage snapshots as the only cross-region sync mechanism. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Propagate updates globally using full segment copies per write. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Allow regional divergence indefinitely and reconcile later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
          ],
          correctIndex: 0,
            helperText: 'Log-based replication with observable lag is better than full resync at scale.',
          },
        ],
      },
    }
]

export default data
