Status: ready-for-agent

# System Understanding Artifacts and Map Altitude Pipeline

## Problem Statement

Looper currently creates evidence-backed System Understanding Maps from a typed Map Source and renders them as interactive graph views. The generated view is visually useful, but the underlying model and renderer are too generic for the range of systems-engineering understanding Looper needs to produce. Requirements, traceability matrices, operational concepts, logical decompositions, use cases, domain models, C4 architecture views, and code views do not share one natural graph-first structure. Forcing them into one universal map schema weakens their semantics, makes validation shallow, and creates artifacts that look structured without reliably answering the questions each discipline requires.

The current approach also lacks a rigorous altitude pipeline. It does not distinguish ecosystem purpose from system context, stakeholder needs from system requirements, logical behavior from software structure, or observable Current State from Candidate Future State and human-approved Accepted Future State. Because those distinctions are missing, models can mix different kinds of truth, skip necessary systems-engineering reasoning, or generate detail without proving that the design survives contact with operational reality.

Traceability is especially important. An end user must be able to select an element, understand what it depends on and what depends on it, inspect the precise meaning and evidence for each relationship, and drill into related artifacts without facing a cluttered whole-system graph. An AI agent needs the same connectivity in a compact machine-usable form, but loading the full artifact collection or recursive dependency graph would waste tokens and can reduce reasoning quality. Evidence references must remain inspectable and fresh without forcing full source files into routine context.

The desired system must therefore preserve the benefits of typed, generated artifacts while replacing the universal map with a family of strict, connected artifact contracts. It must guide users sternly through the non-negotiable systems-engineering reasoning without manufacturing every possible document, diagram, or analysis. It must produce depth in proportion to usability, importance, risk, uncertainty, and decision value.

## Solution

Looper will evolve System Mapper into a System Understanding Artifact pipeline organized by Map Altitude. `System Understanding Artifact` is the umbrella concept. A graph-oriented System Understanding Map remains one artifact class, while requirements specifications, traceability matrices, operational concepts, logical decompositions, use-case views, domain models, C4 views, and code views become first-class artifact forms with their own contracts.

Every artifact will compose two layers:

1. A shared Artifact Envelope containing identity, artifact type, Map Altitude, scope, Artifact State, evidence, confidence, assumptions, unknowns, risks, findings, trace links, provenance, freshness, and optional value-gate rationale.
2. An Artifact-Specific Contract that defines the concepts, invariants, required evidence, trace expectations, quality checks, and visualization expectations unique to that artifact type.

An Artifact Contract Registry will associate each artifact type with its contract, expert skill, semantic validator, and Artifact Visualization Module. Shared definitions will be reused for evidence, trace links, identifiers, states, findings, and quality results. The system will not create one giant schema whose optional fields attempt to represent every artifact.

The default Altitude Pipeline will provide this orientation:

- Altitude 0A: Mission and Market Context View.
- Altitude 0B: C4 System Landscape View.
- Altitude 1: C4 System Context View and Concept of Operations.
- Altitude 2: Requirements Model with generated Requirements Specification and Requirements Traceability Matrix views.
- Altitude 3: connected Logical Decomposition Model and Use Case Model, including generated use-case diagrams and a proportionate Reality Check.
- Altitude 4: connected Domain Model and Software Architecture Model, generating Domain Model, C4 Container, and C4 Component views.
- Altitude 5: optional, risk-triggered Code Structure Model and C4 Code View for a selected important or complex component.

The Altitude Pipeline is an ordered reasoning and validation structure, not an always-generate checklist. Every engagement must satisfy a compact Systems Engineering Integrity Loop: establish purpose and scope, inspect evidence, capture operational intent, state requirements and constraints, explain logical realization, maintain traceability, perform the cheapest credible Reality Check, and report what is established and what consequential uncertainty remains. Named artifacts are produced or deepened only when they resolve uncertainty, support a decision, manage meaningful risk, or materially improve understanding.

The primary user experience will be a shared Interactive Artifact View shell with artifact-specific visualization modules. A single click selects an element and opens its details without changing scope. An explicit Drill Down action, available near the selected object and in its detail panel, navigates to a more focused artifact or greater Map Depth while preserving breadcrumbs. The Codex app's existing annotation capability will remain the annotation surface; the shell will expose stable, understandable visual targets rather than implement a parallel comment system.

Immediate relationships will be the first traceability interaction. The selected element will show universal `Depends On` and `Depended On By` groupings. Each connection will retain a standardized semantic Relationship Type and readable inverse label so that users can distinguish containment, flow, derivation, satisfaction, implementation, verification, constraint, use, protection, risk, and other approved meanings. Cross-artifact connections are included when they are immediate. Automatic end-to-end path ranking and speculative relevance modes are not required for the first implementation.

Artifact-owned trace links will be assembled into a generated Trace Index. The Trace Index will support navigation, focused matrices, coverage checks, impact analysis, drill-down, and agent context without becoming a second source of truth. Selecting an element can generate a one-hop Artifact Context Packet for an agent. The packet will contain the selected element, artifact identity and state, immediate relationships, semantic labels, evidence references, confidence basis, local findings, completeness metadata, and drill-down handles. Evidence will be reference-first and fetched on demand, with mandatory escalation to the smallest claim-bearing excerpt whenever consequence, conflict, staleness, derivation, insufficient confidence, or exactness makes summaries inadequate.

Artifact Expert Skills will author and validate canonical source models. The orchestrator will route well-specified evidence and authoring work to Luna-class models and escalate genuine ambiguity, conflicting evidence, or consequential design judgment to Terra-class models. Experts may run as bounded subagents, but one integrator will reconcile cross-artifact consistency and publish traces. Dependency-aware parallelism will allow sibling experts to run concurrently only after upstream contracts and identifiers are stable and ownership does not overlap.

