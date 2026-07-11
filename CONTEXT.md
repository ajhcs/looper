# Looper

Looper is a personal Codex workflow system for understanding software/product systems, decomposing work, orchestrating agent loops, and researching engineering decisions.

## Language

**System Understanding Map**:
A graph-oriented System Understanding Artifact that explains how a project, product, or business's surfaces, workflows, data, metrics, code, infrastructure, risks, and decisions fit together. It is used to understand the current system first so planning can start from reality.
_Avoid_: Codebase map, architecture diagram

**System Understanding Artifact**:
A living, evidence-backed artifact that explains a system from a specific Map Altitude, including diagrammatic maps, structured requirements, traceability matrices, operational concepts, decomposition views, and architecture views.
_Avoid_: Diagram, documentation page

**Artifact Envelope**:
The shared structure every System Understanding Artifact uses for identity, artifact type, altitude, scope, state, evidence, confidence, unknowns, risks, assumptions, trace links, provenance, freshness, and applicable value-gate rationale.
_Avoid_: Universal artifact schema, generic map model, artifact-specific content

**Artifact-Specific Contract**:
The strict structure and validation rules for the concepts unique to one kind of System Understanding Artifact, composed with the Artifact Envelope rather than generalized across unrelated artifact types.
_Avoid_: Universal schema, optional field collection, generic graph contract

**Artifact Contract Registry**:
The canonical index that maps each artifact type to its Artifact-Specific Contract and Artifact Visualization Module while allowing shared envelope, evidence, trace, state, finding, and identifier definitions to be reused.
_Avoid_: Universal artifact schema, renderer switch statement, artifact source of truth

**Artifact Expert Skill**:
A model-usable skill that creates, validates, or updates one canonical source-model type and its trace links under the corresponding Artifact-Specific Contract, leaving rendered views as generated outputs.
_Avoid_: Diagram creator, universal mapper, renderer skill

**Artifact Expert Routing**:
The policy that bounded evidence collection and well-specified artifact authoring default to Luna-class models, while genuine ambiguity, conflicting evidence, or consequential design judgment escalates to Terra-class models.
_Avoid_: Largest-model default, fixed model per altitude, routine escalation chain

**Single Integrator Rule**:
The rule that Artifact Expert Skills own and validate their assigned artifacts and propose trace links, while one orchestrator alone reconciles cross-artifact consistency, integrates shared traces, and publishes the resulting artifact set.
_Avoid_: Multi-writer shared artifact, independent trace merge, expert-owned global integration

**Dependency-Aware Parallelism**:
The rule that sibling Artifact Expert Skills may run concurrently only when their upstream inputs and identifiers are stable and their ownership does not overlap; dependent work waits, and upstream issues return to the integrator.
_Avoid_: Fully sequential pipeline, speculative downstream work, overlapping artifact writers

**Current-State Map**:
A System Understanding Map that describes how the system works now, including known gaps, risks, unclear areas, and evidence quality.
_Avoid_: As-is diagram

**Future-State Map**:
A System Understanding Map that describes either an Accepted Future State or a Candidate Future State after proposed changes and always identifies which state applies.
_Avoid_: Unqualified future state, roadmap, vision board

**Artifact State**:
The declared temporal and decision status of a System Understanding Artifact: Current State, Accepted Future State, or Candidate Future State.
_Avoid_: Current/future flag, mixed-state artifact, unspecified future state

**Accepted Future State**:
An intended system state that an authorized human has explicitly approved as the direction to pursue, even if it has not yet been implemented.
_Avoid_: Future State, proposal, current state

**Candidate Future State**:
A proposed system state still being explored, compared, validated, or considered and not yet accepted as the direction to pursue.
_Avoid_: Future State, approved design, commitment

**Human Acceptance Rule**:
The rule that only an explicit human decision may promote a Candidate Future State to an Accepted Future State, with the accepting authority, time, and supporting decision or evidence recorded.
_Avoid_: Model-approved future state, inferred acceptance, automatic promotion

**Current-State Evidence Rule**:
The rule that Current State is established through observable, inspectable, and proportionately provable evidence rather than human acceptance, with confidence and unresolved contradictions represented honestly.
_Avoid_: Human-approved current state, assumed reality, acceptance as verification

