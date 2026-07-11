Status: ready-for-agent

sua-009 - Show immediate semantic relationships

Commit sentence: Present selected-element relationships as Depends On and Depended On By with semantic and inverse labels.
Outcome: Users can understand local connectivity without automatic end-to-end path ranking or whole-graph clutter.
Context refs: parent PRD Traceability and shell; relationship vocabulary; Trace Index; current relationship detail UI.
Scope and allowed actions: Replace or adapt incoming/outgoing presentation with dependency groupings, semantic labels, evidence/confidence details, relationship selection, and connected-element inspect/drill-down hooks.
Invariants: Only immediate relationships appear by default; semantic meaning remains visible; no Why/How/Impact/Verify modes or relevance ranking.
Success criteria: Cross-artifact and local immediate links display correctly from both endpoints; Relationship Explanation uses forward/inverse meanings; high fanout remains understandable.
Validation steps: Run output-level relationship tests, keyboard interaction tests where available, representative high-fanout fixture checks, and `npm test`.
Depends on: sua-005, sua-008.
Stop or escalate when: The shell cannot resolve a connected element without introducing a canonical renderer link.
Executor role: judgment_worker
Preferred runtime: Terra Medium
