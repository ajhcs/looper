Status: ready-for-agent

sua-028 - Add the Logical Decomposition expert

Commit sentence: Add a model-usable Logical Decomposition expert with mandatory structural Reality Checks and evidence-based escalation.
Outcome: A bounded expert can author logical behavior and expose gaps without automatically launching expensive simulations.
Context refs: Artifact Expert framework; Logical Decomposition contract; parent PRD Reality Check and routing policy.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, structural-check workflow, deeper-check request packet, and docs tests.
Invariants: Cheap structural checks always run; deeper physics is conditional; the expert does not rewrite Requirements Model.
Success criteria: Expert validates logical traces, reports decision-useful faults, records proportionate verification rationale, and escalates unresolved physics.
Validation steps: Run skill/docs tests, prompt fixture assertions, structural-fault packet test, and `npm test`.
Depends on: sua-018, sua-024, sua-027.
Stop or escalate when: Simulation, benchmark, prototype, or physical test is required to resolve a consequential question.
Executor role: judgment_worker
Preferred runtime: Terra Medium