## User Stories

1. As a product owner, I want to understand why a system exists before examining its implementation, so that technical work remains connected to mission and market value.
2. As a systems engineer, I want mission, market, organization, people, and software-system concepts represented with appropriate semantics, so that strategic context is not forced into C4 notation.
3. As an enterprise architect, I want a C4 System Landscape View above individual system contexts, so that I can understand the software systems in an operating environment and how they relate.
4. As a system owner, I want a C4 System Context View focused on one system, so that its users and external-system interfaces are clear.
5. As an operator, I want a Concept of Operations that explains modes, scenarios, environments, support, and off-nominal behavior, so that the architecture reflects real operation.
6. As a stakeholder, I want stakeholder needs kept distinct from developer-facing system and software requirements, so that intent is not lost during translation.
7. As a requirements engineer, I want one canonical Requirements Model to generate both a Requirements Specification and a Requirements Traceability Matrix, so that trace rows are not maintained twice.
8. As a reviewer, I want requirements to be uniquely identifiable, precise, testable, evidenced, and traceable, so that apparent completeness can be checked objectively.
9. As a systems engineer, I want a Logical Decomposition Model separate from the Use Case Model, so that system responsibilities and actor-goal interactions retain distinct meanings.
10. As a user-experience stakeholder, I want each use case connected to the logical behavior that realizes it, so that user goals and system functions cannot drift apart.
11. As a reviewer, I want one generated use-case diagram per use case when useful, so that individual interactions remain understandable instead of becoming a single crowded diagram.
12. As a system designer, I want every consequential logical model to undergo a Reality Check, so that impossible timing, capacity, resource, sequencing, failure, human-behavior, or physical assumptions are exposed early.
13. As a cost-conscious user, I want Reality Checks to begin with inexpensive structural analysis, so that simulations and prototypes are reserved for consequential uncertainty.
14. As a domain expert, I want a Domain Model to describe real-world concepts, rules, ownership, relationships, and life cycles independently of software deployment, so that business meaning remains stable.
15. As a software architect, I want a Software Architecture Model connected to the Domain Model, so that containers and components clearly own or implement domain concepts and rules.
16. As a developer, I want C4 Container and Component views generated from the same Software Architecture Model, so that architecture diagrams cannot silently contradict each other.
17. As a developer, I want a Code Structure Model generated only for a selected important or complex component, so that code-level diagrams provide value without becoming stale inventories.
18. As an architect, I want Altitude 5 to be optional and risk-triggered, so that completing the pipeline does not require mapping every class and function.
19. As a user, I want every artifact to declare Current State, Candidate Future State, or Accepted Future State, so that observed reality and proposals are never silently mixed.
20. As a decision maker, I want only an explicit human action to promote a Candidate Future State to an Accepted Future State, so that model-generated proposals cannot become commitments by implication.
21. As a reviewer, I want acceptance authority, time, and supporting decision evidence recorded for Accepted Future State, so that approval is auditable.
22. As an investigator, I want Current State established by observable and proportionately provable evidence rather than human approval, so that present reality remains an empirical claim.
23. As a responsible owner, I want a human to adjudicate conflicts between credible current-state evidence, so that the model cannot silently choose which source is true.
24. As an investigator, I want unresolved current-state conflicts preserved when no supported determination can be made, so that uncertainty is not converted into false certainty.
25. As an end user, I want a consistent Interactive Artifact View shell across artifact types, so that navigation and evidence inspection do not have to be relearned for each view.
26. As an end user, I want each artifact to use the visualization best suited to its meaning, so that requirements do not pretend to be graphs and matrices do not pretend to be architecture diagrams.
27. As an end user, I want a click to select and inspect an element without navigating away, so that exploration remains predictable.
28. As an end user, I want Drill Down to be an explicit action, so that changing scope is intentional.
29. As an end user, I want Drill Down available beside a selected object and inside its detail panel, so that the action remains discoverable in different workflows.
30. As an end user, I want breadcrumbs to preserve the artifact and drill-down path, so that I do not lose orientation while exploring depth.
31. As an accessibility-conscious user, I want double-click to be optional rather than required, so that every drill-down remains discoverable and keyboard-accessible.
32. As a Codex user, I want to annotate visible artifact elements through Codex's native annotation system, so that focused feedback uses the app's existing interaction model.
33. As a Codex user, I want annotations to target stable, understandable visual regions, so that the model receives meaningful context without a custom comment database.
34. As an end user, I want artifact-wide findings summarized without crowding the active view, so that global concerns remain visible but restrained.
35. As an end user, I want findings relevant to the current artifact view or drill-down path shown locally, so that unrelated concerns do not clog the screen.
36. As an end user, I want findings about a selected element shown in its detail panel, so that local consequences are available at the moment of inspection.
37. As an end user, I want every surfaced finding to explain its consequence and next useful action, so that validation reduces uncertainty instead of generating questions.
38. As an end user, I want related findings deduplicated and grouped, so that one underlying issue does not appear as many disconnected warnings.
39. As an end user, I want all consequential findings accessible regardless of count, so that visual restraint does not hide important information.
40. As an end user, I want lower-impact diagnostics collapsed or available on demand, so that the primary experience remains understandable.
41. As a reviewer, I want artifact quality expressed as pass, warning, or fail, so that invalidity, honest uncertainty, and satisfactory quality are distinguishable.
42. As a reviewer, I want schema validity treated as one input rather than proof of truth, so that structurally valid misinformation does not pass as understanding.
43. As a user, I want each artifact to state what it establishes, what can be trusted, consequential limitations, and the next action, so that the handoff is useful.
44. As a user, I want the system to leave me with fewer and better-prioritized unknowns, so that an artifact improves my mental model.
45. As a user, I want optional artifact depth justified by usability, importance, risk, uncertainty, or decision value, so that completeness does not become waste.
46. As an orchestrator, I want a mandatory Systems Engineering Integrity Loop independent of document production, so that rigor does not require ceremony.
47. As an orchestrator, I want purpose, system boundary, stakeholders, and success criteria established every time, so that later reasoning has a defined frame.
48. As an orchestrator, I want at least one representative operational scenario considered every time, so that the model is tested against actual use.
49. As an orchestrator, I want consequential abnormal conditions included when relevant, so that designs do not work only on the happy path.
50. As an orchestrator, I want requirements and constraints stated precisely enough to judge satisfaction, so that architecture is not evaluated against vague intent.
51. As an orchestrator, I want logical behavior or responsibilities connected to requirements, so that every important requirement has a realization path.
52. As an orchestrator, I want the cheapest credible Reality Check run every time, so that rigor scales with consequence.
53. As an orchestrator, I want to continue automatically through routine work, so that the user is not forced through ceremonial approvals.
54. As a user, I want a review gate at consequential ambiguity, failed validation, changed scope, or expensive-to-reverse commitment, so that automation does not cross important decision boundaries silently.
55. As a user, I want artifacts individually invokable, so that I can request a specific view without manufacturing the whole altitude stack.
56. As a user, I want the ordered Altitude Pipeline available when broad system understanding is required, so that lower-altitude choices remain constrained by higher-altitude intent.
57. As a traceability user, I want every important element to have a stable identifier, so that references survive rendering and navigation.
58. As a traceability user, I want trace links owned by the artifact making the assertion, so that relationship truth has a clear source.
59. As a traceability user, I want a generated Trace Index rather than a separately maintained trace database, so that navigation cannot drift from artifact truth.
60. As an end user, I want selecting an element to show its immediate relationships, so that connectivity is understandable without a whole-system graph.
61. As an end user, I want immediate relationships grouped as Depends On and Depended On By, so that impact direction is immediately understandable.
62. As an end user, I want every relationship to retain a precise semantic type, so that dependency direction does not flatten implementation, verification, flow, containment, derivation, or constraint into one generic meaning.
63. As an end user, I want readable inverse relationship labels, so that the same relationship makes sense from either endpoint.
64. As a model author, I want relationship types validated against a controlled vocabulary, so that ad hoc arrow labels do not erode meaning.
65. As an artifact-contract author, I want controlled artifact-specific relationship extensions, so that specialized semantics can be added without weakening the shared vocabulary.
66. As an end user, I want each immediate connected element to support inspection and drill-down, so that traceability leads somewhere actionable.
67. As a requirements user, I want a focused traceability matrix when it is the clearest representation, so that cross-artifact traceability does not prohibit domain-specific views.
68. As an AI agent, I want an Artifact Context Packet for the selected element, so that I can understand the local system neighborhood without loading the entire model.
69. As an AI agent, I want one-hop context by default, so that token use remains proportional to the current reasoning task.
70. As an AI agent, I want explicit completeness and truncation metadata, so that omitted neighbors are not mistaken for nonexistent relationships.
71. As an AI agent, I want stable fetch and drill-down handles, so that I can deliberately expand a relevant relationship.
72. As an AI agent, I want evidence references and concise claim summaries in routine context, so that I can navigate evidence without consuming whole source files.
73. As an AI agent, I want precise source revision and location metadata, so that evidence references remain resolvable and auditable.
74. As an AI agent, I want confidence accompanied by its basis, so that a confidence label is not mistaken for proof.
75. As an AI agent, I want the smallest claim-bearing excerpt loaded automatically when a consequential claim controls an answer or action, so that token savings do not weaken accuracy.
76. As an AI agent, I want evidence loaded automatically when sources conflict, are stale, are AI-derived, or have low confidence, so that summaries do not conceal important uncertainty.
77. As an AI agent, I want exact evidence loaded for numeric, negated, exception-heavy, contractual, API, schema, security, safety, or compliance claims, so that precision-sensitive decisions remain grounded.
78. As an AI agent, I want full evidence loaded only when whole-source semantics, exhaustive search, or unresolved cross-section context requires it, so that bulk context remains exceptional.
79. As a security-conscious user, I want sensitivity and authorization metadata preserved in context and evidence references, so that drill-down cannot bypass access boundaries.
80. As a user, I want stale evidence clearly marked and revalidated before consequential use, so that old observations do not silently masquerade as Current State.
81. As a toolchain maintainer, I want cached evidence keyed by immutable source revision and locator, so that updates invalidate dependent summaries and links correctly.
82. As a toolchain maintainer, I want a shared Artifact Envelope schema, so that common metadata is consistent across all artifact types.
83. As a toolchain maintainer, I want one independent schema per Artifact-Specific Contract, so that changing one expert artifact does not destabilize unrelated artifacts.
84. As a toolchain maintainer, I want a shared definitions library, so that evidence, states, identifiers, traces, and findings are defined once.
85. As a toolchain maintainer, I want an Artifact Contract Registry, so that validation, expert routing, and visualization selection are explicit and extensible.
86. As a toolchain maintainer, I want semantic validation beyond JSON Schema, so that cross-reference, trace, inverse-label, state-transition, evidence, and artifact-specific invariants are checked.
87. As a toolchain maintainer, I want generated views to remain derivatives rather than sources of truth, so that visual behavior does not contaminate model semantics.
88. As a toolchain maintainer, I want one high-level typed-source toolchain seam, so that end-to-end behavior is testable with minimal coupling to implementation details.
89. As an expert-skill author, I want each Artifact Expert Skill aligned with a canonical source model rather than a rendered view, so that reasoning is not duplicated across diagrams.
90. As an orchestrator, I want to use Luna-class subagents for bounded evidence and authoring work, so that routine modeling remains efficient.
91. As an orchestrator, I want to escalate to Terra-class subagents only for genuine ambiguity, conflict, or consequential design judgment, so that expensive reasoning is used deliberately.
92. As an orchestrator, I want each expert to own its assigned artifact, so that concurrent subagents do not rewrite the same source.
93. As an orchestrator, I want experts to propose cross-artifact trace links while a single integrator reconciles them, so that global consistency has one owner.
94. As an orchestrator, I want sibling experts to run concurrently when upstream identifiers are stable and ownership is independent, so that safe parallelism reduces elapsed time.
95. As an orchestrator, I want downstream experts to wait for required upstream contracts, so that speculative work does not create rework or token waste.
96. As an orchestrator, I want upstream problems returned to the integrator rather than silently repaired by downstream experts, so that ownership remains clear.
97. As a maintainer, I want the existing Current-State Default preserved, so that mapping does not invent future designs unless explicitly requested.
98. As a maintainer, I want the existing evidence-confidence distinctions preserved and strengthened, so that verified, inferred, and unknown claims remain honest.
99. As a maintainer, I want the existing progressive visual disclosure behavior preserved, so that users can deepen crowded or risky areas without an all-in-one diagram.
100. As a maintainer, I want the existing local interactive renderer strategy preserved while visualization modules evolve, so that renderer work builds on proven constraints rather than restarting from scratch.

