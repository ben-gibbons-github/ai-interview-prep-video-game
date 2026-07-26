const data = [
  {
      id: 'hard-multi-section-system-design-ad-serving-engine',
      difficulty: 'hard',
      prompt:
        'Design a real-time ad serving engine handling 900,000 auction requests/s with p99 auction latency < 30ms, strong budget enforcement, and sub-second pacing updates. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa'],
      correctIndex: 0,
      correctExplanation:
        'High-quality ad-serving answers start with auction semantics and budget invariants, then define latency and pacing goals, then choose targeting, bidding, and spend-tracking architectures. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Real-Time Ad Serving Engine with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
        scenarioSummary:
          'Sub-30ms auction pipeline with strict budget pacing, targeting, and click attribution correctness. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'ads-functional-auction-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
            title: 'Phase 1 - Functional requirements: auction contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
            prompt: 'What must be defined before any architecture is drawn? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
            options: [
              'Auction type (first/second price), bid eligibility rules, reserve price semantics, and ad quality filtering behavior before any winner is rendered. with clear trade-offs and explicit operational constraints with c',
              'Choose the ML ranking model first and derive auction semantics from outputs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
              'Start with reporting requirements and infer auction logic from billing needs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
              'Define CDN configuration first because creative latency constrains design. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
              'Prioritize ad fraud rules before locking auction outcome semantics. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Treat auction type as a configurable implementation detail. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Auction correctness depends on explicit, locked contract semantics.',
          },
          {
            id: 'ads-functional-budget-semantics',
            title: 'Phase 1 - Functional requirements: budget and pacing',
            prompt: 'Which budget control requirements must be locked up front?',
            options: [
  
  
              'Hard daily/lifetime budget caps with bounded overspend tolerance, sub-second pacing signal latency, and deterministic behavior when budgets are exhausted.',
              'Treat budget enforcement as a billing reconciliation concern. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Use weekly budget windows and average spend across days. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Allow unlimited overspend during peak inventory windows. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Delegate pacing logic to bidder SDKs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
              'Define budgets only for premium advertisers. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
          ],
          correctIndex: 0,
            helperText: 'Advertiser trust depends on hard budget guarantees, not eventual correction.',
          },
          {
            id: 'ads-nfr-latency-budget',
            title: 'Phase 2 - Non-functional requirements: latency',
            prompt: 'How should sub-30ms p99 auction latency be maintained?',
            options: [
  
  
              'Set per-stage latency budgets for candidate retrieval, bid scoring, budget check, and winner selection with hard shed rules when any stage exceeds its budget.',
              'Optimize median auction latency only and accept occasional long tails. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Use a global p99 and let pipeline stages manage timing locally. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Prioritize fill rate over latency and expand timeouts during peaks. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Cache every auction result for 1 second. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'Handle latency only through horizontal scaling. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
          ],
          correctIndex: 0,
            helperText: 'End-to-end latency budgets must be partitioned across pipeline stages.',
          },
          {
            id: 'ads-nfr-attribution-correctness',
            title: 'Phase 2 - Non-functional requirements: attribution correctness',
            prompt: 'What attribution accuracy guarantee is most appropriate?',
            options: [
  
  
              'Guarantee exactly-once click and impression attribution to the correct campaign and creative, with durable dedupe records and reconciliation against billing.',
              'Accept at-least-once attribution because duplicates are rare. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Record only sampled impressions and extrapolate billing counts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Attribute asynchronously in batch and let advertisers report gaps. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Use client-side attribution only to reduce server load. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Treat parity as aspirational rather than guaranteed. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
          ],
          correctIndex: 0,
            helperText: 'Billing depends on idempotent, auditable attribution.',
          },
          {
            id: 'ads-capacity-candidate-retrieval',
            title: 'Phase 3 - Scaling and capacity: candidate retrieval',
            prompt: 'What retrieval strategy returns eligible ads within budget?',
            options: [
  
  
              'Use in-memory targeting indexes with pre-filtered active campaigns, contextual and audience segment matching, and budget eligibility checks before scoring.',
              'Scan all campaigns on every auction and rely on faster CPUs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Use a single global eligibility list refreshed every minute. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Delegate targeting to each bidder SDK before filtering. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
              'Use ML embedding nearest-neighbor as the sole retrieval method. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Cache eligibility decisions for 10 minutes to reduce CPU. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
          ],
          correctIndex: 0,
            helperText: 'Fast candidate retrieval is the latency critical path for auctions.',
          },
          {
            id: 'ads-capacity-spend-tracking',
            title: 'Phase 3 - Scaling and capacity: spend tracking',
            prompt: 'How should real-time budget consumption be tracked at 900k req/s?',
            options: [
  
  
              'Use in-memory distributed counters with periodic durable flush, probabilistic early-stop on budget exhaustion, and bounded overspend windows.',
              'Write every impression to a central OLTP database and read spend inline. with clear trade-offs and explicit operational constraints with clea',
              'Compute spend only at end of day and pace from yesterday\\\'s data. with clear trade-offs and explicit operational constraints with clear trade',
              'Use client-side spend estimation and reconcile weekly. with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Store spend exclusively in message queues and derive from offsets. with clear trade-offs and explicit operational constraints with clear trad',
              'Track spend only in the analytics warehouse. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
          ],
          correctIndex: 0,
            helperText: 'Budget enforcement at auction latency requires in-memory, tolerable-precision counters.',
          },
          {
            id: 'ads-architecture-auction-pipeline',
            title: 'Phase 4 - Architecture decisions: auction pipeline',
            prompt: 'What pipeline architecture supports sub-30ms with correctness?',
            options: [
  
  
              'Use a staged pipeline of parallel targeting, bid scoring, budget gate, and winner selection services with clear interface contracts and fallback paths per stage.',
              'Run all auction stages in one monolithic process per server. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Use sequential single-threaded processing to preserve ordering. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Execute auction logic client-side and verify only the winner server-side. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Share one global auction queue and process requests in strict FIFO. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Rely on CDN edge to run full auction logic without origin support. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Stage isolation enables independent optimization and safe fallback behavior.',
          },
          {
            id: 'ads-architecture-pacing',
            title: 'Phase 4 - Architecture decisions: pacing controller',
            prompt: 'How should dynamic pacing signals be propagated to auction workers?',
            options: [
  
  
              'Publish per-campaign pacing coefficients from a central pacing service to in-memory worker state with sub-second refresh and graceful stale fallback.',
              'Pull pacing updates only when a campaign exhausts its budget. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Compute pacing inline per auction request from live spend data. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Use static pacing curves defined at campaign creation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Broadcast full campaign state on every update. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Let each auction server maintain its own pacing state. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Pacing signals need low-latency propagation with graceful staleness handling.',
          },
          {
            id: 'ads-deep-dive-fraud-invalid-traffic',
            title: 'Phase 5 - Component deep dive: invalid traffic filtering',
            prompt: 'How should fraudulent impressions be excluded without hurting latency?',
            options: [
  
  
              'Apply pre-auction bot/IVT scoring using pre-computed device and user signals with a fast accept/reject path, plus async post-auction deeper analysis and credit-back.',
              'Run full fraud ML models inline in every auction before bid scoring. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
              'Filter invalid traffic only in post-click attribution reports and refund advertisers manually. with clear trade-offs and explicit operational constraints with clear.',
              'Rely entirely on publisher-side filtering and trust all requests arriving at auction. with clear trade-offs and explicit operational constraints with clear trade-off',
              'Flag invalid traffic in batch nightly and exclude campaigns retroactively. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Use IP block lists as the only fraud signal to keep pre-auction logic simple. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
          ],
          correctIndex: 0,
            helperText: 'Fraud filtering must be tiered: fast pre-auction signals plus deeper async analysis.',
          },
          {
            id: 'ads-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: auction observability',
            prompt: 'Which metrics should drive auction health and spend correctness?',
            options: [
  
  
              'Track auction win rate, fill rate, per-stage latency percentiles, budget utilization accuracy, and attribution lag with campaign-level granularity.',
              'Track only total request volume and daily spend against budget. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Track only server CPU and memory. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
              'Track only click-through rate as the primary health signal. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Track only p50 auction latency and ignore p99. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Track only publisher fill rate and leave spend to billing. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
          ],
          correctIndex: 0,
            helperText: 'Ad systems need latency, spend, and attribution metrics all in real time.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-iot-sensor-mesh',
      difficulty: 'hard',
      prompt:
        'Design a global IoT sensor mesh ingesting 4 million device telemetry events per second with per-device command delivery under 800ms, firmware OTA safety, and 99.9% ingest durability. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints'],
      correctIndex: 0,
      correctExplanation:
        'Strong IoT answers lock device telemetry and command semantics first, then define durability and delivery guarantees, then choose ingestion topology, command routing, and fleet management architecture. with clear trade-offs wi',
      multiSectionSystemDesign: {
        title: 'Global IoT Sensor Mesh Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
        scenarioSummary:
          'Massive-scale device telemetry ingestion with bidirectional command delivery and safe OTA rollout. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with with',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'iot-functional-device-protocol with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear with cl',
            title: 'Phase 1 - Functional requirements: device protocol and lifecycle with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with cle',
            prompt: 'What must be specified before any broker or storage is selected? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with cle',
            options: [
              'Message envelope schema, QoS guarantees per event class, device registration and decommission flows, and offline buffering rules for connectivity gaps. with clear trade-offs and explicit operational constraints with clear with',
              'Choose MQTT vs AMQP first and let broker dictate device behavior. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper wi',
              'Start with cloud analytics schema and infer the device protocol from downstream needs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
              'Define dashboard refresh rate first and backfill telemetry contracts later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and with c',
              'Start with billing model and treat device contract as an SDK detail. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o wi',
              'Prioritize firmware distribution and defer telemetry schema decisions. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit wi',
          ],
          correctIndex: 0,
            helperText: 'Device contracts must be explicit before any infrastructure is selected.',
          },
          {
            id: 'iot-functional-command-delivery',
            title: 'Phase 1 - Functional requirements: bidirectional command delivery',
            prompt: 'What command delivery requirements must be defined up front?',
            options: [
  
  
              'Explicit command acknowledgment semantics, at-least-once or exactly-once delivery choice per command class, timeout behavior, and offline command queue limits per device.',
              'Assume fire-and-forget for all commands and retry from the operator console. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Delegate retry to firmware and treat cloud delivery as best-effort. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Define command semantics only for the highest-priority tier. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
              'Use HTTP polling from devices to simplify push architecture. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
              'Allow commands to be dropped silently after 1 second offline. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
          ],
          correctIndex: 0,
            helperText: 'Bidirectional correctness requires explicit acknowledgment and queuing semantics.',
          },
          {
            id: 'iot-nfr-durability-freshness',
            title: 'Phase 2 - Non-functional requirements: durability and freshness',
            prompt: 'How should durability and ingestion freshness be defined?',
            options: [
  
  
              'Set 99.9% durable ingest SLO with bounded loss budgets per event class, plus maximum telemetry-to-queryable latency targets for different consumer use cases.',
              'Use best-effort durability because sensor data is usually regeneratable. with clear trade-offs and explicit operational constraints with clear trade-offs and',
              'Guarantee durability only for alarm events and treat routine telemetry as lossy. with clear trade-offs and explicit operational constraints with clear trade-',
              'Define durability only in terms of replication factor. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Measure freshness only with p50 ingestion latency. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Accept unbounded ingest lag during peak hours. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
          ],
          correctIndex: 0,
            helperText: 'Different event classes may need different durability and freshness SLOs.',
          },
          {
            id: 'iot-nfr-ota-safety',
            title: 'Phase 2 - Non-functional requirements: OTA rollout safety',
            prompt: 'What OTA rollout goals are most important to specify?',
            options: [
  
  
              'Define canary fleet size, automated rollback triggers based on crash rate and error telemetry, and rollout blast radius limits per region and device cohort.',
              'Deploy firmware to all devices simultaneously to minimize heterogeneity. with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Allow each device to self-trigger OTA without centralized safety gates. with clear trade-offs and explicit operational constraints with clear trade-offs and',
              'Gate OTA only on checksum and ignore post-flash health signals. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Perform OTA in one region at a time without automated rollback. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Accept 5% device bricking rate as the cost of speed. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
          ],
          correctIndex: 0,
            helperText: 'Fleet-scale OTA demands measurable, automatic safety guardrails.',
          },
          {
            id: 'iot-capacity-ingest-topology',
            title: 'Phase 3 - Scaling and capacity: ingest topology',
            prompt: 'What ingest architecture handles 4M events/s with durability?',
            options: [
  
  
              'Use horizontally partitioned broker tiers by device region, with per-device key routing, backpressure-aware shedding, and multi-copy durable log segments.',
              'Route all devices to a single global broker and scale it vertically. with clear trade-offs and explicit operational constraints with clear trade-offs and.',
              'Ingest directly to a central database and scale with replicas. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Use one connection per device to the cloud API gateway. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Buffer all events locally and upload in nightly batches. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Use a CDN to absorb device spikes and forward to origin. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
          ],
          correctIndex: 0,
            helperText: 'Partitioned broker tiers provide the only realistic path to 4M events/s.',
          },
          {
            id: 'iot-capacity-device-registry',
            title: 'Phase 3 - Scaling and capacity: device registry',
            prompt: 'How should device identity and state be managed at scale?',
            options: [
  
  
              'Maintain a strongly consistent device registry for identity and credentials, with a separate eventually consistent shadow store for recent telemetry and connectivity state.',
              'Store all device state and identity in one cache for fast access. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Use a flat file registry synced hourly and accept stale lookups. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Store identity inside telemetry events and infer state from ingestion. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Use one registry row per connection without reconnect dedupe. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Avoid a central registry and let devices self-register on first message. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
          ],
          correctIndex: 0,
            helperText: 'Identity and ephemeral state have different consistency and scale needs.',
          },
          {
            id: 'iot-architecture-command-routing',
            title: 'Phase 4 - Architecture decisions: command routing',
            prompt: 'How should cloud-to-device commands be routed reliably?',
            options: [
  
  
              'Use a per-device durable command queue with TTL, ack tracking, and connection-aware push via the device\\\'s active broker connection or offline inbox.',
              'Broadcast all commands to all devices and rely on device-side filtering. with clear trade-offs and explicit operational constraints with clear trade-',
              'Push commands synchronously over the telemetry upload channel. with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Route commands through CDN edges and let devices poll for actions. with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Keep commands only in memory until reconnect. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Use DNS routing to direct commands to the least busy broker. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
          ],
          correctIndex: 0,
            helperText: 'Per-device queues with ack tracking support both online push and offline delivery.',
          },
          {
            id: 'iot-architecture-processing',
            title: 'Phase 4 - Architecture decisions: stream processing',
            prompt: 'How should telemetry be processed for alerting and analytics?',
            options: [
  
  
              'Use a stream processor consuming from the ingest log with windowed aggregations, rule-based alert evaluation, and separate sinks for hot analytics and cold archival.',
              'Write all processing logic into the ingest broker as plugins. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Run all aggregations in batch at end of day. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Push raw events directly to dashboards for frontend aggregation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Use a relational database as the stream processing engine. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Perform all telemetry processing on devices before upload. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
          ],
          correctIndex: 0,
            helperText: 'Decoupled stream processors can scale, version, and fail independently.',
          },
          {
            id: 'iot-deep-dive-connectivity-management',
            title: 'Phase 5 - Component deep dive: reconnect and backpressure',
            prompt: 'How should mass simultaneous reconnects be handled safely?',
            options: [
  
  
              'Use jittered exponential backoff enforced in device firmware, broker-side connection rate limits with graduated acceptance, and priority queuing for alarm-class reconnects.',
              'Accept all reconnection attempts immediately to restore telemetry quickly. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Queue reconnections globally in strict order and process one at a time. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Reject all reconnects during high load and retry after five minutes. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Terminate overloaded broker nodes and redirect all devices together. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Treat reconnect storms as a cloud elasticity issue without device controls. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
          ],
          correctIndex: 0,
            helperText: 'Reconnect storms require coordinated device-side and broker-side controls.',
          },
          {
            id: 'iot-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: fleet observability',
            prompt: 'Which signals best reflect fleet health and ingestion quality?',
            options: [
  
  
              'Track per-device connectivity state, ingest lag per event class, command ack latency, OTA success/failure rates, and event loss rate against SLO budgets.',
              'Track only total events per second and active device count. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Track only broker CPU and network bandwidth. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Track only OTA rollout progress and ignore telemetry quality. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Track only billing-relevant event counts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Track p50 ingest latency only and ignore per-device health. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
          ],
          correctIndex: 0,
            helperText: 'IoT observability needs both fleet-level and per-device granularity.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-distributed-rate-limiter',
      difficulty: 'hard',
      prompt:
        'Design a distributed rate limiting and API gateway platform handling 2 million requests/s with per-tenant and per-endpoint policy enforcement, p99 overhead < 5ms, and sub-second policy propagation. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define policy semantics and enforcement guarantees first, then reason about counter accuracy versus latency trade-offs, then choose distributed counting, policy propagation, and gateway architecture. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Distributed Rate Limiting & API Gateway with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs a',
        scenarioSummary:
          'Multi-tenant rate enforcement at millions of req/s with sub-millisecond enforcement overhead and near-real-time policy changes. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constr',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'rl-functional-policy-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
            title: 'Phase 1 - Functional requirements: policy contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear t',
            prompt: 'What must be defined before choosing counting algorithms? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with.',
            options: [
              'Policy dimensions (tenant, endpoint, user), window semantics (fixed, sliding, token bucket), overage behavior (reject, throttle, queue), and observable error responses. with clear trade-offs and explicit operational constraints with clear t',
              'Choose Redis or Memcached first and derive semantics from their data structures. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Start with billing model and treat rate limiting as a finance concern. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Define SLA tiers only and leave algorithm choice to individual teams. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Start with dashboard requirements and infer enforcement from reporting needs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Treat all rate limits as identical fixed windows. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Policy semantics determine algorithmic and storage requirements.',
          },
          {
            id: 'rl-functional-fairness',
            title: 'Phase 1 - Functional requirements: fairness and priority',
            prompt: 'How should priority and fairness be expressed?',
            options: [
  
  
              'Define explicit traffic priority tiers with guaranteed minimum throughput per tier, burst headroom rules, and deterministic behavior when a tier exceeds its allocation.',
              'Use equal limits for all tenants and rely on self-regulation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Prioritize only by API key alphabet order. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cl',
              'Treat priority as a business negotiation concern. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
              'Use dynamic priority based on recent error rate. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Allow unlimited burst for premium tenants during off-peak hours. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
          ],
          correctIndex: 0,
            helperText: 'Fairness rules must be explicit and deterministic.',
          },
          {
            id: 'rl-nfr-accuracy-latency',
            title: 'Phase 2 - Non-functional requirements: accuracy and latency',
            prompt: 'How should enforcement accuracy and overhead be balanced?',
            options: [
  
  
              'Define bounded overshoot tolerance per window (for example, up to 1% burst allowance) and set p99 enforcement latency budget at ≤ 5ms added overhead.',
              'Guarantee 0% overshoot and accept unbounded latency to keep counters exact. with clear trade-offs and explicit operational constraints with clear tra',
              'Accept unlimited overshoot to keep overhead negligible. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Track only median enforcement latency and ignore p99. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Tolerate up to 30% overshoot because limits are advisory. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Use synchronous global consensus counters regardless of latency. with clear trade-offs and explicit operational constraints with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Counter accuracy and enforcement latency trade off explicitly.',
          },
          {
            id: 'rl-nfr-policy-propagation',
            title: 'Phase 2 - Non-functional requirements: policy propagation',
            prompt: 'What propagation SLO is appropriate for policy changes?',
            options: [
  
  
              'Require sub-second policy propagation to all gateway nodes with bounded stale-enforcement window during propagation lag.',
              'Accept 5-minute propagation lag because operators can plan changes ahead. with clear trade-offs and explicit operational',
              'Propagate policies only during low-traffic windows. with clear trade-offs and explicit operational constraints with clea',
              'Use manual per-node config pushes and accept eventual consistency. with clear trade-offs and explicit operational constr',
              'Treat policy changes as requiring a full rolling restart. with clear trade-offs and explicit operational constraints wit',
              'Allow policies to propagate over 24 hours as part of daily sync. with clear trade-offs and explicit operational constrai',
          ],
          correctIndex: 0,
            helperText: 'Fast policy propagation is essential for security and operational responsiveness.',
          },
          {
            id: 'rl-capacity-counter-strategy',
            title: 'Phase 3 - Scaling and capacity: counter design',
            prompt: 'What counter architecture handles 2M req/s within latency budget?',
            options: [
  
  
              'Use local in-memory counters per gateway node with gossip-based synchronization and probabilistic overshoot acceptance, falling back to shared counters for critical limits.',
              'Use a single centralized Redis cluster as the authoritative counter. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Compute exact sliding window counts via full request log replay. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Use global distributed transactions for exact counts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
              'Count only in the analytics warehouse and compare asynchronously. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Push counting work to clients using token bucket state. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
          ],
          correctIndex: 0,
            helperText: 'Local counters with bounded sync are the only path to sub-5ms overhead.',
          },
          {
            id: 'rl-capacity-policy-store',
            title: 'Phase 3 - Scaling and capacity: policy store',
            prompt: 'How should policies be stored and distributed?',
            options: [
  
  
              'Keep authoritative policies in a durable strongly-consistent store, then propagate compiled rule sets to gateway nodes via pub/sub with version-stamped hot reloads.',
              'Store policies in each gateway node\\\'s local config file with manual sync. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Use object storage as the policy source and poll every minute. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Embed all policy logic in gateway binaries. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Store policies in memory of a primary node only. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Use a search index as the authoritative policy store. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
          ],
          correctIndex: 0,
            helperText: 'Durable authority plus fast propagation keeps policies safe and fresh.',
          },
          {
            id: 'rl-architecture-gateway-topology',
            title: 'Phase 4 - Architecture decisions: gateway topology',
            prompt: 'How should the gateway fleet be organized for high availability?',
            options: [
  
  
              'Deploy stateless gateway nodes behind regional anycast load balancers, with local counter shards, centralized policy sync, and regional failover rings.',
              'Use one global gateway cluster with no regional failover. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Run gateways inside CDN workers and rely on CDN counters. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Co-locate rate limiting inside each microservice. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Use a single shard per tenant for counter isolation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Route all traffic through a primary region gateway. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit opera',
          ],
          correctIndex: 0,
            helperText: 'Stateless gateways with regional failover avoid single points of failure.',
          },
          {
            id: 'rl-architecture-response-contracts',
            title: 'Phase 4 - Architecture decisions: reject and throttle response handling',
            prompt: 'What response behavior should rejected or throttled requests receive?',
            options: [
  
  
              'Return standards-compliant 429 responses with Retry-After headers, policy-tier reason codes, and quota remaining headers for client adaptation.',
              'Return 500 errors for rate-limited requests to trigger retries. with clear trade-offs and explicit operational constraints with clear trade-off',
              'Drop connections silently without response headers. with clear trade-offs and explicit operational constraints with clear trade-offs and explic',
              'Return 200 with an empty body for throttled requests. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Redirect throttled requests to a status page. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit ope',
              'Return 503 with no Retry-After header. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
          ],
          correctIndex: 0,
            helperText: 'Client-observable rejection signals enable adaptive client behavior.',
          },
          {
            id: 'rl-deep-dive-burst-handling',
            title: 'Phase 5 - Component deep dive: burst and spike absorption',
            prompt: 'How should legitimate short bursts be handled without false rejection?',
            options: [
  
  
              'Use token bucket algorithm with tenant-configured burst capacity separate from sustained rate, refilled at the sustained rate with per-node local tokens and periodic rebalancing.',
              'Reject all requests that exceed the per-second rate. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cl',
              'Use a single fixed window and allow any rate within the window. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
              'Queue all excess requests indefinitely until capacity frees up. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
              'Allow burst only for tenants who request it through support tickets. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
              'Cap burst at exactly 2x sustained rate for every tenant. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
          ],
          correctIndex: 0,
            helperText: 'Token bucket separates burst capacity from sustained rate naturally.',
          },
          {
            id: 'rl-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: enforcement observability',
            prompt: 'Which metrics best reflect rate limiter health and correctness?',
            options: [
  
  
              'Track rejection rate per tenant/endpoint, overshoot percentage per window, enforcement latency percentiles, policy propagation lag, and counter synchronization drift.',
              'Track only total requests per second globally. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Track only gateway CPU and memory. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
              'Track only billable event counts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tra',
              'Track only 429 count without tenant breakdown. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Track only p50 gateway latency and ignore tail overhead. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
          ],
          correctIndex: 0,
            helperText: 'Rate limiter quality depends on accuracy and latency signals together.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-mobile-realtime-collaboration',
      difficulty: 'hard',
      prompt:
        'Design a mobile-first real-time document collaboration app supporting 10M concurrent editors, sub-200ms keystroke propagation, and conflict-free editing across spotty connections. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati'],
      correctIndex: 0,
      correctExplanation:
        'Great mobile collaboration answers define CRDT or OT merge semantics and connection-loss behavior first, then set propagation latency and battery cost goals, then choose operation transport, cursor presence, and snapshot recovery architecture. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Mobile Real-Time Collaboration Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
        scenarioSummary:
          'Conflict-free concurrent editing with sub-200ms propagation, offline resilience, and battery-aware sync on mobile. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'collab-functional-merge-semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
            title: 'Phase 1 - Functional requirements: merge and conflict semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
            prompt: 'What merge behavior should be locked before any transport is designed? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs',
            options: [
              'Choose a deterministic merge model (CRDT or OT), define per-operation transformation rules, offline edit accumulation limits, and user-visible conflict state when automatic merge confidence is insufficient. with clear trade-offs and explicit operational constraints wit',
              'Choose the WebSocket library first and infer merge behavior from event ordering. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear.',
              'Use last-write-wins globally because it avoids merge complexity. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Defer merge strategy until production conflicts reveal patterns. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Delegate conflict resolution to server-side SQL transactions. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Use client-side undo/redo as the only conflict path. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'Merge semantics must be deterministic before transport or storage is designed.',
          },
          {
            id: 'collab-functional-presence',
            title: 'Phase 1 - Functional requirements: cursor presence and awareness',
            prompt: 'What real-time awareness features require explicit requirements?',
            options: [
  
  
              'Per-editor cursor position, selection range, display name, color assignment, and stale-presence cleanup rules after inactivity timeout.',
              'Show only the count of connected editors to simplify presence logic. with clear trade-offs and explicit operational constraints with cl',
              'Derive presence from the most recent edit timestamp. with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Disable presence on mobile to save battery and bandwidth. with clear trade-offs and explicit operational constraints with clear trade-o',
              'Render presence only on desktop and omit it from mobile scope. with clear trade-offs and explicit operational constraints with clear tr',
              'Treat presence as optional without freshness or cleanup rules. with clear trade-offs and explicit operational constraints with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Presence has explicit liveness, freshness, and cleanup requirements.',
          },
          {
            id: 'collab-nfr-propagation-latency',
            title: 'Phase 2 - Non-functional requirements: propagation latency',
            prompt: 'How should keystroke delivery goals be defined?',
            options: [
  
  
              'Set p95 operation propagation latency < 200ms for active sessions with explicit degraded-mode behavior when network quality drops below threshold.',
              'Target average propagation latency and accept unbounded tail for poor networks. with clear trade-offs and explicit operational constraints with cl',
              'Guarantee sub-10ms propagation by running servers on device hardware. with clear trade-offs and explicit operational constraints with clear trade-',
              'Measure only server processing latency and exclude network round-trip. with clear trade-offs and explicit operational constraints with clear trade',
              'Set propagation goals only for premium subscription users. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Treat collaboration latency as a client UX concern. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Perceived collaboration quality is driven by operation propagation tail latency.',
          },
          {
            id: 'collab-nfr-mobile-constraints',
            title: 'Phase 2 - Non-functional requirements: mobile battery and data',
            prompt: 'What mobile-specific NFRs must be set alongside latency targets?',
            options: [
  
  
              'Define background battery budget, foreground vs background sync tier behavior, and per-session data cap awareness with adaptive operation batching under constrained networks.',
              'Optimize latency only and treat battery/data as platform concerns. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Use always-on high-frequency sync regardless of power state. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
              'Disable all background sync and require manual pull-to-refresh. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Use fixed 100ms polling on all devices. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade',
              'Treat mobile and desktop equally with identical sync policies. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
          ],
          correctIndex: 0,
            helperText: 'Mobile collaboration needs explicit battery and bandwidth trade-off policies.',
          },
          {
            id: 'collab-capacity-operation-routing',
            title: 'Phase 3 - Scaling and capacity: operation routing',
            prompt: 'How should concurrent edit operations be routed and ordered?',
            options: [
  
  
              'Route all operations for a document to a consistent set of servers using document-key hashing, with authoritative operation log and bounded fan-out to connected editors.',
              'Broadcast every operation to all servers and let each resolve order independently. with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Route operations by editor user ID regardless of document placement. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Use a single global sequencer for all documents. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Avoid centralized routing and rely on peer-to-peer gossip. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Route based on editor geolocation alone. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
          ],
          correctIndex: 0,
            helperText: 'Document-affinity routing is essential for consistent operation ordering.',
          },
          {
            id: 'collab-capacity-snapshot-storage',
            title: 'Phase 3 - Scaling and capacity: snapshot and operation log storage',
            prompt: 'How should document history be stored for recovery and replay?',
            options: [
  
  
              'Persist an immutable operation log with periodic document snapshots to bound replay cost, with compaction policy balancing storage cost and recovery time.',
              'Store only the current document state and discard history. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Rebuild state by replaying the full operation log from inception. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Store snapshots in client local storage only. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Keep document state entirely in memory and snapshot daily. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Use a search index as the primary document state store. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'Snapshotted logs bound recovery time while preserving edit history.',
          },
          {
            id: 'collab-architecture-operation-transport',
            title: 'Phase 4 - Architecture decisions: operation transport',
            prompt: 'What transport architecture achieves sub-200ms propagation?',
            options: [
  
  
              'Use persistent WebSocket or WebTransport connections to region-local gateway servers with operation queuing, ack tracking, and mobile-aware fallback to long-poll.',
              'Use HTTP short polling every 100ms for all clients. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Use SSE for push and regular HTTP POST for writes. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Rely entirely on push notifications for operation delivery. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Use raw TCP sockets managed by client code. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
              'Route all real-time operations through a CDN edge cache. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
          ],
          correctIndex: 0,
            helperText: 'Persistent connections with ack tracking enable reliable low-latency propagation.',
          },
          {
            id: 'collab-architecture-presence-service',
            title: 'Phase 4 - Architecture decisions: presence service',
            prompt: 'How should cursor presence be tracked at 10M concurrent sessions?',
            options: [
  
  
              'Use in-memory presence stores per gateway cluster with heartbeat TTLs, delta pub/sub propagation per document, and periodic gateway-level garbage collection.',
              'Store all presence state in a central OLTP database. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
              'Broadcast every cursor move globally for correctness. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Infer presence from operation receipt time alone. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Poll presence state from server every 5 seconds. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Keep presence state only in browser memory. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constra',
          ],
          correctIndex: 0,
            helperText: 'Presence at this scale needs ephemeral storage with bounded fan-out.',
          },
          {
            id: 'collab-deep-dive-offline-rebase',
            title: 'Phase 5 - Component deep dive: offline edit rebase',
            prompt: 'How should a client\'s offline edits be safely integrated after reconnect?',
            options: [
  
  
              'Replay client\\\'s pending operations against the latest server document state using the chosen OT/CRDT transformation rules, detect irreconcilable conflicts, and surface user choices only when automatic resolution fails.',
              'Discard all offline edits and force re-entry after reconnect. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Push offline edits directly to the operation log without transformation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Delay offline edit integration until the next batch window. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
              'Merge offline edits by appending them after all server operations. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Use random merge order and let clients resolve discrepancies. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'Correct rebase must apply transformation before committing offline operations.',
          },
          {
            id: 'collab-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: collaboration observability',
            prompt: 'Which signals best reflect real-time editing quality?',
            options: [
  
  
              'Track operation propagation latency percentiles, conflict rate, offline rebase success rate, presence freshness lag, and session reconnect convergence time.',
              'Track only total document saves per day. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Track only API error rate without operation-type breakdown. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit op',
              'Track only server CPU and network bandwidth. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Track only new user registration rate. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'Track only p50 operation latency and ignore conflict quality. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Collaboration health requires latency, correctness, and convergence metrics.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-frontend-design-system',
      difficulty: 'hard',
      prompt:
        'Design a frontend design system and component library platform serving 240 product teams with consistent UX, safe versioned releases, and cross-framework token distribution. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define consumer contracts, versioning guarantees, and token distribution semantics first, then set adoption and breakage budgets, then choose component API governance, testing architecture, and release pipeline strategy. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Enterprise Frontend Design System Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operat',
        scenarioSummary:
          'Component library infrastructure for hundreds of teams with safe versioning, token governance, and cross-framework support. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-of',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'ds-functional-consumer-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
            title: 'Phase 1 - Functional requirements: consumer contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
            prompt: 'What must be defined before component architecture is designed? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
            options: [
              'Stable public component API surface, prop contract versioning semantics, cross-framework support policy, and accessibility compliance requirements per component tier. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit.',
              'Choose the component framework first and infer the consumer API from conventions. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Start with design handoff tooling and derive API contracts from tokens. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear t',
              'Define documentation structure first and align APIs to the taxonomy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
              'Start with test coverage targets and treat API shape as implementation detail. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with.',
              'Defer consumer API contracts until teams request behaviors. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs an',
          ],
          correctIndex: 0,
            helperText: 'Consumer contracts must be explicit before components are built.',
          },
          {
            id: 'ds-functional-token-governance',
            title: 'Phase 1 - Functional requirements: token governance',
            prompt: 'How should design token behavior be specified?',
            options: [
  
  
              'Define token taxonomy (global, alias, component), multi-brand and multi-theme support, output formats per target platform, and backward-compatibility rules for token renames.',
              'Generate tokens directly from design tool exports without governance. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
              'Use CSS custom properties globally and treat semantics as CSS details. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Delegate token naming to each product team independently. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraint',
              'Define only color tokens initially and add other scales later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Treat tokens as a static annual snapshot. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tra',
          ],
          correctIndex: 0,
            helperText: 'Token governance prevents breaking changes across hundreds of consuming teams.',
          },
          {
            id: 'ds-nfr-versioning-stability',
            title: 'Phase 2 - Non-functional requirements: versioning and breakage budget',
            prompt: 'What versioning and stability SLOs are most appropriate?',
            options: [
  
  
              'Semantic versioning with strict backward-compatible minor releases, breaking changes only in major versions with at least one LTS major maintained in parallel, and measurable breakage rate SLO.',
              'Use continuous deployment with no explicit version pinning. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
              'Break API contracts freely and rely on TypeScript errors. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
              'Version only the design token package and leave component APIs unversioned. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'Ship major releases every week regardless of change type. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-',
              'Version only documentation pages and treat package releases as internal. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
          ],
          correctIndex: 0,
            helperText: 'Design system stability is a first-class requirement for consuming teams.',
          },
          {
            id: 'ds-nfr-performance-budgets',
            title: 'Phase 2 - Non-functional requirements: performance budgets',
            prompt: 'What performance requirements should the design system enforce?',
            options: [
  
  
              'Set per-component bundle size budgets, render performance baselines, and import cost policies enforced in CI to prevent regression across consumer applications.',
              'Leave performance constraints entirely to consuming teams. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Track only total library bundle size and ignore per-component impact. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Optimize only the most popular components and leave others best-effort. with clear trade-offs and explicit operational constraints with clear trade-offs and exp',
              'Measure performance only in Storybook and skip real-app impact tracking. with clear trade-offs and explicit operational constraints with clear trade-offs and ex',
              'Defer performance budgets until the library exceeds 1MB gzipped. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
          ],
          correctIndex: 0,
            helperText: 'Design system bloat compounds across all consuming teams.',
          },
          {
            id: 'ds-capacity-multi-framework',
            title: 'Phase 3 - Scaling and capacity: multi-framework strategy',
            prompt: 'How should components be delivered across React, Vue, and native mobile?',
            options: [
  
  
              'Maintain framework-agnostic implementation layer (Web Components or headless logic) with thin framework-specific wrappers, unified token pipeline, and shared test contracts.',
              'Build fully independent implementations per framework with no shared code. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Support only React and require other frameworks to maintain forks. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Transpile React components to other frameworks automatically at publish time. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Use iframes to embed React components inside non-React apps. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constr',
              'Deliver only CSS and leave interaction logic to consuming frameworks. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
          ],
          correctIndex: 0,
            helperText: 'Shared logic with thin wrappers reduces duplication and drift.',
          },
          {
            id: 'ds-capacity-token-pipeline',
            title: 'Phase 3 - Scaling and capacity: token distribution pipeline',
            prompt: 'How should design tokens flow from design tool to every target platform?',
            options: [
  
  
              'Use a versioned token transformation pipeline: design source to platform-specific outputs (CSS, iOS, Android, JS), with CI validation, diff preview, and controlled publish cadence.',
              'Export tokens manually from the design tool and commit CSS files directly. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'Generate tokens in each consumer\\\'s build pipeline from raw design files. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
              'Use one hardcoded token file per brand and update it with search-and-replace. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
              'Push token updates through npm without version bumps. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
              'Allow individual teams to define custom tokens that override shared defaults. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operatio',
          ],
          correctIndex: 0,
            helperText: 'Versioned, automated token pipelines prevent silent breakage at scale.',
          },
          {
            id: 'ds-architecture-testing-strategy',
            title: 'Phase 4 - Architecture decisions: testing architecture',
            prompt: 'What testing strategy ensures cross-team reliability?',
            options: [
  
  
              'Layer unit tests, accessibility audits, visual regression snapshots, and integration tests in CI; run consumer compatibility checks against representative real apps in a canary pipeline.',
              'Use manual QA reviews before each release. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and',
              'Run only unit tests and rely on consumers to report breakages. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with.',
              'Test components only in Storybook isolation. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs a',
              'Use screenshot tests only for the five highest-usage components. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
              'Let each consumer team define its own test strategy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
          ],
          correctIndex: 0,
            helperText: 'Design system quality depends on layered automated testing plus consumer signal.',
          },
          {
            id: 'ds-architecture-release-pipeline',
            title: 'Phase 4 - Architecture decisions: release pipeline',
            prompt: 'How should releases be staged and rolled out safely?',
            options: [
  
  
              'Use alpha/beta/stable channels with automated change detection, changelog generation, consumer impact analysis, and breaking-change block gates before stable promotion.',
              'Publish directly to stable on every merged PR to reduce lag. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Maintain a single release branch and publish quarterly. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constr',
              'Use feature flags in component code to gate production behavior. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Release hotfixes and major versions through identical pipelines. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Let each framework adapter team time its own release cycle. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
          ],
          correctIndex: 0,
            helperText: 'Staged channels with automated gates prevent breaking hundreds of teams at once.',
          },
          {
            id: 'ds-deep-dive-adoption-codemods',
            title: 'Phase 5 - Component deep dive: migration and codemods',
            prompt: 'How should breaking major version migrations be supported?',
            options: [
  
  
              'Provide automated codemods for prop renames and API shape changes, maintain deprecation warnings in N-1, and publish migration guides with compatibility matrices.',
              'Require teams to migrate manually by reading changelogs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'Deprecate old APIs silently and wait for CI failures. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational co',
              'Force all teams to upgrade immediately when a major version ships. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Maintain only the latest major version and remove compatibility tooling. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
              'Use runtime warnings only and skip static migration tools. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
          ],
          correctIndex: 0,
            helperText: 'Codemods and LTS support make large-scale migrations tractable.',
          },
          {
            id: 'ds-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: adoption and quality observability',
            prompt: 'Which signals best reflect design system health across consumers?',
            options: [
  
  
              'Track component adoption rate by team, version distribution across apps, accessibility violation rate, visual regression count per release, and time-to-adopt for new major versions.',
              'Track only npm weekly download counts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs an',
              'Track only Storybook page views as usage proxy. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
              'Track only bundle size growth per release. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-off',
              'Track only internal team satisfaction survey scores. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
              'Track only GitHub star count as the primary indicator. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
          ],
          correctIndex: 0,
            helperText: 'Design system health needs adoption, quality, and drift metrics together.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-global-cdn-cache',
      difficulty: 'hard',
      prompt:
        'Design a global CDN cache platform serving 40 Tbps peak traffic, p95 edge latency under 35ms, and safe origin failover. Work through the interview in phase order.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with'],
      correctIndex: 0,
      correctExplanation:
        'Strong CDN answers define cache semantics and purge guarantees first, then set edge SLOs, then choose keying, eviction, and origin-shield strategy. with clear trade-offs wi',
      multiSectionSystemDesign: {
        title: 'Global CDN Cache Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and wi',
        scenarioSummary:
          'Ultra-high-throughput edge caching with purge correctness, hot-key control, and origin protection. with clear trade-offs and explicit operational constraints with clear wit',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'cdn-functional-cache-contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs wi',
            title: 'Phase 1 - Functional requirements: cache contract with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
            prompt: 'What must be locked first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and w',
            options: [
              'Cache key rules. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit wi',
              'Buy more POPs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with',
              'Start with TLS. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit wit',
              'Start with logs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit wi',
              'Start with pricing. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
              'Start with UI. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit with',
          ],
          correctIndex: 0,
            helperText: 'Key semantics drive all cache behavior.',
          },
          {
            id: 'cdn-functional-purge',
            title: 'Phase 1 - Functional requirements: purge behavior',
            prompt: 'What purge guarantee is best?',
            options: [
  
  
              'Bounded global purge SLA.',
              'Regional purge SLA tiers.',
              'Scheduled purge batch wit',
              'Operator-approved purge w',
              'Per-tenant purge sequenci',
              'Versioned purge token wit',
          ],
          correctIndex: 0,
            helperText: 'Purge latency is a core user-facing contract.',
          },
          {
            id: 'cdn-nfr-latency',
            title: 'Phase 2 - Non-functional requirements: latency budget',
            prompt: 'How should latency be set?',
            options: [
  
  
              'p95 and p99 targets.',
              'Median and p90 with.',
              'Regional latency wit',
              'Endpoint-level with.',
              'p99-only latency wit',
              'Tail-focused tuning.',
          ],
          correctIndex: 0,
            helperText: 'Tail latency matters for global edge systems.',
          },
          {
            id: 'cdn-capacity-hot-keys',
            title: 'Phase 3 - Scaling and capacity: hot key mitigation',
            prompt: 'How should hot objects be handled?',
            options: [
  
  
              'Shard + request coalescing.',
              'Regional cache tiering. wit',
              'Origin shield fan-in. with.',
              'Adaptive replica pinning. w',
              'Per-key admission control..',
              'Large-object isolation. wit',
          ],
          correctIndex: 0,
            helperText: 'Hot keys need load spreading and miss collapse.',
          },
          {
            id: 'cdn-capacity-eviction',
            title: 'Phase 3 - Scaling and capacity: eviction policy',
            prompt: 'Best eviction strategy?',
            options: [
  
  
              'Segmented LRU/LFU hybrid.',
              'Admission-aware LFU with.',
              'Cost-weighted eviction wi',
              'TTL-biased recency with c',
              'Popularity-tiered with cl',
              'Probation-based cache wit',
          ],
          correctIndex: 0,
            helperText: 'Hybrid policies handle recency and frequency better.',
          },
          {
            id: 'cdn-architecture-origin-shield',
            title: 'Phase 4 - Architecture decisions: origin shielding',
            prompt: 'How should origin be protected?',
            options: [
  
  
              'Regional shield tiers.',
              'Origin affinity with c',
              'Dual-origin failover w',
              'Multi-layer request wi',
              'Regional shield with c',
              'Active-active origin w',
          ],
          correctIndex: 0,
            helperText: 'Shield layers cut origin fanout and blast radius.',
          },
          {
            id: 'cdn-deep-dive-consistency',
            title: 'Phase 5 - Component deep dive: stale content control',
            prompt: 'How to avoid stale leaks?',
            options: [
  
  
              'Versioned keys + purge bus.',
              'Short TTL + warmers. with c',
              'Surrogate-key invalidation.',
              'Write-through metadata with',
              'Signed freshness manifest w',
              'Background consistency with',
          ],
          correctIndex: 0,
            helperText: 'Versioning plus purge orchestration is standard.',
          },
          {
            id: 'cdn-deep-dive-observability',
            title: 'Phase 5 - Component deep dive: observability',
            prompt: 'What should be tracked?',
            options: [
  
  
              'Hit ratio + tail latency.',
              'Origin offload + saturati',
              'Bandwidth mix + saturatio',
              'Request skew + saturation',
              'Cache churn + saturation.',
              'TLS health + saturation..',
          ],
          correctIndex: 0,
            helperText: 'Need both performance and correctness metrics.',
          },
        ],
      },
    }
]

export default data
