Status: ready-for-agent

sua-016 - Add Requirements Model and Specification

Commit sentence: Add the canonical Requirements Model contract and generated Requirements Specification view.
Outcome: Stakeholder, system, software, and constraint requirements share one traceable source without losing their distinct kinds.
Context refs: parent PRD Altitude 2; shared envelope, trace links, registry, and document visualization patterns.
Scope and allowed actions: Add requirement schema/semantics, quality checks, fixtures, registry entry, and specification renderer; include verification intent but not the RTM view.
Invariants: Requirements are stable, typed, evidenced, and testable; stakeholder intent and developer requirements remain distinct; generated prose is not canonical.
Success criteria: Quality checks cover identity, clarity, feasibility, verifiability, conflicts, abstraction, and upstream/downstream trace expectations; spec view is readable.
Validation steps: Run valid/invalid requirement tests, quality diagnostics, trace-reference tests, specification output checks, and `npm test`.
Depends on: sua-005, sua-010, sua-015.
Stop or escalate when: A requirement-kind distinction or quality rule is not defined by the PRD or accepted systems-engineering sources.
Executor role: judgment_worker
Preferred runtime: Terra High