**Current-State Conflict Gate**:
The required human adjudication when credible current-state evidence conflicts; the resolution records its evidentiary or operational-authority basis, or preserves the conflict as unresolved when no supported determination can be made.
_Avoid_: Model-selected truth, silent conflict resolution, unsupported certainty

**Current-State Default**:
The rule that System Mapper creates Current-State Maps unless the user explicitly asks for a Future-State Map or prospective design exercise.
_Avoid_: Mixed current/future map

**Domain**:
A coherent area of the system being mapped, defined by a stable purpose rather than by repository folders or implementation boundaries. A Domain may include product behavior, data, metrics, infrastructure, code, business logic, workflows, and risks.
_Avoid_: Module, service, feature area

**Map Layer**:
A repeatable kind of information in a System Understanding Map. Core layers are Product, Knowledge, Data, System, and Code; Business and Work may be included when the user needs them.
_Avoid_: Level, section

**Map Altitude**:
The ordered systems-engineering viewpoint a System Understanding Map or specialized artifact occupies, from ecosystem-level architecture through operational context, requirements and traceability, logical and use-case decomposition, domain/container/component architecture, and code structure. It answers how high or low the artifact is in the system understanding stack, independent of Map Layer and Map Depth.
_Avoid_: Level, diagram level

**Altitude Pipeline**:
The default authoring and validation order for Map Altitudes, where higher-altitude artifacts constrain and validate lower-altitude artifacts while each altitude remains individually invokable when a user asks for a specific artifact.
_Avoid_: Diagram checklist, artifact menu

**Systems Engineering Integrity Loop**:
The mandatory compact reasoning loop that establishes purpose, scope, stakeholders, success, evidence, operational intent, requirements, logical realization, traceability, a proportionate Reality Check, consequential uncertainty, and the next action without requiring every named artifact.
_Avoid_: Mandatory artifact checklist, full altitude run, systems-engineering ceremony

**Conditional Artifact Policy**:
The rule that an altitude artifact is produced or deepened only when it resolves uncertainty, supports a decision, manages meaningful risk, or materially improves understanding; satisfying the Systems Engineering Integrity Loop does not require publishing every artifact.
_Avoid_: Always-generate pipeline, artifact completeness mandate, fully ad hoc modeling

**Pipeline Review Gate**:
A required user review before the Altitude Pipeline continues when it encounters consequential ambiguity, failed validation, changed scope, or an expensive-to-reverse commitment; otherwise the pipeline may continue without ceremonial pauses.
_Avoid_: Review after every altitude, silent consequential assumption, automatic irreversible decision

**Altitude Artifact Contract**:
A first-class contract for one Map Altitude that defines the required concepts, evidence, traceability, quality checks, and renderer expectations for that artifact without assuming a specific codebase shape.
_Avoid_: Generic map section, codebase template

**Ecosystem Source Model**:
The canonical evidence-backed model of the people, organizations, software systems, relationships, boundaries, and strategic context in an operating ecosystem from which ecosystem- and system-focused views are published.
_Avoid_: Ecosystem Inventory, system list, landscape diagram source

**Mission and Market Context View**:
The Altitude 0A view of why an operating ecosystem exists, including its problems or opportunities, market forces, organizations, missions, objectives, constraints, and measures of success.
_Avoid_: C4 diagram, business overview, mission box

**C4 System Landscape View**:
The Altitude 0B view of the people and software systems within an operating environment and the relationships among them, published from the Ecosystem Source Model using C4 notation.
_Avoid_: Mission view, focused system context

**Operational Concept Model**:
The canonical Altitude 1 model of how a system is intended to operate, including its operators, modes, scenarios, environments, constraints, normal and off-nominal behavior, support, and life-cycle concerns.
_Avoid_: Architecture diagram, feature list, use-case collection

**C4 System Context View**:
The Altitude 1 view of one selected software system, its users, external software systems, and their relationships, published from the Ecosystem Source Model using C4 notation.
_Avoid_: System landscape, container diagram, ConOps

**Concept of Operations**:
The Altitude 1 view published from the Operational Concept Model that explains how a system will be used and supported in its intended operating environment.
_Avoid_: C4 System Context View, requirements specification, implementation plan

**Domain Model**:
The canonical Altitude 4 model of the real-world concepts, relationships, rules, ownership, and life cycles the software must represent, independent of how the software is deployed or divided into components.
_Avoid_: Database schema, class diagram, C4 Component View