## Implementation Decisions

### Product and domain boundaries

- `System Understanding Artifact` is the umbrella for all typed, evidence-backed system-understanding products. `System Understanding Map` remains the graph-oriented subset.
- Map Altitude, Map Layer, and Map Depth remain independent concepts. Altitude describes systems-engineering viewpoint, Layer describes repeated information categories within graph-oriented maps, and Depth describes progressive scope refinement.
- The Altitude Pipeline is ordered from ecosystem and operational purpose toward requirements, logical realization, architecture, and optional code depth.
- The Systems Engineering Integrity Loop is mandatory. Named artifact creation is conditional under the Conditional Artifact Policy.
- No implementation may treat “all altitudes completed” as equivalent to “all artifacts generated.” Completion means the mandatory integrity questions are answered with sufficient evidence and proportionate verification.

### Artifact states and authority

- The Artifact Envelope requires one Artifact State: Current State, Candidate Future State, or Accepted Future State.
- Unqualified Future State is not a valid persisted state.
- Current State is evidence-backed and does not require human acceptance. Claims may be verified, inferred, or unknown according to inspected evidence.
- A Candidate Future State may be authored and revised by an agent but remains a proposal.
- Only explicit human action may promote Candidate Future State to Accepted Future State.
- Accepted Future State records accepting authority, acceptance time, and a reference to supporting evidence or decision context.
- Credible conflicting Current State evidence triggers a human review gate. The model presents the conflict and its sources rather than selecting a winner silently.
- Human adjudication records the evidentiary or operational-authority basis. If no supported determination is available, the conflict remains unresolved.

