# System Understanding Artifacts Looper

Accepted plan revision: [PRD](./PRD.md) + [35-bead plan](./BEADS.md)

Goal: Execute `sua-001` through `sua-035` as coherent, proven commits until the modular System Understanding Artifact pipeline is dogfooded and evaluated.

## Control loop

1. Re-enter from [CHECKPOINT.md](./CHECKPOINT.md); take the lowest incomplete bead whose dependencies are complete.
2. Read only its packet, named context, and affected code/tests. Record the pre-slice commit as review fixed point.
3. Confirm one writer, commit sentence, and proof surface. Split/replan if scope or ownership expanded.
4. Dispatch `matt-pocock-skills:implement` with the bead packet. Preserve semantic role/preferred runtime and record what actually ran.
5. Run bead proof. Keep only changed/learned, validation, confidence, blocker/scope change, and next action.
6. Run `matt-pocock-skills:code-review` against the fixed point, bead, PRD, standards, and proof. Fix only within bead scope; rerun affected proof.
7. Parent critic checks outcome, invariants, success criteria, regressions, dependencies, and protected paths. Never advance on partial proof.
8. On failure, change evidence or approach: inspect, narrow/split, escalate one runtime tier, or request a decision. Never repeat unchanged.
9. On pass, commit only the bead using its commit sentence; checkpoint evidence, risks, and next ready bead.
10. At phase boundaries, checkpoint and compact/fresh-start with only goal, plan revision, decisions, evidence refs, risks, and next action.

## Cross-bead verification

- Every slice: bead proof and `npm test` before commit.
- Registry/shell/relationship/migration/final changes: legacy map validation and rendering.
- New contracts/experts: registry preflight.
- Before `sua-035`: affected trace neighborhoods only. At `sua-035`: full artifact suite, browser/accessibility smoke, reproducible token/accuracy evaluation.
- Generated HTML, Trace Index, matrices, and context packets are never canonical.

## Protected state and residual risks

- Protect unrelated changes in `maps/looper-plugin.map.yaml` and `maps/generated/looper-plugin.html` unless `sua-035` inspects and adopts them.
- Numeric context/risk thresholds remain evaluation outputs.
- Missing `implement` or `code-review` skill: stop; never substitute silently.

## Status

- `complete`: 35 beads committed, cross-bead proof passes, and `sua-035` records evaluation evidence.
- `waiting`: an external/browser/test job is still running.
- `blocked`: required input is unavailable or the same failure persists after three evidence-changing attempts.

Commit/PR recommendation: one commit per bead on a dedicated `codex/` branch; one draft PR after the planning baseline, ready only after `sua-035` passes.
