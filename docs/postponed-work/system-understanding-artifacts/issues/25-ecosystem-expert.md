Status: ready-for-agent

sua-025 - Add the Ecosystem Source Model expert

Commit sentence: Add a model-usable Ecosystem Source Model expert with contract-driven evidence, validation, and trace proposals.
Outcome: A bounded expert can author Altitude 0 ecosystem truth and generate its strategic, landscape, and context views without duplicating identities.
Context refs: Artifact Expert framework; Ecosystem contract and views; parent PRD expert boundaries.
Scope and allowed actions: Add one focused skill and agent metadata, prompt fixture, validation workflow, evidence-gap output, and documentation tests.
Invariants: The expert owns ecosystem identities; mission is not a software-system box; views remain generated; Luna is the bounded default.
Success criteria: Skill can run independently, validates its artifact, distinguishes fact/inference/unknown, and returns proposed links plus gaps.
Validation steps: Run skill/docs tests, prompt fixture assertions, a representative dry-run packet test, and `npm test`.
Depends on: sua-013, sua-014, sua-024.
Stop or escalate when: Ecosystem boundaries or conflicting evidence require human or Terra-level judgment.
Executor role: focused_executor
Preferred runtime: Luna High
