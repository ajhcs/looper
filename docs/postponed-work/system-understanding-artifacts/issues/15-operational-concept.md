Status: ready-for-agent

sua-015 - Add Operational Concept and ConOps

Commit sentence: Add the Operational Concept Model contract and a ConOps visualization for normal and consequential off-nominal operation.
Outcome: Altitude 1 explains how a selected system is used, supported, and operated in reality.
Context refs: parent PRD Altitude 1; Ecosystem identities; shared envelope, registry, shell, and relationships.
Scope and allowed actions: Add contract, semantic validation, fixtures, registry entry, and document/scenario visualization module; link actors/systems rather than duplicate them.
Invariants: At least one representative scenario exists; abnormal scenarios are conditional on consequence; operational content remains distinct from C4 context.
Success criteria: Modes, environment, constraints, support, lifecycle, normal scenarios, and triggered abnormal scenarios validate and render clearly.
Validation steps: Run contract, missing-scenario, consequence-trigger, cross-reference, module output, and `npm test` checks.
Depends on: sua-011, sua-014.
Stop or escalate when: Scenario completeness requires a domain-specific hazard decision absent from evidence.
Executor role: judgment_worker
Preferred runtime: Terra High