### Shared Artifact Envelope

- Every artifact has a stable artifact identifier, artifact type, contract version, title, scope, Map Altitude, Artifact State, creation and update metadata, and source-model revision identity.
- Every artifact may declare parent, child, related, and superseding artifacts without embedding renderer paths as semantic state.
- Evidence, assumptions, unknowns, risks, findings, and trace links use shared definitions.
- Material claims distinguish direct evidence, derived evidence, inference, assumption, and unknown status.
- Artifacts carry freshness information and may be marked stale when a mutable source or relevant upstream artifact changes.
- Optional artifacts include a compact Artifact Value Gate rationale when the reason for their existence is not self-evident.
- Renderer-specific coordinates, layout state, library names, and presentation-only fields do not belong in the Artifact Envelope or artifact contracts.

### Modular contracts and registry

- The shared envelope and shared definitions are independently versioned from Artifact-Specific Contracts.
- Each artifact type has a dedicated schema and semantic validator.
- The Artifact Contract Registry resolves an artifact type to its schema, semantic validator, Artifact Expert Skill, visualization module, allowed relationship extensions, and supported generated views.
- Registry lookup fails clearly for unknown artifact types rather than falling back to a generic graph renderer.
- Schema validation covers structural correctness. Semantic validation covers resolvable identifiers, trace targets, relationship direction, inverse labels, evidence requirements, state rules, uniqueness, artifact-specific invariants, and cross-artifact consistency.
- Contract evolution defines compatibility expectations. A contract migration must not silently reinterpret existing artifact meaning.

### Altitude 0 contracts

- The Ecosystem Source Model is the canonical source for people, organizations, software systems, relationships, boundaries, and strategic context in an operating ecosystem.
- Altitude 0A publishes a Mission and Market Context View from the Ecosystem Source Model.
- Mission is represented as purpose and direction elaborated by problem, threat or opportunity, goals, objectives, constraints, and measures of success. It is not rendered as another software-system box.
- Organizations are explicit ecosystem entities or boundaries.
- Market context is represented through a specialized strategic visualization rather than forced into C4 notation.
- Altitude 0B publishes a C4 System Landscape View whose primary elements remain people and software systems within the selected organizational or operating scope.
- The Mission and Market Context View and C4 System Landscape View share source identities and trace links without sharing one visual notation.

### Altitude 1 contracts

- A C4 System Context View is generated for a selected system from the Ecosystem Source Model.
- The Operational Concept Model is a separate canonical model for operators, modes, scenarios, operating environments, assumptions, constraints, normal behavior, off-nominal behavior, support, and life-cycle concerns.
- The Concept of Operations is a generated view of the Operational Concept Model.
- Operational scenarios reference people, organizations, and systems from the Ecosystem Source Model through stable trace links rather than duplicating them.
- At least one representative operational scenario is required by the integrity loop even when a full formal ConOps is not generated.
- Consequential abnormal scenarios are required when failure, operator error, degraded operation, safety, security, or recovery materially affects the system.

