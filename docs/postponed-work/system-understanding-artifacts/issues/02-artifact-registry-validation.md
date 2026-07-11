Status: ready-for-agent

sua-002 - Add the artifact registry and validation façade

Commit sentence: Route artifact validation through a registry while preserving the existing System Understanding Map as a compatible registered type.
Outcome: One public validation seam resolves an artifact type to shared-envelope, artifact-specific, and semantic validation.
Context refs: parent PRD Modular contracts and Compatibility; `scripts/system-map.mjs`; `schemas/system-map.schema.json`; current validation tests.
Scope and allowed actions: Add the Artifact Contract Registry, public artifact validation entry point, preflight checks, and a legacy map adapter/registration; add an `artifacts:validate` command or equivalent public CLI. Keep current map commands operational.
Invariants: Unknown types fail explicitly; registry data is not artifact source truth; legacy valid and invalid fixtures retain their behavior.
Success criteria: Registered artifacts validate through one façade; missing registry dependencies produce actionable preflight errors; legacy map validation remains green.
Validation steps: Run registry tests, all legacy fixture tests, public CLI smoke checks, and `npm test`.
Depends on: sua-001.
Stop or escalate when: Compatibility would require silently reinterpreting a legacy field rather than adapting it explicitly.
Executor role: judgment_worker
Preferred runtime: Terra Medium
