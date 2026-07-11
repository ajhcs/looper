Status: ready-for-agent

sua-019 - Add Use Case Model and focused diagrams

Commit sentence: Add a Use Case Model linked to requirements and logical behavior with one focused diagram per useful use case.
Outcome: Actor goals and interactions remain distinct from logical decomposition while staying traceably coupled.
Context refs: parent PRD Altitude 3; Ecosystem actors; Requirements and Logical Decomposition contracts.
Scope and allowed actions: Add contract, cross-model semantic checks, fixtures, and focused use-case visualization module.
Invariants: Actors reuse ecosystem identities; use cases trace to served requirements and realizing behavior; no mandatory all-use-case mega-diagram.
Success criteria: Missing actor/requirement/behavior traces produce useful findings; valid use cases render readable focused diagrams with immediate relationships.
Validation steps: Run contract, actor resolution, trace coverage, diagram output, and `npm test` checks.
Depends on: sua-018.
Stop or escalate when: Actor or system-boundary evidence conflicts with the accepted ecosystem model.
Executor role: judgment_worker
Preferred runtime: Terra Medium