### Altitude 2 contracts

- The Requirements Model is the canonical source for stakeholder/user requirements, system requirements, software requirements, constraints, verification intent, and traceability.
- The Requirements Specification and Requirements Traceability Matrix are generated views of the Requirements Model.
- Trace rows are never separately hand-maintained as a second source of truth.
- Requirements distinguish their kind, source, priority or criticality when relevant, rationale, acceptance or verification method, state, and evidence.
- Requirements trace upstream to stakeholder needs, mission or market drivers, regulations, constraints, or operational scenarios as applicable.
- Requirements trace downstream to logical behaviors, use cases, architecture elements, verification evidence, and implementation evidence as applicable.
- Requirement quality checks include stable identity, necessity, clarity, singularity where appropriate, feasibility, verifiability, non-conflict, appropriate abstraction, and trace coverage.

### Altitude 3 contracts

- Logical Decomposition Model and Use Case Model are separate but coupled contracts.
- Logical decomposition represents what the system must do, how large responsibilities decompose, functional inputs and outputs, sequencing, interfaces, constraints, and identified logical gaps or conflicts.
- Use cases represent actor goals and interactions with the system boundary.
- Each use case traces to the stakeholder needs and requirements it serves and the logical behaviors that realize it.
- A use-case diagram may be generated per use case when it improves comprehension.
- Altitude 3 performs the Reality Check. Every run includes inexpensive structural checks; deeper scenario analysis, simulation, prototype, benchmark, or physical testing is conditional.
- Structural Reality Checks include contradictions, missing inputs, impossible ordering, uncovered requirements, unresolved interfaces, inconsistent state transitions, and unsupported assumptions.
- Risk-triggered checks may include timing, throughput, capacity, resource consumption, concurrency, human behavior, failure recovery, environmental constraints, or other domain physics.
- Reality Check depth is justified by uncertainty, consequence, irreversibility, and decision value.
- Verification stops when evidence is sufficient for the decision; exhaustive analysis is not a quality goal.

### Altitude 4 contracts

- The Domain Model is independent of software deployment and code structure.
- Domain concepts define meaning, relationships, ownership, invariants, rules, states, and life cycles.
- The Software Architecture Model defines software systems, deployable or runnable containers, internal components, responsibilities, interfaces, dependencies, and allocated domain responsibilities.
- Domain Model elements and rules trace to the containers and components that own or implement them.
- The Domain Model View is generated from the Domain Model.
- C4 Container and C4 Component views are generated from the Software Architecture Model.
- Quality checks identify conflicting ownership, unimplemented critical rules, components without clear responsibility, inappropriate coupling, missing interfaces, and architecture elements without upstream justification.

### Altitude 5 contract

- The Code Structure Model is scoped to one selected component.
- Altitude 5 is not a mandatory full-system artifact.
- A Code Structure Model is generated only when usability, importance, complexity, risk, poor understanding, or a Reality Check justifies code-level depth.
- A C4 Code View includes only the code elements needed to explain the relevant design, behavior, uncertainty, or risk.
- Current repository evidence is preferred over long-lived manually maintained code diagrams.
- An omitted Altitude 5 artifact needs only a brief rationale when omission is consequential; routine omission does not create verbose paperwork.

### Traceability and relationship semantics

- Every traceable artifact element has a stable element identifier scoped so that cross-artifact references are unambiguous.
- Artifact-Owned Trace Links are stored by the source artifact making the relationship assertion.
- Each trace link identifies source element, target artifact and element, Relationship Type, Dependency Direction derivation, inverse label, evidence, confidence basis, status, and freshness.
- The Trace Index is fully rebuildable from artifact-owned links and never accepts manual edits as canonical trace state.
- The Trace Index supports immediate-neighborhood queries, focused matrices, coverage checks, impact analysis, drill-down resolution, and Artifact Context Packet creation.
- Immediate relationships are presented under Depends On and Depended On By navigation groupings.
- Dependency Direction is derived from the selected endpoint and link orientation. It does not replace semantic Relationship Type.
- Every Relationship Type has a definition, inverse label, valid source and target kinds, and intended use.
- The shared controlled vocabulary begins with broadly reusable semantics such as containment, use, flow, derivation, satisfaction, implementation, verification, constraint, protection, risk, and direct dependency.
- Artifact-specific contracts may register controlled extensions. Free-form relationship types are invalid.
- Relationship labels must remain understandable as plain language from either endpoint.
- Automatic end-to-end path selection, AI-ranked relevance, and Why/How/Impact/Verify trace modes are deferred. The first interaction exposes only immediate relationships.

### Interactive Artifact View shell

- The shared shell owns consistent navigation, selection, breadcrumbs, detail inspection, immediate relationships, drill-down, search, evidence presentation, confidence presentation, freshness, findings, risks, unknowns, and Codex-native annotation compatibility.
- Artifact Visualization Modules own the body visualization suited to their artifact contracts.
- Selection is distinct from navigation. Selecting an element does not change artifact, altitude, or depth.
- A selected element exposes details, evidence, confidence basis, local risks, local unknowns, local findings, immediate relationships, and available drill-down targets.
- Drill Down is explicit and preserves the navigation path.
- Drill Down is available both contextually near the selected object when the module supports it and within the detail panel.
- Double-click may accelerate Drill Down but cannot be the only affordance.
- Relationship selection provides a Relationship Explanation including semantic meaning, source and target, direction, evidence, confidence, and status.
- The shell exposes stable, meaningful DOM or visual targets so Codex-native annotations can supply focused model context.
- The shell does not implement a separate annotation store, review lifecycle, or comment database.
- Visual design prioritizes comprehension, functional clarity, accessible details, readable relationships, and restrained complexity over novelty or maximum density.

### Findings and quality presentation

