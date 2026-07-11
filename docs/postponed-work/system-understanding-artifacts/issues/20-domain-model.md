Status: ready-for-agent

sua-020 - Add Domain Model and view

Commit sentence: Add an implementation-independent Domain Model contract and concept/rule visualization.
Outcome: Altitude 4 captures real-world concepts, relationships, ownership, invariants, states, and life cycles independently of software structure.
Context refs: parent PRD Altitude 4; shared artifact, relationship, trace, and shell contracts.
Scope and allowed actions: Add schema, semantic checks, fixtures, registry entry, and domain visualization module.
Invariants: Domain concepts are not database tables or classes by default; software allocation is expressed only through trace links.
Success criteria: Contract detects conflicting ownership/rules and invalid lifecycle relationships; view makes concepts, rules, ownership, and states understandable.
Validation steps: Run contract, ownership conflict, lifecycle, trace-link, module output, and `npm test` checks.
Depends on: sua-019.
Stop or escalate when: A domain term conflicts with `CONTEXT.md` and needs human domain adjudication.
Executor role: judgment_worker
Preferred runtime: Terra High
