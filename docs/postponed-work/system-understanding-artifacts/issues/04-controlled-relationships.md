Status: ready-for-agent

sua-004 - Add controlled semantic relationship definitions

Commit sentence: Add controlled Relationship Types with inverse labels, valid endpoint kinds, and dependency-direction derivation.
Outcome: Trace links retain precise semantics while every selected element can be navigated through Depends On and Depended On By.
Context refs: `CONTEXT.md` relationship vocabulary; parent PRD Traceability and relationship semantics; legacy relationship types.
Scope and allowed actions: Add shared relationship definitions, core vocabulary registration, endpoint validation, inverse-label validation, and compatibility mappings for legacy map relationships.
Invariants: Dependency Direction does not replace Relationship Type; free-form types are invalid; artifact-specific extensions require registry definitions.
Success criteria: Forward and inverse labels are readable from both endpoints; invalid endpoint pairs and unregistered types fail; legacy types remain representable.
Validation steps: Run vocabulary/inversion tests, legacy map tests, and `npm test`.
Depends on: sua-002.
Stop or escalate when: A legacy relationship cannot be mapped without changing its meaning.
Executor role: judgment_worker
Preferred runtime: Terra Medium