**Software Architecture Model**:
The canonical Altitude 4 model of a software system's deployable containers, internal components, responsibilities, interfaces, and dependencies, linked to the Domain Model concepts and rules they own or implement.
_Avoid_: Domain Model, repository tree, infrastructure inventory

**Domain Model View**:
The Altitude 4 view published from the Domain Model that explains the system's domain concepts, relationships, rules, ownership, and life cycles.
_Avoid_: Database diagram, C4 diagram, glossary

**C4 Container View**:
The Altitude 4 view of a software system's deployable or runnable units and their responsibilities and relationships, published from the Software Architecture Model using C4 notation.
_Avoid_: Infrastructure diagram, component diagram, deployment manifest

**C4 Component View**:
The Altitude 4 view of the major components inside one selected container and their responsibilities and relationships, published from the Software Architecture Model using C4 notation.
_Avoid_: Class diagram, repository tree, C4 Container View

**Code Structure Model**:
An on-demand Altitude 5 model of the code elements inside one selected component, derived from current repository evidence when code-level understanding is valuable.
_Avoid_: Full-repository class catalog, permanent code inventory, source tree

**C4 Code View**:
An optional Altitude 5 view published from a Code Structure Model that shows only the code elements needed to explain an important behavior, design, uncertainty, or risk within one component.
_Avoid_: Full codebase diagram, generated API reference, repository browser

**Artifact Value Gate**:
The decision rule that optional artifact generation or deepening must be justified by expected usability, importance, risk reduction, uncertainty reduction, or decision value relative to its effort and token cost.
_Avoid_: Completeness mandate, always-generate rule

**Artifact Quality Gate**:
A compact pass, warning, or fail assessment of whether a System Understanding Artifact satisfies its contract and purpose across evidence, traceability, gaps, conflicts, unknowns, applicable Reality Checks, understandability, usability, and value-gate justification.
_Avoid_: QA dump, exhaustive issue list, schema result alone

**Decision-Useful Finding**:
A quality finding worth surfacing because it materially changes how the artifact should be understood or acted upon and states both its consequence and the next useful action.
_Avoid_: Observation, lint noise, speculative question

**Uncertainty Reduction Standard**:
The rule that a System Understanding Artifact must leave its user with a clearer mental model and a smaller, prioritized set of consequential unknowns rather than generating more unstructured questions than it resolves.
_Avoid_: Question generation, exhaustive ambiguity list, open-ended analysis

**Context-Sensitive Finding Priority**:
The rule that quality findings are ordered and disclosed by both their consequence and their spatial and navigational relevance to the artifact, view, drill-down path, and element the user is currently inspecting.
_Avoid_: Global severity list, top-three limit, validator-order display

**Finding Scope**:
The disclosure boundary for a Decision-Useful Finding: Artifact-Wide for the whole artifact, Current-View for the visible view or drill-down path, or Selected-Element for the object or relationship currently inspected.
_Avoid_: Flat findings list, validator category, arbitrary display limit

**Reality Check**:
An Altitude 3 validation of whether a Logical Decomposition Model remains plausible under real-world constraints such as time, capacity, resources, sequencing, failures, human behavior, and physical limits.
_Avoid_: Flight test, exhaustive simulation, plausibility review

**Proportional Verification**:
The rule that every Reality Check begins with inexpensive structural checks and deepens into scenario analysis, simulation, or prototyping only when risk, uncertainty, and decision value justify the additional effort and token cost.
_Avoid_: Exhaustive validation, maximum-detail analysis

**Map Source**:
The lightweight structured representation of a System Understanding Map that can generate diagrams, navigable views, markdown summaries, and AI context packets.
_Avoid_: Mermaid file, documentation folder

**Map Authoring Model**:
The rule that AI agents edit the Map Source while users review the resulting understanding through generated views and chat summaries.
_Avoid_: Human diagram editor, visual canvas editing

**Map Renderer**:
A tool or view that turns the Map Source into an explorable artifact, such as an Interactive Map View or a lightweight Mermaid preview. A Map Renderer is not the source of truth.
_Avoid_: Diagram source

**Interactive Map View**:
The primary user-facing Map Renderer for exploring a System Understanding Map through clickable nodes, drilldown navigation, and evidence-rich detail panels.
_Avoid_: Static diagram, SVG export

