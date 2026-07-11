Status: ready-for-agent

sua-022 - Add C4 Component view

Commit sentence: Add focused C4 Component projections from the Software Architecture Model.
Outcome: Users can drill into one selected container and understand its major components, responsibilities, interfaces, and domain allocations.
Context refs: Software Architecture contract; parent PRD Altitude 4; shared shell and C4 component guidance.
Scope and allowed actions: Add selected-container projection, focus validation, component-level checks, drill-down targets, and fixture output.
Invariants: Exactly one container is in scope; components are not arbitrary code symbols; source architecture remains canonical.
Success criteria: View clearly identifies container boundary, component purposes, relationships, interfaces, and allocated domain responsibilities; invalid focus fails.
Validation steps: Run focus, responsibility, C4 checklist, drill-down, output, and `npm test` checks.
Depends on: sua-021.
Stop or escalate when: Component evidence is too weak to distinguish components from code-level details.
Executor role: focused_executor
Preferred runtime: Luna High