- Artifact Quality Gate results use pass, warning, or fail.
- Fail means the artifact violates its contract or cannot support its stated purpose.
- Warning preserves consequential uncertainty or limitation without claiming the artifact is unusable.
- Pass means the evaluated contract expectations are satisfied at the stated evidence confidence; it does not prove all claims true beyond their evidence.
- Findings are surfaced only when they are decision-useful.
- Every surfaced finding states consequence, location, supporting evidence, and next useful action.
- Finding Scope is Artifact-Wide, Current-View, or Selected-Element.
- Artifact-wide findings use a restrained summary indicator and dedicated review surface.
- Current-view findings are local to the visible artifact and drill-down path.
- Selected-element findings appear with the selected element's details.
- Findings elsewhere remain out of the immediate workspace until the user navigates there or deliberately opens artifact-wide review.
- No fixed top-three or other arbitrary count hides consequential findings.
- Related findings are grouped and deduplicated; lower-impact diagnostics may be collapsed.
- The user-facing quality summary states what the artifact establishes, what can be trusted and why, consequential limitations, and the single best next action.

### Artifact Context Packet and evidence retrieval

- An Artifact Context Packet is generated for a selected element from canonical artifact data and the Trace Index, not from renderer state.
- The default packet contains the selected element, stable identifiers, type, exact name, concise meaning or claim, artifact identity, artifact type, altitude, Artifact State, artifact revision, and timestamps.
- The packet contains the complete one-hop relationship neighborhood within an explicit budget.
- Every relationship includes direction, semantic type, inverse label, target identity and state, relation evidence, confidence, and confidence basis.
- The packet includes locally relevant findings, risks, unknowns, unresolved-conflict markers, drill-down handles, and evidence-fetch handles.
- The packet states neighbors shown, neighbors available, filters, truncation, and context budget so absence is never interpreted as proof that no relationship exists.
- Evidence references include source identity and type, immutable revision or digest, precise locator, direct-versus-derived status, retrieval or observation time, effective time when relevant, freshness status, availability, authorization, and sensitivity.
- Claim summaries are navigation aids rather than proof.
- Before a consequential answer or action, an evidence-needs-verification decision determines whether referenced evidence must be loaded.
- The smallest claim-bearing excerpt is automatically loaded for materially controlling claims; low or unknown confidence; conflicts; stale or changed dependencies; AI-derived summaries; exact numeric or exception-heavy claims; and contractual, API, schema, security, safety, compliance, or irreversible decisions.
- Adjacent context is loaded when definitions, headings, tables, footnotes, exceptions, or cross-references affect interpretation.
- Full evidence is loaded only for whole-source invariants, exhaustive assertions, cross-section reconciliation, unresolved conflict, or failed excerpt expansion.
- Inaccessible, stale, truncated, or conflicting evidence produces an explicit unknown or blocked consequential action rather than unsupported certainty.
- Caches are keyed by source identity, immutable revision or digest, locator, extraction version, summarizer version, and authorization context.
- Mutable sources are revalidated before consequential use. Changes invalidate dependent summaries, trace links, and context packets.
- Stale evidence is never silently represented as current. Offline stale use is visibly downgraded.

### Artifact experts and orchestration

- Artifact Expert Skills align with canonical source models, not rendered views.
- Initial expert boundaries are Ecosystem Source Model, Operational Concept Model, Requirements Model, Logical Decomposition Model, Use Case Model, Domain Model, Software Architecture Model, and Code Structure Model.
- Experts author or update their owned artifact, validate it against its contract, and propose artifact-owned trace links.
- The orchestrator applies the Systems Engineering Integrity Loop, selects conditional artifacts, supplies stable upstream context, invokes experts, manages review gates, and publishes integrated results.
- One integrator owns cross-artifact consistency, trace reconciliation, registry-level validation, and final publication.
- Expert subagents do not rewrite upstream or sibling artifacts. They report contradictions or requested changes to the integrator.
- Luna-class models are the default for evidence inspection, bounded authoring, routine validation, schema correction, rendering, and compact synthesis.
- Terra-class models are used when evidence conflicts, boundaries are genuinely ambiguous, Candidate Future State requires material design judgment, logical contradictions require resolution, or a well-scoped Luna attempt remains insufficient.
- Larger models are exceptional and reserved for high-consequence interpretation that cannot be separated into a specialist review.
- Sibling experts may run concurrently only when their upstream inputs and identifiers are stable and their ownership is independent.
- Dependent work waits for the minimum upstream contract it needs. The system does not generate speculative downstream artifacts merely to keep agents busy.
- Integration revalidates affected trace neighborhoods and downstream assumptions rather than blindly reprocessing the entire artifact set.

### Compatibility and migration

- Existing typed System Understanding Map sources remain valid until an explicit migration path is implemented.
- The current graph map becomes one registered artifact type rather than the universal representation.
- Existing Current-State Default, evidence confidence, controlled map vocabulary, generated Interactive Map View, relationship explanations, progressive visual disclosure, and generated-artifact rules are preserved.
- Existing renderer implementation may become the first graph visualization module, but renderer-specific behavior remains outside canonical artifact contracts.
- Generated views remain disposable or curated derivatives according to repository policy; canonical source models remain the editable truth.
- Mermaid remains optional compatibility output and must not constrain the artifact contracts.
- Migration should favor adapters or explicit versioned conversion over silently accepting legacy fields with changed meanings.

## Testing Decisions

### Primary testing seam

- The primary seam is the highest stable toolchain boundary: provide typed artifact sources and registry configuration, then observe validation results, generated Trace Index and Artifact Context Packets, and rendered Interactive Artifact View output.
- Tests should assert externally visible contract behavior rather than internal function decomposition, schema-library calls, graph-library internals, or HTML implementation details that do not affect users.
- The ideal integration test exercises registry lookup, structural and semantic validation, trace-index generation, context-packet projection, and visualization-module selection through one public toolchain entry point.
- Lower-level unit seams are justified only for decision-dense semantics that would be difficult to diagnose solely through the high-level seam, such as state transition authority, relationship inversion, evidence escalation, freshness invalidation, and trace completeness accounting.