**Interactive Artifact View**:
The shared function-first shell for exploring System Understanding Artifacts through artifact-specific visualizations, consistent navigation, drill-down, detail inspection, trace-following, evidence, Codex-native annotation integration, search, freshness, risks, and unknowns.
_Avoid_: Universal graph renderer, static report viewer, collection of unrelated artifact apps

**Artifact Visualization Module**:
An artifact-specific renderer inside the Interactive Artifact View that uses the visual language best suited to its contract while preserving the shell's common interactions and navigation.
_Avoid_: Standalone artifact application, universal diagram template, decorative visualization

**Artifact Understandability Standard**:
The rule that an Interactive Artifact View prioritizes comprehension and task usefulness, requiring clear scope, readable relationships, progressive disclosure, accessible details, and restrained visual complexity.
_Avoid_: Visual novelty, information density target, diagram completeness

**Artifact Selection**:
The interaction where selecting an addressable artifact element or relationship reveals its details and available actions without changing the current scope or view.
_Avoid_: Drill-down, navigation click, annotation

**Artifact Drill-Down**:
The explicit interaction that moves from a selected artifact element to a more focused artifact, lower Map Altitude, or greater Map Depth while preserving navigational context.
_Avoid_: Detail expansion, selection, automatic navigation

**Codex-Native Annotation Integration**:
The rule that Interactive Artifact Views expose stable, understandable visual targets to the Codex app's existing annotation system rather than implementing a separate annotation workflow or store.
_Avoid_: Custom annotation database, embedded comment system, duplicate review workflow

**Map Detail Panel**:
The Interactive Map View panel opened by selecting a mapped thing, showing its meaning, evidence quality, relationships, risks, unknowns, and generated map navigation links when present. It displays source evidence as readable references rather than browser links into repository files.
_Avoid_: Raw YAML viewer, graph metadata popup

**Renderer Template**:
A maintained HTML/JS rendering scaffold that converts Map Source data into a consistent map experience, so agents provide structured map content instead of generating visual behavior from scratch.
_Avoid_: One-off graph code, model-drawn diagram

**Map Brief**:
The chat-native summary returned after System Mapper creates or updates maps, naming the mapped domains, openable artifacts, evidence gaps, recommended deepenings, and next action.
_Avoid_: Renderer dump, artifact list

**Deepening Recommendation**:
A Map Brief suggestion for where System Mapper should inspect or map in more detail next. It is not persisted in the Map Source unless the user asks to create that deeper map.
_Avoid_: Planned child map, stored todo

**Toolchain Dependency**:
A system or runtime tool required to validate, render, or inspect System Understanding Maps, such as D2 or a schema validator.
_Avoid_: Plugin dependency

**Setup Preflight**:
The agent-run check that verifies required Toolchain Dependencies are available before map validation or rendering begins, and installs or reports missing tools according to the current environment.
_Avoid_: Manual setup checklist

**Progressive Visual Disclosure**:
The navigation pattern where clicking a mapped thing opens a more specific map when more detail is useful, rather than forcing the user through long text pages or dense all-in-one diagrams.
_Avoid_: Drilldown docs, details panel

**Map Depth**:
How specific a map is within Progressive Visual Disclosure. Higher-depth maps explain smaller parts of the system while preserving relationships to Product, Knowledge, Data, System, and Code layers.
_Avoid_: Detail level

**Hybrid Map Persistence**:
The rule that stable high-level and domain-level maps are stored, while deeper maps may be generated or refreshed on demand and saved only when they become durable understanding artifacts.
_Avoid_: Partial documentation

**Node Type**:
A stable category for a mapped thing, such as Surface, Workflow, Concept, Metric, Data Source, Transformation, System Component, Interface, Code Area, Risk, or Unknown.
_Avoid_: Box type, diagram shape

**Map Notation**:
The visual and structural language used by System Understanding Maps, including symbols, node types, relationship types, specs, and evidence markers.
_Avoid_: Diagram style

**Lightweight Systems Notation**:
A Map Notation inspired by systems engineering coverage and traceability, but intentionally simpler than formal MBSE or SysML tooling.
_Avoid_: SysML, MBSE tool

