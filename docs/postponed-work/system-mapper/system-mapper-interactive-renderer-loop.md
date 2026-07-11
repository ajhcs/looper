# System Mapper Interactive Renderer Loop

State:
- goal: ship the `mapper-html-*` beads so System Mapper generates a Cytoscape Interactive Map View, removes D2/SVG, and returns useful Map Briefs.
- beads: `docs/postponed-work/system-mapper/system-mapper-interactive-renderer-beads.md`.
- source docs: `CONTEXT.md`, `docs/adr/0002-use-interactive-map-view-as-primary-renderer.md`, `docs/postponed-work/system-mapper/system-mapper-interactive-renderer.md`.
- lanes: default code slice uses `matt-pocock-skills:implement` medium, then `matt-pocock-skills:code-review` high.
- checkpoint: record completed bead, files changed, commands run, evidence, risks, and next bead in `docs/postponed-work/system-mapper/system-mapper-checkpoint.md`.

Loop:
1. Re-enter from checkpoint and select the first incomplete childbead in order: `mapper-html-001` through `mapper-html-007`.
2. Confirm the bead has one commit sentence, one proof surface, and a coherent rollback story. If not, split before coding.
3. Dispatch the implementor lane with only the selected bead, source docs, constraints, likely files, and proof commands. Instruct it to edit files directly and return changed files, evidence, risks, and next action.
4. Dispatch the reviewer/fixer lane on the resulting diff and evidence. Require `merge-ready` or `not-ready`, fixes made, highest remaining risk, and proof rerun.
5. Parent critic: compare the result against the bead proof, ADR-0002, the Map Source invariant, current-state default, no D2/SVG support, no source-file browser links, and no trace schema in v1.
6. If critic fails, narrow the bead, widen evidence, or send a focused fix lane. Do not advance until the selected bead is coherent and proven.
7. Run only the verification needed for the next decision, usually `npm test`, `npm run maps:validate`, `npm run maps:render:html -- maps/examples/analytics.map.yaml maps/examples/generated/analytics.html`, and Mermaid checks while preview support remains.
8. Checkpoint the bead result with files, commands, test output summary, residual risk, and next bead.
9. Continue until all beads are complete or a hard blocker is reached.

Specialist branch:
- Use `looper:phone-a-swe` only if Cytoscape/layout/library behavior blocks sizing.
- Use frontend visual QA only after `mapper-html-002` or later if browser-rendered behavior cannot be proven by generated HTML assertions.
- Use `looper:beadwriter` only if a bead grows beyond one logical commit or gains a second proof surface.

Stop:
- complete: all `mapper-html-*` beads pass their proof and checkpoint says the interactive renderer is dogfooded.
- waiting: a command, browser check, or subagent lane is still progressing.
- blocked: required external input/tooling is missing, or the same failing condition persists after three focused repair attempts.

Return:
- completed bead ids and commit sentences
- files changed
- verification evidence
- residual risks or follow-up beads
- progress packet status: `complete`, `waiting`, or `blocked`
- commit/PR recommendation
