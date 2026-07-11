Status: ready-for-agent

sua-017 - Generate the Requirements Traceability Matrix

Commit sentence: Generate a focused Requirements Traceability Matrix from Requirements Model links and the Trace Index.
Outcome: Users receive formal requirement coverage without maintaining duplicate trace rows.
Context refs: Requirements contract; Trace Index; parent PRD Altitude 2 and Focused Traceability View.
Scope and allowed actions: Add matrix projection, filters, coverage diagnostics, relationship drill-down, and shell module; do not add matrix-owned canonical links.
Invariants: Matrix cells derive from artifact-owned links; gaps remain visible; relationship evidence and semantics are inspectable.
Success criteria: Changing a canonical link updates the matrix; duplicate manual rows are impossible; uncovered and conflicting traces are reported usefully.
Validation steps: Run deterministic matrix, mutation, coverage-gap, drill-down, and output tests; run `npm test`.
Depends on: sua-016.
Stop or escalate when: A desired matrix column has no canonical source and would require duplicated state.
Executor role: focused_executor
Preferred runtime: Luna High