**Relationship Type**:
A standardized semantic meaning for an Artifact-Owned Trace Link, such as contains, uses, flows_to, derives_from, satisfies, implements, verifies, constrains, protects, risks, or depends_on.
_Avoid_: Dependency direction, free-form arrow label, generic connection

**Dependency Direction**:
The universal navigation orientation of an immediate relationship: Depends On for relationships the selected element relies upon, or Depended On By for relationships whose source relies upon the selected element.
_Avoid_: Relationship Type, upstream/downstream meaning, semantic edge label

**Inverse Relationship Label**:
The readable opposite-direction label paired with a Relationship Type so the same trace link remains understandable from either endpoint, such as implements and implemented by or verifies and verified by.
_Avoid_: Reversed arrow, generated grammar, unlabeled inverse

**Controlled Map Vocabulary**:
The rule that Node Types and Relationship Types are validated against a strict vocabulary. New types may be added later, but only as deliberate changes to the notation rather than ad hoc labels in individual maps.
_Avoid_: Suggested types, freeform graph

**Controlled Relationship Vocabulary**:
The shared core and artifact-specific extension sets of allowed Relationship Types, where every type defines its meaning, inverse label, valid source and target kinds, and intended use before artifacts may reference it.
_Avoid_: Free-form relationship, improvised arrow label, renderer-only meaning

**Component Spec**:
A focused description attached to a mapped component that defines what it is, why it exists, its interfaces, dependencies, invariants, evidence, and known risks.
_Avoid_: README, implementation notes

**Traceability**:
The ability to follow a relationship from one mapped thing to another, such as from a product surface to an API, from an API to data, from data to a metric, or from a metric to active work and risk.
_Avoid_: Linking, references

**Artifact-Owned Trace Link**:
A typed cross-artifact relationship stored by the source artifact that owns the assertion, connecting stable artifact element identifiers with evidence and relationship meaning.
_Avoid_: Trace database row, renderer hyperlink, duplicated matrix entry

**Trace Index**:
A generated, rebuildable index of Artifact-Owned Trace Links used for cross-artifact navigation, traceability matrices, coverage checks, impact analysis, and compact agent context without becoming a separate source of truth.
_Avoid_: Traceability source of truth, manually maintained link database, artifact copy

**Artifact Context Packet**:
A compact agent-facing projection of one selected artifact element, its artifact identity, altitude and state, one-hop Depends On and Depended On By relationships, semantic labels, evidence, confidence, local findings, and drill-down targets.
_Avoid_: Full artifact dump, whole trace graph, renderer state

**One-Hop Context Default**:
The rule that an Artifact Context Packet includes only immediate relationships unless the agent explicitly expands a relevant connection to answer the current question.
_Avoid_: Recursive context loading, full dependency traversal, preemptive deep context

**Evidence Reference**:
A provenance-complete pointer from a material artifact claim to a resolvable source revision and exact location, including freshness, access, direct-or-derived status, and the basis for stated confidence.
_Avoid_: Bare URL, filename citation, claim summary as proof

**Evidence Escalation Rule**:
The rule that an agent automatically fetches the smallest claim-bearing evidence excerpt when a claim materially controls an answer or action, evidence is conflicting, stale, derived, unavailable, or insufficiently confident, or exact consequential details matter.
_Avoid_: Always-load source, summary-only verification, confidence as proof

**Full-Evidence Exception**:
The limited escalation from evidence excerpts to a complete source when correctness depends on whole-source structure, exhaustive search, cross-section reconciliation, or unresolved context that smaller excerpts cannot establish.
_Avoid_: Default full-file context, bulk evidence loading, convenience fetch

**Focused Traceability View**:
A purpose-specific presentation of a relevant subset of the Trace Index, such as a requirements matrix or selected end-to-end path, used when full cross-artifact traceability would be visually overwhelming.
_Avoid_: Separate traceability truth, full graph dump, unrelated relationship list

**Trace Mode**:
The Interactive Artifact View behavior that shows the immediate typed incoming and outgoing relationships of a selected element, including cross-artifact relationships, with inspection and drill-down available for each connected element.
_Avoid_: Ranked end-to-end path, whole-graph highlight, automatic relevance guess

**Relationship Explanation**:
The Interactive Map View behavior that makes a mapped relationship understandable through an edge selection, hover, trace panel, or other graphical treatment that explains why the connected things belong together.
_Avoid_: Hidden edge metadata, unlabeled connector
