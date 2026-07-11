Status: ready-for-agent

sua-008 - Extract the shared Interactive Artifact View shell

Commit sentence: Refactor the generated map view into a shared Interactive Artifact View shell with registered visualization modules.
Outcome: The existing graph renderer becomes the first module inside a reusable shell without changing canonical source behavior.
Context refs: ADR-0002; parent PRD Interactive shell; `scripts/system-map.mjs`; renderer tests and generated analytics fixture.
Scope and allowed actions: Extract shell data, template, module interface, and graph-module registration; preserve current selection/detail behavior and self-contained generated HTML.
Invariants: Generated views remain derivatives; no renderer fields enter schemas; legacy graph output remains usable; no new visual features are bundled into this refactor.
Success criteria: Legacy analytics renders through the shared shell and graph module; module lookup is registry-driven; current renderer tests pass or are updated only for observable-equivalent output.
Validation steps: Run renderer tests, generate the analytics HTML, inspect module registration and self-contained output, then run `npm test`.
Depends on: sua-002.
Stop or escalate when: Extraction exceeds one coherent refactor or requires redesigning the UI; return a narrower seam/file map before proceeding.
Executor role: judgment_worker
Preferred runtime: Terra High
