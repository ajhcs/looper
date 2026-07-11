Status: ready-for-agent

sua-013 - Render the C4 System Landscape

Commit sentence: Add an Altitude 0B C4 System Landscape module from the Ecosystem Source Model.
Outcome: Users can see people and software systems across the selected operating scope without mission or market concepts appearing as C4 boxes.
Context refs: Ecosystem contract; parent PRD Altitude 0B; C4 landscape guidance; shared shell.
Scope and allowed actions: Add C4 landscape projection, scope key, evidence/details, immediate relationships, and fixture output.
Invariants: Primary elements are people and software systems; strategic context remains traceable but outside C4 notation; source identities are reused.
Success criteria: View has clear scope, element types, purposes, and relationship meanings; cross-links to strategic context remain inspectable.
Validation steps: Run C4 checklist assertions, module output tests, fixture render smoke check, and `npm test`.
Depends on: sua-010, sua-011.
Stop or escalate when: The source lacks sufficient scope information to determine a valid landscape.
Executor role: focused_executor
Preferred runtime: Luna High
