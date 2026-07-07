# Looper

Looper is a personal Codex workflow system for understanding software/product systems, decomposing work, orchestrating agent loops, and researching engineering decisions.

## Language

**System Understanding Map**:
A living model of a project, product, or business that explains how its surfaces, workflows, data, metrics, code, infrastructure, risks, and decisions fit together. It is used to understand the current system first so planning can start from reality.
_Avoid_: Codebase map, architecture diagram

**Current-State Map**:
A System Understanding Map that describes how the system works now, including known gaps, risks, unclear areas, and evidence quality.
_Avoid_: As-is diagram

**Future-State Map**:
A System Understanding Map that describes an intended or idealized version of the system after planned changes.
_Avoid_: Roadmap, vision board

**Current-State Default**:
The rule that System Mapper creates Current-State Maps unless the user explicitly asks for a Future-State Map or prospective design exercise.
_Avoid_: Mixed current/future map

**Domain**:
A coherent area of the system being mapped, defined by a stable purpose rather than by repository folders or implementation boundaries. A Domain may include product behavior, data, metrics, infrastructure, code, business logic, workflows, and risks.
_Avoid_: Module, service, feature area

**Map Layer**:
A repeatable kind of information in a System Understanding Map. Core layers are Product, Knowledge, Data, System, and Code; Business and Work may be included when the user needs them.
_Avoid_: Level, section

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
A stable meaning for an edge between mapped things. Starter Relationship Types include contains, uses, feeds, transforms, implements, exposes, measures, depends_on, protects, risks, and unknown.
_Avoid_: Arrow label

**Controlled Map Vocabulary**:
The rule that Node Types and Relationship Types are validated against a strict vocabulary. New types may be added later, but only as deliberate changes to the notation rather than ad hoc labels in individual maps.
_Avoid_: Suggested types, freeform graph

**Component Spec**:
A focused description attached to a mapped component that defines what it is, why it exists, its interfaces, dependencies, invariants, evidence, and known risks.
_Avoid_: README, implementation notes

**Traceability**:
The ability to follow a relationship from one mapped thing to another, such as from a product surface to an API, from an API to data, from data to a metric, or from a metric to active work and risk.
_Avoid_: Linking, references

**Trace Mode**:
The Interactive Map View behavior that highlights an important cross-layer path so the user can follow how mapped things connect across Product, Knowledge, Data, System, Code, and risk.
_Avoid_: Whole-graph highlight, path decoration

**Relationship Explanation**:
The Interactive Map View behavior that makes a mapped relationship understandable through an edge selection, hover, trace panel, or other graphical treatment that explains why the connected things belong together.
_Avoid_: Hidden edge metadata, unlabeled connector
