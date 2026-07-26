const data = [
  {
    id: 'cto-questions-hard-roadmap-vs-tech-debt-0001',
    difficulty: 'hard',
    prompt:
      'CTO Strategy (Roadmap vs Tech Debt)\n\nA core revenue feature must ship in 12 weeks, but incident volume has doubled and the platform team says reliability debt is now the top risk. As CTO, what is the best decision?',
    options: [
      'Ship a reduced feature slice while funding a time-boxed reliability program on top incident drivers with explicit SLO targets',
      'Protect feature scope and add a temporary incident SWAT team without changing roadmap commitments',
      'Delay all roadmap work for one quarter to complete a broad reliability refactor across all services',
      'Move reliability ownership fully to the platform team while product teams continue current delivery plans',
    ],
    correctIndex: 0,
    correctExplanation:
      'The strongest executive move balances near-term revenue and systemic risk. A scoped launch plus measurable reliability investment addresses both outcomes without over-rotating.',
  },
  {
    id: 'cto-questions-hard-org-design-platform-product-0002',
    difficulty: 'hard',
    prompt:
      'CTO Org Design (Platform vs Product Ownership)\n\nProduct teams repeatedly reimplement auth, observability, and deployment tooling. Delivery speed is dropping and incidents are inconsistent across teams. What should you do first?',
    options: [
      'Define a platform product model with paved-road standards, adoption milestones, internal SLAs, and clear ownership boundaries',
      'Allow each product area to choose tools but require a quarterly architecture review for consistency',
      'Centralize all senior engineers into a platform org for 6 months to standardize every stack',
      'Keep federated ownership but require every team to maintain its own reliability and security tooling',
    ],
    correctIndex: 0,
    correctExplanation:
      'At CTO scope, platform outcomes improve when standards, service levels, and migration plans are explicit. This reduces reinvention while preserving product velocity.',
  },
  {
    id: 'cto-questions-hard-capacity-hiring-plan-0003',
    difficulty: 'hard',
    prompt:
      'CTO Planning (Headcount Allocation)\n\nYou received budget for 6 new engineers. Current risks are: growth bottlenecks in data infrastructure, rising security findings, and slow mobile feature cadence. What allocation is strongest?',
    options: [
      'Allocate by risk-adjusted business impact: stabilize data and security first, then add targeted mobile capacity with quarterly outcome metrics',
      'Allocate evenly across all orgs to preserve perceived fairness during planning season',
      'Place all 6 in mobile to maximize visible feature throughput and revisit platform risks next quarter',
      'Hold 3 requisitions unassigned as a buffer until roadmap certainty improves',
    ],
    correctIndex: 0,
    correctExplanation:
      'Executive staffing should follow constrained system risks and measurable outcomes, not organizational politics. This reduces systemic exposure while supporting growth.',
  },
  {
    id: 'cto-questions-hard-vendor-build-buy-0004',
    difficulty: 'hard',
    prompt:
      'CTO Decision (Build vs Buy)\n\nA vendor can replace your in-house messaging system in 4 months, but migration lock-in risk is high. The in-house system needs 9 months to modernize. What is the best approach?',
    options: [
      'Run a stage-gated build-vs-buy decision with TCO, lock-in mitigation, exit design, and objective migration checkpoints',
      'Choose vendor now for speed, then negotiate stronger lock-in protections after rollout begins',
      'Commit to in-house modernization to retain architectural control and avoid dependency concentration',
      'Delay the decision until production incidents increase enough to justify emergency funding',
    ],
    correctIndex: 0,
    correctExplanation:
      'A strong CTO decision framework quantifies speed, cost, strategic control, and reversibility. Stage gates reduce irreversible platform mistakes.',
  },
  {
    id: 'cto-questions-hard-incident-postmortem-governance-0005',
    difficulty: 'hard',
    prompt:
      'CTO Governance (Incident Learning)\n\nMajor incidents recur across different teams with similar root causes. Postmortems exist but action items are often stale. What policy change is most effective?',
    options: [
      'Create a reliability governance loop with executive-visible ownership, due dates, cross-team dependencies, and closure-rate targets',
      'Require every postmortem to include architecture diagrams and detailed minute-by-minute timelines',
      'Restrict action items to local team scope to avoid dependency complexity and accelerate closure',
      'Move postmortem facilitation entirely to SRE so product teams can stay focused on roadmap delivery',
    ],
    correctIndex: 0,
    correctExplanation:
      'Recurring incidents are a governance failure, not a documentation failure. Accountability, dependency tracking, and closure metrics drive systemic improvement.',
  },
  {
    id: 'cto-questions-hard-portfolio-prioritization-0006',
    difficulty: 'hard',
    prompt:
      'CTO Portfolio (Quarterly Prioritization)\n\nThe roadmap has 20 initiatives but delivery capacity supports 8. Teams are overcommitted and quality is declining. What should you do?',
    options: [
      'Rebuild the portfolio around top company outcomes, publish explicit tradeoffs, and reserve capacity for reliability plus unplanned work',
      'Keep all initiatives but sequence them with stricter weekly execution reviews and milestone pressure',
      'Prioritize only customer-facing launches and defer internal platform investments until utilization improves',
      'Ask each VP to independently cut scope within their org and reconcile conflicts at quarter end',
    ],
    correctIndex: 0,
    correctExplanation:
      'Overcommitment is itself a strategy bug. High-performing portfolios enforce focus, visible tradeoffs, and realistic capacity envelopes.',
  },
  {
    id: 'cto-questions-hard-data-governance-0007',
    difficulty: 'hard',
    prompt:
      'CTO Data Strategy (Governance)\n\nDifferent business units use conflicting KPI definitions and duplicate pipelines, causing weekly executive reporting disputes. What is the best first move?',
    options: [
      'Stand up a governed metrics layer with canonical definitions, domain owners, approval workflow, and lineage visibility',
      'Keep local KPI autonomy but require a monthly reconciliation meeting before leadership reviews',
      'Create a central BI team and migrate all reporting requests through a single ticket queue',
      'Let finance publish official KPI definitions while engineering keeps pipeline ownership decentralized',
    ],
    correctIndex: 0,
    correctExplanation:
      'Decision quality depends on trusted shared semantics. A governed metrics model eliminates recurring ambiguity and duplicated pipeline effort.',
  },
  {
    id: 'cto-questions-hard-security-roadmap-0008',
    difficulty: 'hard',
    prompt:
      'CTO Security (Risk-Based Program)\n\nAudit findings increased 3x. Teams complain security reviews block releases. What is the strongest strategy?',
    options: [
      'Adopt risk-tiered policy with automated guardrails in CI/CD, plus fast-path review for low-risk changes and strict gates for high-risk paths',
      'Shift security sign-off to a dedicated architecture committee that reviews releases twice per week',
      'Require all teams to complete threat models before every release regardless of risk profile',
      'Focus only on high-severity findings this quarter and defer process changes until next fiscal planning cycle',
    ],
    correctIndex: 0,
    correctExplanation:
      'Strong CTO programs pair risk segmentation with automation. This improves both control quality and release flow.',
  },
  {
    id: 'cto-questions-hard-engineering-kpis-0009',
    difficulty: 'hard',
    prompt:
      'CTO Metrics (Engineering Health)\n\nLeadership wants one number to measure engineering performance. Teams propose only velocity points. What should you recommend?',
    options: [
      'Use a balanced operating scorecard across delivery, reliability, quality, and talent health with narrative context on tradeoffs',
      'Use a weighted composite index where velocity has the highest weight to preserve execution pressure',
      'Adopt DORA metrics only and remove product outcome measures to keep engineering metrics objective',
      'Track uptime as the top-line metric and review delivery and quality metrics only during incidents',
    ],
    correctIndex: 0,
    correctExplanation:
      'Single metrics invite local optimization. Executive visibility requires a balanced system that captures output, outcomes, and sustainability.',
  },
  {
    id: 'cto-questions-hard-mna-tech-integration-0010',
    difficulty: 'hard',
    prompt:
      'CTO M&A (Technology Integration)\n\nAfter acquiring a smaller company, product asks for immediate full stack consolidation. Engineering warns this will freeze innovation for 9 months. Best path?',
    options: [
      'Sequence integration by value streams: identity, data contracts, and observability first, then selective stack convergence where ROI is clear',
      'Standardize both companies onto one stack in a single program to simplify long-term support costs',
      'Maintain dual stacks for 18 months and focus only on commercial integration milestones',
      'Merge product roadmaps now and defer technical integration planning until duplicate systems fail visibly',
    ],
    correctIndex: 0,
    correctExplanation:
      'Phased interoperability-first integration protects customer value and delivery continuity while reducing long-term technical fragmentation.',
  },
  {
    id: 'cto-questions-hard-ai-governance-rollout-0011',
    difficulty: 'hard',
    prompt:
      'CTO AI Governance (Enterprise Rollout)\n\nMultiple teams are shipping AI features with different evaluation methods, privacy assumptions, and approval paths. What should you establish?',
    options: [
      'Implement a unified AI governance operating model: data policy tiers, model evaluation gates, risk reviews, and post-launch monitoring standards',
      'Require each business unit to publish its own AI policy playbook and share learnings in a quarterly forum',
      'Centralize all AI delivery into one platform team to guarantee consistency before resuming distributed ownership',
      'Allow AI launches if teams document assumptions in architecture reviews and collect customer feedback after launch',
    ],
    correctIndex: 0,
    correctExplanation:
      'Cross-org AI scale needs shared controls, consistent evaluation, and monitoring discipline. Local policy variation creates compounding risk.',
  },
  {
    id: 'cto-questions-hard-reorg-communication-0012',
    difficulty: 'hard',
    prompt:
      'CTO Leadership (Reorg Execution)\n\nA major reorg is needed to align engineering to product lines. Morale risk is high due to uncertainty. What communication plan is best?',
    options: [
      'Communicate rationale, principles, timeline, and role-transition support early, with recurring manager enablement and open Q&A checkpoints',
      'Announce target structure and key role changes first, then publish rationale after leadership calibration sessions',
      'Share high-level reorg intent broadly but delay team-level mapping until all VP-level dependencies are finalized',
      'Limit communication to direct managers to reduce noise and preserve message consistency',
    ],
    correctIndex: 0,
    correctExplanation:
      'Reorg execution quality is tightly coupled to communication clarity and cadence. Early context plus predictable checkpoints reduces uncertainty-driven attrition.',
  },
  {
    id: 'cto-questions-hard-cost-optimization-0013',
    difficulty: 'hard',
    prompt:
      'CTO Finance (Cost Optimization Under Growth)\n\nCloud spend is up 42% YoY while revenue is up 18%. Product growth is healthy, but board pressure on margin is increasing. What is the strongest CTO response?',
    options: [
      'Launch a unit-economics program: set service-level cost targets, fix top cost outliers, and tie architecture changes to gross-margin impact',
      'Impose a blanket 25% infrastructure cut across all teams this quarter to hit immediate savings targets',
      'Freeze all innovation work and shift every team to cost-cutting initiatives until spend trend reverses',
      'Negotiate a larger reserved-instance commitment and defer architecture optimization decisions to next year',
    ],
    correctIndex: 0,
    correctExplanation:
      'Board-level cost management should optimize cost-to-value, not just absolute spend. Unit economics and targeted remediation protect growth while improving margin.',
  },
  {
    id: 'cto-questions-hard-global-incident-comms-0014',
    difficulty: 'hard',
    prompt:
      'CTO Operations (Global Incident Communications)\n\nA multi-region outage impacts enterprise customers across three continents. Engineering recovery ETA is uncertain for the first hour. What communication approach is best?',
    options: [
      'Activate a defined incident communication cadence with transparent impact statements, known unknowns, and committed update intervals',
      'Delay external updates until root cause is confirmed to avoid sharing incomplete information',
      'Publish a one-time executive statement and resume communication once full service is restored',
      'Let each regional GM communicate independently to tailor the message to local customer expectations',
    ],
    correctIndex: 0,
    correctExplanation:
      'During high-severity events, trust is built through consistent cadence, clarity on uncertainty, and explicit next updates, not premature certainty.',
  },
  {
    id: 'cto-questions-hard-architecture-runway-0015',
    difficulty: 'hard',
    prompt:
      'CTO Architecture (Runway Planning)\n\nYour growth model predicts 4x traffic in 18 months, but current architecture stress tests fail at 2x. Product asks to postpone platform work until demand materializes. Best decision?',
    options: [
      'Define architecture runway milestones now, fund high-risk bottleneck remediation first, and align product launch sequencing to capacity gates',
      'Accept product sequencing as planned and rely on horizontal autoscaling until observed failures demand redesign',
      'Pause all product investment and execute a full platform rewrite before any new launch commitments',
      'Outsource peak traffic handling to a managed vendor and retire internal performance engineering functions',
    ],
    correctIndex: 0,
    correctExplanation:
      'Runway planning is a timing problem. The best approach is staged bottleneck reduction linked to forecasted demand and launch decisions.',
  },
  {
    id: 'cto-questions-hard-data-residency-0016',
    difficulty: 'hard',
    prompt:
      'CTO Compliance (Data Residency Expansion)\n\nYou are entering two regulated regions with conflicting data residency requirements. Sales wants one global architecture to maximize speed. What strategy is strongest?',
    options: [
      'Adopt a policy-driven regional data architecture with shared control plane, localized data planes, and explicit product capability boundaries',
      'Keep a single global datastore and address residency exceptions through contractual language in enterprise agreements',
      'Fork the full product stack per region to guarantee compliance at the expense of long-term maintainability',
      'Delay regulated-market entry until all regions can be supported by one globally consistent data model',
    ],
    correctIndex: 0,
    correctExplanation:
      'A shared control plane with region-specific data boundaries balances compliance, speed, and maintainability better than extreme centralization or full duplication.',
  },
  {
    id: 'cto-questions-hard-leadership-bench-0017',
    difficulty: 'hard',
    prompt:
      'CTO Talent (Leadership Bench Strength)\n\nTwo critical director roles are at risk due to burnout. Succession depth is weak and strategic initiatives depend on them. What is the best immediate CTO action?',
    options: [
      'Initiate a succession plan with interim delegations, scope rebalance, and leadership development tracks tied to near-term business priorities',
      'Retain current structure and offer short-term retention bonuses while recruiting external replacements quietly',
      'Consolidate both orgs under one VP temporarily and pause all leadership development investments until hiring closes',
      'Reassign major initiatives to principal engineers and defer director-level planning responsibilities indefinitely',
    ],
    correctIndex: 0,
    correctExplanation:
      'Leadership continuity requires deliberate succession mechanisms and scope management, not only compensation or emergency reassignment.',
  },
  {
    id: 'cto-questions-hard-legacy-decommission-0018',
    difficulty: 'hard',
    prompt:
      'CTO Modernization (Legacy Decommission)\n\nA legacy platform still powers 25% of revenue but blocks major architecture improvements. Business teams fear migration risk. What is the strongest program design?',
    options: [
      'Run a migration factory with domain-by-domain cutovers, dual-run validation, executive risk gates, and sunset milestones linked to customer cohorts',
      'Mandate a hard cutover date company-wide to force urgency and avoid prolonged dual-stack cost',
      'Keep legacy and new platforms in parallel indefinitely to preserve optionality for business teams',
      'Migrate only low-revenue customers first and postpone high-value cohort planning until final quarter',
    ],
    correctIndex: 0,
    correctExplanation:
      'Revenue-linked legacy exits need phased execution, validation, and governance. Structured cohort migration reduces existential business risk.',
  },
  {
    id: 'cto-questions-hard-board-reporting-0019',
    difficulty: 'hard',
    prompt:
      'CTO Board Readout (Technology Narrative)\n\nBoard members say engineering updates are detailed but unclear on business impact. What change should you make for next quarter?',
    options: [
      'Reframe the readout around strategy-to-outcome linkage: top risks, investments, measurable business effects, and next-quarter decision asks',
      'Add more architecture depth so the board better understands technical complexity before judging outcomes',
      'Shorten updates to a one-page KPI summary and remove qualitative context to improve scanability',
      'Split updates by engineering domain and let each VP present independent scorecards to increase ownership',
    ],
    correctIndex: 0,
    correctExplanation:
      'Board communication should connect technology choices to financial and strategic outcomes. Clarity on decisions and tradeoffs is more useful than raw detail volume.',
  },
  {
    id: 'cto-questions-hard-partner-platform-strategy-0020',
    difficulty: 'hard',
    prompt:
      'CTO Ecosystem (Partner Platform Strategy)\n\nYou can accelerate enterprise growth by opening APIs to partners, but reliability and security maturity are uneven across domains. What is the best go-forward plan?',
    options: [
      'Launch a staged partner platform: certify only mature domains first, enforce API contracts and SLO tiers, then expand eligibility by readiness score',
      'Open all APIs now to maximize ecosystem momentum and retroactively harden weak domains',
      'Delay all external API exposure until every internal domain meets identical maturity thresholds',
      'Use a single premium partner with bespoke integration to avoid broad platform governance complexity',
    ],
    correctIndex: 0,
    correctExplanation:
      'Ecosystem strategy should scale through controlled expansion. Readiness-based staging enables growth while managing reliability and security risk.',
  },
]

export default data
