Status: ready-for-agent

sua-001 - Add shared artifact envelope definitions

Commit sentence: Add versioned shared schemas for System Understanding Artifact identity, state, evidence, findings, and trace references.
Outcome: Canonical artifacts can compose one strict Artifact Envelope without importing graph-specific or renderer-specific fields.
Context refs: `CONTEXT.md`; parent PRD sections Shared Artifact Envelope and Modular contracts; `schemas/system-map.schema.json`; ADR-0002.
Scope and allowed actions: Add shared schema definitions and valid/invalid fixtures; add focused schema compilation tests. Do not change legacy map validation behavior or rendering.
Invariants: Typed sources remain canonical; shared definitions contain no Cytoscape, layout, coordinate, or generated-view state; Current State remains the default where legacy behavior applies.
Success criteria: Envelope requires stable identity, artifact type and contract version, altitude, scope, Artifact State, revision/freshness metadata, and shared evidence/finding/trace containers; invalid fixtures receive actionable diagnostics.
Validation steps: Run focused schema tests and `npm test`; inspect schemas for renderer-specific fields.
Depends on: none.
Stop or escalate when: Shared definitions require choosing unresolved semantics not established by the PRD or glossary.
Executor role: focused_executor
Preferred runtime: Luna High
