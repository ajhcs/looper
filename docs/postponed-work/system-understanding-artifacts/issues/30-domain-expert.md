Status: ready-for-agent

sua-030 - Add the Domain Model expert

Commit sentence: Add a model-usable Domain Model expert that preserves implementation-independent language, rules, ownership, and life cycles.
Outcome: A bounded expert can author domain truth without turning code or database structure into the domain model.
Context refs: Artifact Expert framework; Domain Model contract; `CONTEXT.md`; parent PRD expert boundaries.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, glossary-conflict handling, trace-proposal output, and docs tests.
Invariants: `CONTEXT.md` vocabulary is authoritative; implementation details remain outside domain truth; conflicts require human adjudication.
Success criteria: Expert validates concepts/rules/ownership/lifecycles, reports glossary conflicts, and proposes allocation traces without writing architecture.
Validation steps: Run skill/docs tests, prompt fixture assertions, glossary-conflict packet test, and `npm test`.
Depends on: sua-020, sua-024, sua-029.
Stop or escalate when: Canonical terminology requires a human domain decision.
Executor role: judgment_worker
Preferred runtime: Terra Medium
