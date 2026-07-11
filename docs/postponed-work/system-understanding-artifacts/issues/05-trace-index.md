Status: ready-for-agent

sua-005 - Generate the cross-artifact Trace Index

Commit sentence: Generate a deterministic Trace Index from artifact-owned links with immediate-neighborhood and coverage queries.
Outcome: Cross-artifact navigation and analysis are derived from canonical artifacts without introducing a second traceability source of truth.
Context refs: parent PRD Traceability; shared envelope and relationship definitions; current relationship lookup behavior.
Scope and allowed actions: Implement deterministic index generation, cross-artifact target resolution, immediate incoming/outgoing queries, coverage summaries, and invalidation inputs; add multi-artifact fixtures.
Invariants: The index is rebuildable and read-only as derived state; every link retains provenance and semantic meaning; missing targets are diagnostics.
Success criteria: Rebuilding identical artifacts yields identical index output; changing a source link updates the relevant neighborhood and coverage; no canonical artifact requires a persisted index.
Validation steps: Run deterministic rebuild, missing-target, cross-artifact neighborhood, and mutation tests; run `npm test`.
Depends on: sua-003, sua-004.
Stop or escalate when: Index generation requires a persistence service not justified by repository scale.
Executor role: judgment_worker
Preferred runtime: Terra Medium