### Prior art to preserve

- Existing tests already validate accepted and rejected typed sources through public validation behavior.
- Existing renderer tests assert self-contained generated interactive output, selection details, relationship explanations, evidence presentation, risks, unknowns, and generated drill-down links.
- Existing documentation tests verify current-state defaults, Luna-first routing, preflight, validation, generated HTML, optional Mermaid output, and compact handoff fields.
- New tests should extend these patterns rather than replace them with direct tests of private helpers.

### Contract and registry tests

- A valid fixture exists for every registered artifact type.
- Each valid fixture passes shared-envelope, artifact-specific, and semantic validation.
- Unknown artifact types fail with an actionable registry diagnostic.
- Missing required envelope fields fail without falling back to defaults that obscure state or evidence.
- Artifact-specific fields rejected by the wrong contract do not become silently ignored optional data.
- Shared-definition version mismatches and unsupported contract versions produce actionable diagnostics.
- Registry entries with missing schemas, validators, expert declarations, visualization modules, or relationship vocabularies fail preflight.
- Renderer-specific fields in canonical sources are rejected or ignored according to an explicit compatibility rule, never treated as semantic state.

### Artifact State tests

- Current State artifacts can be created from evidence without a human acceptance record.
- Candidate Future State artifacts cannot claim accepted status implicitly.
- Promotion to Accepted Future State fails without explicit human authority, time, and supporting decision reference.
- A model-authored acceptance assertion is rejected when no human acceptance event exists.
- Current-state conflicts trigger a review-gate result and preserve each credible claim and its evidence.
- Human adjudication records its basis, and unsupported adjudication may leave the conflict unresolved rather than marking a claim verified.
- Mixed-state content that lacks explicit separation fails semantic validation.

### Altitude contract tests

- Ecosystem fixtures validate Mission and Market concepts independently from C4 Landscape elements.
- C4 Landscape output contains only elements valid for the chosen C4 scope while retaining trace links to mission and organizational context.
- C4 System Context output focuses on exactly one system and resolves its people and external-system references.
- Operational Concept fixtures cover normal operation and conditionally required off-nominal scenarios.
- Requirements fixtures generate specification and matrix views from identical canonical requirements and trace links.
- Logical decomposition and use-case fixtures validate mutual trace coverage without merging their semantics.
- Reality Check fixtures demonstrate cheap structural checks and risk-triggered deeper checks.
- Domain and Software Architecture fixtures expose missing ownership, conflicting ownership, and unimplemented rules.
- Altitude 5 fixtures prove that code views are scoped to one component and omitted without error when no value trigger exists.

### Traceability tests

- All trace targets resolve to stable artifact and element identifiers.
- Trace Index output is deterministic and rebuildable from artifact-owned links.
- The generated index does not become required input for canonical artifact validation.
- Depends On and Depended On By groupings are correct from both endpoints.
- Relationship Types display the expected forward and inverse labels.
- Invalid source-target type combinations fail semantic validation.
- Free-form relationship types fail unless registered as controlled extensions.
- Cross-artifact immediate relationships appear in the selected element's neighborhood.
- Focused traceability views use the same links as the Trace Index rather than duplicate trace rows.
- Updating or removing a source link changes the rebuilt index and affected coverage results.

### Context-packet tests

- Packets include all mandatory identity, state, revision, relationship, evidence, finding, completeness, and access metadata.
- Default packets contain one hop and do not recursively include neighbors of neighbors.
- High-fanout packets disclose totals, filters, truncation, and continuation handles.
- An omitted neighbor due to budget is never represented as nonexistent.
- Packet generation is independent of the current renderer layout and visual selection implementation.
- Consequential claims trigger minimum-excerpt retrieval.
- Low-confidence, conflicting, stale, AI-derived, exact numeric, contractual, API, schema, security, safety, and compliance cases trigger retrieval according to policy.
- Benign, well-supported navigation tasks do not load full evidence unnecessarily.
- Excerpt expansion retrieves adjacent context when qualifiers or references require it.
- Full-source loading occurs only for the defined exceptions.
- Unavailable evidence yields explicit uncertainty and blocks or downgrades consequential action.
- Packet freshness changes when source revisions or dependent artifact revisions change.
- Authorization-sensitive references cannot be fetched outside their allowed context.

### Interactive shell tests

- Single-click selection opens details without navigation.
- Drill Down changes artifact or depth only through an explicit action and preserves breadcrumbs.
- The action is available in the detail panel and contextually in modules that support it.
- Keyboard and pointer interactions provide equivalent access to selection and drill-down.
- Detail panels distinguish element details, relationships, evidence, findings, risks, unknowns, and drill-down targets.
- Immediate relationships are grouped correctly and remain readable at representative fanout sizes.
- Relationship selection produces an understandable Relationship Explanation.
- Artifact-wide, Current-View, and Selected-Element findings appear only in their intended scopes.
- Consequential findings remain discoverable without flooding unrelated views.
- Artifact Visualization Modules can render graph, strategic context, document/scenario, matrix, functional/use-case, domain, architecture, and code-oriented fixtures within the shared shell.
- Generated output contains stable annotation targets compatible with Codex-native page annotations.
- The shell does not require or persist a custom annotation database.
- Accessibility checks cover focus order, keyboard navigation, readable labels, contrast, zoom, reduced motion where applicable, and non-pointer drill-down.

### Orchestration tests

