const data = [
  {
      id: 'hard-multi-section-system-design-global-feed',
      difficulty: 'hard',
      prompt:
        'Design a global social feed backend with 220,000 reads/s, 18,000 writes/s, p95 < 120ms, and feed freshness within 2 seconds. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-of'],
      correctIndex: 0,
      correctExplanation:
        'A high-quality answer clarifies requirements first, then sets SLOs, estimates fanout and storage pressure, and only then commits to architecture choices like queue-backed fanout, cache invalidation, and ranking services. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Social Feed Backend with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
        scenarioSummary:
          'Read-heavy fanout, near-real-time freshness, and global low-latency delivery, explored as a full mini interview. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'feed-functional-core-flows with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
            title: 'Phase 1 - Functional requirements: core user flows with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
            prompt: 'Which requirement set should be locked first before sketching architecture? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
            options: [
              'Publish posts, follow/unfollow, home timeline retrieval, and engagement actions (like/comment/share), with clear behavior for private accounts and blocked users. with clear trade-offs and explicit operational constraints with clear trade-offs and',
              'Focus first on feed ranking model feature engineering so we can tune relevance quality before core API behavior is finalized. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Define read replica topology first, then let product infer functional behavior from what the chosen datastore can support efficiently. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
              'Implement global websocket push as the initial requirement and postpone decisions about timeline semantics until launch metrics arrive. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational cons',
              'Prioritize experimentation framework events and A/B assignment APIs while leaving post creation and follow graph behavior loosely defined. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational c',
              'Start by documenting only edge cases and moderation appeals, then backfill normal posting and reading flows in a second interview round. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
          ],
          correctIndex: 0,
            helperText: 'In interviews, establish user-visible behavior before discussing internals.',
          },
          {
            id: 'feed-functional-scope-boundaries',
            title: 'Phase 1 - Functional requirements: scope boundaries',
            prompt: 'What is the best way to define v1 scope to avoid overbuilding?',
            options: [
  
  
              'Explicitly separate v1 timeline serving from out-of-scope features like full-text search, stories, and recommendation explainability dashboards.',
              'Commit to implementing all social features in v1 because feed and social graph decisions are too coupled to phase independently. with clear trad',
              'Treat ranking, moderation, and notifications as one monolithic scope so no subsystem has to define an API boundary early. with clear trade-offs.',
              'Skip scope cuts and rely on dynamic prioritization after implementation starts to preserve engineering flexibility. with clear trade-offs and ex',
              'Delay v1 scope decisions until infrastructure procurement is complete so hardware limits can drive product behavior. with clear trade-offs and e',
              'Define scope only in terms of team ownership maps and postpone user-level capability boundaries to a follow-up document. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'A strong answer demonstrates deliberate trade-offs and clear non-goals.',
          },
          {
            id: 'feed-nfr-slo-definition',
            title: 'Phase 2 - Non-functional requirements: SLOs',
            prompt: 'How should latency and freshness objectives be articulated?',
            options: [
  
  
              'Set explicit SLOs such as p95 timeline read < 120ms, p99 write acknowledgment < 250ms, and cross-region freshness target under 2 seconds with measurable error budgets.',
              'Use a single median latency goal because tail latency is usually too noisy to guide architecture choices in globally distributed systems. with clear trade-offs and exp',
              'Optimize only throughput and let latency naturally improve after enough read replicas and cache nodes are provisioned in each region. with clear trade-offs and explici',
              'Set one global timeout value and treat any response before timeout as acceptable regardless of user-perceived consistency lag. with clear trade-offs and explicit opera',
              'Use subjective user satisfaction as the only non-functional requirement so the architecture can remain implementation agnostic. with clear trade-offs and explicit oper',
              'Define strict p50 and p75 goals while postponing p95 and p99 because high-percentile behavior is mostly operational and not a design concern. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Quantified SLOs make later trade-offs defensible.',
          },
          {
            id: 'feed-nfr-availability-consistency',
            title: 'Phase 2 - Non-functional requirements: availability and consistency',
            prompt: 'What consistency target is most appropriate for home feeds?',
            options: [
  
  
              'Aim for eventual consistency with bounded staleness for feed reads, while preserving strict durability and ordering guarantees for accepted post writes.',
              'Guarantee global linearizability for every feed read so all users observe identical timelines across regions at all times. with clear trade-offs and exp',
              'Allow write loss during regional failovers to maintain low latency because feed workloads are mostly read-heavy and tolerant to churn. with clear trade-',
              'Use cache-only timelines as the primary source of truth and rebuild durable history opportunistically after incidents. with clear trade-offs and explici',
              'Provide strict read-after-write consistency for all users globally by synchronously replicating each post to every region before acknowledgment. with cl',
              'Relax both durability and ordering in exchange for faster ranking updates since relevance quality matters more than data correctness. with clear trade-o',
          ],
          correctIndex: 0,
            helperText: 'Different operations can require different consistency guarantees.',
          },
          {
            id: 'feed-capacity-fanout-model',
            title: 'Phase 3 - Scaling and capacity: fanout strategy',
            prompt: 'Given celebrity skew and high read volume, what fanout model is best?',
            options: [
  
  
              'Use a hybrid model: fanout-on-write for normal publishers and fanout-on-read for high-follower accounts to control write amplification and queue pressure.',
              'Use pure fanout-on-write for every account so feed reads never require assembly logic regardless of follower cardinality. with clear trade-offs and explic',
              'Use pure fanout-on-read for every account so write latency stays flat even if timeline reads become significantly more expensive. with clear trade-offs an',
              'Store one globally sorted post list and let clients filter per-user visibility and ranking at render time. with clear trade-offs and explicit operational.',
              'Partition users by geography only and route fanout behavior from region size instead of follower distribution. with clear trade-offs and explicit operatio',
              'Push all fanout work to CDN edge workers so app services can avoid maintaining timeline materialization pipelines. with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'A nuanced strategy handles skewed follower graphs better than one-size-fits-all fanout.',
          },
          {
            id: 'feed-capacity-partitioning',
            title: 'Phase 3 - Scaling and capacity: partitioning choices',
            prompt: 'How should timeline and post data be partitioned?',
            options: [
  
  
              'Partition timeline stores by consumer user id and partition post/event streams by publisher id, with hash + time bucketing to spread hot keys.',
              'Use a single logical shard for posts and timelines to simplify cross-user ranking and reduce partition-management overhead. with clear trade-o',
              'Partition everything by post creation timestamp so ingestion and reads share one chronological key space globally. with clear trade-offs and e',
              'Partition timelines by client platform (web or mobile) because request patterns differ substantially across devices. with clear trade-offs and',
              'Use follower count tiers as the sole partition key so high-profile creators can be physically isolated from standard users. with clear trade-o',
              'Avoid partitioning and depend on storage autoscaling because managed databases can absorb traffic spikes without key design. with clear trade-',
          ],
          correctIndex: 0,
            helperText: 'Good key design balances read locality, write distribution, and hot-partition mitigation.',
          },
          {
            id: 'feed-architecture-ingress',
            title: 'Phase 4 - Architecture decisions: ingress and core services',
            prompt: 'What frontend architecture should handle global traffic safely?',
            options: [
  
  
              'Use regional anycast DNS, API gateway, and stateless app services behind load balancers, with auth/rate-limit middleware before write-path admission.',
              'Route all requests to one primary region and mirror traffic asynchronously to secondary regions for disaster recovery visibility. with clear trade-of',
              'Terminate all requests at CDN and proxy writes directly to databases so app services are used only for ranking experiments. with clear trade-offs and',
              'Use a single long-lived websocket channel for both writes and reads and remove normal HTTP APIs to reduce protocol complexity. with clear trade-offs.',
              'Expose service discovery endpoints directly to clients so mobile apps can connect to whichever backend role is least loaded. with clear trade-offs an',
              'Perform follower graph checks inside the load balancer to reduce hops before app-layer request validation. with clear trade-offs and explicit operati',
          ],
          correctIndex: 0,
            helperText: 'Ingress should enforce safety controls before expensive downstream work begins.',
          },
          {
            id: 'feed-architecture-read-path',
            title: 'Phase 4 - Architecture decisions: read path design',
            prompt: 'How should timeline reads be served at scale?',
            options: [
  
  
              'Serve from multi-tier cache (edge + regional) backed by timeline store, with cache key versioning and selective invalidation on post/update/delete events.',
              'Recompute full timelines from post and follow tables on each request so cache consistency concerns are eliminated entirely. with clear trade-offs and expl',
              'Read directly from object storage snapshots refreshed every minute to guarantee deterministic timeline content per region. with clear trade-offs and expli',
              'Have clients fan out to microservices for follows, posts, and ranking independently, then merge results locally into one timeline. with clear trade-offs a',
              'Serve all reads from the primary write database and rely on query optimization to keep latency within p95 targets globally. with clear trade-offs and expl',
              'Use one giant in-memory process per region to store all timelines and periodically snapshot to disk for crash recovery. with clear trade-offs and explicit',
          ],
          correctIndex: 0,
            helperText: 'Read path architecture should reflect dominant access patterns and freshness requirements.',
          },
          {
            id: 'feed-deep-dive-ranking-service',
            title: 'Phase 5 - Component deep dive: ranking service',
            prompt: 'Where should ranking computation live and how should it be fed?',
            options: [
  
  
              'Use a dedicated ranking service consuming candidate events and feature updates, with online feature cache plus fallback heuristics for degraded dependencies.',
              'Execute ranking SQL directly on the primary OLTP database so relevance logic stays close to canonical data and avoids extra services. with clear trade-offs a',
              'Compute ranking entirely at the client so model rollout can happen instantly without server-side deployment or observability overhead. with clear trade-offs.',
              'Run ranking every 15 minutes in batch and accept stale ordering between refreshes to simplify feature consistency guarantees. with clear trade-offs and expli',
              'Delegate ranking to queue partition order so event arrival naturally determines feed relevance without model infrastructure. with clear trade-offs and explic',
              'Embed ranking logic into CDN workers to reduce origin load and remove dependence on a centralized feature retrieval layer. with clear trade-offs and explicit',
          ],
          correctIndex: 0,
            helperText: 'Deep dives should include dependencies, degradation behavior, and isolation boundaries.',
          },
          {
            id: 'feed-deep-dive-freshness-repair',
            title: 'Phase 5 - Component deep dive: freshness and repair',
            prompt: 'How should the system recover when invalidation events are dropped?',
            options: [
  
  
              'Combine event-driven invalidation with bounded TTL fallback and periodic consistency scanners that detect and repair stale timeline entries.',
              'Disable invalidation entirely and rely on short cache TTL values so stale data disappears naturally without repair workflows. with clear tra',
              'Run full cache flushes every 30 seconds across all regions to guarantee freshness despite occasional event delivery gaps. with clear trade-o',
              'Push stale-detection responsibility to mobile clients by having apps report mismatches whenever users notice outdated timelines. with clear.',
              'Use synchronous global invalidation acknowledgments before write completion so dropped events become impossible by design. with clear trade-',
              'Treat stale feed entries as acceptable and document them as expected behavior during high-throughput write intervals. with clear trade-offs.',
          ],
          correctIndex: 0,
            helperText: 'Reliable designs include explicit reconciliation paths, not only happy-path propagation.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-realtime-checkout',
      difficulty: 'hard',
      prompt:
        'Design a real-time checkout platform with 90,000 reads/s, 12,000 writes/s, p95 < 150ms, and strict inventory correctness for the final purchase step. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr'],
      correctIndex: 0,
      correctExplanation:
        'Strong interview performance starts with transaction semantics and failure behavior, then moves into read/write scaling, and only then picks workflow orchestration, idempotency, and inventory reservation internals. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Realtime Checkout Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
        scenarioSummary:
          'Mixed read/write traffic with strict correctness on inventory reservation and payment finalization, framed as a complete interview flow. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'checkout-functional-user-journey with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
            title: 'Phase 1 - Functional requirements: user journey with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
            prompt: 'Which end-to-end workflow should be explicitly specified first? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
            options: [
              'Cart review, price validation, inventory reservation, payment authorization/capture, and order confirmation with deterministic user-visible states. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Start with anti-fraud scoring requirements and infer checkout sequencing once model confidence thresholds are finalized. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Begin with warehouse picking APIs because fulfillment orchestration determines the shape of checkout service contracts. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wi',
              'Define only payment provider integrations and rely on frontend clients to orchestrate inventory and order creation sequences. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrai',
              'Specify cache key strategy first because catalog and cart reads dominate traffic before final purchase submission. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cl',
              'Implement optimistic client checkout locally and reconcile server-side order correctness in nightly data quality jobs. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
          ],
          correctIndex: 0,
            helperText: 'Checkout design starts with explicit state transitions and user-observable outcomes.',
          },
          {
            id: 'checkout-functional-edge-cases',
            title: 'Phase 1 - Functional requirements: edge cases',
            prompt: 'What edge-case behavior should be required up front?',
            options: [
  
  
              'Well-defined handling for payment timeout, partial authorization, out-of-stock race, duplicate submit, and explicit cancel/refund semantics.',
              'Only document happy-path checkout and treat edge cases as operational runbook decisions outside product requirements. with clear trade-offs.',
              'Handle duplicate submit only at the web client because mobile checkout can be retried safely without backend dedupe guarantees. with clear t',
              'Defer out-of-stock behavior to fulfillment systems since checkout can always place orders optimistically and reconcile later. with clear tra',
              'Treat payment provider timeouts as automatic failures with no intermediate state or asynchronous status reconciliation path. with clear trad',
              'Support retry by issuing a new order id for every click to simplify idempotency requirements across internal services. with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Complex systems fail at boundaries; good requirements call those out early.',
          },
          {
            id: 'checkout-nfr-consistency',
            title: 'Phase 2 - Non-functional requirements: correctness targets',
            prompt: 'How should consistency requirements be expressed?',
            options: [
  
  
              'Require strict no-oversell guarantees at reservation/commit boundaries and exactly-once business outcome semantics via idempotent state transitions.',
              'Allow occasional oversell because demand spikes are rare and customer support can resolve inventory mismatches post-purchase. with clear trade-offs.',
              'Guarantee only eventual consistency for reservations and rely on periodic reconciliation to correct customer-facing order status. with clear trade-o',
              'Use at-most-once processing throughout checkout to avoid duplicates, accepting that some successful payments may be dropped. with clear trade-offs a',
              'Define consistency targets at the database layer only and avoid explicit business-level guarantees for order finalization. with clear trade-offs and',
              'Prioritize response-time SLOs over inventory correctness so checkout appears responsive during high contention periods. with clear trade-offs and ex',
          ],
          correctIndex: 0,
            helperText: 'Business invariants should be explicit and testable.',
          },
          {
            id: 'checkout-nfr-reliability',
            title: 'Phase 2 - Non-functional requirements: reliability and latency',
            prompt: 'Which non-functional objective set is most appropriate?',
            options: [
  
  
              'Set p95 checkout submit latency < 150ms for accepted steps, define availability targets per dependency, and establish bounded retry budgets with graceful degradation.',
              'Set one global timeout threshold and allow every service to choose its own retry strategy independently for flexibility. with clear trade-offs and explicit operationa',
              'Optimize median latency only, since tail latency is primarily an infrastructure concern and not part of system design. with clear trade-offs and explicit operational.',
              'Disable retries on downstream failures to keep latency deterministic even if transaction success rates fluctuate significantly. with clear trade-offs and explicit ope',
              'Treat latency goals as aspirational and focus solely on annual uptime percentages without endpoint-level service objectives. with clear trade-offs and explicit operat',
              'Use aggressive retries at all layers by default so transient dependency failures are masked from users without special coordination. with clear trade-offs and explici',
          ],
          correctIndex: 0,
            helperText: 'Latency, availability, and retry budgets should be designed together.',
          },
          {
            id: 'checkout-capacity-hotspots',
            title: 'Phase 3 - Scaling and capacity: hotspot analysis',
            prompt: 'Where is contention likely and what should capacity planning prioritize?',
            options: [
  
  
              'Prioritize inventory rows for hot SKUs, payment provider rate limits, and order-state transition throughput with explicit headroom for promotion spikes.',
              'Focus primarily on read scaling because writes are comparatively lower and consistency concerns can be solved with larger cache clusters. with clear tra',
              'Treat all SKUs as uniform traffic so random partitioning alone should remove most contention risks under flash-sale conditions. with clear trade-offs an',
              'Assume payment providers auto-scale infinitely and model only internal service limits when estimating peak throughput. with clear trade-offs and explici',
              'Avoid hotspot planning by buffering all checkout requests in queue and processing them in strict FIFO over several minutes. with clear trade-offs and ex',
              'Dimension capacity from average daily traffic because p95 flash-sale spikes are too irregular to justify architectural complexity. with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'Capacity plans should reflect uneven access patterns and external dependency limits.',
          },
          {
            id: 'checkout-capacity-data-model',
            title: 'Phase 3 - Scaling and capacity: data model and partitioning',
            prompt: 'How should orders and inventory state be partitioned?',
            options: [
  
  
              'Partition orders by tenant/region and time, while inventory uses SKU-centric keys with conflict-aware reservation records to localize write contention.',
              'Store all inventory and orders in one globally ordered table to simplify analytics and avoid distributed transaction boundaries. with clear trade-offs.',
              'Partition inventory by customer id because order access patterns are primarily user-centric across checkout sessions. with clear trade-offs and explici',
              'Use payment method as the primary partition key so card and wallet flows can scale independently of SKU demand patterns. with clear trade-offs and expl',
              'Keep order writes unpartitioned and solve growth by adding bigger database nodes rather than introducing key design complexity. with clear trade-offs a',
              'Partition only archival tables while operational checkout rows remain centralized to preserve strict transactional semantics. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Partitioning strategy should align with conflict domains, not just query convenience.',
          },
          {
            id: 'checkout-architecture-ingress',
            title: 'Phase 4 - Architecture decisions: ingress and service boundaries',
            prompt: 'What frontend architecture is best for checkout traffic?',
            options: [
  
  
              'Use API gateway and load-balanced stateless checkout services, with dedicated auth, pricing, and cart validation components before order workflow orchestration.',
              'Use a single stateful checkout monolith per region and replicate session memory through periodic snapshots for failover. with clear trade-offs and explicit oper',
              'Expose payment and inventory internal services directly to clients and keep orchestration logic in frontend code for speed. with clear trade-offs and explicit o',
              'Terminate all checkout actions at CDN workers and persist final order records asynchronously to backend systems. with clear trade-offs and explicit operational.',
              'Route every operation through one synchronous request chain to guarantee deterministic step ordering across dependencies. with clear trade-offs and explicit ope',
              'Allow each client platform to call service endpoints in custom order so API flexibility can reduce backend coordination overhead. with clear trade-offs and expl',
          ],
          correctIndex: 0,
            helperText: 'Good boundaries reduce coupling and make failures easier to isolate.',
          },
          {
            id: 'checkout-architecture-workflow',
            title: 'Phase 4 - Architecture decisions: workflow orchestration',
            prompt: 'Which orchestration pattern best handles retries and compensation?',
            options: [
  
  
              'Use a durable workflow engine/state machine with idempotent step handlers, explicit compensation actions, and persisted transition history.',
              'Chain synchronous HTTP calls and rely on upstream retries to complete partially finished operations without central workflow state. with cl',
              'Use fire-and-forget events for each step and reconcile order correctness in nightly batch jobs when mismatches appear. with clear trade-off',
              'Keep orchestration in payment webhooks so internal services remain stateless and simpler to scale independently. with clear trade-offs and.',
              'Require manual operator intervention for each timeout so business correctness is guaranteed by human review rather than automation. with cl',
              'Serialize all checkout requests globally through one queue partition to avoid race conditions with minimal implementation effort. with clea',
          ],
          correctIndex: 0,
            helperText: 'Orchestration should make retries safe and outcomes observable.',
          },
          {
            id: 'checkout-deep-dive-idempotency',
            title: 'Phase 5 - Component deep dive: idempotency model',
            prompt: 'How should duplicate submissions be prevented across services?',
            options: [
  
  
              'Use end-to-end idempotency keys propagated through checkout, payment, and order services, backed by durable dedupe records with bounded retention.',
              'Handle duplicates at the edge gateway only because backend services can trust normalized client behavior after first validation. with clear trade-',
              'Rely on database unique constraints alone and avoid explicit idempotency keys to reduce request metadata complexity. with clear trade-offs and exp',
              'Create new order ids on each retry and merge duplicates offline using billing reconciliation and support tooling. with clear trade-offs and explic',
              'Use in-memory mutexes per app instance so concurrent retries are blocked without durable coordination overhead. with clear trade-offs and explicit',
              'Let payment provider transaction ids serve as universal dedupe keys for every internal state transition and side effect. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Idempotency must survive retries, restarts, and multi-service hops.',
          },
          {
            id: 'checkout-deep-dive-read-after-write',
            title: 'Phase 5 - Component deep dive: read-after-write guarantees',
            prompt: 'After order placement, how should users see accurate latest status?',
            options: [
  
  
              'Apply read-after-write consistency tokens/session routing so confirmation reads hit primary-consistent paths until replicas converge.',
              'Serve all confirmation pages from any replica and depend on user refresh behavior to eventually observe correct status. with clear tr',
              'Cache order status aggressively at edge and update entries asynchronously whenever workflow events are eventually delivered. with cle',
              'Force a fixed client delay before status fetch so replication lag is likely resolved by the time confirmation is requested. with clea',
              'Persist order status first in browser storage and sync to backend later to provide immediate UI responsiveness. with clear trade-offs',
              'Send status via webhook email only and avoid immediate confirmation APIs to remove consistency pressure from read paths. with clear t',
          ],
          correctIndex: 0,
            helperText: 'Consistency windows should be intentional and user-facing behavior predictable.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-stream-pipeline',
      difficulty: 'hard',
      prompt:
        'Design a real-time analytics pipeline for streaming commerce events at 600,000 events/s with dashboards available within 5 seconds. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear t'],
      correctIndex: 0,
      correctExplanation:
        'Interview-quality design begins with product questions about metrics and freshness, then clarifies correctness and replay requirements, then chooses ingestion, processing, storage, and deep operational safeguards. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Streaming Analytics Pipeline with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
        scenarioSummary:
          'High-ingest telemetry with near-real-time dashboards and durable backfill storage, structured as a complete system design interview. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational.',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'stream-functional-metric-contracts with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and e',
            title: 'Phase 1 - Functional requirements: metric contracts with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
            prompt: 'What should be defined first for dashboard behavior? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
            options: [
              'Canonical metric definitions, dimensional filters, aggregation windows, and late-update behavior so teams interpret dashboard values consistently. with clear trade-offs and explicit operational constraints with clear trade-offs and explici',
              'Choose stream processing framework first and let product analytics map metric semantics to available operators afterward. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints',
              'Prioritize warehouse schema design before defining which business metrics must be available in under 5 seconds. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clea',
              'Implement visualization components first so metric naming and calculation details can evolve with stakeholder feedback. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints w',
              'Define producer SDK batching rules only and assume downstream metric interpretation can be standardized post-launch. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with',
              'Start with retention policies and postpone dashboard query semantics until data volume patterns stabilize in production. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
          ],
          correctIndex: 0,
            helperText: 'Without metric contracts, low-latency numbers can still be wrong or ambiguous.',
          },
          {
            id: 'stream-functional-correction-path',
            title: 'Phase 1 - Functional requirements: correction behavior',
            prompt: 'How should correction and retraction requirements be captured?',
            options: [
  
  
              'Require explicit support for late events, deduplication, retractions, and backfilled corrections with clear UI semantics for provisional vs finalized metrics.',
              'Assume event streams are always clean and defer correction paths to offline data governance tooling outside the pipeline. with clear trade-offs and explicit o',
              'Treat every event as immutable truth and block all post-ingestion changes to preserve operational simplicity. with clear trade-offs and explicit operational c',
              'Allow manual dashboard edits when anomalies occur so engineering can postpone retraction support in the data plane. with clear trade-offs and explicit operati',
              'Handle correction only at nightly batch layer and keep real-time dashboards intentionally approximate without SLA commitments. with clear trade-offs and expli',
              'Drop duplicate and late events aggressively to preserve processing throughput and keep operator complexity minimal. with clear trade-offs and explicit operati',
          ],
          correctIndex: 0,
            helperText: 'Real-world streams need explicit correction semantics.',
          },
          {
            id: 'stream-nfr-latency-accuracy',
            title: 'Phase 2 - Non-functional requirements: latency vs accuracy',
            prompt: 'Which NFR framing best balances freshness and correctness?',
            options: [
  
  
              'Set dual SLOs: dashboard freshness under 5 seconds for provisional metrics and bounded correction lag for finalized values, with auditable accuracy thresholds.',
              'Optimize only freshness and accept unknown accuracy drift, since dashboards are primarily directional rather than transactional. with clear trade-offs and expl',
              'Guarantee exact real-time global totals at all moments by synchronously ordering all partitions before publishing any update. with clear trade-offs and explici',
              'Measure success using median ingestion latency only because correction quality is difficult to quantify in service objectives. with clear trade-offs and explic',
              'Set strict p50 and p75 goals while excluding p95/p99, as tails are considered implementation noise in streaming pipelines. with clear trade-offs and explicit o',
              'Use one fixed timeout for every processing stage and treat any timeout completion as equivalent to successful metric publication. with clear trade-offs and exp',
          ],
          correctIndex: 0,
            helperText: 'Separate provisional and finalized guarantees to make trade-offs explicit.',
          },
          {
            id: 'stream-nfr-resilience',
            title: 'Phase 2 - Non-functional requirements: resilience and recoverability',
            prompt: 'What reliability requirement is most important at this scale?',
            options: [
  
  
              'Require deterministic replayability from immutable source data, with RPO/RTO targets and verifiable exactly-once business outcomes for critical aggregates.',
              'Prefer at-most-once event processing so operators avoid duplicates, even if rare data loss occurs during failover scenarios. with clear trade-offs and expl',
              'Depend on queue durability alone and avoid explicit replay tooling since most production issues can be patched in warehouse tables. with clear trade-offs a',
              'Treat replay as a manual incident workflow and optimize for steady-state throughput over recoverability engineering effort. with clear trade-offs and expli',
              'Persist only aggregate snapshots because raw-event retention is expensive and usually unnecessary after dashboards are computed. with clear trade-offs and.',
              'Use regional active-passive failover with no cross-region validation because pipeline consistency is easier with one writer region. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Resilience should include a credible path to recompute trusted outputs.',
          },
          {
            id: 'stream-capacity-ingest',
            title: 'Phase 3 - Scaling and capacity: ingest planning',
            prompt: 'At 600k events/s, what ingest strategy should be chosen?',
            options: [
  
  
              'Use a horizontally partitioned log/queue with keyed partitioning, producer batching, backpressure controls, and quota isolation for noisy tenants.',
              'Route all producers to one high-memory ingest service and scale vertically until network saturation becomes the first bottleneck. with clear trade',
              'Write events directly into an OLTP database cluster and export CDC streams later for processing and aggregation. with clear trade-offs and explici',
              'Upload events to object storage first and run micro-batch jobs every few seconds for near-real-time dashboard updates. with clear trade-offs and e',
              'Terminate ingest at CDN and forward batches opportunistically to backend to reduce origin infrastructure costs. with clear trade-offs and explicit',
              'Use one queue partition per metric type so operator ownership aligns with schema boundaries regardless of throughput skew. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Capacity design should include hot-key mitigation and tenant isolation.',
          },
          {
            id: 'stream-capacity-state-scaling',
            title: 'Phase 3 - Scaling and capacity: stateful processing limits',
            prompt: 'How should state growth and windowed aggregation pressure be managed?',
            options: [
  
  
              'Shard processing by stable keys, use bounded window state with compaction/checkpointing, and externalize long-lived state to scalable stores.',
              'Keep all state in process memory for fastest computation and rely on periodic restart to free accumulation pressure. with clear trade-offs an',
              'Use one global processor for each metric family so cross-partition joins are always local to a single worker. with clear trade-offs and expli',
              'Write intermediate state directly to dashboard cache so processors can stay stateless and simple under high throughput. with clear trade-offs',
              'Disable watermarking and allow unbounded event-time windows so no potentially useful event data is discarded. with clear trade-offs and expli',
              'Push aggregation responsibility to clients and treat backend as an event relay to minimize server-side state concerns. with clear trade-offs.',
          ],
          correctIndex: 0,
            helperText: 'State strategy is often the hidden bottleneck in streaming systems.',
          },
          {
            id: 'stream-architecture-ingest-processing',
            title: 'Phase 4 - Architecture decisions: ingest and processing topology',
            prompt: 'What architecture best supports low-latency processing plus durability?',
            options: [
  
  
              'Adopt decoupled ingest log, stateless processing workers with checkpointed state, and separate serving/warehouse sinks connected through durable event contracts.',
              'Use one monolithic analytics service that ingests, computes, stores, and serves all queries to simplify operational ownership. with clear trade-offs and explicit',
              'Write dashboards directly from queue consumers and bypass persistent aggregate stores to reduce serving path complexity. with clear trade-offs and explicit opera',
              'Prioritize warehouse-first architecture and generate near-real-time responses by querying partially loaded batch tables. with clear trade-offs and explicit opera',
              'Embed stream processing inside API gateway so event transformation and authentication happen in one low-latency tier. with clear trade-offs and explicit operatio',
              'Use only object storage + scheduled SQL engines and avoid dedicated stream processors to reduce infrastructure heterogeneity. with clear trade-offs and explicit.',
          ],
          correctIndex: 0,
            helperText: 'Decoupling planes improves operability and independent scaling.',
          },
          {
            id: 'stream-architecture-serving-layer',
            title: 'Phase 4 - Architecture decisions: serving layer',
            prompt: 'How should dashboards query recent and historical data together?',
            options: [
  
  
              'Serve recent aggregates from low-latency stores/cache and merge with warehouse-backed historical slices through a unified query API contract.',
              'Serve all dashboards from warehouse queries only and rely on aggressive compute autoscaling to satisfy near-real-time targets. with clear tra',
              'Serve all dashboards from in-memory processor state and skip durable aggregate stores to reduce write amplification. with clear trade-offs an',
              'Expose separate APIs for recent and historical metrics and require frontend clients to merge responses at render time. with clear trade-offs.',
              'Use queue replay on each dashboard request so metrics always reflect newest event offsets without dedicated serving state. with clear trade-o',
              'Persist only raw events and force each dashboard query to recompute required aggregates in real time for full flexibility. with clear trade-o',
          ],
          correctIndex: 0,
            helperText: 'Serving architecture should optimize both freshness and query ergonomics.',
          },
          {
            id: 'stream-deep-dive-late-events',
            title: 'Phase 5 - Component deep dive: late and out-of-order handling',
            prompt: 'What is the best detailed strategy for late events?',
            options: [
  
  
              'Use event-time windows with watermarks, side outputs for very-late events, and correction streams that update downstream aggregates idempotently.',
              'Drop all events older than a strict cutoff to keep dashboards stable and avoid correction complexity in serving layers. with clear trade-offs and',
              'Delay all dashboard publication until global ordering is guaranteed across partitions and regions for each event window. with clear trade-offs an',
              'Recompute full-day aggregates whenever a late event arrives so no correction stream semantics are needed downstream. with clear trade-offs and ex',
              'Treat producer timestamp as perfect truth and avoid watermark logic to simplify processing graph and state retention policies. with clear trade-o',
              'Send late events to archive only and never reapply them because users prefer stable dashboards over changing values. with clear trade-offs and ex',
          ],
          correctIndex: 0,
            helperText: 'Deep dives should explain both algorithmic behavior and downstream impact.',
          },
          {
            id: 'stream-deep-dive-replay',
            title: 'Phase 5 - Component deep dive: replay and backfill',
            prompt: 'How should replay be implemented after a logic bug in aggregation?',
            options: [
  
  
              'Replay immutable raw events into versioned pipelines, emit side-by-side outputs, validate deltas, and promote corrected versions with controlled cutover.',
              'Patch aggregate tables directly in place and skip replay to restore dashboards quickly with minimal compute cost. with clear trade-offs and explicit oper',
              'Restart stream processors from latest offsets and accept historical inaccuracies for windows already marked as complete. with clear trade-offs and explic',
              'Rebuild only sampled partitions and extrapolate missing corrections to avoid expensive full backfill workloads. with clear trade-offs and explicit operat',
              'Use manual SQL edits in warehouse and declare real-time stores eventually consistent without formal correction procedures. with clear trade-offs and expl',
              'Run replay in production processors directly so current and corrected logic operate on same state directories simultaneously. with clear trade-offs and e',
          ],
          correctIndex: 0,
            helperText: 'Safe replay requires versioning, validation, and controlled promotion.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-global-chat',
      difficulty: 'hard',
      prompt:
        'Design a global chat service with 250,000 reads/s, 40,000 writes/s, p95 < 90ms, and messages delivered to active users within 500ms. Work through the interview in phase order and choose the best decision in each section.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad'],
      correctIndex: 0,
      correctExplanation:
        'Great answers define conversation semantics and delivery guarantees first, then set latency and durability goals, estimate write/read hotspots, and finally deep dive on ordering, dedupe, and presence synchronization. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Chat Service with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operationa',
        scenarioSummary:
          'Low-latency message delivery with heavy read traffic and durable history, organized as a realistic end-to-end interview progression. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational con',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'chat-functional-message-semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
            title: 'Phase 1 - Functional requirements: messaging semantics with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear',
            prompt: 'Which product behaviors should be locked first for chat? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
            options: [
              'One-to-one and group messaging semantics, delivery/read receipts, edit/delete rules, attachment behavior, and offline catch-up expectations. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Presence and typing indicators first, since they are more latency-sensitive than durable message operations. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trad',
              'Shard layout first, then infer room semantics from whichever partitioning approach is easiest to operationalize. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear.',
              'Encryption algorithm selection first, while leaving conversation-level receipt and ordering semantics to implementation teams. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constrain',
              'Prioritize push notification fanout and defer core message send/receive contracts until mobile clients are finalized. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with c',
              'Define only group chat behavior and assume direct messaging can reuse the same logic without explicit requirements. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with cle',
          ],
          correctIndex: 0,
            helperText: 'Clear user-facing semantics reduce ambiguity in delivery and storage design.',
          },
          {
            id: 'chat-functional-room-lifecycle',
            title: 'Phase 1 - Functional requirements: room lifecycle and moderation',
            prompt: 'What room-level requirements belong in the initial design pass?',
            options: [
  
  
              'Membership changes, mute/block policy effects, retention windows, and moderation actions that deterministically impact message visibility.',
              'Only define join and leave APIs, leaving moderation, visibility, and retention effects to policy engines after launch. with clear trade-of',
              'Treat moderation as asynchronous analytics and keep message visibility unaffected until periodic review jobs complete. with clear trade-of',
              'Allow clients to enforce block/mute locally so backend services can remain agnostic to room policy semantics. with clear trade-offs and ex',
              'Use one retention setting globally and postpone room-level lifecycle rules until legal teams finalize regional policies. with clear trade-',
              'Model room lifecycle entirely through notification preferences, since storage and visibility can remain implementation details. with clear',
          ],
          correctIndex: 0,
            helperText: 'Visibility rules are functional requirements, not merely operational concerns.',
          },
          {
            id: 'chat-nfr-latency-delivery',
            title: 'Phase 2 - Non-functional requirements: latency and delivery guarantees',
            prompt: 'How should messaging guarantees be articulated?',
            options: [
  
  
              'Set explicit p95 end-to-end send-to-deliver under 500ms for active users, plus durable at-least-once transport with idempotent exactly-once business effects.',
              'Guarantee best-effort low latency without explicit percentiles, since messaging quality is mostly subjective across network conditions. with clear trade-offs',
              'Use median latency goals only because tail behavior is dominated by client connectivity and not backend architecture. with clear trade-offs and explicit oper',
              'Require strict exactly-once transport at network layer, even if this significantly increases regional failover complexity. with clear trade-offs and explicit',
              'Prioritize throughput over delivery guarantees and rely on users to resend messages when anomalies occur during peak traffic. with clear trade-offs and expli',
              'Set global timeout thresholds and classify all timeout responses as delivered to maintain consistent API behavior. with clear trade-offs and explicit operati',
          ],
          correctIndex: 0,
            helperText: 'Define user-visible guarantees and implementation constraints separately.',
          },
          {
            id: 'chat-nfr-availability-durability',
            title: 'Phase 2 - Non-functional requirements: availability and durability',
            prompt: 'What reliability posture is most appropriate?',
            options: [
  
  
              'Require multi-region failover for active conversations, durable message persistence before acknowledgment, and bounded recovery objectives for history and delivery queues.',
              'Prefer single-region primaries for simplicity and rebuild message history from queue retention after major outages. with clear trade-offs and explicit operational constrai',
              'Acknowledge messages before persistence to preserve low latency, then persist asynchronously when storage becomes available. with clear trade-offs and explicit operational',
              'Treat conversation history as optional for availability and retain only recent in-memory thread data during incidents. with clear trade-offs and explicit operational const',
              'Use cache replicas as temporary source of truth in outages and backfill durable storage opportunistically after recovery. with clear trade-offs and explicit operational co',
              'Guarantee only eventual durability so regional partitions can continue serving writes independently without coordination. with clear trade-offs and explicit operational co',
          ],
          correctIndex: 0,
            helperText: 'Durability and availability should be explicit and testable.',
          },
          {
            id: 'chat-capacity-hot-conversations',
            title: 'Phase 3 - Scaling and capacity: hotspot mitigation',
            prompt: 'How should high-traffic rooms and celebrity chats be handled?',
            options: [
  
  
              'Partition by conversation id with adaptive shard splitting for hot rooms, plus fanout workers that isolate heavy channels from normal traffic.',
              'Route all conversations through one global sequence service so ordering remains simple under heavy burst conditions. with clear trade-offs and',
              'Shard by sender user id only, since write-origin scaling is usually enough to protect read-heavy group channels. with clear trade-offs and exp',
              'Serve high-traffic rooms from cache-only infrastructure and replicate durable writes later through asynchronous summarization. with clear trad',
              'Apply identical resource limits to every room so fairness is preserved regardless of participant count or message rate. with clear trade-offs.',
              'Store large-room traffic in object storage immediately to avoid stressing online messaging databases at peak load. with clear trade-offs and e',
          ],
          correctIndex: 0,
            helperText: 'Conversation-level skew is often the dominant scaling challenge.',
          },
          {
            id: 'chat-capacity-storage-layout',
            title: 'Phase 3 - Scaling and capacity: storage and index layout',
            prompt: 'What storage pattern best supports thread reads and writes?',
            options: [
  
  
              'Use append-optimized message storage keyed by conversation + sequence, with secondary indexes for recent thread windows and participant cursors.',
              'Store messages in one global chronological table and filter by conversation at query time to keep writes straightforward. with clear trade-offs.',
              'Persist only per-user inbox copies so conversation reconstruction is distributed and no shared thread store is needed. with clear trade-offs and',
              'Use search index as primary storage and mirror durable records asynchronously into a relational database for backup. with clear trade-offs and e',
              'Partition by message type (text/media/system) because heterogeneous payload size is the main determinant of query latency. with clear trade-offs',
              'Keep full thread state in cache and flush snapshots every few minutes to durable storage for operational simplicity. with clear trade-offs and e',
          ],
          correctIndex: 0,
            helperText: 'Layout should support ordered appends and efficient recent-history retrieval.',
          },
          {
            id: 'chat-architecture-ingress-gateway',
            title: 'Phase 4 - Architecture decisions: ingress and session gateway',
            prompt: 'What should the online traffic architecture look like?',
            options: [
  
  
              'Use load-balanced gateway nodes for websocket/session management, backed by stateless chat services and durable pub/sub delivery pipelines.',
              'Keep long-lived sessions on one monolithic app tier and replicate in-memory connection maps across regions periodically. with clear trade-o',
              'Route all chat traffic through CDN edge compute and persist directly to storage engines without an app-service layer. with clear trade-offs',
              'Expose broker endpoints directly to clients so message publish and subscribe can bypass gateway and reduce hop count. with clear trade-offs',
              'Split gateways by client platform and avoid shared session infrastructure to keep deployment velocity independent per app. with clear trade',
              'Terminate websockets in databases so sequence assignment and persistence happen in one tightly coupled component. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Gateway design should isolate connection concerns from core business logic.',
          },
          {
            id: 'chat-architecture-delivery-pipeline',
            title: 'Phase 4 - Architecture decisions: delivery pipeline',
            prompt: 'How should online and offline delivery be orchestrated?',
            options: [
  
  
              'Use queue-backed delivery workers with per-recipient cursors, online push for active sessions, and durable offline inbox processing with retry/dead-letter policies.',
              'Perform recipient fanout synchronously in the sender request so delivery status can be final before API acknowledgment. with clear trade-offs and explicit operation',
              'Use cache invalidation channels as the primary transport for message fanout and rely on eventual persistence for reliability. with clear trade-offs and explicit ope',
              'Treat offline delivery as periodic batch export and keep online path unaware of recipient acknowledgment state. with clear trade-offs and explicit operational const',
              'Write one broadcast event per message and let each client infer delivery state without server-side recipient tracking. with clear trade-offs and explicit operationa',
              'Depend on push-notification provider acknowledgments as the canonical proof of message delivery to recipients. with clear trade-offs and explicit operational constr',
          ],
          correctIndex: 0,
            helperText: 'Delivery architecture needs durable state for retries and user-visible status.',
          },
          {
            id: 'chat-deep-dive-ordering-dedupe',
            title: 'Phase 5 - Component deep dive: ordering and dedupe',
            prompt: 'What ordering/deduplication strategy is strongest?',
            options: [
  
  
              'Assign per-conversation monotonic sequence numbers at write accept, store idempotency keys, and enforce dedupe at both write and delivery consumers.',
              'Order messages by gateway arrival timestamp and reconcile rare inversions during client rendering for smoother backend throughput. with clear trade-',
              'Use client-generated incremental counters as canonical sequence ids to avoid central sequencing bottlenecks in hot rooms. with clear trade-offs and.',
              'Rely on queue partition ordering globally and skip conversation-level sequence assignment in storage for simplicity. with clear trade-offs and expli',
              'Perform dedupe only in nightly jobs, since online duplicate suppression adds write-path latency and metadata overhead. with clear trade-offs and exp',
              'Use database auto-increment ids per shard and merge cross-shard ordering heuristically when rendering conversation windows. with clear trade-offs an',
          ],
          correctIndex: 0,
            helperText: 'Ordering must be defined per conversation boundary, not globally.',
          },
          {
            id: 'chat-deep-dive-presence',
            title: 'Phase 5 - Component deep dive: presence and typing',
            prompt: 'How should volatile presence state be tracked?',
            options: [
  
  
              'Track presence in ephemeral in-memory stores with heartbeat TTLs, publish deltas through pub/sub, and periodically reconcile against gateway connection truth.',
              'Store every heartbeat in durable message history tables so status transitions remain fully auditable for troubleshooting. with clear trade-offs and explicit o',
              'Persist presence in client local storage and sync once per minute to avoid backend churn during high connection counts. with clear trade-offs and explicit ope',
              'Derive presence from latest message timestamp only, since active typing indicators are not critical to chat quality. with clear trade-offs and explicit operat',
              'Use long-lived cache entries with manual invalidation so gateway disconnect storms do not produce rapid status churn. with clear trade-offs and explicit opera',
              'Treat broker lag as the source of truth for online status because pub/sub throughput closely correlates with active sessions. with clear trade-offs and explic',
          ],
          correctIndex: 0,
            helperText: 'Presence needs low-latency volatility handling plus reconciliation safeguards.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-global-payments-ledger',
      difficulty: 'hard',
      prompt:
        'Design a global payments ledger with strict no-double-spend rules. Pick the best choice in each phase.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers lock invariants first, then choose storage, workflows, and providers that keep money flows correct during retries and outages. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Payments And Ledger Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear tr',
        scenarioSummary:
          'Money movement with strict accounting, CAP tradeoffs, and provider decisions. with clear trade-offs and explicit operational constraints with clear trade-offs and expl',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'payments-functional-invariants with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints with clear trade-o',
            title: 'Phase 1 - Functional requirements: invariants with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints wit',
            prompt: 'Which requirements must be locked before discussing technology? with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
            options: [
              'Lock double-entry, idempotency, settlement states, and reversal rules first. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Start with fraud model design; ledger rules can follow later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'Start with dashboard UX; backend invariants can be refined later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
              'Start with PSP SDK wrappers; accounting can vary by provider. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational',
              'Start with cache strategy because reads are higher than writes. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operation',
              'Start with BI exports; transactional semantics can be backfilled. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operati',
          ],
          correctIndex: 0,
            helperText: 'In payment systems, invariants come before tooling.',
          },
          {
            id: 'payments-tech-choice-ledger-store',
            title: 'Phase 2 - Technology choice: ledger storage engine',
            prompt: 'Which storage approach is most appropriate for ledger records?',
            options: [
  
  
              'Use ACID relational storage with immutable journal entries as source of truth.',
              'Use a document store so schema changes are easier than transactions. with clea',
              'Use cache as the primary ledger to minimize write latency. with clear trade-of',
              'Use object files as primary ledger and rebuild balances in batch. with clear t',
              'Use graph DB as canonical ledger because accounts are connected. with clear tr',
              'Use in-memory state as canonical and snapshot every few minutes. with clear tr',
          ],
          correctIndex: 0,
            helperText: 'Ledgers need strong transactions and immutable history.',
          },
          {
            id: 'payments-cap-tradeoff-authorization',
            title: 'Phase 2 - CAP tradeoff: authorization path',
            prompt: 'For card authorization and balance reservation, which CAP stance is best during network partitions?',
            options: [
  
  
              'Choose consistency + partition tolerance for final debits, accept temporary unavailability.',
              'Choose availability first and reconcile conflicting debits later. with clear trade-offs and',
              'Choose availability + consistency by using one global primary. with clear trade-offs and ex',
              'Choose only partition tolerance; consistency can be best effort. with clear trade-offs and.',
              'Skip CAP analysis because PSPs handle partition behavior for you. with clear trade-offs and',
              'Use eventual consistency for debits and strict reads for analytics. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Double-debits are worse than short unavailability.',
          },
          {
            id: 'payments-database-type-balance-reads',
            title: 'Phase 3 - Database type: serving balances and history',
            prompt: 'What database mix best serves low-latency reads without compromising ledger correctness?',
            options: [
  
  
              'Keep OLTP ledger canonical; project read views to replicas or OLAP.',
              'Make OLAP warehouse canonical for both writes and reads. with clear',
              'Use one NoSQL table for writes and financial reporting. with clear.',
              'Use search index as canonical account state store. with clear trade',
              'Use cache snapshots as canonical balances. with clear trade-offs an',
              'Use time-series DB as canonical ledger engine. with clear trade-off',
          ],
          correctIndex: 0,
            helperText: 'Split correctness writes from analytics reads.',
          },
          {
            id: 'payments-component-choice-orchestration',
            title: 'Phase 3 - Component choice: workflow orchestration',
            prompt: 'Which component pattern best handles multi-step payment workflows?',
            options: [
  
  
              'Use durable workflow state machines with retries, timeouts, and compensations.',
              'Use only synchronous RPC chains for all payment steps. with clear trade-offs a',
              'Use cron polling for stage transitions. with clear trade-offs and explicit ope',
              'Push orchestration to client SDKs. with clear trade-offs and explicit operatio',
              'Wrap all steps in one giant DB transaction. with clear trade-offs and explicit',
              'Use fire-and-forget queues without central workflow state. with clear trade-of',
          ],
          correctIndex: 0,
            helperText: 'Long flows need durable, inspectable workflow state.',
          },
          {
            id: 'payments-provider-choice-psp',
            title: 'Phase 4 - Provider selection: payment service providers',
            prompt: 'How should PSP providers be chosen and routed across regions and payment methods?',
            options: [
  
  
              'Use region-aware multi-PSP routing with failover and quality scoring.',
              'Use one global PSP everywhere for simpler integration. with clear tra',
              'Route randomly and pick winners during reconciliation. with clear tra',
              'Always pick cheapest PSP; ignore reliability differences. with clear.',
              'Pin one PSP per merchant forever. with clear trade-offs and explicit.',
              'Choose PSP only at onboarding; disable runtime failover. with clear t',
          ],
          correctIndex: 0,
            helperText: 'PSP strategy should balance quality, compliance, and resilience.',
          },
          {
            id: 'payments-provider-choice-cloud',
            title: 'Phase 4 - Provider selection: cloud and managed services',
            prompt: 'What is the best cloud provider strategy for this platform?',
            options: [
  
  
              'Pick a primary cloud per regulated region; keep targeted portability for failover.',
              'Run full multi-cloud for every service from day one. with clear trade-offs and exp',
              'Pick cloud by lowest compute price only. with clear trade-offs and explicit operat',
              'Keep all transactional data in one region. with clear trade-offs and explicit oper',
              'Split reads and writes across different clouds by default. with clear trade-offs a',
              'Pick cloud only by team familiarity. with clear trade-offs and explicit operationa',
          ],
          correctIndex: 0,
            helperText: 'Cloud choices should follow requirements, not ideology.',
          },
          {
            id: 'payments-component-choice-idempotency',
            title: 'Phase 5 - Component deep dive: idempotency and dedupe',
            prompt: 'Which idempotency design is strongest for charge creation?',
            options: [
  
  
              'Use merchant-scoped idempotency keys with payload hash and durable replay.',
              'Use request timestamp as dedupe key. with clear trade-offs and explicit op',
              'Use client session id as idempotency key. with clear trade-offs and explic',
              'Dedupe only during settlement. with clear trade-offs and explicit operatio',
              'Use random server keys without payload checks. with clear trade-offs and e',
              'Store idempotency only in process memory. with clear trade-offs and explic',
          ],
          correctIndex: 0,
            helperText: 'Good idempotency verifies intent and stores outcomes durably.',
          },
          {
            id: 'payments-component-choice-ledger-reconciliation',
            title: 'Phase 5 - Component deep dive: reconciliation',
            prompt: 'How should external settlement and internal ledger reconciliation work?',
            options: [
  
  
              'Run continuous provider-vs-ledger reconciliation with correction workflows.',
              'Reconcile monthly in aggregate only. with clear trade-offs and explicit ope',
              'Reconcile only failed transactions. with clear trade-offs and explicit oper',
              'Skip provider reconciliation; trust internal writes. with clear trade-offs.',
              'Reconcile from sampled subsets only. with clear trade-offs and explicit ope',
              'Reconcile in warehouse only, no operational feedback loop. with clear trade',
          ],
          correctIndex: 0,
            helperText: 'Use closed-loop reconciliation, not occasional spot checks.',
          },
          {
            id: 'payments-component-choice-observability',
            title: 'Phase 5 - Component deep dive: observability and controls',
            prompt: 'Which observability/control posture is best for safe operations?',
            options: [
  
  
              'Trace by payment id, alert on SLO burn, and gate routing changes.',
              'Track only CPU and memory metrics. with clear trade-offs and expl',
              'Alert only on total request volume. with clear trade-offs and exp',
              'Use manual checklists instead of telemetry. with clear trade-offs',
              'Track only p50 latency. with clear trade-offs and explicit operat',
              'Disable runtime controls in production. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'High-risk paths need strong telemetry and safe runtime controls.',
          },
        ],
      },
    },
  {
      id: 'hard-multi-section-system-design-global-ride-matching',
      difficulty: 'hard',
      prompt:
        'Design a global ride-matching system with strict dispatch latency goals and city fault isolation.',
      options: [
  
  'Section plan submitted \\\', \\\'Section plan skipped with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper'],
      correctIndex: 0,
      correctExplanation:
        'Strong answers define dispatch guarantees first, then choose matching, storage, and providers that handle hotspots safely. with clear trade-offs and',
      multiSectionSystemDesign: {
        title: 'Global Ride Matching Platform with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational constraints.',
        scenarioSummary:
          'Latency-critical dispatch with geospatial indexing and provider tradeoffs. with clear trade-offs and explicit operational constraints with clear tra',
        submissionsAllowed: 3,
        sections: [
          {
            id: 'rides-functional-dispatch-guarantees with clear trade-offs and explicit operational constraints with clear trade-offs and explicit operational const',
            title: 'Phase 1 - Functional requirements: dispatch guarantees with clear trade-offs and explicit operational constraints with clear trade-offs and explicit',
            prompt: 'What guarantee set should be defined before architecture selection? with clear trade-offs and explicit operational constraints with clear trade-offs',
            options: [
              'Define trip states, single-driver assignment, cancel rules, and ETA guarantees first. with clear trade-offs and explicit operational constraints wit',
              'Define incentive model first, then derive dispatch semantics. with clear trade-offs and explicit operational constraints with clear trade-offs and e',
              'Define map FPS targets first, then backend behavior. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit o',
              'Define ranking features first, dispatch guarantees later. with clear trade-offs and explicit operational constraints with clear trade-offs and expli',
              'Define sharding first, lifecycle semantics later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
              'Define push provider first, dispatch rules later. with clear trade-offs and explicit operational constraints with clear trade-offs and explicit oper',
          ],
          correctIndex: 0,
            helperText: 'Dispatch invariants come before implementation choices.',
          },
          {
            id: 'rides-tech-choice-geospatial-index',
            title: 'Phase 2 - Technology choice: geospatial candidate lookup',
            prompt: 'Which technology approach is strongest for nearest-driver candidate retrieval?',
            options: [
  
  
              'Use in-memory city geospatial indexes with ring-expansion fallback.',
              'Use full SQL scans for nearest-driver lookup. with clear trade-offs',
              'Recompute candidates in 10-second batches. with clear trade-offs an',
              'Use object storage tiles as live location source. with clear trade-',
              'Use graph shortest-path for every dispatch lookup. with clear trade',
              'Trust client-reported nearby drivers first. with clear trade-offs a',
          ],
          correctIndex: 0,
            helperText: 'Dispatch lookup needs low-latency geospatial indexing.',
          },
          {
            id: 'rides-cap-tradeoff-dispatch',
            title: 'Phase 2 - CAP tradeoff: assignment correctness',
            prompt: 'During inter-zone partitions, what CAP posture is best for final driver assignment?',
            options: [
  
  
              'Choose C+P for assignment commits; allow scoped unavailability.',
              'Choose availability first and merge assignment conflicts later.',
              'Choose A+C by forcing a global coordinator always reachable. wi',
              'Choose P only; support can fix conflicts later. with clear trad',
              'Delay commit until pickup; CAP analysis not needed. with clear.',
              'Use eventual consistency for all assignment commits. with clear',
          ],
          correctIndex: 0,
            helperText: 'Avoid ambiguous assignment commits.',
          },
          {
            id: 'rides-database-type-state-vs-events',
            title: 'Phase 3 - Database type: trip state and event history',
            prompt: 'Which data-store split is most appropriate?',
            options: [
  
  
              'Use OLTP for canonical trip state plus immutable event stream for replay.',
              'Use raw event stream only; compute state on each request. with clear trad',
              'Use cache as canonical active trip storage. with clear trade-offs and exp',
              'Use one document DB for all trip and settlement state. with clear trade-o',
              'Use time-series DB as canonical trip state. with clear trade-offs and exp',
              'Use search index as canonical trip state. with clear trade-offs and expli',
          ],
          correctIndex: 0,
            helperText: 'Separate canonical trip state from analytics streams.',
          },
          {
            id: 'rides-component-choice-matching-loop',
            title: 'Phase 3 - Component choice: matching engine architecture',
            prompt: 'What matching engine structure is strongest under city hotspots?',
            options: [
  
  
              'Use city-scoped matching workers with ownership and backpressure.',
              'Use one global matching pool without city affinity. with clear tr',
              'Match directly inside API request threads. with clear trade-offs.',
              'Run matching in periodic cron batches. with clear trade-offs and.',
              'Let drivers self-select rides without central ranking. with clear',
              'Rank only by request age, ignore proximity. with clear trade-offs',
          ],
          correctIndex: 0,
            helperText: 'City isolation helps contain hotspots.',
          },
          {
            id: 'rides-provider-choice-maps-routing',
            title: 'Phase 4 - Provider selection: maps and routing',
            prompt: 'How should map/routing providers be selected for ETA and navigation?',
            options: [
  
  
              'Use dual map providers in key markets with quality-based routing.',
              'Use one global map provider forever. with clear trade-offs and ex',
              'Let each client OS choose its own provider. with clear trade-offs',
              'Use open data only, no commercial fallback. with clear trade-offs',
              'Choose provider by lowest cost only. with clear trade-offs and ex',
              'Choose provider by fastest API response only. with clear trade-of',
          ],
          correctIndex: 0,
            helperText: 'Provider choice should weigh quality and resilience.',
          },
          {
            id: 'rides-provider-choice-cloud-region-strategy',
            title: 'Phase 4 - Provider selection: cloud and regional footprint',
            prompt: 'Which cloud footprint strategy best fits this workload?',
            options: [
  
  
              'Use multi-region primary cloud plus targeted secondary-cloud failover paths.',
              'Use one global region only. with clear trade-offs and explicit operational c',
              'Run active-active in all clouds for every service. with clear trade-offs and',
              'Pick cloud mostly by GPU offerings. with clear trade-offs and explicit opera',
              'Pick cloud by office proximity to engineering. with clear trade-offs and exp',
              'Run stateful services single-zone for simplicity. with clear trade-offs and.',
          ],
          correctIndex: 0,
            helperText: 'Cloud strategy should follow latency and failure-domain needs.',
          },
          {
            id: 'rides-component-choice-location-ingest',
            title: 'Phase 5 - Component deep dive: high-volume location ingest',
            prompt: 'What ingest design best handles bursty driver telemetry?',
            options: [
  
  
              'Use stream ingest with per-driver ordering and adaptive throttling.',
              'Write each update synchronously to OLTP and rematch inline. with cl',
              'Drop updates faster than one per second. with clear trade-offs and.',
              'Ingest to warehouse first and match from views. with clear trade-of',
              'Sync finalized positions every 30 seconds. with clear trade-offs an',
              'Use one global FIFO queue for all cities. with clear trade-offs and',
          ],
          correctIndex: 0,
            helperText: 'Preserve ordering while absorbing burst traffic.',
          },
          {
            id: 'rides-component-choice-failure-isolation',
            title: 'Phase 5 - Component deep dive: city outage containment',
            prompt: 'How should failure isolation be designed so one city outage does not cascade?',
            options: [
  
  
              'Isolate dispatch control by city with breakers and degraded modes.',
              'Share one global queue/cache for all cities. with clear trade-offs',
              'Use global retries across every region. with clear trade-offs and.',
              'Disable matching globally on one-city incidents. with clear trade-',
              'Shift failed city traffic to nearby city control planes. with clea',
              'Depend only on autoscaling for city incidents. with clear trade-of',
          ],
          correctIndex: 0,
            helperText: 'Define failure domains explicitly.',
          },
          {
            id: 'rides-component-choice-metrics-decisioning',
            title: 'Phase 5 - Component deep dive: decision metrics',
            prompt: 'Which metric set should drive matching quality decisions?',
            options: [
  
  
              'Track wait time, assignment success, cancel rate, ETA error, and fairness.',
              'Track only completed trip count. with clear trade-offs and explicit operat',
              'Track only app session duration. with clear trade-offs and explicit operat',
              'Track only driver online minutes. with clear trade-offs and explicit opera',
              'Track only p50 matching latency. with clear trade-offs and explicit operat',
              'Track only cloud spend per city. with clear trade-offs and explicit operat',
          ],
          correctIndex: 0,
            helperText: 'Use outcome metrics, not single vanity metrics.',
          },
        ],
      },
    }
]

export default data
