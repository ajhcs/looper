Status: ready-for-agent

sua-032 - Add the Code Structure expert

Commit sentence: Add a model-usable Code Structure expert that runs only for a selected component with an explicit value trigger.
Outcome: A bounded expert can generate fresh code-depth understanding without producing exhaustive long-lived inventories.
Context refs: Artifact Expert framework; Code Structure contract; parent PRD Altitude 5 and routing policy.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, value-gate check, repository-evidence workflow, and docs tests.
Invariants: One component per run; absence is valid; current repository evidence is required; no full-repository default.
Success criteria: Expert declines untriggered work compactly, validates triggered artifacts, records rationale, and proposes implementation traces.
Validation steps: Run skill/docs tests, triggered/untriggered prompt fixtures, stale-evidence packet test, and `npm test`.
Depends on: sua-023, sua-024, sua-031.
Stop or escalate when: Language-specific extraction requires a separate integration not covered by the provider-neutral contract.
Executor role: focused_executor
Preferred runtime: Luna High
