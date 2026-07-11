Status: ready-for-agent

sua-029 - Add the Use Case expert

Commit sentence: Add a model-usable Use Case expert that couples actor goals to requirements and logical behavior.
Outcome: A bounded expert can author focused use cases without merging them into logical decomposition or ecosystem identity sources.
Context refs: Artifact Expert framework; Use Case contract; parent PRD expert boundaries.
Scope and allowed actions: Add one focused skill/metadata, prompt fixture, cross-model trace workflow, diagram-generation handoff, and docs tests.
Invariants: Actors reuse ecosystem identities; use cases remain separate from logical functions; focused diagrams are generated.
Success criteria: Expert validates actor, requirement, and behavior traces; reports missing coverage; returns validated artifact plus proposed links.
Validation steps: Run skill/docs tests, prompt fixture assertions, representative packet test, and `npm test`.
Depends on: sua-019, sua-024, sua-028.
Stop or escalate when: Actor or system-boundary evidence conflicts with the Ecosystem Source Model.
Executor role: focused_executor
Preferred runtime: Luna High
