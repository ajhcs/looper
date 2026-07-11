Status: ready-for-agent

sua-012 - Render Mission and Market Context

Commit sentence: Add an Altitude 0A visualization module for mission, market forces, organizations, objectives, constraints, and success measures.
Outcome: Users can understand why the ecosystem exists without forcing strategic concepts into C4 notation.
Context refs: Ecosystem contract; parent PRD Altitude 0 and shell; shared visualization module interface.
Scope and allowed actions: Add module projection, readable strategic layout, details, immediate relationships, findings, and fixture output within the shared shell.
Invariants: Mission is visually directional; strategic view remains evidence-backed; shell interactions stay consistent; no bespoke standalone app.
Success criteria: The fixture clearly distinguishes problem/opportunity, mission, objectives, measures, market forces, organizations, and related systems; selection and drill-down work.
Validation steps: Run module output tests, render fixture HTML, inspect readability at representative density, run accessibility checks and `npm test`.
Depends on: sua-010, sua-011.
Stop or escalate when: Visual semantics cannot communicate direction versus entity without a product-design prototype.
Executor role: judgment_worker
Preferred runtime: Terra High
