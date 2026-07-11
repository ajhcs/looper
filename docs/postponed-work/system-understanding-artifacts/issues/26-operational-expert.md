Status: ready-for-agent

sua-026 - Add the Operational Concept expert

Commit sentence: Add a model-usable Operational Concept expert that references ecosystem identities and captures normal and off-nominal use.
Outcome: A bounded expert can author ConOps source material without rewriting the Ecosystem Source Model.
Context refs: Artifact Expert framework; Operational Concept contract; parent PRD expert boundaries.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, scenario evidence workflow, trace-proposal output, and docs tests.
Invariants: Ecosystem identities are read-only inputs; at least one representative scenario is required; abnormal depth is consequence-triggered.
Success criteria: Expert validates its artifact, proposes actor/system traces, reports evidence gaps, and escalates consequential scenario ambiguity.
Validation steps: Run skill/docs tests, prompt fixture assertions, representative handoff packet test, and `npm test`.
Depends on: sua-015, sua-024, sua-025.
Stop or escalate when: Scenario completeness requires a domain hazard decision absent from evidence.
Executor role: focused_executor
Preferred runtime: Luna High
