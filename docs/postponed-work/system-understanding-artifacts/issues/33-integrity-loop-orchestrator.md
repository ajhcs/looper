Status: ready-for-agent

sua-033 - Add the integrity-loop orchestrator

Commit sentence: Add an orchestrator that enforces the Systems Engineering Integrity Loop, conditionally invokes experts, and integrates traces through review gates.
Outcome: Users are guided sternly through necessary reasoning without automatic artifact ceremony or uncontrolled multi-writer subagents.
Context refs: parent PRD orchestration and prompt posture; all Artifact Expert Skills; `CONTEXT.md` Integrity Loop, Conditional Artifact Policy, Single Integrator Rule, and Dependency-Aware Parallelism.
Scope and allowed actions: Add orchestrator skill/metadata, integrity-loop state, expert selection/value gates, review gates, routing, ownership packets, integration checks, and prompt/docs tests.
Invariants: Questions/invariants are mandatory, artifacts conditional; one integrator publishes traces; Current-State conflicts and irreversible decisions stop for human review; no runtime claims without verification.
Success criteria: Orchestrator can complete a compact task without all artifacts, trigger necessary depth, sequence dependencies, parallelize disjoint siblings, and emit a useful uncertainty-reducing handoff.
Validation steps: Run prompt fixtures for compact, conflict, failed-gate, scope-change, and high-consequence cases; run routing/ownership tests and `npm test`.
Depends on: sua-025, sua-026, sua-027, sua-028, sua-029, sua-030, sua-031, sua-032.
Stop or escalate when: Orchestration requires external runtime capabilities not available in the plugin contract; document the exact boundary and keep state logic testable.
Executor role: planner
Preferred runtime: Sol Medium
