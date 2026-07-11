Status: ready-for-agent

sua-027 - Add the Requirements expert

Commit sentence: Add a model-usable Requirements expert that authors the canonical Requirements Model and its trace proposals.
Outcome: A bounded expert can produce requirements, specification, and RTM inputs without maintaining duplicate views.
Context refs: Artifact Expert framework; Requirements Model and RTM contracts; parent PRD expert boundaries.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, requirement quality workflow, trace-proposal output, and docs tests.
Invariants: Requirements Model is canonical; stakeholder/system/software kinds remain distinct; matrices and prose are generated.
Success criteria: Expert validates requirement quality, distinguishes evidence states, proposes upstream/downstream links, and reports consequential gaps.
Validation steps: Run skill/docs tests, prompt fixture assertions, representative packet test, and `npm test`.
Depends on: sua-017, sua-024, sua-026.
Stop or escalate when: Requirement conflicts or feasibility questions require human or Terra-level adjudication.
Executor role: focused_executor
Preferred runtime: Luna High
