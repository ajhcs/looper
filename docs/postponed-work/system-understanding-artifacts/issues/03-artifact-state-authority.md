Status: ready-for-agent

sua-003 - Enforce artifact-state authority

Commit sentence: Enforce Current, Candidate Future, and human-accepted Future State semantics in artifact validation.
Outcome: Artifacts cannot mix state meanings or promote a model-authored proposal to Accepted Future State without a human acceptance record.
Context refs: `CONTEXT.md` Artifact State terms; parent PRD Artifact states and authority; registry validation façade.
Scope and allowed actions: Add semantic rules and fixtures for all three states, human acceptance metadata, Current-State Conflict Gate results, and mixed-state rejection.
Invariants: Current State is evidence-backed rather than human-approved; Candidate Future State remains nonbinding; unresolved conflicts remain representable.
Success criteria: Acceptance without human authority/time/decision reference fails; credible conflicts yield a review-gate diagnostic; valid Current State needs no acceptance record.
Validation steps: Run state-transition fixture tests and `npm test`.
Depends on: sua-002.
Stop or escalate when: The implementation needs an identity/authentication system rather than the acceptance metadata contract defined in the PRD.
Executor role: judgment_worker
Preferred runtime: Terra Medium
