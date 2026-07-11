Status: ready-for-agent

sua-034 - Migrate System Mapper docs and legacy compatibility

Commit sentence: Document the System Understanding Artifact pipeline and migrate System Mapper to the registered legacy-map path without breaking existing commands.
Outcome: Users and agents receive accurate altitude, artifact, evidence, trace, routing, and compatibility guidance after implementation.
Context refs: parent PRD Compatibility, Further Notes, and Prompting posture; ADR-0002; existing README, skill, docs, plugin metadata, and docs tests.
Scope and allowed actions: Update user/agent docs, System Mapper instructions, plugin metadata, CLI help, examples, migration guidance, and documentation tests; preserve optional Mermaid policy.
Invariants: Current-State Default remains; generated views remain derivatives; no D2/SVG reintroduction; docs do not require every artifact; map changes outside this effort are not overwritten.
Success criteria: Documentation explains artifact registry, altitude pipeline, integrity loop, conditional artifacts, immediate traceability, context packets, evidence escalation, experts, and legacy map compatibility accurately.
Validation steps: Run docs tests, CLI help/preflight checks, legacy map validation/rendering, and `npm test`.
Depends on: sua-033.
Stop or escalate when: Documentation would claim an unimplemented runtime or artifact module.
Executor role: focused_executor
Preferred runtime: Luna High
