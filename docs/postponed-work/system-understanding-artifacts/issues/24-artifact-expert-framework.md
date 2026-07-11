Status: ready-for-agent

sua-024 - Add the Artifact Expert Skill contract

Commit sentence: Add a shared model-usable Artifact Expert Skill contract with ownership, validation, trace-proposal, and routing rules.
Outcome: Expert skills can author one canonical source-model type without duplicating view logic or claiming global integration authority.
Context refs: parent PRD Artifact experts and orchestration; `CONTEXT.md` Artifact Expert Skill and Routing; existing System Mapper skill/agent metadata patterns.
Scope and allowed actions: Add shared instructions/template, agent metadata expectations, routing rules, output packet, ownership constraints, and documentation tests.
Invariants: Skills own canonical models, not diagrams; Luna is default for bounded work; Terra is evidence-based escalation; experts propose rather than globally merge traces.
Success criteria: A fixture expert contract names owned artifact, inputs, evidence rules, validation, trace proposals, stop conditions, and output; docs tests prevent largest-model default.
Validation steps: Run skill/docs metadata tests and `npm test`.
Depends on: sua-002, sua-005.
Stop or escalate when: The runtime cannot express preferred model metadata; preserve semantic routing in instructions without claiming enforced selection.
Executor role: focused_executor
Preferred runtime: Luna High
