Status: ready-for-agent

sua-010 - Add explicit drill-down and scoped findings

Commit sentence: Add breadcrumbed Drill Down, Codex-stable annotation targets, and artifact/view/element finding scopes to the shared shell.
Outcome: Navigation is intentional and findings remain locally relevant without hiding consequential artifact-wide issues.
Context refs: parent PRD Interactive shell and Findings; `CONTEXT.md` Artifact Drill-Down, Finding Scope, and Codex-Native Annotation Integration.
Scope and allowed actions: Add explicit drill-down actions, breadcrumbs, optional shortcut behavior, stable target attributes, pass/warning/fail summaries, and three finding disclosure scopes.
Invariants: Selection does not navigate; double-click is never required; no custom annotation store; no arbitrary top-N hiding rule.
Success criteria: Drill-down preserves context; findings appear only at their scope; every surfaced finding has consequence/evidence/next action; keyboard access matches pointer access.
Validation steps: Run shell navigation, finding-scope, accessibility-hook, and annotation-target output tests; run `npm test`.
Depends on: sua-008, sua-009.
Stop or escalate when: Codex annotation integration requires undocumented app APIs rather than stable page targets.
Executor role: judgment_worker
Preferred runtime: Terra High
