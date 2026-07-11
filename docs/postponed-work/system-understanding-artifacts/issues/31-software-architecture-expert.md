Status: ready-for-agent

sua-031 - Add the Software Architecture expert

Commit sentence: Add a model-usable Software Architecture expert that allocates domain responsibilities to containers and components.
Outcome: A bounded expert can author architecture and generated C4 views while preserving Domain Model ownership.
Context refs: Artifact Expert framework; Software Architecture, Container, and Component contracts; parent PRD routing policy.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, allocation/interface workflow, trace-proposal output, and docs tests.
Invariants: Domain Model is read-only input; architecture owns deployment/component structure; views remain generated.
Success criteria: Expert validates boundaries, responsibilities, interfaces, allocations, and evidence; ambiguous architecture triggers escalation.
Validation steps: Run skill/docs tests, prompt fixture assertions, ambiguous-boundary packet test, and `npm test`.
Depends on: sua-022, sua-024, sua-030.
Stop or escalate when: Container or component boundaries are genuinely ambiguous or expensive to reverse.
Executor role: judgment_worker
Preferred runtime: Terra Medium
