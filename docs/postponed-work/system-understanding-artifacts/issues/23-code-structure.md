Status: ready-for-agent

sua-023 - Add risk-triggered Code Structure artifacts

Commit sentence: Add the optional Code Structure Model and focused C4 Code view behind an Artifact Value Gate.
Outcome: Important or complex components can be explained at code depth without creating a full-system code inventory.
Context refs: parent PRD Altitude 5 and Artifact Value Gate; Software Architecture Model; C4 code guidance.
Scope and allowed actions: Add selected-component contract, value-gate semantics, repository-evidence fields, focused view, fixtures, and registry entry.
Invariants: One component per artifact; generation is optional; current repository evidence outranks stale manual diagrams; only story-relevant code elements render.
Success criteria: No-trigger omission is valid; triggered artifact records rationale and evidence; full-repository or unscoped code models fail.
Validation steps: Run scope, value-gate, evidence freshness, optional omission, view output, and `npm test` checks.
Depends on: sua-022, sua-007.
Stop or escalate when: Code extraction requires language-specific analysis beyond the provider-neutral contract; return a follow-up integration packet.
Executor role: judgment_worker
Preferred runtime: Terra Medium
