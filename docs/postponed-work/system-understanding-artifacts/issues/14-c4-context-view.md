Status: ready-for-agent

sua-014 - Render focused C4 System Context

Commit sentence: Add a focused Altitude 1 C4 System Context module for one selected software system.
Outcome: Users can locate one system among its users and external systems with unambiguous system boundaries.
Context refs: Ecosystem contract; parent PRD Altitude 1; C4 context guidance; shared shell.
Scope and allowed actions: Add focused projection, selected-system requirement, boundary validation, details, relationships, and fixture output.
Invariants: Exactly one system is the focus; internal containers/components do not appear; ecosystem identities and evidence are reused.
Success criteria: Invalid zero-focus or multi-focus requests fail; valid output clearly labels people, external systems, relationship purpose, and scope.
Validation steps: Run focus/boundary tests, C4 checklist assertions, fixture render smoke check, and `npm test`.
Depends on: sua-010, sua-011.
Stop or escalate when: The selected system boundary conflicts with credible ecosystem evidence.
Executor role: focused_executor
Preferred runtime: Luna High