- The orchestrator completes the Systems Engineering Integrity Loop without generating every altitude artifact.
- Conditional artifacts are generated only when a recorded value trigger applies.
- Routine work continues without a review pause.
- Consequential ambiguity, failed validation, scope change, current-state conflict, and irreversible commitment produce a Pipeline Review Gate.
- Well-specified bounded work routes to Luna-class experts.
- Genuine ambiguity or conflicting evidence routes to Terra-class experts according to policy.
- Expert agents cannot overwrite artifacts outside assigned ownership through the integration contract.
- Sibling experts run concurrently only when upstream identifiers are stable and ownership is disjoint.
- Downstream work waits for required upstream inputs.
- The single integrator detects conflicting trace proposals and resolves or escalates them before publication.
- Local changes revalidate affected neighborhoods; tests verify that unrelated artifacts are not needlessly reprocessed.

### Evaluation and acceptance tests

- Compare the one-hop reference-first context policy against zero-hop and recursive/full-context baselines.
- Measure supported-claim accuracy, missed prerequisite relationships, missed impact relationships, contradiction rate, stale-evidence use, unnecessary fetch rate, token usage, latency, and calibrated abstention.
- Include small reversible software tasks, high-fanout elements, multi-hop dependency questions, conflicting evidence, stale evidence, and high-consequence decisions.
- Compare compact expert prompts against verbose all-altitude prompts for omission rate, unnecessary artifact production, user comprehension, and token use.
- A successful implementation must show that compact context and conditional artifacts reduce token usage without increasing unsupported consequential conclusions.
- Passing automated tests is evidence of implementation behavior, not proof that artifact contracts capture every domain. Representative human review remains required before broad adoption.

## Out of Scope

- Replacing Codex's native annotation system with a Looper-specific annotation database, comment lifecycle, or collaboration service.
- A human-authored visual canvas or free-form diagram editor. Agents continue to edit canonical typed sources.
- Automatic AI ranking of a single “most relevant” end-to-end trace path.
- Why, How, Impact, or Verify trace-intent modes beyond immediate relationship inspection.
- Recursive graph loading as the default agent context strategy.
- Mandatory generation of every altitude artifact for every engagement.
- Exhaustive codebase class, function, file, or database-table inventories.
- Long-lived Altitude 5 diagrams for routine components when current tools can generate adequate detail on demand.
- Full SysML compliance, formal MBSE repository interchange, or dependence on proprietary MBSE tooling.
- Recreating C4 semantics for mission and market concepts that C4 does not model.
- Treating the Trace Index, generated matrices, rendered HTML, or Mermaid output as canonical model state.
- A universal visualization that forces every artifact into a graph.
- A giant universal schema with optional fields for all artifact types.
- Numeric risk thresholds before representative evaluations establish useful calibration.
- Automatically treating a user statement as verified Current State without recording its evidence role and authority.
- Automatically accepting Candidate Future State through model inference.
- Broad security, safety, legal, or regulatory certification; the pipeline can represent and escalate those concerns but does not replace domain certification.
- Immediate migration or deletion of all legacy System Understanding Map sources before compatibility and conversion behavior is proven.
- Implementation issue decomposition; that follows approval of this specification.

## Further Notes

### Prompting posture

Artifact Expert Skills and the orchestrator should lead with the desired result, supply only context that changes the work, state the one or two boundaries that prevent real failure, and distinguish required work from optional polish. The system should be stern about the Systems Engineering Integrity Loop and evidence rules while remaining compact about process. Prompts should not enumerate every possible altitude artifact unless the current task requires them.

The concise orchestration policy is:

> Lead the user through the systems-engineering integrity loop without manufacturing ceremony. Establish scope and success, inspect evidence, model operational intent, requirements, logical realization, and traceability, then run the cheapest Reality Check adequate to the consequence. Produce or deepen an altitude artifact only when it resolves a current uncertainty, supports a decision, manages meaningful risk, or materially improves understanding. Stop for review at consequential ambiguity, failed validation, changed scope, current-state evidence conflict, or expensive-to-reverse commitment; otherwise continue. Distinguish facts, inferences, assumptions, and unknowns. Keep prompts, findings, and agent context compact and local to the artifact being inspected.

### Source and research basis

- The existing repository establishes typed sources as canonical and generated interactive views as derivatives.
- Existing tests demonstrate a useful high-level validation and rendering seam that should be generalized rather than discarded.
- C4 guidance supports System Landscape above focused System Context and treats Code diagrams as optional, on-demand depth for important or complex components.
- Systems-engineering guidance supports iterative consistency among stakeholder needs, requirements, logical decomposition, architecture, ConOps, and verification while tailoring depth to consequence and risk.
- Provenance and retrieval research supports reference-first context with explicit freshness and selective evidence retrieval rather than indiscriminate long context.

### Implementation sequence guidance

- Begin by introducing the shared envelope, shared definitions, registry, and a compatibility registration for the existing graph map.
- Add artifact-owned trace links and deterministic Trace Index generation before creating many new visualizations.
- Add Artifact Context Packet generation and evidence escalation at the same high-level toolchain seam.
- Refactor the current interactive graph renderer into the first Artifact Visualization Module inside the shared shell.
- Implement immediate relationship selection, semantic labels, inverse labels, and drill-down before advanced trace experiences.
- Add artifact contracts and expert skills in dependency order, starting with the models needed for the first representative vertical slice.
- Use at least two contrasting vertical slices during development: a compact reversible software task and a high-consequence or conflict-heavy system decision.
- Decompose implementation into commit-sized issues only after the specification is accepted.

### Readiness

This specification is marked `ready-for-agent` because the product boundaries, domain language, artifact contracts, orchestration principles, interaction model, evidence rules, traceability model, and testing seam are sufficiently defined for implementation decomposition. Open numeric thresholds and final visual styling are intentionally left to measured evaluation and later design work rather than treated as blockers.
