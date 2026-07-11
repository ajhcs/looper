Status: ready-for-agent

sua-011 - Add the Ecosystem Source Model contract

Commit sentence: Add and validate the Ecosystem Source Model for strategic context, organizations, people, systems, boundaries, and relationships.
Outcome: Altitude 0A, 0B, and focused contexts share one evidence-backed canonical ecosystem source.
Context refs: parent PRD Altitude 0; `CONTEXT.md` Ecosystem Source Model; Artifact Envelope and controlled relationships.
Scope and allowed actions: Add schema, semantic validation, valid/invalid fixtures, evidence expectations, trace links, and registry entry; do not render views.
Invariants: Mission is purpose/direction rather than a software-system box; C4-compatible elements remain distinguishable; no duplicated identities across views.
Success criteria: Contract represents problems/opportunities, mission/goals/measures, organizations, people, software systems, boundaries, and typed relations with evidence.
Validation steps: Run ecosystem contract and semantic fixture tests, registry preflight, and `npm test`.
Depends on: sua-004.
Stop or escalate when: A concept requires an unapproved relationship or entity type not derivable from the PRD.
Executor role: judgment_worker
Preferred runtime: Terra Medium
