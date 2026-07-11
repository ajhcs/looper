Status: ready-for-agent

sua-021 - Add Software Architecture and C4 Container view

Commit sentence: Add the Software Architecture Model contract and C4 Container visualization with domain responsibility allocation.
Outcome: Altitude 4 connects deployable software structure to the domain concepts and rules it owns or implements.
Context refs: parent PRD Altitude 4; Domain Model; C4 container guidance; shared trace and shell contracts.
Scope and allowed actions: Add architecture schema/semantics, fixtures, registry entry, domain allocation checks, and C4 Container module.
Invariants: Containers are deployable/runnable units rather than arbitrary folders; domain ownership remains canonical in the Domain Model; C4 scope stays clear.
Success criteria: Detect missing responsibilities, conflicting allocations, unjustified elements, and missing interfaces; render clear container purposes and relationships.
Validation steps: Run architecture contract, allocation, interface, C4 checklist, render output, and `npm test` checks.
Depends on: sua-020.
Stop or escalate when: Container boundaries are genuinely ambiguous in evidence and require architectural judgment.
Executor role: judgment_worker
Preferred runtime: Terra High
