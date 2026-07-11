Status: ready-for-agent

sua-018 - Add Logical Decomposition and structural Reality Checks

Commit sentence: Add the Logical Decomposition Model with trace coverage, gap/conflict analysis, and mandatory low-cost Reality Checks.
Outcome: Altitude 3 explains required system behavior and tests whether the logic survives basic real-world constraints.
Context refs: parent PRD Altitude 3 and Reality Check; Requirements Model; shared registry, trace, and finding contracts.
Scope and allowed actions: Add contract, validators, fixtures, functional/decomposition visualization, structural Reality Check engine, and value-trigger interface for deeper checks.
Invariants: Structural checks always run; simulation/prototype/benchmark work is not automatic; verification depth is proportionate and explained.
Success criteria: Detect missing inputs, impossible order, uncovered requirements, inconsistent state, unresolved interfaces, contradictions, and unsupported assumptions with decision-useful findings.
Validation steps: Run contract fixtures, each structural fault fixture, trace-coverage tests, deeper-check trigger tests, module output tests, and `npm test`.
Depends on: sua-016, sua-017.
Stop or escalate when: A deeper physical or operational analysis is required; return the exact unresolved question rather than implementing a simulator.
Executor role: judgment_worker
Preferred runtime: Terra High
